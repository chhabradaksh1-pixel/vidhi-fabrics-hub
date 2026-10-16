import { whatsAppUrl } from "@/content/whatsapp";

/**
 * English copy for the design mockup only. Visible strings must not contain
 * a hyphen or a dash. Do not name cotton, silk, linen or jacquard here.
 */

const heroSaree = "/images/preview/hero-saree.webp";
const suitShot = "/images/preview/collection-suits.webp";
const dressShot = "/images/preview/collection-dress-material.webp";

export const PREVIEW_HOME = "/preview/home";
export const PREVIEW_SUITS = "/preview/collection/unstitched-suits";

export const ENQUIRE = "Enquire on WhatsApp";
export const CHAT = "Chat on WhatsApp";
export const PLACEHOLDER = "Placeholder";

export const HERO_HEADLINE =
  "Surat's trusted manufacturer of sarees and dress material, for 60 years";

export const HERO_HEADLINE_HI =
  "60 साल से सूरत में साड़ियाँ और ड्रेस मटेरियल बनाने वाला भरोसेमंद निर्माता";

export const HERO_BODY =
  "Manufacturer and wholesaler in Surat. Tell us what you want to see.";

export const HERO_ALT = "Placeholder photograph of a model in a saree";

export const HERO_IMAGE = {
  src: heroSaree,
  width: 1280,
  height: 720,
};

type Shot = {
  src: string;
  width: number;
  height: number;
  /** CSS object-position. Landscape files are cropped into portrait tiles. */
  focus: string;
};

export type PreviewDesign = {
  code: string;
  image: Shot;
  alt: string;
};

function enquire(code: string) {
  return whatsAppUrl(`Hi Vidhi Fabrics, I would like to enquire about design ${code}.`);
}

export const HERO_LINK = whatsAppUrl(
  "Hi Vidhi Fabrics, I would like to enquire about wholesale unstitched suits and sarees.",
);

export const CHAT_LINK = whatsAppUrl("Hi Vidhi Fabrics, I would like to enquire.");

export const TILES: {
  title: string;
  code: string;
  note: string;
  href: string | null;
  image: Shot;
  alt: string;
}[] = [
  {
    title: "Unstitched Suits",
    code: "US01",
    note: "A first design from the suit range.",
    href: PREVIEW_SUITS,
    image: { src: suitShot, width: 1280, height: 720, focus: "center" },
    alt: "Placeholder photograph of a model in an unstitched suit",
  },
  {
    title: "Dress Material",
    code: "DM01",
    note: "Top, bottom and dupatta, shown as a set.",
    href: null,
    image: { src: dressShot, width: 1280, height: 720, focus: "right center" },
    alt: "Placeholder photograph of a model in dress material",
  },
  {
    title: "Polyester Sarees",
    code: "PS01",
    note: "Daily wear and festive sarees from the Surat range.",
    href: null,
    image: { src: heroSaree, width: 1280, height: 720, focus: "right center" },
    alt: "Placeholder photograph of a model in a saree",
  },
];

const SUIT_SHOTS: Shot[] = [
  { src: suitShot, width: 1280, height: 720, focus: "center" },
  { src: suitShot, width: 1280, height: 720, focus: "46% center" },
  { src: suitShot, width: 1280, height: 720, focus: "54% center" },
  { src: suitShot, width: 1280, height: 720, focus: "center 42%" },
  { src: suitShot, width: 1280, height: 720, focus: "center 58%" },
  { src: suitShot, width: 1280, height: 720, focus: "42% 46%" },
  { src: suitShot, width: 1280, height: 720, focus: "58% 46%" },
  { src: suitShot, width: 1280, height: 720, focus: "50% 36%" },
];

export const SUIT_DESIGNS: PreviewDesign[] = SUIT_SHOTS.map((image, index) => {
  const code = `US${String(index + 1).padStart(2, "0")}`;
  return {
    code,
    image,
    alt: `Placeholder photograph for design ${code}`,
  };
});

export function designLink(code: string) {
  return enquire(code);
}

export const TRUST = [
  "GSTIN to be added",
  "60 years in the trade",
  "2,400+ SKUs",
  "Reviews to be added",
] as const;

export const COLLECTION_INTRO =
  "Ask about any design on WhatsApp. The photographs are placeholders.";
