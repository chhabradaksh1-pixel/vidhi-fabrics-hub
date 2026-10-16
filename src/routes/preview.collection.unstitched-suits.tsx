import { createFileRoute } from "@tanstack/react-router";

import { PreviewCollection } from "@/components/preview-showroom";
import cormorant from "@/assets/fonts/cormorant-garamond-latin-500.woff2?url";

const TITLE = "Unstitched suits, Vidhi Fabrics";
const DESCRIPTION =
  "Unstitched suit designs to enquire about on WhatsApp. Photographs are placeholders.";

export const Route = createFileRoute("/preview/collection/unstitched-suits")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.vidhifabrics.com/preview/collection/unstitched-suits",
      },
      {
        rel: "preload",
        href: cormorant,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
  }),
  component: PreviewCollection,
});
