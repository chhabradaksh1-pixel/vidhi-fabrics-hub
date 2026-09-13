import { track } from "@vercel/analytics";
import { MessageCircle, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { TALK_COPY, type TalkStep } from "@/content/talk-to-us-copy";
import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

type Answers = {
  category: string;
  requirement: string;
  quantity: string;
  city: string;
  country: string;
};

const EMPTY: Answers = { category: "", requirement: "", quantity: "", city: "", country: "" };
const STORE_KEY = "vidhi-talk-to-us";

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

function buildMessage(a: Answers) {
  return [
    "Hi Vidhi Fabrics,",
    "",
    "I submitted a sourcing requirement on your website.",
    "",
    `Product: ${a.category}`,
    `Requirement: ${a.requirement}`,
    `Quantity: ${a.quantity}`,
    `Location: ${a.city}, ${a.country}`,
    "",
    "I'd like to know the available options, MOQ and pricing.",
  ].join("\n");
}

export function TalkToUs({ lang = "en" }: { lang?: Lang }) {
  const copy = TALK_COPY[lang];
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<TalkStep>("category");
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [draft, setDraft] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
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
      <button
        ref={launcherRef}
        type="button"
        onClick={openPanel}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full bg-clay px-5 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-paper shadow-lg transition-colors hover:bg-claydeep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
          open ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <MessageCircle size={17} aria-hidden="true" />
        {copy.launcher}
      </button>

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
              <p className="font-display text-lg font-semibold leading-tight">{copy.title}</p>
              <p className="truncate font-mono text-[10px] uppercase tracking-[0.14em] text-paper/60">
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
                    <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-mute">
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
                    <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.12em] text-mute">
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
                  className="w-full rounded-sm bg-ink px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copy.send}
                </button>
              </form>
            ) : null}

            {/* The handoff exists only once every answer is in. */}
            {step === "done" && complete ? (
              <div className="space-y-3">
                <a
                  href={whatsAppUrl(buildMessage(answers))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("talk_to_us_whatsapp_clicked")}
                  className="block w-full rounded-sm bg-clay px-4 py-3.5 text-center font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-claydeep"
                >
                  {copy.cta}
                </a>
                <button
                  type="button"
                  onClick={restart}
                  className="w-full text-center font-mono text-[10px] uppercase tracking-[0.12em] text-mute underline-offset-4 hover:text-ink hover:underline"
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
          className="shrink-0 rounded-sm bg-ink px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
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
        className="shrink-0 rounded-sm bg-ink px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {send}
      </button>
    </form>
  );
}
