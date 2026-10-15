import type { ReactNode } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";

/** Figma-styled shell for long-form legal pages (Privacy / Terms). */
export default function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#030816] font-sans text-white antialiased light:bg-[#F5F7FC] light:text-[#0B1526]">
      <Navbar prefix="/" />
      <main id="top" className="relative overflow-x-clip">
        <div className="pointer-events-none absolute -left-40 top-24 h-[400px] w-[300px] rounded-full bg-[#1B3AA0]/30 blur-[120px] light:bg-[#527DFF]/10" />
        <div className="mx-auto max-w-[900px] px-4 pb-20 pt-12 sm:px-6 md:pt-16">
          <Link href="/" className="text-[13px] font-medium text-[#6E97FF] hover:text-white light:text-[#3E63F2] light:hover:text-[#0B1526]">
            ← Back to home
          </Link>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 inline-flex rounded-full bg-[#527DFF]/15 px-3 py-1 text-[12px] font-medium text-[#8AA6FF] light:bg-[#527DFF]/10 light:text-[#3E63F2]">
            Last updated: {lastUpdated}
          </p>
          <div className="legal-prose mt-10">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
