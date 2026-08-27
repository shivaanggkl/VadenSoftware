import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, ContactBand, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const buildItems = [
  {
    number: "01",
    title: "Thoughtful products",
    text: "Focused software built around a clear purpose and the people using it.",
  },
  {
    number: "02",
    title: "Reliable engineering",
    text: "Practical technology choices, careful details, and dependable experiences.",
  },
  {
    number: "03",
    title: "Simple by design",
    text: "Interfaces that feel understandable from the start, without unnecessary complexity.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero-glow relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
        <div aria-hidden="true" className="grid-fade absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#5368c5]/16 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#4b5db2] shadow-sm backdrop-blur">
              <span className="size-1.5 rounded-full bg-[#7762d2]" />
              Independent software studio
            </p>
            <h1 className="max-w-4xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.93] tracking-[-0.072em] text-[#101d3c]">
              Software products built to be{" "}
              <span className="gradient-text">simple, useful, and enjoyable.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#5f6678] sm:text-xl sm:leading-9">
              Vaden Consultancy builds thoughtful software products and technology solutions with a focus on clear experiences, reliable engineering, and practical value.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/products">Explore our products</ButtonLink>
              <ButtonLink href="/about" secondary>
                About Vaden
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:mx-0" aria-hidden="true">
            <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-[#5c75d9]/13 to-[#9662c0]/10 blur-3xl" />
            <div className="product-orbit relative ml-auto aspect-[4/4.35] w-[88%] rounded-[2.4rem] border border-white/80 bg-white/80 p-5 shadow-[0_35px_90px_rgba(22,31,64,.15)] backdrop-blur sm:p-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#657ad8]" />
                  <span className="text-xs font-bold tracking-[.14em] text-[#768096]">VADEN / 01</span>
                </div>
                <span className="rounded-full bg-[#f1effb] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#705bb9]">
                  In progress
                </span>
              </div>
              <div className="relative mt-6 h-[62%] overflow-hidden rounded-[1.65rem] bg-[#192746] p-5">
                <div className="absolute -right-10 -top-12 size-44 rounded-full bg-[#7762d2]/70 blur-2xl" />
                <div className="absolute -bottom-16 -left-10 size-52 rounded-full bg-[#496fd2]/55 blur-3xl" />
                <div className="photo-card absolute left-[13%] top-[18%] h-[58%] w-[56%] -rotate-6 rounded-[1.15rem] bg-[#f6e08e] p-2">
                  <div className="h-full rounded-[.85rem] bg-gradient-to-br from-[#f39775] via-[#d26b92] to-[#6d5fbe]" />
                </div>
                <div className="photo-card absolute bottom-[12%] right-[11%] h-[58%] w-[56%] rotate-7 rounded-[1.15rem] bg-white p-2">
                  <div className="grid h-full place-items-center rounded-[.85rem] bg-gradient-to-br from-[#8ad3ce] to-[#526fc3] text-4xl text-white">↻</div>
                </div>
              </div>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-[#7a8293]">Featured product</p>
                  <p className="mt-2 text-2xl font-bold tracking-[-.04em]">RETAKE Party</p>
                </div>
                <span className="grid size-11 place-items-center rounded-full bg-[#101d3c] text-xl text-white">↗</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>What we build</Eyebrow>
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
              Good software should feel clear from the first tap.
            </h2>
            <div className="grid gap-px overflow-hidden rounded-3xl border border-[#101d3c]/10 bg-[#101d3c]/10 sm:grid-cols-3 lg:grid-cols-1">
              {buildItems.map((item) => (
                <article key={item.number} className="bg-white p-6 sm:p-7 lg:grid lg:grid-cols-[4rem_1fr_1.25fr] lg:items-center lg:gap-6">
                  <span className="text-xs font-bold tracking-[.16em] text-[#75809a]">{item.number}</span>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-.03em] sm:mt-0">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#687083] lg:mt-0">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#101d3c] px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#abb8f3]">Featured product</p>
            <h2 className="mt-6 text-5xl font-semibold tracking-[-.055em] sm:text-6xl">RETAKE Party</h2>
            <p className="mt-3 text-xl font-medium text-[#bec7ed]">See it. Remember it. Retake it.</p>
            <p className="mt-7 max-w-xl leading-7 text-[#c2c8d7]">
              A photo-based party game that turns a five-second glimpse into a chain of hilarious recreations—then reveals the full transformation.
            </p>
            <div className="mt-9 flex items-center gap-5">
              <Link href="/products" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#101d3c] transition hover:bg-[#edf0ff]">
                See how it works
              </Link>
              <span className="text-sm font-semibold text-[#aeb9e5]">Coming to iPhone.</span>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/12 bg-white/6 p-5 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              {["See it", "Remember it", "Retake it"].map((label, index) => (
                <div key={label} className="rounded-2xl bg-white p-3 shadow-2xl shadow-black/10">
                  <div className={`aspect-[4/5] rounded-xl ${index === 0 ? "bg-gradient-to-br from-[#f3bd75] to-[#c46e96]" : index === 1 ? "bg-gradient-to-br from-[#8ad5ca] to-[#5f76c9]" : "bg-gradient-to-br from-[#9f89df] to-[#e47a9d]"}`} />
                  <p className="px-1 pb-1 pt-3 text-sm font-bold text-[#101d3c]">0{index + 1} · {label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2rem] border border-[#101d3c]/10 bg-[#f1f0f7] p-8 sm:p-12">
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#4968d2] to-[#7e56c9] text-2xl font-black text-white">V</span>
              <div>
                <p className="font-bold">Vaden Consultancy</p>
                <p className="mt-1 text-sm text-[#697184]">Texas, United States</p>
              </div>
            </div>
            <div className="my-9 h-px bg-[#101d3c]/10" />
            <p className="text-sm font-semibold text-[#5f6780]">Operated by</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-.035em]">Ecleva LLC</p>
          </div>
          <div>
            <Eyebrow>About</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-[-.05em] sm:text-5xl">Small, focused, and serious about the details.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#61697c]">
              Vaden Consultancy is an assumed name of Ecleva LLC, a Texas limited liability company. We build and develop software products with a focus on simple user experiences and dependable technology.
            </p>
            <Link href="/about" className="mt-7 inline-block font-bold text-[#4459b5] hover:underline">More about Vaden →</Link>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
