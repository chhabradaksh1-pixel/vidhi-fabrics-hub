import { Globe, History, Layers } from "lucide-react";
import { Fragment, useState, type CSSProperties } from "react";

import { CountUpText } from "@/components/count-up-text";
import { HomeSearch } from "@/components/home-search";
import { LoopVideo } from "@/components/loop-video";
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

/**
 * The hero headline, word by word: each word settles out of a soft blur, a
 * beat after the one before, as the logo loader fades (showroom.css times it
 * from the loader). The text and its spaces are unchanged in the HTML; each
 * word is only wrapped, never split into letters, so Hindi conjuncts hold.
 */
function BlurWords({ text }: { text: string }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 ? " " : null}
      <span className="vf-blur-word" style={{ "--i": i } as CSSProperties}>
        {word}
      </span>
    </Fragment>
  ));
}

export function ShowroomHero({ lang, enquireHref }: { lang: Lang; enquireHref: string }) {
  const dressHref =
    lang === "hi" ? "/hi/dress-material-wholesale-surat" : "/dress-material-wholesale-surat";

  // Atelier's hero as an Apple-style media card: the photograph fills a
  // rounded plum card, a plum wash from the left (.vf-hero-shade) carries the
  // cream headline. On a phone the photo comes first and fades into the plum
  // panel that holds the text.
  return (
    <section className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-plum">
        <div className="relative aspect-[4/5] max-h-[66svh] w-full md:absolute md:inset-0 md:aspect-auto md:h-full md:max-h-none">
          <img
            src={HERO_IMAGE.src}
            srcSet={HERO_IMAGE.srcSet}
            sizes={HERO_IMAGE.sizes}
            alt={HERO_IMAGE.alt}
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[80%_center] md:object-[center_30%]"
          />
          <div className="vf-hero-shade pointer-events-none absolute inset-0" aria-hidden="true" />
        </div>
        <div className="relative px-6 pb-12 pt-6 sm:px-10 md:flex md:min-h-[min(86svh,820px)] md:items-center md:px-14 md:py-20 lg:px-20">
          <div className="max-w-xl md:max-w-[26rem] lg:max-w-[34rem]">
            <h1 className="type-display text-plumlight">
              <BlurWords
                text={
                  lang === "hi"
                    ? SHOWROOM_HEADLINE_HI
                    : lang === "hi-en"
                      ? SHOWROOM_HEADLINE_HI_EN
                      : SHOWROOM_HEADLINE
                }
              />
            </h1>
            <HomeSearch lang={lang} />
            <p lang={lang === "en" ? "hi" : lang} className="mt-4 type-lead text-plumlight">
              {SHOWROOM_SUBLINE[lang]}
            </p>
            <a
              href={enquireHref}
              target="_blank"
              rel="noopener noreferrer"
              data-hero-cta
              data-magnet
              className="btn btn-inverse btn-lg mt-8 w-auto"
            >
              {ENQUIRE[lang]}
            </a>
            <p className="mt-10 max-w-xl border-t border-plumlight/20 pt-6 type-body text-plumlight">
              {COPY.hero.body[lang]}
            </p>
            <p className="mt-3 max-w-xl type-body text-plumlight/85">{COPY.hero.regions[lang]}</p>
            <p className="mt-6">
              <a href={dressHref} className="link-arrow text-plumlight hover:text-paper">
                {COPY.hero.dressLink[lang]}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* One icon per kept stat, in COPY.hero.stats order. Decorative. */
const TRUST_ICONS = [Layers, Globe, History] as const;

/** Three kept stats, placed after the range accordion the way their trust banner sits after flooring types.
    One quiet centred line, a small plum icon before each fact, on a white band
    that runs edge to edge so it stands out from the linen page. */
export function ShowroomTrust({ lang }: { lang: Lang }) {
  return (
    <section
      aria-label={COPY.hero.stats.map((stat) => stat[lang]).join(", ")}
      className="my-8 border-y border-line bg-surface py-6 sm:my-11 sm:py-7 lg:my-14"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-[50px]">
        {/* On a phone the facts stack on the grid's left edge with each icon
            held to the first line, so a label that wraps stays beside its
            icon; from sm they sit centred in a row as before. */}
        <ul className="flex flex-col items-start gap-3 type-body text-foreground sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-12 sm:text-center">
          {COPY.hero.stats.map((stat, index) => {
            const Icon = TRUST_ICONS[index] ?? Layers;
            return (
              <li key={stat.en} className="inline-flex items-start gap-2.5 sm:items-center">
                <Icon
                  size={17}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="mt-[0.3em] shrink-0 text-plum sm:mt-0"
                />
                <CountUpText text={stat[lang]} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function ShowroomRanges({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(0);
  const [warmed, setWarmed] = useState(false);
  const tile = SHOWROOM_TILES[open] ?? SHOWROOM_TILES[0];

  // Fetch the other photos once the reader reaches for the list, so the
  // panel never swaps to a blank frame. Nothing loads for readers who scroll
  // past.
  const warm = () => {
    if (warmed) return;
    setWarmed(true);
    for (const item of SHOWROOM_TILES) new Image().src = item.image.src;
  };

  // Atelier: a plain list on the page, hairlines only, beside a panel of the
  // same height that shows the open collection. One image is in the DOM at a
  // time, as before; it is keyed by collection so a change fades the new one
  // in. A collection with a clip plays it, muted, over its photo. The panel
  // is first in the DOM; on a wide screen it moves right with `order`.
  return (
    <section
      className="mx-auto w-full max-w-[1440px] px-5 pb-8 pt-16 sm:px-8 sm:pb-11 sm:pt-22 lg:px-[50px] lg:pb-14 lg:pt-28"
      aria-labelledby="showroom-ranges"
    >
      <div className="grid gap-6 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
        <h2 id="showroom-ranges" className="type-h2 md:col-span-12 md:mb-4">
          {lang === "hi" ? "रेंज" : "Collections"}
        </h2>
        {tile ? (
          <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-sand md:order-2 md:col-span-6 md:aspect-auto md:min-h-[20rem]">
            <img
              key={tile.code}
              src={tile.image.src}
              srcSet={tile.image.srcSet}
              sizes="(min-width: 768px) 50vw, calc(100vw - 40px)"
              alt={tile.image.alt}
              width={tile.image.width}
              height={tile.image.height}
              loading="lazy"
              decoding="async"
              className="vf-range-media absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: tile.image.focus }}
            />
            {tile.video ? (
              <LoopVideo
                key={tile.video}
                src={tile.video}
                className="vf-range-media vf-range-video absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: tile.image.focus }}
              />
            ) : null}
          </div>
        ) : null}
        <ul
          className="border-t border-line md:col-span-6 md:self-start"
          onPointerEnter={warm}
          onFocus={warm}
        >
          {SHOWROOM_TILES.map((item, index) => {
            const isOpen = index === open;
            const href = lang === "hi" ? `/hi${item.href}` : item.href;
            return (
              <li key={item.code} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(index)}
                  className="group flex min-h-16 w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span
                    className={`type-h3 transition-colors ${isOpen ? "text-ink" : "text-mute group-hover:text-ink"}`}
                  >
                    {item.title[lang]}
                  </span>
                  <span aria-hidden="true" className="type-h3 leading-none text-clay">
                    {isOpen ? "×" : "+"}
                  </span>
                </button>
                <div className={isOpen ? "vf-range-panel pb-8" : "hidden"}>
                  <p className="max-w-md type-body text-mute">{item.note[lang]}</p>
                  <div className="vf-range-actions">
                    <a
                      href={designLink(lang, item.code)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary shrink-0"
                    >
                      {ENQUIRE[lang]}
                    </a>
                    <a href={href} className="link-arrow shrink-0">
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
