import circlePortrait from "@/assets/reseller-circle-portrait.webp";
import swatchStack from "@/assets/swatch-stack.webp";
import "@/styles/showroom.css";
import { CIRCLE_CTA, CIRCLE_REF, HOME_CIRCLE, circleHref } from "@/content/reseller-circle-copy";
import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

const buttonClass = "btn btn-primary shrink-0";

/** CTA card for the reseller and organza/net landing pages. */
export function ResellerCircleCta({ lang, className = "" }: { lang: Lang; className?: string }) {
  const copy = CIRCLE_CTA[lang];
  return (
    <aside aria-labelledby={`circle-cta-${lang}`} className={`card p-6 sm:p-8 ${className}`}>
      <h2 id={`circle-cta-${lang}`} className="type-h3">
        {copy.heading}
      </h2>
      <p className="mt-3 type-body text-mute">{copy.body}</p>
      <a href={circleHref(lang)} className={`mt-5 ${buttonClass}`}>
        {copy.button}
      </a>
    </aside>
  );
}

/* The two smaller asks on the dark band: light underlined text links. */
const circleSubLink =
  "link inline-flex min-h-11 items-center type-body text-plumlight decoration-plumlight/50 hover:text-paper focus-visible:outline-plumlight";

/**
 * The home page's one dark band (Atelier), edge to edge with no box: plum
 * ground, linen text, the swatch photograph on the right. The photo is first
 * in the DOM and moves right with `order` on a wide screen. Links open the
 * business WhatsApp number, not a community invite. This block is not staged
 * with data-reveal: a full-bleed photograph that starts at opacity 0 reads as
 * a blank panel. Plumlight on plum is 11.9:1.
 */
export function ResellerCircleStrip({ lang }: { lang: Lang }) {
  const copy = HOME_CIRCLE[lang];
  return (
    <section
      aria-labelledby="reseller-circle-heading"
      className="scroll-mt-36 py-8 sm:py-11 lg:py-14"
    >
      <div className="grid overflow-hidden bg-plum md:grid-cols-2">
        <div className="relative aspect-[4/3] bg-plumdeep md:order-2 md:aspect-auto md:min-h-[600px]">
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
        <div className="flex items-center px-5 py-16 sm:px-10 md:py-20 lg:px-[70px] lg:py-[110px]">
          <div className="max-w-[34rem]">
            <h2 id="reseller-circle-heading" className="type-h1 text-plumlight">
              {copy.headline}
            </h2>
            <p className="mt-6 type-lead text-plumlight">{copy.subheading}</p>
            <p className="mt-4 max-w-[36ch] type-body text-plumlight/85">{copy.body}</p>
            <div className="mt-10 flex items-start gap-6 sm:gap-8">
              <div className="min-w-0 flex-1">
                <a
                  href={whatsAppUrl(copy.join)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-lead-ref={CIRCLE_REF}
                  className="btn btn-inverse"
                >
                  {copy.cta}
                </a>
                <ul className="mt-6 border-t border-plumlight/20">
                  <li className="border-b border-plumlight/20">
                    <a
                      href={whatsAppUrl(copy.boutiqueMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-lead-ref={CIRCLE_REF}
                      className={circleSubLink}
                    >
                      {copy.boutique}
                    </a>
                  </li>
                  <li className="border-b border-plumlight/20">
                    <a
                      href={whatsAppUrl(copy.homeMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-lead-ref={CIRCLE_REF}
                      className={circleSubLink}
                    >
                      {copy.home}
                    </a>
                  </li>
                </ul>
              </div>
              <img
                src={circlePortrait}
                alt={copy.portraitAlt}
                width={360}
                height={450}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-28 shrink-0 rounded-2xl object-cover sm:w-36"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
