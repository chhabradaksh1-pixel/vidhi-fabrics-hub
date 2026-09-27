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

| Day | Lens                 | Looking for                                                                                                                                                         |
| --- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mon | **Technical health** | Crawl diff, status codes, canonical and hreflang integrity, sitemap accuracy against the routes that actually exist                                                 |
| Tue | **Content gaps**     | Work the backlog in `content-strategy.md`: what is written, what is next, whether the SERP for a target topic has changed                                           |
| Wed | **Structured data**  | Validity first, then the rich results that still exist — Breadcrumb, Article, ItemList. **Not FAQ:** FAQ rich results were retired from Google Search on 7 May 2026 |
| Thu | **Internal linking** | Orphan pages, pages more than two clicks from home, anchor text that says "read more" instead of the target's subject                                               |
| Fri | **Competitor delta** | What Surat suppliers and directories rank for that this site does not address at all                                                                                |
| Sat | **Performance**      | Payload, oversized images, render-blocking resources — a slow page loses the click it earned                                                                        |
| Sun | **Consolidation**    | Re-rank the backlog from the week's findings and rewrite _Current priorities_ below                                                                                 |

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

## FAQ structured data earns nothing in Google

Recorded because it is a standing trap, and it caught me once already.

FAQ rich results were restricted to government and health sites in August 2023
and **retired from Google Search entirely on 7 May 2026**. Google is dropping
the FAQ search appearance and Rich Results Test support in June 2026, and the
Search Console API support in August 2026. There is no FAQ rich result left to
earn.

So never propose FAQ markup on the promise of a rich result, and do not read an
empty `Search appearance` report as a fault. The existing `FAQPage` markup on
the home routes should **stay** — unused structured data is harmless, `FAQPage`
is still valid schema.org, and Bing and the RAG crawlers still read it — but it
earns nothing in Google and must not be presented as though it does.

FAQ _content_ is still worth writing. Answering a real buyer question in the
body of a page is valuable because of the answer, not the markup. That is the
only reason to add one.

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

Rewritten 27 September 2026 by the Sunday consolidation pass. Full reasoning in
`reports/2026-09-27.md`.

**Context that governs all of it: the evidence base has expired.** The list
below replaces one written on 23 September from a Search Console export
covering 9–20 September, when the site had twelve URLs. It now has eighteen.
Six of them — the three specification guides and their Hindi twins — were
published on 24 and 25 September and appear nowhere in that export. Neither
does the deepened checklist article, whose improvement was the previous list's
second item and which cannot be scored against data that predates it.

Everything below is therefore ranked on what can be observed on the site, not
on measured demand.

1. **A fresh Search Console export.** Owner-side, two minutes, and it unblocks
   the next month of these reports. Performance → Web → last 3 months → export
   all five CSVs into `seo/data/`. Nothing else on this list can be ranked
   honestly until it exists.
2. **Get the existing Hindi reviewed by a native speaker.** Unchanged in
   position, changed in justification. The GSC case for Hindi is weaker than
   the 23 September report implied — it rests on five impressions across four
   Hindi URLs, which is close to no evidence at all. The case that survives
   needs no impression data: nine of eighteen live URLs are in a language no
   native speaker has ever checked, and three more Hindi articles were added
   this week, so the review job grew 60% while sitting at the top of this list.
   Owner-side task.
3. **Defer the 6 MB autoplay loom video, or poster it.** Measured 27 September:
   `weaving-loom.mp4` is 6,059,529 bytes, carries `autoplay loop muted
playsinline` with no `poster` and no `preload`, sits at y=3,132px in a
   10,069px document, and a network trace shows the browser fetching it during
   initial page load before any scrolling. Mobile was 80 of 130 impressions.
   This is the largest avoidable cost on the page. Needs the owner because a
   poster frame cannot be extracted here (no ffmpeg) and it changes appearance.
4. **Submit `public/sitemap.xml` in Search Console.** Carried over, now more
   pressing: six URLs published on 24–25 September need discovering. The
   sitemap itself is accurate — all 18 present, verified 27 September.
5. **Decide what happens to 1 GB of unreferenced media in `public/`.** Two
   `.mov` files (435 MB and 569 MB as LFS objects) plus the Klickpin pointer,
   all serving HTTP 200 with a video content type and LFS pointer text as the
   body. Unlinked, so no real crawl cost — the cost is repo weight. They may be
   the owner's source footage, so this is a question, not a deletion.
6. **Check the hero's weight-200 type on a real mid-range Android.** Carried
   over unchanged. The audience is demonstrably on phones.
7. **Write the next content cluster.** The specification-literacy wedge
   (`content-strategy.md` cluster A) completed on 25 September. Next in that
   file's sequence is the six fabric pages — most commercial, and the spec data
   already exists. Still unproven as a strategy; no query in any export has
   touched the wedge yet, because nothing had been written when the export was
   taken.

**Struck off.** "Diagnose English `source-fabric-from-surat` at position 67"
was the previous list's third item. That page has **one impression** — an
average position over a single impression is one query at one moment, not an
anomaly. There is nothing there to diagnose until a larger export either
reproduces it or does not.

**Closed since 23 September**, verified live rather than from commit messages:
the five truncated titles and the 199-character home description (longest title
now 59 chars, home description 141); the deepened checklist article (799 →
1,114 words, FAQ added); the whole specification-literacy cluster. Also the
placeholder star ratings, which `CLAUDE.md` still lists as live and no longer
are.

Two earlier items remain struck off. The FAQPage gap did not exist — both home
routes already emit it. The apparent `http`/`https`/`www` duplication in the
export is not a fault either: all variants 308 to `https://www` and every one
declares the right canonical, so Google is simply still consolidating.
