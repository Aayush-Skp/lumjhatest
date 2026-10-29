"use server";

import { addMessage, addSubscriber } from "@/lib/admin/inbox";

/**
 * Server actions for the public site's forms: Contact Us (ContactDisclosure)
 * and the footer newsletter (NewsletterForm). Both land in Supabase and show
 * up in /admin/messages and /admin/newsletter.
 */

export type FormResult = { ok: boolean; message: string };

const text = (form: FormData, name: string) => String(form.get(name) ?? "").trim();
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Hidden field real visitors never fill; bots that do get a quiet "success". */
const HONEYPOT = "website";

const FAILED: FormResult = { ok: false, message: "Something went wrong. Please try again." };

export async function sendContactMessage(form: FormData): Promise<FormResult> {
  if (text(form, HONEYPOT)) return { ok: true, message: "" };
  const name = text(form, "name");
  const email = text(form, "email");
  const message = text(form, "message");
  if (!name || !message) return { ok: false, message: "Please fill in every field." };
  if (!EMAIL.test(email)) return { ok: false, message: "Please enter a valid email address." };
  if (name.length > 100 || email.length > 200 || message.length > 2000) return { ok: false, message: "That message is too long." };

  try {
    await addMessage({ name, email, message, page: text(form, "page").slice(0, 200) });
    return { ok: true, message: "" };
  } catch (e) {
    console.error("[contact] couldn't save message", e);
    return FAILED;
  }
}

export async function subscribeToNewsletter(form: FormData): Promise<FormResult> {
  if (text(form, HONEYPOT)) return { ok: true, message: "You’re subscribed. Thanks!" };
  const email = text(form, "email");
  if (!EMAIL.test(email) || email.length > 200) return { ok: false, message: "Please enter a valid email address." };

  try {
    await addSubscriber(email, text(form, "page").slice(0, 200));
    return { ok: true, message: "You’re subscribed. Thanks!" };
  } catch (e) {
    console.error("[newsletter] couldn't save subscriber", e);
    return FAILED;
  }
}
