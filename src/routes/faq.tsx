import { createFileRoute } from "@tanstack/react-router";
import { FaqPageView } from "@/components/faq-page";
import { FAQ_EN, faqHead } from "@/content/faq-page";

export const Route = createFileRoute("/faq")({
  head: () => faqHead(FAQ_EN),
  component: function FaqRoute() {
    return <FaqPageView copy={FAQ_EN} />;
  },
});
