import { POSTS, type Block, type Category, type Post } from "@/app/blogs/posts";
import { PLANS, type Feature, type Plan } from "@/lib/content/pricing";
import { rest, SupabaseError, supabaseConfigured } from "./supabase";

/**
 * Admin data access for pricing plans and blog posts. Reads Supabase when it
 * is connected and has rows; otherwise falls back to the site's built-in
 * data (lib/content/pricing.ts, app/blogs/posts.ts) so the panel always
 * shows what the site shows. Server-only.
 */

/** Where the admin's data came from, and why. */
export type Source =
  | { kind: "database" }
  | { kind: "site"; reason: "not-configured" | "empty" | "error"; message?: string };

export type PlanRecord = Plan & { id: string; position: number };

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* ---------- pricing ---------- */

type PlanRow = {
  id: string;
  position: number;
  name: string;
  audience: string;
  price_monthly: string;
  price_annual: string;
  detail_monthly: string;
  detail_annual: string;
  allowance: string;
  allowance_note: string | null;
  cta: string;
  href: string | null;
  featured: boolean;
  includes: string | null;
  features: Feature[];
  note: string;
};

const sitePlans = (): PlanRecord[] => PLANS.map((p, i) => ({ ...p, id: slugify(p.name), position: i }));

function planFromRow(r: PlanRow): PlanRecord {
  return {
    id: r.id,
    position: r.position,
    name: r.name,
    audience: r.audience,
    price: { monthly: r.price_monthly, annual: r.price_annual },
    detail: { monthly: r.detail_monthly, annual: r.detail_annual },
    allowance: r.allowance,
    allowanceNote: r.allowance_note ?? undefined,
    cta: r.cta,
    href: r.href ?? undefined,
    featured: r.featured,
    includes: r.includes ?? undefined,
    features: r.features ?? [],
    note: r.note,
  };
}

function planToRow(p: PlanRecord): PlanRow & { updated_at: string } {
  return {
    id: p.id,
    position: p.position,
    name: p.name,
    audience: p.audience,
    price_monthly: p.price.monthly,
    price_annual: p.price.annual,
    detail_monthly: p.detail.monthly,
    detail_annual: p.detail.annual,
    allowance: p.allowance,
    allowance_note: p.allowanceNote || null,
    cta: p.cta,
    href: p.href || null,
    featured: Boolean(p.featured),
    includes: p.includes || null,
    features: p.features,
    note: p.note,
    updated_at: new Date().toISOString(),
  };
}

export async function listPlans(): Promise<{ source: Source; plans: PlanRecord[] }> {
  if (!supabaseConfigured()) return { source: { kind: "site", reason: "not-configured" }, plans: sitePlans() };
  try {
    const rows = await rest<PlanRow[]>("pricing_plans?select=*&order=position.asc");
    if (!rows.length) return { source: { kind: "site", reason: "empty" }, plans: sitePlans() };
    return { source: { kind: "database" }, plans: rows.map(planFromRow) };
  } catch (e) {
    return { source: { kind: "site", reason: "error", message: errorText(e) }, plans: sitePlans() };
  }
}

export async function savePlan(plan: PlanRecord): Promise<void> {
  // first edit into an empty table: bring the other plans along so none go missing
  if (await isEmpty("pricing_plans", "id")) await importSitePlans();
  await rest(`pricing_plans?on_conflict=id`, { method: "POST", body: planToRow(plan), prefer: "resolution=merge-duplicates" });
}

/** Replace every plan in the database with the site's built-in plans. */
export async function importSitePlans(): Promise<number> {
  const rows = sitePlans().map(planToRow);
  // upsert first, then drop the rest, so a failure never leaves the table empty
  await rest("pricing_plans?on_conflict=id", { method: "POST", body: rows, prefer: "resolution=merge-duplicates" });
  await rest(`pricing_plans?id=not.in.${inList(rows.map((r) => r.id))}`, { method: "DELETE" });
  return rows.length;
}

/* ---------- blog ---------- */

type PostRow = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  read_minutes: number;
  author: string;
  featured: boolean;
  image: Post["image"] | null;
  body: Block[];
};

const sitePosts = (): Post[] => [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

function postFromRow(r: PostRow): Post {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    date: r.date,
    readMinutes: r.read_minutes,
    author: r.author,
    featured: r.featured,
    image: r.image ?? undefined,
    body: r.body ?? [],
  };
}

function postToRow(p: Post): PostRow & { updated_at: string } {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.date,
    read_minutes: p.readMinutes,
    author: p.author,
    featured: Boolean(p.featured),
    image: p.image ?? null,
    body: p.body,
    updated_at: new Date().toISOString(),
  };
}

export async function listPosts(): Promise<{ source: Source; posts: Post[] }> {
  if (!supabaseConfigured()) return { source: { kind: "site", reason: "not-configured" }, posts: sitePosts() };
  try {
    const rows = await rest<PostRow[]>("blog_posts?select=*&order=date.desc");
    if (!rows.length) return { source: { kind: "site", reason: "empty" }, posts: sitePosts() };
    return { source: { kind: "database" }, posts: rows.map(postFromRow) };
  } catch (e) {
    return { source: { kind: "site", reason: "error", message: errorText(e) }, posts: sitePosts() };
  }
}

export async function savePost(post: Post, previousSlug?: string): Promise<void> {
  if (await isEmpty("blog_posts", "slug")) await importSitePosts();
  await rest(`blog_posts?on_conflict=slug`, { method: "POST", body: postToRow(post), prefer: "resolution=merge-duplicates" });
  if (previousSlug && previousSlug !== post.slug) await deletePost(previousSlug);
}

export async function deletePost(slug: string): Promise<void> {
  if (await isEmpty("blog_posts", "slug")) await importSitePosts();
  await rest(`blog_posts?slug=eq.${encodeURIComponent(slug)}`, { method: "DELETE" });
}

/** Replace every post in the database with the site's built-in posts. */
export async function importSitePosts(): Promise<number> {
  const rows = POSTS.map(postToRow);
  await rest("blog_posts?on_conflict=slug", { method: "POST", body: rows, prefer: "resolution=merge-duplicates" });
  await rest(`blog_posts?slug=not.in.${inList(rows.map((r) => r.slug))}`, { method: "DELETE" });
  return rows.length;
}

async function isEmpty(table: string, key: string): Promise<boolean> {
  const rows = await rest<unknown[]>(`${table}?select=${key}&limit=1`);
  return rows.length === 0;
}

/** A PostgREST `in` list: ("a","b"), quoted so commas and dots in values are safe. */
function inList(values: string[]): string {
  return encodeURIComponent(`(${values.map((v) => `"${v.replace(/["\\]/g, "\\$&")}"`).join(",")})`);
}

export function errorText(e: unknown): string {
  return e instanceof SupabaseError ? e.message : "Something went wrong talking to Supabase.";
}
