"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  /** Duration of the count-up in ms. */
  duration?: number;
}

/**
 * Counts up from 0 to `value` over `duration` ms the first time it scrolls
 * into view, using requestAnimationFrame. Reduced-motion users see the final
 * value immediately.
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1200,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let raf = 0;

    if (reduced) {
      // Jump to the final value on the next frame (setState off the effect body).
      raf = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(raf);
    }

    let start: number | null = null;

    const tick = (t: number) => {
      if (start === null) start = t;
      const elapsed = t - start;
      const p = Math.min(1, elapsed / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
