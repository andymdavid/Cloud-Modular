/**
 * Cloudflare Pages middleware for /review/: the fact review is only for the team. Opening /review/?key=<REVIEW_KEY>
 * (or entering the key in the box shown without it) sets a cookie (also read by /api/review) and drops the key from
 * the address. With no REVIEW_KEY set, the page stays closed.
 */

import { reviewCookie } from "../api/review";

interface Context {
  request: Request;
  env: { REVIEW_KEY?: string };
  next: () => Promise<Response>;
}

const notFound = () => new Response("Not found", { status: 404, headers: { "cache-control": "no-store" } });

// Shown without a valid key: a link cut short at the "?" still gets the team in
const keyForm = (wrong: boolean) =>
  new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Fact review</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f4f1ea;color:#1d1d1b;font:16px/1.5 system-ui,sans-serif}form{width:min(22rem,100% - 32px);display:grid;gap:.75rem}h1{font-size:1.25rem;font-weight:500;margin:0}p{margin:0;color:#5c5a55}input,button{font:inherit;padding:.7rem .9rem;border:1px solid #1d1d1b;border-radius:0}button{background:#1d1d1b;color:#f4f1ea;cursor:pointer}.wrong{color:#a0392b}</style></head>
<body><form method="get"><h1>Cloud Modular fact review</h1><p>Enter the review key you were sent.</p>${wrong ? `<p class="wrong">That key didn't match. Check it and try again.</p>` : ""}<input name="key" autocomplete="off" autofocus required aria-label="Review key"><button>Open the review</button></form></body></html>`,
    { status: 401, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" } },
  );

export async function onRequest({ request, env, next }: Context) {
  const key = env.REVIEW_KEY;
  if (!key) return notFound();

  const url = new URL(request.url);
  const given = url.searchParams.get("key");
  if (given !== null) {
    // Copied links can pick up spaces, quotes or a trailing full stop
    if (given.replace(/[^A-Za-z0-9_-]/g, "") !== key) return keyForm(true);
    url.searchParams.delete("key");
    return new Response(null, {
      status: 302,
      headers: {
        location: `${url.pathname}${url.search}${url.hash}`,
        "set-cookie": `review_key=${encodeURIComponent(key)}; Path=/; Max-Age=7776000; HttpOnly; Secure; SameSite=Lax`,
        "cache-control": "no-store",
      },
    });
  }

  if (reviewCookie(request) !== key) return keyForm(false);

  const response = await next();
  const headers = new Headers(response.headers);
  headers.set("cache-control", "no-store");
  headers.set("x-robots-tag", "noindex, nofollow");
  return new Response(response.body, { status: response.status, headers });
}
