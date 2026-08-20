"use client";

import { useEffect } from "react";

/**
 * Anchor links (#work, /#about) scroll smoothly, while route changes still
 * jump instantly to the top. Doing this here instead of via a global
 * `html { scroll-behavior: smooth }` keeps Next's scroll reset/restore intact.
 */
export function SmoothAnchors() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // only same-page hash targets: "#x" or "/#x" while already on "/"
      let hash = "";
      if (href.startsWith("#")) hash = href.slice(1);
      else if (href.startsWith("/#") && window.location.pathname === "/") hash = href.slice(2);
      if (!hash) return;

      const target = document.getElementById(hash);
      if (!target) return;

      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${hash}`);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
