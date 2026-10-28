import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

/**
 * Admin sign-in for /admin. One account from the server environment
 * (ADMIN_USERNAME / ADMIN_PASSWORD); the session is a cookie signed with
 * ADMIN_SESSION_SECRET (HMAC-SHA256), so nothing is stored server-side.
 * Server-only: import from server components, server actions and routes.
 */

const COOKIE = "lumjha_admin";
const MAX_AGE_S = 60 * 60 * 12; // 12 hours

type Session = { user: string; exp: number };

function secret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || null;
}

/** True when every admin env var is set, so the login form can work. */
export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && secret());
}

function sign(payload: string, key: string): string {
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function sameText(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Constant-time check of a username/password pair against the env account. */
export function credentialsMatch(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  if (!u || !p) return false;
  // evaluate both so a wrong username takes as long as a wrong password
  const userOk = sameText(username, u);
  const passOk = sameText(password, p);
  return userOk && passOk;
}

export async function createSession(user: string): Promise<void> {
  const key = secret();
  if (!key) throw new Error("ADMIN_SESSION_SECRET is not set");
  const payload = Buffer.from(JSON.stringify({ user, exp: Date.now() + MAX_AGE_S * 1000 } satisfies Session)).toString("base64url");
  (await cookies()).set(COOKIE, `${payload}.${sign(payload, key)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_S,
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

/** The signed-in admin, or null. Cached per request. */
export const getSession = cache(async (): Promise<Session | null> => {
  const key = secret();
  const raw = (await cookies()).get(COOKIE)?.value;
  if (!key || !raw) return null;
  const [payload, mac] = raw.split(".");
  if (!payload || !mac || !sameText(mac, sign(payload, key))) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session;
    return typeof session.user === "string" && session.exp > Date.now() ? session : null;
  } catch {
    return null;
  }
});

/** Gate for every admin page and action: redirects to the login page when signed out. */
export async function requireAdmin(): Promise<Session> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
