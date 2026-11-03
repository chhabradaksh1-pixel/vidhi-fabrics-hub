import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { LogoMark } from "./LogoMark.tsx";
import { TIMING } from "./timing.ts";

export const LINEN = "#F4EFE9";

/**
 * The website loader as it plays: linen ground, the mark stitched in at the
 * centre, then everything fades to reveal the page. `hold` delays the fade,
 * for previews.
 */
export const LogoLoader = ({ hold = 0 }: { hold?: number }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill
      name="Loader"
      style={{
        backgroundColor: LINEN,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Interactive.Div
        name="Mark"
        style={{
          opacity: interpolate(t, [TIMING.out.start + hold, TIMING.out.end + hold], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.4, 0, 1, 1),
          }),
        }}
      >
        <LogoMark width={Math.round(width * 0.56)} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
