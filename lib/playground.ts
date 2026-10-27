/**
 * Play Area "chat with your document" — shared by the upload UI and the
 * server routes that forward to the Lumjha API (app/api/playground).
 */

/** 1 MiB — the Lumjha API's PLAYGROUND_MAX_FILE_BYTES default. */
export const PLAYGROUND_MAX_BYTES = 1_048_576;

export const PLAYGROUND_ACCEPT = ".pdf,.docx,.txt,.md";

/**
 * Which wording of the upload notice the visitor accepted. Bump it whenever
 * that text changes, so each stored upload records what its uploader agreed to.
 */
export const PLAYGROUND_CONSENT_VERSION = "2026-10-27";

export type PlaygroundState = "processing" | "ready" | "failed" | "expired";

export interface PlaygroundDocument {
  fileName: string;
  sizeBytes: number;
  state: "processing" | "ready" | "failed";
  progress?: number;
}

/**
 * `state` is the chat's: `ready` once any of its documents is, so a second
 * file can be read while the visitor keeps chatting about the first.
 */
export interface PlaygroundSession {
  sessionId: string;
  state: PlaygroundState;
  progress?: number;
  /** The first document. */
  document: { fileName: string; sizeBytes: number };
  /** Every document in the chat, oldest first (the API caps it, 2 by default). */
  documents?: PlaygroundDocument[];
  maxDocuments?: number;
  /** Whether "Add another document" may be offered now. */
  canAddDocument?: boolean;
  chatUrl: string | null;
  expiresAt: string;
}

/** A session id as the Lumjha API issues them. */
export const SESSION_ID = /^[A-Za-z0-9_-]{16,64}$/;

/** An agent subdomain, as Lumjha allows them (3–30 chars). */
export const AGENT_SUBDOMAIN = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/;

/** The sample website (with the real widget installed) that Lumjha Play frames. */
export const PREVIEW_PATH = "/play-area/preview";

/** The agent behind a Lumjha chat URL (`…/chat/<subdomain>`), or null. */
export function subdomainFromChatUrl(chatUrl: string | null | undefined): string | null {
  if (!chatUrl) return null;
  try {
    const match = new URL(chatUrl).pathname.match(/^\/chat\/([^/]+)\/?$/);
    return match && AGENT_SUBDOMAIN.test(match[1]) ? match[1] : null;
  } catch {
    return null;
  }
}

/**
 * A visitor-typed website address as a full http(s) URL, or null. Adds
 * `https://` when no scheme is given; refuses other schemes, credentials and
 * non-standard ports (so it can't be pointed at internal services).
 */
export function normalizeSiteUrl(input: string | null | undefined): string | null {
  const raw = (input ?? "").trim();
  if (!raw || raw.length > 2048) return null;
  try {
    const url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    if (url.username || url.password || url.port) return null;
    if (!url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}
