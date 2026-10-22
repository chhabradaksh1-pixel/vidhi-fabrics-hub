import swatchBook from "@/assets/swatch-book.webp";
import swatchBook960 from "@/assets/swatch-book-960.webp";
import loomPoster from "@/assets/weaving-loom-poster.webp";
import { LazyLoopVideo } from "@/components/lazy-loop-video";
import { ReachMapSection } from "@/components/reach-map";
import { COPY, type Lang } from "@/content/translations";

/**
 * Homepage sections that now live on /about: the loom, the scale notes,
 * buyer quotes, and the reach map. Copy is unchanged.
 */
export function TradeStory({ lang }: { lang: Lang }) {
  const leadVoice = COPY.testimonials.cards[0];
  const otherVoices = COPY.testimonials.cards.slice(1);

  return (
    <>
      <section aria-hidden="true" className="mt-16">
        <LazyLoopVideo
          src="/weaving-loom.mp4?v=a787f8f"
          poster={loomPoster}
          className="h-48 w-full object-cover sm:h-64 lg:h-80"
        />
      </section>

      <section id="scale" className="scroll-mt-36">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <p className="font-mono text-xs uppercase tracking-label text-clay">
            {COPY.scale.marker[lang]}
          </p>
          <h2 className="mt-3 max-w-[20ch] text-balance font-display text-4xl font-light tracking-normal lg:text-5xl">
            {COPY.scale.heading[lang]}
          </h2>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {COPY.scale.stats.map((s) => (
              <div key={s.value}>
                <dt className="font-display text-4xl font-light text-ink sm:text-5xl">{s.value}</dt>
                <dd className="mt-2 font-mono text-xs uppercase tracking-label text-mute">
                  {s.label[lang]}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <img
              src={swatchBook}
              srcSet={`${swatchBook960} 960w, ${swatchBook} 1440w`}
              sizes="(min-width: 1024px) 560px, calc(100vw - 48px)"
              alt={COPY.scale.imageAlt[lang]}
              loading="lazy"
              decoding="async"
              width={1440}
              height={900}
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="max-w-[40ch] text-pretty text-base text-mute">
              <p className="font-display text-2xl font-light text-ink">
                {COPY.scale.certTitle[lang]}
              </p>
              <p className="mt-4 leading-relaxed">{COPY.scale.certBody[lang]}</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
          <p className="font-mono text-xs uppercase tracking-label text-clay">
            {COPY.testimonials.marker[lang]}
          </p>
          <h2 className="mt-3 max-w-[18ch] text-balance font-display text-4xl font-light tracking-normal lg:text-5xl">
            {COPY.testimonials.heading[lang]}
          </h2>
          <p className="mt-5 max-w-[60ch] text-pretty text-mute">{COPY.testimonials.body[lang]}</p>

          <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {COPY.testimonials.proof.map((stat) => (
              <div key={stat.label.en}>
                <dd className="font-display text-4xl font-light tracking-normal text-ink sm:text-5xl">
                  {stat.value[lang]}
                </dd>
                <dt className="mt-3 max-w-[22ch] text-sm leading-relaxed text-mute">
                  {stat.label[lang]}
                </dt>
              </div>
            ))}
          </dl>

          {leadVoice && (
            <figure className="mt-14 max-w-4xl">
              <blockquote className="text-balance font-display text-2xl font-light leading-snug tracking-normal text-ink sm:text-3xl">
                {leadVoice.quote[lang]}
              </blockquote>
              <figcaption className="mt-7 font-mono text-xs uppercase tracking-label text-mute">
                {leadVoice.customerLabel[lang]} · {leadVoice.location}
              </figcaption>
            </figure>
          )}
          {otherVoices.length > 0 && (
            <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
              {otherVoices.map((testimonial, testimonialIndex) => (
                <figure
                  key={`${testimonial.customerLabel.en}-${testimonial.location}-${testimonialIndex}`}
                >
                  <blockquote className="leading-relaxed text-mute">
                    {testimonial.quote[lang]}
                  </blockquote>
                  <figcaption className="mt-5 font-mono text-xs uppercase tracking-label text-mute">
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
