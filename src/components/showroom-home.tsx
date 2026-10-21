import { useState } from "react";

import { COPY, type Lang } from "@/content/translations";
import {
  ENQUIRE,
  HERO_IMAGE,
  SHOWROOM_HEADLINE,
  SHOWROOM_HEADLINE_HI,
  SHOWROOM_TILES,
  VIEW_RANGE,
  designLink,
} from "@/content/showroom-live";

import "@/styles/showroom.css";

export function ShowroomHero({ lang, enquireHref }: { lang: Lang; enquireHref: string }) {
  const dressHref =
    lang === "hi" ? "/hi/dress-material-wholesale-surat" : "/dress-material-wholesale-surat";

  return (
    <>
      <section className="md:relative">
        <div className="relative h-40 w-full overflow-hidden bg-[#e7e0d6] sm:h-52 md:absolute md:inset-0 md:h-full">
          <img
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#F6F1EA] from-20% via-[#F6F1EA]/80 to-transparent md:block"
            aria-hidden="true"
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 pb-6 pt-8 sm:px-8 sm:py-14 md:flex md:min-h-[680px] md:items-center md:py-16">
          <div className="max-w-xl md:max-w-[22rem] lg:max-w-[30rem]">
            <h1 className="vf-showroom-serif text-[2.15rem] leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
              {SHOWROOM_HEADLINE}
            </h1>
            <p lang="hi" className="vf-showroom-hindi mt-3 text-lg leading-snug sm:text-2xl">
              {SHOWROOM_HEADLINE_HI}
            </p>
            <a href={enquireHref} target="_blank" rel="noopener noreferrer" className="vf-showroom-enquire mt-6 w-auto">
              {ENQUIRE[lang]}
            </a>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#121212]/80">
              {COPY.hero.body[lang]}
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#121212]/80">
              {COPY.hero.regions[lang]}
            </p>
            <p className="mt-4">
              <a
                href={dressHref}
                className="text-sm text-[#7A1A18] underline decoration-[#7A1A18]/30 underline-offset-4"
              >
                {COPY.hero.dressLink[lang]}
              </a>
            </p>
          </div>
        </div>
      </section>
      <section
        aria-label={COPY.hero.stats.map((stat) => stat[lang]).join(", ")}
        className="border-y border-line bg-[#F6F1EA]"
      >
        <ul className="mx-auto grid max-w-6xl gap-3 px-5 py-5 sm:grid-cols-3 sm:gap-8 sm:px-8 sm:py-7">
          {COPY.hero.stats.map((stat) => (
            <li key={stat.en} className="text-sm leading-snug text-[#121212]">
              {stat[lang]}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function ShowroomRanges({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(0);
  const tile = SHOWROOM_TILES[open] ?? SHOWROOM_TILES[0];

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="showroom-ranges">
      <h2 id="showroom-ranges" className="vf-showroom-serif text-4xl sm:text-5xl">
        {lang === "hi" ? "रेंज" : "Collections"}
      </h2>
      <div className="mt-8 grid items-start gap-6 md:mt-12 md:grid-cols-2 md:gap-14">
        {tile ? (
          <div className="relative aspect-[3/2] overflow-hidden bg-[#e7e0d6] md:sticky md:top-28 md:order-2 md:aspect-[3/4]">
            <img
              src={tile.image.src}
              alt={tile.image.alt}
              width={tile.image.width}
              height={tile.image.height}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: tile.image.focus }}
            />
          </div>
        ) : null}
        <ul className="border-y border-[#121212]/15">
          {SHOWROOM_TILES.map((item, index) => {
            const isOpen = index === open;
            const href = lang === "hi" ? `/hi${item.href}` : item.href;
            return (
              <li key={item.code} className="border-b border-[#121212]/15 last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(index)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="vf-showroom-serif text-2xl sm:text-3xl">{item.title[lang]}</span>
                  <span aria-hidden="true" className="font-body text-2xl leading-none text-[#7A1A18]">
                    {isOpen ? "×" : "+"}
                  </span>
                </button>
                <div className={isOpen ? "pb-6" : "hidden"}>
                  <p className="max-w-md text-sm leading-relaxed text-[#121212]/75">{item.note[lang]}</p>
                  <a
                    href={href}
                    className="mt-3 inline-block text-sm text-[#7A1A18] underline decoration-[#7A1A18]/30 underline-offset-4"
                  >
                    {item.pageLink ? item.pageLink[lang] : VIEW_RANGE[lang]}
                  </a>
                  <a
                    href={designLink(lang, item.code)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vf-showroom-enquire mt-5 w-full sm:w-auto"
                  >
                    {ENQUIRE[lang]}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
