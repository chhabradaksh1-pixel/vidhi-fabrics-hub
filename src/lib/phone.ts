/**
 * Phone handling for the enquiry pop-up.
 *
 * India is the default and keeps the strict mobile check it always had. Any
 * other country code takes a looser check (a plausible length for that
 * number), because export enquiries from the UAE and elsewhere are welcome and
 * an Indian-only rule turned them away.
 */

export type DialCode = { code: string; en: string; hi: string };

/** "other" lets the buyer type the full number with its own +code. */
export const OTHER_DIAL = "other";

/** India first (the default), then the markets enquiries mostly come from. */
export const DIAL_CODES: readonly DialCode[] = [
  { code: "+91", en: "India", hi: "भारत" },
  { code: "+971", en: "UAE", hi: "यूएई" },
  { code: "+966", en: "Saudi Arabia", hi: "सऊदी अरब" },
  { code: "+977", en: "Nepal", hi: "नेपाल" },
  { code: "+880", en: "Bangladesh", hi: "बांग्लादेश" },
  { code: "+94", en: "Sri Lanka", hi: "श्रीलंका" },
  { code: "+60", en: "Malaysia", hi: "मलेशिया" },
  { code: "+254", en: "Kenya", hi: "केन्या" },
  { code: "+234", en: "Nigeria", hi: "नाइजीरिया" },
  { code: "+44", en: "United Kingdom", hi: "यूनाइटेड किंगडम" },
  { code: "+1", en: "USA / Canada", hi: "अमेरिका / कनाडा" },
];

export type PhoneResult = { ok: true; e164: string } | { ok: false; reason: "india" | "intl" };

/**
 * Validates and normalises a number. Returns E.164 ("+919825208413") when it
 * looks right. `dial` is a code from DIAL_CODES or OTHER_DIAL.
 */
export function normalisePhone(dial: string, raw: string): PhoneResult {
  const digits = raw.replace(/\D/g, "");

  if (dial === "+91") {
    // Accept a pasted "+91 98252 08413" or "098252 08413" as well.
    const local = digits.replace(/^(91|0)(?=\d{10}$)/, "");
    return /^[6-9]\d{9}$/.test(local)
      ? { ok: true, e164: `+91${local}` }
      : { ok: false, reason: "india" };
  }

  if (dial === OTHER_DIAL) {
    // Needs its own country code; E.164 allows at most 15 digits in total.
    if (!raw.trim().startsWith("+")) return { ok: false, reason: "intl" };
    return digits.length >= 8 && digits.length <= 15
      ? { ok: true, e164: `+${digits}` }
      : { ok: false, reason: "intl" };
  }

  const cc = dial.replace(/\D/g, "");
  // Drop a repeated country code or trunk "0" the buyer may have typed.
  const local =
    digits.startsWith(cc) && digits.length > cc.length + 6
      ? digits.slice(cc.length)
      : digits.replace(/^0/, "");
  const total = cc.length + local.length;
  return local.length >= 6 && total <= 15
    ? { ok: true, e164: `+${cc}${local}` }
    : { ok: false, reason: "intl" };
}
