#!/usr/bin/env node
/**
 * Vidhi Fabrics — AEO technical audit.
 *
 * Checks the mechanical half of AEO: is llms.txt present and current, do AI
 * crawlers still have access, and which articles carry an extractable direct
 * answer versus which open with narrative. It cannot check the half that
 * actually matters most — whether an answer engine cites the site — because
 * no API access to one exists from here. See aeo/strategy.md for why, and
 * what the nearest available proxy is.
 *
 * No dependencies, matching seo/audit.mjs.
 *
 *   node aeo/audit.mjs         run the checks, print findings
 *   node aeo/audit.mjs --json  machine-readable output
 */

const SITE = process.env.SEO_SITE ?? "https://www.vidhifabrics.com";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
];

const DIRECT_ANSWER_WORDS = { min: 30, max: 70 }; // soft band around the 40-60 target

function checkRobots(robotsTxt) {
  const findings = [];
  // A wildcard Allow with no crawler-specific Disallow covers every named
  // crawler. Only flag a problem if one is explicitly named and blocked.
  for (const bot of AI_CRAWLERS) {
    const re = new RegExp(`User-agent:\\s*${bot}[\\s\\S]*?Disallow:\\s*/\\s*$`, "im");
    if (re.test(robotsTxt)) {
      findings.push({
        severity: "warn",
        code: "ai-crawler-blocked",
        detail: `${bot} is explicitly disallowed`,
      });
    }
  }
  return findings;
}

async function checkLlmsTxt(sitemapUrls) {
  const findings = [];
  const res = await fetch(`${SITE}/llms.txt`);
  if (res.status !== 200) {
    findings.push({
      severity: "error",
      code: "no-llms-txt",
      detail: `llms.txt returned HTTP ${res.status}`,
    });
    return findings;
  }
  const body = await res.text();
  const articleUrls = sitemapUrls.filter((u) => u.includes("/blog/") && !u.includes("/hi/"));
  for (const url of articleUrls) {
    if (!body.includes(url)) {
      findings.push({ severity: "warn", code: "article-missing-from-llms-txt", detail: url });
    }
  }
  return findings;
}

async function checkDirectAnswers() {
  const findings = [];
  const sitemap = await fetch(`${SITE}/sitemap.xml`).then((r) => r.text());
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1])
    .filter((u) => u.includes("/blog/") && !u.includes("/hi/") && !u.endsWith("/blog"));

  for (const url of urls) {
    const html = await fetch(url).then((r) => r.text());
    // The full class list is deliberately matched, not just "border-clay
    // bg-sand" — an existing checklist callout elsewhere on these pages
    // shares those two classes, and a looser match silently returned that
    // element's content instead of the direct-answer callout's.
    const m = html.match(
      /<p[^>]*class="mt-10 border-l-2 border-clay bg-sand px-5 py-4 text-base leading-relaxed text-ink"[^>]*>([^<]+)</,
    );
    if (m) {
      const words = m[1].trim().split(/\s+/).length;
      if (words < DIRECT_ANSWER_WORDS.min || words > DIRECT_ANSWER_WORDS.max) {
        findings.push({
          severity: "note",
          code: "direct-answer-length",
          detail: `${url.replace(SITE, "")} — ${words} words, outside the 40-60 target band`,
        });
      }
    } else {
      findings.push({
        severity: "note",
        code: "no-direct-answer",
        detail: `${url.replace(SITE, "")} has no directAnswer callout — fine if the piece genuinely has no single reducible claim`,
      });
    }
  }
  return findings;
}

async function main() {
  const [robotsTxt, sitemap] = await Promise.all([
    fetch(`${SITE}/robots.txt`).then((r) => r.text()),
    fetch(`${SITE}/sitemap.xml`).then((r) => r.text()),
  ]);
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  const findings = [
    ...checkRobots(robotsTxt),
    ...(await checkLlmsTxt(sitemapUrls)),
    ...(await checkDirectAnswers()),
  ];

  const rank = { error: 0, warn: 1, note: 2 };
  findings.sort((a, b) => rank[a.severity] - rank[b.severity]);

  const result = {
    checkedAt: new Date().toISOString(),
    site: SITE,
    counts: {
      error: findings.filter((f) => f.severity === "error").length,
      warn: findings.filter((f) => f.severity === "warn").length,
      note: findings.filter((f) => f.severity === "note").length,
    },
    findings,
    caveat:
      "This checks structure only. It cannot confirm any AI answer engine has read or cited a page — no API access to one exists from here. See aeo/strategy.md.",
  };

  if (process.argv.includes("--json")) {
    process.stdout.write(JSON.stringify(result, null, 2));
  } else {
    console.log(`AEO technical audit — ${SITE}`);
    console.log(
      `  ${result.counts.error} error  ${result.counts.warn} warn  ${result.counts.note} note`,
    );
    console.log();
    for (const f of findings) {
      console.log(`  [${f.severity}] ${f.code.padEnd(28)} ${f.detail}`);
    }
    console.log(`\n${result.caveat}`);
  }

  process.exit(result.counts.error > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
