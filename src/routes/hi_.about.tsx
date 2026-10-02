import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/about-page";
import { ABOUT_COPY } from "@/content/about-copy";
import { aboutSchemas, aboutUrl } from "@/lib/about-schema";

const COPY = ABOUT_COPY.hi;

export const Route = createFileRoute("/hi_/about")({
  head: () => ({
    meta: [
      { title: COPY.metaTitle },
      { name: "description", content: COPY.metaDescription },
      { property: "og:title", content: COPY.metaTitle },
      { property: "og:description", content: COPY.metaDescription },
      { property: "og:url", content: aboutUrl("hi") },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "hi_IN" },
      { property: "og:locale:alternate", content: "en_IN" },
    ],
    links: [
      { rel: "canonical", href: aboutUrl("hi") },
      { rel: "alternate", hrefLang: "en", href: aboutUrl("en") },
      { rel: "alternate", hrefLang: "hi", href: aboutUrl("hi") },
      { rel: "alternate", hrefLang: "x-default", href: aboutUrl("en") },
    ],
    scripts: aboutSchemas("hi").map((schema) => ({
      type: "application/ld+json",
      children: JSON.stringify(schema),
    })),
  }),
  component: HindiAboutRoute,
});

function HindiAboutRoute() {
  return <AboutPage initialLang="hi" />;
}
