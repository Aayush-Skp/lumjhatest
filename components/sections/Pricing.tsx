"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { useUIStore } from "@/store/useUIStore";

export function Pricing() {
  const { openDemo } = useUIStore();
  const { pricing } = site;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative py-24 md:py-32"
    >
      <Container className="flex flex-col items-center gap-14">
        <SectionHeader
          eyebrow={pricing.eyebrow}
          title={<span id="pricing-title">{pricing.title}</span>}
          description={pricing.description}
        />

        {/* Tiers */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pricing.tiers.map((tier) => (
            <motion.div key={tier.name} variants={fadeUp} className="h-full">
              <Card
                variant={tier.featured ? "gradient-border" : "surface"}
                interactive
              >
                <div className="flex h-full flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-fg-high">
                        {tier.name}
                      </h3>
                      {tier.featured ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-brand-300/30 bg-brand-300/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brand-200">
                          <Sparkles className="h-3 w-3" />
                          Popular
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-fg-low">{tier.blurb}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-semibold tracking-tight text-fg-high">
                      {tier.price}
                    </span>
                    {tier.cadence ? (
                      <span className="text-sm text-fg-low">{tier.cadence}</span>
                    ) : null}
                  </div>

                  <Button
                    variant={tier.featured ? "primary" : "outline"}
                    size="md"
                    className="w-full"
                    onClick={openDemo}
                  >
                    {tier.cta}
                  </Button>

                  <ul className="flex flex-col gap-3 border-t border-stroke/10 pt-5">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-fg-mid"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-300/15 text-brand-300">
                          <Check className="h-3 w-3" strokeWidth={2.5} />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Add-on modules */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="w-full overflow-hidden rounded-2xl border border-stroke/15 bg-bg-2/50 p-6 backdrop-blur-xl md:p-8"
        >
          <div className="flex flex-col gap-1.5">
            <h3 className="font-display text-lg font-semibold tracking-tight text-fg-high">
              {pricing.addons.title}
            </h3>
            <p className="text-sm text-fg-low">{pricing.addons.note}</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {pricing.addons.items.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-stroke/10 bg-bg-3/50 px-4 py-3.5"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-fg-high">
                    {addon.name}
                  </span>
                  {addon.save ? (
                    <span className="text-[11px] font-medium text-success">
                      {addon.save}
                    </span>
                  ) : null}
                </div>
                <span className="shrink-0 font-display text-base font-semibold text-brand-200">
                  {addon.price}
                  <span className="text-xs font-normal text-fg-low">
                    {addon.cadence}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="flex max-w-2xl items-center justify-center gap-2 text-center text-sm leading-relaxed text-fg-low">
          <ShieldCheck className="h-4 w-4 shrink-0 text-brand-300" />
          <span>{pricing.footnote}</span>
        </p>
      </Container>
    </section>
  );
}
