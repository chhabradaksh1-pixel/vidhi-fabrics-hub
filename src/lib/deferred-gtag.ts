/**
 * Loads gtag.js (Google Ads AW-11259228096, plus GA4 when configured) after
 * the page has loaded, instead of in the <head>.
 *
 * gtag.js is about 150 KB per tag ID and ran roughly 480 ms of main-thread
 * work on a throttled phone during the initial load, on pages whose content is
 * plain text. The inline head script in __root.tsx still defines `gtag()` and
 * queues the `config` calls at once, and every event fired before the library
 * arrives (whatsapp_click, form_submit) waits in `window.dataLayer`. gtag.js
 * replays that queue when it loads, so nothing is lost; only the network
 * request and its parse are moved off the critical path.
 *
 * Trigger: the first interaction (pointer, key, scroll, touch), or 3.5 s after
 * the window `load` event, whichever comes first. Runs once per page load.
 */
const GTAG_SRC = "https://www.googletagmanager.com/gtag/js?id=AW-11259228096";
const IDLE_AFTER_LOAD_MS = 3500;

let started = false;

export function loadGtagDeferred() {
  if (started || typeof window === "undefined") return;
  started = true;

  const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
  let timer = 0;

  const inject = () => {
    events.forEach((e) => window.removeEventListener(e, inject));
    window.clearTimeout(timer);
    if (document.querySelector(`script[src="${GTAG_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = GTAG_SRC;
    script.async = true;
    document.head.appendChild(script);
  };

  events.forEach((e) => window.addEventListener(e, inject, { once: true, passive: true }));
  const arm = () => {
    timer = window.setTimeout(inject, IDLE_AFTER_LOAD_MS);
  };
  if (document.readyState === "complete") arm();
  else window.addEventListener("load", arm, { once: true });
}
