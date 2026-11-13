import type { GridItem } from "./ProductSections";

/* ============================================================
   "The Essentials, Done Properly" (Pricing): six tiles for the shared
   Benefits bento (BenefitGrid `bento`), so this section looks and
   behaves like the Benefits sections on the other pages.
   Order matters: the bento makes the first and last tiles wide.
   ============================================================ */

/* Lucide-style line icons, one stroked path per entry. */
const ICONS = {
  sun: ["M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0", "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"],
  shield: [
    "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z",
    "m9 12 2 2 4-4",
  ],
  list: ["M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z", "M9 8h6M9 12h6M9 16h4"],
  chat: ["M7.9 20A9 9 0 1 0 4 16.1L2 22Z"],
  code: ["m16 18 6-6-6-6", "m8 6-6 6 6 6", "M14.5 4l-5 16"],
  share: [
    "M21 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M9 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0M21 19a3 3 0 1 1-6 0 3 3 0 0 1 6 0",
    "m8.6 13.5 6.8 4M15.4 6.5l-6.8 4",
  ],
} as const;

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {ICONS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export const ESSENTIALS: GridItem[] = [
  {
    icon: <Icon name="sun" />,
    title: "Live in minutes",
    body: "Paste your URL: Lumjha AI auto-crawls your site and builds the knowledge base. Add PDFs, DOCX, CSV, Google Drive or Shopify as Knowledge Documents.",
  },
  {
    icon: <Icon name="chat" />,
    title: "Human takeover, any channel",
    body: "Step into any conversation on the website, WhatsApp, Instagram, Messenger, Telegram or Viber from one inbox.",
  },
  {
    icon: <Icon name="shield" />,
    title: "Your brand, safely",
    body: "Your logo, colors, voice, tone and messaging, with chat safety moderation and controls always on.",
  },
  {
    icon: <Icon name="list" />,
    title: "Leads & bookings",
    body: "Form-less lead capture plus multiple forms, full chat history and Google Calendar booking.",
  },
  { icon: <Icon name="code" />, title: "API", body: "Ingest sources and export leads, conversations and analytics programmatically." },
  {
    icon: <Icon name="share" />,
    title: "MCP connector",
    body: "Connect ChatGPT, Claude and your own agents to Lumjha AI with scoped, read-only-by-default access.",
  },
];
