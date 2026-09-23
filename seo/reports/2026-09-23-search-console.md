# Search Console — first look, 23 September 2026

Owner supplied a Performance export (filter: Web, Last 3 months). This is the
first measured data the strategy has had. It corrects several things I asserted
from SERP inspection, and one thing it corrects is the shape of the whole
problem.

## The headline: this site is two weeks old in Search

The filter says three months. `Chart.csv` contains **twelve rows**, 9 to 20
September 2026.

Google has only been showing this site for about a fortnight. Everything below
follows from that, and it reframes the brief: this is not an underperforming
site that needs optimising, it is a **new site in its discovery phase**. The
right posture is indexing hygiene and patience, not a campaign of tweaks.

Totals for the period: **22 clicks, 130 impressions, 16.9% CTR, average
position 9.4.** Those are small absolute numbers and entirely unremarkable for
two weeks.

## What I got wrong

Recorded plainly, because both errors would have wasted the owner's effort.

**1. "Fix the five truncated titles" was my top priority. It should not have
been.** Those article pages have between 1 and 6 impressions each. Click-through
optimisation on ~0 impressions buys nothing — you cannot improve the rate at
which people click a result nobody is being shown. The fix is still correct,
but it is a tidy-up, not a lever. It drops down the list.

**2. I briefly read the export as a duplicate-URL problem and it is not.**
`Pages.csv` lists three homepage variants — `http://www`, `https://www` and
`http://` without www — which looks like classic signal fragmentation. I
checked before writing it up:

| URL | Response |
| --- | -------- |
| `http://vidhifabrics.com/` | 308 → `https://vidhifabrics.com/` |
| `http://www.vidhifabrics.com/` | 308 → `https://www.vidhifabrics.com/` |
| `https://vidhifabrics.com/` | 308 → `https://www.vidhifabrics.com/` |
| `https://www.vidhifabrics.com/` | 200 |

Permanent redirects, two hops maximum, and every variant declares
`https://www.vidhifabrics.com/` as its canonical. The redirect setup is
correct. The `http://` rows are Google still consolidating history, and they
will fold in on their own. **No action needed** — and had I not checked, I
would have sent the owner after a non-existent bug.

## What the data actually shows

### Hindi outranks English on identical content, by a wide margin

The strongest finding in the export.

| Page | Position |
| ---- | -------- |
| `/hi/blog/source-fabric-from-surat` | **8.5** |
| `/blog/source-fabric-from-surat` | **67** |

Same article, same length, same structure — and the Hindi version sits nearly
sixty positions higher. The English version is the longest and best piece on
the site (1,784 words) and it is the worst-ranking page in the export.

One page pair is not proof, but it points the same way as the reasoning: Hindi
fabric-sourcing queries face a fraction of the competition, and this site can
place in them without authority it does not have. `/hi/blog/why-similar-sarees`
at 28 against the English at 41.5 leans the same way.

This promotes Hindi from "largest untapped opportunity, someday" to **the
clearest measured advantage the site has** — and it remains blocked on a native
speaker reviewing the existing copy, which no longer looks like a nicety.

### One page is genuinely close to page one

| Page | Impressions | Position |
| ---- | ----------- | -------- |
| `/blog/sample-to-bulk-order-checklist` | 6 | **10.5** |

The only non-homepage URL within reach of page one. It is also one of the
shortest articles at 799 words. If any single piece of content work is worth
doing, it is deepening this one — it is already almost there, and the
difference between position 10 and position 8 is the difference between no
traffic and some.

### The traffic is branded, and some of it is other companies'

Of the 37 impressions in named queries, roughly 23 are brand searches:
`vidhi fabrics`, `vidhifabrics.com`, `vidhi material`. Two more —
`vidhi silk mills surat` and `vidhi textile industries` — are *other
businesses*, and this site is surfacing against their names.

The remaining ~93 impressions sit in queries Google withholds as too
low-volume to report, which is itself a signal of how early this is.

Non-branded commercial queries confirm the SERP inspection exactly:

| Query | Position |
| ----- | -------- |
| `dress material surat` | 14 |
| `dress material in surat` | 18 |
| `fabric wholesale in surat` | 21 |
| `fabric manufacturers in surat` | 44 |
| `surat fabrics` | 38 |

Present but nowhere near competitive, against the directories and marketplaces
identified earlier. Nothing here argues for chasing them.

### Mobile is the real audience, and it ranks better

| Device | Impressions | Position |
| ------ | ----------- | -------- |
| Mobile | 80 | **7.86** |
| Desktop | 50 | 16.48 |

Mobile carries more volume *and* a substantially better average position. This
is a direct argument for checking the hero's weight-200 type on a real
mid-range Android handset — the audience is demonstrably on phones, and that is
the one design decision this session took that I could never see rendered.

India accounts for 109 of 130 impressions at position 9.4. The 17 US
impressions at position 24 are noise.

### No rich results at all

`Search appearance.csv` is **empty**. Despite valid `FAQPage` on both home
routes and `BlogPosting` on all eight article pages, nothing has been awarded a
rich result.

Most likely explanation is simply age — eligibility is not entitlement, and two
weeks is little time. Worth re-checking rather than acting on, and worth
remembering that this weakens the case for adding `BreadcrumbList` on the
promise of a richer result. Add it because it is correct, not because it will
pay.

## Revised sequence

Reordered from evidence rather than inference.

1. **Get the Hindi reviewed by a native speaker.** Now the top item. It is the
   one advantage the data actually demonstrates, and every further Hindi page
   is blocked behind it. This is a hiring or favour-asking task, not a code
   task.
2. **Deepen `/blog/sample-to-bulk-order-checklist`.** The only page within
   striking distance of page one.
3. **Diagnose why English `source-fabric-from-surat` sits at 67** while its
   Hindi twin is at 8.5. The site's best article ranking worst is an anomaly
   worth understanding before writing anything new — it may say something about
   what the English SERP wants that the Hindi one does not.
4. **Check the hero type on a real mid-range Android.** Mobile is 62% of
   impressions at a better position than desktop.
5. **Write the specification-literacy pieces** — the wedge from
   `content-strategy.md`. Still the best long-term bet, still unproven; the
   best-performing article being a process/spec piece is weak support, not
   evidence.
6. **Fix the five truncated titles and the long home description.** Demoted.
   Correct, cheap, and currently worth almost nothing.

## Standing caveat

Twelve days of data on a site with 130 impressions. Every number here is small
enough that a single week could move it. The Hindi finding rests on two page
pairs. Treat all of this as direction, not proof, and re-export in a month when
there is enough volume to mean something.
