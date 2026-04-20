"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, viewport } from "@/lib/motion";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: Props) {
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn(
        "relative z-10 flex w-full flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <motion.div
          variants={fadeUp}
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "h-px w-10",
              align === "center"
                ? "bg-gradient-to-r from-transparent via-brand-300 to-brand-300/60"
                : "bg-gradient-to-r from-brand-300 to-brand-300/0",
              "shadow-[0_0_14px_rgb(var(--brand-300)/0.55)]",
            )}
          />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand-200">
            {eyebrow}
          </span>
          {align === "center" ? (
            <span
              aria-hidden
              className="h-px w-10 bg-gradient-to-l from-transparent via-brand-300 to-brand-300/60 shadow-[0_0_14px_rgb(var(--brand-300)/0.55)]"
            />
          ) : null}
        </motion.div>
      ) : null}
      <motion.h2
        variants={fadeUp}
        className={cn(
          "font-display font-semibold tracking-tight text-gradient-brand",
          "text-3xl sm:text-4xl md:text-5xl",
          align === "center" ? "max-w-3xl" : "max-w-3xl",
        )}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={fadeUp}
          className={cn(
            "text-base md:text-lg leading-relaxed text-fg-mid",
            align === "center" ? "max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
