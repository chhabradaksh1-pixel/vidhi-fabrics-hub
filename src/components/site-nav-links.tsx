import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { HEADER_LINK } from "@/lib/header-classes";
import { SECTION_COPY } from "@/content/section-copy";
import { COPY, type Lang } from "@/content/translations";

/** The section a path belongs to, for the header's current-page mark. Scale
 *  is a place on the about page (`/about#scale`), so it, not About us, is
 *  marked while the address points there. */
function currentSection(path: string, hash: string) {
  if (path === "/about") return hash === "#scale" ? "scale" : "about";
  if (path.startsWith("/blog")) return "desk";
  return null;
}

/** The address's `#…`, kept in state after mount and followed on every jump.
 *  The server never sees a hash, so reading it during render would make the
 *  hydrated header disagree with the server's. */
function useHash() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    const read = () => setHash(window.location.hash);
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  return hash;
}

/**
 * The header's links, the same five in the same order on every page
 * (owner, 1 November 2026): Catalogue, Scale, Contact, About us, Fabric Desk.
 * Both HomeHeader and JournalHeader render this, so the bars cannot drift
 * apart again. A reader on a Hindi route stays on Hindi pages. On the home
 * page Catalogue and Contact are jumps within the page; elsewhere they lead
 * back to those sections of home.
 */
export function SiteNavLinks({ lang }: { lang: Lang }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const hindi = /^\/hi(?=\/|$)/.test(pathname);
  const path = pathname.replace(/^\/hi(?=\/|$)/, "").replace(/(.)\/$/, "$1") || "/";
  const home = hindi ? "/hi" : "/";
  const prefix = hindi ? "/hi" : "";
  const onHome = path === "/";
  const section = currentSection(path, useHash());
  const current = (name: string) => (section === name ? { "aria-current": "page" as const } : {});
  const copy = SECTION_COPY[lang];

  return (
    <>
      <a href={onHome ? "#catalogue" : `${home}#catalogue`} className={HEADER_LINK}>
        {COPY.nav.catalogue[lang]}
      </a>
      <a href={`${prefix}/about#scale`} className={HEADER_LINK} {...current("scale")}>
        {COPY.nav.scale[lang]}
      </a>
      <a href={onHome ? "#contact" : `${home}#contact`} className={HEADER_LINK}>
        {COPY.nav.contact[lang]}
      </a>
      <a href={`${prefix}/about`} className={HEADER_LINK} {...current("about")}>
        {copy.about}
      </a>
      <a href={`${prefix}/blog`} className={HEADER_LINK} {...current("desk")}>
        {copy.desk}
      </a>
    </>
  );
}
