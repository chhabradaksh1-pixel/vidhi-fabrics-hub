import { createFileRoute } from "@tanstack/react-router";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { ADDRESS_LINES, BUSINESS, BUSINESS_ID } from "@/content/business";
import { whatsAppUrl } from "@/content/whatsapp";

const SITE = "https://www.vidhifabrics.com";
const EN_PATH = "/dress-material-wholesale-surat";
const PATH = "/hi/dress-material-wholesale-surat";

const TITLE = "ड्रेस मटेरियल थोक, सूरत से | विधि फैब्रिक्स, निर्माता और थोक विक्रेता";
const DESCRIPTION =
  "उत्तर भारत के खरीदारों के लिए, सूरत के निर्माता और थोक विक्रेता से बल्क में ड्रेस मटेरियल और अनस्टिच्ड सूट। व्हाट्सएप पर कैटलॉग पाइए।";

const linkClass = "text-clay underline decoration-line underline-offset-4 hover:text-claydeep";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "ड्रेस मटेरियल सेट में क्या-क्या होता है?",
    answer:
      "आमतौर पर टॉप, बॉटम और दुपट्टे का कपड़ा। हर डिज़ाइन का सेट अलग हो सकता है, इसलिए ऑर्डर से पहले हम हर डिज़ाइन के हिस्से, उनका कपड़ा और उनका नाप पक्का करते हैं।",
  },
  {
    question: "क्या आप अनस्टिच्ड सूट सप्लाई करते हैं?",
    answer:
      "हाँ। हम अनस्टिच्ड सूट और ड्रेस मटेरियल सेट सप्लाई करते हैं, ताकि रिटेलर्स और बुटीक अपने ग्राहकों को उनकी पसंद की फ़िटिंग और स्टाइल दे सकें।",
  },
  {
    question: "आप किन क्षेत्रों में सप्लाई करते हैं?",
    answer: "मुख्य रूप से उत्तर भारत में: पंजाब, हरियाणा, राजस्थान और मध्य प्रदेश।",
  },
  {
    question: "क्या आप थोक विक्रेताओं के साथ-साथ रिटेलर्स को भी सप्लाई करते हैं?",
    answer: "हाँ। हम थोक विक्रेताओं, रिटेलर्स, रीसेलर्स और बुटीक को बल्क में सप्लाई करते हैं।",
  },
  {
    // Matches the English route: manufacturer and wholesaler, confirmed by
    // the owner on 1 October 2026. See the English file's comment.
    question: "क्या आप निर्माता हैं या थोक विक्रेता?",
    answer:
      "दोनों। विधि फैब्रिक्स सूरत स्थित निर्माता और थोक विक्रेता है। कुछ लाइनें हम खुद बनाते हैं और साथ ही सूरत के बड़े कपड़ा बाज़ार से भी सप्लाई करते हैं, ताकि आपको एक जवाबदेह संपर्क और एक विस्तृत, ताज़ा रेंज मिले।",
  },
  {
    question: "कैटलॉग कैसे पाएँ?",
    answer: `व्हाट्सएप पर ${BUSINESS.phoneDisplay} पर मैसेज कीजिए, हम ड्रेस मटेरियल का मौजूदा कैटलॉग भेज देंगे। आप गोल्डन पॉइंट, रिंग रोड, सूरत स्थित हमारी दुकान पर भी आ सकते हैं।`,
  },
];

function breadcrumbList() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "विधि फैब्रिक्स", item: `${SITE}/hi` },
      {
        "@type": "ListItem",
        position: 2,
        name: "ड्रेस मटेरियल थोक सूरत",
        item: `${SITE}${PATH}`,
      },
    ],
  };
}

function faqPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${SITE}${PATH}`,
    inLanguage: "hi-IN",
    // Ties the page to the site-wide LocalBusiness node emitted in __root.tsx.
    publisher: { "@id": BUSINESS_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export const Route = createFileRoute("/hi_/dress-material-wholesale-surat")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE}${PATH}` },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "hi_IN" },
      { property: "og:locale:alternate", content: "en_IN" },
    ],
    links: [
      { rel: "canonical", href: `${SITE}${PATH}` },
      { rel: "alternate", hrefLang: "en", href: `${SITE}${EN_PATH}` },
      { rel: "alternate", hrefLang: "hi", href: `${SITE}${PATH}` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE}${EN_PATH}` },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbList()) },
      { type: "application/ld+json", children: JSON.stringify(faqPage()) },
    ],
  }),
  component: DressMaterialPageHi,
});

const CATALOGUE_MESSAGE = "नमस्ते विधि फैब्रिक्स, कृपया अपना ड्रेस मटेरियल कैटलॉग भेजिए।";

function CatalogueButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsAppUrl(CATALOGUE_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-claydeep ${className}`}
    >
      व्हाट्सएप पर कैटलॉग पाइए
    </a>
  );
}

function DressMaterialPageHi() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <JournalHeader lang="hi" />
      <main>
        <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16" lang="hi">
          <nav aria-label="ब्रेडक्रंब" className="text-xs text-mute">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href="/hi" className="hover:text-clay">
                  विधि फैब्रिक्स
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">ड्रेस मटेरियल थोक सूरत</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-balance font-display text-4xl font-light leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            ड्रेस मटेरियल थोक, सीधे सूरत से
          </h1>

          <CatalogueButton className="mt-8" />

          <div className="mx-auto max-w-[65ch]">
            <p className="mt-10 text-lg leading-relaxed text-mute">
              विधि फैब्रिक्स सूरत स्थित निर्माता और थोक विक्रेता है, जो थोक विक्रेताओं, रिटेलर्स,
              रीसेलर्स और बुटीक को बल्क में ड्रेस मटेरियल सप्लाई करता है। कुछ लाइनें हम खुद बनाते
              हैं और साथ ही सूरत के बड़े कपड़ा बाज़ार से भी सप्लाई करते हैं। हमारे ज़्यादातर खरीदार
              उत्तर भारत में हैं — पंजाब, हरियाणा, राजस्थान और मध्य प्रदेश में।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              अनस्टिच्ड सूट और ड्रेस मटेरियल सेट
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              ड्रेस मटेरियल मीटर के हिसाब से नहीं, सेट के रूप में बिकता है। एक आम अनस्टिच्ड सूट में
              टॉप, बॉटम और दुपट्टे का कपड़ा होता है, इतनी लंबाई में कि दर्ज़ी उससे काम कर सके।
              रिटेलर्स इसे इसलिए रखते हैं क्योंकि ग्राहक अपनी फ़िटिंग और स्टाइल खुद चुनते हैं, और एक
              ही सेट कई तरह से सिला जा सकता है। हम रोज़मर्रा और त्योहारी सेट सप्लाई करते हैं,
              डिज़ाइन और रंग के हिसाब से, ताकि आप अपने काउंटर के हिसाब से सिलेक्शन बना सकें।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              सूरत से ड्रेस मटेरियल क्यों खरीदें
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              सूरत सिंथेटिक और ब्लेंडेड कपड़ों के भारत के मुख्य केंद्रों में से एक है। यहाँ के
              बाज़ारों में शहर भर की बुनाई, प्रिंटिंग और कढ़ाई इकाइयों का ड्रेस मटेरियल मिलता है,
              इसलिए आपको एक ही जगह डिज़ाइनों का बड़ा चुनाव मिलता है, और कपड़े से आपकी दुकान तक की
              कड़ी छोटी रहती है। इस बाज़ार में निर्माता और थोक विक्रेता होने के नाते, हम नई
              डिज़ाइनें आते ही देखते हैं और बता सकते हैं कि हर सेट किस कपड़े से बना है।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              थोक में खरीदते समय क्या जाँचें
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              हर हिस्से की सामग्री और नाप पूछिए, क्योंकि टॉप, बॉटम और दुपट्टे का कपड़ा अक्सर अलग
              होता है। पक्का कीजिए कि सेट अनस्टिच्ड है या सेमी-स्टिच्ड, और कौन-से हिस्से शामिल हैं।
              सैंपल को सामान्य रोशनी में देखिए — फ़ील, ड्रेप और रंग — और मंज़ूरी के साथ डिज़ाइन कोड
              लिखकर रखिए। भुगतान से पहले पूरा ऑर्डर लिखित में लीजिए। हमारी{" "}
              <a href="/hi/blog/buying-dress-material-wholesale" className={linkClass}>
                थोक में ड्रेस मटेरियल खरीदने की गाइड
              </a>{" "}
              में हर कदम विस्तार से है।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">कैटलॉग कैसे पाएँ</h2>
            <p className="mt-5 leading-[1.85] text-mute">
              हमें व्हाट्सएप पर{" "}
              <a
                href={whatsAppUrl(CATALOGUE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {BUSINESS.phoneDisplay}
              </a>{" "}
              पर मैसेज कीजिए और बताइए कि आप क्या रखते हैं: रोज़मर्रा या त्योहारी, कौन-से कपड़े पसंद
              हैं और आप किस शहर में बेचते हैं। हम व्हाट्सएप पर मौजूदा कैटलॉग भेज देंगे। आप हमसे{" "}
              {ADDRESS_LINES.hi.join(", ")} पर भी मिल सकते हैं।
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              हम सूरत से{" "}
              <a href="/hi/polyester-sarees-wholesale-surat" className={linkClass}>
                थोक में पॉलिएस्टर साड़ियाँ
              </a>{" "}
              भी सप्लाई करते हैं।
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              दुपट्टों, लहंगे की परतों, स्लीव्स और ओवरले के लिए बुटीक हमसे{" "}
              <a href="/hi/organza-net-fabric-for-boutiques" className={linkClass}>
                ऑर्गेंज़ा और नेट कपड़ा
              </a>{" "}
              मँगवा सकते हैं, जो हम सूरत के अपने नेटवर्क से ऑर्डर पर सोर्स करते हैं। रीसेलर देखें —{" "}
              <a href="/hi/saree-wholesale-for-resellers" className={linkClass}>
                रीसेलर के लिए साड़ी होलसेल
              </a>
              ।
            </p>

            <section className="mt-12 border-t border-line pt-8">
              <h2 className="font-display text-2xl font-light sm:text-3xl">सामान्य प्रश्न</h2>
              {/* Each question is an <h3> with its answer directly after it,
                  matching the polyester page. */}
              {FAQS.map((entry) => (
                <div key={entry.question} className="mt-7">
                  <h3 className="font-display text-lg font-light leading-snug">{entry.question}</h3>
                  <p className="mt-3 leading-[1.85] text-mute">{entry.answer}</p>
                </div>
              ))}
            </section>

            <div className="my-12 flex justify-center border-t border-line pt-10">
              <CatalogueButton />
            </div>
          </div>
        </article>
      </main>
      <JournalFooter lang="hi" />
    </div>
  );
}
