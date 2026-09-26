import { ArrowUpRight, Linkedin, MessageCircle } from "lucide-react";

import heritageIllustration from "@/assets/footer-heritage-illustration.jpg";
import {
  FOOTER_COLUMNS,
  FOOTER_CONTACT,
  FOOTER_CTA,
  FOOTER_CTA_MESSAGE,
  FOOTER_RIGHTS,
  FOOTER_TAGLINE,
  LINKEDIN_URL,
  type FooterLink,
} from "@/content/footer-copy";
import { ADDRESS_LINES, BUSINESS } from "@/content/business";
import type { Lang } from "@/content/translations";
import { whatsAppUrl } from "@/content/whatsapp";

/**
 * Resolves a footer link for the language being shown. In-page anchors are
 * prefixed with the language's home path so they work from the journal routes
 * as well as the home page.
 */
function resolveHref(link: FooterLink, lang: Lang, home: string) {
  if (link.whatsApp) return whatsAppUrl(link.whatsApp[lang]);
  const href = link.href ?? "/";
  if (href.startsWith("#")) return `${home}${href}`;
  if (lang === "hi" && href.startsWith("/blog")) return `/hi${href}`;
  return href;
}

export function SiteFooter({ lang = "en" }: { lang?: Lang }) {
  const home = lang === "hi" ? "/hi" : "/";
  const contact = FOOTER_CONTACT[lang];
  const linkClass =
    "inline-block text-sm text-ivory/70 transition-colors hover:text-gold " +
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
    "focus-visible:outline-gold";

  return (
    <>
      {/*
       * Brand illustration, on its own paper ground rather than inside the
       * footer proper. The artwork was composed against white — it has a
       * large transparent "sky" area meant to read as backdrop, not as a
       * window onto whatever sits behind it — so placing it directly on the
       * footer's dark vf-weave ground would leave a hollow black gap across
       * the top third of the image. A dedicated band above the footer lets
       * it render on the ground it was designed for.
       */}
      <div className="bg-paper">
        <img
          src={heritageIllustration}
          alt="Vidhi Fabrics — from raw yarn to the finished weave, Surat"
          className="mx-auto block h-auto w-full max-w-5xl"
          loading="lazy"
        />
      </div>
      <footer className="vf-weave relative overflow-hidden border-t border-gold/45 text-ivory">
        {/* Two arcs of a very wide ellipse: the flowing line, drawn by CSS. */}
        <div
          aria-hidden="true"
          className="vf-wave -top-24 h-72 border-gold/25 sm:-top-32 sm:h-96"
        />
        <div
          aria-hidden="true"
          className="vf-wave -top-10 h-56 border-gold/10 sm:-top-16 sm:h-72"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-4 lg:gap-10">
            {/* Brand */}
            <div>
              <a
                href={home}
                className="font-display text-2xl font-light tracking-tight text-ivory transition-colors hover:text-gold"
              >
                Vidhi Fabrics
              </a>
              <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-ivory/75">
                {FOOTER_TAGLINE[lang]}
              </p>
              <a
                href={whatsAppUrl(FOOTER_CTA_MESSAGE[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2.5 whitespace-nowrap border border-gold/70 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-gold transition-colors hover:bg-gold hover:text-navy"
              >
                {FOOTER_CTA[lang]}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>

            {/* Three navigation columns, spanning the two middle columns */}
            <nav
              aria-label={lang === "hi" ? "फुटर नेविगेशन" : "Footer navigation"}
              className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2"
            >
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.heading.en}>
                  {/*
                  Deliberately not a heading. These are navigation labels, and
                  as <h2> they took over the document outline on pages whose
                  own content sits at h3 — /blog had nothing but footer labels
                  at the h2 level. The list is associated with its label for
                  assistive technology instead.
                */}
                  <p
                    id={`footer-${column.heading.en.toLowerCase()}`}
                    className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold"
                  >
                    {column.heading[lang]}
                  </p>
                  <ul
                    aria-labelledby={`footer-${column.heading.en.toLowerCase()}`}
                    className="mt-5 space-y-3"
                  >
                    {column.links.map((link) => (
                      <li key={link.label.en}>
                        <a
                          href={resolveHref(link, lang, home)}
                          {...(link.whatsApp
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className={linkClass}
                        >
                          {link.label[lang]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            {/* Contact */}
            <div>
              <p
                id="footer-contact"
                className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold"
              >
                {contact.heading}
              </p>
              <address
                aria-labelledby="footer-contact"
                className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-ivory/75"
              >
                <p>
                  {ADDRESS_LINES[lang].map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <p>{contact.hours}</p>
                {/*
                Each link sits in its own block so the rows never depend on
                the column being too narrow to fit them side by side.
              */}
                <p>
                  <a href={`tel:${BUSINESS.phone}`} className={linkClass}>
                    {BUSINESS.phoneDisplay}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${BUSINESS.email}`} className={`${linkClass} break-all`}>
                    {BUSINESS.email}
                  </a>
                </p>
                <p>
                  <a
                    href={whatsAppUrl(FOOTER_CTA_MESSAGE[lang])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {lang === "hi" ? "व्हाट्सएप" : "WhatsApp"}
                  </a>
                </p>
              </address>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t border-ivory/12 pt-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ivory/55">
              {FOOTER_RIGHTS[lang]}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Vidhi Fabrics on LinkedIn"
                className="grid size-10 place-items-center rounded-full border border-ivory/20 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Linkedin size={17} aria-hidden="true" />
              </a>
              <a
                href={whatsAppUrl(FOOTER_CTA_MESSAGE[lang])}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === "hi" ? "व्हाट्सएप पर बात करें" : "Message us on WhatsApp"}
                className="grid size-10 place-items-center rounded-full border border-ivory/20 text-ivory/70 transition-colors hover:border-gold hover:text-gold"
              >
                <MessageCircle size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
