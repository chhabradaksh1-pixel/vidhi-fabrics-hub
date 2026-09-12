import { createFileRoute } from "@tanstack/react-router";
import { JOURNAL } from "@/content/journal";
import { JournalCard, JournalHeader, JournalFooter } from "@/components/fabric-desk";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Surat Fabric Desk | Wholesale Buying Guides | Vidhi Fabrics" },
      {
        name: "description",
        content:
          "Practical guides to dress material, sarees, samples and wholesale sourcing from the Vidhi Fabrics desk in Surat.",
      },
      { property: "og:title", content: "Surat Fabric Desk | Vidhi Fabrics" },
      {
        property: "og:description",
        content: "Practical guides to fabrics, sourcing and buying wholesale.",
      },
      { property: "og:url", content: "https://www.vidhifabrics.com/blog" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://www.vidhifabrics.com/blog" }],
  }),
  component: JournalIndex,
});

function JournalIndex() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <JournalHeader />
      <main className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-clay">
          The journal / For textile buyers
        </p>
        <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
          Surat Fabric Desk<span className="text-clay">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
          Practical guides to fabrics, sourcing and buying wholesale. Start with the questions that
          make your next order clearer.
        </p>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {JOURNAL.map((article, index) => (
            <JournalCard key={article.slug} article={article} number={index + 1} />
          ))}
        </div>
      </main>
      <JournalFooter />
    </div>
  );
}
