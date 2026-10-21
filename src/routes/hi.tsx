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
import { trackLeadEvent } from "@/lib/analytics";
import { currentLeadContext } from "@/lib/lead-source";
import { useReveal } from "@/hooks/use-reveal";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { COPY, type Lang } from "@/content/translations";

const EN_URL = "https://www.vidhifabrics.com/";
const HI_URL = "https://www.vidhifabrics.com/hi";

export const Route = createFileRoute("/hi")({
  head: () => ({
    meta: [
      {
        title: "साड़ी और ड्रेस मटेरियल निर्माता व होलसेलर, सूरत | विधि फैब्रिक्स",
      },
      {
        name: "description",
        content:
          "सूरत के पॉलिएस्टर साड़ी और ड्रेस मटेरियल निर्माता व होलसेलर — पंजाब, हरियाणा, राजस्थान के होलसेलर, रिटेलर, रीसेलर और बुटीक के लिए। डिज़ाइन और रेट व्हाट्सएप पर।",
      },
      {
        property: "og:title",
        content: "साड़ी और ड्रेस मटेरियल निर्माता व होलसेलर, सूरत | विधि फैब्रिक्स",
      },
      {
        property: "og:description",
        content:
          "विधि फैब्रिक्स सूरत की पॉलिएस्टर साड़ी और ड्रेस मटेरियल निर्माता व थोक विक्रेता है, जो पंजाब, हरियाणा और राजस्थान के होलसेलर, रिटेलर, रीसेलर और बुटीक को माल देती है। डिज़ाइन, सैंपल और रेट के लिए व्हाट्सएप करें।",
      },
      { property: "og:url", content: HI_URL },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "hi_IN" },
      { property: "og:locale:alternate", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: HI_URL },
      { rel: "alternate", hreflang: "en", href: EN_URL },
      { rel: "alternate", hreflang: "hi", href: HI_URL },
      { rel: "alternate", hreflang: "x-default", href: EN_URL },
    ],
  }),
  component: HiIndex,
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
  // Short block for the Hindi homepage. Meaning matches the English strings.
  // Native speaker review still outstanding — see BRAND.md.
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
      hi: "क्या विधि फैब्रिक्स एक कपड़ा निर्माता है?",
      "hi-en": "Kya Vidhi Fabrics ek fabric manufacturer hai?",
    },
    answer: {
      en: "Yes. Vidhi Fabrics is a Surat-based manufacturer and wholesaler. We manufacture some lines in-house and also supply from Surat's wider textile market, so one business answers for the whole order. We have been in the Surat textile trade since the 1960s.",
      hi: "हाँ। विधि फैब्रिक्स सूरत स्थित निर्माता और थोक विक्रेता है। कुछ लाइनें हम खुद बनाते हैं और साथ ही सूरत के बड़े कपड़ा बाज़ार से भी सप्लाई करते हैं, ताकि पूरे ऑर्डर की ज़िम्मेदारी एक ही व्यवसाय ले। हम 1960 के दशक से सूरत के कपड़ा व्यापार में हैं।",
      "hi-en":
        "Haan. Vidhi Fabrics Surat ka manufacturer aur wholesaler hai. Kuch lines hum khud banate hain aur saath hi Surat ke bade textile market se bhi supply karte hain, taaki poore order ki zimmedari ek hi business le. Hum 1960s se Surat ke textile trade mein hain.",
    },
  },
  {
    question: {
      en: "What types of fabrics does Vidhi Fabrics supply?",
      hi: "विधि फैब्रिक्स कौन-कौन से कपड़े सप्लाई करता है?",
      "hi-en": "Vidhi Fabrics kis type ke fabrics supply karta hai?",
    },
    answer: {
      en: "Our main categories are polyester sarees and dress material, which we manufacture and wholesale from Surat. Through our network of Surat mills and manufacturing units, we also source other fabrics to order, such as organza and net.",
      hi: "हमारी मुख्य श्रेणियाँ पॉलिएस्टर साड़ियाँ और ड्रेस मटेरियल हैं, जिन्हें हम सूरत से बनाते और थोक में बेचते हैं। सूरत की मिलों और मैन्युफैक्चरिंग यूनिट्स के नेटवर्क से हम ऑर्गेंज़ा, नेट जैसे दूसरे कपड़े भी ऑर्डर पर सोर्स करते हैं। हमारी रेंज में 2,400 से अधिक सक्रिय SKU हैं। अपनी ज़रूरत बताएँ और हमारी टीम सही कपड़ा पहचानने में मदद करेगी।",
      "hi-en":
        "Hamari main categories polyester sarees aur dress material hain, jinhe hum Surat se banate aur wholesale mein bechte hain. Surat ki mills aur manufacturing units ke network se hum organza, net jaise dusre fabrics bhi order par source karte hain.",
    },
  },
  {
    question: {
      en: "Who can source fabrics directly from Vidhi Fabrics?",
      hi: "विधि फैब्रिक्स से सीधे कपड़ा कौन ले सकता है?",
      "hi-en": "Vidhi Fabrics se directly fabrics kaun le sakta hai?",
    },
    answer: {
      en: "Wholesalers, distributors, retailers, boutique owners, garment manufacturers and textile traders can all source fabrics directly from us.",
      hi: "थोक विक्रेता, वितरक, रिटेलर्स, बुटीक मालिक, गारमेंट निर्माता और कपड़ा व्यापारी — सभी सीधे हमसे कपड़ा ले सकते हैं। चाहे आपको थोक, रिटेल, बुटीक या गारमेंट प्रोडक्शन के लिए कपड़ा चाहिए — संपर्क करें।",
      "hi-en":
        "Wholesalers, retailers, boutique owners, garment manufacturers aur textile traders — sab directly hamare paas se fabrics le sakte hain.",
    },
  },
  {
    question: {
      en: "Do you supply fabrics to retailers and boutique owners?",
      hi: "क्या आप रिटेलर्स और बुटीक मालिकों को कपड़ा सप्लाई करते हैं?",
      "hi-en": "Kya aap retailers aur boutique owners ko fabrics supply karte hain?",
    },
    answer: {
      en: "Yes. Retailers and boutique businesses can source fabrics directly from Vidhi Fabrics, a Surat-based manufacturer and wholesaler.",
      hi: "हाँ। रिटेलर्स और बुटीक व्यवसाय सीधे सूरत के निर्माता और थोक विक्रेता विधि फैब्रिक्स से कपड़ा ले सकते हैं। अगर आप कपड़ा रिटेल स्टोर, बुटीक या छोटा फैशन व्यवसाय चलाते हैं, तो अपनी ज़रूरत के साथ हमसे संपर्क करें।",
      "hi-en":
        "Haan. Retailers aur boutique businesses Vidhi Fabrics se directly fabrics source kar sakte hain.",
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
      hi: "क्या आप किसी विशेष ज़रूरत के हिसाब से कपड़ा सोर्स कर सकते हैं?",
      "hi-en": "Kya aap specific requirement ke hisaab se fabrics source kar sakte hain?",
    },
    answer: {
      en: "Yes. As a Surat-based manufacturer and wholesaler, we can work to specific requirements including constructions, compositions, finishes, patterns, colours and weights, coordinated directly with our network of Surat mills, dyeing and finishing units.",
      hi: "हाँ। सूरत स्थित निर्माता और थोक विक्रेता के रूप में, हम विशेष कंस्ट्रक्शन, कम्पोज़िशन, फिनिश, पैटर्न, रंग और वज़न के हिसाब से ज़रूरतों पर काम कर सकते हैं, जो सीधे हमारी सूरत की मिलों, रंगाई और फिनिशिंग यूनिट्स के नेटवर्क के साथ समन्वयित होता है। अपनी ज़रूरत बताएँ।",
      "hi-en":
        "Haan. Surat ke manufacturer aur wholesaler ke roop mein hum specific constructions, finishes, patterns, colours aur weights ke hisaab se kaam kar sakte hain, jo directly hamare Surat ki mills, dyeing aur finishing units ke network ke saath coordinate hota hai.",
    },
  },
  {
    question: {
      en: "Can you support bulk and repeat production orders?",
      hi: "क्या आप बड़े और बार-बार आने वाले ऑर्डर संभाल सकते हैं?",
      "hi-en": "Kya aap bulk aur repeat orders handle kar sakte hain?",
    },
    answer: {
      en: "Yes. We work with buyers who need consistent fabric supply for ongoing and repeat orders.",
      hi: "हाँ। हम उन खरीदारों के साथ काम करते हैं जिन्हें नियमित और बड़े ऑर्डर के लिए लगातार कपड़ा चाहिए। सूरत के टेक्सटाइल उद्योग में हमारा नेटवर्क और साठ साल से ज़्यादा का अनुभव इसे संभव बनाता है। अपनी मात्रा और आवृत्ति पर चर्चा के लिए संपर्क करें।",
      "hi-en":
        "Haan. Hum un buyers ke saath kaam karte hain jinhe regular aur bulk orders ke liye consistent fabric supply ki zaroorat hai.",
    },
  },
  {
    question: {
      en: "Can I request fabric samples?",
      hi: "क्या मैं कपड़े का सैंपल माँग सकता हूँ?",
      "hi-en": "Kya main fabric samples maang sakta hoon?",
    },
    answer: {
      en: "Yes. You can request samples, shade cards and product specifications from our range.",
      hi: "हाँ। आप हमारी रेंज से सैंपल, शेड कार्ड और प्रोडक्ट स्पेसिफिकेशन माँग सकते हैं। शुरू करने के लिए पूछताछ फॉर्म या व्हाट्सएप के ज़रिए हमसे संपर्क करें।",
      "hi-en":
        "Haan. Aap hamare range se samples, shade cards aur product specifications maang sakte hain.",
    },
  },
  {
    question: {
      en: "How do I enquire or place an order?",
      hi: "मैं पूछताछ कैसे करूँ या ऑर्डर कैसे दूँ?",
      "hi-en": "Main enquiry kaise karun ya order kaise dun?",
    },
    answer: {
      en: "You can reach us through the enquiry form on this page, via WhatsApp, or by phone. Our trade desk typically responds within 12 hours.",
      hi: "आप इस पेज पर पूछताछ फॉर्म के ज़रिए, व्हाट्सएप से, या फोन पर हमसे संपर्क कर सकते हैं। कपड़े का प्रकार, अनुमानित मात्रा और कोई विशेष ज़रूरत बताएँ — हमारा ट्रेड डेस्क आमतौर पर 12 घंटे के भीतर जवाब देगा।",
      "hi-en":
        "Aap enquiry form, WhatsApp ya phone se hamare se contact kar sakte hain. Hamara trade desk aam taur par 12 hours mein respond karta hai.",
    },
  },
  {
    question: {
      en: "What information should I provide for a sourcing or custom enquiry?",
      hi: "कस्टम या सोर्सिंग पूछताछ के लिए क्या जानकारी दें?",
      "hi-en": "Custom ya sourcing enquiry ke liye kya information deni chahiye?",
    },
    answer: {
      en: "Share the fabric type, intended use, approximate quantity, and any specific requirements around construction, composition, weight, colour, pattern or finish.",
      hi: "कपड़े का प्रकार (जैसे पॉलिएस्टर साड़ी, ड्रेस मटेरियल, ऑर्गेंज़ा या नेट), उपयोग, अनुमानित मात्रा, और कंस्ट्रक्शन, रंग, पैटर्न या फिनिश से जुड़ी विशेष ज़रूरत बताएँ। कस्टम ऑर्डर के लिए रेफरेंस सैंपल या तकनीकी स्पेसिफिकेशन भी सहायक होती है।",
      "hi-en":
        "Fabric ka type, intended use, approximate quantity, aur koi specific construction, colour, pattern ya finish requirement share karein.",
    },
  },
  {
    question: {
      en: "How can I contact Vidhi Fabrics?",
      hi: "विधि फैब्रिक्स से कैसे संपर्क करें?",
      "hi-en": "Vidhi Fabrics se kaise contact karein?",
    },
    answer: {
      en: "You can reach us via the enquiry form, by WhatsApp, or by phone. Our trade desk is available Monday to Saturday and typically responds within 12 hours.",
      hi: `आप पूछताछ फॉर्म, व्हाट्सएप या फोन के ज़रिए हमसे संपर्क कर सकते हैं। हमारा ट्रेड डेस्क सोमवार से शनिवार तक उपलब्ध है और आमतौर पर 12 घंटे के भीतर जवाब देता है। आप ${ADDRESS_LINES.hi.join(", ")} भी आ सकते हैं।`,
      "hi-en":
        "Enquiry form, WhatsApp ya phone se contact karein. Trade desk Monday to Saturday available hai aur aam taur par 12 hours mein respond karta hai.",
    },
  },
];

const WHATSAPP_MESSAGES: Record<Lang, string> = {
  en: "Hi Vidhi Fabrics, I am looking for a fabric.",
  hi: "नमस्ते विधि फैब्रिक्स, मुझे कपड़े के बारे में जानकारी चाहिए।",
  "hi-en": "Hi Vidhi Fabrics, mujhe fabric ke baare mein jaankari chahiye.",
};

function getWhatsAppUrl(lang: Lang) {
  return whatsAppUrl(WHATSAPP_MESSAGES[lang]);
}

function HiIndex() {
  useReveal();
  const lead = useLeadContext("/hi");
  const [lang, setLang] = useState<Lang>("hi");
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
      <HomeHeader
        lang={lang}
        setLang={setLang}
        whatsAppHref={getWhatsAppUrl(lang)}
        route="hi"
      />

      <main id="main">
        <ShowroomHero lang={lang} enquireHref={getWhatsAppUrl(lang)} />

        <ShowroomRanges lang={lang} />

        <ShowroomTrust lang={lang} />

        <FabricCatalogueSection lang={lang} />

        <AboutSection lang={lang} whatsappUrl={getWhatsAppUrl(lang)} />

        <ResellerCircleStrip lang={lang} />

        <section id="contact" data-reveal className="scroll-mt-36">
          <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-24 lg:px-[50px] lg:py-28">
            <h2 className="text-balance font-display text-4xl font-light tracking-tight lg:text-5xl">
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
                className="flex min-h-[88px] items-center justify-center rounded-sm bg-clay px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-claydeep"
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
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-clay">
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
                  className="vf-btn-maroon w-full rounded-sm py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors"
                >
                  {inquiryStatus === "sending" ? "भेजा जा रहा है..." : COPY.inquiry.submit[lang]}
                </button>
                {inquiryStatus === "success" && sent ? (
                  <p role="status" aria-live="polite" className="pt-1 text-sm text-sage">
                    {COPY.inquiry.sent[lang]}
                  </p>
                ) : null}
                {inquiryStatus === "error" ? (
                  <p role="alert" aria-live="assertive" className="pt-1 text-sm text-claydeep">
                    कुछ गलत हो गया। कृपया दोबारा कोशिश करें या सीधे संपर्क करें।
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </section>

        <section data-reveal id="faq" className="scroll-mt-36">
          <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20 lg:px-[50px] lg:py-24">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
              {FAQ_SECTION_COPY[lang].marker}
            </p>
            <h2 className="mt-4 font-display text-4xl font-light tracking-tight lg:text-5xl">
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

        <ReachStrip lang={lang} mapHref="/hi/about#reach-map" />
      </main>

      <SiteFooter lang={lang} />

      <WhatsAppPill lang={lang} />

      {leadOpen ? (
        <LeadPopup
          lang={lang}
          formName="Website entry pop-up (Hindi)"
          onClose={() => setLeadOpen(false)}
        />
      ) : null}
    </div>
  );
}
