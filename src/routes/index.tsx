import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import warehouseShowroom from "@/assets/maxresdefault.jpg";
import { FABRICS } from "@/content/fabrics";
import {
  CATEGORY_LABELS,
  COPY,
  LANGUAGES,
  type FabricCategory,
  type Lang,
} from "@/content/translations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Wholesale Fabrics in Surat | Vidhi Fabrics",
      },
      {
        name: "description",
        content:
          "Vidhi Fabrics is a wholesale fabric and textile sourcing business in Surat, serving retailers, brands, manufacturers and traders with broad fabric requirements across 40+ markets.",
      },
      {
        property: "og:title",
        content: "Wholesale Fabrics in Surat | Vidhi Fabrics",
      },
      {
        property: "og:description",
        content:
          "Wholesale fabric supply and sourcing from Surat for retailers, brands, manufacturers and textile buyers. Broad materials, constructions, patterns and finishes, with quotations within 12 hours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CATEGORIES: FabricCategory[] = [
  "all",
  "cotton",
  "silk",
  "linen",
  "polyester",
  "jacquard",
];

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [category, setCategory] = useState<FabricCategory>("all");
  const [sent, setSent] = useState(false);

  const fabrics = useMemo(
    () =>
      category === "all"
        ? FABRICS
        : FABRICS.filter((f) => f.category === category),
    [category],
  );

  return (
    <div className="min-h-screen bg-paper font-body text-ink antialiased selection:bg-clay/20">
      <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-semibold tracking-tight">
              {COPY.brand[lang]}
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.15em] text-mute sm:block">
              {COPY.established[lang]}
            </span>
          </div>

          <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.12em] text-mute md:flex">
            <a href="#catalogue" className="transition-colors hover:text-ink">
              {COPY.nav.catalogue[lang]}
            </a>
            <a href="#scale" className="transition-colors hover:text-ink">
              {COPY.nav.scale[lang]}
            </a>
            <a href="#contact" className="transition-colors hover:text-ink">
              {COPY.nav.contact[lang]}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div
              className="flex overflow-hidden rounded-sm ring-1 ring-line"
              role="group"
              aria-label="Language"
            >
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  aria-pressed={lang === l.code}
                  title={l.label}
                  className={`px-3 py-2 font-mono text-sm transition-colors ${
                    lang === l.code
                      ? "bg-ink text-paper"
                      : "text-mute hover:text-ink"
                  }`}
                >
                  {l.code === "en" ? "EN" : l.code === "hi" ? "हिंदी" : "Hinglish"}
                </button>
              ))}
            </div>
            <a
              href="#inquiry"
              className="rounded-sm bg-clay px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-claydeep"
            >
              {COPY.nav.cta[lang]}
            </a>
          </div>
        </div>
      </header>

      <section className="vf-rise border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
              {COPY.hero.eyebrow[lang]}
            </p>
            <h1 className="mt-5 text-balance font-display text-5xl font-semibold leading-[1.03] tracking-tight lg:text-6xl">
              {COPY.hero.heading[lang]}
            </h1>
            <p className="mt-6 max-w-[46ch] text-pretty text-lg text-mute">
              {COPY.hero.body[lang]}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-mute">
              {COPY.hero.stats.map((s) => (
                <span key={s.en}>{s[lang]}</span>
              ))}
            </div>
          </div>

          <div
            id="inquiry"
            className="rounded-md bg-sand/50 p-6 ring-1 ring-black/5 lg:col-span-5"
          >
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-clay">
              {COPY.inquiry.label[lang]}
            </p>
            <p className="mt-1 text-sm text-mute">{COPY.inquiry.sub[lang]}</p>
            <form
              className="mt-5 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                required
                className="w-full rounded-sm bg-paper px-3 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-clay"
                placeholder={COPY.inquiry.company[lang]}
                aria-label={COPY.inquiry.company[lang]}
              />
              <input
                required
                type="email"
                className="w-full rounded-sm bg-paper px-3 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-clay"
                placeholder={COPY.inquiry.email[lang]}
                aria-label={COPY.inquiry.email[lang]}
              />
              <input
                className="w-full rounded-sm bg-paper px-3 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-clay"
                placeholder={COPY.inquiry.phone[lang]}
                aria-label={COPY.inquiry.phone[lang]}
              />
              <select
                className="w-full rounded-sm bg-paper px-3 py-2.5 text-sm text-mute outline-none ring-1 ring-line focus:ring-clay"
                aria-label={COPY.inquiry.buyerTypes.retail[lang]}
              >
                <option>{COPY.inquiry.buyerTypes.retail[lang]}</option>
                <option>{COPY.inquiry.buyerTypes.wholesaler[lang]}</option>
                <option>{COPY.inquiry.buyerTypes.trader[lang]}</option>
                <option>{COPY.inquiry.buyerTypes.manufacturer[lang]}</option>
              </select>
              <textarea
                rows={3}
                className="w-full resize-none rounded-sm bg-paper px-3 py-2.5 text-sm outline-none ring-1 ring-line focus:ring-clay"
                placeholder={COPY.inquiry.message[lang]}
                aria-label={COPY.inquiry.message[lang]}
              />
              <button
                type="submit"
                className="w-full rounded-sm bg-clay py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-claydeep"
              >
                {COPY.inquiry.submit[lang]}
              </button>
              {sent ? (
                <p className="pt-1 text-sm text-sage">
                  {COPY.inquiry.sent[lang]}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </section>

      <section id="catalogue" className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
                {COPY.catalogue.marker[lang]}
              </p>
              <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
                {COPY.catalogue.heading[lang]}
              </h2>
              <p className="mt-3 max-w-[55ch] text-sm text-mute">
                {COPY.catalogue.body[lang]}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`rounded-sm px-3 py-2 transition-colors ${
                    category === c
                      ? "bg-ink text-paper"
                      : "text-mute ring-1 ring-line hover:text-ink"
                  }`}
                >
                  {CATEGORY_LABELS[c][lang]}
                </button>
              ))}
            </div>
          </div>

          {fabrics.length === 0 ? (
            <p className="mt-10 text-sm text-mute">
              {COPY.catalogue.empty[lang]}
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {fabrics.map((f) => (
                <article
                  key={f.sku}
                  className="overflow-hidden rounded-md bg-sand/40 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={f.image}
                    alt={f.name.en}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between font-mono text-[11px] text-mute">
                      <span>{f.sku}</span>
                      <span>{f.tag[lang]}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold">
                      {f.name[lang]}
                    </h3>
                    <p className="mt-1 text-sm text-mute">{f.spec[lang]}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="scale" className="border-b border-line bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
            {COPY.scale.marker[lang]}
          </p>
          <h2 className="mt-3 max-w-[20ch] text-balance font-display text-4xl font-semibold tracking-tight lg:text-5xl">
            {COPY.scale.heading[lang]}
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-px bg-paper/15 lg:grid-cols-4">
            {COPY.scale.stats.map((s) => (
              <div key={s.value} className="bg-ink p-6">
                <p className="font-display text-5xl font-semibold text-clay">
                  {s.value}
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-paper/60">
                  {s.label[lang]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <img
              src={warehouseShowroom}
              alt={COPY.scale.imageAlt[lang]}
              loading="lazy"
              width={1440}
              height={900}
              className="aspect-[16/10] w-full rounded-md object-cover ring-1 ring-white/10"
            />
            <div className="max-w-[40ch] text-pretty text-base text-paper/80">
              <p className="font-display text-2xl font-semibold text-paper">
                {COPY.scale.certTitle[lang]}
              </p>
              <p className="mt-4">{COPY.scale.certBody[lang]}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-paper">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
              {COPY.contact.marker[lang]}
            </p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight lg:text-5xl">
              {COPY.contact.heading[lang]}
            </h2>
            <p className="mt-5 max-w-[40ch] text-pretty text-mute">
              {COPY.contact.body[lang]}
            </p>
            <a
              href="#inquiry"
              className="mt-7 inline-block rounded-sm bg-clay px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-claydeep"
            >
              {COPY.contact.cta[lang]}
            </a>
          </div>
          <div className="space-y-4 font-mono text-sm text-mute">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-clay">
                {COPY.contact.hqLabel[lang]}
              </p>
              <p className="mt-1 text-ink">{COPY.contact.hqValue[lang]}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-clay">
                {COPY.contact.deskLabel[lang]}
              </p>
              <p className="mt-1 text-ink">
                09825208413 &nbsp;·&nbsp; chhabradaksh1@gmail.com
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-clay">
                {COPY.contact.hoursLabel[lang]}
              </p>
              <p className="mt-1 text-ink">{COPY.contact.hoursValue[lang]}</p>
            </div>
          </div>
        </div>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
            <span>{COPY.footer.left[lang]}</span>
            <span>{COPY.footer.right[lang]}</span>
          </div>
        </footer>
      </section>
    </div>
  );
}
