import type { Lang } from "@/content/translations";

/**
 * Temporary push for unstitched suits and dress material (about 10–20 days).
 * Set this to false to remove the site-wide ticker, the catalogue pin, the
 * suit-catalogue button, and the saree-page line. Nothing else on the site
 * depends on it.
 *
 * Hindi and Hinglish here were written for review and have not been checked
 * by a native speaker.
 */
export const PROMO_SUITS = true;

/** Whole ref, not PAGE-SOURCE. The lead tracker copies this onto the link. */
export const PROMO_SUIT_REF = "SUIT";

const suitMessage: Record<Lang, string> = {
  en: "Hi Vidhi Fabrics, please share the new unstitched suit and dress material catalogue.",
  hi: "नमस्ते विधि फैब्रिक्स, कृपया नए अनस्टिच्ड सूट और ड्रेस मटीरियल का कैटलॉग भेजिए।",
  "hi-en": "Hi Vidhi Fabrics, kripya naye unstitched suit aur dress material ka catalogue bhejiye.",
};

const sareeMessage: Record<Lang, string> = {
  en: "Hi Vidhi Fabrics, please tell me which sarees are in stock.",
  hi: "नमस्ते विधि फैब्रिक्स, कृपया बताइए कि कौन सी साड़ियाँ स्टॉक में हैं।",
  "hi-en": "Hi Vidhi Fabrics, kripya bataiye kaun si sarees stock mein hain.",
};

export const PROMO_COPY: {
  banner: Record<Lang, string>;
  suitCta: Record<Lang, string>;
  suitMessage: Record<Lang, string>;
  sareeLine: Record<Lang, string>;
  sareeMessage: Record<Lang, string>;
} = {
  banner: {
    en: "New unstitched suit & dress material designs — ask for the catalogue on WhatsApp",
    hi: "नए अनस्टिच्ड सूट और ड्रेस मटीरियल के डिज़ाइन — कैटलॉग व्हाट्सएप पर माँगिए",
    "hi-en": "Naye unstitched suit aur dress material designs — catalogue WhatsApp par maangiye",
  },
  suitCta: {
    en: "Get the suit catalogue on WhatsApp",
    hi: "सूट का कैटलॉग व्हाट्सएप पर पाइए",
    "hi-en": "Suit ka catalogue WhatsApp par paaiye",
  },
  suitMessage,
  sareeLine: {
    en: "New saree collection arriving soon — ask us what's in stock",
    hi: "नई साड़ी कलेक्शन जल्द आ रही है — स्टॉक में क्या है, हमसे पूछिए",
    "hi-en": "Nayi saree collection jald aa rahi hai — stock mein kya hai, humse poochiye",
  },
  sareeMessage,
};
