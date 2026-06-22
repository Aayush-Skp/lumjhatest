"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, RotateCcw, Send } from "lucide-react";
import Eyebrow from "@/components/another-one/ui/Eyebrow";
import FloatingOrb from "@/components/another-one/ui/FloatingOrb";
import TypingIndicator from "@/components/another-one/demos/TypingIndicator";

const QUESTION = "What is the notice period for contract termination?";
const PASSAGE =
  "Either party may terminate this Agreement for convenience upon sixty (60) days' prior written notice to the other party.";
const CITATION = "Contract Terms · Section 8.2 · Page 14";

const FEATURES = [
  "Returns the exact passage, word-for-word",
  "Cited to section and page",
  "Verified verbatim against the source",
];

/**
 * Policy Vault demo — a chat interface (consistent with the Chatbot widget).
 * The agent answers with the verbatim passage (amber highlight sweep) plus a
 * cited, verified block. Sized to fit inside the showcase container.
 */
export function VaultWidget() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.6 });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [runId, setRunId] = useState(0);

  const [showQuestion, setShowQuestion] = useState(false);
  const [typing, setTyping] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [showCitation, setShowCitation] = useState(false);
  const [done, setDone] = useState(false);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const at = (ms: number, fn: () => void) =>
    timers.current.push(setTimeout(fn, ms));

  useEffect(() => {
    if (!inView) return;
    clearTimers();
    at(0, () => {
      setShowQuestion(false);
      setTyping(false);
      setShowAnswer(false);
      setHighlight(false);
      setShowCitation(false);
      setDone(false);
    });
    at(600, () => setShowQuestion(true));
    at(1100, () => setTyping(true));
    at(2300, () => {
      setTyping(false);
      setShowAnswer(true);
    });
    at(2700, () => setHighlight(true));
    at(3400, () => setShowCitation(true));
    at(3900, () => setDone(true));
    return clearTimers;
  }, [inView, runId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [showQuestion, typing, showAnswer, showCitation]);

  return (
    <div
      ref={ref}
      className="mx-auto w-full max-w-[380px] overflow-hidden rounded-2xl border border-[var(--color-border-bright)] bg-[var(--color-bg-3)]"
      style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--color-indigo)] opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-indigo)]" />
        </span>
        <span className="font-mono text-caption text-[var(--color-text-secondary)]">
          Lumjha Agent · Policy Vault
        </span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex max-h-[300px] min-h-[300px] flex-col gap-3 overflow-y-auto px-4 py-4"
      >
        {showQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex justify-end"
          >
            <div
              className="max-w-[80%] rounded-2xl px-3.5 py-2.5 font-body text-body-sm leading-relaxed"
              style={{
                background: "var(--color-chat-user-bg)",
                color: "var(--color-chat-user-text)",
                borderTopRightRadius: "0.25rem",
              }}
            >
              {QUESTION}
            </div>
          </motion.div>
        )}

        {typing && (
          <div className="flex items-end gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-indigo)] font-display text-[11px] font-bold text-[var(--color-text-inverse)]">
              L
            </span>
            <TypingIndicator />
          </div>
        )}

        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-end gap-2"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-indigo)] font-display text-[11px] font-bold text-[var(--color-text-inverse)]">
              L
            </span>
            <div className="flex max-w-[85%] flex-col gap-2">
              <div
                className="rounded-2xl px-3.5 py-2.5 font-body text-body-sm leading-relaxed"
                style={{
                  background: "var(--color-chat-agent-bg)",
                  color: "var(--color-chat-agent-text)",
                  borderTopLeftRadius: "0.25rem",
                }}
              >
                Here&rsquo;s the exact clause from your contract:
                <span className="mt-2 block font-mono text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                  &ldquo;
                  <span
                    className="a1-vault-highlight rounded px-0.5"
                    data-on={highlight}
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {PASSAGE}
                  </span>
                  &rdquo;
                </span>
              </div>

              {showCitation && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg border border-[var(--color-indigo)]/40 bg-[var(--color-indigo-dim)] px-3 py-2"
                >
                  <p className="font-mono text-[11px] text-[var(--color-indigo)]">
                    {CITATION}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-success)]">
                    <Check size={12} /> verified — word-for-word match
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
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
            Ask about any policy…
          </span>
        </div>
        <button
          type="button"
          aria-label="Send"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-indigo)] text-[var(--color-text-inverse)]"
        >
          <Send size={15} />
        </button>
      </div>

      {/* Replay */}
      <div className="flex justify-end px-3 pb-3">
        <button
          type="button"
          onClick={() => setRunId((v) => v + 1)}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-caption text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          <RotateCcw size={12} /> Replay
        </button>
      </div>
    </div>
  );
}

export default function PolicyVaultDemo({ id }: { id?: string }) {
  return (
    <section id={id} className="relative overflow-hidden py-24 md:py-32">
      <FloatingOrb size={300} color="#FCD34D" opacity={0.1} top={60} right={-60} />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <Eyebrow>Policy Vault</Eyebrow>
          <h2 className="mt-3 max-w-md font-display text-display-lg text-[var(--color-text-primary)]">
            The source, quoted verbatim.
          </h2>
          <ul className="mt-8 flex flex-col gap-3">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 font-body text-body-md text-[var(--color-text-secondary)]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-amber)]" />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <VaultWidget />
      </div>
    </section>
  );
}
