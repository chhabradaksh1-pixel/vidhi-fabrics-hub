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
  streetAddress: "542-543 Golden Point, Begumpura Road",
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

/** The address as shown on the page, one line per row. */
export const ADDRESS_LINES: Record<Lang, string[]> = {
  en: [
    BUSINESS.streetAddress,
    `${BUSINESS.locality}, ${BUSINESS.region} ${BUSINESS.postalCode}, India`,
  ],
  hi: ["542-543 गोल्डन पॉइंट, बेगमपुरा रोड", `सूरत, गुजरात ${BUSINESS.postalCode}, भारत`],
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
    name: BUSINESS.name,
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
    ],
  };
}
