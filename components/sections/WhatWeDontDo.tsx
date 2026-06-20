"use client";

import { motion } from "framer-motion";
import { Ban } from "lucide-react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/content/site";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function WhatWeDontDo() {
  return (
    <section
      id="transparency"
      aria-labelledby="denials-title"
      className="relative py-24 md:py-32"
    >
      <Container className="flex flex-col items-center gap-14">
        <SectionHeader
          eyebrow={site.denials.eyebrow}
          title={<span id="denials-title">{site.denials.title}</span>}
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
        >
          {site.denials.items.map((item, i) => (
            <motion.div
              key={item}
              variants={fadeUp}
              className={cn(
                "group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-stroke/10 bg-bg-3/60 p-5 pl-6 backdrop-blur-xl transition-colors hover:border-danger/30",
                i === site.denials.items.length - 1 && "md:col-span-2",
              )}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-danger/70 via-danger/30 to-transparent"
              />
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-danger/25 bg-danger/10 text-danger">
                <Ban className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <p className="pt-2 text-sm leading-relaxed text-fg-mid">
                {item}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
