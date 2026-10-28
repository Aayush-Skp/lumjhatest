"use client";

import { useActionState } from "react";
import { login, type ActionState } from "@/app/admin/actions";
import { Field, Message, inputCls, primaryBtn } from "./ui";

export default function LoginForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(login, null);
  return (
    <form action={action} className="space-y-4">
      <Field label="Username">
        <input name="username" autoComplete="username" required autoFocus className={inputCls} />
      </Field>
      <Field label="Password">
        <input name="password" type="password" autoComplete="current-password" required className={inputCls} />
      </Field>
      <Message state={state} />
      <button type="submit" disabled={pending} className={`${primaryBtn} w-full`}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
