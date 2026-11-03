// The pen strokes that write the mark, in the logo's own 348 x 332 units (see
// logo-paths.ts). Two strokes, as a calligrapher would write it:
//   "v"    the curl, up the sweep, down the thick stroke, up the needle to its
//          point, and the thread flicked through the eye;
//   "idhi" the script in one line, starting through the i's dot.
// No pen line is drawn between them: the second stroke starts a beat before
// the first ends (timing.ts), so the mark flows without a connector.
// Each segment is a wide stroke inside an SVG mask that uncovers the traced
// letters; widths differ per segment, so a stroke is cut into segments laid
// end to end. FABRICS is not written; it appears under a soft wipe.
// Points were read off grids rendered over the trace; the coverage check
// confirms every letter is fully uncovered.

type Point = readonly [number, number];

/** A smooth path through the points (Catmull-Rom, as cubic Béziers). */
export function smoothPath(points: readonly Point[], tension = 1): string {
  const p = points;
  let d = `M${p[0]![0]} ${p[0]![1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i]!;
    const p1 = p[i]!;
    const p2 = p[i + 1]!;
    const p3 = p[i + 2] ?? p2;
    const k = tension / 6;
    const c1: Point = [p1[0] + (p2[0] - p0[0]) * k, p1[1] + (p2[1] - p0[1]) * k];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) * k, p2[1] - (p3[1] - p1[1]) * k];
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export type Segment = {
  id: string;
  /** The traced shape this segment uncovers. */
  target: "v" | "script";
  width: number;
  points: readonly Point[];
};

export type Stroke = { id: "v" | "idhi"; segments: readonly Segment[] };

export const STROKES: readonly Stroke[] = [
  {
    id: "v",
    segments: [
      {
        // From the curl, up the sweep to the top of the arm, down the thick
        // stroke to the valley.
        id: "v-left",
        target: "v",
        width: 26,
        points: [
          [41, 212],
          [37, 198],
          [46, 180],
          [62, 162],
          [82, 145],
          [104, 131],
          [122, 121],
          [129, 121],
          [124, 129],
          [112, 145],
          [100, 162],
          [89, 182],
          [80, 202],
          [73, 222],
          [68, 245],
          [65, 268],
          [66, 285],
          [72, 294],
          [84, 294],
        ],
      },
      {
        // Up the needle's shaft to its point, wide enough for the eye.
        id: "needle",
        target: "v",
        width: 34,
        points: [
          [84, 294],
          [100, 280],
          [122, 240],
          [145, 200],
          [168, 155],
          [190, 105],
          [205, 72],
          [218, 47],
          [226, 34],
          [231, 28],
        ],
      },
      {
        // The thread, flicked through the eye from its upper end to its lower.
        id: "thread",
        target: "v",
        width: 10,
        points: [
          [184, 25],
          [200, 40],
          [214, 56],
          [228, 72],
          [241, 89],
        ],
      },
    ],
  },
  {
    id: "idhi",
    segments: [
      {
        id: "idhi",
        target: "script",
        width: 14,
        points: [
          [215, 189],
          [212, 198],
          [210, 206],
          [209, 212],
          [201, 228],
          [196, 244],
          [202, 248],
          [212, 240],
          [222, 225],
          [233, 213],
          [239, 213],
          [229, 212],
          [221, 222],
          [218, 236],
          [221, 246],
          [230, 241],
          [237, 226],
          [239, 213],
          [236, 232],
          [234, 247],
          [241, 250],
          [243, 247],
          [246, 230],
          [251, 207],
          [266, 182],
          [281, 163],
          [292, 157],
          [289, 165],
          [279, 182],
          [270, 202],
          [264, 222],
          [259, 238],
          [255, 247],
          [262, 233],
          [272, 216],
          [281, 209],
          [286, 213],
          [283, 227],
          [278, 241],
          [281, 248],
          [290, 245],
          [300, 228],
          [309, 213],
          [311, 213],
          [305, 227],
          [300, 241],
          [302, 247],
          [310, 244],
          [319, 236],
        ],
      },
    ],
  },
];

/**
 * The soft wipe that reveals FABRICS as one word: a mask rect whose right
 * end is a feathered gradient, slid from left of the word to past its end.
 * Units are the logo's; the word spans x 159 to 312.
 */
export const FABRICS_WIPE = {
  y: 250,
  height: 50,
  width: 600,
  /** Where along the rect the solid part ends and the feather begins (0..1). */
  feather: 0.85,
  fromX: -445,
  toX: -180,
} as const;

/** The light that runs up the finished needle: from near its point to the eye. */
export const GLINT = { from: [100, 280], to: [222, 44], angle: -61.7 } as const;
