import { createFileRoute } from "@tanstack/react-router";

import { PreviewHome } from "@/components/preview-showroom";
import cormorant from "@/assets/fonts/cormorant-garamond-latin-500.woff2?url";

const TITLE = "Wholesale unstitched suits and sarees, Vidhi Fabrics";
const DESCRIPTION =
  "A preview of wholesale unstitched suits and sarees from Surat. Enquire on WhatsApp.";

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
    ],
  }),
  component: PreviewHome,
});
