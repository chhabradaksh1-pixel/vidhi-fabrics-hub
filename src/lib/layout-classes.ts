/**
 * The rail of the long-form pages (/about and every blog article): a label,
 * number or heading in a fixed column on the left, the content in one column
 * running to the right edge. Below md the two stack. Every row on a page uses
 * the same rail, so the whole page shares two vertical lines.
 */
export const RAIL_COLS =
  "grid gap-y-5 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)]";

/** A row on the rail, with the long-form pages' vertical rhythm. */
export const RAIL_GRID = `${RAIL_COLS} py-8 sm:py-10 lg:py-12`;

/** Places a block in the content column of a rail row, leaving the rail empty. */
export const RAIL_CONTENT = "md:col-start-2";
