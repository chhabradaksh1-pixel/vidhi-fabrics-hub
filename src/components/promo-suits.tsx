import { useEffect, useState } from "react";

import { useOffscreen } from "@/hooks/use-offscreen";
import { PROMO_COPY, PROMO_SUIT_REF, PROMO_SUITS } from "@/content/promo-suits";
import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

const DISMISS_KEY = "vidhi-promo-suits-banner";

const suitLink = "btn btn-primary";

/** Copies per half of the track. Both halves match, so a -50% shift is seamless. */
const TICKER_COPIES = 5;

/**
 * The suit banner, with only the sentence scrolling. The bar is the button
 * maroon; the WhatsApp control is inverted so it still reads on that ground.
 * Renders nothing when `PROMO_SUITS` is false, or after dismiss for the session.
 */
export function PromoSuitsTicker({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(true);
  // The sentence stops travelling once the bar has scrolled out of view.
  const [tickerRef, offscreen] = useOffscreen<HTMLDivElement>();

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
  // The sentence runs from edge to edge of the screen and fades out at both
  // ends. There is no separate button (owner, 31 October 2026): the whole
  // strip is the link to the catalogue on WhatsApp, which is what its sentence
  // asks for, and it keeps the promo's lead ref. The close control floats over
  // the right-hand fade.
  return (
    <div
      ref={tickerRef}
      data-offscreen={offscreen || undefined}
      className="vf-promo-ticker relative border-b border-white/20"
    >
      <a
        href={whatsAppUrl(PROMO_COPY.suitMessage[lang])}
        data-lead-ref={PROMO_SUIT_REF}
        target="_blank"
        rel="noopener noreferrer"
        className="vf-promo-ticker-viewport block py-2.5 type-small focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-plumlight"
      >
        <span className="sr-only">{text}</span>
        <span className="vf-promo-ticker-track" aria-hidden="true">
          <TickerGroup copies={copies} text={text} />
          <TickerGroup copies={copies} text={text} />
        </span>
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
        className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-lg leading-none text-plumlight transition-colors hover:bg-plumlight/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plumlight sm:right-4 lg:right-[42px]"
      >
        <span aria-hidden="true">×</span>
      </button>
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
    <p className="mt-4 type-small">
      <a
        href={whatsAppUrl(PROMO_COPY.sareeMessage[lang])}
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        {PROMO_COPY.sareeLine[lang]}
      </a>
    </p>
  );
}
