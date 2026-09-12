import { Linkedin } from "lucide-react";
import type { ReactNode } from "react";

import { COPY, type Lang } from "@/content/translations";

/**
 * Shared header/footer for the secondary pages (/blog and articles).
 * The home routes (/ and /hi) keep their own inline chrome so that the
 * existing, working landing page is not disturbed.
 */
export function SiteHeader({ lang, children }: { lang: Lang; children?: ReactNode }) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-3 px-6 py-3 md:h-16 md:flex-nowrap md:py-0">
        <a href="/" className="flex shrink-0 items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight sm:whitespace-nowrap">
            {COPY.brand[lang]}
          </span>
          <span className="hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.15em] text-mute xl:block">
            {COPY.established[lang]}
          </span>
        </a>

        <nav className="order-3 flex w-full flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.12em] text-mute lg:order-none lg:w-auto lg:flex-nowrap lg:whitespace-nowrap xl:gap-x-7">
          <a href="/#about" className="transition-colors hover:text-ink">
            {COPY.nav.about[lang]}
          </a>
          <a href="/#catalogue" className="transition-colors hover:text-ink">
            {COPY.nav.catalogue[lang]}
          </a>
          <a href="/#desk" className="transition-colors hover:text-ink">
            {COPY.nav.desk[lang]}
          </a>
          <a href="/blog" className="text-ink transition-colors">
            {COPY.nav.journal[lang]}
          </a>
          <a href="/#contact" className="transition-colors hover:text-ink">
            {COPY.nav.contact[lang]}
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-3">{children}</div>
      </div>
    </header>
  );
}

export function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const options: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिंदी" },
    { code: "hi-en", label: "Hinglish" },
  ];

  return (
    <div
      className="flex overflow-hidden rounded-sm ring-1 ring-line"
      role="group"
      aria-label="Language"
    >
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLang(o.code)}
          aria-pressed={lang === o.code}
          className={`px-3 py-2 font-mono text-sm transition-colors ${
            lang === o.code ? "bg-ink text-paper" : "text-mute hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
        <span>{COPY.footer.left[lang]}</span>
        <div className="flex items-center gap-6">
          <a href="/blog" className="transition-colors hover:text-ink">
            {COPY.nav.journal[lang]}
          </a>
          <a
            href="https://www.linkedin.com/company/vidhi-fabricss/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Vidhi Fabrics on LinkedIn"
            className="inline-flex items-center justify-center transition-colors hover:text-ink"
          >
            <Linkedin size={20} />
          </a>
        </div>
        <span>{COPY.footer.right[lang]}</span>
      </div>
    </footer>
  );
}
