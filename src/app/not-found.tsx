import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero grid min-h-[70vh] place-items-center px-5 py-24 text-center text-white">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#9eafff]">404</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-.055em]">This page isn’t here.</h1>
        <p className="mx-auto mt-5 max-w-md leading-7 text-white/55">The link may be out of date, or the page may have moved.</p>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-bold text-night hover:bg-mist">Return home</Link>
      </div>
    </section>
  );
}
