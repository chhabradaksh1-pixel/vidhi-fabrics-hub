import { Composition, Loop } from "remotion";

import { LogoLoader } from "./LogoLoader.tsx";
import { TOTAL } from "./timing.ts";

const FPS = 60;
const PREVIEW_HOLD = 0.8;

/** The preview: the loader twice, with the finished mark held a moment. */
const LogoLoaderLoop = () => (
  <Loop durationInFrames={Math.ceil((TOTAL + PREVIEW_HOLD + 0.3) * FPS)}>
    <LogoLoader hold={PREVIEW_HOLD} />
  </Loop>
);

export const RemotionRoot = () => (
  <>
    <Composition
      id="LogoLoader"
      component={LogoLoader}
      durationInFrames={Math.ceil(TOTAL * FPS)}
      fps={FPS}
      width={1080}
      height={1080}
      defaultProps={{ hold: 0 }}
    />
    <Composition
      id="LogoLoaderLoop"
      component={LogoLoaderLoop}
      durationInFrames={Math.ceil((TOTAL + PREVIEW_HOLD + 0.3) * FPS) * 2}
      fps={FPS}
      width={1080}
      height={1080}
    />
  </>
);
