import { JournalFooter, JournalHeader } from "@/components/fabric-desk";
import { PromoSareeLine } from "@/components/promo-suits";
import type { TextPart, WholesaleCopy } from "@/content/wholesale-pages";
import { whatsAppUrl } from "@/content/whatsapp";
import { BUSINESS } from "@/content/business";

const linkClass = "link";

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
      className={`btn btn-primary ${className}`}
    >
      {copy.catalogueLabel}
    </a>
  );
}

/**
 * A range page (polyester sarees, unstitched suits) on the long-form rail: the
 * title across, the intro and catalogue button in the content column, then the
 * body as .vf-flow (styles.css): each h2 in the rail beside its text, the text
 * running to the right edge. Layout only; every word and link is in place.
 */
export function WholesaleLanding({ copy }: { copy: WholesaleCopy }) {
  const home = copy.lang === "hi" ? "/hi" : "/";
  return (
    <div className="min-h-screen bg-linen text-ink">
      <JournalHeader lang={copy.lang} />
      <main>
        <article
          className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 sm:pt-11 lg:px-[50px] lg:pb-24 lg:pt-14"
          lang={copy.lang}
        >
          <nav aria-label="Breadcrumb" className="type-small text-mute">
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

          <h1 className="mt-6 max-w-[28ch] type-h1">{copy.h1}</h1>
          <div className="vf-indent mt-8 space-y-4 type-lead text-mute">
            {copy.intro.map((paragraph, index) => (
              <p key={index}>
                <Parts parts={paragraph} copy={copy} />
              </p>
            ))}
          </div>

          <CatalogueButton copy={copy} className="vf-indent mt-8" />
          {copy.sareePromo ? (
            <div className="vf-indent">
              <PromoSareeLine lang={copy.lang} />
            </div>
          ) : null}

          <div className="vf-flow">
            <h2 className="vf-heading-strong type-h4 text-ink">{copy.whyHeading}</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 type-body text-ink">
              {copy.why.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {copy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="vf-heading-strong type-h4 text-ink">{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="mt-5 type-body text-mute">
                    <Parts parts={paragraph} copy={copy} />
                  </p>
                ))}
              </section>
            ))}

            <section id="faq" className="scroll-mt-28">
              <h2 className="vf-heading-strong type-h4 text-ink">{copy.faqHeading}</h2>
              {copy.faqs.map((entry) => (
                <div key={entry.question} className="mt-7">
                  <h3 className="type-h4">{entry.question}</h3>
                  <p className="mt-3 type-body text-mute">{entry.answer}</p>
                </div>
              ))}
            </section>

            <div className="vf-flow-end">
              <CatalogueButton copy={copy} />
            </div>
          </div>
        </article>
      </main>
      <JournalFooter lang={copy.lang} />
    </div>
  );
}
