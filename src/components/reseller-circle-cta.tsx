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

/** One-line strip shown just above the homepage footer. */
export function ResellerCircleStrip({ lang, href }: { lang: Lang; href: string }) {
  const copy = CIRCLE_STRIP[lang];
  return (
    <div className="border-t border-line bg-sand/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[60ch] text-pretty leading-relaxed text-ink">{copy.text}</p>
        <a href={href} className={buttonClass}>
          {copy.button}
        </a>
      </div>
    </div>
  );
}
