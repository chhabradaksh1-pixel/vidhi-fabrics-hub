# AEO

A weekly check for whether the site's content can be cleanly cited by an AI
answer engine, on top of the SEO work in `seo/`. Same propose-only model, same
guardrails, different questions.

## Files

| Path | What it is |
| ---- | ---------- |
| `strategy.md` | The plan: what AEO is for this business, what was already right, what was missing, and the honest limits of what can be measured. **Start here.** |
| `AGENT.md` | The standing brief the scheduled run executes. |
| `audit.mjs` | Checks llms.txt currency, AI-crawler access in robots.txt, and which articles carry an extractable direct-answer callout. |
| `reports/` | One dated report per run. |

## Running it by hand

    node aeo/audit.mjs            checks, printed
    node aeo/audit.mjs --json     machine-readable

Like `seo/audit.mjs`, this reads sitemap URLs that are always absolute
production URLs — it can only meaningfully check the live site, not a local
build.

## The two things to understand

**It cannot measure citation.** There is no API access to ChatGPT, Perplexity
or Google's answer surfaces from this repo or an unattended local task. Every
report says so. The nearest available signal is a monthly web-search proxy
check, explicitly labelled as a visibility proxy rather than evidence of
citation.

**AEO is not a separate priority from SEO — it rides on it.** 99% of pages
cited in Google's AI Mode already rank in the top 20 organically. A page with
no ranking is very unlikely to be cited regardless of its structure. See
`strategy.md` for the reasoning; the practical effect is that this agent
proposes small structural additions to already-good content, not a competing
content plan.
