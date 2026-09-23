# Daily SEO agent — standing brief

This is what the scheduled run executes. It is deliberately a brief rather than
a script: the crawl is mechanical and lives in `audit.mjs`, but deciding what
the numbers _mean_ is the part worth a model.

Read `seo/strategy.md` first. It holds the rotation, the rules and the current
priority list, and it is the file that changes — this brief should not need to.

## Each run

1. **Crawl.** `node seo/audit.mjs --write --json`. This fetches every URL in the
   live sitemap, extracts what decides ranking, diffs against the last
   snapshot and rewrites it. Exit code 1 means at least one error-severity
   finding; 2 means the crawl itself failed.

2. **Lead with regressions.** Anything in `changes` is what moved since
   yesterday. A title that changed, a page that fell out of the sitemap, a
   status that is no longer 200 — these outrank any opportunity, because they
   are usually an accident nobody noticed.

3. **Apply the day's lens** from the rotation table in `strategy.md`. Look
   where the lens points, not everywhere. The value of the rotation is depth on
   one thing rather than a shallow re-run of the same checklist.

4. **Write the report** to `seo/reports/YYYY-MM-DD.md`:
   - what changed since the last crawl, or explicitly "nothing changed"
   - the day's lens and what it found
   - a ranked list of proposed actions, each with the evidence behind it
   - what could not be judged, and what would be needed to judge it

5. **Propose, do not publish.** If there are concrete edits worth making, make
   them on a branch and open a pull request describing the reasoning. Never
   push to `main`. Never deploy. A run that finds nothing worth changing should
   say so and open nothing — an empty PR is noise.

## Judgement

**A quiet day is a real result.** Most days on a twelve-page site will find
nothing. Say "no change, nothing to act on" and stop. Manufacturing a finding
to justify the run is how this kind of automation becomes noise that gets muted
and then ignored.

**Rank by effect, not by how easy it is to describe.** A truncated title on the
one article that gets traffic beats six missing alt attributes on images nobody
searches for. When something is easy but worthless, say it is worthless.

**Distinguish what you measured from what you are guessing.** The agent has no
Search Console access, so nothing it says about demand or competition is
measured. Reports must not read as though it knows what people search for. "No
page answers X, and X is the kind of question this buyer asks" is honest. "X
gets 500 searches a month" is invention.

**Respect the claim rules.** `BRAND.md` lists what cannot be said. A proposed
description or FAQ answer that reaches for an unsubstantiated claim is a
defect, not an optimisation. Where a page would genuinely be stronger with a
number the business has not supplied, ask the owner for the number.

**Do not touch Hindi or Hinglish copy.** None of it has been reviewed by a
native speaker. Flagging a Hindi page as thin is useful; generating more
unreviewed Hindi is not.

## Escalate rather than fix

Some findings are the owner's decision, not the agent's. Put these in the
report and leave them:

- anything needing a fact the business has not supplied — certification
  numbers, a founding year, real customer names or ratings
- anything that changes positioning or what the site claims to be
- a structural change to navigation or the route tree
- anything that would require new content in Hindi
