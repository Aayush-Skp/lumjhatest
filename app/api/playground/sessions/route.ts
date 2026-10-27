import { PLAYGROUND_CONSENT_VERSION, PLAYGROUND_MAX_BYTES } from "@/lib/playground";
import { forward, json, passesTurnstile, playgroundKey, unavailable, visitorIp } from "../lumjha";

export const runtime = "nodejs";

/** Upload a document: checks it here first, then forwards it to Lumjha. */
export async function POST(request: Request) {
  if (!playgroundKey()) return unavailable();

  // Refuse an oversized body before reading it (multipart adds a little framing).
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > PLAYGROUND_MAX_BYTES + 64 * 1024) {
    return json({ success: false, code: "FILE_TOO_LARGE", error: "The file is larger than 1 MB." }, 413);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ success: false, code: "INVALID_UPLOAD", error: "Send the file as a form upload." }, 400);
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return json({ success: false, code: "FILE_REQUIRED", error: "Choose a file to upload." }, 400);
  }
  if (file.size > PLAYGROUND_MAX_BYTES) {
    return json({ success: false, code: "FILE_TOO_LARGE", error: "The file is larger than 1 MB." }, 413);
  }
  if (form.get("consent") !== "true") {
    return json(
      { success: false, code: "CONSENT_REQUIRED", error: "Accept the notice about how uploads are used first." },
      400,
    );
  }
  if (!(await passesTurnstile(form.get("turnstileToken"), visitorIp(request)))) {
    return json({ success: false, code: "VERIFICATION_FAILED", error: "Verification failed. Please try again." }, 403);
  }

  const upstream = new FormData();
  upstream.append("file", file, file.name);
  upstream.append("consent", "true");
  // The version is the server's, not the browser's: it records the notice this
  // site actually showed.
  upstream.append("consentVersion", PLAYGROUND_CONSENT_VERSION);
  return forward("/sessions", request, { method: "POST", body: upstream });
}
