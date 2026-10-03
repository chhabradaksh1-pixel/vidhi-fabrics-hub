import { useEffect, useRef, useState } from "react";

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
 * It no longer opens on page load. On mobile it covered the hero on first
 * view, and Lighthouse timed its heading as the page's largest paint. It now
 * opens once per session, after real engagement: half the page scrolled, or
 * 35 seconds on the page, whichever comes first. See `useEngagementPopup`.
 */

function announce(open: boolean) {
  const detail: LeadPopupEventDetail = { open };
  window.dispatchEvent(new CustomEvent(LEAD_POPUP_EVENT, { detail }));
}

const SESSION_KEY = "vidhi-lead-popup-seen";
const ENGAGED_MS = 35_000;
const ENGAGED_SCROLL = 0.5;

/**
 * Opens the pop-up once per session after half the page is scrolled or
 * ENGAGED_MS on the page. Never on load. The session key is written when the
 * pop-up actually opens, so a visitor who leaves early sees it on a later
 * page view in the same session instead of never.
 */
export function useEngagementPopup(): [boolean, (open: boolean) => void] {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "1") return;
    } catch {
      return; // no storage, no way to keep it to once a session: skip it
    }

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
  const nameRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<LeadForm>({
    name: "",
    phone: "",
    business: "",
    requirement: "",
  });
  const [dial, setDial] = useState<string>("+91");
  const [errors, setErrors] = useState<Partial<Record<keyof LeadForm, string>>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "failure">("idle");

  useEffect(() => {
    nameRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "saving") onClose();
      if (event.key !== "Tab") return;
      const dialog = nameRef.current?.closest("[role=dialog]");
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          "button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)",
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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
      setStatus("success");
    } catch {
      setStatus("failure");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/55 p-4"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-popup-heading"
        className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto rounded-md bg-paper p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 id="lead-popup-heading" className="font-display text-3xl font-light tracking-tight">
              {copy.heading[lang]}
            </h2>
            <p className="mt-2 text-sm text-mute">{copy.body[lang]}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={status === "saving"}
            aria-label={copy.close[lang]}
            className="shrink-0 rounded-sm px-2 py-1 text-2xl leading-none text-mute hover:bg-sand hover:text-ink disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {status === "success" ? (
          <div className="mt-7 space-y-5">
            <p className="text-sage">{copy.success[lang]}</p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm bg-clay px-4 py-3 text-sm text-paper hover:bg-claydeep"
            >
              {copy.continue[lang]}
            </button>
          </div>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <LeadField label={copy.name[lang]} error={errors.name}>
              <input
                ref={nameRef}
                name="name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
                aria-invalid={Boolean(errors.name)}
                className="vf-lead-input"
              />
            </LeadField>
            <LeadField label={copy.phone[lang]} error={errors.phone}>
              <div className="flex gap-2">
                <select
                  name="dial_code"
                  value={dial}
                  onChange={(event) => {
                    setDial(event.target.value);
                    setErrors(({ phone: _cleared, ...rest }) => rest);
                  }}
                  aria-label={copy.countryCode[lang]}
                  className="vf-lead-input w-auto max-w-[9.5rem] shrink-0 bg-sand pr-2"
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
                  className="vf-lead-input"
                />
              </div>
            </LeadField>
            <LeadField label={copy.business[lang]}>
              <input
                name="business"
                value={form.business}
                onChange={(event) => updateField("business", event.target.value)}
                className="vf-lead-input"
              />
            </LeadField>
            <LeadField label={copy.requirement[lang]} error={errors.requirement}>
              <textarea
                name="requirement"
                rows={3}
                placeholder={copy.requirementPlaceholder[lang]}
                value={form.requirement}
                onChange={(event) => updateField("requirement", event.target.value)}
                required
                aria-invalid={Boolean(errors.requirement)}
                className="vf-lead-input resize-none"
              />
            </LeadField>
            <p className="text-xs text-mute">{copy.notice[lang]}</p>
            {status === "failure" ? (
              <p role="alert" className="text-sm text-claydeep">
                {copy.failure[lang]}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                disabled={status === "saving"}
                className="text-sm text-mute underline-offset-4 hover:text-ink hover:underline disabled:opacity-50"
              >
                {copy.continue[lang]}
              </button>
              <button
                type="submit"
                disabled={status === "saving"}
                className="rounded-sm bg-clay px-5 py-3 text-sm text-paper hover:bg-claydeep disabled:cursor-wait disabled:opacity-60"
              >
                {status === "saving" ? copy.saving[lang] : copy.submit[lang]}
              </button>
            </div>
          </form>
        )}
      </div>
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
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-claydeep">{error}</span> : null}
    </label>
  );
}
