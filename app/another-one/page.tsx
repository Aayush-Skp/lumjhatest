"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/another-one/layout/Navbar";
import Hero from "@/components/another-one/sections/Hero";
import SectionReveal from "@/components/another-one/ui/SectionReveal";
import StubSection from "@/components/another-one/sections/StubSection";
import { PageTrail } from "@/components/another-one/ui/PageTrail";
import OmniChannel from "@/components/another-one/sections/OmniChannel";
import Features from "@/components/another-one/sections/Features";
import Pipeline from "@/components/another-one/sections/Pipeline";
import RAG from "@/components/another-one/sections/RAG";
import Security from "@/components/another-one/sections/Security";
import Leads from "@/components/another-one/sections/Leads";
import Analytics from "@/components/another-one/sections/Analytics";
import Pricing from "@/components/another-one/sections/Pricing";

// The sticky product showcase (with all three live demos) is lazy-loaded,
// client-only.
const ProductShowcase = dynamic(
  () => import("@/components/another-one/sections/ProductShowcase"),
  { ssr: false },
);

export default function AnotherOnePage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        {/* Curve that threads through the sections, behind content */}
        <PageTrail />
        <div className="relative z-10">
        <Hero id="hero" />

        <SectionReveal>
          <StubSection
            id="platform"
            eyebrow="The Platform"
            title="Three modules, one knowledge base."
            body="Most tools give you a chatbot. Lumjha gives you a complete AI layer — three modules that share a single, secure knowledge base."
            elevated
          />
        </SectionReveal>

        {/* Sticky product showcase — Chatbot, Site Search, Policy Vault */}
        <ProductShowcase id="product-showcase" />

        <SectionReveal>
          <OmniChannel id="channels" />
        </SectionReveal>

        <SectionReveal>
          <Features id="features" />
        </SectionReveal>

        <SectionReveal>
          <Pipeline id="pipeline" />
        </SectionReveal>

        <SectionReveal>
          <RAG id="rag" />
        </SectionReveal>

        <SectionReveal>
          <Security id="security" />
        </SectionReveal>

        <SectionReveal>
          <Leads id="leads" />
        </SectionReveal>

        <SectionReveal>
          <Analytics id="analytics" />
        </SectionReveal>

        <SectionReveal>
          <StubSection
            id="roadmap"
            eyebrow="Roadmap"
            title="Future enhancements, already scoped."
          />
        </SectionReveal>

        <SectionReveal>
          <Pricing id="pricing" />
        </SectionReveal>

        {/* Final CTA */}
        <SectionReveal>
          <section
            id="get-started"
            className="a1-section py-24 text-center md:py-32"
          >
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <h2 className="font-display text-display-lg text-[var(--color-text-primary)]">
                Your data is your asset. Make it work for you.
              </h2>
              <p className="mx-auto mt-6 max-w-xl font-body text-body-lg text-[var(--color-text-secondary)]">
                Spin up your first Lumjha agent in under 5 minutes — no credit
                card, no code. Get the Chatbot, Site Search, and Policy Vault
                free for 14 days.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href="https://app.lumjha.ai/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 font-body font-semibold text-body-md text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_var(--color-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                >
                  Start Free
                </a>
                <a
                  href="https://app.lumjha.ai/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-bright)] px-6 py-3 font-body font-medium text-body-md text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                >
                  Book a Demo
                </a>
              </div>
            </div>
          </section>
        </SectionReveal>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-2)] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="font-display text-xl font-extrabold text-[var(--color-text-primary)]">
              Lum<span className="text-[var(--color-accent)]">jha</span>
            </span>
            <p className="mt-2 max-w-sm font-body text-body-sm text-[var(--color-text-secondary)]">
              Create your best agent. Automate your growth.
            </p>
          </div>
          <div className="flex flex-col gap-1 font-body text-body-sm text-[var(--color-text-secondary)] md:items-end">
            <a
              href="mailto:info@lumjha.ai"
              className="transition-colors hover:text-[var(--color-accent)]"
            >
              info@lumjha.ai
            </a>
            <span className="font-mono text-caption text-[var(--color-text-muted)]">
              © 2026 Lumjha. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
