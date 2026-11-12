"use client";

import { useRef, useState } from "react";
import type { FormEvent, MouseEvent, ReactNode } from "react";
import { sendContactMessage } from "@/app/actions";

/* ============================================================
   "Contact Us" / "Book a Demo" button that opens the contact form
   in a modal dialog. Used in the product heroes and the blue CTA panel.
   Native <dialog> + showModal(): focus is trapped, Escape closes it,
   and it sits in the top layer above the tilt / overflow containers.
   Submissions are stored in Supabase and listed in /admin/messages.
   ============================================================ */

export default function ContactDisclosure({
  buttonClassName,
  rowClassName,
  label = "Contact Us",
  children,
}: {
  /** Classes for the toggle button, so it matches its neighbours. */
  buttonClassName: string;
  /** Classes for the row holding the other buttons + the toggle. */
  rowClassName: string;
  /** Button text, e.g. "Book a Demo" on the solution pages. */
  label?: string;
  /** The buttons that sit before the toggle in the row. */
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const isDemo = /demo/i.test(label);
  const heading = isDemo ? "Book a demo" : "Get in touch";
  const intro = isDemo
    ? "Tell us a bit about your business and we’ll set up a walkthrough of Lumjha AI."
    : "Tell us a bit about your business and we’ll reach out.";

  function openDialog() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    firstFieldRef.current?.focus({ preventScroll: true });
  }

  const closeDialog = () => dialogRef.current?.close();

  // Clicks on the dialog element itself land on the backdrop area around the card.
  function onDialogClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) closeDialog();
  }

  // Reopening after a successful send shows a fresh form.
  function onClose() {
    if (status === "sent" || status === "error") setStatus("idle");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("page", window.location.pathname);
    if (isDemo) fd.set("message", `[Demo request] ${fd.get("message") ?? ""}`);
    setStatus("sending");
    try {
      const result = await sendContactMessage(fd);
      if (!result.ok) {
        setError(result.message);
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const labelCls = "block text-[13px] font-semibold text-muted";
  const field =
    "mt-1.5 w-full rounded-lg border border-line bg-ink/[0.04] px-3.5 py-2.5 text-[14px] text-ink outline-none transition placeholder:text-subtle focus:border-[#527DFF] focus:ring-4 focus:ring-[#527DFF]/30";

  return (
    <>
      <div className={rowClassName}>
        {children}
        <button type="button" aria-haspopup="dialog" onClick={openDialog} className={buttonClassName}>
          {label}
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={heading}
        onClick={onDialogClick}
        onClose={onClose}
        className="m-auto w-[calc(100%-2rem)] max-w-xl overflow-visible bg-transparent p-0 text-ink opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] backdrop:bg-black/60 backdrop:backdrop-blur-sm open:translate-y-0 open:scale-100 open:opacity-100 starting:open:translate-y-3 starting:open:scale-95 starting:open:opacity-0 motion-reduce:transition-none"
      >
        <div className="relative rounded-2xl border border-line bg-surface p-5 text-left shadow-[0_24px_70px_-20px_rgba(82,125,255,0.45)] sm:p-7">
          <button
            type="button"
            onClick={closeDialog}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none text-subtle transition hover:bg-ink/10 hover:text-ink"
          >
            ×
          </button>

          {status === "sent" ? (
            <div className="py-6 text-center" role="status">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#527DFF] text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12.5 10 17 19 7" />
                </svg>
              </span>
              <p className="mt-4 text-lg font-extrabold">
                {isDemo ? "Thanks, demo request received!" : "Thanks, message received!"}
              </p>
              <p className="mt-1 text-[14px] text-subtle">We&apos;ll get back to you shortly.</p>
              <button
                type="button"
                onClick={closeDialog}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#527DFF] px-7 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#3E63F2]"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <p className="pr-8 text-lg font-extrabold sm:text-xl">{heading}</p>
              <p className="mt-1 text-[14px] text-subtle">{intro}</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className={labelCls}>
                  Name
                  <input
                    ref={firstFieldRef}
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={field}
                  />
                </label>
                <label className={labelCls}>
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={field}
                  />
                </label>
              </div>
              <label className={`mt-4 ${labelCls}`}>
                Message
                <textarea
                  name="message"
                  required
                  rows={4}
                  maxLength={1900}
                  placeholder={isDemo ? "What would you like to see in the demo?" : "How can we help?"}
                  className={`${field} resize-none`}
                />
              </label>
              {/* honeypot: hidden from people, filled in by bots */}
              <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

              {status === "error" && (
                <p className="mt-3 text-[13px] font-medium text-red-500" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#527DFF] px-7 py-3 text-[15px] font-semibold text-white transition hover:bg-[#3E63F2] disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? "Sending…" : isDemo ? "Request Demo" : "Send Message"}
                {status !== "sending" && <span aria-hidden>→</span>}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
