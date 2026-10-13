import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono, Poppins } from "next/font/google";
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

// Section headings (Pricing, Add-ons, Channels)
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumjha.ai"),
  title: {
    default: "Lumjha — No-Code AI Agents Trained on Your Business",
    template: "%s · Lumjha",
  },
  description:
    "Build a no-code AI assistant that knows every document, page, and policy in your business. Answer customers 24/7 across your website, WhatsApp, Instagram, Facebook, and Telegram — and capture qualified leads while you sleep.",
  keywords: [
    "AI chatbot",
    "no-code AI agent",
    "RAG chatbot",
    "AI site search",
    "policy assistant",
    "customer support automation",
    "lead generation chatbot",
    "WhatsApp chatbot",
    "omnichannel AI",
  ],
  openGraph: {
    title: "Enable Your best agent. Automate your growth.",
    description:
      "One knowledge base. Three AI modules — Intelligent AI Chatbot, Website Search, Policy Vault (Exact Answers). Live across every channel in minutes.",
    type: "website",
  },
};

// Runs before first paint to set the saved theme (default: dark), so there is
// no flash of the wrong theme on load.
const themeInitScript = `(function(){try{var t=localStorage.getItem('lumjha-theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${interTight.variable} ${poppins.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg-0 text-fg-mid selection:bg-brand-300/30 selection:text-fg-high">
        {children}
      </body>
    </html>
  );
}
