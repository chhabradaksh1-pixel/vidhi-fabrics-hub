import { ArrowRight } from "lucide-react";

import logoMark from "@/assets/vidhi-logo-mark.webp";
import { whatsAppUrl } from "@/content/whatsapp";

/**
 * Friendly 404 page, English, or Hindi under /hi. Rendered by the root
 * route's notFoundComponent, so the server still answers with HTTP 404;
 * src/server.ts also adds an `X-Robots-Tag: noindex` header to every 404.
 *
 * `data-lead-page` makes the lead tracker tag WhatsApp messages from here as
 * ERR / ERRH instead of OTH (see docs/lead-source-legend.md).
 */
type Copy = {
  heading: string;
  body: string;
  linksLabel: string;
  links: { href: string; label: string }[];
  whatsappPrompt: string;
  whatsappButton: string;
  whatsappMessage: string;
};

const COPY: Record<"en" | "hi", Copy> = {
  en: {
    heading: "We couldn't find that page",
    body: "The link may be old or mistyped. These pages should help, or message us on WhatsApp and we'll point you to the right catalogue.",
    linksLabel: "Popular pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/polyester-sarees-wholesale-surat", label: "Polyester sarees wholesale" },
      { href: "/dress-material-wholesale-surat", label: "Dress material wholesale" },
      { href: "/saree-wholesale-for-resellers", label: "Sarees for resellers" },
      { href: "/organza-net-fabric-for-boutiques", label: "Organza & net for boutiques" },
      {
        href: "/diwali-karva-chauth-wholesale-surat",
        label: "Diwali & Karva Chauth wholesale",
      },
      { href: "/reseller-circle", label: "Join the Vidhi Reseller Circle" },
      { href: "/blog", label: "The Fabric Desk (blog)" },
    ],
    whatsappPrompt: "Looking for something specific?",
    whatsappButton: "Ask us on WhatsApp",
    whatsappMessage: "Hi Vidhi Fabrics, I couldn't find a page on your website. Can you help?",
  },
  hi: {
    heading: "यह पेज नहीं मिला",
    body: "हो सकता है लिंक पुराना हो या गलत टाइप हुआ हो। नीचे दिए पेज देखिए, या व्हाट्सएप पर मैसेज कीजिए, हम आपको सही कैटलॉग तक पहुँचा देंगे।",
    linksLabel: "मुख्य पेज",
    links: [
      { href: "/hi", label: "होम" },
      { href: "/hi/polyester-sarees-wholesale-surat", label: "पॉलिएस्टर साड़ियाँ होलसेल" },
      { href: "/hi/dress-material-wholesale-surat", label: "ड्रेस मटेरियल होलसेल" },
      { href: "/hi/saree-wholesale-for-resellers", label: "रीसेलर के लिए साड़ियाँ" },
      { href: "/hi/organza-net-fabric-for-boutiques", label: "बुटीक के लिए ऑर्गेंज़ा और नेट" },
      {
        href: "/hi/diwali-karva-chauth-wholesale-surat",
        label: "दिवाली और करवा चौथ होलसेल",
      },
      { href: "/hi/reseller-circle", label: "विधि रीसेलर सर्कल से जुड़िए" },
      { href: "/hi/blog", label: "फैब्रिक डेस्क (ब्लॉग)" },
    ],
    whatsappPrompt: "कुछ खास ढूँढ रहे हैं?",
    whatsappButton: "व्हाट्सएप पर पूछिए",
    whatsappMessage:
      "नमस्ते विधि फैब्रिक्स, मुझे आपकी वेबसाइट पर एक पेज नहीं मिला। क्या आप मदद करेंगे?",
  },
};

function isHindiPath(pathname: string): boolean {
  return pathname === "/hi" || pathname.startsWith("/hi/");
}

export function NotFoundPage({ pathname }: { pathname: string }) {
  const lang = isHindiPath(pathname) ? "hi" : "en";
  const copy = COPY[lang];
  // Letter-spacing and the mono face break up Devanagari, so Hindi labels
  // keep normal spacing.
  const label = lang === "hi" ? "type-small text-mute" : "type-label text-mute";
  // On the linen ground and the home grid: the message on the left, the
  // ways onward on the right (stacked on a phone), with the site's plum
  // button and white card. No header is added, so the page's text and links
  // are unchanged.
  return (
    <main
      data-lead-page={lang === "hi" ? "ERRH" : "ERR"}
      lang={lang}
      className="flex min-h-screen items-center bg-linen py-16 text-ink"
    >
      {/* React 19 hoists this into <head>. */}
      <meta name="robots" content="noindex, follow" />
      <div className="mx-auto grid w-full max-w-[1440px] gap-y-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-x-16 lg:px-[50px]">
        <div className="lg:col-span-5">
          <a href={lang === "hi" ? "/hi" : "/"} aria-label="Vidhi Fabrics">
            <img
              src={logoMark}
              alt="Vidhi Fabrics"
              width={210}
              height={200}
              className="h-14 w-auto"
            />
          </a>
          <p className="mt-10 eyebrow type-label text-clay">404</p>
          <h1 className="mt-3 type-h1">{copy.heading}</h1>
          <p className="mt-5 type-lead text-mute">{copy.body}</p>
        </div>

        <div className="lg:col-span-7 lg:pt-24">
          <nav aria-label={copy.linksLabel}>
            <h2 className={label}>{copy.linksLabel}</h2>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {copy.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group flex min-h-12 items-center justify-between gap-4 py-3 type-body text-ink transition-colors hover:text-plum"
                  >
                    {link.label}
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-plum transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="card mt-8 p-6 sm:p-8">
            <p className="type-body text-ink">{copy.whatsappPrompt}</p>
            <a
              href={whatsAppUrl(copy.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-4"
            >
              {copy.whatsappButton}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
