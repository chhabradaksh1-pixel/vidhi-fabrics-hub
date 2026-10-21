import { BUSINESS } from "@/content/business";
import { whatsAppUrl } from "@/content/whatsapp";

/** English only. The footer links here from every language. */
export const PRIVACY_PATH = "/privacy-policy";

export const PRIVACY_URL = `https://www.vidhifabrics.com${PRIVACY_PATH}`;

const WHATSAPP_MESSAGE =
  "Hi Vidhi Fabrics, I would like to ask about the personal data you hold for me.";

export const PRIVACY = {
  metaTitle: "Privacy policy | Vidhi Fabrics",
  metaDescription:
    "How Vidhi Fabrics collects, uses and shares personal data from the website form, WhatsApp and basic analytics.",
  kicker: "Vidhi Fabrics",
  title: "Privacy policy",
  updated: "Last updated 21 Oct 2026.",
  intro: `Vidhi Fabrics, 542 to 543 Golden Point, Ring Road, Begumpura, ${BUSINESS.locality} ${BUSINESS.postalCode}. This notice explains what we collect when you use this website, why we keep it, and how to ask us about it.`,
  collectHeading: "What we collect",
  collectBody:
    "If you contact us through the form on this site or on WhatsApp, we collect your name, phone number, city, business type, and the message you send.",
  analyticsBody:
    "We also use Google Analytics. That collects basic information about how people use the site, such as pages visited and the device or browser.",
  whyHeading: "Why we collect it",
  whyBody:
    "We use these details to reply to you, to share catalogues, and to serve orders.",
  shareHeading: "Selling and sharing",
  shareBody:
    "We never sell your personal data. We share it only with service providers who help us run the website, host messages, or understand basic site use. We do not pass it on for anyone else's marketing.",
  rightsHeading: "Access and deletion",
  rightsBefore: "To ask for a copy of your data, or to ask us to delete it, message us on WhatsApp at",
  rightsAfter: "We will reply on the same number.",
  phone: BUSINESS.phoneDisplay,
  whatsAppHref: whatsAppUrl(WHATSAPP_MESSAGE),
  lawHeading: "The law",
  lawBody:
    "This notice is written for buyers and visitors in India and follows the Digital Personal Data Protection Act 2023.",
} as const;
