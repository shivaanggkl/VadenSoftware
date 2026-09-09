import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const siteUrl = "https://vadensoftware.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vaden Consultancy | Independent Software Studio",
    template: "%s | Vaden Consultancy",
  },
  description:
    "Vaden is an independent software studio creating focused digital products—from playful consumer experiences to useful software tools.",
  applicationName: "Vaden Consultancy",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Vaden Consultancy",
    title: "Vaden Consultancy | Independent Software Studio",
    description:
      "We build software people want to use. Explore focused digital products from Vaden.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Vaden Consultancy — We build software people want to use.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaden Consultancy | Independent Software Studio",
    description:
      "We build software people want to use. Explore focused digital products from Vaden.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
