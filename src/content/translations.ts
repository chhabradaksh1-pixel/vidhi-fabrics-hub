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
      en: "Now, from Asia's textile hub to your shop.",
      hi: "अब एशिया के टेक्सटाइल हब से आपकी दुकान तक।",
      "hi-en": "ab Asia ke textile hub se kappada aapki dukan tak",
    },
    body: {
      en: "Vidhi Fabrics is a wholesale fabric and textile sourcing business in Surat. We help retailers, brands, manufacturers and traders source cotton, silk, synthetic, blended, jacquard, printed, dyed, woven and other fabric varieties across 40+ markets.",
      hi: "विधि फैब्रिक्स सूरत का थोक फैब्रिक और टेक्सटाइल सोर्सिंग व्यवसाय है। हम रिटेलर्स, ब्रांड्स, निर्माताओं और व्यापारियों के लिए कॉटन, सिल्क, सिंथेटिक, ब्लेंडेड, जैक्वार्ड, प्रिंटेड, रंगे, बुने और अन्य फैब्रिक वैरायटी सोर्स करते हैं।",
      "hi-en":
        "Vidhi Fabrics Surat ka wholesale fabric aur textile sourcing business hai. Hum retailers, brands, manufacturers aur traders ke liye cotton, silk, synthetic, blended, jacquard, printed, dyed, woven aur other fabric varieties 40+ markets ke liye source karte hain.",
    },
    stats: [
      {
        en: "2,400+ active SKUs",
        hi: "2,400+ सक्रिय SKU",
        "hi-en": "2,400+ active SKUs",
      },
      {
        en: "40+ export markets",
        hi: "40+ निर्यात बाज़ार",
        "hi-en": "40+ export markets",
      },
      {
        en: "30 yrs at the loom",
        hi: "30 वर्ष करघे पर",
        "hi-en": "30 saal loom par",
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
      en: "Tell us what you source. We reply within 12 hours.",
      hi: "बताइए आप क्या खरीदते हैं। हम 12 घंटे में जवाब देते हैं।",
      "hi-en":
        "Bataiye aap kya source karte hain. Hum 12 hours mein reply karte hain.",
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
        en: "Buyer type: Retail",
        hi: "खरीदार प्रकार: रिटेल",
        "hi-en": "Buyer type: Retail",
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
      en: "Thank you, our trade desk will reply within 12 hours.",
      hi: "धन्यवाद, हमारा ट्रेड डेस्क 12 घंटे में जवाब देगा।",
      "hi-en":
        "Shukriya, hamara trade desk 12 hours mein reply karega.",
    },
  },
  catalogue: {
    marker: { en: "(a) / Catalogue", hi: "(अ) / कैटलॉग", "hi-en": "(a) / Catalogue" },
    heading: {
      en: "A broad range, ready for sourcing.",
      hi: "विस्तृत रेंज, सोर्सिंग के लिए तैयार।",
      "hi-en": "Broad range, sourcing ke liye ready.",
    },
    body: {
      en: "These are selected examples from a broader wholesale range of fabrics, materials, constructions, patterns and finishes. Share your requirement and our Surat team can help source the right variety.",
      hi: "यह व्यापक थोक रेंज के कुछ चुने हुए उदाहरण हैं, जिसमें अलग-अलग फैब्रिक, सामग्री, कंस्ट्रक्शन, पैटर्न और फिनिश शामिल हैं। अपनी आवश्यकता साझा करें, हमारी सूरत टीम सही वैरायटी सोर्स करने में मदद करेगी।",
      "hi-en": "Yeh broad wholesale range ke selected examples hain, jismein alag fabrics, materials, constructions, patterns aur finishes shamil hain. Apni requirement share karein, Surat team right variety source karne mein help karegi.",
    },
    empty: {
      en: "No fabrics in this category yet.",
      hi: "इस श्रेणी में अभी कोई कपड़ा नहीं है।",
      "hi-en": "Is category mein abhi koi fabric nahi hai.",
    },
  },
  scale: {
    marker: {
      en: "(b) / Scale & Trust",
      hi: "(ब) / क्षमता और भरोसा",
      "hi-en": "(b) / Scale & Bharosa",
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
      en: "OEKO-TEX and GOTS lines, in-house dyeing and finishing, and export documentation handled end to end. Surat's network means lead times that hold, and a floor that never runs out of next season.",
      hi: "OEKO-TEX और GOTS लाइनें, इन-हाउस रंगाई और फिनिशिंग, और निर्यात दस्तावेज़ीकरण शुरू से अंत तक। सूरत का नेटवर्क यानी भरोसेमंद लीड टाइम, और ऐसा स्टॉक जो कभी खाली नहीं होता।",
      "hi-en":
        "OEKO-TEX aur GOTS lines, in-house dyeing aur finishing, aur export documentation end to end. Surat ka network matlab lead times jo tikte hain, aur stock jo kabhi khatam nahi hota.",
    },
    imageAlt: {
      en: "Textile showroom filled with colorful garments and fabric displays",
      hi: "रंगीन परिधानों और कपड़े के डिस्प्ले से भरा टेक्सटाइल शोरूम",
      "hi-en": "Colorful garments aur fabric displays se bhara textile showroom",
    },
  },
  contact: {
    marker: { en: "(c) / Wholesale", hi: "(स) / थोक", "hi-en": "(c) / Wholesale" },
    heading: {
      en: "Ready to source at scale?",
      hi: "बड़े पैमाने पर खरीदने के लिए तैयार?",
      "hi-en": "Bade scale par source karne ke liye taiyaar?",
    },
    body: {
      en: "Tell us the fabric, the volume and the season. We'll send samples and a quotation within 12 hours.",
      hi: "बताइए कपड़ा, मात्रा और सीज़न। हम 12 घंटे में सैंपल और कोटेशन भेजेंगे।",
      "hi-en":
        "Bataiye fabric, volume aur season. Hum 12 hours mein samples aur quotation bhejenge.",
    },
    cta: {
      en: "Start a wholesale inquiry",
      hi: "थोक पूछताछ शुरू करें",
      "hi-en": "Wholesale inquiry shuru karein",
    },
    hqLabel: { en: "Surat HQ", hi: "सूरत मुख्यालय", "hi-en": "Surat HQ" },
    hqValue: {
      en: "542-543 Golden Point, Begampura Road, Surat, Gujarat",
      hi: "542-543 गोल्डन पॉइंट, बेगमपुरा रोड, सूरत, गुजरात",
      "hi-en": "542-543 Golden Point, Begampura Road, Surat, Gujarat",
    },
    deskLabel: { en: "Trade desk", hi: "ट्रेड डेस्क", "hi-en": "Trade desk" },
    hoursLabel: { en: "Hours", hi: "समय", "hi-en": "Timing" },
    hoursValue: {
      en: "Mon–Sat · 11:00 PM–9:00 PM",
      hi: "सोम–शनि · 11:00 PM–9:00 PM",
      "hi-en": "Mon–Sat · 11:00 PM–9:00 PM",
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
