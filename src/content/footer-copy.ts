import type { Lang } from "@/content/translations";

/**
 * Footer content.
 *
 * Every href points at a destination that exists today. Two items from the
 * original brief stay absent: "Collections" (which the catalogue already
 * covers) and terms. The privacy policy is English only, at /privacy-policy,
 * and is not rewritten to a Hindi path.
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
  en: "Manufacturer and wholesaler. Access to Surat’s entire textile market.",
  hi: "निर्माता और थोक विक्रेता। सूरत के पूरे कपड़ा बाज़ार तक पहुँच।",
  "hi-en": "Manufacturer aur wholesaler. Surat ke poore textile market tak access.",
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
        href: "/about",
      },
      {
        label: { en: "Privacy policy", hi: "गोपनीयता नीति", "hi-en": "Privacy policy" },
        href: "/privacy-policy",
      },
      {
        label: {
          en: "Join the Reseller Circle",
          hi: "रीसेलर सर्कल से जुड़िए",
          "hi-en": "Reseller Circle join kijiye",
        },
        href: "/reseller-circle",
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
        // English and Hindi versions exist; the footer sends Hindi readers to
        // /hi/... (see site-footer.tsx). There is no separate Hinglish URL, so
        // the Hinglish label stays close to the English term.
        label: {
          en: "Polyester sarees wholesale",
          hi: "पॉलिएस्टर साड़ियाँ (थोक)",
          "hi-en": "Polyester sarees wholesale",
        },
        href: "/polyester-sarees-wholesale-surat",
      },
      {
        label: {
          en: "Dress material wholesale",
          hi: "ड्रेस मटेरियल (थोक)",
          "hi-en": "Dress material wholesale",
        },
        href: "/dress-material-wholesale-surat",
      },
      {
        label: {
          en: "Sarees for resellers",
          hi: "रीसेलर के लिए साड़ियाँ",
          "hi-en": "Sarees for resellers",
        },
        href: "/saree-wholesale-for-resellers",
      },
      {
        label: {
          en: "Organza & net for boutiques",
          hi: "बुटीक के लिए ऑर्गेंज़ा व नेट",
          "hi-en": "Organza & net for boutiques",
        },
        href: "/organza-net-fabric-for-boutiques",
      },
      {
        label: {
          en: "Diwali & Karva Chauth wholesale",
          hi: "दिवाली और करवा चौथ होलसेल",
          "hi-en": "Diwali & Karva Chauth wholesale",
        },
        href: "/diwali-karva-chauth-wholesale-surat",
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

export const FOOTER_CONTACT: Record<Lang, { heading: string; hours: string }> = {
  en: {
    heading: "Get in touch",
    hours: "Mon–Sat · 11:00 AM–9:00 PM IST",
  },
  hi: {
    heading: "संपर्क कीजिए",
    hours: "सोम–शनि · सुबह 11:00–रात 9:00",
  },
  "hi-en": {
    heading: "Contact kijiye",
    hours: "Mon–Sat · 11:00 AM–9:00 PM IST",
  },
};

export const FOOTER_RIGHTS: Record<Lang, string> = {
  en: "© 2026 Vidhi Fabrics. All rights reserved.",
  hi: "© 2026 विधि फैब्रिक्स। सर्वाधिकार सुरक्षित।",
  "hi-en": "© 2026 Vidhi Fabrics. All rights reserved.",
};

export const LINKEDIN_URL = "https://www.linkedin.com/company/vidhi-fabricss/";
