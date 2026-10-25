import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import { trackLeadEvent } from "@/lib/analytics";
import {
  currentLeadContext,
  isBusinessWhatsAppUrl,
  isLinkRef,
  tagWhatsAppUrl,
} from "@/lib/lead-source";

/**
 * Adds the lead ref code to WhatsApp links and fires `whatsapp_click`.
 *
 * Done in one place, on the client, rather than in each button: the source
 * can only be known in the browser. Links are tagged at the moment they are
 * used (pointerdown, click, middle-click, keyboard Enter), not on page load:
 * rewriting hrefs on load touches parts of the page React is still hydrating
 * and causes hydration mismatches. The server-rendered href therefore carries
 * no ref; a visitor without JavaScript sends an untagged message, which the
 * legend treats as source D.
 *
 * A link may set `data-lead-ref="SUIT"`, `data-lead-ref="CIRCLE"` or
 * `data-lead-ref="SEARCH"` to send that code instead of the page's PAGE-SOURCE ref.
 */
function refForAnchor(a: HTMLAnchorElement): string {
  const override = a.dataset.leadRef ?? "";
  if (isLinkRef(override)) return override;
  return currentLeadContext().ref;
}

function tagAnchor(a: HTMLAnchorElement, ref: string) {
  const href = a.getAttribute("href");
  if (!href || !isBusinessWhatsAppUrl(href)) return;
  const tagged = tagWhatsAppUrl(href, ref);
  if (tagged !== href) a.setAttribute("href", tagged);
}

function whatsAppAnchor(target: EventTarget | null): HTMLAnchorElement | null {
  const a = target instanceof Element ? target.closest("a") : null;
  if (!a) return null;
  const href = a.getAttribute("href");
  return href && isBusinessWhatsAppUrl(href) ? a : null;
}

export function LeadSourceTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    // Resolve (and persist) the source on every page view, so UTMs and the
    // landing referrer are captured even if nothing is clicked on this page.
    currentLeadContext();

    // Tag early, so long-press "copy link" and the status bar mostly show it.
    const onPointerDown = (event: Event) => {
      const a = whatsAppAnchor(event.target);
      if (a) tagAnchor(a, refForAnchor(a));
    };
    const onActivate = (event: MouseEvent) => {
      const a = whatsAppAnchor(event.target);
      if (!a) return;
      const ctx = currentLeadContext();
      const ref = refForAnchor(a);
      tagAnchor(a, ref);
      trackLeadEvent("whatsapp_click", { page: ctx.page, source: ctx.source, ref_code: ref });
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("click", onActivate, true);
    document.addEventListener("auxclick", onActivate, true);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("click", onActivate, true);
      document.removeEventListener("auxclick", onActivate, true);
    };
  }, [pathname]);

  return null;
}
