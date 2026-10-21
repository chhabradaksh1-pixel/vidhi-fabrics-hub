import { useEffect, useState } from "react";

import { PROMO_COPY, PROMO_SUIT_REF, PROMO_SUITS } from "@/content/promo-suits";
import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

const DISMISS_KEY = "vidhi-promo-suits-banner";

const suitLink =
  "vf-btn-maroon inline-flex items-center justify-center rounded-sm px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.12em] transition-colors";

/** Copies per half of the track. Both halves match, so a -50% shift is seamless. */
const TICKER_COPIES = 5;

/**
 * The suit banner, with only the sentence scrolling. The bar is the button
 * maroon; the WhatsApp control is inverted so it still reads on that ground.
 * Renders nothing when `PROMO_SUITS` is false, or after dismiss for the session.
 */
export function PromoSuitsTicker({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(DISMISS_KEY) === "1") setOpen(false);
    } catch {
      /* private mode: the banner simply returns next time */
    }
  }, []);

  if (!PROMO_SUITS || !open) return null;
  const text = PROMO_COPY.banner[lang];
  const copies = Array.from({ length: TICKER_COPIES }, (_, i) => i);
  return (
    <div className="vf-promo-ticker border-b border-white/20">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-2">
        <p className="vf-promo-ticker-viewport min-w-0 flex-1 text-sm leading-snug">
          <span className="sr-only">{text}</span>
          <span className="vf-promo-ticker-track" aria-hidden="true">
            <TickerGroup copies={copies} text={text} />
            <TickerGroup copies={copies} text={text} />
          </span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={whatsAppUrl(PROMO_COPY.suitMessage[lang])}
            data-lead-ref={PROMO_SUIT_REF}
            target="_blank"
            rel="noopener noreferrer"
            className="vf-promo-ticker-btn rounded-sm px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors"
          >
            {PROMO_COPY.bannerButton[lang]}
          </a>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              try {
                window.sessionStorage.setItem(DISMISS_KEY, "1");
              } catch {
                /* private mode */
              }
            }}
            aria-label={PROMO_COPY.dismiss[lang]}
            className="grid size-8 place-items-center rounded-sm text-lg leading-none text-white transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/** The sentence sparkle is a colour emoji unless it is drawn as its own glyph. */
function TickerSentence({ text }: { text: string }) {
  const parts = text.split("✨");
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 ? (
        <span className="vf-promo-ticker-spark" aria-hidden="true">
          ✨
        </span>
      ) : null}
    </span>
  ));
}

function TickerGroup({ copies, text }: { copies: number[]; text: string }) {
  return (
    <span className="vf-promo-ticker-group">
      {copies.map((i) => (
        <span key={i} className="vf-promo-ticker-item">
          <TickerSentence text={text} />
          <span className="vf-promo-ticker-spark vf-promo-ticker-mark" aria-hidden="true">
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
        className="text-clay underline decoration-clay/30 underline-offset-4 hover:text-claydeep"
      >
        {PROMO_COPY.sareeLine[lang]}
      </a>
    </p>
  );
}
