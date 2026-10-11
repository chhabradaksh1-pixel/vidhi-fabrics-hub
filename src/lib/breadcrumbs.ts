import { articleHref, type Localized } from "@/content/journal";
import { SECTION_COPY } from "@/content/section-copy";

const SITE = "https://www.vidhifabrics.com";

/**
 * Only English and Hindi have their own crawlable URLs. Hinglish is a
 * client-side reading preference on top of those two routes, so it never
 * appears in a breadcrumb — see `blogPaths` in `content/blog-paths.ts`.
 */
export type CrawlLang = "en" | "hi";

/**
 * BreadcrumbList structured data for the journal.
 *
 * Articles sit two levels down — home, then the Fabric Desk, then the piece —
 * and the site renders that hierarchy visually while declaring none of it, so
 * a result shows a bare URL where it could show the trail. Breadcrumbs are one
 * of the few rich results still granted; unlike FAQ, which Google retired on
 * 7 May 2026, this one is worth emitting.
 *
 * Omit `article` for the index pages, which stop at the second level.
 *
 * The home URL carries its trailing slash so the breadcrumb points at the same
 * string the canonical does, rather than a second spelling of the same page.
 */
export function breadcrumbList(
  lang: CrawlLang,
  article?: { slug: string; title: Localized; href?: string },
) {
  const home = lang === "hi" ? `${SITE}/hi` : `${SITE}/`;
  const desk = lang === "hi" ? `${SITE}/hi/blog` : `${SITE}/blog`;

  const trail = [
    { name: lang === "hi" ? "विधि फैब्रिक्स" : "Vidhi Fabrics", item: home },
    { name: SECTION_COPY[lang].journalTitle, item: desk },
  ];

  if (article) {
    trail.push({
      name: article.title[lang],
      item: new URL(articleHref(article, lang), SITE).href,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}
