// Hindi for this page was written for review and has not been checked by a
// native speaker. See BRAND.md.
import { createFileRoute } from "@tanstack/react-router";
import { WholesaleLanding } from "@/components/wholesale-landing";
import { POLYESTER_HI, wholesaleHead } from "@/content/wholesale-pages";

export const Route = createFileRoute("/hi_/polyester-sarees-wholesale-surat")({
  head: () => wholesaleHead(POLYESTER_HI),
  component: function HiPolyesterSareesPage() {
    return <WholesaleLanding copy={POLYESTER_HI} />;
  },
});
