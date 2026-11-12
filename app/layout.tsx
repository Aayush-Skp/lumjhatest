import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      <body className="min-h-full flex flex-col bg-bg-0 text-fg-mid">
        {children}
      </body>
    </html>
  );
}
