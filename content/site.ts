/**
 * Single source of truth for all landing-page copy.
 * Sourced from the Lumjha Docs master prompt — do not paraphrase
 * the denial list or pipeline step names.
 */

import type { LucideIcon } from "lucide-react";
import {
  Brain,
  MessagesSquare,
  Target,
  BarChart3,
  CalendarCheck,
  BadgeCheck,
  Lock,
  KeyRound,
  ShieldCheck,
  Boxes,
  Database,
  Gauge,
  HardDrive,
  Network,
  ArrowUpRight,
  Smile,
  Tag,
  Signal,
  FileText,
  Bot,
  Search,
  ScrollText,
} from "lucide-react";

export const site = {
  brand: {
    name: "Lumjha",
    wordmark: "Lumjha",
    tagline: "Enable Your best agent. Automate your growth.",
  },

  // External app entry — all login / start / get-started CTAs point here.
  urls: {
    login: "https://app.lumjha.ai/login",
  },

  nav: {
    links: [
      { id: "platform", label: "Platform" },
      { id: "features", label: "Features" },
      { id: "how", label: "How it works" },
      { id: "pricing", label: "Pricing" },
      { id: "security", label: "Security" },
    ],
    cta: { primary: "Start Free", secondary: "Log in" },
  },

  hero: {
    eyebrow: "RAG-Powered · No-Code Builder · Custom Knowledge",
    headline: ["Enable Your best agent. Automate your growth."],
    sub: "Deploy a no-code AI assistant that learns every document, page, and policy in your business and speaks in your exact brand voice. Engage customers 24/7 across Website, WhatsApp, Instagram, Facebook, and Telegram — capture qualified leads and book appointments while you sleep.",
    ctas: {
      primary: "Build Your Agent Free",
      secondary: "See how it works",
    },
    proof: [
      "100% grounded in your data",
      "Live in minutes",
      "14-day full-feature trial",
    ],
  },

  trust: [
    { value: "24/7", label: "Always on" },
    { value: "5+", label: "Channels" },
    { value: "0", label: "Lines of code" },
    { value: "100%", label: "Grounded data" },
  ],

  platform: {
    eyebrow: "The Platform",
    title: "Three modules, one knowledge base.",
    description:
      "Most tools give you a chatbot. Lumjha gives you a complete AI layer for customer engagement — three modules that share a single, secure knowledge base, so everything your agent learns is instantly available everywhere.",
    modules: [
      {
        icon: Bot as LucideIcon,
        name: "Chatbot",
        tag: "Always-on agent",
        description:
          "Your always-on conversational agent — answers questions, captures leads, books appointments, and talks to customers across every channel in your brand voice.",
      },
      {
        icon: Search as LucideIcon,
        name: "Site Search",
        tag: "AI-native search",
        description:
          "AI-native search across your entire site and document library. Visitors ask a question; Lumjha returns the precise, summarized answer with sources — not ten blue links.",
      },
      {
        icon: ScrollText as LucideIcon,
        name: "Policy Vault",
        tag: "Verbatim & cited",
        description:
          "Ask in plain language; Policy Vault understands your intent, finds the exact passage in your uploaded policies, contracts, or compliance docs, and returns it word-for-word with a citation. Where the Chatbot generates and Site Search summarizes, Policy Vault quotes the source as-is.",
      },
    ],
    footer:
      "Start with the Chatbot; add Site Search and Policy Vault when you're ready — they snap onto the same knowledge base with no re-setup.",
  },

  channels: {
    eyebrow: "Omnichannel",
    title: "Meet your customers wherever they already are.",
    description:
      "One agent, one knowledge base, every channel. Roll Lumjha out on your website, your socials, and your messaging apps — no separate bots, no duplicated content.",
    list: [
      { id: "web", name: "Website", tag: "Embed widget" },
      { id: "whatsapp", name: "WhatsApp", tag: "Business API" },
      { id: "instagram", name: "Instagram", tag: "DMs + comments" },
      { id: "facebook", name: "Facebook", tag: "Messenger" },
      { id: "telegram", name: "Telegram", tag: "Bot API" },
      { id: "shopify", name: "Shopify", tag: "Storefront" },
      { id: "gcal", name: "Google Calendar", tag: "Appointments" },
    ],
    footer: "Plus custom integrations via webhooks and REST API.",
  },

  pillars: [
    {
      icon: Brain as LucideIcon,
      title: "Accurate AI Responses",
      description:
        "Precise answers generated from your uploaded documents and website — never generic.",
    },
    {
      icon: MessagesSquare as LucideIcon,
      title: "Conversation Continuity",
      description:
        "Sessions persist, context carries, every reply remembers the last.",
    },
    {
      icon: Target as LucideIcon,
      title: "Lead Generation & Conversion",
      description:
        "Structured lead capture baked into the chat — turn conversations into pipeline.",
    },
    {
      icon: CalendarCheck as LucideIcon,
      title: "Appointment Booking",
      description:
        "The agent checks availability and books straight into your Google Calendar.",
    },
    {
      icon: BarChart3 as LucideIcon,
      title: "Performance Insights",
      description:
        "Track usage, message counts, lead status, sentiment and intent — all on the dashboard.",
    },
    {
      icon: BadgeCheck as LucideIcon,
      title: "Verbatim Verification",
      description:
        "With Policy Vault, every quoted phrase is checked word-for-word against the source; unverified answers are flagged.",
    },
  ],

  pipeline: {
    eyebrow: "Pipeline",
    title: "From your content to intelligent answers.",
    description:
      "Five deterministic stages turn raw documents into semantically searchable knowledge your agent can reason with.",
    steps: [
      {
        n: 1,
        title: "Data Ingestion",
        detail:
          "Files uploaded or websites crawled. Metadata stored securely.",
      },
      {
        n: 2,
        title: "Text Extraction",
        detail:
          "Content lifted from PDF / Word / Excel / Markdown / text. Converted to clean readable text.",
      },
      {
        n: 3,
        title: "Chunking (Segmentation)",
        detail:
          "Large content split into logical sections — each chunk tagged with topic, section, page.",
      },
      {
        n: 4,
        title: "Embedding (AI Transformation)",
        detail:
          "Each chunk converted to a vector. Enables semantic understanding, not keyword matching.",
      },
      {
        n: 5,
        title: "Storage",
        detail:
          "Raw files → secure storage · Text → database · Embeddings → vector DB.",
      },
    ],
    formats: "Supported file types: PDF · DOCX · XLSX · Markdown · TXT",
  },

  rag: {
    eyebrow: "Retrieval-Augmented Generation",
    title: "Retrieval-Augmented Generation, tuned to your business.",
    beats: [
      "The system analyzes the user's query.",
      "Semantic search pulls the most relevant chunks from your knowledge base.",
      "The AI blends retrieved context + conversation history → contextual, grounded answer.",
    ],
  },

  architecture: {
    eyebrow: "Data architecture",
    title: "Built on specialized systems, not one-size-fits-all.",
    stack: [
      {
        icon: Database as LucideIcon,
        name: "MongoDB",
        role: "Users, chats, leads, metadata.",
      },
      {
        icon: Gauge as LucideIcon,
        name: "Redis",
        role: "Session cache, partial lead data.",
      },
      {
        icon: HardDrive as LucideIcon,
        name: "S3 (or equivalent)",
        role: "Raw uploaded documents + assets.",
      },
      {
        icon: Network as LucideIcon,
        name: "Qdrant",
        role: "Vector embeddings for semantic retrieval.",
      },
    ],
    footer:
      "Event-driven under the hood — each service runs independently, so load in one place never blocks another.",
  },

  security: {
    eyebrow: "Security",
    title: "Your data, your control — always.",
    items: [
      {
        icon: KeyRound as LucideIcon,
        title: "Access Control",
        description:
          "Authenticated access on every protected route; role-based separation of users and admins.",
      },
      {
        icon: Lock as LucideIcon,
        title: "Session Security",
        description:
          "Secure session tokens for chat; validation on every request.",
      },
      {
        icon: ShieldCheck as LucideIcon,
        title: "Controlled AI Behavior",
        description:
          "Guardrails against unsafe or off-topic output; tool use is scoped and auditable.",
      },
      {
        icon: Boxes as LucideIcon,
        title: "Data Isolation",
        description:
          "Your knowledge base is yours alone — never shared across workspaces, never blended with another client's data.",
      },
    ],
  },

  denials: {
    eyebrow: "Transparency",
    title: "Transparency, in plain language.",
    items: [
      "We do NOT access private or restricted website data.",
      "We do NOT use your data outside your workspace.",
      "We do NOT train without your configured consent.",
      "We do NOT expose your data to other clients.",
      "We NEVER delete your data — when a plan lapses, access is locked, not erased.",
    ],
  },

  leads: {
    eyebrow: "Leads",
    title: "Capture leads inside the conversation.",
    copy: "Leads are captured inside the conversation — gradually, conversationally. When required fields complete, a structured lead record is saved and linked back to the chat session. Track, filter, and export from one dashboard.",
    demo: [
      { role: "bot", text: "Happy to help! Who am I speaking with?" },
      { role: "user", text: "Priya Sharma" },
      { role: "bot", text: "Thanks, Priya — best email to reach you?" },
      { role: "user", text: "priya@acme.co — Enterprise plan, ~200 seats" },
    ] as { role: "bot" | "user"; text: string }[],
    savedToast: "Lead saved to dashboard",
    pipeline: "New → Contacted → Qualified → Converted / Lost",
  },

  analytics: {
    eyebrow: "Analytics",
    title: "Every conversation, summarized automatically.",
    tiles: [
      { icon: ArrowUpRight as LucideIcon, label: "User intent", value: "+28%" },
      { icon: Tag as LucideIcon, label: "Topics discussed", value: "142" },
      { icon: Smile as LucideIcon, label: "Sentiment", value: "Positive" },
      { icon: Signal as LucideIcon, label: "Lead signals", value: "38 hot" },
    ],
    footer:
      "Real-time notification counts surface unread messages, new leads, and new sessions. These insights feed back into your app — improve the bot, spot demand, optimize conversion.",
  },

  roadmap: {
    eyebrow: "Roadmap",
    title: "Future enhancements, already scoped.",
    items: [
      "Data retention policies per data type",
      "Full data export & deletion workflows",
      "Advanced security documentation",
      "Enterprise compliance support",
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Start free. Scale without complexity.",
    description:
      "Every account starts with a 14-day trial of all three modules — Chatbot, Site Search, and Policy Vault — no credit card required.",
    tiers: [
      {
        name: "Free",
        price: "$0",
        cadence: "forever",
        blurb: "Testing & demos",
        featured: false,
        cta: "Start free",
        features: [
          "1 chatbot",
          "1 channel",
          "50 replies / month",
          "1 document",
          "Lead capture & pipeline",
          "Basic analytics",
        ],
      },
      {
        name: "Gold",
        price: "$49",
        cadence: "/mo",
        blurb: "SMBs & consultants",
        featured: true,
        cta: "Get started",
        features: [
          "1 chatbot",
          "3 channels",
          "2,000 replies / month",
          "15 documents",
          "Advanced analytics",
          "Priority support",
        ],
      },
      {
        name: "Platinum",
        price: "$89",
        cadence: "/mo",
        blurb: "Agencies & multi-location",
        featured: false,
        cta: "Get started",
        features: [
          "3 chatbots",
          "5 channels",
          "5,000 replies / month",
          "25 documents",
          "Add-ons across all agents",
          "Priority support",
        ],
      },
      {
        name: "Custom",
        price: "Let's talk",
        cadence: "",
        blurb: "Enterprise & regulated",
        featured: false,
        cta: "Talk to sales",
        features: [
          "Custom chatbots",
          "Unlimited channels",
          "Custom replies & documents",
          "Add-on modules included",
          "Dedicated support + SLA",
        ],
      },
    ],
    addons: {
      title: "Premium add-on modules",
      note: "Unlock on any paid plan — free during your 14-day trial.",
      items: [
        { name: "Site Search", price: "+$15", cadence: "/mo", save: "" },
        { name: "Policy Vault", price: "+$15", cadence: "/mo", save: "" },
        { name: "Bundle (both)", price: "+$25", cadence: "/mo", save: "save $5/mo" },
      ],
    },
    footnote:
      "Every plan includes SSL security, GDPR-ready data handling, your data never deleted, and cancel-anytime billing.",
  },

  cta: {
    eyebrow: "Get started",
    title: "Your data is your asset. Make it work for you.",
    sub: "Spin up your first Lumjha agent in under 5 minutes — no credit card, no code. Get the Chatbot, Site Search, and Policy Vault free for 14 days.",
    primary: "Start Free",
    secondary: "Book a Demo",
  },

  footer: {
    pitch:
      "Enable Your best agent. Automate your growth. Lumjha is the no-code AI layer for modern customer engagement.",
    contact: "info@lumjha.ai",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "Chatbot", href: "#platform" },
          { label: "Site Search", href: "#platform" },
          { label: "Policy Vault", href: "#platform" },
          { label: "How it works", href: "#how" },
        ],
      },
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Security", href: "#security" },
          { label: "Integrations", href: "#channels" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Blog", href: "#" },
          { label: "Contact", href: "#" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "#" },
          { label: "Terms", href: "#" },
          { label: "Data Processing", href: "#" },
          { label: "Data Deletion", href: "#" },
        ],
      },
    ],
    copyright: "© 2026 Lumjha. All rights reserved.",
  },

  chatDemo: [
    {
      role: "user" as const,
      text: "Do you ship internationally?",
    },
    {
      role: "bot" as const,
      text: "Yes — we ship to 40+ countries. Standard delivery is 5–7 business days, with express options at checkout. Want me to check rates for your region?",
      cite: "shipping.pdf · §1",
    },
    {
      role: "user" as const,
      text: "What's your refund policy?",
    },
    {
      role: "bot" as const,
      text: "Refunds are accepted within 30 days of delivery on unused items.",
      cite: "Returns Policy · §2 — verified ✓",
    },
  ],

  kbIcon: FileText,
};

export type Site = typeof site;
