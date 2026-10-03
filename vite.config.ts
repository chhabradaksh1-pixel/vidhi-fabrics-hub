// @lovable.dev/vite-tanstack-config already includes the following, do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

type NitroOptions = Exclude<
  Exclude<Parameters<typeof defineConfig>[0], undefined>["nitro"],
  undefined
>;

// Options for nitro, which the Lovable config adds on build and forwards as-is.
// Only the Vercel preset reads `vercel` (nitro picks that preset automatically
// when building on Vercel); the Cloudflare build used by Lovable ignores it,
// and the default Cloudflare fallback is kept. The Lovable wrapper's type only
// lists a few nitro keys, hence the cast.
const nitroOptions = {
  vercel: {
    // Run the server function in Mumbai, next to the buyers, instead of
    // Vercel's default iad1 (Washington DC). Nitro writes this into the
    // function's .vc-config.json, which Vercel's Build Output API reads.
    functions: { regions: ["bom1"] },
  },
} as unknown as NitroOptions;

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: nitroOptions,
});
