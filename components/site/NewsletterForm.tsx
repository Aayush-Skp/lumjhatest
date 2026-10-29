"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { subscribeToNewsletter, type FormResult } from "@/app/actions";

/** Footer newsletter sign-up; emails are stored in Supabase and listed in /admin/newsletter. */
export default function NewsletterForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<FormResult | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("page", window.location.pathname);
    setPending(true);
    setResult(null);
    try {
      const res = await subscribeToNewsletter(fd);
      setResult(res);
      if (res.ok) form.reset();
    } catch {
      setResult({ ok: false, message: "Something went wrong. Please try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        type="email"
        required
        maxLength={200}
        autoComplete="email"
        aria-label="Email address"
        placeholder="you@company.com"
        className="mt-4 w-full rounded-md border border-line bg-white px-3 py-2.5 text-[13px] text-black outline-none placeholder:text-subtle"
      />
      {/* honeypot: hidden from people, filled in by bots */}
      <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <button
        type="submit"
        disabled={pending}
        className="mt-3 flex items-center gap-1.5 rounded-md bg-[#527DFF] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[#3E63F2] disabled:opacity-60"
      >
        ✉ {pending ? "Subscribing…" : "Subscribe"}
      </button>
      {result && (
        <p role="status" className={`mt-2 text-[12px] font-medium ${result.ok ? "text-emerald-500" : "text-red-500"}`}>
          {result.message}
        </p>
      )}
    </form>
  );
}
