"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { RotateCcw, Send } from "lucide-react";
import { chatbotScript } from "@/lib/chatScripts";
import { useChatSimulation } from "@/hooks/useChatSimulation";
import ChatMessage from "@/components/another-one/demos/ChatMessage";
import TypingIndicator from "@/components/another-one/demos/TypingIndicator";

/**
 * Live-feeling chat widget. Auto-plays the scripted sales conversation when
 * 60% of the widget is in view; replays on demand.
 */
export default function ChatbotDemo() {
  const shellRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(shellRef, { once: true, amount: 0.6 });

  const { messages, isTyping, done, reset } = useChatSimulation(
    chatbotScript,
    inView,
  );

  // Keep the latest message in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div
      ref={shellRef}
      className="w-full overflow-hidden rounded-2xl border border-[var(--color-border-bright)] bg-[var(--color-bg-3)]"
      style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]" />
        </span>
        <span className="font-mono text-caption text-[var(--color-text-secondary)]">
          Lumjha Agent · Sales Bot
        </span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex max-h-[280px] min-h-[280px] flex-col gap-3 overflow-y-auto px-4 py-4"
      >
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m} />
        ))}
        {isTyping && (
          <div className="flex items-end gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] font-display text-[11px] font-bold text-[var(--color-text-inverse)]">
              L
            </span>
            <TypingIndicator />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 border-t border-[var(--color-border)] px-3 py-3">
        <div
          className={`flex flex-1 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-2)] px-4 py-2 ${
            done ? "motion-safe:animate-pulse" : ""
          }`}
        >
          <span className="font-body text-body-sm text-[var(--color-text-muted)]">
            Ask anything…
          </span>
        </div>
        <button
          type="button"
          aria-label="Send"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-text-inverse)]"
        >
          <Send size={15} />
        </button>
      </div>

      {/* Replay */}
      <div className="flex justify-end px-3 pb-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-caption text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          <RotateCcw size={12} /> Replay
        </button>
      </div>
    </div>
  );
}
