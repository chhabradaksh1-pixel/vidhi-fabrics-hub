import { createFileRoute } from "@tanstack/react-router";

import { JournalFooter, JournalHeader } from "@/components/fabric-desk";
import { BUSINESS_ID } from "@/content/business";
import { PRIVACY, PRIVACY_URL } from "@/content/privacy-policy";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: PRIVACY.metaTitle },
      { name: "description", content: PRIVACY.metaDescription },
      { property: "og:title", content: PRIVACY.metaTitle },
      { property: "og:description", content: PRIVACY.metaDescription },
      { property: "og:url", content: PRIVACY_URL },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
    ],
    links: [{ rel: "canonical", href: PRIVACY_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${PRIVACY_URL}#webpage`,
          url: PRIVACY_URL,
          name: PRIVACY.metaTitle,
          description: PRIVACY.metaDescription,
          inLanguage: "en-IN",
          dateModified: "2026-10-21",
          about: { "@id": BUSINESS_ID },
          publisher: { "@id": BUSINESS_ID },
        }),
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    // On the long-form rail (styles.css, .vf-flow): each heading in the rail
    // beside its paragraphs. Layout only; every word is in place.
    <div className="min-h-screen bg-linen text-ink">
      <JournalHeader lang="en" />
      <main className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 sm:pt-11 lg:px-[50px] lg:pb-24 lg:pt-14">
        <p className="eyebrow type-label text-clay">{PRIVACY.kicker}</p>
        <h1 className="mt-4 max-w-[28ch] type-h1">{PRIVACY.title}</h1>
        <p className="mt-4 type-small text-mute">{PRIVACY.updated}</p>
        <div className="vf-flow type-body">
          <p className="mt-8 type-lead text-mute">{PRIVACY.intro}</p>
          <section>
            <h2 className="vf-heading-strong type-h4 text-ink">{PRIVACY.collectHeading}</h2>
            <p className="mt-3">{PRIVACY.collectBody}</p>
            <p className="mt-3">{PRIVACY.analyticsBody}</p>
          </section>
          <section>
            <h2 className="vf-heading-strong type-h4 text-ink">{PRIVACY.whyHeading}</h2>
            <p className="mt-3">{PRIVACY.whyBody}</p>
          </section>
          <section>
            <h2 className="vf-heading-strong type-h4 text-ink">{PRIVACY.shareHeading}</h2>
            <p className="mt-3">{PRIVACY.shareBody}</p>
          </section>
          <section>
            <h2 className="vf-heading-strong type-h4 text-ink">{PRIVACY.rightsHeading}</h2>
            <p className="mt-3">
              {PRIVACY.rightsBefore}{" "}
              <a
                href={PRIVACY.whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {PRIVACY.phone}
              </a>
              . {PRIVACY.rightsAfter}
            </p>
          </section>
          <section>
            <h2 className="vf-heading-strong type-h4 text-ink">{PRIVACY.lawHeading}</h2>
            <p className="mt-3">{PRIVACY.lawBody}</p>
          </section>
        </div>
      </main>
      <JournalFooter lang="en" />
    </div>
  );
}
