# AEO strategy

Written 26 September 2026. Companion to `seo/strategy.md`, not a replacement —
the two disciplines overlap but optimise for different things, and the
evidence says SEO comes first.

## What AEO actually is, and what it is not

Answer Engine Optimization is structuring content so an AI system — ChatGPT,
Perplexity, Google's AI Overviews and AI Mode — can extract it cleanly and
cite it, rather than merely rank it. The target is being the sentence quoted
in an answer, not the tenth blue link.

**The load-bearing fact, checked before writing anything else here: 99% of
URLs cited in Google's AI Mode already rank in the top 20 organic results.**
AEO is not a separate channel from SEO — it is close to a formatting layer on
top of SEO that already has to be working. A page with no organic ranking at
all is very unlikely to be cited regardless of how well-structured it is.

So this is not a second campaign competing with the SEO work for priority.
It is a small number of structural additions to content that has to earn its
citations the same way it earns its ranking: depth, correctness, and being the
best answer to a real question.

Two things AI answer engines weight differently from classic search, both
checked rather than assumed:

- **Freshness matters more.** AI-surfaced URLs are measurably fresher than
  traditional organic results, so a maintained page has a real edge over an
  abandoned one at the same quality.
- **Extraction quality matters independently of ranking.** A page that ranks
  well but buries its answer in paragraph four of a narrative is a worse
  citation candidate than a shorter page that states the answer in the first
  three sentences.

## What is already accidentally right

Checked against the site as it stands rather than assumed:

- **The three specification guides are the correct shape already.** Direct,
  declarative claims; FAQ blocks with a real question and a real answer;
  numbered sections with clear headings. This is what the AEO literature
  describes as the target structure, and it was built for SEO reasons before
  this file existed.
- **FAQ blocks are worth more here than they turned out to be worth in
  classic Google Search.** `seo/strategy.md` records that Google retired FAQ
  rich results on 7 May 2026 — but a question-then-answer pair is exactly the
  chunk shape a retrieval-augmented answer engine wants to lift. The FAQPage
  markup earns nothing in the Google SERP any more; the underlying Q&A
  *content* is more valuable for AEO than it was ever going to be for that
  rich result.
- **robots.txt already allows every crawler**, AI or otherwise
  (`User-agent: * / Allow: /`), so nothing has been blocking GPTBot,
  PerplexityBot, ClaudeBot or Google-Extended. No action was needed there;
  worth confirming this stays true if anyone touches the file for another
  reason.

## What was missing, now fixed

- **No `llms.txt`.** Adoption of this file across the top sites on the web is
  under 1%, so this is unusually cheap to be ahead on. `public/llms.txt` now
  states positioning, the confirmed facts (and the ones that must not be
  invented), and links every guide with a one-line description of what it
  actually answers.
- **Articles opened with narrative before any extractable claim.** The GSM
  guide's first extractable sentence was 101 words in. A `directAnswer` field
  now renders a 40–60 word callout before the introduction on the three
  specification guides — the ones that genuinely reduce to one claim. It
  serves a human skimming for the conclusion and an answer engine lifting a
  clean chunk equally; it is not written differently for the two audiences.

## What this cannot do, stated plainly

No API access to ChatGPT, Perplexity or Google exists from this session or
from an unattended local task. That means:

- **No citation tracking.** There is no way to confirm an answer engine has
  ever quoted this site, the way Search Console confirms a query and a
  position. Any claim that AEO work "worked" would be invention.
- **The closest available proxy is a periodic web search** for the exact
  buyer questions the specification guides answer, checking whether
  vidhifabrics.com appears among the results a search surfaces. This is a
  proxy for visibility, not a measurement of citation — Perplexity and
  ChatGPT do not draw from the same index in the same way a web search does,
  and a page appearing in search results does not prove an answer engine
  would choose to quote it. The agent must say this every time it uses the
  method, not just once here.
- **No server-side crawler logs.** Confirming GPTBot or PerplexityBot has
  actually fetched a page needs access to hosting logs or a service like
  Cloudflare's AI crawler analytics, neither of which this repo or session
  can reach. If the owner's host exposes this, it would be the single most
  useful thing to add.

## Rules, inherited from the SEO agent and unchanged

Same reasoning, same file to read for the full case: `seo/strategy.md`.

1. **Propose, never publish.** A report and, when there is something concrete,
   a PR. Never a push to `main`.
2. **Never invent a claim.** `BRAND.md`'s claim rules apply to a direct-answer
   callout exactly as they apply to any other sentence on the site.
3. **No churn.** A direct answer, once written, is not rewritten weekly on a
   hunch. Freshness matters for the underlying content depth, not for
   cosmetic edits to the same three sentences.
4. **Hindi and Hinglish are drafted, never assumed reviewed.** Every Hindi
   string this agent writes carries the same standing flag as the rest of the
   site: written by Claude, pending the owner's read.
5. **Measure, don't assert.** A claim that a page is or is not extractable
   comes with the actual opening words quoted, not a description of them.

## Cadence

Weekly, not daily. Citation and extraction patterns move over weeks; a page's
structure does not change between Tuesday and Wednesday. Daily runs here would
duplicate the SEO crawl's regression-catching job for no benefit and add a
second unattended task with the same permission-approval requirement.

## Current priorities

1. **Extend `directAnswer` to the four non-specification articles**, where a
   piece reduces to one claim. `sample-to-bulk-order-checklist` is the
   strongest candidate — it already has a clear closing checklist that
   suggests a single condensable claim exists.
2. **Confirm crawler access periodically.** No log access exists yet; ask the
   owner whether their host (Lovable / underlying Vercel-style hosting)
   exposes any bot-traffic analytics before assuming there is truly no way to
   check this.
3. **Re-run the web-search proxy check monthly** against the specification
   guides' core questions (what GSM means, why width affects costing, how to
   read a spec) and note any change in whether the site appears — labelled
   explicitly as a visibility proxy, not a citation measurement.
