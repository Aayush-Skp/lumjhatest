"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";

/* ============================================================
   "Contact Us" button that slides a contact form open beneath it.
   Used in the hero (dark) and inside the blue CTA panel (light).
   ============================================================ */

export type ContactPayload = { name: string; email: string; message: string };

/**
 * TODO(backend): replace this stub with the real request, e.g.
 *   await fetch("/api/contact", { method: "POST", body: JSON.stringify(data) })
 * and throw on a non-OK response so the form shows its error state.
 * Until then nothing is stored — submissions only reach the console.
 */
async function submitContact(data: ContactPayload): Promise<void> {
  console.info("[contact] form not wired to a backend yet", data);
  await new Promise((r) => setTimeout(r, 600));
}

type Variant = "dark" | "light";

const THEME: Record<
  Variant,
  { card: string; label: string; input: string; muted: string; close: string; submit: string }
> = {
  // hero: glassy card on the navy background
  dark: {
    card: "border border-line bg-surface/90 text-ink shadow-[0_24px_70px_-20px_rgba(82,125,255,0.35)] backdrop-blur",
    label: "text-muted",
    input:
      "border-line bg-ink/[0.04] text-ink placeholder:text-subtle focus:border-[#527DFF] focus:ring-[#527DFF]/30",
    muted: "text-subtle",
    close: "text-subtle hover:bg-ink/10 hover:text-ink",
    submit: "bg-[#527DFF] text-white hover:bg-[#3E63F2]",
  },
  // CTA: white card on the blue panel, like the pricing cards
  light: {
    card: "border border-[#D7E3F5] bg-white text-[#0B1526] shadow-xl",
    label: "text-gray-700",
    input:
      "border-gray-300 bg-white text-[#0B1526] placeholder:text-gray-400 focus:border-[#527DFF] focus:ring-[#527DFF]/25",
    muted: "text-gray-500",
    close: "text-gray-400 hover:bg-gray-100 hover:text-gray-700",
    submit: "bg-[#527DFF] text-white hover:bg-[#3E63F2]",
  },
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function ContactDisclosure({
  variant,
  buttonClassName,
  rowClassName,
  label = "Contact Us",
  children,
}: {
  variant: Variant;
  /** Classes for the "Contact Us" toggle, so it matches its neighbours. */
  buttonClassName: string;
  /** Classes for the row holding the other buttons + the toggle. */
  rowClassName: string;
  /** Toggle text, e.g. "Book a Demo" on the solution pages. */
  label?: string;
  /** The buttons that sit before the toggle in the row. */
  children: ReactNode;
}) {
  const t = THEME[variant];
  const id = useId();
  const panelId = `${id}-contact`;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Move focus into the form once it has slid open; Escape closes it.
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => firstFieldRef.current?.focus({ preventScroll: true }), 350);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    try {
      await submitContact({
        name: String(fd.get("name") ?? "").trim(),
        email: String(fd.get("email") ?? "").trim(),
        message: String(fd.get("message") ?? "").trim(),
      });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field = `mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-[14px] outline-none transition focus:ring-4 ${t.input}`;

  return (
    <>
      <div className={rowClassName}>
        {children}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={`gap-2 ${buttonClassName}`}
        >
          {label}
          <Chevron open={open} />
        </button>
      </div>

      {/* grid-rows 0fr → 1fr animates to the form's natural height */}
      <div
        id={panelId}
        inert={!open}
        className={`grid w-full transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`mx-auto max-w-xl px-1 pb-8 pt-6 transition-all duration-500 motion-reduce:transition-none md:pt-8 ${
              open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
            }`}
          >
            <div className={`relative rounded-2xl p-5 text-left sm:p-7 ${t.card}`}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close contact form"
                className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-lg leading-none transition ${t.close}`}
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
                  <p className="mt-4 text-lg font-extrabold">Thanks, message received!</p>
                  <p className={`mt-1 text-[14px] ${t.muted}`}>We&apos;ll get back to you shortly.</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-5 text-[14px] font-semibold text-[#527DFF] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <p className="text-lg font-extrabold sm:text-xl">Get in touch</p>
                  <p className={`mt-1 text-[14px] ${t.muted}`}>
                    Tell us a bit about your business and we&apos;ll reach out.
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className={`block text-[13px] font-semibold ${t.label}`}>
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
                    <label className={`block text-[13px] font-semibold ${t.label}`}>
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
                  <label className={`mt-4 block text-[13px] font-semibold ${t.label}`}>
                    Message
                    <textarea
                      name="message"
                      required
                      rows={4}
                      maxLength={2000}
                      placeholder="How can we help?"
                      className={`${field} resize-none`}
                    />
                  </label>

                  {status === "error" && (
                    <p className="mt-3 text-[13px] font-medium text-red-500" role="alert">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-[15px] font-semibold transition disabled:opacity-60 sm:w-auto ${t.submit}`}
                  >
                    {status === "sending" ? "Sending…" : "Send Message"}
                    {status !== "sending" && <span aria-hidden>→</span>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
