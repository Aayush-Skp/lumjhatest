import { Syne, DM_Sans } from "next/font/google";

// Same display + body fonts as the marketing route. Loaded in this nested
// layout so the brand tokens in globals.css (.lumjha-rebuild scope) resolve.
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

export default function LegalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${syne.variable} ${dmSans.variable} lumjha-rebuild relative min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text-primary)]`}
    >
      {children}
    </div>
  );
}
