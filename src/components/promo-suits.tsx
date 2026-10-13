import { PROMO_COPY, PROMO_SUIT_REF, PROMO_SUITS } from "@/content/promo-suits";
import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

const suitLink =
  "vf-btn-maroon inline-flex items-center justify-center rounded-sm px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.12em] transition-colors";

/** Copies per half of the track. Both halves match, so a -50% shift is seamless. */
const TICKER_COPIES = 5;

/**
 * Cream-and-maroon ticker at the top of every page. The whole strip is the
 * suit-catalogue link. Renders nothing when `PROMO_SUITS` is false.
 * Motion is CSS only; reduced motion shows the sentence once, still.
 */
export function PromoSuitsTicker({ lang }: { lang: Lang }) {
  if (!PROMO_SUITS) return null;
  const text = PROMO_COPY.banner[lang];
  const copies = Array.from({ length: TICKER_COPIES }, (_, i) => i);
  return (
    <a
      href={whatsAppUrl(PROMO_COPY.suitMessage[lang])}
      data-lead-ref={PROMO_SUIT_REF}
      target="_blank"
      rel="noopener noreferrer"
      className="vf-promo-ticker"
      aria-label={text}
    >
      <span className="vf-promo-ticker-track" aria-hidden="true">
        <TickerGroup copies={copies} text={text} />
        <TickerGroup copies={copies} text={text} />
      </span>
    </a>
  );
}

function TickerGroup({ copies, text }: { copies: number[]; text: string }) {
  return (
    <span className="vf-promo-ticker-group">
      {copies.map((i) => (
        <span key={i} className="vf-promo-ticker-item">
          {text}
          <span className="vf-promo-ticker-mark" aria-hidden="true">
            ✨
          </span>
        </span>
      ))}
    </span>
  );
}

/** Prominent suit-catalogue button. Renders nothing when the promo is off. */
export function PromoSuitCatalogueCta({ lang }: { lang: Lang }) {
  if (!PROMO_SUITS) return null;
  return (
    <p className="mt-8">
      <a
        href={whatsAppUrl(PROMO_COPY.suitMessage[lang])}
        data-lead-ref={PROMO_SUIT_REF}
        target="_blank"
        rel="noopener noreferrer"
        className={suitLink}
      >
        {PROMO_COPY.suitCta[lang]}
      </a>
    </p>
  );
}

/** One line on a saree page. The ordinary page ref stays on this link. */
export function PromoSareeLine({ lang }: { lang: Lang }) {
  if (!PROMO_SUITS) return null;
  return (
    <p className="mt-4 text-sm leading-snug">
      <a
        href={whatsAppUrl(PROMO_COPY.sareeMessage[lang])}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#7A1A18] underline decoration-[#7A1A18]/30 underline-offset-4 hover:text-[#5C1210]"
      >
        {PROMO_COPY.sareeLine[lang]}
      </a>
    </p>
  );
}
