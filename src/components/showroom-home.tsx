import { useState } from "react";

import { COPY, type Lang } from "@/content/translations";
import {
  ENQUIRE,
  HERO_IMAGE,
  SHOWROOM_HEADLINE,
  SHOWROOM_HEADLINE_HI,
  SHOWROOM_HEADLINE_HI_EN,
  SHOWROOM_SUBLINE,
  SHOWROOM_TILES,
  VIEW_RANGE,
  designLink,
} from "@/content/showroom-live";

import "@/styles/showroom.css";

export function ShowroomHero({ lang, enquireHref }: { lang: Lang; enquireHref: string }) {
  const dressHref =
    lang === "hi" ? "/hi/dress-material-wholesale-surat" : "/dress-material-wholesale-surat";

  return (
      <section className="md:relative">
        <div className="relative h-40 w-full overflow-hidden bg-sand max-md:-mr-[4.5rem] max-md:w-[calc(100%+4.5rem)] sm:h-52 md:absolute md:inset-0 md:mr-0 md:h-full md:w-full">
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
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-paper from-20% via-paper/80 to-transparent md:block"
            aria-hidden="true"
          />
        </div>
        <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-6 pt-8 sm:px-8 sm:py-14 md:flex md:min-h-[680px] md:items-center md:py-16 lg:px-[50px]">
          <div className="max-w-xl md:max-w-[22rem] lg:max-w-[30rem]">
            <h1 className="vf-showroom-serif text-[2.15rem] leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
              {lang === "hi"
                ? SHOWROOM_HEADLINE_HI
                : lang === "hi-en"
                  ? SHOWROOM_HEADLINE_HI_EN
                  : SHOWROOM_HEADLINE}
            </h1>
            <p
              lang={lang === "en" ? "hi" : lang}
              className="vf-showroom-hindi mt-3 text-lg leading-snug sm:text-2xl"
            >
              {SHOWROOM_SUBLINE[lang]}
            </p>
            <a href={enquireHref} target="_blank" rel="noopener noreferrer" className="vf-showroom-enquire mt-6 w-auto">
              {ENQUIRE[lang]}
            </a>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground">
              {COPY.hero.body[lang]}
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-foreground">
              {COPY.hero.regions[lang]}
            </p>
            <p className="mt-4">
              <a
                href={dressHref}
                className="text-sm text-clay underline decoration-clay/70 underline-offset-4"
              >
                {COPY.hero.dressLink[lang]}
              </a>
            </p>
          </div>
        </div>
      </section>
  );
}

/** Three kept stats, placed after the range accordion the way their trust banner sits after flooring types. */
export function ShowroomTrust({ lang }: { lang: Lang }) {
  return (
    <section
      aria-label={COPY.hero.stats.map((stat) => stat[lang]).join(", ")}
      className="border-y border-line bg-sand"
    >
      <ul className="mx-auto grid w-full max-w-[1440px] gap-3 px-5 py-6 sm:grid-cols-3 sm:gap-10 sm:px-8 sm:py-8 lg:px-[50px]">
        {COPY.hero.stats.map((stat) => (
            <li key={stat.en} className="text-sm leading-snug text-ink">
            {stat[lang]}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ShowroomRanges({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(0);
  const tile = SHOWROOM_TILES[open] ?? SHOWROOM_TILES[0];

  return (
    <section className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-[50px]" aria-labelledby="showroom-ranges">
      <h2 id="showroom-ranges" className="vf-showroom-serif text-4xl sm:text-5xl">
        {lang === "hi" ? "रेंज" : "Collections"}
      </h2>
      <div className="mt-8 grid items-start gap-6 md:mt-12 md:grid-cols-2 md:gap-14">
        {tile ? (
          <div className="relative aspect-[3/2] overflow-hidden bg-sand md:sticky md:top-28 md:order-2 md:aspect-[3/4]">
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
        <ul className="border-y border-line">
          {SHOWROOM_TILES.map((item, index) => {
            const isOpen = index === open;
            const href = lang === "hi" ? `/hi${item.href}` : item.href;
            return (
              <li key={item.code} className="border-b border-line last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(index)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="vf-showroom-serif text-2xl sm:text-3xl">{item.title[lang]}</span>
                  <span aria-hidden="true" className="font-body text-2xl leading-none text-clay">
                    {isOpen ? "×" : "+"}
                  </span>
                </button>
                <div className={isOpen ? "vf-range-panel pb-8" : "hidden"}>
                  <p className="max-w-md text-sm leading-relaxed text-foreground">{item.note[lang]}</p>
                  <div className="vf-range-actions">
                    <a
                      href={designLink(lang, item.code)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vf-showroom-enquire shrink-0"
                    >
                      {ENQUIRE[lang]}
                    </a>
                    <a
                      href={href}
                      className="inline-flex shrink-0 items-center text-sm text-clay underline decoration-clay/70 underline-offset-4"
                    >
                      {item.pageLink ? item.pageLink[lang] : VIEW_RANGE[lang]}
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
