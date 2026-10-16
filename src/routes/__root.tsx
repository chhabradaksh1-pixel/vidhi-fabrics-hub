import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { localBusinessSchema } from "@/content/business";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { Analytics } from "@vercel/analytics/react";

import { LeadSourceTracker } from "@/components/lead-source-tracker";
import { NotFoundPage } from "@/components/not-found-page";
import { PromoSuitsTicker } from "@/components/promo-suits";
import { WhatsAppPill } from "@/components/whatsapp-pill";
import { GA4_ID } from "@/lib/analytics";
import { loadGtagDeferred } from "@/lib/deferred-gtag";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import interLatin from "../assets/fonts/inter-latin-wght.woff2?url";
import devanagariFont from "../assets/fonts/noto-sans-devanagari-wght.woff2?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

// The floating WhatsApp pill for every page other than the two home routes,
// which mount their own so it follows the Hinglish toggle.

/** `/hi` and everything under it; not merely any path starting "hi". */
function isHindiPath(pathname: string) {
  return /^\/hi(\/|$)/.test(pathname);
}

function isHomePath(pathname: string) {
  return pathname === "/" || pathname === "/hi" || pathname === "/hi/";
}

/**
 * Noto Sans Devanagari, declared and preloaded only on Hindi routes. English
 * pages used to download it via the shared Google Fonts stylesheet. Same file
 * Google Fonts served (v30, devanagari subset), self-hosted.
 */
function DevanagariFont() {
  return (
    <>
      <link
        rel="preload"
        href={devanagariFont}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <style>{`@font-face{font-family:"Noto Sans Devanagari";font-style:normal;font-weight:200 500;font-display:swap;src:url(${devanagariFont}) format("woff2");unicode-range:U+0900-097F,U+1CD0-1CF9,U+200C-200D,U+20A8,U+20B9,U+20F0,U+25CC,U+A830-A839,U+A8E0-A8FF,U+11B00-11B09}`}</style>
    </>
  );
}

function NotFoundComponent() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <NotFoundPage pathname={pathname} />;
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vidhi Fabrics | Surat Fabric Manufacturer & Wholesaler" },
      {
        name: "description",
        content: "Fabric manufacturer and wholesaler in Surat, trading since the 1960s.",
      },
      { name: "author", content: "Vidhi Fabrics" },
      { property: "og:site_name", content: "Vidhi Fabrics" },
      { property: "og:title", content: "Vidhi Fabrics | Surat Fabric Manufacturer & Wholesaler" },
      {
        property: "og:description",
        content: "Fabric manufacturer and wholesaler in Surat, trading since the 1960s.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.vidhifabrics.com/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Vidhi Fabrics" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://www.vidhifabrics.com/og-image.jpg" },
    ],
    links: [
      // Inter is self-hosted (see the @font-face rules in styles.css). The
      // latin file carries every weight the site uses, so preloading it lets
      // text paint in Inter without waiting for the CSS to be parsed first.
      {
        rel: "preload",
        href: interLatin,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      // The SVG scales to any size in modern browsers; the .ico carries 16,
      // 32 and 48px frames for older ones and for Google's search results,
      // which reads the 48px frame.
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    // One LocalBusiness record for the whole site, so the name, address and
    // phone a crawler reads are the same strings the footer renders.
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessSchema("https://www.vidhifabrics.com")),
      },
      /*
       * Google Ads tag, for conversion tracking and remarketing on the
       * AW-11259228096 account. Installed at the owner's request.
       *
       * The library is loaded after the page (src/lib/deferred-gtag.ts), not
       * here, so it never competes with first paint. The init below only
       * touches `window.dataLayer`, deliberately — a head script that mutates
       * the DOM before hydration desynchronises React and blanks the page,
       * which has already happened once on this site. Nothing here reads or
       * writes the document.
       *
       * Two things this brings with it, recorded because they are easy to
       * forget. Google Ads requires advertisers to disclose cookie and data
       * collection in a privacy policy, and this site has none. And it is the
       * second analytics provider on the page alongside Vercel Analytics, so
       * `CLAUDE.md`'s rule about not adding one has been amended rather than
       * quietly broken.
       */
      // gtag.js itself is no longer loaded here: loadGtagDeferred() (see
      // src/lib/deferred-gtag.ts) adds it after load or on first interaction.
      // The queue below is what keeps every early event and config call.
      {
        children: [
          "window.dataLayer = window.dataLayer || [];",
          "function gtag(){dataLayer.push(arguments);}",
          "gtag('js', new Date());",
          "gtag('config', 'AW-11259228096');",
          // GA4, only when VITE_GA4_ID is set in the build environment (see
          // src/lib/analytics.ts). The ID is validated as "G-XXXX" there.
          ...(GA4_ID ? [`gtag('config', '${GA4_ID}');`] : []),
        ].join("\n"),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isHindi = isHindiPath(pathname);
  return (
    <html lang={isHindi ? "hi" : "en"} className="vf-js">
      <head>
        <HeadContent />
        {isHindi ? <DevanagariFont /> : null}
        {/*
          `vf-js` arms the scroll-reveal staging in styles.css.

          It is server-rendered rather than added by an inline script. Adding
          it to <html> before hydration makes the client tree differ from the
          server one, and React responds by discarding the render — that blanks
          the whole page, which is exactly what happened when this was a
          script.

          The cost of server-rendering it is that the class is present even
          when JS is unavailable, so the <noscript> below releases every staged
          element: the observer that would have revealed them is never going to
          run, and half-visible content is worse than unanimated content.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-reveal-img] img,[data-reveal-block] [data-reveal-panel],[data-reveal-block] [data-reveal-panel] img{transform:none!important}[data-vf-launcher],[data-vf-launcher-in]{transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <Analytics />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    loadGtagDeferred();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      {/* Home routes mount their own ticker so it follows the Hinglish toggle. */}
      {isHomePath(pathname) ? null : (
        <PromoSuitsTicker lang={isHindiPath(pathname) ? "hi" : "en"} />
      )}
      <Outlet />
      <LeadSourceTracker />
      {hydrated && !isHomePath(pathname) ? (
        <WhatsAppPill lang={isHindiPath(pathname) ? "hi" : "en"} />
      ) : null}
    </QueryClientProvider>
  );
}
