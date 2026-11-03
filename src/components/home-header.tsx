import { Search } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteNavLinks } from "@/components/site-nav-links";
import { HEADER_PANEL_COLUMN } from "@/lib/header-classes";
import { SEARCH_OPEN } from "@/content/home-search";
import { COPY, type Lang } from "@/content/translations";

/**
 * The homepage bar, on the shared SiteHeader: section links in the middle on a
 * wide screen, language, search and the WhatsApp call to action on the right.
 * Below xl the links live in the separate panel opened by the menu button.
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
  const home = route === "hi" ? "/hi" : "/";
  const links = <SiteNavLinks lang={lang} />;

  return (
    <>
      {/* How far down this long page the reader is (pure CSS, showroom.css). */}
      <div className="vf-scroll-progress" aria-hidden="true" />
      <SiteHeader
        homeHref={home}
        menuLabel={lang === "hi" ? "मेनू" : "Menu"}
        menuId="home-menu"
        tagline={
          <span className="type-label hidden text-mute 2xl:block">{COPY.established[lang]}</span>
        }
        nav={() => (
          <nav
            aria-label={lang === "hi" ? "मुख्य नेविगेशन" : "Primary"}
            className="hidden flex-1 items-center gap-1 xl:ml-8 xl:flex"
          >
            {links}
          </nav>
        )}
        actions={
          <>
            <div className="hidden md:block">
              <LanguageSwitch lang={lang} setLang={setLang} route={route} />
            </div>
            <button
              type="button"
              className="grid size-11 shrink-0 place-items-center rounded-full md:size-9 text-ink ring-1 ring-line transition-colors hover:bg-surface"
              aria-label={SEARCH_OPEN[lang]}
              onClick={() => {
                const field = document.getElementById("home-search");
                if (!(field instanceof HTMLInputElement)) return;
                field.scrollIntoView({ block: "center", behavior: "auto" });
                field.focus();
              }}
            >
              <Search size={18} aria-hidden="true" />
            </button>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm shrink-0 sm:px-4"
            >
              {COPY.nav.cta[lang]}
            </a>
          </>
        }
        panel={(open) => (
          <nav
            id="home-menu"
            hidden={!open}
            aria-label={lang === "hi" ? "अनुभाग" : "Sections"}
            className="border-t border-line xl:hidden"
          >
            <div
              className={`mx-auto w-full max-w-[1440px] px-5 py-2 sm:px-8 ${HEADER_PANEL_COLUMN}`}
            >
              {links}
              <div className="py-4 md:hidden">
                <LanguageSwitch lang={lang} setLang={setLang} route={route} />
              </div>
            </div>
          </nav>
        )}
      />
    </>
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
    <div className="segmented" role="group" aria-label="Language">
      <a href="/" {...(enOn ? { "aria-current": "page" as const } : {})}>
        EN
      </a>
      <a href="/hi" {...(hiOn ? { "aria-current": "page" as const } : {})}>
        हिंदी
      </a>
      <button
        type="button"
        onClick={() => setLang(route === "hi" && lang === "hi-en" ? "hi" : "hi-en")}
        aria-pressed={lang === "hi-en"}
        title="Hinglish"
      >
        Hinglish
      </button>
    </div>
  );
}
