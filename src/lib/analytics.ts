/**
 * Lead events for GA4 (optional) and Vercel Analytics.
 *
 * GA4 is only active when VITE_GA4_ID is set at build time (a Vercel
 * environment variable). Without it nothing is configured and no GA4 events
 * are sent. gtag.js itself is already on the page for the Google Ads tag in
 * __root.tsx, so GA4 adds one `gtag('config', ...)` line, not another script.
 */
import { track } from "@vercel/analytics";

const RAW_GA4_ID = import.meta.env.VITE_GA4_ID?.trim() ?? "";

/** The measurement ID, only if it looks like one ("G-XXXXXXX"). */
export const GA4_ID: string | undefined = /^G-[A-Z0-9]{4,20}$/.test(RAW_GA4_ID)
  ? RAW_GA4_ID
  : undefined;

export type LeadEventParams = {
  page: string;
  source: string;
  ref_code: string;
  /** Set on form_submit when the enquiry form includes "How did you find us?". */
  found_via?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Homepage smart search. Queued on the existing gtag stub until the tag loads. */
export function trackSearchSubmit(query: string) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "search_submit", { query, search_term: query });
    }
  } catch {
    /* analytics must never break a search */
  }
}

export function trackLeadEvent(name: "whatsapp_click" | "form_submit", params: LeadEventParams) {
  try {
    if (GA4_ID && typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", name, { ...params, send_to: GA4_ID });
    }
  } catch {
    /* analytics must never break a click */
  }
  try {
    track(name, params);
  } catch {
    /* ignore */
  }
}
