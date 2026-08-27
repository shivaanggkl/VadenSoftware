import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero-glow grid min-h-[65vh] place-items-center px-5 py-24 text-center">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#586ccc]">404</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-.055em]">This page isn’t here.</h1>
        <p className="mx-auto mt-5 max-w-md leading-7 text-[#687083]">The link may be out of date, or the page may have moved.</p>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#101d3c] px-6 py-3 text-sm font-bold text-white hover:bg-[#263760]">Return home</Link>
      </div>
    </section>
  );
}
