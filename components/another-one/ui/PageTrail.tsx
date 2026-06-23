"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Single decorative trail that threads through the whole page, behind the
 * content (content is z-10). Instead of a fixed sine wave, the path is built
 * from "anchor" elements in the DOM so each section can shape the trail
 * differently:
 *
 *   data-trail="center"  → path passes through the element's centre
 *   data-trail="over"    → path passes just above the element's top edge
 *   data-trail="under"   → path passes just below the element's bottom edge
 *
 * The accent stroke fills from empty (top of page) to full (bottom) with scroll
 * progress and a glowing bulb rides its leading edge. Geometry is rebuilt only
 * on layout changes (mount / resize / load); fill + bulb update on scroll.
 * Per-section box highlighting is handled separately by StageRail.
 */

const GAP = 26; // px above/below a box for "over"/"under" anchors

function buildSmoothPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
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
}

export function PageTrail() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const bulbRef = useRef<SVGGElement>(null);
  const [{ w, h }, setSize] = useState({ w: 0, h: 0 });
  const [d, setD] = useState("");

  const rebuild = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const cw = el.offsetWidth;
    const ch = el.offsetHeight;
    if (!(cw > 0 && ch > 0)) return;

    const base = el.getBoundingClientRect();
    const baseTop = base.top + window.scrollY;

    // Build anchors from EVERY section (so the curve weaves evenly through the
    // whole page, not just the 2–3 hand-placed spots) plus any explicit
    // `data-trail` spans for finer shaping inside tall/sticky sections.
    const ys: number[] = [];

    document
      .querySelectorAll<HTMLElement>("main section[id]")
      .forEach((node) => {
        const r = node.getBoundingClientRect();
        const top = r.top + window.scrollY - baseTop;
        ys.push(top + r.height / 2);
      });

    document.querySelectorAll<HTMLElement>("[data-trail]").forEach((node) => {
      const r = node.getBoundingClientRect();
      const top = r.top + window.scrollY - baseTop;
      const pos = node.dataset.trail || "center";
      let y = top + r.height / 2;
      if (pos === "over") y = top - GAP;
      else if (pos === "under") y = top + r.height + GAP;
      ys.push(y);
    });

    ys.sort((a, b) => a - b);

    // Weave across the FULL width, crossing through the (centred) content like a
    // ribbon. A wide ±amp swing that alternates side per anchor makes it cross
    // back and forth, leading the eye down the page.
    const cx = cw / 2;
    const amp = Math.min(cw * 0.42, 460);

    const pts: [number, number][] = [[cx, 0]];
    ys.forEach((y, i) => {
      pts.push([cx + (i % 2 === 0 ? -amp : amp), y]);
    });
    pts.push([cx, ch]);

    setSize({ w: cw, h: ch });
    setD(buildSmoothPath(pts));
  }, []);

  // Rebuild geometry on mount + layout changes (not on scroll — anchor
  // positions are static in the document flow).
  useEffect(() => {
    rebuild();
    const raf = requestAnimationFrame(rebuild);
    const t1 = window.setTimeout(rebuild, 500);
    const t2 = window.setTimeout(rebuild, 1500);

    const ro = new ResizeObserver(rebuild);
    if (ref.current) ro.observe(ref.current);
    if (document.body) ro.observe(document.body);
    window.addEventListener("resize", rebuild);
    window.addEventListener("load", rebuild);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener("resize", rebuild);
      window.removeEventListener("load", rebuild);
    };
  }, [rebuild]);

  // Drive the fill + bulb imperatively from scroll progress (no per-frame
  // React re-render). Per-section box highlighting lives in StageRail.
  useEffect(() => {
    if (!(w > 0 && h > 0) || !d) return;
    const fill = fillRef.current;
    const path = pathRef.current;
    const bulb = bulbRef.current;
    if (!fill || !path || typeof path.getTotalLength !== "function") return;

    const total = path.getTotalLength();
    let frame = 0;

    const el = ref.current;

    // Sample the path ONCE into parallel arrays (length / x / y). The scroll
    // loop then maps viewport-Y → drawn-length by binary-searching this table
    // and interpolating — no getPointAtLength()/getBoundingClientRect() per
    // frame (those forced ~21 SVG geometry calls + a reflow every frame, the
    // main remaining source of scroll jank).
    const SAMPLES = 260;
    const lens = new Float64Array(SAMPLES + 1);
    const sxs = new Float64Array(SAMPLES + 1);
    const sys = new Float64Array(SAMPLES + 1);
    for (let i = 0; i <= SAMPLES; i++) {
      const len = (total * i) / SAMPLES;
      const pt = path.getPointAtLength(len);
      lens[i] = len;
      sxs[i] = pt.x;
      sys[i] = pt.y;
    }

    // Cache layout-dependent metrics; reading getBoundingClientRect /
    // scrollHeight inside the scroll handler forces a synchronous reflow every
    // frame (jank). These only change on layout, so refresh them on resize.
    let containerTop = 0;
    let scrollable = 0;
    const measure = () => {
      if (!el) return;
      containerTop = el.getBoundingClientRect().top + window.scrollY;
      scrollable = document.documentElement.scrollHeight - window.innerHeight;
    };
    measure();

    const apply = () => {
      frame = 0;
      if (!el) return;

      // Drive the fill by the path point that currently sits at the centre of
      // the viewport, so the glowing leading edge rides DOWN the screen as you
      // scroll (the trail "arrives" with you). Mapping by scroll fraction ×
      // path length instead leaves the edge pinned above the fold for most of
      // the page — it only catches up near the bottom.
      //
      // Track the viewport centre once scrolled, but ramp the lead in from the
      // top edge over the first viewport so the trail reads as EMPTY at rest
      // (no half-drawn fill behind the hero) and only grows as you scroll.
      const vh = window.innerHeight;
      const ramp = Math.min(1, window.scrollY / vh);
      // Near the bottom, the viewport centre can never reach the container's
      // bottom edge, so the fill would stall mid-section. Ramp the lead from the
      // viewport centre (0.5) down to its bottom (1.0) over the final viewport
      // so the trail completes right as you hit the end of the page.
      const endRamp = Math.min(
        1,
        Math.max(0, (window.scrollY - (scrollable - vh)) / vh),
      );
      const leadFrac = 0.5 + 0.5 * endRamp;
      const targetLocalY =
        window.scrollY + vh * leadFrac * ramp - containerTop;

      // The sampled y values increase monotonically (anchors in document
      // order), so binary-search the table for targetLocalY, then linearly
      // interpolate the drawn length and the bulb's x/y between samples.
      let lo = 0;
      let hi = SAMPLES;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (sys[mid] < targetLocalY) lo = mid;
        else hi = mid;
      }
      const span = sys[hi] - sys[lo] || 1;
      const f = Math.min(1, Math.max(0, (targetLocalY - sys[lo]) / span));
      const drawn = Math.min(total, Math.max(0, lens[lo] + (lens[hi] - lens[lo]) * f));

      // Real geometric lengths (px), not a pathLength=1 fraction — the latter is
      // not reliably honoured for style-set stroke-dasharray, which left the
      // fill an invisible micro-dotted line until it neared full.
      fill.style.strokeDasharray = `${drawn} ${total}`;

      if (bulb && total > 0) {
        if (drawn > 2 && drawn < total - 2) {
          const bx = sxs[lo] + (sxs[hi] - sxs[lo]) * f;
          const by = sys[lo] + (sys[hi] - sys[lo]) * f;
          bulb.setAttribute("transform", `translate(${bx} ${by})`);
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

    const onResize = () => {
      measure();
      onScroll();
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [w, h, d]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
    >
      {w > 0 && h > 0 && d && (
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
            strokeDasharray="0 99999"
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
