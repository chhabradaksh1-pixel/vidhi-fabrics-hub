import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import cotton from "@/assets/fabric-cotton-linen.jpg";
import jacquard from "@/assets/fabric-katan-jacquard.jpg";
import { JOURNAL, readingMinutes, type JournalArticle } from "@/content/journal";
import type { Lang } from "@/content/translations";
import { MINUTES_LABEL, SECTION_COPY } from "@/content/section-copy";

export function StoryLinks({ lang = "en" }: { lang?: Lang }) {
  const copy = SECTION_COPY[lang];
  return (
    <>
      <a href="#about" className="transition-colors hover:text-clay">
        {copy.about}
      </a>
      <a href={lang === "hi" ? "/hi/blog" : "/blog"} className="transition-colors hover:text-clay">
        {copy.desk}
      </a>
    </>
  );
}

export function AboutSection({ lang, whatsappUrl }: { lang: Lang; whatsappUrl: string }) {
  const copy = SECTION_COPY[lang];
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-36 border-b border-line bg-sand"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
        <div className="relative pb-12 pr-10 sm:pr-16">
          <img
            src={jacquard}
            alt="Rust-red fabric with intricate woven motifs"
            width={1024}
            height={768}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-[48%] border-8 border-sand">
            <img
              src={cotton}
              alt="Soft cream fabric with a visible weave"
              width={1024}
              height={768}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover"
            />
          </div>
          <p className="absolute bottom-3 left-0 max-w-[45%] font-mono text-[10px] uppercase leading-relaxed tracking-widest text-mute">
            {copy.detail}
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-clay">{copy.marker}</p>
          <h2
            id="about-heading"
            className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.12] tracking-tight lg:text-5xl"
          >
            {copy.title}
            <span className="mt-2 block text-clay">{copy.titleEnd}</span>
          </h2>
          <p className="mt-7 leading-relaxed text-mute">{copy.body}</p>
          <p className="mt-4 leading-relaxed text-mute">{copy.bodyEnd}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-4 bg-clay px-6 py-4 text-sm font-medium text-paper transition-colors hover:bg-claydeep"
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
}: {
  article: JournalArticle;
  number: number;
  lang?: Lang;
  readLabel?: string;
  href?: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden">
      <a
        href={href ?? `/blog/${article.slug}`}
        className="flex h-full flex-col"
        aria-label={`${readLabel}: ${article.title[lang]}`}
      >
        <div className="relative overflow-hidden bg-sand">
          <img
            src={article.image}
            alt={article.imageAlt[lang]}
            width={1024}
            height={768}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none"
          />
          <span className="absolute left-4 top-4 bg-paper px-3 py-2 font-mono text-xs text-clay">
            {String(number).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-1 flex-col pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-clay">
            {article.category[lang]} · {readingMinutes(article, lang)} {MINUTES_LABEL[lang]}
          </p>
          <h3 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight">
            {article.title[lang]}
          </h3>
          <p className="mb-7 mt-3 text-sm leading-relaxed text-mute">{article.excerpt[lang]}</p>
          <span className="mt-auto flex items-center justify-between border-t border-line pt-5 text-sm font-medium text-clay">
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
  const base = lang === "hi" ? "/hi/blog" : "/blog";

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
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {JOURNAL.map((article, index) => (
          <div
            key={article.slug}
            className="min-w-0 shrink-0 basis-[85%] snap-start sm:basis-[48%] lg:basis-[31%]"
          >
            <JournalCard
              article={article}
              number={index + 1}
              lang={lang}
              readLabel={copy.read}
              href={`${base}/${article.slug}`}
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
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-clay">
              {copy.journal}
            </p>
            <h2
              id="fabric-desk-heading"
              className="mt-4 font-display text-4xl font-semibold tracking-tight lg:text-5xl"
            >
              Surat Fabric Desk<span className="text-clay">.</span>
            </h2>
            <p className="mt-4 text-mute">{copy.subtitle}</p>
          </div>
          <a
            href={lang === "hi" ? "/hi/blog" : "/blog"}
            className="inline-flex items-center gap-3 border-b border-clay pb-2 text-sm font-medium text-clay"
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
  const base =
    "px-2 py-2 font-mono text-xs transition-colors sm:px-3 " +
    "aria-[current=page]:bg-ink aria-[current=page]:text-paper";
  const active = "bg-ink text-paper";
  const idle = "text-mute hover:text-ink";

  return (
    <div
      className="flex overflow-hidden rounded-sm ring-1 ring-line"
      role="group"
      aria-label="Language"
    >
      {paths ? (
        <>
          <a
            href={paths.en}
            {...(lang === "en" ? { "aria-current": "page" as const } : {})}
            className={`${base} ${lang === "en" ? active : idle}`}
          >
            EN
          </a>
          <a
            href={paths.hi}
            {...(lang === "hi" ? { "aria-current": "page" as const } : {})}
            className={`${base} ${lang === "hi" ? active : idle}`}
          >
            हिंदी
          </a>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            className={`${base} ${lang === "en" ? active : idle}`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("hi")}
            aria-pressed={lang === "hi"}
            className={`${base} ${lang === "hi" ? active : idle}`}
          >
            हिंदी
          </button>
        </>
      )}
      <button
        type="button"
        onClick={() => setLang("hi-en")}
        aria-pressed={lang === "hi-en"}
        className={`${base} ${lang === "hi-en" ? active : idle}`}
      >
        Hinglish
      </button>
    </div>
  );
}

export function JournalHeader({
  lang = "en",
  setLang,
  paths,
}: {
  lang?: Lang;
  setLang?: (l: Lang) => void;
  paths?: { en: string; hi: string };
}) {
  const copy = SECTION_COPY[lang];
  const home = lang === "hi" ? "/hi" : "/";
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-3 gap-y-3 px-6 py-5">
        <a
          href={home}
          aria-label="Vidhi Fabrics — go to the homepage"
          className="font-display text-2xl font-semibold tracking-tight transition-colors hover:text-clay sm:whitespace-nowrap"
        >
          Vidhi Fabrics
        </a>
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-4 text-sm sm:gap-5"
        >
          <a href={`${home}#catalogue`} className="hover:text-clay">
            {copy.navCatalogue}
          </a>
          <a href={`${home}#about`} className="hover:text-clay">
            {copy.navAbout}
          </a>
          <a href={lang === "hi" ? "/hi/blog" : "/blog"} className="text-clay">
            {copy.navDesk}
          </a>
          <a href={`${home}#contact`} className="hover:text-clay">
            {copy.navContact}
          </a>
        </nav>
        {setLang ? (
          <JournalLangSwitch lang={lang} setLang={setLang} {...(paths ? { paths } : {})} />
        ) : null}
      </div>
    </header>
  );
}

export function JournalFooter({ lang = "en" }: { lang?: Lang }) {
  const copy = SECTION_COPY[lang];
  const home = lang === "hi" ? "/hi" : "/";
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-5 px-6 py-8 text-sm text-mute">
        <a href={home}>{copy.footerHome}</a>
        <a href={`${home}#catalogue`} className="inline-flex items-center gap-2 text-clay">
          {copy.footerCta}
          <ArrowDown className="-rotate-90" size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
