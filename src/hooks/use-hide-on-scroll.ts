import { useEffect, useRef, useState } from "react";

/** Scroll distance, in px, that counts as a deliberate move in one direction. */
const MIN_DELTA = 6;

/** How long the bar stays put after a jump to a section on the same page. */
const JUMP_HOLD_MS = 1500;

/** On a mouse, coming this close to the top of the window brings the bar back. */
const POINTER_REVEAL_PX = 72;

/**
 * True while a sticky bar should be tucked away: the reader is scrolling down
 * and is past the top of the page. Any scroll up brings it back, as does
 * reaching the top. Woodwrights' navigation behaves this way.
 *
 * Two things keep the bar from vanishing just when it is wanted:
 * - Following a link to a section on the same page (Catalogue, Contact) scrolls
 *   the page down. That is the bar being used, not the reader reading on, so
 *   the bar stays for the length of the smooth scroll and the next link is
 *   still there.
 * - On a mouse, moving the pointer up to the top of the window brings the bar
 *   back, so a reader does not have to scroll up to reach a hidden link.
 *
 * Pass `disabled` while something inside the bar is open (the mobile menu), so
 * it cannot slide away under the reader's finger. The first render is always
 * visible, so server and client markup agree. The handler runs on the scroll
 * event itself: `setHidden` only re-renders when the value flips, so there is
 * nothing to throttle.
 */
export function useHideOnScroll(disabled: boolean, revealAbove = 96): boolean {
  const [hidden, setHidden] = useState(false);
  const holdUntil = useRef(0);

  // A click on a link to a place on this page: hold the bar while it scrolls.
  // Listening even while the phone menu is open, since that is where the
  // click comes from; the menu then closes and the effect below re-runs.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || !link.hash) return;
      if (link.origin !== location.origin || link.pathname !== location.pathname) return;
      holdUntil.current = performance.now() + JUMP_HOLD_MS;
      setHidden(false);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (disabled) {
      setHidden(false);
      return;
    }

    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y <= revealAbove || performance.now() < holdUntil.current) {
        setHidden(false);
        lastY = y;
      } else if (delta > MIN_DELTA) {
        setHidden(true);
        lastY = y;
      } else if (delta < -MIN_DELTA) {
        setHidden(false);
        lastY = y;
      }
    };

    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onPointerMove = (event: PointerEvent) => {
      if (event.clientY <= POINTER_REVEAL_PX && mouse.matches) {
        setHidden(false);
        lastY = window.scrollY;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, [disabled, revealAbove]);

  return hidden;
}
