import Link from "next/link";

const footerLinks = [
  ["Products", "/products"],
  ["About", "/about"],
  ["Support", "/support"],
  ["Contact", "/contact"],
  ["Privacy", "/privacy"],
] as const;

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="site-container py-10 sm:py-14">
        <div className="grid gap-8 border-b border-white/10 pb-9 sm:pb-11 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Link href="/" className="inline-block text-[clamp(2.8rem,7vw,6rem)] font-semibold leading-none tracking-[-0.075em]">
              Vaden<span className="text-electric">.</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/50">
              An independent software studio creating focused digital products.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-end">
            {footerLinks.map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium text-white/58 transition hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs leading-5 text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Ecleva LLC. Vaden Consultancy is an assumed name of Ecleva LLC.</p>
          <p>Texas, United States</p>
        </div>
      </div>
    </footer>
  );
}
