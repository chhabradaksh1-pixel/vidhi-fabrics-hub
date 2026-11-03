import { evolvePath } from "@remotion/paths";
import { Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { SEGMENTS, segmentProgress } from "./line.ts";
import { DOT_PATH, FABRICS_LETTERS, IDHI_PATH, LOGO_COLOR, V_PATH, VIEWBOX } from "./logo-paths.ts";
import { FABRICS_WIPE, GLINT } from "./strokes.ts";
import { EASE, TIMING } from "./timing.ts";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = (k: keyof typeof EASE) => {
  const [x1, y1, x2, y2] = EASE[k];
  return Easing.bezier(x1, y1, x2, y2);
};
const region = { maskUnits: "userSpaceOnUse", x: -40, y: -40, width: VIEWBOX.width + 80, height: VIEWBOX.height + 80 } as const;

/**
 * The Vidhi mark, written as a calligrapher would: one stroke for the V (the
 * curl, the thick downstroke, up the needle, the thread flicked through its
 * eye), a second for "idhi" that starts a beat before the first ends, then
 * FABRICS under a soft wipe. No line is drawn that is not in the logo. Once
 * written, a single glint runs up the needle. `width` is the rendered width
 * in px; times come from timing.ts.
 */
export const LogoMark = ({ width }: { width: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const progress = {
    v: interpolate(t, [TIMING.v.start, TIMING.v.end], [0, 1], { ...clamp, easing: ease("stroke") }),
    idhi: interpolate(t, [TIMING.idhi.start, TIMING.idhi.end], [0, 1], { ...clamp, easing: ease("stroke") }),
  };
  const clean = t >= TIMING.clean;

  const strokesFor = (target: "v" | "script") =>
    SEGMENTS.filter((s) => s.target === target).map((s) => {
      const p = segmentProgress(s, progress[s.stroke]);
      return (
        <path
          key={s.id}
          d={s.d}
          fill="none"
          stroke="#fff"
          strokeWidth={s.width}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ ...evolvePath(p, s.d), opacity: p > 0 ? 1 : 0 }}
        />
      );
    });

  const glint = interpolate(t, [TIMING.glint.start, TIMING.glint.end], [0, 1], { ...clamp, easing: ease("glide") });

  return (
    <Interactive.Svg
      name="Vidhi mark"
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      width={width}
      height={(width * VIEWBOX.height) / VIEWBOX.width}
      style={{ overflow: "visible" }}
    >
      <defs>
        <mask id="vfl-mv" {...region}>{strokesFor("v")}</mask>
        <mask id="vfl-ms" {...region}>{strokesFor("script")}</mask>
        <linearGradient id="vfl-feather">
          <stop offset="0" stopColor="#fff" />
          <stop offset={FABRICS_WIPE.feather} stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
        <mask id="vfl-mf" {...region}>
          <Interactive.Rect
            name="FABRICS wipe"
            x={0}
            y={FABRICS_WIPE.y}
            width={FABRICS_WIPE.width}
            height={FABRICS_WIPE.height}
            fill="url(#vfl-feather)"
            style={{
              translate: interpolate(t, [TIMING.fabrics.start, TIMING.fabrics.end], [`${FABRICS_WIPE.fromX}px 0px`, `${FABRICS_WIPE.toX}px 0px`], {
                ...clamp,
                easing: ease("wipe"),
              }),
            }}
          />
        </mask>
        <clipPath id="vfl-needle-ink">
          <path d={V_PATH} clipRule="evenodd" />
        </clipPath>
        <linearGradient id="vfl-shine">
          <stop offset="0" stopColor="#fff" stopOpacity={0} />
          <stop offset="0.5" stopColor="#fff" stopOpacity={0.75} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </linearGradient>
      </defs>

      <g fill={LOGO_COLOR}>
        {/* The writing, until the clean copy below takes over. */}
        <g style={{ opacity: clean ? 0 : 1 }}>
          <Interactive.Path name="V" d={V_PATH} fillRule="evenodd" mask="url(#vfl-mv)" />
          <g mask="url(#vfl-ms)">
            <Interactive.Path name="idhi" d={IDHI_PATH} fillRule="evenodd" />
            <Interactive.Path name="i dot" d={DOT_PATH} />
          </g>
          <g mask="url(#vfl-mf)">
            {FABRICS_LETTERS.map(({ letter, d }, i) => (
              <path key={letter + i} d={d} fillRule="evenodd" />
            ))}
          </g>
        </g>

        {/* One clean copy of the whole mark, so the end is exactly the logo. */}
        <g style={{ opacity: clean ? 1 : 0 }}>
          <path d={V_PATH} fillRule="evenodd" />
          <path d={IDHI_PATH} fillRule="evenodd" />
          <path d={DOT_PATH} />
          {FABRICS_LETTERS.map(({ letter, d }, i) => (
            <path key={letter + i} d={d} fillRule="evenodd" />
          ))}
        </g>

        {/* Light catches the needle once. */}
        <g clipPath="url(#vfl-needle-ink)">
          <Interactive.Rect
            name="Glint"
            x={-4}
            y={-30}
            width={8}
            height={60}
            fill="url(#vfl-shine)"
            style={{
              translate: `${GLINT.from[0] + (GLINT.to[0] - GLINT.from[0]) * glint}px ${GLINT.from[1] + (GLINT.to[1] - GLINT.from[1]) * glint}px`,
              rotate: `${GLINT.angle}deg`,
              opacity: interpolate(t, [TIMING.glint.start, TIMING.glint.start + 0.08, TIMING.glint.end - 0.08, TIMING.glint.end], [0, 1, 1, 0], clamp),
            }}
          />
        </g>
      </g>
    </Interactive.Svg>
  );
};
