import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { JOURNAL, articleWhatsAppUrl, readingMinutes } from "@/content/journal";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = JOURNAL.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData: article }) =>
    article
      ? {
          meta: [
            { title: `${article.title} | Vidhi Fabrics` },
            { name: "description", content: article.excerpt },
            { property: "og:title", content: article.title },
            { property: "og:description", content: article.excerpt },
            { property: "og:type", content: "article" },
            { property: "og:url", content: `https://www.vidhifabrics.com/blog/${article.slug}` },
            {
              property: "og:image",
              content: new URL(article.image, "https://www.vidhifabrics.com").href,
            },
          ],
          links: [{ rel: "canonical", href: `https://www.vidhifabrics.com/blog/${article.slug}` }],
        }
      : {
          meta: [
            { title: "Article not found | Vidhi Fabrics" },
            { name: "robots", content: "noindex" },
          ],
        },
  notFoundComponent: () => (
    <div className="min-h-screen bg-paper">
      <JournalHeader />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="font-display text-4xl">Article not found</h1>
        <a href="/blog" className="mt-8 inline-block text-clay underline">
          Return to Surat Fabric Desk
        </a>
      </main>
      <JournalFooter />
    </div>
  ),
  component: JournalArticlePage,
});

function JournalArticlePage() {
  const article = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-paper text-ink">
      <JournalHeader />
      <main>
        <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
          <a href="/blog" className="inline-flex items-center gap-2 text-sm text-clay">
            <ArrowLeft size={16} aria-hidden="true" />
            Surat Fabric Desk
          </a>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.15em] text-clay">
            {article.category} · {readingMinutes(article)} min read
          </p>
          <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 text-sm text-mute">By Vidhi Fabrics · Buyer guides</p>
          <img
            src={article.image}
            alt={article.imageAlt}
            width={1024}
            height={768}
            fetchPriority="high"
            className="mt-10 aspect-[16/9] w-full object-cover"
          />
          <div className="mx-auto max-w-[65ch]">
            <p className="mt-10 text-lg leading-relaxed text-mute">{article.introduction}</p>
            <nav aria-label="In this article" className="my-10 border-y border-line py-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-clay">
                In this guide
              </p>
              <ol className="list-inside list-decimal space-y-3 text-sm">
                {article.sections.map((section, i) => (
                  <li key={section.heading}>
                    <a
                      href={`#step-${i + 1}`}
                      className="underline decoration-line underline-offset-4 hover:text-clay"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            {article.sections.map((section, i) => (
              <section key={section.heading} id={`step-${i + 1}`} className="mt-10 scroll-mt-8">
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-5 leading-[1.85] text-mute">
                    {paragraph}
                  </p>
                ))}
                {section.checklist && (
                  <ul className="mt-6 list-disc space-y-3 border-l-2 border-clay bg-sand py-5 pl-9 pr-5 text-sm leading-relaxed">
                    {section.checklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <aside className="my-12 bg-ink p-7 text-paper sm:p-10">
              <p className="font-mono text-xs uppercase tracking-widest">Your next order</p>
              <h2 className="mt-4 font-display text-3xl font-semibold">
                Let’s talk about what you need.
              </h2>
              <p className="mt-4 leading-relaxed text-paper/80">
                Share the product you’re looking for, your quantity and delivery city with our team.
              </p>
              <a
                href={articleWhatsAppUrl(article)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-3 bg-paper px-5 py-3 text-sm font-medium text-ink"
              >
                Discuss your requirements on WhatsApp
                <ArrowUpRight className="shrink-0" size={18} aria-hidden="true" />
              </a>
            </aside>
            <div className="border-t border-line pt-8">
              <h2 className="font-display text-2xl">Keep reading</h2>
              <ul className="mt-5 space-y-4">
                {JOURNAL.filter((item) => item.slug !== article.slug).map((item) => (
                  <li key={item.slug}>
                    <a
                      href={`/blog/${item.slug}`}
                      className="text-clay underline underline-offset-4"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </main>
      <JournalFooter />
    </div>
  );
}
