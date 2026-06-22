"use client";

import { useEffect } from "react";

/**
 * Lightweight momentum smooth-scroll for the rebuilt route. Intercepts wheel
 * input on fine-pointer (mouse / trackpad) devices and lerps the real window
 * scroll position toward a target — so `position: sticky`, anchors and the
 * scroll-driven trail all keep working on native scroll.
 *
 * Important: the global `html { scroll-behavior: smooth }` would start a second,
 * competing animation on every programmatic `scrollTo`, which makes the page
 * feel sticky and lurch between sections. While this scroller is active we force
 * `scroll-behavior: auto` and run in-page anchor jumps through the same lerp.
 *
 * Touch devices and `prefers-reduced-motion` users fall back to the browser's
 * native scrolling (no interception at all).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    const docEl = document.documentElement;
    const prevBehavior = docEl.style.scrollBehavior;
    docEl.style.scrollBehavior = "auto";

    let target = window.scrollY;
    let current = window.scrollY;
    let running = false;
    let rafId = 0;
    const ease = 0.085; // lower = smoother, heavier glide
    const speed = 0.85; // wheel sensitivity (<1 = a touch slower than native)

    const maxScroll = () =>
      Math.max(0, docEl.scrollHeight - window.innerHeight);

    const loop = () => {
      const delta = target - current;
      if (Math.abs(delta) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        running = false;
        return;
      }
      current += delta * ease;
      window.scrollTo(0, current);
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(loop);
    };

    const onWheel = (e: WheelEvent) => {
      // Let pinch-zoom and modifier gestures pass through untouched.
      if (e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      // deltaMode 1 = lines, 2 = pages — normalise to pixels.
      const unit =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.max(
        0,
        Math.min(maxScroll(), target + e.deltaY * unit * speed),
      );
      start();
    };

    // Route in-page anchor clicks through the same lerp so they glide instead
    // of jumping (we disabled CSS smooth above).
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      const href = anchor?.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      e.preventDefault();
      target = Math.max(
        0,
        Math.min(maxScroll(), window.scrollY + el.getBoundingClientRect().top),
      );
      start();
    };

    // Keep the target in sync when the user scrolls by other means
    // (keyboard, scrollbar drag, find-on-page).
    const onScroll = () => {
      if (!running) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      docEl.style.scrollBehavior = prevBehavior;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
