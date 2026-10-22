import { createFileRoute } from "@tanstack/react-router";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { ResellerCircleCta } from "@/components/reseller-circle-cta";
import { ADDRESS_LINES, BUSINESS, BUSINESS_ID } from "@/content/business";
import { whatsAppUrl } from "@/content/whatsapp";

const SITE = "https://www.vidhifabrics.com";
const EN_PATH = "/organza-net-fabric-for-boutiques";
const PATH = "/hi/organza-net-fabric-for-boutiques";

const TITLE = "बुटीक के लिए ऑर्गेंज़ा और नेट कपड़ा होलसेल, सूरत | विधि फैब्रिक्स";
const DESCRIPTION =
  "बुटीक के लिए ऑर्गेंज़ा और नेट कपड़ा होलसेल में, सूरत की मिलों के हमारे नेटवर्क से ऑर्डर पर सोर्स किया हुआ। शेड कार्ड, सैंपल या चौड़ाई व्हाट्सएप पर भेजिए।";

const linkClass = "text-clay underline decoration-clay/70 underline-offset-4 hover:text-claydeep";

// Same positioning and rules as the English page (see its comment).
const FAQS: { question: string; answer: string }[] = [
  {
    question: "क्या ऑर्गेंज़ा और नेट आपके पास स्टॉक में रहते हैं, या आप सोर्स करते हैं?",
    answer:
      "ऑर्गेंज़ा, नेट और दूसरे कपड़े हम सूरत की मिलों और मैन्युफैक्चरिंग यूनिट्स के अपने नेटवर्क से ऑर्डर पर सोर्स करते हैं। आपको क्या चाहिए, बताइए — हम उसी से मिलते-जुलते विकल्प ढूँढकर देंगे।",
  },
  {
    question: "बुटीक ऑर्गेंज़ा और नेट का इस्तेमाल किसमें करते हैं?",
    answer:
      "ज़्यादातर दुपट्टों, लहंगे की परतों, स्लीव्स और कुर्ते, ब्लाउज़ या गाउन के ओवरले में। ऑर्गेंज़ा कड़क और झीना होता है और अपना आकार बनाए रखता है; नेट हल्का होता है और परतों व कढ़ाई के बेस के लिए अच्छा रहता है।",
  },
  {
    question: "अपनी ज़रूरत के साथ क्या-क्या भेजूँ?",
    answer:
      "शेड कार्ड नंबर या दिन की रोशनी में ली गई रंग की फ़ोटो, अगर हो तो कपड़े का सैंपल या टुकड़ा, कितनी चौड़ाई चाहिए, फ़िनिश (प्लेन, प्रिंटेड, कढ़ाई वाला या सीक्वेंस वाला) और आप उससे क्या बनाएँगे।",
  },
  {
    question: "क्या बल्क ऑर्डर से पहले सैंपल मिल सकता है?",
    answer:
      "जी हाँ, और हमारी सलाह भी यही है। पहले सैंपल पास कीजिए और उसका रेफ़रेंस संभालकर रखिए, ताकि बल्क ऑर्डर उसी कपड़े से मिलाकर जाँचा जा सके जो आपने पास किया था।",
  },
  {
    question: "क्या आप किसी ख़ास शेड से मिलान कर सकते हैं?",
    answer:
      "शेड कार्ड या कपड़े का टुकड़ा भेजिए। हम अपने नेटवर्क में सबसे नज़दीकी मिलता शेड ढूँढेंगे और बल्क ऑर्डर से पहले पास करने के लिए सैंपल भेजेंगे।",
  },
  {
    question: "आप किन राज्यों में माल भेजते हैं?",
    answer:
      "ज़्यादातर उत्तर भारत में — पंजाब, हरियाणा, राजस्थान, उत्तर प्रदेश और मध्य प्रदेश। UAE और अन्य अंतरराष्ट्रीय बाज़ारों से एक्सपोर्ट पूछताछ का भी स्वागत है।",
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
        name: "बुटीक के लिए ऑर्गेंज़ा और नेट कपड़ा",
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

export const Route = createFileRoute("/hi_/organza-net-fabric-for-boutiques")({
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
  component: OrganzaNetPageHi,
});

const REQUIREMENT_MESSAGE =
  "नमस्ते विधि फैब्रिक्स, मेरा बुटीक है और मुझे ऑर्गेंज़ा/नेट कपड़ा चाहिए।";

function RequirementButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsAppUrl(REQUIREMENT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-claydeep ${className}`}
    >
      व्हाट्सएप पर अपनी ज़रूरत बताइए
    </a>
  );
}

function OrganzaNetPageHi() {
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
              <li className="text-ink">बुटीक के लिए ऑर्गेंज़ा और नेट कपड़ा</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-balance font-display text-4xl font-light leading-[1.12] tracking-normal sm:text-5xl lg:text-6xl">
            बुटीक के लिए ऑर्गेंज़ा और नेट कपड़ा, सूरत से
          </h1>

          <RequirementButton className="mt-8" />

          <div className="mx-auto max-w-[65ch]">
            <p className="mt-10 text-lg leading-relaxed text-mute">
              विधि फैब्रिक्स सूरत की पॉलिएस्टर साड़ी और ड्रेस मटेरियल निर्माता व थोक विक्रेता है।
              बुटीक के लिए हम सूरत की मिलों और मैन्युफैक्चरिंग यूनिट्स के अपने नेटवर्क से ऑर्गेंज़ा,
              नेट और दूसरे कपड़े भी ऑर्डर पर सोर्स करते हैं। व्हाट्सएप पर शेड कार्ड, सैंपल या आपको
              जितनी चौड़ाई चाहिए, वह भेजिए, सैंपल पास कीजिए, और फिर बल्क में ऑर्डर दीजिए।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              बुटीक ऑर्गेंज़ा और नेट किसमें लगाते हैं
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              ऑर्गेंज़ा कड़क और झीना होता है और अपना आकार बनाए रखता है, इसलिए बुटीक इसे दुपट्टों,
              उभरी हुई स्लीव्स और कुर्ते, ब्लाउज़ या गाउन के ओवरले के लिए चुनते हैं। नेट हल्का और
              हाथ में मुलायम होता है — लहंगे की परतों, घेरदार दुपट्टों, स्लीव्स और कढ़ाई या सीक्वेंस
              वर्क के बेस के लिए बढ़िया। दोनों प्लेन, प्रिंटेड, कढ़ाई वाले या सीक्वेंस वाले, कई शेड
              में मिलते हैं।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              सूरत के नेटवर्क से, ऑर्डर पर सोर्सिंग
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              सूरत सिंथेटिक कपड़ों के भारत के मुख्य केंद्रों में से एक है, और यहाँ की मिलें और
              मैन्युफैक्चरिंग यूनिट्स कई वज़न और फ़िनिश में ऑर्गेंज़ा और नेट बनाती हैं। हम पीढ़ियों
              से इसी बाज़ार में हैं, इसलिए आप जो बताते हैं, उससे मिलता कपड़ा हम अपने मिलों और
              यूनिट्स के नेटवर्क में ढूँढते हैं और विकल्पों व सैंपल के साथ आपको जवाब देते हैं। पूरी
              ज़रूरत के लिए आपकी बात एक ही कारोबार से होती है।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              अपनी ज़रूरत कैसे बताएँ
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              जितनी साफ़ जानकारी, उतना सटीक मिलान। हमें भेजिए:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-[1.85] text-mute">
              <li>शेड कार्ड नंबर, या दिन की रोशनी में ली गई रंग की फ़ोटो</li>
              <li>अगर हो तो कपड़े का सैंपल या टुकड़ा</li>
              <li>कितनी चौड़ाई चाहिए, इंच में</li>
              <li>फ़िनिश: प्लेन, प्रिंटेड, कढ़ाई वाला या सीक्वेंस वाला</li>
              <li>आप क्या बनाएँगे — दुपट्टे, लहंगे की परतें, स्लीव्स या ओवरले</li>
            </ul>
            <p className="mt-5 leading-[1.85] text-mute">
              चौड़ाई से तय होता है कि एक मीटर में कितने पीस कटेंगे, इसलिए आपकी लागत पर इसका असर
              पड़ता है। हमारी गाइड{" "}
              <a href="/hi/blog/fabric-width-and-costing" className={linkClass}>
                कपड़े की चौड़ाई और लागत
              </a>{" "}
              और{" "}
              <a href="/hi/blog/how-to-read-a-fabric-spec" className={linkClass}>
                फ़ैब्रिक स्पेसिफ़िकेशन कैसे पढ़ें
              </a>{" "}
              बताती हैं कि क्या-क्या पूछना है।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              बल्क से पहले सैंपल
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              झीने कपड़े स्क्रीन पर अलग दिखते हैं, इसलिए बल्क ऑर्डर से पहले असली सैंपल पास कीजिए।
              उसे रोशनी के सामने रखकर देखिए, फ़ील और गिराव परखिए, और पास करते समय उसका रेफ़रेंस
              लिखकर रखिए। हमारी{" "}
              <a href="/hi/blog/sample-to-bulk-order-checklist" className={linkClass}>
                सैंपल से बल्क ऑर्डर तक की चेकलिस्ट
              </a>{" "}
              में हर कदम दिया है।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              हम कहाँ माल देते हैं
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              हमारे ज़्यादातर खरीदार पंजाब, हरियाणा, राजस्थान, उत्तर प्रदेश और मध्य प्रदेश के बुटीक,
              रिटेलर और होलसेलर हैं। UAE और अन्य अंतरराष्ट्रीय बाज़ारों से एक्सपोर्ट पूछताछ का भी
              स्वागत है। हमें व्हाट्सएप पर{" "}
              <a
                href={whatsAppUrl(REQUIREMENT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {BUSINESS.phoneDisplay}
              </a>{" "}
              पर मैसेज कीजिए, या {ADDRESS_LINES.hi.join(", ")} पर आकर मिलिए।
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              बुटीक अक्सर ऑर्गेंज़ा और नेट के साथ हमारा{" "}
              <a href="/hi/dress-material-wholesale-surat" className={linkClass}>
                ड्रेस मटेरियल और अनस्टिच्ड सूट
              </a>{" "}
              और{" "}
              <a href="/hi/polyester-sarees-wholesale-surat" className={linkClass}>
                पॉलिएस्टर साड़ियाँ
              </a>{" "}
              भी रखते हैं। सीज़न की खरीद से पहले पढ़िए —{" "}
              <a href="/hi/blog/buying-dress-material-wholesale" className={linkClass}>
                थोक में ड्रेस मटेरियल खरीदते समय क्या जाँचें
              </a>
              ।
            </p>

            <ResellerCircleCta lang="hi" className="mt-12" />

            <section className="mt-12 border-t border-line pt-8">
              <h2 className="font-display text-2xl font-light sm:text-3xl">सामान्य प्रश्न</h2>
              {FAQS.map((entry) => (
                <div key={entry.question} className="mt-7">
                  <h3 className="font-display text-lg font-light leading-snug">{entry.question}</h3>
                  <p className="mt-3 leading-[1.85] text-mute">{entry.answer}</p>
                </div>
              ))}
            </section>

            <div className="my-12 flex justify-center border-t border-line pt-10">
              <RequirementButton />
            </div>
          </div>
        </article>
      </main>
      <JournalFooter lang="hi" />
    </div>
  );
}
