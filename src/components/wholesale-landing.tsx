import { JournalFooter, JournalHeader } from "@/components/fabric-desk";
import { PromoSareeLine } from "@/components/promo-suits";
import type { TextPart, WholesaleCopy } from "@/content/wholesale-pages";
import { whatsAppUrl } from "@/content/whatsapp";
import { BUSINESS } from "@/content/business";

const linkClass = "text-clay underline decoration-clay/70 underline-offset-4 hover:text-claydeep";

function pageHref(path: string, lang: WholesaleCopy["lang"]) {
  return lang === "hi" ? `/hi${path}` : path;
}

function Parts({ parts, copy }: { parts: TextPart[]; copy: WholesaleCopy }) {
  return parts.map((part, index) => {
    if (typeof part === "string") return <span key={index}>{part}</span>;
    if ("whatsapp" in part) {
      return (
        <a
          key={index}
          href={whatsAppUrl(copy.catalogueMessage)}
          data-lead-ref={copy.leadRef}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {BUSINESS.phoneDisplay}
        </a>
      );
    }
    return (
      <a key={index} href={pageHref(part.href, copy.lang)} className={linkClass}>
        {part.text}
      </a>
    );
  });
}

function CatalogueButton({ copy, className = "" }: { copy: WholesaleCopy; className?: string }) {
  return (
    <a
      href={whatsAppUrl(copy.catalogueMessage)}
      data-lead-ref={copy.leadRef}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-claydeep ${className}`}
    >
      {copy.catalogueLabel}
    </a>
  );
}

export function WholesaleLanding({ copy }: { copy: WholesaleCopy }) {
  const home = copy.lang === "hi" ? "/hi" : "/";
  return (
    <div className="min-h-screen bg-paper text-ink">
      <JournalHeader lang={copy.lang} />
      <main>
        <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16" lang={copy.lang}>
          <nav aria-label="Breadcrumb" className="text-xs text-mute">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href={home} className="hover:text-clay">
                  Vidhi Fabrics
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">{copy.breadcrumb}</li>
            </ol>
          </nav>

          <h1 className="vf-showroom-serif mt-6 text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            {copy.h1}
          </h1>
          <div className="mx-auto mt-6 max-w-[65ch] space-y-4 text-base leading-relaxed text-mute sm:text-lg">
            {copy.intro.map((paragraph, index) => (
              <p key={index}>
                <Parts parts={paragraph} copy={copy} />
              </p>
            ))}
          </div>

          <CatalogueButton copy={copy} className="mt-8" />
          {copy.sareePromo ? <PromoSareeLine lang={copy.lang} /> : null}

          <div className="mx-auto max-w-[65ch]">
            <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">{copy.whyHeading}</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink">
              {copy.why.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {copy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mt-12 font-display text-2xl font-light sm:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="mt-5 leading-[1.85] text-mute">
                    <Parts parts={paragraph} copy={copy} />
                  </p>
                ))}
              </section>
            ))}

            <section id="faq" className="mt-12 scroll-mt-8 border-t border-line pt-8">
              <h2 className="font-display text-2xl font-light sm:text-3xl">{copy.faqHeading}</h2>
              {copy.faqs.map((entry) => (
                <div key={entry.question} className="mt-7">
                  <h3 className="font-display text-lg font-light leading-snug">{entry.question}</h3>
                  <p className="mt-3 leading-[1.85] text-mute">{entry.answer}</p>
                </div>
              ))}
            </section>

            <div className="my-12 flex justify-center border-t border-line pt-10">
              <CatalogueButton copy={copy} />
            </div>
          </div>
        </article>
      </main>
      <JournalFooter lang={copy.lang} />
    </div>
  );
}
