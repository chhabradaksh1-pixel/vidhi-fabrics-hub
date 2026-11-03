import { createFileRoute, notFound } from "@tanstack/react-router";
import { JOURNAL } from "@/content/journal";
import { JournalArticlePage } from "@/components/journal-pages";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { breadcrumbList } from "@/lib/breadcrumbs";
import { articleBlogPosting, articleFaqPage } from "@/lib/journal-schema";

const SITE = "https://www.vidhifabrics.com";
const PATH = "/how-to-buy-dress-material-unstitched-suits-wholesale-surat-online";

export const Route = createFileRoute(
  "/how-to-buy-dress-material-unstitched-suits-wholesale-surat-online",
)({
  loader: () => {
    const article = JOURNAL.find((item) => item.href === PATH);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData: article }) => {
    const faqPage = article ? articleFaqPage(article, "en") : null;
    const url = `${SITE}${PATH}`;
    const hi = `${SITE}/hi${PATH}`;
    return article
      ? {
          meta: [
            { title: `${article.metaTitle?.en ?? article.title.en} | Vidhi Fabrics` },
            {
              name: "description",
              content: article.metaDescription?.en ?? article.excerpt.en,
            },
            { property: "og:title", content: article.title.en },
            { property: "og:description", content: article.excerpt.en },
            { property: "og:type", content: "article" },
            { property: "og:url", content: url },
            { property: "og:locale", content: "en_IN" },
            { property: "og:locale:alternate", content: "hi_IN" },
            {
              property: "og:image",
              content: new URL(article.image, SITE).href,
            },
          ],
          links: [
            { rel: "canonical", href: url },
            { rel: "alternate", hrefLang: "en", href: url },
            { rel: "alternate", hrefLang: "hi", href: hi },
            { rel: "alternate", hrefLang: "x-default", href: url },
          ],
          scripts: [
            {
              type: "application/ld+json",
              children: JSON.stringify(articleBlogPosting(article, "en")),
            },
            ...(faqPage
              ? [{ type: "application/ld+json", children: JSON.stringify(faqPage) }]
              : []),
            {
              type: "application/ld+json",
              children: JSON.stringify(breadcrumbList("en", article)),
            },
          ],
        }
      : {
          meta: [
            { title: "Article not found | Vidhi Fabrics" },
            { name: "robots", content: "noindex" },
          ],
        };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-paper">
      <JournalHeader />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="font-display text-4xl font-light">Article not found</h1>
        <a href="/blog" className="mt-8 inline-block text-clay underline">
          Return to Surat Fabric Desk
        </a>
      </main>
      <JournalFooter />
    </div>
  ),
  component: EnglishGuideRoute,
});

function EnglishGuideRoute() {
  return <JournalArticlePage article={Route.useLoaderData()} initialLang="en" />;
}
