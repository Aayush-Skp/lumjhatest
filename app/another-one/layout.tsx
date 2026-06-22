import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/another-one/ui/SmoothScroll";

// Display + body fonts for the rebuilt route. Loaded here (a nested layout)
// rather than the root layout so the existing Inter-based site is untouched.
// The variable names are unique (--font-syne / --font-dmsans); globals.css
// maps --font-display / --font-body to them inside the .lumjha-rebuild scope.
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Your Best Agent · Automate Your Growth",
  description:
    "Deploy a no-code AI assistant that learns every document, page, and policy in your business — live across Website, WhatsApp, Instagram, Facebook, and Telegram in minutes.",
};

export default function AnotherOneLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${syne.variable} ${dmSans.variable} lumjha-rebuild relative min-h-screen w-full overflow-x-clip`}
    >
      <SmoothScroll />
      {children}
    </div>
  );
}
