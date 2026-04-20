"use client";

import { motion } from "framer-motion";
import { Clock, Globe2, Code2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Stat } from "@/components/ui/Stat";
import { site } from "@/content/site";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const ICONS = [Clock, Globe2, Code2, ShieldCheck];

export function TrustStrip() {
  return (
    <section
      aria-label="Highlights"
      className="relative border-y border-stroke/10 bg-bg-1/40 py-8 backdrop-blur-xl"
    >
      <Container>
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid auto-rows-fr grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        >
          {site.trust.map((t, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div key={t.label} variants={fadeUp} className="h-full">
                <Stat value={t.value} label={t.label} icon={<Icon />} />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
