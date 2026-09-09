import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Shree Satyanarayan Puja" },
  description:
    "Invitation and RSVP for Shree Satyanarayan Puja on Sunday, September 27, 2026 in Argyle, Texas.",
  alternates: { canonical: "/puja" },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/puja",
    title: "Shree Satyanarayan Puja",
    description: "Sunday, September 27, 2026 · 4:00 PM in Argyle, Texas",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Shree Satyanarayan Puja",
    description: "Sunday, September 27, 2026 · 4:00 PM in Argyle, Texas",
    images: [],
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f0df",
};

export default function PujaLayout({ children }: { children: ReactNode }) {
  return children;
}
