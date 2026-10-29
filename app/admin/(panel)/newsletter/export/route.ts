import { listSubscribers } from "@/lib/admin/inbox";
import { requireAdmin } from "@/lib/admin/session";

/** Newsletter subscribers as a CSV download (email, signed_up, page). */
export async function GET() {
  await requireAdmin();
  const { subscribers, error } = await listSubscribers();
  if (error) return new Response(error, { status: 502 });

  // quote every cell; a leading = + - @ is defused so spreadsheets don't run it as a formula
  const cell = (v: string) => `"${v.replace(/^[=+\-@]/, "'$&").replace(/"/g, '""')}"`;
  const lines = [
    "email,signed_up,page",
    ...subscribers.map((s) => [s.email, s.createdAt, s.page].map(cell).join(",")),
  ];
  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="lumjha-newsletter-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
