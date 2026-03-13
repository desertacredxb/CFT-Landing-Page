import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Close Friend Traders",
  description: "Smart trading platform with powerful tools and insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--cft-bg-dark)] text-[var(--cft-text-main)]`}
      >
        {children}

        <Script id="zoho-salesiq-init" strategy="afterInteractive">
          {`
          window.$zoho = window.$zoho || {};
          $zoho.salesiq = $zoho.salesiq || { ready: function() {} };
        `}
        </Script>

        <Script
          id="zoho-salesiq-widget"
          src="https://salesiq.zohopublic.com/widget?wc=siq25e0dffe2dc0e2fbdb9a0c64e1b56f76cd42e31f014d46574c7ead59ac6c7682"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
