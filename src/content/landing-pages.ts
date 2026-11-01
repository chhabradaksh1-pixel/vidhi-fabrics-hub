/**
 * Standalone pages (the wholesale landing pages and the About page) that exist
 * in both English and Hindi. Internal links
 * to these paths are rewritten to the `/hi` version when the reader is on a
 * Hindi page (footer and journal inline links), the same way blog links are.
 */
export const LANDING_PAGES_WITH_HINDI: readonly string[] = [
  "/polyester-sarees-wholesale-surat",
  "/unstitched-suits-wholesale-surat",
  "/dress-material-wholesale-surat",
  "/about",
  "/saree-wholesale-for-resellers",
  "/organza-net-fabric-for-boutiques",
  "/diwali-karva-chauth-wholesale-surat",
  "/reseller-circle",
  "/start-suit-saree-business-from-home",
  "/how-to-buy-polyester-sarees-wholesale-surat",
  "/how-to-buy-dress-material-unstitched-suits-wholesale-surat-online",
  "/faq",
];

export function hasHindiVersion(href: string) {
  return LANDING_PAGES_WITH_HINDI.includes(href);
}
