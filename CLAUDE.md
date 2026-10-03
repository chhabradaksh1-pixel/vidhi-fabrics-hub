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

Confirmed contact details (owner, 2 October 2026): 542-543 Golden Point, Ring
Road, Begumpura, Surat 395002; WhatsApp +91 9825208413; **`sales@vidhifabrics.com`
is confirmed to exist**. The Justdial listing's address is the owner's to fix;
leave its `sameAs` URL alone.

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
                talk-to-us.tsx   reach-map.tsx
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

**The palette is monochrome.** Every colour token is a true neutral so the
fabric photography is the only colour on the page. The token names are
historical — `clay`, `navy`, `gold` are steps on one grey ramp, not hues. The
clay-on-ink rule above got _more_ dangerous in the process: that pair now
measures 1.08:1 rather than 2.29:1, so the same mistake renders as invisible
text rather than merely poor text.

## Conventions

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
- **The Google Ads tag needs a privacy policy that does not exist.** Google
  requires advertisers to disclose cookie and data collection, and the site has
  no privacy page — `footer-copy.ts` records that one was deliberately left out
  rather than linked to a 404. Writing it needs the business's actual data
  practices, so it is an owner-side task, but it is now a compliance gap rather
  than a nice-to-have.
- Images: always ship a sized derivative, never an original. Card thumbnails
  render around 342×257; a 1600px file there is waste.

## This environment

- Dev server: `npm run dev -- --host 127.0.0.1`. **IPv6 is unsupported**, so
  bind `127.0.0.1` explicitly, not `localhost`.
- `npm run preview` is broken — it looks for `dist/server/` while the build
  writes `.output/`. Use `npm run build` and inspect `.output/public/`.
- Playwright is at `/opt/node22/lib/node_modules/playwright` (CommonJS — import
  the default export, not named). Chromium at
  `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`.
- Playwright screenshots of an element **include the sticky header** painted
  over it. Sampling the top of a section measures the header, not the section.
  This has produced nonsense contrast numbers twice.
- Before any click-based test, `addInitScript` setting `sessionStorage` keys
  `vidhi-lead-popup-seen` and `vidhi-talk-to-us-teaser`, or overlays intercept
  the clicks.
- Pillow is available. **No ffmpeg, ffprobe, OpenCV, ImageMagick, sharp or
  cwebp, and no HEIC decoder.** No video transcoding, cropping or poster-frame
  extraction is possible here.
- Playwright cannot reach external HTTPS (cert authority). Verify the live site
  with `curl` instead, and use `grep -a` — gzipped responses make grep suppress
  matches as "binary file matches".
- Vite does not bundle unimported files in `src/assets/` (verified; there is no
  `import.meta.glob`). Unused originals cost repo weight but not page weight.

## Performance and request handling (3 October 2026)

- Fonts are self-hosted in `src/assets/fonts/` (Inter in `styles.css`; Noto
  Sans Devanagari declared and preloaded from `__root.tsx` on `/hi` routes
  only). Don't reintroduce the Google Fonts stylesheet: it was render-blocking.
- gtag.js is loaded by `src/lib/deferred-gtag.ts` (first interaction or 3.5 s
  after load). The inline `dataLayer`/`gtag()` stub in `__root.tsx` queues
  every event until then; keep it.
- The homepage pop-up (`src/components/lead-popup.tsx`) opens after 35 s or 50%
  scroll, once per session. It never opens on load.
- `src/lib/edge-policy.ts` (called from `src/server.ts`): 200 HTML responses get
  `s-maxage=3600, stale-while-revalidate=86400`; 404s, redirects, errors and
  `/api` are untouched. `vidhi-fabrics-hub.lovable.app` 301s to www;
  other Lovable preview hosts get `X-Robots-Tag: noindex`.
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
