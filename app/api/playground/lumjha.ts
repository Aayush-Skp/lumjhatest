/**
 * Server-only plumbing for the Play Area routes. The playground key stays on
 * the server: the browser only ever talks to /api/playground on this site,
 * and these routes add the key and the visitor's IP before calling Lumjha.
 */

import { PLAYGROUND_CONSENT_VERSION, PLAYGROUND_MAX_BYTES } from "@/lib/playground";

const API_URL = (process.env.LUMJHA_API_URL || "https://api.lumjha.ai").replace(/\/$/, "");

export function playgroundKey(): string | null {
  return process.env.LUMJHA_PLAYGROUND_KEY || null;
}

/**
 * The visitor's IP. On Vercel `x-forwarded-for` is set by the platform (its
 * first entry is the client), which is what the Lumjha API rate-limits on.
 */
export function visitorIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "";
}

export function json(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export function unavailable(): Response {
  return json({ success: false, code: "NOT_CONFIGURED", error: "The playground is not available right now." }, 503);
}

/** Call the Lumjha playground API and hand its answer back unchanged. */
export async function forward(path: string, request: Request, init: RequestInit): Promise<Response> {
  const key = playgroundKey();
  if (!key) return unavailable();
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/public/playground${path}`, {
      ...init,
      headers: { "x-playground-key": key, "x-visitor-ip": visitorIp(request) },
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });
  } catch {
    return json({ success: false, code: "UPSTREAM_UNAVAILABLE", error: "The playground is not reachable right now." }, 502);
  }
  const retryAfter = res.headers.get("retry-after");
  return new Response(await res.text(), {
    status: res.status,
    headers: {
      "Content-Type": res.headers.get("content-type") || "application/json",
      "Cache-Control": "no-store",
      ...(retryAfter ? { "Retry-After": retryAfter } : {}),
    },
  });
}

/**
 * Checks an upload from the browser and rebuilds it for Lumjha: one file of
 * at most 1 MB, consent ticked, Turnstile passed (when on). Returns the form
 * to forward, or the refusal to send back.
 */
export async function readUpload(request: Request): Promise<FormData | Response> {
  // Refuse an oversized body before reading it (multipart adds a little framing).
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > PLAYGROUND_MAX_BYTES + 64 * 1024) {
    return json({ success: false, code: "FILE_TOO_LARGE", error: "The file is larger than 1 MB." }, 413);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ success: false, code: "INVALID_UPLOAD", error: "Send the file as a form upload." }, 400);
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return json({ success: false, code: "FILE_REQUIRED", error: "Choose a file to upload." }, 400);
  }
  if (file.size > PLAYGROUND_MAX_BYTES) {
    return json({ success: false, code: "FILE_TOO_LARGE", error: "The file is larger than 1 MB." }, 413);
  }
  if (form.get("consent") !== "true") {
    return json(
      { success: false, code: "CONSENT_REQUIRED", error: "Accept the notice about how uploads are used first." },
      400,
    );
  }
  if (!(await passesTurnstile(form.get("turnstileToken"), visitorIp(request)))) {
    return json({ success: false, code: "VERIFICATION_FAILED", error: "Verification failed. Please try again." }, 403);
  }

  const upstream = new FormData();
  upstream.append("file", file, file.name);
  upstream.append("consent", "true");
  // The version is the server's, not the browser's: it records the notice this
  // site actually showed.
  upstream.append("consentVersion", PLAYGROUND_CONSENT_VERSION);
  return upstream;
}

/**
 * Cloudflare Turnstile check. Off until TURNSTILE_SECRET_KEY is set (with
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY on the page); the Lumjha API's own
 * per-visitor and daily limits apply either way.
 */
export async function passesTurnstile(token: FormDataEntryValue | null, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(10_000),
    });
    const result = (await res.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}
