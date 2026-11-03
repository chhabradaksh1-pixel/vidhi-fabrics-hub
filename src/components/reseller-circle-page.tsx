import { useState, type FormEvent } from "react";

import { JournalFooter, JournalHeader } from "@/components/fabric-desk";
import { FORMSPREE_ENDPOINT } from "@/content/forms";
import { CIRCLE_PAGE } from "@/content/reseller-circle-copy";
import { useLeadContext } from "@/hooks/use-lead-context";
import { trackLeadEvent } from "@/lib/analytics";
import { currentLeadContext } from "@/lib/lead-source";

type Fields = { name: string; city: string; businessType: string; whatsapp: string };
const EMPTY: Fields = { name: "", city: "", businessType: "", whatsapp: "" };

const inputClass =
  "mt-1 w-full rounded-sm border border-line bg-surface px-3 py-2.5 text-ink outline-none focus:border-plum focus:ring-1 focus:ring-plum";

/** 10 to 15 digits, with an optional leading "+" and spaces or dashes. */
function validPhone(value: string) {
  const v = value.trim();
  if (!/^\+?[\d\s-]+$/.test(v)) return false;
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function ResellerCirclePage({ lang }: { lang: "en" | "hi" }) {
  const copy = CIRCLE_PAGE[lang];
  const pathname = lang === "hi" ? "/hi/reseller-circle" : "/reseller-circle";
  const lead = useLeadContext(pathname);
  const home = lang === "hi" ? "/hi" : "/";
  const p = lang === "hi" ? "/hi" : "";

  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function update(field: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) next.name = copy.required;
    if (!fields.city.trim()) next.city = copy.required;
    if (!fields.businessType) next.businessType = copy.required;
    if (!validPhone(fields.whatsapp)) next.whatsapp = copy.invalidPhone;
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    const ctx = currentLeadContext();
    const body = new FormData();
    body.set("form", "reseller-circle");
    body.set("name", fields.name.trim());
    body.set("city", fields.city.trim());
    body.set("business_type", fields.businessType);
    body.set("whatsapp", fields.whatsapp.trim());
    body.set("language", lang);
    body.set("page", ctx.page);
    body.set("source", ctx.source);
    body.set("ref_code", ctx.ref);

    setStatus("sending");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Formspree submission failed");
      trackLeadEvent("form_submit", { page: ctx.page, source: ctx.source, ref_code: ctx.ref });
      setStatus("success");
      setFields(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  // On the long-form rail, like the range pages: each heading in the rail
  // beside its content (.vf-flow), the join form as the white card in the
  // content column. Layout only; every word is in place.
  return (
    <div className="min-h-screen bg-linen text-ink">
      <JournalHeader lang={lang} />
      <main>
        <article
          className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 sm:pt-11 lg:px-[50px] lg:pb-24 lg:pt-14"
          lang={lang}
        >
          <nav aria-label={copy.breadcrumbLabel} className="type-small text-mute">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href={home} className="hover:text-plum">
                  {copy.breadcrumbHome}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">{copy.breadcrumb}</li>
            </ol>
          </nav>

          <h1 className="mt-6 max-w-[28ch] type-h1">{copy.title}</h1>

          <div className="vf-flow">
            <p className="mt-8 type-lead text-mute">{copy.lede}</p>

            <h2 className="vf-heading-strong type-h4 text-ink">{copy.benefitsHeading}</h2>
            <ul className="divide-y divide-line">
              {copy.benefits.map((b) => (
                <li key={b.title} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="type-h4">{b.title}</h3>
                  <p className="mt-1 type-body text-mute">{b.body}</p>
                </li>
              ))}
            </ul>

            <h2 className="vf-heading-strong type-h4 text-ink">{copy.whoHeading}</h2>
            <p className="mt-5 type-body text-mute">{copy.who}</p>

            <h2 className="vf-heading-strong type-h4 text-ink">{copy.howHeading}</h2>
            <ol className="mt-5 list-decimal space-y-2 pl-6 type-body text-mute">
              {copy.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>

            <section id="join" aria-labelledby="join-heading" className="scroll-mt-28">
              <h2 id="join-heading" className="vf-heading-strong type-h4 text-ink">
                {copy.formHeading}
              </h2>

              {status === "success" ? (
                <div role="status" className="card p-6 sm:p-8">
                  <p className="type-h4 text-sage">{copy.thanksHeading}</p>
                  <p className="mt-2 type-body text-ink">{copy.thanks}</p>
                </div>
              ) : (
                <form className="card space-y-4 p-6 sm:p-8" onSubmit={handleSubmit} noValidate>
                  <p className="type-small text-mute">{copy.formIntro}</p>
                  {/* Lead-source codes; see docs/lead-source-legend.md. The
                      submit handler re-reads them, so these are a fallback. */}
                  <input type="hidden" name="form" value="reseller-circle" />
                  <input type="hidden" name="page" value={lead.page} />
                  <input type="hidden" name="source" value={lead.source} />
                  <input type="hidden" name="ref_code" value={lead.ref} />

                  <label className="block type-small">
                    {copy.name}
                    <input
                      name="name"
                      autoComplete="name"
                      value={fields.name}
                      onChange={(e) => update("name", e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      className={inputClass}
                    />
                    {errors.name ? (
                      <span className="mt-1 block text-error">{errors.name}</span>
                    ) : null}
                  </label>

                  <label className="block type-small">
                    {copy.city}
                    <input
                      name="city"
                      autoComplete="address-level2"
                      value={fields.city}
                      onChange={(e) => update("city", e.target.value)}
                      aria-invalid={Boolean(errors.city)}
                      className={inputClass}
                    />
                    {errors.city ? (
                      <span className="mt-1 block text-error">{errors.city}</span>
                    ) : null}
                  </label>

                  <label className="block type-small">
                    {copy.businessType}
                    <select
                      name="business_type"
                      value={fields.businessType}
                      onChange={(e) => update("businessType", e.target.value)}
                      aria-invalid={Boolean(errors.businessType)}
                      className={inputClass}
                    >
                      <option value="">{copy.businessTypePlaceholder}</option>
                      {copy.businessTypes.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    {errors.businessType ? (
                      <span className="mt-1 block text-error">{errors.businessType}</span>
                    ) : null}
                  </label>

                  <label className="block type-small">
                    {copy.whatsapp}
                    <input
                      name="whatsapp"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={fields.whatsapp}
                      onChange={(e) => update("whatsapp", e.target.value)}
                      aria-invalid={Boolean(errors.whatsapp)}
                      className={inputClass}
                    />
                    <span className="mt-1 block type-small text-mute">{copy.whatsappHint}</span>
                    {errors.whatsapp ? (
                      <span className="mt-1 block text-error">{errors.whatsapp}</span>
                    ) : null}
                  </label>

                  {status === "error" ? (
                    <p role="alert" className="type-small text-error">
                      {copy.error}
                    </p>
                  ) : null}

                  <button type="submit" disabled={status === "sending"} className="btn btn-primary">
                    {status === "sending" ? copy.sending : copy.submit}
                  </button>
                  <p className="type-small text-mute">{copy.privacy}</p>
                </form>
              )}
            </section>

            <p className="mt-10 type-body text-mute">
              {copy.related}{" "}
              <a href={`${p}/saree-wholesale-for-resellers`} className="link">
                {lang === "hi" ? "रीसेलर के लिए साड़ी होलसेल" : "saree wholesale for resellers"}
              </a>
              ,{" "}
              <a href={`${p}/organza-net-fabric-for-boutiques`} className="link">
                {lang === "hi"
                  ? "बुटीक के लिए ऑर्गेंज़ा और नेट"
                  : "organza and net fabric for boutiques"}
              </a>
              ,{" "}
              <a href={`${p}/polyester-sarees-wholesale-surat`} className="link">
                {lang === "hi" ? "पॉलिएस्टर साड़ी होलसेल" : "polyester sarees wholesale"}
              </a>{" "}
              {lang === "hi" ? "और" : "and"}{" "}
              <a href={`${p}/dress-material-wholesale-surat`} className="link">
                {lang === "hi" ? "ड्रेस मटेरियल होलसेल" : "dress material wholesale"}
              </a>
              {lang === "hi" ? "।" : "."}
            </p>
          </div>
        </article>
      </main>
      <JournalFooter lang={lang} />
    </div>
  );
}
