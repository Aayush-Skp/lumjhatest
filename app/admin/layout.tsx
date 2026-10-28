import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Lumjha Admin" },
  robots: { index: false, follow: false },
};

/** /admin shell: the site's theme tokens, no marketing navbar or footer. */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-page-deep font-sans text-ink antialiased">{children}</div>;
}
