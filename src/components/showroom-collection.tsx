import { COLLECTION_INTRO, ENQUIRE, SHOWROOM_DESIGNS, designLink } from "@/content/showroom-live";
import type { Lang } from "@/content/translations";

import "@/styles/showroom.css";

export function ShowroomCollection({ lang }: { lang: Lang }) {
  return (
    <section className="mt-10" aria-label={COLLECTION_INTRO[lang]}>
      <p className="max-w-xl text-base leading-relaxed text-[#121212]/80">{COLLECTION_INTRO[lang]}</p>
      <div className="mt-8 grid gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14">
        {SHOWROOM_DESIGNS.map((design) => (
          <article key={design.code}>
            <div className="relative aspect-[3/4] overflow-hidden bg-[#e7e0d6]">
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
            <p className="vf-showroom-serif mt-4 text-3xl text-[#7A1A18]">{design.code}</p>
            <a
              href={designLink(lang, design.code)}
              target="_blank"
              rel="noopener noreferrer"
              className="vf-showroom-enquire mt-4 w-full"
            >
              {ENQUIRE[lang]}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
