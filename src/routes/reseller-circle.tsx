import { createFileRoute } from "@tanstack/react-router";

import { ResellerCirclePage } from "@/components/reseller-circle-page";
import { BUSINESS_ID } from "@/content/business";
import { CIRCLE_PAGE } from "@/content/reseller-circle-copy";

const SITE = "https://www.vidhifabrics.com";
const EN_PATH = "/reseller-circle";
const PATH = "/reseller-circle";
const copy = CIRCLE_PAGE.en;

function schema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE}${PATH}#webpage`,
      url: `${SITE}${PATH}`,
      name: copy.metaTitle,
      description: copy.metaDescription,
      inLanguage: "en-IN",
      about: { "@id": BUSINESS_ID },
      publisher: { "@id": BUSINESS_ID },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.breadcrumbHome, item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: `${SITE}${PATH}` },
      ],
    },
  ];
}

export const Route = createFileRoute("/reseller-circle")({
  head: () => ({
    meta: [
      { title: copy.metaTitle },
      { name: "description", content: copy.metaDescription },
      { property: "og:title", content: copy.metaTitle },
      { property: "og:description", content: copy.metaDescription },
      { property: "og:url", content: `${SITE}${PATH}` },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:locale:alternate", content: "hi_IN" },
    ],
    links: [
      { rel: "canonical", href: `${SITE}${PATH}` },
      { rel: "alternate", hrefLang: "en", href: `${SITE}${EN_PATH}` },
      { rel: "alternate", hrefLang: "hi", href: `${SITE}/hi${EN_PATH}` },
      { rel: "alternate", hrefLang: "x-default", href: `${SITE}${EN_PATH}` },
    ],
    scripts: schema().map((s) => ({
      type: "application/ld+json",
      children: JSON.stringify(s),
    })),
  }),
  component: () => <ResellerCirclePage lang="en" />,
});
