import type { Metadata } from "next";
import { Syne, Silkscreen } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cmdblock.tech"),
  title: {
    default: "cmdblock.tech — Boutique Software Engineering Studio",
    template: "%s | cmdblock.tech",
  },
  description:
    "We architect and build custom web applications, enterprise systems, and interactive software from the ground up.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://cmdblock.tech",
    siteName: "cmdblock.tech",
    title: "cmdblock.tech — Boutique Software Engineering Studio",
    description:
      "We architect and build custom web applications, enterprise systems, and interactive software from the ground up.",
  },
  twitter: {
    card: "summary_large_image",
    title: "cmdblock.tech — Boutique Software Engineering Studio",
    description:
      "We architect and build custom web applications, enterprise systems, and interactive software from the ground up.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${geistMono.variable} ${silkscreen.variable} font-mono antialiased`}
      >
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0a0a0a",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "0px",
              color: "#ffffff",
              fontFamily: "var(--font-geist-mono)",
              fontSize: "13px",
            },
          }}
        />
      </body>
    </html>
  );
}
