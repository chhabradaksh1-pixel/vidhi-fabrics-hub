import { createFileRoute, notFound } from "@tanstack/react-router";
import { JOURNAL, type JournalArticle } from "@/content/journal";
import { JournalArticlePage } from "@/components/journal-pages";
import { JournalHeader, JournalFooter } from "@/components/fabric-desk";
import { breadcrumbList } from "@/lib/breadcrumbs";

const SITE = "https://www.vidhifabrics.com";

/**
 * BlogPosting structured data. Only properties the content source actually
 * carries are emitted, so datePublished appears for articles that record one.
 */
function blogPosting(article: JournalArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title.en,
    description: article.excerpt.en,
    inLanguage: "en",
    mainEntityOfPage: `${SITE}/blog/${article.slug}`,
    url: `${SITE}/blog/${article.slug}`,
    image: new URL(article.image, SITE).href,
    // Named per the CEO's confirmation (26 September 2026). `publisher`
    // stays the Organization; a Person `author` with `worksFor` is the
    // schema.org pattern search engines and answer engines use to resolve
    // who actually wrote a page, which a generic Organization author does
    // not give them.
    author: {
      "@type": "Person",
      name: "Dinesh Chhabra",
      jobTitle: "CEO",
      worksFor: { "@type": "Organization", name: "Vidhi Fabrics" },
    },
    publisher: {
      "@type": "Organization",
      name: "Vidhi Fabrics",
      logo: { "@type": "ImageObject", url: `${SITE}/icon-512.png` },
    },
    ...(article.published ? { datePublished: article.published } : {}),
    ...(article.faq
      ? {
          mainEntity: article.faq.map((entry) => ({
            "@type": "Question",
            name: entry.question.en,
            acceptedAnswer: { "@type": "Answer", text: entry.answer.en },
          })),
        }
      : {}),
  };
}

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
            { title: `${article.metaTitle?.en ?? article.title.en} | Vidhi Fabrics` },
            {
              name: "description",
              content: article.metaDescription?.en ?? article.excerpt.en,
            },
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
          scripts: [
            {
              type: "application/ld+json",
              children: JSON.stringify(blogPosting(article)),
            },
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
  component: EnglishArticleRoute,
});

function EnglishArticleRoute() {
  return <JournalArticlePage article={Route.useLoaderData()} initialLang="en" />;
}
