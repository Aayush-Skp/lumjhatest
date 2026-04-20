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
  Lock,
  KeyRound,
  ShieldCheck,
  Database,
  Gauge,
  HardDrive,
  Network,
  ArrowUpRight,
  Smile,
  Tag,
  Signal,
  FileText,
} from "lucide-react";

export const site = {
  brand: {
    name: "Lumjha",
    wordmark: "Lumjha",
    tagline: "Clone Your Best Agent. Automate Your Growth.",
  },

  nav: {
    links: [
      { id: "features", label: "Features" },
      { id: "how", label: "How it works" },
      { id: "security", label: "Security" },
      { id: "pricing", label: "Pricing" },
    ],
    cta: { primary: "Try Lumjha", secondary: "Log in" },
  },

  hero: {
    eyebrow: "RAG-Powered · No-Code Builder · Custom Knowledge",
    headline: ["Clone Your Best Agent.", "Automate Your Growth."],
    sub: "Deploy a no-code AI assistant that memorizes every document in your business and speaks in your exact brand voice. Engage customers 24/7 across Website, WhatsApp, and Instagram — and get qualified leads while you sleep.",
    ctas: {
      primary: "Build Your Agent Free",
      secondary: "See how it works",
    },
    proof: [
      "Reduces support costs by 40%",
      "No credit card required",
      "Live in minutes",
    ],
  },

  trust: [
    { value: "24/7", label: "Always on" },
    { value: "7+", label: "Channels" },
    { value: "0", label: "Lines of code" },
    { value: "100%", label: "Grounded data" },
  ],

  channels: {
    eyebrow: "Omnichannel",
    title: "Meet your customers wherever they already are.",
    description:
      "One agent, one knowledge base, seven channels. Roll Lumjha out on your website, your socials, your messaging apps — even your storefront and calendar.",
    list: [
      { id: "web", name: "Website", tag: "Embed widget" },
      { id: "whatsapp", name: "WhatsApp", tag: "Business API" },
      { id: "instagram", name: "Instagram", tag: "DMs + comments" },
      { id: "facebook", name: "Facebook", tag: "Messenger" },
      { id: "telegram", name: "Telegram", tag: "Bot API" },
      { id: "gcal", name: "Google Calendar", tag: "Bookings" },
      { id: "shopify", name: "Shopify", tag: "Storefront" },
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
      icon: BarChart3 as LucideIcon,
      title: "Performance Insights",
      description:
        "Token usage, message counts, sentiment and intent — all surfaced on the dashboard.",
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
          "Content lifted from PDF / Word / CSV. Pages converted to clean readable text.",
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
    ],
  },

  denials: {
    eyebrow: "Transparency",
    title: "Transparency, in plain language.",
    items: [
      "We do NOT access private or restricted website data.",
      "We do NOT use your data outside your workspace.",
      "We do NOT answer without your knowledge base when configured.",
      "We do NOT expose your data to other clients.",
    ],
  },

  leads: {
    eyebrow: "Leads",
    title: "Capture leads inside the conversation.",
    copy: "Leads are captured inside the conversation — gradually, conversationally. When required fields complete, a structured lead record is saved and linked back to the chat session. Export, filter, and manage from one dashboard.",
    demo: [
      { role: "bot", text: "What's your name?" },
      { role: "user", text: "Priya Sharma" },
      { role: "bot", text: "Great — best phone to reach you?" },
      { role: "user", text: "+91 98xxxxxx21" },
      { role: "bot", text: "What are you interested in?" },
      { role: "user", text: "Enterprise plan, 200 seats" },
    ] as { role: "bot" | "user"; text: string }[],
    savedToast: "Lead saved to dashboard",
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
      "These insights feed back into your ops — improve the bot, spot demand, optimize conversion.",
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

  cta: {
    eyebrow: "Get started",
    title: "Your data is your asset. Make it work for you.",
    sub: "Spin up your first Lumjha agent in under 5 minutes — no credit card, no code.",
    primary: "Start Free",
    secondary: "Book a Demo",
  },

  footer: {
    pitch:
      "Clone your best agent. Automate your growth. Lumjha is the no-code AI layer for modern customer engagement.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "How it works", href: "#how" },
          { label: "Security", href: "#security" },
          { label: "Pricing", href: "#pricing" },
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
        ],
      },
    ],
    copyright: "© 2026 Lumjha AI. All rights reserved.",
  },

  chatDemo: [
    {
      role: "user" as const,
      text: "What's included in the Pro plan?",
    },
    {
      role: "bot" as const,
      text: "Pro includes unlimited chats, 3 channels, lead capture, and 10K monthly tokens. You can upgrade anytime from the dashboard.",
      cite: "pricing.pdf · p.2",
    },
    {
      role: "user" as const,
      text: "Can I connect WhatsApp?",
    },
    {
      role: "bot" as const,
      text: "Yes — any Pro workspace supports Website, WhatsApp and Instagram simultaneously.",
      cite: "integrations.md · §3",
    },
  ],

  kbIcon: FileText,
};

export type Site = typeof site;
