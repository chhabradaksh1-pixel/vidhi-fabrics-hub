import { createFileRoute } from "@tanstack/react-router";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { ResellerCircleCta } from "@/components/reseller-circle-cta";
import { ADDRESS_LINES, BUSINESS, BUSINESS_ID } from "@/content/business";
import { whatsAppUrl } from "@/content/whatsapp";

const SITE = "https://www.vidhifabrics.com";
const PATH = "/diwali-karva-chauth-wholesale-surat";

const TITLE = "Diwali Wholesale Sarees & Karva Chauth Suits, Surat | Vidhi";
const DESCRIPTION =
  "Diwali wholesale sarees and Karva Chauth unstitched suits for boutiques and resellers, from a Surat manufacturer and wholesaler. Festive catalogue on WhatsApp.";

const linkClass = "text-clay underline decoration-line underline-offset-4 hover:text-claydeep";

// Seasonal wholesale page for boutiques and resellers. The stocking guide
// (colours, feel, mix) stays on the Fabric Desk article; this page is the
// catalogue ask. No prices, MOQ, delivery timelines, transport or margins.
// Do not name which lines are made in-house. Organza and net are sourced
// to order, never described as reselling.
const FAQS: { question: string; answer: string }[] = [
  {
    question: "Do you supply Diwali sarees and Karva Chauth suits from Surat?",
    answer:
      "Yes. Vidhi Fabrics is a Surat manufacturer and wholesaler of polyester sarees and dress material, including unstitched suits for the festive season. Tell us what your boutique or shop needs and we will share the current catalogue on WhatsApp.",
  },
  {
    question: "Can boutiques and resellers cover both festivals in one enquiry?",
    answer:
      "Yes. Many buyers in Punjab, Haryana and Rajasthan treat Karva Chauth and Diwali as one season: a tighter Karva Chauth edit first, and a wider Diwali range behind it. Our stocking guide sets out how shops usually plan that mix.",
  },
  {
    question: "Are you a manufacturer or a wholesaler?",
    answer:
      "Both. Vidhi Fabrics is a Surat-based manufacturer and wholesaler. We manufacture some lines in-house and also supply from Surat's wider textile market, so you get one accountable point of contact and a wide, current range.",
  },
  {
    question: "Do you supply organza and net for festive dupattas?",
    answer:
      "We source organza, net and other fabrics to order through our network of Surat mills and manufacturing units. Share the shade, the width and what you plan to make, such as a dupatta, a lehenga layer or an overlay.",
  },
  {
    question: "Can I see designs before I order in bulk?",
    answer:
      "Yes. We share the current polyester saree and dress material catalogues on WhatsApp, and we recommend approving a physical sample before a bulk order. You are also welcome to visit us at Golden Point, Ring Road, Surat.",
  },
  {
    question: "Which regions do you supply?",
    answer:
      "Mainly North India: Punjab, Haryana, Rajasthan, Uttar Pradesh and Madhya Pradesh. Export enquiries are also welcome from the UAE and other international markets.",
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
        name: "Diwali and Karva Chauth Wholesale",
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
    publisher: { "@id": BUSINESS_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export const Route = createFileRoute("/diwali-karva-chauth-wholesale-surat")({
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
  component: FestivalWholesalePage,
});

const CATALOGUE_MESSAGE =
  "Hi Vidhi Fabrics, I run a boutique and need Diwali sarees and Karva Chauth suits.";

function CatalogueButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsAppUrl(CATALOGUE_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-claydeep ${className}`}
    >
      Get the Festive Catalogue on WhatsApp
    </a>
  );
}

function FestivalWholesalePage() {
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
              <li className="text-ink">Diwali and Karva Chauth Wholesale</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-balance font-display text-4xl font-light leading-[1.12] tracking-normal sm:text-5xl lg:text-6xl">
            Diwali Wholesale Sarees and Karva Chauth Unstitched Suits for Boutiques
          </h1>

          <CatalogueButton className="mt-8" />

          <div className="mx-auto max-w-[65ch]">
            <p className="mt-10 text-lg leading-relaxed text-mute">
              Vidhi Fabrics is a Surat manufacturer and wholesaler of polyester sarees and dress
              material. For Karva Chauth and Diwali we supply boutiques and resellers across North
              India with festive polyester sarees and unstitched suits. When a dupatta or overlay
              needs organza or net, we source it to order through our network of Surat mills and
              manufacturing units. Tell us what your counter sells and we will share the current
              catalogue on WhatsApp.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              One season, two festivals
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              Karva Chauth and Diwali usually fall a few weeks apart, and for many shops in Punjab,
              Haryana and Rajasthan they run as one festive season. The stock is not the same. Karva
              Chauth is a tighter brief: sarees and unstitched suits in traditional festive colours,
              often bought to wear on the day or to give within the family. Diwali opens the range —
              family visits, pujas, gifting and several days of going out. Plan a focused Karva
              Chauth edit first, and a wider Diwali range behind it.
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              Colours, fabric feel and how to mix sarees with suits are set out in our stocking
              guide,{" "}
              <a href="/blog/karva-chauth-diwali-festive-stock" className={linkClass}>
                what to stock for Karva Chauth and Diwali
              </a>
              . This page is where you ask for the catalogue.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              What boutiques and resellers order
            </h2>
            <ul className="mt-5 list-disc space-y-2 pl-6 leading-[1.85] text-mute">
              <li>
                Polyester sarees for the festive rack: a georgette or chiffon-style drape, a satin
                or silk-look sheen, or an embroidered or sequinned body.
              </li>
              <li>
                Unstitched suits and dress material sets, so customers can choose their own fit. In
                much of Punjab and Haryana the suit sells alongside the saree at these festivals;
                many shops in Rajasthan lean towards sarees.
              </li>
              <li>
                Organza and net for dupattas, lehenga layers and overlays, sourced to order. You
                deal with one business for the whole requirement.
              </li>
            </ul>
            <p className="mt-5 leading-[1.85] text-mute">
              The standing ranges are{" "}
              <a href="/polyester-sarees-wholesale-surat" className={linkClass}>
                polyester sarees wholesale
              </a>{" "}
              and{" "}
              <a href="/dress-material-wholesale-surat" className={linkClass}>
                dress material and unstitched suits
              </a>
              . Organza and net are on the{" "}
              <a href="/organza-net-fabric-for-boutiques" className={linkClass}>
                boutique fabric page
              </a>
              .
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              How to share your requirement
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              The clearer the brief, the closer the catalogue we send. On WhatsApp, tell us:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-[1.85] text-mute">
              <li>whether you run a boutique, a shop or sell as a reseller</li>
              <li>whether you are buying for Karva Chauth, Diwali, or both</li>
              <li>the colours your customers ask for</li>
              <li>whether you want sarees, unstitched suits, or a mix of both</li>
              <li>
                a shade card, a swatch, or a photo taken in daylight, if you are matching cloth
              </li>
            </ul>
            <p className="mt-5 leading-[1.85] text-mute">
              Approve a sample before you order in bulk, and keep the design code with that
              approval. Our{" "}
              <a href="/blog/sample-to-bulk-order-checklist" className={linkClass}>
                sample-to-bulk order checklist
              </a>{" "}
              covers each step. If two sarees look alike,{" "}
              <a href="/blog/why-similar-sarees-have-different-prices" className={linkClass}>
                why similar sarees can differ
              </a>{" "}
              is what to compare on the cloth itself.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">Where we supply</h2>
            <p className="mt-5 leading-[1.85] text-mute">
              Most of our buyers are boutiques, retailers and resellers in Punjab, Haryana,
              Rajasthan, Uttar Pradesh and Madhya Pradesh. Vidhi Fabrics has been in the trade since
              the 1960s. Export enquiries are also welcome from the UAE and other international
              markets. Message us on WhatsApp at{" "}
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
              Resellers who sell on WhatsApp or from home can also read{" "}
              <a href="/saree-wholesale-for-resellers" className={linkClass}>
                saree wholesale for resellers
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
