import type { Metadata } from "next";
import Link from "next/link";
import ImportButton from "@/components/admin/ImportButton";
import { PageHeader, primaryBtn } from "@/components/admin/ui";
import { formatDate } from "@/app/blogs/posts";
import { listPosts } from "@/lib/admin/content";
import { requireAdmin } from "@/lib/admin/session";
import { supabaseConfigured } from "@/lib/admin/supabase";

export const metadata: Metadata = { title: "Blogs" };

export default async function AdminBlogsPage() {
  await requireAdmin();
  const { source, posts } = await listPosts();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blogs"
        description="Posts on the Blogs page, newest first."
        actions={
          <>
            {supabaseConfigured() && source.kind !== "database" && <ImportButton kind="blogs" variant="secondary" />}
            <Link href="/admin/blogs/new" className={primaryBtn}>
              + New post
            </Link>
          </>
        }
      />

      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <table className="w-full text-left text-[14px]">
          <thead className="border-b border-line text-[12px] uppercase tracking-wider text-subtle">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Category</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {posts.map((p) => (
              <tr key={p.slug} className="transition hover:bg-ink/[0.03]">
                <td className="px-4 py-3">
                  <Link href={`/admin/blogs/${p.slug}`} className="font-medium text-ink hover:text-[#527DFF]">
                    {p.title}
                  </Link>
                  {p.featured && <span className="ml-2 rounded-full bg-[#527DFF]/15 px-2 py-0.5 text-[11px] font-semibold text-[#527DFF]">Featured</span>}
                  <p className="mt-0.5 text-[12px] text-subtle">/blogs/{p.slug}</p>
                </td>
                <td className="hidden px-4 py-3 text-muted md:table-cell">{p.category}</td>
                <td className="hidden whitespace-nowrap px-4 py-3 text-muted sm:table-cell">{formatDate(p.date)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/blogs/${p.slug}`} className="text-[13px] font-semibold text-[#527DFF] hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!posts.length && <p className="px-4 py-10 text-center text-[14px] text-muted">No posts yet.</p>}
      </div>
    </div>
  );
}
