"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export function LeadCapture() {
  return (
    <section
      id="leads"
      aria-labelledby="leads-title"
      className="relative py-16 md:py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeader
              eyebrow={site.leads.eyebrow}
              title={<span id="leads-title">{site.leads.title}</span>}
              align="left"
            />
            <p className="max-w-xl text-base leading-relaxed text-fg-mid md:text-lg">
              {site.leads.copy}
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-fg-low">
              {["Name", "Email", "Interest", "Source", "Session ID"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-stroke/15 bg-bg-3/60 px-3 py-1 font-mono"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-fg-low">
                Lead pipeline
              </span>
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
                {site.leads.pipeline.split(" → ").map((stage, i, arr) => (
                  <span key={stage} className="flex items-center gap-1.5">
                    <span className="rounded-lg border border-brand-300/20 bg-brand-300/10 px-2.5 py-1 text-xs font-medium text-brand-200">
                      {stage}
                    </span>
                    {i < arr.length - 1 ? (
                      <span aria-hidden className="text-fg-low">
                        →
                      </span>
                    ) : null}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="relative glass-strong overflow-hidden rounded-2xl p-5 md:p-6"
          >
            <div
              aria-hidden
              className="soft-glow pointer-events-none absolute -inset-10 -z-10 rounded-[48px] blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgb(var(--brand-400)/0.3), transparent 70%)",
              }}
            />
            <div className="flex flex-col gap-2.5">
              {site.leads.demo.map((line, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className={cn(
                    "flex",
                    line.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                      line.role === "user"
                        ? "bg-brand-300 text-bg-0 rounded-br-sm"
                        : "bg-bg-3/80 border border-stroke/10 text-fg-high rounded-bl-sm",
                    )}
                  >
                    {line.text}
                  </div>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                viewport={viewport}
                className="mt-3 flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-success"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{site.leads.savedToast}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
