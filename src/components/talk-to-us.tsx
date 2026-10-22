import { track } from "@vercel/analytics";
import { MessageCircle, X } from "lucide-react";
import { arc, motion, MotionConfig } from "motion/react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { TALK_COPY, type TalkStep } from "@/content/talk-to-us-copy";
import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";
import { LEAD_POPUP_EVENT, type LeadPopupEventDetail } from "@/lib/ui-events";

type Answers = {
  category: string;
  requirement: string;
  quantity: string;
  city: string;
  country: string;
};

const EMPTY: Answers = { category: "", requirement: "", quantity: "", city: "", country: "" };
const STORE_KEY = "vidhi-talk-to-us";
const TEASER_KEY = "vidhi-talk-to-us-teaser";

/** First nudge, then one more if it was waved away. Two at most per session. */
const TEASER_FIRST_MS = 4000;
const TEASER_REPEAT_MS = 75000;
const TEASER_MAX_SHOWS = 2;

/**
 * The hop and green glow stop for the rest of the session once the visitor
 * opens the panel or dismisses the teaser.
 */
const ATTENTION_KEY = "vidhi-launcher-settled";
/** Long enough for the 0.55s slide-in to finish before the first hop. */
const HOP_AFTER_SLIDE_MS = 800;

function loadSaved(): { step: TalkStep; answers: Answers } | null {
  try {
    const raw = window.sessionStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { step: TalkStep; answers: Answers };
    if (!parsed || typeof parsed !== "object" || !parsed.answers) return null;
    return { step: parsed.step ?? "category", answers: { ...EMPTY, ...parsed.answers } };
  } catch {
    return null;
  }
}

function save(step: TalkStep, answers: Answers) {
  try {
    window.sessionStorage.setItem(STORE_KEY, JSON.stringify({ step, answers }));
  } catch {
    /* private mode — the conversation simply will not persist */
  }
}

/** Only ever true once every field the brief requires has been answered. */
function isComplete(a: Answers) {
  return Boolean(
    a.category.trim() &&
    a.requirement.trim() &&
    a.quantity.trim() &&
    a.city.trim() &&
    a.country.trim(),
  );
}

const MESSAGE_LINES: Record<
  Lang,
  {
    greeting: string;
    intro: string;
    product: string;
    requirement: string;
    quantity: string;
    location: string;
    close: string;
  }
> = {
  en: {
    greeting: "Hi Vidhi Fabrics,",
    intro: "I submitted a sourcing requirement on your website.",
    product: "Product",
    requirement: "Requirement",
    quantity: "Quantity",
    location: "Location",
    close: "I'd like to know the available options, catalogue and pricing.",
  },
  hi: {
    greeting: "नमस्ते विधि फैब्रिक्स,",
    intro: "मैंने आपकी वेबसाइट पर अपनी ज़रूरत भेजी है।",
    product: "प्रोडक्ट",
    requirement: "ज़रूरत",
    quantity: "मात्रा",
    location: "जगह",
    close: "कृपया उपलब्ध विकल्प, कैटलॉग और रेट बताइए।",
  },
  "hi-en": {
    greeting: "Namaste Vidhi Fabrics,",
    intro: "Maine aapki website par apni requirement bheji hai.",
    product: "Product",
    requirement: "Requirement",
    quantity: "Quantity",
    location: "Location",
    close: "Kripya available options, catalogue aur rates bataiye.",
  },
};

function buildMessage(a: Answers, lang: Lang) {
  const t = MESSAGE_LINES[lang];
  return [
    t.greeting,
    "",
    t.intro,
    "",
    `${t.product}: ${a.category}`,
    `${t.requirement}: ${a.requirement}`,
    `${t.quantity}: ${a.quantity}`,
    `${t.location}: ${a.city}, ${a.country}`,
    "",
    t.close,
  ].join("\n");
}

/** Below Tailwind's `sm` breakpoint: phones. */
const MOBILE_QUERY = "(max-width: 639.98px)";

/**
 * Entrance offset: the launcher's own width, plus the larger corner inset
 * (`sm:right-5` is 1.25rem). That starts it just past the right edge and
 * leaves the resting position — `right-4` / `sm:right-5` — fully on screen.
 * A viewport calc such as `100vw - 50%` is not used; it would park the
 * control on the layout box itself and can leave it clipped.
 */
const LAUNCHER_ENTER_X = "calc(100% + 1.25rem)";

/**
 * Slide-in, plus an arc for any later change of this box.
 *
 * The tree is the same on the server and the client. Branching on
 * `useReducedMotion()` swaps a `motion.div` for a plain `div` on the first
 * client render (the hook reads `matchMedia` immediately) and fails hydration.
 * `MotionConfig reducedMotion="user"` is applied when the node mounts, so a
 * reduced-motion visitor snaps to the resting pose instead. The stylesheet
 * also forces `transform: none` under that media query, so the server's
 * off-screen `translateX` never paints.
 */
function FloatingLauncher({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div layout data-vf-launcher transition={{ layout: { path: arc() } }}>
        <motion.div
          className="relative"
          data-vf-launcher-in
          initial={{ x: LAUNCHER_ENTER_X }}
          animate={{ x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}

/**
 * CTAs the floating launcher must never sit on top of: WhatsApp links, submit
 * buttons and anything marked `data-vf-cta`, outside the launcher itself.
 */
const CTA_SELECTOR = 'a[href*="wa.me/"], button[type="submit"], [data-vf-cta]';

/**
 * Floating "Talk to us" launcher and guided WhatsApp hand-off, on every page
 * (mounted in __root.tsx for inner pages, and by the two home routes, which
 * own the Hinglish toggle).
 *
 * On phones it shrinks to a round icon button, never shows the teaser bubble,
 * and fades out whenever it would cover a call-to-action or while the
 * homepage enquiry pop-up is open. WhatsApp links inside it are tagged with
 * the page's lead ref code by <LeadSourceTracker />, like every other link.
 */
export function TalkToUs({ lang = "en" }: { lang?: Lang }) {
  const copy = TALK_COPY[lang];
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<TalkStep>("category");
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [draft, setDraft] = useState("");
  const [teaser, setTeaser] = useState(false);
  const [nudge, setNudge] = useState(false);
  // Glow from first paint. The hop waits until the slide-in has finished.
  const [attention, setAttention] = useState(true);
  const [hop, setHop] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  // The homepage enquiry pop-up is open: stay out of its way.
  const [popupOpen, setPopupOpen] = useState(false);
  // On a phone, the launcher would currently cover a CTA.
  const [overCta, setOverCta] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const liveInputRef = useRef<HTMLInputElement>(null);

  // Restore an in-progress conversation from earlier in the session.
  useEffect(() => {
    const saved = loadSaved();
    if (!saved) return;
    setStep(saved.step);
    setAnswers(saved.answers);
    setCity(saved.answers.city);
    setCountry(saved.answers.country);
  }, []);

  useEffect(() => {
    const onPopup = (event: Event) => {
      const detail = (event as CustomEvent<LeadPopupEventDetail>).detail;
      setPopupOpen(Boolean(detail?.open));
      if (detail?.open) setTeaser(false);
    };
    window.addEventListener(LEAD_POPUP_EVENT, onPopup);
    return () => window.removeEventListener(LEAD_POPUP_EVENT, onPopup);
  }, []);

  // Phones only: fade out while the launcher overlaps a CTA, so it never
  // hides a "Get catalogue on WhatsApp" button or a form's submit button.
  // Checked on scroll and resize, one measurement per animation frame.
  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    let frame = 0;
    const measure = () => {
      frame = 0;
      const stack = stackRef.current;
      if (!stack || !media.matches) {
        setOverCta(false);
        return;
      }
      const r = stack.getBoundingClientRect();
      const pad = 12;
      let hit = false;
      for (const el of document.querySelectorAll<HTMLElement>(CTA_SELECTOR)) {
        if (stack.contains(el) || panelRef.current?.contains(el)) continue;
        const c = el.getBoundingClientRect();
        if (c.width === 0 || c.height === 0) continue;
        if (
          c.left < r.right + pad &&
          c.right > r.left - pad &&
          c.top < r.bottom + pad &&
          c.bottom > r.top - pad
        ) {
          hit = true;
          break;
        }
      }
      setOverCta(hit);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    media.addEventListener("change", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);

  // Nudge the visitor twice at most, and never once they have engaged.
  useEffect(() => {
    let shows = 0;
    try {
      shows = Number(window.sessionStorage.getItem(TEASER_KEY) ?? "0");
    } catch {
      /* private mode */
    }
    if (shows >= TEASER_MAX_SHOWS) return;

    const timers: number[] = [];
    const fire = () => {
      setTeaser(true);
      setNudge(true);
      window.setTimeout(() => setNudge(false), 900);
      try {
        window.sessionStorage.setItem(TEASER_KEY, String(shows + 1));
      } catch {
        /* private mode */
      }
    };
    timers.push(window.setTimeout(fire, TEASER_FIRST_MS));
    if (shows + 1 < TEASER_MAX_SHOWS) {
      timers.push(window.setTimeout(fire, TEASER_FIRST_MS + TEASER_REPEAT_MS));
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  // Once the panel is open the nudge has done its job.
  useEffect(() => {
    if (open) {
      setTeaser(false);
      try {
        window.sessionStorage.setItem(TEASER_KEY, String(TEASER_MAX_SHOWS));
      } catch {
        /* private mode */
      }
    }
  }, [open]);

  const settleAttention = useCallback(() => {
    setAttention(false);
    setHop(false);
    try {
      window.sessionStorage.setItem(ATTENTION_KEY, "1");
    } catch {
      /* private mode */
    }
  }, []);

  // Hop only after the entrance, and never again once they have engaged.
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(ATTENTION_KEY) === "1") {
        setAttention(false);
        return;
      }
    } catch {
      /* private mode — keep the attention, it simply will not persist */
    }
    const t = window.setTimeout(() => {
      try {
        if (window.sessionStorage.getItem(ATTENTION_KEY) === "1") return;
      } catch {
        /* private mode */
      }
      setHop(true);
    }, HOP_AFTER_SLIDE_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) settleAttention();
  }, [open, settleAttention]);

  const advance = useCallback((next: TalkStep, patch: Partial<Answers>) => {
    setAnswers((prev) => {
      const merged = { ...prev, ...patch };
      save(next, merged);
      return merged;
    });
    setStep(next);
    setDraft("");
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus();
  }, []);

  // Escape closes; focus moves into the panel when it opens.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => liveInputRef.current?.focus(), 80);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, close, step]);

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    if (open) logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [open, step, answers]);

  function openPanel() {
    setOpen(true);
    track("talk_to_us_opened");
  }

  function chooseCategory(value: string) {
    const v = value.trim();
    if (!v) return;
    advance("requirement", { category: v });
    track("talk_to_us_category_selected", { category: v });
  }

  function submitRequirement(value: string) {
    const v = value.trim();
    if (!v) return;
    advance("quantity", { requirement: v });
    track("talk_to_us_requirement_entered");
  }

  function chooseQuantity(value: string) {
    const v = value.trim();
    if (!v) return;
    advance("location", { quantity: v });
    track("talk_to_us_quantity_selected", { quantity: v });
  }

  function submitLocation(e: React.FormEvent) {
    e.preventDefault();
    const c = city.trim();
    const k = country.trim();
    if (!c || !k) return; // both required before the handoff appears
    advance("done", { city: c, country: k });
    track("talk_to_us_location_completed");
  }

  function restart() {
    setAnswers(EMPTY);
    setStep("category");
    setCity("");
    setCountry("");
    setDraft("");
    save("category", EMPTY);
  }

  const complete = isComplete(answers);

  return (
    <>
      {/* Teaser + launcher share a corner stack so they move together. */}
      <div
        ref={stackRef}
        className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-5 sm:right-5 ${
          open || popupOpen || overCta ? "pointer-events-none opacity-0" : "opacity-100"
        } transition-opacity`}
        aria-hidden={open || popupOpen || overCta ? true : undefined}
      >
        {/* The teaser bubble is a desktop nicety; on a phone it covers copy. */}
        {teaser && !popupOpen ? (
          <div className="vf-pop-in hidden max-w-[16rem] items-start gap-2 rounded-md rounded-br-sm border border-line bg-paper px-4 py-3 shadow-xl sm:flex">
            <button
              type="button"
              onClick={openPanel}
              className="text-left text-sm leading-snug text-ink"
            >
              {copy.teaser}
            </button>
            <button
              type="button"
              onClick={() => {
                setTeaser(false);
                settleAttention();
              }}
              aria-label={copy.teaserClose}
              className="-mr-1 -mt-1 shrink-0 rounded-sm p-1 text-mute transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        ) : null}

        <FloatingLauncher>
          <div className={hop && attention ? "vf-launcher-hop relative" : "relative"}>
            {/* Rust halo — decorative, sits behind the button. Stops once they engage. */}
            {attention ? (
              <span
                aria-hidden="true"
                className="vf-wa-glow pointer-events-none absolute inset-0 rounded-full"
              />
            ) : null}
            <button
              ref={launcherRef}
              type="button"
              onClick={openPanel}
              aria-haspopup="dialog"
              aria-expanded={open}
              tabIndex={open || popupOpen || overCta ? -1 : undefined}
              className={`relative inline-flex size-14 items-center justify-center gap-2.5 rounded-full bg-clay font-mono text-sm uppercase tracking-label text-paper shadow-xl ring-2 ring-paper transition-colors hover:bg-claydeep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:size-auto sm:px-6 sm:py-4 ${
                nudge ? "vf-nudge" : ""
              }`}
            >
              <MessageCircle size={22} aria-hidden="true" className="sm:size-[19px]" />
              <span className="sr-only sm:not-sr-only">{copy.launcher}</span>
            </button>
          </div>
        </FloatingLauncher>
      </div>

      {open ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label={copy.launcher}
          className="fixed inset-x-0 bottom-0 z-[71] flex max-h-[88dvh] flex-col overflow-hidden border border-line bg-paper shadow-2xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:max-h-[min(34rem,85dvh)] sm:w-[23rem] sm:rounded-md"
        >
          <header className="flex shrink-0 items-center justify-between gap-3 border-b border-line bg-ink px-5 py-4 text-paper">
            <div className="min-w-0">
              <p className="font-display text-lg font-light leading-tight">{copy.title}</p>
              <p className="truncate font-mono text-xs uppercase tracking-label text-paper/60">
                {copy.subtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={copy.close}
              className="-mr-1 shrink-0 rounded-sm p-2 text-paper/70 transition-colors hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div
            ref={logRef}
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-5 py-5"
            aria-live="polite"
          >
            <Bubble from="them">{copy.askCategory}</Bubble>
            {answers.category ? <Bubble from="me">{answers.category}</Bubble> : null}

            {answers.category ? <Bubble from="them">{copy.askRequirement}</Bubble> : null}
            {answers.requirement ? <Bubble from="me">{answers.requirement}</Bubble> : null}

            {answers.requirement ? <Bubble from="them">{copy.askQuantity}</Bubble> : null}
            {answers.quantity ? <Bubble from="me">{answers.quantity}</Bubble> : null}

            {answers.quantity ? <Bubble from="them">{copy.askLocation}</Bubble> : null}
            {answers.city && answers.country ? (
              <Bubble from="me">{`${answers.city}, ${answers.country}`}</Bubble>
            ) : null}

            {complete ? (
              <>
                <Bubble from="them">{copy.doneOne}</Bubble>
                <Bubble from="them">{copy.doneTwo}</Bubble>
              </>
            ) : null}
          </div>

          <div className="shrink-0 border-t border-line bg-sand/50 px-5 py-4">
            {step === "category" ? (
              <a
                href={whatsAppUrl(copy.directMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("talk_to_us_direct_whatsapp_clicked")}
                className="mb-3 block text-center text-xs text-claydeep underline decoration-line underline-offset-4 hover:text-ink"
              >
                {copy.direct}
              </a>
            ) : null}
            {step === "category" ? (
              <Choices
                options={copy.categories}
                onPick={chooseCategory}
                inputLabel={copy.ownAnswer}
                inputRef={liveInputRef}
                value={draft}
                onChange={setDraft}
                onSubmit={chooseCategory}
                send={copy.send}
              />
            ) : null}

            {step === "requirement" ? (
              <FreeText
                label={copy.askRequirement}
                placeholder={copy.requirementPlaceholder}
                inputRef={liveInputRef}
                value={draft}
                onChange={setDraft}
                onSubmit={submitRequirement}
                send={copy.send}
              />
            ) : null}

            {step === "quantity" ? (
              <Choices
                options={copy.quantities}
                onPick={chooseQuantity}
                inputLabel={copy.customQuantity}
                inputRef={liveInputRef}
                value={draft}
                onChange={setDraft}
                onSubmit={chooseQuantity}
                send={copy.send}
              />
            ) : null}

            {step === "location" ? (
              <form onSubmit={submitLocation} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <label className="block">
                    <span className="mb-1 block font-mono text-xs uppercase tracking-label text-mute">
                      {copy.city}
                    </span>
                    <input
                      ref={liveInputRef}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      autoComplete="address-level2"
                      className="w-full rounded-sm border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:border-clay"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block font-mono text-xs uppercase tracking-label text-mute">
                      {copy.country}
                    </span>
                    <input
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      autoComplete="country-name"
                      className="w-full rounded-sm border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:border-clay"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={!city.trim() || !country.trim()}
                  className="w-full rounded-sm bg-ink px-4 py-3 font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copy.send}
                </button>
              </form>
            ) : null}

            {/* The handoff exists only once every answer is in. */}
            {step === "done" && complete ? (
              <div className="space-y-3">
                <a
                  href={whatsAppUrl(buildMessage(answers, lang))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("talk_to_us_whatsapp_clicked")}
                  className="block w-full rounded-sm bg-clay px-4 py-3.5 text-center font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-claydeep"
                >
                  {copy.cta}
                </a>
                <button
                  type="button"
                  onClick={restart}
                  className="w-full text-center font-mono text-xs uppercase tracking-label text-mute underline-offset-4 hover:text-ink hover:underline"
                >
                  {copy.restart}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}

function Bubble({ from, children }: { from: "them" | "me"; children: React.ReactNode }) {
  const mine = from === "me";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <p
        className={`vf-rise max-w-[85%] text-pretty rounded-md px-3.5 py-2.5 text-sm leading-relaxed ${
          mine ? "bg-ink text-paper" : "bg-sand text-ink"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function Choices({
  options,
  onPick,
  inputLabel,
  inputRef,
  value,
  onChange,
  onSubmit,
  send,
}: {
  options: readonly string[];
  onPick: (v: string) => void;
  inputLabel: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  send: string;
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onPick(o)}
            className="rounded-full border border-line bg-paper px-3.5 py-2 text-sm transition-colors hover:border-clay hover:text-claydeep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
          >
            {o}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(value);
        }}
        className="flex gap-2"
      >
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={inputLabel}
          placeholder={inputLabel}
          className="min-w-0 flex-1 rounded-sm border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:border-clay"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="shrink-0 rounded-sm bg-ink px-4 py-2.5 font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {send}
        </button>
      </form>
    </div>
  );
}

function FreeText({
  label,
  placeholder,
  inputRef,
  value,
  onChange,
  onSubmit,
  send,
}: {
  label: string;
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (v: string) => void;
  onSubmit: (v: string) => void;
  send: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
      className="flex gap-2"
    >
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded-sm border border-line bg-paper px-3 py-2.5 text-sm outline-none focus-visible:border-clay"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="shrink-0 rounded-sm bg-ink px-4 py-2.5 font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {send}
      </button>
    </form>
  );
}
