"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent, ReactNode } from "react";

/**
 * Mouse-follow 3D tilt with a soft glare — the vanilla-tilt / react-parallax-tilt
 * effect in ~50 lines, so the project stays dependency-free.
 *
 * Mouse only (touch screens stay flat), skipped for reduced-motion visitors,
 * and paused while something inside has focus (e.g. a form being filled in).
 */
export default function Tilt({
  children,
  className = "",
  max = 8,
  scale = 1.02,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the card's edges. */
  max?: number;
  scale?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || reduced.current) return;
    if (el.matches(":focus-within")) return reset();

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0 → 1 across
    const py = (e.clientY - r.top) / r.height; // 0 → 1 down
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transition = "transform 120ms ease-out";
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 2 * max}deg) rotateY(${(px - 0.5) * 2 * max}deg) scale(${scale})`;
      const g = glareRef.current;
      if (g) {
        g.style.opacity = "1";
        g.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.18), transparent 60%)`;
      }
    });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  );
}
