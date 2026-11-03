import { createFileRoute } from "@tanstack/react-router";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { ResellerCircleCta } from "@/components/reseller-circle-cta";
import { ADDRESS_LINES, BUSINESS, BUSINESS_ID } from "@/content/business";
import { whatsAppUrl } from "@/content/whatsapp";

const SITE = "https://www.vidhifabrics.com";
const PATH = "/organza-net-fabric-for-boutiques";

const TITLE = "Organza & Net Fabric Wholesale for Boutiques, Surat";
const DESCRIPTION =
  "Organza and net fabric wholesale for boutiques, sourced to order through our network of Surat mills and units. Share a shade card, sample or width on WhatsApp.";

const linkClass = "link";

// Positioning (owner, 2 October 2026): manufacturer and wholesaler of
// polyester sarees and dress material; organza, net and other fabrics are
// sourced to order through the Surat network. Never mention margins or
// reselling; no MOQ, delivery timeline, transport or price claims.
const FAQS: { question: string; answer: string }[] = [
  {
    question: "Do you keep organza and net in stock, or source them?",
    answer:
      "We source organza, net and other fabrics to order through our network of Surat mills and manufacturing units. Tell us what you need and we'll find options that match it.",
  },
  {
    question: "What do boutiques use organza and net fabric for?",
    answer:
      "Mostly dupattas, lehenga layers, sleeves and overlays on kurtas, blouses and gowns. Organza gives a crisp, sheer finish that holds its shape; net is lighter and works well in layers and as a base for embroidery.",
  },
  {
    question: "What should I send with my requirement?",
    answer:
      "A shade card number or a colour photo taken in daylight, a physical sample or swatch if you have one, the width you need, the finish (plain, printed, embroidered or sequinned) and what you plan to make.",
  },
  {
    question: "Can I get a sample before ordering in bulk?",
    answer:
      "Yes, and we recommend it. Approve a sample first and keep its reference, so the bulk order is checked against the fabric you actually approved.",
  },
  {
    question: "Can you match a particular shade?",
    answer:
      "Share the shade card or swatch and we'll look for the closest match available through our network, then send a sample for you to approve before any bulk order.",
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
        name: "Organza and Net Fabric for Boutiques",
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

export const Route = createFileRoute("/organza-net-fabric-for-boutiques")({
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
  component: OrganzaNetPage,
});

const REQUIREMENT_MESSAGE = "Hi Vidhi Fabrics, I run a boutique and need organza/net fabric.";

function RequirementButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsAppUrl(REQUIREMENT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-primary ${className}`}
    >
      Share Your Requirement on WhatsApp
    </a>
  );
}

function OrganzaNetPage() {
  return (
    <div className="min-h-screen bg-linen text-ink">
      <JournalHeader lang="en" />
      <main>
        <article
          className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 sm:pt-11 lg:px-[50px] lg:pb-24 lg:pt-14"
          lang="en"
        >
          <nav aria-label="Breadcrumb" className="type-small text-mute">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href="/" className="hover:text-clay">
                  Vidhi Fabrics
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">Organza and Net Fabric for Boutiques</li>
            </ol>
          </nav>

          <h1 className="mt-6 max-w-[28ch] type-h1">
            Organza and Net Fabric for Boutiques, Sourced in Surat
          </h1>

          <RequirementButton className="vf-indent mt-8" />

          <div className="vf-flow">
            <p className="mt-10 type-lead text-mute">
              Vidhi Fabrics is a Surat manufacturer and wholesaler of polyester sarees and dress
              material. For boutiques, we also supply organza and net fabric wholesale, sourced to
              order through our network of Surat mills and manufacturing units. Share a shade card,
              a sample or the width you need on WhatsApp, approve a sample, and then order in bulk.
            </p>

            <h2 className="vf-heading-strong type-h4 text-ink">
              What boutiques use organza and net for
            </h2>
            <p className="mt-5 type-body text-mute">
              Organza is crisp and sheer and holds its shape, which is why boutiques choose it for
              dupattas, structured sleeves and overlays on kurtas, blouses and gowns. Net is lighter
              and softer in the hand, and works well for lehenga layers, flared dupattas, sleeves
              and as a base for embroidery or sequin work. Both come plain, printed, embroidered or
              sequinned, in a wide range of shades.
            </p>

            <h2 className="vf-heading-strong type-h4 text-ink">
              Sourced to order through our Surat network
            </h2>
            <p className="mt-5 type-body text-mute">
              Surat is one of India's main centres for synthetic fabrics, and its mills and
              manufacturing units make organza and net in many weights and finishes. We have worked
              in this market for generations, so when you tell us what you need, we look across our
              network of mills and units for fabric that matches it, and come back to you with
              options and samples. You deal with one business for the whole requirement.
            </p>

            <h2 className="vf-heading-strong type-h4 text-ink">How to share your requirement</h2>
            <p className="mt-5 type-body text-mute">
              The more precise the brief, the closer the match. Send us:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 type-body text-mute">
              <li>a shade card number, or a colour photo taken in daylight</li>
              <li>a physical sample or swatch, if you have one</li>
              <li>the width you need, in inches</li>
              <li>the finish: plain, printed, embroidered or sequinned</li>
              <li>what you plan to make, such as dupattas, lehenga layers, sleeves or overlays</li>
            </ul>
            <p className="mt-5 type-body text-mute">
              Width changes how many pieces you can cut from a metre, so it matters for your
              costing. Our guides on{" "}
              <a href="/blog/fabric-width-and-costing" className={linkClass}>
                fabric width and costing
              </a>{" "}
              and{" "}
              <a href="/blog/how-to-read-a-fabric-spec" className={linkClass}>
                how to read a fabric spec
              </a>{" "}
              explain what to ask for.
            </p>

            <h2 className="vf-heading-strong type-h4 text-ink">Samples before bulk</h2>
            <p className="mt-5 type-body text-mute">
              Sheer fabrics look different on a screen, so approve a physical sample before you
              order in bulk. Hold it to the light, check the feel and the drape, and keep its
              reference with your approval. Our{" "}
              <a href="/blog/sample-to-bulk-order-checklist" className={linkClass}>
                sample-to-bulk order checklist
              </a>{" "}
              covers each step.
            </p>

            <h2 className="vf-heading-strong type-h4 text-ink">Where we supply</h2>
            <p className="mt-5 type-body text-mute">
              Most of our buyers are boutiques, retailers and wholesalers in Punjab, Haryana,
              Rajasthan, Uttar Pradesh and Madhya Pradesh. Export enquiries are also welcome from
              the UAE and other international markets. Message us on WhatsApp at{" "}
              <a
                href={whatsAppUrl(REQUIREMENT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {BUSINESS.phoneDisplay}
              </a>{" "}
              or visit us at {ADDRESS_LINES.en.join(", ")}.
            </p>
            <p className="mt-5 type-body text-mute">
              Boutiques often pair organza and net with our{" "}
              <a href="/dress-material-wholesale-surat" className={linkClass}>
                dress material and unstitched suits
              </a>{" "}
              and{" "}
              <a href="/polyester-sarees-wholesale-surat" className={linkClass}>
                polyester sarees
              </a>
              . Before buying for a season, see{" "}
              <a href="/blog/buying-dress-material-wholesale" className={linkClass}>
                what to check when buying dress material wholesale
              </a>
              .
            </p>

            <ResellerCircleCta lang="en" className="mt-12" />

            <section>
              <h2 className="vf-heading-strong type-h4 text-ink">FAQs</h2>
              {FAQS.map((entry) => (
                <div key={entry.question} className="mt-7">
                  <h3 className="type-h4">{entry.question}</h3>
                  <p className="mt-3 type-body text-mute">{entry.answer}</p>
                </div>
              ))}
            </section>

            <div className="vf-flow-end">
              <RequirementButton />
            </div>
          </div>
        </article>
      </main>
      <JournalFooter lang="en" />
    </div>
  );
}
