import type { Metadata } from "next";
import Image from "next/image";
import { BenefitGrid, Faq, IntroSplit, ProductHero, ProductPage, StepCards } from "@/components/site/ProductSections";

export const metadata: Metadata = {
  title: "Policy Vault",
  description:
    "Help people find clear answers in your business policies and documents, with exact quotations and source attribution.",
};

const A = "/assets/policy-vault";

const STEPS = [
  {
    icon: { src: `${A}/add-documents.svg`, width: 91.14, height: 91.14 },
    title: "Add your documents",
    body: "Bring your policy information into your configured Policy Vault.",
  },
  {
    icon: { src: `${A}/find-passages.svg`, width: 93.93, height: 93.93 },
    title: "Find relevant passages",
    body: "Locate the sections that address a question.",
  },
  {
    icon: { src: `${A}/verify-source.svg`, width: 77.19, height: 77.19 },
    title: "Verify the source",
    body: "Review exact quotations and their source attribution.",
  },
];

const ICON = { width: 38.4, height: 38.4 };

const BENEFITS = [
  {
    icon: { src: `${A}/relevant-results.svg`, ...ICON },
    title: "Relevant results, faster",
    body: "Help visitors find useful information without endless searching",
  },
  {
    icon: { src: "/assets/shared/natural-language.svg", ...ICON },
    title: "Natural language search",
    body: "Let visitors search using questions in their own words.",
  },
  {
    icon: { src: `${A}/policy-discovery.svg`, ...ICON },
    title: "Easier discovery",
    body: "Make important website information easier to find and explore.",
  },
  {
    icon: { src: "/assets/shared/clear-next-steps.svg", ...ICON },
    title: "Clear next steps",
    body: "Help visitors find relevant information and decide what to do next.",
  },
];

const FAQ = [
  {
    q: "What is Lumjha Policy Vault?",
    a: "Lumjha Policy Vault helps users find policy information through source-backed answers and exact quotations.",
  },
  {
    q: "How does Policy Vault work?",
    a: "It uses your configured policy sources to locate relevant passages and present the original wording.",
  },
  {
    q: "Can I verify where an answer comes from?",
    a: "Yes. Source attribution helps users trace information back to its originating material.",
  },
  {
    q: "Why use AI for policy lookup?",
    a: "It helps users locate relevant policy details without manually searching lengthy documents.",
  },
  {
    q: "Does Policy Vault provide exact quotations?",
    a: "Yes. Its exact quote mode provides quotations from source documents with attribution.",
  },
  {
    q: "How do I get started with Lumjha Policy Vault?",
    a: "Get started with Lumjha to explore the available setup and document options.",
  },
];

export default function PolicyVaultPage() {
  return (
    <ProductPage>
      <ProductHero
        title="Every Policy Answer,"
        accent="Backed by Your Sources."
        body="Help people find clear answers in your business policies and documents. Lumjha Policy Vault delivers answers with exact quotations and source attribution, so users can verify the information themselves."
      />
      <IntroSplit
        heading={
          <>
            Stop Guessing.
            <br />
            Find the <span className="text-[#5675FF]">Exact Answer.</span>
          </>
        }
        body="Important policy details can be difficult to locate across lengthy documents. Lumjha Policy Vault helps users find relevant policy information through source-backed answers and exact quotations."
        media={
          <Image
            src={`${A}/exact-answer.png`}
            alt="Policy documents feeding Lumjha, which answers “What is the refund policy?” with a quoted source"
            width={1833}
            height={858}
            sizes="(min-width: 1024px) 805px, 100vw"
            className="h-auto w-full max-w-[805px]"
          />
        }
      />
      <StepCards title="HOW IT WORKS" subtitle="From Policy Documents to Clear Answers." steps={STEPS} />
      <BenefitGrid
        title="Benefits - Lumjha Policy Vault"
        subtitle="Lumjha answers instantly across your channels, in your voice, using your own content, so more customers can take the next step."
        items={BENEFITS}
      />
      <Faq product="Lumjha Policy Vault" items={FAQ} />
    </ProductPage>
  );
}
