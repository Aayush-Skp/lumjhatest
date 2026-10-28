"use client";

import { useActionState } from "react";
import { importSiteData, type ActionState } from "@/app/admin/actions";

const LABEL = {
  pricing: "Copy site pricing to Supabase",
  blogs: "Copy site blogs to Supabase",
  all: "Copy all site data to Supabase",
};

const CONFIRM = {
  pricing: "Replace every pricing plan in Supabase with the plans built into the site?",
  blogs: "Replace every blog post in Supabase with the posts built into the site? Posts that only exist in Supabase will be deleted.",
  all: "Replace all pricing plans and blog posts in Supabase with the data built into the site? Anything that only exists in Supabase will be deleted.",
};

/** Copies the site's built-in data into Supabase (replacing what's there), after a confirm. */
export default function ImportButton({ kind, variant = "primary" }: { kind: "pricing" | "blogs" | "all"; variant?: "primary" | "secondary" }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(importSiteData, null);
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(CONFIRM[kind])) e.preventDefault();
      }}
      className="flex flex-col items-start gap-2"
    >
      <input type="hidden" name="kind" value={kind} />
      <button
        type="submit"
        disabled={pending}
        className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-[14px] font-semibold transition disabled:opacity-60 ${
          variant === "primary" ? "bg-[#527DFF] text-white hover:bg-[#3E63F2]" : "border border-line text-ink hover:bg-ink/[0.05]"
        }`}
      >
        {pending && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />}
        {pending ? "Copying…" : LABEL[kind]}
      </button>
      {state && (
        <span role="status" className={`text-[12px] ${state.ok ? "text-emerald-500" : "text-red-500"}`}>
          {state.message}
        </span>
      )}
    </form>
  );
}
