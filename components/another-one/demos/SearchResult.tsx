"use client";

import { motion } from "framer-motion";
import { Link2, MessageSquare } from "lucide-react";

export interface SearchResultData {
  title: string;
  excerpt: string;
  /** Source page link shown beneath the result. */
  url: string;
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

      <div className="mt-3 flex items-center justify-between gap-3">
        <a
          href={result.url}
          onClick={(e) => e.preventDefault()}
          className="inline-flex min-w-0 items-center gap-1.5 font-mono text-[11px] text-[var(--color-accent)] transition-colors hover:underline"
        >
          <Link2 size={12} className="shrink-0" />
          <span className="truncate">{result.url}</span>
        </a>

        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[var(--color-border)] px-2.5 py-1 font-body text-[11px] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          <MessageSquare size={11} />
          Continue in chat
        </button>
      </div>
    </motion.div>
  );
}
