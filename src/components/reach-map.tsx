import { LAND_DOTS, MAP_VIEWBOX, project } from "@/content/world-dots";
import { MARKETS, REACH_COPY } from "@/content/markets";
import type { Lang } from "@/content/translations";

const ORIGIN = MARKETS.find((m) => m.origin)!;
const DESTINATIONS = MARKETS.filter((m) => !m.origin);

/** A shallow arc from Surat to a destination, bowed away from the straight line. */
function arcPath(toLon: number, toLat: number) {
  const a = project(ORIGIN.lon, ORIGIN.lat);
  const b = project(toLon, toLat);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - Math.abs(b.x - a.x) * 0.3 - 18;
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)}Q${mx.toFixed(1)} ${my.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

/** Short homepage list. The drawn map lives on the about page. */
export function ReachStrip({ lang = "en", mapHref }: { lang?: Lang; mapHref: string }) {
  const copy = REACH_COPY[lang];

  return (
    <section id="reach" aria-labelledby="reach-heading" className="scroll-mt-36">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <h2
          id="reach-heading"
          className="font-display text-3xl font-light tracking-tight lg:text-4xl"
        >
          {copy.heading}
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg text-mute">{copy.body}</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li className="font-medium">{ORIGIN.name[lang]}</li>
          {DESTINATIONS.map((m) => (
            <li key={m.id}>{m.name[lang]}</li>
          ))}
        </ul>
        <a
          href={mapHref}
          className="vf-link-maroon mt-6 inline-block text-sm underline underline-offset-4"
        >
          {copy.mapLink}
        </a>
      </div>
    </section>
  );
}

export function ReachMapSection({ lang = "en", id = "reach" }: { lang?: Lang; id?: string }) {
  const copy = REACH_COPY[lang];
  const origin = project(ORIGIN.lon, ORIGIN.lat);

  return (
    <section id={id} aria-labelledby="reach-map-heading" className="scroll-mt-36">
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-clay">{copy.marker}</p>
        <h2
          id="reach-map-heading"
          className="mt-4 font-display text-4xl font-light tracking-tight lg:text-5xl"
        >
          {copy.heading}
        </h2>
        <p className="mt-4 max-w-[52ch] text-mute">{copy.body}</p>

        {/* The map is decorative; the markets are listed as text below it. */}
        <div className="mt-12 overflow-hidden">
          <svg
            viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
            className="h-auto w-full"
            role="presentation"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d={LAND_DOTS}
              className="stroke-ink"
              strokeWidth={2.5}
              strokeLinecap="round"
              fill="none"
              opacity={0.7}
            />
            {DESTINATIONS.map((m) => (
              <path
                key={m.id}
                d={arcPath(m.lon, m.lat)}
                className="stroke-clay"
                strokeWidth={1.6}
                fill="none"
                opacity={0.55}
              />
            ))}
            {DESTINATIONS.map((m) => {
              const p = project(m.lon, m.lat);
              return <circle key={m.id} cx={p.x} cy={p.y} r={5} className="fill-clay" />;
            })}
            <circle cx={origin.x} cy={origin.y} r={11} className="fill-clay" opacity={0.18} />
            <circle cx={origin.x} cy={origin.y} r={6.5} className="fill-claydeep" />
          </svg>
        </div>

        <div className="mt-10 border-t border-line pt-8">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-clay">
            {copy.listLabel}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <li className="flex items-center gap-2 font-medium">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-claydeep" />
              {ORIGIN.name[lang]}
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
                {copy.originLabel}
              </span>
            </li>
            {DESTINATIONS.map((m) => (
              <li key={m.id} className="flex items-center gap-2 text-mute">
                <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-clay" />
                {m.name[lang]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
