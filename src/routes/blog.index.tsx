import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { JOURNAL_COPY, SORTED_ARTICLES } from "@/content/journal";
import { COPY, type Lang } from "@/content/translations";
import { LangSwitch, SiteFooter, SiteHeader } from "@/components/site-chrome";

const BLOG_URL = "https://www.vidhifabrics.com/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Fabric Insights & Buyer Guides | Vidhi Fabrics, Surat" },
      {
        name: "description",
        content:
          "Practical buyer guides from a Surat fabric manufacturer and wholesaler — how to read a quotation, when linen blends make commercial sense, and how to book capacity before the festive rush.",
      },
      {
        property: "og:title",
        content: "Fabric Insights & Buyer Guides | Vidhi Fabrics, Surat",
      },
      {
        property: "og:description",
        content:
          "Practical reading for people who buy fabric for a living, from Vidhi Fabrics in Surat.",
      },
      { property: "og:url", content: BLOG_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: BLOG_URL }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [lang, setLang] = useState<Lang>("en");
  const englishBadge = JOURNAL_COPY.englishOnly[lang];

  return (
    <div className="min-h-screen bg-paper font-body text-ink antialiased selection:bg-clay/20">
      <SiteHeader lang={lang}>
        <LangSwitch lang={lang} setLang={setLang} />
      </SiteHeader>

      <section className="vf-rise border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
            {JOURNAL_COPY.marker[lang]}
          </p>
          <h1 className="mt-4 max-w-[20ch] text-balance font-display text-5xl font-semibold leading-[1.05] tracking-tight lg:text-6xl">
            {JOURNAL_COPY.heading[lang]}
          </h1>
          <p className="mt-6 max-w-[58ch] text-pretty text-lg text-mute">
            {JOURNAL_COPY.body[lang]}
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SORTED_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                to="/blog/$slug"
                params={{ slug: article.slug }}
                className="group overflow-hidden rounded-md bg-sand/40 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-x-3 font-mono text-[11px] text-mute">
                    <time dateTime={article.date}>{article.date}</time>
                    <span>
                      {article.readMinutes} {JOURNAL_COPY.readSuffix[lang]}
                    </span>
                    {englishBadge ? (
                      <span className="rounded-sm bg-ink/5 px-1.5 py-0.5 text-ink/60">
                        {englishBadge}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-2 font-display text-xl font-semibold group-hover:text-claydeep">
                    {article.title}
                  </h2>
                  <p className="mt-1 text-sm text-mute">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 border-t border-line pt-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              {JOURNAL_COPY.ctaHeading[lang]}
            </h2>
            <p className="mt-2 max-w-[52ch] text-sm text-mute">{JOURNAL_COPY.ctaBody[lang]}</p>
            <a
              href="/#desk"
              className="mt-6 inline-block rounded-sm bg-clay px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-claydeep"
            >
              {COPY.fabricDesk.cta[lang]}
            </a>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </div>
  );
}
