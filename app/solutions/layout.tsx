import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import SmoothScroll from "@/components/another-one/ui/SmoothScroll";

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
  title: "Stop Missing Customers · Start Growing Revenue · Lumjha",
  description:
    "Lumjha handles your customer questions, captures sales leads, and books appointments around the clock — on every platform your customers already use. Get started free in minutes.",
};

export default function SolutionsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${syne.variable} ${dmSans.variable} relative min-h-screen w-full overflow-x-clip bg-[#030816]`}
    >
      <SmoothScroll />
      {children}
    </div>
  );
}
