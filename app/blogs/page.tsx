import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CtaPanel from "@/components/site/CtaPanel";
import BlogFilter from "@/components/site/BlogFilter";
import { BlogCover, CategoryPill, PostMeta } from "@/components/site/BlogCards";
import { SECTION_HEAD_GAP } from "@/components/site/SectionHeader";
import { sortedPosts } from "./posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on retrieval-augmented generation (RAG), AI tech news and Lumjha product updates: how to build AI agents that answer from your own business knowledge.",
};

export default function BlogsPage() {
  const posts = sortedPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);

  return (
    <div className="min-h-screen bg-page-deep font-sans text-ink antialiased">
      <Navbar />
      <main id="top" className="relative overflow-x-clip">
        <div className="pointer-events-none absolute -left-40 top-24 h-[500px] w-[300px] rounded-full bg-glow/30 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 top-[700px] h-[500px] w-[300px] rounded-full bg-glow/20 blur-[120px]" />

        {/* HERO */}
        <section className="relative mx-auto max-w-[1440px] px-4 pb-10 pt-14 text-center sm:px-6 md:pb-14 md:pt-20">
          <p className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-highlight">The Lumjha Blog</p>
          <h1 className="mx-auto mt-4 max-w-4xl font-heading text-[clamp(2.25rem,4vw+1rem,3.75rem)] font-semibold leading-[1.12] tracking-tight text-balance text-headline">
            RAG, AI agents and <span className="text-[#5675FF]">what’s new</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-balance text-muted sm:text-lg md:mt-6">
            How retrieval-augmented generation really works, the AI news that matters for customer
            conversations, and what we’re shipping at Lumjha.
          </p>
        </section>

        {/* FEATURED */}
        <section aria-labelledby="featured-title" className="relative mx-auto max-w-[1440px] px-4 sm:px-6">
          <Link
            href={`/blogs/${featured.slug}`}
            className="group mx-auto grid max-w-[1160px] grid-cols-1 overflow-hidden rounded-3xl border border-line bg-surface transition duration-300 hover:border-[#527DFF]/60 hover:shadow-[0_30px_80px_-40px_rgba(82,125,255,0.7)] light:border-card-ring lg:grid-cols-[1.1fr_1fr]"
          >
            <BlogCover category={featured.category} large className="aspect-[16/9] w-full lg:aspect-auto lg:min-h-[380px]" />
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#FFD21B] px-2.5 py-1 text-[11px] font-bold text-[#182031]">Featured</span>
                <CategoryPill category={featured.category} />
              </div>
              <h2 id="featured-title" className="mt-4 text-[24px] font-bold leading-tight tracking-tight text-ink transition-colors group-hover:text-highlight sm:text-[30px]">
                {featured.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{featured.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">{featured.author}</p>
                  <PostMeta post={featured} className="mt-0.5" />
                </div>
                <span className="text-[14px] font-semibold text-[#527DFF]">
                  Read article <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* ALL POSTS */}
        <section aria-labelledby="latest-title" className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-16 sm:px-6 md:pb-24 md:pt-24">
          <div className="mx-auto max-w-[1160px]">
            <h2 id="latest-title" className="text-center font-heading text-[28px] font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              Latest articles
            </h2>
            <BlogFilter posts={rest} className={SECTION_HEAD_GAP} />
          </div>
        </section>

        <CtaPanel contactLabel="Book a Demo" />
        <Footer />
      </main>
    </div>
  );
}
