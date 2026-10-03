import logoMark from "@/assets/vidhi-logo-mark.png";
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
  const label =
    lang === "hi" ? "text-sm text-mute" : "font-mono text-xs uppercase tracking-[0.18em] text-mute";
  const button =
    "mt-4 inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 text-paper transition-colors hover:bg-claydeep " +
    (lang === "hi" ? "text-sm" : "font-mono text-xs uppercase tracking-[0.12em]");
  return (
    <main
      data-lead-page={lang === "hi" ? "ERRH" : "ERR"}
      lang={lang}
      className="flex min-h-screen items-center justify-center bg-paper px-6 py-16 text-ink"
    >
      {/* React 19 hoists this into <head>. */}
      <meta name="robots" content="noindex, follow" />
      <div className="w-full max-w-xl">
        <a href={lang === "hi" ? "/hi" : "/"} aria-label="Vidhi Fabrics">
          <img
            src={logoMark}
            alt="Vidhi Fabrics"
            width={348}
            height={332}
            className="h-14 w-auto"
          />
        </a>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-mute">404</p>
        <h1 className="mt-3 font-display text-3xl font-light sm:text-4xl">{copy.heading}</h1>
        <p className="mt-4 leading-[1.8] text-mute">{copy.body}</p>

        <nav aria-label={copy.linksLabel} className="mt-8">
          <h2 className={label}>{copy.linksLabel}</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {copy.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-3 text-ink transition-colors hover:text-clay"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 rounded-md bg-sand/60 p-6 ring-1 ring-black/5">
          <p className="text-ink">{copy.whatsappPrompt}</p>
          <a
            href={whatsAppUrl(copy.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={button}
          >
            {copy.whatsappButton}
          </a>
        </div>
      </div>
    </main>
  );
}
