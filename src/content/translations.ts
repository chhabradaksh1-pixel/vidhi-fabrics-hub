export type Lang = "en" | "hi" | "hi-en";

export const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिन्दी", short: "हि" },
  { code: "hi-en", label: "Hinglish", short: "HI-EN" },
];

export type FabricCategory = "all" | "cotton" | "silk" | "linen" | "polyester" | "jacquard";

export type Fabric = {
  sku: string;
  category: Exclude<FabricCategory, "all">;
  image: string;
  name: Record<Lang, string>;
  tag: Record<Lang, string>;
  spec: Record<Lang, string>;
  /**
   * Width in inches, used to sort the catalogue. It duplicates the width
   * already written into `spec`, because that string is localised prose and
   * not safe to parse. Keep the two in step when editing a fabric.
   */
  widthIn: number;
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
    en: "Surat · Since the 1960s",
    hi: "सूरत · 1960 के दशक से",
    "hi-en": "Surat · Since the 1960s",
  },
  nav: {
    catalogue: { en: "Catalogue", hi: "कैटलॉग", "hi-en": "Catalogue" },
    scale: { en: "Scale", hi: "क्षमता", "hi-en": "Scale" },
    contact: { en: "Contact", hi: "संपर्क", "hi-en": "Contact" },
    cta: { en: "WhatsApp us", hi: "व्हाट्सएप पर बात करें", "hi-en": "WhatsApp par baat karein" },
  },
  hero: {
    eyebrow: {
      en: "Surat · Textile Supplier & Wholesale Trade",
      hi: "सूरत · टेक्सटाइल सप्लायर और थोक व्यापार",
      "hi-en": "Surat · Textile supplier aur wholesale trade",
    },
    heading: {
      en: "From Surat, Asia's textile hub, to your shop.",
      hi: "सूरत, एशिया के टेक्सटाइल हब से, आपकी दुकान तक।",
      "hi-en": "From Surat, Asia's textile hub, to your shop.",
    },
    body: {
      en: "Vidhi Fabrics is a Surat-based textile supplier and wholesale fabric sourcing business. We supply retailers, brands, manufacturers and traders with cotton, silk, synthetic, blended, jacquard, printed, dyed, woven and other fabric varieties, sourced from trusted mills and manufacturing partners across the city.",
      hi: "विधि फैब्रिक्स सूरत स्थित एक टेक्सटाइल सप्लायर और थोक फैब्रिक सोर्सिंग व्यवसाय है। हम रिटेलर्स, ब्रांड्स, निर्माताओं और व्यापारियों को शहर भर की भरोसेमंद मिलों और मैन्युफैक्चरिंग पार्टनर्स से सोर्स की गई कॉटन, सिल्क, सिंथेटिक, ब्लेंडेड, जैक्वार्ड, प्रिंटेड, रंगे, बुने और अन्य फैब्रिक वैरायटी सप्लाई करते हैं।",
      "hi-en":
        "Vidhi Fabrics Surat-based textile supplier aur wholesale fabric sourcing business hai. Hum retailers, brands, manufacturers aur traders ko shehar bhar ki trusted mills aur manufacturing partners se source ki gayi cotton, silk, synthetic, blended, jacquard, printed, dyed, woven aur other fabric varieties supply karte hain.",
    },
    stats: [
      {
        en: "2,400+ active SKUs",
        hi: "2,400+ सक्रिय SKU",
        "hi-en": "2,400+ active SKUs",
      },
      {
        en: "10+ export markets",
        hi: "10+ निर्यात बाज़ार",
        "hi-en": "10+ export markets",
      },
      {
        en: "60+ years in textiles",
        hi: "टेक्सटाइल में 60+ वर्ष",
        "hi-en": "Textiles mein 60+ saal",
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
      "hi-en": "Bataiye aap kya source karte hain. Hum 12 hours mein reply karte hain.",
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
      "hi-en": "Shukriya, hamara trade desk 12 hours mein reply karega.",
    },
  },
  leadPopup: {
    heading: {
      en: "Tell us what you need",
      hi: "आपको क्या चाहिए, बताइए",
      "hi-en": "Aapko kya chahiye, bataiye",
    },
    body: {
      en: "Share your details and fabric requirement. Our team will get in touch.",
      hi: "अपनी जानकारी और कपड़े की ज़रूरत साझा करें। हमारी टीम आपसे संपर्क करेगी।",
      "hi-en":
        "Apni details aur fabric requirement share karein. Hamari team aapse contact karegi.",
    },
    name: { en: "Name", hi: "नाम", "hi-en": "Naam" },
    phone: { en: "Phone number", hi: "फ़ोन नंबर", "hi-en": "Phone number" },
    business: { en: "Business name", hi: "व्यवसाय का नाम", "hi-en": "Business name" },
    requirement: { en: "Requirement", hi: "ज़रूरत", "hi-en": "Requirement" },
    requirementPlaceholder: {
      en: "Tell us which fabric you need, the quantity, or any other details.",
      hi: "बताइए आपको कौन सा कपड़ा चाहिए, कितनी मात्रा चाहिए या कोई और जानकारी।",
      "hi-en": "Batayein kaunsa fabric chahiye, kitni quantity chahiye, ya koi aur details.",
    },
    countryCode: { en: "+91", hi: "+91", "hi-en": "+91" },
    submit: { en: "Send enquiry", hi: "पूछताछ भेजें", "hi-en": "Enquiry bhejein" },
    close: { en: "Close", hi: "बंद करें", "hi-en": "Close" },
    continue: {
      en: "Continue browsing",
      hi: "ब्राउज़ करना जारी रखें",
      "hi-en": "Browsing jaari rakhein",
    },
    notice: {
      en: "We'll use these details to respond to your enquiry.",
      hi: "हम इन जानकारियों का उपयोग आपकी पूछताछ का जवाब देने के लिए करेंगे।",
      "hi-en": "In details ka use aapki enquiry ka jawab dene ke liye hoga.",
    },
    required: {
      en: "Please complete this field.",
      hi: "कृपया यह फ़ील्ड भरें।",
      "hi-en": "Please yeh field bharein.",
    },
    invalidPhone: {
      en: "Enter a valid Indian phone number.",
      hi: "कृपया सही भारतीय फ़ोन नंबर डालें।",
      "hi-en": "Valid Indian phone number daalein.",
    },
    saving: { en: "Sending…", hi: "भेजा जा रहा है…", "hi-en": "Bhej rahe hain…" },
    success: {
      en: "Thank you. Our team will get in touch.",
      hi: "धन्यवाद। हमारी टीम आपसे संपर्क करेगी।",
      "hi-en": "Shukriya. Hamari team aapse contact karegi.",
    },
    failure: {
      en: "We couldn't save your enquiry. Please try again.",
      hi: "आपकी पूछताछ सेव नहीं हो सकी। कृपया फिर कोशिश करें।",
      "hi-en": "Enquiry save nahi ho saki. Please phir try karein.",
    },
    unavailable: {
      en: "Enquiry service is not configured yet. Please contact us directly.",
      hi: "पूछताछ सेवा अभी सेट नहीं है। कृपया हमसे सीधे संपर्क करें।",
      "hi-en": "Enquiry service abhi configured nahi hai. Please directly contact karein.",
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
      "hi-en":
        "Yeh broad wholesale range ke selected examples hain, jismein alag fabrics, materials, constructions, patterns aur finishes shamil hain. Apni requirement share karein, Surat team right variety source karne mein help karegi.",
    },
    empty: {
      en: "No fabrics in this category yet.",
      hi: "इस श्रेणी में अभी कोई कपड़ा नहीं है।",
      "hi-en": "Is category mein abhi koi fabric nahi hai.",
    },
    noResults: {
      en: "Nothing matches that search.",
      hi: "इस खोज से कुछ मेल नहीं खाता।",
      "hi-en": "Is search se kuch match nahi hua.",
    },
    searchLabel: {
      en: "Search the catalogue",
      hi: "कैटलॉग में खोजें",
      "hi-en": "Catalogue mein search karein",
    },
    searchPlaceholder: {
      en: "Fabric, SKU or specification",
      hi: "फैब्रिक, SKU या स्पेसिफिकेशन",
      "hi-en": "Fabric, SKU ya specification",
    },
    filterLabel: {
      en: "Filter by material",
      hi: "सामग्री से छाँटें",
      "hi-en": "Material se filter karein",
    },
    sortLabel: { en: "Sort", hi: "क्रम", "hi-en": "Sort" },
    sortName: { en: "Name", hi: "नाम से", "hi-en": "Naam se" },
    sortSku: { en: "SKU", hi: "SKU", "hi-en": "SKU" },
    sortWidth: {
      en: "Width, narrow first",
      hi: "चौड़ाई, कम से ज़्यादा",
      "hi-en": "Width, kam se zyada",
    },
    viewLabel: { en: "View", hi: "दृश्य", "hi-en": "View" },
    viewGrid: { en: "Grid", hi: "ग्रिड", "hi-en": "Grid" },
    viewTable: { en: "Specifications", hi: "स्पेसिफिकेशन", "hi-en": "Specifications" },
    clear: { en: "Clear", hi: "हटाएँ", "hi-en": "Hataayein" },
    /* {shown} and {total} are replaced at render time. */
    count: {
      en: "Showing {shown} of {total}",
      hi: "{total} में से {shown} दिखाए जा रहे हैं",
      "hi-en": "{total} mein se {shown} dikhaye ja rahe hain",
    },
    colSku: { en: "SKU", hi: "SKU", "hi-en": "SKU" },
    colName: { en: "Fabric", hi: "फैब्रिक", "hi-en": "Fabric" },
    colComposition: { en: "Composition", hi: "संरचना", "hi-en": "Composition" },
    colWidth: { en: "Width", hi: "चौड़ाई", "hi-en": "Width" },
    colSpec: { en: "Specification", hi: "स्पेसिफिकेशन", "hi-en": "Specification" },
    detailOpen: {
      en: "View specifications",
      hi: "स्पेसिफिकेशन देखें",
      "hi-en": "Specifications dekhein",
    },
    detailClose: { en: "Close", hi: "बंद करें", "hi-en": "Band karein" },
    detailEnquire: {
      en: "Ask about this fabric",
      hi: "इस फैब्रिक के बारे में पूछें",
      "hi-en": "Is fabric ke baare mein poochein",
    },
    /* {name} and {sku} are replaced at render time. */
    enquiryMessage: {
      en: "Hello Vidhi Fabrics, I would like details on {name} ({sku}).",
      hi: "नमस्ते विधि फैब्रिक्स, मुझे {name} ({sku}) की जानकारी चाहिए।",
      "hi-en": "Namaste Vidhi Fabrics, mujhe {name} ({sku}) ki details chahiye.",
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
        value: "1960s",
        label: {
          en: "In the trade since",
          hi: "तब से व्यापार में",
          "hi-en": "Tab se trade mein",
        },
      },
      {
        value: "2,400+",
        label: { en: "Active SKUs", hi: "सक्रिय SKU", "hi-en": "Active SKUs" },
      },
      {
        value: "10+",
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
      en: "OEKO-TEX and GOTS lines, coordinated dyeing and finishing, and export documentation handled end to end. Surat's network means lead times that hold, and a floor that never runs out of next season.",
      hi: "OEKO-TEX और GOTS लाइनें, समन्वयित रंगाई और फिनिशिंग, और निर्यात दस्तावेज़ीकरण शुरू से अंत तक। सूरत का नेटवर्क यानी भरोसेमंद लीड टाइम, और ऐसा स्टॉक जो कभी खाली नहीं होता।",
      "hi-en":
        "OEKO-TEX aur GOTS lines, coordinated dyeing aur finishing, aur export documentation end to end. Surat ka network matlab lead times jo tikte hain, aur stock jo kabhi khatam nahi hota.",
    },
    imageAlt: {
      en: "An open swatch book of fabric samples, each shade carrying its own reference code",
      hi: "कपड़े के सैंपलों की खुली स्वैच बुक, हर शेड पर अपना रेफ़रेंस कोड",
      "hi-en": "Fabric samples ki khuli swatch book, har shade par apna reference code",
    },
  },
  testimonials: {
    marker: {
      en: "(c) / Testimonials",
      hi: "(स) / प्रशंसापत्र",
      "hi-en": "(c) / Testimonials",
    },
    heading: {
      en: "Trusted across markets. Built on repeat business.",
      hi: "अलग-अलग बाज़ारों में भरोसेमंद। दोबारा होने वाले व्यापार पर निर्मित।",
      "hi-en": "Markets ke across trusted. Repeat business par built.",
    },
    body: {
      en: "Relationships built with retailers, wholesalers, manufacturers and textile buyers across India and international markets.",
      hi: "भारत और अंतरराष्ट्रीय बाज़ारों के रिटेलर्स, थोक विक्रेताओं, निर्माताओं और टेक्सटाइल खरीदारों के साथ बनाए गए संबंध।",
      "hi-en":
        "India aur international markets ke retailers, wholesalers, manufacturers aur textile buyers ke saath built relationships.",
    },
    proof: [
      {
        value: { en: "Within 12 hours", hi: "12 घंटे में", "hi-en": "12 ghante mein" },
        label: {
          en: "Typical reply to any enquiry",
          hi: "किसी भी पूछताछ का आम जवाब",
          "hi-en": "Kisi bhi enquiry ka typical reply",
        },
      },
      {
        value: { en: "60+ years", hi: "60+ साल", "hi-en": "60+ saal" },
        label: {
          en: "In the Surat textile trade",
          hi: "सूरत के कपड़ा व्यापार में",
          "hi-en": "Surat ke textile trade mein",
        },
      },
      {
        value: { en: "10+", hi: "10+", "hi-en": "10+" },
        label: {
          en: "Export markets served",
          hi: "निर्यात बाज़ार",
          "hi-en": "Export markets served",
        },
      },
    ],
    cards: [
      {
        quote: {
          en: "Finding the right fabric for each requirement used to be difficult. With Vidhi Fabrics, we can find many fabric options in one place, and their team also helps with sourcing.",
          hi: "हमारी जरूरत के हिसाब से सही फैब्रिक ढूंढना पहले काफी मुश्किल होता था। Vidhi Fabrics में एक ही जगह पर कई तरह के फैब्रिक के options मिल जाते हैं और sourcing में भी अच्छी मदद मिलती है।",
          "hi-en":
            "Pehle har requirement ke liye right fabric dhoondhna mushkil hota tha. Vidhi Fabrics mein ek hi jagah par kaafi fabric options mil jaate hain aur sourcing mein bhi achhi help milti hai.",
        },
        customerLabel: {
          en: "Fabric Trader",
          hi: "कपड़ा व्यापारी",
          "hi-en": "Fabric Trader",
        },
        location: "Meerut",
      },
      {
        quote: {
          en: "For us, the most important thing is that the material arrives on time. With Vidhi Fabrics, we do not have to follow up much about delivery. The material arrives according to the commitment.",
          hi: "हमारे लिए सबसे जरूरी है कि माल समय पर पहुंच जाए। Vidhi Fabrics के साथ डिलीवरी को लेकर ज्यादा फॉलो-अप नहीं करना पड़ता, जो कमिटमेंट होता है उसके हिसाब से माल मिल जाता है।",
          "hi-en":
            "Humare liye sabse important hai ki maal time par pahunch jaye. Vidhi Fabrics ke saath delivery ko lekar zyada follow-up nahi karna padta, jo commitment hota hai uske hisaab se maal mil jaata hai.",
        },
        customerLabel: {
          en: "Fabric Retailer",
          hi: "फैब्रिक रिटेलर",
          "hi-en": "Fabric Retailer",
        },
        location: "Kanpur",
      },
      {
        quote: {
          en: "The price is competitive for the market, and the variety is good too. That is why we place repeat orders.",
          hi: "बाज़ार के हिसाब से कीमत प्रतिस्पर्धी मिलती है और वैरायटी भी अच्छी है। इसी वजह से हम दोबारा ऑर्डर करते हैं।",
          "hi-en":
            "Price market ke hisaab se competitive milta hai, aur variety bhi achhi hai. Isi wajah se hum repeat orders karte hain.",
        },
        customerLabel: {
          en: "Fabric Wholesaler",
          hi: "फैब्रिक थोक विक्रेता",
          "hi-en": "Fabric Wholesaler",
        },
        location: "Jaipur",
      },
      {
        quote: {
          en: "When you're working on export orders, timelines are very important. Vidhi Fabrics has been reliable with sourcing and delivery, and their range makes it easier for us to manage different fabric requirements from one place.",
          hi: "जब आप निर्यात ऑर्डर्स पर काम कर रहे हों, तो समयसीमा बहुत महत्वपूर्ण होती है। Vidhi Fabrics के साथ सोर्सिंग और डिलीवरी भरोसेमंद रही है, और उनकी रेंज से हमें एक ही जगह से अलग-अलग फैब्रिक जरूरतें संभालने में आसानी होती है।",
          "hi-en":
            "Export orders par kaam karte waqt timelines bahut important hoti hain. Vidhi Fabrics ke saath sourcing aur delivery reliable rahi hai, aur unki range ki wajah se hum ek hi jagah se alag fabric requirements manage kar paate hain.",
        },
        customerLabel: {
          en: "Exporter",
          hi: "निर्यातक",
          "hi-en": "Exporter",
        },
        location: "Delhi",
      },
    ],
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
    deskLabel: { en: "Trade desk", hi: "ट्रेड डेस्क", "hi-en": "Trade desk" },
    hoursLabel: { en: "Hours", hi: "समय", "hi-en": "Timing" },
    hoursValue: {
      en: "Mon–Sat · 11:00 AM–9:00 PM",
      hi: "सोम–शनि · सुबह 11:00–रात 9:00",
      "hi-en": "Mon–Sat · 11:00 AM–9:00 PM",
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
