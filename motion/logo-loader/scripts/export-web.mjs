// node scripts/export-web.mjs [site-module.ts]
//
// Writes the website loader from the same paths, strokes and timing the
// Remotion composition uses (src/logo-paths.ts, src/line.ts, src/strokes.ts,
// src/timing.ts):
//   out/vidhi-loader.html  the loader on its own, to open in a browser
//   [site-module.ts]       `export const LOADER_HTML = "..."` for the site
//
// Each pen stroke's progress is a registered custom property (--vfl-pv for
// the V, --vfl-pi for "idhi") animated 0 -> 1 on that stroke's easing; every
// segment works out its own dash offset from it, exactly as Remotion does.
// Pure CSS: it never needs JavaScript to finish. Node strips the types itself.
import { mkdirSync, writeFileSync } from "node:fs";

import { SEGMENTS } from "../src/line.ts";
import { DOT_PATH, FABRICS_LETTERS, IDHI_PATH, LOGO_COLOR, V_PATH, VIEWBOX } from "../src/logo-paths.ts";
import { FABRICS_WIPE, GLINT } from "../src/strokes.ts";
import { EASE, TIMING } from "../src/timing.ts";

const [siteModule] = process.argv.slice(2);
const LINEN = "#F4EFE9";
const W = VIEWBOX.width;
const H = VIEWBOX.height;
const bez = (k) => `cubic-bezier(${EASE[k].join(",")})`;
const s = (v) => `${Math.round(v * 1000) / 1000}s`;
const dur = (x) => x.end - x.start;
const r1 = (v) => Math.round(v * 10) / 10;
const region = `maskUnits="userSpaceOnUse" x="-40" y="-40" width="${W + 80}" height="${H + 80}"`;
const glintAt = (p) => `translate(${r1(GLINT.from[0] + (GLINT.to[0] - GLINT.from[0]) * p)}px,${r1(GLINT.from[1] + (GLINT.to[1] - GLINT.from[1]) * p)}px) rotate(${GLINT.angle}deg)`;

const css = `
@property --vfl-pv{syntax:"<number>";inherits:true;initial-value:0}
@property --vfl-pi{syntax:"<number>";inherits:true;initial-value:0}
#vf-loader{position:fixed;inset:0;z-index:100;display:grid;place-items:center;background:${LINEN};animation:vfl-out ${s(dur(TIMING.out))} ${bez("fade")} ${s(TIMING.out.start)} both,vfl-pass .01s linear ${s(TIMING.out.start)} both}
#vf-loader.is-done{pointer-events:none;animation:vfl-out-now .2s ease both}
#vf-loader svg{width:clamp(160px,18vw,240px);height:auto;overflow:visible;animation:vfl-pv ${s(dur(TIMING.v))} ${bez("stroke")} ${s(TIMING.v.start)} both,vfl-pi ${s(dur(TIMING.idhi))} ${bez("stroke")} ${s(TIMING.idhi.start)} both}
.vfl-v{--p:var(--vfl-pv)}
.vfl-i{--p:var(--vfl-pi)}
.vfl-s{--d:clamp(0,(var(--p)*var(--t) - var(--s))/var(--l),1);stroke-dasharray:calc(var(--l)*1px) calc(var(--l)*1px);stroke-dashoffset:calc(var(--l)*1px*(1 - var(--d)));opacity:clamp(0,(var(--p)*var(--t) - var(--s))*1000,1)}
.vfl-wipe{animation:vfl-wipe ${s(dur(TIMING.fabrics))} ${bez("wipe")} ${s(TIMING.fabrics.start)} both}
.vfl-layers{animation:vfl-hide .01s linear ${s(TIMING.clean)} both}
.vfl-clean{animation:vfl-show .01s linear ${s(TIMING.clean)} both}
.vfl-glint{animation:vfl-glint ${s(dur(TIMING.glint))} ${bez("glide")} ${s(TIMING.glint.start)} both}
@keyframes vfl-pv{from{--vfl-pv:0}to{--vfl-pv:1}}
@keyframes vfl-pi{from{--vfl-pi:0}to{--vfl-pi:1}}
@keyframes vfl-wipe{from{transform:translateX(${FABRICS_WIPE.fromX}px)}to{transform:translateX(${FABRICS_WIPE.toX}px)}}
@keyframes vfl-glint{0%{transform:${glintAt(0)};opacity:0}18%{opacity:1}82%{opacity:1}100%{transform:${glintAt(1)};opacity:0}}
@keyframes vfl-out{to{opacity:0;visibility:hidden}}
@keyframes vfl-out-now{from{opacity:1}to{opacity:0;visibility:hidden}}
@keyframes vfl-pass{to{pointer-events:none}}
@keyframes vfl-hide{to{visibility:hidden}}
@keyframes vfl-show{from{visibility:hidden}to{visibility:visible}}
@media (prefers-reduced-motion:reduce){#vf-loader{display:none}}
`
  .trim()
  .replace(/\n/g, "");

// Each shape is defined once and reused with <use>; fill comes from the group.
const shape = (id, d) => `<path id="${id}" fill-rule="evenodd" clip-rule="evenodd" d="${d}"/>`;
const shapes = [
  shape("vfl-v", V_PATH),
  shape("vfl-i", IDHI_PATH),
  shape("vfl-d", DOT_PATH),
  ...FABRICS_LETTERS.map((l, i) => shape(`vfl-f${i}`, l.d)),
].join("");
const use = (id, attrs = "") => `<use href="#${id}"${attrs}/>`;
const letters = FABRICS_LETTERS.map((_, i) => use(`vfl-f${i}`)).join("");

// A pen segment: its start and length along its stroke, and the stroke's
// length, ride on custom properties that .vfl-s turns into a dash offset.
const seg = (g) =>
  `<path class="vfl-s ${g.stroke === "v" ? "vfl-v" : "vfl-i"}" style="--s:${r1(g.start)};--l:${r1(g.length) + 0.5};--t:${r1(g.strokeLength)}" d="${g.d}" fill="none" stroke="#fff" stroke-width="${g.width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const mask = (id, target) => `<mask id="${id}" ${region}>${SEGMENTS.filter((g) => g.target === target).map(seg).join("")}</mask>`;

const svg = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" focusable="false"><defs>${shapes}
${mask("vfl-mv", "v")}${mask("vfl-ms", "script")}
<linearGradient id="vfl-feather"><stop offset="0" stop-color="#fff"/><stop offset="${FABRICS_WIPE.feather}" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="vfl-mf" ${region}><rect class="vfl-wipe" x="0" y="${FABRICS_WIPE.y}" width="${FABRICS_WIPE.width}" height="${FABRICS_WIPE.height}" fill="url(#vfl-feather)"/></mask>
<clipPath id="vfl-ink">${use("vfl-v")}</clipPath>
<linearGradient id="vfl-shine"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
</defs><g fill="${LOGO_COLOR}"><g class="vfl-layers">
${use("vfl-v", ' mask="url(#vfl-mv)"')}
<g mask="url(#vfl-ms)">${use("vfl-i")}${use("vfl-d")}</g>
<g mask="url(#vfl-mf)">${letters}</g>
</g><g class="vfl-clean">${use("vfl-v")}${use("vfl-i")}${use("vfl-d")}${letters}</g>
<g clip-path="url(#vfl-ink)"><rect class="vfl-glint" x="-4" y="-30" width="8" height="60" fill="url(#vfl-shine)"/></g></g></svg>`.replace(/\n/g, "");

// Shown once per browser (owner, 3 November 2026: "first time only, don't do
// it repeatedly"; on 2 November it was once per visit). Once it has played,
// `vidhi-loader-seen` in localStorage keeps it away on every later page, tab
// and visit in that browser. It is also skipped when the referrer is a page of
// this site, which holds between pages even where storage is blocked (private
// modes), and when the session key is set (tests set it). While it is up, every image and video on
// the page is fetched (and images decoded) into the browser cache, so nothing
// pops in once the page shows; lazy images then load from cache. Video is
// skipped under data saver. Any tap, key or scroll ends the loader early; it
// stays in the page, hidden, once its fade ends: the hero headline's CSS
// times itself from it. From the moment its fade begins the loader lets the
// pointer through (vfl-pass), so a click on the page as it appears reaches
// the link under it; a tap that skips it early does the same at once. While
// the logo screen is still opaque, a tap only skips it: nothing underneath
// can be seen, so nothing underneath is clicked. A tap once the fade has
// begun is ignored: restarting the quick fade would flash the loader back on
// top.
// Wrapped in try so private mode is fine.
const script = `(function(){var l=document.getElementById("vf-loader");if(!l)return;var inside=false;try{inside=!!document.referrer&&new URL(document.referrer).origin===location.origin}catch(e){}if(inside){l.remove();return}try{if(localStorage.getItem("vidhi-loader-seen")||sessionStorage.getItem("vidhi-loader-seen")){l.remove();return}localStorage.setItem("vidhi-loader-seen","1");sessionStorage.setItem("vidhi-loader-seen","1")}catch(e){}
function warm(){try{document.querySelectorAll("img").forEach(function(el){if(el.complete&&el.naturalWidth)return;var src=el.getAttribute("src");if(!src)return;var i=new Image();if(el.sizes)i.sizes=el.sizes;if(el.srcset)i.srcset=el.srcset;i.src=src;if(i.decode)i.decode().catch(function(){})});
var c=navigator.connection;if(c&&c.saveData)return;document.querySelectorAll("video").forEach(function(v){var s=v.getAttribute("src");var t=v.querySelector("source");if(!s&&t)s=t.getAttribute("src");if(s)fetch(s,{priority:"low"}).then(function(r){return r.blob()}).catch(function(){})})}catch(e){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",warm,{once:true});else warm();
var d=function(){var c=getComputedStyle(l);if(c.visibility!=="hidden"&&c.display!=="none"&&c.pointerEvents!=="none")l.classList.add("is-done")};["pointerdown","keydown","wheel","touchstart"].forEach(function(t){addEventListener(t,d,{once:true,passive:true})})})();`.replace(/\n/g, "");

const html = `<div id="vf-loader" aria-hidden="true"><style>${css}</style>${svg}</div><script>${script}</script>`;

mkdirSync("out", { recursive: true });
writeFileSync(
  "out/vidhi-loader.html",
  `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Vidhi loader</title></head><body style="margin:0;font:16px system-ui;background:#fff"><p style="padding:2rem">The page underneath.</p>${html.replace('localStorage.getItem("vidhi-loader-seen")||sessionStorage.getItem("vidhi-loader-seen")', "false")}</body></html>`,
);
console.log("out/vidhi-loader.html", html.length, "chars");

if (siteModule) {
  writeFileSync(
    siteModule,
    `// Generated by motion/logo-loader/scripts/export-web.mjs from the Remotion
// source of the logo loader (paths, pen strokes and timing). Do not edit by
// hand: change the Remotion project and re-export.
export const LOADER_HTML = ${JSON.stringify(html)};
`,
  );
  console.log(siteModule, "written");
}
