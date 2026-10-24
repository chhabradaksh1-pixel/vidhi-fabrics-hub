// Hindi for this page was written for review and has not been checked by a
// native speaker. See BRAND.md.
import { createFileRoute } from "@tanstack/react-router";
import { FaqPageView } from "@/components/faq-page";
import { FAQ_HI, faqHead } from "@/content/faq-page";

export const Route = createFileRoute("/hi_/faq")({
  head: () => faqHead(FAQ_HI),
  component: function HiFaqRoute() {
    return <FaqPageView copy={FAQ_HI} />;
  },
});