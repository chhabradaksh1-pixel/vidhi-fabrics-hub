# SEO

A daily agent that watches the live site, diagnoses what is holding it back,
and proposes fixes. It never publishes anything.

## Files

| Path                 | What it is                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| `strategy.md`        | The plan: what the site targets, the daily rotation, the rules, the current priority list. **Start here.** |
| `AGENT.md`           | The standing brief the scheduled run executes.                                                             |
| `audit.mjs`          | Dependency-free crawler and differ.                                                                        |
| `data/snapshot.json` | Last crawl, used to diff the next one.                                                                     |
| `reports/`           | One dated report per run.                                                                                  |
| `data/*.csv`         | Optional Search Console exports; picked up automatically if present.                                       |

## Running it by hand

    node seo/audit.mjs            crawl and print findings
    node seo/audit.mjs --write    also update the snapshot
    node seo/audit.mjs --json     machine-readable, for the agent

Exit 1 means at least one error-severity finding, 2 means the crawl failed.

## Schedule

Runs daily at 09:08 via the `vidhi-seo-daily` scheduled task. It only fires
while the Claude desktop app is open; if the app is shut at that time it runs
on next launch.

## The two things to understand

**It proposes, it does not publish.** Output is a dated report and, when there
is something concrete to change, a pull request. Nothing reaches `main` or the
live site without a human merging it. That is `CLAUDE.md`'s standing rule, and
it is also simply how SEO automation avoids doing damage.

**It has no Search Console access.** The property is verified, but an
unattended job has no browser session. So it can tell you a page is
structurally weak; it cannot tell you whether that page gets traffic, or which
query it ranks for. Read its prioritisation as informed inference, not
measurement. A GSC export in `data/` fixes this for as long as the export is
fresh.

## Content

`content-strategy.md` is the content plan — what to write, in what order, and
the SERP evidence for why. `strategy.md` covers technical SEO; the two are
deliberately separate because they move on different timescales.
