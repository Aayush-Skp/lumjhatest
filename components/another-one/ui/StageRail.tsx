"use client";

import { useEffect, useRef } from "react";

interface StageRailProps {
  children: React.ReactNode;
  /** Highlight order: "ltr" left→right, "rtl" right→left. */
  direction?: "ltr" | "rtl";
  /** Classes for the row wrapper (e.g. the grid / flex layout). */
  className?: string;
}

/**
 * Lights a row of boxes (each marked `data-rail-box`) in turn as the row
 * scrolls up through the viewport — a slow, scroll-locked sweep. Direction
 * alternates per section. Updates are imperative (no React re-render per
 * frame). There is no connecting line; the highlight alone carries the motion.
 */
export default function StageRail({
  children,
  direction = "ltr",
  className,
}: StageRailProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const r = row.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress runs 0→1 as the row travels from low (82% down) to high
      // (35% down) in the viewport — a slow, scroll-locked sweep.
      const start = vh * 0.82;
      const end = vh * 0.35;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));

      const boxes = Array.from(
        row.querySelectorAll<HTMLElement>("[data-rail-box]"),
      );
      const n = boxes.length || 1;
      boxes.forEach((box, i) => {
        const idx = direction === "rtl" ? n - 1 - i : i;
        // Light a box once the sweep has (almost) reached its far edge.
        const threshold = (idx + 0.85) / n;
        box.classList.toggle("a1-trail-on", p >= threshold);
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [direction]);

  return (
    <div ref={rowRef} className={`relative ${className ?? ""}`}>
      {children}
    </div>
  );
}
