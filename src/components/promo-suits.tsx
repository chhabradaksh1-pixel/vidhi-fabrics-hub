import { useEffect, useState } from "react";

import { PROMO_COPY, PROMO_SUIT_REF, PROMO_SUITS } from "@/content/promo-suits";
import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

const DISMISS_KEY = "vidhi-promo-suits-banner";

const suitLink =
  "vf-btn-maroon inline-flex items-center justify-center rounded-sm px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.12em] transition-colors";

/**
 * Slim cream-and-maroon strip above the homepage header. Dismissed for the
 * rest of the browser session. Renders nothing when `PROMO_SUITS` is false.
 */
export function PromoSuitsBanner({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(DISMISS_KEY) === "1") setOpen(false);
    } catch {
      /* private mode: the banner simply returns next time */
    }
  }, []);

  if (!PROMO_SUITS || !open) return null;

  return (
    <div className="border-b border-[#7A1A18]/25 bg-[#F6F1EA] text-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-2">
        <p className="min-w-0 flex-1 text-sm leading-snug">{PROMO_COPY.banner[lang]}</p>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={whatsAppUrl(PROMO_COPY.suitMessage[lang])}
            data-lead-ref={PROMO_SUIT_REF}
            target="_blank"
            rel="noopener noreferrer"
            className="vf-btn-maroon rounded-sm px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors"
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
            className="grid size-8 place-items-center rounded-sm text-lg leading-none text-ink/70 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7A1A18]"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </div>
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
