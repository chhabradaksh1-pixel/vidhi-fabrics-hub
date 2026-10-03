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
  "mt-1 w-full rounded-sm border border-line bg-paper px-3 py-2.5 text-ink outline-none focus:border-clay focus:ring-1 focus:ring-clay";

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

  return (
    <div className="min-h-screen bg-paper text-ink">
      <JournalHeader lang={lang} />
      <main>
        <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16" lang={lang}>
          <nav aria-label={copy.breadcrumbLabel} className="text-xs text-mute">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href={home} className="hover:text-clay">
                  {copy.breadcrumbHome}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">{copy.breadcrumb}</li>
            </ol>
          </nav>

          <h1 className="mt-6 text-balance font-display text-4xl font-light leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>

          <div className="mx-auto max-w-[65ch]">
            <p className="mt-10 text-lg leading-relaxed text-mute">{copy.lede}</p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              {copy.benefitsHeading}
            </h2>
            <ul className="mt-6 space-y-5">
              {copy.benefits.map((b) => (
                <li key={b.title} className="border-l-2 border-clay/60 pl-4">
                  <h3 className="font-display text-lg font-light">{b.title}</h3>
                  <p className="mt-1 leading-[1.8] text-mute">{b.body}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              {copy.whoHeading}
            </h2>
            <p className="mt-5 leading-[1.85] text-mute">{copy.who}</p>

            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
              {copy.howHeading}
            </h2>
            <ol className="mt-5 list-decimal space-y-2 pl-6 leading-[1.85] text-mute">
              {copy.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>

            <section
              id="join"
              aria-labelledby="join-heading"
              className="mt-12 scroll-mt-24 rounded-md bg-sand/60 p-6 ring-1 ring-black/5 sm:p-8"
            >
              <h2 id="join-heading" className="font-display text-2xl font-light sm:text-3xl">
                {copy.formHeading}
              </h2>

              {status === "success" ? (
                <div role="status" className="mt-5">
                  <p className="font-display text-xl text-sage">{copy.thanksHeading}</p>
                  <p className="mt-2 leading-[1.8] text-ink">{copy.thanks}</p>
                </div>
              ) : (
                <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
                  <p className="text-sm text-mute">{copy.formIntro}</p>
                  {/* Lead-source codes; see docs/lead-source-legend.md. The
                      submit handler re-reads them, so these are a fallback. */}
                  <input type="hidden" name="form" value="reseller-circle" />
                  <input type="hidden" name="page" value={lead.page} />
                  <input type="hidden" name="source" value={lead.source} />
                  <input type="hidden" name="ref_code" value={lead.ref} />

                  <label className="block text-sm">
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
                      <span className="mt-1 block text-claydeep">{errors.name}</span>
                    ) : null}
                  </label>

                  <label className="block text-sm">
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
                      <span className="mt-1 block text-claydeep">{errors.city}</span>
                    ) : null}
                  </label>

                  <label className="block text-sm">
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
                      <span className="mt-1 block text-claydeep">{errors.businessType}</span>
                    ) : null}
                  </label>

                  <label className="block text-sm">
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
                    <span className="mt-1 block text-xs text-mute">{copy.whatsappHint}</span>
                    {errors.whatsapp ? (
                      <span className="mt-1 block text-claydeep">{errors.whatsapp}</span>
                    ) : null}
                  </label>

                  {status === "error" ? (
                    <p role="alert" className="text-sm text-claydeep">
                      {copy.error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-claydeep disabled:opacity-60"
                  >
                    {status === "sending" ? copy.sending : copy.submit}
                  </button>
                  <p className="text-xs text-mute">{copy.privacy}</p>
                </form>
              )}
            </section>

            <p className="mt-12 leading-[1.85] text-mute">
              {copy.related}{" "}
              <a
                href={`${p}/saree-wholesale-for-resellers`}
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                {lang === "hi" ? "रीसेलर के लिए साड़ी होलसेल" : "saree wholesale for resellers"}
              </a>
              ,{" "}
              <a
                href={`${p}/organza-net-fabric-for-boutiques`}
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                {lang === "hi"
                  ? "बुटीक के लिए ऑर्गेंज़ा और नेट"
                  : "organza and net fabric for boutiques"}
              </a>
              ,{" "}
              <a
                href={`${p}/polyester-sarees-wholesale-surat`}
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
                {lang === "hi" ? "पॉलिएस्टर साड़ी होलसेल" : "polyester sarees wholesale"}
              </a>{" "}
              {lang === "hi" ? "और" : "and"}{" "}
              <a
                href={`${p}/dress-material-wholesale-surat`}
                className="text-clay underline decoration-line underline-offset-4 hover:text-claydeep"
              >
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
