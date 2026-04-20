"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/content/site";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function Roadmap() {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-title"
      className="relative py-24 md:py-32"
    >
      <Container className="flex flex-col items-center gap-14">
        <SectionHeader
          eyebrow={site.roadmap.eyebrow}
          title={<span id="roadmap-title">{site.roadmap.title}</span>}
        />

        {/* Horizontal timeline */}
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative w-full"
        >
          <svg
            aria-hidden
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
            className="absolute top-[34px] left-0 hidden h-px w-full md:block"
          >
            <line
              x1="40"
              y1="1"
              x2="960"
              y2="1"
              stroke="rgb(var(--brand-300) / 0.45)"
              strokeWidth="1.25"
              className="dash-flow"
            />
          </svg>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-5">
            {site.roadmap.items.map((item, i) => (
              <motion.div key={item} variants={fadeUp} className="flex flex-col gap-4">
                <div className="relative mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-brand-300/25 bg-bg-3/80 backdrop-blur-xl md:mx-0">
                  <span className="font-mono text-lg font-semibold text-brand-300">
                    0{i + 1}
                  </span>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                      filter: "drop-shadow(0 0 20px rgb(var(--brand-400) / 0.35))",
                    }}
                  />
                </div>
                <p className="text-sm leading-relaxed text-fg-mid md:max-w-[220px]">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
