import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const siteUrl = "https://vadensoftware.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vaden Consultancy | Software Products & Technology Solutions",
    template: "%s | Vaden Consultancy",
  },
  description:
    "Vaden Consultancy, operated by Ecleva LLC, builds thoughtful software products and technology solutions.",
  applicationName: "Vaden Consultancy",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Vaden Consultancy",
    title: "Vaden Consultancy | Software Products & Technology Solutions",
    description:
      "Thoughtful software products and technology solutions built by Vaden Consultancy, an assumed name of Ecleva LLC.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Vaden Consultancy — Software products built to be simple, useful, and enjoyable.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaden Consultancy | Software Products & Technology Solutions",
    description:
      "Thoughtful software products and technology solutions built by Vaden Consultancy.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
