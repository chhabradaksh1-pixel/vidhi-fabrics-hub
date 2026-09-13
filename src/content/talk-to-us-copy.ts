import type { Lang } from "@/content/translations";

export type TalkStep = "category" | "requirement" | "quantity" | "location" | "done";

export const TALK_COPY: Record<
  Lang,
  {
    launcher: string;
    teaser: string;
    teaserClose: string;
    title: string;
    subtitle: string;
    close: string;
    restart: string;
    askCategory: string;
    categories: string[];
    ownAnswer: string;
    askRequirement: string;
    requirementPlaceholder: string;
    askQuantity: string;
    quantities: string[];
    customQuantity: string;
    askLocation: string;
    city: string;
    country: string;
    send: string;
    doneOne: string;
    doneTwo: string;
    cta: string;
  }
> = {
  en: {
    launcher: "Talk to us",
    teaser: "Looking for a specific fabric? Tell us what you need 👇",
    teaserClose: "Dismiss",
    title: "Vidhi Fabrics",
    subtitle: "Surat · Replies on WhatsApp",
    close: "Close",
    restart: "Start again",
    askCategory: "Hi 👋 What are you looking to source?",
    categories: ["Dress Material", "Sarees", "Fabrics", "Something else"],
    ownAnswer: "Or type your own",
    askRequirement: "Got it. What exactly are you looking for?",
    requirementPlaceholder: "Printed rayon dress material",
    askQuantity: "Roughly how much do you need?",
    quantities: ["Sample / Trial order", "Under 500", "500–2,000", "2,000+", "Not sure yet"],
    customQuantity: "Or enter a quantity",
    askLocation: "Where do you need it?",
    city: "City",
    country: "Country",
    send: "Send",
    doneOne: "Perfect — we've got enough to understand your requirement.",
    doneTwo: "Continue with the Vidhi Fabrics team for pricing, availability and next steps.",
    cta: "Continue on WhatsApp →",
  },
  hi: {
    launcher: "हमसे बात करें",
    teaser: "कोई ख़ास कपड़ा चाहिए? बताइए क्या चाहिए 👇",
    teaserClose: "हटाएँ",
    title: "विधि फैब्रिक्स",
    subtitle: "सूरत · व्हाट्सएप पर जवाब",
    close: "बंद करें",
    restart: "फिर से शुरू करें",
    askCategory: "नमस्ते 👋 आप क्या सोर्स करना चाहते हैं?",
    categories: ["ड्रेस मटेरियल", "साड़ियाँ", "फैब्रिक", "कुछ और"],
    ownAnswer: "या ख़ुद लिखिए",
    askRequirement: "समझ गए। आपको ठीक-ठीक क्या चाहिए?",
    requirementPlaceholder: "प्रिंटेड रेयॉन ड्रेस मटेरियल",
    askQuantity: "लगभग कितनी मात्रा चाहिए?",
    quantities: ["सैंपल / ट्रायल ऑर्डर", "500 से कम", "500–2,000", "2,000+", "अभी तय नहीं"],
    customQuantity: "या मात्रा लिखिए",
    askLocation: "कहाँ चाहिए?",
    city: "शहर",
    country: "देश",
    send: "भेजें",
    doneOne: "बढ़िया — आपकी ज़रूरत समझने के लिए इतना काफ़ी है।",
    doneTwo: "कीमत, उपलब्धता और आगे के क़दम के लिए विधि फैब्रिक्स की टीम से बात जारी रखिए।",
    cta: "व्हाट्सएप पर जारी रखें →",
  },
  "hi-en": {
    launcher: "Humse baat karein",
    teaser: "Koi khaas fabric chahiye? Bataiye kya chahiye 👇",
    teaserClose: "Hatayein",
    title: "Vidhi Fabrics",
    subtitle: "Surat · WhatsApp par reply",
    close: "Band karein",
    restart: "Phir se shuru karein",
    askCategory: "Namaste 👋 Aap kya source karna chahte hain?",
    categories: ["Dress Material", "Sarees", "Fabrics", "Kuch aur"],
    ownAnswer: "Ya khud likhiye",
    askRequirement: "Samajh gaye. Aapko theek theek kya chahiye?",
    requirementPlaceholder: "Printed rayon dress material",
    askQuantity: "Lagbhag kitni quantity chahiye?",
    quantities: ["Sample / Trial order", "500 se kam", "500–2,000", "2,000+", "Abhi tay nahi"],
    customQuantity: "Ya quantity likhiye",
    askLocation: "Kahan chahiye?",
    city: "City",
    country: "Country",
    send: "Bhejein",
    doneOne: "Perfect — aapki requirement samajhne ke liye itna kaafi hai.",
    doneTwo:
      "Pricing, availability aur aage ke steps ke liye Vidhi Fabrics team se baat jaari rakhiye.",
    cta: "WhatsApp par jaari rakhein →",
  },
};
