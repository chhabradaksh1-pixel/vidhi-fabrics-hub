import { JournalFooter, JournalHeader } from "@/components/fabric-desk";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_LEAD_REF, type FaqCopy, type FaqPart } from "@/content/faq-page";
import { BUSINESS } from "@/content/business";
import { whatsAppUrl } from "@/content/whatsapp";

const linkClass = "link";

function pageHref(path: string, lang: FaqCopy["lang"]) {
  return lang === "hi" ? `/hi${path}` : path;
}

function Parts({ parts, lang }: { parts: FaqPart[]; lang: FaqCopy["lang"] }) {
  return parts.map((part, index) =>
    typeof part === "string" ? (
      <span key={index}>{part}</span>
    ) : (
      <a key={index} href={pageHref(part.href, lang)} className={linkClass}>
        {part.text}
      </a>
    ),
  );
}

/**
 * The FAQ on the long-form rail, like the range pages: the title across the
 * top, the lede, the questions and the closing button in the content column
 * (`.vf-indent`), on the linen ground. Layout only; every word is in place.
 */
export function FaqPageView({ copy }: { copy: FaqCopy }) {
  const home = copy.lang === "hi" ? "/hi" : "/";
  return (
    <div className="min-h-screen bg-linen text-ink">
      <JournalHeader lang={copy.lang} />
      <main>
        <article
          className="vf-longform mx-auto w-full max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 sm:pt-11 lg:px-[50px] lg:pb-24 lg:pt-14"
          lang={copy.lang}
        >
          <nav aria-label="Breadcrumb" className="type-small text-mute">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href={home} className="hover:text-plum">
                  Vidhi Fabrics
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink">{copy.breadcrumb}</li>
            </ol>
          </nav>
          <h1 className="mt-6 max-w-[28ch] type-h1">{copy.h1}</h1>
          <p className="vf-indent mt-8 type-lead text-mute">{copy.lede}</p>

          <Accordion type="single" collapsible className="vf-indent mt-10 border-t border-line">
            {copy.faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="group/faq border-line"
              >
                <AccordionTrigger
                  aria-controls={`faq-panel-${index}`}
                  className="type-h4 text-ink hover:no-underline"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionPanel id={`faq-panel-${index}`} className="type-body text-mute">
                  <Parts parts={faq.answer} lang={copy.lang} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="vf-indent mt-10 border-t border-line pt-8">
            <a
              href={whatsAppUrl(copy.catalogueMessage)}
              data-lead-ref={FAQ_LEAD_REF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {copy.catalogueLabel}
            </a>
            <p className="mt-3 type-small text-mute">{BUSINESS.phoneDisplay}</p>
          </div>
        </article>
      </main>
      <JournalFooter lang={copy.lang} />
    </div>
  );
}
