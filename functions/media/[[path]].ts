/**
 * Cloudflare Pages function: GET and HEAD /media/*. Serves the site's videos (public/media/) with byte ranges.
 *
 * Pages answers static files in full and ignores Range requests. Chrome and Firefox play video from a full
 * response, but Safari asks for byte ranges and won't play a video whose server doesn't answer them with 206
 * Partial Content. This function fetches the static file and answers the requested range itself.
 */

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

async function serve(request: Request, env: Env, head: boolean): Promise<Response> {
  // The static file, asked for in full
  const asset = await env.ASSETS.fetch(new Request(request.url, { method: "GET" }));
  if (!asset.ok) return asset;

  const headers = new Headers(asset.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.delete("Content-Length");
  const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("Range")?.trim() ?? "");
  if (!range) return new Response(head ? null : asset.body, { status: 200, headers });

  const body = await asset.arrayBuffer();
  const size = body.byteLength;
  let start: number;
  let end: number;
  if (range[1] === "") {
    // bytes=-N: the last N bytes
    start = Math.max(0, size - Number(range[2]));
    end = size - 1;
  } else {
    start = Number(range[1]);
    end = range[2] === "" ? size - 1 : Math.min(Number(range[2]), size - 1);
  }
  if (start > end || start >= size) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });

  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(head ? null : body.slice(start, end + 1), { status: 206, headers });
}

export const onRequestGet = ({ request, env }: { request: Request; env: Env }) => serve(request, env, false);
export const onRequestHead = ({ request, env }: { request: Request; env: Env }) => serve(request, env, true);
