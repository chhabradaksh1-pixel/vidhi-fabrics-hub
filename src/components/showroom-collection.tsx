import { COLLECTION_INTRO, ENQUIRE, SHOWROOM_DESIGNS, designLink } from "@/content/showroom-live";
import type { Lang } from "@/content/translations";

import "@/styles/showroom.css";

/**
 * The live designs on the dress material page, on the home catalogue's range
 * card (white card, photo inset in a rounded frame): four across on a wide
 * screen, two on a phone, so the full-width page never blows a photo up.
 */
export function ShowroomCollection({ lang }: { lang: Lang }) {
  return (
    <section className="mt-12" aria-label={COLLECTION_INTRO[lang]}>
      <p className="type-body text-foreground">{COLLECTION_INTRO[lang]}</p>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {SHOWROOM_DESIGNS.map((design) => (
          <article key={design.code} className="card flex flex-col p-2.5">
            <div className="card-media relative aspect-[3/4] bg-sand">
              <img
                src={design.image.src}
                alt={design.alt}
                width={design.image.width}
                height={design.image.height}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: design.image.focus }}
              />
            </div>
            <p className="px-2 pt-4 type-h4 text-ink">{design.code}</p>
            <a
              href={designLink(lang, design.code)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm mt-3 w-full"
            >
              {ENQUIRE[lang]}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
