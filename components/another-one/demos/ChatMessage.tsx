"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/lib/chatScripts";

/**
 * A single chat bubble. User messages sit right with the accent fill; agent
 * messages sit left on a surface bubble with an "L" avatar and an optional
 * verified tag (a subtle "grounded / verified" badge, not a document citation).
 */
export default function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex w-full gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <span className="mt-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] font-display text-[11px] font-bold text-[var(--color-text-inverse)]">
          L
        </span>
      )}

      <div className={`flex max-w-[78%] flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className="rounded-2xl px-3.5 py-2.5 font-body text-body-sm leading-relaxed"
          style={
            isUser
              ? {
                  background: "var(--color-chat-user-bg)",
                  color: "var(--color-chat-user-text)",
                  borderTopRightRadius: "0.25rem",
                }
              : {
                  background: "var(--color-chat-agent-bg)",
                  color: "var(--color-chat-agent-text)",
                  borderTopLeftRadius: "0.25rem",
                }
          }
        >
          {message.text}
        </div>

        {message.citation && (
          <span
            className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px]"
            style={{
              background:
                "color-mix(in srgb, var(--color-success) 12%, transparent)",
              borderColor:
                "color-mix(in srgb, var(--color-success) 30%, transparent)",
              color: "var(--color-success)",
            }}
          >
            <Check size={11} />
            {message.citation}
          </span>
        )}
      </div>
    </motion.div>
  );
}
