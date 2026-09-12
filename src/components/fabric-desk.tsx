import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import cotton from "@/assets/fabric-cotton-linen.jpg";
import jacquard from "@/assets/fabric-katan-jacquard.jpg";
import { JOURNAL, readingMinutes, type JournalArticle } from "@/content/journal";
import type { Lang } from "@/content/translations";

const SECTION_COPY = {
  en: {
    about: "About us",
    desk: "Fabric Desk",
    marker: "Our story / Surat, India",
    title: "Sixty years in the textile trade.",
    titleEnd: "All of it from Surat.",
    body: "Vidhi Fabrics has been trading cloth in Surat since the 1960s — more than sixty years in the same city and the same industry. The mills, dyers and finishers we work with are ones we have known for decades, not names off a list.",
    bodyEnd:
      "That network is what you get access to. Send a swatch, a photograph or a rough idea, and we will tell you what it is, what it costs and how soon it can reach you — and say so plainly when a fabric or a deadline will not work.",
    cta: "Talk to our team",
    detail: "Rooted in Surat. Connected through textiles.",
    journal: "The journal / For textile buyers",
    subtitle: "Practical guides to fabrics, sourcing and buying wholesale.",
    browse: "Explore the desk",
    read: "Read article",
    language: "Articles in English",
  },
  hi: {
    about: "हमारे बारे में",
    desk: "फैब्रिक डेस्क",
    marker: "हमारी कहानी / सूरत, भारत",
    title: "साठ साल से कपड़ा व्यापार में।",
    titleEnd: "और यह सब सूरत से।",
    body: "विधि फैब्रिक्स 1960 के दशक से सूरत में कपड़े का व्यापार कर रहा है — उसी शहर और उसी उद्योग में साठ साल से ज़्यादा। जिन मिलों, रंगाई और फ़िनिशिंग वालों के साथ हम काम करते हैं, उन्हें हम दशकों से जानते हैं, किसी सूची से चुने नाम नहीं।",
    bodyEnd:
      "यही नेटवर्क आपके लिए खुलता है। एक स्वैच, एक तस्वीर या मोटा-मोटा ख़याल भेजिए — हम बताएँगे कि वह क्या है, कीमत क्या होगी और कितनी जल्दी पहुँचेगा। और अगर कोई कपड़ा या समय-सीमा मुमकिन नहीं, तो साफ़ कह देंगे।",
    cta: "हमारी टीम से बात करें",
    detail: "सूरत से जुड़े। कपड़ों के रिश्तों से आगे बढ़ते।",
    journal: "जानकारी / टेक्सटाइल खरीदारों के लिए",
    subtitle: "कपड़ों, सोर्सिंग और थोक खरीदारी के लिए उपयोगी गाइड।",
    browse: "सभी लेख देखें",
    read: "लेख पढ़ें",
    language: "लेख अंग्रेज़ी में हैं",
  },
  "hi-en": {
    about: "Hamare baare mein",
    desk: "Fabric Desk",
    marker: "Hamari kahani / Surat, India",
    title: "Saath saal se textile trade mein.",
    titleEnd: "Aur yeh sab Surat se.",
    body: "Vidhi Fabrics 1960s se Surat mein kapde ka vyapar kar raha hai — usi sheher aur usi industry mein saath saal se zyada. Jin mills, dyers aur finishers ke saath hum kaam karte hain, unhe hum decades se jaante hain, kisi list se chune naam nahi.",
    bodyEnd:
      "Yahi network aapke liye khulta hai. Ek swatch, ek photo ya mota-mota idea bhejiye — hum batayenge ki wo kya hai, price kya hogi aur kitni jaldi pahunchega. Aur agar koi fabric ya deadline mumkin nahi, to saaf keh denge.",
    cta: "Hamari team se baat karein",
    detail: "Surat se jude. Textiles ke rishton se aage.",
    journal: "The journal / Textile buyers ke liye",
    subtitle: "Fabrics, sourcing aur wholesale buying ke practical guides.",
    browse: "Saare articles dekhein",
    read: "Article padhein",
    language: "Articles English mein hain",
  },
};

export function StoryLinks({ lang = "en" }: { lang?: Lang }) {
  const copy = SECTION_COPY[lang];
  return (
    <>
      <a href="#about" className="transition-colors hover:text-clay">
        {copy.about}
      </a>
      <a href="/blog" className="transition-colors hover:text-clay">
        {copy.desk}
      </a>
    </>
  );
}

export function AboutSection({ lang, whatsappUrl }: { lang: Lang; whatsappUrl: string }) {
  const copy = SECTION_COPY[lang];
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-36 border-b border-line bg-sand"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
        <div className="relative pb-12 pr-10 sm:pr-16">
          <img
            src={jacquard}
            alt="Rust-red fabric with intricate woven motifs"
            width={1024}
            height={768}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-[48%] border-8 border-sand">
            <img
              src={cotton}
              alt="Soft cream fabric with a visible weave"
              width={1024}
              height={768}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover"
            />
          </div>
          <p className="absolute bottom-3 left-0 max-w-[45%] font-mono text-[10px] uppercase leading-relaxed tracking-widest text-mute">
            {copy.detail}
          </p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-clay">{copy.marker}</p>
          <h2
            id="about-heading"
            className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.12] tracking-tight lg:text-5xl"
          >
            {copy.title}
            <span className="mt-2 block text-clay">{copy.titleEnd}</span>
          </h2>
          <p className="mt-7 leading-relaxed text-mute">{copy.body}</p>
          <p className="mt-4 leading-relaxed text-mute">{copy.bodyEnd}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-4 bg-clay px-6 py-4 text-sm font-medium text-paper transition-colors hover:bg-claydeep"
          >
            {copy.cta}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function JournalCard({
  article,
  number,
  readLabel = "Read article",
}: {
  article: JournalArticle;
  number: number;
  readLabel?: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-line bg-paper">
      <a
        href={`/blog/${article.slug}`}
        className="flex h-full flex-col"
        aria-label={`${readLabel}: ${article.title}`}
      >
        <div className="relative overflow-hidden bg-sand">
          <img
            src={article.image}
            alt={article.imageAlt}
            width={1024}
            height={768}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none"
          />
          <span className="absolute left-4 top-4 bg-paper px-3 py-2 font-mono text-xs text-clay">
            {String(number).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6" lang="en">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-clay">
            {article.category} · {readingMinutes(article)} min read
          </p>
          <h3 className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight">
            {article.title}
          </h3>
          <p className="mb-7 mt-3 text-sm leading-relaxed text-mute">{article.excerpt}</p>
          <span className="mt-auto flex items-center justify-between border-t border-line pt-5 text-sm font-medium text-clay">
            {readLabel}
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
      </a>
    </article>
  );
}

export function FabricDeskSection({ lang = "en" }: { lang?: Lang }) {
  const copy = SECTION_COPY[lang];
  return (
    <section
      id="fabric-desk"
      aria-labelledby="fabric-desk-heading"
      className="scroll-mt-36 border-b border-line bg-paper"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-clay">
              {copy.journal}
            </p>
            <h2
              id="fabric-desk-heading"
              className="mt-4 font-display text-4xl font-semibold tracking-tight lg:text-5xl"
            >
              Surat Fabric Desk<span className="text-clay">.</span>
            </h2>
            <p className="mt-4 text-mute">{copy.subtitle}</p>
            {lang !== "en" && <p className="mt-2 text-xs text-mute">{copy.language}</p>}
          </div>
          <a
            href="/blog"
            className="inline-flex items-center gap-3 border-b border-clay pb-2 text-sm font-medium text-clay"
          >
            {copy.browse}
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {JOURNAL.map((article, index) => (
            <JournalCard
              key={article.slug}
              article={article}
              number={index + 1}
              readLabel={copy.read}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function JournalHeader() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-6 py-5">
        <a href="/" className="font-display text-2xl font-semibold tracking-tight">
          Vidhi Fabrics
        </a>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-5 text-sm">
          <a href="/#catalogue" className="hover:text-clay">
            Catalogue
          </a>
          <a href="/#about" className="hover:text-clay">
            About us
          </a>
          <a href="/blog" className="text-clay">
            Fabric Desk
          </a>
          <a href="/#contact" className="hover:text-clay">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

export function JournalFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-5 px-6 py-8 text-sm text-mute">
        <a href="/">Vidhi Fabrics · Surat, India</a>
        <a href="/#catalogue" className="inline-flex items-center gap-2 text-clay">
          Explore our fabrics
          <ArrowDown className="-rotate-90" size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
