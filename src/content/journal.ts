/**
 * Buyer guides published at /blog.
 *
 * Article bodies are English-only by design. On the Hindi and Hinglish
 * previews the cards carry an explicit "English" badge (JOURNAL_COPY.englishOnly)
 * so a reader is told the language before they click through.
 *
 * Surrounding UI labels are translated in all three languages.
 */
import type { Lang } from "./translations";

import beadedOrganza from "@/assets/fabric-beaded-organza.jpg";
import cottonLinen from "@/assets/fabric-cotton-linen.jpg";
import katanJacquard from "@/assets/fabric-katan-jacquard.jpg";

export type Article = {
  slug: string;
  image: string;
  imageAlt: string;
  /** ISO date — drives <time dateTime> and the sitemap lastmod. */
  date: string;
  readMinutes: number;
  title: string;
  description: string;
  excerpt: string;
  /** A block beginning "## " renders as a subheading; everything else is a paragraph. */
  body: string[];
  /** Prefilled WhatsApp message for this specific article. */
  whatsappMessage: string;
};

export const JOURNAL_COPY = {
  marker: {
    en: "(e) / Insights",
    hi: "(इ) / इनसाइट्स",
    "hi-en": "(e) / Insights",
  },
  heading: {
    en: "Notes from the trade floor.",
    hi: "ट्रेड फ़्लोर से नोट्स।",
    "hi-en": "Trade floor se notes.",
  },
  body: {
    en: "Practical reading for people who buy fabric for a living — what Surat is actually quoting, what is moving, and what to check before you commit a season.",
    hi: "उनके लिए काम का पाठ जो पेशे से कपड़ा खरीदते हैं — सूरत असल में क्या कोट कर रहा है, क्या चल रहा है, और सीज़न तय करने से पहले क्या जाँचें।",
    "hi-en":
      "Un logon ke liye kaam ka reading jo peshe se fabric kharidte hain — Surat asal mein kya quote kar raha hai, kya move ho raha hai, aur season commit karne se pehle kya check karein.",
  },
  readAll: {
    en: "Read all insights",
    hi: "सभी इनसाइट्स पढ़ें",
    "hi-en": "Sab insights padhein",
  },
  backToIndex: {
    en: "All insights",
    hi: "सभी इनसाइट्स",
    "hi-en": "Sab insights",
  },
  readSuffix: { en: "min read", hi: "मिनट", "hi-en": "min read" },
  /** Badge shown on Hindi / Hinglish previews so the reader knows before clicking. */
  englishOnly: {
    en: "",
    hi: "लेख अंग्रेज़ी में",
    "hi-en": "Article English mein",
  },
  relatedTitle: {
    en: "Keep reading",
    hi: "आगे पढ़िए",
    "hi-en": "Aage padhiye",
  },
  ctaHeading: {
    en: "Have a requirement this raises?",
    hi: "क्या इससे कोई ज़रूरत बनती है?",
    "hi-en": "Isse koi requirement banti hai?",
  },
  ctaBody: {
    en: "Send it to the Surat Fabric Desk. We will price it, sample it, and tell you honestly if the timing is wrong.",
    hi: "इसे सूरत फैब्रिक डेस्क को भेजिए। हम कीमत लगाएँगे, सैंपल देंगे, और साफ़ बताएँगे कि समय ठीक है या नहीं।",
    "hi-en":
      "Ise Surat Fabric Desk ko bhejiye. Hum pricing karenge, sample denge, aur saaf batayenge ki timing sahi hai ya nahi.",
  },
  ctaButton: {
    en: "Ask about this on WhatsApp",
    hi: "व्हाट्सएप पर इस बारे में पूछें",
    "hi-en": "WhatsApp par iske baare mein poochein",
  },
} as const;

export const ARTICLES: Article[] = [
  {
    slug: "reading-a-surat-quotation",
    image: cottonLinen,
    imageAlt: "Close detail of a cotton linen blend fabric",
    date: "2026-08-18",
    readMinutes: 4,
    title: "How to read a Surat quotation",
    description:
      "Two quotes for the same cloth can differ by a wide margin and both be honest. A buyer's guide to what sits underneath the number on a Surat fabric quotation.",
    excerpt:
      "Two quotes for the same cloth can differ widely and both be honest. Here is what sits underneath the number.",
    whatsappMessage:
      "Hello Vidhi Fabrics. I read your guide on reading a Surat quotation and would like a quote for my requirement.",
    body: [
      "A fabric price is never one number. It is a stack — yarn, weaving, dyeing, finishing, wastage and payment terms — and two suppliers can quote the same cloth a long way apart while both are quoting accurately. The gap is almost always in what was assumed, not in what was charged.",
      "## Ask what GSM was assumed",
      "GSM is the fastest way a quote drifts. A twill quoted at 240 GSM and delivered at 225 GSM is a different cloth, and a materially cheaper one to make. Always get the GSM and the tolerance in writing. A tolerance of around five percent is ordinary; ten percent means the supplier is protecting themselves at your expense.",
      "## Separate the dyeing from the base",
      "Ask for the grey price and the processing price as two separate lines. It tells you immediately whether you are dealing with someone who controls the process or someone adding a margin on top of a process house's rate. It also means that when your shade changes, only one line has to move.",
      "## Check what the width is doing",
      "Width is where the real arithmetic hides. Cloth at 58 inches versus 44 inches changes your consumption per garment far more than a small difference in the meter rate. Convert every quote to a cost per garment before you compare anything.",
      "## Terms are part of the price",
      "Thirty days against delivery versus an advance against proforma is worth a real percentage on its own. A slightly higher rate on better terms is frequently the cheaper order once the money is priced in. Price the working capital, not just the cloth.",
      "## Get the wastage assumption stated",
      "Every mill builds in an allowance for shortages and seconds. If it is not stated, it is still there — you simply cannot see it. Asking for it in writing costs nothing and makes two quotes genuinely comparable for the first time.",
    ],
  },
  {
    slug: "linen-blends-and-price-stability",
    image: katanJacquard,
    imageAlt: "Close detail of a woven katan jacquard fabric",
    date: "2026-07-02",
    readMinutes: 3,
    title: "Why linen blends hold their price",
    description:
      "Pure linen swings with the flax crop while cotton-linen blends stay inside a planable band. A guide to choosing between them for a repeatable programme.",
    excerpt:
      "Pure linen swings with the flax crop. Blends do not — and that predictability is often worth more than the saving.",
    whatsappMessage:
      "Hello Vidhi Fabrics. I read your guide on linen blends and would like to discuss a cotton-linen requirement.",
    body: [
      "Buyers ask us every season whether to move from a cotton-linen blend to pure linen now that the handle on blends has improved so much. The honest answer is usually no, and the reason has less to do with the cloth than with the calendar.",
      "## Flax is an agricultural position",
      "Pure linen is tied to a flax crop with one harvest a year and very little buffer in the chain. A poor season moves yarn prices sharply, and there is no easy second source to balance against. If you are planning a repeat programme twelve months out, you are taking a weather position whether you intend to or not.",
      "## Blends buy you a floor",
      "A cotton-linen blend keeps most of the handle and the drape while anchoring the majority of the fibre cost to cotton, which is a far more liquid and far better hedged fibre. The rate still moves, but it moves inside a band you can plan against and quote a retail price on.",
      "## Where pure linen still wins",
      "For a small capsule, a premium price point, or anything where the fibre itself is part of the story on the label, pure linen earns its volatility. The customer is buying the fibre name, and the margin usually absorbs the swing.",
      "## The commercial rule of thumb",
      "If the line has to be repeatable, re-orderable and sold at a fixed retail, the blend is the sound call. If the line is a statement piece with room in the margin, pure linen is worth the risk. Decide which one you are building before you decide the cloth.",
    ],
  },
  {
    slug: "booking-capacity-before-festive",
    image: beadedOrganza,
    imageAlt: "Close detail of a beaded organza fabric",
    date: "2026-05-21",
    readMinutes: 3,
    title: "Book capacity before the festive rush",
    description:
      "In the festive build-up Surat's binding constraint stops being price and becomes machine time. How to plan a fabric programme against the calendar.",
    excerpt:
      "In the festive build-up, Surat's constraint stops being price and becomes machine time. Plan against the calendar.",
    whatsappMessage:
      "Hello Vidhi Fabrics. I read your guide on booking capacity before the festive season and would like to plan a programme.",
    body: [
      "For most of the year the binding constraint in Surat is price. For a stretch of weeks in the festive build-up it is not — the constraint becomes machine time, and paying more does not reliably fix it.",
      "## What actually gets tight",
      "Weaving is rarely the bottleneck. Processing is. Dye houses and finishing lines run to a queue, and in the festive build-up that queue has been booked by people who committed months earlier. A buyer arriving late with a four-week requirement is negotiating for a slot, not for a rate.",
      "## Work the calendar backwards",
      "Plan backwards from when goods must be on the shelf, not forwards from when you want to place the order. Shade approvals need to be closed well before bulk is released, and bulk needs to be released well before the queue fills. Everything after that point is buying somebody else's cancelled slot.",
      "## Narrow the shade card if you are late",
      "A programme with three approved shades can be slotted into gaps that a twelve-shade programme cannot. If you have left it late, asking for less variety on the same cloth will often get you a better delivery date than asking for a better price.",
      "## Put the dates in the order",
      "A delivery date that lives only in a conversation is not a delivery date. Get the shade approval date, the bulk release date and the dispatch window written into the order, so that everyone is planning against the same calendar.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Newest first. */
export const SORTED_ARTICLES: Article[] = [...ARTICLES].sort((a, b) =>
  b.date.localeCompare(a.date),
);
