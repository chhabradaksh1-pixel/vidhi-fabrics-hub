import { useEffect, useMemo, useRef, useState } from "react";

import { CATALOGUE_RANGES, FABRICS, type CatalogueRange } from "@/content/fabrics";
import { PROMO_SUITS } from "@/content/promo-suits";
import {
  CATEGORY_LABELS,
  COPY,
  type Fabric,
  type FabricCategory,
  type Lang,
} from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

import "@/styles/showroom.css";

function rangeHref(href: string, lang: Lang) {
  return lang === "hi" ? `/hi${href}` : href;
}

function rangeMatches(line: CatalogueRange, lang: Lang, needle: string, materials: Material[]) {
  if (
    materials.length > 0 &&
    (line.category === "sourcing" || !materials.includes(line.category))
  ) {
    return false;
  }
  if (needle === "") return true;
  return [line.name[lang], line.tag[lang], line.body[lang]].some((field) =>
    field.toLowerCase().includes(needle),
  );
}

/**
 * The fabric catalogue.
 *
 * Previously this lived inline and identically in both `index.tsx` and
 * `hi.tsx`, which meant every change had to be made twice. It is one component
 * now so the two routes cannot drift.
 *
 * The browsing controls follow the patterns a buyer already knows from
 * back-office catalogues — text search, material facets, a sort, and a detail
 * panel — plus a specification table in the register of a financial-data page:
 * columns, a zebra rule, no photographs. The table view is the one that earns
 * its place here, because comparing GSM and width across SKUs is what the
 * visitor is actually doing, and a photograph cannot answer that question.
 *
 * Every control is native HTML. No combobox, table or drawer library: the
 * select is a `<select>`, the facets are buttons, the table is a `<table>`.
 */

type Material = Exclude<FabricCategory, "all">;
type SortKey = "name" | "sku" | "width";
type View = "grid" | "table";

const MATERIALS: Material[] = ["cotton", "silk", "linen", "polyester", "jacquard"];
const SORTS: SortKey[] = ["name", "sku", "width"];

const SORT_LABEL: Record<SortKey, keyof typeof COPY.catalogue> = {
  name: "sortName",
  sku: "sortSku",
  width: "sortWidth",
};

/** `localeCompare` collates Devanagari correctly only when told the locale. */
function collator(lang: Lang) {
  return new Intl.Collator(lang === "hi" ? "hi" : "en");
}

function fill(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, value),
    template,
  );
}

export function FabricCatalogueSection({ lang }: { lang: Lang }) {
  const [query, setQuery] = useState("");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [sort, setSort] = useState<SortKey>("name");
  const [view, setView] = useState<View>("grid");
  const [openSku, setOpenSku] = useState<string | null>(null);

  const needle = query.trim().toLowerCase();
  const ranges = useMemo(() => {
    const matched = CATALOGUE_RANGES.filter((line) => rangeMatches(line, lang, needle, materials));
    // While the suit promo is on, keep that range card first. Filters still
    // drop it when its material is not selected. Other cards stay in order.
    if (!PROMO_SUITS) return matched;
    return [
      ...matched.filter((line) => line.id === "dress-material"),
      ...matched.filter((line) => line.id !== "dress-material"),
    ];
  }, [lang, materials, needle]);

  const shown = useMemo(() => {
    const matched = FABRICS.filter((f) => {
      if (materials.length > 0 && !materials.includes(f.category)) return false;
      if (needle === "") return true;
      return [f.sku, f.name[lang], f.tag[lang], f.spec[lang]].some((field) =>
        field.toLowerCase().includes(needle),
      );
    });

    const compare = collator(lang);
    return [...matched].sort((a, b) => {
      if (sort === "sku") return a.sku.localeCompare(b.sku);
      if (sort === "width") return a.widthIn - b.widthIn;
      return compare.compare(a.name[lang], b.name[lang]);
    });
  }, [lang, materials, needle, sort]);

  const filtered = query.trim() !== "" || materials.length > 0;
  const open = openSku === null ? undefined : shown.find((f) => f.sku === openSku);

  function toggleMaterial(m: Material) {
    setMaterials((current) =>
      current.includes(m) ? current.filter((c) => c !== m) : [...current, m],
    );
  }

  function clear() {
    setQuery("");
    setMaterials([]);
  }

  return (
    <section id="catalogue" className="scroll-mt-36">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-[50px] lg:py-32">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-label text-clay">
            {COPY.catalogue.marker[lang]}
          </p>
          <h2 className="vf-showroom-serif mt-4 text-4xl tracking-normal lg:text-5xl">
            {COPY.catalogue.heading[lang]}
          </h2>
          <p className="mt-5 max-w-[46ch] text-pretty text-lg text-mute">
            {COPY.catalogue.body[lang]}
          </p>
        </div>

        {/* Toolbar: search, sort, view. Stacks on narrow screens. */}
        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-xs lg:flex-1">
            <label htmlFor="fabric-search" className="sr-only">
              {COPY.catalogue.searchLabel[lang]}
            </label>
            <input
              id="fabric-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={COPY.catalogue.searchPlaceholder[lang]}
              className="w-full rounded-sm border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-mute focus:border-clay focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <label
                htmlFor="fabric-sort"
                className="font-mono text-xs uppercase tracking-label text-mute"
              >
                {COPY.catalogue.sortLabel[lang]}
              </label>
              <select
                id="fabric-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-sm border border-line bg-paper px-2 py-1.5 text-sm text-ink focus:border-clay focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s} value={s}>
                    {COPY.catalogue[SORT_LABEL[s]][lang]}
                  </option>
                ))}
              </select>
            </div>

            <div
              role="group"
              aria-label={COPY.catalogue.viewLabel[lang]}
              className="flex gap-2 font-mono text-xs uppercase tracking-label"
            >
              {(["grid", "table"] as View[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`rounded-sm px-3 py-2 transition-colors ${
                    view === v ? "bg-ink text-paper" : "text-mute ring-1 ring-line hover:text-ink"
                  }`}
                >
                  {v === "grid" ? COPY.catalogue.viewGrid[lang] : COPY.catalogue.viewTable[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Material facets. Multi-select: no selection means everything. */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label={COPY.catalogue.filterLabel[lang]}
            className="flex flex-wrap gap-2 font-mono text-xs"
          >
            {MATERIALS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => toggleMaterial(m)}
                aria-pressed={materials.includes(m)}
                className={`rounded-sm px-3 py-2 transition-colors ${
                  materials.includes(m)
                    ? "bg-ink text-paper"
                    : "text-mute ring-1 ring-line hover:text-ink"
                }`}
              >
                {CATEGORY_LABELS[m][lang]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <p aria-live="polite" className="font-mono text-xs tracking-label text-mute">
              {fill(COPY.catalogue.count[lang], {
                shown: String(shown.length + ranges.length),
                total: String(FABRICS.length + CATALOGUE_RANGES.length),
              })}
            </p>
            {filtered && (
              <button
                type="button"
                onClick={clear}
                className="font-mono text-xs uppercase tracking-label text-clay underline underline-offset-4 hover:text-claydeep"
              >
                {COPY.catalogue.clear[lang]}
              </button>
            )}
          </div>
        </div>

        {shown.length + ranges.length === 0 ? (
          <p className="mt-10 text-sm text-mute">
            {query.trim() === "" ? COPY.catalogue.empty[lang] : COPY.catalogue.noResults[lang]}
          </p>
        ) : (
          <>
            {ranges.length > 0 && <RangeGrid lang={lang} ranges={ranges} />}
            {shown.length > 0 &&
              (view === "table" ? (
                <SpecTable lang={lang} fabrics={shown} onOpen={setOpenSku} />
              ) : (
                <FabricGrid lang={lang} fabrics={shown} onOpen={setOpenSku} />
              ))}
          </>
        )}
      </div>

      {open && <FabricDetail lang={lang} fabric={open} onClose={() => setOpenSku(null)} />}
    </section>
  );
}

/**
 * Specification table. Real `<table>` markup, because these are tabular
 * specifications and a buyer comparing them reads down a column. The zebra
 * rule carries the row, so there are no vertical rules to count.
 */
function SpecTable({
  lang,
  fabrics,
  onOpen,
}: {
  lang: Lang;
  fabrics: Fabric[];
  onOpen: (sku: string) => void;
}) {
  /*
   * Composition and width both restate what the specification string already
   * says, so they are dropped on small screens rather than pushing the table
   * into a long horizontal scroll on a phone. The fabric name is the control
   * that opens the detail panel, which is one tab stop per row instead of two
   * and saves a whole column.
   */
  const heads = [
    { key: "colSku", className: "" },
    { key: "colName", className: "" },
    { key: "colComposition", className: "hidden md:table-cell" },
    { key: "colWidth", className: "hidden md:table-cell" },
    { key: "colSpec", className: "" },
  ] as const;

  return (
    <div className="mt-10 overflow-x-auto">
      <table className="w-full border-collapse text-left md:min-w-[46rem]">
        <caption className="sr-only">{COPY.catalogue.heading[lang]}</caption>
        <thead>
          <tr className="border-b border-line">
            {heads.map((h) => (
              <th
                key={h.key}
                scope="col"
                className={`py-3 pr-6 font-mono text-xs font-normal uppercase tracking-label text-clay ${h.className}`}
              >
                {COPY.catalogue[h.key][lang]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fabrics.map((f) => (
            <tr key={f.sku} className="border-b border-line/70 odd:bg-sand/40">
              <th
                scope="row"
                className="whitespace-nowrap py-4 pr-6 align-top font-mono text-xs font-normal text-mute"
              >
                {f.sku}
              </th>
              <td className="py-4 pr-6 align-top">
                <button
                  type="button"
                  onClick={() => onOpen(f.sku)}
                  className="text-left font-display text-lg font-light tracking-normal underline-offset-4 hover:underline"
                >
                  {f.name[lang]}
                  <span className="sr-only"> — {COPY.catalogue.detailOpen[lang]}</span>
                </button>
              </td>
              <td className="hidden py-4 pr-6 align-top text-sm text-mute md:table-cell">
                {f.tag[lang]}
              </td>
              <td className="hidden py-4 pr-6 align-top font-mono text-xs text-mute md:table-cell">
                {f.widthIn}&quot;
              </td>
              <td className="py-4 align-top text-sm text-mute">{f.spec[lang]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const rangeLink =
  "text-sm text-clay underline decoration-clay/70 underline-offset-4 hover:text-claydeep";
const rangeButton = "vf-showroom-enquire mt-1 w-full sm:w-auto";

/**
 * The four selling ranges, in a fixed order above the cloth examples.
 * Text cards stay text — a stock photograph would claim a cloth the card
 * does not show. The dress-material card shows the suit, cropped to the
 * same 4:3 frame as the cloth cards below. Cards share a column width.
 * They align to the start of the row so a photograph does not stretch the
 * text card beside it into an empty box.
 */
function RangeGrid({ lang, ranges }: { lang: Lang; ranges: CatalogueRange[] }) {
  return (
    <div
      data-reveal-stagger
      className="mt-16 grid grid-cols-1 items-start gap-x-10 gap-y-16 sm:grid-cols-2"
    >
      {ranges.map((line) =>
        line.image ? (
          <SuitRangeCard key={line.id} lang={lang} line={line} image={line.image} />
        ) : (
          <article key={line.id} data-reveal className="flex flex-col">
            <div className="h-1 bg-clay" aria-hidden="true" />
            <div className="flex flex-1 flex-col pt-6">
              <p className="font-mono text-xs uppercase tracking-label text-clay">
                {line.tag[lang]}
              </p>
              <h3 className="vf-showroom-serif mt-3 text-3xl leading-tight">{line.name[lang]}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">{line.body[lang]}</p>
              <div className="mt-6 flex flex-col items-start gap-3">
                {line.whatsAppMessage ? (
                  <a
                    href={whatsAppUrl(line.whatsAppMessage[lang])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={rangeButton}
                  >
                    {COPY.catalogue.askOnWhatsApp[lang]}
                  </a>
                ) : null}
                <a href={rangeHref(line.pageHref, lang)} className={rangeLink}>
                  {line.linkLabel[lang]}
                </a>
              </div>
            </div>
          </article>
        ),
      )}
    </div>
  );
}

/**
 * The unstitched-suit card. Same column, type and top rule as the text
 * cards. The photograph is cropped to 4:3, the ratio used on the cloth cards.
 */
function SuitRangeCard({
  lang,
  line,
  image,
}: {
  lang: Lang;
  line: CatalogueRange;
  image: NonNullable<CatalogueRange["image"]>;
}) {
  return (
    <article data-reveal className="flex min-w-0 flex-col">
      <div className="h-1 bg-clay" aria-hidden="true" />
      <div className="flex flex-1 flex-col pt-6">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          width={image.width}
          height={image.height}
          className="aspect-[3/4] w-full object-cover object-[center_30%]"
        />
        <p className="mt-6 font-mono text-xs uppercase tracking-label text-clay">
          {line.tag[lang]}
        </p>
        <h3 className="vf-showroom-serif mt-3 text-3xl leading-tight">{line.name[lang]}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">{line.body[lang]}</p>
        <div className="mt-6 flex flex-col items-start gap-3">
          {line.whatsAppMessage ? (
            <a
              href={whatsAppUrl(line.whatsAppMessage[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className={rangeButton}
            >
              {COPY.catalogue.askOnWhatsApp[lang]}
            </a>
          ) : null}
          <a href={rangeHref(line.pageHref, lang)} className={rangeLink}>
            {line.linkLabel[lang]}
          </a>
        </div>
      </div>
    </article>
  );
}

/**
 * Every cloth card is the same size and the same 4:3 photograph, including
 * when a filter leaves a single result.
 */
function FabricGrid({
  lang,
  fabrics,
  onOpen,
}: {
  lang: Lang;
  fabrics: Fabric[];
  onOpen: (sku: string) => void;
}) {
  return (
    <div
      data-reveal-stagger
      className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
    >
      {fabrics.map((f) => (
        <article key={f.sku} data-reveal className="group relative flex h-full flex-col">
          <div data-reveal-block>
            <div data-reveal-panel>
              <img
                src={f.image}
                alt={f.name[lang]}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-3 font-mono text-xs text-mute">
            <span>{f.sku}</span>
            <span>{f.tag[lang]}</span>
          </div>
          <h3 className="vf-showroom-serif mt-2 text-2xl">{f.name[lang]}</h3>
          <p className="mt-1 text-sm text-mute">{f.spec[lang]}</p>
          <a
            href={whatsAppUrl(
              fill(COPY.catalogue.enquiryMessage[lang], {
                name: f.name[lang],
                sku: f.sku,
              }),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 mt-3 inline-block text-sm text-clay underline decoration-clay/70 underline-offset-4"
          >
            {COPY.catalogue.askOnWhatsApp[lang]}
          </a>
          <button
            type="button"
            onClick={() => onOpen(f.sku)}
            className="absolute inset-0 rounded-sm"
          >
            <span className="sr-only">
              {COPY.catalogue.detailOpen[lang]} — {f.name[lang]}
            </span>
          </button>
        </article>
      ))}
    </div>
  );
}

/**
 * Detail panel. Hand-rolled rather than pulled from a dialog library, to match
 * the lead popup already in `index.tsx` and to keep the route bundle as it is:
 * same focus trap, same Escape handling, same tokens.
 */
function FabricDetail({
  lang,
  fabric,
  onClose,
}: {
  lang: Lang;
  fabric: Fabric;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const dialog = closeRef.current?.closest("[role=dialog]");
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>("a[href], button:not(:disabled)"),
      );
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

    // Hold the page still behind the panel, compensating for the scrollbar
    // so the sticky header does not jump as it is removed.
    const { body, documentElement } = document;
    const barWidth = window.innerWidth - documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    body.style.overflow = "hidden";
    if (barWidth > 0) body.style.paddingRight = `${barWidth}px`;

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      returnTo?.focus();
    };
  }, [onClose]);

  const rows: { label: string; value: string }[] = [
    { label: COPY.catalogue.colSku[lang], value: fabric.sku },
    { label: COPY.catalogue.colComposition[lang], value: fabric.tag[lang] },
    { label: COPY.catalogue.colWidth[lang], value: `${fabric.widthIn}"` },
    { label: COPY.catalogue.colSpec[lang], value: fabric.spec[lang] },
  ];

  // z-80 keeps the panel above the talk-to-us launcher at z-70, which
  // otherwise floats over the panel's own enquiry button.
  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-ink/55" role="presentation">
      {/* Clicking the backdrop closes. Keyboard users have Escape and the
          close button, so this carries no separate tab stop. */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="fabric-detail-heading"
        className="vf-pop-in relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-paper shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line p-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-label text-clay">{fabric.sku}</p>
            <h3
              id="fabric-detail-heading"
              className="mt-2 font-display text-2xl font-light tracking-normal"
            >
              {fabric.name[lang]}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={COPY.catalogue.detailClose[lang]}
            className="shrink-0 rounded-sm px-2 py-1 text-2xl leading-none text-mute hover:bg-sand hover:text-ink"
          >
            ×
          </button>
        </div>

        <img
          src={fabric.image}
          alt={fabric.name[lang]}
          width={1024}
          height={768}
          className="aspect-[4/3] w-full object-cover"
        />

        <dl className="px-6 py-2">
          {rows.map((row) => (
            <div key={row.label} className="flex gap-4 border-b border-line/70 py-3 last:border-0">
              <dt className="w-28 shrink-0 font-mono text-xs uppercase tracking-label text-mute">
                {row.label}
              </dt>
              <dd className="text-sm text-ink">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto border-t border-line p-6">
          <a
            href={whatsAppUrl(
              fill(COPY.catalogue.enquiryMessage[lang], {
                name: fabric.name[lang],
                sku: fabric.sku,
              }),
            )}
            target="_blank"
            rel="noreferrer"
            className="block rounded-sm bg-clay px-4 py-3 text-center text-sm font-semibold text-paper hover:bg-claydeep"
          >
            {COPY.catalogue.detailEnquire[lang]}
          </a>
        </div>
      </div>
    </div>
  );
}
