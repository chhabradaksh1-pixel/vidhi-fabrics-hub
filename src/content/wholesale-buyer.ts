import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

/**
 * Homepage section for the search "Surat fabric wholesaler".
 * Hindi and Hinglish have not been reviewed by a native speaker.
 * No hyphen or dash in these lines.
 */

export const WHOLESALE_BUYER = {
  heading: {
    en: "Fabric wholesaler in Surat for 60 years",
    hi: "60 साल से सूरत में फैब्रिक होलसेलर",
    "hi-en": "60 saal se Surat mein fabric wholesaler",
  },
  line1: {
    en: "Vidhi Fabrics is a fabric wholesaler in Surat. We make polyester sarees and dress material for wholesalers, retailers, resellers, boutiques and home businesses across India.",
    hi: "विधि फैब्रिक्स सूरत का फैब्रिक होलसेलर है। हम पॉलिएस्टर साड़ियाँ और ड्रेस मटेरियल भारत भर के थोक विक्रेताओं, रिटेलरों, रीसेलरों, बुटीक और घर से कारोबार करने वालों के लिए बनाते हैं।",
    "hi-en":
      "Vidhi Fabrics Surat ka fabric wholesaler hai. Hum polyester sarees aur dress material India bhar ke wholesalers, retailers, resellers, boutiques aur home businesses ke liye banate hain.",
  },
  line2: {
    en: "Importers in the UAE, Bangladesh and Sri Lanka can ask us on WhatsApp.",
    hi: "यूएई, बांग्लादेश और श्रीलंका के आयातक व्हाट्सएप पर पूछ सकते हैं।",
    "hi-en": "UAE, Bangladesh aur Sri Lanka ke importers WhatsApp par pooch sakte hain.",
  },
  cta: {
    en: "Enquire on WhatsApp",
    hi: "व्हाट्सएप पर पूछें",
    "hi-en": "WhatsApp par poochiye",
  },
  message: {
    en: "Hi Vidhi Fabrics, I would like to enquire about wholesale fabric from Surat.",
    hi: "नमस्ते विधि फैब्रिक्स, मैं सूरत से होलसेल फैब्रिक के बारे में पूछना चाहता हूँ।",
    "hi-en": "Hi Vidhi Fabrics, main Surat se wholesale fabric ke baare mein poochna chahta hoon.",
  },
} as const;

export const WHOLESALE_LINKS: {
  href: string;
  label: Record<Lang, string>;
}[] = [
  {
    href: "/polyester-sarees-wholesale-surat",
    label: {
      en: "Polyester sarees wholesale",
      hi: "पॉलिएस्टर साड़ी होलसेल",
      "hi-en": "Polyester sarees wholesale",
    },
  },
  {
    href: "/dress-material-wholesale-surat",
    label: {
      en: "Dress material wholesale",
      hi: "ड्रेस मटेरियल होलसेल",
      "hi-en": "Dress material wholesale",
    },
  },
  {
    href: "/unstitched-suits-wholesale-surat",
    label: {
      en: "Unstitched suits wholesale",
      hi: "अनस्टिच्ड सूट होलसेल",
      "hi-en": "Unstitched suits wholesale",
    },
  },
];

export function wholesaleBuyerLink(lang: Lang) {
  return whatsAppUrl(WHOLESALE_BUYER.message[lang]);
}
