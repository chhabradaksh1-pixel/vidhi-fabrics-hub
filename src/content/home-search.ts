import type { Lang } from "@/content/translations";

/** Example lines the homepage search types while the box is empty. */
export const SEARCH_LINES = [
  "दिवाली के लिए georgette sarees at rupees 2000",
  "best collection of करवा चौथ",
  "unstitched suits for boutique",
  "नए business शुरू करने के लिए starter pack",
  "शादी के लिए heavy dress material",
  "daily wear polyester sarees",
  "printed suits for resellers",
  "embroidery suits for boutique",
] as const;

/** Shown only after a search is submitted. Hindi and Hinglish are unreviewed. */
export const SEARCH_NOTE: Record<Lang, string> = {
  en: "Our full online catalogue is coming soon. Till then, send us your search on WhatsApp.",
  hi: "हमारा पूरा ऑनलाइन कैटलॉग जल्द आ रहा है। तब तक अपनी खोज व्हाट्सएप पर भेजिए।",
  "hi-en": "Hamara poora online catalogue jaldi aa raha hai. Tab tak apni search WhatsApp par bhejiye.",
};

export const SEARCH_SEND: Record<Lang, string> = {
  en: "Send on WhatsApp",
  hi: "व्हाट्सएप पर भेजें",
  "hi-en": "WhatsApp par bhejiye",
};

export const SEARCH_LABEL: Record<Lang, string> = {
  en: "Search designs",
  hi: "डिज़ाइन खोजें",
  "hi-en": "Design dhoondhiye",
};

export const SEARCH_OPEN: Record<Lang, string> = {
  en: "Search",
  hi: "खोज",
  "hi-en": "Search",
};

export function searchMessage(lang: Lang, query: string): string {
  if (lang === "hi") return `नमस्ते विधि फैब्रिक्स, मैं यह खोज रहा हूँ: ${query}`;
  if (lang === "hi-en") return `Hi Vidhi Fabrics, main yeh dhoondh raha hoon: ${query}`;
  return `Hi Vidhi Fabrics, I am looking for ${query}.`;
}
