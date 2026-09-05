export type Lang = "en" | "hi" | "hi-en";

export const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिन्दी", short: "हि" },
  { code: "hi-en", label: "Hinglish", short: "HI-EN" },
];

export type FabricCategory =
  | "all"
  | "cotton"
  | "silk"
  | "linen"
  | "polyester"
  | "jacquard";

export type Fabric = {
  sku: string;
  category: Exclude<FabricCategory, "all">;
  image: string;
  name: Record<Lang, string>;
  tag: Record<Lang, string>;
  spec: Record<Lang, string>;
};

export const CATEGORY_LABELS: Record<FabricCategory, Record<Lang, string>> = {
  all: { en: "All", hi: "सभी", "hi-en": "Sab" },
  cotton: { en: "Cotton", hi: "कॉटन", "hi-en": "Cotton" },
  silk: { en: "Silk", hi: "सिल्क", "hi-en": "Silk" },
  linen: { en: "Linen", hi: "लिनन", "hi-en": "Linen" },
  polyester: { en: "Polyester", hi: "पॉलिएस्टर", "hi-en": "Polyester" },
  jacquard: { en: "Jacquard", hi: "जैक्वार्ड", "hi-en": "Jacquard" },
};

export const COPY = {
  brand: {
    en: "Vidhi Fabrics",
    hi: "विधि फैब्रिक्स",
    "hi-en": "Vidhi Fabrics",
  },
  established: {
    en: "Surat · Est. 1994",
    hi: "सूरत · स्थापित 1994",
    "hi-en": "Surat · Est. 1994",
  },
  nav: {
    catalogue: { en: "Catalogue", hi: "कैटलॉग", "hi-en": "Catalogue" },
    scale: { en: "Scale", hi: "क्षमता", "hi-en": "Scale" },
    contact: { en: "Contact", hi: "संपर्क", "hi-en": "Contact" },
    cta: { en: "Send Inquiry", hi: "पूछताछ भेजें", "hi-en": "Inquiry Bhejein" },
  },
  hero: {
    eyebrow: {
      en: "Surat · Asia's Textile Exchange",
      hi: "सूरत · एशिया का टेक्सटाइल केंद्र",
      "hi-en": "Surat · Asia ka Textile Exchange",
    },
    heading: {
      en: "The fabric behind Asia's largest textile trade.",
      hi: "एशिया के सबसे बड़े कपड़ा व्यापार के पीछे का कपड़ा।",
      "hi-en": "Asia ke sabse bade textile trade ke peeche ka fabric.",
    },
    body: {
      en: "Vidhi Fabrics moves woven, dyed and finished cloth from Surat's looms to 40+ countries. Wholesale volumes, contract compliance, and a catalogue that keeps unfolding.",
      hi: "विधि फैब्रिक्स सूरत के करघों से बुना, रंगा और फिनिश किया हुआ कपड़ा 40+ देशों तक पहुँचाता है। थोक मात्रा, कॉन्ट्रैक्ट अनुपालन, और लगातार बढ़ता कैटलॉग।",
      "hi-en":
        "Vidhi Fabrics Surat ke looms se woven, dyed aur finished cloth 40+ countries tak pahunchata hai. Wholesale volumes, contract compliance, aur ek catalogue jo kabhi khatam nahi hota.",
    },
    stats: [
      {
        en: "— 2,400+ active SKUs",
        hi: "— 2,400+ सक्रिय SKU",
        "hi-en": "— 2,400+ active SKUs",
      },
      {
        en: "— 40+ export markets",
        hi: "— 40+ निर्यात बाज़ार",
        "hi-en": "— 40+ export markets",
      },
      {
        en: "— 30 yrs at the loom",
        hi: "— 30 वर्ष करघे पर",
        "hi-en": "— 30 saal loom par",
      },
    ],
  },
  inquiry: {
    label: {
      en: "Wholesale Inquiry",
      hi: "थोक पूछताछ",
      "hi-en": "Wholesale Inquiry",
    },
    sub: {
      en: "Tell us what you source. We reply within one working day.",
      hi: "बताइए आप क्या खरीदते हैं। हम एक कार्यदिवस में जवाब देते हैं।",
      "hi-en":
        "Bataiye aap kya source karte hain. Hum ek working day mein reply karte hain.",
    },
    company: {
      en: "Company / brand name",
      hi: "कंपनी / ब्रांड का नाम",
      "hi-en": "Company / brand ka naam",
    },
    email: { en: "Work email", hi: "कार्य ईमेल", "hi-en": "Work email" },
    phone: {
      en: "Phone / WhatsApp",
      hi: "फ़ोन / व्हाट्सएप",
      "hi-en": "Phone / WhatsApp",
    },
    buyerTypes: {
      retail: {
        en: "Buyer type — Retail",
        hi: "खरीदार प्रकार — रिटेल",
        "hi-en": "Buyer type — Retail",
      },
      wholesaler: { en: "Wholesaler", hi: "थोक विक्रेता", "hi-en": "Wholesaler" },
      trader: {
        en: "Trader / Distributor",
        hi: "व्यापारी / वितरक",
        "hi-en": "Trader / Distributor",
      },
      manufacturer: { en: "Manufacturer", hi: "निर्माता", "hi-en": "Manufacturer" },
    },
    message: {
      en: "Materials, patterns, monthly volume…",
      hi: "सामग्री, डिज़ाइन, मासिक मात्रा…",
      "hi-en": "Materials, patterns, monthly volume…",
    },
    submit: {
      en: "Request a quotation",
      hi: "कोटेशन मंगवाएँ",
      "hi-en": "Quotation maangein",
    },
    sent: {
      en: "Thank you — our trade desk will reply within one working day.",
      hi: "धन्यवाद — हमारा ट्रेड डेस्क एक कार्यदिवस में जवाब देगा।",
      "hi-en":
        "Shukriya — hamara trade desk ek working day mein reply karega.",
    },
  },
  catalogue: {
    marker: { en: "(a) — Catalogue", hi: "(अ) — कैटलॉग", "hi-en": "(a) — Catalogue" },
    heading: {
      en: "Bolt by bolt, sorted for sourcing.",
      hi: "थान दर थान, सोर्सिंग के लिए व्यवस्थित।",
      "hi-en": "Than by than, sourcing ke liye sorted.",
    },
    empty: {
      en: "No fabrics in this category yet.",
      hi: "इस श्रेणी में अभी कोई कपड़ा नहीं है।",
      "hi-en": "Is category mein abhi koi fabric nahi hai.",
    },
  },
  scale: {
    marker: {
      en: "(b) — Scale & Trust",
      hi: "(ब) — क्षमता और भरोसा",
      "hi-en": "(b) — Scale & Bharosa",
    },
    heading: {
      en: "Tracked like inventory, built like a loom.",
      hi: "इन्वेंट्री जैसी पारदर्शिता, करघे जैसी मज़बूती।",
      "hi-en": "Inventory jaisi tracking, loom jaisi mazbooti.",
    },
    stats: [
      {
        value: "30",
        label: { en: "Years in Surat", hi: "सूरत में वर्ष", "hi-en": "Saal Surat mein" },
      },
      {
        value: "2,400+",
        label: { en: "Active SKUs", hi: "सक्रिय SKU", "hi-en": "Active SKUs" },
      },
      {
        value: "40+",
        label: { en: "Export markets", hi: "निर्यात बाज़ार", "hi-en": "Export markets" },
      },
      {
        value: "12k",
        label: { en: "Meters / month", hi: "मीटर / माह", "hi-en": "Meters / month" },
      },
    ],
    certTitle: {
      en: "Certified for the contract, not just the sale.",
      hi: "सिर्फ़ बिक्री नहीं, कॉन्ट्रैक्ट के लिए प्रमाणित।",
      "hi-en": "Sirf sale nahi, contract ke liye certified.",
    },
    certBody: {
      en: "OEKO-TEX and GOTS lines, in-house dyeing and finishing, and export documentation handled end to end. Surat's network means lead times that hold — and a floor that never runs out of next season.",
      hi: "OEKO-TEX और GOTS लाइनें, इन-हाउस रंगाई और फिनिशिंग, और निर्यात दस्तावेज़ीकरण शुरू से अंत तक। सूरत का नेटवर्क यानी भरोसेमंद लीड टाइम — और ऐसा स्टॉक जो कभी खाली नहीं होता।",
      "hi-en":
        "OEKO-TEX aur GOTS lines, in-house dyeing aur finishing, aur export documentation end to end. Surat ka network matlab lead times jo tikte hain — aur stock jo kabhi khatam nahi hota.",
    },
    imageAlt: {
      en: "Fabric bolts stacked on wooden racks in a Surat textile warehouse",
      hi: "सूरत के कपड़ा गोदाम में लकड़ी के रैक पर रखे कपड़े के थान",
      "hi-en": "Surat textile warehouse mein wooden racks par fabric bolts",
    },
  },
  contact: {
    marker: { en: "(c) — Wholesale", hi: "(स) — थोक", "hi-en": "(c) — Wholesale" },
    heading: {
      en: "Ready to source at scale?",
      hi: "बड़े पैमाने पर खरीदने के लिए तैयार?",
      "hi-en": "Bade scale par source karne ke liye taiyaar?",
    },
    body: {
      en: "Tell us the fabric, the volume and the season. We'll send samples and a quotation within one working day.",
      hi: "बताइए कपड़ा, मात्रा और सीज़न। हम एक कार्यदिवस में सैंपल और कोटेशन भेजेंगे।",
      "hi-en":
        "Bataiye fabric, volume aur season. Hum ek working day mein samples aur quotation bhejenge.",
    },
    cta: {
      en: "Start a wholesale inquiry",
      hi: "थोक पूछताछ शुरू करें",
      "hi-en": "Wholesale inquiry shuru karein",
    },
    hqLabel: { en: "Surat HQ", hi: "सूरत मुख्यालय", "hi-en": "Surat HQ" },
    hqValue: {
      en: "Plot 42, Udhna GIDC Industrial Estate, Surat 394210, Gujarat",
      hi: "प्लॉट 42, उधना GIDC औद्योगिक क्षेत्र, सूरत 394210, गुजरात",
      "hi-en": "Plot 42, Udhna GIDC Industrial Estate, Surat 394210, Gujarat",
    },
    deskLabel: { en: "Trade desk", hi: "ट्रेड डेस्क", "hi-en": "Trade desk" },
    hoursLabel: { en: "Hours", hi: "समय", "hi-en": "Timing" },
    hoursValue: {
      en: "Mon–Sat · 09:30–18:30 IST",
      hi: "सोम–शनि · 09:30–18:30 IST",
      "hi-en": "Mon–Sat · 09:30–18:30 IST",
    },
  },
  footer: {
    left: {
      en: "© 2026 Vidhi Fabrics · Surat, India",
      hi: "© 2026 विधि फैब्रिक्स · सूरत, भारत",
      "hi-en": "© 2026 Vidhi Fabrics · Surat, India",
    },
    right: {
      en: "Woven · Dyed · Finished · Exported",
      hi: "बुना · रंगा · फिनिश · निर्यात",
      "hi-en": "Woven · Dyed · Finished · Exported",
    },
  },
} as const;
