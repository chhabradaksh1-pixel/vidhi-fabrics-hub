import cottonLinen from "@/assets/fabric-cotton-linen.jpg";
import katanJacquard from "@/assets/fabric-katan-jacquard.jpg";
import linenShirting from "@/assets/fabric-linen-shirting.jpg";
import performanceTwill from "@/assets/fabric-performance-twill.jpg";
import beadedOrganza from "@/assets/fabric-beaded-organza.jpg";
import denimCanvas from "@/assets/fabric-denim-canvas.jpg";

import type { Fabric } from "./translations";

export const FABRICS: Fabric[] = [
  {
    sku: "VF-C-014",
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
