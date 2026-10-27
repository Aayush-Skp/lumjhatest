"use client";

import { useCallback, useEffect, useRef, useState, type DragEvent, type ReactNode } from "react";
import {
  PLAYGROUND_ACCEPT,
  PLAYGROUND_MAX_BYTES,
  PREVIEW_PATH,
  subdomainFromChatUrl,
  type PlaygroundSession,
} from "@/lib/playground";

/**
 * Lumjha Play demo: compact steps on top; below them a sample website
 * with the real chat widget installed, shown in a browser frame, with an
 * upload button in its toolbar. Before an upload the widget is the shared demo
 * agent; while a document is read an overlay covers the preview, and once it
 * is ready the sample site reloads with a sandbox agent that answers only from
 * that document, chat open.
 *
 * Talks only to this site's /api/playground routes, which hold the API key.
 * The session id is kept in sessionStorage so a reload returns to the chat.
 */

const STORAGE_KEY = "lumjha-playground-session";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const POLL_GIVE_UP_MS = 10 * 60 * 1000;
const ALLOWED = PLAYGROUND_ACCEPT.split(",");

type View =
  | { kind: "idle" }
  | { kind: "uploading"; fileName: string }
  | { kind: "session"; session: PlaygroundSession };

interface ApiResult {
  success: boolean;
  data?: PlaygroundSession;
  error?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render(
        el: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ): string;
      remove(id: string): void;
    };
  }
}

function readStored(): string | null {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function store(id: string | null) {
  try {
    if (id) sessionStorage.setItem(STORAGE_KEY, id);
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable (private mode) — the chat just won't survive a reload.
  }
}

async function call(input: string, init?: RequestInit): Promise<ApiResult> {
  try {
    const res = await fetch(input, { ...init, cache: "no-store" });
    const body = (await res.json().catch(() => null)) as ApiResult | null;
    return body ?? { success: false, error: "Something went wrong. Please try again." };
  } catch {
    return { success: false, error: "Could not reach Lumjha Play. Check your connection and try again." };
  }
}

function statusUrl(id: string) {
  return `/api/playground/sessions/${encodeURIComponent(id)}`;
}

export default function PlayDemo() {
  const [view, setView] = useState<View>({ kind: "idle" });
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const closePicker = useCallback(() => setPickerOpen(false), []);

  const session = view.kind === "session" ? view.session : null;
  const sessionId = session?.sessionId;
  const processing = session?.state === "processing";
  const docAgent = session?.state === "ready" ? subdomainFromChatUrl(session.chatUrl) : null;
  // One page load per agent: the widget loader cannot be swapped in place.
  const previewSrc = docAgent ? `${PREVIEW_PATH}?agent=${encodeURIComponent(docAgent)}&open=1` : PREVIEW_PATH;
  const busy = view.kind === "uploading" || processing;
  const failed = session != null && !processing && !docAgent;

  // Back to the same chat after a reload, while it is still usable.
  useEffect(() => {
    const id = readStored();
    if (!id) return;
    let cancelled = false;
    call(statusUrl(id)).then((result) => {
      if (cancelled) return;
      if (result.success && result.data && (result.data.state === "ready" || result.data.state === "processing")) {
        setView({ kind: "session", session: result.data });
      } else {
        store(null);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Poll while the document is being read: briskly at first, then gently.
  useEffect(() => {
    if (!sessionId || !processing) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const started = Date.now();
    const poll = async () => {
      const result = await call(statusUrl(sessionId));
      if (cancelled) return;
      if (result.success && result.data) {
        setView({ kind: "session", session: result.data });
        if (result.data.state !== "processing") return;
      }
      const elapsed = Date.now() - started;
      if (elapsed > POLL_GIVE_UP_MS) {
        setView((current) =>
          current.kind === "session" ? { kind: "session", session: { ...current.session, state: "failed" } } : current,
        );
        return;
      }
      timer = setTimeout(poll, elapsed < 60_000 ? 2000 : 5000);
    };
    timer = setTimeout(poll, 1500);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [sessionId, processing]);

  const upload = useCallback(
    async (file: File) => {
      setError(null);
      const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
      if (!ALLOWED.includes(ext)) {
        setError("Please choose a PDF, DOCX, TXT or Markdown file.");
        return;
      }
      if (file.size === 0) {
        setError("That file is empty.");
        return;
      }
      if (file.size > PLAYGROUND_MAX_BYTES) {
        setError("That file is over 1MB.");
        return;
      }
      if (TURNSTILE_SITE_KEY && !token) {
        setError("Please complete the verification first.");
        return;
      }
      setPickerOpen(false);
      setView({ kind: "uploading", fileName: file.name });
      const form = new FormData();
      form.append("file", file);
      form.append("consent", String(consent));
      if (token) form.append("turnstileToken", token);
      const result = await call("/api/playground/sessions", { method: "POST", body: form });
      // A Turnstile token is single-use; the picker renders a fresh widget.
      setToken(null);
      if (result.success && result.data) {
        store(result.data.sessionId);
        setView({ kind: "session", session: result.data });
      } else {
        setView({ kind: "idle" });
        setError(result.error || "Upload failed. Please try again.");
        setPickerOpen(true);
      }
    },
    [consent, token],
  );

  const reset = useCallback((openPicker = false) => {
    store(null);
    setError(null);
    setView({ kind: "idle" });
    setPickerOpen(openPicker);
  }, []);

  // Which of the three steps the visitor is on.
  const step = docAgent ? 1 : 0;

  let overlay: ReactNode = null;
  if (view.kind === "uploading") {
    overlay = <Progress title="Uploading your document…" fileName={view.fileName} percent={5} />;
  } else if (session && processing) {
    overlay = (
      <Progress
        title="Processing your document…"
        fileName={session.document.fileName}
        percent={Math.max(10, session.progress ?? 0)}
      />
    );
  } else if (session && failed) {
    const expired = session.state === "expired";
    overlay = (
      <Notice
        title={expired ? "This chat has ended" : "We couldn’t read that document"}
        text={
          expired
            ? "Document chats last 24 hours. Upload it again to start a new one."
            : "It may be scanned, password-protected or empty. Try another file."
        }
        action="Try another document"
        onAction={() => reset(true)}
      />
    );
  } else if (docAgent && loadedSrc !== previewSrc) {
    overlay = <Progress title="Starting your document agent…" fileName={session?.document.fileName ?? ""} percent={100} />;
  }

  return (
    <div className="mx-auto mt-5 flex w-full max-w-[1160px] flex-col gap-4 text-left md:mt-6">
      <PlaySteps current={step} busy={busy} />

      {/* the sample site with the real widget, framed as a browser window */}
      <div className="rounded-2xl border border-line bg-white shadow-[0_10px_30px_-12px_rgba(0,121,242,0.18)]">
        {/* toolbar: upload on the left, which agent is answering on the right */}
        <div className="relative flex min-h-[60px] flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-200 px-3 py-2.5 sm:px-4">
          {busy ? (
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-[#5675FF]/25 border-t-[#5675FF]" aria-hidden />
              <span className="min-w-0 truncate text-sm font-medium text-[#0B1526]">
                {view.kind === "uploading" ? view.fileName : session?.document.fileName}
              </span>
              <ProgressBar percent={view.kind === "uploading" ? 5 : Math.max(10, session?.progress ?? 0)} className="w-24 shrink-0 sm:w-36" />
            </div>
          ) : (
            <>
              <button
                type="button"
                aria-expanded={pickerOpen}
                aria-controls="play-upload"
                onClick={() => (failed ? reset(true) : setPickerOpen((o) => !o))}
                className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition ${
                  docAgent
                    ? "border border-[#5675FF]/40 text-[#3E63F2] hover:border-[#5675FF] hover:bg-[#F4F6FF]"
                    : "bg-[#5675FF] text-white shadow-[0_6px_18px_-8px_rgba(86,117,255,0.8)] hover:bg-[#4562f0]"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 16V4m0 0-4 4m4-4 4 4" />
                  <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </svg>
                {docAgent ? "Upload another" : "Upload your document"}
              </button>
              {pickerOpen && (
                <UploadPicker
                  consent={consent}
                  onConsent={setConsent}
                  onFile={upload}
                  onToken={setToken}
                  error={error}
                  onClose={closePicker}
                />
              )}
            </>
          )}

          <div className="ml-auto flex min-w-0 items-center gap-3 text-xs">
            {docAgent && session ? (
              <>
                <span className="flex min-w-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span className="truncate">Answering from {session.document.fileName}</span>
                </span>
                <button type="button" onClick={() => reset()} className="shrink-0 font-semibold text-[#5675FF] hover:underline">
                  Back to demo
                </button>
              </>
            ) : busy ? (
              <span className="font-medium text-slate-500">This takes about a minute</span>
            ) : (
              <span className="hidden font-medium text-slate-500 sm:inline">Chatting with the demo agent</span>
            )}
          </div>
        </div>

        {/* browser chrome + sample site */}
        <div className="overflow-hidden rounded-b-2xl">
          <div className="flex h-10 items-center gap-3 border-b border-slate-200 bg-slate-100 px-4">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            </span>
            <span className="flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white px-3 text-xs text-slate-500 ring-1 ring-slate-200">
              <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              <span className="truncate">northwindhomes.com</span>
            </span>
          </div>
          <div className="relative">
            <iframe
              key={previewSrc}
              src={previewSrc}
              title={docAgent ? "Sample website with a chat agent for your document" : "Sample website with the Lumjha chat widget"}
              loading="lazy"
              allow="microphone; clipboard-write"
              onLoad={() => setLoadedSrc(previewSrc)}
              scrolling="no"
              className="block h-[560px] w-full md:h-[640px]"
            />
            {/* covers the demo agent while a document is on its way, so it's clear which agent is answering */}
            {overlay && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/85 p-6 backdrop-blur-sm">
                <div className="w-full max-w-[340px] rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_-12px_rgba(0,121,242,0.18)]">
                  {overlay}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  { title: "Upload your document", body: "PDF, DOCX, TXT or MD, up to 1MB." },
  { title: "Ask a question", body: "Use the chat on the sample site." },
  { title: "See the result", body: "Answers come straight from your file." },
];

/** Compact horizontal steps above the preview (stacked on mobile); follows the demo's progress. */
function PlaySteps({ current, busy }: { current: number; busy: boolean }) {
  return (
    <ol className="flex flex-col gap-4 rounded-2xl border border-line bg-surface/60 px-5 py-4 backdrop-blur md:flex-row md:items-center md:gap-0">
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === STEPS.length - 1;
        return (
          <li key={s.title} className={`flex items-center gap-3 ${last ? "" : "md:flex-1"}`}>
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold transition ${
                done || active ? "bg-[#5675FF] text-white" : "border border-line text-subtle"
              } ${active ? "ring-4 ring-[#5675FF]/20" : ""}`}
            >
              {done ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m5 12 5 5 9-10" />
                </svg>
              ) : (
                i + 1
              )}
            </span>
            <div className="min-w-0 md:max-w-[230px]">
              <p className={`text-[15px] font-semibold leading-snug ${done || active ? "text-ink" : "text-muted"}`}>
                <span className="sr-only">{done ? "Done: " : active ? "Current step: " : ""}</span>
                {s.title}
              </p>
              <p className="text-[13px] leading-relaxed text-subtle">
                {active && busy && i === 0 ? "Processing your document…" : s.body}
              </p>
            </div>
            {/* connector to the next step */}
            {!last && (
              <span aria-hidden className={`mx-4 hidden h-px min-w-6 flex-1 md:block ${done ? "bg-[#5675FF]" : "bg-line"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Drop zone + consent, opened from the toolbar's upload button. */
function UploadPicker({
  consent,
  onConsent,
  onFile,
  onToken,
  error,
  onClose,
}: {
  consent: boolean;
  onConsent: (value: boolean) => void;
  onFile: (file: File) => void;
  onToken: (token: string | null) => void;
  error: string | null;
  onClose: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on Escape or a click outside (the toolbar button toggles it itself).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current?.contains(target)) return;
      if ((target as Element).closest?.('[aria-controls="play-upload"]')) return;
      onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [onClose]);

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    if (!consent) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  }

  return (
    <div
      ref={ref}
      id="play-upload"
      className="absolute left-3 top-[calc(100%+8px)] z-20 w-[min(360px,calc(100%-24px))] rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-[0_24px_60px_-20px_rgba(11,21,38,0.35)] sm:left-4"
    >
      <label
        onDragOver={(e) => {
          e.preventDefault();
          if (consent) setDragging(true);
        }}
        onDragLeave={(e) => {
          // ignore leaves into the box's own children
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragging(false);
        }}
        onDrop={onDrop}
        aria-disabled={!consent}
        className={`group flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 transition ${
          !consent
            ? "cursor-not-allowed border-slate-200 opacity-60"
            : dragging
              ? "cursor-pointer border-[#5675FF] bg-[#EEF2FF]"
              : "cursor-pointer border-[#5675FF]/50 hover:border-[#5675FF] hover:bg-[#F4F6FF]"
        }`}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5675FF]/10 text-[#5675FF]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 16V4m0 0-4 4m4-4 4 4" />
            <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
        </span>
        <span className="mt-3 text-[15px] font-bold text-[#0B1526]">{dragging ? "Drop it here" : "Drag a file here or browse"}</span>
        <span className="mt-1 text-xs text-slate-500">PDF, DOCX, TXT or MD · up to 1MB</span>
        <input
          type="file"
          name="document"
          accept={PLAYGROUND_ACCEPT}
          disabled={!consent}
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (file) onFile(file);
          }}
        />
      </label>

      <label className="mt-3 flex items-start gap-2 text-left text-xs leading-relaxed text-slate-600">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => onConsent(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#5675FF]"
        />
        <span>
          Lumjha keeps documents and chats from Lumjha Play and may use them to improve its products. Don’t upload
          personal or confidential information.{" "}
          <a href="/privacy" className="font-medium text-[#5675FF] underline underline-offset-2">
            Privacy Policy
          </a>
        </span>
      </label>

      {TURNSTILE_SITE_KEY && (
        <div className="mt-3 flex justify-center">
          <Turnstile siteKey={TURNSTILE_SITE_KEY} onToken={onToken} />
        </div>
      )}

      <span aria-live="polite" className="mt-2 block min-h-4 text-left text-xs">
        {error && <span className="text-red-600">{error}</span>}
      </span>
    </div>
  );
}

function ProgressBar({ percent, className = "" }: { percent: number; className?: string }) {
  return (
    <div
      className={`h-1.5 overflow-hidden rounded-full bg-slate-200 ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(percent)}
    >
      <div className="h-full rounded-full bg-[#5675FF] transition-[width] duration-500" style={{ width: `${percent}%` }} />
    </div>
  );
}

function Progress({ title, fileName, percent }: { title: string; fileName: string; percent: number }) {
  return (
    <div className="flex flex-col items-center gap-3 px-5 py-7 text-center" aria-live="polite">
      <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#5675FF]/25 border-t-[#5675FF]" aria-hidden />
      <p className="text-lg font-bold text-[#0B1526]">{title}</p>
      {fileName && <p className="max-w-full truncate text-sm text-slate-600">{fileName}</p>}
      <ProgressBar percent={percent} className="w-full max-w-[220px]" />
      <p className="text-xs leading-relaxed text-slate-500">The chat switches to your document as soon as it’s ready.</p>
    </div>
  );
}

function Notice({ title, text, action, onAction }: { title: string; text: string; action: string; onAction: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 px-5 py-7 text-center" role="status">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600" aria-hidden>
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v5m0 3.5v.5M12 3l9.5 17h-19z" />
        </svg>
      </span>
      <p className="text-lg font-bold text-[#0B1526]">{title}</p>
      <p className="text-sm leading-relaxed text-slate-600">{text}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-2 rounded-lg bg-[#5675FF] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#4562f0]"
      >
        {action}
      </button>
    </div>
  );
}

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  return new Promise((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = TURNSTILE_SRC;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("Turnstile failed to load")), { once: true });
  });
}

/** Cloudflare Turnstile, rendered only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set. */
function Turnstile({ siteKey, onToken }: { siteKey: string; onToken: (token: string | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let widgetId: string | undefined;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        widgetId = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          callback: (token) => onToken(token),
          "expired-callback": () => onToken(null),
          "error-callback": () => onToken(null),
        });
      })
      .catch(() => onToken(null));
    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [siteKey, onToken]);
  return <div ref={ref} />;
}
