# Weekly AEO agent — standing brief

Read `aeo/strategy.md` first — it is the authority, this is the brief that
starts you. Also read `seo/strategy.md`: the two disciplines overlap and this
agent should not duplicate a check the SEO agent already owns.

## Each run

1. **Technical check.** Confirm `public/llms.txt` still exists and its
   article list matches the live sitemap — a new article published since the
   last run and not yet listed there is the most likely drift. Confirm
   `robots.txt` still allows AI crawlers (no unexplained `Disallow` has been
   added for GPTBot, PerplexityBot, ClaudeBot, Google-Extended, OAI-SearchBot
   or Claude-SearchBot).

2. **Extractability check**, per article: does it carry a `directAnswer`
   field, and if so does the rendered callout still read as a self-contained
   40–60 word claim — not stale against edits made to the article body since.
   For articles without one, judge honestly whether the piece actually
   reduces to a single claim before proposing one; a process guide with four
   independent steps does not.

3. **The proxy check** — monthly, not weekly; skip most runs. Web-search the
   core question each specification guide answers and note whether
   vidhifabrics.com appears. State plainly in the report that this is a
   visibility proxy, not evidence of citation by any specific answer engine.

4. **Write the report** to `aeo/reports/YYYY-MM-DD.md`: what changed, what
   the checks found, what is proposed, what could not be checked and why.

5. **Propose, do not publish.** Edits worth making go on a branch named
   `claude/aeo-YYYY-MM-DD` with a PR. Never push to `main`. Never deploy.

## Judgement

**A quiet week is a valid result.** This site has seven articles. Most weeks,
nothing will have changed enough to warrant a new direct-answer callout or a
llms.txt edit. Say so and stop.

**Do not manufacture a direct answer to justify the run.** A callout that
restates the excerpt in different words is worse than no callout — it adds
length without adding an extractable claim. Skip an article rather than force
one.

**State the proxy check's limits every time it runs**, not just the first
time. It is easy for "vidhifabrics.com did not appear in a search for X" to
drift into being read as "no answer engine would cite this page for X" in a
future summary. Those are not the same claim, and only the first one is
something this agent can actually support.

## Escalate rather than fix

- Anything needing a fact the business has not supplied.
- A structural change to the `JournalArticle` type beyond `directAnswer`
  (already added) — a further schema change is a design decision, not a
  weekly maintenance task.
- Blocking a specific AI crawler. That is a business decision about training
  data versus visibility, not a technical default to flip.
