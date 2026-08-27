import type { Metadata } from "next";
import { ButtonLink, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Vaden Consultancy in Texas at support@vadensoftware.com.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Vaden Consultancy",
    description: "Contact Vaden Consultancy in Texas.",
    url: "/contact",
    images: ["/og.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="A direct line to Vaden.">
        <p>Questions about our products, support, or business? Send us an email and we’ll get back to you.</p>
      </PageHero>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-[#101d3c]/10 bg-white shadow-[0_28px_70px_rgba(16,29,60,.08)] lg:grid-cols-[.8fr_1.2fr]">
          <div className="bg-[#101d3c] p-8 text-white sm:p-12">
            <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#5c78dc] to-[#8c63d1] text-2xl font-black">V</span>
            <p className="mt-10 text-xs font-bold uppercase tracking-[.18em] text-[#aeb9e5]">Business</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-.035em]">Vaden Consultancy</h2>
            <p className="mt-2 text-[#c6ccdc]">Texas, United States</p>
            <div className="my-8 h-px bg-white/12" />
            <p className="text-sm leading-6 text-[#aeb6ca]">Vaden Consultancy is an assumed name of Ecleva LLC.</p>
          </div>
          <div className="p-8 sm:p-12 lg:p-14">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#586ccc]">Email</p>
            <a href="mailto:support@vadensoftware.com" className="mt-4 block break-words text-2xl font-semibold tracking-[-.035em] text-[#101d3c] hover:underline sm:text-3xl">support@vadensoftware.com</a>
            <p className="mt-5 max-w-xl leading-7 text-[#687083]">Please include enough detail for us to understand your question. For product support, mentioning your device and what happened can help us respond more effectively.</p>
            <div className="mt-9">
              <ButtonLink href="mailto:support@vadensoftware.com">Send an email</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
