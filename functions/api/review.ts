/**
 * Cloudflare Pages function: /api/review. Stores the team's feedback on the fact review (/review/) in KV, one key
 * per card ("item:<card id>", the cards in src/data/review.ts), each holding the card's entries in order.
 *
 *   GET   every item's entries: { items: { [id]: Entry[] } }
 *   POST  JSON { item, name, status?, comment? } adds an answer; { item, name, action: "done" | "reopen", comment? }
 *         marks the item fixed on the site, or opens it again
 *
 * Settings (Cloudflare Pages > Settings):
 *   REVIEW_KEY  secret; the same key opens /review/ (functions/review/_middleware.ts) and this API
 *   REVIEW      KV namespace binding
 *
 * Access: the review_key cookie set by /review/?key=…, or an x-review-key header (for pulling feedback with curl).
 */

interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  list(options: { prefix: string; cursor?: string }): Promise<{ keys: { name: string }[]; list_complete: boolean; cursor?: string }>;
}

interface Env {
  REVIEW_KEY?: string;
  REVIEW?: KV;
}

interface Context {
  request: Request;
  env: Env;
}

interface Entry {
  at: string;
  name: string;
  status?: string;
  action?: string;
  comment?: string;
}

const STATUSES = ["confirmed", "change", "remove", "question"];
const ACTIONS = ["done", "reopen"];

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export function reviewCookie(request: Request): string | undefined {
  const cookie = request.headers.get("cookie") ?? "";
  const value = cookie.match(/(?:^|;\s*)review_key=([^;]+)/)?.[1];
  return value === undefined ? undefined : decodeURIComponent(value);
}

function allowed({ request, env }: Context) {
  if (!env.REVIEW_KEY) return false;
  const given = request.headers.get("x-review-key") ?? reviewCookie(request);
  return given === env.REVIEW_KEY;
}

export async function onRequestGet(context: Context) {
  if (!allowed(context)) return json({ error: "Not found" }, 404);
  const kv = context.env.REVIEW;
  if (!kv) return json({ error: "Feedback storage is not set up yet." }, 503);

  const names: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await kv.list({ prefix: "item:", cursor });
    names.push(...page.keys.map((key) => key.name));
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  const items: Record<string, Entry[]> = {};
  await Promise.all(
    names.map(async (name) => {
      const value = await kv.get(name);
      if (value) items[name.slice(5)] = JSON.parse(value);
    }),
  );
  return json({ items });
}

export async function onRequestPost(context: Context) {
  if (!allowed(context)) return json({ error: "Not found" }, 404);
  const kv = context.env.REVIEW;
  if (!kv) return json({ error: "Feedback storage is not set up yet." }, 503);

  let body: Record<string, unknown>;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: "Send JSON." }, 400);
  }

  const item = String(body.item ?? "");
  const name = String(body.name ?? "").trim().slice(0, 80);
  const status = body.status ? String(body.status) : undefined;
  const action = body.action ? String(body.action) : undefined;
  const comment = String(body.comment ?? "").trim().slice(0, 4000) || undefined;

  if (!/^[a-z0-9-]{1,48}$/.test(item)) return json({ error: "Unknown card." }, 400);
  if (!name) return json({ error: "Add your name first." }, 400);
  if (status && !STATUSES.includes(status)) return json({ error: "Unknown answer." }, 400);
  if (action && !ACTIONS.includes(action)) return json({ error: "Unknown action." }, 400);
  if (!status && !action && !comment) return json({ error: "Choose an answer or add a comment." }, 400);

  const key = `item:${item}`;
  const entries: Entry[] = JSON.parse((await kv.get(key)) ?? "[]");
  entries.push({ at: new Date().toISOString(), name, ...(status && { status }), ...(action && { action }), ...(comment && { comment }) });
  await kv.put(key, JSON.stringify(entries));
  return json({ item, entries });
}
