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
 * Lumjha Play demo: a sample website with the real chat widget installed,
 * shown in a browser frame, beside an upload box. Before an upload the widget
 * is the shared demo agent; once a visitor's document is read, the sample site
 * reloads with a sandbox agent that answers only from that document, chat open.
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

  const session = view.kind === "session" ? view.session : null;
  const sessionId = session?.sessionId;
  const processing = session?.state === "processing";
  const docAgent = session?.state === "ready" ? subdomainFromChatUrl(session.chatUrl) : null;
  // One page load per agent: the widget loader cannot be swapped in place.
  const previewSrc = docAgent ? `${PREVIEW_PATH}?agent=${encodeURIComponent(docAgent)}&open=1` : PREVIEW_PATH;

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
      setView({ kind: "uploading", fileName: file.name });
      const form = new FormData();
      form.append("file", file);
      form.append("consent", String(consent));
      if (token) form.append("turnstileToken", token);
      const result = await call("/api/playground/sessions", { method: "POST", body: form });
      // A Turnstile token is single-use; the idle view renders a fresh widget.
      setToken(null);
      if (result.success && result.data) {
        store(result.data.sessionId);
        setView({ kind: "session", session: result.data });
      } else {
        setView({ kind: "idle" });
        setError(result.error || "Upload failed. Please try again.");
      }
    },
    [consent, token],
  );

  const reset = useCallback(() => {
    store(null);
    setError(null);
    setView({ kind: "idle" });
  }, []);

  let panel: ReactNode;
  if (view.kind === "idle") {
    panel = <UploadPanel consent={consent} onConsent={setConsent} onFile={upload} onToken={setToken} error={error} />;
  } else if (view.kind === "uploading") {
    panel = <Progress title="Uploading…" fileName={view.fileName} percent={5} />;
  } else if (view.session.state === "processing") {
    panel = (
      <Progress
        title="Reading your document…"
        fileName={view.session.document.fileName}
        percent={Math.max(10, view.session.progress ?? 0)}
      />
    );
  } else if (docAgent) {
    panel = (
      <Notice
        tone="ok"
        title="Ready — ask away"
        text={`The chat on the sample site now answers from ${view.session.document.fileName}. It stays available for 24 hours.`}
        action="Upload another document"
        onAction={reset}
      />
    );
  } else {
    const expired = view.session.state === "expired";
    panel = (
      <Notice
        tone="warn"
        title={expired ? "This chat has ended" : "We couldn’t read that document"}
        text={
          expired
            ? "Document chats last 24 hours. Upload it again to start a new one."
            : "It may be scanned, password-protected or empty. Try another file."
        }
        action="Try another document"
        onAction={reset}
      />
    );
  }

  return (
    <div className="mx-auto mt-10 grid w-full max-w-[1058px] gap-5 md:mt-14 lg:grid-cols-[minmax(0,1fr)_300px]">
      {/* browser window around the sample site, so the widget reads as installed on a real page */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white text-left shadow-[0_10px_30px_-12px_rgba(0,121,242,0.18)]">
        <div className="flex h-11 shrink-0 items-center gap-3 border-b border-slate-200 bg-slate-100 px-4">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </span>
          <span className="flex h-7 min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white px-3 text-xs text-slate-500 ring-1 ring-slate-200">
            <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            <span className="truncate">northwindhomes.com</span>
          </span>
          {docAgent && session ? (
            <button
              type="button"
              onClick={reset}
              title={`Answering from ${session.document.fileName}`}
              className="shrink-0 text-xs font-semibold text-[#5675FF] hover:underline"
            >
              Back to demo agent
            </button>
          ) : (
            <span className="hidden shrink-0 text-xs font-medium text-slate-500 sm:inline">Live preview</span>
          )}
        </div>
        <iframe
          key={previewSrc}
          src={previewSrc}
          title={docAgent ? "Sample website with a chat agent for your document" : "Sample website with the Lumjha chat widget"}
          loading="lazy"
          allow="microphone; clipboard-write"
          className="block h-[560px] w-full md:h-[680px]"
        />
      </div>

      <div className="flex min-h-[220px] flex-col rounded-2xl border-2 border-dashed border-[#5675FF]/60 bg-white shadow-[0_10px_30px_-12px_rgba(0,121,242,0.18)] lg:min-h-0">
        {panel}
      </div>
    </div>
  );
}

function UploadPanel({
  consent,
  onConsent,
  onFile,
  onToken,
  error,
}: {
  consent: boolean;
  onConsent: (value: boolean) => void;
  onFile: (file: File) => void;
  onToken: (token: string | null) => void;
  error: string | null;
}) {
  const [dragging, setDragging] = useState(false);

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDragging(false);
    if (!consent) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  }

  return (
    <div className="flex flex-1 flex-col px-5 py-6 text-center">
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
        className={`group flex flex-1 flex-col items-center justify-center rounded-xl px-2 py-2 transition ${
          !consent ? "cursor-not-allowed opacity-60" : dragging ? "cursor-pointer bg-[#EEF2FF]" : "cursor-pointer hover:bg-[#F4F6FF]"
        }`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5675FF]/10 text-[#5675FF] transition group-hover:bg-[#5675FF]/15">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 16V4m0 0-4 4m4-4 4 4" />
            <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
        </span>
        <span className="mt-4 text-lg font-bold text-[#0B1526]">{dragging ? "Drop it here" : "Upload a document"}</span>
        <span className="mt-1.5 text-sm leading-relaxed text-slate-600">
          Drag a file here, then ask the agent questions about it.
        </span>
        <span className="mt-5 rounded-full bg-[#5675FF] px-5 py-2 text-sm font-semibold text-white">Choose file</span>
        <span className="mt-3 text-xs text-slate-500">PDF, DOCX, TXT or MD · up to 1MB</span>
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

      <label className="mt-4 flex items-start gap-2 text-left text-xs leading-relaxed text-slate-600">
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

      <span aria-live="polite" className="mt-2 min-h-4 text-xs">
        {error && <span className="text-red-600">{error}</span>}
      </span>
    </div>
  );
}

function Progress({ title, fileName, percent }: { title: string; fileName: string; percent: number }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 py-8 text-center" aria-live="polite">
      <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#5675FF]/25 border-t-[#5675FF]" aria-hidden />
      <p className="text-lg font-bold text-[#0B1526]">{title}</p>
      <p className="max-w-full truncate text-sm text-slate-600">{fileName}</p>
      <div
        className="h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
      >
        <div className="h-full rounded-full bg-[#5675FF] transition-[width] duration-500" style={{ width: `${percent}%` }} />
      </div>
      <p className="text-xs text-slate-500">The chat switches to your document as soon as it’s ready.</p>
    </div>
  );
}

function Notice({
  tone,
  title,
  text,
  action,
  onAction,
}: {
  tone: "ok" | "warn";
  title: string;
  text: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 py-8 text-center" role="status">
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          tone === "ok" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
        }`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          {tone === "ok" ? <path d="m5 12 5 5 9-10" /> : <path d="M12 8v5m0 3.5v.5M12 3l9.5 17h-19z" />}
        </svg>
      </span>
      <p className="text-lg font-bold text-[#0B1526]">{title}</p>
      <p className="text-sm leading-relaxed text-slate-600">{text}</p>
      <button
        type="button"
        onClick={onAction}
        className="mt-2 rounded-full bg-[#5675FF] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#4562f0]"
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
