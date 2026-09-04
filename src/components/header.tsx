"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const navItems = [
  ["Products", "/products"],
  ["About", "/about"],
  ["Support", "/support"],
  ["Contact", "/contact"],
  ["Privacy", "/privacy"],
] as const;

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/94 text-white backdrop-blur-xl">
      <div className="site-container flex h-[4.5rem] items-center justify-between sm:h-20">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-sm"
          aria-label="Vaden Consultancy home"
          onClick={() => setMenuOpen(false)}
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-[0.7rem] bg-gradient-to-br from-electric to-violet text-sm font-black text-white shadow-[0_10px_28px_rgba(99,128,255,.24)] transition-transform group-hover:-rotate-3"
          >
            V
          </span>
          <span className="leading-none">
            <span className="block text-[1.08rem] font-bold tracking-[-0.04em]">Vaden</span>
            <span className="mt-1 block text-[0.56rem] font-bold uppercase tracking-[0.2em] text-white/45">
              Consultancy
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map(([label, href]) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/62 hover:bg-white/7 hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/products"
            className="ml-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/18 bg-white px-5 py-2 text-sm font-bold text-night transition hover:-translate-y-0.5 hover:bg-mist"
          >
            RETAKE Party <span aria-hidden="true">↗</span>
          </Link>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/7 lg:hidden"
        >
          <span aria-hidden="true" className="grid gap-1.5">
            <span className={`block h-px w-4 bg-white transition ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block h-px w-4 bg-white transition ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-white/10 bg-night px-5 py-5 lg:hidden"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setMenuOpen(false);
              menuButtonRef.current?.focus();
            }
          }}
        >
          <div className="mx-auto grid max-w-lg gap-1">
            {navItems.map(([label, href]) => {
              const active = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/72 hover:bg-white/7 hover:text-white"
                  }`}
                >
                  {label} <span aria-hidden="true" className="text-white/35">↗</span>
                </Link>
              );
            })}
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex min-h-12 items-center justify-between rounded-xl border border-white/12 bg-white/6 px-4 text-sm font-bold text-white hover:bg-white/10"
            >
              RETAKE Party <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
