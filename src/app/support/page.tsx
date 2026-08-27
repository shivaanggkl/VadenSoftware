import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "RETAKE Party Support",
  description:
    "Get help with camera permissions, saving or sharing photos, gameplay, and technical issues in RETAKE Party.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "RETAKE Party Support",
    description: "Help and contact information for RETAKE Party.",
    url: "/support",
    images: ["/og.png"],
  },
};

const topics = [
  {
    number: "01",
    title: "Camera permission",
    text: "RETAKE Party needs camera access to capture gameplay photos. You can review camera access in your iPhone’s Settings.",
  },
  {
    number: "02",
    title: "Saving & sharing photos",
    text: "Use the available device options at the end of a game to intentionally save or share the final result.",
  },
  {
    number: "03",
    title: "Gameplay questions",
    text: "For questions about starting a game, passing the phone, the five-second preview, or the final reveal, email us and describe where you got stuck.",
  },
  {
    number: "04",
    title: "Technical issues",
    text: "If something is not working as expected, tell us what happened and which iPhone and iOS version you are using.",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero eyebrow="Product support" title="RETAKE Party Support">
        <p>
          Need help? Review the common topics below or email us directly. We’ll do our best to provide a clear, useful response.
        </p>
        <div className="mt-8">
          <ButtonLink href="mailto:support@vadensoftware.com">Email support</ButtonLink>
        </div>
      </PageHero>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 border-b border-[#101d3c]/10 pb-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#586ccc]">Help center</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Common topics</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#687083]">Short answers for the things players are most likely to need.</p>
          </div>
          <div className="mt-5 divide-y divide-[#101d3c]/10">
            {topics.map((topic) => (
              <article key={topic.number} className="grid gap-4 py-8 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span className="text-xs font-bold tracking-[.16em] text-[#6678cd]">{topic.number}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-.03em]">{topic.title}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-[#687083]">{topic.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#101d3c]/9 bg-[#f1f0f7] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-.035em]">Privacy matters during play.</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#687083]">Learn how RETAKE Party handles camera access, game photos, saving, and sharing.</p>
          </div>
          <Link href="/privacy" className="shrink-0 font-bold text-[#4459b5] hover:underline">Read Privacy Policy →</Link>
        </div>
      </section>
    </>
  );
}
