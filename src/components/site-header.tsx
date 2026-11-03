import { Menu, X } from "lucide-react";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import logoMark from "@/assets/vidhi-logo-mark.webp";

/**
 * The one header bar every page shares: menu button and logo on the left,
 * links in the middle on a wide screen, language and actions on the right.
 * It is sticky and tucks away while the reader scrolls down
 * (use-hide-on-scroll.ts), returning on any scroll up.
 *
 * Below xl the links live in a panel opened by the menu button. `nav` is the
 * header's links; `panel`, when given, is a separate phone panel rendered under
 * the bar (the home page keeps its own). Without `panel`, `nav` receives the
 * open state and is itself the phone panel, so each link is in the page once.
 *
 * HomeHeader and JournalHeader are thin wrappers that both pass in the same
 * links (SiteNavLinks), so the two bars cannot drift apart again.
 */
export function SiteHeader({
  homeHref,
  menuLabel,
  menuId,
  tagline,
  nav,
  actions,
  panel,
}: {
  homeHref: string;
  menuLabel: string;
  menuId: string;
  tagline?: ReactNode;
  nav: (open: boolean) => ReactNode;
  actions?: ReactNode;
  panel?: (open: boolean) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const hidden = useHideOnScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Following a link from the open panel closes it, including in-page anchors.
  const closeOnLink = (event: MouseEvent<HTMLElement>) => {
    if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
  };

  return (
    <header
      data-hide-on-scroll
      data-hidden={hidden}
      onClick={closeOnLink}
      className="sticky top-0 z-50 border-b border-line bg-linen/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1440px] items-center gap-3 px-5 py-3 sm:px-8 lg:px-[50px]">
        <button
          type="button"
          className="-ml-2.5 grid size-11 shrink-0 place-items-center text-ink xl:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={menuLabel}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>

        <a
          href={homeHref}
          aria-label="Vidhi Fabrics — go to the homepage"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80"
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
          {tagline}
        </a>

        {nav(open)}

        <div className="ml-auto flex items-center gap-2 sm:gap-3">{actions}</div>
      </div>

      {panel ? panel(open) : null}
    </header>
  );
}
