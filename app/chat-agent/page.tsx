import type { Metadata } from "next";
import Image from "next/image";
import { BenefitGrid, Faq, IntroSplit, ProductHero, ProductPage, StepCards } from "@/components/site/ProductSections";

export const metadata: Metadata = {
  title: "AI Chat Agent",
  description:
    "Meet your AI-powered customer agent. Answer customer questions around the clock using your business knowledge, and guide visitors toward the next step.",
};

const A = "/assets/chat-agent";

const STEPS = [
  {
    icon: { src: `${A}/connect-knowledge.svg`, width: 91.14, height: 91.14 },
    title: "Connect your knowledge",
    body: "Provide the business information your agent should use to answer customer questions.",
  },
  {
    icon: { src: `${A}/configure-agent.svg`, width: 93.93, height: 93.93 },
    title: "Configure your agent",
    body: "Set up its instructions and customer-facing experience to suit your business.",
  },
  {
    icon: { src: `${A}/help-customers.svg`, width: 77.19, height: 77.19 },
    title: "Start helping customers",
    body: "Make your agent available through the supported channels configured for your business.",
  },
];

const ICON = { width: 38.4, height: 38.4 };

const BENEFITS = [
  {
    icon: { src: `${A}/instant-answers.svg`, ...ICON },
    title: "Instant answers, 24/7",
    body: "Answer customer questions anytime, even outside business hours.",
  },
  {
    icon: { src: `${A}/lead-capture.svg`, ...ICON },
    title: "Lead capture in conversation",
    body: "Turn customer questions into opportunities by capturing leads naturally.",
  },
  {
    icon: { src: `${A}/appointment-booking.svg`, ...ICON },
    title: "Appointment booking",
    body: "Let customers book appointments directly through Google Calendar.",
  },
  {
    icon: { src: `${A}/shopify-cart.svg`, ...ICON },
    title: "Shopify search and cart",
    body: "Help shoppers find products and move toward checkout with less friction.",
  },
  {
    icon: { src: `${A}/live-voice.svg`, ...ICON },
    title: "Live voice on your website",
    body: "Let visitors ask questions and get answers by speaking naturally.",
  },
  {
    icon: { src: `${A}/human-takeover.svg`, ...ICON },
    title: "Human takeover",
    body: "Let your team step into conversations on supported messaging apps whenever personal help is needed.",
  },
];

const FAQ = [
  {
    q: "What is Lumjha AI Chat Agent?",
    a: "An AI-powered customer agent that answers questions using your business knowledge.",
  },
  {
    q: "How does an AI chat agent work?",
    a: "Connect your business information, configure your agent, and deploy it through supported channels.",
  },
  {
    q: "Can Lumjha provide 24/7 customer support?",
    a: "Yes, it can help answer customer questions around the clock when deployed and available.",
  },
  {
    q: "Where does Lumjha get its answers?",
    a: "It uses your connected website content, documents, help resources, and business information.",
  },
  {
    q: "What if the AI chatbot doesn’t know an answer?",
    a: "It should acknowledge missing information instead of making up an answer.",
  },
  {
    q: "Which channels does Lumjha support?",
    a: "Available channels depend on your setup. Visit our Integrations page to explore supported options.",
  },
];

export default function ChatAgentPage() {
  return (
    <ProductPage>
      <ProductHero
        title="Every Customer Question"
        accent="Deserves an Answer."
        body="Meet your AI-powered customer agent. Answer customer questions around the clock using your business knowledge, help visitors find the information they need, and guide them toward the next step."
      />
      <IntroSplit
        heading={
          <>
            Your business knowledge, all <span className="text-[#5675FF]">connected.</span>
          </>
        }
        body="Bring your website content, documents, help center, and business information together in one place. Lumjha uses your knowledge to deliver relevant answers and help customers find the information they need."
        media={
          <Image
            src={`${A}/knowledge-connected.png`}
            alt="Website content, PDF documents, help center and custom information flowing into Lumjha"
            width={1598}
            height={984}
            sizes="(min-width: 1024px) 655px, 100vw"
            className="h-auto w-full max-w-[655px]"
          />
        }
      />
      <StepCards title="HOW IT WORKS" subtitle="From your knowledge to helpful conversations." steps={STEPS} />
      <BenefitGrid
        title="Benefits - Lumjha Chat Agent"
        subtitle="Lumjha answers instantly across your channels, in your voice, using your own content, so more customers can take the next step."
        items={BENEFITS}
      />
      <Faq product="Lumjha AI Chat Agent" items={FAQ} />
    </ProductPage>
  );
}
