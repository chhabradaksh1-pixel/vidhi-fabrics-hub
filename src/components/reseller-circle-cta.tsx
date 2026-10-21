import { CIRCLE_CTA, CIRCLE_STRIP, circleHref } from "@/content/reseller-circle-copy";
import type { Lang } from "@/content/translations";

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

/** Homepage section for the reseller community. */
export function ResellerCircleStrip({ lang, href }: { lang: Lang; href: string }) {
  const copy = CIRCLE_STRIP[lang];
  return (
    <section data-reveal aria-labelledby="reseller-circle-heading" className="scroll-mt-36">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-[50px] lg:py-32">
        <h2
          id="reseller-circle-heading"
          className="text-balance font-display text-4xl font-light tracking-tight lg:text-5xl"
        >
          {copy.heading}
        </h2>
        <p className="mt-5 max-w-[46ch] text-pretty text-lg leading-relaxed text-mute">
          {copy.text}
        </p>
        <a
          href={href}
          className="vf-btn-maroon mt-8 inline-flex shrink-0 items-center justify-center rounded-sm px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] transition-colors"
        >
          {copy.button}
        </a>
      </div>
    </section>
  );
}
