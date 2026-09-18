import type { Lang } from "@/content/translations";

/**
 * Footer content.
 *
 * Every href points at a destination that exists today. Three items from the
 * original brief are deliberately absent because the site has no page for
 * them: "Collections" (which the catalogue already covers), a privacy policy
 * and terms. Linking those to a 404 would cost more than leaving them out.
 *
 * "Dress materials" and "Sarees" resolve to the buyer guides on those
 * subjects, not to product pages, since the catalogue is organised by fibre.
 */
export type FooterLink = {
  label: Record<Lang, string>;
  /** An in-site path, or a WhatsApp handoff when `whatsApp` is set. */
  href?: string;
  whatsApp?: Record<Lang, string>;
  external?: boolean;
};

export type FooterColumn = {
  heading: Record<Lang, string>;
  links: FooterLink[];
};

export const FOOTER_TAGLINE: Record<Lang, string> = {
  en: "One textile supplier. Access to Surat’s entire manufacturing ecosystem.",
  hi: "एक टेक्सटाइल सप्लायर। सूरत के पूरे मैन्युफैक्चरिंग नेटवर्क तक पहुँच।",
  "hi-en": "Ek textile supplier. Surat ke poore manufacturing ecosystem tak access.",
};

export const FOOTER_CTA: Record<Lang, string> = {
  en: "Share your requirement",
  hi: "अपनी ज़रूरत बताइए",
  "hi-en": "Apni requirement bhejiye",
};

export const FOOTER_CTA_MESSAGE: Record<Lang, string> = {
  en: "Hi Vidhi Fabrics, I would like to share a fabric requirement.",
  hi: "नमस्ते विधि फैब्रिक्स, मैं कपड़े की अपनी ज़रूरत बताना चाहता/चाहती हूँ।",
  "hi-en": "Hi Vidhi Fabrics, main fabric ki apni requirement batana chahta/chahti hoon.",
};

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: { en: "Company", hi: "कंपनी", "hi-en": "Company" },
    links: [
      {
        label: { en: "About us", hi: "हमारे बारे में", "hi-en": "About us" },
        href: "#about",
      },
      {
        label: { en: "Our network", hi: "हमारा नेटवर्क", "hi-en": "Hamara network" },
        href: "#reach",
      },
      {
        label: { en: "Contact", hi: "संपर्क", "hi-en": "Contact" },
        href: "#contact",
      },
    ],
  },
  {
    heading: { en: "Explore", hi: "देखिए", "hi-en": "Explore" },
    links: [
      {
        label: { en: "Fabrics", hi: "फैब्रिक", "hi-en": "Fabrics" },
        href: "#catalogue",
      },
      {
        label: { en: "Dress materials", hi: "ड्रेस मटेरियल", "hi-en": "Dress materials" },
        href: "/blog/buying-dress-material-wholesale",
      },
      {
        label: { en: "Sarees", hi: "साड़ियाँ", "hi-en": "Sarees" },
        href: "/blog/why-similar-sarees-have-different-prices",
      },
    ],
  },
  {
    heading: { en: "Resources", hi: "संसाधन", "hi-en": "Resources" },
    links: [
      {
        label: { en: "Surat Fabric Desk", hi: "सूरत फैब्रिक डेस्क", "hi-en": "Surat Fabric Desk" },
        href: "/blog",
      },
      {
        label: { en: "FAQs", hi: "आम सवाल", "hi-en": "FAQs" },
        href: "#faq",
      },
      {
        label: {
          en: "Request a catalogue",
          hi: "कैटलॉग मँगवाइए",
          "hi-en": "Catalogue mangwaiye",
        },
        whatsApp: {
          en: "Hi Vidhi Fabrics, please share your fabric catalogue.",
          hi: "नमस्ते विधि फैब्रिक्स, कृपया अपना फैब्रिक कैटलॉग भेजिए।",
          "hi-en": "Hi Vidhi Fabrics, kripya apna fabric catalogue bhejiye.",
        },
      },
    ],
  },
];

export const FOOTER_CONTACT: Record<Lang, { heading: string; place: string; hours: string }> = {
  en: {
    heading: "Get in touch",
    place: "Surat, Gujarat, India",
    hours: "Mon–Sat · 11:00 AM–9:00 PM IST",
  },
  hi: {
    heading: "संपर्क कीजिए",
    place: "सूरत, गुजरात, भारत",
    hours: "सोम–शनि · सुबह 11:00–रात 9:00",
  },
  "hi-en": {
    heading: "Contact kijiye",
    place: "Surat, Gujarat, India",
    hours: "Mon–Sat · 11:00 AM–9:00 PM IST",
  },
};

export const FOOTER_RIGHTS: Record<Lang, string> = {
  en: "© 2026 Vidhi Fabrics. All rights reserved.",
  hi: "© 2026 विधि फैब्रिक्स। सर्वाधिकार सुरक्षित।",
  "hi-en": "© 2026 Vidhi Fabrics. All rights reserved.",
};

export const LINKEDIN_URL = "https://www.linkedin.com/company/vidhi-fabricss/";
