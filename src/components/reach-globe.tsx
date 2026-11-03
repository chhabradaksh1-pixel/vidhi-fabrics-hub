import { useEffect, useRef, useState, type ReactNode } from "react";
import type { GeoPermissibleObjects } from "d3-geo";
import type { Topology, GeometryCollection } from "topojson-specification";

import { MARKETS } from "@/content/markets";

const ORIGIN = MARKETS.find((m) => m.origin)!;
const DESTINATIONS = MARKETS.filter((m) => !m.origin);

/* The view rests on the middle of the markets: halfway across their spread
   of longitude (Nigeria to Malaysia), at their average latitude. */
const lons = MARKETS.map((m) => m.lon);
const FOCUS_LON = (Math.min(...lons) + Math.max(...lons)) / 2;
const FOCUS_LAT = MARKETS.reduce((sum, m) => sum + m.lat, 0) / MARKETS.length;

/** Natural Earth 1:50m countries (public domain), simplified to ~26 KB
 *  gzipped; only ISO numeric ids are kept. Fetched when the globe nears. */
const WORLD_URL = "/data/world-countries.json";

/** The sway either side of the focus in degrees (narrower on a phone, where
 *  the globe is cropped at the sides), and one full sway in ms. */
const SWAY_WIDE = 14;
const SWAY_NARROW = 6;
const SWAY_MS = 16000;
/** One run of the lights from Surat out to every market, in ms. */
const RUN_MS = 5200;
/** How far a drag may turn (degrees) or tilt the globe. */
const MAX_TURN = 60;
const MAX_TILT = 20;

const C = {
  oceanLight: "#E4EAEB",
  oceanDeep: "#B4C3C8",
  land: "#F8F4EE",
  border: "#D6C9BB",
  market: "138, 59, 82", // plum-rose, as rgb() parts for varying alpha
  origin: "#3A1F2B",
  arc: "rgba(138, 59, 82, 0.55)",
  pin: "#8A3B52",
};

type Geo = typeof import("d3-geo");
type Feature = GeoJSON.Feature<GeoJSON.Geometry, Record<string, never>>;

const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/** A 2D canvas available? */
function hasCanvas() {
  try {
    return !!document.createElement("canvas").getContext("2d");
  } catch {
    return false;
  }
}

/**
 * The reach map as a globe with real country outlines (d3-geo's orthographic
 * projection on a 2D canvas): oceans and land shaded as a lit sphere, India
 * filled in deep plum, every market country filled in plum with a pin, and a
 * raised arc from Surat to each. A light runs out along each arc in turn, and
 * the market's country brightens and its pin rings as the light lands.
 *
 * It is zoomed in on the markets: on a wide screen the sphere spans the full
 * width and its top and bottom fade into the page; on a phone it is cropped
 * at the sides too. It sways a few degrees either way, can be dragged to turn
 * and eases back to the markets when let go.
 *
 * Decorative: the markets are listed as text beside it. `fallback` (the flat
 * SVG map) is what the server renders and what stays when the canvas, the
 * map data or JavaScript is unavailable; it is swapped out only once the
 * globe has drawn. d3-geo, topojson and the map are loaded on demand when
 * the globe nears the viewport, and drawing pauses while it is off screen.
 * Under reduced motion it holds still with no lights, and still drags.
 */
export function ReachGlobe({
  fallback,
  size = "w-full max-w-[640px]",
}: {
  fallback: ReactNode;
  /** Width classes for the globe's frame. */
  size?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || !hasCanvas() || typeof IntersectionObserver === "undefined") return;
    const ctx = canvas.getContext("2d")!;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let geo: Geo | null = null;
    let land: GeoPermissibleObjects | null = null;
    let borders: GeoPermissibleObjects | null = null;
    let origin: Feature | null = null;
    let markets: { feature: Feature | undefined; lon: number; lat: number }[] = [];
    let graticule: GeoPermissibleObjects | null = null;

    // The drag offset in degrees, eased back to zero once the pointer lets go.
    let dragLon = 0;
    let dragLat = 0;
    let grab: { x: number; y: number; lon: number; lat: number } | null = null;
    let visible = false;
    let frame = 0;
    let cancelled = false;
    const began = performance.now();

    const draw = (now: number) => {
      if (!geo || !land) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const wide = w > h * 1.2;
      // Wide: the sphere spans the frame's width. Narrow (a square phone
      // frame): just wider than the frame, the most that keeps Nigeria and
      // Malaysia inside it at either end of the sway.
      const r = wide ? w * 0.49 : w / 1.95;
      const cx = w / 2;
      const cy = h / 2;
      const t = now - began;
      const sway = still
        ? 0
        : (wide ? SWAY_WIDE : SWAY_NARROW) * Math.sin((t / SWAY_MS) * 2 * Math.PI);
      const projection = geo
        .geoOrthographic()
        .scale(r)
        .translate([cx, cy])
        .clipAngle(90)
        .precision(0.6)
        .rotate([-(FOCUS_LON + sway + dragLon), -(FOCUS_LAT + dragLat), 0]);
      const path = geo.geoPath(projection, ctx);
      const center: [number, number] = [FOCUS_LON + sway + dragLon, FOCUS_LAT + dragLat];
      const front = (p: [number, number]) => geo!.geoDistance(p, center) < Math.PI / 2 - 0.02;

      // A faint halo where the atmosphere would be.
      const halo = ctx.createRadialGradient(cx, cy, r * 0.96, cx, cy, r * 1.08);
      halo.addColorStop(0, "rgba(255, 253, 250, 0.9)");
      halo.addColorStop(1, "rgba(255, 253, 250, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.08, 0, 2 * Math.PI);
      ctx.fill();

      // Ocean, lit from the upper left.
      const ocean = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.4, r * 0.1, cx, cy, r);
      ocean.addColorStop(0, C.oceanLight);
      ocean.addColorStop(1, C.oceanDeep);
      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.fillStyle = ocean;
      ctx.fill();

      ctx.beginPath();
      path(graticule!);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.beginPath();
      path(land);
      ctx.fillStyle = C.land;
      ctx.fill();

      // The lights: each market's light leaves Surat in turn and lands; the
      // country brightens and its pin rings as it lands, then both settle.
      const run = still ? 1 : (t % RUN_MS) / RUN_MS;
      const startAt = (i: number) => (i / markets.length) * 0.55;
      const legs = markets.map((_, i) => clamp((run - startAt(i)) / 0.3, 0, 1));
      // 1 as the light lands, fading to 0 over the next third of the run.
      const glow = markets.map((_, i) => {
        const since = run - startAt(i) - 0.3;
        return still || since < 0 ? 0 : clamp(1 - since / 0.35, 0, 1);
      });

      if (origin) {
        ctx.beginPath();
        path(origin);
        ctx.fillStyle = C.origin;
        ctx.globalAlpha = 0.86;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      markets.forEach((m, i) => {
        if (!m.feature) return;
        ctx.beginPath();
        path(m.feature);
        ctx.fillStyle = `rgba(${C.market}, ${0.5 + 0.35 * (glow[i] ?? 0)})`;
        ctx.fill();
      });

      ctx.beginPath();
      path(borders!);
      ctx.strokeStyle = C.border;
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // Shade toward the limb so it reads as a sphere, then a soft highlight.
      const shade = ctx.createRadialGradient(
        cx - r * 0.3,
        cy - r * 0.35,
        r * 0.2,
        cx,
        cy,
        r * 1.02,
      );
      shade.addColorStop(0, "rgba(255, 255, 255, 0.18)");
      shade.addColorStop(0.55, "rgba(255, 255, 255, 0)");
      shade.addColorStop(1, "rgba(30, 23, 25, 0.22)");
      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.fillStyle = shade;
      ctx.fill();

      // Raised arcs. In an orthographic view a point lifted off the surface
      // projects to the surface point pushed out from the centre.
      const from: [number, number] = [ORIGIN.lon, ORIGIN.lat];
      const lift = (p: [number, number], k: number): [number, number] | null => {
        const xy = projection(p);
        if (!xy || !front(p)) return null;
        return [cx + (xy[0] - cx) * k, cy + (xy[1] - cy) * k];
      };
      markets.forEach((m, i) => {
        const to: [number, number] = [m.lon, m.lat];
        const along = geo!.geoInterpolate(from, to);
        const height = 0.04 + geo!.geoDistance(from, to) * 0.1;
        const pts: ([number, number] | null)[] = [];
        for (let s = 0; s <= 48; s++) {
          const f = s / 48;
          pts.push(lift(along(f), 1 + height * Math.sin(Math.PI * f)));
        }
        ctx.beginPath();
        let pen = false;
        for (const p of pts) {
          if (!p) {
            pen = false;
            continue;
          }
          if (pen) ctx.lineTo(p[0], p[1]);
          else ctx.moveTo(p[0], p[1]);
          pen = true;
        }
        ctx.strokeStyle = C.arc;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        // The light and its short tail.
        const leg = legs[i] ?? 0;
        if (still || leg <= 0 || leg >= 1) return;
        const head = ease(leg);
        for (let k = 0; k < 10; k++) {
          const a = Math.max(0, head - (k + 1) * 0.018);
          const b = Math.max(0, head - k * 0.018);
          const pa = pts[Math.round(a * 48)];
          const pb = pts[Math.round(b * 48)];
          if (!pa || !pb) continue;
          ctx.beginPath();
          ctx.moveTo(pa[0], pa[1]);
          ctx.lineTo(pb[0], pb[1]);
          ctx.strokeStyle = `rgba(255, 253, 250, ${0.9 - k * 0.09})`;
          ctx.lineWidth = 2.6 - k * 0.15;
          ctx.lineCap = "round";
          ctx.stroke();
        }
        const tip = pts[Math.round(head * 48)];
        if (tip) {
          ctx.beginPath();
          ctx.arc(tip[0], tip[1], 3.2, 0, 2 * Math.PI);
          ctx.fillStyle = "#FFFDFA";
          ctx.shadowColor = "rgba(138, 59, 82, 0.9)";
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Pins: a ring goes out from each as its light lands; Surat's is larger.
      const pin = (p: [number, number], radius: number, fill: string, ring: number) => {
        if (!front(p)) return;
        const xy = projection(p);
        if (!xy) return;
        if (ring > 0) {
          ctx.beginPath();
          ctx.arc(xy[0], xy[1], radius + ring * radius * 2.4, 0, 2 * Math.PI);
          ctx.strokeStyle = `rgba(138, 59, 82, ${0.6 * (1 - ring)})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(xy[0], xy[1], radius, 0, 2 * Math.PI);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.strokeStyle = "#FFFDFA";
        ctx.lineWidth = 2;
        ctx.stroke();
      };
      markets.forEach((m, i) => {
        const g = glow[i] ?? 0;
        pin([m.lon, m.lat], 4.5, C.pin, g > 0 ? 1 - g : 0);
      });
      pin([ORIGIN.lon, ORIGIN.lat], 7, C.origin, still ? 0 : (t % 2600) / 2600);
    };

    // Under reduced motion nothing moves by itself, so a frame is drawn only
    // when the size or the drag has changed.
    let drawn = "";
    const loop = (now: number) => {
      if (!visible) return;
      if (!grab) {
        dragLon *= 0.96;
        dragLat *= 0.96;
      }
      const state = `${canvas.clientWidth}x${canvas.clientHeight}:${dragLon.toFixed(2)},${dragLat.toFixed(2)}`;
      if (!still || state !== drawn) {
        draw(now);
        drawn = state;
      }
      frame = requestAnimationFrame(loop);
    };
    const kick = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
    };

    const boot = async () => {
      try {
        const [d3, topo, world] = await Promise.all([
          import("d3-geo"),
          import("topojson-client"),
          fetch(WORLD_URL).then((r) => {
            if (!r.ok) throw new Error(String(r.status));
            return r.json() as Promise<Topology<{ countries: GeometryCollection }>>;
          }),
        ]);
        if (cancelled) return;
        const countries = topo.feature(world, world.objects.countries).features as Feature[];
        const byId = new Map(countries.map((f) => [String(f.id), f]));
        geo = d3;
        land = { type: "FeatureCollection", features: countries };
        borders = topo.mesh(world, world.objects.countries, (a, b) => a !== b);
        graticule = d3.geoGraticule10();
        origin = byId.get(ORIGIN.iso) ?? null;
        markets = DESTINATIONS.map((m) => ({ feature: byId.get(m.iso), lon: m.lon, lat: m.lat }));
        draw(performance.now());
      } catch {
        return; // keep the flat map
      }
      setReady(true);
      if (visible) kick();
    };

    let booted = false;
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible && !booted) {
          booted = true;
          void boot();
        } else if (visible && geo) {
          kick();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(wrap);

    const down = (e: PointerEvent) => {
      grab = { x: e.clientX, y: e.clientY, lon: dragLon, lat: dragLat };
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!grab) return;
      const r = canvas.clientWidth / 2;
      dragLon = clamp(grab.lon - ((e.clientX - grab.x) / r) * 57, -MAX_TURN, MAX_TURN);
      dragLat = clamp(grab.lat + ((e.clientY - grab.y) / r) * 57, -MAX_TILT, MAX_TILT);
    };
    const up = (e: PointerEvent) => {
      if (!grab) return;
      grab = null;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      canvas.style.cursor = "";
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);

    return () => {
      cancelled = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <div className={ready ? "hidden" : undefined}>{fallback}</div>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`vf-globe mx-auto block ${size} cursor-grab touch-pan-y select-none transition-opacity duration-700 ${
          ready ? "opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
        }`}
      />
    </div>
  );
}
