"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  ["About", "/about"],
  ["Products", "/products"],
  ["Support", "/support"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#101d3c]/8 bg-[#fbfaf7]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-sm text-[1.02rem] font-bold tracking-[-0.025em] text-[#101d3c]"
          aria-label="Vaden Consultancy home"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-[10px] bg-gradient-to-br from-[#4767d8] to-[#8055c9] text-sm font-black text-white shadow-[0_8px_24px_rgba(77,92,196,.2)]"
          >
            V
          </span>
          Vaden Consultancy
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#4f586c] transition hover:bg-white hover:text-[#101d3c]"
            >
              {label}
            </Link>
          ))}
          <a
            href="mailto:support@vadensoftware.com"
            className="ml-2 rounded-full bg-[#101d3c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#263760]"
          >
            Email us
          </a>
        </nav>

        <details
          className="group relative md:hidden"
          open={menuOpen}
          onToggle={(event) => setMenuOpen(event.currentTarget.open)}
        >
          <summary className="cursor-pointer list-none rounded-full border border-[#101d3c]/14 bg-white px-4 py-2 text-sm font-semibold [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 mt-3 grid w-48 gap-1 rounded-2xl border border-[#101d3c]/10 bg-white p-2 shadow-2xl shadow-[#101d3c]/10"
          >
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-[#f4f3f8]"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/privacy"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium hover:bg-[#f4f3f8]"
            >
              Privacy
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
