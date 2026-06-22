"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import ChatbotDemo from "@/components/another-one/sections/ChatbotDemo";
import { SearchWidget } from "@/components/another-one/sections/SiteSearchDemo";
import { VaultWidget } from "@/components/another-one/sections/PolicyVaultDemo";
import Eyebrow from "@/components/another-one/ui/Eyebrow";
import FloatingOrb from "@/components/another-one/ui/FloatingOrb";

type ProductKey = "chatbot" | "search" | "vault";

interface Product {
  key: ProductKey;
  anchor: string;
  eyebrow: string;
  tag: string;
  title: string;
  body: string;
  accent: string;
}

const PRODUCTS: Product[] = [
  {
    key: "chatbot",
    anchor: "chatbot-demo",
    eyebrow: "Chatbot",
    tag: "Always-on agent",
    title: "Your always-on agent.",
    body: "Your always-on conversational agent — answers questions, captures leads, books appointments, and talks to customers across every channel in your brand voice.",
    accent: "var(--color-accent)",
  },
  {
    key: "search",
    anchor: "search-demo",
    eyebrow: "Site Search",
    tag: "AI-native search",
    title: "Answers, not ten blue links.",
    body: "AI-native search across your entire site and document library. Visitors ask a question; Lumjha returns the precise, summarized answer with sources.",
    accent: "var(--color-indigo)",
  },
  {
    key: "vault",
    anchor: "vault-demo",
    eyebrow: "Policy Vault",
    tag: "Verbatim & cited",
    title: "The source, quoted verbatim.",
    body: "Ask in plain language; Policy Vault finds the exact passage in your uploaded policies, contracts, or compliance docs, and returns it word-for-word with a citation.",
    accent: "var(--color-amber)",
  },
];

function Example({ k }: { k: ProductKey }) {
  if (k === "chatbot")
    return (
      <div className="mx-auto w-full max-w-[360px]">
        <ChatbotDemo />
      </div>
    );
  if (k === "search") return <SearchWidget />;
  return <VaultWidget />;
}

/**
 * Sticky product showcase. The section is tall (one viewport of scroll per
 * product); an inner panel pins to the viewport and swaps products as you
 * scroll. Each swap: the example (left) reveals from the top, the description
 * (right) reveals from the bottom.
 */
export default function ProductShowcase({ id }: { id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.15 });
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(
      PRODUCTS.length - 1,
      Math.max(0, Math.floor(p * PRODUCTS.length)),
    );
    setActive(i);
  });

  const product = PRODUCTS[active];
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id={id}
      ref={ref}
      className="relative"
      style={{ height: `${PRODUCTS.length * 135}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden border-t border-[var(--color-border)]">
        <FloatingOrb
          size={360}
          color="#5EEAD4"
          opacity={0.08}
          top={40}
          right={-80}
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          {/* Section header */}
          <div className="mb-10 flex items-center justify-between">
            <Eyebrow>The Platform · One knowledge base</Eyebrow>
            <span className="font-mono text-caption text-[var(--color-text-muted)]">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(PRODUCTS.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Example (left) — reveals from the top. Children are absolutely
                stacked so the swap crossfades without layout shift and the new
                product appears instantly even on fast scroll (no skipping). */}
            <div
              id={product.anchor}
              className="relative order-2 h-[min(460px,68vh)] lg:order-1"
            >
              <AnimatePresence initial={false}>
                {inView && (
                  <motion.div
                    key={product.key}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, y: reduced ? 0 : -48 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -28 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <Example k={product.key} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Description (right) — reveals from the bottom */}
            <div className="relative order-1 h-[min(340px,52vh)] lg:order-2 lg:h-[min(460px,68vh)]">
              <AnimatePresence initial={false}>
                {inView && (
                  <motion.div
                    key={product.key}
                    className="absolute inset-0 flex flex-col justify-center"
                    initial={{ opacity: 0, y: reduced ? 0 : 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : 28 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <span
                      className="inline-flex items-center rounded-full border px-3 py-1 font-mono text-caption"
                      style={{
                        borderColor: "var(--color-border-bright)",
                        color: product.accent,
                      }}
                    >
                      {product.tag}
                    </span>
                    <p className="mt-4 font-body text-caption uppercase tracking-widest text-[var(--color-text-secondary)]">
                      {product.eyebrow}
                    </p>
                    <h2 className="mt-2 font-display text-display-lg text-[var(--color-text-primary)]">
                      {product.title}
                    </h2>
                    <p className="mt-5 max-w-md font-body text-body-lg text-[var(--color-text-secondary)]">
                      {product.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Step indicators */}
          <div className="mt-12 flex items-center gap-2">
            {PRODUCTS.map((p, i) => (
              <span
                key={p.key}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === active ? 36 : 18,
                  backgroundColor:
                    i === active
                      ? "var(--color-accent)"
                      : "var(--color-border-bright)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
