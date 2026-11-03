// One timing table for the loader, in seconds. Remotion (LogoMark.tsx) and the
// website's CSS (scripts/export-web.mjs) both read it, so the preview and the
// site cannot drift apart. Easings are cubic-bezier control points, usable as
// Easing.bezier(...) in Remotion and cubic-bezier(...) in CSS.
//
// The owner asked for a 4-second loader (31 October 2026), long enough for
// the page's images and video to load behind it. The mark is complete by
// 2.7 s; the rest is the held logo with one glint, then the fade.

export const EASE = {
  /** A pen stroke: eases in, runs on the straights, eases out. */
  stroke: [0.45, 0.05, 0.3, 1],
  /** The FABRICS wipe: a soft start and a long landing. */
  wipe: [0.3, 0.1, 0.2, 1],
  /** The glint's even glide. */
  glide: [0.65, 0, 0.35, 1],
  /** Fades. */
  fade: [0.4, 0, 0.2, 1],
} as const;

export const TIMING = {
  /** Stroke one: the V, the needle and the thread through its eye. */
  v: { start: 0.15, end: 1.35 },
  /** Stroke two: "idhi", starting a beat before the V ends (overlap). */
  idhi: { start: 1.2, end: 2.2 },
  /** FABRICS appears under a feathered wipe as "idhi" finishes. */
  fabrics: { start: 2.0, end: 2.65 },
  /** One clean copy of the mark replaces the masked layers. */
  clean: 2.7,
  /** Light runs once up the finished needle. */
  glint: { start: 2.85, end: 3.3 },
  /** The loader fades and the page is there. */
  out: { start: 3.6, end: 4.0 },
} as const;

export const TOTAL = TIMING.out.end;
