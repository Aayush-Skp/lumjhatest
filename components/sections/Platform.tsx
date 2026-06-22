"use client";

import { motion } from "framer-motion";
import { Boxes } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { site } from "@/content/site";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function Platform() {
  return (
    <section
      id="platform"
      aria-labelledby="platform-title"
      className="relative py-16 md:py-24"
    >
      <Container className="flex flex-col items-center gap-14">
        <SectionHeader
          eyebrow={site.platform.eyebrow}
          title={<span id="platform-title">{site.platform.title}</span>}
          description={site.platform.description}
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid w-full grid-cols-1 gap-5 md:grid-cols-3"
        >
          {site.platform.modules.map(({ icon: Icon, name, tag, description }) => (
            <motion.div key={name} variants={fadeUp} className="h-full">
              <Card variant="gradient-border" interactive>
                <div className="flex h-full flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-300/25 bg-brand-300/10 text-brand-300">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-low">
                      {tag}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-fg-high">
                    {name}
                  </h3>
                  <p className="text-sm leading-relaxed text-fg-mid">
                    {description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex max-w-3xl items-start gap-3 rounded-2xl border border-stroke/15 bg-bg-2/50 px-5 py-4 text-center text-sm leading-relaxed text-fg-mid backdrop-blur-xl sm:items-center sm:text-left">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand-300/20 bg-brand-300/10 text-brand-300 sm:mt-0">
            <Boxes className="h-4 w-4" strokeWidth={1.6} />
          </span>
          <span>{site.platform.footer}</span>
        </div>
      </Container>
    </section>
  );
}
