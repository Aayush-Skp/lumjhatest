"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { site } from "@/content/site";

export function DataArchitecture() {
  return (
    <section
      id="architecture"
      aria-labelledby="arch-title"
      className="relative py-24 md:py-32"
    >
      <Container className="flex flex-col gap-14">
        <SectionHeader
          eyebrow={site.architecture.eyebrow}
          title={<span id="arch-title">{site.architecture.title}</span>}
        />
        <ArchitectureDiagram stack={site.architecture.stack} />
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-fg-low">
          {site.architecture.footer}
        </p>
      </Container>
    </section>
  );
}
