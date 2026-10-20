import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import BlueButton from "@/components/ui/BlueButton";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Guides and updates from the Lumjha team — coming soon.",
};

/** Placeholder until the blog has a Figma design and content. */
export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-page-deep font-sans text-ink antialiased">
      <Navbar />
      <main id="top" className="relative overflow-x-clip">
        <section className="mx-auto flex min-h-[60svh] max-w-[1440px] flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
          <h1 className="font-heading text-[28px] font-bold leading-tight tracking-tight text-ink sm:text-4xl md:text-[44px]">
            Blogs are coming soon
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-balance text-ink/85 sm:text-lg md:mt-5 md:text-xl">
            Guides, product updates and customer stories from the Lumjha team.
            In the meantime, try Lumjha for yourself.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <BlueButton large href="/play-area">Try the Play Area</BlueButton>
            <BlueButton large outline href="/">Back to home</BlueButton>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
