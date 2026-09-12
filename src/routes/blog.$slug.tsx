import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { whatsAppUrl } from "@/lib/whatsapp";
import { LangSwitch, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getArticle, JOURNAL_COPY, SORTED_ARTICLES } from "@/content/journal";
import { type Lang } from "@/content/translations";

const SITE = "https://www.vidhifabrics.com";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;
    if (!article) return {};
    const url = `${SITE}/blog/${article.slug}`;
    return {
      meta: [
        { title: `${article.title} | Vidhi Fabrics` },
        { name: "description", content: article.description },
        { property: "og:title", content: `${article.title} | Vidhi Fabrics` },
        { property: "og:description", content: article.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: article.date },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const [lang, setLang] = useState<Lang>("en");

  const related = SORTED_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-paper font-body text-ink antialiased selection:bg-clay/20">
      <SiteHeader lang={lang}>
        <LangSwitch lang={lang} setLang={setLang} />
      </SiteHeader>

      <article className="border-b border-line">
        <div className="mx-auto max-w-3xl px-6 py-14 lg:py-20">
          <Link
            to="/blog"
            className="font-mono text-xs uppercase tracking-[0.12em] text-clay underline-offset-4 transition-colors hover:text-claydeep hover:underline"
          >
            ← {JOURNAL_COPY.backToIndex[lang]}
          </Link>

          <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight lg:text-5xl">
            {article.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
            <time dateTime={article.date}>{article.date}</time>
            <span>
              {article.readMinutes} {JOURNAL_COPY.readSuffix[lang]}
            </span>
            {JOURNAL_COPY.englishOnly[lang] ? (
              <span className="rounded-sm bg-ink/5 px-1.5 py-0.5 text-ink/60">
                {JOURNAL_COPY.englishOnly[lang]}
              </span>
            ) : null}
          </div>

          <img
            src={article.image}
            alt={article.imageAlt}
            width={1280}
            height={720}
            className="mt-10 aspect-[16/9] w-full rounded-md object-cover ring-1 ring-black/5"
          />

          <div className="mt-10 space-y-5">
            {article.body.map((block) =>
              block.startsWith("## ") ? (
                <h2 key={block} className="pt-4 font-display text-2xl font-semibold tracking-tight">
                  {block.slice(3)}
                </h2>
              ) : (
                <p key={block.slice(0, 40)} className="text-pretty text-mute">
                  {block}
                </p>
              ),
            )}
          </div>

          <div className="mt-14 rounded-md bg-sand/50 p-8 ring-1 ring-black/5">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              {JOURNAL_COPY.ctaHeading[lang]}
            </h2>
            <p className="mt-2 max-w-[48ch] text-sm text-mute">{JOURNAL_COPY.ctaBody[lang]}</p>
            <a
              href={whatsAppUrl(article.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-sm bg-clay px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-claydeep"
            >
              {JOURNAL_COPY.ctaButton[lang]}
            </a>
          </div>

          {related.length > 0 ? (
            <div className="mt-16 border-t border-line pt-10">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.15em] text-clay">
                {JOURNAL_COPY.relatedTitle[lang]}
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {related.map((a) => (
                  <Link key={a.slug} to="/blog/$slug" params={{ slug: a.slug }} className="group">
                    <h3 className="font-display text-lg font-semibold group-hover:text-claydeep">
                      {a.title}
                    </h3>
                    <p className="mt-1 text-sm text-mute">{a.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </article>

      <SiteFooter lang={lang} />
    </div>
  );
}
