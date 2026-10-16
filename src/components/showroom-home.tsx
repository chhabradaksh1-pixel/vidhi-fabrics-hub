import { COPY, type Lang } from "@/content/translations";
import {
  ENQUIRE,
  HERO_IMAGE,
  SHOWROOM_HEADLINE,
  SHOWROOM_HEADLINE_HI,
  SHOWROOM_TILES,
  designLink,
} from "@/content/showroom-live";

import "@/styles/showroom.css";

export function ShowroomHero({ lang, enquireHref }: { lang: Lang; enquireHref: string }) {
  const dressHref =
    lang === "hi" ? "/hi/dress-material-wholesale-surat" : "/dress-material-wholesale-surat";

  return (
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
          <ul className="mt-5 flex flex-col gap-2 text-sm text-[#121212]">
            {COPY.hero.stats.map((stat) => (
              <li key={stat.en}>{stat[lang]}</li>
            ))}
          </ul>
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
  );
}

export function ShowroomRanges({ lang }: { lang: Lang }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="showroom-ranges">
      <h2 id="showroom-ranges" className="vf-showroom-serif text-4xl sm:text-5xl">
        {lang === "hi" ? "रेंज" : "Collections"}
      </h2>
      <div className="mt-10 grid gap-14 sm:mt-14 lg:grid-cols-3 lg:gap-10">
        {SHOWROOM_TILES.map((tile) => {
          const href = lang === "hi" ? `/hi${tile.href}` : tile.href;
          return (
            <article key={tile.code} className="flex flex-col">
              <a href={href} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#e7e0d6]">
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
                <h3 className="vf-showroom-serif mt-5 text-3xl">{tile.title[lang]}</h3>
              </a>
              <p className="vf-showroom-serif mt-2 text-2xl text-[#7A1A18]">{tile.code}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#121212]/75">{tile.note[lang]}</p>
              <a
                href={designLink(lang, tile.code)}
                target="_blank"
                rel="noopener noreferrer"
                className="vf-showroom-enquire mt-5 w-full"
              >
                {ENQUIRE[lang]}
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
