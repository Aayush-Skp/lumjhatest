"use client";

import Link from "next/link";
import { useActionState } from "react";
import { deletePostAction, savePostAction, type ActionState } from "@/app/admin/actions";
import { CATEGORIES, type Post } from "@/app/blogs/posts";
import { Card, Field, Message, dangerBtn, inputCls, primaryBtn, secondaryBtn } from "./ui";

/** Create or edit a blog post. `post` is undefined for a new one. */
export default function PostForm({
  post,
  bodyText,
  saved,
}: {
  post?: Post;
  bodyText: string;
  saved?: boolean;
}) {
  const [state, action, pending] = useActionState<ActionState, FormData>(savePostAction, saved ? { ok: true, message: "Post saved." } : null);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-5">
      <form action={action} className="space-y-5">
        <input type="hidden" name="previousSlug" value={post?.slug ?? ""} />
        <fieldset disabled={pending} className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <Card className="space-y-4">
              <Field label="Title">
                <input name="title" defaultValue={post?.title} required className={`${inputCls} text-[16px] font-semibold`} />
              </Field>
              <Field label="Excerpt" hint="One or two sentences for the blog list and search results.">
                <textarea name="excerpt" defaultValue={post?.excerpt} rows={3} className={inputCls} />
              </Field>
            </Card>
            <Card>
              <Field
                label="Body"
                hint="Blank line between paragraphs · ## Heading · - list item · > quote · ``` for code blocks"
              >
                <textarea
                  name="body"
                  defaultValue={bodyText}
                  rows={24}
                  required
                  spellCheck
                  className={`${inputCls} font-mono text-[13px] leading-relaxed`}
                />
              </Field>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="space-y-4">
              <Field label="URL slug" hint={post ? "Changing it moves the post to a new address." : "Leave empty to make one from the title."}>
                <input name="slug" defaultValue={post?.slug} placeholder="what-is-rag" className={inputCls} />
              </Field>
              <Field label="Category">
                <select name="category" defaultValue={post?.category ?? CATEGORIES[0]} className={inputCls}>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Publish date">
                  <input name="date" type="date" defaultValue={post?.date ?? today} required className={inputCls} />
                </Field>
                <Field label="Read time (min)">
                  <input name="readMinutes" type="number" min={1} defaultValue={post?.readMinutes ?? 5} className={inputCls} />
                </Field>
              </div>
              <Field label="Author">
                <input name="author" defaultValue={post?.author ?? "Lumjha Team"} className={inputCls} />
              </Field>
              <label className="flex items-center gap-2 text-[14px] text-ink">
                <input name="featured" type="checkbox" defaultChecked={post?.featured} className="h-4 w-4 accent-[#527DFF]" />
                Feature at the top of the blog
              </label>
            </Card>
            <Card className="space-y-4">
              <p className="text-[13px] font-medium text-ink">Cover photo</p>
              <Field label="Image path" hint="A file in public/, e.g. /assets/blog/my-post.jpg. Empty uses a drawn cover.">
                <input name="imageSrc" defaultValue={post?.image?.src} className={inputCls} />
              </Field>
              <Field label="Photo credit">
                <input name="imageCredit" defaultValue={post?.image?.credit} className={inputCls} />
              </Field>
              <Field label="Credit link">
                <input name="imageCreditUrl" type="url" defaultValue={post?.image?.creditUrl} className={inputCls} />
              </Field>
            </Card>
          </div>
        </fieldset>

        <div className="sticky bottom-0 -mx-1 flex flex-wrap items-center gap-3 border-t border-line bg-page-deep/90 px-1 py-3 backdrop-blur">
          <button type="submit" disabled={pending} className={primaryBtn}>
            {pending ? "Saving…" : post ? "Save post" : "Create post"}
          </button>
          <Link href="/admin/blogs" className={secondaryBtn}>
            Back to posts
          </Link>
          <Message state={state} />
        </div>
      </form>

      {post && <DeletePost slug={post.slug} title={post.title} />}
    </div>
  );
}

function DeletePost({ slug, title }: { slug: string; title: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(deletePostAction, null);
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(`Delete “${title}” from Supabase? This can’t be undone.`)) e.preventDefault();
      }}
      className="flex flex-wrap items-center gap-3 border-t border-line pt-5"
    >
      <input type="hidden" name="slug" value={slug} />
      <button type="submit" disabled={pending} className={dangerBtn}>
        {pending ? "Deleting…" : "Delete post"}
      </button>
      <Message state={state} />
    </form>
  );
}
