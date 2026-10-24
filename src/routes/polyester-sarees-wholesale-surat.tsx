import { createFileRoute } from "@tanstack/react-router";
import { WholesaleLanding } from "@/components/wholesale-landing";
import { POLYESTER_EN, wholesaleHead } from "@/content/wholesale-pages";

export const Route = createFileRoute("/polyester-sarees-wholesale-surat")({
  head: () => wholesaleHead(POLYESTER_EN),
  component: function PolyesterSareesPage() {
    return <WholesaleLanding copy={POLYESTER_EN} />;
  },
});
