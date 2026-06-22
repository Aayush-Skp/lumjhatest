"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RagDiagram } from "@/components/diagrams/RagDiagram";
import { site } from "@/content/site";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function RagFlow() {
  return (
    <section
      id="rag"
      aria-labelledby="rag-title"
      className="relative py-16 md:py-24"
    >
      <Container className="flex flex-col gap-14">
        <SectionHeader
          eyebrow={site.rag.eyebrow}
          title={<span id="rag-title">{site.rag.title}</span>}
          align="center"
        />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <RagDiagram />
          </div>

          <motion.ul
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="flex flex-col gap-5 lg:col-span-2"
          >
            {site.rag.beats.map((b, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                className="flex gap-4 rounded-2xl border border-stroke/10 bg-bg-3/50 p-5 backdrop-blur-xl"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-300/10 font-mono text-sm font-semibold text-brand-300">
                  0{i + 1}
                </span>
                <p className="pt-0.5 text-sm leading-relaxed text-fg-mid">{b}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
