import { createFileRoute } from "@tanstack/react-router";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { ADDRESS_LINES, BUSINESS } from "@/content/business";
import { whatsAppUrl } from "@/content/whatsapp";

const SITE = "https://www.vidhifabrics.com";
const EN_PATH = "/polyester-sarees-wholesale-surat";
const PATH = "/hi/polyester-sarees-wholesale-surat";

const TITLE = "पॉलिएस्टर साड़ी होलसेल, सूरत से | विधि फैब्रिक्स";
const DESCRIPTION =
  "सूरत के निर्माता और होलसेलर से पॉलिएस्टर साड़ियाँ होलसेल में — पंजाब, हरियाणा, राजस्थान और मध्य प्रदेश के खरीदारों के लिए। आज का कैटलॉग व्हाट्सएप पर।";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "आप किन क्षेत्रों में सप्लाई करते हैं?",
    answer:
      "मुख्य रूप से उत्तर भारत में — पंजाब, हरियाणा और राजस्थान — और हम मध्य प्रदेश के खरीदारों को भी सप्लाई करते हैं।",
  },
  {
    question: "क्या आप रिटेलर्स के साथ-साथ थोक विक्रेताओं को भी सप्लाई करते हैं?",
    answer:
      "हाँ। हम थोक विक्रेताओं, डिस्ट्रीब्यूटर्स, रिटेलर्स, रीसेलर्स और बुटीक को बल्क में सप्लाई करते हैं।",
  },
  {
    question: "क्या मैं ऑर्डर देने से पहले डिज़ाइन देख सकता हूँ?",
    answer:
      "हाँ। हम व्हाट्सएप पर ताज़ा कैटलॉग शेयर करते हैं, और आप गोल्डन पॉइंट, रिंग रोड, सूरत स्थित हमारी दुकान पर आने के लिए स्वागत हैं।",
  },
  {
    // Matches the English route: manufacturer and wholesaler, confirmed by
    // the owner on 1 October 2026. See the English file's comment.
    question: "क्या आप निर्माता हैं या थोक विक्रेता?",
    answer:
      "दोनों। विधि फैब्रिक्स सूरत स्थित निर्माता और थोक विक्रेता है। कुछ लाइनें हम खुद बनाते हैं और साथ ही सूरत के बड़े कपड़ा बाज़ार से भी सप्लाई करते हैं, ताकि आपको एक जवाबदेह संपर्क और एक विस्तृत, ताज़ा रेंज मिले।",
  },
  {
    question: "थोक रेट कैसे पाएँ?",
    answer: `अपनी ज़रूरत व्हाट्सएप पर ${BUSINESS.phoneDisplay} पर भेजिए, हम मौजूदा रेट के साथ जवाब देंगे।`,
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
        name: "पॉलिएस्टर साड़ियाँ थोक सूरत",
        item: `${SITE}${PATH}`,
      },
    ],
  };
}

function faqPage() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export const Route = createFileRoute("/hi_/polyester-sarees-wholesale-surat")({
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
  component: PolyesterSareesPageHi,
});

const CATALOGUE_MESSAGE =
  "नमस्ते विधि फैब्रिक्स, कृपया अपना पॉलिएस्टर साड़ी कैटलॉग और मौजूदा रेट भेजिए।";

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

function PolyesterSareesPageHi() {
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
              <li className="text-ink">पॉलिएस्टर साड़ियाँ थोक सूरत</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-balance font-display text-4xl font-light leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            पॉलिएस्टर साड़ियाँ थोक, सीधे सूरत से
          </h1>

          <CatalogueButton className="mt-8" />

          <div className="mx-auto max-w-[65ch]">
            <p className="mt-10 text-lg leading-relaxed text-mute">
              विधि फैब्रिक्स सूरत स्थित निर्माता और थोक विक्रेता है, जो थोक विक्रेताओं, रिटेलर्स,
              रीसेलर्स और बुटीक को बल्क में पॉलिएस्टर साड़ियाँ सप्लाई करता है। कुछ लाइनें हम खुद
              बनाते हैं और साथ ही सूरत के बड़े कपड़ा बाज़ार से भी सप्लाई करते हैं। हमारे ज़्यादातर
              खरीदार उत्तर भारत में हैं — पंजाब, हरियाणा और राजस्थान में — और हम मध्य प्रदेश के
              खरीदारों को भी सप्लाई करते हैं। चूँकि हम सीधे सूरत के टेक्सटाइल मार्केट में काम करते
              हैं, इसलिए आपको बिना किसी अतिरिक्त बिचौलिए के लगातार सप्लाई मिलती है।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              हमसे पॉलिएस्टर साड़ियाँ होलसेल में क्यों खरीदें
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              हमारी पॉलिएस्टर रेंज में रोज़मर्रा के प्रिंट, त्योहारी कढ़ाई वाली साड़ियाँ, और उत्तर
              भारतीय बाज़ारों में जो बिकता है उसके हिसाब से चुनी गई हल्की डिज़ाइनें शामिल हैं।
              पॉलिएस्टर रिटेलर्स और थोक विक्रेताओं दोनों में लोकप्रिय है क्योंकि यह किफ़ायती है, रंग
              अच्छी तरह पकड़ता है, देखभाल में आसान है, और हर कीमत पर जल्दी बिकता है।
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              हम डिज़ाइन और रंग के हिसाब से सेट तैयार करते हैं और हर सीज़न नई डिज़ाइनें लाते रहते
              हैं।
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              ताज़ा कैटलॉग और रेट के लिए हमें व्हाट्सएप पर{" "}
              <a
                href={whatsAppUrl(CATALOGUE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                {BUSINESS.phoneDisplay}
              </a>{" "}
              पर मैसेज कीजिए, या हमसे {ADDRESS_LINES.hi.join(", ")} पर मिलिए। चाहे आप डिस्ट्रीब्यूशन
              के लिए स्टॉक कर रहे थोक विक्रेता हों या बेस्टसेलर दोबारा मँगवा रहे रिटेलर, हम आपको ऐसी
              डिज़ाइनें चुनने में मदद करेंगे जो आपके ग्राहकों और आपके मार्जिन, दोनों के अनुकूल हों।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              बल्क ऑर्डर देने से पहले
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              हमारे सूरत फैब्रिक डेस्क की ये चार गाइड उन सवालों का जवाब देती हैं जो खरीदार सबसे
              ज़्यादा पूछते हैं:{" "}
              <a
                href="/hi/blog/why-similar-sarees-have-different-prices"
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                एक जैसी दिखने वाली दो साड़ियों के दाम अलग क्यों होते हैं
              </a>
              ,{" "}
              <a
                href="/hi/blog/fabric-gsm-bulk-orders"
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                बल्क ऑर्डर में GSM का असली मतलब
              </a>
              ,{" "}
              <a
                href="/hi/blog/sample-to-bulk-order-checklist"
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                सैंपल से बल्क ऑर्डर तक की चेकलिस्ट
              </a>{" "}
              और{" "}
              <a
                href="/hi/blog/karva-chauth-diwali-festive-stock"
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                करवा चौथ और दिवाली के लिए क्या स्टॉक करें
              </a>
              ।
            </p>

            <p className="mt-5 leading-[1.85] text-mute">
              हम सूरत से{" "}
              <a
                href="/hi/dress-material-wholesale-surat"
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                थोक में ड्रेस मटेरियल
              </a>{" "}
              भी सप्लाई करते हैं, जिसमें अनस्टिच्ड सूट शामिल हैं।
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              व्हाट्सएप, इंस्टाग्राम या घर से बेचते हैं? देखिए
              <a
                href="/hi/saree-wholesale-for-resellers"
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                रीसेलर के लिए साड़ी होलसेल
              </a>
              । बुटीक हमसे
              <a
                href="/hi/organza-net-fabric-for-boutiques"
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                ऑर्गेंज़ा और नेट कपड़ा
              </a>
              भी मँगवा सकते हैं, जो हम सूरत के अपने नेटवर्क से ऑर्डर पर सोर्स करते हैं।
            </p>

            <section className="mt-12 border-t border-line pt-8">
              <h2 className="font-display text-2xl font-light sm:text-3xl">सामान्य प्रश्न</h2>
              {/*
                Each question is an <h3> with its answer directly after it.
                This used to be a <dl> holding <h3> + <dd> with no <dt>, which
                is invalid HTML: a <dd> must follow a <dt>, and a <dt> may not
                contain a heading. Plain heading-and-paragraph pairs keep the
                heading outline and are valid.
              */}
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
