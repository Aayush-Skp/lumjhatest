"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  /** Corner radius in pixels to match the wrapped card. Defaults to 16 (rounded-2xl). */
  radius?: number;
  className?: string;
};

/**
 * A minimal, occasional ray of light that traces the card's outline.
 *
 * Implementation: an SVG rect with `pathLength={1}` (so dash values are
 * perimeter-normalized) and a short dash segment that travels around the
 * rect via `strokeDashoffset`. A `repeatDelay` between cycles makes the
 * effect read as a subtle, time-to-time pulse rather than constant motion.
 *
 * Placement: render as a sibling of the card inside a `relative` wrapper so
 * the element can extend slightly outside the card's bounds (via the SVG's
 * drop-shadow glow) without being clipped by the card's `overflow-hidden`.
 */
export function CardLightSweep({ radius = 16, className }: Props) {
  return (
    <svg
      aria-hidden
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-visible",
        className,
      )}
      style={{
        // Layered glow: a tight bright core + a wider soft halo so the
        // thin traveling segment still reads as a ray of light.
        filter:
          "drop-shadow(0 0 2px rgb(var(--brand-100) / 0.85)) drop-shadow(0 0 10px rgb(var(--brand-200) / 0.45))",
      }}
    >
      {/* Soft trailing aura — a slightly longer, dimmer dash that travels
          with the core beam, giving the thin line a "ray" quality. */}
      <motion.rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx={radius}
        ry={radius}
        fill="none"
        stroke="rgb(var(--brand-200))"
        strokeOpacity={0.2}
        strokeWidth={0.3}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="0.22 0.78"
        initial={{ strokeDashoffset: 0.02 }}
        animate={{ strokeDashoffset: -0.98 }}
        transition={{
          duration: 3.6,
          ease: [0.33, 0, 0.4, 1],
          repeat: Infinity,
          repeatDelay: 4.5,
        }}
      />
      {/* Core beam — thin, bright segment. */}
      <motion.rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx={radius}
        ry={radius}
        fill="none"
        stroke="rgb(var(--brand-100))"
        strokeOpacity={0.95}
        strokeWidth={0.3}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="0.14 0.86"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -1 }}
        transition={{
          duration: 3.6,
          ease: [0.33, 0, 0.4, 1],
          repeat: Infinity,
          repeatDelay: 4.5,
        }}
      />
    </svg>
  );
}
