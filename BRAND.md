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

Vidhi Fabrics supplies **retailers, brands, manufacturers and traders** —
people who already know fabric. They are comparing suppliers, not learning what
jacquard is. Copy can use trade vocabulary without glossing it, and should
never explain the obvious.

The range spans cotton, silk, synthetic, blended, jacquard, printed, dyed and
woven varieties, sourced from mills and sourcing partners.

## Positioning

> One textile supplier. Access to Surat's entire manufacturing ecosystem.

A **supplier** — never a broker, marketplace, agent, aggregator or directory.
The distinction is the whole proposition: the buyer deals with one business that
answers for the order, and that business has the reach of the city behind it.
Nothing should imply enquiries get passed along to someone else.

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

**Confirmed and usable**, as supplied by the owner:

| Claim              | Form to use               |
| ------------------ | ------------------------- |
| Years in the trade | since the 1960s           |
| Active SKUs        | 2,400+                    |
| Export markets     | 10+                       |
| Monthly capacity   | 12k m²                    |
| Enquiry response   | typically within 12 hours |

One framing was explicitly rejected: **do not present the response time as
replying to "wholesale enquiries."** It reads as though only large buyers are
welcome. A boutique owner sourcing a small run is a real customer and the copy
must not signal otherwise.

The OEKO-TEX and GOTS claim in `certBody` is accurate per the owner, but no
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

**Sentence case for headings.** Mono labels are the only uppercase, and they
are labels, not sentences.

**The reader is a peer.** Not "we are delighted to offer" and not "grab yours
now." A trader talking to a trader about cloth.

## Colour

Tokens live in `src/styles.css`. Warm neutrals for the site, navy and gold for
the footer only.

| Token       | Hex       | Role                                           |
| ----------- | --------- | ---------------------------------------------- |
| `paper`     | `#FBFBF8` | page ground                                    |
| `ink`       | `#221D18` | body text; dark section grounds                |
| `mute`      | `#70675E` | secondary text                                 |
| `clay`      | `#8A412E` | accent, labels, links — **light grounds only** |
| `claydeep`  | `#672B1C` | deeper accent for light grounds                |
| `claylight` | `#C98A6B` | the clay step for **dark** grounds             |
| `sand`      | `#F1EEE5` | alternate section ground                       |
| `line`      | `#DBD7CF` | hairlines and dividers                         |
| `navy`      | `#101A2C` | footer ground                                  |
| `gold`      | `#C6A15B` | footer accent, the single wave line            |
| `ivory`     | `#F7F1E8` | footer text                                    |

**The one rule that matters.** `clay` fails WCAG AA on dark grounds. Measured:

| Pair                  | Ratio   | Body 4.5:1 | Large 3:1 |
| --------------------- | ------- | ---------- | --------- |
| `ink` on `paper`      | 16.12:1 | yes        | yes       |
| `clay` on `paper`     | 7.04:1  | yes        | yes       |
| `claydeep` on `paper` | 10.45:1 | yes        | yes       |
| `clay` on `sand`      | 6.29:1  | yes        | yes       |
| `paper` on `ink`      | 16.12:1 | yes        | yes       |
| `clay` on `ink`       | 2.29:1  | **no**     | **no**    |
| `claylight` on `ink`  | 5.83:1  | yes        | yes       |
| `ivory` on `navy`     | 15.51:1 | yes        | yes       |
| `gold` on `navy`      | 7.17:1  | yes        | yes       |
| `claylight` on `navy` | 6.08:1  | yes        | yes       |

So: `clay` on paper and sand, `claylight` on ink and navy. This already shipped
as a live accessibility bug in the Scale section — the stat figures and the
section label were both `clay` on `ink` at 2.29:1.

Over a texture or photograph, check the **brightest pixel**, not the average.
A mean that passes hides a worst case that doesn't.

## Type

| Role    | Stack                                                  |
| ------- | ------------------------------------------------------ |
| Display | Playfair Display, Noto Sans Devanagari, Georgia, serif |
| Body    | Inter, Noto Sans Devanagari, system-ui, sans-serif     |
| Mono    | JetBrains Mono, SF Mono, Consolas, monospace           |

Playfair carries headings and the wordmark; Inter carries everything readable
at length; JetBrains Mono carries labels, section markers, stat captions and
the established line — always uppercase, always letterspaced (`0.12em`–`0.2em`).

The Devanagari fallback sits in every stack because the Hindi route uses the
same styles. Check Hindi rendering when touching type — Devanagari needs more
line height than Latin at the same size, and headline wraps differ.

## Logo and icons

There is no drawn logotype. The brand mark is **"Vidhi Fabrics" set in Playfair
Display semibold**, tight tracking, beside a mono established line in `mute`
that hides below the `sm` breakpoint. The string is stored sentence case
("Surat · Since the 1960s") and rendered uppercase by the label style.

The icon is a clay tile with a paper **V** (`public/favicon.svg`): a `#8A412E`
square, the V drawn as a path in `#FBFBF8`. It exists because it is the only
thing that survived 16px — a weave pattern went muddy, a needle read as a
checkmark, a two-band weave read as a plus sign, and a light-ground V dissolved
into grey. If you redesign it, test at 16px first, not at 512.

Derived: `favicon.ico` (16/32/48), `apple-touch-icon.png`, `icon-192.png`,
`icon-512.png`. `og-image.jpg` is the swatch-book photograph at 1200×630.

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

**The palette is warm, and photographs must be too.** Token hues: `clay` 12°,
`ink` 30°, `gold` 39°, `sand` 45°. Every photograph in the set matches that
band except one — median hue and warm share across the coloured pixels of each:

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
