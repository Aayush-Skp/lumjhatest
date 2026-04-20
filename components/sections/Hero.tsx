"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GlowBackdrop } from "@/components/ui/GlowBackdrop";
import { ChatMock } from "@/components/ui/ChatMock";
import { site } from "@/content/site";
import { fadeUp, float, stagger } from "@/lib/motion";
import { useUIStore } from "@/store/useUIStore";

export function Hero() {
  const { openDemo } = useUIStore();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-28 md:pt-36 pb-24 md:pb-32"
    >
      {/* Background */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid" />
      <GlowBackdrop position="top" size={1100} intensity={0.7} color="rgb(var(--brand-400) / 0.4)" />
      <GlowBackdrop
        position="bottom"
        size={700}
        intensity={0.3}
        color="rgb(var(--brand-500) / 0.35)"
      />

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <motion.div
            variants={stagger(0.1, 0.1)}
            initial="hidden"
            animate="show"
            className="col-span-1 flex flex-col gap-7 lg:col-span-7"
          >
            <motion.h1
              id="hero-title"
              variants={fadeUp}
              className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-gradient-brand sm:text-5xl md:text-6xl lg:text-[72px]"
            >
              {site.hero.headline.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-xl text-base leading-relaxed text-fg-mid md:text-lg"
            >
              {site.hero.sub}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                icon={<Sparkles />}
                onClick={openDemo}
              >
                {site.hero.ctas.primary}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                iconRight={<ArrowDown />}
                onClick={() => {
                  document
                    .getElementById("how")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {site.hero.ctas.secondary}
              </Button>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-low"
            >
              {site.hero.proof.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-300" />
                  <span>{p}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Mockup */}
          <motion.div
            variants={float}
            animate="animate"
            className="col-span-1 lg:col-span-5"
          >
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgb(var(--brand-400)/0.35), transparent 70%)",
                }}
              />
              <ChatMock lines={site.chatDemo} eager />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
