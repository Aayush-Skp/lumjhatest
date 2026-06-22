"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Decorative curve that threads vertically THROUGH the page content (behind the
 * sections), filling with the accent colour as you scroll. A bright "bulb"
 * rides the leading edge of the fill. Sits behind content (content is z-10).
 *
 * Perf: the path geometry is memoised on size only, and the scroll-driven fill
 * + bulb are updated imperatively (refs, no React re-render per frame) so
 * scrolling stays smooth.
 */
export function PageTrail() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const bulbRef = useRef<SVGGElement>(null);
  const [{ w, h }, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Build a smooth sine wave (Catmull-Rom → cubic Bézier) that weaves down the
  // page, centred horizontally. Memoised on size so it isn't rebuilt on scroll.
  const d = useMemo(() => {
    if (!(w > 0 && h > 0)) return "";
    const cx = w / 2;
    // Wider horizontal swing than before so the curve spreads across the page.
    const amp = Math.min(w * 0.44, 460);
    const waves = Math.max(3, Math.round(h / 760));
    const steps = Math.max(60, Math.min(600, Math.round(h / 18)));

    const pts: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const f = i / steps;
      pts.push([cx + amp * Math.sin(f * waves * Math.PI * 2), f * h]);
    }
    let path = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)} `;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : pts.length - 1];
      const c1x = p1[0] + (p2[0] - p0[0]) / 6;
      const c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6;
      const c2y = p2[1] - (p3[1] - p1[1]) / 6;
      path += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `;
    }
    return path;
  }, [w, h]);

  // Drive the fill + bulb imperatively from scroll, no per-frame re-render.
  useEffect(() => {
    if (!(w > 0 && h > 0)) return;
    const fill = fillRef.current;
    const path = pathRef.current;
    const bulb = bulbRef.current;
    if (!fill || !path) return;

    const total =
      typeof path.getTotalLength === "function" ? path.getTotalLength() : 0;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0;

      fill.style.strokeDasharray = `${progress} ${1 - progress}`;

      if (bulb && total > 0) {
        if (progress > 0.001) {
          const pt = path.getPointAtLength(progress * total);
          bulb.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
          bulb.style.opacity = "1";
        } else {
          bulb.style.opacity = "0";
        }
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [w, h, d]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {w > 0 && h > 0 && (
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          fill="none"
          className="absolute inset-0"
        >
          {/* Base curve */}
          <path
            ref={pathRef}
            d={d}
            stroke="var(--color-border)"
            strokeWidth={1.5}
            strokeOpacity={0.55}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Filled portion, revealed by scroll progress (set imperatively) */}
          <path
            ref={fillRef}
            d={d}
            stroke="var(--color-accent)"
            strokeWidth={2.5}
            strokeOpacity={0.9}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="0 1"
            style={{
              filter: "drop-shadow(0 0 6px var(--color-accent-glow))",
            }}
          />

          {/* Glowing bulb at the leading edge of the fill */}
          <g ref={bulbRef} style={{ opacity: 0 }}>
            <circle
              r={14}
              fill="var(--color-accent)"
              opacity={0.22}
              style={{ filter: "blur(7px)" }}
            />
            <circle
              r={7}
              fill="var(--color-accent)"
              opacity={0.5}
              style={{ filter: "blur(2px)" }}
            />
            <circle
              r={3.5}
              fill="#ffffff"
              style={{ filter: "drop-shadow(0 0 8px var(--color-accent))" }}
            />
          </g>
        </svg>
      )}
    </div>
  );
}
