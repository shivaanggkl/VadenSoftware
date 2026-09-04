import Link from "next/link";
import type { ReactNode } from "react";

export function Eyebrow({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <p className={`text-[0.68rem] font-bold uppercase tracking-[0.22em] ${inverse ? "text-[#9eafff]" : "text-[#5069d4]"}`}>
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
    <section className="utility-hero relative overflow-hidden text-white">
      <div className="site-container utility-hero-inner">
        <div>
          <Eyebrow inverse>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
        </div>
        <div className="utility-hero-body">
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
    ? "inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-surface px-6 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-[#bfc5d3] hover:bg-mist"
    : "inline-flex min-h-12 items-center justify-center rounded-full bg-electric px-6 py-3 text-sm font-bold text-white shadow-[0_14px_32px_rgba(73,101,221,.24)] transition hover:-translate-y-0.5 hover:bg-[#7891ff]";

  if (href.startsWith("mailto:")) {
    return <a href={href} className={className}>{children}</a>;
  }

  return <Link href={href} className={className}>{children}</Link>;
}
