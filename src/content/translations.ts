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
    en: "Surat · Since the 1960s",
    hi: "सूरत · 1960 के दशक से",
    "hi-en": "Surat · 1960s se",
  },
  nav: {
    catalogue: { en: "Catalogue", hi: "कैटलॉग", "hi-en": "Catalogue" },
    scale: { en: "Scale", hi: "क्षमता", "hi-en": "Scale" },
    about: { en: "About", hi: "हमारे बारे में", "hi-en": "About" },
    desk: { en: "Fabric Desk", hi: "फैब्रिक डेस्क", "hi-en": "Fabric Desk" },
    journal: { en: "Insights", hi: "इनसाइट्स", "hi-en": "Insights" },
    contact: { en: "Contact", hi: "संपर्क", "hi-en": "Contact" },
    cta: { en: "WhatsApp us", hi: "व्हाट्सएप पर बात करें", "hi-en": "WhatsApp par baat karein" },
  },
  hero: {
    eyebrow: {
      en: "Surat · Manufacturer & Wholesale Textile Supply",
      hi: "सूरत · निर्माता और थोक टेक्सटाइल सप्लाई",
      "hi-en": "Surat · Manufacturer & Wholesale Textile Supply",
    },
    heading: {
      en: "From Surat, Asia's textile hub, to your shop.",
      hi: "सूरत, एशिया के टेक्सटाइल हब से, आपकी दुकान तक।",
      "hi-en": "From Surat, Asia's textile hub, to your shop.",
    },
    body: {
      en: "Vidhi Fabrics is a Surat-based manufacturer and wholesale fabric and textile sourcing business. We supply retailers, brands, manufacturers and traders with cotton, silk, synthetic, blended, jacquard, printed, dyed, woven and other fabric varieties from trusted mills and sourcing partners.",
      hi: "विधि फैब्रिक्स सूरत स्थित निर्माता और थोक फैब्रिक और टेक्सटाइल सोर्सिंग व्यवसाय है। हम रिटेलर्स, ब्रांड्स, निर्माताओं और व्यापारियों को भरोसेमंद मिलों और सोर्सिंग पार्टनर्स से कॉटन, सिल्क, सिंथेटिक, ब्लेंडेड, जैक्वार्ड, प्रिंटेड, रंगे, बुने और अन्य फैब्रिक वैरायटी सप्लाई करते हैं।",
      "hi-en":
        "Vidhi Fabrics Surat-based manufacturer aur wholesale fabric and textile sourcing business hai. Hum retailers, brands, manufacturers aur traders ko trusted mills aur sourcing partners se cotton, silk, synthetic, blended, jacquard, printed, dyed, woven aur other fabric varieties supply karte hain.",
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
        en: "3 generations at the loom",
        hi: "करघे पर तीन पीढ़ियाँ",
        "hi-en": "Loom par teen generations",
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
  leadPopup: {
    heading: {
      en: "Tell us what you need",
      hi: "आपको क्या चाहिए, बताइए",
      "hi-en": "Aapko kya chahiye, bataiye",
    },
    body: {
      en: "Share your details and fabric requirement. Our team will get in touch.",
      hi: "अपनी जानकारी और कपड़े की ज़रूरत साझा करें। हमारी टीम आपसे संपर्क करेगी।",
      "hi-en": "Apni details aur fabric requirement share karein. Hamari team aapse contact karegi.",
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
    continue: { en: "Continue browsing", hi: "ब्राउज़ करना जारी रखें", "hi-en": "Browsing jaari rakhein" },
    notice: {
      en: "We'll use these details to respond to your enquiry.",
      hi: "हम इन जानकारियों का उपयोग आपकी पूछताछ का जवाब देने के लिए करेंगे।",
      "hi-en": "In details ka use aapki enquiry ka jawab dene ke liye hoga.",
    },
    required: { en: "Please complete this field.", hi: "कृपया यह फ़ील्ड भरें।", "hi-en": "Please yeh field bharein." },
    invalidPhone: { en: "Enter a valid Indian phone number.", hi: "कृपया सही भारतीय फ़ोन नंबर डालें।", "hi-en": "Valid Indian phone number daalein." },
    saving: { en: "Sending…", hi: "भेजा जा रहा है…", "hi-en": "Bhej rahe hain…" },
    success: { en: "Thank you. Our team will get in touch.", hi: "धन्यवाद। हमारी टीम आपसे संपर्क करेगी।", "hi-en": "Shukriya. Hamari team aapse contact karegi." },
    failure: { en: "We couldn't save your enquiry. Please try again.", hi: "आपकी पूछताछ सेव नहीं हो सकी। कृपया फिर कोशिश करें।", "hi-en": "Enquiry save nahi ho saki. Please phir try karein." },
    unavailable: { en: "Enquiry service is not configured yet. Please contact us directly.", hi: "पूछताछ सेवा अभी सेट नहीं है। कृपया हमसे सीधे संपर्क करें।", "hi-en": "Enquiry service abhi configured nahi hai. Please directly contact karein." },
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
    ratingLabel: {
      en: "Example five-star placeholder rating",
      hi: "उदाहरण पाँच सितारा प्लेसहोल्डर रेटिंग",
      "hi-en": "Example five-star placeholder rating",
    },
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
  about: {
    marker: {
      en: "(d) / About us",
      hi: "(द) / हमारे बारे में",
      "hi-en": "(d) / About us",
    },
    heading: {
      en: "It started with our grandfather.",
      hi: "शुरुआत हमारे दादाजी से हुई।",
      "hi-en": "Shuruaat hamare dadaji se hui.",
    },
    lede: {
      en: "In the 1960s our grandfather began trading cloth in Surat. Three generations later the family still runs the business from the same city — now as a manufacturer and wholesale supplier serving retailers, brands, garment manufacturers and traders.",
      hi: "1960 के दशक में हमारे दादाजी ने सूरत में कपड़े का व्यापार शुरू किया। तीन पीढ़ियों बाद भी परिवार उसी शहर से कारोबार चला रहा है — अब एक निर्माता और थोक सप्लायर के रूप में, जो रिटेलर्स, ब्रांड्स, गारमेंट निर्माताओं और व्यापारियों को सेवा देता है।",
      "hi-en":
        "1960s mein hamare dadaji ne Surat mein kapde ka vyapar shuru kiya. Teen generations baad bhi family usi sheher se business chala rahi hai — ab ek manufacturer aur wholesale supplier ke roop mein, jo retailers, brands, garment manufacturers aur traders ko serve karta hai.",
    },
    storyTitle: {
      en: "Three generations, one city",
      hi: "तीन पीढ़ियाँ, एक शहर",
      "hi-en": "Teen generations, ek sheher",
    },
    story: {
      en: [
        "Our grandfather started with cloth, a counter and the relationships he built one buyer at a time. He did not have a catalogue or a brand. He had a reputation for quoting straight and delivering what he promised, and that turned out to be the durable part of the business.",
        "Surat is Asia's largest textile hub. Within a short distance of us sit the weaving units, dye houses, embroidery workshops and finishing lines that most buyers otherwise reach through several layers of intermediaries. That proximity is why a lab-dip can be carried across town instead of couriered, and why a quotation takes hours rather than days.",
        "What has changed across three generations is the scale and the machinery. What has not changed is who answers the phone, and the fact that the person who quotes your order is the person who stays with it.",
      ],
      hi: [
        "हमारे दादाजी ने कपड़े, एक काउंटर और एक-एक खरीदार से बने रिश्तों से शुरुआत की। उनके पास न कैटलॉग था, न ब्रांड। उनके पास सीधा कोटेशन देने और किया हुआ वादा निभाने की साख थी, और वही कारोबार का टिकाऊ हिस्सा साबित हुई।",
        "सूरत एशिया का सबसे बड़ा टेक्सटाइल हब है। हमसे थोड़ी ही दूरी पर वे वीविंग यूनिट, डाई हाउस, कढ़ाई वर्कशॉप और फिनिशिंग लाइनें हैं, जहाँ तक ज़्यादातर खरीदार कई बिचौलियों के ज़रिए पहुँचते हैं। यही नज़दीकी वजह है कि लैब-डिप कूरियर के बजाय हाथ से पहुँचाया जा सकता है, और कोटेशन दिनों में नहीं, घंटों में बनता है।",
        "तीन पीढ़ियों में जो बदला है वह है पैमाना और मशीनरी। जो नहीं बदला वह है फ़ोन कौन उठाता है, और यह कि जो व्यक्ति आपका कोटेशन बनाता है वही अंत तक उसके साथ रहता है।",
      ],
      "hi-en": [
        "Hamare dadaji ne kapde, ek counter aur ek-ek buyer se bane rishton se shuruaat ki. Unke paas na catalogue tha, na brand. Unke paas seedha quote dene aur kiya hua vaada nibhane ki saakh thi, aur wahi business ka tikaau hissa saabit hui.",
        "Surat Asia ka sabse bada textile hub hai. Humse thodi hi doori par wo weaving units, dye houses, embroidery workshops aur finishing lines hain, jahan tak zyadatar buyers kai intermediaries ke through pahunchte hain. Yahi proximity wajah hai ki lab-dip courier ke bajaye haath se pahunchaya ja sakta hai, aur quotation dino mein nahi, ghanton mein banta hai.",
        "Teen generations mein jo badla hai wo hai paimana aur machinery. Jo nahi badla wo hai phone kaun uthata hai, aur yeh ki jo vyakti aapka quote banata hai wahi ant tak uske saath rehta hai.",
      ],
    },
    valuesTitle: {
      en: "How we trade",
      hi: "हम कैसे व्यापार करते हैं",
      "hi-en": "Hum kaise trade karte hain",
    },
    values: [
      {
        title: {
          en: "Quote in 12 hours",
          hi: "12 घंटे में कोटेशन",
          "hi-en": "12 hours mein quote",
        },
        body: {
          en: "Send a requirement before close of business and you have a price and a sample plan the next working morning.",
          hi: "कारोबारी दिन ख़त्म होने से पहले ज़रूरत भेजिए, अगली कामकाजी सुबह आपके पास कीमत और सैंपल प्लान होगा।",
          "hi-en":
            "Business close hone se pehle requirement bhejiye, agli working morning aapke paas price aur sample plan hoga.",
        },
      },
      {
        title: {
          en: "One owner on the file",
          hi: "फ़ाइल पर एक ज़िम्मेदार",
          "hi-en": "File par ek owner",
        },
        body: {
          en: "Every order stays with the person who quoted it. No handover, and no repeating your specification to a new desk each season.",
          hi: "हर ऑर्डर उसी व्यक्ति के पास रहता है जिसने कोटेशन दिया। कोई हैंडओवर नहीं, और हर सीज़न नए डेस्क को स्पेसिफिकेशन दोहराना नहीं।",
          "hi-en":
            "Har order usi vyakti ke paas rehta hai jisne quote diya. Koi handover nahi, aur har season naye desk ko specification dohrana nahi.",
        },
      },
      {
        title: {
          en: "Shade before bulk",
          hi: "बल्क से पहले शेड",
          "hi-en": "Bulk se pehle shade",
        },
        body: {
          en: "Nothing goes to bulk until you have approved the lab-dip. A surprise is far cheaper to fix on a swatch than on a container.",
          hi: "जब तक आप लैब-डिप मंज़ूर न कर दें, कुछ भी बल्क में नहीं जाता। गलती स्वैच पर सुधारना कंटेनर के मुक़ाबले कहीं सस्ता है।",
          "hi-en":
            "Jab tak aap lab-dip approve na kar dein, kuch bhi bulk mein nahi jaata. Galti swatch par sudharna container ke muqable kahin sasta hai.",
        },
      },
    ],
    imageAltOne: {
      en: "Cotton linen blend fabric woven in Surat",
      hi: "सूरत में बुना कॉटन लिनन ब्लेंड कपड़ा",
      "hi-en": "Surat mein buna cotton linen blend fabric",
    },
    imageAltTwo: {
      en: "Katan jacquard fabric with a woven motif",
      hi: "बुने हुए मोटिफ के साथ कतान जैक्वार्ड कपड़ा",
      "hi-en": "Bune hue motif ke saath katan jacquard fabric",
    },
  },
  fabricDesk: {
    marker: {
      en: "(f) / Surat Fabric Desk",
      hi: "(फ) / सूरत फैब्रिक डेस्क",
      "hi-en": "(f) / Surat Fabric Desk",
    },
    heading: {
      en: "Tell us the requirement. We'll work the market.",
      hi: "ज़रूरत बताइए। बाज़ार हम खंगालेंगे।",
      "hi-en": "Requirement bataiye. Market hum khangalenge.",
    },
    body: {
      en: "The Surat Fabric Desk is how buyers use our position inside the hub. Send a specification, a photograph, or even a finished garment you want matched — we identify the cloth, price it, and come back with a sample plan.",
      hi: "सूरत फैब्रिक डेस्क वह तरीक़ा है जिससे खरीदार हब के भीतर हमारी स्थिति का इस्तेमाल करते हैं। स्पेसिफिकेशन, तस्वीर, या कोई तैयार गारमेंट भेजिए जिससे मिलान चाहिए — हम कपड़ा पहचानते हैं, कीमत लगाते हैं, और सैंपल प्लान के साथ लौटते हैं।",
      "hi-en":
        "Surat Fabric Desk wo tareeka hai jisse buyers hub ke andar hamari position ka istemaal karte hain. Specification, photo, ya koi finished garment bhejiye jiska match chahiye — hum cloth pehchante hain, pricing karte hain, aur sample plan ke saath lautte hain.",
    },
    steps: [
      {
        title: {
          en: "Send what you have",
          hi: "जो है वह भेजिए",
          "hi-en": "Jo hai wo bhejiye",
        },
        body: {
          en: "A spec sheet, a phone photograph of a swatch, or a garment you want matched. A rough idea is enough to start.",
          hi: "एक स्पेक शीट, स्वैच की फ़ोन से ली तस्वीर, या कोई गारमेंट जिससे मिलान चाहिए। शुरू करने के लिए मोटा अंदाज़ा काफ़ी है।",
          "hi-en":
            "Ek spec sheet, swatch ki phone se li photo, ya koi garment jiska match chahiye. Shuru karne ke liye mota andaza kaafi hai.",
        },
      },
      {
        title: {
          en: "We identify and price",
          hi: "हम पहचानते और कीमत लगाते हैं",
          "hi-en": "Hum identify aur price karte hain",
        },
        body: {
          en: "We name the construction, the realistic GSM and width, and quote it against your volume — within 12 hours on a working day.",
          hi: "हम कंस्ट्रक्शन, व्यावहारिक GSM और चौड़ाई बताते हैं, और आपकी मात्रा के हिसाब से कोटेशन देते हैं — कामकाजी दिन में 12 घंटे के भीतर।",
          "hi-en":
            "Hum construction, realistic GSM aur width batate hain, aur aapke volume ke hisaab se quote dete hain — working day mein 12 hours ke andar.",
        },
      },
      {
        title: {
          en: "Sample, then bulk",
          hi: "सैंपल, फिर बल्क",
          "hi-en": "Sample, phir bulk",
        },
        body: {
          en: "Lab-dips and a handloom go out for approval. Bulk is released only once the shade is signed off by you.",
          hi: "लैब-डिप और हैंडलूम मंज़ूरी के लिए भेजे जाते हैं। बल्क तभी निकलता है जब शेड आपकी ओर से मंज़ूर हो जाए।",
          "hi-en":
            "Lab-dips aur handloom approval ke liye bheje jaate hain. Bulk tabhi nikalta hai jab shade aapki taraf se approve ho jaye.",
        },
      },
    ],
    cta: {
      en: "Open the Fabric Desk on WhatsApp",
      hi: "व्हाट्सएप पर फैब्रिक डेस्क खोलें",
      "hi-en": "WhatsApp par Fabric Desk kholein",
    },
    note: {
      en: "Mon–Sat · Replies within 12 working hours",
      hi: "सोम–शनि · 12 कार्य-घंटों में जवाब",
      "hi-en": "Mon–Sat · 12 working hours mein reply",
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
