import { useEffect, useRef, type ReactNode } from "react";

import logoMark from "@/assets/vidhi-logo-mark.webp";
import {
  CHAT,
  CHAT_LINK,
  COLLECTION_INTRO,
  ENQUIRE,
  HERO_ALT,
  HERO_BODY,
  HERO_HEADLINE,
  HERO_IMAGE,
  HERO_LINK,
  PLACEHOLDER,
  PREVIEW_HOME,
  PREVIEW_SUITS,
  SUIT_DESIGNS,
  TILES,
  TRUST,
  designLink,
  type PreviewDesign,
} from "@/content/preview-showroom";

import "@/styles/preview.css";

export function PreviewHome() {
  return (
    <PreviewShell>
      <section className="md:relative">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#e7e0d6] sm:aspect-[5/4] md:absolute md:inset-0 md:aspect-auto md:h-full">
          <img
            src={HERO_IMAGE.src}
            alt={HERO_ALT}
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[72%_center] md:object-center"
          />
          <PlaceholderMark />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 md:flex md:min-h-[640px] md:items-center md:py-16">
          <div className="max-w-xl md:max-w-[22rem] lg:max-w-[30rem]">
            <h1 className="vf-preview-serif text-[2.35rem] leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
              {HERO_HEADLINE}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#121212]/80">{HERO_BODY}</p>
            <Enquire href={HERO_LINK} className="mt-8 w-full sm:w-auto" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24" aria-labelledby="preview-ranges">
        <h2 id="preview-ranges" className="vf-preview-serif text-4xl sm:text-5xl">
          Collections
        </h2>
        <div className="mt-10 grid gap-14 sm:mt-14 lg:grid-cols-3 lg:gap-10">
          {TILES.map((tile) => (
            <article key={tile.code} className="flex flex-col">
              {tile.href ? (
                <a href={tile.href} className="block">
                  <Shot image={tile.image} alt={tile.alt} />
                  <h3 className="vf-preview-serif mt-5 text-3xl">{tile.title}</h3>
                </a>
              ) : (
                <>
                  <Shot image={tile.image} alt={tile.alt} />
                  <h3 className="vf-preview-serif mt-5 text-3xl">{tile.title}</h3>
                </>
              )}
              <p className="vf-preview-serif mt-2 text-2xl text-[#7A1A18]">{tile.code}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#121212]/75">{tile.note}</p>
              <Enquire href={designLink(tile.code)} className="mt-5 w-full" />
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#7A1A18]/15" aria-label="Notes on the business">
        <ul className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {TRUST.map((item) => (
            <li key={item} className="vf-preview-serif text-2xl leading-snug sm:text-3xl">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </PreviewShell>
  );
}

export function PreviewCollection() {
  return (
    <PreviewShell>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <h1 className="vf-preview-serif text-5xl leading-none sm:text-7xl">Unstitched suits</h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#121212]/80">{COLLECTION_INTRO}</p>
        <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3">
          {SUIT_DESIGNS.map((design) => (
            <DesignCard key={design.code} design={design} />
          ))}
        </div>
      </section>
    </PreviewShell>
  );
}

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div className="vf-preview min-h-screen pb-28">
      <header className="border-b border-[#7A1A18]/15 bg-[#F6F1EA]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href={PREVIEW_HOME} className="flex items-center gap-3" aria-label="Vidhi Fabrics">
            <img
              src={logoMark}
              alt=""
              width={210}
              height={200}
              className="h-11 w-auto sm:h-12"
              decoding="async"
            />
            <span className="vf-preview-serif text-[1.65rem] leading-none">Vidhi Fabrics</span>
          </a>
          <nav aria-label="Preview" className="flex items-center gap-4 text-sm">
            <a href={PREVIEW_HOME} className="hover:text-[#7A1A18]">
              Home
            </a>
            <a href={PREVIEW_SUITS} className="hover:text-[#7A1A18]">
              Suits
            </a>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-[#7A1A18]/15 px-5 py-8 text-sm text-[#121212]/70 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <p>Vidhi Fabrics, Surat</p>
          <a href="/" className="underline decoration-[#7A1A18]/30 underline-offset-4 hover:text-[#7A1A18]">
            Current website
          </a>
        </div>
      </footer>
      <PreviewChat />
    </div>
  );
}

function Shot({
  image,
  alt,
}: {
  image: { src: string; width: number; height: number; focus: "top" | "center" };
  alt: string;
}) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-[#e7e0d6]">
      <img
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: image.focus }}
      />
      <PlaceholderMark />
    </div>
  );
}

function DesignCard({ design }: { design: PreviewDesign }) {
  return (
    <article>
      <Shot image={design.image} alt={design.alt} />
      <p className="vf-preview-serif mt-4 text-3xl text-[#7A1A18]">{design.code}</p>
      <Enquire href={designLink(design.code)} className="mt-4 w-full" />
    </article>
  );
}

function Enquire({ href, className }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`vf-preview-enquire ${className ?? ""}`}
    >
      {ENQUIRE}
    </a>
  );
}

function PlaceholderMark() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-3 top-3 bg-[#7A1A18] px-2 py-1 text-[11px] tracking-wide text-[#F6F1EA]"
    >
      {PLACEHOLDER}
    </span>
  );
}

function PreviewChat() {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const still = useRef(true);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    still.current = !fine || reduce;
  }, []);

  function onMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (still.current) return;
    const el = event.currentTarget;
    const box = el.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;
    const tx = clamp((event.clientX - (box.left + box.width / 2)) * 0.18, -10, 10);
    const ty = clamp((event.clientY - (box.top + box.height / 2)) * 0.18, -8, 8);
    el.style.setProperty("--vf-lx", `${x}%`);
    el.style.setProperty("--vf-ly", `${y}%`);
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  }

  function onLeave(event: React.MouseEvent<HTMLAnchorElement>) {
    const el = event.currentTarget;
    el.style.removeProperty("--vf-lx");
    el.style.removeProperty("--vf-ly");
    el.style.transform = "";
  }

  return (
    <a
      ref={linkRef}
      href={CHAT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="vf-preview-chat"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="vf-preview-chat-face">
        <span className="text-sm">{CHAT}</span>
        <span className="vf-preview-chat-dot">
          <WhatsAppGlyph />
        </span>
      </span>
    </a>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      className="vf-preview-chat-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.8.6.6-3.7-.2-.3A9 9 0 1 1 12 21zm4.9-6.7c-.3-.1-1.5-.8-1.8-.8s-.4-.1-.6.2-.7.8-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.5l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.3 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.5 4 4 4 0 0 0 2.6.3 2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2c-.1-.2-.3-.2-.6-.3z" />
    </svg>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
