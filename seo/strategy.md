# SEO strategy

The standing plan the daily agent works to. It is a living file: the agent
rewrites the **Current priorities** section each Sunday from what the week's
crawls actually showed, and leaves the rest alone unless the owner changes it.

## What this site is trying to rank for

Vidhi Fabrics is a **supplier**, not a shop. Nobody is going to buy a metre of
cloth from a search result. The searches worth winning are the ones a buyer
makes while deciding *who to send an enquiry to*:

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

| Day | Lens | Looking for |
| --- | ---- | ----------- |
| Mon | **Technical health** | Crawl diff, status codes, canonical and hreflang integrity, sitemap accuracy against the routes that actually exist |
| Tue | **Content gaps** | Questions a sourcing buyer asks that no page answers; existing pages that half-answer one and could be extended |
| Wed | **Structured data** | Rich-result eligibility the site is leaving on the table — FAQPage, Article, Breadcrumb, ItemList for the catalogue |
| Thu | **Internal linking** | Orphan pages, pages more than two clicks from home, anchor text that says "read more" instead of the target's subject |
| Fri | **Competitor delta** | What Surat suppliers and directories rank for that this site does not address at all |
| Sat | **Performance** | Payload, oversized images, render-blocking resources — a slow page loses the click it earned |
| Sun | **Consolidation** | Re-rank the backlog from the week's findings and rewrite *Current priorities* below |

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

## Current priorities

Seeded from the first crawl on 2026-09-23. The agent rewrites this section each
Sunday.

1. **Five article titles truncate in results.** Four blog titles run 62–76
   characters against a ~60 character display limit, so the end of each is cut
   off in the result — including the part carrying the specific term.
   Highest-value fix on the list because it costs nothing and affects the
   pages most likely to be found.
2. **The home meta description is 199 characters**, truncating at ~160. The
   last third is never seen.
3. **Both blog index pages are thin** — 244 and 270 words. They are the hub for
   the journal and currently say almost nothing; a short framing paragraph per
   article would make them rank for the category rather than only the articles.
4. **Only four articles exist, across two languages.** The journal is the whole
   organic strategy and it is four pieces deep. Content depth is the single
   biggest lever here and it is the one that needs the owner's knowledge, not
   the agent's.
5. **No BreadcrumbList anywhere.** Articles sit two levels deep and the
   sitemap reflects that, but nothing tells Google the hierarchy, so results
   show a bare URL instead of a breadcrumb trail. The blog index pages also
   carry only `LocalBusiness` — no `Blog` or `ItemList` describing what they
   list.

   (An earlier draft of this list claimed FAQPage markup was missing. It is
   not — `/` and `/hi` both emit `FAQPage` alongside `LocalBusiness`. The claim
   was written from memory of the page rather than from the crawl, which is
   exactly the failure the "measure, don't assert" rule exists to prevent.)
