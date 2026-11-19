/**
 * Short, memorable URLs (for WhatsApp, Instagram bios, print, and people
 * typing the address) that permanently redirect to the real pages.
 *
 * Handled in src/server.ts, before the router, rather than in vercel.json:
 * the site is built by Nitro, which on Vercel writes its own
 * `.vercel/output/config.json`, so redirects defined here work the same in
 * every environment (local preview included) and are tested with the app.
 * Host canonicalisation is the exception: it lives in vercel.json so the
 * edge can answer it, and scripts/inject-canonical-host-routes.mjs copies
 * those rules into the generated config on a Vercel build.
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

/**
 * Old addresses that now 404, including paths Google has already crawled.
 * These are 301s (not the 308 used for the short marketing aliases above).
 * A Hindi prefix is kept when the target has a Hindi page. Privacy stays on
 * the English page, because that policy is English only.
 */
const LEGACY_PATHS: Record<string, string> = {
  "/fabrics": "/",
  "/fabric": "/",
  "/products": "/",
  "/product": "/",
  "/catalogue": "/",
  "/catalog": "/",
  "/shop": "/",
  "/collections": "/",
  "/collection": "/",
  "/wholesale": "/",
  "/suits": "/unstitched-suits-wholesale-surat",
  "/suit": "/unstitched-suits-wholesale-surat",
  "/unstitched-suits": "/unstitched-suits-wholesale-surat",
  "/unstitched-suit": "/unstitched-suits-wholesale-surat",
  "/about-us": "/about",
  "/aboutus": "/about",
  "/contact": "/",
  "/contact-us": "/",
  "/privacy": "/privacy-policy",
};

const LEGACY_ENGLISH_ONLY = new Set(["/privacy"]);

/** 308 is the permanent redirect that keeps the request method. */
export const SHORT_REDIRECT_STATUS = 308;

/** 301 for retired URLs, so Google can drop the old address. */
export const LEGACY_REDIRECT_STATUS = 301;

/** Target for a retired URL, or null. Keeps a Hindi prefix when the page exists in Hindi. */
export function legacyRedirectTarget(pathname: string): string | null {
  const clean = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  const hindi = clean.startsWith("/hi/");
  const key = hindi ? clean.slice(3) : clean;
  const target = LEGACY_PATHS[key];
  if (!target) return null;
  if (hindi && !LEGACY_ENGLISH_ONLY.has(key)) {
    return target === "/" ? "/hi" : `/hi${target}`;
  }
  return target;
}

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

/** 301 for a retired URL, or null. Keeps the query string. */
export function legacyRedirectResponse(url: URL): Response | null {
  const target = legacyRedirectTarget(url.pathname);
  if (!target) return null;
  return new Response(null, {
    status: LEGACY_REDIRECT_STATUS,
    headers: {
      location: `${target}${url.search}`,
      "cache-control": "public, max-age=86400",
    },
  });
}
