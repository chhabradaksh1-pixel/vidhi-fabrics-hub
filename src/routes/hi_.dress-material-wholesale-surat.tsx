// Hindi for this page was written for review and has not been checked by a
// native speaker. See BRAND.md.
import { createFileRoute } from "@tanstack/react-router";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { PromoSuitCatalogueCta } from "@/components/promo-suits";
import { ShowroomCollection } from "@/components/showroom-collection";
import { ADDRESS_LINES, BUSINESS, BUSINESS_ID } from "@/content/business";
import { whatsAppUrl } from "@/content/whatsapp";

const SITE = "https://www.vidhifabrics.com";
const EN_PATH = "/dress-material-wholesale-surat";
const PATH = "/hi/dress-material-wholesale-surat";

const TITLE = "सूरत में ड्रेस मटेरियल होलसेल | अनस्टिच्ड सूट";
const DESCRIPTION =
  "सूरत में ड्रेस मटेरियल, सूरत के निर्माता और थोक विक्रेता से। रीसेलर, बुटीक और रिटेलर के लिए अनस्टिच्ड सूट होलसेल। कैटलॉग व्हाट्सएप पर।";

const linkClass = "text-clay underline decoration-line underline-offset-4 hover:text-claydeep";

const WHY = [
  "व्यापार में 60 साल",
  "सूरत का निर्माता नेटवर्क",
  "नए डिज़ाइन नियमित रूप से",
  "व्हाट्सएप पर कैटलॉग",
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "क्या सूरत में ड्रेस मटेरियल मिलता है?",
    answer:
      "हाँ। विधि फैब्रिक्स सूरत का निर्माता और थोक विक्रेता है। ड्रेस मटेरियल और अनस्टिच्ड सूट का ताज़ा कैटलॉग व्हाट्सएप पर मिलता है।",
  },
  {
    question: "क्या सूरत से ड्रेस मटेरियल होलसेल मिलता है?",
    answer:
      "हाँ। हम रीसेलर, बुटीक और रिटेलर को उत्तर भारत में सूरत से ड्रेस मटेरियल होलसेल देते हैं।",
  },
  {
    question: "क्या सूरत से अनस्टिच्ड सूट होलसेल मिलते हैं?",
    answer:
      "हाँ। अनस्टिच्ड सूट होलसेल सूरत में हमारी दो मुख्य रेंज में से एक है। सेट ड्रेस मटेरियल के रूप में मिलते हैं, ताकि दुकान अपनी फ़िटिंग और स्टाइल दे सके।",
  },
  {
    question: "आप किन राज्यों में सप्लाई करते हैं?",
    answer: "पंजाब, हरियाणा, राजस्थान, उत्तर प्रदेश और मध्य प्रदेश।",
  },
  {
    question: "ड्रेस मटेरियल का कैटलॉग कैसे मिलेगा?",
    answer: `व्हाट्सएप पर ${BUSINESS.phoneDisplay} पर मैसेज कीजिए। हम ताज़ा कैटलॉग भेज देंगे। गोल्डन पॉइंट, रिंग रोड, सूरत की दुकान पर आना भी ठीक है।`,
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
        name: "सूरत में ड्रेस मटेरियल होलसेल",
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
      className={`inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-claydeep ${className}`}
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
              <li className="text-ink">सूरत में ड्रेस मटेरियल होलसेल</li>
            </ol>
          </nav>

          <h1 className="vf-showroom-serif mt-6 text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            सूरत में ड्रेस मटेरियल होलसेल
          </h1>
          <div className="mx-auto mt-6 max-w-[65ch] space-y-4 text-base leading-relaxed text-mute sm:text-lg">
            <p>
              विधि फैब्रिक्स सूरत का निर्माता और थोक विक्रेता है। हम रीसेलर, बुटीक और रिटेलर के लिए
              अनस्टिच्ड सूट और ड्रेस मटेरियल देते हैं।
            </p>
            <p>
              खरीदार पंजाब, हरियाणा, राजस्थान, उत्तर प्रदेश और मध्य प्रदेश से आते हैं। सूरत में
              ड्रेस मटेरियल सेट के रूप में बिकता है। अनस्टिच्ड सूट होलसेल हमारी दो मुख्य रेंज में से
              एक है, पॉलिएस्टर साड़ियों के साथ।
            </p>
            <p>
              कुछ लाइनें हम खुद बनाते हैं और बाक़ी सूरत के बड़े कपड़ा बाज़ार से आती हैं, इसलिए ऑर्डर
              की ज़िम्मेदारी एक ही कारोबार की है। ताज़ा कैटलॉग व्हाट्सएप पर माँगिए।
            </p>
          </div>

          <ShowroomCollection lang="hi" />
          <PromoSuitCatalogueCta lang="hi" />
          <CatalogueButton className="mt-8" />

          <div className="mx-auto max-w-[65ch]">
            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              विधि फैब्रिक्स से क्यों खरीदें
            </h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink">
              {WHY.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

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
            <p className="mt-5 leading-[1.85] text-mute">
              आप सेट खरीद रहे हैं। पक्का कीजिए कि कौन-से हिस्से शामिल हैं, कोई हिस्सा वैकल्पिक तो
              नहीं, और सेट अनस्टिच्ड है या सेमी-स्टिच्ड। टॉप, बॉटम और दुपट्टे का कपड़ा अक्सर अलग
              होता है। त्योहारी सेट में ज़्यादातर काम दुपट्टे पर होता है, इसलिए हर हिस्से का कपड़ा
              पूछिए।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              त्योहारी सेट और रोज़मर्रा के सेट
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              रोज़मर्रा के सेट वे हैं जो दुकान साल भर दोबारा मँगवाती है: छपे और प्लेन पॉलिएस्टर और
              दूसरे सिंथेटिक ड्रेस मटेरियल, उन रंगों में जो त्योहार के हफ़्तों के बाहर भी बिकते हैं।
              बुटीक इन्हें रोज़ के रैक पर रखती हैं, त्योहारी एडिट के बगल में।
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              त्योहारी सेट छोटा और चुना हुआ होता है। करवा चौथ और दिवाली के लिए बुटीक और रीसेलर साड़ी
              और अनस्टिच्ड सूट साथ रखते हैं। करवा चौथ का ब्रीफ़ छोटा है: पारंपरिक त्योहारी रंग,
              अक्सर उसी दिन पहनने या परिवार में देने के लिए। दिवाली में रेंज खुलती है। पंजाब,
              हरियाणा और राजस्थान के कई खरीदार दोनों त्योहारों को एक सीज़न मानते हैं — पहले करवा चौथ
              की एडिट, उसके पीछे दिवाली की बड़ी रेंज। दोनों कैटलॉग व्हाट्सएप पर, डिज़ाइन दर डिज़ाइन,
              जाते हैं। अगर दुपट्टे या ओवरले के लिए ऑर्गेंज़ा या नेट चाहिए, तो वह कपड़ा हमारे सूरत
              मिल नेटवर्क से ऑर्डर पर सोर्स होता है, और खड़े ड्रेस मटेरियल सेट का हिस्सा नहीं है।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              पंजाब, हरियाणा और राजस्थान की बुटीक क्या रखती हैं
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              पंजाब और हरियाणा के बड़े हिस्से में अनस्टिच्ड सूट त्योहार की खरीद में साड़ी जितना ही
              मायने रखता है। वहाँ की बुटीक आम तौर पर एक ही ऑर्डर में दोनों चाहती है: जिन्हें ड्रेप
              चाहिए उनके लिए पॉलिएस्टर साड़ी, और जिन्हें सूट अपने नाप से सिलवाना है उनके लिए ड्रेस
              मटेरियल सेट। रोज़मर्रा के सेट उसी त्योहारी एडिट के पास रहते हैं, क्योंकि वही काउंटर
              साल के बाकी दिनों भी बेचता है।
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              राजस्थान की कई दुकानें साड़ी की तरफ़ झुकी होती हैं, और फिर भी उन ग्राहकों के लिए
              अनस्टिच्ड सूट कम मात्रा में रखती हैं जो माँगते हैं। वहाँ की दुकान पॉलिएस्टर साड़ी से
              शुरू कर सकती है और ड्रेस मटेरियल वहाँ जोड़ सकती है जहाँ काउंटर माँगे। मध्य प्रदेश के
              खरीदार भी यही दो श्रेणियाँ मँगवाते हैं। पहला मैसेज राज्य का नाम लेकर लिखिए, क्योंकि
              साड़ी और सूट का अनुपात हर बाज़ार में एक जैसा नहीं होता। एक ऑर्डर में त्योहारी और
              रोज़मर्रा के डिज़ाइन मिल सकते हैं, और सूट के साथ पॉलिएस्टर साड़ियाँ भी।
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              सीज़न के लिए स्टॉक करती बुटीक आम तौर पर ऑर्डर को मिक्स लिखती है, एक डिज़ाइन को दोहराकर
              नहीं। त्योहारी सेट करवा चौथ और दिवाली के लिए हैं। रोज़मर्रा के सेट बीच के हफ़्तों के
              लिए। पॉलिएस्टर साड़ी उन ग्राहकों के लिए है जो सिलाई वाला सूट नहीं, तैयार ड्रेप चाहते
              हैं। जो अनुपात चाहिए वह बताइए, हम मौजूदा कैटलॉग से वही डिज़ाइन भेजेंगे।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              सूरत से ड्रेस मटेरियल होलसेल क्यों
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              सूरत सिंथेटिक और ब्लेंडेड कपड़ों के भारत के मुख्य केंद्रों में से एक है। यहाँ के
              बाज़ारों में शहर भर की बुनाई, प्रिंटिंग और कढ़ाई इकाइयों का ड्रेस मटेरियल मिलता है,
              इसलिए आपको एक ही जगह डिज़ाइनों का बड़ा चुनाव मिलता है, और कपड़े से आपकी दुकान तक की
              कड़ी छोटी रहती है। यहाँ के निर्माता और होलसेलर होने के नाते, हम नई डिज़ाइनें आते ही
              देखते हैं और बता सकते हैं कि हर सेट किस कपड़े से बना है। ऑर्डर की ज़िम्मेदारी एक ही
              व्यवसाय की रहती है।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              थोक में खरीदते समय क्या जाँचें
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              हर हिस्से की सामग्री और नाप पूछिए। पक्का कीजिए कि सेट अनस्टिच्ड है या सेमी-स्टिच्ड, और
              कौन-से हिस्से शामिल हैं। सैंपल को सामान्य रोशनी में देखिए — फ़ील, ड्रेप और रंग — और
              मंज़ूरी के साथ डिज़ाइन कोड लिखकर रखिए। भुगतान से पहले पूरा ऑर्डर लिखित में लीजिए।
              हमारी{" "}
              <a href="/hi/blog/buying-dress-material-wholesale" className={linkClass}>
                थोक में ड्रेस मटेरियल खरीदने की गाइड
              </a>{" "}
              में हर कदम है।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              व्हाट्सएप पर ऑर्डर कैसे करें
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              ऑर्डर व्हाट्सएप पर बातचीत है। हमें{" "}
              <a
                href={whatsAppUrl(CATALOGUE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {BUSINESS.phoneDisplay}
              </a>{" "}
              पर मैसेज कीजिए और तीन बातें लिखिए: ड्रेस मटेरियल चाहिए, पॉलिएस्टर साड़ी, या दोनों;
              ऑर्डर त्योहारी है, रोज़मर्रा का, या मिला-जुला; और आप किस शहर में बेचते हैं। काउंटर पर
              जो रंग चलते हैं, उनका नाम लिखिए। अगर किसी सेट जैसी चीज़ चाहिए, उसकी तस्वीर भेजिए और
              बताइए कि कौन-सा हिस्सा मायने रखता है: प्रिंट, दुपट्टे का काम, या कपड़ा कैसे गिरता है।
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              हम मौजूदा कैटलॉग व्हाट्सएप पर भेजते हैं, और आमतौर पर 12 घंटे में जवाब देते हैं। हाथ और
              रंग जाँचना हो तो बड़े ऑर्डर से पहले सैंपल पास कीजिए, और मंज़ूरी के साथ डिज़ाइन कोड
              रखिए। सेट खुद देखना हो तो आप {ADDRESS_LINES.hi.join(", ")} पर आ सकते हैं।
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
              मँगवा सकते हैं, जो हम सूरत के अपने नेटवर्क से ऑर्डर पर सोर्स करते हैं। करवा चौथ और
              दिवाली के लिए देखिए —{" "}
              <a href="/hi/diwali-karva-chauth-wholesale-surat" className={linkClass}>
                दिवाली साड़ी होलसेल और करवा चौथ के अनस्टिच्ड सूट
              </a>
              । रीसेलर देखें —{" "}
              <a href="/hi/saree-wholesale-for-resellers" className={linkClass}>
                रीसेलर के लिए साड़ी होलसेल
              </a>
              ।
            </p>

            <section id="faq" className="mt-12 scroll-mt-8 border-t border-line pt-8">
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
