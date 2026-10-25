import { Search } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  SEARCH_LABEL,
  SEARCH_LINES,
  SEARCH_NOTE,
  SEARCH_SEND,
  searchMessage,
} from "@/content/home-search";
import type { Lang } from "@/content/translations";
import { trackSearchSubmit } from "@/lib/analytics";
import { whatsAppUrl } from "@/content/whatsapp";

import "./home-search.css";

const SEARCH_LEAD_REF = "SEARCH";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);
  return reduced;
}

/**
 * Types the example lines while the field is empty, including while it is
 * focused. The first typed character hides the line. Clearing the field
 * continues the cycle. Reduced motion holds the first line still.
 */
function useCyclingPlaceholder(paused: boolean) {
  const reduced = usePrefersReducedMotion();
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const [text, setText] = useState<string>(SEARCH_LINES[0]);

  useEffect(() => {
    if (reduced) {
      setText(SEARCH_LINES[0]);
      return;
    }
    let line = 0;
    let count = 0;
    let mode: "type" | "hold" | "del" = "type";
    let timer = 0;
    const step = () => {
      if (pausedRef.current) {
        timer = window.setTimeout(step, 120);
        return;
      }
      const full = SEARCH_LINES[line] ?? SEARCH_LINES[0];
      if (mode === "type") {
        count = Math.min(full.length, count + 1);
        setText(full.slice(0, count));
        if (count === full.length) mode = "hold";
        timer = window.setTimeout(step, count === full.length ? 1000 : 42);
        return;
      }
      if (mode === "hold") {
        mode = "del";
        timer = window.setTimeout(step, 0);
        return;
      }
      count = Math.max(0, count - 1);
      setText(full.slice(0, count));
      if (count === 0) {
        line = (line + 1) % SEARCH_LINES.length;
        mode = "type";
        timer = window.setTimeout(step, 220);
      } else {
        timer = window.setTimeout(step, 24);
      }
    };
    timer = window.setTimeout(step, 60);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return reduced ? SEARCH_LINES[0] : text;
}

export function HomeSearch({ lang }: { lang: Lang }) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState("");
  const ghost = useCyclingPlaceholder(value.length > 0);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = value.trim();
    if (!query) return;
    setSubmitted(query);
    trackSearchSubmit(query);
  }

  return (
    <div id="home-search-block" className="mt-4">
      <form role="search" onSubmit={onSubmit}>
        <div className="relative border border-line bg-paper focus-within:border-clay focus-within:shadow-[0_0_0_3px_rgba(43,49,55,0.28)]">
          <button
            type="submit"
            className="absolute top-0 left-0 z-10 grid h-full w-11 place-items-center text-ink"
            aria-label={SEARCH_LABEL[lang]}
          >
            <Search size={18} aria-hidden="true" />
          </button>
          {value.length === 0 ? (
            <p className="pointer-events-none m-0 min-h-[52px] py-3.5 pr-3 pl-11 text-base leading-snug text-mute">
              <span>{ghost}</span>
              <span className="vf-search-caret" />
            </p>
          ) : null}
          <input
            id="home-search"
            type="text"
            value={value}
            autoComplete="off"
            aria-label={SEARCH_LABEL[lang]}
            onChange={(event) => setValue(event.target.value)}
            className={
              value.length === 0
                ? "absolute inset-0 w-full bg-transparent pr-3 pl-11 text-base text-transparent outline-none"
                : "min-h-[52px] w-full bg-transparent py-3.5 pr-3 pl-11 text-base text-ink outline-none"
            }
            style={value.length === 0 ? { caretColor: "transparent" } : undefined}
          />
        </div>
      </form>
      {submitted ? (
        <div className="mt-4">
          <p className="text-base leading-relaxed text-foreground">{SEARCH_NOTE[lang]}</p>
          <a
            href={whatsAppUrl(searchMessage(lang, submitted))}
            target="_blank"
            rel="noopener noreferrer"
            data-lead-ref={SEARCH_LEAD_REF}
            className="vf-showroom-enquire mt-4 w-full sm:w-auto"
          >
            {SEARCH_SEND[lang]}
          </a>
        </div>
      ) : null}
    </div>
  );
}
