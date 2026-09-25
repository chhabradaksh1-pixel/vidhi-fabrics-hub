import { createFileRoute } from "@tanstack/react-router";
import { JournalIndexPage } from "@/components/journal-pages";
import { breadcrumbList } from "@/lib/breadcrumbs";

const EN = "https://www.vidhifabrics.com/blog";
const HI = "https://www.vidhifabrics.com/hi/blog";

export const Route = createFileRoute("/hi_/blog/")({
  head: () => ({
    meta: [
      { title: "सूरत फैब्रिक डेस्क | थोक खरीद गाइड | विधि फैब्रिक्स" },
      {
        name: "description",
        content:
          "ड्रेस मटेरियल, साड़ी, सैंपल और थोक सोर्सिंग पर काम की गाइड — सूरत से, विधि फैब्रिक्स के फैब्रिक डेस्क द्वारा।",
      },
      { property: "og:title", content: "सूरत फैब्रिक डेस्क | विधि फैब्रिक्स" },
      {
        property: "og:description",
        content: "कपड़ों, सोर्सिंग और थोक खरीदारी के लिए काम की गाइड।",
      },
      { property: "og:url", content: HI },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "hi_IN" },
      { property: "og:locale:alternate", content: "en_IN" },
    ],
    links: [
      { rel: "canonical", href: HI },
      { rel: "alternate", hrefLang: "en", href: EN },
      { rel: "alternate", hrefLang: "hi", href: HI },
      { rel: "alternate", hrefLang: "x-default", href: EN },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbList("hi")),
      },
    ],
  }),
  component: HindiJournalRoute,
});

function HindiJournalRoute() {
  return <JournalIndexPage initialLang="hi" />;
}
