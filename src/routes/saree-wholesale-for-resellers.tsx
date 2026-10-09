import { createFileRoute } from "@tanstack/react-router";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { ResellerCircleCta } from "@/components/reseller-circle-cta";
import { ADDRESS_LINES, BUSINESS, BUSINESS_ID } from "@/content/business";
import { whatsAppUrl } from "@/content/whatsapp";

const SITE = "https://www.vidhifabrics.com";
const PATH = "/saree-wholesale-for-resellers";

const TITLE = "Saree Wholesale for Resellers, Surat | Vidhi Fabrics";
const DESCRIPTION =
  "Polyester sarees wholesale for online and WhatsApp resellers, small shops and home sellers, from a Surat manufacturer and wholesaler. Catalogue on WhatsApp.";

const linkClass = "text-clay underline decoration-line underline-offset-4 hover:text-claydeep";

// No MOQ, delivery timeline, transport or best/lowest-price wording on this
// page (BRAND.md). Quantities and timing are "ask us for your order".
const FAQS: { question: string; answer: string }[] = [
  {
    question: "Do you supply small resellers and home-based sellers?",
    answer:
      "Yes. We supply wholesalers, retailers, resellers and boutiques, including people who sell from home on WhatsApp or Instagram and small shops. Tell us what you sell and we'll explain how quantities and timing work for your order.",
  },
  {
    question: "Can I mix different designs in one order?",
    answer:
      "Yes. You can combine designs and colours from the catalogue in one order, so you can offer your customers a range instead of one design in bulk.",
  },
  {
    question: "How do I get the saree catalogue?",
    answer: `Message us on WhatsApp at ${BUSINESS.phoneDisplay} and tell us what your customers buy: daily wear or festive, and the colours that sell for you. We'll share the current polyester saree catalogue on WhatsApp.`,
  },
  {
    question: "Can I see a sample before I order in bulk?",
    answer:
      "Yes, and we recommend it. Approve a sample first, keep its design code, and use it as the reference for your bulk order.",
  },
  {
    question: "Will the shade and quality match what I approved?",
    answer:
      "We work to the sample and design code you approved, so you know what to expect. Keep the approved sample and check the goods against it when they arrive.",
  },
  {
    question: "Which regions do you supply?",
    answer:
      "Mainly North India: Punjab, Haryana, Rajasthan and Madhya Pradesh. Export enquiries are also welcome from the UAE and other international markets.",
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
        name: "Saree Wholesale for Resellers",
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
    inLanguage: "en-IN",
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

export const Route = createFileRoute("/saree-wholesale-for-resellers")({
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
  component: ResellerSareesPage,
});

const CATALOGUE_MESSAGE = "Hi Vidhi Fabrics, I'm a reseller looking for your saree catalogue.";

function CatalogueButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsAppUrl(CATALOGUE_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-claydeep ${className}`}
    >
      Get the Saree Catalogue on WhatsApp
    </a>
  );
}

function ResellerSareesPage() {
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
              <li className="text-ink">Saree Wholesale for Resellers</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-balance font-display text-4xl font-light leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            Saree Wholesale for Resellers, Direct from Surat
          </h1>

          <CatalogueButton className="mt-8" />

          <div className="mx-auto max-w-[65ch]">
            <p className="mt-10 text-lg leading-relaxed text-mute">
              Vidhi Fabrics is a Surat manufacturer and wholesaler of polyester sarees, and we
              supply resellers: people who sell on WhatsApp and Instagram, home-based sellers and
              small shops. Get the current catalogue on WhatsApp, mix designs in one order, approve
              a sample before you buy in bulk, and check every bulk order against the sample you
              approved.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">Who we supply</h2>
            <p className="mt-5 leading-[1.85] text-mute">
              Many of our buyers sell to their own customers through WhatsApp groups, Status updates
              and Instagram pages, often from home. Others run a small shop or a counter in a local
              market. Most are in North India, in Punjab, Haryana, Rajasthan and Madhya Pradesh.
              Whatever the size of your business, we deal with you directly as the manufacturer and
              wholesaler, not through an agent.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              The catalogue, on WhatsApp
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              Our catalogue comes to you as photos on WhatsApp, so you can look through it on your
              phone and show your customers what is available. Tell us what sells for you, such as
              daily wear or festive, the colours your customers ask for and the kind of buyers you
              serve, and we'll send the designs that fit, not the whole range.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              Mix designs in one order
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              A reseller needs variety more than volume in one design. You can combine designs and
              colours from the catalogue in a single order, for example a few festive reds and
              maroons alongside lighter daily-wear prints, so your customers see a real choice. Ask
              us how quantities and timing work for the mix you have in mind.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              Consistent shades and quality
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              Your customers order from the photo you sent them, so the saree that arrives has to
              match it. We work to the design code and the sample you approved, and you can check
              the goods against that sample when they arrive. If two sarees look alike but are
              priced differently, our guide on{" "}
              <a href="/blog/why-similar-sarees-have-different-prices" className={linkClass}>
                why similar sarees have different prices
              </a>{" "}
              explains what to compare, and{" "}
              <a href="/blog/fabric-gsm-bulk-orders" className={linkClass}>
                what GSM tells you in a bulk order
              </a>{" "}
              helps you judge the fabric itself.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              Samples before bulk
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              Approve a sample before you order in bulk. Look at it in daylight, check the feel and
              the fall, and keep the design code with your approval. Our{" "}
              <a href="/blog/sample-to-bulk-order-checklist" className={linkClass}>
                sample-to-bulk order checklist
              </a>{" "}
              walks through each step.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">Where we supply</h2>
            <p className="mt-5 leading-[1.85] text-mute">
              We mainly supply buyers in Punjab, Haryana, Rajasthan and Madhya Pradesh. Export
              enquiries are also welcome from the UAE and other international markets. Message us on
              WhatsApp at{" "}
              <a
                href={whatsAppUrl(CATALOGUE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {BUSINESS.phoneDisplay}
              </a>{" "}
              or visit us at {ADDRESS_LINES.en.join(", ")}.
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              See our full range of{" "}
              <a href="/polyester-sarees-wholesale-surat" className={linkClass}>
                polyester sarees wholesale
              </a>
              , and the{" "}
              <a href="/dress-material-wholesale-surat" className={linkClass}>
                dress material and unstitched suits
              </a>{" "}
              that many resellers sell alongside them. For the festive season, read{" "}
              <a href="/blog/karva-chauth-diwali-festive-stock" className={linkClass}>
                what to stock for Karva Chauth and Diwali
              </a>
              , or ask for the catalogue on our{" "}
              <a href="/diwali-karva-chauth-wholesale-surat" className={linkClass}>
                Diwali and Karva Chauth wholesale page
              </a>
              .
            </p>

            <ResellerCircleCta lang="en" className="mt-12" />

            <section className="mt-12 border-t border-line pt-8">
              <h2 className="font-display text-2xl font-light sm:text-3xl">FAQs</h2>
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
