import { LAND_DOTS, MAP_VIEWBOX, project } from "@/content/world-dots";
import { MARKETS, REACH_COPY } from "@/content/markets";
import type { Lang } from "@/content/translations";
import { ReachGlobe } from "@/components/reach-globe";

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
    <section
      id="reach"
      aria-labelledby="reach-heading"
      className="scroll-mt-36 px-5 pb-16 pt-8 sm:px-8 sm:pb-22 sm:pt-11 lg:px-[50px] lg:pb-28 lg:pt-14"
    >
      {/* On the page under one hairline, no box: heading, note and map link on
          the left; the markets listed on the right like a mill's spec sheet.
          Grid placement only: the DOM order (heading, note, list, link) is
          unchanged. */}
      <div className="mx-auto grid w-full max-w-[1340px] gap-y-6 border-t border-line pt-12 lg:grid-cols-12 lg:gap-x-16 lg:pt-16">
        <h2 id="reach-heading" className="type-h2 lg:col-[1/6] lg:row-[1]">
          {copy.heading}
        </h2>
        <p className="max-w-[52ch] type-lead text-mute lg:col-[1/6] lg:row-[2]">{copy.body}</p>
        <ul className="mt-4 grid grid-cols-2 border-t border-ink/20 type-small sm:grid-cols-3 lg:col-[7/13] lg:row-[1/4] lg:mt-0 lg:self-start">
          <li className="border-b border-line py-3 pr-4 font-medium text-ink">
            {ORIGIN.name[lang]}
          </li>
          {DESTINATIONS.map((m) => (
            <li key={m.id} className="border-b border-line py-3 pr-4 text-foreground">
              {m.name[lang]}
            </li>
          ))}
        </ul>
        <a href={mapHref} className="link-arrow justify-self-start lg:col-[1/6] lg:row-[3]">
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
      {/* The finale: heading and note centred, the globe as large as the
          window allows, the markets listed beneath it. The DOM order (marker,
          heading, note, map, list) is unchanged, and the map has no text. */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 py-10 text-center sm:px-8 sm:py-12 lg:px-[50px] lg:py-14">
        <p className="type-label text-clay">{copy.marker}</p>
        <h2 id="reach-map-heading" className="mt-4 type-h2">
          {copy.heading}
        </h2>
        <p className="mt-4 max-w-[52ch] type-lead text-mute">{copy.body}</p>

        {/* Decorative: the markets are listed as text beside it. The flat
            dotted map is the server-rendered fallback for the globe. */}
        <div className="mt-6 w-full sm:mt-8">
          <ReachGlobe
            size="aspect-square w-full max-w-[min(100%,82svh)] sm:aspect-[16/9] sm:max-w-[min(100%,140svh,1340px)]"
            fallback={
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
                    className="stroke-plum"
                    strokeWidth={1.6}
                    fill="none"
                    opacity={0.55}
                  />
                ))}
                {DESTINATIONS.map((m) => {
                  const p = project(m.lon, m.lat);
                  return <circle key={m.id} cx={p.x} cy={p.y} r={5} className="fill-plum" />;
                })}
                <circle cx={origin.x} cy={origin.y} r={11} className="fill-plum" opacity={0.18} />
                <circle cx={origin.x} cy={origin.y} r={6.5} className="fill-plumdeep" />
              </svg>
            }
          />
        </div>

        <div className="mt-6 w-full max-w-5xl border-t border-line pt-6 sm:mt-8">
          <h3 className="type-label text-clay">{copy.listLabel}</h3>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3 type-small">
            <li className="flex items-center gap-2 font-medium text-ink">
              <span aria-hidden="true" className="inline-block size-2 rounded-full bg-plumdeep" />
              {ORIGIN.name[lang]}
              <span className="type-label text-mute">{copy.originLabel}</span>
            </li>
            {DESTINATIONS.map((m) => (
              <li key={m.id} className="flex items-center gap-2 text-mute">
                <span aria-hidden="true" className="inline-block size-2 rounded-full bg-plum/60" />
                {m.name[lang]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
