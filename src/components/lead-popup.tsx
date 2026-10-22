import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { FORMSPREE_ENDPOINT } from "@/content/forms";
import { COPY, type Lang } from "@/content/translations";
import { trackLeadEvent } from "@/lib/analytics";
import { currentLeadContext } from "@/lib/lead-source";
import { DIAL_CODES, normalisePhone, OTHER_DIAL } from "@/lib/phone";
import { LEAD_POPUP_EVENT, type LeadPopupEventDetail } from "@/lib/ui-events";

/**
 * The homepage enquiry pop-up, shared by `/` and `/hi` (it used to be copied
 * into both route files).
 *
 * It is a quiet card in the bottom corner, modelled on Woodwrights' newsletter
 * card: no dimmed backdrop, no scroll lock, no focus trap, and nothing takes
 * focus when it opens, so a reader who ignores it can keep reading. It does
 * not open on page load. On mobile that covered the hero on first view, and
 * Lighthouse timed its heading as the page's largest paint. It opens once per
 * session after real engagement: half the page scrolled, or 35 seconds on the
 * page, whichever comes first. See `useEngagementPopup`.
 *
 * Once closed it stays away for 7 days, and once an enquiry is sent for a
 * year, so a visitor is not asked again on every visit.
 */

function announce(open: boolean) {
  const detail: LeadPopupEventDetail = { open };
  window.dispatchEvent(new CustomEvent(LEAD_POPUP_EVENT, { detail }));
}

const SESSION_KEY = "vidhi-lead-popup-seen";
const MEMORY_KEY = "vidhi-lead-popup";
const DISMISSED_DAYS = 7;
const SUBMITTED_DAYS = 365;
const DAY_MS = 86_400_000;
const ENGAGED_MS = 35_000;
const ENGAGED_SCROLL = 0.5;

type PopupMemory = { state: "dismissed" | "submitted"; at: number };

function readMemory(): PopupMemory | null {
  try {
    const raw = window.localStorage.getItem(MEMORY_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PopupMemory>;
    if (
      (parsed.state === "dismissed" || parsed.state === "submitted") &&
      typeof parsed.at === "number"
    ) {
      return { state: parsed.state, at: parsed.at };
    }
  } catch {
    /* unreadable: behave as if nothing was remembered */
  }
  return null;
}

function stillRemembered(memory: PopupMemory | null): boolean {
  if (!memory) return false;
  const days = memory.state === "submitted" ? SUBMITTED_DAYS : DISMISSED_DAYS;
  return Date.now() - memory.at < days * DAY_MS;
}

function remember(state: PopupMemory["state"]) {
  try {
    window.localStorage.setItem(MEMORY_KEY, JSON.stringify({ state, at: Date.now() }));
  } catch {
    /* private mode */
  }
}

/**
 * Opens the pop-up once per session after half the page is scrolled or
 * ENGAGED_MS on the page. Never on load, and not within 7 days of a dismissal
 * or a year of an enquiry. The session key is written when the pop-up actually
 * opens, so a visitor who leaves early sees it on a later page view in the
 * same session instead of never.
 */
export function useEngagementPopup(): [boolean, (open: boolean) => void] {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      return; // no storage, no way to keep it to once a session: skip it
    }
    if (stillRemembered(readMemory())) return;

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      cleanup();
      // Never stack on top of the Talk-to-us panel or another dialog.
      if (document.querySelector("[role=dialog]")) return;
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* private mode */
      }
      setOpen(true);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= ENGAGED_SCROLL) fire();
    };
    const timer = window.setTimeout(fire, ENGAGED_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, []);

  useEffect(() => {
    announce(open);
  }, [open]);

  return [open, setOpen];
}

type LeadPopupProps = {
  lang: Lang;
  onClose: () => void;
  /** Recorded in the Formspree "form" field, e.g. "Website entry pop-up". */
  formName: string;
};

type LeadForm = {
  name: string;
  phone: string;
  business: string;
  requirement: string;
};

export function LeadPopup({ lang, onClose, formName }: LeadPopupProps) {
  const copy = COPY.leadPopup;
  const [form, setForm] = useState<LeadForm>({
    name: "",
    phone: "",
    business: "",
    requirement: "",
  });
  const [dial, setDial] = useState<string>("+91");
  const [errors, setErrors] = useState<Partial<Record<keyof LeadForm, string>>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "failure">("idle");

  function close() {
    if (status !== "success") remember("dismissed");
    onClose();
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || status === "saving") return;
      if (status !== "success") remember("dismissed");
      onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, status]);

  function updateField(field: keyof LeadForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof LeadForm, string>> = {};
    if (!form.name.trim()) nextErrors.name = copy.required[lang];
    if (!form.requirement.trim()) nextErrors.requirement = copy.required[lang];
    const phone = normalisePhone(dial, form.phone);
    if (!phone.ok) {
      nextErrors.phone =
        phone.reason === "india" ? copy.invalidPhone[lang] : copy.invalidIntlPhone[lang];
    }
    if (Object.keys(nextErrors).length > 0 || !phone.ok) {
      setErrors(nextErrors);
      return;
    }

    setStatus("saving");
    const ctx = currentLeadContext();
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: (() => {
          const formData = new FormData();
          formData.set("name", form.name.trim());
          formData.set("phone", phone.e164);
          formData.set("business", form.business.trim());
          formData.set("requirement", form.requirement.trim());
          // "form" names which form this was; "source" is the lead-source
          // code (docs/lead-source-legend.md). "source" used to hold the form
          // name, before lead-source tracking.
          formData.set("form", formName);
          formData.set("source", ctx.source);
          formData.set("page", ctx.page);
          formData.set("ref_code", ctx.ref);
          return formData;
        })(),
      });
      if (!response.ok) throw new Error("Lead submission failed");
      trackLeadEvent("form_submit", { page: ctx.page, source: ctx.source, ref_code: ctx.ref });
      remember("submitted");
      setStatus("success");
    } catch {
      setStatus("failure");
    }
  }

  return (
    <div
      role="dialog"
      aria-labelledby="lead-popup-heading"
      className="vf-rise fixed bottom-4 left-4 right-4 z-[60] max-h-[calc(100dvh-2rem)] overflow-y-auto bg-sand px-6 pb-5 pt-6 shadow-[0_10px_30px_rgb(59_34_25_/_0.12)] sm:bottom-6 sm:left-auto sm:right-6 sm:w-[477px] sm:px-8 sm:pb-[26px] sm:pt-8"
    >
      <div className="flex items-start justify-between gap-4">
        <h2
          id="lead-popup-heading"
          className="font-display text-2xl font-light leading-[1.2] tracking-normal"
        >
          {copy.heading[lang]}
        </h2>
        <button
          type="button"
          onClick={close}
          disabled={status === "saving"}
          aria-label={copy.close[lang]}
          className="-mr-2 -mt-1 grid size-10 shrink-0 place-items-center text-ink hover:text-clay disabled:opacity-50"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      {status === "success" ? null : (
        <p className="mt-3 text-[13px] leading-[1.35] tracking-ui text-foreground">
          {copy.body[lang]}
        </p>
      )}

      {status === "success" ? (
        <div className="mt-6 space-y-5">
          <p className="font-display text-lg font-light leading-[1.3] tracking-normal text-sage">
            {copy.success[lang]}
          </p>
          <button
            type="button"
            onClick={close}
            className="vf-lead-submit flex min-h-11 w-full items-center justify-center px-4 py-3 text-[13px] tracking-ui"
          >
            {copy.continue[lang]}
          </button>
        </div>
      ) : (
        <form className="mt-5 space-y-2.5" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-2 gap-4">
            <LeadField label={copy.name[lang]} error={errors.name}>
              <input
                name="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
                aria-invalid={Boolean(errors.name)}
                className="vf-lead-field"
              />
            </LeadField>
            <LeadField label={copy.business[lang]}>
              <input
                name="business"
                value={form.business}
                onChange={(event) => updateField("business", event.target.value)}
                className="vf-lead-field"
              />
            </LeadField>
          </div>
          <LeadField label={copy.phone[lang]} error={errors.phone}>
            <div className="flex gap-3">
              <select
                name="dial_code"
                value={dial}
                onChange={(event) => {
                  setDial(event.target.value);
                  setErrors(({ phone: _cleared, ...rest }) => rest);
                }}
                aria-label={copy.countryCode[lang]}
                className="vf-lead-field w-auto max-w-[9.5rem] shrink-0 pr-2"
              >
                {DIAL_CODES.map((d) => (
                  <option key={d.code} value={d.code}>
                    {`${d.code} ${lang === "hi" ? d.hi : d.en}`}
                  </option>
                ))}
                <option value={OTHER_DIAL}>{copy.otherCode[lang]}</option>
              </select>
              <input
                name="phone"
                type="tel"
                inputMode={dial === OTHER_DIAL ? "tel" : "numeric"}
                autoComplete={dial === "+91" ? "tel-national" : "tel"}
                placeholder={dial === OTHER_DIAL ? copy.otherPlaceholder[lang] : undefined}
                aria-label={copy.phone[lang]}
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                required
                aria-invalid={Boolean(errors.phone)}
                className="vf-lead-field"
              />
            </div>
          </LeadField>
          <LeadField label={copy.requirement[lang]} error={errors.requirement}>
            <textarea
              name="requirement"
              rows={2}
              placeholder={copy.requirementPlaceholder[lang]}
              value={form.requirement}
              onChange={(event) => updateField("requirement", event.target.value)}
              required
              aria-invalid={Boolean(errors.requirement)}
              className="vf-lead-field resize-none"
            />
          </LeadField>
          <p className="pt-1 text-xs leading-[1.35] tracking-ui text-mute">{copy.notice[lang]}</p>
          {status === "failure" ? (
            <p role="alert" className="text-[13px] tracking-ui text-claydeep">
              {copy.failure[lang]}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={status === "saving"}
            className="vf-lead-submit mt-2 flex min-h-11 w-full items-center justify-center px-4 py-3 text-[13px] tracking-ui disabled:cursor-wait disabled:opacity-60"
          >
            {status === "saving" ? copy.saving[lang] : copy.submit[lang]}
          </button>
          <button
            type="button"
            onClick={close}
            disabled={status === "saving"}
            className="mx-auto hidden min-h-11 px-2 text-[13px] tracking-ui text-mute underline underline-offset-4 hover:text-ink disabled:opacity-50 sm:block"
          >
            {copy.continue[lang]}
          </button>
        </form>
      )}
    </div>
  );
}

function LeadField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[13px] leading-[1.35] tracking-ui text-mute">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs tracking-ui text-claydeep">{error}</span> : null}
    </label>
  );
}
