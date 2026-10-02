import { JOURNAL, type JournalArticle } from "@/content/journal";
import { BUSINESS, BUSINESS_ID, authorSchema } from "@/content/business";
import { SECTION_COPY } from "@/content/section-copy";
import type { CrawlLang } from "@/lib/breadcrumbs";

const SITE = "https://www.vidhifabrics.com";

function deskUrl(lang: CrawlLang) {
  return lang === "hi" ? `${SITE}/hi/blog` : `${SITE}/blog`;
}

export function articleUrl(article: JournalArticle, lang: CrawlLang) {
  return `${deskUrl(lang)}/${article.slug}`;
}

/**
 * BlogPosting structured data for one language's article URL. Only properties
 * the content source actually carries are emitted: `datePublished` appears
 * for articles that record one, and `dateModified` falls back to it.
 *
 * The FAQ is deliberately not attached here. It used to sit on the
 * BlogPosting as `mainEntity: [Question]`, which says the article's primary
 * subject is a list of questions; it is now its own FAQPage block, see
 * `articleFaqPage`.
 */
export function articleBlogPosting(article: JournalArticle, lang: CrawlLang) {
  const url = articleUrl(article, lang);
  const modified = article.modified ?? article.published;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title[lang],
    description: article.excerpt[lang],
    inLanguage: lang,
    mainEntityOfPage: url,
    url,
    image: new URL(article.image, SITE).href,
    // Named per the CEO's confirmation (26 September 2026). A Person
    // `author` with a profile `url` and `worksFor` is the pattern search
    // and answer engines use to resolve who wrote a page; the shared `@id`
    // joins every article to the same person and to the About page.
    author: authorSchema(),
    // Same `@id` as the site-wide LocalBusiness block, so the publisher is
    // that business rather than a second, unlinked Organization. Name and
    // logo stay inline because Google reads them from the publisher itself.
    publisher: {
      "@type": "Organization",
      "@id": BUSINESS_ID,
      name: BUSINESS.name,
      logo: { "@type": "ImageObject", url: `${SITE}/icon-512.png` },
    },
    ...(article.published ? { datePublished: article.published } : {}),
    ...(modified ? { dateModified: modified } : {}),
  };
}

/**
 * The article's visible FAQ as a separate FAQPage block. Google retired FAQ
 * rich results for most sites, so this is not here for a SERP feature; it is
 * the correct shape for question-and-answer content that answer engines read.
 * Returns null for articles without an FAQ.
 */
export function articleFaqPage(article: JournalArticle, lang: CrawlLang) {
  if (!article.faq?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: articleUrl(article, lang),
    inLanguage: lang,
    mainEntity: article.faq.map((entry) => ({
      "@type": "Question",
      name: entry.question[lang],
      acceptedAnswer: { "@type": "Answer", text: entry.answer[lang] },
    })),
  };
}

/**
 * CollectionPage + ItemList for the Fabric Desk index. Google shows no rich
 * result for a blog listing; this is for crawlers and answer engines, which
 * otherwise have to infer from markup that the page is an index of guides.
 */
export function journalCollectionPage(lang: CrawlLang) {
  const url = deskUrl(lang);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: SECTION_COPY[lang].journalTitle,
    description: SECTION_COPY[lang].journalLede,
    inLanguage: lang,
    publisher: { "@id": BUSINESS_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: JOURNAL.length,
      itemListElement: JOURNAL.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: articleUrl(article, lang),
        name: article.title[lang],
      })),
    },
  };
}
