# Vidhi Fabrics — brand

The brand system as it actually exists on the site today: how the business is
positioned, how it is allowed to talk, and the colour, type and image rules the
code already follows.

Companion to `CLAUDE.md`. That file covers how work gets built and shipped;
this one covers what it should look and sound like. When the two disagree about
voice or colour, this file wins — and whichever is wrong should be corrected.

Every hex and ratio below was measured from the rendered site, not copied from
a spec. If you change a token, re-measure rather than reasoning about it.

## Who this is for

Vidhi Fabrics supplies **wholesalers, retailers, resellers and boutiques** —
mainly in Punjab, Haryana and Rajasthan, sometimes Madhya Pradesh (confirmed by
the owner on 2 October 2026). These are people who already know fabric. They are comparing suppliers, not learning what
jacquard is. Copy can use trade vocabulary without glossing it, and should
never explain the obvious.

The main categories are **polyester sarees and dress material** (manufacturer
and wholesaler). On top of that, Vidhi Fabrics offers **fabric sourcing**:
through its network of Surat mills and manufacturing units it sources organza,
net and other fabrics to order (owner, 2 October 2026). Name organza and net as
examples; don't present cotton, silk, linen or jacquard as standing ranges.
Never mention margins or describe the sourcing as reselling.

## Positioning

> Manufacturer and wholesaler. Access to Surat's entire textile market.

A **manufacturer and wholesaler** — confirmed by the owner on 1 October 2026.
Vidhi Fabrics manufactures some lines in-house and also supplies from Surat's
wider textile market. Use that framing everywhere: copy, meta tags, structured
data and `llms.txt`. In Hindi, निर्माता और थोक विक्रेता; in Hinglish,
"manufacturer aur wholesaler".

**Do not name which lines are made in-house.** The owner has not specified
them, so "some lines" is the claim. Do not attach "we manufacture" to a
particular product (polyester sarees, dress material or anything else) until
he does.

The earlier rule that the site must call Vidhi "a supplier, not a
manufacturer" and say it runs no factory of its own is **withdrawn**. It was
never confirmed by the owner, and no copy should say it.

Never a broker, marketplace, agent, aggregator or directory. The distinction
is the whole proposition: the buyer deals with one business that answers for
the order, and that business has the reach of the city behind it. Nothing
should imply enquiries get passed along to someone else.

Surat's position is the backdrop, not the claim. "From Surat, Asia's textile
hub, to your shop" is the register — the city gives scale, the business gives
the relationship.

## What may and may not be claimed

**Off limits.** These cannot be substantiated, so they must not appear in any
form — not in copy, alt text, meta descriptions or structured data:

- Best price, lowest price, or direct-from-manufacturer pricing
- Guaranteed quality or guaranteed delivery
- A fixed MOQ or a fixed lead time
- Any unverified certification, production capacity or export statistic
- Which specific lines are manufactured in-house, until the owner names them

**Confirmed and usable**, as supplied by the owner:

| Claim              | Form to use               |
| ------------------ | ------------------------- |
| Years in the trade | since the 1960s           |
| Active SKUs        | 2,400+                    |
| Enquiry response   | typically within 12 hours |
| Advance or cash payment | 5% off as a thank you on bulk orders above 100 pieces. Not a minimum order, and not cheaper than the market. Order details on WhatsApp. Only in the FAQ and the polyester saree buying guide, never as a homepage line, a headline, or a banner. No other price. |

The export-market figure (10+) and the monthly capacity figure (12k m²) were
withdrawn on 2 October 2026 and must not be used anywhere.

**Export focus (owner, 2 October 2026).** Vidhi Fabrics does not export yet but
is open to export enquiries. Highlight the UAE and other international markets
as the export focus, e.g. "Export enquiries welcome from the UAE and other
international markets" / "UAE और अन्य अंतरराष्ट्रीय बाज़ारों से एक्सपोर्ट पूछताछ का
स्वागत है". Never claim current export markets or export history, never state
a count of countries exported to, and don't describe the business as an
established exporter.

One framing was explicitly rejected: **do not present the response time as
replying to "wholesale enquiries."** It reads as though only large buyers are
welcome. A boutique owner sourcing a small run is a real customer and the copy
must not signal otherwise.

GOTS was removed on 2 October 2026 (it certifies organic cotton, which does
not fit the range). The OEKO-TEX claim in `certBody` is accurate per the owner, but no
certificate or licence numbers have been supplied. Until they are, don't extend
or restate the claim anywhere new.

## Voice

Short declaratives. Trade language. Metaphors drawn from the work itself rather
than from marketing. No superlatives, no exclamation marks, no urgency tricks.

Lines currently carrying the voice:

- "From Surat, Asia's textile hub, to your shop."
- "Tracked like inventory, built like a loom."
- "A broad range, ready for sourcing."
- "Trusted across markets. Built on repeat business."
- "Certified for the contract, not just the sale."
- "Tell us what you need."

Note what these avoid. "A broad range" rather than "the largest range" — hedged
because the larger claim isn't provable. "Built on repeat business" rather than
"trusted by thousands" — a shape of evidence instead of a number nobody
audited. That restraint is the voice, not a limitation on it.

**Sentence case for headings.** The letterspaced labels are the only
uppercase, and they are labels, not sentences.

**The reader is a peer.** Not "we are delighted to offer" and not "grab yours
now." A trader talking to a trader about cloth.

## Colour

Tokens live in `src/styles.css`. **The page palette is linen and plum** (31
October 2026), taken from the owner's Atelier / Thread reference: a warm linen
page, white cards, a deep plum for buttons, links and the one dark band, and a
pale cream for text on plum. It replaces the white-and-slate palette of 22
October on every page outside the footer. The footer keeps its own colours
(below), because it is frozen.

| Token        | Hex       | Role                                                       |
| ------------ | --------- | ---------------------------------------------------------- |
| `linen`      | `#F4EFE9` | page ground (`--background`)                               |
| `surface`    | `#FFFDFA` | cards, the facts band, the cloth band, the enquiry form    |
| `sand`       | `#EBE3D9` | image placeholders, card hover, the current header link    |
| `foreground` | `#3A322E` | body text                                                  |
| `ink`        | `#1E1719` | headings                                                   |
| `mute`       | `#675D57` | secondary text                                             |
| `plum`       | `#3A1F2B` | buttons, links, the promo ticker, the hero and Reseller Circle grounds |
| `plumdeep`   | `#27141D` | plum hover and pressed; the About photo's wash             |
| `plumlight`  | `#EFE4DC` | text and inverse buttons on plum                           |
| `line`       | `#E2D8CD` | hairlines and dividers                                     |
| `error`      | `#B3261E` | form errors and invalid fields                             |

Measured 31 October 2026:

| Pair                       | Ratio   | Body 4.5:1 | Large 3:1 |
| -------------------------- | ------- | ---------- | --------- |
| `ink` on `linen`           | 15.41:1 | yes        | yes       |
| `ink` on `surface`         | 17.35:1 | yes        | yes       |
| `foreground` on `linen`    | 10.96:1 | yes        | yes       |
| `foreground` on `surface`  | 12.34:1 | yes        | yes       |
| `foreground` on `sand`     | 9.86:1  | yes        | yes       |
| `mute` on `linen`          | 5.60:1  | yes        | yes       |
| `mute` on `surface`        | 6.31:1  | yes        | yes       |
| `mute` on `sand`           | 5.04:1  | yes        | yes       |
| `plum` on `linen`          | 13.02:1 | yes        | yes       |
| `plum` on `surface`        | 14.66:1 | yes        | yes       |
| `plumlight` on `plum`      | 11.91:1 | yes        | yes       |
| `plumlight` on `plumdeep`  | 13.95:1 | yes        | yes       |
| `error` on `linen`         | 5.72:1  | yes        | yes       |
| `error` on `surface`       | 6.44:1  | yes        | yes       |

`mute` on `sand` (5.04:1) is the tightest text pair. Do not lighten either.

**Text over photographs** is measured on the brightest pixel behind each line,
with the text hidden. The hero's plum wash (`.vf-hero-shade` in
`showroom.css`) stays dense up to the end of the text column, set in rem rather
than as a share of the width, so the cream text holds 4.5:1 at every width;
the photograph opens up to the right of it. The About photo's wash rises from
the bottom (`plumdeep` 95%, then 80% at 65%). Both were measured at 390, 768,
900, 1024, 1280 and 1440px in English and Hindi on 31 October 2026, with no
failures. Re-measure whenever a photo, a wash or the hero text changes.

**A link carries an underline.** `link` is plum with a plum underline at 55%.
WhatsApp green (`#25D366`) is only the glyph on the WhatsApp icon.

### Footer colours (frozen)

The footer still reads the legacy tokens, which must not change: `navy`
(`#1B1F23`, ground), `ivory` (`#F4F6F7`, text), `gold` (`#B4BDC4`, accent),
`claylight` (`#E4E8EB`) and `clay` (`#2B3137`). `clay` fails on the footer
(1.26:1 on `navy`); `claylight` (13.45:1), `ivory` (15.29:1) and `gold`
(8.70:1) pass. The footer is textured, so its text was measured on the worst
pixel: the copyright line (`ivory` at 55%) gives 4.81:1 at the bottom, where
only the line grids reach. `ivory` at 55% would fail at the top (3.78:1), so
keep that opacity to the bottom line.

Over a texture or photograph, check the **brightest pixel**, not the average.
A mean that passes hides a worst case that doesn't.

## Type

Fixed roles (31 October 2026). Headings are a serif, **Newsreader**, and
everything else is **Anek** by Ek Type, an Indian foundry. Newsreader Display
at its light 300 weight sets the hero, page titles and section headings, the
way Atelier sets its headlines; Newsreader 400 sets smaller panel titles. Hindi
headings use **Noto Serif Devanagari**; Hindi text uses Anek Devanagari, drawn
as one design with Anek Latin so the two scripts match. Card titles, FAQ
questions and all running text stay in the sans.

All are SIL Open Font License 1.1, self-hosted, `font-display: swap`, one
static file per cut so nothing is faked:

| Cut                         | Used for                                  | File  | Loaded                |
| --------------------------- | ----------------------------------------- | ----- | --------------------- |
| Newsreader Display 300      | `type-display`, `type-h1`, `type-h2`      | 23 KB | every page, preloaded |
| Newsreader 400              | `type-h3`; the frozen footer's wordmark   | 22 KB | every page, on demand |
| Anek Latin 400              | body, lead, small text                    | 20 KB | every page, preloaded |
| Anek Latin 500              | `type-h4`, labels, navigation, buttons    | 20 KB | every page, preloaded |
| Noto Serif Devanagari 400   | Hindi headings                            | 51 KB | `/hi` only, preloaded |
| Anek Devanagari 400         | Hindi text, labels and buttons            | 94 KB | `/hi` only, preloaded |
| Anek Devanagari subset      | the few Hindi words on English pages (हिंदी switch, the home page's Hindi line) | 6 KB | English pages |

### Roles

Every heading, paragraph, label, link and button takes exactly one role
utility from `styles.css`. Nothing else sets font size, line height, weight,
width or tracking, so a page redesign changes layout, never type. The heading
sizes grow fluidly between a 390px phone and a 1440px desktop.

| Role           | English size / line height | Face · weight · tracking            | Use for                                  |
| -------------- | -------------------------- | ----------------------------------- | ---------------------------------------- |
| `type-display` | 44→88px / 1.0              | Newsreader Display · 300 · −0.02em  | the home hero only                       |
| `type-h1`      | 36→60px / 1.04             | Newsreader Display · 300 · −0.015em | page titles; large headings on dark grounds |
| `type-h2`      | 30→48px / 1.08             | Newsreader Display · 300 · −0.01em  | section headings                         |
| `type-h3`      | 22→30px / 1.15             | Newsreader · 400                    | panel titles, the Collections list       |
| `type-h4`      | 18→22px / 1.3              | Anek · 500                          | card titles, FAQ questions               |
| `type-lead`    | 20px / 1.5                 | Anek · 400                          | intro paragraphs                         |
| `type-body`    | 17px / 1.6                 | Anek · 400                          | running text, form fields, the facts band |
| `type-small`   | 15px / 1.5                 | Anek · 400                          | captions, card text, breadcrumbs, dates  |
| `type-label`   | 13px / 1.3, uppercase      | Anek · 500 · +0.06em                | eyebrows, table heads                    |
| `type-nav`     | 15px / 1.2                 | Anek · 500                          | header links                             |
| `type-button`  | 15px / 1.2                 | Anek · 500 · +0.01em                | button and call-to-action labels         |

Also: `measure` caps running text at 65 characters. A shadcn component that
sets its own size (the FAQ trigger's `text-sm`) needs the role's size passed
as a class too (`text-[length:var(--type-h4)]`), or its utility wins.

**Hindi.** Each role carries its own `:lang(hi)` settings. Hindi keeps the
English size, takes more line height (body 1.75, lead and small 1.7, headings
1.3–1.45), and never takes letter-spacing, uppercase or italics, which break
conjuncts. `type-label` is 14px in Hindi because it loses the capitals.
Numbers such as GSM and widths stay in Latin digits. Check Hindi wraps
whenever a heading changes.

### Buttons and links

Every link belongs to one of four kinds, and each kind has one look:

| Kind                           | Utility                                      | Example                                     |
| ------------------------------ | -------------------------------------------- | ------------------------------------------- |
| Talk to us (WhatsApp, enquiry) | `btn btn-primary`; `btn btn-inverse` on plum | Enquire on WhatsApp, Request a quotation    |
| A second way to talk           | `btn btn-secondary`                          | Start a wholesale inquiry                   |
| Go to a page or section        | `link-arrow`                                 | View the range →, See the full map →        |
| Small asks and details         | `link`                                       | Ask on WhatsApp under a cloth, phone, email |

Buttons are pills: `btn` is 48px tall, `btn-lg` 56px for the hero and closing
calls to action, `btn-sm` 36px for the promo bar, the header and narrow cards.
At most one filled button per block. WhatsApp never takes an arrow link, and
an arrow link never opens WhatsApp. `link-arrow` sets its label in spaced
capitals from CSS (Hindi drops them), so the page text is unchanged. Labels
are sentence case in the source; never add `uppercase` to a button.

Other utilities: `eyebrow` (a section marker with a short rule after it),
`card` (white, 28px radius, soft shadow), `card-media` (an image inset in a
card) and `segmented` (the language switch and the catalogue's view toggle,
36px; 44px tall on touch screens).

**Touch targets.** On a phone anything tappable is at least 44px tall, even
where it looks smaller: the pills, the header search, the article back link.

**Motion on a phone.** One thing moving at a time. Loops rest off screen, the
floating WhatsApp button pulses three times and stops, and it stays out of
the way while the hero's own WhatsApp button is showing.

**Header.** Links sit beside the logo, each a 36px pill that fills with `sand`
on hover and on the current page, the way shadcn's navigation menu sets them.
The language switch, search and WhatsApp button on the right are all 36px.

### Footer is frozen

The owner wants the footer exactly as it was on 31 October 2026: layout,
colours, copy and type. It keeps its own fonts (Newsreader for the wordmark,
Hanken Grotesk for everything else, and a 25 KB footer-only cut of Noto Sans
Devanagari for its Hindi) through a `footer { font-family }` rule in
`styles.css`. These must not change, because the footer reads them:

- `--font-display`, `--font-body`, `--font-mono`, `--tracking-label`,
  `--tracking-ui`, `--default-transition-duration` and `--radius`
- the colour tokens, `vf-weave`, `vf-wave` and the global `:focus-visible` rule
- Tailwind's default text sizes and breakpoints
- `site-footer.tsx`, `footer-copy.ts` and `DirectionsLink` in `map-embed.tsx`
  (one exception, at the owner's request on 1 November 2026: the illustration
  band above the footer paints no ground of its own and the art multiplies
  onto the page behind it, so its white becomes that page's white or linen
  and no box or seam shows; the `<footer>` itself is unchanged)

New work never uses `font-display`, `font-mono`, `tracking-label` or
`tracking-ui`; they exist only for the footer. Checked by comparing the footer's
computed styles and pixels against the original on English and Hindi pages at
1440px and 390px.

## Interaction

Taken from Woodwrights (22 October 2026) and measured on the live site.

- **Transitions are 0.3s.** Tailwind's default transition duration is set to
  300ms (`--default-transition-duration` in `styles.css`), and the hand-written
  header, button and field transitions match. Scroll reveals and the WhatsApp
  launcher keep their own timings.
- **The header hides while the reader scrolls down and returns on any scroll
  up** (`useHideOnScroll`, home routes only). It stays visible within 96px of
  the top, while the mobile menu is open, and while focus is inside it.
  Woodwrights also makes its navigation transparent over the hero; this site
  does not, because the bar sits on paper.
- **The enquiry pop-up is a quiet corner card**, after Woodwrights' newsletter
  card. Bottom-right (24px from the edge, full width with 16px margins on a
  phone), 477px wide, square corners, `sand` ground, and a soft shadow because
  `sand` on `paper` is only 1.11:1 (Woodwrights uses none). The title is the
  serif at 24px, helper text is 13px at +0.02em, fields are a single 1px `ink`
  underline that thickens to 2px on focus, and there is one outlined
  full-width action that fills `ink` on hover. No backdrop, no scroll lock, no
  focus trap, nothing takes focus on open, and Escape closes it. The floating
  WhatsApp pill steps aside while it is open, since it sits in the same corner.
  It still opens after 35 s or 50% scroll, once per session. Woodwrights opens
  theirs after 13 s; the engagement trigger was set for Lighthouse reasons and
  is kept. Closing it hides it for 7 days and sending an enquiry for 365, as on
  Woodwrights.
  Measured pairs on `sand`: `ink` 15.87:1, `foreground` 10.34:1, `mute`
  5.41:1, `error` 5.87:1 (error text and the invalid underline), `clay` 11.81:1
  (close button hover); `paper` on `ink` is 17.67:1 (action hover). On a phone the card covers about
  56% of the screen, down from 71% for a single column of four fields, because
  name and business sit side by side and the "continue browsing" link is
  dropped there (the close button remains).

## Logo and icons

**There is now a drawn logotype** (added 26 September 2026, owner-supplied
artwork): a cursive "V" doubling as a needle, with "idhi" beside it and
"FABRICS" below in small caps, dark maroon on a transparent ground. It
replaced the set-in-type wordmark ("Vidhi Fabrics" in the site grotesque)
that this section used to describe — that text treatment is gone from every
header, not just restyled.

The owner-supplied original is a wider scene — mills, dyeing, a hand loom,
women in sarees, a riverside palace backdrop — with the logotype sitting
inside it, kept only as the file the two derivatives below were cut from, not
itself referenced by the site. `vidhi-logo-mark.png` is the logotype alone,
cropped tight with a transparent ground, and is the file every header uses.
`footer-heritage-illustration.jpg` is the same scene flattened onto white and
resized to 1600×893, used once, in the footer.

**Where each lives:**

- Both home routes' sticky header, and the journal header shared by every
  `/blog` and `/hi/blog` page — `vidhi-logo-mark.png`, ~44px tall, on `paper`.
- The footer — the full scene, `footer-heritage-illustration.jpg`, full width
  on its own `paper` band immediately above the dark footer panel, not inside
  it. The art was composed against white and has a large transparent area
  above the skyline meant to read as sky, not as a window onto whatever sits
  behind it; placing it directly on the footer's black ground would leave
  that area reading as a hole.

**The logo mark does not go on a dark ground.** Measured again on 22 October
2026 against the footer: the mark's ink is `#7A1A18`, which is 1.57:1 on
`navy` (`#1B1F23`), under the 3:1 a graphical mark needs. On `paper` the same
mark is 10.56:1 and on `sand` 9.49:1. The footer's own internal "Brand" column
keeps the plain ivory text for this reason; it is the one place on the site the
new logotype does not appear, and that is deliberate, not an oversight to fix
later. A version recoloured for dark grounds would need its own pass; nothing
here approximates one.

**The mark is dark maroon, so on the grey palette it is the one warm colour in
the header.** That is left as it is: the artwork is the owner's, and a charcoal
version would need to be supplied or approved.

The favicon is a clay tile with a paper **V**
(`public/favicon.svg`): a `#2B3137` square, the V drawn as a path in
`#FFFFFF` (13.15:1). The PNG and ICO versions were recoloured from the previous
set by re-mixing each pixel between the old and new pair, so their geometry and
the 16px frame are unchanged. It exists because it is the only thing that survived 16px — a
weave pattern went muddy, a needle read as a checkmark, a two-band weave read
as a plus sign, and a light-ground V dissolved into grey. The new logotype
has not been tested at that size, and a script mark with fine strokes is
exactly the shape that has failed 16px testing before on this project — treat
it as unproven for favicon use rather than assuming it would work.

Derived: `favicon.ico` (16/32/48), `apple-touch-icon.png`, `icon-192.png`,
`icon-512.png`. `og-image.jpg` is the swatch-book photograph at 1200×630 —
also unchanged; whether it should become the new illustration is a separate,
not-yet-made decision.

## Photography

Licensed Envato stock, used as **evidence of the trade** rather than decoration.
Current set and where each earns its place:

| Asset                | Use                                                          |
| -------------------- | ------------------------------------------------------------ |
| `swatch-book.jpg`    | Scale section, beside the certification copy                 |
| `swatch-stack.jpg`   | the Surat sourcing guide                                     |
| `swatch-on-card.jpg` | the sample-to-bulk checklist                                 |
| `weave-ground.jpg`   | Scale section background texture, greyscale at 10%           |
| `woven-detail.jpg`   | the sarees-prices guide, where thread detail is the argument |
| `reseller-circle-portrait.webp` | Reseller Circle strip, beside the join link |
| `about-weaving-loom.webp`       | About section, the only image, full frame at 1000px and 640px |

**Photographs must be warm, and must agree with each other.** The tokens are
near-neutral: white and greys with a faint cool cast (CIELAB hue 236° to 258°,
chroma 0 to 5.9, measured 22 October 2026). They have no warm hue to match, so
nothing in the interface pulls against a photograph. The rule stands for the
opposite reason. The images are the only colour on the page, so they are read
as a set rather than one at a time, and one cool photograph among warm ones is
more conspicuous on a neutral ground than it would be on a warm one, because
there is no surrounding hue to absorb it. (This section described the earlier
neutral palette and was not updated when blush and rust replaced it on
21 October.) Measured, median hue and warm share across the coloured pixels of
each:

| Asset                   | Median hue | Warm pixels |
| ----------------------- | ---------- | ----------- |
| `fabric-katan-jacquard` | 6.5°       | 100%        |
| `swatch-stack`          | 32.1°      | 98%         |
| `swatch-on-card`        | 35.7°      | 99%         |
| `fabric-cotton-linen`   | 37.5°      | 100%        |
| `swatch-book`           | 42.9°      | 90%         |
| `woven-detail`          | **63.0°**  | **48%**     |
| `reseller-circle-portrait` (source photo) | 40.9° | 85% |
| `about-weaving-loom` (source image)       | 31.1° | 87% |

(Measured over pixels with saturation ≥ 0.15; warm = hue ≤ 60° or ≥ 330°.)

**Provenance of the two newest images (22 October 2026).**
`reseller-circle-portrait` is a stock photograph from the owner's downloads
(an Envato-style filename); no licence record is kept in this repo.
`about-weaving-loom` was supplied by the owner and has the marks of an
AI-generated image: a UUID filename, and a patchwork quilt emerging from a warp,
which no loom produces. Treat it as an illustration. It is not evidence of the
trade, and nothing may caption it as Vidhi Fabrics' own loom. Replace it with a
real photograph when one exists. Neither original is committed: only the sized
WebP derivatives are, because originals in history cannot be removed
(`AGENTS.md` forbids the rewrite).

`woven-detail` is the outlier — teal and mustard threads — which is why it read
as cheap jute in colour and had to be desaturated to serve as a background.
Profile a candidate photo before placing it. A cool image will fight everything
around it, and no amount of layout will fix that.

**No photographs in the catalogue grid.** Those cards carry specifications, and
a stock photo that doesn't match the stated composition is worse than no image.

**Always ship a sized derivative.** Card thumbnails render around 342×257; a
1600px original there is pure waste. There is currently a live example of
exactly this mistake — see `CLAUDE.md`.

## Section markers

Sections carry a mono label of the form `(a) / Catalogue` — a letter in
parentheses, a slash, the section name. Hindi uses Devanagari letters:
`(अ)`, `(ब)`, `(स)`.

**The lettering is currently wrong.** Testimonials and Wholesale both carry
`(c)`; there is no `(d)`. Worth fixing when that copy is next touched, in both
routes and all three languages.

## Language

Three languages, all first-class: English, Hindi, and Hinglish — Romanised
Hindi, not English with Hindi words. Every string exists in all three.

Hinglish is the register a Surat trader actually uses on WhatsApp. "Pehle har
requirement ke liye right fabric dhoondhna mushkil hota tha" is right;
translating it into full English defeats the point of the option existing.

**Caveat, and it matters for brand quality:** every Hindi and Hinglish string on
the site was written by Claude. No native speaker has reviewed any of it. A
native review is the single highest-value brand task outstanding.

## Not yet decided

- **No real customer proof.** The four testimonials carry placeholder star
  ratings, live right now. Until there are real ratings or real named buyers,
  the site's social proof is decorative. This is a brand problem before it is a
  code problem.
- **No founding year**, only "since the 1960s." If an exact year exists it would
  strengthen the structured data.
- **Privacy policy** is the English page at `/privacy-policy`, from the
  practices supplied on 21 October 2026. Terms are still unwritten.
- **No video.** The "export champions" testimonial rail idea is specced in
  `CLAUDE.md`, blocked on filmed buyers with written consent.
