"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/* ============================================================
   The hero's "one AI engine": a globe that is also a brain. A
   neural mesh (nodes wired to their nearest neighbours) covers a
   sphere of faint crosses; signals fire along the wires and light
   the nodes they reach; two orbit rings carry a travelling
   highlight. Labels circle the logo facing front; badges fly three
   fixed, atom-like orbits round the globe. Moving the mouse over it turns it like a
   drag (no click needed); drag/touch also spins it; either way it eases back to its own pace.
   Canvas + a few positioned labels, no dependencies. The cross
   colour comes from the canvas's CSS `color`, so it follows the theme.
   ============================================================ */

const BLUE = "82, 125, 255";
const BRIGHT = "157, 182, 255";
const TILT = -0.32; // forward lean, radians
const AUTO = 0.18; // idle spin, radians per second
const TAU = Math.PI * 2;

type V3 = readonly [number, number, number];

/** Evenly spread points on a unit sphere (Fibonacci), stable between renders. */
function sphere(n: number, offset = 0): V3[] {
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - ((i + 0.5) / n) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = i * 2.399963 + offset;
    return [Math.cos(t) * r, y, Math.sin(t) * r] as const;
  });
}

const DUST = sphere(260, 1.1);
const NODES = sphere(72);

// synapses: each node wired to its 3 nearest neighbours
const EDGES: [number, number][] = (() => {
  const seen = new Set<string>();
  const out: [number, number][] = [];
  NODES.forEach((a, i) => {
    NODES.map((b, j) => ({ j, d: (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2 }))
      .filter((x) => x.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, 3)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          out.push([i, j]);
        }
      });
  });
  return out;
})();

function unit(x: number, y: number, z: number): V3 {
  const l = Math.hypot(x, y, z);
  return [x / l, y / l, z / l];
}

// orbit rings: plane normal + highlight speed
const ORBITS = [
  { n: unit(0.35, 1, 0.2), speed: 0.9, phase: 0 },
  { n: unit(-0.8, 0.45, 0.4), speed: -0.65, phase: 2.2 },
].map((o) => {
  const [nx, ny, nz] = o.n;
  const a = Math.abs(nx) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  const u = unit(ny * a[2] - nz * a[1], nz * a[0] - nx * a[2], nx * a[1] - ny * a[0]);
  const v: V3 = [ny * u[2] - nz * u[1], nz * u[0] - nx * u[2], nx * u[1] - ny * u[0]];
  return { ...o, u, v };
});

// front labels circle the logo on a flat ellipse (fractions of the radius),
// wider than tall so they clear the logo at the sides
const LABEL_RX = 0.7;
const LABEL_RY = 0.6;
// badges fly three fixed orbits, like an atom: each plane is tilted 60° and
// turned 120° from the last, carries three badges evenly spaced, and turns the
// opposite way to its neighbour, so badges arrive from three directions
const BADGE_ORBITS = Array.from({ length: 9 }, (_, i) => {
  const plane = i % 3;
  const slot = Math.floor(i / 3);
  const az = (plane / 3) * TAU + 0.4;
  const n = unit(Math.sin(1.05) * Math.cos(az), Math.cos(1.05), Math.sin(1.05) * Math.sin(az));
  const a = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  const u = unit(n[1] * a[2] - n[2] * a[1], n[2] * a[0] - n[0] * a[2], n[0] * a[1] - n[1] * a[0]);
  const v: V3 = [n[1] * u[2] - n[2] * u[1], n[2] * u[0] - n[0] * u[2], n[0] * u[1] - n[1] * u[0]];
  return { u, v, r: 1.08 + plane * 0.04, speed: plane === 1 ? -0.13 : 0.13, phase: (slot / 3) * TAU + plane * 0.7 };
});

export type GlobeBadge = { label: string; node: ReactNode };

/**
 * `size` fixes the globe in px; leave it out to fill the parent's width
 * (the wrapper then needs its own width/height, e.g. absolute inset-0).
 * `labels` circle the logo, always facing front; `badges` fly three fixed,
 * atom-like orbits round the globe and pass behind it.
 */
export default function EngineGlobe({
  size,
  labels = [],
  badges = [],
  className = "",
}: {
  size?: number;
  labels?: string[];
  badges?: GlobeBadge[];
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [measured, setMeasured] = useState(0);
  const px = size ?? measured;

  // fluid size: follow the wrapper's width
  useEffect(() => {
    const wrap = wrapRef.current;
    if (size || !wrap) return;
    const ro = new ResizeObserver(([e]) => setMeasured(Math.round(e.contentRect.width)));
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [size]);

  useEffect(() => {
    const size = px;
    const canvas = canvasRef.current;
    if (!canvas || !size) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const c = size / 2;
    const R = c - 6;
    let rotY = 0.6;
    let rotX = 0;
    let vel = reduced ? 0 : AUTO;
    // `hover`: a mouse moving over the globe without a button turns it like a drag
    let drag: { x: number; y: number; t: number; hover?: boolean } | null = null;
    let visible = true;
    let raf = 0;
    let last = performance.now();
    let clock = 0;
    let spawn = 0;
    const glow = new Float32Array(NODES.length); // per-node flash, decays
    const pulses: { e: number; t: number; fwd: boolean }[] = [];

    // rotate around Y (spin), then X (lean + drag); orthographic projection
    const project = ([x, y, z]: V3, k = 1) => {
      const cy = Math.cos(rotY), sy = Math.sin(rotY);
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      const ax = TILT + rotX;
      const cx = Math.cos(ax), sx = Math.sin(ax);
      return { px: c + x1 * R * k, py: c + (y * cx - z1 * sx) * R * k, z: y * sx + z1 * cx };
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const ink = getComputedStyle(canvas).color.replace(/rgba?\(|\)/g, "").split(",").slice(0, 3).join(",");

      // soft core light + rim
      const g = ctx.createRadialGradient(c, c, 0, c, c, R);
      g.addColorStop(0, `rgba(${BLUE}, 0.10)`);
      g.addColorStop(1, `rgba(${BLUE}, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, TAU);
      ctx.fill();
      ctx.strokeStyle = `rgba(${BLUE}, 0.14)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // dust: faint crosses that give the sphere its body
      ctx.lineWidth = 0.8;
      for (const p of DUST) {
        const { px, py, z } = project(p);
        const s = 0.7 + 1.1 * ((z + 1) / 2);
        ctx.strokeStyle = `rgba(${ink}, ${0.05 + 0.28 * ((z + 1) / 2)})`;
        ctx.beginPath();
        ctx.moveTo(px - s, py);
        ctx.lineTo(px + s, py);
        ctx.moveTo(px, py - s);
        ctx.lineTo(px, py + s);
        ctx.stroke();
      }

      const P = NODES.map((n) => project(n));
      const quiet = (px: number, py: number, z: number) => (z > 0 && Math.hypot(px - c, py - c) < R * 0.5 ? 0.35 : 1);

      // synapses
      ctx.lineWidth = 0.8;
      for (const [a, b] of EDGES) {
        const pa = P[a], pb = P[b];
        const depth = ((pa.z + pb.z) / 2 + 1) / 2;
        ctx.strokeStyle = `rgba(${BLUE}, ${(0.05 + 0.32 * depth) * quiet((pa.px + pb.px) / 2, (pa.py + pb.py) / 2, (pa.z + pb.z) / 2)})`;
        ctx.beginPath();
        ctx.moveTo(pa.px, pa.py);
        ctx.lineTo(pb.px, pb.py);
        ctx.stroke();
      }

      // signals firing along synapses
      for (const s of pulses) {
        const [a, b] = EDGES[s.e];
        const from = s.fwd ? P[a] : P[b], to = s.fwd ? P[b] : P[a];
        const px = from.px + (to.px - from.px) * s.t;
        const py = from.py + (to.py - from.py) * s.t;
        const depth = ((from.z + to.z) / 2 + 1) / 2;
        ctx.fillStyle = `rgba(${BRIGHT}, ${0.25 + 0.75 * depth})`;
        ctx.shadowColor = `rgba(${BLUE}, 0.9)`;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, 1.1 + 0.9 * depth, 0, TAU);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // neurons
      P.forEach(({ px, py, z }, i) => {
        const depth = (z + 1) / 2;
        const f = glow[i];
        const a = (0.15 + 0.6 * depth) * quiet(px, py, z);
        if (f > 0.02) {
          ctx.fillStyle = `rgba(${BLUE}, ${0.35 * f * (0.4 + 0.6 * depth)})`;
          ctx.beginPath();
          ctx.arc(px, py, 3 + 5 * f, 0, TAU);
          ctx.fill();
        }
        ctx.fillStyle = f > 0.3 ? `rgba(${BRIGHT}, ${Math.min(1, a + f)})` : `rgba(${BLUE}, ${a})`;
        ctx.beginPath();
        ctx.arc(px, py, 0.9 + 1.3 * depth + f, 0, TAU);
        ctx.fill();
      });

      // orbit rings slightly outside the sphere, each with a travelling highlight
      for (const o of ORBITS) {
        const SEG = 96;
        const head = o.phase + clock * o.speed;
        const at = (t: number) =>
          project([o.u[0] * Math.cos(t) + o.v[0] * Math.sin(t), o.u[1] * Math.cos(t) + o.v[1] * Math.sin(t), o.u[2] * Math.cos(t) + o.v[2] * Math.sin(t)], 1.06);
        for (let i = 0; i < SEG; i++) {
          const t0 = (i / SEG) * TAU;
          const p0 = at(t0), p1 = at(((i + 1) / SEG) * TAU);
          const behind = (((head - t0) % TAU) + TAU) % TAU;
          const tail = behind < 1.4 ? 1 - behind / 1.4 : 0;
          ctx.strokeStyle = `rgba(${BLUE}, ${(0.12 + 0.75 * tail) * (p0.z > 0 ? 1 : 0.35)})`;
          ctx.lineWidth = 1 + tail * 0.8;
          ctx.beginPath();
          ctx.moveTo(p0.px, p0.py);
          ctx.lineTo(p1.px, p1.py);
          ctx.stroke();
        }
      }

      // badges fly their orbits, each trailing a short fading arc; dimmer and
      // smaller round the back, where they also slip behind the mesh
      const orbitAt = (o: (typeof BADGE_ORBITS)[number], t: number) =>
        project([o.u[0] * Math.cos(t) + o.v[0] * Math.sin(t), o.u[1] * Math.cos(t) + o.v[1] * Math.sin(t), o.u[2] * Math.cos(t) + o.v[2] * Math.sin(t)], o.r);
      const badgeAngle = (i: number) => {
        const o = BADGE_ORBITS[i % BADGE_ORBITS.length];
        return o.phase + clock * o.speed;
      };
      badgeRefs.current.forEach((_, i) => {
        const o = BADGE_ORBITS[i % BADGE_ORBITS.length];
        const head = badgeAngle(i);
        const dir = Math.sign(o.speed);
        const STEPS = 14;
        for (let k = 0; k < STEPS; k++) {
          const p0 = orbitAt(o, head - dir * (k / STEPS) * 0.9);
          const p1 = orbitAt(o, head - dir * ((k + 1) / STEPS) * 0.9);
          ctx.strokeStyle = `rgba(${BLUE}, ${0.5 * (1 - k / STEPS) * (p0.z > 0 ? 1 : 0.4)})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(p0.px, p0.py);
          ctx.lineTo(p1.px, p1.py);
          ctx.stroke();
        }
      });
      badgeRefs.current.forEach((el, i) => {
        if (!el) return;
        const { px, py, z } = orbitAt(BADGE_ORBITS[i % BADGE_ORBITS.length], badgeAngle(i));
        const front = (z + 1) / 2;
        el.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%) scale(${0.72 + 0.28 * front})`;
        el.style.opacity = String(z > 0 ? 1 : 0.3 + 0.5 * front);
        el.style.zIndex = z > 0 ? "3" : "0";
      });

      // labels circle the logo, evenly spaced and upright; they turn with the
      // globe (so a drag spins them too)
      labelRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = rotY * 0.6 + (i / labels.length) * TAU - Math.PI / 2;
        el.style.transform = `translate(${c + Math.cos(a) * LABEL_RX * R}px, ${c + Math.sin(a) * LABEL_RY * R}px) translate(-50%, -50%)`;
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // hover-turning stops once the mouse rests: coast like a released drag
      if (drag?.hover && now - drag.t > 120) onUp();
      if (!drag) {
        rotY += vel * dt;
        if (!reduced) vel += (AUTO - vel) * Math.min(1, dt * 1.5); // ease back to idle pace
        rotX *= 1 - Math.min(1, dt * 1.2); // settle the lean
      }
      if (!reduced) {
        clock += dt;
        // fire a new signal every ~0.15s; each crosses its synapse in ~0.6s
        spawn -= dt;
        if (spawn <= 0 && pulses.length < 14) {
          pulses.push({ e: Math.floor(Math.random() * EDGES.length), t: 0, fwd: Math.random() < 0.5 });
          spawn = 0.15;
        }
        for (let i = pulses.length - 1; i >= 0; i--) {
          const s = pulses[i];
          s.t += dt / 0.6;
          if (s.t >= 1) {
            const [a, b] = EDGES[s.e];
            glow[s.fwd ? b : a] = 1;
            pulses.splice(i, 1);
          }
        }
        for (let i = 0; i < glow.length; i++) glow[i] *= 1 - Math.min(1, dt * 2.2);
      }
      draw();
      // reduced motion: only redraw while the visitor is dragging
      raf = visible && (!reduced || drag) ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const onDown = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY, t: performance.now() };
      canvas.setPointerCapture(e.pointerId);
      start();
    };
    const onMove = (e: PointerEvent) => {
      if (!drag) {
        if (e.pointerType !== "mouse" || e.buttons) return;
        drag = { x: e.clientX, y: e.clientY, t: performance.now(), hover: true };
        start();
        return;
      }
      const now = performance.now();
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      // hover turns it gently; a real drag turns it fast (radians per px)
      const spin = drag.hover ? 0.004 : 0.02;
      const lean = drag.hover ? 0.003 : 0.012;
      rotY += dx * spin;
      rotX = Math.max(-0.7, Math.min(0.7, rotX + dy * lean));
      vel = (dx * spin) / Math.max(0.016, (now - drag.t) / 1000);
      drag = { ...drag, x: e.clientX, y: e.clientY, t: now };
    };
    const onUp = () => {
      drag = null;
      vel = reduced ? 0 : Math.max(-6, Math.min(6, vel)); // a hard flick spins fast, then eases back
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    const onLeave = () => {
      if (drag?.hover) onUp();
    };
    canvas.addEventListener("pointerleave", onLeave);

    // only animate while on screen
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced) start();
    });
    io.observe(canvas);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [px, labels.length, badges.length]);

  return (
    <div ref={wrapRef} className={className} style={size ? { width: size, height: size } : undefined}>
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ width: px, height: px }}
        className="absolute inset-0 z-1 cursor-grab touch-pan-y text-[#8FA3C8] active:cursor-grabbing light:text-[#64748B]"
      />
      {badges.map((b, i) => (
        <span
          key={b.label}
          title={b.label}
          ref={(el) => {
            badgeRefs.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0"
        >
          {b.node}
        </span>
      ))}
      {labels.map((l, i) => (
        <span
          key={l}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className="pointer-events-none absolute left-0 top-0 z-2 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#527DFF]/35 bg-[#0B1530]/90 py-0.5 pl-1.5 pr-2.5 text-[11px] font-semibold text-[#C9D8FF] shadow-[0_4px_14px_-6px_rgb(82_125_255/0.6)] light:border-[#527DFF]/30 light:bg-white/95 light:text-[#3E63F2]"
        >
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#527DFF] shadow-[0_0_6px_rgb(82_125_255)]" />
          {l}
        </span>
      ))}
    </div>
  );
}
