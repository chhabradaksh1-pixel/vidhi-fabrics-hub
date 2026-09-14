import { createFileRoute, notFound } from "@tanstack/react-router";
import { JOURNAL } from "@/content/journal";
import { JournalArticlePage } from "@/components/journal-pages";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";

const SITE = "https://www.vidhifabrics.com";

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
            { title: `${article.title.en} | Vidhi Fabrics` },
            { name: "description", content: article.excerpt.en },
            { property: "og:title", content: article.title.en },
            { property: "og:description", content: article.excerpt.en },
            { property: "og:type", content: "article" },
            { property: "og:url", content: `${SITE}/blog/${article.slug}` },
            { property: "og:locale", content: "en_IN" },
            { property: "og:locale:alternate", content: "hi_IN" },
            {
              property: "og:image",
              content: new URL(article.image, SITE).href,
            },
          ],
          links: [
            { rel: "canonical", href: `${SITE}/blog/${article.slug}` },
            { rel: "alternate", hrefLang: "en", href: `${SITE}/blog/${article.slug}` },
            { rel: "alternate", hrefLang: "hi", href: `${SITE}/hi/blog/${article.slug}` },
            { rel: "alternate", hrefLang: "x-default", href: `${SITE}/blog/${article.slug}` },
          ],
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
        <h1 className="font-display text-4xl font-semibold">Article not found</h1>
        <a href="/blog" className="mt-8 inline-block text-clay underline">
          Return to Surat Fabric Desk
        </a>
      </main>
      <JournalFooter />
    </div>
  ),
  component: EnglishArticleRoute,
});

function EnglishArticleRoute() {
  return <JournalArticlePage article={Route.useLoaderData()} initialLang="en" />;
}
