import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CtaSection from "@/components/site/CtaSection";
import PricingPlans from "@/components/site/PricingPlans";
import SectionHeader, { SECTION_HEAD_GAP } from "@/components/site/SectionHeader";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple Lumjha plans for every stage of growth. Start free, or try any paid plan free for 14 days. Pay annually and get 2 months free.",
};

/* ============================================================
   Pricing — plans page (Figma design)
   ============================================================ */

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#030816] font-sans text-white antialiased light:bg-[#F5F7FC] light:text-[#0B1526]">
      <Navbar prefix="/" />
      <main id="top" className="relative overflow-x-clip">
        <div className="pointer-events-none absolute -left-40 top-56 h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/30 blur-[120px] light:bg-[#527DFF]/10" />
        <div className="pointer-events-none absolute -right-40 top-[700px] h-[500px] w-[300px] rounded-full bg-[#1B3AA0]/25 blur-[120px] light:bg-[#527DFF]/10" />

        {/* HERO + PLANS */}
        <section id="plans" className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20">
          {/* TODO: swap in the Figma headline + description once the copy is pulled */}
          <SectionHeader
            as="h1"
            title="Plans for Every Stage of Growth."
            subtitle="Start free to explore, or pick a plan tailored to your team's support volume."
          />
          <PricingPlans className={SECTION_HEAD_GAP} />
        </section>

        <CtaSection />

        <Footer />
      </main>
    </div>
  );
}
