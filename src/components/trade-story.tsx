import swatchBook from "@/assets/swatch-book.webp";
import swatchBook960 from "@/assets/swatch-book-960.webp";
import { ReachMapSection } from "@/components/reach-map";
import { COPY, type Lang } from "@/content/translations";

/* The journey line reads in story order (since the 1960s, from Surat's Ring
   Road, 2,400+ SKUs, export) while the DOM keeps the stats' own order:
   1960s, 2,400+, UAE, Surat. Order classes by DOM index. */
const JOURNEY_ORDER = ["order-1", "order-3", "order-4", "order-2"];

/**
 * The lower half of /about: scale and trust (its stats drawn as a journey
 * line), the buyer voices as a row of cards (after the Ocamba reference), and
 * the reach globe. Copy is unchanged; only layout and styling.
 */
export function TradeStory({ lang }: { lang: Lang }) {
  const leadVoice = COPY.testimonials.cards[0];
  const otherVoices = COPY.testimonials.cards.slice(1);

  return (
    <>
      <section id="scale" className="scroll-mt-36 border-t border-line bg-surface">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-[50px] lg:py-14">
          <p className="eyebrow type-label text-clay">{COPY.scale.marker[lang]}</p>
          <h2 className="mt-4 max-w-[20ch] type-h2">{COPY.scale.heading[lang]}</h2>

          {/* A plum thread with a node per stat. It draws itself left to right
              (top to bottom on a phone) when it scrolls into view. */}
          <dl
            data-reveal
            className="vf-journey mt-10 grid gap-y-8 lg:mt-12 lg:grid-cols-4 lg:gap-x-10"
          >
            {COPY.scale.stats.map((s, i) => (
              <div key={s.value} className={`vf-journey-step ${JOURNEY_ORDER[i]}`}>
                <dt className="type-h1 text-ink">{s.value}</dt>
                <dd className="mt-2 type-label text-mute">{s.label[lang]}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-x-16">
            <img
              src={swatchBook}
              srcSet={`${swatchBook960} 960w, ${swatchBook} 1440w`}
              sizes="(min-width: 1024px) 680px, calc(100vw - 40px)"
              alt={COPY.scale.imageAlt[lang]}
              loading="lazy"
              decoding="async"
              width={1440}
              height={900}
              className="aspect-[16/10] w-full rounded-[var(--radius-card)] object-cover lg:col-span-7"
            />
            <div className="max-w-[44ch] type-body text-mute lg:col-span-5">
              <p className="type-h3 text-ink">{COPY.scale.certTitle[lang]}</p>
              <p className="mt-4 type-body">{COPY.scale.certBody[lang]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-8 sm:py-12 lg:px-[50px] lg:py-14">
          <div className="grid gap-y-8 lg:grid-cols-12 lg:items-start lg:gap-x-16">
            <div className="lg:col-span-6">
              <p className="eyebrow type-label text-clay">{COPY.testimonials.marker[lang]}</p>
              <h2 className="mt-4 max-w-[18ch] type-h2">{COPY.testimonials.heading[lang]}</h2>
              <p className="mt-5 max-w-[52ch] text-pretty type-lead text-mute">
                {COPY.testimonials.body[lang]}
              </p>
            </div>
            {/* Each stat spans the dl's two rows on a subgrid, so the values
                share one row (as tall as the longest) and every label starts
                on the same line, however many lines its value takes. */}
            <dl className="grid grid-cols-3 grid-rows-[auto_auto] gap-x-6 border-t border-line pt-6 lg:col-span-6">
              {COPY.testimonials.proof.map((stat) => (
                <div key={stat.label.en} className="row-span-2 grid grid-rows-subgrid">
                  <dd className="type-h2 text-ink">{stat.value[lang]}</dd>
                  <dt className="mt-2 max-w-[22ch] type-small text-mute">{stat.label[lang]}</dt>
                </div>
              ))}
            </dl>
          </div>

          {leadVoice && (
            /* The lead voice as a feature quote, centred between the stats and
               the cards, its lines balanced. */
            <figure className="mt-12 text-center lg:mt-16">
              <blockquote className="mx-auto max-w-[36ch] text-balance type-h3 text-ink">
                {leadVoice.quote[lang]}
              </blockquote>
              <figcaption className="mt-6 type-label text-mute">
                {leadVoice.customerLabel[lang]} · {leadVoice.location}
              </figcaption>
            </figure>
          )}
          {otherVoices.length > 0 && (
            <div
              data-reveal-stagger
              className="vf-rail-fade-md -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {otherVoices.map((testimonial, testimonialIndex) => (
                <figure
                  key={`${testimonial.customerLabel.en}-${testimonial.location}-${testimonialIndex}`}
                  data-reveal
                  className="card flex w-[82%] shrink-0 snap-start flex-col p-6 sm:p-8 md:w-auto"
                >
                  <span aria-hidden="true" className="block h-px w-8 bg-plum/40" />
                  <blockquote className="mt-6 flex-1 type-body text-foreground">
                    {testimonial.quote[lang]}
                  </blockquote>
                  <figcaption className="mt-8 type-label text-mute">
                    {testimonial.customerLabel[lang]} · {testimonial.location}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <ReachMapSection lang={lang} id="reach-map" />
    </>
  );
}
