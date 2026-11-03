/** Every header link, in the desktop row and in the phone panel. */
export const HEADER_LINK =
  "type-nav text-mute transition-colors hover:text-ink aria-[current=page]:text-ink";

/** The phone panel's column of links, used by both headers. */
export const HEADER_PANEL_COLUMN = "flex flex-col [&>a]:border-b [&>a]:border-line [&>a]:py-3.5";

/**
 * Classes for a `nav` that is the desktop row on xl and, below it, the phone
 * panel dropped under the bar while the menu is open (see SiteHeader).
 */
export function inlineNavClass(open: boolean) {
  return [
    "xl:ml-8 xl:flex xl:flex-1 xl:items-center xl:gap-1",
    open ? "max-xl:block" : "max-xl:hidden",
    "max-xl:absolute max-xl:inset-x-0 max-xl:top-full max-xl:border-b max-xl:border-line max-xl:bg-linen max-xl:px-5 max-xl:py-2 sm:max-xl:px-8",
    "max-xl:[&>a]:block max-xl:[&>a]:border-b max-xl:[&>a]:border-line max-xl:[&>a]:py-3.5 max-xl:[&>a:last-of-type]:border-b-0",
  ].join(" ");
}
