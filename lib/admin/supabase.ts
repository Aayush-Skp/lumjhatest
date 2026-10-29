/**
 * Minimal Supabase client for the admin panel: plain fetch against the
 * project's REST API (PostgREST), so the site keeps no extra dependencies.
 * Uses the service-role key, which bypasses row-level security — server
 * only, never NEXT_PUBLIC_. Tables are defined in supabase/schema.sql.
 */

export class SupabaseError extends Error {}

const ATTEMPTS = 3;
const ATTEMPT_TIMEOUT_MS = 5000;

/** Data-cache tags for admin reads; saves expire them with updateTag. */
export const TAGS = { pricing: "admin-pricing", blogs: "admin-blogs" } as const;

function config() {
  // the project URL; tolerate a pasted REST endpoint (…/rest/v1/) too
  const url = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url, key } : null;
}

export function supabaseConfigured(): boolean {
  return config() !== null;
}

/**
 * Call `/rest/v1/<path>`. `prefer` sets PostgREST's Prefer header (e.g.
 * "resolution=merge-duplicates" for upserts). `tags` caches a read in the
 * Next data cache until a save calls updateTag on one of them. Returns the
 * parsed JSON body, or null for an empty one.
 */
export async function rest<T = unknown>(
  path: string,
  { method = "GET", body, prefer, tags }: { method?: string; body?: unknown; prefer?: string; tags?: string[] } = {},
): Promise<T> {
  const c = config();
  if (!c) throw new SupabaseError("Supabase isn’t connected. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  const init: RequestInit = {
    method,
    headers: {
      apikey: c.key,
      // legacy service_role keys are JWTs and go in Authorization too; new
      // sb_secret_… keys are not JWTs and work from the apikey header alone
      ...(c.key.startsWith("eyJ") ? { Authorization: `Bearer ${c.key}` } : {}),
      "Content-Type": "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    ...(tags ? { cache: "force-cache", next: { tags, revalidate: 300 } } : { cache: "no-store" }),
  };
  // Some requests to a project can stall without ever answering; give each
  // attempt a few seconds and retry rather than waiting on one for long.
  // Every call here is safe to repeat (reads, upserts, deletes).
  let res: Response | undefined;
  for (let attempt = 0; attempt < ATTEMPTS && !res; attempt++) {
    try {
      res = await fetch(`${c.url}/rest/v1/${path}`, { ...init, signal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS) });
    } catch {
      // timed out or network error: try again
    }
  }
  if (!res) throw new SupabaseError("Supabase didn’t respond. Check your connection or the project’s status, then try again.");
  const text = await res.text();
  if (!res.ok) {
    let message = text;
    try {
      const err = JSON.parse(text) as { message?: string; code?: string; hint?: string };
      // 42P01 / PGRST205: the table doesn't exist yet
      if (err.code === "42P01" || err.code === "PGRST205") {
        message = "The admin tables don’t exist yet. Run supabase/schema.sql in the Supabase SQL editor.";
      } else {
        message = err.message || text;
      }
    } catch {
      // not JSON; keep the raw text
    }
    throw new SupabaseError(message || `Supabase returned ${res.status}`);
  }
  return (text ? JSON.parse(text) : null) as T;
}
