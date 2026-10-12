/**
 * Nitro's Vercel preset writes `.vercel/output/config.json` and a prebuilt
 * deploy reads that file, not the root vercel.json. Copy the host 301s into
 * the generated routes so they actually run on Vercel. A non-Vercel build
 * (local, Lovable's Cloudflare output) has no such file and is left alone.
 *
 * The low-level `src` is `^/(.*)$` rather than path-to-regexp's `/:path*`
 * pattern, because that pattern does not match `/` and the homepage would
 * skip the redirect.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const CONFIG_PATH = ".vercel/output/config.json";
const DESTINATION = "https://www.vidhifabrics.com/:path*";
const LOCATION = "https://www.vidhifabrics.com/$1";
const SRC = "^/(.*)$";

const pathCases = [
  ["/", "https://www.vidhifabrics.com/"],
  ["/about", "https://www.vidhifabrics.com/about"],
  ["/blog/fabric-width-and-costing", "https://www.vidhifabrics.com/blog/fabric-width-and-costing"],
  [
    "/hi/blog/how-to-read-a-fabric-spec",
    "https://www.vidhifabrics.com/hi/blog/how-to-read-a-fabric-spec",
  ],
];

function assertPathPattern() {
  const re = new RegExp(SRC);
  for (const [path, expected] of pathCases) {
    const match = path.match(re);
    if (!match) throw new Error(`Host redirect pattern missed ${path}`);
    const location = LOCATION.replace("$1", match[1] ?? "");
    if (location !== expected) {
      throw new Error(`Host redirect for ${path} produced ${location}, expected ${expected}`);
    }
  }
}

function hostRedirectRoutes(redirects) {
  return redirects.map((redirect, index) => {
    if (redirect.source !== "/:path*") {
      throw new Error(`Redirect ${index} must use source /:path*`);
    }
    if (redirect.destination !== DESTINATION) {
      throw new Error(`Redirect ${index} must destination ${DESTINATION}`);
    }
    if (redirect.statusCode !== 301) {
      throw new Error(`Redirect ${index} must be statusCode 301`);
    }
    if (!Array.isArray(redirect.has) || redirect.has.length === 0) {
      throw new Error(`Redirect ${index} needs a has condition so it cannot loop on www`);
    }
    return {
      src: SRC,
      has: redirect.has,
      status: 301,
      headers: { Location: LOCATION },
    };
  });
}

function alreadyInjected(routes) {
  return routes.some(
    (route) => route?.status === 301 && route?.headers?.Location === LOCATION && route?.src === SRC,
  );
}

assertPathPattern();

if (!existsSync(CONFIG_PATH)) {
  if (process.env.VERCEL) {
    console.error(
      `${CONFIG_PATH} is missing on a Vercel build, so the host 301s were not installed.`,
    );
    process.exit(1);
  }
  console.log(`No ${CONFIG_PATH}; host 301s stay in vercel.json until a Vercel build.`);
  process.exit(0);
}

const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
const injected = hostRedirectRoutes(vercel.redirects ?? []);
const config = JSON.parse(readFileSync(CONFIG_PATH, "utf8"));
const routes = Array.isArray(config.routes) ? config.routes : [];
if (alreadyInjected(routes)) {
  console.log("Canonical host 301s already present in the Vercel output config.");
  process.exit(0);
}

config.routes = [...injected, ...routes];
writeFileSync(CONFIG_PATH, `${JSON.stringify(config, null, 2)}\n`);
console.log(`Installed ${injected.length} canonical host 301s at the front of ${CONFIG_PATH}.`);
