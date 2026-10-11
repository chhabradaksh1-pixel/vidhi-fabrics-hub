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
  phone: "+919172914279",
  phoneDisplay: "+91 91729 14279",
  email: "sales@vidhifabrics.com",
  /** GST registration, confirmed by the owner on 3 October 2026. Gujarat (24). */
  gstin: "24ABFPC2380K1ZW",
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
 * The person who signs the Fabric Desk articles, as named by the owner.
 *
 * One `@id` for every block that refers to him — each BlogPosting `author`
 * and the Person on the About page — so a crawler resolves one person rather
 * than a string repeated on fourteen pages. The About page is his profile URL.
 */
export const AUTHOR = {
  id: "https://www.vidhifabrics.com/about#dinesh-chhabra",
  name: "Dinesh Chhabra",
  jobTitle: "CEO",
  url: "https://www.vidhifabrics.com/about",
} as const;

/** schema.org Person for the article author, linked to the business entity. */
export function authorSchema() {
  return {
    "@type": "Person",
    "@id": AUTHOR.id,
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    url: AUTHOR.url,
    worksFor: { "@type": "Organization", "@id": BUSINESS_ID, name: BUSINESS.name },
  };
}

/**
 * Tells this business apart from others with a similar name. Supplied by the
 * owner (2 October 2026): there are similarly named businesses in Ludhiana
 * and Ahmedabad, and this one is not connected to them. The "Vidhi fabric"
 * shop at Atlanta Shoppers, Vesu, Surat (its own Google Business Profile) was
 * added on 3 October 2026 after the site audit found it. Emitted as the
 * LocalBusiness `disambiguatingDescription` and repeated on the About page
 * and in llms.txt, so every surface says the same thing.
 */
export const DISAMBIGUATION: Record<Lang, string> = {
  en: "Vidhi Fabrics of 542-543 Golden Point, Ring Road, Begumpura, Surat: a manufacturer and wholesaler of polyester sarees and dress material. Not connected with the similarly named businesses in Ludhiana or Ahmedabad, or with the similarly named fabric shop in Vesu, Surat.",
  hi: "विधि फैब्रिक्स, 542-543 गोल्डन पॉइंट, रिंग रोड, बेगमपुरा, सूरत — पॉलिएस्टर साड़ियों और ड्रेस मटेरियल के निर्माता और थोक विक्रेता। लुधियाना या अहमदाबाद में इससे मिलते-जुलते नाम वाले कारोबारों से, और सूरत के वेसू में मिलते-जुलते नाम वाली कपड़े की दुकान से, हमारा कोई संबंध नहीं है।",
  "hi-en":
    "Vidhi Fabrics, 542-543 Golden Point, Ring Road, Begumpura, Surat — polyester sarees aur dress material ke manufacturer aur wholesaler. Ludhiana ya Ahmedabad mein isse milte-julte naam wale businesses se, aur Surat ke Vesu mein milte-julte naam wali fabric shop se, hamara koi sambandh nahin hai.",
};

/**
 * Where the business mainly supplies, as stated by the owner: North India,
 * chiefly Punjab, Haryana and Rajasthan, with buyers in Uttar Pradesh and Madhya Pradesh too.
 * Emitted as `areaServed`; the homepage and polyester page say the same in
 * words.
 */
export const AREA_SERVED = [
  { "@type": "State", name: "Punjab" },
  { "@type": "State", name: "Haryana" },
  { "@type": "State", name: "Rajasthan" },
  { "@type": "State", name: "Uttar Pradesh" },
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
      "Surat-based manufacturer and wholesaler of polyester sarees and dress material. Through a network of Surat mills and manufacturing units it also sources organza, net and other fabrics to order. Sells in bulk to wholesalers, retailers, resellers and boutiques, mainly across North India.",
    makesOffer: [
      ...["Polyester sarees", "Dress material", "Organza fabric", "Net fabric"].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Product", name },
      })),
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Fabric sourcing to order from Surat mills and manufacturing units",
        },
      },
    ],
    disambiguatingDescription: DISAMBIGUATION.en,
    url: site,
    logo: `${site}/icon-512.png`,
    image: `${site}/og-image.jpg`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    taxID: BUSINESS.gstin,
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

/** The full address as one line, for map search and directions. */
export const MAP_QUERY = `Vidhi Fabrics, ${BUSINESS.streetAddress}, ${BUSINESS.locality}, ${BUSINESS.region} ${BUSINESS.postalCode}`;

/**
 * Google Maps directions to the shop. The public "Maps URLs" form needs no API
 * key and opens the Maps app on phones.
 */
export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`;

/** Keyless Google Maps embed for the same address. */
export const MAP_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=17&output=embed`;

export const DIRECTIONS_LABEL: Record<Lang, string> = {
  en: "Get directions",
  hi: "रास्ता देखें",
  "hi-en": "Directions dekhein",
};

/** "GSTIN" is the term printed on Indian invoices, in every language. */
export const GSTIN_LABEL = "GSTIN";

export const MAP_TITLE: Record<Lang, string> = {
  en: "Map: Vidhi Fabrics, Golden Point, Ring Road, Surat",
  hi: "नक्शा: विधि फैब्रिक्स, गोल्डन पॉइंट, रिंग रोड, सूरत",
  "hi-en": "Map: Vidhi Fabrics, Golden Point, Ring Road, Surat",
};
