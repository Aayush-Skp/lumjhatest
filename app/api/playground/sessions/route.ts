import { forward, playgroundKey, readUpload, unavailable } from "../lumjha";

export const runtime = "nodejs";

/** Upload a document to start a chat: checks it here first, then forwards it to Lumjha. */
export async function POST(request: Request) {
  if (!playgroundKey()) return unavailable();
  const upload = await readUpload(request);
  if (upload instanceof Response) return upload;
  return forward("/sessions", request, { method: "POST", body: upload });
}
