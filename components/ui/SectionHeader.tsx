"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Badge } from "./Badge";
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
        <motion.div variants={fadeUp}>
          <Badge tone="brand">{eyebrow}</Badge>
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
