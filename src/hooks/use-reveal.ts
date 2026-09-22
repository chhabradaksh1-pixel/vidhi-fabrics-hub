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
 *
 * The staged (hidden) state lives under `.vf-js` in styles.css, which an
 * inline script sets on <html> before first paint. So if JS fails, or this
 * hook never runs, nothing is ever hidden and the page is fully readable.
 * That is the reason for the class rather than staging in CSS directly.
 */

/** Gap between siblings in a staggered group. Long enough to read as a
 *  sequence, short enough that a row of four is done in under a third of a
 *  second. */
const STAGGER_MS = 80;

/** Cap so a long grid doesn't leave the last card waiting seconds. */
const MAX_STAGGER_STEPS = 8;

export function useReveal(): void {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (nodes.length === 0) return;

    const show = (el: HTMLElement) => el.classList.add("is-in");

    // Honour the OS setting, and degrade cleanly on anything without an
    // observer: reveal everything immediately rather than leaving it staged.
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach(show);
      return;
    }

    // Assign stagger delays per group, so each container counts from zero
    // rather than continuing a page-wide tally.
    const counters = new Map<Element, number>();
    for (const el of nodes) {
      const group = el.parentElement?.closest("[data-reveal-stagger]");
      if (!group) continue;
      const index = counters.get(group) ?? 0;
      counters.set(group, index + 1);
      const steps = Math.min(index, MAX_STAGGER_STEPS);
      el.style.setProperty("--vf-delay", `${steps * STAGGER_MS}ms`);
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
        // Fire a little before the element reaches the bottom edge, so it is
        // already settling by the time it is properly in view.
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08,
      },
    );

    // Anything already on screen at mount reveals right away — otherwise the
    // hero would sit staged until the first scroll.
    for (const el of nodes) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        show(el);
      } else {
        observer.observe(el);
      }
    }

    // Elements that appear LATER must never stay staged.
    //
    // The catalogue re-renders its cards on every search keystroke, facet and
    // sort change. Those cards mount carrying `data-reveal`, so without this
    // they would sit at opacity 0 permanently — the observer only ever saw the
    // nodes that existed at mount, and a filtered result that renders
    // invisible is a far worse bug than a missing animation.
    //
    // They are revealed immediately rather than animated: a card arriving in
    // response to typing should already be there, and replaying a rise on
    // every keystroke would be unreadable.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const added of record.addedNodes) {
          if (!(added instanceof HTMLElement)) continue;
          if (added.matches("[data-reveal]")) show(added);
          added.querySelectorAll<HTMLElement>("[data-reveal]").forEach(show);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);
}
