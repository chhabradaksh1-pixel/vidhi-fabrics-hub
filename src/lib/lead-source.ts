/**
 * Lead-source tracking: which page a WhatsApp or form lead came from, and how
 * the visitor reached the site. Codes are documented in
 * docs/lead-source-legend.md; keep the two in step.
 *
 * Ref code format is PAGE-SOURCE, e.g. "SAR-G" or "HOMH-IG". It is appended
 * to every WhatsApp prefilled message as " (ref: SAR-G)" so the code arrives
 * in the chat and can be copied into HubSpot.
 *
 * Everything here that reads the browser (location, referrer,
 * sessionStorage) must only run on the client, after hydration — the server
 * cannot know the source, and computing it during render would make the
 * server and client HTML differ. Server-rendered state is source "D".
 */
import { WHATSAPP_NUMBER } from "@/content/whatsapp";

export type SourceCode = "G" | "GA" | "GB" | "IG" | "FB" | "WC" | "CT" | "D" | "O";

export type LeadContext = { page: string; source: SourceCode; ref: string };

export const DEFAULT_SOURCE: SourceCode = "D";

const STORE_KEY = "vidhi-lead-source";
const SOURCE_CODES: readonly SourceCode[] = ["G", "GA", "GB", "IG", "FB", "WC", "CT", "D", "O"];

/** Page code from a pathname. Hindi pages (/hi, /hi/...) get an "H" suffix. */
export function pageCode(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const hindi = clean === "/hi" || clean.startsWith("/hi/");
  const rest = hindi ? clean.slice(3) || "/" : clean;

  let code = "OTH";
  if (rest === "/") code = "HOM";
  else if (rest === "/polyester-sarees-wholesale-surat") code = "SAR";
  else if (rest === "/unstitched-suits-wholesale-surat") code = "USU";
  else if (rest === "/dress-material-wholesale-surat") code = "DRS";
  else if (rest === "/about") code = "ABT";
  else if (rest === "/blog") code = "BLI";
  else if (rest.startsWith("/blog/")) code = "BLG";
  else if (rest === "/saree-wholesale-for-resellers") code = "RES";
  else if (rest === "/organza-net-fabric-for-boutiques") code = "ORG";
  else if (rest === "/diwali-karva-chauth-wholesale-surat") code = "FES";
  else if (rest === "/reseller-circle") code = "COM";
  else if (rest === "/start-suit-saree-business-from-home") code = "GUI";
  else if (rest === "/how-to-buy-polyester-sarees-wholesale-surat") code = "PBG";
  else if (rest === "/how-to-buy-dress-material-unstitched-suits-wholesale-surat-online")
    code = "DMG";
  else if (rest === "/faq") code = "FAQ";

  return hindi ? `${code}H` : code;
}

/** Source code from UTM parameters (and gclid), or null if there are none. */
export function sourceFromParams(params: URLSearchParams): SourceCode | null {
  const source = (params.get("utm_source") ?? "").trim().toLowerCase();
  const medium = (params.get("utm_medium") ?? "").trim().toLowerCase();

  if (source) {
    if (["gbp", "gmb", "google_business", "googlebusiness", "business_profile"].includes(source))
      return "GB";
    if (source === "google")
      return ["cpc", "ppc", "paid", "paidsearch", "paid_search"].includes(medium) ? "GA" : "G";
    if (["instagram", "ig"].includes(source)) return "IG";
    if (["facebook", "fb", "meta"].includes(source)) return "FB";
    if (["whatsapp", "wa", "whatsapp_channel"].includes(source)) return "WC";
    if (["catalogue", "catalog", "pdf", "shared_link"].includes(source)) return "CT";
    return "O";
  }
  // Google Ads auto-tagging adds gclid without UTMs.
  if (params.get("gclid") || params.get("gbraid") || params.get("wbraid")) return "GA";
  return null;
}

/** Source code from document.referrer. Same-site and empty referrers are "D". */
export function sourceFromReferrer(referrer: string, ownHost?: string): SourceCode {
  if (!referrer) return "D";
  let host: string;
  try {
    host = new URL(referrer).hostname.toLowerCase();
  } catch {
    return "D";
  }
  if (host.endsWith("vidhifabrics.com") || (ownHost && host === ownHost.toLowerCase())) return "D";
  // google.com, google.co.in, www.google.*, and the Google app's
  // "com.google.android.googlequicksearchbox" referrer.
  if (/(^|\.)google\.[a-z.]+$/.test(host) || host.includes("googlequicksearchbox")) return "G";
  if (host === "instagram.com" || host.endsWith(".instagram.com")) return "IG";
  if (
    host === "facebook.com" ||
    host.endsWith(".facebook.com") ||
    host === "fb.com" ||
    host.endsWith(".fb.com")
  )
    return "FB";
  return "O";
}

function readStored(): SourceCode | null {
  try {
    const v = window.sessionStorage.getItem(STORE_KEY);
    return v && (SOURCE_CODES as readonly string[]).includes(v) ? (v as SourceCode) : null;
  } catch {
    return null;
  }
}

function store(code: SourceCode) {
  try {
    window.sessionStorage.setItem(STORE_KEY, code);
  } catch {
    /* private mode: the source just won't carry across pages */
  }
}

/**
 * Client only. UTMs on the current URL win and are saved for the session;
 * otherwise the session's saved source; otherwise the referrer of this first
 * page view (also saved, so it carries across internal navigation).
 */
export function resolveSource(): SourceCode {
  if (typeof window === "undefined") return DEFAULT_SOURCE;
  const fromParams = sourceFromParams(new URLSearchParams(window.location.search));
  if (fromParams) {
    store(fromParams);
    return fromParams;
  }
  const stored = readStored();
  if (stored) return stored;
  const fromReferrer = sourceFromReferrer(document.referrer, window.location.hostname);
  store(fromReferrer);
  return fromReferrer;
}

/**
 * Client only. A page that can't be identified by its path (the 404 page,
 * which renders at any URL) declares its code with `data-lead-page`.
 */
function pageOverride(): string | null {
  const value = document.querySelector<HTMLElement>("[data-lead-page]")?.dataset["leadPage"];
  return value && /^[A-Z]{2,5}$/.test(value) ? value : null;
}

/** Client only. Page, source and ref code for the current page. */
export function currentLeadContext(): LeadContext {
  if (typeof window === "undefined") {
    return { page: "OTH", source: DEFAULT_SOURCE, ref: `OTH-${DEFAULT_SOURCE}` };
  }
  const page = pageOverride() ?? pageCode(window.location.pathname);
  const source = resolveSource();
  return { page, source, ref: `${page}-${source}` };
}

/** PAGE-SOURCE, or a bare promo code such as SUIT or CIRCLE (no source suffix). */
const REF_SUFFIX = /\s*\(ref: [A-Z]{2,6}(?:-[A-Z]{1,2})?\)\s*$/;

/** A ref a single link may declare with `data-lead-ref`, instead of the page. */
export function isLinkRef(value: string): boolean {
  return /^[A-Z]{2,6}(?:-[A-Z]{1,2})?$/.test(value);
}

/** Appends " (ref: CODE)" to a message, replacing any ref already there. */
export function withRefCode(message: string, ref: string): string {
  return `${message.replace(REF_SUFFIX, "")} (ref: ${ref})`;
}

/** True for a link to this business's WhatsApp number. */
export function isBusinessWhatsAppUrl(href: string): boolean {
  try {
    const url = new URL(href);
    if (url.hostname === "wa.me") return url.pathname.replace(/\//g, "") === WHATSAPP_NUMBER;
    if (url.hostname === "api.whatsapp.com" || url.hostname === "web.whatsapp.com")
      return url.searchParams.get("phone") === WHATSAPP_NUMBER;
    return false;
  } catch {
    return false;
  }
}

/** Returns the WhatsApp URL with the ref code appended to its prefilled text. */
export function tagWhatsAppUrl(href: string, ref: string): string {
  const url = new URL(href);
  const text = url.searchParams.get("text") ?? "";
  url.searchParams.set("text", withRefCode(text, ref));
  // wa.me expects %20 rather than "+" for spaces.
  return url.toString().replace(/\+/g, "%20");
}
