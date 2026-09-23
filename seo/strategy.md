# SEO strategy

The standing plan the daily agent works to. It is a living file: the agent
rewrites the **Current priorities** section each Sunday from what the week's
crawls actually showed, and leaves the rest alone unless the owner changes it.

## What this site is trying to rank for

Vidhi Fabrics is a **supplier**, not a shop. Nobody is going to buy a metre of
cloth from a search result. The searches worth winning are the ones a buyer
makes while deciding _who to send an enquiry to_:

- sourcing intent — "wholesale fabric supplier Surat", "dress material
  wholesale", "fabric manufacturer Surat export"
- evaluation intent — "how to source fabric from Surat", "sample to bulk order
  checklist", "why do sarees cost different prices"
- specification intent — fabric names with a quality qualifier: "katan
  jacquard GSM", "cotton linen blend 280 GSM width"

The second group is what the journal already targets and where this site can
realistically win: low competition, high buyer intent, and the business
genuinely knows the answers. The first group is contested by directories and
marketplaces with far more authority — worth being present for, not worth
building the strategy on.

**Hindi is an advantage, not a duplicate.** `/hi` pages compete in a much
thinner index. A Hindi trader searching "सूरत फैब्रिक सप्लायर" meets far less
competition than the English equivalent. Treat the Hindi route as its own
opportunity rather than a translation chore.

## Rotation

One lens per day, so the agent looks somewhere new instead of re-reporting the
same checklist. Every day begins with the crawl diff regardless — a regression
is urgent whatever day it appears.

| Day | Lens                 | Looking for                                                                                                               |
| --- | -------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Mon | **Technical health** | Crawl diff, status codes, canonical and hreflang integrity, sitemap accuracy against the routes that actually exist       |
| Tue | **Content gaps**     | Work the backlog in `content-strategy.md`: what is written, what is next, whether the SERP for a target topic has changed |
| Wed | **Structured data**  | Rich-result eligibility the site is leaving on the table — FAQPage, Article, Breadcrumb, ItemList for the catalogue       |
| Thu | **Internal linking** | Orphan pages, pages more than two clicks from home, anchor text that says "read more" instead of the target's subject     |
| Fri | **Competitor delta** | What Surat suppliers and directories rank for that this site does not address at all                                      |
| Sat | **Performance**      | Payload, oversized images, render-blocking resources — a slow page loses the click it earned                              |
| Sun | **Consolidation**    | Re-rank the backlog from the week's findings and rewrite _Current priorities_ below                                       |

## Rules the agent does not break

These exist because SEO automation fails in predictable ways.

1. **Propose, never publish.** Output is a report and a pull request. Nothing
   reaches `main` or the live site without the owner merging. This is also
   `CLAUDE.md`'s standing rule, not just an SEO preference.
2. **Never invent a claim.** `BRAND.md` lists claims that cannot be
   substantiated — best price, guaranteed delivery, fixed MOQ or lead time,
   unverified certifications. A meta description or FAQ answer that reaches for
   one of those is worse than a missing one. When a page would be stronger with
   a number the business has not supplied, the agent asks for the number rather
   than estimating it.
3. **No daily churn.** Rewriting titles and descriptions every day teaches
   Google the site is unstable and destroys the ability to attribute a change
   to a result. A given page's metadata changes at most once a fortnight, and
   the change is recorded here with the date so its effect can be read later.
4. **Hindi and Hinglish copy is not the agent's to write.** Every Hindi string
   on the site was written by Claude and no native speaker has reviewed any of
   it — see `BRAND.md`. The agent may flag a Hindi page as thin; it must not
   quietly generate more of the same unreviewed copy.
5. **Measure, don't assert.** Same rule as the rest of the repo. A claim that a
   page is slow, thin or duplicated comes with the number that shows it.

## What the agent cannot see

Stated plainly so its reports are not read as more authoritative than they are.

- **No Search Console data.** The property is verified and the owner is logged
  in in a browser, but an unattended job has no session and no API credential.
  So the agent cannot see queries, impressions, click-through or position, and
  every prioritisation below is inferred from the site and its competitors
  rather than measured against real demand. Drop a GSC performance export into
  `seo/data/` and the agent will use it; set up a service account and it can
  fetch its own.
- **No backlink data**, so it cannot judge authority or say why a competitor
  outranks a better page.
- **No rank tracking.** It can tell you a page improved structurally. It cannot
  tell you the improvement moved anything.

## Content

`content-strategy.md` holds the content plan: the competitive evidence for why
head commercial terms are unwinnable, the specification-literacy gap that is
winnable, the five clusters and the sequence. The Tuesday lens works against
it, and the agent updates its sequence when a crawl or a SERP check changes the
picture — but it does not write articles.

## Current priorities

Rewritten 23 September 2026 from the first Search Console export, replacing a
list inferred from the markup. Full reasoning in
`reports/2026-09-23-search-console.md`.

**Context that governs all of it: the site is two weeks old in Search.** Twelve
days of data, 130 impressions. This is a discovery phase, not an
underperformance problem.

1. **Get the existing Hindi reviewed by a native speaker.** The export shows
   `/hi/blog/source-fabric-from-surat` at position 8.5 against 67 for the same
   article in English. Hindi is the one advantage the data demonstrates, and
   every further Hindi page is blocked behind this review. Owner-side task.
2. **Deepen `/blog/sample-to-bulk-order-checklist`** — position 10.5, the only
   page within reach of page one, and one of the shortest at 799 words.
3. **Diagnose English `source-fabric-from-surat` at position 67** while its
   Hindi twin sits at 8.5. The site's longest and best article ranking worst is
   an anomaly worth understanding before writing anything new.
4. **Check the hero's weight-200 type on a real mid-range Android.** Mobile is
   80 of 130 impressions at position 7.86 against desktop's 16.48. The audience
   is on phones.
5. **The five truncated titles and the 199-character home description.**
   Demoted from first to fifth: those pages have 1–6 impressions each, and
   click-through work on ~0 impressions buys nothing. Still correct, just not a
   lever yet.

Two earlier items are struck off. The FAQPage gap did not exist — both home
routes already emit it. The apparent `http`/`https`/`www` duplication in the
export is not a fault either: all variants 308 to `https://www` and every one
declares the right canonical, so Google is simply still consolidating.
