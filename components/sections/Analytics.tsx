"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/content/site";
import { fadeUp, stagger, viewport } from "@/lib/motion";

function Sparkline({ seed = 0 }: { seed?: number }) {
  // deterministic path
  const pts = Array.from({ length: 16 }).map((_, i) => {
    const y = 20 + Math.sin(i * 0.6 + seed) * 8 + (i % 3) * 1.5;
    return `${i * 7},${y.toFixed(1)}`;
  });
  return (
    <svg viewBox="0 0 110 40" className="h-10 w-full" aria-hidden>
      <defs>
        <linearGradient id={`spark-g-${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(var(--brand-300))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="rgb(var(--brand-300))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke="rgb(var(--brand-300))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts.join(" ")}
      />
      <polygon
        fill={`url(#spark-g-${seed})`}
        points={`0,40 ${pts.join(" ")} 110,40`}
      />
    </svg>
  );
}

export function Analytics() {
  return (
    <section
      id="analytics"
      aria-labelledby="analytics-title"
      className="relative py-16 md:py-24"
    >
      <Container className="flex flex-col items-center gap-14">
        <SectionHeader
          eyebrow={site.analytics.eyebrow}
          title={<span id="analytics-title">{site.analytics.title}</span>}
        />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {site.analytics.tiles.map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-stroke/10 bg-bg-3/60 p-5 backdrop-blur-xl transition-all hover:border-brand-300/25 hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-300/25 bg-brand-300/10 text-brand-300">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-fg-low">
                  24h
                </span>
              </div>
              <p className="mt-5 font-display text-2xl font-semibold text-fg-high">
                {value}
              </p>
              <p className="mt-1 text-xs text-fg-low">{label}</p>
              <div className="mt-4">
                <Sparkline seed={i + 1} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-fg-low">
          {site.analytics.footer}
        </p>
      </Container>
    </section>
  );
}
