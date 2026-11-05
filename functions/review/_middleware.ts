/**
 * Cloudflare Pages middleware for /review/: the fact review is only for the team. Opening /review/?key=<REVIEW_KEY>
 * sets a cookie (also read by /api/review) and drops the key from the address; without the cookie the page is a
 * 404. With no REVIEW_KEY set, the page stays closed.
 */

import { reviewCookie } from "../api/review";

interface Context {
  request: Request;
  env: { REVIEW_KEY?: string };
  next: () => Promise<Response>;
}

const notFound = () => new Response("Not found", { status: 404, headers: { "cache-control": "no-store" } });

export async function onRequest({ request, env, next }: Context) {
  const key = env.REVIEW_KEY;
  if (!key) return notFound();

  const url = new URL(request.url);
  if (url.searchParams.get("key") === key) {
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

  if (reviewCookie(request) !== key) return notFound();

  const response = await next();
  const headers = new Headers(response.headers);
  headers.set("cache-control", "no-store");
  headers.set("x-robots-tag", "noindex, nofollow");
  return new Response(response.body, { status: response.status, headers });
}
