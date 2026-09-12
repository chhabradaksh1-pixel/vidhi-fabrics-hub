import cottonLinen from "@/assets/fabric-cotton-linen.jpg";
import katanJacquard from "@/assets/fabric-katan-jacquard.jpg";
import { whatsAppUrl } from "@/lib/whatsapp";
import { COPY, type Lang } from "@/content/translations";
import { JOURNAL_COPY, SORTED_ARTICLES } from "@/content/journal";

const DESK_MESSAGE: Record<Lang, string> = {
  en: "Hello Vidhi Fabrics. I would like to use the Surat Fabric Desk for a requirement.",
  hi: "नमस्ते विधि फैब्रिक्स। मैं एक ज़रूरत के लिए सूरत फैब्रिक डेस्क का उपयोग करना चाहता/चाहती हूँ।",
  "hi-en":
    "Hello Vidhi Fabrics. Main ek requirement ke liye Surat Fabric Desk use karna chahta/chahti hoon.",
};

/** About Us — family story with a two-image fabric composition. */
export function AboutSection({ lang }: { lang: Lang }) {
  const copy = COPY.about;

  return (
    <section id="about" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
              {copy.marker[lang]}
            </p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold tracking-tight lg:text-5xl">
              {copy.heading[lang]}
            </h2>
            <p className="mt-6 max-w-[52ch] text-pretty text-lg text-mute">{copy.lede[lang]}</p>

            <h3 className="mt-10 font-mono text-[11px] uppercase tracking-[0.15em] text-clay">
              {copy.storyTitle[lang]}
            </h3>
            <div className="mt-4 space-y-4 text-pretty text-mute">
              {copy.story[lang].map((para) => (
                <p key={para.slice(0, 32)} className="max-w-[62ch]">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Two-image fabric composition — textile detail photographs already in
              the project, not depictions of the founder or the premises. */}
          <div className="lg:col-span-5">
            <div className="relative">
              <img
                src={cottonLinen}
                alt={copy.imageAltOne[lang]}
                loading="lazy"
                width={1024}
                height={1280}
                className="aspect-[4/5] w-full rounded-md object-cover ring-1 ring-black/5"
              />
              <img
                src={katanJacquard}
                alt={copy.imageAltTwo[lang]}
                loading="lazy"
                width={512}
                height={512}
                className="absolute -bottom-8 -left-6 hidden aspect-square w-40 rounded-md object-cover ring-4 ring-paper sm:block lg:w-48"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-line pt-10">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-clay">
            {copy.valuesTitle[lang]}
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {copy.values.map((value) => (
              <div key={value.title.en}>
                <h4 className="font-display text-xl font-semibold">{value.title[lang]}</h4>
                <p className="mt-2 text-sm text-mute">{value.body[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Surat Fabric Desk — how a buyer actually engages us. */
export function FabricDeskSection({ lang }: { lang: Lang }) {
  const copy = COPY.fabricDesk;

  return (
    <section id="desk" className="border-b border-line bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
          {copy.marker[lang]}
        </p>
        <h2 className="mt-3 max-w-[22ch] text-balance font-display text-4xl font-semibold tracking-tight lg:text-5xl">
          {copy.heading[lang]}
        </h2>
        <p className="mt-6 max-w-[58ch] text-pretty text-paper/70">{copy.body[lang]}</p>

        <ol className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {copy.steps.map((step, i) => (
            <li key={step.title.en} className="border-t border-paper/20 pt-5">
              <span className="font-mono text-xs text-clay">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-display text-xl font-semibold">{step.title[lang]}</h3>
              <p className="mt-2 text-sm text-paper/70">{step.body[lang]}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={whatsAppUrl(DESK_MESSAGE[lang])}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-clay px-6 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-claydeep"
          >
            {copy.cta[lang]}
          </a>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/50">
            {copy.note[lang]}
          </span>
        </div>
      </div>
    </section>
  );
}

/** Homepage teaser for /blog — three most recent buyer guides. */
export function JournalPreview({ lang }: { lang: Lang }) {
  const englishBadge = JOURNAL_COPY.englishOnly[lang];

  return (
    <section id="insights" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
              {JOURNAL_COPY.marker[lang]}
            </p>
            <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight">
              {JOURNAL_COPY.heading[lang]}
            </h2>
            <p className="mt-3 max-w-[55ch] text-sm text-mute">{JOURNAL_COPY.body[lang]}</p>
          </div>
          <a
            href="/blog"
            className="font-mono text-xs uppercase tracking-[0.12em] text-clay underline-offset-4 transition-colors hover:text-claydeep hover:underline"
          >
            {JOURNAL_COPY.readAll[lang]} →
          </a>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SORTED_ARTICLES.map((article) => (
            <a
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group overflow-hidden rounded-md bg-sand/40 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={article.image}
                alt={article.imageAlt}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-x-3 font-mono text-[11px] text-mute">
                  <time dateTime={article.date}>{article.date}</time>
                  <span>
                    {article.readMinutes} {JOURNAL_COPY.readSuffix[lang]}
                  </span>
                  {englishBadge ? (
                    <span className="rounded-sm bg-ink/5 px-1.5 py-0.5 text-ink/60">
                      {englishBadge}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-2 font-display text-xl font-semibold group-hover:text-claydeep">
                  {article.title}
                </h3>
                <p className="mt-1 text-sm text-mute">{article.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
