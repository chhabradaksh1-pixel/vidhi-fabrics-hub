import type { Lang } from "@/content/translations";

/**
 * The business's own contact details, as supplied by Vidhi Fabrics.
 *
 * One source for the footer and for the LocalBusiness structured data, so the
 * name, address and phone a crawler reads always match what the page shows.
 * Nothing here is inferred: no exact founding year was supplied, so none is
 * emitted.
 */
export const BUSINESS = {
  name: "Vidhi Fabrics",
  /* Golden Point stands on Ring Road; Begumpura is the locality around it,
     not the road. The earlier "Begumpura Road" conflated the two, and the
     Justdial listing has a third wording again. Postal lookups put
     Ring Road / Golden Point in 395002, served by Surat Textile Market —
     so the postcode here was already right and the street was not. */
  streetAddress: "542-543 Golden Point, Ring Road, Begumpura",
  locality: "Surat",
  region: "Gujarat",
  postalCode: "395002",
  country: "IN",
  /** E.164, the form tel: links and structured data want. */
  phone: "+919825208413",
  phoneDisplay: "+91 98252 08413",
  email: "sales@vidhifabrics.com",
  opens: "11:00",
  closes: "21:00",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
} as const;

/**
 * Stable identifier for the business entity in JSON-LD.
 *
 * Every block that refers to Vidhi Fabrics — the site-wide LocalBusiness and
 * each BlogPosting's publisher — uses this one `@id`, so a crawler joins them
 * into a single entity instead of reading a LocalBusiness and a separate,
 * unconnected Organization with the same name. That matters more than usual
 * here, because other businesses called Vidhi Fabrics exist. Never change it:
 * an `@id` is an identifier, and moving it splits the entity again.
 */
export const BUSINESS_ID = "https://www.vidhifabrics.com/#business";

/**
 * Where the business mainly supplies, as stated by the owner: North India,
 * chiefly Punjab, Haryana and Rajasthan, with buyers in Madhya Pradesh too.
 * Emitted as `areaServed`; the homepage and polyester page say the same in
 * words.
 */
export const AREA_SERVED = [
  { "@type": "State", name: "Punjab" },
  { "@type": "State", name: "Haryana" },
  { "@type": "State", name: "Rajasthan" },
  { "@type": "State", name: "Madhya Pradesh" },
  { "@type": "Country", name: "India" },
] as const;

/** The address as shown on the page, one line per row. */
export const ADDRESS_LINES: Record<Lang, string[]> = {
  en: [
    BUSINESS.streetAddress,
    `${BUSINESS.locality}, ${BUSINESS.region} ${BUSINESS.postalCode}, India`,
  ],
  hi: ["542-543 गोल्डन पॉइंट, रिंग रोड, बेगमपुरा", `सूरत, गुजरात ${BUSINESS.postalCode}, भारत`],
  "hi-en": [
    BUSINESS.streetAddress,
    `${BUSINESS.locality}, ${BUSINESS.region} ${BUSINESS.postalCode}, India`,
  ],
};

/**
 * LocalBusiness structured data. Only properties the business actually
 * supplied are emitted, so no postal code and no founding date.
 */
export function localBusinessSchema(site: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    alternateName: "विधि फैब्रिक्स",
    // Positioning confirmed by the owner on 1 October 2026.
    description:
      "Surat-based fabric manufacturer and wholesaler. Manufactures some lines in-house and also supplies from Surat's wider textile market, selling in bulk to wholesalers, retailers, resellers and boutiques, mainly across North India.",
    url: site,
    logo: `${site}/icon-512.png`,
    image: `${site}/og-image.jpg`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    areaServed: AREA_SERVED,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS.days,
        opens: BUSINESS.opens,
        closes: BUSINESS.closes,
      },
    ],
    /*
     * Profiles this business actually owns, so a crawler can join them and the
     * website into one entity rather than several weak ones.
     *
     * There is at least one other "Vidhi Fabrics" trading in Surat — a second
     * Justdial listing at Nawab Ni Wadi with far more reviews, an Instagram
     * and a Facebook page carrying a different phone number. None of those are
     * this business. Only add a URL here after confirming it with the owner:
     * claiming someone else's profile merges you into their entity, which is
     * worse than having no `sameAs` at all.
     *
     * The LinkedIn vanity URL really is `vidhi-fabricss`, with a doubled "s".
     * It was briefly "corrected" to the single-s spelling on the strength of a
     * logged-out page fetch, which was wrong: LinkedIn serves a near-identical
     * shell for a handle that does not exist, so neither the status code nor
     * the page text distinguishes a real company page from a miss. The owner's
     * own admin link settled it. Do not re-derive this from a fetch.
     */
    sameAs: [
      "https://www.linkedin.com/company/vidhi-fabricss/",
      "https://www.indiamart.com/vidhi-fabrics-surat/",
      "https://www.exportersindia.com/vidhi-fabrics-surat/",
      "https://www.justdial.com/Surat/Vidhi-Fabrics-Gajjar-Chamber-Begumpura/0261PX261-X261-230714173007-Q6A4_BZDET",
    ],
  };
}
