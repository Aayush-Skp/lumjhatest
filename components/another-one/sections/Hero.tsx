"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowDown, Check } from "lucide-react";
import Eyebrow from "@/components/another-one/ui/Eyebrow";
import FloatingOrb from "@/components/another-one/ui/FloatingOrb";
import AnimatedCounter from "@/components/another-one/ui/AnimatedCounter";

const HeroDashboard = dynamic(
  () => import("@/components/another-one/sections/HeroDashboard"),
  { ssr: false },
);

const LOGIN_URL = "https://app.lumjha.ai/login";

// Headline split into words; the period after each sentence pulses to accent.
const SENTENCES = [
  ["Create", "Your", "Best", "Agent."],
  ["Automate", "Your", "Growth."],
];

const TRUST_PILLS = [
  "100% grounded in your data",
  "Live in minutes",
  "14-day full-feature trial",
];

const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 24, suffix: "/7", label: "Always on" },
  { value: 5, suffix: "+", label: "Channels" },
  { value: 0, suffix: "", label: "Lines of code" },
  { value: 100, suffix: "%", label: "Grounded data" },
];

export default function Hero({ id }: { id?: string }) {
  const reduced = useReducedMotion();

  const wordVariant: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 40, rotateX: reduced ? 0 : -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id={id}
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28"
    >
      {/* Background: grid overlay + ambient orbs + central glow */}
      <div className="a1-grid absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 60%)",
          opacity: 0.5,
        }}
      />
      <FloatingOrb size={400} color="#5EEAD4" opacity={0.15} top={-40} right={-60} />
      <FloatingOrb size={300} color="#818CF8" opacity={0.1} bottom={20} left={-40} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-3 sm:px-5 lg:grid-cols-[40%_60%] lg:gap-8">
        {/* Left column */}
        <div>
          <motion.div {...fade(0.4)}>
            <Eyebrow>No-Code AI Agents</Eyebrow>
          </motion.div>

          <h1
            className="mt-3 font-display text-display-lg text-[var(--color-text-primary)]"
            style={{ perspective: 800 }}
          >
            {SENTENCES.map((sentence, si) => {
              // Global word index so the stagger runs across both lines.
              const offset = SENTENCES.slice(0, si).reduce(
                (a, s) => a + s.length,
                0,
              );
              return (
              <span key={si} className="block">
                {sentence.map((word, wi) => {
                  const i = offset + wi;
                  const isPeriodWord = word.endsWith(".");
                  const base = isPeriodWord ? word.slice(0, -1) : word;
                  return (
                    <motion.span
                      key={`${si}-${i}`}
                      className="mr-[0.25em] inline-block"
                      variants={wordVariant}
                      initial="hidden"
                      animate="visible"
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                        delay: 0.5 + i * 0.08,
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {base}
                      {isPeriodWord && (
                        <motion.span
                          initial={{ color: "var(--color-text-primary)" }}
                          animate={{ color: "var(--color-accent)" }}
                          transition={{ delay: 0.5 + i * 0.08 + 0.5, duration: 0.2 }}
                        >
                          .
                        </motion.span>
                      )}
                    </motion.span>
                  );
                })}
              </span>
              );
            })}
          </h1>

          <motion.p
            {...fade(0.9)}
            className="mt-5 max-w-lg font-body text-body-md text-[var(--color-text-secondary)]"
          >
            Deploy a no-code AI assistant that learns every document, page, and
            policy in your business — and speaks in your exact brand voice.
            Engage customers 24/7 across Website, WhatsApp, Instagram, Facebook,
            and Telegram. Capture qualified leads and book appointments while you
            sleep.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fade(1.1)} className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 font-body font-semibold text-body-md text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_var(--color-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              Build Your Agent Free <ArrowRight size={16} />
            </a>
            <a
              href="#pipeline"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-bright)] bg-transparent px-6 py-3 font-body font-medium text-body-md text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              See how it works <ArrowDown size={16} />
            </a>
          </motion.div>

          {/* Trust pills */}
          <motion.ul {...fade(1.3)} className="mt-5 flex flex-wrap gap-2">
            {TRUST_PILLS.map((pill) => (
              <li
                key={pill}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 font-body text-body-sm text-[var(--color-text-secondary)]"
              >
                <Check size={13} className="text-[var(--color-accent)]" />
                {pill}
              </li>
            ))}
          </motion.ul>

          {/* Stats row */}
          <motion.dl {...fade(1.5)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="h-10 w-px bg-[var(--color-border)]"
                  />
                )}
                <div>
                  <dd className="font-display text-display-md text-[var(--color-accent)]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="font-body text-caption text-[var(--color-text-secondary)]">
                    {stat.label}
                  </dt>
                </div>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right column — interactive mock dashboard */}
        <motion.div
          initial={{ opacity: 0, x: reduced ? 0 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <div className="mt-5 w-full max-w-120 lg:max-w-none">
            <HeroDashboard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
