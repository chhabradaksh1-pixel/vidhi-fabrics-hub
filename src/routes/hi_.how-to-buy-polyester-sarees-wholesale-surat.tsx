import { createFileRoute, notFound } from "@tanstack/react-router";
import { JOURNAL } from "@/content/journal";
import { JournalArticlePage } from "@/components/journal-pages";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { breadcrumbList } from "@/lib/breadcrumbs";
import { articleBlogPosting, articleFaqPage } from "@/lib/journal-schema";

const SITE = "https://www.vidhifabrics.com";
const PATH = "/how-to-buy-polyester-sarees-wholesale-surat";

export const Route = createFileRoute("/hi_/how-to-buy-polyester-sarees-wholesale-surat")({
  loader: () => {
    const article = JOURNAL.find((item) => item.href === PATH);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData: article }) => {
    const faqPage = article ? articleFaqPage(article, "hi") : null;
    const url = `${SITE}/hi${PATH}`;
    const en = `${SITE}${PATH}`;
    return article
      ? {
          meta: [
            { title: `${article.metaTitle?.hi ?? article.title.hi} | विधि फैब्रिक्स` },
            {
              name: "description",
              content: article.metaDescription?.hi ?? article.excerpt.hi,
            },
            { property: "og:title", content: article.title.hi },
            { property: "og:description", content: article.excerpt.hi },
            { property: "og:type", content: "article" },
            { property: "og:url", content: url },
            { property: "og:locale", content: "hi_IN" },
            { property: "og:locale:alternate", content: "en_IN" },
            {
              property: "og:image",
              content: new URL(article.image, SITE).href,
            },
          ],
          links: [
            { rel: "canonical", href: url },
            { rel: "alternate", hrefLang: "en", href: en },
            { rel: "alternate", hrefLang: "hi", href: url },
            { rel: "alternate", hrefLang: "x-default", href: en },
          ],
          scripts: [
            {
              type: "application/ld+json",
              children: JSON.stringify(articleBlogPosting(article, "hi")),
            },
            ...(faqPage
              ? [{ type: "application/ld+json", children: JSON.stringify(faqPage) }]
              : []),
            {
              type: "application/ld+json",
              children: JSON.stringify(breadcrumbList("hi", article)),
            },
          ],
        }
      : {
          meta: [
            { title: "लेख नहीं मिला | विधि फैब्रिक्स" },
            { name: "robots", content: "noindex" },
          ],
        };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-paper">
      <JournalHeader lang="hi" />
      <main className="mx-auto max-w-3xl px-6 py-24" lang="hi">
        <h1 className="font-display text-4xl font-light">लेख नहीं मिला</h1>
        <a href="/hi/blog" className="mt-8 inline-block text-clay underline">
          सूरत फैब्रिक डेस्क पर लौटिए
        </a>
      </main>
      <JournalFooter lang="hi" />
    </div>
  ),
  component: HindiGuideRoute,
});

function HindiGuideRoute() {
  return <JournalArticlePage article={Route.useLoaderData()} initialLang="hi" />;
}
