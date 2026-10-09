import cottonLinen from "@/assets/fabric-cotton-linen.webp";
import katanJacquard from "@/assets/fabric-katan-jacquard.webp";
import linenShirting from "@/assets/fabric-linen-shirting.webp";
import performanceTwill from "@/assets/fabric-performance-twill.webp";
import beadedOrganza from "@/assets/fabric-beaded-organza.webp";
import denimCanvas from "@/assets/fabric-denim-canvas.webp";

import type { Fabric, FabricCategory, Lang } from "./translations";

/**
 * Homepage range cards, shown above the cloth examples. Cotton, silk, linen
 * and the other SKU cards stay in `FABRICS` and are not edited here.
 * "sourcing" is organza and net: it is not a material facet, so it shows
 * only when no filter is selected.
 */
export type CatalogueRange = {
  id: string;
  category: Exclude<FabricCategory, "all"> | "sourcing";
  name: Record<Lang, string>;
  tag: Record<Lang, string>;
  body: Record<Lang, string>;
  pageHref: string;
  linkLabel: Record<Lang, string>;
  whatsAppMessage?: Record<Lang, string>;
  /** Product photograph shown at the top of this range card. */
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
};

export const CATALOGUE_RANGES: CatalogueRange[] = [
  {
    id: "dress-material",
    category: "polyester",
    name: {
      en: "Unstitched suits and dress material",
      hi: "अनस्टिच्ड सूट और ड्रेस मटीरियल",
      "hi-en": "Unstitched suits aur dress material",
    },
    tag: {
      en: "Polyester · Dress material",
      hi: "पॉलिएस्टर · ड्रेस मटीरियल",
      "hi-en": "Polyester · Dress material",
    },
    body: {
      en: "Festive and daily-wear unstitched suits, made in Surat for boutiques and resellers.",
      hi: "त्योहारी और रोज़मर्रा के अनस्टिच्ड सूट, सूरत में बने, बुटीक और रीसेलर के लिए।",
      "hi-en":
        "Festive aur daily-wear unstitched suits, Surat mein bane, boutiques aur resellers ke liye.",
    },
    pageHref: "/dress-material-wholesale-surat",
    linkLabel: {
      en: "Dress material wholesale",
      hi: "ड्रेस मटीरियल होलसेल",
      "hi-en": "Dress material wholesale",
    },
    image: {
      src: "/images/catalogue/suit-ivory-maroon.webp",
      width: 720,
      height: 1018,
      alt: "Ivory and maroon embroidered unstitched suit set, Vidhi Fabrics Surat",
    },
  },
  {
    id: "polyester-sarees",
    category: "polyester",
    name: {
      en: "Polyester and satin crepe sarees",
      hi: "पॉलिएस्टर और सैटिन क्रेप साड़ियाँ",
      "hi-en": "Polyester aur satin crepe sarees",
    },
    tag: {
      en: "Polyester · Saree",
      hi: "पॉलिएस्टर · साड़ी",
      "hi-en": "Polyester · Saree",
    },
    body: {
      en: "Our own polyester and satin crepe sarees, ready for wedding and festive season.",
      hi: "हमारी अपनी पॉलिएस्टर और सैटिन क्रेप साड़ियाँ, शादी और त्योहार के सीज़न के लिए तैयार।",
      "hi-en":
        "Hamari apni polyester aur satin crepe sarees, wedding aur festive season ke liye ready.",
    },
    pageHref: "/polyester-sarees-wholesale-surat",
    linkLabel: {
      en: "Polyester sarees wholesale",
      hi: "पॉलिएस्टर साड़ी होलसेल",
      "hi-en": "Polyester sarees wholesale",
    },
  },
  {
    id: "reseller-starter",
    category: "polyester",
    name: {
      en: "Reseller Starter Pack",
      hi: "रीसेलर स्टार्टर पैक",
      "hi-en": "Reseller Starter Pack",
    },
    tag: {
      en: "Reseller · Mix",
      hi: "रीसेलर · मिक्स",
      "hi-en": "Reseller · Mix",
    },
    body: {
      en: "A curated starter mix for new resellers. Ask on WhatsApp.",
      hi: "नए रीसेलर के लिए चुना हुआ स्टार्टर मिक्स। व्हाट्सएप पर पूछिए।",
      "hi-en": "Naye resellers ke liye curated starter mix. WhatsApp par poochiye.",
    },
    pageHref: "/saree-wholesale-for-resellers",
    linkLabel: {
      en: "Saree wholesale for resellers",
      hi: "रीसेलर के लिए साड़ी होलसेल",
      "hi-en": "Saree wholesale for resellers",
    },
    whatsAppMessage: {
      en: "Hi Vidhi Fabrics, I would like to know about the Reseller Starter Pack.",
      hi: "नमस्ते विधि फैब्रिक्स, मुझे रीसेलर स्टार्टर पैक के बारे में जानना है।",
      "hi-en": "Hi Vidhi Fabrics, mujhe Reseller Starter Pack ke baare mein jaanna hai.",
    },
  },
  {
    id: "organza-net",
    category: "sourcing",
    name: {
      en: "Organza and net",
      hi: "ऑर्गेंज़ा और नेट",
      "hi-en": "Organza aur net",
    },
    tag: {
      en: "Sourced to order",
      hi: "ऑर्डर पर सोर्स",
      "hi-en": "Order par source",
    },
    body: {
      en: "Sourced to order through our Surat mill network.",
      hi: "हमारे सूरत मिल नेटवर्क से ऑर्डर पर सोर्स।",
      "hi-en": "Hamare Surat mill network se order par sourced.",
    },
    pageHref: "/organza-net-fabric-for-boutiques",
    linkLabel: {
      en: "Organza and net for boutiques",
      hi: "बुटीक के लिए ऑर्गेंज़ा और नेट",
      "hi-en": "Organza aur net for boutiques",
    },
  },
];

export const FABRICS: Fabric[] = [
  {
    sku: "VF-C-014",
    widthIn: 58,
    category: "cotton",
    image: cottonLinen,
    name: {
      en: "Cotton Linen Blend",
      hi: "कॉटन लिनन ब्लेंड",
      "hi-en": "Cotton Linen Blend",
    },
    tag: { en: "Cotton · Linen", hi: "कॉटन · लिनन", "hi-en": "Cotton · Linen" },
    spec: {
      en: '280 GSM · 58" width · print / plain',
      hi: '280 GSM · 58" चौड़ाई · प्रिंट / प्लेन',
      "hi-en": '280 GSM · 58" width · print / plain',
    },
  },
  {
    sku: "VF-S-208",
    widthIn: 44,
    category: "jacquard",
    image: katanJacquard,
    name: {
      en: "Katan Jacquard",
      hi: "कतान जैक्वार्ड",
      "hi-en": "Katan Jacquard",
    },
    tag: {
      en: "Silk · Jacquard",
      hi: "सिल्क · जैक्वार्ड",
      "hi-en": "Silk · Jacquard",
    },
    spec: {
      en: '90 momme · 44" width · woven motif',
      hi: '90 मोमे · 44" चौड़ाई · बुना हुआ मोटिफ',
      "hi-en": '90 momme · 44" width · woven motif',
    },
  },
  {
    sku: "VF-L-077",
    widthIn: 54,
    category: "linen",
    image: linenShirting,
    name: {
      en: "Crisp Shirting",
      hi: "क्रिस्प शर्टिंग",
      "hi-en": "Crisp Shirting",
    },
    tag: {
      en: "Linen · Shirting",
      hi: "लिनन · शर्टिंग",
      "hi-en": "Linen · Shirting",
    },
    spec: {
      en: '110 GSM · 54" width · easy-iron',
      hi: '110 GSM · 54" चौड़ाई · आसान इस्त्री',
      "hi-en": '110 GSM · 54" width · easy-iron',
    },
  },
  {
    sku: "VF-P-331",
    widthIn: 59,
    category: "polyester",
    image: performanceTwill,
    name: {
      en: "Performance Twill",
      hi: "परफ़ॉर्मेंस ट्विल",
      "hi-en": "Performance Twill",
    },
    tag: {
      en: "Polyester · Twill",
      hi: "पॉलिएस्टर · ट्विल",
      "hi-en": "Polyester · Twill",
    },
    spec: {
      en: '190 GSM · 59" width · stretch',
      hi: '190 GSM · 59" चौड़ाई · स्ट्रेच',
      "hi-en": '190 GSM · 59" width · stretch',
    },
  },
  {
    sku: "VF-S-152",
    widthIn: 42,
    category: "silk",
    image: beadedOrganza,
    name: {
      en: "Beaded Organza",
      hi: "बीडेड ऑर्गेंज़ा",
      "hi-en": "Beaded Organza",
    },
    tag: { en: "Silk · Beaded", hi: "सिल्क · बीडेड", "hi-en": "Silk · Beaded" },
    spec: {
      en: '40 momme · 42" width · bridal',
      hi: '40 मोमे · 42" चौड़ाई · ब्राइडल',
      "hi-en": '40 momme · 42" width · bridal',
    },
  },
  {
    sku: "VF-C-090",
    widthIn: 58,
    category: "cotton",
    image: denimCanvas,
    name: {
      en: "Denim Canvas",
      hi: "डेनिम कैनवास",
      "hi-en": "Denim Canvas",
    },
    tag: {
      en: "Cotton · Canvas",
      hi: "कॉटन · कैनवास",
      "hi-en": "Cotton · Canvas",
    },
    spec: {
      en: '340 GSM · 58" width · garment',
      hi: '340 GSM · 58" चौड़ाई · गारमेंट',
      "hi-en": '340 GSM · 58" width · garment',
    },
  },
];
