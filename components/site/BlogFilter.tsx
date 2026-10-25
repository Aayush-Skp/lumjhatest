"use client";

import { useState } from "react";
import { CATEGORIES, type Category, type Post } from "@/app/blogs/posts";
import { BlogCard } from "./BlogCards";

type Filter = "All" | Category;

/** Category pills + the post grid on /blogs. */
export default function BlogFilter({ posts, className = "" }: { posts: Post[]; className?: string }) {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  const count = (f: Filter) => (f === "All" ? posts.length : posts.filter((p) => p.category === f).length);

  return (
    <div className={className}>
      <div role="group" aria-label="Filter posts by topic" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
        {(["All", ...CATEGORIES] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-colors ${
              filter === f
                ? "border-[#527DFF] bg-[#527DFF] text-white"
                : "border-line bg-surface text-muted hover:border-[#527DFF]/60 hover:text-ink light:border-card-ring"
            }`}
          >
            {f}
            <span className={`text-[11px] font-medium ${filter === f ? "text-white/80" : "text-subtle"}`}>{count(f)}</span>
          </button>
        ))}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {shown.map((p) => (
          <li key={p.slug}>
            <BlogCard post={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
