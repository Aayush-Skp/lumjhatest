import { SESSION_ID } from "@/lib/playground";
import { forward, json } from "../../lumjha";

export const runtime = "nodejs";

/** Poll an upload: processing → ready (with the chat link), or failed / expired. */
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!SESSION_ID.test(id)) {
    return json({ success: false, code: "NOT_FOUND", error: "Session not found" }, 404);
  }
  return forward(`/sessions/${id}`, request, { method: "GET" });
}
