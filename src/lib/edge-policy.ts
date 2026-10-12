/**
 * Request-level policies applied in src/server.ts around the router.
 *
 * 1. The old Lovable copy. `vidhi-fabrics-hub.lovable.app` served a stale build
 *    with no canonical and no noindex: a live, indexable duplicate of the
 *    site. When that host is rebuilt from this code it 301s every path to the
 *    same path on www.vidhifabrics.com. Lovable's editor preview hosts
 *    (`id-preview--….lovable.app`, `….lovableproject.com`) must keep working
 *    for the owner, so they are not redirected; they get `X-Robots-Tag:
 *    noindex` instead.
 *
 * 2. The canonical host. `http://www.vidhifabrics.com`, `http://vidhifabrics.com`
 *    and `https://vidhifabrics.com` 301 straight to `https://www.vidhifabrics.com`
 *    on the same path (query kept). A short alias such as `/sarees` is resolved
 *    in that same response, so the non-canonical host does not add a second hop.
 *    Vercel's CDN still upgrades bare HTTP to HTTPS with its own 308 before any
 *    project rule or this function runs, and that upgrade cannot be turned off.
 *    The edge rules in vercel.json (copied into Nitro's output config on a
 *    Vercel build) are what production actually hits; this function is the same
 *    rule for local preview and for any request that reaches the server.
 *
 * 3. Edge caching for page HTML. Pages are the same for every visitor (the lead
 *    source and the Hinglish toggle are client-side), so a successful HTML
 *    response can be held at Vercel's edge for an hour and served stale for a
 *    day while it revalidates. A new deployment purges Vercel's edge cache, so
 *    a deploy is never hidden behind it. Browsers still revalidate every time
 *    (max-age=0); `s-maxage` is honoured by the CDN only. Only 200 HTML
 *    responses to GET/HEAD without cookies qualify: 404s, 500s, redirects and
 *    the /api routes keep their own headers.
 */

import { shortRedirectTarget } from "./short-redirects";

export const CANONICAL_ORIGIN = "https://www.vidhifabrics.com";
const CANONICAL_HOST = "www.vidhifabrics.com";
const APEX_HOST = "vidhifabrics.com";

/** The published Lovable URL of this project (see README). */
const LOVABLE_PUBLISHED_HOST = "vidhi-fabrics-hub.lovable.app";

export const HTML_CACHE_CONTROL = "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";

function isLovablePreviewHost(host: string) {
  return host.endsWith(".lovable.app") || host.endsWith(".lovableproject.com");
}

/** 301 from the published Lovable copy to the canonical site, else null. */
export function lovableRedirect(url: URL): Response | null {
  if (url.hostname.toLowerCase() !== LOVABLE_PUBLISHED_HOST) return null;
  return new Response(null, {
    status: 301,
    headers: {
      location: `${CANONICAL_ORIGIN}${url.pathname}${url.search}`,
      "cache-control": "public, max-age=86400",
    },
  });
}

function forwardedFirst(value: string | null): string {
  return value?.split(",")[0]?.trim().toLowerCase() ?? "";
}

/** Public hostname, without a port. Prefers the forwarded host over the internal URL. */
function requestHostname(request: Request, url: URL): string {
  const raw =
    forwardedFirst(request.headers.get("x-forwarded-host")) ||
    forwardedFirst(request.headers.get("host")) ||
    url.hostname.toLowerCase();
  return raw.replace(/:\d+$/, "");
}

function requestProto(request: Request, url: URL): string {
  return (
    forwardedFirst(request.headers.get("x-forwarded-proto")) ||
    url.protocol.replace(":", "").toLowerCase()
  );
}

function isLocalHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname === "::1"
  );
}

/**
 * 301 to the canonical origin, or null when this request is already on it
 * (or is a local / preview host we must not bounce).
 */
export function canonicalHostRedirect(request: Request, url: URL): Response | null {
  const hostname = requestHostname(request, url);
  if (isLocalHost(hostname) || isLovablePreviewHost(hostname)) return null;
  if (hostname !== APEX_HOST && hostname !== CANONICAL_HOST) return null;
  if (hostname === CANONICAL_HOST && requestProto(request, url) === "https") return null;

  const path = shortRedirectTarget(url.pathname) ?? url.pathname;
  return new Response(null, {
    status: 301,
    headers: {
      location: `${CANONICAL_ORIGIN}${path}${url.search}`,
      "cache-control": "public, max-age=86400",
    },
  });
}

/** Adds noindex on preview hosts and the edge-cache header on cacheable pages. */
export function applyEdgePolicy(request: Request, url: URL, response: Response): Response {
  const preview = isLovablePreviewHost(url.hostname.toLowerCase());
  const cacheable =
    !preview &&
    (request.method === "GET" || request.method === "HEAD") &&
    response.status === 200 &&
    (response.headers.get("content-type") ?? "").includes("text/html") &&
    !response.headers.has("set-cookie") &&
    !url.pathname.startsWith("/api/");

  if (!preview && !cacheable) return response;

  const headers = new Headers(response.headers);
  if (preview) headers.set("x-robots-tag", "noindex, nofollow");
  if (cacheable) headers.set("cache-control", HTML_CACHE_CONTROL);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
