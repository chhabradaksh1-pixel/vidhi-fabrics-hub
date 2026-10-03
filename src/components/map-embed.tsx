import { MapPin } from "lucide-react";

import { DIRECTIONS_LABEL, DIRECTIONS_URL, MAP_EMBED_URL, MAP_TITLE } from "@/content/business";
import type { Lang } from "@/content/translations";

/**
 * Google Maps embed of the shop plus a "Get directions" link.
 *
 * The iframe is `loading="lazy"`, so the Maps scripts (several hundred KB) are
 * only fetched when the map nears the viewport; it only appears in contact
 * sections near the bottom of a page. Keyless embed, no API account needed.
 */
export function MapEmbed({ lang, className = "" }: { lang: Lang; className?: string }) {
  return (
    <div className={className}>
      <div className="overflow-hidden rounded-md ring-1 ring-line">
        <iframe
          src={MAP_EMBED_URL}
          title={MAP_TITLE[lang]}
          width={600}
          height={300}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-64 w-full border-0 sm:h-72"
        />
      </div>
      <DirectionsLink lang={lang} className="mt-3" />
    </div>
  );
}

export function DirectionsLink({
  lang,
  className = "",
  tone = "light",
}: {
  lang: Lang;
  className?: string;
  tone?: "light" | "dark";
}) {
  const colour =
    tone === "dark" ? "text-ivory/80 hover:text-gold" : "text-clay hover:text-claydeep";
  return (
    <a
      href={DIRECTIONS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-sm underline decoration-current/30 underline-offset-4 transition-colors ${colour} ${className}`}
    >
      <MapPin size={15} aria-hidden="true" />
      {DIRECTIONS_LABEL[lang]}
    </a>
  );
}
