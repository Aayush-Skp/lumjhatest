"use client";

import { usePathname } from "next/navigation";

/**
 * Lumjha AI's own chat widget, on every page except the Playground's framed
 * sample site (/play-area/preview). That page installs the demo or uploaded
 * agent through WidgetLoader, which bails if `#lumjha-agent-widget` already
 * exists — so this tag there would swap the Playground's agent for ours.
 */
export default function SiteChatWidget() {
  const pathname = usePathname();
  if (pathname.startsWith("/play-area/preview")) return null;

  return (
    <script
      id="lumjha-agent-widget"
      src="https://app.lumjha.ai/agent-widget.js"
      data-subdomain="lumjha-ai"
      data-app-host="https://app.lumjha.ai"
      data-theme="dark"
      data-color="#0052eb"
      data-name="Lumjha AI"
      data-alignment="right"
      data-open="false"
      async
    />
  );
}
