import { createFileRoute } from "@tanstack/react-router";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { PromoSareeLine } from "@/components/promo-suits";
import { ResellerCircleCta } from "@/components/reseller-circle-cta";
import { ADDRESS_LINES, BUSINESS, BUSINESS_ID } from "@/content/business";
import { whatsAppUrl } from "@/content/whatsapp";

const SITE = "https://www.vidhifabrics.com";
const EN_PATH = "/saree-wholesale-for-resellers";
const PATH = "/hi/saree-wholesale-for-resellers";

const TITLE = "रीसेलर के लिए साड़ी होलसेल, सूरत से | विधि फैब्रिक्स";
const DESCRIPTION =
  "ऑनलाइन और व्हाट्सएप रीसेलर, छोटी दुकानों और घर से बेचने वालों के लिए — सूरत के निर्माता और थोक विक्रेता से पॉलिएस्टर साड़ियाँ होलसेल में। कैटलॉग व्हाट्सएप पर।";

const linkClass = "text-clay underline decoration-line underline-offset-4 hover:text-claydeep";

// Same rules as the English page: no MOQ, delivery timeline, transport or
// best/lowest-price wording (BRAND.md).
const FAQS: { question: string; answer: string }[] = [
  {
    question: "क्या आप छोटे रीसेलर और घर से बेचने वालों को भी माल देते हैं?",
    answer:
      "जी हाँ। हम होलसेलर, रिटेलर, रीसेलर और बुटीक — सबको माल देते हैं, जिनमें व्हाट्सएप या इंस्टाग्राम पर घर से बेचने वाले और छोटी दुकानें भी शामिल हैं। आप क्या बेचते हैं, बताइए — हम समझा देंगे कि आपके ऑर्डर में मात्रा और समय कैसे तय होंगे।",
  },
  {
    question: "क्या एक ही ऑर्डर में अलग-अलग डिज़ाइन ले सकते हैं?",
    answer:
      "जी हाँ। कैटलॉग से कई डिज़ाइन और रंग मिलाकर एक ही ऑर्डर में लीजिए, ताकि आपके ग्राहकों को एक ही डिज़ाइन का ढेर नहीं, पूरी वैरायटी दिखे।",
  },
  {
    question: "साड़ी का कैटलॉग कैसे मिलेगा?",
    answer: `व्हाट्सएप पर ${BUSINESS.phoneDisplay} पर मैसेज कीजिए और बताइए कि आपके ग्राहक क्या लेते हैं — रोज़ पहनने वाली या त्योहारी, और कौन-से रंग आपके यहाँ चलते हैं। हम पॉलिएस्टर साड़ियों का मौजूदा कैटलॉग व्हाट्सएप पर भेज देंगे।`,
  },
  {
    question: "क्या बल्क ऑर्डर से पहले सैंपल देख सकते हैं?",
    answer:
      "जी हाँ, और हमारी सलाह भी यही है। पहले सैंपल पास कीजिए, उसका डिज़ाइन कोड लिखकर रखिए और बल्क ऑर्डर उसी के हिसाब से दीजिए।",
  },
  {
    question: "क्या शेड और क्वालिटी पास किए गए सैंपल जैसी ही रहेगी?",
    answer:
      "हम आपके पास किए गए सैंपल और डिज़ाइन कोड के हिसाब से ही काम करते हैं, ताकि आपको पता रहे कि क्या आ रहा है। पास किया हुआ सैंपल संभालकर रखिए और माल आने पर उससे मिलाकर देखिए।",
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
        name: "रीसेलर के लिए साड़ी होलसेल",
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

export const Route = createFileRoute("/hi_/saree-wholesale-for-resellers")({
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
  component: ResellerSareesPageHi,
});

const CATALOGUE_MESSAGE =
  "नमस्ते विधि फैब्रिक्स, मैं रीसेलर हूँ और मुझे आपकी साड़ियों का कैटलॉग चाहिए।";

function CatalogueButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsAppUrl(CATALOGUE_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-claydeep ${className}`}
    >
      व्हाट्सएप पर साड़ी कैटलॉग पाइए
    </a>
  );
}

function ResellerSareesPageHi() {
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
              <li className="text-ink">रीसेलर के लिए साड़ी होलसेल</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-balance font-display text-4xl font-light leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            रीसेलर के लिए साड़ी होलसेल, सीधे सूरत से
          </h1>

          <CatalogueButton className="mt-8" />
          <PromoSareeLine lang="hi" />

          <div className="mx-auto max-w-[65ch]">
            <p className="mt-10 text-lg leading-relaxed text-mute">
              विधि फैब्रिक्स सूरत की पॉलिएस्टर साड़ी निर्माता और थोक विक्रेता है, और हम रीसेलरों को
              माल देते हैं — व्हाट्सएप और इंस्टाग्राम पर बेचने वाले, घर से काम करने वाले और छोटी
              दुकानें। मौजूदा कैटलॉग व्हाट्सएप पर पाइए, एक ही ऑर्डर में कई डिज़ाइन मिलाइए, बल्क से
              पहले सैंपल पास कीजिए, और हर बल्क ऑर्डर को उसी पास किए गए सैंपल से मिलाकर देखिए।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              हम किसे माल देते हैं
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              हमारे बहुत-से खरीदार व्हाट्सएप ग्रुप, स्टेटस और इंस्टाग्राम पेज के ज़रिए अपने ग्राहकों
              को बेचते हैं, अक्सर घर से ही। कुछ की छोटी दुकान है या लोकल बाज़ार में काउंटर।
              ज़्यादातर उत्तर भारत में हैं — पंजाब, हरियाणा, राजस्थान, उत्तर प्रदेश और मध्य प्रदेश
              में। आपका काम छोटा हो या बड़ा, आपकी बात सीधे निर्माता और थोक विक्रेता से होती है, किसी
              एजेंट से नहीं।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              कैटलॉग, सीधे व्हाट्सएप पर
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              हमारा कैटलॉग व्हाट्सएप पर फ़ोटो के रूप में आता है, ताकि आप फ़ोन पर ही देख लें और अपने
              ग्राहकों को दिखा सकें। बताइए कि आपके यहाँ क्या बिकता है — रोज़ पहनने वाली या त्योहारी
              साड़ियाँ, कौन-से रंग माँगे जाते हैं, और आपके ग्राहक कैसे हैं — हम पूरी रेंज नहीं, आपके
              काम की डिज़ाइनें भेजेंगे।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              एक ऑर्डर में कई डिज़ाइन
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              रीसेलर को एक डिज़ाइन का ढेर नहीं, वैरायटी चाहिए। कैटलॉग से कई डिज़ाइन और रंग एक ही
              ऑर्डर में मिलाइए — जैसे कुछ त्योहारी लाल और मरून, साथ में हल्के रोज़मर्रा वाले प्रिंट
              — ताकि आपके ग्राहकों के पास सच में चुनने को कुछ हो। आपके मन में जो मिक्स है, उसके लिए
              मात्रा और समय कैसे तय होंगे, यह हमसे पूछ लीजिए।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              एक जैसा शेड, एक जैसी क्वालिटी
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              आपका ग्राहक आपकी भेजी फ़ोटो देखकर ऑर्डर करता है, इसलिए जो साड़ी पहुँचे, वह वैसी ही
              होनी चाहिए। हम आपके पास किए गए डिज़ाइन कोड और सैंपल के हिसाब से काम करते हैं, और माल
              आने पर आप उसे उसी सैंपल से मिला सकते हैं। दो साड़ियाँ एक जैसी दिखें पर दाम अलग हों, तो
              हमारी गाइड{" "}
              <a href="/hi/blog/why-similar-sarees-have-different-prices" className={linkClass}>
                एक जैसी दिखने वाली साड़ियों के दाम अलग क्यों होते हैं
              </a>{" "}
              बताती है कि क्या मिलाकर देखें, और{" "}
              <a href="/hi/blog/fabric-gsm-bulk-orders" className={linkClass}>
                बल्क ऑर्डर में GSM का मतलब
              </a>{" "}
              कपड़ा परखने में मदद करती है।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              बल्क से पहले सैंपल
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              बल्क ऑर्डर से पहले सैंपल पास कीजिए। उसे दिन की रोशनी में देखिए, हाथ का फ़ील और गिराव
              परखिए, और पास करते समय डिज़ाइन कोड लिखकर रखिए। हमारी{" "}
              <a href="/hi/blog/sample-to-bulk-order-checklist" className={linkClass}>
                सैंपल से बल्क ऑर्डर तक की चेकलिस्ट
              </a>{" "}
              में हर कदम दिया है।
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              हम कहाँ माल देते हैं
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              हमारे ज़्यादातर खरीदार पंजाब, हरियाणा, राजस्थान, उत्तर प्रदेश और मध्य प्रदेश में हैं।
              UAE और अन्य अंतरराष्ट्रीय बाज़ारों से एक्सपोर्ट पूछताछ का भी स्वागत है। हमें व्हाट्सएप
              पर{" "}
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
              हमारी पूरी{" "}
              <a href="/hi/polyester-sarees-wholesale-surat" className={linkClass}>
                पॉलिएस्टर साड़ी होलसेल
              </a>{" "}
              रेंज देखिए, और साथ में{" "}
              <a href="/hi/dress-material-wholesale-surat" className={linkClass}>
                ड्रेस मटेरियल और अनस्टिच्ड सूट
              </a>{" "}
              भी, जो कई रीसेलर साड़ियों के साथ बेचते हैं। त्योहारों के लिए पढ़िए —{" "}
              <a href="/hi/blog/karva-chauth-diwali-festive-stock" className={linkClass}>
                करवा चौथ और दिवाली के लिए क्या स्टॉक करें
              </a>
              । कैटलॉग{" "}
              <a href="/hi/diwali-karva-chauth-wholesale-surat" className={linkClass}>
                दिवाली और करवा चौथ होलसेल
              </a>{" "}
              पेज पर माँगिए।
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
