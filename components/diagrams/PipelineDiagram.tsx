"use client";

import { motion } from "framer-motion";
import { Upload, FileText, Scissors, Sparkles, Database } from "lucide-react";
import { fadeUp, stagger, viewport } from "@/lib/motion";

type Step = { n: number; title: string; detail: string };

const ICONS = [Upload, FileText, Scissors, Sparkles, Database];

export function PipelineDiagram({ steps }: { steps: Step[] }) {
  return (
    <motion.div
      role="img"
      aria-label="Five-step data ingestion pipeline: Data Ingestion, Text Extraction, Chunking, Embedding, Storage."
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="relative w-full"
    >
      {/* Desktop — horizontal flow */}
      <div className="hidden lg:block">
        <div className="relative grid grid-cols-5 gap-5">
          {/* flowing connector line behind nodes */}
          <svg
            aria-hidden
            className="pointer-events-none absolute top-[52px] left-0 h-px w-full"
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
          >
            <line
              x1="40"
              y1="1"
              x2="960"
              y2="1"
              stroke="rgb(var(--brand-300) / 0.55)"
              strokeWidth="1.25"
              className="dash-flow"
            />
          </svg>
          {steps.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div key={s.n} variants={fadeUp} className="flex flex-col items-center text-center">
                <div className="relative mb-5">
                  <div
                    className="flex h-[104px] w-[104px] items-center justify-center rounded-2xl border border-brand-300/25 bg-bg-3/80 backdrop-blur-xl"
                    style={{ filter: "drop-shadow(0 0 32px rgb(var(--brand-400) / 0.35))" }}
                  >
                    <Icon className="h-8 w-8 text-brand-300" strokeWidth={1.5} />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-300 text-bg-0 text-xs font-semibold shadow-[0_0_18px_rgb(var(--brand-300)/0.6)]">
                    {s.n}
                  </span>
                </div>
                <h4 className="font-display text-base font-semibold text-fg-high">{s.title}</h4>
                <p className="mt-2 max-w-[200px] text-sm leading-relaxed text-fg-mid">
                  {s.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile / tablet — vertical flow */}
      <div className="lg:hidden">
        <div className="relative flex flex-col gap-6">
          {steps.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            const isLast = i === steps.length - 1;
            return (
              <motion.div key={s.n} variants={fadeUp} className="relative flex gap-5">
                {/* icon + connector */}
                <div className="relative flex flex-col items-center">
                  <div
                    className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-brand-300/25 bg-bg-3/80 backdrop-blur-xl"
                    style={{ filter: "drop-shadow(0 0 24px rgb(var(--brand-400) / 0.3))" }}
                  >
                    <Icon className="h-6 w-6 text-brand-300" strokeWidth={1.5} />
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-300 text-bg-0 text-[10px] font-semibold">
                      {s.n}
                    </span>
                  </div>
                  {!isLast ? (
                    <svg
                      aria-hidden
                      className="mt-2 h-full w-px flex-1"
                      viewBox="0 0 1 80"
                      preserveAspectRatio="none"
                    >
                      <line
                        x1="0.5"
                        y1="0"
                        x2="0.5"
                        y2="80"
                        stroke="rgb(var(--brand-300) / 0.55)"
                        strokeWidth="1.25"
                        className="dash-flow"
                      />
                    </svg>
                  ) : null}
                </div>
                <div className="pb-4 pt-1">
                  <h4 className="font-display text-base font-semibold text-fg-high">{s.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-fg-mid">{s.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
