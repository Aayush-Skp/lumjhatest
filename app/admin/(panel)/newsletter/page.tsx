import type { Metadata } from "next";
import { deleteSubscriberAction } from "@/app/admin/actions";
import RowAction from "@/components/admin/RowAction";
import { Message, PageHeader, secondaryBtn } from "@/components/admin/ui";
import { formatDateTime, listSubscribers } from "@/lib/admin/inbox";
import { requireAdmin } from "@/lib/admin/session";

export const metadata: Metadata = { title: "Newsletter" };

export default async function AdminNewsletterPage() {
  await requireAdmin();
  const { subscribers, error } = await listSubscribers();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Newsletter"
        description={`Emails signed up from the footer, newest first.${subscribers.length ? ` ${subscribers.length} subscribers.` : ""}`}
        actions={
          subscribers.length > 0 && (
            // a plain link: the route sends a file download
            <a href="/admin/newsletter/export" className={secondaryBtn}>
              Download CSV
            </a>
          )
        }
      />
      {error && <Message state={{ ok: false, message: error }} />}

      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <table className="w-full text-left text-[14px]">
          <thead className="border-b border-line text-[12px] uppercase tracking-wider text-subtle">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">Signed up</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">Page</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {subscribers.map((s) => (
              <tr key={s.email} className="transition hover:bg-ink/[0.03]">
                <td className="break-all px-4 py-3">
                  <a href={`mailto:${s.email}`} className="font-medium text-ink hover:text-[#527DFF]">
                    {s.email}
                  </a>
                  <p className="mt-0.5 text-[12px] text-subtle sm:hidden">{formatDateTime(s.createdAt)}</p>
                </td>
                <td className="hidden whitespace-nowrap px-4 py-3 text-muted sm:table-cell">{formatDateTime(s.createdAt)}</td>
                <td className="hidden px-4 py-3 text-muted md:table-cell">{s.page || "—"}</td>
                <td className="px-4 py-3 text-right">
                  <RowAction
                    action={deleteSubscriberAction}
                    fields={{ email: s.email }}
                    label="Remove"
                    pendingLabel="Removing…"
                    confirm={`Remove ${s.email} from the newsletter list?`}
                    danger
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!subscribers.length && !error && <p className="px-4 py-10 text-center text-[14px] text-muted">No subscribers yet.</p>}
      </div>
    </div>
  );
}
