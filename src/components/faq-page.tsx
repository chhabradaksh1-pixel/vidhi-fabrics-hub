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

const linkClass = "text-clay underline decoration-clay/70 underline-offset-4 hover:text-claydeep";

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

export function FaqPageView({ copy }: { copy: FaqCopy }) {
  const home = copy.lang === "hi" ? "/hi" : "/";
  return (
    <div className="min-h-screen bg-paper text-ink">
      <JournalHeader lang={copy.lang} />
      <main>
        <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16" lang={copy.lang}>
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
          <h1 className="vf-showroom-serif mt-6 text-balance text-4xl leading-[1.08] sm:text-5xl">
            {copy.h1}
          </h1>
          <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-mute sm:text-lg">
            {copy.lede}
          </p>

          <Accordion type="single" collapsible className="mt-10">
            {copy.faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="group/faq border-line"
              >
                <AccordionTrigger
                  aria-controls={`faq-panel-${index}`}
                  className="font-display text-lg font-light text-ink hover:no-underline"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionPanel
                  id={`faq-panel-${index}`}
                  className="max-w-2xl text-base leading-relaxed text-mute"
                >
                  <Parts parts={faq.answer} lang={copy.lang} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 border-t border-line pt-8">
            <a
              href={whatsAppUrl(copy.catalogueMessage)}
              data-lead-ref={FAQ_LEAD_REF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-sm bg-clay px-6 py-3 font-mono text-xs uppercase tracking-label text-paper transition-colors hover:bg-claydeep"
            >
              {copy.catalogueLabel}
            </a>
            <p className="mt-3 text-sm text-mute">{BUSINESS.phoneDisplay}</p>
          </div>
        </article>
      </main>
      <JournalFooter lang={copy.lang} />
    </div>
  );
}
