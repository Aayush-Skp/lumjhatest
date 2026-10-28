import type { Metadata } from "next";
import PostForm from "@/components/admin/PostForm";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/admin/session";

export const metadata: Metadata = { title: "New post" };

export default async function AdminNewPostPage() {
  await requireAdmin();
  return (
    <div className="space-y-6">
      <PageHeader title="New post" />
      <PostForm bodyText="" />
    </div>
  );
}
