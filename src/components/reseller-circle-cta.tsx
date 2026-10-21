import swatchStack from "@/assets/swatch-stack.webp";
import "@/styles/showroom.css";
import { CIRCLE_CTA, CIRCLE_REF, HOME_CIRCLE, circleHref } from "@/content/reseller-circle-copy";
import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

const buttonClass =
  "inline-flex shrink-0 items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-claydeep";

/** CTA card for the reseller and organza/net landing pages. */
export function ResellerCircleCta({ lang, className = "" }: { lang: Lang; className?: string }) {
  const copy = CIRCLE_CTA[lang];
  return (
    <aside
      aria-labelledby={`circle-cta-${lang}`}
      className={`rounded-md bg-sand/60 p-6 ring-1 ring-black/5 sm:p-8 ${className}`}
    >
      <h2 id={`circle-cta-${lang}`} className="font-display text-2xl font-light">
        {copy.heading}
      </h2>
      <p className="mt-3 leading-[1.8] text-mute">{copy.body}</p>
      <a href={circleHref(lang)} className={`mt-5 ${buttonClass}`}>
        {copy.button}
      </a>
    </aside>
  );
}

const circleLink =
  "underline decoration-[#7A1A18]/40 underline-offset-[6px] transition-colors hover:decoration-[#7A1A18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7A1A18]";

/**
 * Homepage split modelled on a half image, half cream help panel.
 * The photo is an existing swatch stack. Links open the business WhatsApp
 * number, not a community invite. This block is not staged with data-reveal:
 * a full-bleed photograph that starts at opacity 0 reads as a blank panel.
 */
export function ResellerCircleStrip({ lang }: { lang: Lang }) {
  const copy = HOME_CIRCLE[lang];
  return (
    <section aria-labelledby="reseller-circle-heading" className="scroll-mt-36 bg-[#F6F1EA]">
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[4/5] bg-[#c4b5a4] md:aspect-auto md:min-h-[680px]">
          <img
            src={swatchStack}
            alt="Folded fabric swatches stacked for a reseller to look through"
            width={1024}
            height={768}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="flex items-center px-5 py-14 sm:px-10 md:py-20 lg:px-[70px] lg:py-[100px]">
          <div className="max-w-[26rem]">
            <h2
              id="reseller-circle-heading"
              className="vf-showroom-serif text-balance text-[2.15rem] font-normal leading-[1.12] text-[#121212] sm:text-5xl sm:leading-[1.08]"
            >
              {copy.headline}
            </h2>
            <p className="mt-6 text-xl font-normal leading-snug text-[#121212] sm:text-2xl">{copy.subheading}</p>
            <p className="mt-4 max-w-[34ch] text-base font-normal leading-relaxed text-[#2B2B2B]">{copy.body}</p>
            <a
              href={whatsAppUrl(copy.join)}
              target="_blank"
              rel="noopener noreferrer"
              data-lead-ref={CIRCLE_REF}
              className={`mt-8 inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.16em] text-[#7A1A18] ${circleLink}`}
            >
              {copy.cta}
            </a>
            <ul className="mt-10 space-y-1 border-t border-[#121212]/10 pt-6">
              <li>
                <a
                  href={whatsAppUrl(copy.boutiqueMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-lead-ref={CIRCLE_REF}
                  className="inline-flex min-h-11 items-center text-lg font-normal text-[#3D3D3D] hover:text-[#121212]"
                >
                  {copy.boutique}
                </a>
              </li>
              <li>
                <a
                  href={whatsAppUrl(copy.homeMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-lead-ref={CIRCLE_REF}
                  className="inline-flex min-h-11 items-center text-lg font-normal text-[#3D3D3D] hover:text-[#121212]"
                >
                  {copy.home}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
