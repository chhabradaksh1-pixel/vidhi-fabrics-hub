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

The main categories are **polyester sarees and dress material**. The wider range spans cotton, silk, synthetic, blended, jacquard, printed, dyed and
woven varieties: some lines manufactured in-house, the rest supplied from
Surat's wider textile market.

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

**Sentence case for headings.** The letterspaced labels are the only
uppercase, and they are labels, not sentences.

**The reader is a peer.** Not "we are delighted to offer" and not "grab yours
now." A trader talking to a trader about cloth.

## Colour

Tokens live in `src/styles.css`. **The palette is monochrome.** Every token is
a true neutral — chroma 0 in oklch — so the fabric photography is the only
colour anywhere on the page.

That is the whole argument for it. The product is cloth, and the swatches are
vivid: coral, sage, teal, cream. The previous warm palette put clay and sand
next to them and the two competed, which is why the catalogue images were
being held back at `saturate(0.94)` to stop them shouting. With a neutral UI
there is nothing to compete with, so the images now run at full saturation and
the cloth carries the hue on its own.

The reference is the Inditex corporate site — pure white ground, near-black
text, greys in between — rather than a tinted grey system like Medusa's zinc,
whose cool cast fights the warm swatch photography.

| Token       | Hex       | Role                                           |
| ----------- | --------- | ---------------------------------------------- |
| `paper`     | `#FFFFFF` | page ground                                    |
| `ink`       | `#121212` | body text; dark section grounds                |
| `mute`      | `#6B6B6B` | secondary text                                 |
| `clay`      | `#1A1A1A` | accent, labels, links — **light grounds only** |
| `claydeep`  | `#000000` | deeper accent, hover and pressed               |
| `claylight` | `#D4D4D4` | the clay step for **dark** grounds             |
| `sand`      | `#F5F5F5` | alternate section ground                       |
| `line`      | `#E5E5E5` | hairlines and dividers                         |
| `navy`      | `#000000` | footer ground                                  |
| `gold`      | `#9E9E9E` | footer accent, the single wave line            |
| `ivory`     | `#F5F5F5` | footer text                                    |

`navy` and `gold` keep their names but are no longer a hue — they are the
darkest and a mid step of the same single ramp, so the foot of the page reads
as weight rather than as a second colour scheme. Renaming them would touch
every component that references them; the names are historical, the values are
not.

**The one rule that matters, and it survived the change.** `clay` still fails
WCAG AA on dark grounds — worse than before, because both ends moved toward
each other. Measured:

| Pair                  | Ratio   | Body 4.5:1 | Large 3:1 |
| --------------------- | ------- | ---------- | --------- |
| `ink` on `paper`      | 18.73:1 | yes        | yes       |
| `ink` on `sand`       | 17.18:1 | yes        | yes       |
| `mute` on `paper`     | 5.33:1  | yes        | yes       |
| `mute` on `sand`      | 4.89:1  | yes        | yes       |
| `clay` on `paper`     | 17.40:1 | yes        | yes       |
| `clay` on `sand`      | 15.96:1 | yes        | yes       |
| `claydeep` on `paper` | 21.00:1 | yes        | yes       |
| `paper` on `ink`      | 18.73:1 | yes        | yes       |
| `clay` on `ink`       | 1.08:1  | **no**     | **no**    |
| `claylight` on `ink`  | 12.64:1 | yes        | yes       |
| `ivory` on `navy`     | 19.26:1 | yes        | yes       |
| `gold` on `navy`      | 7.84:1  | yes        | yes       |
| `claylight` on `navy` | 14.17:1 | yes        | yes       |

So the rule is unchanged: `clay` on paper and sand, `claylight` on ink and
navy. It previously shipped as a live accessibility bug in the Scale section,
where the stat figures and the section label were `clay` on `ink` at 2.29:1.
In the monochrome palette that same mistake would render at 1.08:1 — text
effectively invisible rather than merely hard to read, so the rule matters more
now, not less.

`mute` is the tightest pair in the set at 4.89:1 on `sand`. It was chosen by
searching down the neutral ramp for the lightest grey clearing 4.5:1 on _both_
grounds; a step lighter fails on `sand`. Do not lighten it.

Over a texture or photograph, check the **brightest pixel**, not the average.
A mean that passes hides a worst case that doesn't.

## Type

**One grotesque, four weights, no serif and no mono.** This is the Inditex
model: a single family carries display, body and labels, and the difference
between them is weight, size and letter-spacing rather than typeface.

| Role    | Stack                                              | Weight  |
| ------- | -------------------------------------------------- | ------- |
| Display | Inter, Noto Sans Devanagari, system-ui, sans-serif | 200–300 |
| Body    | Inter, Noto Sans Devanagari, system-ui, sans-serif | 400     |
| Label   | Inter, Noto Sans Devanagari, system-ui, sans-serif | 400     |

The hero runs at 200, every other heading at 300, body at 400. Labels, section
markers and stat captions stay uppercase and letterspaced (`0.12em`–`0.2em`) —
that treatment is what still distinguishes them now that they are no longer
monospaced.

The three tokens in `styles.css` are kept — `--font-display`, `--font-body`,
`--font-mono` — but all three resolve to the same family, so no component had
to change. **`--font-mono` is now a misnomer**: it marks the letterspaced
labels and is not monospaced. Renaming it would touch every component that
reads it; the name is historical, the value is not. One consequence worth
knowing: the stat figures are no longer tabular, so columns of numbers will not
align on the decimal the way they did.

Previously Playfair Display carried headings and the wordmark and JetBrains
Mono carried labels. Four families are now two, which is less to load, not
more, despite adding two weights.

The Devanagari fallback sits in every stack because the Hindi route uses the
same styles. **Noto Sans Devanagari is loaded at the same four weights**, so
Hindi gets genuine light cuts instead of a synthesised one — this was verified
against the Google Fonts API before the light display weights were committed
to, because a missing light cut would have left the Hindi headings faking a
weight the font does not have. Check Hindi rendering when touching type:
Devanagari needs more line height than Latin at the same size, headline wraps
differ, and light weights thin its conjuncts faster than they thin Latin.

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

**The logo mark does not go on a dark ground.** Measured before deciding:
the mark's ink is `#7A1A18`, which is 1.99:1 against the footer's black —
under the 3:1 a graphical mark needs, the same class of failure as `clay` at
1.08:1 on `ink`. The footer's own internal "Brand" column keeps the plain
ivory text for this reason; it is the one place on the site the new logotype
does not appear, and that is deliberate, not an oversight to fix later. A
version recoloured for dark grounds would need its own pass; nothing here
approximates one.

The favicon is unchanged and still a clay tile with a paper **V**
(`public/favicon.svg`): a `#8A412E` square, the V drawn as a path in
`#FBFBF8`. It exists because it is the only thing that survived 16px — a
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
