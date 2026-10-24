// Hindi for this page was written for review and has not been checked by a
// native speaker. See BRAND.md.
import { createFileRoute } from "@tanstack/react-router";
import { WholesaleLanding } from "@/components/wholesale-landing";
import { UNSTITCHED_HI, wholesaleHead } from "@/content/wholesale-pages";

export const Route = createFileRoute("/hi_/unstitched-suits-wholesale-surat")({
  head: () => wholesaleHead(UNSTITCHED_HI),
  component: function HiUnstitchedSuitsPage() {
    return <WholesaleLanding copy={UNSTITCHED_HI} />;
  },
});