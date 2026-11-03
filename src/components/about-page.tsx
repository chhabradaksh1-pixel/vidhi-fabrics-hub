import { useState } from "react";

import loomPoster from "@/assets/weaving-loom-poster.webp";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { LazyLoopVideo } from "@/components/lazy-loop-video";
import { TradeStory } from "@/components/trade-story";
import { useReveal } from "@/hooks/use-reveal";
import { ABOUT_COPY } from "@/content/about-copy";
import { SECTION_COPY } from "@/content/section-copy";
import { ADDRESS_LINES, BUSINESS, DISAMBIGUATION, GSTIN_LABEL } from "@/content/business";
import { MapEmbed } from "@/components/map-embed";
import { FOOTER_CONTACT } from "@/content/footer-copy";
import { hasHindiVersion } from "@/content/landing-pages";
import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";
import { RAIL_GRID } from "@/lib/layout-classes";

const linkClass = "link";

/** Keeps a Hindi reader on Hindi pages, as the footer and journal links do. */
function localise(href: string, lang: Lang) {
  if (lang !== "hi") return href;
  if (href === "/blog" || href.startsWith("/blog/") || hasHindiVersion(href)) return `/hi${href}`;
  return href;
}

/* A labelled row: a hairline, the heading on the left, the content on the
   right. Below lg the two stack. */
const row = "grid gap-y-5 border-t border-line py-8 sm:py-10 lg:grid-cols-12 lg:gap-x-12";
/* A chapter of the story (styles.css, .vf-chapter): a hairline that draws
   across as the chapter scrolls in, a large light number and the heading on
   the left, the text open on the page to the right as one column that runs
   to the right edge (RAIL_GRID, shared with the blog articles). The numbers
   are CSS counters, so they add no text to the page. The note row below
   shares the same two columns. */
const chapter = `vf-chapter ${RAIL_GRID}`;
const chapterNumber = <span aria-hidden="true" className="vf-chapter-num" />;
/* The left-column headings are set a touch heavier than type-h4 (styles.css,
   .vf-heading-strong) so they hold their own beside the text. */
const chapterHeading = "vf-heading-strong mt-3 type-h4 text-ink";

/* A contact detail: label and value side by side on a hairline. */
const detail = "grid gap-1 border-b border-line py-4 sm:grid-cols-[9rem_1fr] sm:gap-6";

export function AboutPage({ initialLang }: { initialLang: Lang }) {
  // English and Hindi are separate URLs; Hinglish is a reading preference on
  // top of them, the same arrangement as the journal routes.
  const [lang, setLang] = useState<Lang>(initialLang);
  const copy = ABOUT_COPY[lang];
  const home = lang === "hi" ? "/hi" : "/";
  useReveal();

  // Left-aligned on the home page's grid, after the Armonia reference: the
  // title, the loom as a wide banner, the lede as a statement, the story as
  // numbered chapters, then the note and contact as labelled rows. Layout only; the
  // text keeps its order.
  return (
    <div className="min-h-screen bg-linen text-ink">
      <JournalHeader lang={lang} setLang={setLang} paths={{ en: "/about", hi: "/hi/about" }} />
      <main>
        <article
          className="vf-longform mx-auto w-full max-w-[1440px] px-5 pt-8 sm:px-8 sm:pt-11 lg:px-[50px] lg:pt-14"
          lang={lang === "hi" ? "hi" : "en"}
        >
          <nav aria-label="Breadcrumb" className="type-small text-mute">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href={home} className="hover:text-plum">
                  {copy.breadcrumbHome}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">{copy.breadcrumbAbout}</li>
            </ol>
          </nav>

          <p className="eyebrow mt-10 type-label text-clay">{copy.kicker}</p>
          <h1 className="mt-5 max-w-[18ch] type-display">{copy.title}</h1>

          {/* The loom, as a wide banner under the title. Decorative; it plays
              only near the viewport (LazyLoopVideo).
              TODO(owner): real photographs of the shop at Golden Point, the
              team and Dinesh Chhabra can replace it later, shipped as sized
              derivatives with alt text describing what is shown. */}
          <div
            aria-hidden="true"
            className="mt-10 overflow-hidden rounded-[var(--radius-card)] bg-sand sm:mt-12"
          >
            <LazyLoopVideo
              src="/weaving-loom.mp4?v=a787f8f"
              poster={loomPoster}
              className="aspect-[4/3] w-full object-cover sm:aspect-[21/9]"
            />
          </div>

          <p className="py-8 type-h3 text-ink sm:py-10 lg:py-12">{copy.lede}</p>

          {/* The story as numbered chapters: who we are, who leads it, what we
              supply, sixty years in the trade. */}
          <div className="vf-chapters">
            {copy.sections.map((section) => (
              <section key={section.heading} data-reveal className={chapter}>
                <div>
                  {chapterNumber}
                  <h2 className={chapterHeading}>{section.heading}</h2>
                </div>
                <div>
                  <div>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="mb-5 type-body text-mute last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.links && (
                    <ul className="mt-7 flex flex-col items-start gap-4">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <a href={localise(link.href, lang)} className="link-arrow">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            <section data-reveal className={chapter}>
              <div>
                {chapterNumber}
                <h2 className={chapterHeading}>{SECTION_COPY[lang].title}</h2>
              </div>
              <div>
                <p className="type-h2 text-ink">{SECTION_COPY[lang].titleEnd}</p>
                <div className="mt-6">
                  <p className="mb-5 type-body text-mute">{SECTION_COPY[lang].body}</p>
                  <p className="type-body text-mute">{SECTION_COPY[lang].bodyEnd}</p>
                </div>
              </div>
            </section>
          </div>

          <section className={`border-t border-line ${RAIL_GRID}`}>
            <h2 className="vf-heading-strong type-h4 text-ink">{copy.disambiguationHeading}</h2>
            <div>
              <p className="type-body text-ink">{DISAMBIGUATION[lang]}</p>
              <p className="mt-4 type-body text-mute">{copy.disambiguationNote}</p>
            </div>
          </section>

          <section className={`${row} items-start`}>
            <div className="lg:col-span-5">
              <h2 className="vf-heading-strong type-h4 text-ink">{copy.contactHeading}</h2>
              <dl className="mt-6 border-t border-line type-body">
                <div className={detail}>
                  <dt className="type-label text-clay">{copy.addressLabel}</dt>
                  <dd className="text-mute">
                    <address className="not-italic">
                      {ADDRESS_LINES[lang].map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </dd>
                </div>
                <div className={detail}>
                  <dt className="type-label text-clay">{copy.whatsAppLabel}</dt>
                  <dd>
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
                <div className={detail}>
                  <dt className="type-label text-clay">{copy.emailLabel}</dt>
                  <dd>
                    <a href={`mailto:${BUSINESS.email}`} className={linkClass}>
                      {BUSINESS.email}
                    </a>
                  </dd>
                </div>
                <div className={detail}>
                  <dt className="type-label text-clay">{copy.hoursLabel}</dt>
                  <dd className="text-mute">{FOOTER_CONTACT[lang].hours}</dd>
                </div>
                <div className={detail}>
                  <dt className="type-label text-clay">{GSTIN_LABEL}</dt>
                  <dd>{BUSINESS.gstin}</dd>
                </div>
              </dl>
            </div>
            <MapEmbed
              lang={lang}
              className="lg:col-span-7 [&>div:first-child]:rounded-[var(--radius-card)] [&_iframe]:h-72 sm:[&_iframe]:h-96 lg:[&_iframe]:h-[460px]"
            />
          </section>
        </article>
        <TradeStory lang={lang} />
      </main>
      <JournalFooter lang={lang} />
    </div>
  );
}
