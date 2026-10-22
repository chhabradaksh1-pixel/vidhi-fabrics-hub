import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { StoryLinks } from "@/components/fabric-desk";
import { COPY, type Lang } from "@/content/translations";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import logoMark from "@/assets/vidhi-logo-mark.webp";

/**
 * Homepage bar mapped onto Flooring Xtra's navbar grid: mark on the left,
 * section links in the middle on a wide screen, language and the WhatsApp
 * pill on the right. Below xl the links live in a panel opened by the
 * button, so the bar stays one row.
 */
export function HomeHeader({
  lang,
  setLang,
  whatsAppHref,
  route,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  whatsAppHref: string;
  route: "en" | "hi";
}) {
  const [open, setOpen] = useState(false);
  const hidden = useHideOnScroll(open);
  const home = route === "hi" ? "/hi" : "/";
  const scaleHref = route === "hi" ? "/hi/about#scale" : "/about#scale";

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = "transition-colors hover:text-ink";

  return (
    <header
      data-hide-on-scroll
      data-hidden={hidden}
      className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur"
    >
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1440px] items-center gap-3 px-5 py-3 sm:px-8 lg:px-[50px]">
        <button
          type="button"
          className="grid size-11 shrink-0 place-items-center text-ink xl:hidden"
          aria-expanded={open}
          aria-controls="home-menu"
          aria-label={lang === "hi" ? "मेनू" : "Menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>

        <a
          href={home}
          aria-label="Vidhi Fabrics — go to the homepage"
          className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
        >
          <img
            src={logoMark}
            alt="Vidhi Fabrics"
            width={210}
            height={200}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-12 w-auto sm:h-14"
          />
          <span className="hidden font-mono text-xs uppercase tracking-label text-mute 2xl:block">
            {COPY.established[lang]}
          </span>
        </a>

        <nav
          aria-label={lang === "hi" ? "मुख्य नेविगेशन" : "Primary"}
          className="hidden flex-1 items-center justify-center gap-6 font-mono text-xs uppercase tracking-label text-mute xl:flex"
        >
          <a href="#catalogue" className={linkClass}>
            {COPY.nav.catalogue[lang]}
          </a>
          <a href={scaleHref} className={linkClass}>
            {COPY.nav.scale[lang]}
          </a>
          <a href="#contact" className={linkClass}>
            {COPY.nav.contact[lang]}
          </a>
          <StoryLinks lang={lang} />
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitch lang={lang} setLang={setLang} route={route} />
          </div>
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] shrink-0 items-center justify-center rounded-full bg-clay px-4 py-2 text-center font-mono text-xs uppercase leading-tight tracking-label text-paper transition-colors hover:bg-claydeep sm:px-5 sm:text-xs"
          >
            {COPY.nav.cta[lang]}
          </a>
        </div>
      </div>

      <nav
        id="home-menu"
        hidden={!open}
        aria-label={lang === "hi" ? "अनुभाग" : "Sections"}
        className="border-t border-line xl:hidden"
        onClick={(event) => {
          if (event.target instanceof HTMLAnchorElement) setOpen(false);
        }}
      >
        <div className="mx-auto flex w-full max-w-[1440px] flex-col px-5 py-2 font-mono text-xs uppercase tracking-label text-mute sm:px-8 [&>a]:border-b [&>a]:border-line [&>a]:py-3.5">
          <a href="#catalogue" className={linkClass}>
            {COPY.nav.catalogue[lang]}
          </a>
          <a href={scaleHref} className={linkClass}>
            {COPY.nav.scale[lang]}
          </a>
          <a href="#contact" className={linkClass}>
            {COPY.nav.contact[lang]}
          </a>
          <StoryLinks lang={lang} />
          <div className="py-4 md:hidden">
            <LanguageSwitch lang={lang} setLang={setLang} route={route} />
          </div>
        </div>
      </nav>
    </header>
  );
}

function LanguageSwitch({
  lang,
  setLang,
  route,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  route: "en" | "hi";
}) {
  const enOn = route === "en";
  const hiOn = route === "hi";

  return (
    <div
      className="flex overflow-hidden rounded-sm ring-1 ring-line"
      role="group"
      aria-label="Language"
    >
      <a
        href="/"
        {...(enOn ? { "aria-current": "page" as const } : {})}
        className={`px-3 py-2 font-mono text-sm transition-colors ${
          enOn ? "bg-clay text-paper" : "text-mute hover:text-ink"
        }`}
      >
        EN
      </a>
      <a
        href="/hi"
        {...(hiOn ? { "aria-current": "page" as const } : {})}
        className={`px-3 py-2 font-mono text-sm transition-colors ${
          hiOn ? "bg-clay text-paper" : "text-mute hover:text-ink"
        }`}
      >
        हिंदी
      </a>
      <button
        type="button"
        onClick={() => setLang(route === "hi" && lang === "hi-en" ? "hi" : "hi-en")}
        aria-pressed={lang === "hi-en"}
        title="Hinglish"
        className={`px-3 py-2 font-mono text-sm transition-colors ${
          lang === "hi-en" ? "bg-clay text-paper" : "text-mute hover:text-ink"
        }`}
      >
        Hinglish
      </button>
    </div>
  );
}
