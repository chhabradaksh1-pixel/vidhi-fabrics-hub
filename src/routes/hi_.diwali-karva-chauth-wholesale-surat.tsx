import { createFileRoute } from "@tanstack/react-router";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { ResellerCircleCta } from "@/components/reseller-circle-cta";
import { ADDRESS_LINES, BUSINESS, BUSINESS_ID } from "@/content/business";
import { whatsAppUrl } from "@/content/whatsapp";

const SITE = "https://www.vidhifabrics.com";
const EN_PATH = "/diwali-karva-chauth-wholesale-surat";
const PATH = "/hi/diwali-karva-chauth-wholesale-surat";

const TITLE = "दिवाली साड़ी होलसेल और करवा चौथ सूट, सूरत | विधि फैब्रिक्स";
const DESCRIPTION =
  "बुटीक और रीसेलर के लिए दिवाली साड़ी होलसेल और करवा चौथ के अनस्टिच्ड सूट, सूरत के निर्माता और होलसेलर से। त्योहारी कैटलॉग व्हाट्सएप पर।";

const linkClass = "text-clay underline decoration-line underline-offset-4 hover:text-claydeep";

// Hindi for this page has not been reviewed by a native speaker. Same claim
// rules as the English page: no prices, MOQ, delivery timelines, transport
// or margins; organza and net are sourced to order, not described as resale;
// do not name which lines are made in-house.
const FAQS: { question: string; answer: string }[] = [
  {
    question: "क्या आप सूरत से दिवाली की साड़ियाँ और करवा चौथ के सूट होलसेल में देते हैं?",
    answer:
      "हाँ। विधि फैब्रिक्स सूरत की पॉलिएस्टर साड़ी और ड्रेस मटेरियल की निर्माता और थोक विक्रेता है, और त्योहार के लिए अनस्टिच्ड सूट भी देती है। आपके बुटीक या दुकान को क्या चाहिए, बताइए — ताज़ा कैटलॉग व्हाट्सएप पर भेज देंगे।",
  },
  {
    question: "क्या बुटीक और रीसेलर दोनों त्योहार एक ही पूछताछ में कवर कर सकते हैं?",
    answer:
      "हाँ। पंजाब, हरियाणा और राजस्थान के कई खरीदार करवा चौथ और दिवाली को एक सीज़न मानकर खरीदते हैं: पहले करवा चौथ की चुनी हुई रेंज, और उसके पीछे दिवाली की बड़ी रेंज। दुकानें यह मेल आमतौर पर कैसे सोचती हैं, यह हमारी स्टॉक गाइड में है।",
  },
  {
    question: "क्या आप निर्माता हैं या थोक विक्रेता?",
    answer:
      "दोनों। विधि फैब्रिक्स सूरत स्थित निर्माता और थोक विक्रेता है। कुछ लाइनें हम खुद बनाते हैं और साथ ही सूरत के बड़े कपड़ा बाज़ार से भी सप्लाई करते हैं, ताकि आपको एक जवाबदेह संपर्क और एक विस्तृत, ताज़ा रेंज मिले।",
  },
  {
    question: "क्या त्योहारी दुपट्टों के लिए ऑर्गेंज़ा और नेट मिलता है?",
    answer:
      "ऑर्गेंज़ा, नेट और दूसरे कपड़े हम सूरत की मिलों और मैन्युफैक्चरिंग यूनिट्स के अपने नेटवर्क से ऑर्डर पर सोर्स करते हैं। शेड, चौड़ाई और आप क्या बनाएँगे — दुपट्टा, लहंगे की परत या ओवरले — वह बताइए।",
  },
  {
    question: "क्या बल्क ऑर्डर से पहले डिज़ाइन देख सकते हैं?",
    answer:
      "हाँ। पॉलिएस्टर साड़ियों और ड्रेस मटेरियल के ताज़ा कैटलॉग हम व्हाट्सएप पर भेजते हैं, और बल्क ऑर्डर से पहले असली सैंपल पास करने की सलाह देते हैं। आप गोल्डन पॉइंट, रिंग रोड, सूरत में हमसे मिलने भी आ सकते हैं।",
  },
  {
    question: "आप किन राज्यों में माल देते हैं?",
    answer:
      "ज़्यादातर उत्तर भारत में — पंजाब, हरियाणा, राजस्थान और मध्य प्रदेश। UAE और अन्य अंतरराष्ट्रीय बाज़ारों से एक्सपोर्ट पूछताछ का भी स्वागत है।",
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
        name: "दिवाली और करवा चौथ होलसेल",
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
    publisher: { "@id": BUSINESS_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export const Route = createFileRoute("/hi_/diwali-karva-chauth-wholesale-surat")({
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
  component: FestivalWholesalePageHi,
});

const CATALOGUE_MESSAGE =
  "नमस्ते विधि फैब्रिक्स, मेरा बुटीक है और मुझे दिवाली की साड़ियाँ और करवा चौथ के सूट चाहिए।";

function CatalogueButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsAppUrl(CATALOGUE_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-claydeep ${className}`}
    >
      व्हाट्सएप पर त्योहारी कैटलॉग माँगिए
    </a>
  );
}

function FestivalWholesalePageHi() {
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
              <li className="text-ink">दिवाली और करवा चौथ होलसेल</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-balance font-display text-4xl font-light leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            बुटीक के लिए दिवाली साड़ी होलसेल और करवा चौथ के अनस्टिच्ड सूट
          </h1>

          <CatalogueButton className="mt-8" />

          <div className="mx-auto max-w-[65ch]">
            <p className="mt-10 text-lg leading-relaxed text-mute">
              विधि फैब्रिक्स सूरत की पॉलिएस्टर साड़ी और ड्रेस मटेरियल की निर्माता और थोक विक्रेता
              है। करवा चौथ और दिवाली के लिए हम उत्तर भारत के बुटीक और रीसेलर को त्योहारी पॉलिएस्टर
              साड़ियाँ और अनस्टिच्ड सूट होलसेल में देते हैं। दुपट्टे या ओवरले के लिए ऑर्गेंज़ा और
              नेट सूरत की मिलों और मैन्युफैक्चरिंग यूनिट्स के हमारे नेटवर्क से ऑर्डर पर सोर्स होते
              हैं। आपके काउंटर पर क्या बिकता है, बताइए — ताज़ा कैटलॉग व्हाट्सएप पर भेज देंगे।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              एक सीज़न, दो त्योहार
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              करवा चौथ और दिवाली के बीच आम तौर पर कुछ ही हफ़्ते होते हैं, और पंजाब, हरियाणा और
              राजस्थान की कई दुकानों के लिए दोनों मिलकर एक त्योहारी सीज़न बन जाते हैं। माल एक जैसा
              नहीं होता। करवा चौथ का दायरा छोटा है: पारंपरिक त्योहारी रंगों की साड़ियाँ और अनस्टिच्ड
              सूट, अक्सर उसी दिन पहनने या परिवार में देने के लिए। दिवाली में रेंज खुलती है —
              रिश्तेदारों के यहाँ जाना, पूजा, तोहफ़े और कई दिनों का आना-जाना। पहले करवा चौथ की चुनी
              हुई रेंज सोचिए, और उसके पीछे दिवाली की बड़ी रेंज।
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              रंग, कपड़े का फ़ील और साड़ी-सूट का मेल हमारी स्टॉक गाइड में है —{" "}
              <a href="/hi/blog/karva-chauth-diwali-festive-stock" className={linkClass}>
                करवा चौथ और दिवाली के लिए क्या स्टॉक करें
              </a>
              । कैटलॉग माँगने के लिए यह पेज है।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              बुटीक और रीसेलर क्या मँगाते हैं
            </h2>
            <ul className="mt-5 list-disc space-y-2 pl-6 leading-[1.85] text-mute">
              <li>
                त्योहारी रैक के लिए पॉलिएस्टर साड़ियाँ: जॉर्जेट या शिफ़ॉन जैसा ड्रेप, सैटिन या सिल्क
                जैसी चमक, या कढ़ाई वाली और सीक्वेंस वाली बॉडी।
              </li>
              <li>
                अनस्टिच्ड सूट और ड्रेस मटेरियल सेट, ताकि ग्राहक अपनी फ़िटिंग चुन सकें। पंजाब और
                हरियाणा के ज़्यादातर हिस्सों में इन त्योहारों पर सूट साड़ी के साथ बिकता है; राजस्थान
                की कई दुकानों में साड़ी आगे रहती है।
              </li>
              <li>
                दुपट्टों, लहंगे की परतों और ओवरले के लिए ऑर्गेंज़ा और नेट, ऑर्डर पर सोर्स किया हुआ।
                पूरी ज़रूरत के लिए आपकी बात एक ही कारोबार से होती है।
              </li>
            </ul>
            <p className="mt-5 leading-[1.85] text-mute">
              मुख्य रेंज{" "}
              <a href="/hi/polyester-sarees-wholesale-surat" className={linkClass}>
                पॉलिएस्टर साड़ी होलसेल
              </a>{" "}
              और{" "}
              <a href="/hi/dress-material-wholesale-surat" className={linkClass}>
                ड्रेस मटेरियल और अनस्टिच्ड सूट
              </a>{" "}
              है। ऑर्गेंज़ा और नेट{" "}
              <a href="/hi/organza-net-fabric-for-boutiques" className={linkClass}>
                बुटीक के कपड़े वाले पेज
              </a>{" "}
              पर हैं।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              अपनी ज़रूरत कैसे बताएँ
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              जितनी साफ़ जानकारी, उतना सटीक कैटलॉग। व्हाट्सएप पर बताइए:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-[1.85] text-mute">
              <li>आप बुटीक चलाते हैं, दुकान है, या रीसेलर के रूप में बेचते हैं</li>
              <li>खरीद करवा चौथ के लिए है, दिवाली के लिए, या दोनों के लिए</li>
              <li>आपके ग्राहक कौन-से रंग माँगते हैं</li>
              <li>साड़ियाँ चाहिए, अनस्टिच्ड सूट, या दोनों का मेल</li>
              <li>
                अगर कपड़ा मिलाना है तो शेड कार्ड, कपड़े का टुकड़ा, या दिन की रोशनी में ली फ़ोटो
              </li>
            </ul>
            <p className="mt-5 leading-[1.85] text-mute">
              बल्क ऑर्डर से पहले सैंपल पास कीजिए, और उस मंज़ूरी के साथ डिज़ाइन कोड लिखकर रखिए। हमारी{" "}
              <a href="/hi/blog/sample-to-bulk-order-checklist" className={linkClass}>
                सैंपल से बल्क ऑर्डर तक की चेकलिस्ट
              </a>{" "}
              में हर कदम है। अगर दो साड़ियाँ एक जैसी लगें, तो कपड़े पर क्या तुलना करें —{" "}
              <a href="/hi/blog/why-similar-sarees-have-different-prices" className={linkClass}>
                एक जैसी साड़ियों में फ़र्क़ क्यों आता है
              </a>
              ।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              हम कहाँ माल देते हैं
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              हमारे ज़्यादातर खरीदार पंजाब, हरियाणा, राजस्थान और मध्य प्रदेश के बुटीक, रिटेलर और
              रीसेलर हैं। विधि फैब्रिक्स 1960 के दशक से इस कारोबार में है। UAE और अन्य अंतरराष्ट्रीय
              बाज़ारों से एक्सपोर्ट पूछताछ का भी स्वागत है। हमें व्हाट्सएप पर{" "}
              <a
                href={whatsAppUrl(CATALOGUE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {BUSINESS.phoneDisplay}
              </a>{" "}
              पर मैसेज कीजिए, या {ADDRESS_LINES.hi.join(", ")} पर आकर मिलिए।
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              जो रीसेलर व्हाट्सएप पर या घर से बेचते हैं, वे{" "}
              <a href="/hi/saree-wholesale-for-resellers" className={linkClass}>
                रीसेलर के लिए साड़ी होलसेल
              </a>{" "}
              भी पढ़ सकते हैं।
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
              <CatalogueButton />
            </div>
          </div>
        </article>
      </main>
      <JournalFooter lang="hi" />
    </div>
  );
}
