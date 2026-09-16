import { createFileRoute, notFound } from "@tanstack/react-router";
import { JOURNAL, type JournalArticle } from "@/content/journal";
import { JournalArticlePage } from "@/components/journal-pages";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";

const SITE = "https://www.vidhifabrics.com";

/**
 * BlogPosting structured data for the Hindi article URL. Only properties the
 * content source actually carries are emitted.
 */
function blogPosting(article: JournalArticle) {
  const url = `${SITE}/hi/blog/${article.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title.hi,
    description: article.excerpt.hi,
    inLanguage: "hi",
    mainEntityOfPage: url,
    url,
    image: new URL(article.image, SITE).href,
    author: { "@type": "Organization", name: "Vidhi Fabrics" },
    publisher: { "@type": "Organization", name: "Vidhi Fabrics" },
    ...(article.published ? { datePublished: article.published } : {}),
    ...(article.faq
      ? {
          mainEntity: article.faq.map((entry) => ({
            "@type": "Question",
            name: entry.question.hi,
            acceptedAnswer: { "@type": "Answer", text: entry.answer.hi },
          })),
        }
      : {}),
  };
}

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
            { title: `${article.metaTitle?.hi ?? article.title.hi} | विधि फैब्रिक्स` },
            {
              name: "description",
              content: article.metaDescription?.hi ?? article.excerpt.hi,
            },
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
          scripts: [
            {
              type: "application/ld+json",
              children: JSON.stringify(blogPosting(article)),
            },
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
        <h1 className="font-display text-4xl font-semibold">लेख नहीं मिला</h1>
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
