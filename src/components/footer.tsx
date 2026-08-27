import Link from "next/link";

const footerLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Products", "/products"],
  ["Support", "/support"],
  ["Contact", "/contact"],
  ["Privacy", "/privacy"],
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[#101d3c]/9 bg-[#f5f3ee]">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <p className="font-semibold tracking-[-0.02em]">Vaden Consultancy</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#687083]">
            © 2026 Ecleva LLC. Vaden Consultancy is an assumed name of Ecleva LLC.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">
          {footerLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-[#5c6578] transition hover:text-[#101d3c] hover:underline"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
