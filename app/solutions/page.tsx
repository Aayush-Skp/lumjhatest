"use client";

import dynamic from "next/dynamic";
import Navbar, { type NavLink } from "@/components/another-one/layout/Navbar";
import Footer from "@/components/another-one/layout/Footer";
import SectionReveal from "@/components/another-one/ui/SectionReveal";
import { PageTrail } from "@/components/another-one/ui/PageTrail";
import OmniChannel from "@/components/another-one/sections/OmniChannel";
import Pricing from "@/components/another-one/sections/Pricing";

import SolutionsHero from "@/components/solutions/Hero";
import ValuePillars from "@/components/solutions/ValuePillars";
import HowItWorks from "@/components/solutions/HowItWorks";
import SmartAnswers from "@/components/solutions/SmartAnswers";
import TrustGuarantee from "@/components/solutions/TrustGuarantee";
import LeadCapture from "@/components/solutions/LeadCapture";
import InsightsDashboard from "@/components/solutions/InsightsDashboard";

const ProductShowcase = dynamic(
  () => import("@/components/another-one/sections/ProductShowcase"),
  { ssr: false },
);

// Nav links mapped to this page's actual section ids (they differ from the
// /another-one route, so we override the Navbar's defaults here).
const SOLUTIONS_NAV_LINKS: NavLink[] = [
  { label: "Platform", href: "#product-showcase" },
  { label: "Features", href: "#value-pillars" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Security", href: "#trust" },
];

export default function SolutionsPage() {
  return (
    <>
      <Navbar links={SOLUTIONS_NAV_LINKS} />
      <main className="relative">
        <PageTrail />
        <div className="relative z-10">
          <SolutionsHero id="hero" />

          {/* Live product demos — Chatbot, Site Search, Policy Vault */}
          <ProductShowcase id="product-showcase" />

          <SectionReveal>
            <OmniChannel id="channels" />
          </SectionReveal>

          <SectionReveal>
            <ValuePillars id="value-pillars" />
          </SectionReveal>

          <SectionReveal>
            <HowItWorks id="how-it-works" />
          </SectionReveal>

          <SectionReveal>
            <SmartAnswers id="smart-answers" />
          </SectionReveal>

          <SectionReveal>
            <TrustGuarantee id="trust" />
          </SectionReveal>

          <SectionReveal>
            <LeadCapture id="leads" />
          </SectionReveal>

          <SectionReveal>
            <InsightsDashboard id="insights" />
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
                  Ready to never miss another customer?
                </h2>
                <p className="mx-auto mt-6 max-w-xl font-body text-body-lg text-[var(--color-text-secondary)]">
                  Join businesses who answer customers 24/7, capture more leads,
                  and grow — without extra staff or complexity. Your first 14 days
                  are completely free.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a
                    href="https://app.lumjha.ai/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 font-body font-semibold text-body-md text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_var(--color-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  >
                    Start Free — No Card Needed
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

      <Footer quickLinks={SOLUTIONS_NAV_LINKS} />
    </>
  );
}
