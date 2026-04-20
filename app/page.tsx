import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Channels } from "@/components/sections/Channels";
import { FeaturePillars } from "@/components/sections/FeaturePillars";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { RagFlow } from "@/components/sections/RagFlow";
import { Security } from "@/components/sections/Security";
import { WhatWeDontDo } from "@/components/sections/WhatWeDontDo";
import { LeadCapture } from "@/components/sections/LeadCapture";
import { Analytics } from "@/components/sections/Analytics";
import { Roadmap } from "@/components/sections/Roadmap";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { DemoModal } from "@/components/sections/DemoModal";
import { ScrollSpy } from "@/components/sections/ScrollSpy";

export default function Home() {
  return (
    <>
      <ScrollSpy />
      <Nav />
      <main className="relative flex-1">
        <Hero />
        <TrustStrip />
        <Channels />
        <FeaturePillars />
        <HowItWorks />
        <RagFlow />
        <Security />
        <WhatWeDontDo />
        <LeadCapture />
        <Analytics />
        <Roadmap />
        <CTA />
      </main>
      <Footer />
      <DemoModal />
    </>
  );
}
