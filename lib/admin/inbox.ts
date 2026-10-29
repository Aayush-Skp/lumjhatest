import { randomUUID } from "node:crypto";
import { errorText } from "./content";
import { rest, supabaseConfigured } from "./supabase";

/**
 * Contact-form messages and newsletter sign-ups. The public site writes them
 * (app/actions.ts); the admin panel lists and manages them. Server-only.
 */

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  page: string;
  read: boolean;
  createdAt: string;
};

export type Subscriber = { email: string; page: string; createdAt: string };

type MessageRow = Omit<ContactMessage, "createdAt"> & { created_at: string };
type SubscriberRow = Omit<Subscriber, "createdAt"> & { created_at: string };

/** At most this many rows are listed in the admin. */
const LIMIT = 1000;

const dateTime = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

/** e.g. "Oct 29, 2026, 3:04 PM UTC" — in the server's time zone, which it names. */
export const formatDateTime = (iso: string) => dateTime.format(new Date(iso));

/* ---------- written by the public site ---------- */

export async function addMessage(m: Pick<ContactMessage, "name" | "email" | "message" | "page">): Promise<void> {
  // the id is set here so a retried request (see rest()) can't store the message twice
  await rest("contact_messages?on_conflict=id", {
    method: "POST",
    body: { id: randomUUID(), ...m },
    prefer: "resolution=ignore-duplicates",
  });
}

/** Adds an email to the list; an address that's already on it is left as is. */
export async function addSubscriber(email: string, page: string): Promise<void> {
  await rest("newsletter_subscribers?on_conflict=email", {
    method: "POST",
    body: { email: email.toLowerCase(), page },
    prefer: "resolution=ignore-duplicates",
  });
}

/* ---------- read and managed in /admin ---------- */

export async function listMessages(): Promise<{ messages: ContactMessage[]; error?: string }> {
  if (!supabaseConfigured()) return { messages: [], error: "Supabase isn’t connected. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." };
  try {
    const rows = await rest<MessageRow[]>(`contact_messages?select=*&order=created_at.desc&limit=${LIMIT}`);
    return { messages: rows.map(({ created_at, ...r }) => ({ ...r, createdAt: created_at })) };
  } catch (e) {
    return { messages: [], error: errorText(e) };
  }
}

export async function listSubscribers(): Promise<{ subscribers: Subscriber[]; error?: string }> {
  if (!supabaseConfigured()) return { subscribers: [], error: "Supabase isn’t connected. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY." };
  try {
    const rows = await rest<SubscriberRow[]>(`newsletter_subscribers?select=*&order=created_at.desc&limit=${LIMIT}`);
    return { subscribers: rows.map(({ created_at, ...r }) => ({ ...r, createdAt: created_at })) };
  } catch (e) {
    return { subscribers: [], error: errorText(e) };
  }
}

export async function setMessageRead(id: string, read: boolean): Promise<void> {
  await rest(`contact_messages?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: { read } });
}

export async function deleteMessage(id: string): Promise<void> {
  await rest(`contact_messages?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" });
}

export async function deleteSubscriber(email: string): Promise<void> {
  await rest(`newsletter_subscribers?email=eq.${encodeURIComponent(email)}`, { method: "DELETE" });
}
