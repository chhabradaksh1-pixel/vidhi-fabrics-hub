import { useEffect } from "react";

/** How far outside a button the pull begins, in px. */
const REACH = 80;
/** The most a button travels toward the pointer, in px. */
const MAX_SHIFT = 6;

/**
 * A gentle pull on the main WhatsApp buttons: as a mouse pointer comes near
 * an element marked `data-magnet`, the element drifts up to 6px toward it,
 * and settles back as the pointer leaves (the transition on `translate` is
 * in styles.css, `[data-magnet]`). The floating WhatsApp pill already does the same thing in
 * its own component; this brings the in-page buttons in line with it.
 *
 * Mouse only, and never under reduced motion; on a touch screen nothing
 * changes. Installed once, from the root route, for the whole site.
 */
export function useMagnet(): void {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const update = () => {
      frame = 0;
      for (const el of document.querySelectorAll<HTMLElement>("[data-magnet]")) {
        const box = el.getBoundingClientRect();
        const near =
          x > box.left - REACH &&
          x < box.right + REACH &&
          y > box.top - REACH &&
          y < box.bottom + REACH;
        if (!near) {
          if (el.style.translate) el.style.translate = "";
          continue;
        }
        const dx = x - (box.left + box.width / 2);
        const dy = y - (box.top + box.height / 2);
        const reachX = box.width / 2 + REACH;
        const reachY = box.height / 2 + REACH;
        const tx = Math.max(-1, Math.min(1, dx / reachX)) * MAX_SHIFT;
        const ty = Math.max(-1, Math.min(1, dy / reachY)) * MAX_SHIFT;
        // `translate`, not `transform`, so the button's own press-down
        // (`transform: scale(.98)` on :active) still works mid-pull.
        el.style.translate = `${tx.toFixed(1)}px ${ty.toFixed(1)}px`;
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
