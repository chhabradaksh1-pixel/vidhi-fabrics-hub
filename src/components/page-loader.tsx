import { memo } from "react";

import { LOADER_HTML } from "@/components/page-loader-markup";

/** One object for the life of the page, so React never sees new markup. */
const LOADER = { __html: LOADER_HTML };

/**
 * The logo loader: the Vidhi needle arrives and its thread writes the name,
 * once per browser (a visitor's first arrival only; remembered in
 * localStorage, and skipped between pages of the site), then the loader fades
 * to the page (about 4 s; any tap, key or scroll ends it early; hidden under
 * reduced motion).
 *
 * The markup is static SVG with CSS keyframes, exported from the Remotion
 * design source in `vidhi-logo-motion/` (see page-loader-markup.ts), so it
 * needs no JavaScript to finish and adds no text, links or images to the
 * page. React does not hydrate inside `dangerouslySetInnerHTML`; the inline
 * script may remove the loader before hydration, so mismatch warnings are
 * suppressed on this one wrapper.
 *
 * It must render once and never again: memoised, with the prop object hoisted
 * above. When it re-rendered with a fresh `{ __html }` object, React re-set
 * the wrapper's innerHTML on every router change (any in-page jump such as
 * Contact or Catalogue, and the footer's in-app links), which re-inserted the
 * loader and replayed the whole logo; the skip script in the new copy never
 * ran, because scripts inserted through innerHTML don't execute.
 */
export const PageLoader = memo(function PageLoader() {
  return <div suppressHydrationWarning dangerouslySetInnerHTML={LOADER} />;
});
