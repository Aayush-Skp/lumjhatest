"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlowBackdrop } from "@/components/ui/GlowBackdrop";
import { PipelineDiagram } from "@/components/diagrams/PipelineDiagram";
import { site } from "@/content/site";

export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      className="relative py-24 md:py-32"
    >
      <GlowBackdrop
        position="center"
        size={800}
        intensity={0.25}
        color="rgb(var(--brand-500) / 0.35)"
      />
      <Container className="flex flex-col items-center gap-16">
        <SectionHeader
          eyebrow={site.pipeline.eyebrow}
          title={<span id="how-title">{site.pipeline.title}</span>}
          description={site.pipeline.description}
        />
        <PipelineDiagram steps={site.pipeline.steps} />
        <div className="flex items-center gap-2.5 rounded-full border border-stroke/15 bg-bg-2/60 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-fg-low backdrop-blur-xl">
          {site.pipeline.formats}
        </div>
      </Container>
    </section>
  );
}
