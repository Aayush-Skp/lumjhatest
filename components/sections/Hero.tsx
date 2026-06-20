"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ChatMock } from "@/components/ui/ChatMock";
import { AnimatedLogoMark } from "@/components/ui/AnimatedLogoMark";
import { CardLightSweep } from "@/components/ui/CardLightSweep";
import { site } from "@/content/site";
import { fadeUp, float, stagger } from "@/lib/motion";
import { useUIStore } from "@/store/useUIStore";

export function Hero() {
  const { openDemo } = useUIStore();

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-20 pb-10 md:pt-24 md:pb-14"
    >
      {/* Background — just the faint dotted grid; no radial glow backdrop. */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-grid" />

      {/* Animated AI badge — sits behind the chat box on the right, shifted
          further down so it reads as a subtle glowing accent. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 flex items-center justify-end overflow-visible"
      >
        <AnimatedLogoMark
          className="h-[48vh] max-h-[360px] w-auto translate-x-[4%] translate-y-[34%] opacity-[0.10] md:h-[56vh] md:max-h-[420px] md:translate-x-[-2%] md:translate-y-[40%] md:opacity-[0.11] lg:h-[62vh] lg:max-h-[480px] lg:translate-x-[-8%] lg:translate-y-[46%] lg:opacity-[0.12]"
        />
      </div>

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
            className="hidden lg:col-span-5 lg:block"
          >
            <div className="relative">
              <ChatMock lines={site.chatDemo} title="Lumjha Agent · Sales Bot" eager />
              {/* Minimal ray of light that occasionally traces the card outline */}
              <CardLightSweep radius={16} />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
