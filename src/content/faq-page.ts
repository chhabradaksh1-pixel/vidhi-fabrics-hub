import { BUSINESS_ID } from "@/content/business";
import { SHOP_ADDRESS_EN, SHOP_ADDRESS_HI } from "@/content/wholesale-pages";

/**
 * FAQ page copy. Hindi was written for review and has not been checked by a
 * native speaker. Answers stay short so they can be quoted. No prices, order
 * minimums, dispatch times, or cotton, silk, linen and jacquard.
 */

const SITE = "https://www.vidhifabrics.com";

export type FaqPart = string | { href: string; text: string };

export type FaqCopy = {
  lang: "en" | "hi";
  inLanguage: "en-IN" | "hi-IN";
  path: "/faq";
  title: string;
  description: string;
  breadcrumb: string;
  h1: string;
  lede: string;
  faqs: { question: string; answer: FaqPart[] }[];
  catalogueMessage: string;
  catalogueLabel: string;
};

export const FAQ_LEAD_REF = "FAQ";

export const FAQ_EN: FaqCopy = {
  lang: "en",
  inLanguage: "en-IN",
  path: "/faq",
  title: "FAQ | Vidhi Fabrics",
  description:
    "Short answers from Vidhi Fabrics in Surat: polyester sarees, unstitched suits, orders, shipping, the starter pack, Reseller Circle and the shop address.",
  breadcrumb: "FAQ",
  h1: "Questions about Vidhi Fabrics",
  lede: "Short answers. For anything about your own order, message us on WhatsApp.",
  catalogueMessage: "Hi Vidhi Fabrics, I have a question from your FAQ page.",
  catalogueLabel: "Message us on WhatsApp",
  faqs: [
    {
      question: "Who supplies polyester sarees wholesale in Surat?",
      answer: [
        "Vidhi Fabrics, a manufacturer and wholesaler in Surat. See ",
        {
          href: "/polyester-sarees-wholesale-surat",
          text: "polyester sarees wholesale from Surat",
        },
        ".",
      ],
    },
    {
      question: "Who supplies unstitched suits wholesale in Surat?",
      answer: [
        "Vidhi Fabrics, a manufacturer and wholesaler in Surat. See ",
        {
          href: "/unstitched-suits-wholesale-surat",
          text: "unstitched suits wholesale from Surat",
        },
        ".",
      ],
    },
    {
      question: "Do you take single piece orders?",
      answer: [
        "Message us on WhatsApp and name the piece. We will tell you how that order can be placed.",
      ],
    },
    {
      question: "What is the minimum order?",
      answer: ["Message us on WhatsApp for details."],
    },
    {
      question: "Do you ship across India and to the UAE?",
      answer: [
        "Yes. We ship across India and to the UAE. Message us on WhatsApp for the details.",
      ],
    },
    {
      question: "Is there a starter pack for a home business?",
      answer: [
        "Yes. There is a starter pack for a home business and for a new reseller. Ask on WhatsApp what the current pack includes. See ",
        {
          href: "/start-suit-saree-business-from-home",
          text: "how to start a suit and saree business from home",
        },
        ".",
      ],
    },
    {
      question: "How do I join Vidhi Reseller Circle?",
      answer: [
        "Open ",
        { href: "/reseller-circle", text: "Vidhi Reseller Circle" },
        " and send a request to join.",
      ],
    },
    {
      question: "Where are you located?",
      answer: [`${SHOP_ADDRESS_EN}.`],
    },
    {
      question: "How long have you been in business?",
      answer: ["About 60 years. Vidhi Fabrics is a family business."],
    },
  ],
};

export const FAQ_HI: FaqCopy = {
  lang: "hi",
  inLanguage: "hi-IN",
  path: "/faq",
  title: "सामान्य प्रश्न | विधि फैब्रिक्स",
  description:
    "सूरत की विधि फैब्रिक्स के छोटे जवाब: पॉलिएस्टर साड़ी, अनस्टिच्ड सूट, ऑर्डर, शिपिंग, स्टार्टर पैक, रीसेलर सर्कल और दुकान का पता।",
  breadcrumb: "सामान्य प्रश्न",
  h1: "विधि फैब्रिक्स के बारे में प्रश्न",
  lede: "छोटे जवाब। अपने ऑर्डर के बारे में व्हाट्सएप पर मैसेज कीजिए।",
  catalogueMessage: "नमस्ते विधि फैब्रिक्स, मेरे पास आपके सामान्य प्रश्न पेज से एक सवाल है।",
  catalogueLabel: "व्हाट्सएप पर मैसेज कीजिए",
  faqs: [
    {
      question: "सूरत में पॉलिएस्टर साड़ी होलसेल कौन देता है?",
      answer: [
        "विधि फैब्रिक्स, सूरत का निर्माता और थोक विक्रेता। देखिए ",
        {
          href: "/polyester-sarees-wholesale-surat",
          text: "सूरत से पॉलिएस्टर साड़ी होलसेल",
        },
        "।",
      ],
    },
    {
      question: "सूरत में अनस्टिच्ड सूट होलसेल कौन देता है?",
      answer: [
        "विधि फैब्रिक्स, सूरत का निर्माता और थोक विक्रेता। देखिए ",
        {
          href: "/unstitched-suits-wholesale-surat",
          text: "सूरत से अनस्टिच्ड सूट होलसेल",
        },
        "।",
      ],
    },
    {
      question: "क्या आप एक पीस का ऑर्डर लेते हैं?",
      answer: [
        "व्हाट्सएप पर मैसेज कीजिए और पीस का नाम लिखिए। हम बताएंगे वह ऑर्डर कैसे रखा जा सकता है।",
      ],
    },
    {
      question: "न्यूनतम ऑर्डर क्या है?",
      answer: ["विवरण के लिए व्हाट्सएप पर मैसेज कीजिए।"],
    },
    {
      question: "क्या आप पूरे भारत और यूएई में भेजते हैं?",
      answer: [
        "हाँ। हम पूरे भारत और यूएई में भेजते हैं। विवरण के लिए व्हाट्सएप पर मैसेज कीजिए।",
      ],
    },
    {
      question: "क्या घर से कारोबार के लिए स्टार्टर पैक है?",
      answer: [
        "हाँ। घर से कारोबार और नए रीसेलर के लिए स्टार्टर पैक है। मौजूदा पैक में क्या है, व्हाट्सएप पर पूछिए। देखिए ",
        {
          href: "/start-suit-saree-business-from-home",
          text: "घर से सूट और साड़ी का कारोबार कैसे शुरू करें",
        },
        "।",
      ],
    },
    {
      question: "विधि रीसेलर सर्कल से कैसे जुड़ें?",
      answer: [
        "",
        { href: "/reseller-circle", text: "विधि रीसेलर सर्कल" },
        " खोलिए और जुड़ने का अनुरोध भेजिए।",
      ],
    },
    {
      question: "आप कहाँ स्थित हैं?",
      answer: [`${SHOP_ADDRESS_HI}.`],
    },
    {
      question: "आप कितने समय से कारोबार में हैं?",
      answer: ["करीब 60 साल से। विधि फैब्रिक्स एक पारिवारिक कारोबार है।"],
    },
  ],
};

export function faqAnswerText(parts: FaqPart[]) {
  return parts.map((part) => (typeof part === "string" ? part : part.text)).join("");
}

export function faqPageUrl(copy: FaqCopy) {
  return copy.lang === "hi" ? `${SITE}/hi${copy.path}` : `${SITE}${copy.path}`;
}

export function faqBreadcrumbList(copy: FaqCopy) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Vidhi Fabrics", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: faqPageUrl(copy) },
    ],
  };
}

export function faqPageSchema(copy: FaqCopy) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: faqPageUrl(copy),
    inLanguage: copy.inLanguage,
    publisher: { "@id": BUSINESS_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: copy.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faqAnswerText(faq.answer) },
    })),
  };
}

export function faqHead(copy: FaqCopy) {
  const url = faqPageUrl(copy);
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
      { property: "og:locale:alternate", content: copy.lang === "hi" ? "en_IN" : "hi_IN" },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "en", href: en },
      { rel: "alternate", hrefLang: "hi", href: hi },
      { rel: "alternate", hrefLang: "x-default", href: en },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(faqBreadcrumbList(copy)) },
      { type: "application/ld+json", children: JSON.stringify(faqPageSchema(copy)) },
    ],
  };
}
