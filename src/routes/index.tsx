import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AboutSection } from "@/components/fabric-desk";
import { HomeHeader } from "@/components/home-header";
import { ADDRESS_LINES, BUSINESS } from "@/content/business";
import { FabricCatalogueSection } from "@/components/fabric-catalogue";
import { ReachStrip } from "@/components/reach-map";
import { ResellerCircleStrip } from "@/components/reseller-circle-cta";
import { SiteFooter } from "@/components/site-footer";
import { LeadPopup, useEngagementPopup } from "@/components/lead-popup";
import { PromoSuitsTicker } from "@/components/promo-suits";
import { ShowroomHero, ShowroomRanges, ShowroomTrust } from "@/components/showroom-home";
import { WhatsAppPill } from "@/components/whatsapp-pill";
import { whatsAppUrl } from "@/content/whatsapp";
import { useLeadContext } from "@/hooks/use-lead-context";
import { useReveal } from "@/hooks/use-reveal";
import { trackLeadEvent } from "@/lib/analytics";
import { currentLeadContext } from "@/lib/lead-source";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { COPY, type Lang } from "@/content/translations";

const EN_URL = "https://www.vidhifabrics.com/";
const HI_URL = "https://www.vidhifabrics.com/hi";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        // Leads with the two main categories (owner-approved, 2 October 2026).
        // 58 characters (audit, 3 October 2026) so Google shows it whole;
        // "manufacturer" stays in the title, "wholesaler" is in the description.
        title: "Saree & Dress Material Manufacturer, Surat | Vidhi Fabrics",
      },
      {
        name: "description",
        // Polyester sarees and dress material, manufacturer and wholesaler,
        // and the buyers and markets served (owner-approved, 2 October 2026).
        // No capacity, export-history, MOQ or timing claims. See BRAND.md.
        content:
          "Surat manufacturer and wholesaler of polyester sarees and dress material, for wholesalers, retailers, resellers and boutiques in Punjab, Haryana and Rajasthan.",
      },
      {
        property: "og:title",
        content: "Saree & Dress Material Manufacturer, Surat | Vidhi Fabrics",
      },
      {
        property: "og:description",
        content:
          "Vidhi Fabrics is a Surat manufacturer and wholesaler of polyester sarees and dress material, supplying wholesalers, retailers, resellers and boutiques in Punjab, Haryana and Rajasthan. Ask on WhatsApp for designs, samples and rates.",
      },
      { property: "og:url", content: EN_URL },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:locale:alternate", content: "hi_IN" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: EN_URL },
      { rel: "alternate", hrefLang: "en", href: EN_URL },
      { rel: "alternate", hrefLang: "hi", href: HI_URL },
      { rel: "alternate", hrefLang: "x-default", href: EN_URL },
    ],
  }),
  component: Index,
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maeypydr";

const FAQ_SECTION_COPY: Record<Lang, { marker: string; heading: string; support: string }> = {
  en: {
    marker: "FAQ / Sourcing",
    heading: "Common questions, answered.",
    support: "Dress material, polyester sarees, and how to order.",
  },
  hi: {
    marker: "FAQ / सोर्सिंग",
    heading: "आम सवालों के जवाब।",
    support: "ड्रेस मटीरियल, पॉलिएस्टर साड़ी, और ऑर्डर कैसे करें।",
  },
  "hi-en": {
    marker: "FAQ / Sourcing",
    heading: "Common questions ke answers.",
    support: "Dress material, polyester saree, aur order kaise karein.",
  },
};

const FAQS: {
  question: Record<Lang, string>;
  answer: Record<Lang, string>;
}[] = [
  {
    question: {
      en: "Do you sell dress material wholesale from Surat?",
      hi: "क्या सूरत से ड्रेस मटीरियल होलसेल मिलता है?",
      "hi-en": "Kya Surat se dress material wholesale milta hai?",
    },
    answer: {
      en: "Yes. Dress material and unstitched suits are one of our two main categories, supplied from Surat to wholesalers, retailers, resellers and boutiques. Festive and daily-wear polyester and synthetic sets are shared on WhatsApp.",
      hi: "हाँ। ड्रेस मटीरियल और अनस्टिच्ड सूट हमारी दो मुख्य श्रेणियों में से एक हैं, जो सूरत से होलसेलर, रिटेलर, रीसेलर और बुटीक को मिलते हैं। त्योहारी और रोज़मर्रा के पॉलिएस्टर और सिंथेटिक सेट व्हाट्सएप पर भेजे जाते हैं।",
      "hi-en":
        "Haan. Dress material aur unstitched suits hamari do main categories mein se ek hain, jo Surat se wholesalers, retailers, resellers aur boutiques ko milte hain. Festive aur daily-wear polyester aur synthetic sets WhatsApp par bheje jaate hain.",
    },
  },
  {
    question: {
      en: "Do you supply polyester sarees wholesale?",
      hi: "क्या पॉलिएस्टर साड़ी होलसेल में मिलती है?",
      "hi-en": "Kya polyester saree wholesale mein milti hai?",
    },
    answer: {
      en: "Yes. Polyester sarees are our other main category from Surat. Ask on WhatsApp for the current catalogue.",
      hi: "हाँ। पॉलिएस्टर साड़ी सूरत से हमारी दूसरी मुख्य श्रेणी है। मौजूदा कैटलॉग के लिए व्हाट्सएप पर पूछिए।",
      "hi-en":
        "Haan. Polyester saree Surat se hamari doosri main category hai. Current catalogue ke liye WhatsApp par poochiye.",
    },
  },
  {
    question: {
      en: "How do I order on WhatsApp?",
      hi: "व्हाट्सएप पर ऑर्डर कैसे करें?",
      "hi-en": "WhatsApp par order kaise karein?",
    },
    answer: {
      en: "Message us with what you need — sarees, dress material, or both — and the city you sell in. We typically reply within 12 hours.",
      hi: "हमें मैसेज कीजिए कि क्या चाहिए — साड़ी, ड्रेस मटीरियल, या दोनों — और आप किस शहर में बेचते हैं। हम आमतौर पर 12 घंटे में जवाब देते हैं।",
      "hi-en":
        "Humein message kijiye ki kya chahiye — saree, dress material, ya dono — aur aap kis sheher mein bechte hain. Hum aam taur par 12 hours mein jawab dete hain.",
    },
  },
  {
    question: {
      en: "Is Vidhi Fabrics a fabric manufacturer?",
      hi: "क्या Vidhi Fabrics एक फैब्रिक निर्माता है?",
      "hi-en": "Kya Vidhi Fabrics ek fabric manufacturer hai?",
    },
    answer: {
      en: "Yes. Vidhi Fabrics is a Surat-based manufacturer and wholesaler. We manufacture some lines in-house and also supply from Surat's wider textile market, so one business answers for the whole order. We have been in the Surat textile trade since the 1960s.",
      hi: "हाँ। Vidhi Fabrics सूरत स्थित निर्माता और थोक विक्रेता है। कुछ लाइनें हम खुद बनाते हैं और साथ ही सूरत के बड़े कपड़ा बाज़ार से भी सप्लाई करते हैं, ताकि पूरे ऑर्डर की ज़िम्मेदारी एक ही व्यवसाय ले। हम 1960 के दशक से सूरत के कपड़ा व्यापार में हैं।",
      "hi-en":
        "Haan. Vidhi Fabrics Surat ka manufacturer aur wholesaler hai. Kuch lines hum khud banate hain aur saath hi Surat ke bade textile market se bhi supply karte hain, taaki poore order ki zimmedari ek hi business le. Hum 1960s se Surat ke textile trade mein hain.",
    },
  },
  {
    question: {
      en: "What types of fabrics does Vidhi Fabrics supply?",
      hi: "Vidhi Fabrics किस तरह के फैब्रिक सप्लाई करता है?",
      "hi-en": "Vidhi Fabrics kis type ke fabrics supply karta hai?",
    },
    answer: {
      en: "Our main categories are polyester sarees and dress material, which we manufacture and wholesale from Surat. Through our network of Surat mills and manufacturing units, we also source other fabrics to order, such as organza and net. Our range covers over 2,400 active SKUs across different constructions, patterns, weights and finishes. Share your requirement and our team will help you identify the right fabric.",
      hi: "हमारी मुख्य श्रेणियाँ पॉलिएस्टर साड़ियाँ और ड्रेस मटेरियल हैं, जिन्हें हम सूरत से बनाते और थोक में बेचते हैं। सूरत की मिलों और मैन्युफैक्चरिंग यूनिट्स के नेटवर्क से हम ऑर्गेंज़ा, नेट जैसे दूसरे कपड़े भी ऑर्डर पर सोर्स करते हैं। हमारी रेंज में विभिन्न कंस्ट्रक्शन, पैटर्न, वज़न और फिनिश में 2,400 से अधिक सक्रिय SKU हैं। अपनी आवश्यकता साझा करें और हमारी टीम आपको सही फैब्रिक पहचानने में मदद करेगी।",
      "hi-en":
        "Hamari main categories polyester sarees aur dress material hain, jinhe hum Surat se banate aur wholesale mein bechte hain. Surat ki mills aur manufacturing units ke network se hum organza, net jaise dusre fabrics bhi order par source karte hain. Hamari range mein alag constructions, patterns, weights aur finishes mein 2,400 se zyada active SKUs hain. Apni requirement share karein aur hamari team aapko sahi fabric identify karne mein help karegi.",
    },
  },
  {
    question: {
      en: "Who can source fabrics directly from Vidhi Fabrics?",
      hi: "Vidhi Fabrics से सीधे फैब्रिक कौन सोर्स कर सकता है?",
      "hi-en": "Vidhi Fabrics se directly fabrics kaun source kar sakta hai?",
    },
    answer: {
      en: "Wholesalers, distributors, retailers, boutique owners, garment manufacturers, apparel brands and textile traders can all source fabrics directly from us. Whether you need fabrics for wholesale distribution, retail, a boutique, or garment production — get in touch and our team will discuss your requirement.",
      hi: "थोक विक्रेता, वितरक, रिटेलर्स, बुटीक मालिक, गारमेंट निर्माता, अपैरल ब्रांड्स और टेक्सटाइल व्यापारी — सभी हमसे सीधे फैब्रिक सोर्स कर सकते हैं। चाहे आपको थोक वितरण, रिटेल, बुटीक या गारमेंट प्रोडक्शन के लिए फैब्रिक चाहिए — संपर्क करें और हमारी टीम आपकी आवश्यकता पर चर्चा करेगी।",
      "hi-en":
        "Wholesalers, distributors, retailers, boutique owners, garment manufacturers, apparel brands aur textile traders — sab directly hamare paas se fabrics source kar sakte hain. Chahe aapko wholesale distribution, retail, boutique ya garment production ke liye fabrics chahiye — contact karein aur hamari team aapki requirement discuss karegi.",
    },
  },
  {
    question: {
      en: "Do you supply fabrics to retailers and boutique owners?",
      hi: "क्या आप रिटेलर्स और बुटीक मालिकों को फैब्रिक सप्लाई करते हैं?",
      "hi-en": "Kya aap retailers aur boutique owners ko fabrics supply karte hain?",
    },
    answer: {
      en: "Yes. Retailers and boutique businesses can source fabrics directly from Vidhi Fabrics, a Surat-based manufacturer and wholesaler. If you run a fabric retail store, a boutique or a small fashion business and need a reliable supply of fabrics, reach out to our team with your requirement.",
      hi: "हाँ। रिटेलर्स और बुटीक व्यवसाय सूरत के निर्माता और थोक विक्रेता Vidhi Fabrics से सीधे फैब्रिक सोर्स कर सकते हैं। यदि आप फैब्रिक रिटेल स्टोर, बुटीक या छोटा फैशन व्यवसाय चलाते हैं और फैब्रिक की विश्वसनीय आपूर्ति चाहते हैं, तो अपनी आवश्यकता के साथ हमारी टीम से संपर्क करें।",
      "hi-en":
        "Haan. Retailers aur boutique businesses Vidhi Fabrics se directly fabrics source kar sakte hain. Agar aap fabric retail store, boutique ya chhota fashion business chalate hain aur fabrics ki reliable supply chahte hain, toh apni requirement ke saath hamari team se contact karein.",
    },
  },
  {
    question: {
      en: "Do you supply international buyers?",
      hi: "क्या आप एक्सपोर्ट के ऑर्डर लेते हैं?",
      "hi-en": "Kya aap export orders lete hain?",
    },
    answer: {
      // Export focus, not export history: Vidhi Fabrics does not export yet
      // (owner, 2 October 2026). Never state a count of countries or past
      // shipments. See BRAND.md.
      en: `Yes. Export enquiries are welcome from the UAE and other international markets. Contact us on WhatsApp or at ${BUSINESS.email}.`,
      hi: `जी हाँ। UAE और अन्य अंतरराष्ट्रीय बाज़ारों से एक्सपोर्ट पूछताछ का स्वागत है। व्हाट्सएप पर या ${BUSINESS.email} पर हमसे बात कीजिए।`,
      "hi-en": `Haan. UAE aur dusre international markets se export enquiries ka swagat hai. WhatsApp par ya ${BUSINESS.email} par hamse baat kijiye.`,
    },
  },
  {
    question: {
      en: "Can you source fabrics to a specific requirement?",
      hi: "क्या आप किसी विशेष आवश्यकता के अनुसार फैब्रिक सोर्स कर सकते हैं?",
      "hi-en": "Kya aap specific requirement ke hisaab se fabrics source kar sakte hain?",
    },
    answer: {
      en: "Yes. As a Surat-based manufacturer and wholesaler, we can work to specific requirements including particular constructions, compositions, finishes, patterns, colours and weights, coordinated directly with our network of Surat mills, dyeing and finishing units. Share your specification with our team and we will advise on what we can source for you.",
      hi: "हाँ। सूरत स्थित निर्माता और थोक विक्रेता के रूप में, हम विशेष कंस्ट्रक्शन, कम्पोज़िशन, फिनिश, पैटर्न, रंग और वज़न सहित विशेष आवश्यकताओं के अनुसार काम कर सकते हैं, जो सीधे हमारी सूरत की मिलों, डाईंग और फिनिशिंग यूनिट्स के नेटवर्क के साथ समन्वयित होता है। अपना स्पेसिफिकेशन हमारी टीम के साथ साझा करें और हम बताएँगे कि हम आपके लिए क्या सोर्स कर सकते हैं।",
      "hi-en":
        "Haan. Surat ke manufacturer aur wholesaler ke roop mein, hum specific constructions, compositions, finishes, patterns, colours aur weights ke hisaab se kaam kar sakte hain, jo directly hamare Surat ki mills, dyeing aur finishing units ke network ke saath coordinate hota hai. Apna specification hamari team ke saath share karein aur hum batayenge ki hum aapke liye kya source kar sakte hain.",
    },
  },
  {
    question: {
      en: "Can you support bulk and repeat production orders?",
      hi: "क्या आप बल्क और रिपीट प्रोडक्शन ऑर्डर संभाल सकते हैं?",
      "hi-en": "Kya aap bulk aur repeat production orders handle kar sakte hain?",
    },
    answer: {
      en: "Yes. We work with buyers who need consistent fabric supply for ongoing and repeat orders. Our network across Surat's textile industry, built over more than sixty years, means we are set up to support bulk requirements and maintain consistency across supply runs. Contact us to discuss your volume and frequency.",
      hi: "हाँ। हम उन खरीदारों के साथ काम करते हैं जिन्हें चल रहे और रिपीट ऑर्डर के लिए लगातार फैब्रिक सप्लाई की ज़रूरत है। सूरत के टेक्सटाइल उद्योग में हमारा नेटवर्क, साठ साल से ज़्यादा के अनुभव के साथ, का अर्थ है कि हम बल्क आवश्यकताओं को सपोर्ट करने और सप्लाई रन में निरंतरता बनाए रखने के लिए तैयार हैं। अपनी मात्रा और आवृत्ति पर चर्चा करने के लिए हमसे संपर्क करें।",
      "hi-en":
        "Haan. Hum un buyers ke saath kaam karte hain jinhe ongoing aur repeat orders ke liye consistent fabric supply ki zaroorat hai. Surat ke textile industry mein hamara network, saath saal se zyada ke experience ke saath, ka matlab hai ki hum bulk requirements ko support karne aur supply runs mein consistency maintain karne ke liye taiyaar hain. Apni volume aur frequency discuss karne ke liye hamare se contact karein.",
    },
  },
  {
    question: {
      en: "Can I request fabric samples?",
      hi: "क्या मैं फैब्रिक सैंपल माँग सकता हूँ?",
      "hi-en": "Kya main fabric samples maang sakta hoon?",
    },
    answer: {
      en: "Yes. You can request samples, shade cards and product specifications from our range. Contact our team through the enquiry form or WhatsApp with your requirement to get started.",
      hi: "हाँ। आप हमारी रेंज से सैंपल, शेड कार्ड और प्रोडक्ट स्पेसिफिकेशन माँग सकते हैं। शुरू करने के लिए अपनी आवश्यकता के साथ पूछताछ फॉर्म या व्हाट्सएप के माध्यम से हमारी टीम से संपर्क करें।",
      "hi-en":
        "Haan. Aap hamare range se samples, shade cards aur product specifications maang sakte hain. Shuru karne ke liye apni requirement ke saath enquiry form ya WhatsApp ke through hamari team se contact karein.",
    },
  },
  {
    question: {
      en: "How do I enquire or place an order?",
      hi: "मैं पूछताछ कैसे करूँ या ऑर्डर कैसे दूँ?",
      "hi-en": "Main enquiry kaise karun ya order kaise dun?",
    },
    answer: {
      en: "You can reach us through the enquiry form on this page, via WhatsApp, or by phone. Share your fabric requirement — the type of fabric, approximate quantity and any specific construction, composition or finish — and our trade desk will typically respond within 12 hours.",
      hi: "आप इस पेज पर पूछताछ फॉर्म के माध्यम से, व्हाट्सएप के जरिए, या फोन द्वारा हमसे संपर्क कर सकते हैं। अपनी फैब्रिक आवश्यकता साझा करें — फैब्रिक का प्रकार, अनुमानित मात्रा और कोई विशेष कंस्ट्रक्शन, कम्पोज़िशन या फिनिश — और हमारा ट्रेड डेस्क आमतौर पर 12 घंटे के भीतर जवाब देगा।",
      "hi-en":
        "Aap is page par enquiry form ke through, WhatsApp ke zariye, ya phone se hamare se contact kar sakte hain. Apni fabric requirement share karein — fabric ka type, approximate quantity aur koi specific construction, composition ya finish — aur hamara trade desk aam taur par 12 hours ke andar respond karega.",
    },
  },
  {
    question: {
      en: "What information should I provide for a sourcing or custom fabric enquiry?",
      hi: "सोर्सिंग या कस्टम फैब्रिक पूछताछ के लिए मुझे क्या जानकारी देनी चाहिए?",
      "hi-en": "Sourcing ya custom fabric enquiry ke liye mujhe kya information deni chahiye?",
    },
    answer: {
      en: "Share the fabric type (e.g. polyester sarees, dress material, organza or net), the intended use or garment application, approximate quantity, and any specific requirements around construction, composition, weight, colour, pattern or finish. For custom requirements, a reference sample, swatch or technical specification is always helpful. The more detail you can provide, the faster our team can respond.",
      hi: "फैब्रिक का प्रकार (जैसे पॉलिएस्टर साड़ी, ड्रेस मटेरियल, ऑर्गेंज़ा या नेट), इच्छित उपयोग या गारमेंट एप्लिकेशन, अनुमानित मात्रा, और कंस्ट्रक्शन, कम्पोज़िशन, वज़न, रंग, पैटर्न या फिनिश के बारे में कोई विशेष आवश्यकता साझा करें। कस्टम आवश्यकताओं के लिए, रेफरेंस सैंपल, स्वॉच या तकनीकी स्पेसिफिकेशन हमेशा सहायक होती है। आप जितनी अधिक जानकारी दे सकते हैं, हमारी टीम उतनी ही जल्दी जवाब दे सकती है।",
      "hi-en":
        "Fabric ka type (jaise polyester saree, dress material, organza ya net), intended use ya garment application, approximate quantity, aur construction, composition, weight, colour, pattern ya finish ke baare mein koi specific requirement share karein. Custom requirements ke liye, ek reference sample, swatch ya technical specification hamesha helpful hoti hai. Aap jitni zyada detail de sakte hain, hamari team utni jaldi respond kar sakti hai.",
    },
  },
  {
    question: {
      en: "How can I contact Vidhi Fabrics?",
      hi: "मैं Vidhi Fabrics से कैसे संपर्क कर सकता हूँ?",
      "hi-en": "Main Vidhi Fabrics se kaise contact kar sakta hoon?",
    },
    answer: {
      en: `You can reach us via the enquiry form on this page, by WhatsApp, or by phone. Our trade desk is available Monday to Saturday and typically responds within 12 hours. You can also visit us at ${ADDRESS_LINES.en.join(", ")}.`,
      hi: `आप इस पेज पर पूछताछ फॉर्म के माध्यम से, व्हाट्सएप द्वारा, या फोन पर हमसे संपर्क कर सकते हैं। हमारा ट्रेड डेस्क सोमवार से शनिवार तक उपलब्ध है और आमतौर पर 12 घंटे के भीतर जवाब देता है। आप ${ADDRESS_LINES.hi.join(", ")} में भी हमसे मिल सकते हैं।`,
      "hi-en": `Aap is page par enquiry form ke through, WhatsApp se, ya phone par hamare se contact kar sakte hain. Hamara trade desk Monday se Saturday tak available hai aur aam taur par 12 hours ke andar respond karta hai. Aap ${ADDRESS_LINES["hi-en"].join(", ")} mein bhi hamare paas aa sakte hain.`,
    },
  },
];

const WHATSAPP_MESSAGES: Record<Lang, string> = {
  en: "Hi Vidhi Fabrics, I am looking for a fabric.",
  hi: "नमस्ते Vidhi Fabrics, मुझे एक कपड़ा चाहिए।",
  "hi-en": "Hi Vidhi Fabrics, mujhe ek fabric chahiye.",
};

function getWhatsAppUrl(lang: Lang) {
  return whatsAppUrl(WHATSAPP_MESSAGES[lang]);
}

function Index() {
  useReveal();
  const lead = useLeadContext("/");
  const [lang, setLang] = useState<Lang>("en");
  const [sent, setSent] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  // Opens after real engagement (half the page or 35 s), once a session,
  // never on load. See src/components/lead-popup.tsx.
  const [leadOpen, setLeadOpen] = useEngagementPopup();

  return (
    <div className="vf-home min-h-screen font-body text-foreground antialiased selection:bg-clay/15">
      <PromoSuitsTicker lang={lang} />
      <HomeHeader lang={lang} setLang={setLang} whatsAppHref={getWhatsAppUrl(lang)} route="en" />

      <main id="main">
        <ShowroomHero lang={lang} enquireHref={getWhatsAppUrl(lang)} />

        <ShowroomRanges lang={lang} />

        <ShowroomTrust lang={lang} />

        <FabricCatalogueSection lang={lang} />

        <AboutSection lang={lang} whatsappUrl={getWhatsAppUrl(lang)} />

        <ResellerCircleStrip lang={lang} />

        <section id="contact" data-reveal className="scroll-mt-36">
          <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24 lg:px-[50px] lg:py-28">
            <h2 className="text-balance font-display text-4xl font-light tracking-normal lg:text-5xl">
              {COPY.homeCta.heading[lang]}
            </h2>
            <p className="mt-5 max-w-[42ch] text-pretty text-lg leading-relaxed text-mute">
              {COPY.homeCta.support[lang]}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a
                href={getWhatsAppUrl(lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[88px] items-center justify-center rounded-sm bg-clay px-5 py-4 text-center font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-claydeep"
              >
                {COPY.nav.cta[lang]}
              </a>
              <a
                href="#inquiry"
                className="flex min-h-[88px] items-center justify-center rounded-sm border border-clay px-5 py-4 text-center text-sm text-clay transition-colors hover:bg-clay/5"
              >
                {COPY.contact.cta[lang]}
              </a>
            </div>
            <p className="mt-8 font-mono text-sm text-mute">
              <a href={`tel:${BUSINESS.phone}`} className="vf-link-maroon">
                {BUSINESS.phoneDisplay}
              </a>
              <span className="mx-2">·</span>
              <a href={`mailto:${BUSINESS.email}`} className="vf-link-maroon break-all">
                {BUSINESS.email}
              </a>
            </p>
            <div id="inquiry" className="mx-auto mt-14 max-w-xl scroll-mt-36">
              <p className="font-mono text-xs uppercase tracking-label text-clay">
                {COPY.inquiry.label[lang]}
              </p>
              <p className="mt-1 text-sm text-mute">{COPY.inquiry.sub[lang]}</p>
              <form
                className="mt-5 space-y-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (inquiryStatus === "sending") return;

                  const form = e.currentTarget;
                  const ctx = currentLeadContext();
                  setInquiryStatus("sending");
                  setSent(false);

                  try {
                    const body = new FormData(form);
                    body.set("source", ctx.source);
                    body.set("page", ctx.page);
                    body.set("ref_code", ctx.ref);
                    const response = await fetch(FORMSPREE_ENDPOINT, {
                      method: "POST",
                      body,
                      headers: { Accept: "application/json" },
                    });

                    if (!response.ok) throw new Error("Formspree submission failed");

                    form.reset();
                    trackLeadEvent("form_submit", {
                      page: ctx.page,
                      source: ctx.source,
                      ref_code: ctx.ref,
                    });
                    setInquiryStatus("success");
                    setSent(true);
                  } catch {
                    setInquiryStatus("error");
                  }
                }}
              >
                {/* Lead-source codes; see docs/lead-source-legend.md. */}
                <input type="hidden" name="source" value={lead.source} />
                <input type="hidden" name="page" value={lead.page} />
                <input type="hidden" name="ref_code" value={lead.ref} />
                <input
                  required
                  name="company"
                  className="w-full rounded-sm bg-paper px-3 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-clay"
                  placeholder={COPY.inquiry.company[lang]}
                  aria-label={COPY.inquiry.company[lang]}
                />
                <input
                  required
                  type="email"
                  name="email"
                  className="w-full rounded-sm bg-paper px-3 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-clay"
                  placeholder={COPY.inquiry.email[lang]}
                  aria-label={COPY.inquiry.email[lang]}
                />
                <input
                  name="phone"
                  className="w-full rounded-sm bg-paper px-3 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-clay"
                  placeholder={COPY.inquiry.phone[lang]}
                  aria-label={COPY.inquiry.phone[lang]}
                />
                <select
                  name="buyer_type"
                  className="w-full rounded-sm bg-paper px-3 py-2.5 text-sm text-mute outline-none ring-1 ring-line focus:ring-clay"
                  aria-label={COPY.inquiry.buyerTypes.retail[lang]}
                >
                  <option>{COPY.inquiry.buyerTypes.retail[lang]}</option>
                  <option>{COPY.inquiry.buyerTypes.wholesaler[lang]}</option>
                  <option>{COPY.inquiry.buyerTypes.trader[lang]}</option>
                  <option>{COPY.inquiry.buyerTypes.manufacturer[lang]}</option>
                </select>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full resize-none rounded-sm bg-paper px-3 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-clay"
                  placeholder={COPY.inquiry.message[lang]}
                  aria-label={COPY.inquiry.message[lang]}
                />
                <button
                  type="submit"
                  disabled={inquiryStatus === "sending"}
                  className="vf-btn-maroon w-full rounded-sm py-3 font-mono text-xs uppercase tracking-label transition-colors"
                >
                  {inquiryStatus === "sending" ? "Sending..." : COPY.inquiry.submit[lang]}
                </button>
                {inquiryStatus === "success" && sent ? (
                  <p role="status" aria-live="polite" className="pt-1 text-sm text-sage">
                    Thanks! We’ve received your requirement. Our team will get in touch with you
                    shortly.
                  </p>
                ) : null}
                {inquiryStatus === "error" ? (
                  <p role="alert" aria-live="assertive" className="pt-1 text-sm text-error">
                    Something went wrong. Please try again or contact us directly.
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </section>

        <section data-reveal id="faq" className="scroll-mt-36">
          <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20 lg:px-[50px] lg:py-24">
            <p className="font-mono text-xs uppercase tracking-label text-clay">
              {FAQ_SECTION_COPY[lang].marker}
            </p>
            <h2 className="mt-4 font-display text-4xl font-light tracking-normal lg:text-5xl">
              {FAQ_SECTION_COPY[lang].heading}
            </h2>
            <p className="mt-4 text-lg text-mute">{FAQ_SECTION_COPY[lang].support}</p>

            <Accordion type="single" collapsible className="mt-10">
              {FAQS.map((faq, index) => (
                <AccordionItem
                  key={faq.question.en}
                  value={`faq-${index}`}
                  className="group/faq border-line"
                >
                  <AccordionTrigger
                    aria-controls={`faq-panel-${index}`}
                    className="font-display text-lg font-light text-ink hover:no-underline"
                  >
                    {faq.question[lang]}
                  </AccordionTrigger>
                  <AccordionPanel
                    id={`faq-panel-${index}`}
                    className="max-w-2xl text-base leading-relaxed text-mute"
                  >
                    {faq.answer[lang]}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>

            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: FAQS.map((faq) => ({
                    "@type": "Question",
                    name: faq.question.en,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer.en,
                    },
                  })),
                }),
              }}
            />
          </div>
        </section>

        <ReachStrip lang={lang} mapHref="/about#reach-map" />
      </main>

      <SiteFooter lang={lang} />

      <WhatsAppPill lang={lang} />

      {leadOpen ? (
        <LeadPopup lang={lang} formName="Website entry pop-up" onClose={() => setLeadOpen(false)} />
      ) : null}
    </div>
  );
}
