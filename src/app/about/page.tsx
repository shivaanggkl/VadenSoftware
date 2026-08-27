import type { Metadata } from "next";
import { ContactBand, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Vaden Consultancy, an assumed name of Ecleva LLC, a Texas limited liability company.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Vaden Consultancy",
    description:
      "Vaden Consultancy builds thoughtful, dependable software products in Texas.",
    url: "/about",
    images: ["/og.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Vaden Consultancy" title="Thoughtful software, built with purpose.">
        <p>
          We focus on clear experiences, reliable foundations, and technology that earns its place in people’s lives.
        </p>
      </PageHero>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#586ccc]">Who we are</p>
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#101d3c]/10 bg-white p-4 shadow-sm">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#4968d2] to-[#7e56c9] font-black text-white">V</span>
              <span className="font-semibold">Texas, United States</span>
            </div>
          </div>
          <div>
            <p className="text-2xl font-medium leading-[1.55] tracking-[-.025em] text-[#253252] sm:text-3xl sm:leading-[1.5]">
              Vaden Consultancy is an assumed name of Ecleva LLC, a Texas limited liability company. We build and develop software products with a focus on simple user experiences, dependable technology, and products people enjoy using.
            </p>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              <article className="rounded-3xl border border-[#101d3c]/10 bg-white p-7">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#6676c9]">Our focus</p>
                <h2 className="mt-4 text-xl font-semibold tracking-[-.03em]">Products with practical value</h2>
                <p className="mt-3 leading-7 text-[#687083]">Software shaped around a clear purpose, useful details, and an experience that respects the user.</p>
              </article>
              <article className="rounded-3xl border border-[#101d3c]/10 bg-[#f1f0f7] p-7">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-[#6676c9]">Our approach</p>
                <h2 className="mt-4 text-xl font-semibold tracking-[-.03em]">Clarity over complexity</h2>
                <p className="mt-3 leading-7 text-[#687083]">Careful design and dependable engineering, without features or friction that do not serve the product.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <ContactBand title="Questions about our work?" copy="Reach Vaden Consultancy directly by email. We’ll keep the conversation clear and straightforward." />
    </>
  );
}
