import { useState } from "react";

import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { ABOUT_COPY } from "@/content/about-copy";
import { ADDRESS_LINES, BUSINESS, DISAMBIGUATION, GSTIN_LABEL } from "@/content/business";
import { MapEmbed } from "@/components/map-embed";
import { FOOTER_CONTACT } from "@/content/footer-copy";
import { hasHindiVersion } from "@/content/landing-pages";
import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

const linkClass = "text-clay underline decoration-line underline-offset-4 hover:text-claydeep";

/** Keeps a Hindi reader on Hindi pages, as the footer and journal links do. */
function localise(href: string, lang: Lang) {
  if (lang !== "hi") return href;
  if (href === "/blog" || href.startsWith("/blog/") || hasHindiVersion(href)) return `/hi${href}`;
  return href;
}

export function AboutPage({ initialLang }: { initialLang: Lang }) {
  // English and Hindi are separate URLs; Hinglish is a reading preference on
  // top of them, the same arrangement as the journal routes.
  const [lang, setLang] = useState<Lang>(initialLang);
  const copy = ABOUT_COPY[lang];
  const home = lang === "hi" ? "/hi" : "/";

  return (
    <div className="min-h-screen bg-paper text-ink">
      <JournalHeader lang={lang} setLang={setLang} paths={{ en: "/about", hi: "/hi/about" }} />
      <main>
        <article
          className="mx-auto max-w-4xl px-6 py-12 sm:py-16"
          lang={lang === "hi" ? "hi" : "en"}
        >
          <nav aria-label="Breadcrumb" className="text-xs text-mute">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href={home} className="hover:text-clay">
                  {copy.breadcrumbHome}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">{copy.breadcrumbAbout}</li>
            </ol>
          </nav>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.15em] text-clay">
            {copy.kicker}
          </p>
          <h1 className="mt-5 text-balance font-display text-4xl font-light leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>

          {/*
            TODO(owner): real photographs go here — the shop at Golden Point,
            the team, Dinesh Chhabra. Use the business's own photos only (no
            stock imagery on this page), shipped as sized derivatives per
            CLAUDE.md, with alt text describing what is actually shown.
          */}

          <div className="mx-auto max-w-[65ch]">
            <p className="mt-10 text-lg leading-relaxed text-mute">{copy.lede}</p>

            {copy.sections.map((section) => (
              <section key={section.heading} className="mt-12">
                <h2 className="font-display text-2xl font-light sm:text-3xl">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-5 leading-[1.85] text-mute">
                    {paragraph}
                  </p>
                ))}
                {section.links && (
                  <ul className="mt-5 space-y-2">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <a href={localise(link.href, lang)} className={linkClass}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="mt-12 border-l-2 border-clay bg-sand px-6 py-6">
              <h2 className="font-display text-2xl font-light sm:text-3xl">
                {copy.disambiguationHeading}
              </h2>
              <p className="mt-4 leading-[1.85] text-ink">{DISAMBIGUATION[lang]}</p>
              <p className="mt-4 leading-[1.85] text-mute">{copy.disambiguationNote}</p>
            </section>

            <section className="mt-12 border-t border-line pt-8">
              <h2 className="font-display text-2xl font-light sm:text-3xl">
                {copy.contactHeading}
              </h2>
              <dl className="mt-6 space-y-5 leading-relaxed">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-clay">
                    {copy.addressLabel}
                  </dt>
                  <dd className="mt-1 text-mute">
                    <address className="not-italic">
                      {ADDRESS_LINES[lang].map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-clay">
                    {copy.whatsAppLabel}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={whatsAppUrl(copy.whatsAppMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {BUSINESS.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-clay">
                    {copy.emailLabel}
                  </dt>
                  <dd className="mt-1">
                    <a href={`mailto:${BUSINESS.email}`} className={linkClass}>
                      {BUSINESS.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-clay">
                    {copy.hoursLabel}
                  </dt>
                  <dd className="mt-1 text-mute">{FOOTER_CONTACT[lang].hours}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-widest text-clay">
                    {GSTIN_LABEL}
                  </dt>
                  <dd className="mt-1">{BUSINESS.gstin}</dd>
                </div>
              </dl>
              <MapEmbed lang={lang} className="mt-8" />
            </section>
          </div>
        </article>
      </main>
      <JournalFooter lang={lang} />
    </div>
  );
}
