import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

/** Visible strings added for the showroom. No hyphen or dash in these lines. */

export const SHOWROOM_HEADLINE =
  "Surat's trusted manufacturer of sarees and dress material, for 60 years";

export const SHOWROOM_HEADLINE_HI =
  "60 साल से सूरत में साड़ियाँ और ड्रेस मटेरियल बनाने वाला भरोसेमंद निर्माता";

export const HERO_IMAGE = {
  src: "/images/preview/hero-saree.webp",
  width: 1280,
  height: 720,
  alt: "Model in a saree from Vidhi Fabrics, Surat",
};

export const VIEW_RANGE: Record<Lang, string> = {
  en: "View the range",
  hi: "रेंज देखें",
  "hi-en": "Range dekhiye",
};

export const ENQUIRE: Record<Lang, string> = {
  en: "Enquire on WhatsApp",
  hi: "व्हाट्सएप पर पूछें",
  "hi-en": "WhatsApp par poochiye",
};

export const CHAT: Record<Lang, string> = {
  en: "Chat on WhatsApp",
  hi: "व्हाट्सएप पर चैट करें",
  "hi-en": "WhatsApp par chat karein",
};

const CHAT_MESSAGE: Record<Lang, string> = {
  en: "Hi Vidhi Fabrics, I would like to enquire.",
  hi: "नमस्ते विधि फैब्रिक्स, मैं पूछताछ करना चाहता हूँ।",
  "hi-en": "Hi Vidhi Fabrics, main poochna chahta hoon.",
};

export function chatLink(lang: Lang) {
  return whatsAppUrl(CHAT_MESSAGE[lang]);
}

export function designLink(lang: Lang, code: string) {
  const message: Record<Lang, string> = {
    en: `Hi Vidhi Fabrics, I would like to enquire about design ${code}.`,
    hi: `नमस्ते विधि फैब्रिक्स, मैं डिज़ाइन ${code} के बारे में पूछताछ करना चाहता हूँ।`,
    "hi-en": `Hi Vidhi Fabrics, main design ${code} ke baare mein poochna chahta hoon.`,
  };
  return whatsAppUrl(message[lang]);
}

export type ShowroomTile = {
  title: Record<Lang, string>;
  code: string;
  note: Record<Lang, string>;
  /** Visible link on the card. The design code stays in the WhatsApp message. */
  pageLink?: Record<Lang, string>;
  href: string;
  image: { src: string; width: number; height: number; focus: string; alt: string };
};

const suits = "/images/preview/collection-suits.webp";
const dress = "/images/preview/collection-dress-material-mobile.webp";
const saree = "/images/preview/hero-saree.webp";

export const SHOWROOM_TILES: ShowroomTile[] = [
  {
    title: { en: "Unstitched Suits", hi: "अनस्टिच्ड सूट", "hi-en": "Unstitched suits" },
    code: "US01",
    note: {
      en: "A first design from the suit range.",
      hi: "सूट रेंज का एक डिज़ाइन।",
      "hi-en": "Suit range ka ek design.",
    },
    href: "/dress-material-wholesale-surat",
    image: {
      src: suits,
      width: 1280,
      height: 720,
      focus: "center",
      alt: "Model in an unstitched suit from Vidhi Fabrics",
    },
  },
  {
    title: { en: "Dress Material", hi: "ड्रेस मटेरियल", "hi-en": "Dress material" },
    code: "DM01",
    note: {
      en: "Top, bottom and dupatta, shown as a set.",
      hi: "टॉप, बॉटम और दुपट्टा, एक सेट में।",
      "hi-en": "Top, bottom aur dupatta, ek set mein.",
    },
    pageLink: {
      en: "dress material wholesale in Surat",
      hi: "सूरत में ड्रेस मटेरियल होलसेल",
      "hi-en": "dress material wholesale in Surat",
    },
    href: "/dress-material-wholesale-surat",
    image: {
      src: dress,
      width: 540,
      height: 720,
      focus: "right center",
      alt: "Model in dress material from Vidhi Fabrics",
    },
  },
  {
    title: { en: "Polyester Sarees", hi: "पॉलिएस्टर साड़ियाँ", "hi-en": "Polyester sarees" },
    code: "PS01",
    note: {
      en: "Daily wear and festive sarees from the Surat range.",
      hi: "सूरत की रोज़मर्रा और त्योहारी साड़ियाँ।",
      "hi-en": "Surat ki rozmarra aur tyohari sarees.",
    },
    href: "/polyester-sarees-wholesale-surat",
    image: {
      src: saree,
      width: 1280,
      height: 720,
      focus: "right center",
      alt: "Model in a polyester saree from Vidhi Fabrics",
    },
  },
];

export type ShowroomDesign = {
  code: string;
  image: { src: string; width: number; height: number; focus: string };
  alt: string;
};

export const SHOWROOM_DESIGNS: ShowroomDesign[] = [
  { code: "US01", image: { src: suits, width: 1280, height: 720, focus: "center" }, alt: "Unstitched suit design US01" },
  { code: "US02", image: { src: suits, width: 1280, height: 720, focus: "46% center" }, alt: "Unstitched suit design US02" },
  { code: "US03", image: { src: suits, width: 1280, height: 720, focus: "54% center" }, alt: "Unstitched suit design US03" },
  { code: "US04", image: { src: suits, width: 1280, height: 720, focus: "center" }, alt: "Unstitched suit design US04" },
  { code: "DM01", image: { src: dress, width: 1280, height: 720, focus: "right center" }, alt: "Dress material design DM01" },
  { code: "DM02", image: { src: dress, width: 1280, height: 720, focus: "72% center" }, alt: "Dress material design DM02" },
];

export const COLLECTION_INTRO: Record<Lang, string> = {
  en: "Ask about any design on WhatsApp.",
  hi: "किसी भी डिज़ाइन के बारे में व्हाट्सएप पर पूछिए।",
  "hi-en": "Kisi bhi design ke baare mein WhatsApp par poochiye.",
};
