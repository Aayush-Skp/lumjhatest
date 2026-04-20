"use client";

import { create } from "zustand";

export type ChatRole = "user" | "bot";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  cite?: string;
};

type ChatbotStore = {
  messages: ChatMessage[];
  typing: boolean;
  addMessage: (m: Omit<ChatMessage, "id">) => void;
  setTyping: (v: boolean) => void;
  reset: () => void;
};

const initial: ChatMessage[] = [
  {
    id: "m1",
    role: "bot",
    text: "Hey — I'm your Lumjha agent. Ask me anything from the knowledge base.",
  },
];

export const useChatbotStore = create<ChatbotStore>((set) => ({
  messages: initial,
  typing: false,
  addMessage: (m) =>
    set((s) => ({
      messages: [...s.messages, { ...m, id: crypto.randomUUID() }],
    })),
  setTyping: (typing) => set({ typing }),
  reset: () => set({ messages: initial, typing: false }),
}));
