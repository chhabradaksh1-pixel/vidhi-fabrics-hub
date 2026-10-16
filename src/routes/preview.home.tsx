import { createFileRoute } from "@tanstack/react-router";

import { PreviewHome } from "@/components/preview-showroom";
import cormorant from "@/assets/fonts/cormorant-garamond-latin-500.woff2?url";
import devanagari from "@/assets/fonts/noto-sans-devanagari-wght.woff2?url";

const TITLE = "Surat's trusted manufacturer of sarees and dress material, Vidhi Fabrics";
const DESCRIPTION =
  "Surat's trusted manufacturer of sarees and dress material, for 60 years. Enquire on WhatsApp.";

export const Route = createFileRoute("/preview/home")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: "https://www.vidhifabrics.com/preview/home" },
      {
        rel: "preload",
        href: cormorant,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: devanagari,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  }),
  component: PreviewHome,
});
