import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#586ccc]">
      {children}
    </p>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-[#101d3c]/8">
      <div aria-hidden="true" className="grid-fade absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-[#101d3c] sm:text-6xl">
          {title}
        </h1>
        <div className="mt-7 max-w-2xl text-lg leading-8 text-[#5f6678] sm:text-xl">
          {children}
        </div>
      </div>
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  const className = secondary
    ? "inline-flex min-h-12 items-center justify-center rounded-full border border-[#101d3c]/14 bg-white px-6 py-3 text-sm font-semibold text-[#101d3c] shadow-sm transition hover:border-[#101d3c]/28 hover:bg-[#f9f9fb]"
    : "inline-flex min-h-12 items-center justify-center rounded-full bg-[#101d3c] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,29,60,.16)] transition hover:-translate-y-0.5 hover:bg-[#263760]";

  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function ContactBand({
  title = "Let’s make useful things.",
  copy = "Have a question about our work or need help with RETAKE Party? We’re here to help.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#101d3c] px-6 py-12 text-white shadow-[0_30px_80px_rgba(16,29,60,.16)] sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-14 lg:py-14">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#aebaf3]">
            Get in touch
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl leading-7 text-[#c6ccdc]">{copy}</p>
        </div>
        <a
          href="mailto:support@vadensoftware.com"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#101d3c] transition hover:-translate-y-0.5 hover:bg-[#eff1ff] lg:mt-0 lg:ml-8"
        >
          support@vadensoftware.com
        </a>
      </div>
    </section>
  );
}
