import { useEffect, useState } from "react";

/** Scroll distance, in px, that counts as a deliberate move in one direction. */
const MIN_DELTA = 6;

/**
 * True while a sticky bar should be tucked away: the reader is scrolling down
 * and is past the top of the page. Any scroll up brings it back, as does
 * reaching the top. Woodwrights' navigation behaves this way.
 *
 * Pass `disabled` while something inside the bar is open (the mobile menu), so
 * it cannot slide away under the reader's finger. The first render is always
 * visible, so server and client markup agree. The handler runs on the scroll
 * event itself: `setHidden` only re-renders when the value flips, so there is
 * nothing to throttle.
 */
export function useHideOnScroll(disabled: boolean, revealAbove = 96): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (disabled) {
      setHidden(false);
      return;
    }

    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y <= revealAbove) {
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

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [disabled, revealAbove]);

  return hidden;
}
