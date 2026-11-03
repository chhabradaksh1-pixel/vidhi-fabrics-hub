import { useEffect, useRef } from "react";

/**
 * Text whose first number counts up from zero once it scrolls into view, as
 * on the facts strip ("2,400+ active SKUs", "60 years in the trade").
 *
 * The server renders the final figure, so search engines, readers without
 * JavaScript and reduced-motion readers only ever see the real number. The
 * count runs once, on the browser, by writing the digits straight into the
 * span; the span is keyed by the text so a language switch remounts it
 * rather than leaving React's copy stale. Its width is fixed to the final
 * figure so the line never shifts while it counts.
 */
export function CountUpText({ text }: { text: string }) {
  // A trailing "+" belongs to the figure ("2,400+"), so it stays in the span
  // and the text is not split in the middle of a word.
  const match = text.match(/\d[\d,]*\+?/);
  const figure = match?.[0] ?? "";
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !figure) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const target = Number(figure.replace(/[,+]/g, ""));
    const grouped = figure.includes(",");
    const suffix = figure.endsWith("+") ? "+" : "";
    const format = (n: number) => (grouped ? n.toLocaleString("en-IN") : String(n)) + suffix;
    let frame = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1400);
        el.textContent = format(Math.round(target * (1 - (1 - p) ** 3)));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = figure;
    };
  }, [figure]);

  if (!match || match.index === undefined) return text;
  const at = match.index;
  return (
    <>
      {text.slice(0, at)}
      <span key={text} ref={ref} className="vf-count" style={{ minWidth: `${figure.length}ch` }}>
        {figure}
      </span>
      {text.slice(at + figure.length)}
    </>
  );
}
