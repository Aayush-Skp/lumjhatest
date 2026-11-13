import type { Metadata } from "next";
import Image from "next/image";
import { Accent } from "@/components/site/SectionHeader";
import { BenefitGrid, Faq, IntroSplit, ProductHero, ProductPage, StepCards } from "@/components/site/ProductSections";

export const metadata: Metadata = {
  title: "AI Site Search",
  description:
    "Help visitors find what they need without digging through pages. Lumjha AI Site Search makes your website content easier to explore.",
};

const A = "/assets/site-search";

const STEPS = [
  {
    icon: { src: `${A}/connect-site.svg`, width: 91.14, height: 91.14 },
    title: "Connect your Site",
    body: "Bring your website information together to make it searchable.",
  },
  {
    icon: { src: `${A}/ai-understand.svg`, width: 93.93, height: 93.93 },
    title: "Let AI understand",
    body: "Help visitors find relevant content based on what they’re looking for.",
  },
  {
    icon: { src: `${A}/help-discover.svg`, width: 77.19, height: 77.19 },
    title: "Help visitors discover",
    body: "Guide visitors to useful information and their next step.",
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
    icon: { src: `${A}/easier-discovery.svg`, ...ICON },
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
    q: "What is Lumjha AI Site Search?",
    a: "Lumjha AI Site Search helps visitors discover relevant information across your website content.",
  },
  {
    q: "How does AI Site Search work?",
    a: "It uses connected website content to help visitors find useful information.",
  },
  {
    q: "How is AI Site Search different from traditional search?",
    a: "It helps visitors discover relevant content based on the meaning of their search queries.",
  },
  {
    q: "What content can Lumjha AI Site Search search?",
    a: "Available content sources depend on your Lumjha AI setup and supported integrations.",
  },
  {
    q: "Can AI Site Search help visitors find information faster?",
    a: "Yes. It makes relevant website content easier to discover and explore.",
  },
  {
    q: "How do I get started with Lumjha AI Site Search?",
    a: "Explore the demo or get started with Lumjha AI to see how site search can work for your website.",
  },
];

export default function SiteSearchPage() {
  return (
    <ProductPage>
      <ProductHero
        title="Find What You Need,"
        accent="Faster."
        body="Help visitors find what they need without digging through pages. Lumjha AI Site Search makes your website content easier to explore, helping visitors discover relevant information faster."
      />
      <IntroSplit
        heading={
          <>
            Your Website Knowledge, Easily <Accent>Discovered</Accent>
          </>
        }
        body="Connect your website content and help visitors find relevant information with less effort. Lumjha AI makes your existing content easier to search and navigate on your website."
        media={
          <Image
            src={`${A}/website-discovered.png`}
            alt="Lumjha AI Site Search answering “How do I choose the right plan?” with relevant pages"
            width={1536}
            height={1024}
            sizes="(min-width: 1024px) 616px, 100vw"
            className="h-auto w-full max-w-[616px] rounded-2xl"
          />
        }
      />
      <StepCards title={<>How It <Accent>Works</Accent></>} subtitle="From your knowledge to helpful conversations." steps={STEPS} />
      <BenefitGrid
        title={<>Benefits - <Accent>Lumjha AI Search Site</Accent></>}
        subtitle="Lumjha AI answers instantly across your channels, in your voice, using your own content, so more customers can take the next step."
        items={BENEFITS}
        bento
      />
      <Faq product="Lumjha AI Site Search" items={FAQ} />
    </ProductPage>
  );
}
