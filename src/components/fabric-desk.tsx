import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import loom from "@/assets/about-weaving-loom.webp";
import loom640 from "@/assets/about-weaving-loom-640.webp";
import { JOURNAL, articleHref, readingMinutes, type JournalArticle } from "@/content/journal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteNavLinks } from "@/components/site-nav-links";
import { inlineNavClass } from "@/lib/header-classes";
import type { Lang } from "@/content/translations";
import { MINUTES_LABEL, SECTION_COPY } from "@/content/section-copy";

export function AboutSection({ lang, whatsappUrl }: { lang: Lang; whatsappUrl: string }) {
  const copy = SECTION_COPY[lang];
  return (
    <section id="about" data-reveal aria-labelledby="about-heading" className="scroll-mt-36">
      {/* "the PROCESS": the marker and heading sit on the loom photograph over
          a dark wash; the story and the call to action sit beside it. The
          photo and the overlay share one grid cell, so the DOM order (marker,
          heading, story) is unchanged. */}
      <div className="mx-auto grid w-full max-w-[1440px] gap-y-10 px-5 py-8 sm:px-8 sm:py-11 lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:px-[50px] lg:py-14">
        <img
          src={loom}
          srcSet={`${loom640} 640w, ${loom} 1000w`}
          sizes="(min-width: 1024px) 760px, calc(100vw - 40px)"
          alt={copy.loomAlt}
          width={1000}
          height={667}
          loading="lazy"
          decoding="async"
          className="col-[1/-1] row-[1] aspect-[4/3] h-full w-full rounded-[var(--radius-card)] object-cover lg:col-[1/8]"
        />
        <div className="relative col-[1/-1] row-[1] self-end rounded-b-[var(--radius-card)] bg-gradient-to-t from-plumdeep/95 via-plumdeep/80 via-65% to-transparent px-6 pb-8 pt-24 sm:px-10 sm:pt-32 sm:pb-11 lg:col-[1/8]">
          <p className="eyebrow type-label text-plumlight">{copy.marker}</p>
          <h2 id="about-heading" className="mt-4 type-h1 text-plumlight">
            {copy.title}
          </h2>
        </div>
        <div className="lg:col-[9/13] lg:row-[1]">
          <p className="max-w-[42ch] type-lead text-mute">{copy.support}</p>
          <p className="mt-4 max-w-[42ch] type-body text-mute">{copy.reach}</p>
          <p className="mt-6 border-t border-line pt-5 type-label text-mute">{copy.detail}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg mt-8"
          >
            {copy.cta}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function JournalCard({
  article,
  number,
  lang = "en",
  readLabel = "Read article",
  href,
  /**
   * The card title's heading level. Cards sit under a section heading on the
   * home page, so h3 is right there; on the journal index the page heading is
   * the h1 and the cards are the next level down, so that route passes 2.
   */
  headingLevel = 3,
}: {
  article: JournalArticle;
  number: number;
  lang?: Lang;
  readLabel?: string;
  href?: string;
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  // The home catalogue's range card (RangeCard in fabric-catalogue.tsx): a
  // white card with the photo inset in a rounded frame, then the tag, title
  // and line on the card itself. It reveals as the range card does: the whole
  // card fades up, staggered by its grid (data-reveal-stagger).
  return (
    <article data-reveal className="card group flex h-full flex-col p-2.5">
      <a
        href={href ?? articleHref(article, lang)}
        className="flex h-full flex-col rounded-[var(--radius-card)]"
        aria-label={`${readLabel}: ${article.title[lang]}`}
      >
        <div className="card-media relative bg-sand">
          <img
            src={article.image}
            alt={article.imageAlt[lang]}
            width={1024}
            height={768}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none"
          />
          <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-3 py-1.5 type-label text-plum">
            {String(number).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
          <p className="type-label text-plum">
            {article.category[lang]} · {readingMinutes(article, lang)} {MINUTES_LABEL[lang]}
          </p>
          <Heading className="mt-2 type-h4">{article.title[lang]}</Heading>
          <p className="mb-6 mt-2 type-small text-mute">{article.excerpt[lang]}</p>
          <span className="mt-auto flex items-center justify-between border-t border-line pt-4 type-button text-plum">
            {readLabel}
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
      </a>
    </article>
  );
}

/**
 * Horizontal, snap-scrolling rail of guide cards with arrow controls.
 *
 * Three cards sit in view on desktop, as the grid did, with the next one
 * peeking past the edge so it is visible that the row continues. Scrolling is
 * native CSS scroll-snap, so touch swiping and trackpad gestures work without
 * a carousel library; the arrows drive the same scroll container.
 */
function JournalRail({ lang, copy }: { lang: Lang; copy: (typeof SECTION_COPY)["en"] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    // A one-pixel tolerance: fractional scroll widths never land exactly.
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  function scrollByCard(direction: -1 | 1) {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * step, behavior: reduced ? "auto" : "smooth" });
  }

  const arrow =
    "grid size-11 place-items-center rounded-full border border-line bg-paper text-ink " +
    "transition-colors hover:border-clay hover:text-clay disabled:pointer-events-none " +
    "disabled:opacity-0 motion-reduce:transition-none";

  return (
    <div className="relative">
      <div
        ref={rail}
        onScroll={measure}
        data-reveal-stagger
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {JOURNAL.map((article, index) => (
          <div
            key={article.slug}
            data-reveal
            className="min-w-0 shrink-0 basis-[85%] snap-start sm:basis-[48%] lg:basis-[31%]"
          >
            <JournalCard
              article={article}
              number={index + 1}
              lang={lang}
              readLabel={copy.read}
              href={articleHref(article, lang)}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => scrollByCard(-1)}
        disabled={atStart}
        aria-label={copy.scrollPrev}
        className={`${arrow} absolute left-2 top-1/2 -translate-y-1/2`}
      >
        <ArrowLeft size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(1)}
        disabled={atEnd}
        aria-label={copy.scrollNext}
        className={`${arrow} absolute right-2 top-1/2 -translate-y-1/2`}
      >
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

export function FabricDeskSection({ lang = "en" }: { lang?: Lang }) {
  const copy = SECTION_COPY[lang];
  return (
    <section
      id="fabric-desk"
      aria-labelledby="fabric-desk-heading"
      className="scroll-mt-36 border-b border-line bg-paper"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="type-label text-clay">{copy.journal}</p>
            <h2 id="fabric-desk-heading" className="mt-4 type-h2">
              Surat Fabric Desk
            </h2>
            <p className="mt-4 text-mute">{copy.subtitle}</p>
          </div>
          <a
            href={lang === "hi" ? "/hi/blog" : "/blog"}
            className="inline-flex items-center gap-3 border-b border-clay pb-2 type-button text-clay"
          >
            {copy.browse}
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
        <JournalRail lang={lang} copy={copy} />
      </div>
    </section>
  );
}

export function JournalLangSwitch({
  lang,
  setLang,
  paths,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  paths?: { en: string; hi: string };
}) {
  return (
    <div className="segmented" role="group" aria-label="Language">
      {paths ? (
        <>
          <a href={paths.en} {...(lang === "en" ? { "aria-current": "page" as const } : {})}>
            EN
          </a>
          <a href={paths.hi} {...(lang === "hi" ? { "aria-current": "page" as const } : {})}>
            हिंदी
          </a>
        </>
      ) : (
        <>
          <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"}>
            EN
          </button>
          <button type="button" onClick={() => setLang("hi")} aria-pressed={lang === "hi"}>
            हिंदी
          </button>
        </>
      )}
      <button type="button" onClick={() => setLang("hi-en")} aria-pressed={lang === "hi-en"}>
        Hinglish
      </button>
    </div>
  );
}

/** The bar on every page other than the two home routes. */
export function JournalHeader({
  lang = "en",
  setLang,
  paths,
}: {
  lang?: Lang;
  setLang?: (l: Lang) => void;
  paths?: { en: string; hi: string };
}) {
  const home = lang === "hi" ? "/hi" : "/";

  return (
    <SiteHeader
      homeHref={home}
      menuLabel={lang === "hi" ? "मेनू" : "Menu"}
      menuId="site-menu"
      nav={(open) => (
        <nav id="site-menu" aria-label="Main navigation" className={inlineNavClass(open)}>
          <SiteNavLinks lang={lang} />
        </nav>
      )}
      actions={
        setLang ? (
          <JournalLangSwitch lang={lang} setLang={setLang} {...(paths ? { paths } : {})} />
        ) : null
      }
    />
  );
}

export function JournalFooter({ lang = "en" }: { lang?: Lang }) {
  return <SiteFooter lang={lang} />;
}
