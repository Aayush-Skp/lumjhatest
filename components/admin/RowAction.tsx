"use client";

import { useActionState } from "react";
import type { ActionState } from "@/app/admin/actions";

/** A one-button form for a list row (mark read, delete…), with an optional confirm and an inline error. */
export default function RowAction({
  action,
  fields,
  label,
  pendingLabel,
  confirm,
  danger,
}: {
  action: (state: ActionState, form: FormData) => Promise<ActionState>;
  fields: Record<string, string>;
  label: string;
  pendingLabel: string;
  confirm?: string;
  danger?: boolean;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(action, null);
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
      className="inline-flex items-center gap-2"
    >
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <button
        type="submit"
        disabled={pending}
        className={`text-[13px] font-semibold hover:underline disabled:opacity-60 ${danger ? "text-red-500" : "text-[#527DFF]"}`}
      >
        {pending ? pendingLabel : label}
      </button>
      {state && !state.ok && (
        <span role="alert" className="text-[12px] text-red-500">
          {state.message}
        </span>
      )}
    </form>
  );
}
