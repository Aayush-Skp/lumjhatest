import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostForm from "@/components/admin/PostForm";
import { LoadError, PageHeader } from "@/components/admin/ui";
import { listPosts } from "@/lib/admin/content";
import { requireAdmin } from "@/lib/admin/session";
import { blocksToText } from "@/lib/content/blog-format";

export const metadata: Metadata = { title: "Edit post" };

export default async function AdminPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdmin();
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const { source, posts } = await listPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <PageHeader title={post.title} description={`/blogs/${post.slug}`} />
      {source.kind === "site" && source.reason === "error" ? (
        <LoadError />
      ) : (
        <PostForm key={post.slug} post={post} bodyText={blocksToText(post.body)} saved={query.saved === "1"} />
      )}
    </div>
  );
}
