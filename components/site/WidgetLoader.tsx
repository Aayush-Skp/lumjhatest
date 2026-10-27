"use client";

import { useEffect } from "react";

/**
 * Installs the real Lumjha chat widget (agent-widget.js) exactly as a
 * customer's site does: one <script> tag with data attributes. Meant for the
 * Lumjha Play sample-site page, which is framed — so the widget's fixed
 * launcher and panel sit inside that frame, like on a real website.
 *
 * The loader cannot be removed once running, so a page loads one agent; the
 * Play demo switches agents by reloading the framed page.
 */
export default function WidgetLoader({
  subdomain,
  appHost,
  apiHost,
  chatApiHost,
  open,
}: {
  subdomain: string;
  appHost: string;
  apiHost: string;
  chatApiHost: string;
  open: boolean;
}) {
  useEffect(() => {
    // React re-runs effects in development; the widget must only start once.
    if (document.getElementById("lumjha-agent-widget")) return;
    const script = document.createElement("script");
    script.id = "lumjha-agent-widget";
    script.src = `${appHost}/agent-widget.js`;
    script.async = true;
    script.setAttribute("data-subdomain", subdomain);
    script.setAttribute("data-app-host", appHost);
    script.setAttribute("data-api-host", apiHost);
    script.setAttribute("data-chat-api-host", chatApiHost);
    script.setAttribute("data-theme", "light");
    script.setAttribute("data-open", String(open));
    document.body.appendChild(script);
  }, [subdomain, appHost, apiHost, chatApiHost, open]);

  return null;
}
