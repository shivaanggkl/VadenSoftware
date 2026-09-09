"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPujaRoute = pathname === "/puja" || pathname.startsWith("/puja/");

  if (isPujaRoute) {
    return (
      <>
        <a
          href="#main-content"
          className="fixed left-4 -top-20 z-[100] rounded-full bg-[#6f1d2b] px-4 py-3 text-sm font-bold text-white focus:top-4"
        >
          Skip to content
        </a>
        <main id="main-content">{children}</main>
      </>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
