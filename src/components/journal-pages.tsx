import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";

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

/** How many other guides the "Keep reading" list shows. */
const RELATED_COUNT = 3;

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
      <a
        key={`${part.href}-${i}`}
        href={part.href}
        className="text-clay underline underline-offset-4"
      >
        {part.label}
      </a>
    ),
  );
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
  const { lang, setLang } = useJournalLang(initialLang);
  const copy = SECTION_COPY[lang];
  const paths = blogPaths();

  return (
    <div className="min-h-screen bg-paper text-ink">
      <JournalHeader lang={lang} setLang={setLang} paths={paths} />
      <main className="mx-auto max-w-6xl px-6 py-16 lg:py-24" lang={lang === "hi" ? "hi" : "en"}>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-clay">{copy.journal}</p>
        <h1 className="mt-5 font-display text-5xl font-light tracking-tight sm:text-6xl">
          {copy.journalTitle}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">{copy.journalLede}</p>
        {/*
          Grouped by the category each article already carries, in the order
          the categories first appear in JOURNAL. The group heading takes h2,
          so the cards drop to h3 — the same outline as the home page rail.
        */}
        {journalGroups(lang).map((group) => (
          <section key={group.key} className="mt-14" aria-labelledby={`desk-${group.key}`}>
            <h2
              id={`desk-${group.key}`}
              className="border-b border-line pb-4 font-mono text-xs uppercase tracking-[0.18em] text-clay"
            >
              {group.label}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
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
  const { lang, setLang } = useJournalLang(initialLang);
  const copy = SECTION_COPY[lang];
  const desk = lang === "hi" ? "/hi/blog" : "/blog";
  const paths = article.href
    ? { en: article.href, hi: `/hi${article.href}` }
    : blogPaths(article.slug);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <JournalHeader lang={lang} setLang={setLang} paths={paths} />
      <main>
        <article
          className="mx-auto max-w-4xl px-6 py-12 sm:py-16"
          lang={lang === "hi" ? "hi" : "en"}
        >
          <a href={desk} className="inline-flex items-center gap-2 text-sm text-clay">
            <ArrowLeft size={16} aria-hidden="true" />
            {copy.journalTitle}
          </a>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.15em] text-clay">
            {article.category[lang]} · {readingMinutes(article, lang)} {copy.minutes}
          </p>
          <h1 className="mt-5 text-balance font-display text-4xl font-light leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            {article.title[lang]}
          </h1>
          <p className="mt-6 text-sm text-mute">
            {copy.bylineBy}{" "}
            <a
              href={lang === "hi" ? "/hi/about" : "/about"}
              rel="author"
              className="underline decoration-line underline-offset-4 hover:text-clay"
            >
              {copy.bylineName}
            </a>
            {article.published && (
              <>
                {" · "}
                {copy.published}{" "}
                <time dateTime={article.published}>{formatIsoDate(article.published, lang)}</time>
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
          <div data-reveal data-reveal-block className="mt-10">
            <div data-reveal-panel>
              <img
                src={article.image}
                alt={article.imageAlt[lang]}
                width={1024}
                height={768}
                fetchPriority="high"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </div>
          <div className="mx-auto max-w-[65ch]">
            {article.directAnswer && (
              <p
                data-reveal
                className="mt-10 border-l-2 border-clay bg-sand px-5 py-4 text-base leading-relaxed text-ink"
              >
                {article.directAnswer[lang]}
              </p>
            )}
            <p className="mt-10 text-lg leading-relaxed text-mute">{article.introduction[lang]}</p>
            <nav aria-label={copy.toc} className="my-10 border-y border-line py-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-clay">
                {copy.toc}
              </p>
              <ol className="list-inside list-decimal space-y-3 text-sm">
                {article.sections.map((section, i) => (
                  <li key={section.heading.en}>
                    <a
                      href={`#step-${i + 1}`}
                      className="underline decoration-line underline-offset-4 hover:text-clay"
                    >
                      {section.heading[lang]}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            {article.sections.map((section, i) => (
              <section key={section.heading.en} id={`step-${i + 1}`} className="mt-10 scroll-mt-8">
                <h2 className="font-display text-2xl font-light sm:text-3xl">
                  {section.heading[lang]}
                </h2>
                {section.paragraphs[lang].map((paragraph) => (
                  <p key={paragraph} className="mt-5 leading-[1.85] text-mute">
                    {article.inlineLinks
                      ? withInlineLinks(paragraph, article.inlineLinks, lang)
                      : paragraph}
                  </p>
                ))}
                {section.checklist && (
                  <ul className="mt-6 list-disc space-y-3 border-l-2 border-clay bg-sand py-5 pl-9 pr-5 text-sm leading-relaxed">
                    {section.checklist[lang].map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            {article.closing && (
              <section className="mt-12 border-t border-line pt-8">
                <h2 className="font-display text-2xl font-light sm:text-3xl">
                  {article.closing.heading[lang]}
                </h2>
                <p className="mt-5 leading-[1.85] text-mute">{article.closing.intro[lang]}</p>
                <ul className="mt-6 list-disc space-y-3 border-l-2 border-clay bg-sand py-5 pl-9 pr-5 text-sm leading-relaxed">
                  {article.closing.checklist[lang].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
            {article.faq && (
              <section className="mt-12 border-t border-line pt-8">
                <h2 className="font-display text-2xl font-light sm:text-3xl">{copy.faq}</h2>
                <dl>
                  {article.faq.map((entry) => (
                    <div key={entry.question.en} className="mt-7">
                      <dt className="font-display text-lg font-light leading-snug">
                        {entry.question[lang]}
                      </dt>
                      <dd className="mt-3 leading-[1.85] text-mute">{entry.answer[lang]}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
            <aside className="my-12 bg-ink p-7 text-paper sm:p-10">
              <p className="font-mono text-xs uppercase tracking-widest">
                {article.cta?.kicker[lang] ?? copy.ctaKicker}
              </p>
              <h2 className="mt-4 font-display text-3xl font-light">
                {article.cta?.heading[lang] ?? copy.ctaHeading}
              </h2>
              <p className="mt-4 leading-relaxed text-paper/80">
                {article.cta?.body[lang] ?? copy.ctaBody}
              </p>
              <a
                href={articleWhatsAppUrl(article, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-3 bg-paper px-5 py-3 text-sm font-medium text-ink"
              >
                {article.cta?.label[lang] ?? copy.talk}
                <ArrowUpRight className="shrink-0" size={18} aria-hidden="true" />
              </a>
              {article.cta?.secondary && (
                <a
                  href={localiseHref(article.cta.secondary.href, lang)}
                  className="mt-4 inline-block text-sm text-paper underline underline-offset-4"
                >
                  {article.cta.secondary.label[lang]}
                </a>
              )}
            </aside>
            <div className="border-t border-line pt-8">
              <h2 className="font-display text-2xl font-light">{copy.related}</h2>
              <ul className="mt-5 space-y-4">
                {relatedArticles(article, RELATED_COUNT).map((item) => (
                  <li key={item.slug}>
                    <a
                      href={articleHref(item, lang)}
                      className="text-clay underline underline-offset-4"
                    >
                      {item.title[lang]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </main>
      <JournalFooter lang={lang} />
    </div>
  );
}
