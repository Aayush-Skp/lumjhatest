import type { Metadata } from "next";
import type { SVGProps } from "react";
import FeatureMarquee from "@/components/site/FeatureMarquee";
import HeroOrbit from "@/components/site/HeroOrbit";
import SectionHeader, { SECTION_HEAD_GAP } from "@/components/site/SectionHeader";
import { BenefitGrid, Faq, ProductHero, ProductPage, StepCards } from "@/components/site/ProductSections";
import {
  DiscordIcon,
  GoogleCalendarIcon,
  GoogleDriveIcon,
  SlackIcon,
  InstagramIcon,
  MessengerIcon,
  ShopifyIcon,
  TelegramIcon,
  WebsiteIcon,
  WhatsAppIcon,
} from "@/components/ui/ChannelIcons";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Lumjha AI to your customer channels — website, WhatsApp, Instagram, Messenger, Telegram, Google Calendar and Shopify.",
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

const MonoSlackIcon = (props: SVGProps<SVGSVGElement>) => <SlackIcon mono {...props} />;

const INTEGRATIONS = [
  { title: "Website", icon: <WebsiteIcon />, body: "Bring AI-powered assistance directly to your website." },
  { title: "WhatsApp", icon: <WhatsAppIcon />, body: "Support customer conversations through WhatsApp, where available." },
  { title: "Instagram", icon: <InstagramIcon />, body: "Connect customer interactions through supported Instagram integrations." },
  { title: "Messenger", icon: <MessengerIcon />, body: "Help customers connect through supported messaging channels." },
  { title: "Telegram", icon: <TelegramIcon />, body: "Explore AI-powered messaging experiences through supported Telegram integrations." },
  { title: "Google Calendar", icon: <GoogleCalendarIcon />, body: "Support appointment booking when configured." },
  { title: "Google Drive", icon: <GoogleDriveIcon />, body: "Train your AI agent on the documents you already keep in Google Drive." },
  { title: "Shopify", icon: <ShopifyIcon />, body: "Help shoppers discover products when supported features are enabled." },
  { title: "Discord", icon: <DiscordIcon />, body: "Answer questions for your community right inside your Discord server." },
  { title: "Slack", icon: <MonoSlackIcon />, body: "Bring your AI agent into Slack to help your team find answers fast." },
];

const FAQ = [
  {
    q: "What are Lumjha AI integrations?",
    a: "Integrations connect Lumjha AI with supported platforms and tools to enable AI-powered customer experiences.",
  },
  {
    q: "Which platforms does Lumjha AI support?",
    a: "Available integrations depend on your current Lumjha AI setup. Check the integrations available in your account.",
  },
  {
    q: "Can I connect Lumjha AI to my website?",
    a: "Website integration lets you bring Lumjha AI experiences to your website, depending on your selected product.",
  },
  {
    q: "Does Lumjha AI support appointment booking?",
    a: "Google Calendar appointment booking may be available when the relevant integration and features are configured.",
  },
  {
    q: "Can I connect my Shopify store?",
    a: "Shopify features depend on the supported integration and your configuration.",
  },
  {
    q: "How do I set up an integration?",
    a: "Choose an available integration and follow its setup instructions in Lumjha AI.",
  },
];

export default function IntegrationsPage() {
  return (
    <ProductPage>
      <ProductHero
        title="Connect Lumjha AI to Your"
        accent="Customer Channels."
        body="Bring your customer conversations and business knowledge closer together. Explore supported integrations to make it easier for customers to connect with your business."
      />
      {/* title on top, then the channel orbit + the blue feature band straight under it */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-12 [--orbit-bg:var(--site-page-deep)] sm:px-6 md:pt-[72px] lg:pb-5">
        <SectionHeader
          wide
          title="Your customers are everywhere. Stay connected."
          subtitle="Customers reach out through different platforms, and managing every conversation separately can be difficult. Lumjha AI helps bring AI-powered customer experiences to your supported channels."
        />
        <HeroOrbit className={SECTION_HEAD_GAP} />
      </section>
      <FeatureMarquee />
      <StepCards title="HOW IT WORKS" subtitle="From choosing a channel to helping customers." steps={STEPS} />
      <BenefitGrid title="Integration benefits" subtitle="One platform. More ways to connect." items={BENEFITS} />

      <BenefitGrid id="integrations" title="Integrations" subtitle="One platform. More ways to connect." items={INTEGRATIONS} />

      <Faq product="Lumjha AI Integrations" items={FAQ} />
    </ProductPage>
  );
}
