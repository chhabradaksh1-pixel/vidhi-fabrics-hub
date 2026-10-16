import beadedOrganza from "@/assets/fabric-beaded-organza.webp";
import denimCanvas from "@/assets/fabric-denim-canvas.webp";
import performanceTwill from "@/assets/fabric-performance-twill.webp";
import specSamples from "@/assets/spec-samples.webp";
import swatchStack from "@/assets/swatch-stack.webp";
import weavingLoom from "@/assets/weaving-loom-poster.webp";
import { whatsAppUrl } from "@/content/whatsapp";

/**
 * English copy for the design mockup only. Visible strings must not contain
 * a hyphen or a dash. Do not name cotton, silk, linen or jacquard here.
 */

const suitModel = "/images/catalogue/suit-model.webp";
const suitIvory = "/images/catalogue/suit-ivory-maroon.webp";

export const PREVIEW_HOME = "/preview/home";
export const PREVIEW_SUITS = "/preview/collection/unstitched-suits";

export const ENQUIRE = "Enquire on WhatsApp";
export const CHAT = "Chat on WhatsApp";
export const PLACEHOLDER = "Placeholder";

export const HERO_HEADLINE =
  "Wholesale unstitched suits and sarees for resellers, direct from Surat";

export const HERO_BODY =
  "Manufacturer and wholesaler in Surat. Tell us what you want to see.";

export const HERO_ALT = "Placeholder photograph of a model in an unstitched suit";

type Shot = {
  src: string;
  width: number;
  height: number;
  /** Keep the face in frame on portrait photographs. */
  focus: "top" | "center";
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
    image: { src: suitModel, width: 720, height: 993, focus: "top" },
    alt: "Placeholder photograph for design US01",
  },
  {
    title: "Dress Material",
    code: "DM01",
    note: "Top, bottom and dupatta, shown as a set.",
    href: null,
    image: { src: suitIvory, width: 720, height: 1018, focus: "center" },
    alt: "Placeholder photograph for design DM01",
  },
  {
    title: "Polyester Sarees",
    code: "PS01",
    note: "Daily wear and festive sarees from the Surat range.",
    href: null,
    image: { src: swatchStack, width: 1024, height: 768, focus: "center" },
    alt: "Placeholder photograph for design PS01",
  },
];

const SUIT_SHOTS: Shot[] = [
  { src: suitModel, width: 720, height: 993, focus: "top" },
  { src: suitIvory, width: 720, height: 1018, focus: "center" },
  { src: swatchStack, width: 1024, height: 768, focus: "center" },
  { src: specSamples, width: 1024, height: 768, focus: "center" },
  { src: performanceTwill, width: 800, height: 600, focus: "center" },
  { src: beadedOrganza, width: 800, height: 600, focus: "center" },
  { src: denimCanvas, width: 800, height: 600, focus: "center" },
  { src: weavingLoom, width: 1280, height: 676, focus: "center" },
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
