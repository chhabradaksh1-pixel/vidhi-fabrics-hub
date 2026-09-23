#!/usr/bin/env node
/**
 * Vidhi Fabrics — SEO crawler and differ.
 *
 * Fetches every URL in the live sitemap, extracts the things that decide
 * whether a page can rank, and compares the result against the last run so a
 * regression is visible the day it appears rather than the month someone
 * notices traffic fell.
 *
 * No dependencies. Node's own fetch and a handful of regexes are enough for a
 * twelve-page site whose HTML we control, and `CLAUDE.md` rules out adding
 * large dependencies. If this ever has to parse pages we do not own, replace
 * the extraction layer with a real parser rather than hardening the regexes.
 *
 *   node seo/audit.mjs            crawl, diff, print findings
 *   node seo/audit.mjs --write    also update the snapshot baseline
 *   node seo/audit.mjs --json     machine-readable output for the agent
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE = process.env.SEO_SITE ?? "https://www.vidhifabrics.com";
const SNAPSHOT = join(HERE, "data", "snapshot.json");

/* ── thresholds ──────────────────────────────────────────────────────────
 * Google truncates rather than penalises, so these are "will be cut off in
 * the result" limits, not ranking rules. Word count is a proxy for whether a
 * page says enough to answer a query, not a target to pad towards. */
const LIMITS = {
  titleMin: 15,
  titleMax: 60,
  descMin: 70,
  descMax: 160,
  thinWords: 300,
};

/**
 * Search Console performance, if the owner has dropped an export into
 * `seo/data/`. Without it every finding is weighted equally, which is how a
 * truncated title on a page with six impressions ended up ahead of everything
 * else in the first report. With it, findings are ordered by the traffic the
 * page actually gets.
 *
 * Deliberately tolerant: a missing or malformed export degrades to "no
 * performance data" rather than failing the crawl. The CSVs are gitignored, so
 * on a fresh checkout they will simply be absent.
 */
function loadPerformance() {
  const file = join(HERE, "data", "Pages.csv");
  if (!existsSync(file)) return { available: false, byUrl: new Map() };
  try {
    const rows = readFileSync(file, "utf8").trim().split(/\r?\n/).slice(1);
    const byUrl = new Map();
    for (const row of rows) {
      // GSC writes a plain 5-column CSV; URLs contain no commas.
      const [url, clicks, impressions, , position] = row.split(",");
      if (!url) continue;
      // Fold the http/non-www variants Google still reports onto the canonical
      // host, or the homepage's traffic appears split three ways.
      const key = url.replace(/^https?:\/\/(www\.)?/, "https://www.");
      const prev = byUrl.get(key) ?? { clicks: 0, impressions: 0, position: null };
      byUrl.set(key, {
        clicks: prev.clicks + Number(clicks || 0),
        impressions: prev.impressions + Number(impressions || 0),
        position: prev.position ?? (position ? Number(position) : null),
      });
    }
    return { available: true, byUrl };
  } catch {
    return { available: false, byUrl: new Map() };
  }
}

const text = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const all = (html, re) => [...html.matchAll(re)].map((m) => m[1]);

function extract(url, html, status, bytes) {
  const meta = (name, attr = "name") =>
    html.match(
      new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]+content=["']([^"']*)["']`, "i"),
    )?.[1] ??
    html.match(
      new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${name}["']`, "i"),
    )?.[1] ??
    null;

  const body = text(html);
  const jsonLd = all(html, /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)
    .flatMap((raw) => {
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [{ "@type": "UNPARSEABLE" }];
      }
    })
    .map((o) => o["@type"] ?? "UNKNOWN");

  const imgs = all(html, /<img\b([^>]*)>/gi);
  const links = all(html, /<a\b[^>]*href=["']([^"']+)["']/gi);
  const internal = links.filter((h) => h.startsWith("/") || h.startsWith(SITE));

  return {
    url,
    status,
    bytes,
    title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null,
    description: meta("description"),
    canonical:
      html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? null,
    robots: meta("robots"),
    ogTitle: meta("og:title", "property"),
    ogImage: meta("og:image", "property"),
    hreflang: all(html, /hreflang=["']([^"']+)["']/gi).sort(),
    h1: all(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi).map((h) => text(h)),
    h2Count: (html.match(/<h2\b/gi) ?? []).length,
    h3Count: (html.match(/<h3\b/gi) ?? []).length,
    words: body ? body.split(" ").length : 0,
    images: imgs.length,
    imagesNoAlt: imgs.filter((a) => !/\balt=/.test(a)).length,
    imagesEmptyAlt: imgs.filter((a) => /\balt=["']\s*["']/.test(a)).length,
    internalLinks: internal.length,
    jsonLd: [...new Set(jsonLd)].sort(),
  };
}

/** Findings are severity-ranked so the daily report leads with what matters.
 *  "error" blocks or badly misrepresents a page; "warn" costs clicks; "note"
 *  is an opportunity rather than a fault. */
function check(page) {
  const out = [];
  const add = (severity, code, detail) => out.push({ severity, code, detail, url: page.url });

  if (page.status !== 200) add("error", "bad-status", `HTTP ${page.status}`);
  if (/noindex/i.test(page.robots ?? "")) add("error", "noindex", page.robots);
  if (!page.canonical) add("error", "no-canonical", "page has no canonical link");
  if (!page.title) add("error", "no-title", "page has no <title>");
  if (page.h1.length === 0) add("error", "no-h1", "page has no <h1>");
  if (page.h1.length > 1) add("warn", "multiple-h1", `${page.h1.length} h1 elements`);

  if (page.title && page.title.length > LIMITS.titleMax)
    add("warn", "title-long", `${page.title.length} chars, truncates past ${LIMITS.titleMax}`);
  if (page.title && page.title.length < LIMITS.titleMin)
    add("warn", "title-short", `${page.title.length} chars`);

  if (!page.description)
    add("warn", "no-description", "no meta description — Google will invent one");
  else {
    if (page.description.length > LIMITS.descMax)
      add(
        "warn",
        "description-long",
        `${page.description.length} chars, truncates past ${LIMITS.descMax}`,
      );
    if (page.description.length < LIMITS.descMin)
      add("note", "description-short", `${page.description.length} chars, room for more`);
  }

  if (page.hreflang.length === 0)
    add("warn", "no-hreflang", "trilingual site with no hreflang on this page");
  if (page.imagesNoAlt > 0)
    add(
      "warn",
      "images-no-alt",
      `${page.imagesNoAlt} of ${page.images} images have no alt attribute`,
    );
  if (page.words < LIMITS.thinWords)
    add("note", "thin", `${page.words} words — thin for a page expected to answer a query`);
  if (page.internalLinks < 5)
    add("note", "few-internal-links", `${page.internalLinks} internal links`);
  if (!page.ogImage) add("note", "no-og-image", "no og:image — poor link preview when shared");

  return out;
}

/** What changed since the last crawl. Regressions are the point of running
 *  this daily; everything else can wait for the weekly pass. */
function diff(previous, current) {
  if (!previous) return [];
  const before = new Map(previous.pages.map((p) => [p.url, p]));
  const changes = [];
  const watch = ["title", "description", "canonical", "robots", "status", "words", "imagesNoAlt"];

  for (const page of current.pages) {
    const was = before.get(page.url);
    if (!was) {
      changes.push({ url: page.url, field: "page", from: "(absent)", to: "(new in sitemap)" });
      continue;
    }
    for (const field of watch) {
      if (String(was[field]) !== String(page[field])) {
        changes.push({ url: page.url, field, from: was[field], to: page[field] });
      }
    }
  }
  const now = new Set(current.pages.map((p) => p.url));
  for (const url of before.keys()) {
    if (!now.has(url))
      changes.push({ url, field: "page", from: "(present)", to: "(dropped from sitemap)" });
  }
  return changes;
}

async function main() {
  const sitemapUrl = `${SITE}/sitemap.xml`;
  const sitemap = await fetch(sitemapUrl).then((r) => r.text());
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) throw new Error(`no URLs found in ${sitemapUrl}`);

  const pages = [];
  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { "user-agent": "vidhi-seo-audit" } });
      const html = await res.text();
      pages.push(extract(url, html, res.status, html.length));
    } catch (err) {
      pages.push({
        url,
        status: 0,
        error: String(err).slice(0, 120),
        h1: [],
        hreflang: [],
        jsonLd: [],
      });
    }
  }

  const current = { crawledAt: new Date().toISOString(), site: SITE, pages };
  const previous = existsSync(SNAPSHOT) ? JSON.parse(readFileSync(SNAPSHOT, "utf8")) : null;

  // Attach performance, so findings can be ranked by pages that get seen.
  const perf = loadPerformance();
  for (const page of pages) {
    const p = perf.byUrl.get(page.url.replace(/\/$/, "")) ?? perf.byUrl.get(page.url);
    page.impressions = p?.impressions ?? null;
    page.clicks = p?.clicks ?? null;
    page.position = p?.position ?? null;
  }

  const findings = pages.flatMap(check).map((f) => {
    const page = pages.find((p) => p.url === f.url);
    return { ...f, impressions: page?.impressions ?? null };
  });
  const changes = diff(previous, current);
  const rank = { error: 0, warn: 1, note: 2 };

  // Severity first, then impressions. A warning on a page with sixty
  // impressions matters; the same warning on a page with none does not yet.
  findings.sort(
    (a, b) => rank[a.severity] - rank[b.severity] || (b.impressions ?? -1) - (a.impressions ?? -1),
  );

  const result = {
    crawledAt: current.crawledAt,
    pagesCrawled: pages.length,
    previousCrawl: previous?.crawledAt ?? null,
    performanceData: perf.available,
    counts: {
      error: findings.filter((f) => f.severity === "error").length,
      warn: findings.filter((f) => f.severity === "warn").length,
      note: findings.filter((f) => f.severity === "note").length,
    },
    findings,
    changes,
    pages,
  };

  if (process.argv.includes("--json")) {
    process.stdout.write(JSON.stringify(result, null, 2));
  } else {
    console.log(`Crawled ${pages.length} pages from ${SITE}`);
    console.log(
      `  ${result.counts.error} error  ${result.counts.warn} warn  ${result.counts.note} note`,
    );
    if (previous)
      console.log(`  ${changes.length} change(s) since ${previous.crawledAt.slice(0, 10)}`);
    console.log();
    console.log(
      perf.available
        ? "  performance data: yes (findings ranked by impressions)"
        : "  performance data: none — drop a Search Console export in seo/data/",
    );
    console.log();
    for (const f of findings) {
      const seen = f.impressions === null ? "   ?" : String(f.impressions).padStart(4);
      console.log(
        `  [${f.severity}] ${seen} imp  ${f.code.padEnd(20)} ${f.url.replace(SITE, "") || "/"}  ${f.detail}`,
      );
    }
    if (changes.length) {
      console.log("\nChanged since last crawl:");
      for (const c of changes) {
        console.log(`  ${c.url.replace(SITE, "") || "/"}  ${c.field}: ${c.from} -> ${c.to}`);
      }
    }
  }

  if (process.argv.includes("--write")) {
    mkdirSync(dirname(SNAPSHOT), { recursive: true });
    writeFileSync(SNAPSHOT, JSON.stringify(current, null, 2));
    if (!process.argv.includes("--json")) console.log(`\nSnapshot written to ${SNAPSHOT}`);
  }

  // Non-zero only on errors, so this can gate CI later without warnings
  // turning every run red.
  process.exit(result.counts.error > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
