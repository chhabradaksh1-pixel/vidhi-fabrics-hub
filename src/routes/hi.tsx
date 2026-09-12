import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Linkedin } from "lucide-react";

import warehouseShowroom from "@/assets/maxresdefault.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AboutSection,
  FabricDeskSection,
  JournalPreview,
} from "@/components/fabric-desk";
import { FABRICS } from "@/content/fabrics";
import {
  CATEGORY_LABELS,
  COPY,
  type FabricCategory,
  type Lang,
} from "@/content/translations";

const EN_URL = "https://www.vidhifabrics.com/";
const HI_URL = "https://www.vidhifabrics.com/hi";

export const Route = createFileRoute("/hi")({
  head: () => ({
    meta: [
      {
        title: "सूरत में थोक कपड़ा सप्लायर | विधि फैब्रिक्स",
      },
      {
        name: "description",
        content:
          "विधि फैब्रिक्स से कॉटन, सिल्क, लिनन, पॉलिएस्टर और जैक्वार्ड कपड़ों की थोक जानकारी लें। अपनी ज़रूरत बताकर सैंपल, उपलब्धता और कोटेशन पूछें।",
      },
      {
        property: "og:title",
        content: "सूरत में थोक कपड़ा सप्लायर | विधि फैब्रिक्स",
      },
      {
        property: "og:description",
        content:
          "विधि फैब्रिक्स से कॉटन, सिल्क, लिनन, पॉलिएस्टर और जैक्वार्ड कपड़ों की थोक जानकारी लें। अपनी ज़रूरत बताकर सैंपल, उपलब्धता और कोटेशन पूछें।",
      },
      { property: "og:url", content: HI_URL },
      { property: "og:type", content: "website" },
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

const CATEGORIES: FabricCategory[] = [
  "all",
  "cotton",
  "silk",
  "linen",
  "polyester",
  "jacquard",
];

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maeypydr";
const WHATSAPP_NUMBER = "919825208413";

const FAQ_SECTION_COPY: Record<Lang, { marker: string; heading: string }> = {
  en: { marker: "FAQ / Sourcing", heading: "Common questions, answered." },
  hi: { marker: "FAQ / सोर्सिंग", heading: "आम सवालों के जवाब।" },
  "hi-en": { marker: "FAQ / Sourcing", heading: "Common questions ke answers." },
};

const FAQS: {
  question: Record<Lang, string>;
  answer: Record<Lang, string>;
}[] = [
  {
    question: {
      en: "Is Vidhi Fabrics a fabric manufacturer?",
      hi: "क्या विधि फैब्रिक्स एक कपड़ा निर्माता है?",
      "hi-en": "Kya Vidhi Fabrics ek fabric manufacturer hai?",
    },
    answer: {
      en: "Yes. Vidhi Fabrics is a fabric manufacturer and wholesale supplier based in Surat, India — a family business that began when our grandfather started trading cloth here in the 1960s.",
      hi: "हाँ। विधि फैब्रिक्स एक कपड़ा निर्माता और थोक सप्लायर है, जो सूरत, भारत में स्थित है — एक पारिवारिक कारोबार, जिसकी शुरुआत 1960 के दशक में हमारे दादाजी के कपड़ा व्यापार से हुई। सूरत एशिया का सबसे बड़ा टेक्सटाइल हब है, और यहाँ से संचालित होने के कारण हमें उत्पादन, रंगाई, फिनिशिंग और व्यापक टेक्सटाइल सप्लाई चेन तक सीधी पहुँच मिलती है। खरीदार अपनी ज़रूरत के लिए सीधे हमसे संपर्क कर सकते हैं।",
      "hi-en": "Haan. Vidhi Fabrics ek fabric manufacturer aur wholesale supplier hai, jo Surat, India mein based hai — ek family business, jiski shuruaat 1960s mein hamare dadaji ke kapda vyapar se hui.",
    },
  },
  {
    question: {
      en: "What types of fabrics does Vidhi Fabrics manufacture and supply?",
      hi: "विधि फैब्रिक्स कौन-कौन से कपड़े बनाता और सप्लाई करता है?",
      "hi-en": "Vidhi Fabrics kis type ke fabrics manufacture aur supply karta hai?",
    },
    answer: {
      en: "We manufacture and supply cotton, silk, linen, polyester, jacquard and blended fabrics.",
      hi: "हम कॉटन, सिल्क, लिनन, पॉलिएस्टर, जैक्वार्ड और ब्लेंडेड कपड़े बनाते और सप्लाई करते हैं — जिसमें बुने, प्रिंटेड, रंगे और फिनिश्ड वैरायटी शामिल हैं। हमारी रेंज में 2,400 से अधिक सक्रिय SKU हैं। अपनी ज़रूरत बताएँ और हमारी टीम सही कपड़ा पहचानने में मदद करेगी।",
      "hi-en": "Hum cotton, silk, linen, polyester, jacquard aur blended fabrics manufacture aur supply karte hain.",
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
      "hi-en": "Wholesalers, retailers, boutique owners, garment manufacturers aur textile traders — sab directly hamare paas se fabrics le sakte hain.",
    },
  },
  {
    question: {
      en: "Do you supply fabrics to retailers and boutique owners?",
      hi: "क्या आप रिटेलर्स और बुटीक मालिकों को कपड़ा सप्लाई करते हैं?",
      "hi-en": "Kya aap retailers aur boutique owners ko fabrics supply karte hain?",
    },
    answer: {
      en: "Yes. Retailers and boutique businesses can source fabrics directly from Vidhi Fabrics as a manufacturer.",
      hi: "हाँ। रिटेलर्स और बुटीक व्यवसाय सीधे विधि फैब्रिक्स से कपड़ा ले सकते हैं। अगर आप कपड़ा रिटेल स्टोर, बुटीक या छोटा फैशन व्यवसाय चलाते हैं, तो अपनी ज़रूरत के साथ हमसे संपर्क करें।",
      "hi-en": "Haan. Retailers aur boutique businesses Vidhi Fabrics se directly fabrics source kar sakte hain.",
    },
  },
  {
    question: {
      en: "Can international buyers source directly from Vidhi Fabrics?",
      hi: "क्या विदेशी खरीदार विधि फैब्रिक्स से सीधे कपड़ा मँगा सकते हैं?",
      "hi-en": "Kya international buyers Vidhi Fabrics se directly source kar sakte hain?",
    },
    answer: {
      en: "Yes. We supply fabrics across 40+ export markets. Our team handles export documentation end to end.",
      hi: "हाँ। हम 40 से अधिक निर्यात बाज़ारों में कपड़ा सप्लाई करते हैं। विदेशी खरीदार सीधे हमसे संपर्क कर सकते हैं। हमारी टीम निर्यात दस्तावेज़ीकरण शुरू से अंत तक संभालती है।",
      "hi-en": "Haan. Hum 40+ export markets mein fabrics supply karte hain. Hamari team export documentation end to end handle karti hai.",
    },
  },
  {
    question: {
      en: "Can you manufacture fabrics to a specific requirement?",
      hi: "क्या आप किसी विशेष ज़रूरत के हिसाब से कपड़ा बना सकते हैं?",
      "hi-en": "Kya aap specific requirement ke hisaab se fabrics bana sakte hain?",
    },
    answer: {
      en: "Yes. As a manufacturer based in Surat, we can work to specific requirements including constructions, compositions, finishes, patterns, colours and weights.",
      hi: "हाँ। सूरत में एक निर्माता के रूप में, हम विशेष कंस्ट्रक्शन, कम्पोज़िशन, फिनिश, पैटर्न, रंग और वज़न के हिसाब से कपड़ा बना सकते हैं। हमारे पास इन-हाउस रंगाई और फिनिशिंग की सुविधा भी है। अपनी ज़रूरत बताएँ।",
      "hi-en": "Haan. Surat mein manufacturer ke roop mein hum specific constructions, finishes, patterns, colours aur weights ke hisaab se kaam kar sakte hain.",
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
      hi: "हाँ। हम उन खरीदारों के साथ काम करते हैं जिन्हें नियमित और बड़े ऑर्डर के लिए लगातार कपड़ा चाहिए। सूरत में हमारा उत्पादन आधार और तीन पीढ़ियों का अनुभव इसे संभव बनाता है। अपनी मात्रा और आवृत्ति पर चर्चा के लिए संपर्क करें।",
      "hi-en": "Haan. Hum un buyers ke saath kaam karte hain jinhe regular aur bulk orders ke liye consistent fabric supply ki zaroorat hai.",
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
      "hi-en": "Haan. Aap hamare range se samples, shade cards aur product specifications maang sakte hain.",
    },
  },
  {
    question: {
      en: "What is the minimum order quantity?",
      hi: "न्यूनतम ऑर्डर मात्रा क्या है?",
      "hi-en": "Minimum order quantity kya hai?",
    },
    answer: {
      en: "Minimum order quantities vary depending on the fabric type, construction, colour, finish and specific requirement. Contact our team for the relevant MOQ.",
      hi: "न्यूनतम ऑर्डर मात्रा कपड़े के प्रकार, कंस्ट्रक्शन, रंग, फिनिश और आवश्यकता के आधार पर अलग-अलग होती है। सही जानकारी के लिए हमारी टीम से संपर्क करें।",
      "hi-en": "Minimum order quantity fabric type, construction, colour aur requirement ke hisaab se alag hoti hai. Relevant MOQ ke liye hamse contact karein.",
    },
  },
  {
    question: {
      en: "How do I enquire or place an order?",
      hi: "मैं पूछताछ कैसे करूँ या ऑर्डर कैसे दूँ?",
      "hi-en": "Main enquiry kaise karun ya order kaise dun?",
    },
    answer: {
      en: "You can reach us through the enquiry form on this page, via WhatsApp, or by phone. Our trade desk responds within 12 hours.",
      hi: "आप इस पेज पर पूछताछ फॉर्म के ज़रिए, व्हाट्सएप से, या फोन पर हमसे संपर्क कर सकते हैं। कपड़े का प्रकार, अनुमानित मात्रा और कोई विशेष ज़रूरत बताएँ — हमारा ट्रेड डेस्क 12 घंटे के भीतर जवाब देगा।",
      "hi-en": "Aap enquiry form, WhatsApp ya phone se hamare se contact kar sakte hain. Hamara trade desk 12 hours mein respond karta hai.",
    },
  },
  {
    question: {
      en: "What information should I provide for a manufacturing or custom enquiry?",
      hi: "कस्टम या मैन्युफैक्चरिंग पूछताछ के लिए क्या जानकारी दें?",
      "hi-en": "Custom ya manufacturing enquiry ke liye kya information deni chahiye?",
    },
    answer: {
      en: "Share the fabric type, intended use, approximate quantity, and any specific requirements around construction, composition, weight, colour, pattern or finish.",
      hi: "कपड़े का प्रकार (जैसे कॉटन, सिल्क, लिनन, जैक्वार्ड), उपयोग, अनुमानित मात्रा, और कंस्ट्रक्शन, रंग, पैटर्न या फिनिश से जुड़ी विशेष ज़रूरत बताएँ। कस्टम ऑर्डर के लिए रेफरेंस सैंपल या तकनीकी स्पेसिफिकेशन भी सहायक होती है।",
      "hi-en": "Fabric ka type, intended use, approximate quantity, aur koi specific construction, colour, pattern ya finish requirement share karein.",
    },
  },
  {
    question: {
      en: "How can I contact Vidhi Fabrics?",
      hi: "विधि फैब्रिक्स से कैसे संपर्क करें?",
      "hi-en": "Vidhi Fabrics se kaise contact karein?",
    },
    answer: {
      en: "You can reach us via the enquiry form, by WhatsApp, or by phone. Our trade desk is available Monday to Saturday and responds within 12 hours.",
      hi: "आप पूछताछ फॉर्म, व्हाट्सएप या फोन के ज़रिए हमसे संपर्क कर सकते हैं। हमारा ट्रेड डेस्क सोमवार से शनिवार तक उपलब्ध है और 12 घंटे के भीतर जवाब देता है। आप 542-543 गोल्डन पॉइंट, बेगमपुरा रोड, सूरत, गुजरात भी आ सकते हैं।",
      "hi-en": "Enquiry form, WhatsApp ya phone se contact karein. Trade desk Monday to Saturday available hai aur 12 hours mein respond karta hai.",
    },
  },
];

const WHATSAPP_MESSAGES: Record<Lang, string> = {
  en: "Hi Vidhi Fabrics, I am looking for a fabric.",
  hi: "नमस्ते विधि फैब्रिक्स, मुझे कपड़े के बारे में जानकारी चाहिए।",
  "hi-en": "Hi Vidhi Fabrics, mujhe fabric ke baare mein jaankari chahiye.",
};

function getWhatsAppUrl(lang: Lang) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES[lang])}`;
}

function HiIndex() {
  const [lang, setLang] = useState<Lang>("hi");
  const [category, setCategory] = useState<FabricCategory>("all");
  const [sent, setSent] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [leadOpen, setLeadOpen] = useState(false);

  useEffect(() => {
    const sessionKey = "vidhi-lead-popup-seen";
    if (window.sessionStorage.getItem(sessionKey) === "1") return;
    window.sessionStorage.setItem(sessionKey, "1");
    setLeadOpen(true);
  }, []);

  const fabrics = useMemo(
    () =>
      category === "all"
        ? FABRICS
        : FABRICS.filter((f) => f.category === category),
    [category],
  );

  return (
    <div className="min-h-screen bg-paper font-body text-ink antialiased selection:bg-clay/20">
      <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-x-2 gap-y-2 px-4 py-2 sm:gap-x-4 sm:px-6">
          <div className="flex shrink-0 items-baseline gap-2">
            <span className="font-display text-2xl font-semibold tracking-tight sm:whitespace-nowrap">
              {COPY.brand[lang]}
            </span>
            <span className="hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] text-mute xl:block">
              {COPY.established[lang]}
            </span>
          </div>

          <nav className="hidden items-center gap-x-5 whitespace-nowrap font-mono text-xs uppercase tracking-[0.12em] text-mute lg:flex xl:gap-x-7">
            <a href="#about" className="transition-colors hover:text-ink">
              {COPY.nav.about[lang]}
            </a>
            <a href="#catalogue" className="transition-colors hover:text-ink">
              {COPY.nav.catalogue[lang]}
            </a>
            <a href="#scale" className="transition-colors hover:text-ink">
              {COPY.nav.scale[lang]}
            </a>
            <a href="#desk" className="transition-colors hover:text-ink">
              {COPY.nav.desk[lang]}
            </a>
            <a href="/blog" className="transition-colors hover:text-ink">
              {COPY.nav.journal[lang]}
            </a>
            <a href="#contact" className="transition-colors hover:text-ink">
              {COPY.nav.contact[lang]}
            </a>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div
              className="flex overflow-hidden rounded-sm ring-1 ring-line"
              role="group"
              aria-label="Language"
            >
              <a
                href="/"
                className="px-2 py-2 font-mono text-xs text-mute transition-colors hover:text-ink sm:px-3 sm:text-sm"
              >
                EN
              </a>
              <a
                href="/hi"
                aria-current="page"
                className="bg-ink px-2 py-2 font-mono text-xs text-paper transition-colors sm:px-3 sm:text-sm"
              >
                हिंदी
              </a>
              <button
                type="button"
                onClick={() => setLang(lang === "hi-en" ? "hi" : "hi-en")}
                aria-pressed={lang === "hi-en"}
                title="Hinglish"
                className={`px-2 py-2 font-mono text-xs transition-colors sm:px-3 sm:text-sm ${
                  lang === "hi-en"
                    ? "bg-ink text-paper"
                    : "text-mute hover:text-ink"
                }`}
              >
                Hinglish
              </button>
            </div>
            <a
              href={getWhatsAppUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-clay px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-paper transition-colors hover:bg-claydeep sm:px-4 sm:text-xs sm:tracking-[0.12em]"
            >
              {COPY.nav.cta[lang]}
            </a>
          </div>
        </div>
      </header>

      <section className="vf-rise border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
              {COPY.hero.eyebrow[lang]}
            </p>
            <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[1.03] tracking-tight lg:text-6xl">
              {lang === "hi"
                ? "सूरत से आपकी दुकान तक, थोक कपड़े"
                : COPY.hero.heading[lang]}
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-lg text-mute">
              {COPY.hero.body[lang]}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-mute">
              {COPY.hero.stats.map((s) => (
                <span key={s.en}>{s[lang]}</span>
              ))}
            </div>
          </div>

          <div
            id="inquiry"
            className="rounded-md bg-sand/50 p-6 ring-1 ring-black/5 lg:col-span-5"
          >
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
                setInquiryStatus("sending");
                setSent(false);

                try {
                  const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: "POST",
                    body: new FormData(form),
                    headers: { Accept: "application/json" },
                  });

                  if (!response.ok) throw new Error("Formspree submission failed");

                  form.reset();
                  setInquiryStatus("success");
                  setSent(true);
                } catch {
                  setInquiryStatus("error");
                }
              }}
            >
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
                className="w-full rounded-sm bg-clay py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-claydeep"
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

      <AboutSection lang={lang} />

      <section id="catalogue" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
                {COPY.catalogue.marker[lang]}
              </p>
              <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
                {COPY.catalogue.heading[lang]}
              </h2>
              <p className="mt-3 max-w-[55ch] text-sm text-mute">
                {COPY.catalogue.body[lang]}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`rounded-sm px-3 py-2 transition-colors ${
                    category === c
                      ? "bg-ink text-paper"
                      : "text-mute ring-1 ring-line hover:text-ink"
                  }`}
                >
                  {CATEGORY_LABELS[c][lang]}
                </button>
              ))}
            </div>
          </div>

          {fabrics.length === 0 ? (
            <p className="mt-10 text-sm text-mute">
              {COPY.catalogue.empty[lang]}
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fabrics.map((f) => (
                <article
                  key={f.sku}
                  className="overflow-hidden rounded-md bg-sand/40 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={f.image}
                    alt={f.name[lang]}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between font-mono text-[11px] text-mute">
                      <span>{f.sku}</span>
                      <span>{f.tag[lang]}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold">
                      {f.name[lang]}
                    </h3>
                    <p className="mt-1 text-sm text-mute">{f.spec[lang]}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section aria-hidden="true" className="border-b border-line">
        <video
          src="/weaving-loom.mp4?v=a787f8f"
          autoPlay
          loop
          muted
          playsInline
          className="h-48 w-full object-cover sm:h-64 lg:h-80"
        />
      </section>

      <section id="scale" className="border-b border-line bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
            {COPY.scale.marker[lang]}
          </p>
          <h2 className="mt-3 max-w-[20ch] text-balance font-display text-4xl font-semibold tracking-tight lg:text-5xl">
            {COPY.scale.heading[lang]}
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-px bg-paper/15 lg:grid-cols-4">
            {COPY.scale.stats.map((s) => (
              <div key={s.value} className="bg-ink p-6">
                <p className="font-display text-5xl font-semibold text-clay">
                  {s.value}
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-paper/60">
                  {s.label[lang]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <img
              src={warehouseShowroom}
              alt={COPY.scale.imageAlt[lang]}
              loading="lazy"
              width={1440}
              height={900}
              className="aspect-[16/10] w-full rounded-md object-cover ring-1 ring-white/10"
            />
            <div className="max-w-[40ch] text-pretty text-base text-paper/80">
              <p className="font-display text-2xl font-semibold text-paper">
                {COPY.scale.certTitle[lang]}
              </p>
              <p className="mt-4">{COPY.scale.certBody[lang]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
              {COPY.testimonials.marker[lang]}
            </p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight lg:text-5xl">
              {COPY.testimonials.heading[lang]}
            </h2>
            <p className="mt-5 max-w-[60ch] text-pretty text-mute">
              {COPY.testimonials.body[lang]}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            {COPY.testimonials.cards.map((testimonial, testimonialIndex) => (
              <article
                key={`${testimonial.customerLabel.en}-${testimonial.location}-${testimonialIndex}`}
                className="flex min-h-64 flex-col justify-between rounded-md border border-line bg-sand/25 p-6"
              >
                <div>
                  <p
                    className="font-mono text-sm tracking-[0.18em] text-clay"
                    aria-label={COPY.testimonials.ratingLabel[lang]}
                  >
                    <span aria-hidden="true">★★★★★</span>
                  </p>
                  <blockquote className="mt-6 text-lg leading-relaxed text-ink">
                    {testimonial.quote[lang]}
                  </blockquote>
                </div>
                <footer className="mt-8 border-t border-line pt-4">
                  <p className="font-display text-lg font-semibold">
                    {testimonial.customerLabel[lang]}
                  </p>
                  <p className="mt-1 font-mono text-xs text-mute">
                    {testimonial.location}
                  </p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FabricDeskSection lang={lang} />

      <JournalPreview lang={lang} />

      <section className="border-b border-line bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
            {FAQ_SECTION_COPY[lang].marker}
          </p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
            {FAQ_SECTION_COPY[lang].heading}
          </h2>

          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((faq, index) => (
              <AccordionItem key={faq.question.hi} value={`faq-${index}`} className="border-line">
                <AccordionTrigger className="font-display text-lg font-semibold text-ink hover:no-underline">
                  {faq.question[lang]}
                </AccordionTrigger>
                <AccordionContent className="max-w-2xl text-base leading-relaxed text-mute">
                  {faq.answer[lang]}
                </AccordionContent>
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
                  name: faq.question.hi,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer.hi,
                  },
                })),
              }),
            }}
          />
        </div>
      </section>

      <section id="contact" className="bg-paper">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
              {COPY.contact.marker[lang]}
            </p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight lg:text-5xl">
              {COPY.contact.heading[lang]}
            </h2>
            <p className="mt-5 max-w-[40ch] text-pretty text-mute">
              {COPY.contact.body[lang]}
            </p>
            <a
              href="#inquiry"
              className="mt-7 inline-block rounded-sm bg-clay px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-claydeep"
            >
              {COPY.contact.cta[lang]}
            </a>
          </div>
          <div className="space-y-4 font-mono text-sm text-mute">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-clay">
                {COPY.contact.hqLabel[lang]}
              </p>
              <p className="mt-1 text-ink">{COPY.contact.hqValue[lang]}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-clay">
                {COPY.contact.deskLabel[lang]}
              </p>
              <p className="mt-1 text-ink">
                09825208413 &nbsp;·&nbsp; chhabradaksh1@gmail.com
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-clay">
                {COPY.contact.hoursLabel[lang]}
              </p>
              <p className="mt-1 text-ink">{COPY.contact.hoursValue[lang]}</p>
            </div>
          </div>
        </div>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
            <span>{COPY.footer.left[lang]}</span>
            <div className="flex items-center gap-6">
              <a href="/blog" className="transition-colors hover:text-ink">
                {COPY.nav.journal[lang]}
              </a>
              <a
                href="https://www.linkedin.com/company/vidhi-fabricss/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Vidhi Fabrics on LinkedIn"
                className="inline-flex items-center justify-center transition-colors hover:text-ink"
              >
                <Linkedin size={20} />
              </a>
            </div>
            <span>{COPY.footer.right[lang]}</span>
          </div>
        </footer>
      </section>

      {leadOpen ? <LeadPopup lang={lang} onClose={() => setLeadOpen(false)} /> : null}
    </div>
  );
}

type LeadPopupProps = {
  lang: Lang;
  onClose: () => void;
};

type LeadForm = {
  name: string;
  phone: string;
  business: string;
  requirement: string;
};

function LeadPopup({ lang, onClose }: LeadPopupProps) {
  const copy = COPY.leadPopup;
  const nameRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<LeadForm>({
    name: "",
    phone: "",
    business: "",
    requirement: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LeadForm, string>>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "failure">("idle");

  useEffect(() => {
    nameRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "saving") onClose();
      if (event.key !== "Tab") return;
      const dialog = nameRef.current?.closest("[role=dialog]");
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          "button:not(:disabled), input:not(:disabled), textarea:not(:disabled)",
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, status]);

  function updateField(field: keyof LeadForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof LeadForm, string>> = {};
    if (!form.name.trim()) nextErrors.name = copy.required[lang];
    if (!form.requirement.trim()) nextErrors.requirement = copy.required[lang];
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ""))) {
      nextErrors.phone = copy.invalidPhone[lang];
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("saving");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: (() => {
          const formData = new FormData();
          formData.set("name", form.name.trim());
          formData.set("phone", `+91${form.phone.replace(/\D/g, "")}`);
          formData.set("business", form.business.trim());
          formData.set("requirement", form.requirement.trim());
          formData.set("source", "Website entry pop-up (Hindi)");
          return formData;
        })(),
      });
      if (!response.ok) throw new Error("Lead submission failed");
      setStatus("success");
    } catch {
      setStatus("failure");
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/55 p-4" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-popup-heading"
        className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-md bg-paper p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 id="lead-popup-heading" className="font-display text-3xl font-semibold tracking-tight">
              {copy.heading[lang]}
            </h2>
            <p className="mt-2 text-sm text-mute">{copy.body[lang]}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={status === "saving"}
            aria-label={copy.close[lang]}
            className="shrink-0 rounded-sm px-2 py-1 text-2xl leading-none text-mute hover:bg-sand hover:text-ink disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-7 space-y-5">
            <p className="text-sage">{copy.success[lang]}</p>
            <button type="button" onClick={onClose} className="rounded-sm bg-clay px-4 py-3 text-sm text-paper hover:bg-claydeep">
              {copy.continue[lang]}
            </button>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <LeadField label={copy.name[lang]} error={errors.name}>
              <input ref={nameRef} name="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} required aria-invalid={Boolean(errors.name)} className="vf-lead-input" />
            </LeadField>
            <LeadField label={copy.phone[lang]} error={errors.phone}>
              <div className="flex gap-2">
                <span className="flex items-center rounded-sm border border-line bg-sand px-3 text-sm text-mute">{copy.countryCode[lang]}</span>
                <input name="phone" type="tel" inputMode="numeric" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} required aria-invalid={Boolean(errors.phone)} className="vf-lead-input" />
              </div>
            </LeadField>
            <LeadField label={copy.business[lang]}>
              <input name="business" value={form.business} onChange={(event) => updateField("business", event.target.value)} className="vf-lead-input" />
            </LeadField>
            <LeadField label={copy.requirement[lang]} error={errors.requirement}>
              <textarea name="requirement" rows={3} placeholder={copy.requirementPlaceholder[lang]} value={form.requirement} onChange={(event) => updateField("requirement", event.target.value)} required aria-invalid={Boolean(errors.requirement)} className="vf-lead-input resize-none" />
            </LeadField>
            <p className="text-xs text-mute">{copy.notice[lang]}</p>
            {status === "failure" ? <p role="alert" className="text-sm text-claydeep">{copy.failure[lang]}</p> : null}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button type="button" onClick={onClose} disabled={status === "saving"} className="text-sm text-mute underline-offset-4 hover:text-ink hover:underline disabled:opacity-50">
                {copy.continue[lang]}
              </button>
              <button type="submit" disabled={status === "saving"} className="rounded-sm bg-clay px-5 py-3 text-sm text-paper hover:bg-claydeep disabled:cursor-wait disabled:opacity-60">
                {status === "saving" ? copy.saving[lang] : copy.submit[lang]}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function LeadField({ label, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-claydeep">{error}</span> : null}
    </label>
  );
}
