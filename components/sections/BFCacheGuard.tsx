"use client";

import { useEffect } from "react";

/**
 * Fixes blank/invisible content when returning to the page via the browser's
 * Back/Forward button.
 *
 * Sections animate in from `initial="hidden"` (opacity 0) using framer-motion's
 * `whileInView` / `animate` with `{ once: true }`. When the browser returns to
 * this page after following an external link (e.g. the login redirect), it can
 * restore the document without replaying those entrance animations, leaving
 * every animated element stuck at opacity 0 — a blank page.
 *
 * Two restore paths, two guards:
 *   1. bfcache restore — the document is kept alive and resumed. `pageshow`
 *      fires with `event.persisted === true`.
 *   2. A back/forward navigation that re-mounts the page from cache WITHOUT
 *      replaying the animations. The Navigation Timing API reports the load
 *      `type` as `"back_forward"`.
 *
 * In both cases we force one fresh load so the animations run normally. The
 * reloaded document's nav type becomes `"reload"`, and a sessionStorage guard
 * prevents any chance of a reload loop.
 */
const RELOAD_FLAG = "lumjha:bf-reloaded";

export function BFCacheGuard() {
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", onPageShow);

    try {
      const [entry] = performance.getEntriesByType(
        "navigation",
      ) as PerformanceNavigationTiming[];

      if (entry?.type === "back_forward") {
        if (!sessionStorage.getItem(RELOAD_FLAG)) {
          sessionStorage.setItem(RELOAD_FLAG, "1");
          window.location.reload();
        }
      } else {
        // Normal load / reload — clear the guard so a future back/forward
        // navigation can reload again.
        sessionStorage.removeItem(RELOAD_FLAG);
      }
    } catch {
      // performance API or sessionStorage unavailable — nothing to do.
    }

    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  return null;
}
