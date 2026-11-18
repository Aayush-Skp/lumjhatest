import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteChatWidget from "@/components/site/SiteChatWidget";

/* Fonts are self-hosted (app/fonts, latin subset from Fontsource) rather than
   next/font/google, so builds never depend on reaching Google Fonts — a failed
   fetch there broke deploys with "Module not found" on the font CSS. */
const inter = localFont({
  variable: "--font-inter",
  src: "./fonts/inter-latin-wght.woff2",
  weight: "100 900",
  display: "swap",
});

const interTight = localFont({
  variable: "--font-inter-tight",
  src: "./fonts/inter-tight-latin-wght.woff2",
  weight: "100 900",
  display: "swap",
});

// Section headings (Pricing, Add-ons, Channels)
const poppins = localFont({
  variable: "--font-poppins",
  src: [
    { path: "./fonts/poppins-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-latin-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const jetbrains = localFont({
  variable: "--font-jetbrains",
  src: "./fonts/jetbrains-mono-latin-wght.woff2",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumjha.ai"),
  title: {
    default: "Lumjha AI — No-Code AI Agents Trained on Your Business",
    template: "%s · Lumjha AI",
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
      "One knowledge base. Three AI modules — Intelligent AI Chatbot, Website Search, Lumjha Vault (Exact Answers). Live across every channel in minutes.",
    type: "website",
  },
};

// Runs before first paint so the page matches the browser/OS theme with no
// flash, and follows it live when the system theme changes. Falls back to dark
// (the Figma default) when the preference can't be read. Clears the old
// `lumjha-theme` choice saved by the former navbar toggle.
const themeInitScript = `(function(){var d=document.documentElement;try{localStorage.removeItem('lumjha-theme');}catch(e){}try{var m=window.matchMedia('(prefers-color-scheme: light)');var a=function(){d.dataset.theme=m.matches?'light':'dark';};a();if(m.addEventListener)m.addEventListener('change',a);else if(m.addListener)m.addListener(a);}catch(e){d.dataset.theme='dark';}})();`;

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
        {/* Lumjha search widget; mounts into the navbar's <SiteSearch> box */}
        <script
          id="lumjha-search-widget"
          src="https://app.lumjha.ai/search-widget.js"
          data-subdomain="lumjha-ai"
          data-app-host="https://app.lumjha.ai"
          data-theme="dark"
          data-color="#0059ff"
          data-placeholder="Ask anything..."
          data-label="Powered by lumjha.ai"
          async
        />
        {/* Lumjha chat widget (skipped on the Playground's framed sample site) */}
        <SiteChatWidget />
      </head>
      <body className="min-h-full flex flex-col bg-bg-0 text-fg-mid">
        {children}
      </body>
    </html>
  );
}
