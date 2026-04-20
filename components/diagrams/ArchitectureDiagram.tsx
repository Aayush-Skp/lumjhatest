"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { fadeUp, stagger, viewport } from "@/lib/motion";

type Layer = { icon: LucideIcon; name: string; role: string };

export function ArchitectureDiagram({ stack }: { stack: Layer[] }) {
  return (
    <motion.div
      role="img"
      aria-label="Architecture: MongoDB, Redis, S3, and Qdrant — specialized systems behind Lumjha."
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
    >
      {stack.map(({ icon: Icon, name, role }) => (
        <motion.div
          key={name}
          variants={fadeUp}
          className="group relative overflow-hidden rounded-2xl border border-stroke/10 bg-bg-3/70 p-6 backdrop-blur-xl transition-all duration-300 hover:border-brand-300/30 hover:-translate-y-0.5"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70"
            style={{
              background:
                "radial-gradient(closest-side, rgb(var(--brand-400)/0.45), transparent)",
            }}
          />

          <div className="relative z-10 flex flex-col gap-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-300/25 bg-brand-300/10 text-brand-300">
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <div>
              <h4 className="font-display text-lg font-semibold text-fg-high">
                {name}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-mid">{role}</p>
            </div>

            {/* faint data line */}
            <svg
              aria-hidden
              viewBox="0 0 200 1"
              preserveAspectRatio="none"
              className="h-px w-full opacity-60"
            >
              <line
                x1="0"
                y1="0.5"
                x2="200"
                y2="0.5"
                stroke="rgb(var(--brand-300) / 0.4)"
                strokeWidth="1"
                className="dash-flow"
              />
            </svg>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
