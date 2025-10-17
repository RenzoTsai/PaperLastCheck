import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paper Last Check - AI-Powered Paper Review Assistant",
  description: "Final check for paper submissions: typos, anonymity, term consistency, and reviewer perspective analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          src="https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.8.0/nutrient-viewer.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
