import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

import { JournalCard, JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { SECTION_COPY } from "@/content/section-copy";
import {
  JOURNAL,
  articleHref,
  articleWhatsAppUrl,
  readingMinutes,
  relatedArticles,
  type JournalArticle,
  type JournalInlineLink,
} from "@/content/journal";
import type { Lang } from "@/content/translations";
import { blogPaths } from "@/content/blog-paths";
import { hasHindiVersion } from "@/content/landing-pages";
import { formatIsoDate } from "@/lib/dates";
import { useReveal } from "@/hooks/use-reveal";
import { RAIL_COLS, RAIL_CONTENT, RAIL_GRID } from "@/lib/layout-classes";

/** How many other guides the "Keep reading" list shows. */
const RELATED_COUNT = 3;

/* An article's rail headings, set like the About chapters: a touch heavier
   than type-h4 (styles.css, .vf-heading-strong). */
const railHeading = "vf-heading-strong mt-3 type-h4 text-ink";
/* A checklist: a white card, plum bullets. */
const checklist =
  "card mt-7 list-disc space-y-3 py-6 pl-11 pr-6 type-small text-ink marker:text-plum sm:py-8 sm:pr-8";

/**
 * Rewrites an in-site href for the Hindi URL tree, so a Hindi reader stays on
 * Hindi pages. Matches how the rest of the article derives its links.
 */
function localiseHref(href: string, lang: Lang) {
  if (lang !== "hi") return href;
  if (href.startsWith("/blog/") || hasHindiVersion(href)) return `/hi${href}`;
  if (href.startsWith("/#")) return `/hi${href.slice(1)}`;
  return href;
}

/**
 * Splits a paragraph on the first occurrence of each configured phrase and
 * renders that phrase as a link. A phrase that is absent from this language's
 * text leaves the paragraph untouched.
 */
function withInlineLinks(text: string, links: JournalInlineLink[], lang: Lang) {
  type Part = string | { href: string; label: string };
  const parts: Part[] = [text];
  for (const link of links) {
    const label = link.phrase[lang];
    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];
      if (typeof part !== "string") continue;
      const at = part.indexOf(label);
      if (at === -1) continue;
      parts.splice(
        i,
        1,
        part.slice(0, at),
        { href: localiseHref(link.href, lang), label },
        part.slice(at + label.length),
      );
      break;
    }
  }
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      <a key={`${part.href}-${i}`} href={part.href} className="link">
        {part.label}
      </a>
    ),
  );
}

/**
 * Which numbered section of an article is being read: the last `step-N`
 * section whose top has passed a line a third of the way down the window.
 * Drives the live contents list (aria-current, styled in styles.css .vf-toc).
 * Returns 0 before the first section. Attributes only; no text changes.
 */
function useActiveStep(count: number) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const sections = Array.from({ length: count }, (_, i) =>
      document.getElementById(`step-${i + 1}`),
    );
    const update = () => {
      const line = window.innerHeight / 3;
      let current = 0;
      sections.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top <= line) current = i + 1;
      });
      setActive(current);
    };
    let frame = 0;
    const onScroll = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);
  return active;
}

function useJournalLang(initial: Lang) {
  const [lang, setLang] = useState<Lang>(initial);
  // Switching to English or Hindi is a navigation; Hinglish is local state.
  return { lang, setLang };
}

/**
 * The index's article groups, keyed by the English category so the anchor ids
 * are stable across languages. Cards are numbered in display order, running
 * on from one group to the next.
 */
function journalGroups(lang: Lang) {
  const groups: {
    key: string;
    label: string;
    articles: { article: JournalArticle; number: number }[];
  }[] = [];
  JOURNAL.forEach((article) => {
    const key = article.category.en.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = { key, label: article.category[lang], articles: [] };
      groups.push(group);
    }
    group.articles.push({ article, number: 0 });
  });
  let number = 0;
  for (const group of groups) {
    for (const entry of group.articles) entry.number = ++number;
  }
  return groups;
}

export function JournalIndexPage({ initialLang }: { initialLang: Lang }) {
  useReveal();
  const { lang, setLang } = useJournalLang(initialLang);
  const copy = SECTION_COPY[lang];
  const paths = blogPaths();

  // On the linen ground and the home page's grid, its guides on the home
  // catalogue's range card (JournalCard).
  return (
    <div className="min-h-screen bg-linen text-ink">
      <JournalHeader lang={lang} setLang={setLang} paths={paths} />
      <main
        className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 sm:pt-11 lg:px-[50px] lg:pb-24 lg:pt-14"
        lang={lang === "hi" ? "hi" : "en"}
      >
        <p className="eyebrow type-label text-clay">{copy.journal}</p>
        <h1 className="mt-5 type-h1">{copy.journalTitle}</h1>
        <p className="mt-6 max-w-xl type-lead text-mute">{copy.journalLede}</p>
        {/*
          Grouped by the category each article already carries, in the order
          the categories first appear in JOURNAL. The group heading takes h2,
          so the cards drop to h3 — the same outline as the home page rail.
        */}
        {journalGroups(lang).map((group) => (
          <section key={group.key} className="mt-14" aria-labelledby={`desk-${group.key}`}>
            <h2 id={`desk-${group.key}`} className="border-b border-line pb-4 type-label text-clay">
              {group.label}
            </h2>
            <div data-reveal-stagger className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {group.articles.map(({ article, number }) => (
                <JournalCard
                  key={article.slug}
                  article={article}
                  number={number}
                  lang={lang}
                  readLabel={copy.read}
                  headingLevel={3}
                  href={articleHref(article, lang)}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
      <JournalFooter lang={lang} />
    </div>
  );
}

export function JournalArticlePage({
  article,
  initialLang,
}: {
  article: JournalArticle;
  initialLang: Lang;
}) {
  useReveal();
  const { lang, setLang } = useJournalLang(initialLang);
  const activeStep = useActiveStep(article.sections.length);
  const copy = SECTION_COPY[lang];
  const desk = lang === "hi" ? "/hi/blog" : "/blog";
  const paths = article.href
    ? { en: article.href, hi: `/hi${article.href}` }
    : blogPaths(article.slug);

  // Every block is a row on the shared rail (RAIL_GRID, as on /about): a
  // label, number or heading on the left, the content in one column running
  // to the right edge, so the whole article hangs on two vertical lines.
  // Layout only: the text, headings, ids and links are in the same order.
  return (
    <div className="min-h-screen bg-linen text-ink">
      <JournalHeader lang={lang} setLang={setLang} paths={paths} />
      <main>
        <article
          className="vf-longform mx-auto w-full max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 sm:pt-11 lg:px-[50px] lg:pb-24 lg:pt-14"
          lang={lang === "hi" ? "hi" : "en"}
        >
          <header className={`${RAIL_COLS} gap-y-6`}>
            <a
              href={desk}
              className="col-span-full inline-flex min-h-11 items-center gap-2 justify-self-start type-small text-plum hover:text-plumdeep"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {copy.journalTitle}
            </a>
            <p className="eyebrow type-label text-clay md:mt-3 md:self-start">
              {article.category[lang]} · {readingMinutes(article, lang)} {copy.minutes}
            </p>
            <div>
              <h1 className="max-w-[30ch] type-h1">{article.title[lang]}</h1>
              <p className="mt-6 type-small text-mute">
                {copy.bylineBy}{" "}
                <a href={lang === "hi" ? "/hi/about" : "/about"} rel="author" className="link">
                  {copy.bylineName}
                </a>
                {article.published && (
                  <>
                    {" · "}
                    {copy.published}{" "}
                    <time dateTime={article.published}>
                      {formatIsoDate(article.published, lang)}
                    </time>
                  </>
                )}
                {article.modified && article.modified !== article.published && (
                  <>
                    {" · "}
                    {copy.updated}{" "}
                    <time dateTime={article.modified}>{formatIsoDate(article.modified, lang)}</time>
                  </>
                )}
              </p>
            </div>
          </header>

          {/* The page's main image: no reveal, it is the first thing seen. */}
          <div className="card-media mt-10 bg-sand sm:mt-12">
            <img
              src={article.image}
              alt={article.imageAlt[lang]}
              width={1024}
              height={768}
              fetchPriority="high"
              className="aspect-[16/9] w-full object-cover lg:aspect-[21/9]"
            />
          </div>

          {article.directAnswer && (
            <p data-reveal className="pt-10 type-h3 text-ink sm:pt-12 lg:pt-14">
              {article.directAnswer[lang]}
            </p>
          )}
          <div className={RAIL_GRID}>
            <p className={`${RAIL_CONTENT} type-lead text-mute`}>{article.introduction[lang]}</p>
          </div>

          <nav aria-label={copy.toc} className={`border-t border-line ${RAIL_GRID}`}>
            <p className="type-label text-clay">{copy.toc}</p>
            <ol className="vf-toc gap-x-10 type-body lg:columns-2">
              {article.sections.map((section, i) => (
                <li key={section.heading.en} className="break-inside-avoid pb-3">
                  <a
                    href={`#step-${i + 1}`}
                    className="link"
                    aria-current={activeStep === i + 1 ? "location" : undefined}
                  >
                    {section.heading[lang]}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="vf-chapters">
            {article.sections.map((section, i) => (
              <section
                key={section.heading.en}
                id={`step-${i + 1}`}
                data-reveal
                className={`vf-chapter scroll-mt-28 ${RAIL_GRID}`}
              >
                <div>
                  <span aria-hidden="true" className="vf-chapter-num" />
                  <h2 className={railHeading}>{section.heading[lang]}</h2>
                </div>
                <div>
                  {section.paragraphs[lang].map((paragraph) => (
                    <p key={paragraph} className="mb-5 type-body text-mute last:mb-0">
                      {article.inlineLinks
                        ? withInlineLinks(paragraph, article.inlineLinks, lang)
                        : paragraph}
                    </p>
                  ))}
                  {section.checklist && (
                    <ul className={checklist}>
                      {section.checklist[lang].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          {article.closing && (
            <section className={`border-t border-line ${RAIL_GRID}`}>
              <h2 className={railHeading}>{article.closing.heading[lang]}</h2>
              <div>
                <p className="type-body text-mute">{article.closing.intro[lang]}</p>
                <ul className={checklist}>
                  {article.closing.checklist[lang].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {article.faq && (
            <section className={`border-t border-line ${RAIL_GRID}`}>
              <h2 className={railHeading}>{copy.faq}</h2>
              <dl>
                {article.faq.map((entry) => (
                  <div
                    key={entry.question.en}
                    className="border-t border-line py-6 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <dt className="type-h4">{entry.question[lang]}</dt>
                    <dd className="mt-3 type-body text-mute">{entry.answer[lang]}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <aside
            className={`${RAIL_COLS} mt-4 rounded-[var(--radius-card)] bg-plum p-8 text-plumlight sm:p-12`}
          >
            <div>
              <p className="type-label">{article.cta?.kicker[lang] ?? copy.ctaKicker}</p>
              <h2 className="mt-4 type-h3 text-plumlight">
                {article.cta?.heading[lang] ?? copy.ctaHeading}
              </h2>
            </div>
            <div>
              <p className="type-body">{article.cta?.body[lang] ?? copy.ctaBody}</p>
              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
                <a
                  href={articleWhatsAppUrl(article, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-magnet
                  className="btn btn-inverse"
                >
                  {article.cta?.label[lang] ?? copy.talk}
                  <ArrowUpRight className="shrink-0" size={18} aria-hidden="true" />
                </a>
                {article.cta?.secondary ? (
                  <a
                    href={localiseHref(article.cta.secondary.href, lang)}
                    className="inline-flex min-h-11 items-center type-small text-plumlight underline underline-offset-4"
                  >
                    {article.cta.secondary.label[lang]}
                  </a>
                ) : null}
              </div>
            </div>
          </aside>

          <div className={`mt-10 border-t border-line ${RAIL_GRID} lg:mt-14`}>
            <h2 className={railHeading}>{copy.related}</h2>
            <ul className="grid gap-x-10 gap-y-6 lg:grid-cols-3">
              {relatedArticles(article, RELATED_COUNT).map((item) => (
                <li key={item.slug}>
                  <a href={articleHref(item, lang)} className="link-arrow">
                    {item.title[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </main>
      <JournalFooter lang={lang} />
    </div>
  );
}
