// Scripted conversation flows for the interactive demos (no live API calls).

export type ChatRole = "user" | "agent";

export interface ChatMessage {
  role: ChatRole;
  text: string;
  /** Optional source citation rendered as a pill below an agent message. */
  citation?: string;
  /** Marks a citation as verbatim-verified (renders a ✓ instead of a lock). */
  verified?: boolean;
  /** Delay before this message appears, in ms. */
  delay: number;
  /** For agent messages: how long the typing indicator shows first, in ms. */
  typingDuration?: number;
}

// Chatbot demo — CLAUDE.md §5.1
export const chatbotScript: ChatMessage[] = [
  {
    role: "user",
    text: "Do you ship internationally?",
    delay: 800,
  },
  {
    role: "agent",
    text: "Yes — we ship to 40+ countries. Standard delivery is 5–7 business days, with express options at checkout. Want me to check rates for your region?",
    citation: "shipping.pdf · §1",
    delay: 600,
    typingDuration: 1200,
  },
  {
    role: "user",
    text: "What's your refund policy?",
    delay: 1200,
  },
  {
    role: "agent",
    text: "Refunds are accepted within 30 days of delivery on unused items.",
    citation: "Returns Policy · §2",
    verified: true,
    delay: 600,
    typingDuration: 1000,
  },
];
