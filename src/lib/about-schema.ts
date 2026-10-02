import { ABOUT_COPY } from "@/content/about-copy";
import { BUSINESS_ID, authorSchema } from "@/content/business";
import type { CrawlLang } from "@/lib/breadcrumbs";

const SITE = "https://www.vidhifabrics.com";

export function aboutUrl(lang: CrawlLang) {
  return lang === "hi" ? `${SITE}/hi/about` : `${SITE}/about`;
}

/**
 * AboutPage whose subject is the site-wide LocalBusiness (joined by `@id`),
 * plus the Person every article's `author` points at. The Person's `@id` is
 * the same on both language versions; only the page wrapper differs.
 */
export function aboutSchemas(lang: CrawlLang) {
  const copy = ABOUT_COPY[lang];
  const url = aboutUrl(lang);
  return [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": url,
      url,
      name: copy.metaTitle,
      description: copy.metaDescription,
      inLanguage: lang,
      about: { "@id": BUSINESS_ID },
      mainEntity: { "@id": BUSINESS_ID },
    },
    { "@context": "https://schema.org", ...authorSchema() },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: copy.breadcrumbHome,
          item: lang === "hi" ? `${SITE}/hi` : `${SITE}/`,
        },
        { "@type": "ListItem", position: 2, name: copy.breadcrumbAbout, item: url },
      ],
    },
  ];
}
