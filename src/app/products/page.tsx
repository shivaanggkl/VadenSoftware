import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, ContactBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore RETAKE Party, a photo-based party game from Vaden Consultancy coming to iPhone.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "RETAKE Party | Vaden Consultancy",
    description: "See it. Remember it. Retake it. A photo-based party game coming to iPhone.",
    url: "/products",
    images: ["/og.png"],
  },
};

const facts = [
  "3–8 players",
  "One iPhone passed between players",
  "Live camera photos",
  "Photos stay on the device",
  "No account required",
  "Built around the final reveal and sharing experience",
];

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title="Software with a clear reason to exist.">
        <p>Focused products designed to be easy to understand, dependable in use, and genuinely enjoyable.</p>
      </PageHero>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-[#101d3c] text-white shadow-[0_35px_90px_rgba(16,29,60,.16)]">
          <div className="grid lg:grid-cols-[1fr_1fr]">
            <div className="p-7 sm:p-12 lg:p-16">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#bcc5ed]">Featured product</span>
                <span className="rounded-full border border-[#94a4e8]/30 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#d0d6f2]">Coming to iPhone.</span>
              </div>
              <h1 className="mt-9 text-5xl font-semibold tracking-[-.06em] sm:text-7xl">RETAKE Party</h1>
              <p className="mt-4 text-xl font-semibold text-[#b6c1f0] sm:text-2xl">See it. Remember it. Retake it.</p>
              <p className="mt-8 max-w-xl text-lg leading-8 text-[#c6ccdc]">
                A photo-based party game where one player creates a photo and each next player gets only 5 seconds to see the previous photo before recreating it from memory. After everyone plays, the complete transformation is revealed.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/support" secondary>Get support</ButtonLink>
                <Link href="/privacy" className="inline-flex items-center px-3 text-sm font-bold text-[#bcc7f2] hover:underline">Read the privacy policy →</Link>
              </div>
            </div>

            <div className="relative min-h-[480px] overflow-hidden bg-gradient-to-br from-[#344c94] via-[#6250a3] to-[#9f5e8d] p-8 sm:p-12">
              <div className="absolute -right-24 -top-20 size-72 rounded-full border border-white/15" />
              <div className="absolute -right-8 -top-4 size-44 rounded-full border border-white/15" />
              <div className="photo-card absolute left-[10%] top-[12%] w-[58%] -rotate-7 rounded-3xl bg-[#fff6d3] p-3">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#f6b66f] via-[#df758c] to-[#7965c7] p-5">
                  <span className="grid size-10 place-items-center rounded-full bg-white/85 font-bold text-[#263153]">1</span>
                </div>
              </div>
              <div className="photo-card absolute bottom-[9%] right-[8%] w-[58%] rotate-7 rounded-3xl bg-white p-3">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#8ddacb] via-[#68a5ca] to-[#5768b7] p-5">
                  <span className="grid size-10 place-items-center rounded-full bg-white/85 font-bold text-[#263153]">2</span>
                  <span className="absolute bottom-9 right-9 text-5xl text-white">↻</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#101d3c]/9 bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#586ccc]">How it plays</p>
              <h2 className="mt-5 max-w-md text-4xl font-semibold tracking-[-.05em] sm:text-5xl">One photo becomes many.</h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {[
                ["01", "Create", "The first player takes a photo to start the chain."],
                ["02", "Recreate", "Each next player sees the last photo for only 5 seconds, then recreates it."],
                ["03", "Reveal", "See the complete transformation after everyone has played."],
              ].map(([number, title, text]) => (
                <li key={number} className="rounded-3xl border border-[#101d3c]/10 bg-[#fbfaf7] p-7">
                  <span className="text-xs font-bold tracking-[.16em] text-[#6678cd]">{number}</span>
                  <h3 className="mt-8 text-xl font-semibold tracking-[-.03em]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#687083]">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#586ccc]">At a glance</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-.05em]">Made for the room you’re in.</h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact, index) => (
              <li key={fact} className="flex min-h-28 items-center gap-4 rounded-2xl border border-[#101d3c]/10 bg-white p-5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eef0fc] text-sm font-bold text-[#5266bf]">{index + 1}</span>
                <span className="font-semibold leading-6">{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactBand title="Need help with RETAKE Party?" copy="Visit support for common topics, privacy details, and a direct way to reach us." />
    </>
  );
}
