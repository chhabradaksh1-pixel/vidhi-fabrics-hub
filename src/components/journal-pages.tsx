import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { JournalCard, JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { SECTION_COPY } from "@/content/section-copy";
import {
  JOURNAL,
  articleWhatsAppUrl,
  readingMinutes,
  type JournalArticle,
} from "@/content/journal";
import type { Lang } from "@/content/translations";
import { blogPaths } from "@/content/blog-paths";

function useJournalLang(initial: Lang) {
  const [lang, setLang] = useState<Lang>(initial);
  // Switching to English or Hindi is a navigation; Hinglish is local state.
  return { lang, setLang };
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
        <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
          {copy.journalTitle}
          <span className="text-clay">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">{copy.journalLede}</p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {JOURNAL.map((article, index) => (
            <JournalCard
              key={article.slug}
              article={article}
              number={index + 1}
              lang={lang}
              readLabel={copy.read}
              href={`${lang === "hi" ? "/hi/blog" : "/blog"}/${article.slug}`}
            />
          ))}
        </div>
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
  const base = lang === "hi" ? "/hi/blog" : "/blog";

  return (
    <div className="min-h-screen bg-paper text-ink">
      <JournalHeader lang={lang} setLang={setLang} paths={blogPaths(article.slug)} />
      <main>
        <article
          className="mx-auto max-w-4xl px-6 py-12 sm:py-16"
          lang={lang === "hi" ? "hi" : "en"}
        >
          <a href={base} className="inline-flex items-center gap-2 text-sm text-clay">
            <ArrowLeft size={16} aria-hidden="true" />
            {copy.journalTitle}
          </a>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.15em] text-clay">
            {article.category[lang]} · {readingMinutes(article, lang)} {copy.minutes}
          </p>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            {article.title[lang]}
          </h1>
          <p className="mt-6 text-sm text-mute">{copy.byline}</p>
          <img
            src={article.image}
            alt={article.imageAlt[lang]}
            width={1024}
            height={768}
            fetchPriority="high"
            className="mt-10 aspect-[16/9] w-full object-cover"
          />
          <div className="mx-auto max-w-[65ch]">
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
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                  {section.heading[lang]}
                </h2>
                {section.paragraphs[lang].map((paragraph) => (
                  <p key={paragraph} className="mt-5 leading-[1.85] text-mute">
                    {paragraph}
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
            <aside className="my-12 bg-ink p-7 text-paper sm:p-10">
              <p className="font-mono text-xs uppercase tracking-widest">{copy.ctaKicker}</p>
              <h2 className="mt-4 font-display text-3xl font-semibold">{copy.ctaHeading}</h2>
              <p className="mt-4 leading-relaxed text-paper/80">{copy.ctaBody}</p>
              <a
                href={articleWhatsAppUrl(article, lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-3 bg-paper px-5 py-3 text-sm font-medium text-ink"
              >
                {copy.talk}
                <ArrowUpRight className="shrink-0" size={18} aria-hidden="true" />
              </a>
            </aside>
            <div className="border-t border-line pt-8">
              <h2 className="font-display text-2xl font-semibold">{copy.related}</h2>
              <ul className="mt-5 space-y-4">
                {JOURNAL.filter((item) => item.slug !== article.slug).map((item) => (
                  <li key={item.slug}>
                    <a
                      href={`${base}/${item.slug}`}
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
