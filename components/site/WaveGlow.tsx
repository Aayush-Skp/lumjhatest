"use client";

import { useEffect, useRef } from "react";

/**
 * Figma's "Glowing wave" shader fill, ported line-for-line from its WGSL
 * fragment shader to a 2D canvas. The shader is static (not animated), so we
 * evaluate it once per size instead of shipping a WebGPU runtime — same
 * pixels, works in every browser.
 *
 * Like the shader, the canvas is opaque black with the wave added on top,
 * and it renders at CSS-pixel resolution to match the 1× Figma frame.
 */

type Rgba = { r: number; g: number; b: number; a: number };

export type WaveParams = {
  /** Centre (% of width) — note the shader measures y in width units too. */
  x: number;
  y: number;
  /** Wavelength as % of width. */
  radius: number;
  angle: number;
  /** Amplitude as % of width. */
  amplitude?: number;
  color?: Rgba;
  glowIntensity?: number;
  zoom?: number;
  /** Phase, 0–100. */
  offset?: number;
};

// Defaults from the Figma file (brand blue at 14% strength).
const DEFAULT_COLOR: Rgba = { r: 0.2721152603626251, g: 0.4056134521961212, b: 1, a: 0.14000000059604645 };

const smoothstep = (e0: number, e1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

function paint(canvas: HTMLCanvasElement, p: WaveParams) {
  const width = Math.max(1, Math.round(canvas.clientWidth));
  const height = Math.max(1, Math.round(canvas.clientHeight));
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { amplitude = 15, glowIntensity = 1, zoom = 1, offset = 0, color = DEFAULT_COLOR } = p;
  const aspect = width / height;
  const angle = (p.angle * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const waveNumber = (Math.PI * 2) / Math.max(0.001, (width * p.radius) / 100);
  const amplitudePx = (width * amplitude) / 100;
  const phase = (offset * Math.PI * 2) / 100;
  const cx = (width * p.x) / 100;
  const cy = (width * p.y) / 100;
  const glowSpread = 40 + glowIntensity * 60;
  const r = color.r * color.a * 255;
  const g = color.g * color.a * 255;
  const b = color.b * color.a * 255;

  const img = ctx.createImageData(width, height);
  const data = img.data;
  for (let py = 0; py < height; py++) {
    // fragment centres sit at +0.5, as in WebGPU's @builtin(position)
    const ry = ((py + 0.5) * aspect - cy) / zoom;
    for (let px = 0; px < width; px++) {
      const rx = (px + 0.5 - cx) / zoom;
      const along = rx * cos + ry * sin;
      const across = -rx * sin + ry * cos;
      const waveY = amplitudePx * Math.sin(waveNumber * along + phase);
      const dist = Math.abs(across - waveY) / aspect;
      const core = 1 - smoothstep(2, 3, dist);
      const glow = 1 - Math.pow(Math.min(1, Math.max(0, dist / glowSpread)), 0.4);
      const brightness = Math.min(1, Math.max(0, core + glow * glowIntensity));
      const i = (py * width + px) * 4;
      data[i] = r * brightness;
      data[i + 1] = g * brightness;
      data[i + 2] = b * brightness;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
}

export default function WaveGlow({ className = "", ...params }: WaveParams & { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { x, y, radius, angle, amplitude, glowIntensity, zoom, offset, color } = params;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const p = { x, y, radius, angle, amplitude, glowIntensity, zoom, offset, color };
    let raf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => paint(canvas, p));
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [x, y, radius, angle, amplitude, glowIntensity, zoom, offset, color]);

  return <canvas ref={ref} aria-hidden className={`block h-full w-full ${className}`} />;
}
