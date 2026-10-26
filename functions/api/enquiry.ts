/**
 * Cloudflare Pages function: POST /api/enquiry. Receives the enquiry forms (src/components/refresh/EnquiryForm.astro)
 * and emails them through Resend to the site address, with the sender's email as the reply-to.
 *
 * Settings (Cloudflare Pages > Settings > Variables and Secrets):
 *   RESEND_API_KEY        required; a Resend key for a verified sending domain
 *   ENQUIRY_FROM          sender on that domain, e.g. "Cloud Modular website <website@mail.cloudmodular.com.au>"
 *   ENQUIRY_TO            optional; defaults to nigel@cloudmodular.com.au
 *   TURNSTILE_SECRET_KEY  optional; when set, every submission must pass Cloudflare Turnstile
 *
 * Replies with JSON when the form sends in place, otherwise redirects back to the page's #<form>-sent or
 * #<form>-failed note so the form still works without JavaScript.
 */

interface Env {
  RESEND_API_KEY?: string;
  ENQUIRY_FROM?: string;
  ENQUIRY_TO?: string;
  TURNSTILE_SECRET_KEY?: string;
}

type Kind = "project" | "general" | "design";

const FIELDS: Record<Kind, [name: string, label: string][]> = {
  project: [
    ["name", "Name"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["organisation", "Organisation"],
    ["role", "Role"],
    ["sector", "Sector"],
    ["location", "Project location"],
    ["scale", "Scale"],
    ["stage", "Stage"],
    ["timing", "Timing"],
    ["route", "Way of working"],
    ["message", "About the project"],
  ],
  general: [
    ["name", "Name"],
    ["email", "Email"],
    ["organisation", "Organisation"],
    ["message", "Message"],
  ],
  design: [
    ["first_name", "First name"],
    ["last_name", "Last name"],
    ["email", "Email"],
    ["phone", "Phone"],
    ["address", "Street address"],
    ["suburb", "Suburb or town"],
    ["state", "State"],
    ["postcode", "Postcode"],
    ["timing", "Timing"],
    ["home", "Home"],
    ["selections", "Selections"],
    ["link", "Design link"],
    ["message", "Anything else"],
  ],
};

const REQUIRED: Record<Kind, string[]> = {
  project: ["name", "email", "role", "location"],
  general: ["name", "email", "message"],
  design: ["first_name", "email", "address", "suburb", "state", "home"],
};

const ANCHOR: Record<Kind, string> = { project: "enquiry", general: "message", design: "design" };

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }): Promise<Response> => {
  const wantsJson = (request.headers.get("accept") ?? "").includes("application/json");
  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return wantsJson ? Response.json({ ok: false, error: "Unreadable form" }, { status: 400 }) : new Response("Bad request", { status: 400 });
  }

  const form = data.get("form");
  const kind: Kind = form === "general" || form === "design" ? form : "project";
  const rawPage = String(data.get("page") ?? "/");
  const page = rawPage.startsWith("/") && !rawPage.startsWith("//") ? rawPage : "/";
  const reply = (ok: boolean, status: number, error?: string) =>
    wantsJson
      ? Response.json({ ok, error }, { status })
      : Response.redirect(new URL(`${page}#${ANCHOR[kind]}-${ok ? "sent" : "failed"}`, request.url).toString(), 303);

  // Bots fill the hidden field; tell them it worked and send nothing
  if (String(data.get("website") ?? "").trim()) return reply(true, 200);

  const values = Object.fromEntries(
    FIELDS[kind].map(([name]) => [name, String(data.get(name) ?? "").trim().slice(0, name === "message" || name === "selections" ? 5000 : name === "link" ? 2000 : 200)]),
  );
  if (kind === "design") values.name = [values.first_name, values.last_name].filter(Boolean).join(" ");
  if (REQUIRED[kind].some((name) => !values[name]) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return reply(false, 422, "Missing or invalid fields");
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: String(data.get("cf-turnstile-response") ?? ""),
        remoteip: request.headers.get("CF-Connecting-IP") ?? "",
      }),
    });
    const result = (await check.json().catch(() => ({}))) as { success?: boolean };
    if (!result.success) return reply(false, 403, "Failed the bot check");
  }

  if (!env.RESEND_API_KEY || !env.ENQUIRY_FROM) return reply(false, 503, "Email sending is not set up");

  const rows = FIELDS[kind].filter(([name]) => values[name]);
  const subject = `${{ project: "Project enquiry", general: "Website message", design: `Cloud Home design (${values.home})` }[kind]} from ${values.name}${values.organisation ? `, ${values.organisation}` : ""}`;
  const text = `${rows.map(([name, label]) => `${label}: ${values[name]}`).join("\n")}\n\nSent from ${new URL(page, request.url).toString()}`;
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([name, label]) =>
        `<tr><td style="color:#666;vertical-align:top;white-space:nowrap">${label}</td><td style="white-space:pre-wrap">${escapeHtml(values[name])}</td></tr>`,
    )
    .join("")}</table><p style="font-family:Arial,sans-serif;font-size:12px;color:#888">Sent from ${escapeHtml(new URL(page, request.url).toString())}</p>`;

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: env.ENQUIRY_FROM,
      to: [env.ENQUIRY_TO || "nigel@cloudmodular.com.au"],
      reply_to: values.email,
      subject,
      text,
      html,
    }),
  });
  if (!sent.ok) return reply(false, 502, "Email could not be sent");
  return reply(true, 200);
};
