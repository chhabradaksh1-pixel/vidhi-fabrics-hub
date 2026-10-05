/**
 * Short, memorable URLs (for WhatsApp, Instagram bios, print, and people
 * typing the address) that permanently redirect to the real pages.
 *
 * Handled in src/server.ts, before the router, rather than in vercel.json:
 * the site is built by Nitro, which on Vercel writes its own
 * `.vercel/output/config.json`, so redirects defined here work the same in
 * every environment (local preview included) and are tested with the app.
 *
 * Every short path also works under /hi, going to the Hindi page. A trailing
 * slash is accepted, matching ignores case, and the query string (UTM tags,
 * gclid) is carried over unchanged so lead-source tracking still works.
 */
const SHORT_PATHS: Record<string, string> = {
  "/dress-material": "/dress-material-wholesale-surat",
  "/dress-materials": "/dress-material-wholesale-surat",
  "/sarees": "/polyester-sarees-wholesale-surat",
  "/saree": "/polyester-sarees-wholesale-surat",
  "/polyester-sarees": "/polyester-sarees-wholesale-surat",
  "/organza": "/organza-net-fabric-for-boutiques",
  "/net": "/organza-net-fabric-for-boutiques",
  "/organza-net": "/organza-net-fabric-for-boutiques",
  "/community": "/reseller-circle",
  "/circle": "/reseller-circle",
  "/resellers": "/saree-wholesale-for-resellers",
  "/reseller": "/saree-wholesale-for-resellers",
  "/diwali": "/diwali-karva-chauth-wholesale-surat",
  "/karva-chauth": "/diwali-karva-chauth-wholesale-surat",
};

/** 308 is the permanent redirect that keeps the request method. */
export const SHORT_REDIRECT_STATUS = 308;

/** Target path for a short URL (EN or /hi), or null if it isn't one. */
export function shortRedirectTarget(pathname: string): string | null {
  const clean = pathname.toLowerCase().replace(/\/+$/, "");
  if (clean.startsWith("/hi/")) {
    const target = SHORT_PATHS[clean.slice(3)];
    return target ? `/hi${target}` : null;
  }
  return SHORT_PATHS[clean] ?? null;
}

/** The redirect response for a short URL, or null. Keeps the query string. */
export function shortRedirectResponse(url: URL): Response | null {
  const target = shortRedirectTarget(url.pathname);
  if (!target) return null;
  return new Response(null, {
    status: SHORT_REDIRECT_STATUS,
    headers: {
      location: `${target}${url.search}`,
      "cache-control": "public, max-age=3600",
    },
  });
}
