import { BUSINESS, BUSINESS_ID } from "@/content/business";

/**
 * Copy for the polyester saree and unstitched suit wholesale pages.
 *
 * Hindi was written for review and has not been checked by a native speaker.
 * New sentences on these pages avoid hyphens and dashes, prices, order
 * minimums, dispatch times, and cotton, silk, linen and jacquard.
 */

const SITE = "https://www.vidhifabrics.com";

export const SHOP_ADDRESS_EN =
  "542 to 543 Golden Point, Ring Road, Begumpura, Surat 395002";
export const SHOP_ADDRESS_HI = "542 से 543 गोल्डन पॉइंट, रिंग रोड, बेगमपुरा, सूरत 395002";

export type TextPart = string | { href: string; text: string } | { whatsapp: true };

export type WholesaleCopy = {
  lang: "en" | "hi";
  inLanguage: "en-IN" | "hi-IN";
  /** English path. The Hindi route is `/hi` plus this path. */
  path: string;
  title: string;
  description: string;
  breadcrumb: string;
  h1: string;
  leadRef: "PSAREE" | "USUIT";
  catalogueMessage: string;
  catalogueLabel: string;
  whyHeading: string;
  why: string[];
  intro: TextPart[][];
  sections: { heading: string; paragraphs: TextPart[][] }[];
  faqHeading: string;
  faqs: { question: string; answer: string }[];
  /** Saree pages keep the existing one line saree prompt. */
  sareePromo: boolean;
};

const phone = BUSINESS.phoneDisplay;

export const POLYESTER_EN: WholesaleCopy = {
  lang: "en",
  inLanguage: "en-IN",
  path: "/polyester-sarees-wholesale-surat",
  title: "Polyester Sarees Wholesale in Surat | Vidhi Fabrics",
  description:
    "Polyester sarees wholesale in Surat from a manufacturer and wholesaler. For boutiques, bulk buyers and people starting a business from home. Catalogue on WhatsApp.",
  breadcrumb: "Polyester sarees wholesale in Surat",
  h1: "Polyester sarees wholesale from Surat",
  leadRef: "PSAREE",
  catalogueMessage: "Hi Vidhi Fabrics, please share your polyester saree catalogue.",
  catalogueLabel: "Get catalogue on WhatsApp",
  whyHeading: "Why buy polyester sarees from Vidhi Fabrics",
  why: [
    "A family business in the Surat textile trade for about 60 years",
    "Polyester saree wholesale for boutiques, bulk buyers and home businesses",
    "New designs are arriving soon",
    "Catalogue on WhatsApp",
  ],
  intro: [
    [
      "Vidhi Fabrics supplies polyester sarees wholesale from Surat. We are a manufacturer and wholesaler. Boutiques and bulk buyers order from us, and so do people starting a saree business from home.",
    ],
    [
      "A polyester saree from this range is chosen for shops in North India: everyday prints and festive designs that a counter can reorder. New designs are arriving soon. Ask on WhatsApp and we will share what is in the current catalogue.",
    ],
    [
      "We make some lines ourselves and also supply from Surat's wider textile market, so one business answers for the order.",
    ],
  ],
  sections: [
    {
      heading: "For boutiques and for a business from home",
      paragraphs: [
        [
          "A boutique or a wholesaler can build a rail of polyester sarees and restock the designs that sell. Someone starting from home can begin with a smaller selection and grow it as orders come in.",
        ],
        [
          "If you are opening a suit and saree business from home, read ",
          {
            href: "/start-suit-saree-business-from-home",
            text: "how to start a suit and saree business from home",
          },
          ". To meet other sellers, see ",
          { href: "/reseller-circle", text: "Vidhi Reseller Circle" },
          ".",
        ],
      ],
    },
    {
      heading: "What to tell us",
      paragraphs: [
        [
          "Name the city you sell in, and whether you want everyday designs, festive designs, or both. If you already sell unstitched suits, you can add polyester sarees on the same conversation. See ",
          {
            href: "/unstitched-suits-wholesale-surat",
            text: "unstitched suits wholesale from Surat",
          },
          " and ",
          {
            href: "/dress-material-wholesale-surat",
            text: "dress material wholesale in Surat",
          },
          ".",
        ],
        [
          "Message us on WhatsApp at ",
          { whatsapp: true },
          ` and we will share the current polyester saree catalogue. You are also welcome at ${SHOP_ADDRESS_EN}.`,
        ],
      ],
    },
  ],
  faqHeading: "FAQs",
  faqs: [
    {
      question: "Who supplies polyester sarees wholesale in Surat?",
      answer: `Vidhi Fabrics, a manufacturer and wholesaler at Golden Point, Ring Road, Surat. Message us on WhatsApp at ${phone} for the current polyester saree catalogue.`,
    },
    {
      question: "Can I buy polyester sarees if I am starting a business from home?",
      answer:
        "Yes. Polyester saree wholesale from Surat is open to boutiques, bulk buyers and people starting from home. Tell us what you want to sell and we will share the catalogue on WhatsApp.",
    },
    {
      question: "Are new polyester saree designs coming?",
      answer:
        "Yes. New designs are arriving soon. Ask on WhatsApp and we will send what is ready in the current catalogue.",
    },
    {
      question: "Do you supply buyers outside Surat?",
      answer:
        "Yes. Most of our buyers are in Punjab, Haryana, Rajasthan, Uttar Pradesh and Madhya Pradesh. Message us on WhatsApp with your city and we will share the catalogue.",
    },
    {
      question: "How do I get the polyester saree catalogue?",
      answer: `Message us on WhatsApp at ${phone}. We will share the current catalogue. You can also visit us at ${SHOP_ADDRESS_EN}.`,
    },
  ],
  sareePromo: true,
};

export const POLYESTER_HI: WholesaleCopy = {
  lang: "hi",
  inLanguage: "hi-IN",
  path: "/polyester-sarees-wholesale-surat",
  title: "सूरत में पॉलिएस्टर साड़ी होलसेल | विधि फैब्रिक्स",
  description:
    "सूरत से पॉलिएस्टर साड़ी होलसेल, एक निर्माता और थोक विक्रेता से। बुटीक, बल्क खरीदार और घर से कारोबार शुरू करने वालों के लिए। कैटलॉग व्हाट्सएप पर।",
  breadcrumb: "सूरत में पॉलिएस्टर साड़ी होलसेल",
  h1: "सूरत से पॉलिएस्टर साड़ी होलसेल",
  leadRef: "PSAREE",
  catalogueMessage: "नमस्ते विधि फैब्रिक्स, कृपया पॉलिएस्टर साड़ी का कैटलॉग भेजिए।",
  catalogueLabel: "व्हाट्सएप पर कैटलॉग लीजिए",
  whyHeading: "विधि फैब्रिक्स से पॉलिएस्टर साड़ी क्यों",
  why: [
    "सूरत के कपड़ा व्यापार में करीब 60 साल से एक पारिवारिक कारोबार",
    "बुटीक, बल्क खरीदार और घर से बेचने वालों के लिए पॉलिएस्टर साड़ी होलसेल",
    "नए डिज़ाइन जल्द आ रहे हैं",
    "व्हाट्सएप पर कैटलॉग",
  ],
  intro: [
    [
      "विधि फैब्रिक्स सूरत से पॉलिएस्टर साड़ी होलसेल देता है। हम निर्माता और थोक विक्रेता हैं। बुटीक और बल्क खरीदार हमसे ऑर्डर करते हैं, और घर से साड़ी का कारोबार शुरू करने वाले भी।",
    ],
    [
      "यह पॉलिएस्टर साड़ी उत्तर भारत की दुकानों के लिए चुनी जाती है: रोज़मर्रा के प्रिंट और त्योहारी डिज़ाइन, जिन्हें काउंटर दोबारा मँगा सकता है। नए डिज़ाइन जल्द आ रहे हैं। व्हाट्सएप पर पूछिए, हम मौजूदा कैटलॉग में जो तैयार है वह भेजेंगे।",
    ],
    [
      "कुछ लाइनें हम खुद बनाते हैं और बाकी सूरत के बड़े कपड़ा बाज़ार से लाते हैं, इसलिए ऑर्डर का जवाब एक ही कारोबार देता है।",
    ],
  ],
  sections: [
    {
      heading: "बुटीक के लिए और घर से कारोबार के लिए",
      paragraphs: [
        [
          "बुटीक या थोक विक्रेता पॉलिएस्टर साड़ियों की एक रेंज रख सकता है और जो डिज़ाइन बिकता है उसे दोबारा मँगा सकता है। घर से शुरू करने वाला छोटी पसंद से शुरू कर सकता है और ऑर्डर बढ़ने पर उसे बढ़ा सकता है।",
        ],
        [
          "अगर आप घर से सूट और साड़ी का कारोबार खोल रहे हैं, पढ़िए ",
          {
            href: "/start-suit-saree-business-from-home",
            text: "घर से सूट और साड़ी का कारोबार कैसे शुरू करें",
          },
          "। दूसरे विक्रेताओं से मिलने के लिए देखिए ",
          { href: "/reseller-circle", text: "विधि रीसेलर सर्कल" },
          "।",
        ],
      ],
    },
    {
      heading: "हमें क्या बताइए",
      paragraphs: [
        [
          "जिस शहर में आप बेचते हैं उसका नाम लिखिए, और बताइए कि रोज़मर्रा के डिज़ाइन चाहिए, त्योहारी डिज़ाइन, या दोनों। अगर आप अनस्टिच्ड सूट भी बेचते हैं, तो उसी बातचीत में पॉलिएस्टर साड़ी जोड़ सकते हैं। देखिए ",
          {
            href: "/unstitched-suits-wholesale-surat",
            text: "सूरत से अनस्टिच्ड सूट होलसेल",
          },
          " और ",
          {
            href: "/dress-material-wholesale-surat",
            text: "सूरत में ड्रेस मटेरियल होलसेल",
          },
          "।",
        ],
        [
          "व्हाट्सएप पर ",
          { whatsapp: true },
          ` पर मैसेज कीजिए। हम मौजूदा पॉलिएस्टर साड़ी कैटलॉग भेजेंगे। आप ${SHOP_ADDRESS_HI} पर भी आ सकते हैं।`,
        ],
      ],
    },
  ],
  faqHeading: "सामान्य प्रश्न",
  faqs: [
    {
      question: "सूरत में पॉलिएस्टर साड़ी होलसेल कौन देता है?",
      answer: `विधि फैब्रिक्स, गोल्डन पॉइंट, रिंग रोड, सूरत का निर्माता और थोक विक्रेता। मौजूदा पॉलिएस्टर साड़ी कैटलॉग के लिए व्हाट्सएप पर ${phone} पर मैसेज कीजिए।`,
    },
    {
      question: "घर से कारोबार शुरू कर रहा हूँ, क्या पॉलिएस्टर साड़ी ले सकता हूँ?",
      answer:
        "हाँ। सूरत से पॉलिएस्टर साड़ी होलसेल बुटीक, बल्क खरीदार और घर से शुरू करने वालों के लिए खुला है। बताइए आप क्या बेचना चाहते हैं, हम व्हाट्सएप पर कैटलॉग भेजेंगे।",
    },
    {
      question: "क्या नए पॉलिएस्टर साड़ी डिज़ाइन आ रहे हैं?",
      answer:
        "हाँ। नए डिज़ाइन जल्द आ रहे हैं। व्हाट्सएप पर पूछिए, हम मौजूदा कैटलॉग में जो तैयार है वह भेजेंगे।",
    },
    {
      question: "क्या सूरत के बाहर भी सप्लाई होती है?",
      answer:
        "हाँ। हमारे ज़्यादातर खरीदार पंजाब, हरियाणा, राजस्थान, उत्तर प्रदेश और मध्य प्रदेश में हैं। अपना शहर व्हाट्सएप पर लिखिए, हम कैटलॉग भेजेंगे।",
    },
    {
      question: "पॉलिएस्टर साड़ी का कैटलॉग कैसे मिलेगा?",
      answer: `व्हाट्सएप पर ${phone} पर मैसेज कीजिए। हम मौजूदा कैटलॉग भेजेंगे। आप ${SHOP_ADDRESS_HI} पर भी आ सकते हैं।`,
    },
  ],
  sareePromo: true,
};

export const UNSTITCHED_EN: WholesaleCopy = {
  lang: "en",
  inLanguage: "en-IN",
  path: "/unstitched-suits-wholesale-surat",
  title: "Unstitched Suits Wholesale in Surat | Vidhi Fabrics",
  description:
    "Unstitched suits wholesale in Surat from a manufacturer and wholesaler. For boutiques, bulk buyers and people starting a business from home. Catalogue on WhatsApp.",
  breadcrumb: "Unstitched suits wholesale in Surat",
  h1: "Unstitched suits wholesale from Surat",
  leadRef: "USUIT",
  catalogueMessage: "Hi Vidhi Fabrics, please share your unstitched suit catalogue.",
  catalogueLabel: "Get catalogue on WhatsApp",
  whyHeading: "Why buy unstitched suits from Vidhi Fabrics",
  why: [
    "A family business in the Surat textile trade for about 60 years",
    "Unstitched suits wholesale for boutiques, bulk buyers and home businesses",
    "Sets you can show on WhatsApp or in a shop",
    "Catalogue on WhatsApp",
  ],
  intro: [
    [
      "Vidhi Fabrics supplies unstitched suits wholesale from Surat. We are a manufacturer and wholesaler. The range is for boutiques and bulk buyers, and for people starting a suit business from home.",
    ],
    [
      "An unstitched suit is sold as a set: cloth for the top, the bottom and a dupatta. A shop or a home seller can then offer a fit that is stitched locally.",
    ],
    [
      "We make some lines ourselves and also supply from Surat's wider textile market, so one business answers for the order.",
    ],
  ],
  sections: [
    {
      heading: "For boutiques and for a business from home",
      paragraphs: [
        [
          "If you run a boutique, you can mix festive sets and everyday sets and reorder what your counter sells. If you are starting from home, begin with a selection you can show on WhatsApp, then grow it.",
        ],
        [
          "Read ",
          {
            href: "/start-suit-saree-business-from-home",
            text: "how to start a suit and saree business from home",
          },
          ". To meet other sellers, see ",
          { href: "/reseller-circle", text: "Vidhi Reseller Circle" },
          ".",
        ],
      ],
    },
    {
      heading: "What to tell us",
      paragraphs: [
        [
          "Name your city, whether you want festive sets, everyday sets, or both, and whether you also want polyester sarees. See ",
          {
            href: "/polyester-sarees-wholesale-surat",
            text: "polyester sarees wholesale from Surat",
          },
          ". Dress material from Surat is on its own page: ",
          {
            href: "/dress-material-wholesale-surat",
            text: "dress material wholesale in Surat",
          },
          ".",
        ],
        [
          "Message us on WhatsApp at ",
          { whatsapp: true },
          ` and we will share the current unstitched suit catalogue. You are also welcome at ${SHOP_ADDRESS_EN}.`,
        ],
      ],
    },
  ],
  faqHeading: "FAQs",
  faqs: [
    {
      question: "Who supplies unstitched suits wholesale in Surat?",
      answer: `Vidhi Fabrics. We are a manufacturer and wholesaler in Surat. Message us on WhatsApp at ${phone} for the current unstitched suit catalogue.`,
    },
    {
      question: "Can someone starting a business from home order unstitched suits?",
      answer:
        "Yes. Unstitched suits wholesale from Surat is for boutiques and bulk buyers, and for people starting from home. Tell us what you want to sell and we will share the catalogue on WhatsApp.",
    },
    {
      question: "What is in an unstitched suit set?",
      answer:
        "Cloth for the top, the bottom and a dupatta, sold as a set. Ask us which pieces are in the design you want. The catalogue is shared on WhatsApp.",
    },
    {
      question: "Can I add polyester sarees to the same order?",
      answer:
        "Yes. Many boutiques order unstitched suits and polyester sarees together. Say so in your first WhatsApp message and we will share both catalogues.",
    },
    {
      question: "How do I get the unstitched suit catalogue?",
      answer: `Message us on WhatsApp at ${phone}. We will share the current catalogue. You can also visit us at ${SHOP_ADDRESS_EN}.`,
    },
  ],
  sareePromo: false,
};

export const UNSTITCHED_HI: WholesaleCopy = {
  lang: "hi",
  inLanguage: "hi-IN",
  path: "/unstitched-suits-wholesale-surat",
  title: "सूरत में अनस्टिच्ड सूट होलसेल | विधि फैब्रिक्स",
  description:
    "सूरत से अनस्टिच्ड सूट होलसेल, एक निर्माता और थोक विक्रेता से। बुटीक, बल्क खरीदार और घर से कारोबार शुरू करने वालों के लिए। कैटलॉग व्हाट्सएप पर।",
  breadcrumb: "सूरत में अनस्टिच्ड सूट होलसेल",
  h1: "सूरत से अनस्टिच्ड सूट होलसेल",
  leadRef: "USUIT",
  catalogueMessage: "नमस्ते विधि फैब्रिक्स, कृपया अनस्टिच्ड सूट का कैटलॉग भेजिए।",
  catalogueLabel: "व्हाट्सएप पर कैटलॉग लीजिए",
  whyHeading: "विधि फैब्रिक्स से अनस्टिच्ड सूट क्यों",
  why: [
    "सूरत के कपड़ा व्यापार में करीब 60 साल से एक पारिवारिक कारोबार",
    "बुटीक, बल्क खरीदार और घर से बेचने वालों के लिए अनस्टिच्ड सूट होलसेल",
    "सेट जो आप व्हाट्सएप या दुकान पर दिखा सकते हैं",
    "व्हाट्सएप पर कैटलॉग",
  ],
  intro: [
    [
      "विधि फैब्रिक्स सूरत से अनस्टिच्ड सूट होलसेल देता है। हम निर्माता और थोक विक्रेता हैं। यह रेंज बुटीक और बल्क खरीदारों के लिए है, और घर से सूट का कारोबार शुरू करने वालों के लिए भी।",
    ],
    [
      "अनस्टिच्ड सूट एक सेट के रूप में बिकता है: ऊपर के कपड़े के लिए, नीचे के कपड़े के लिए, और दुपट्टे के लिए। दुकान या घर से बेचने वाला फिर स्थानीय सिलाई से फिट दे सकता है।",
    ],
    [
      "कुछ लाइनें हम खुद बनाते हैं और बाकी सूरत के बड़े कपड़ा बाज़ार से लाते हैं, इसलिए ऑर्डर का जवाब एक ही कारोबार देता है।",
    ],
  ],
  sections: [
    {
      heading: "बुटीक के लिए और घर से कारोबार के लिए",
      paragraphs: [
        [
          "अगर आपकी बुटीक है, तो त्योहारी सेट और रोज़मर्रा के सेट साथ रख सकते हैं और जो काउंटर पर बिकता है उसे दोबारा मँगा सकते हैं। घर से शुरू कर रहे हैं, तो पहले ऐसी पसंद रखिए जिसे व्हाट्सएप पर दिखा सकें, फिर उसे बढ़ाइए।",
        ],
        [
          "पढ़िए ",
          {
            href: "/start-suit-saree-business-from-home",
            text: "घर से सूट और साड़ी का कारोबार कैसे शुरू करें",
          },
          "। दूसरे विक्रेताओं से मिलने के लिए देखिए ",
          { href: "/reseller-circle", text: "विधि रीसेलर सर्कल" },
          "।",
        ],
      ],
    },
    {
      heading: "हमें क्या बताइए",
      paragraphs: [
        [
          "अपना शहर बताइए, त्योहारी सेट चाहिए या रोज़मर्रा के सेट या दोनों, और पॉलिएस्टर साड़ी भी चाहिए या नहीं। देखिए ",
          {
            href: "/polyester-sarees-wholesale-surat",
            text: "सूरत से पॉलिएस्टर साड़ी होलसेल",
          },
          "। सूरत का ड्रेस मटेरियल अपने पेज पर है: ",
          {
            href: "/dress-material-wholesale-surat",
            text: "सूरत में ड्रेस मटेरियल होलसेल",
          },
          "।",
        ],
        [
          "व्हाट्सएप पर ",
          { whatsapp: true },
          ` पर मैसेज कीजिए। हम मौजूदा अनस्टिच्ड सूट कैटलॉग भेजेंगे। आप ${SHOP_ADDRESS_HI} पर भी आ सकते हैं।`,
        ],
      ],
    },
  ],
  faqHeading: "सामान्य प्रश्न",
  faqs: [
    {
      question: "सूरत में अनस्टिच्ड सूट होलसेल कौन देता है?",
      answer: `विधि फैब्रिक्स। हम सूरत के निर्माता और थोक विक्रेता हैं। मौजूदा अनस्टिच्ड सूट कैटलॉग के लिए व्हाट्सएप पर ${phone} पर मैसेज कीजिए।`,
    },
    {
      question: "घर से कारोबार शुरू करने वाला अनस्टिच्ड सूट मँगा सकता है?",
      answer:
        "हाँ। सूरत से अनस्टिच्ड सूट होलसेल बुटीक और बल्क खरीदारों के लिए है, और घर से शुरू करने वालों के लिए भी। बताइए आप क्या बेचना चाहते हैं, हम व्हाट्सएप पर कैटलॉग भेजेंगे।",
    },
    {
      question: "अनस्टिच्ड सूट के सेट में क्या होता है?",
      answer:
        "ऊपर के कपड़े, नीचे के कपड़े और दुपट्टे का कपड़ा, एक सेट में। जो डिज़ाइन चाहिए उसमें कौन से टुकड़े हैं, हमसे पूछिए। कैटलॉग व्हाट्सएप पर मिलता है।",
    },
    {
      question: "क्या उसी ऑर्डर में पॉलिएस्टर साड़ी जोड़ सकता हूँ?",
      answer:
        "हाँ। कई बुटीक अनस्टिच्ड सूट और पॉलिएस्टर साड़ी साथ मँगाती हैं। पहले व्हाट्सएप मैसेज में लिख दीजिए, हम दोनों कैटलॉग भेजेंगे।",
    },
    {
      question: "अनस्टिच्ड सूट का कैटलॉग कैसे मिलेगा?",
      answer: `व्हाट्सएप पर ${phone} पर मैसेज कीजिए। हम मौजूदा कैटलॉग भेजेंगे। आप ${SHOP_ADDRESS_HI} पर भी आ सकते हैं।`,
    },
  ],
  sareePromo: false,
};

export function wholesalePageUrl(copy: WholesaleCopy) {
  return copy.lang === "hi" ? `${SITE}/hi${copy.path}` : `${SITE}${copy.path}`;
}

export function wholesaleBreadcrumbList(copy: WholesaleCopy) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Vidhi Fabrics", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: copy.breadcrumb,
        item: wholesalePageUrl(copy),
      },
    ],
  };
}

export function wholesaleFaqPage(copy: WholesaleCopy) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: wholesalePageUrl(copy),
    inLanguage: copy.inLanguage,
    publisher: { "@id": BUSINESS_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: copy.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function wholesaleHead(copy: WholesaleCopy) {
  const url = wholesalePageUrl(copy);
  const en = `${SITE}${copy.path}`;
  const hi = `${SITE}/hi${copy.path}`;
  return {
    meta: [
      { title: copy.title },
      { name: "description", content: copy.description },
      { property: "og:title", content: copy.title },
      { property: "og:description", content: copy.description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: copy.lang === "hi" ? "hi_IN" : "en_IN" },
      {
        property: "og:locale:alternate",
        content: copy.lang === "hi" ? "en_IN" : "hi_IN",
      },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "en", href: en },
      { rel: "alternate", hrefLang: "hi", href: hi },
      { rel: "alternate", hrefLang: "x-default", href: en },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(wholesaleBreadcrumbList(copy)),
      },
      { type: "application/ld+json", children: JSON.stringify(wholesaleFaqPage(copy)) },
    ],
  };
}
