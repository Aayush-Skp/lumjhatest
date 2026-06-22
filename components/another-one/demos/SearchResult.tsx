"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export interface SearchResultData {
  title: string;
  excerpt: string;
  source: string;
}

export default function SearchResult({
  result,
  delay = 0,
}: {
  result: SearchResultData;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-2)] p-4 transition-colors hover:border-[var(--color-border-bright)]"
    >
      <p className="font-body font-semibold text-body-md text-[var(--color-text-primary)]">
        {result.title}
      </p>
      <p className="mt-1 font-body text-body-sm text-[var(--color-text-secondary)]">
        {result.excerpt}
      </p>
      <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--color-text-muted)]">
        <FileText size={12} />
        {result.source}
      </span>
    </motion.div>
  );
}
