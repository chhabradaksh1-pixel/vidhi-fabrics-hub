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
    <div className="min-h-screen bg-paper text-ink">
      <JournalHeader lang="en" />
      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <p className="font-mono text-xs uppercase tracking-label text-clay">{PRIVACY.kicker}</p>
        <h1 className="mt-4 font-display text-4xl font-light tracking-normal sm:text-5xl">
          {PRIVACY.title}
        </h1>
        <p className="mt-4 text-sm text-mute">{PRIVACY.updated}</p>
        <div className="mt-8 space-y-8 text-base leading-relaxed">
          <p>{PRIVACY.intro}</p>
          <section>
            <h2 className="font-display text-2xl font-light">{PRIVACY.collectHeading}</h2>
            <p className="mt-3">{PRIVACY.collectBody}</p>
            <p className="mt-3">{PRIVACY.analyticsBody}</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-light">{PRIVACY.whyHeading}</h2>
            <p className="mt-3">{PRIVACY.whyBody}</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-light">{PRIVACY.shareHeading}</h2>
            <p className="mt-3">{PRIVACY.shareBody}</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-light">{PRIVACY.rightsHeading}</h2>
            <p className="mt-3">
              {PRIVACY.rightsBefore}{" "}
              <a
                href={PRIVACY.whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-clay underline decoration-clay/30 underline-offset-4"
              >
                {PRIVACY.phone}
              </a>
              . {PRIVACY.rightsAfter}
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-light">{PRIVACY.lawHeading}</h2>
            <p className="mt-3">{PRIVACY.lawBody}</p>
          </section>
        </div>
      </main>
      <JournalFooter lang="en" />
    </div>
  );
}
