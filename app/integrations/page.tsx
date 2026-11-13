import type { Metadata } from "next";
// import FeatureMarquee from "@/components/site/FeatureMarquee"; // band parked, see below
import HeroOrbit from "@/components/site/HeroOrbit";
import IntegrationBento, { type Integration } from "@/components/site/IntegrationBento";
// SectionHeader is only used by the parked "Your Customers Are Everywhere" section below
// import SectionHeader from "@/components/site/SectionHeader";
import { Accent } from "@/components/site/SectionHeader";
import { BenefitGrid, Faq, ProductHero, ProductPage, StepCards } from "@/components/site/ProductSections";
import {
  DiscordIcon,
  GoogleCalendarIcon,
  GoogleDriveColorIcon,
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

/* lg rhythm (3 cols): wide|narrow · three narrow · narrow|wide · three narrow.
   md (2 cols): WhatsApp and Slack span the row so no tile is left alone. */
const INTEGRATIONS: Integration[] = [
  { title: "WhatsApp", brand: "#25D366", icon: <WhatsAppIcon />, wide: true, span: "md:col-span-2", body: "Support customer conversations through WhatsApp, where available." },
  { title: "Instagram", brand: "#E1306C", icon: <InstagramIcon stroke="url(#ig-brand)" color="#D62976" />, body: "Connect customer interactions through supported Instagram integrations." },
  { title: "Website", brand: "#527DFF", icon: <WebsiteIcon />, body: "Bring AI-powered assistance directly to your website." },
  { title: "Messenger", brand: "#0A7CFF", icon: <MessengerIcon fill="url(#msg-brand)" />, body: "Help customers connect through supported messaging channels." },
  { title: "Telegram", brand: "#26A5E4", icon: <TelegramIcon />, body: "Explore AI-powered messaging experiences through supported Telegram integrations." },
  { title: "Google Drive", brand: "#00AC47", icon: <GoogleDriveColorIcon />, body: "Train your AI agent on the documents you already keep in Google Drive." },
  { title: "Google Calendar", brand: "#4285F4", icon: <GoogleCalendarIcon />, wide: true, span: "lg:col-span-2", body: "Support appointment booking when configured." },
  { title: "Shopify", brand: "#95BF47", icon: <ShopifyIcon />, body: "Help shoppers discover products when supported features are enabled." },
  { title: "Discord", brand: "#5865F2", icon: <DiscordIcon />, body: "Answer questions for your community right inside your Discord server." },
  { title: "Slack", brand: "#E01E5A", icon: <SlackIcon />, span: "md:col-span-2 lg:col-span-1", body: "Bring your AI agent into Slack to help your team find answers fast." },
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
      {/* hero → CTAs → the channel orbit straight under them */}
      <section className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6 md:pt-8">
        <HeroOrbit />
      </section>
      {/* "Your Customers Are Everywhere" section, parked for now
      <section className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-12 sm:px-6 md:pt-[72px] lg:pb-14">
        <SectionHeader
          wide
          title={<>Your Customers Are Everywhere. <Accent>Stay Connected</Accent></>}
          subtitle="Customers reach out through different platforms, and managing every conversation separately can be difficult. Lumjha AI helps bring AI-powered customer experiences to your supported channels."
        />
      </section>
      */}
      {/* scrolling feature band, parked for now */}
      {/* <FeatureMarquee /> */}
      <IntegrationBento id="integrations" title={<>We <Accent>Support</Accent></>} subtitle="One platform. More ways to connect." items={INTEGRATIONS} />
      <StepCards title={<>How It <Accent>Works</Accent></>} subtitle="From choosing a channel to helping customers." steps={STEPS} />
      <BenefitGrid title={<>Integration <Accent>Benefits</Accent></>} subtitle="One platform. More ways to connect." items={BENEFITS} bento />

      <Faq product="Lumjha AI Integrations" items={FAQ} />
    </ProductPage>
  );
}
