"use client";

import { motion } from "framer-motion";
import { FileText, MessageSquare } from "lucide-react";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export type ChatLine = {
  role: "user" | "bot";
  text: string;
  cite?: string;
};

type Props = {
  lines: ChatLine[];
  className?: string;
  title?: string;
  /** When true, animates on mount rather than when in view. */
  eager?: boolean;
};

export function ChatMock({
  lines,
  className,
  title = "Lumjha Agent · Pricing Doc",
  eager = false,
}: Props) {
  const animProps = eager
    ? ({ initial: "hidden", animate: "show" } as const)
    : ({ initial: "hidden", whileInView: "show", viewport } as const);
  return (
    <motion.div
      variants={stagger(0.12, 0.15)}
      {...animProps}
      className={cn(
        "glass-strong flex flex-col overflow-hidden rounded-2xl shadow-[0_40px_120px_-40px_rgb(var(--brand-500)/0.6)]",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stroke/10 bg-bg-2/60 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-6 w-6 items-center justify-center rounded-md bg-brand-300/15 text-brand-300">
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full bg-success ring-2 ring-bg-2" />
          </span>
          <span className="text-sm font-medium text-fg-high">{title}</span>
        </div>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-stroke/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-stroke/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-stroke/20" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 px-5 py-5">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={cn(
              "flex",
              l.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                l.role === "user"
                  ? "bg-brand-300 text-bg-0 rounded-br-sm"
                  : "bg-bg-3/80 border border-stroke/10 text-fg-high rounded-bl-sm",
              )}
            >
              <p>{l.text}</p>
              {l.cite && l.role === "bot" ? (
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-brand-200">
                  <FileText className="h-3 w-3" />
                  <span className="font-mono">{l.cite}</span>
                </div>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t border-stroke/10 bg-bg-2/40 px-4 py-3">
        <div className="flex-1 rounded-xl bg-bg-3/70 px-3.5 py-2 text-xs text-fg-low">
          Ask anything…
        </div>
        <button
          type="button"
          className="rounded-xl bg-brand-300 px-3 py-2 text-xs font-medium text-bg-0 hover:bg-brand-200"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}
