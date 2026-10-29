import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import CtaPanel from "@/components/site/CtaPanel";
import { BlogCard, BlogCover, PostMeta } from "@/components/site/BlogCards";
import { listPosts } from "@/lib/admin/content";
import { headingId, type Block, type Post } from "../posts";

type Props = { params: Promise<{ slug: string }> };

// posts come from the admin panel, so a slug added after the build renders on
// first visit; one that doesn't exist 404s
export async function generateStaticParams() {
  const { posts } = await listPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

async function getPost(slug: string) {
  const { posts } = await listPosts();
  return { post: posts.find((p) => p.slug === slug), posts };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { post } = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date },
  };
}

function ArticleBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 id={headingId(block.text)} className="mt-11 scroll-mt-24 text-[22px] font-bold leading-snug tracking-tight text-ink md:text-[26px]">
          {block.text}
        </h2>
      );
    case "p":
      return <p className="mt-5 text-[16px] leading-[1.8] text-muted md:text-[17px]">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-[16px] leading-[1.7] text-muted md:text-[17px]">
              <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#527DFF]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "code":
      // code stays dark in both themes
      return (
        <pre className="mt-6 overflow-x-auto rounded-xl border border-[#22365C] bg-[#050D20] p-5 font-mono text-[13px] leading-[1.7] text-[#C9D3E6] light:border-transparent">
          <code>{block.text}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote className="mt-7 rounded-r-xl border-l-4 border-[#527DFF] bg-[#527DFF]/10 px-5 py-4 text-[17px] font-medium italic leading-relaxed text-ink md:text-[18px]">
          {block.text}
        </blockquote>
      );
  }
}

/** Same topic first, then the newest of the rest (`posts` is newest first). */
function relatedTo(post: Post, posts: Post[], count = 3) {
  const others = posts.filter((p) => p.slug !== post.slug);
  return [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, count);
}

export default async function BlogPostPage({ params }: Props) {
  const { post, posts } = await getPost((await params).slug);
  if (!post) notFound();
  const headings = post.body.flatMap((b) => (b.type === "h2" ? [b.text] : []));

  return (
    <div className="min-h-screen bg-page-deep font-sans text-ink antialiased">
      <Navbar />
      <main id="top" className="relative overflow-x-clip">
        <div className="pointer-events-none absolute -left-40 top-24 h-[500px] w-[300px] rounded-full bg-glow/30 blur-[120px]" />

        <article>
          {/* HEADER */}
          {/* back link sits on the content column's left edge, in line with the cover */}
          <div className="mx-auto max-w-[1160px] px-4 pt-8 sm:px-6 md:pt-10">
            <Link href="/blogs" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#527DFF] hover:text-ink">
              <span aria-hidden>←</span> All articles
            </Link>
          </div>
          <header className="relative mx-auto max-w-[860px] px-4 pt-6 text-center sm:px-6 md:pt-8">
            <h1 className="font-heading text-[clamp(1.875rem,3vw+1rem,3rem)] font-semibold leading-[1.15] tracking-tight text-balance text-headline">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-balance text-muted md:text-lg">{post.excerpt}</p>
            <div className="mt-6 flex flex-col items-center gap-1">
              <p className="text-[14px] font-semibold text-ink">{post.author}</p>
              <PostMeta post={post} />
            </div>
          </header>

          <div className="mx-auto mt-10 max-w-[1160px] px-4 sm:px-6 md:mt-12">
            <BlogCover
              post={post}
              large
              priority
              sizes="(min-width: 1160px) 1112px, 100vw"
              className="aspect-[16/9] w-full rounded-2xl md:aspect-[21/8] md:rounded-3xl"
            />
            {post.image && (
              <p className="mt-2.5 text-right text-[11.5px] text-subtle">
                Photo by{" "}
                <a href={post.image.creditUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-ink hover:underline">
                  {post.image.credit}
                </a>{" "}
                on Unsplash
              </p>
            )}
          </div>

          {/* BODY + table of contents */}
          <div className="mx-auto grid max-w-[1160px] grid-cols-1 gap-10 px-4 pb-16 pt-6 sm:px-6 md:pb-24 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16 lg:pt-10">
            <div className="mx-auto w-full max-w-[720px] lg:mx-0 lg:justify-self-end">
              {post.body.map((block, i) => (
                <ArticleBlock key={i} block={block} />
              ))}
            </div>

            {headings.length > 0 && (
              <aside className="hidden lg:block">
                <nav aria-label="On this page" className="sticky top-24 mt-6 border-l border-line pl-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-subtle">On this page</p>
                  <ul className="mt-4 space-y-3">
                    {headings.map((h) => (
                      <li key={h}>
                        <a href={`#${headingId(h)}`} className="block text-[13px] leading-snug text-muted transition-colors hover:text-[#527DFF]">
                          {h}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}
          </div>
        </article>

        {/* KEEP READING */}
        <section aria-labelledby="related-title" className="relative mx-auto max-w-[1440px] border-t border-line px-4 py-16 sm:px-6 md:py-24">
          <div className="mx-auto max-w-[1160px]">
            <h2 id="related-title" className="text-center font-heading text-[28px] font-bold leading-tight tracking-tight text-ink sm:text-4xl">
              Keep reading
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 md:mt-14">
              {relatedTo(post, posts).map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaPanel contactLabel="Book a Demo" />
        <Footer />
      </main>
    </div>
  );
}
