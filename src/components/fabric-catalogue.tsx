import { useEffect, useMemo, useRef, useState } from "react";

import { LoopVideo } from "@/components/loop-video";
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

  // Two parts on two grounds: the four selling ranges as white cards on the
  // page, then the cloth itself as a swatch library in its own white band, so
  // a collection is never mistaken for a cloth. One toolbar filters both, so
  // it stays at the top; the DOM order is unchanged.
  return (
    <section id="catalogue" className="scroll-mt-36 pb-8 sm:pb-11 lg:pb-14">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-11 lg:px-[50px] lg:pb-20 lg:pt-14">
        {/* Heading on the left, introduction on the right (Atelier). */}
        <div className="grid gap-y-5 lg:grid-cols-12 lg:items-end lg:gap-x-16">
          <p className="eyebrow type-label text-clay lg:col-span-12">
            {COPY.catalogue.marker[lang]}
          </p>
          <h2 className="type-h2 lg:col-span-7">{COPY.catalogue.heading[lang]}</h2>
          <p className="max-w-[46ch] type-lead text-mute lg:col-span-5 lg:justify-self-end">
            {COPY.catalogue.body[lang]}
          </p>
        </div>

        {/* Toolbar: search, sort, view. Stacks on narrow screens. */}
        {/* An Apple-style control bar: one white card holding search, sort and view. */}
        <div className="card mt-14 flex flex-col gap-4 p-3 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-md lg:flex-1">
            <label htmlFor="fabric-search" className="sr-only">
              {COPY.catalogue.searchLabel[lang]}
            </label>
            <input
              id="fabric-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={COPY.catalogue.searchPlaceholder[lang]}
              className="w-full rounded-full border border-transparent bg-linen px-5 py-2.5 type-body text-ink placeholder:text-mute focus:border-plum focus:bg-surface focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-2 lg:px-0">
            <div className="flex items-center gap-3">
              <label htmlFor="fabric-sort" className="type-label text-mute">
                {COPY.catalogue.sortLabel[lang]}
              </label>
              <select
                id="fabric-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-transparent bg-linen px-4 py-2 type-small text-ink focus:border-plum focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s} value={s}>
                    {COPY.catalogue[SORT_LABEL[s]][lang]}
                  </option>
                ))}
              </select>
            </div>

            <div role="group" aria-label={COPY.catalogue.viewLabel[lang]} className="segmented">
              {(["grid", "table"] as View[]).map((v) => (
                <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v}>
                  {v === "grid" ? COPY.catalogue.viewGrid[lang] : COPY.catalogue.viewTable[lang]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Material facets. Multi-select: no selection means everything. */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-1">
          <div
            role="group"
            aria-label={COPY.catalogue.filterLabel[lang]}
            className="flex flex-wrap gap-2 type-small"
          >
            {MATERIALS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => toggleMaterial(m)}
                aria-pressed={materials.includes(m)}
                className={`rounded-full px-4 py-1.5 transition-colors ${
                  materials.includes(m)
                    ? "bg-plum text-plumlight"
                    : "bg-surface text-mute shadow-[0_0_0_1px_var(--line)] hover:text-ink"
                }`}
              >
                {CATEGORY_LABELS[m][lang]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <p aria-live="polite" className="type-small text-mute">
              {fill(COPY.catalogue.count[lang], {
                shown: String(shown.length + ranges.length),
                total: String(FABRICS.length + CATALOGUE_RANGES.length),
              })}
            </p>
            {filtered && (
              <button type="button" onClick={clear} className="link type-small">
                {COPY.catalogue.clear[lang]}
              </button>
            )}
          </div>
        </div>

        {shown.length + ranges.length === 0 ? (
          <p className="mt-10 type-small text-mute">
            {query.trim() === "" ? COPY.catalogue.empty[lang] : COPY.catalogue.noResults[lang]}
          </p>
        ) : (
          ranges.length > 0 && <RangeGrid lang={lang} ranges={ranges} />
        )}
      </div>

      {shown.length > 0 && (
        <div className="border-y border-line bg-surface">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-[50px] lg:py-20">
            <h3 className="mb-8 type-h2 sm:mb-10">{COPY.catalogue.materialsTitle[lang]}</h3>
            {view === "table" ? (
              <SpecTable lang={lang} fabrics={shown} onOpen={setOpenSku} />
            ) : (
              <FabricGrid lang={lang} fabrics={shown} onOpen={setOpenSku} />
            )}
          </div>
        </div>
      )}

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
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left md:min-w-[46rem]">
        <caption className="sr-only">{COPY.catalogue.heading[lang]}</caption>
        <thead>
          <tr className="border-b border-line">
            {heads.map((h) => (
              <th
                key={h.key}
                scope="col"
                className={`py-3 pr-6 type-label text-clay ${h.className}`}
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
                className="whitespace-nowrap py-4 pr-6 align-top type-small tabular-nums text-mute"
              >
                {f.sku}
              </th>
              <td className="py-4 pr-6 align-top">
                <button
                  type="button"
                  onClick={() => onOpen(f.sku)}
                  className="text-left type-h4 underline-offset-4 hover:underline"
                >
                  {f.name[lang]}
                  <span className="sr-only"> — {COPY.catalogue.detailOpen[lang]}</span>
                </button>
              </td>
              <td className="hidden py-4 pr-6 align-top type-small text-mute md:table-cell">
                {f.tag[lang]}
              </td>
              <td className="hidden py-4 pr-6 align-top type-small tabular-nums text-mute md:table-cell">
                {f.widthIn}&quot;
              </td>
              <td className="py-4 align-top type-small text-mute">{f.spec[lang]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const rangeLink = "link-arrow";

/**
 * The four selling ranges, in a fixed order above the cloth examples, sized
 * like a shop's category cards: four across on a wide screen, two on a
 * tablet, and a swipeable row on a phone (native scroll-snap, the next card
 * peeking in). Every card has a photo space; a range with no product
 * photograph yet fills it with a decorative stand-in (`standIn`), so the row
 * reads as one set.
 */
function RangeGrid({ lang, ranges }: { lang: Lang; ranges: CatalogueRange[] }) {
  return (
    <div
      data-reveal-stagger
      className="vf-rail-fade-sm -mx-5 mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden"
    >
      {ranges.map((line) => (
        <RangeCard key={line.id} lang={lang} line={line} />
      ))}
    </div>
  );
}

/** One range: photo, tag, name, a line of description, then its links. */
function RangeCard({ lang, line }: { lang: Lang; line: CatalogueRange }) {
  const frame = "card-media aspect-[3/4] w-full bg-sand sm:aspect-[4/3] xl:aspect-[3/4]";
  return (
    <article
      data-reveal
      className="card flex w-[78%] shrink-0 snap-start flex-col p-2.5 sm:w-auto sm:min-w-0"
    >
      {line.image ? (
        <img
          src={line.image.src}
          srcSet={line.image.srcSet}
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 45vw, 78vw"
          alt={line.image.alt}
          loading="lazy"
          width={line.image.width}
          height={line.image.height}
          className={`${frame} object-cover`}
          style={{ objectPosition: line.image.position ?? "center 25%" }}
        />
      ) : (
        // No photograph: the stand-in still, with an optional short loop over
        // it. Both are decorative; reduced motion hides the loop (showroom.css).
        <div
          aria-hidden="true"
          className={`${frame} relative bg-cover bg-center`}
          style={
            line.standIn
              ? {
                  backgroundImage: `url(${line.standIn})`,
                  backgroundPosition: line.mediaPosition ?? "center",
                }
              : undefined
          }
        >
          {line.video ? (
            <LoopVideo
              src={line.video}
              className="vf-range-video absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: line.mediaPosition ?? "center" }}
            />
          ) : null}
        </div>
      )}
      <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
        <p className="type-label text-plum">{line.tag[lang]}</p>
        <h3 className="mt-2 type-h4">{line.name[lang]}</h3>
        <p className="mt-2 flex-1 type-small text-mute">{line.body[lang]}</p>
        <div className="mt-5 flex flex-col items-start gap-3">
          <a href={rangeHref(line.pageHref, lang)} className={rangeLink}>
            {line.linkLabel[lang]}
          </a>
          {line.alsoHref && line.alsoLabel ? (
            <a href={rangeHref(line.alsoHref, lang)} className={rangeLink}>
              {line.alsoLabel[lang]}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/**
 * Every cloth card is the same size and the same square photograph, including
 * when a filter leaves a single result: an Apple-style white card with the
 * swatch inset and Atelier's caption under it.
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
  // The cloth, three across (two on a phone): linen cards on the white band,
  // the reverse of the white range cards on the linen page above, so the two
  // sets never read as one. Landscape photos keep the cards short; Atelier's
  // caption sits under each.
  return (
    <div data-reveal-stagger className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
      {fabrics.map((f) => (
        <article
          key={f.sku}
          data-reveal
          className="group relative flex h-full flex-col rounded-[var(--radius-card)] bg-linen p-2.5 pb-5 transition-colors duration-300 hover:bg-sand sm:p-3 sm:pb-6"
        >
          {/* The photo settles from a slight zoom as the card fades up: calmer
              than the block reveal, and with the loader warming the cache it
              never arrives part-way through the motion. */}
          <div data-reveal-img className="card-media vf-sheen">
            <img
              src={f.image}
              alt={f.name[lang]}
              loading="lazy"
              decoding="async"
              width={1024}
              height={768}
              className="aspect-[4/3] w-full bg-sand object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-2 type-label tabular-nums text-mute sm:px-3">
            <span>{f.sku}</span>
            <span>{f.tag[lang]}</span>
          </div>
          {/* The short rule under the name is Atelier's swatch caption. */}
          <h3 className="mt-2 px-2 type-h4 after:mt-3 after:block after:h-px after:w-10 after:bg-plum/30 sm:px-3">
            {f.name[lang]}
          </h3>
          <p className="mt-3 px-2 type-small text-mute sm:px-3">{f.spec[lang]}</p>
          <a
            href={whatsAppUrl(
              fill(COPY.catalogue.enquiryMessage[lang], {
                name: f.name[lang],
                sku: f.sku,
              }),
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 mx-2 mt-3 inline-block self-start link type-small sm:mx-3"
          >
            {COPY.catalogue.askOnWhatsApp[lang]}
          </a>
          <button
            type="button"
            onClick={() => onOpen(f.sku)}
            className="absolute inset-0 rounded-[var(--radius-card)]"
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
            <p className="type-label text-clay">{fabric.sku}</p>
            <h3 id="fabric-detail-heading" className="mt-2 type-h3">
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
              <dt className="w-28 shrink-0 type-label text-mute">{row.label}</dt>
              <dd className="type-small text-ink">{row.value}</dd>
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
            className="btn btn-primary w-full"
          >
            {COPY.catalogue.detailEnquire[lang]}
          </a>
        </div>
      </div>
    </div>
  );
}
