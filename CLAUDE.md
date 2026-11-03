# Working on the Vidhi Fabrics site

Read this before touching anything. It is the standing brief: constraints the
owner has set, conventions the code already follows, traps in this environment,
and the list of things known to be unfinished.

Claude Code loads this file at the start of every session. Keep it current —
when a rule below stops being true, edit it here rather than relying on a chat
nobody can read any more.

**Read `BRAND.md` as well, before writing any copy or choosing any colour.** It
is the other half of the brief and it is not auto-loaded: positioning, voice,
the claims that are off limits, the measured palette and contrast rules, and
the photography direction all live there. It is the authority on all of that;
this file does not repeat it.

## The business

Vidhi Fabrics is a manufacturer and wholesaler in Surat, in the trade since
the 1960s (positioning confirmed by the owner on 1 October 2026). It
manufactures some lines in-house and also supplies from Surat's wider textile
market; which lines are in-house has not been specified, so never name them.

> Manufacturer and wholesaler. Access to Surat's entire textile market.

Not a broker, marketplace, agent or directory. What may and
may not be claimed on the site is set out in `BRAND.md`; some claims the owner
has ruled out explicitly, so check there before writing copy.

Confirmed contact details (owner, 2 October 2026): 542 to 543 Golden Point, Ring
Road, Begumpura, Surat 395002; **`sales@vidhifabrics.com` is confirmed to
exist**. The phone, WhatsApp and enquiry number is **+91 91729 14279**: the site
switched to it on 11 October 2026 and the owner confirmed it is the number in
use on 28 October 2026. The old +91 98252 08413 is no longer used. The Justdial
listing's address is the owner's to fix; leave its `sameAs` URL alone.

Contact details live in one place: `src/content/business.ts`. The WhatsApp
number lives in `src/content/whatsapp.ts`. Never hardcode a second copy of
either; build links from the helpers.

## How work gets approved and shipped

1. **Show the owner on localhost before committing.** This is a standing
   instruction, not a courtesy. Screenshot the change (both languages, desktop
   and mobile) and wait.
2. Commit to the working branch.
3. Deploy = fast-forward `main` and push it. Lovable rebuilds; live in about a
   minute at www.vidhifabrics.com. **Pushing a feature branch is not
   deploying** — say so plainly, the distinction has caused confusion before.
4. Verify against the live site, not the build. `curl` the page, then `cmp` the
   served asset against the tested one. Do not report a deploy as done off the
   push alone.

`AGENTS.md` forbids rewriting published history — no force-push, rebase, amend
or squash on anything already pushed. Lovable syncs from `main`, so a rewrite
costs the owner their project history. `git branch -f` to fast-forward a local
branch is fine; anything that changes a pushed commit is not.

Two mistakes worth not repeating: commits have twice landed on `main` instead
of the working branch (check `git branch --show-current` before committing),
and an unverified deploy claim was made before checking the live site.

## Working autonomy

The owner does not want to approve each step: "i want you to be an expert on
the subject matter and take a lead" (23 September 2026). Act on that.

**Decide and execute, then report.** Technical SEO, code quality, content
written inside the claim rules in `BRAND.md`, which article to write next,
structured data, refactors. Do not ask permission for these.

**Four things still come back to the owner**, because they need access or
authority rather than expertise:

1. Facts only the business holds — certificate numbers, a founding year, real
   customer ratings, what buyers actually ask on WhatsApp.
2. Positioning, and what the site claims to be. Work inside the rules in
   `BRAND.md`; do not move them.
3. Anything that cannot be verified here. The preview pane is often hidden,
   which also stops IntersectionObserver firing in that tab, so rendered
   appearance and scroll behaviour sometimes need the owner's eyes.
4. Deploying something whose effect cannot be verified from here, or that
   could be expensive to unwind. Routine deploys of verified changes are
   Claude's to make — the owner broadened this on 23 September ("seo would be
   handled by u and other technical aspect for the website as well") because
   they need to be unblocked, not consulted. Still say plainly what went live
   and how it was checked, and still stop before anything that changes
   positioning, claims or appearance nobody has seen rendered.

**Why this is safe, and what it depends on.** Reviewing every step was never
what protected this project. On 23 September an early return in `useReveal`
shipped to production and rendered the whole Hindi route blank — the deploy was
approved and nobody caught it; measurement found it afterwards. The same day a
wholesale typeface change was approved as an improvement, which could not make
it safe, because nobody had seen it rendered.

So autonomy here is paid for with verification, not with confidence. Measure
before claiming. Branch before staging. Check the served page rather than the
build. Volunteer mistakes rather than letting them be discovered.

## Architecture

TanStack Start + TanStack Router (flat file routing), React, Vite (rolldown),
Tailwind v4, TypeScript with `strict`, `exactOptionalPropertyTypes` and
`noUncheckedIndexedAccess`.

```
src/routes/     index.tsx  hi.tsx          the two home routes, kept in parity
                blog.$slug.tsx  blog.index.tsx
                hi_.blog.$slug.tsx  hi_.blog.index.tsx
                __root.tsx      icons, site-wide LocalBusiness JSON-LD
src/content/    all copy and data, trilingual; no strings in components
src/components/ fabric-desk.tsx  journal-pages.tsx  site-footer.tsx
                reach-map.tsx
src/styles.css  design tokens and @utility definitions
```

**Trilingual.** `Lang = "en" | "hi" | "hi-en"`. `/` and `/hi` are real routes;
Hinglish is client state on top of them. The `hi_.` prefix opts a route out of
the parent layout. Every string is a `Localized` record with all three keys, so
adding copy means adding it three times — including the Hinglish, which is
Romanised Hindi, not English.

**`index.tsx` and `hi.tsx` are near-duplicates.** Any change to one almost
always belongs in the other. Check both before calling a change done.

**Design tokens and font stacks** are defined in `src/styles.css`, and the
values, roles and contrast rules are documented in `BRAND.md`. One rule is
worth carrying here because it has already shipped as a live bug: `clay` fails
AA on any dark ground — use `claylight` there. `BRAND.md` has the full measured
table.

**The page palette is linen and plum** (31 October 2026, from the owner's
Atelier reference). Page ground `linen` `#F4EFE9`, cards and bands `surface`
`#FFFDFA`, buttons, links and the one dark band `plum` `#3A1F2B`, text on plum
`plumlight` `#EFE4DC`, headings `ink` `#1E1719`, body `#3A322E`, borders `line`
`#E2D8CD`. The frozen footer keeps the legacy tokens (`navy` `#1B1F23` ground,
`ivory`, `gold`, `claylight`); `clay` on the footer measures 1.26:1, so accent
text there fails AA. WhatsApp green stays on the WhatsApp glyph only. Links
carry an underline and form errors use `text-error` (`#B3261E`). Text over a
photograph is checked on the brightest pixel (BRAND.md, "Colour").

## Conventions

- **The redesign changes look, never words or SEO** (owner, 31 October 2026).
  Page text, titles, meta, canonical and hreflang, JSON-LD, URLs, heading text
  and levels, alt text and link targets stay exactly as they are; only type,
  layout, spacing and styling change. One deliberate exception, at the
  owner's request on 31 October 2026: the promo ticker's "WhatsApp" button is
  gone, and the whole ticker strip is now that same WhatsApp link (same
  message, same lead ref), so only the button's label left the page. A
  second, on 1 November 2026: the header menu is one list on every page
  (`SiteNavLinks` in `src/components/site-nav-links.tsx`), the home page's
  five: Catalogue, Scale, Contact, About us, Fabric Desk. "About us" on home
  now opens `/about` (it jumped to the home page's `#about` section), inner
  pages gained Scale (`/about#scale`) and lost Reseller Circle from the bar
  (still in the footer), and Hinglish shows the home bar's labels everywhere.
  The owner found the two different menus confusing. On `/about#scale` the
  bar marks Scale as current, not About us (owner, 3 November 2026); the
  hash is read after mount (`useHash`), so the server's header still matches
  on hydration. A third, on
  2 November 2026: the Reseller Starter Pack range card (third of the four)
  lost its "Ask on WhatsApp" button and that WhatsApp link, at the owner's
  request; its description and page link are unchanged, and no range card
  carries a WhatsApp button now (the `whatsAppMessage` field is gone). And the
  cloth band on the home page has a new h3 title, "Fabric collection"
  (`COPY.catalogue.materialsTitle`; "Material collection" until the owner
  renamed it on 3 November 2026; its Hindi "फैब्रिक कलेक्शन" is Claude's,
  unreviewed). The
  owner then supplied new photographs (31 October 2026): the Collections
  suits and sarees panels (alt text unchanged, still accurate) and three range
  cards, whose alt text was rewritten to describe the new photos, plus two
  4-second loops in `public/videos/` (Collections suits and sarees). The
  organza card first had a loop, then (owner's choice) a square crop of the
  owner's still photo, which added its own alt text. The loops were cut from
  the owner's 6 s clips at the steadiest 4 s and cross-faded end into start so
  they repeat without a jump. The sarees loop was recut on 2 November 2026:
  the old cut ran through an AI fault (from about 1.25 s to 2.75 s of
  `Fabric_sliding_off_shoulder_ff853a20.mp4` the pallu swells into a sheet
  across the sofa; 3.5–4.5 s does it again more mildly; and the first frame
  is missing the left chandelier). It is now a 2 s boomerang of the clean
  closing second (4.95 s to the end, forward then back, wrapping on
  neighbouring frames, nothing blended or invented), served with a `?v=`
  file hash. Check any new clip frame by frame for AI faults before cutting
  it. The loops are muted, decorative, hidden under reduced
  motion, and play through `LoopVideo` (`src/components/loop-video.tsx`),
  which mutes them in code (React does not render the `muted` attribute, so
  phones refused autoplay and drew a play button) and removes a clip the
  browser will not autoplay.
  The hero photo is now the owner's carved-chair saree shot (31 October 2026),
  served at 1280 and 2000 px; its alt text is unchanged.
- **Type comes only from the `type-*` roles; links only from the four kinds in
  BRAND.md, "Buttons and links"** (`btn-primary` or `btn-inverse` to talk to
  us, `btn-secondary` for a second way, `link-arrow` to go to a page, `link`
  for small asks). No raw `text-2xl font-light`-style recipes in new work.
- **Layout moves never move text in the DOM.** The SEO snapshot compares text
  order, so place things with CSS grid (`col-[a/b]`, `row-[n]`, `order`)
  rather than moving JSX. A stand-in photo for a card that has none is a CSS
  background (`standIn` in `fabrics.ts`), so it adds no image or alt text.
- **One vertical rhythm between home sections**: 112px on desktop, 88px on a
  tablet, 64px on a phone, from half that as padding on each section
  (`py-8 sm:py-11 lg:py-14`). A section with a painted band keeps the same
  outer padding around the band.
- **The footer is frozen** (BRAND.md, "Footer is frozen"). Don't edit
  `site-footer.tsx`, `footer-copy.ts` or `DirectionsLink`, and don't change the
  legacy tokens it reads (`--font-display`, `--font-body`, `--font-mono`,
  `--tracking-label`, `--tracking-ui`, `--radius`, colours). Verify any global
  CSS change by comparing the footer's computed styles before and after.
- **Measure, don't assert.** Contrast ratios, rendered sizes, payload weights,
  heading outlines — compute them. Several confident claims in this project
  turned out wrong on measurement.
- **WCAG AA is the bar**: 4.5:1 body text, 3:1 large text. Check the _worst_
  pixel under a texture, not the mean.
- Scroll rails are native CSS scroll-snap with arrow buttons — no carousel
  library. `JournalRail` in `fabric-desk.tsx` is the reference implementation;
  it honours `prefers-reduced-motion`.
- **Scroll reveals** are `useReveal` (`src/hooks/use-reveal.ts`) plus the
  `.vf-js [data-reveal]` rules in `styles.css` — an IntersectionObserver
  toggling a class, no motion library. Mark a single element `data-reveal`; put
  `data-reveal-stagger` on a container to make its `data-reveal` children fire
  80ms apart; add `data-reveal-img` to settle an image from `scale(1.04)`.
  Three things to know before touching it:
  - **Don't nest a `data-reveal` inside another `data-reveal`.** The child
    animates while the parent is still at opacity 0, so the stagger happens
    unseen and the group appears all at once. The catalogue section is
    deliberately _not_ marked; its cards are.
  - The staged state is scoped to `.vf-js`, which is **server-rendered** on
    `<html>` in `__root.tsx`. Adding that class from an inline script instead
    desynchronises hydration and React discards the render — the page goes
    blank. A `<noscript>` block releases the staging when JS is unavailable.
  - `data-reveal-img` sets `overflow: hidden` on its element, because a 4%
    overscale otherwise bleeds past the grid track and adds horizontal scroll
    on small screens. Put it on a wrapper around the image, never on a card
    that contains an `absolute inset-0` click target — the clip would cut off
    that button's focus ring.
  - `data-reveal-block` is the heavier variant: markup must be
    `<div data-reveal-block><div data-reveal-panel><img/></div></div>`. The
    panel rises a full frame height while the image counter-moves, so the
    frame's edge sweeps across a near-stationary image. **Both the panel
    element and its attribute are required** — without them there is nothing to
    slide and the frame renders empty. The panel is marked explicitly rather
    than matched as `> *` because several frames carry a sibling next to the
    image — a number badge on a journal card, a caption on the story block —
    and a child selector drags those up from below too.
  - **Don't build the block reveal out of `clip-path`.** It was written that way
    first and silently did nothing: the base computes with mixed units
    (`inset(0px 0px 100%)`), the minifier normalises the target to `inset(0)`,
    and the two forms will not interpolate, so the transition never progresses
    and the image stays hidden. Transforms always interpolate; use those.
  - `useReveal` must install its MutationObserver **unconditionally**. An early
    `if (nodes.length === 0) return` once bailed out before either observer was
    created on a route whose content was not yet in the DOM, which left the
    whole Hindi page staged at opacity 0 — blank. Content that mounts later is
    normal here, not an edge case.
- Footer column labels are `<p>` with `aria-labelledby`, **not** `<h2>`. Using
  headings there once left `/blog` with nothing but footer nav at h2 level.
  `JournalCard` takes a `headingLevel` prop for the same reason.
- No AI/chatbot API. No large dependencies.
- **Two analytics providers, and that is the ceiling.** Vercel Analytics and
  the Google Ads tag (`AW-11259228096`, added 25 September 2026 at the owner's
  request, for conversion tracking and remarketing). This rule previously read
  "no new analytics provider"; it was amended rather than broken. Anything
  further needs the owner's explicit decision, not an inference from this line.
- **Privacy policy is `/privacy-policy`, English only.** The owner supplied the
  practices on 21 October 2026 (name, phone, city, business type, messages,
  Google Analytics, no sale of data, access or deletion on WhatsApp, DPDP Act
  2023). Terms are still unwritten. Do not invent a Hindi version of the policy.
- Images: always ship a sized derivative, never an original. Card thumbnails
  render around 342×257; a 1600px file there is waste.

## This environment

- Dev server: `npm run dev -- --host 127.0.0.1`. **IPv6 is unsupported**, so
  bind `127.0.0.1` explicitly, not `localhost`.
- `npm run preview` is broken — it looks for `dist/server/` while the build
  writes `.output/`. Use `npm run build` and inspect `.output/public/`.
- A dev server can keep serving pre-edit code. On 22 October one started with
  `&` inside a sandboxed Bash command kept the old class names and the old font
  after the files had changed, so every measurement taken from it was of the
  old site. A fresh one started with `run_in_background` picked edits up. When
  a reading disagrees with the source, `curl` the module
  (`http://127.0.0.1:PORT/src/<file>`) before trusting it. The stale process
  could not be killed from a later sandboxed command and kept its port, so
  start the new one on another port.
- Playwright is at `/opt/node22/lib/node_modules/playwright` (CommonJS — import
  the default export, not named). Chromium at
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
- Playwright screenshots of an element **include the sticky header** painted
  over it. Sampling the top of a section measures the header, not the section.
  This has produced nonsense contrast numbers twice.
- Before any click-based test or screenshot, `addInitScript` setting
  `sessionStorage` keys `vidhi-lead-popup-seen`, `vidhi-talk-to-us-teaser` and
  `vidhi-loader-seen`, or overlays (the logo loader for its first 4 s)
  intercept the clicks and cover the page.
- Pillow is available. On the owner's Mac, ffmpeg and ffprobe are installed
  (`/opt/homebrew/bin`, confirmed 2 November 2026), so video cutting and
  frame extraction work there; the older note that there was no ffmpeg came
  from a different environment. OpenCV, ImageMagick, sharp, cwebp and a HEIC
  decoder are still not assumed.
- Playwright cannot reach external HTTPS (cert authority). Verify the live site
  with `curl` instead, and use `grep -a` — gzipped responses make grep suppress
  matches as "binary file matches".
- Vite does not bundle unimported files in `src/assets/` (verified; there is no
  `import.meta.glob`). Unused originals cost repo weight but not page weight.

## Performance and request handling (3 October 2026)

- Fonts are self-hosted in `src/assets/fonts/` (31 October 2026): Newsreader
  Display 300 (headlines) and Anek Latin 400 and 500 (text), declared in
  `styles.css` and preloaded on every page; Newsreader 400 (panel titles and
  the footer wordmark), loaded on demand; Anek Devanagari 400 and Noto Serif
  Devanagari 400, declared and preloaded from `__root.tsx` on `/hi` routes
  only; a 6 KB Anek Devanagari subset for the few Hindi words on English
  pages. Hanken Grotesk and a footer-only cut of Noto Sans Devanagari remain
  for the frozen footer and are not preloaded (BRAND.md, "Footer is frozen").
  Don't reintroduce the Google Fonts stylesheet: it was render-blocking.
- gtag.js is loaded by `src/lib/deferred-gtag.ts` (first interaction or 3.5 s
  after load). The inline `dataLayer`/`gtag()` stub in `__root.tsx` queues
  every event until then; keep it.
- The homepage pop-up (`src/components/lead-popup.tsx`) is a non-modal card in
  the bottom corner: no backdrop, no scroll lock, no focus trap, and nothing
  takes focus when it opens. It opens 5 s after every arrival on the home
  page, with no scroll trigger, and never on load (owner, 3 November 2026:
  30 s, then 5 s; it used to be 35 s or 50% scroll, once per session, and
  7 days away after a close). Closing it hides it for that page view only;
  sending an enquiry from it keeps it away for 365 days, remembered in
  `localStorage` as `vidhi-lead-popup` (`state: "submitted"`; old
  `"dismissed"` entries are ignored). On a first visit it lands about a second
  after the 4 s logo loader fades. Nothing on the site sets the session key
  `vidhi-lead-popup-seen` any more; it is only the test switch below.
- **Logo loader** (owner, 31 October 2026): `src/components/page-loader.tsx`,
  first in `<body>`. The Vidhi mark is written as a calligrapher would: one
  stroke for the V (curl, downstroke, up the needle, the thread flicked
  through its eye), a second for "idhi" that starts a beat before the first
  ends, FABRICS under a soft wipe, then one glint up the needle. No line is
  drawn that is not in the logo (an earlier version drew a connecting thread
  between words; the owner rejected it). It plays over a linen screen for 4 s, once per browser
  (owner, 3 November 2026: "first time only, don't do it repeatedly"; on
  2 November it was once per visit, which still replayed it in every new
  tab): its inline script removes it when `vidhi-loader-seen` is in
  `localStorage` (set the first time it plays) or `sessionStorage` (tests set
  that), or when the referrer is a page of this site, which keeps it away
  between pages even where storage is blocked. `PageLoader` is memoised with
  its `{ __html }` object hoisted, so it renders once: when it re-rendered,
  React re-set its innerHTML on every router change (Contact and Catalogue
  jumps, the footer's in-app links), which re-inserted the loader and replayed
  the whole logo with its skip script dead (3 November 2026). Any tap, key or scroll ends it early, and reduced motion skips it.
  It lets the pointer through from the moment its fade begins (`vfl-pass`)
  and as soon as a tap skips it (`.is-done`), so a click on the page as it
  appears reaches its link; it used to swallow that click, which read as the
  header "sometimes not working". While the screen is still opaque a tap
  only skips it.
  After its fade it stays in the DOM, hidden (it used to remove itself): the
  hero headline's word-by-word blur-in is timed from it with
  `body:has(#vf-loader:not(.is-done))` in `showroom.css`, and removing the
  loader mid-way made the words jump. On a repeat visit the inline script
  removes it before first paint, so the words play straight away.
  While it is up its inline script fetches every image and video on the page
  into the cache (video skipped under data saver), so nothing pops in after;
  that costs the first visit the page's full media weight, including the 6 MB
  loom clip on /about. It is pure SVG and CSS keyframes, so it finishes
  without JavaScript, and it adds no text, links or images. The markup in
  `page-loader-markup.ts` is generated: its design source is the Remotion
  project in `motion/logo-loader/` (traced logo paths, the pen strokes, one
  timing table; ignored by the site's ESLint). Change it there, preview with
  `npm run studio`, and from that folder re-export with
  `node scripts/export-web.mjs ../../src/components/page-loader-markup.ts`.
  Its `node_modules` is a link to an install at
  `/Users/amberuser/code/VIDHI/vidhi-logo-motion`; on a fresh clone run
  `npm i` there instead.
- **Home page micro-animations** (owner, 1 November 2026), all CSS or a few
  lines of React, no animation library, all off under reduced motion:
  headline words blur in (`BlurWords` in `showroom-home.tsx`; words are
  wrapped, never split into letters, so Hindi conjuncts hold); a sheen across
  cloth photos on hover (`.vf-sheen`, pointer devices only); facts-strip
  numbers count up (`count-up-text.tsx`; the server renders the real figure);
  a scroll-progress line (`.vf-scroll-progress`, CSS scroll-driven, absent in
  browsers without `animation-timeline`); and a tick drawn into the enquiry
  button on send (`send-tick.tsx`, label unchanged).
- **About page** (owner, 1 November 2026): left-aligned on the home grid
  after the owner's Armonia reference: title, the loom clip as a wide banner
  (moved up from `TradeStory`), the lede full width at `type-h3`, then the
  four story sections (Who we are → Sixty years in the trade) as numbered
  chapters (`.vf-chapter` in `styles.css`): a hairline that draws across as
  each chapter reveals, a large light plum number 01–04 from a CSS counter
  (no text added) over the h2, and the text open on the page to the right
  as one column running to the right edge (the owner rejected two columns). The owner rejected
  a vertical timeline with a scroll-filled line and white cards
  (1 November 2026). The note ("Which Vidhi Fabrics this is") shares the
  chapters' two columns, with no card. The left-column headings carry
  `.vf-heading-strong` (a hairline text stroke, because Anek 500 is the
  heaviest cut shipped). The scale stats are a "journey line" (`.vf-journey` in
  `styles.css`; visual order 1960s → Surat → 2,400+ → UAE by CSS `order`, DOM
  order unchanged, no words added). The reach map is a globe with real
  country outlines (`reach-globe.tsx`; owner, 2 November 2026, after the
  dotted `cobe` globe's ±10° sway read as not moving): d3-geo's orthographic
  projection on a 2D canvas, with oceans, land, borders and a lit-sphere
  shade. India is filled deep plum and each market country rose, keyed by
  the `iso` code on each entry in `markets.ts`. A light runs from Surat out
  along each raised arc in turn, and the country brightens and its pin rings
  as it lands. It is zoomed in: on a wide screen a 16:9 frame with the sphere
  spanning the width, its top and bottom fading out (`.vf-globe`); on a
  phone a square frame, cropped at the sides as well. It sways ±14° over
  16 s (±6° on a phone, the most that keeps Nigeria and Malaysia in frame),
  can be dragged (turn ±60°, tilt ±20°) and eases back when let go. The map
  is `public/data/world-countries.json`: Natural Earth 1:50m via
  `world-atlas` (public domain), Antarctica and names dropped, simplified
  to 86 KB (26 KB gzipped). d3-geo, `topojson-client` and the map load on
  demand when the globe nears the viewport, about 42 KB gzipped in all.
  The flat dotted map stays as the server-rendered fallback for no canvas
  or no JavaScript. Under reduced motion it holds still with no lights and
  draws only when dragged. In the testimonials
  (`trade-story.tsx`) the lead quote is centred at `type-h3` with its lines
  balanced, and the three proof stats sit on a subgrid so their labels start
  on one line whatever the length of the value above (owner, 1 November
  2026).
- **Fabric Desk index** (`/blog`, `/hi/blog`; owner, 1 November 2026): on the
  linen ground and the home grid, and `JournalCard` is the home catalogue's
  range card (white `card`, photo inset in a rounded `card-media`, plum tag,
  title, line, "Read article" on a hairline). The cards reveal as the range
  cards do, the whole card fading up 80 ms apart (`data-reveal` on the card,
  `data-reveal-stagger` on each group's grid); the owner rejected the block
  reveal on their photos, which opened an empty frame first.
- **Blog articles** (`JournalArticlePage` in `journal-pages.tsx`: the 8
  `/blog/<slug>` pages and the 2 standalone guides, in both languages; owner,
  1 November 2026, "stretch end to end … cleaner, more organised"): on linen
  and the home grid, every block a row on the rail shared with /about
  (`RAIL_COLS` / `RAIL_GRID` / `RAIL_CONTENT` in `src/lib/layout-classes.ts`),
  so the whole article hangs on two vertical lines (x 50 and 394 at 1440).
  Head: category in the rail, h1 and byline in the content column. Photo full
  width (21:9), no reveal. The direct answer is a full-width `type-h3`
  statement; the introduction, contents (two columns, numbered 01… by the
  `.vf-toc` counter), sections (`.vf-chapter` rows, numbered like /about),
  closing, FAQ and "Keep reading" (`link-arrow`s) are rail rows. Checklists
  are white cards with plum bullets; the CTA is an inset plum card
  (`btn-inverse`). Text, ids, headings and links are unchanged. A Playwright
  loop of fast `window.scrollTo` calls never reaches the lower sections,
  because `html` has `scroll-behavior: smooth` and each call cancels the last;
  scroll with `behavior: "instant"` before trusting a screenshot of reveals.
- **Range pages** (the six pages the catalogue cards open: polyester sarees,
  unstitched suits, dress material, resellers, organza and net, Diwali and
  Karva Chauth, in both languages; owner, 1 November 2026): on linen and the
  same rail. `WholesaleLanding` draws two of them; the other four lay out
  inline in their route files. Their body is a flat run of h2 and
  paragraphs, so the rail is CSS rather than wrappers: `.vf-flow` in
  `styles.css` puts each h2 in the rail level with the block after it, with
  a hairline across the row, the FAQ `section` and the closing button row
  (`.vf-flow-end`) on a subgrid; `.vf-indent` puts the intro and the buttons
  under the title in the content column. The Reseller Circle card is the
  white `card`, and the dress material page's live designs
  (`ShowroomCollection`) are range cards, four across.
- **Footer art band:** the band paints no ground and the art multiplies onto
  the page behind it, so it takes each page's white or linen with no seam.
  An alpha cut-out of the art was tried and dropped, because the alpha
  carried the JPEG grain and made the files three to four times heavier.
- **Finishing pass** (2 November 2026, after a page-by-page audit with the
  Impeccable skill):
  - FAQ, Reseller Circle, privacy and the 404 page are on linen and the
    rail like the range pages (`.vf-flow`, `.vf-indent`, white `card` for
    the join form and the 404's WhatsApp box; the 404 has no header, so its
    text and links are unchanged). Every page is now on linen.
  - From 1280px, `.vf-longform`, `.vf-flow` and `.vf-chapters` set
    `--type-body` to 20px and `--type-lead` to 23px (owner: "slightly larger
    text"), so the full-width column reads at about 99 characters a line.
  - Touch targets: on `(pointer: coarse)` the `segmented` pills are 44px
    tall; the header search is 44px on phones; the article back link 44px.
  - A sideways-scrolling `data-reveal-stagger` row reveals as one
    (`use-reveal.ts`, `show`): its later cards never cross the viewport, so
    they used to arrive blank when swiped in.
  - `LoopVideo` pauses off screen like `LazyLoopVideo`. The promo ticker and
    the home search's typing line and caret rest off screen (`useOffscreen`,
    `src/hooks/use-offscreen.ts`). The phone WhatsApp pulse runs 3 times,
    then stops. Headline words use `animation-fill-mode: backwards`, so they
    end with no filter or transform. The lead pop-up leaves with a 0.2 s
    `vf-leave` instead of vanishing.
  - On phones the floating WhatsApp pill steps aside while the home hero's
    own WhatsApp button (`data-hero-cta`) is on screen.
  - Range card and collection photos ship 640px / 960px derivatives through
    `srcSet` (fields on the image data in `fabrics.ts` / `showroom-live.ts`).
  - Three micro-animations, all off under reduced motion, no text added:
    a fade on the right edge of phone swipe rows that clears at the row's
    end (`.vf-rail-fade-sm` / `-md`, CSS scroll-driven, absent where
    unsupported); a live article contents list (`useActiveStep` in
    `journal-pages.tsx` sets `aria-current="location"`); and a gentle pull
    (up to 6px, mouse only) on `[data-magnet]` buttons (`use-magnet.ts`,
    installed from `__root.tsx`; it sets `translate`, so the button's own
    press scale still works).
  - The unused `talk-to-us.tsx` and the `motion` library are gone; the site
    has no animation library.
  **`AboutPage` calls `useReveal()`.** It did not at first, so every
  `data-reveal` on /about (timeline, journey line, testimonial cards) sat at
  opacity 0 in the owner's browser while reduced-motion screenshots looked
  fine, because CSS un-stages everything under reduced motion. Any page that
  renders `data-reveal` must call the hook, and visual checks must run with
  `reducedMotion: "no-preference"`.
- The header hides while the reader scrolls down and returns on any
  scroll up (`src/hooks/use-hide-on-scroll.ts`, styled by
  `header[data-hide-on-scroll]` in `styles.css`). It stays put for 1.5 s
  after a click on a link to a place on the same page (the jump is the bar
  being used, not reading on), and on a mouse it comes back when the pointer
  reaches the top 72 px of the window. A Playwright screenshot taken
  after scrolling down has no header over it; one taken after scrolling up
  does.
- `src/lib/edge-policy.ts` (called from `src/server.ts`): 200 HTML responses get
  `s-maxage=3600, stale-while-revalidate=86400`; 404s, redirects, errors and
  `/api` are untouched. `vidhi-fabrics-hub.lovable.app` 301s to www;
  other Lovable preview hosts get `X-Robots-Tag: noindex`. Apex and `http://www`
  301 to `https://www.vidhifabrics.com` from `vercel.json` (copied into Nitro's
  Vercel output config by `scripts/inject-canonical-host-routes.mjs`) and from
  the same rule in the server. Vercel's own HTTP→HTTPS upgrade is a 308 on the
  same host and runs first; it cannot be turned into that 301.
- The Vercel function region (bom1) is set in `vite.config.ts` via nitro's
  `vercel.functions` option, not in `vercel.json`.
- GSTIN 24ABFPC2380K1ZW (owner-confirmed 3 October 2026) lives in
  `BUSINESS.gstin`; it is shown in the footer, home contact block and /about,
  and is the LocalBusiness `taxID`.

## Open items

Nothing here is blocked on code. Most need a decision or data from the owner.

**Live and wrong — fix when the owner supplies the data**

- **Journal images are still oversized in dimensions, though smaller in bytes.**
  The six images the catalogue cards and journal pages use (`woven-detail`,
  `swatch-book`, `swatch-on-card`, `swatch-stack`, `warehouse-surat`,
  `spec-samples`) were re-encoded from JPEG to WebP on 26 September — e.g.
  `woven-detail.webp` is 332 KB versus the old 474 KB JPEG — but none were
  resized. `woven-detail.webp` is still 1024×768 for a 342×257 card slot, and
  `swatch-book.webp` is 1440×900. A sized derivative (~700px for a card) is
  still the real fix; the format change only cut bytes, not the
  resolution mismatch.
- **`weaving-loom.mp4`** (6 MB) is still the single largest item on the
  homepage. Correction carried from the 26 September SEO report: it does
  **not** revalidate on every visit — it returns a 304 with 0 bytes on repeat
  visits, so the 6 MB is a first-visit cost, not a per-visit one. Still needs a
  re-encode, which needs ffmpeg, not available in this environment.

**Fixed since this list was last written — removed 1 October 2026**

- ~~Placeholder star ratings~~ — removed in `b127a97` (23 September). Verified
  again 1 October: `ratingLabel` and "five-star" appear nowhere in `src/` or
  the live homepage HTML. This item sat here as stale for over a week after
  the actual fix landed; the SEO report caught the staleness on 27 September,
  this file is the correction.
- ~~Junk file in `public/`~~ — removed in the 26 September SEO pass, merged
  1 October. The two camera-original `.mov` files also moved to
  `media-originals/` as source material for a future re-encode, so a fresh
  clone no longer pulls ~1 GB of LFS objects for files the site doesn't serve.

- ~~Confirm `sales@vidhifabrics.com` exists~~ — confirmed by the owner on
  2 October 2026.

**Owner-side**

- Submit `public/sitemap.xml` (12 URLs) in Google Search Console.
- Certificate or licence numbers for the OEKO-TEX and GOTS claim in
  `certBody`. The owner confirmed the claim is accurate; the numbers would let
  it be substantiated on the page.
- Video testimonials (the "export champions" rail idea): needs filmed buyers
  with written consent. Shoot vertical 1080×1920, subject's eyes around 60%
  height so the name overlay doesn't land on their face, lapel mic, speaking
  Hindi or Gujarati with a transcript per clip for caption tracks. Recommended
  build: poster image plus click-to-play, videos hosted off-repo.

**Ideas offered, not built**

- A thin woven "selvedge" band across the top of the page.
- Privacy and terms pages — need the business's actual data practices first.
- De-templateising the dark Scale four-box grid, the last section still on the
  generic skeleton.

## Standing caveats

State these when they become relevant rather than letting them pass as
verified:

- The three buyer guides in `src/content/journal.ts` are the owner's copy. They
  have never been fact-checked.
- All Hindi and Hinglish translations were written by Claude. **No native
  speaker has reviewed them.**
- Five blobs over 5 MB — 65.6 MB in total, four unreduced image originals plus
  the loom video — are permanently in this repo's git history. They cannot be
  removed without the history rewrite `AGENTS.md` forbids.
