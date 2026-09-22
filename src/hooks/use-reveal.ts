import { useEffect } from "react";

/**
 * Scroll-reveal, the way the Inditex corporate site does it: an
 * IntersectionObserver toggling a class, and CSS doing the rest. No motion
 * library — `CLAUDE.md` rules out large dependencies, and none is needed.
 *
 * Markup contract:
 *
 *   <section data-reveal>                  a single element that rises in
 *   <div data-reveal-stagger>              its [data-reveal] children fire in
 *     <article data-reveal />              sequence, STAGGER_MS apart
 *     <article data-reveal />
 *   </div>
 *   <figure data-reveal data-reveal-img>   also settles its <img> from 1.04
 *   <div data-reveal-block><div><img/></div></div>
 *                                          block reveal: the inner panel
 *                                          rises while the image counter-moves
 *
 * The staged (hidden) state lives under `.vf-js` in styles.css, which an
 * inline script sets on <html> before first paint. So if JS fails, or this
 * hook never runs, nothing is ever hidden and the page is fully readable.
 * That is the reason for the class rather than staging in CSS directly.
 */

/** Gap between siblings in a staggered group. Long enough to read as a
 *  sequence, short enough that a row of four is done in under a third of a
 *  second. */
const STAGGER_MS = 110;

/** Cap so a long grid doesn't leave the last card waiting seconds. */
const MAX_STAGGER_STEPS = 8;

export function useReveal(): void {
  useEffect(() => {
    const show = (el: HTMLElement) => el.classList.add("is-in");

    /** Reveal without playing the transition — for content that appears in
     *  response to the user, where replaying the animation would be noise. */
    const showAtOnce = (el: HTMLElement) => {
      const previous = el.style.transitionDuration;
      el.style.transitionDuration = "0s";
      show(el);
      requestAnimationFrame(() => {
        el.style.transitionDuration = previous;
      });
    };

    const query = (root: ParentNode) =>
      Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));

    // Honour the OS setting, and degrade cleanly on anything without an
    // observer: reveal everything immediately rather than leaving it staged.
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      const revealEverything = () => query(document).forEach(show);
      revealEverything();
      // Still watched, because content that mounts later must not stay staged.
      const watcher = new MutationObserver(revealEverything);
      watcher.observe(document.body, { childList: true, subtree: true });
      return () => watcher.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          // One-shot: nothing re-hides on the way back up, so scrolling
          // upwards stays still instead of replaying.
          observer.unobserve(entry.target);
        }
      },
      {
        // Hold off until the element is properly inside the viewport rather
        // than just touching its bottom edge. At -12% and a 0.08 threshold an
        // element began animating when a sliver of it had appeared, so it was
        // fully settled by the time it reached the middle of the screen and
        // the motion was never actually witnessed. Firing later means the
        // reader is looking at the element while it moves.
        rootMargin: "0px 0px -20% 0px",
        // Deliberately low. The rootMargin is what delays the trigger; a high
        // threshold on top of it is the thing that strands tall sections,
        // because a section taller than the viewport can never expose a large
        // fraction of itself at once.
        threshold: 0.04,
      },
    );

    // Delays are assigned per group and per pass, so each container counts
    // from zero rather than continuing a page-wide tally.
    const assignDelays = (nodes: HTMLElement[]) => {
      const counters = new Map<Element, number>();
      for (const el of nodes) {
        const group = el.parentElement?.closest("[data-reveal-stagger]");
        if (!group) continue;
        const index = counters.get(group) ?? 0;
        counters.set(group, index + 1);
        const steps = Math.min(index, MAX_STAGGER_STEPS);
        el.style.setProperty("--vf-delay", `${steps * STAGGER_MS}ms`);
      }
    };

    /** Already on screen reveals now — otherwise the hero would sit staged
     *  until the first scroll. Anything lower waits for the observer. */
    const take = (el: HTMLElement, immediate: boolean) => {
      if (el.classList.contains("is-in")) return;
      if (el.getBoundingClientRect().top < window.innerHeight) {
        if (immediate) showAtOnce(el);
        else show(el);
      } else {
        observer.observe(el);
      }
    };

    const scan = (root: ParentNode, immediate: boolean) => {
      const nodes = query(root);
      if (nodes.length === 0) return;
      assignDelays(nodes);
      for (const el of nodes) take(el, immediate);
    };

    scan(document, false);

    // Everything that appears LATER also has to be handled, and this must be
    // installed unconditionally.
    //
    // Two separate cases depend on it. The catalogue re-renders its cards on
    // every search keystroke, facet and sort change; those cards mount
    // carrying data-reveal and would otherwise sit at opacity 0 permanently,
    // which renders a search result invisible. And on a route whose content is
    // not in the DOM when this effect first runs, the initial scan finds
    // nothing at all — an earlier version returned early in that case, never
    // installed either observer, and left the entire Hindi route blank.
    //
    // Nodes arriving in view are revealed without replaying the transition,
    // since they are a response to the user rather than to scrolling. Nodes
    // arriving below the fold are observed as normal and still animate.
    const watcher = new MutationObserver((records) => {
      for (const record of records) {
        for (const added of record.addedNodes) {
          if (!(added instanceof HTMLElement)) continue;
          if (added.matches("[data-reveal]")) take(added, true);
          scan(added, true);
        }
      }
    });
    watcher.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      watcher.disconnect();
    };
  }, []);
}
