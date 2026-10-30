import type { Metadata } from "next";
import Image from "next/image";
import FeatureMarquee from "@/components/site/FeatureMarquee";
import HeroOrbit from "@/components/site/HeroOrbit";
import SectionHeader, { SECTION_HEAD_GAP, SECTION_Y } from "@/components/site/SectionHeader";
import { BenefitGrid, Faq, ProductHero, ProductPage, StepCards } from "@/components/site/ProductSections";
import Tilt from "@/components/ui/Tilt";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Lumjha to your customer channels — website, WhatsApp, Instagram, Messenger, Telegram, Google Calendar and Shopify.",
};

const A = "/assets/integration";

const STEPS = [
  {
    icon: { src: `${A}/choose-integration.svg`, width: 91.14, height: 91.14 },
    title: "Choose your integration",
    body: "Find the supported platform that fits your needs.",
  },
  {
    icon: { src: `${A}/connect-account.svg`, width: 93.93, height: 93.93 },
    title: "Connect your account",
    body: "Follow the setup instructions for your selected integration.",
  },
  {
    icon: { src: `${A}/configure-experience.svg`, width: 77.19, height: 77.19 },
    title: "Configure your experience",
    body: "Set up your AI agent and start helping customers through the connected channel.",
  },
];

const ICON = { width: 38.4, height: 38.4 };

const BENEFITS = [
  {
    icon: { src: `${A}/customer-channels.svg`, ...ICON },
    title: "Reach customers where they are",
    body: "Connect through supported platforms your customers already use.",
  },
  {
    icon: { src: `${A}/consistent-answers.svg`, ...ICON },
    title: "Keep answers consistent",
    body: "Use your business knowledge to provide relevant information across configured channels.",
  },
  {
    icon: { src: `${A}/customer-support.svg`, ...ICON },
    title: "Simplify customer support",
    body: "Let your AI agent help handle recurring questions.",
  },
  {
    icon: { src: `${A}/stay-in-control.svg`, ...ICON },
    title: "Stay in control",
    body: "Configure your integrations to suit your business needs.",
  },
];

// Logo boxes keep each icon's Figma footprint (the art is cropped to fit, as in the design).
const INTEGRATIONS = [
  { name: "Website", logo: "website.png", w: 79, h: 78, body: "Bring AI-powered assistance directly to your website." },
  { name: "WhatsApp", logo: "whatsapp.png", w: 79, h: 78, body: "Support customer conversations through WhatsApp, where available." },
  { name: "Instagram", logo: "instagram.png", w: 89, h: 88, body: "Connect customer interactions through supported Instagram integrations." },
  { name: "Messenger", logo: "messenger.png", w: 79, h: 82, body: "Help customers connect through supported messaging channels." },
  { name: "Telegram", logo: "telegram.png", w: 89, h: 89, body: "Explore AI-powered messaging experiences through supported Telegram integrations." },
  { name: "Google Calendar", logo: "google-calendar.png", w: 79, h: 79, body: "Support appointment booking when configured." },
  { name: "Shopify", logo: "shopify.png", w: 79, h: 90, body: "Help shoppers discover products when supported features are enabled." },
];

const FAQ = [
  {
    q: "What are Lumjha AI integrations?",
    a: "Integrations connect Lumjha with supported platforms and tools to enable AI-powered customer experiences.",
  },
  {
    q: "Which platforms does Lumjha support?",
    a: "Available integrations depend on your current Lumjha setup. Check the integrations available in your account.",
  },
  {
    q: "Can I connect Lumjha to my website?",
    a: "Website integration lets you bring Lumjha experiences to your website, depending on your selected product.",
  },
  {
    q: "Does Lumjha support appointment booking?",
    a: "Google Calendar appointment booking may be available when the relevant integration and features are configured.",
  },
  {
    q: "Can I connect my Shopify store?",
    a: "Shopify features depend on the supported integration and your configuration.",
  },
  {
    q: "How do I set up an integration?",
    a: "Choose an available integration and follow its setup instructions in Lumjha.",
  },
];

export default function IntegrationsPage() {
  return (
    <ProductPage>
      <ProductHero
        title="Connect Lumjha to Your"
        accent="Customer Channels."
        body="Bring your customer conversations and business knowledge closer together. Explore supported integrations to make it easier for customers to connect with your business."
      />
      {/* title on top, then the channel orbit + the blue feature band straight under it */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-12 [--orbit-bg:var(--site-page-deep)] sm:px-6 md:pt-[72px] lg:pb-5">
        <SectionHeader
          wide
          title="Your customers are everywhere. Stay connected."
          subtitle="Customers reach out through different platforms, and managing every conversation separately can be difficult. Lumjha helps bring AI-powered customer experiences to your supported channels."
        />
        <HeroOrbit className={SECTION_HEAD_GAP} />
      </section>
      <FeatureMarquee />
      <StepCards title="HOW IT WORKS" subtitle="From choosing a channel to helping customers." steps={STEPS} />
      <BenefitGrid title="Integration benefits" subtitle="One platform. More ways to connect." items={BENEFITS} />

      <section id="integrations" className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 ${SECTION_Y}`}>
        <SectionHeader title="Integrations" subtitle="One platform. More ways to connect." />
        <ul className={`mx-auto flex w-full max-w-[1160px] flex-col gap-5 md:gap-[52px] ${SECTION_HEAD_GAP}`}>
          {INTEGRATIONS.map((it) => (
            <li key={it.name}>
              <Tilt className="rounded-[10px]" max={2} scale={1.01} glare={false}>
              <div className="flex min-h-[114px] items-center gap-5 rounded-[10px] bg-white px-4 py-3 text-[#5675FF] ring-1 ring-card-ring md:gap-0 md:px-[21px]">
                <span className="flex w-16 shrink-0 items-center justify-center md:w-[127px] md:justify-start">
                  <span className="relative block max-h-16 max-w-16 md:max-h-none md:max-w-none" style={{ width: it.w, height: it.h }}>
                    <Image src={`${A}/${it.logo}`} alt={`${it.name} logo`} fill sizes="90px" className="object-cover" />
                  </span>
                </span>
                <span>
                  <span className="block text-xl font-bold leading-[30px] md:text-2xl">{it.name}</span>
                  <span className="block text-[15px] leading-[30px] md:text-base">{it.body}</span>
                </span>
              </div>
              </Tilt>
            </li>
          ))}
        </ul>
      </section>

      <Faq product="Lumjha Integrations" items={FAQ} />
    </ProductPage>
  );
}
