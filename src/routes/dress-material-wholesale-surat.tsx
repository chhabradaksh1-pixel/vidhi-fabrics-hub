import { createFileRoute } from "@tanstack/react-router";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { PromoSuitCatalogueCta } from "@/components/promo-suits";
import { ShowroomCollection } from "@/components/showroom-collection";
import { ADDRESS_LINES, BUSINESS, BUSINESS_ID } from "@/content/business";
import { whatsAppUrl } from "@/content/whatsapp";

const SITE = "https://www.vidhifabrics.com";
const PATH = "/dress-material-wholesale-surat";

const TITLE = "Dress Material in Surat | Unstitched Suits Wholesale";
const DESCRIPTION =
  "Dress material in Surat from a manufacturer and wholesaler. Unstitched suits wholesale for resellers, boutiques and retailers in North India.";

const linkClass = "text-clay underline decoration-clay/70 underline-offset-4 hover:text-claydeep";

const WHY = [
  "60 years in the trade",
  "Surat manufacturer network",
  "New designs regularly",
  "Catalogue on WhatsApp",
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Do you sell dress material in Surat?",
    answer:
      "Yes. Vidhi Fabrics is a Surat manufacturer and wholesaler of dress material and unstitched suits. The current catalogue is shared on WhatsApp.",
  },
  {
    question: "Can I buy dress material wholesale from Surat?",
    answer:
      "Yes. We sell dress material wholesale from Surat to resellers, boutiques and retailers across North India.",
  },
  {
    question: "Do you offer unstitched suits wholesale in Surat?",
    answer:
      "Yes. Unstitched suits wholesale in Surat is one of our two main ranges, sold as dress material sets so a shop can offer its own fit and style.",
  },
  {
    question: "Which states do you supply?",
    answer: "Punjab, Haryana, Rajasthan, Uttar Pradesh and Madhya Pradesh.",
  },
  {
    question: "How do I get the dress material catalogue?",
    answer: `Message us on WhatsApp at ${BUSINESS.phoneDisplay} and we will share the current catalogue. You are also welcome at our shop at Golden Point, Ring Road, Surat.`,
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
        name: "Dress material wholesale in Surat",
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

export const Route = createFileRoute("/dress-material-wholesale-surat")({
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
  component: DressMaterialPage,
});

const CATALOGUE_MESSAGE = "Hi Vidhi Fabrics, please share your dress material catalogue.";

function CatalogueButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsAppUrl(CATALOGUE_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-claydeep ${className}`}
    >
      Get Catalogue on WhatsApp
    </a>
  );
}

function DressMaterialPage() {
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
              <li className="text-ink">Dress material wholesale in Surat</li>
            </ol>
          </nav>

          <h1 className="vf-showroom-serif mt-6 text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            Dress material wholesale in Surat
          </h1>
          <div className="mx-auto mt-6 max-w-[65ch] space-y-4 text-base leading-relaxed text-mute sm:text-lg">
            <p>
              Vidhi Fabrics is a Surat manufacturer and wholesaler of unstitched suits and dress
              material for resellers, boutiques and retailers across North India.
            </p>
            <p>
              Buyers come from Punjab, Haryana, Rajasthan, Uttar Pradesh and Madhya Pradesh. Dress
              material in Surat is sold as sets. Unstitched suits wholesale from Surat is one of our
              two main ranges, beside polyester sarees.
            </p>
            <p>
              Some lines are made by us and the rest come from Surat's wider textile market, so one
              business answers for the order. Ask on WhatsApp for the current catalogue.
            </p>
          </div>

          <ShowroomCollection lang="en" />
          <PromoSuitCatalogueCta lang="en" />
          <CatalogueButton className="mt-8" />

          <div className="mx-auto max-w-[65ch]">
            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              Why buy from Vidhi Fabrics
            </h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink">
              {WHY.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              Unstitched suits and dress material sets
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              Dress material is sold as a set, not by the metre. A typical unstitched suit combines
              fabric for the top, the bottom and a dupatta, in lengths a tailor can work with.
              Retailers stock it because customers choose their own fit and style, and one set can
              be stitched in many ways. We supply everyday and festive sets, arranged by design and
              colour, so you can build a selection that suits your counter.
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              The set is the unit you are buying. Confirm which pieces are included, whether any
              piece is optional, and whether the set is unstitched or semi-stitched. The top, the
              bottom and the dupatta are often different fabrics. In festive sets the dupatta
              frequently carries most of the work, so ask what each piece is made of.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              Festive sets and daily-wear sets
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              Daily-wear sets are the ones a shop reorders through the year: printed and plain
              polyester and other synthetic dress material, in colours that sell outside the
              festival weeks. Boutiques use them for the regular rail, beside the festive edit.
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              Festive sets are the tighter edit. For Karva Chauth and Diwali, boutiques and
              resellers stock sarees and unstitched suits together. Karva Chauth is the smaller
              brief: traditional festive colours, often bought to wear on the day or to give within
              the family. Diwali opens the range. Many buyers in Punjab, Haryana and Rajasthan treat
              the two festivals as one season, with a Karva Chauth edit first and a wider Diwali
              range behind it. Both catalogues go out on WhatsApp, design by design. If a dupatta or
              overlay needs organza or net, that cloth is sourced to order through our Surat mill
              network, and is not part of the standing dress material sets.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              What Punjab, Haryana and Rajasthan boutiques stock
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              In much of Punjab and Haryana, the unstitched suit is as much a festive purchase as
              the saree. A boutique there usually wants both on the same order: polyester sarees for
              customers who want a drape, and dress material sets for customers who will have the
              suit stitched to their own measurements. Daily-wear sets sit beside that festive edit,
              because the same counter sells through the rest of the year.
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              Many shops in Rajasthan lean towards sarees, and still keep a smaller run of
              unstitched suits for customers who ask for them. A shop there can lead with polyester
              sarees and add dress material where the counter asks for it. Buyers in Madhya Pradesh
              order the same two categories. Name the state in your first message, because the
              balance of sarees and suits is not the same in every market. One order can mix festive
              and daily-wear designs, and can add polyester sarees beside the suits.
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              A boutique stocking for the season usually writes the order as a mix, not as one
              design repeated. Festive sets cover Karva Chauth and Diwali. Daily-wear sets cover the
              weeks between. Polyester sarees cover customers who want a finished drape rather than
              a suit to be stitched. Tell us the split you want and we will send those designs from
              the current catalogue.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              Why buy dress material from Surat
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              Surat is one of India's main centres for synthetic and blended fabrics. Its markets
              carry dress material from weaving, printing and embroidery units across the city, so
              you see a wide choice of designs in one place, with a shorter chain between the cloth
              and your shop. As a manufacturer and wholesaler here, we see new designs as they
              arrive and can tell you what each set is made of. One business answers for the order.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              What to check when buying wholesale
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              Ask for the composition and measurements of each piece. Confirm whether the set is
              unstitched or semi-stitched, and which pieces are included. Check the sample in
              ordinary daylight for feel, drape and colour, and keep the design code with your
              approval. Before paying, get the full order in writing. Our{" "}
              <a href="/blog/buying-dress-material-wholesale" className={linkClass}>
                guide to buying dress material wholesale
              </a>{" "}
              covers each step.
            </p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              How to order on WhatsApp
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">
              Ordering is a WhatsApp conversation. Message us at{" "}
              <a
                href={whatsAppUrl(CATALOGUE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {BUSINESS.phoneDisplay}
              </a>{" "}
              and name three things: whether you want dress material, polyester sarees, or both;
              whether the order is festive, daily wear, or a mix; and the city you sell in. If you
              know the colours that move on your counter, name them. If you have a photograph of a
              set you want matched, send it and say which part matters: the print, the dupatta work,
              or the way the cloth falls.
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              We reply with the current catalogue on WhatsApp, and we typically respond within 12
              hours. Approve a sample before a larger order if you want to check the hand and the
              colour, and keep the design code with that approval. You are also welcome to visit us
              at {ADDRESS_LINES.en.join(", ")} and look through the sets in person.
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              We also supply{" "}
              <a href="/polyester-sarees-wholesale-surat" className={linkClass}>
                polyester sarees wholesale
              </a>{" "}
              from Surat.
            </p>
            <p className="mt-5 leading-[1.85] text-mute">
              For dupattas, lehenga layers, sleeves and overlays, boutiques can ask us for{" "}
              <a href="/organza-net-fabric-for-boutiques" className={linkClass}>
                organza and net fabric
              </a>
              , sourced to order through our Surat network. For Karva Chauth and Diwali, see{" "}
              <a href="/diwali-karva-chauth-wholesale-surat" className={linkClass}>
                Diwali wholesale sarees and Karva Chauth unstitched suits
              </a>
              . Resellers can see{" "}
              <a href="/saree-wholesale-for-resellers" className={linkClass}>
                saree wholesale for resellers
              </a>
              .
            </p>

            <section id="faq" className="mt-12 scroll-mt-8 border-t border-line pt-8">
              <h2 className="font-display text-2xl font-light sm:text-3xl">FAQs</h2>
              {/* Each question is an <h3> with its answer directly after it,
                  matching the polyester page (valid heading-and-paragraph
                  pairs rather than a <dl>). */}
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
