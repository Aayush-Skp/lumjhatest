import { lookup } from "node:dns";
import http from "node:http";
import https from "node:https";
import { BlockList, isIP, type LookupFunction } from "node:net";
import { normalizeSiteUrl } from "@/lib/playground";
import { json } from "../lumjha";

export const runtime = "nodejs";

/**
 * Can Lumjha Play show this website in its preview? Fetches the page's headers
 * once and reads X-Frame-Options / CSP frame-ancestors, so the demo can say
 * "we can't show this site" instead of an empty frame.
 *
 * The fetch only reaches public addresses: every DNS answer is checked at
 * connect time (so a rebinding hostname can't slip through), only ports
 * 80/443 are allowed, and redirects are re-checked hop by hop.
 */

const MAX_REDIRECTS = 5;
const TIMEOUT_MS = 8000;

const PRIVATE = new BlockList();
for (const [net, prefix] of [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
] as const) {
  PRIVATE.addSubnet(net, prefix, "ipv4");
}
// IPv4-mapped IPv6 (::ffff:a.b.c.d) is checked against the IPv4 rules by
// BlockList itself; a ::ffff:0:0/96 rule here would block every IPv4 address.
for (const [net, prefix] of [
  ["::", 128],
  ["::1", 128],
  ["64:ff9b::", 96],
  ["fc00::", 7],
  ["fe80::", 10],
  ["ff00::", 8],
] as const) {
  PRIVATE.addSubnet(net, prefix, "ipv6");
}

function isPublic(address: string): boolean {
  const family = isIP(address);
  if (family === 4) return !PRIVATE.check(address, "ipv4");
  if (family === 6) return !PRIVATE.check(address, "ipv6");
  return false;
}

/** dns.lookup that refuses to hand back any non-public address. */
const publicLookup: LookupFunction = (hostname, options, callback) => {
  lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err, "", 0);
    if (!addresses.length || !addresses.every((a) => isPublic(a.address))) {
      return callback(Object.assign(new Error("Address not allowed"), { code: "BLOCKED_ADDRESS" }), "", 0);
    }
    if (options.all) return (callback as unknown as (e: null, a: typeof addresses) => void)(null, addresses);
    callback(null, addresses[0].address, addresses[0].family);
  });
};

type Head = { status: number; headers: http.IncomingHttpHeaders };

/** GET a URL and resolve with its status and headers, dropping the body. */
function fetchHead(url: URL): Promise<Head> {
  return new Promise((resolve, reject) => {
    if (isIP(url.hostname.replace(/^\[|\]$/g, "")) && !isPublic(url.hostname.replace(/^\[|\]$/g, ""))) {
      return reject(new Error("Address not allowed"));
    }
    const client = url.protocol === "https:" ? https : http;
    const req = client.request(
      url,
      {
        method: "GET",
        lookup: publicLookup,
        timeout: TIMEOUT_MS,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; LumjhaPlayPreview/1.0; +https://lumjha.ai)",
          Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        },
      },
      (res) => {
        resolve({ status: res.statusCode ?? 0, headers: res.headers });
        res.destroy();
      },
    );
    req.on("timeout", () => req.destroy(new Error("Timed out")));
    req.on("error", reject);
    req.end();
  });
}

function one(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value.join(", ") : value ?? "";
}

/** Does a CSP source expression (from frame-ancestors) admit our origin? */
function sourceAllows(source: string, ours: URL): boolean {
  if (source === "*") return true;
  if (source.startsWith("'")) return false; // 'none', 'self' (theirs, not ours)
  if (/^[a-z][a-z0-9+.-]*:$/.test(source)) {
    return source === ours.protocol || (source === "http:" && ours.protocol === "https:");
  }
  const match = source.match(/^(?:([a-z][a-z0-9+.-]*):\/\/)?([^/:]+)(?::(\d+|\*))?/);
  if (!match) return false;
  const [, scheme, host, port] = match;
  if (scheme && scheme + ":" !== ours.protocol && !(scheme === "http" && ours.protocol === "https:")) return false;
  if (port && port !== "*" && port !== (ours.port || (ours.protocol === "https:" ? "443" : "80"))) return false;
  if (host.startsWith("*.")) return ours.hostname.endsWith(host.slice(1));
  return host === ours.hostname;
}

/** Would a browser let `ours` frame a page sent with these headers? */
function frameable(headers: http.IncomingHttpHeaders, ours: URL): boolean {
  // CSP frame-ancestors wins over X-Frame-Options; every policy must allow it.
  const policies = one(headers["content-security-policy"]).split(",");
  let sawFrameAncestors = false;
  for (const policy of policies) {
    for (const directive of policy.split(";")) {
      const [name, ...sources] = directive.trim().toLowerCase().split(/\s+/);
      if (name !== "frame-ancestors") continue;
      sawFrameAncestors = true;
      if (!sources.some((s) => sourceAllows(s, ours))) return false;
    }
  }
  if (sawFrameAncestors) return true;
  const xfo = one(headers["x-frame-options"]).toLowerCase();
  return !(xfo.includes("deny") || xfo.includes("sameorigin"));
}

export async function GET(request: Request) {
  const ours = new URL(request.url);
  let url: URL;
  {
    const normalized = normalizeSiteUrl(ours.searchParams.get("url"));
    if (!normalized) {
      return json({ success: false, code: "INVALID_URL", error: "Enter a website address, like yourbusiness.com." }, 400);
    }
    url = new URL(normalized);
  }

  try {
    for (let hop = 0; ; hop++) {
      const { status, headers } = await fetchHead(url);
      if (status >= 300 && status < 400 && headers.location) {
        if (hop >= MAX_REDIRECTS) throw new Error("Too many redirects");
        const next = normalizeSiteUrl(new URL(headers.location, url).toString());
        if (!next) throw new Error("Redirect not allowed");
        url = new URL(next);
        continue;
      }
      if (status < 200 || status >= 400) {
        return json({ success: false, code: "UNREACHABLE", error: "That site didn’t let us load it." });
      }
      if (!frameable(headers, ours)) {
        return json({ success: false, code: "NOT_FRAMEABLE", error: "It doesn’t allow being shown inside other websites." });
      }
      return json({ success: true, data: { url: url.toString() } });
    }
  } catch {
    return json({ success: false, code: "UNREACHABLE", error: "We couldn’t reach that site. Check the address and try again." });
  }
}
