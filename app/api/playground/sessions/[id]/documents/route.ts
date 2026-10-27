import { SESSION_ID } from "@/lib/playground";
import { forward, json, playgroundKey, readUpload, unavailable } from "../../../lumjha";

export const runtime = "nodejs";

/** Add another document to an existing chat; the same agent learns it too. */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!playgroundKey()) return unavailable();
  const { id } = await params;
  if (!SESSION_ID.test(id)) {
    return json({ success: false, code: "NOT_FOUND", error: "This chat was not found." }, 404);
  }
  const upload = await readUpload(request);
  if (upload instanceof Response) return upload;
  return forward(`/sessions/${id}/documents`, request, { method: "POST", body: upload });
}
