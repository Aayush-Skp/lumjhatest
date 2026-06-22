"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { site } from "@/content/site";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function FeaturePillars() {
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className="relative py-24 md:py-32"
    >
      <Container className="flex flex-col items-center gap-14">
        <SectionHeader
          eyebrow="Core Pillars"
          title={
            <span id="features-title">
              Built to answer, convert, and book — automatically.
            </span>
          }
          description="Capabilities built into every Lumjha workspace — grounded answers, persistent context, structured leads, appointments, live insights, and verified citations."
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {site.pillars.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={fadeUp} className="h-full">
              <Card variant="gradient-border" interactive>
                <div className="flex h-full flex-col gap-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand-300/25 bg-brand-300/10 text-brand-300">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-fg-high">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-fg-mid">
                    {description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
