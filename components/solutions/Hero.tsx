"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowDown, Check } from "lucide-react";
import Eyebrow from "@/components/another-one/ui/Eyebrow";
import FloatingOrb from "@/components/another-one/ui/FloatingOrb";
import AnimatedCounter from "@/components/another-one/ui/AnimatedCounter";

const LOGIN_URL = "https://app.lumjha.ai/login";

const SENTENCES = [
  ["Never", "Miss", "a", "Customer."],
  ["Grow", "While", "You", "Sleep."],
];

const TRUST_PILLS = [
  "No missed enquiries",
  "More bookings, less effort",
  "Up and running in minutes",
];

const STATS: { value: number; suffix: string; label: string }[] = [
  { value: 24, suffix: "/7", label: "Always available" },
  { value: 5, suffix: "+", label: "Platforms covered" },
  { value: 0, suffix: "", label: "Coding required" },
  { value: 100, suffix: "%", label: "Your content" },
];

export default function SolutionsHero({ id }: { id?: string }) {
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden pb-20 pt-28 md:pb-24 md:pt-36"
    >
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

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Left column — hero copy */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
        <motion.div {...fade(0.4)}>
          <Eyebrow>Built for Growing Businesses</Eyebrow>
        </motion.div>

        <h1
          className="mt-7 font-display text-[clamp(1.55rem,3.2vw,2.7rem)] leading-[1.12] text-[var(--color-text-primary)]"
          style={{ perspective: 800 }}
        >
          {SENTENCES.map((sentence, si) => {
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
          className="mt-6 max-w-xl font-body text-body-lg leading-relaxed text-[var(--color-text-secondary)]"
        >
          Lumjha answers your customers&apos; questions, captures sales leads, and
          books appointments — around the clock, on platform(s) they already use
          — so you can focus on running your business.
        </motion.p>

        <motion.div {...fade(1.1)} className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <a
            href={LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-7 py-3.5 font-body font-semibold text-body-md text-[var(--color-text-inverse)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_var(--color-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            Get Started Free <ArrowRight size={16} />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-bright)] bg-transparent px-7 py-3.5 font-body font-medium text-body-md text-[var(--color-text-primary)] transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          >
            See how it helps <ArrowDown size={16} />
          </a>
        </motion.div>

        <motion.ul {...fade(1.3)} className="mt-7 flex flex-wrap justify-center gap-2.5 lg:justify-start">
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

        <motion.dl {...fade(1.5)} className="mt-11 flex w-full max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-5 border-t border-[var(--color-border)] pt-8 lg:justify-start">
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

        {/* Right column — product video */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full"
        >
          {/* Accent glow behind the frame */}
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[2rem] opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, var(--color-accent-glow) 0%, transparent 70%)",
            }}
          />
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[var(--color-border-bright)] bg-[var(--color-bg-2)] shadow-[0_24px_70px_-20px_rgba(0,0,0,0.6)]">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/A-OHo8X1z1U?si=rlGx2vetnMOpZVUc"
              title="Lumjha product overview"
              loading="lazy"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </motion.div>
      </div>

      <span
        aria-hidden
        data-trail="center"
        className="pointer-events-none absolute bottom-[10%] left-1/2"
      />
    </section>
  );
}
