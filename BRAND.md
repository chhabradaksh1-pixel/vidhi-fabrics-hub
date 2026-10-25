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
| Advance or cash payment | 5% off as a thank you. Not cheaper than the market. Order details on WhatsApp. Only in the FAQ and the polyester saree buying guide, never as a homepage line, a headline, or a banner. No other price. |

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

Tokens live in `src/styles.css`. **The palette is white and black slate**,
chosen by the owner on 22 October 2026 from options shown on localhost. It
replaces blush and rust, which was set the day before. The page is white and a
cool light grey; type, buttons and the footer are a black slate. Token names
are historical (`clay`, `navy`, `gold` are no longer those hues). Renaming
them would touch every component that references them.

This is the first time the live components have rendered without a warm
colour. Before 21 October the tokens were a greyscale ramp, but components
hardcoded a maroon accent (`#7A1A18`) and cream surfaces (`#F6F1EA`), so
that site was never grey and white. The blush switch moved those hardcoded
values onto tokens, which is what made this change a token swap.

Body copy uses `--foreground` (`#343A40`), a dark slate grey. Headings use
`ink`. Buttons, links, the suit ticker and the header call to action use
`clay`, now black slate. WhatsApp green (`#25D366`) is only the glyph on the
WhatsApp icon. It is 1.98:1 on `paper` and 1.78:1 on `sand`, so the icon disc
is `ink` (`#25D366` on `ink` is 8.91:1) and the pill around it is `clay`
(6.63:1). On the footer it is 8.36:1 on `navy`.

**`error` is the one hue.** `#B3261E` marks form errors and the invalid state
of a field (`text-error`, `.vf-lead-field[aria-invalid]`). With a grey accent
an error would otherwise be the same dark grey as body text. It is 6.54:1 on
`paper` and 5.87:1 on `sand`.

| Token        | Hex       | Role                                                       |
| ------------ | --------- | ---------------------------------------------------------- |
| `paper`      | `#FFFFFF` | page ground                                                |
| `foreground` | `#343A40` | body text                                                  |
| `ink`        | `#15191D` | headings                                                   |
| `mute`       | `#5B646C` | secondary text                                             |
| `clay`       | `#2B3137` | black slate accent: buttons, links, ticker. **Light grounds only** |
| `claydeep`   | `#14181C` | accent hover and pressed                                   |
| `claylight`  | `#E4E8EB` | the light step for **dark** grounds                        |
| `sand`       | `#F1F3F4` | secondary panels                                           |
| `line`       | `#DEE2E5` | hairlines and dividers                                     |
| `error`      | `#B3261E` | form errors and invalid fields                             |
| `navy`       | `#1B1F23` | footer ground                                              |
| `gold`       | `#B4BDC4` | footer accent                                              |
| `ivory`      | `#F4F6F7` | footer text                                                |

**`clay` fails WCAG AA on the footer** (1.26:1 on `navy`), so dark grounds
use `claylight`, `ivory` or `gold`. Measured 22 October 2026:

| Pair                     | Ratio   | Body 4.5:1 | Large 3:1 |
| ------------------------ | ------- | ---------- | --------- |
| `ink` on `paper`         | 17.67:1 | yes        | yes       |
| `ink` on `sand`          | 15.87:1 | yes        | yes       |
| `foreground` on `paper`  | 11.51:1 | yes        | yes       |
| `foreground` on `sand`   | 10.34:1 | yes        | yes       |
| `mute` on `paper`        | 6.03:1  | yes        | yes       |
| `mute` on `sand`         | 5.41:1  | yes        | yes       |
| `clay` on `paper`        | 13.15:1 | yes        | yes       |
| `clay` on `sand`         | 11.81:1 | yes        | yes       |
| `claydeep` on `paper`    | 17.84:1 | yes        | yes       |
| `paper` on `clay`        | 13.15:1 | yes        | yes       |
| `paper` on `claydeep`    | 17.84:1 | yes        | yes       |
| `error` on `paper`       | 6.54:1  | yes        | yes       |
| `error` on `sand`        | 5.87:1  | yes        | yes       |
| `clay` on `navy`         | 1.26:1  | **no**     | **no**    |
| `claylight` on `navy`    | 13.45:1 | yes        | yes       |
| `ivory` on `navy`        | 15.29:1 | yes        | yes       |
| `gold` on `navy`         | 8.70:1  | yes        | yes       |

`mute` on `sand` is 5.41:1, the tightest text pair on the site. Do not
lighten it.

**The footer is textured**, so its text is measured on the worst pixel, not the
flat ground. The weave in `styles.css` is two 1px line grids (5% and 3.5%
`ivory`) and a radial highlight at the top. At the bottom, where the copyright
line (`ivory` at 55%) sits and only the grids reach, the worst pixel gives
4.81:1 (5.51:1 on the flat ground). At the top, with all three layers stacked,
which no single pixel reaches, `ivory` at 70%, 75% and 80% give 5.00, 5.48 and
6.00:1 and `gold` gives 4.69:1. `ivory` at 55% would fail there (3.78:1), so
keep that opacity to the bottom line.

**A link carries an underline, because colour no longer marks one.** The accent
is 1.14:1 against body text and 2.18:1 against `mute`. Links in running text
are underlined in `clay` at 70% (`decoration-clay/70`): 5.06:1 on `paper`,
4.84:1 on `sand`. The `decoration-line` and `decoration-clay/30` underlines
they replaced were 1.30:1 and 1.81:1, which on a grey page is close to none.
`vf-link-maroon` carries the same underline in CSS.

**Audited in the browser on 22 October 2026.** Every visible text node on ten
pages at desktop width, in both languages (`/`, `/hi`, `/about`, the polyester
landing page in English and Hindi, a blog article, `/blog`, `/hi/blog`,
`/reseller-circle` and `/privacy-policy`), on `/` and `/hi` again on a phone
with the menu open, and in the open pop-up and its error state, was checked
against its composited background: no failures, tightest pair 5.41:1.

Over a texture or photograph, check the **brightest pixel**, not the average.
A mean that passes hides a worst case that doesn't.

## Type

Headings are a sturdy serif. Body and labels are one grotesque. The pairing and
the spacing follow Woodwrights (22 October 2026), measured from the rendered
site. Their headings and paragraphs are **Plantin Infant MT Std** (Monotype,
paid) at one regular weight, and their navigation, labels, links, buttons and
inputs are **Monument Grotesk** (Dinamo, paid). Neither file can be copied onto
this site. This replaced the Fraunces and Hanken Grotesk pairing of 21 October,
which followed Flooring Xtra's Canela and Banana Grotesk.

| Role    | Family we ship                            | Free match for        | Weight |
| ------- | ----------------------------------------- | --------------------- | ------ |
| Display | Newsreader, then Noto Serif Devanagari    | Plantin Infant MT Std | 400    |
| Body    | Hanken Grotesk, then Noto Sans Devanagari | Monument Grotesk      | 400    |
| Label   | Hanken Grotesk, then Noto Sans Devanagari | Monument Grotesk      | 400    |

Newsreader and Hanken Grotesk are SIL Open Font License 1.1, self-hosted, latin
only, `font-display: swap`. Newsreader is one static regular file (22 KB),
declared across weights 300 to 500, so every `font-light` heading renders that
same regular and nothing is ever faux-bolded. There is no bold or light serif,
as on Woodwrights. Dropping the 67 KB Fraunces file made the page 45 KB
lighter. Newsreader was chosen as a free serif close to Plantin in build:
sturdy, moderate contrast, and a large x-height that holds up at text sizes.
That is a judgement by eye, not a measurement.

### Size and spacing

Measured on Woodwrights, then applied here as tokens in `styles.css`:

| Role                                    | Woodwrights                | Here                                         |
| --------------------------------------- | -------------------------- | -------------------------------------------- |
| Headings (serif)                        | 22–28px, line-height 1.2   | existing sizes, `tracking-normal`            |
| Navigation, labels, lists (uppercase)   | 12px, 1.5, +0.04em         | 12px, `tracking-label` (+0.04em)             |
| Links, buttons, helper text (sentence)  | 13px, 1.35, +0.02em        | `tracking-ui` (+0.02em), used in the pop-up  |
| Form inputs                             | 16px                       | 16px                                         |
| Paragraphs                              | serif, 16px, 1.35          | **not taken**: body stays on the grotesque   |

Labels used to sit at 10–11px with eight different arbitrary letter-spacings
from +0.08em to +0.2em, which reads as a spec sheet. They are now 12px at
+0.04em through one token, and headings use normal tracking instead of
`tracking-tight`. Two things were deliberately not copied: Woodwrights' largest
heading (28px), because the hero and section headlines here stay larger, and
serif body paragraphs.

Hindi in a heading uses **Noto Serif Devanagari** so it belongs with
Newsreader. Hindi in body copy uses **Noto Sans Devanagari** so it belongs with
Hanken Grotesk. Both are loaded only on `/hi`. The English homepage's one Hindi
line uses a small serif subset of that sentence instead. Check Hindi rendering
when touching type: Devanagari needs more line height than Latin at the same
size, headline wraps differ, and wide letter-spacing breaks conjuncts, which is
one more reason the label tracking came down.

`--font-mono` is still a misnomer: it marks the uppercase labels and resolves
to Hanken Grotesk, not a monospace.

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
