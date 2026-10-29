import type { Metadata } from "next";
import { deleteMessageAction, setMessageReadAction } from "@/app/admin/actions";
import RowAction from "@/components/admin/RowAction";
import { Message, PageHeader } from "@/components/admin/ui";
import { formatDateTime, listMessages } from "@/lib/admin/inbox";
import { requireAdmin } from "@/lib/admin/session";

export const metadata: Metadata = { title: "Messages" };

export default async function AdminMessagesPage() {
  await requireAdmin();
  const { messages, error } = await listMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Messages"
        description={`Sent from the Contact Us and Book a Demo forms, newest first.${messages.length ? ` ${unread} unread of ${messages.length}.` : ""}`}
      />
      {error && <Message state={{ ok: false, message: error }} />}

      <div className="space-y-3">
        {messages.map((m) => (
          <article
            key={m.id}
            className={`rounded-xl border bg-surface p-5 ${m.read ? "border-line" : "border-[#527DFF]/50"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
              <div className="min-w-0">
                <p className="font-medium text-ink">
                  {m.name}
                  {!m.read && <span className="ml-2 rounded-full bg-[#527DFF]/15 px-2 py-0.5 text-[11px] font-semibold text-[#527DFF]">New</span>}
                </p>
                <a href={`mailto:${m.email}`} className="break-all text-[13px] text-[#527DFF] hover:underline">
                  {m.email}
                </a>
              </div>
              <p className="text-[12px] text-subtle">
                {formatDateTime(m.createdAt)}
                {m.page && <> · from {m.page}</>}
              </p>
            </div>
            <p className="mt-3 whitespace-pre-wrap break-words text-[14px] leading-relaxed text-muted">{m.message}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-3">
              <a
                href={`mailto:${m.email}?subject=${encodeURIComponent("Re: your message to Lumjha")}`}
                className="text-[13px] font-semibold text-[#527DFF] hover:underline"
              >
                Reply
              </a>
              <RowAction
                action={setMessageReadAction}
                fields={{ id: m.id, read: String(!m.read) }}
                label={m.read ? "Mark as unread" : "Mark as read"}
                pendingLabel="Saving…"
              />
              <RowAction
                action={deleteMessageAction}
                fields={{ id: m.id }}
                label="Delete"
                pendingLabel="Deleting…"
                confirm={`Delete the message from ${m.name}? This can’t be undone.`}
                danger
              />
            </div>
          </article>
        ))}
        {!messages.length && !error && (
          <p className="rounded-xl border border-line bg-surface px-4 py-10 text-center text-[14px] text-muted">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
