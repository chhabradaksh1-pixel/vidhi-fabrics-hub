import { useEffect, useRef, useState, type MouseEvent } from "react";

import { CHAT, chatLink } from "@/content/showroom-live";
import type { Lang } from "@/content/translations";
import { LEAD_POPUP_EVENT, type LeadPopupEventDetail } from "@/lib/ui-events";

import "@/styles/showroom.css";

export function WhatsAppPill({ lang = "en" }: { lang?: Lang }) {
  const still = useRef(true);
  const [aside, setAside] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    still.current = !fine || reduce;
  }, []);

  // The enquiry pop-up opens in this same corner, so the pill steps aside while
  // it is showing instead of peeking out from under it.
  useEffect(() => {
    const onPopup = (event: Event) => {
      setAside(Boolean((event as CustomEvent<LeadPopupEventDetail>).detail?.open));
    };
    window.addEventListener(LEAD_POPUP_EVENT, onPopup);
    return () => window.removeEventListener(LEAD_POPUP_EVENT, onPopup);
  }, []);

  function onMove(event: MouseEvent<HTMLAnchorElement>) {
    if (still.current) return;
    const el = event.currentTarget;
    const box = el.getBoundingClientRect();
    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;
    const tx = clamp((event.clientX - (box.left + box.width / 2)) * 0.18, -10, 10);
    const ty = clamp((event.clientY - (box.top + box.height / 2)) * 0.18, -8, 8);
    el.style.setProperty("--vf-lx", `${x}%`);
    el.style.setProperty("--vf-ly", `${y}%`);
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  }

  function onLeave(event: MouseEvent<HTMLAnchorElement>) {
    const el = event.currentTarget;
    el.style.removeProperty("--vf-lx");
    el.style.removeProperty("--vf-ly");
    el.style.transform = "";
  }

  return (
    <a
      href={chatLink(lang)}
      target="_blank"
      rel="noopener noreferrer"
      className="vf-showroom-chat"
      data-aside={aside}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="vf-showroom-chat-face">
        <span className="vf-showroom-chat-label text-sm">{CHAT[lang]}</span>
        <span className="vf-showroom-chat-dot">
          <WhatsAppGlyph />
        </span>
      </span>
    </a>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      className="vf-showroom-chat-icon"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.8.6.6-3.7-.2-.3A9 9 0 1 1 12 21zm4.9-6.7c-.3-.1-1.5-.8-1.8-.8s-.4-.1-.6.2-.7.8-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.5l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.3 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.5 4 4 4 0 0 0 2.6.3 2.5 2.5 0 0 0 1.7-1.2 2 2 0 0 0 .1-1.2c-.1-.2-.3-.2-.6-.3z" />
    </svg>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
