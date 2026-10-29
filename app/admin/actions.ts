"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { CATEGORIES, type Category, type Post } from "@/app/blogs/posts";
import {
  deletePost,
  errorText,
  importSitePlans,
  importSitePosts,
  savePlan,
  savePost,
  slugify,
  type PlanRecord,
} from "@/lib/admin/content";
import { adminConfigured, createSession, credentialsMatch, destroySession, requireAdmin } from "@/lib/admin/session";
import { TAGS } from "@/lib/admin/supabase";
import { textToBlocks } from "@/lib/content/blog-format";
import type { Feature } from "@/lib/content/pricing";

export type ActionState = { ok: boolean; message: string } | null;

const text = (form: FormData, name: string) => String(form.get(name) ?? "").trim();

/* ---------- auth ---------- */

export async function login(_: ActionState, form: FormData): Promise<ActionState> {
  if (!adminConfigured()) {
    return { ok: false, message: "Admin sign-in isn’t set up. Add ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SESSION_SECRET to the environment." };
  }
  if (!credentialsMatch(text(form, "username"), String(form.get("password") ?? ""))) {
    // slow down guessing a little
    await new Promise((r) => setTimeout(r, 600));
    return { ok: false, message: "Wrong username or password." };
  }
  await createSession(text(form, "username"));
  redirect("/admin/pricing");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

/* ---------- import the site's built-in data ---------- */

export async function importSiteData(_: ActionState, form: FormData): Promise<ActionState> {
  await requireAdmin();
  const kind = text(form, "kind");
  try {
    const parts: string[] = [];
    if (kind === "pricing" || kind === "all") parts.push(`${await importSitePlans()} plans`);
    if (kind === "blogs" || kind === "all") parts.push(`${await importSitePosts()} blog posts`);
    if (!parts.length) return { ok: false, message: "Nothing to import." };
    if (kind !== "blogs") updateTag(TAGS.pricing);
    if (kind !== "pricing") updateTag(TAGS.blogs);
    revalidatePath("/admin", "layout");
    if (kind !== "blogs") revalidatePath("/pricing");
    if (kind !== "pricing") revalidatePath("/blogs", "layout");
    return { ok: true, message: `Copied ${parts.join(" and ")} from the site into Supabase.` };
  } catch (e) {
    return { ok: false, message: errorText(e) };
  }
}

/* ---------- pricing ---------- */

export async function savePlanAction(_: ActionState, form: FormData): Promise<ActionState> {
  await requireAdmin();
  const name = text(form, "name");
  const priceMonthly = text(form, "priceMonthly");
  const priceAnnual = text(form, "priceAnnual");
  if (!name || !priceMonthly || !priceAnnual) return { ok: false, message: "Name and both prices are required." };

  let features: Feature[];
  try {
    const parsed = JSON.parse(String(form.get("features") ?? "[]")) as Feature[];
    features = parsed
      .map((f) => ({ text: String(f.text ?? "").trim(), strong: Boolean(f.strong) || undefined, exclusive: Boolean(f.exclusive) || undefined }))
      .filter((f) => f.text);
  } catch {
    return { ok: false, message: "The feature list couldn’t be read. Reload and try again." };
  }

  const plan: PlanRecord = {
    id: text(form, "id") || slugify(name),
    position: Number(text(form, "position")) || 0,
    name,
    audience: text(form, "audience"),
    price: { monthly: priceMonthly, annual: priceAnnual },
    detail: { monthly: text(form, "detailMonthly"), annual: text(form, "detailAnnual") },
    allowance: text(form, "allowance"),
    allowanceNote: text(form, "allowanceNote") || undefined,
    cta: text(form, "cta"),
    href: text(form, "href") || undefined,
    featured: form.get("featured") === "on",
    includes: text(form, "includes") || undefined,
    features,
    note: text(form, "note"),
  };
  try {
    await savePlan(plan);
  } catch (e) {
    return { ok: false, message: errorText(e) };
  }
  updateTag(TAGS.pricing);
  revalidatePath("/admin", "layout");
  revalidatePath("/pricing");
  return { ok: true, message: `Saved ${plan.name}.` };
}

/* ---------- blog ---------- */

export async function savePostAction(_: ActionState, form: FormData): Promise<ActionState> {
  await requireAdmin();
  const title = text(form, "title");
  const slug = slugify(text(form, "slug") || title);
  const category = text(form, "category") as Category;
  const date = text(form, "date");
  const previousSlug = text(form, "previousSlug");

  if (!title || !slug) return { ok: false, message: "A title is required." };
  if (!CATEGORIES.includes(category)) return { ok: false, message: "Pick a category." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false, message: "Pick a publish date." };

  const imageSrc = text(form, "imageSrc");
  const post: Post = {
    slug,
    title,
    excerpt: text(form, "excerpt"),
    category,
    date,
    readMinutes: Math.max(1, Number(text(form, "readMinutes")) || 1),
    author: text(form, "author"),
    featured: form.get("featured") === "on",
    image: imageSrc ? { src: imageSrc, credit: text(form, "imageCredit"), creditUrl: text(form, "imageCreditUrl") } : undefined,
    body: textToBlocks(String(form.get("body") ?? "")),
  };
  if (!post.body.length) return { ok: false, message: "Write the post body first." };

  try {
    await savePost(post, previousSlug || undefined);
  } catch (e) {
    return { ok: false, message: errorText(e) };
  }
  updateTag(TAGS.blogs);
  revalidatePath("/admin", "layout");
  revalidatePath("/blogs", "layout");
  // a new post, or a renamed slug, lives at a new URL
  if (previousSlug !== slug) redirect(`/admin/blogs/${slug}?saved=1`);
  return { ok: true, message: "Post saved." };
}

export async function deletePostAction(_: ActionState, form: FormData): Promise<ActionState> {
  await requireAdmin();
  try {
    await deletePost(text(form, "slug"));
  } catch (e) {
    return { ok: false, message: errorText(e) };
  }
  updateTag(TAGS.blogs);
  revalidatePath("/admin", "layout");
  revalidatePath("/blogs", "layout");
  redirect("/admin/blogs");
}
