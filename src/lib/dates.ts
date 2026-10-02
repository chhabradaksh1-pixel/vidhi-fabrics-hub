import type { Lang } from "@/content/translations";

const MONTHS: Record<"en" | "hi", string[]> = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  hi: [
    "जनवरी",
    "फ़रवरी",
    "मार्च",
    "अप्रैल",
    "मई",
    "जून",
    "जुलाई",
    "अगस्त",
    "सितंबर",
    "अक्तूबर",
    "नवंबर",
    "दिसंबर",
  ],
};

/**
 * Formats an ISO date (YYYY-MM-DD) as "2 October 2026" / "2 अक्तूबर 2026".
 *
 * Deliberately not `Intl.DateTimeFormat`: the server and the reader's browser
 * can carry different ICU data and time zones, and any difference in the
 * rendered string is a hydration mismatch. Parsing the string by hand gives
 * the same output everywhere. Hinglish uses the English month names.
 */
export function formatIsoDate(iso: string, lang: Lang) {
  const [year, month, day] = iso.split("-").map(Number);
  const names = MONTHS[lang === "hi" ? "hi" : "en"];
  const name = month ? names[month - 1] : undefined;
  if (!year || !name || !day) return iso;
  return `${day} ${name} ${year}`;
}
