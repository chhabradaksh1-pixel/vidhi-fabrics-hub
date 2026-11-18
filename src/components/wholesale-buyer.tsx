import { WHOLESALE_BUYER, WHOLESALE_LINKS, wholesaleBuyerLink } from "@/content/wholesale-buyer";
import type { Lang } from "@/content/translations";

/** Short section for wholesale buyers, directly after the hero. */
export function WholesaleBuyerSection({ lang }: { lang: Lang }) {
  const prefix = lang === "hi" ? "/hi" : "";
  return (
    <section
      id="wholesale"
      aria-labelledby="wholesale-buyer"
      data-reveal
      className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-11 lg:px-[50px] lg:py-14"
    >
      <h2 id="wholesale-buyer" className="type-h2 max-w-[16ch]">
        {WHOLESALE_BUYER.heading[lang]}
      </h2>
      <p className="mt-5 max-w-[42ch] type-body text-foreground">{WHOLESALE_BUYER.line1[lang]}</p>
      <p className="mt-3 max-w-[42ch] type-body text-mute">{WHOLESALE_BUYER.line2[lang]}</p>
      <ul className="mt-6 flex flex-col items-start gap-3">
        {WHOLESALE_LINKS.map((link) => (
          <li key={link.href}>
            <a href={`${prefix}${link.href}`} className="link-arrow">
              {link.label[lang]}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={wholesaleBuyerLink(lang)}
        target="_blank"
        rel="noopener noreferrer"
        data-magnet
        className="btn btn-primary mt-8 w-full sm:w-auto"
      >
        {WHOLESALE_BUYER.cta[lang]}
      </a>
    </section>
  );
}
