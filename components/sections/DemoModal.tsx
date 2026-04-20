"use client";

import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { useChatbotStore, type ChatMessage } from "@/store/useChatbotStore";
import { cn } from "@/lib/cn";

const SCRIPT: ChatMessage[] = [
  {
    id: "s1",
    role: "user",
    text: "What does Lumjha cost for a startup?",
  },
  {
    id: "s2",
    role: "bot",
    text: "Starter is free up to 500 chats/month with 1 channel. Pro is $49/mo for unlimited chats across Web, WhatsApp and Instagram.",
    cite: "pricing.pdf · p.2",
  },
  {
    id: "s3",
    role: "user",
    text: "Where is my data stored?",
  },
  {
    id: "s4",
    role: "bot",
    text: "Raw files go to object storage (S3-equivalent), metadata to MongoDB, sessions to Redis, and embeddings to Qdrant — all isolated per workspace.",
    cite: "architecture.md · §1",
  },
];

export function DemoModal() {
  const { demoOpen, closeDemo } = useUIStore();
  const { messages, addMessage, setTyping, typing, reset } = useChatbotStore();
  const demoDone = messages.length >= SCRIPT.length + 1;

  useEffect(() => {
    if (!demoOpen) return;
    reset();
    let cancelled = false;

    const tick = async (i: number) => {
      if (cancelled || i >= SCRIPT.length) return;
      const m = SCRIPT[i];
      if (m.role === "bot") setTyping(true);
      await new Promise((r) => setTimeout(r, m.role === "bot" ? 1100 : 700));
      if (cancelled) return;
      setTyping(false);
      addMessage({ role: m.role, text: m.text, cite: m.cite });
      tick(i + 1);
    };

    const t = setTimeout(() => tick(0), 500);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoOpen]);

  return (
    <Dialog.Root open={demoOpen} onOpenChange={(v) => !v && closeDemo()}>
      <AnimatePresence>
        {demoOpen ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-bg-0/80 backdrop-blur-md"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-24px)] max-w-lg -translate-x-1/2 -translate-y-1/2"
              >
                <div className="glass-strong flex max-h-[80vh] flex-col overflow-hidden rounded-3xl shadow-[0_40px_120px_-40px_rgb(var(--brand-500)/0.7)]">
                  <div className="flex items-center justify-between border-b border-stroke/10 bg-bg-2/60 px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-brand-300/15 text-brand-300">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full bg-success ring-2 ring-bg-2" />
                      </span>
                      <div className="flex flex-col">
                        <Dialog.Title className="text-sm font-medium text-fg-high">
                          Lumjha Live Demo
                        </Dialog.Title>
                        <Dialog.Description className="text-[11px] text-fg-low">
                          Scripted demo · knowledge base connected
                        </Dialog.Description>
                      </div>
                    </div>
                    <Dialog.Close
                      aria-label="Close"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-fg-mid hover:bg-bg-3 hover:text-fg-high"
                    >
                      <X className="h-4 w-4" />
                    </Dialog.Close>
                  </div>

                  <div className="flex min-h-[280px] flex-1 flex-col gap-3 overflow-y-auto px-5 py-5">
                    {messages.map((m) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex",
                          m.role === "user" ? "justify-end" : "justify-start",
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                            m.role === "user"
                              ? "bg-brand-300 text-bg-0 rounded-br-sm"
                              : "bg-bg-3/80 border border-stroke/10 text-fg-high rounded-bl-sm",
                          )}
                        >
                          <p>{m.text}</p>
                          {m.cite ? (
                            <div className="mt-1.5 font-mono text-[11px] text-brand-200">
                              {m.cite}
                            </div>
                          ) : null}
                        </div>
                      </motion.div>
                    ))}
                    {typing ? (
                      <div className="flex">
                        <div className="flex items-center gap-1.5 rounded-2xl bg-bg-3/80 border border-stroke/10 px-4 py-3">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="h-1.5 w-1.5 rounded-full bg-brand-300"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.15,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2 border-t border-stroke/10 bg-bg-2/40 p-3">
                    <div className="flex-1 rounded-xl bg-bg-3/70 px-3.5 py-2.5 text-xs text-fg-low">
                      {demoDone
                        ? "Demo complete — sign up to connect your own knowledge base."
                        : "Watch the demo…"}
                    </div>
                    <button
                      type="button"
                      disabled
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-300/40 text-bg-0"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
