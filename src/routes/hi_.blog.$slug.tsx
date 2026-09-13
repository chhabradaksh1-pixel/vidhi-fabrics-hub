import { createFileRoute, notFound } from "@tanstack/react-router";
import { JOURNAL } from "@/content/journal";
import { JournalArticlePage } from "@/components/journal-pages";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";

const SITE = "https://www.vidhifabrics.com";

export const Route = createFileRoute("/hi_/blog/$slug")({
  loader: ({ params }) => {
    const article = JOURNAL.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData: article }) =>
    article
      ? {
          meta: [
            { title: `${article.title.hi} | विधि फैब्रिक्स` },
            { name: "description", content: article.excerpt.hi },
            { property: "og:title", content: article.title.hi },
            { property: "og:description", content: article.excerpt.hi },
            { property: "og:type", content: "article" },
            { property: "og:url", content: `${SITE}/hi/blog/${article.slug}` },
            { property: "og:locale", content: "hi_IN" },
            { property: "og:locale:alternate", content: "en_IN" },
            {
              property: "og:image",
              content: new URL(article.image, SITE).href,
            },
          ],
          links: [
            { rel: "canonical", href: `${SITE}/hi/blog/${article.slug}` },
            { rel: "alternate", hrefLang: "en", href: `${SITE}/blog/${article.slug}` },
            { rel: "alternate", hrefLang: "hi", href: `${SITE}/hi/blog/${article.slug}` },
            { rel: "alternate", hrefLang: "x-default", href: `${SITE}/blog/${article.slug}` },
          ],
        }
      : {
          meta: [
            { title: "लेख नहीं मिला | विधि फैब्रिक्स" },
            { name: "robots", content: "noindex" },
          ],
        },
  notFoundComponent: () => (
    <div className="min-h-screen bg-paper">
      <JournalHeader lang="hi" />
      <main className="mx-auto max-w-3xl px-6 py-24" lang="hi">
        <h1 className="font-display text-4xl">लेख नहीं मिला</h1>
        <a href="/hi/blog" className="mt-8 inline-block text-clay underline">
          सूरत फैब्रिक डेस्क पर लौटिए
        </a>
      </main>
      <JournalFooter lang="hi" />
    </div>
  ),
  component: HindiArticleRoute,
});

function HindiArticleRoute() {
  return <JournalArticlePage article={Route.useLoaderData()} initialLang="hi" />;
}
