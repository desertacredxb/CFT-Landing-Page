import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

        {/* Zoho SalesIQ Live Chat */}
        <Script id="zoho-salesiq-init" strategy="afterInteractive">
          {`
            window.$zoho=window.$zoho || {};
            $zoho.salesiq=$zoho.salesiq||{ready:function(){}};
          `}
        </Script>

        <Script
          id="zoho-salesiq-script"
          src="https://salesiq.zohopublic.in/widget?wc=siq4c8e819cb495c0e3a7681477896023e14714babb3b73f6f9e32d866f47fce36b"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
