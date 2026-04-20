"use client";

import { motion } from "framer-motion";
import { Search, Cpu, MessageSquare, User, Database } from "lucide-react";
import { fadeUp, stagger, viewport } from "@/lib/motion";

/**
 * Input → Retrieval → Generate → Response
 * Central Knowledge Database cylinder the Retrieval step queries.
 */
export function RagDiagram() {
  const nodes = [
    { id: "input", label: "Input", Icon: User, hint: "User query" },
    { id: "retrieval", label: "Retrieval", Icon: Search, hint: "Semantic search" },
    { id: "generate", label: "Generate", Icon: Cpu, hint: "LLM + context" },
    { id: "response", label: "Response", Icon: MessageSquare, hint: "Grounded answer" },
  ];

  return (
    <motion.div
      role="img"
      aria-label="Retrieval-Augmented Generation flow: Input, Retrieval, Generate, Response, with a central knowledge database queried by Retrieval."
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="relative w-full rounded-3xl border border-stroke/10 bg-bg-1/60 p-6 md:p-10 backdrop-blur-xl"
    >
      {/* soft inner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgb(var(--brand-400)/0.18), transparent 70%)",
        }}
      />

      <div className="flex flex-col items-center gap-10">
        {/* top row: 4 nodes */}
        <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {nodes.map(({ id, label, Icon, hint }) => (
            <motion.div
              key={id}
              variants={fadeUp}
              className="relative flex flex-col items-center gap-3 rounded-2xl border border-brand-300/20 bg-bg-3/70 p-5 text-center backdrop-blur-xl"
              style={{ filter: "drop-shadow(0 0 24px rgb(var(--brand-400) / 0.28))" }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-300/15 text-brand-300">
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="font-display text-sm font-semibold text-fg-high">
                {label}
              </span>
              <span className="font-mono text-[11px] tracking-wide text-fg-low">
                {hint}
              </span>
            </motion.div>
          ))}
        </div>

        {/* flow lines between row and database */}
        <svg
          aria-hidden
          viewBox="0 0 800 180"
          preserveAspectRatio="none"
          className="h-[160px] w-full"
        >
          {/* left branch — retrieval ↓ to DB */}
          <path
            d="M 300 0 C 300 60, 400 60, 400 120"
            fill="none"
            stroke="rgb(var(--brand-300) / 0.55)"
            strokeWidth="1.25"
            className="dash-flow"
          />
          {/* right branch — DB ↑ back into generate */}
          <path
            d="M 400 120 C 400 60, 500 60, 500 0"
            fill="none"
            stroke="rgb(var(--brand-300) / 0.55)"
            strokeWidth="1.25"
            className="dash-flow"
          />
          {/* Input → Retrieval */}
          <line
            x1="100"
            y1="0"
            x2="300"
            y2="0"
            stroke="rgb(var(--brand-300) / 0.4)"
            strokeWidth="1.25"
            className="dash-flow"
          />
          {/* Generate → Response */}
          <line
            x1="500"
            y1="0"
            x2="700"
            y2="0"
            stroke="rgb(var(--brand-300) / 0.4)"
            strokeWidth="1.25"
            className="dash-flow"
          />
        </svg>

        {/* Knowledge DB cylinder */}
        <motion.div
          variants={fadeUp}
          className="relative flex items-center gap-4 rounded-2xl border border-brand-300/25 bg-bg-2/80 px-6 py-4 backdrop-blur-xl"
          style={{ filter: "drop-shadow(0 0 32px rgb(var(--brand-400) / 0.35))" }}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-300/15 text-brand-300">
            <Database className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <div className="flex flex-col text-left">
            <span className="font-display text-sm font-semibold text-fg-high">
              Knowledge Database
            </span>
            <span className="font-mono text-[11px] tracking-wide text-fg-low">
              Qdrant · vector embeddings
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
