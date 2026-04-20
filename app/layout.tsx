import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumjha.ai"),
  title: {
    default: "Lumjha AI — Clone Your Best Agent. Automate Your Growth.",
    template: "%s · Lumjha AI",
  },
  description:
    "A no-code, RAG-powered AI chatbot that memorizes every document in your business, speaks in your brand voice, and engages customers 24/7 across Website, WhatsApp, and Instagram.",
  keywords: [
    "AI chatbot",
    "RAG",
    "customer engagement",
    "lead generation",
    "WhatsApp bot",
    "Instagram bot",
    "no-code",
  ],
  openGraph: {
    title: "Lumjha AI — Clone Your Best Agent. Automate Your Growth.",
    description:
      "Deploy a no-code AI assistant grounded in your documents. Engage customers across Web, WhatsApp, and Instagram — and qualify leads 24/7.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${interTight.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-0 text-fg-mid selection:bg-brand-300/30 selection:text-fg-high">
        {children}
      </body>
    </html>
  );
}
