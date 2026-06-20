"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Feature } from "@/components/ui/Feature";
import { site } from "@/content/site";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function Security() {
  return (
    <section
      id="security"
      aria-labelledby="security-title"
      className="relative py-24 md:py-32"
    >
      <Container className="flex flex-col items-center gap-14">
        <SectionHeader
          eyebrow={site.security.eyebrow}
          title={<span id="security-title">{site.security.title}</span>}
        />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {site.security.items.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} variants={fadeUp} className="h-full">
              <Card variant="glass" interactive>
                <Feature
                  icon={<Icon />}
                  title={title}
                  description={description}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
