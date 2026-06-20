"use client";

import { motion } from "framer-motion";
import { Rocket, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { useUIStore } from "@/store/useUIStore";

export function CTA() {
  const { openDemo } = useUIStore();
  return (
    <section
      id="get-started"
      aria-labelledby="cta-title"
      className="relative py-24 md:py-32"
    >
      <Container>
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative isolate flex flex-col items-center gap-7 overflow-hidden rounded-3xl border border-stroke/15 bg-bg-2/60 px-6 py-16 text-center backdrop-blur-xl md:px-12 md:py-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -z-10 top-1/2 left-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl glow-pulse"
            style={{
              background:
                "radial-gradient(closest-side, rgb(var(--brand-400)/0.4), transparent 70%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-60"
          />

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3">
            <span
              aria-hidden
              className="h-px w-10 bg-gradient-to-r from-transparent via-brand-300 to-brand-300/60 shadow-[0_0_14px_rgb(var(--brand-300)/0.55)]"
            />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand-200">
              {site.cta.eyebrow}
            </span>
            <span
              aria-hidden
              className="h-px w-10 bg-gradient-to-l from-transparent via-brand-300 to-brand-300/60 shadow-[0_0_14px_rgb(var(--brand-300)/0.55)]"
            />
          </motion.div>
          <motion.h2
            id="cta-title"
            variants={fadeUp}
            className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-gradient-brand sm:text-4xl md:text-5xl"
          >
            {site.cta.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="max-w-xl text-base leading-relaxed text-fg-mid md:text-lg"
          >
            {site.cta.sub}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
            <Button variant="primary" size="lg" icon={<Rocket />} onClick={openDemo}>
              {site.cta.primary}
            </Button>
            <Button variant="outline" size="lg" icon={<Calendar />}>
              {site.cta.secondary}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
