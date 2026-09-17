import type { Lang } from "@/content/translations";

/**
 * Markets shown on the reach map.
 *
 * This is a SELECTION, not the full list — the site separately claims 10+
 * export markets, and the section copy says "a selection" so the two do not
 * contradict each other. Edit this array to correct or extend it; the map,
 * the arcs and the written list all read from here.
 *
 * `confirmed` records that the business has verified it ships to a market.
 * Every entry below is confirmed. Anything added later should go in as
 * false until it has been checked, since these render as public claims.
 */
export type Market = {
  id: string;
  lat: number;
  lon: number;
  /** The origin point rather than a destination. */
  origin?: boolean;
  confirmed: boolean;
  name: Record<Lang, string>;
};

export const MARKETS: Market[] = [
  {
    id: "surat",
    lat: 21.17,
    lon: 72.83,
    origin: true,
    confirmed: true,
    name: { en: "Surat, India", hi: "सूरत, भारत", "hi-en": "Surat, India" },
  },
  {
    id: "uae",
    lat: 25.2,
    lon: 55.27,
    confirmed: true,
    name: { en: "United Arab Emirates", hi: "संयुक्त अरब अमीरात", "hi-en": "UAE" },
  },
  {
    id: "saudi",
    lat: 24.71,
    lon: 46.68,
    confirmed: true,
    name: { en: "Saudi Arabia", hi: "सऊदी अरब", "hi-en": "Saudi Arabia" },
  },
  {
    id: "kenya",
    lat: -1.29,
    lon: 36.82,
    confirmed: true,
    name: { en: "Kenya", hi: "केन्या", "hi-en": "Kenya" },
  },
  {
    id: "nigeria",
    lat: 6.52,
    lon: 3.38,
    confirmed: true,
    name: { en: "Nigeria", hi: "नाइजीरिया", "hi-en": "Nigeria" },
  },
  {
    id: "bangladesh",
    lat: 23.81,
    lon: 90.41,
    confirmed: true,
    name: { en: "Bangladesh", hi: "बांग्लादेश", "hi-en": "Bangladesh" },
  },
  {
    id: "srilanka",
    lat: 6.93,
    lon: 79.86,
    confirmed: true,
    name: { en: "Sri Lanka", hi: "श्रीलंका", "hi-en": "Sri Lanka" },
  },
  {
    id: "nepal",
    lat: 27.72,
    lon: 85.32,
    confirmed: true,
    name: { en: "Nepal", hi: "नेपाल", "hi-en": "Nepal" },
  },
  {
    id: "malaysia",
    lat: 3.14,
    lon: 101.69,
    confirmed: true,
    name: { en: "Malaysia", hi: "मलेशिया", "hi-en": "Malaysia" },
  },
];

export const REACH_COPY: Record<
  Lang,
  { marker: string; heading: string; body: string; originLabel: string; listLabel: string }
> = {
  en: {
    marker: "Reach / Surat to the world",
    heading: "Where the cloth goes.",
    body: "Everything ships from one place. A selection of the markets we supply, alongside buyers across India.",
    originLabel: "Origin",
    listLabel: "Markets shown",
  },
  hi: {
    marker: "पहुँच / सूरत से दुनिया तक",
    heading: "कपड़ा कहाँ जाता है।",
    body: "सब कुछ एक ही जगह से भेजा जाता है। नीचे उन बाज़ारों में से कुछ हैं जिन्हें हम सप्लाई करते हैं; इनके अलावा पूरे भारत में भी हमारे खरीदार हैं।",
    originLabel: "शुरुआत",
    listLabel: "दिखाए गए बाज़ार",
  },
  "hi-en": {
    marker: "Reach / Surat se duniya tak",
    heading: "Kapda kahan jaata hai.",
    body: "Sab kuch ek hi jagah se bheja jaata hai. Yahan un markets mein se kuch hain jinhe hum supply karte hain, saath hi poore India ke buyers.",
    originLabel: "Origin",
    listLabel: "Dikhaye gaye markets",
  },
};
