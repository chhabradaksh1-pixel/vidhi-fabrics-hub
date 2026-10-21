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

Tokens live in `src/styles.css`. **The palette is warm blush and rust brown**,
set by the owner on 21 October 2026. It replaces the monochrome ramp. Token
names are historical (`clay`, `navy`, `gold` are no longer those hues).
Renaming them would touch every component that references them.

Body copy uses `--foreground` (`#4A3B35`), a dark warm grey. Headings use
`ink`. Buttons, links, the suit ticker and the header call to action use
`clay`. WhatsApp green (`#25D366`) is only the glyph on the WhatsApp icon.
It is 1.73:1 on `paper` and 3.12:1 on `clay`, so the icon disc is `ink`
(`#25D366` on `ink` is 7.41:1) and the button around it stays rust.

| Token        | Hex       | Role                                                |
| ------------ | --------- | --------------------------------------------------- |
| `paper`      | `#F8EDE8` | page ground, blush / off white                      |
| `foreground` | `#4A3B35` | body text                                           |
| `ink`        | `#3B2219` | headings                                            |
| `mute`       | `#5C4A42` | secondary text                                      |
| `clay`       | `#9A4A2B` | rust accent — **light grounds only**               |
| `claydeep`   | `#7A3A22` | rust hover and pressed                              |
| `claylight`  | `#F1DDD4` | the light step for **dark** grounds                 |
| `sand`       | `#F1DDD4` | secondary panels                                    |
| `line`       | `#E5CFC5` | hairlines and dividers                              |
| `navy`       | `#3B2219` | footer ground                                       |
| `gold`       | `#F1DDD4` | footer accent                                       |
| `ivory`      | `#F8EDE8` | footer text                                         |

**`clay` still fails WCAG AA on the deep-brown footer.** Measured 21 October 2026:

| Pair                  | Ratio   | Body 4.5:1 | Large 3:1 |
| --------------------- | ------- | ---------- | --------- |
| `ink` on `paper`      | 12.79:1 | yes        | yes       |
| `ink` on `sand`       | 11.22:1 | yes        | yes       |
| `foreground` on `paper` | 9.28:1 | yes      | yes       |
| `foreground` on `sand`  | 8.15:1 | yes      | yes       |
| `mute` on `paper`     | 7.27:1  | yes        | yes       |
| `mute` on `sand`      | 6.38:1  | yes        | yes       |
| `clay` on `paper`     | 5.39:1  | yes        | yes       |
| `clay` on `sand`      | 4.73:1  | yes        | yes       |
| `claydeep` on `paper` | 7.44:1  | yes        | yes       |
| `paper` on `clay`     | 5.39:1  | yes        | yes       |
| `paper` on `claydeep` | 7.44:1  | yes        | yes       |
| `clay` on `ink`       | 2.37:1  | **no**     | **no**    |
| `claylight` on `ink`  | 11.22:1 | yes        | yes       |
| `ivory` on `navy`     | 12.79:1 | yes        | yes       |
| `gold` on `navy`      | 11.22:1 | yes        | yes       |
| `ivory` at 55% on `navy` | 4.93:1 | yes     | yes       |

`clay` on paper and sand. `claylight` (or `ivory` / `gold`) on ink and navy.
Rust text on the footer is the same class of bug as the old clay-on-ink pair.

`mute` on `sand` is 6.38:1. Do not lighten it. `clay` on `sand` is 4.73:1,
which clears body text and has little room to spare.

Over a texture or photograph, check the **brightest pixel**, not the average.
A mean that passes hides a worst case that doesn't.

## Type

Headings are a soft serif. Body and labels are one grotesque. The pairing
follows Flooring Xtra's split (21 October 2026): their headings are **Canela**
(Commercial Type, paid) at a thin weight, and their body, navigation and
buttons are **Banana Grotesk** (MNKY Type, paid, served as "MNKY Banana
Grotesk") at medium. Neither file can be copied onto this site.

| Role    | Family we ship                         | Free match for      | Weight |
| ------- | -------------------------------------- | ------------------- | ------ |
| Display | Fraunces, then Noto Serif Devanagari   | Canela              | 300–400 |
| Body    | Hanken Grotesk, then Noto Sans Devanagari | Banana Grotesk   | 400    |
| Label   | Hanken Grotesk, then Noto Sans Devanagari | Banana Grotesk   | 400    |

Fraunces and Hanken Grotesk are SIL Open Font License 1.1, self-hosted, latin
only, `font-display: swap`. Fraunces is the closest open serif to Canela.
Hanken Grotesk is the closest open grotesque to Banana Grotesk. Canela's
hairline weight (100) is not used: it thins Devanagari conjuncts, and small
headings would fail as text. Showroom titles sit at 400. Other headings stay
at the existing light weight (300).

Labels, section markers and stat captions stay uppercase and letterspaced
(`0.12em`–`0.2em`). **`--font-mono` is still a misnomer**: it marks those
labels and now resolves to Hanken Grotesk, not a monospace.

Hindi in a heading uses **Noto Serif Devanagari** so it belongs with Fraunces.
Hindi in body copy uses **Noto Sans Devanagari** so it belongs with Hanken
Grotesk. Both are loaded only on `/hi`. The English homepage's one Hindi line
uses a small serif subset of that sentence instead. Check Hindi rendering when
touching type: Devanagari needs more line height than Latin at the same size,
and headline wraps differ.

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

**The logo mark does not go on a dark ground.** Measured again on 21 October
2026 against the deep-brown footer: the mark's ink is `#7A1A18`, which is
1.39:1 on `navy` (`#3B2219`) — under the 3:1 a graphical mark needs, the same
class of failure as `clay` at 2.37:1 on `ink`. On `paper` the same mark is
9.19:1. The footer's own internal "Brand" column keeps the plain ivory text
for this reason; it is the one place on the site the new logotype does not
appear, and that is deliberate, not an oversight to fix later. A version
recoloured for dark grounds would need its own pass; nothing here approximates
one.

The favicon is still a clay tile with a paper **V**
(`public/favicon.svg`): a `#9A4A2B` square, the V drawn as a path in
`#F8EDE8` (5.39:1). It exists because it is the only thing that survived 16px — a
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

**Photographs must be warm, and must agree with each other.** This rule used
to be about matching the UI: the tokens were warm (`clay` 12°, `ink` 30°,
`gold` 39°, `sand` 45°) and a cool photo fought them. The tokens are now
neutral and have no hue to match, so nothing in the interface pulls against a
photograph any more.

The rule stands anyway, for a different reason. The images are the only colour
left on the page, so they are now read as a set rather than one at a time. One
cool photograph among warm ones is more conspicuous on a neutral ground than it
ever was on a warm one — there is no surrounding hue to absorb it. Measured,
median hue and warm share across the coloured pixels of each:

| Asset                   | Median hue | Warm pixels |
| ----------------------- | ---------- | ----------- |
| `fabric-katan-jacquard` | 6.5°       | 100%        |
| `swatch-stack`          | 32.1°      | 98%         |
| `swatch-on-card`        | 35.7°      | 99%         |
| `fabric-cotton-linen`   | 37.5°      | 100%        |
| `swatch-book`           | 42.9°      | 90%         |
| `woven-detail`          | **63.0°**  | **48%**     |

(Measured over pixels with saturation ≥ 0.15; warm = hue ≤ 60° or ≥ 330°.)

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
- **No privacy or terms pages** — they need the business's actual data
  practices.
- **No video.** The "export champions" testimonial rail idea is specced in
  `CLAUDE.md`, blocked on filmed buyers with written consent.
