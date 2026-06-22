"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Search, Sparkles, CheckCircle2, Database } from "lucide-react";
import Eyebrow from "@/components/another-one/ui/Eyebrow";

const FLOW = [
  { icon: MessageSquare, label: "Input", sub: "User query" },
  { icon: Search, label: "Retrieval", sub: "Semantic search" },
  { icon: Sparkles, label: "Generate", sub: "LLM + context" },
  { icon: CheckCircle2, label: "Response", sub: "Grounded answer" },
];

const STEPS = [
  "The system analyzes the user's query.",
  "Semantic search pulls the most relevant chunks from your knowledge base.",
  "The AI blends retrieved context + conversation history → a contextual, grounded answer.",
];

export default function RAG({ id }: { id?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % FLOW.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <section id={id} className="a1-section py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <Eyebrow>Retrieval-Augmented Generation</Eyebrow>
        <h2 className="mt-3 font-display text-display-lg text-[var(--color-text-primary)]">
          RAG, tuned to your business.
        </h2>
      </div>

      {/* Flow chain */}
      <div className="mx-auto mt-14 max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {FLOW.map(({ icon: Icon, label, sub }, i) => {
            const on = i === active;
            return (
              <div key={label} className="flex flex-1 items-center gap-3">
                <div
                  className="flex-1 rounded-2xl border bg-[var(--color-bg-2)] p-4 text-center transition-all duration-300"
                  style={{
                    borderColor: on
                      ? "var(--color-accent)"
                      : "var(--color-border)",
                    boxShadow: on ? "0 0 24px var(--color-accent-glow)" : "none",
                    transform: on ? "translateY(-4px)" : "none",
                  }}
                >
                  <div
                    className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300"
                    style={{
                      color: on
                        ? "var(--color-accent)"
                        : "var(--color-text-secondary)",
                      background: on
                        ? "var(--color-accent-dim)"
                        : "var(--color-bg-3)",
                    }}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="mt-3 font-display text-body-md font-semibold text-[var(--color-text-primary)]">
                    {label}
                  </p>
                  <p className="font-mono text-caption text-[var(--color-text-muted)]">
                    {sub}
                  </p>
                </div>
                {i < FLOW.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden h-px w-6 shrink-0 bg-[var(--color-border-bright)] sm:block"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Knowledge DB */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-indigo)]/40 bg-[var(--color-indigo-dim)] px-4 py-2">
            <Database className="h-4 w-4 text-[var(--color-indigo)]" aria-hidden />
            <span className="font-mono text-caption text-[var(--color-text-secondary)]">
              Knowledge Database · Qdrant · vector embeddings
            </span>
          </div>
        </div>

        {/* Steps */}
        <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={i}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-2)] p-5 transition-colors hover:border-[var(--color-border-bright)]"
            >
              <span className="font-mono text-caption text-[var(--color-accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-body text-body-sm text-[var(--color-text-secondary)]">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
