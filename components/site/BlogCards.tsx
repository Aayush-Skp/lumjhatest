import Link from "next/link";
import { formatDate, type Category, type Post } from "@/app/blogs/posts";

/* ============================================================
   Blog building blocks — code-drawn covers (no images to manage),
   post meta line and the post card used on /blogs.
   ============================================================ */

/* Blue covers, like the site's blue panels, so they stay the same in both themes. */
const COVER: Record<Category, { bg: string; icon: string[] }> = {
  RAG: {
    bg: "bg-[radial-gradient(120%_120%_at_0%_0%,#6E8BFF_0%,#3B5BFF_40%,#16267A_100%)]",
    // document + magnifier
    icon: ["M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4", "M14 3v5h5", "M14 3l5 5v3", "M9 9h2M9 13h4", "M20 20l-1.8-1.8", "M19 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0"],
  },
  "Tech news": {
    bg: "bg-[radial-gradient(120%_120%_at_100%_0%,#38BDF8_0%,#2563EB_45%,#132463_100%)]",
    // chip
    icon: ["M7 7h10v10H7z", "M10 10h4v4h-4z", "M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"],
  },
  Product: {
    bg: "bg-[radial-gradient(120%_120%_at_0%_100%,#A78BFA_0%,#5675FF_45%,#1E2A78_100%)]",
    // sparkles
    icon: ["M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z", "M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z"],
  },
  Guides: {
    bg: "bg-[radial-gradient(120%_120%_at_100%_100%,#2DD4BF_0%,#2563EB_50%,#14235E_100%)]",
    // open book
    icon: ["M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2Z", "M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7Z"],
  },
};

export function BlogCover({ category, large = false, className = "" }: { category: Category; large?: boolean; className?: string }) {
  const c = COVER[category];
  return (
    <div aria-hidden className={`relative isolate overflow-hidden ${c.bg} ${className}`}>
      {/* faint grid, faded toward the edges */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      {/* concentric rings behind the icon */}
      <div className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
      <div className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
      <div className="flex h-full w-full items-center justify-center">
        <span
          className={`flex items-center justify-center rounded-2xl border border-white/30 bg-white/15 text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.45)] backdrop-blur-sm ${
            large ? "h-20 w-20 md:h-24 md:w-24" : "h-14 w-14"
          }`}
        >
          <svg viewBox="0 0 24 24" className={large ? "h-10 w-10 md:h-12 md:w-12" : "h-7 w-7"} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            {c.icon.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>
        </span>
      </div>
    </div>
  );
}

export function CategoryPill({ category }: { category: Category }) {
  return (
    <span className="inline-flex rounded-full bg-[#527DFF]/15 px-2.5 py-1 text-[11.5px] font-semibold text-highlight">
      {category}
    </span>
  );
}

export function PostMeta({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 text-[12.5px] text-subtle ${className}`}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden>·</span>
      <span>{post.readMinutes} min read</span>
    </p>
  );
}

/** Card in the post grid — the whole card is the link. */
export function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-[#527DFF]/60 hover:shadow-[0_24px_60px_-30px_rgba(82,125,255,0.6)] light:border-card-ring"
    >
      <BlogCover category={post.category} className="aspect-[16/9] w-full" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <CategoryPill category={post.category} />
          <PostMeta post={post} />
        </div>
        <h3 className="mt-4 text-[17px] font-bold leading-snug text-ink transition-colors group-hover:text-highlight">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-auto pt-5 text-[13px] font-semibold text-[#527DFF]">
          Read article <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
