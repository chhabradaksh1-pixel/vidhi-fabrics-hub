// Each stroke laid end to end: every segment's path, its length, and where it
// starts along its own stroke. A stroke's progress (0..1, eased per stroke in
// timing.ts) maps to how far along each segment the pen is. Shared by
// LogoMark.tsx and export-web.mjs.
import { getLength } from "@remotion/paths";

import { STROKES, smoothPath, type Segment } from "./strokes.ts";

export type PlacedSegment = Segment & {
  stroke: "v" | "idhi";
  d: string;
  length: number;
  start: number;
  strokeLength: number;
};

export const SEGMENTS: readonly PlacedSegment[] = STROKES.flatMap((stroke) => {
  let start = 0;
  const placed = stroke.segments.map((segment) => {
    const d = smoothPath(segment.points);
    const length = getLength(d);
    const p = { ...segment, stroke: stroke.id, d, length, start, strokeLength: 0 };
    start += length;
    return p;
  });
  return placed.map((p) => ({ ...p, strokeLength: start }));
});

/** How far along its own segment the pen is, 0..1, given its stroke's progress 0..1. */
export const segmentProgress = (segment: PlacedSegment, strokeProgress: number) =>
  Math.min(1, Math.max(0, (strokeProgress * segment.strokeLength - segment.start) / segment.length));
