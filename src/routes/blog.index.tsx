import { createFileRoute } from "@tanstack/react-router";
import { JournalIndexPage } from "@/components/journal-pages";

const EN = "https://www.vidhifabrics.com/blog";
const HI = "https://www.vidhifabrics.com/hi/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Surat Fabric Desk | Wholesale Buying Guides | Vidhi Fabrics" },
      {
        name: "description",
        content:
          "Practical guides to dress material, sarees, samples and wholesale sourcing from the Vidhi Fabrics desk in Surat.",
      },
      { property: "og:title", content: "Surat Fabric Desk | Vidhi Fabrics" },
      {
        property: "og:description",
        content: "Practical guides to fabrics, sourcing and buying wholesale.",
      },
      { property: "og:url", content: EN },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:locale:alternate", content: "hi_IN" },
    ],
    links: [
      { rel: "canonical", href: EN },
      { rel: "alternate", hrefLang: "en", href: EN },
      { rel: "alternate", hrefLang: "hi", href: HI },
      { rel: "alternate", hrefLang: "x-default", href: EN },
    ],
  }),
  component: EnglishJournalRoute,
});

function EnglishJournalRoute() {
  return <JournalIndexPage initialLang="en" />;
}
