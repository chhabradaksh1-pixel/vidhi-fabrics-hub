import { createFileRoute } from "@tanstack/react-router";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { ADDRESS_LINES, BUSINESS } from "@/content/business";
import { WHATSAPP_NUMBER, whatsAppUrl } from "@/content/whatsapp";

const SITE = "https://www.vidhifabrics.com";
const PATH = "/polyester-sarees-wholesale-surat";

const TITLE = "Polyester Sarees Wholesale in Surat | Vidhi Fabrics, Manufacturer & Wholesaler";
const DESCRIPTION =
  "Polyester sarees in bulk from a Surat manufacturer and wholesaler, for buyers across Punjab, Haryana, Rajasthan and MP. Get today's catalogue on WhatsApp.";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Which regions do you supply?",
    answer:
      "Mainly North India, in Punjab, Haryana and Rajasthan, and we also supply buyers in Madhya Pradesh.",
  },
  {
    question: "Do you supply wholesalers as well as retailers?",
    answer: "Yes. We supply wholesalers, distributors, retailers, resellers and boutiques in bulk.",
  },
  {
    question: "Can I see designs before ordering?",
    answer:
      "Yes. We share the latest catalogue on WhatsApp, and you're welcome to visit our shop at Golden Point, Ring Road, Surat.",
  },
  {
    // Positioning confirmed by the owner on 1 October 2026: manufacturer and
    // wholesaler. Deliberately does not name which lines are made in-house;
    // the owner has not specified them.
    question: "Are you a manufacturer or a wholesaler?",
    answer:
      "Both. Vidhi Fabrics is a Surat-based manufacturer and wholesaler. We manufacture some lines in-house and also supply from Surat's wider textile market, so you get one accountable point of contact and a wide, current range.",
  },
  {
    question: "How do I get wholesale rates?",
    answer: `Send your requirements on WhatsApp at ${BUSINESS.phoneDisplay} and we'll reply with current rates.`,
  },
];

function breadcrumbList() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Vidhi Fabrics", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Polyester Sarees Wholesale Surat",
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

export const Route = createFileRoute("/polyester-sarees-wholesale-surat")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE}${PATH}` },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:locale:alternate", content: "hi_IN" },
    ],
    links: [
      { rel: "canonical", href: `${SITE}${PATH}` },
      { rel: "alternate", hrefLang: "en", href: `${SITE}${PATH}` },
      { rel: "alternate", hrefLang: "hi", href: `${SITE}/hi${PATH}` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE}${PATH}` },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(breadcrumbList()) },
      { type: "application/ld+json", children: JSON.stringify(faqPage()) },
    ],
  }),
  component: PolyesterSareesPage,
});

const CATALOGUE_MESSAGE =
  "Hi Vidhi Fabrics, please share your polyester sarees catalogue and current rates.";

function CatalogueButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsAppUrl(CATALOGUE_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-claydeep ${className}`}
    >
      Get Catalogue on WhatsApp
    </a>
  );
}

function PolyesterSareesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <JournalHeader lang="en" />
      <main>
        <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16" lang="en">
          <nav aria-label="Breadcrumb" className="text-xs text-mute">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href="/" className="hover:text-clay">
                  Vidhi Fabrics
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">Polyester Sarees Wholesale Surat</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-balance font-display text-4xl font-light leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            Polyester Sarees Wholesale, Direct from Surat
          </h1>

          <CatalogueButton className="mt-8" />

          <div className="mx-auto max-w-[65ch]">
            <p className="mt-10 text-lg leading-relaxed text-mute">
              Vidhi Fabrics is a Surat-based manufacturer and wholesaler, supplying polyester sarees
              in bulk to wholesalers, retailers, resellers and boutiques. We manufacture some lines
              in-house and also supply from Surat's wider textile market. Most of our buyers are in
              North India, in Punjab, Haryana and Rajasthan, and we also supply buyers in Madhya
              Pradesh. Because we work directly in the Surat textile market, you get steady supply
              without extra middlemen.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              Why buy polyester sarees from us
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              Our polyester range covers daily-wear prints, festive embroidered sarees, and
              lightweight designs picked for what sells in North Indian markets. Polyester is
              popular with retailers and wholesalers alike because it's affordable, holds colour
              well, needs little care, and sells quickly at every price point.
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              We put together sets by design and colour, keep new designs coming each season, and
              pack every order carefully for transport.
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              Message us on WhatsApp at{" "}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                {BUSINESS.phoneDisplay}
              </a>{" "}
              for the latest catalogue and rates, or visit us at {ADDRESS_LINES.en.join(", ")}.
              Whether you're a wholesaler stocking up for distribution or a retailer restocking
              bestsellers, we'll help you choose designs that fit your customers and your margins.
            </p>

            <p className="mt-5 leading-[1.85] text-mute">
              We also supply{" "}
              <a
                href="/dress-material-wholesale-surat"
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                dress material wholesale
              </a>{" "}
              from Surat, including unstitched suits.
            </p>

            <section className="mt-12 border-t border-line pt-8">
              <h2 className="font-display text-2xl font-light sm:text-3xl">FAQs</h2>
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
      <JournalFooter lang="en" />
    </div>
  );
}
