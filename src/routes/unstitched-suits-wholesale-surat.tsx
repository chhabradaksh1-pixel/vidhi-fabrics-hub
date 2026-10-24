import { createFileRoute } from "@tanstack/react-router";
import { WholesaleLanding } from "@/components/wholesale-landing";
import { UNSTITCHED_EN, wholesaleHead } from "@/content/wholesale-pages";

export const Route = createFileRoute("/unstitched-suits-wholesale-surat")({
  head: () => wholesaleHead(UNSTITCHED_EN),
  component: function UnstitchedSuitsPage() {
    return <WholesaleLanding copy={UNSTITCHED_EN} />;
  },
});
