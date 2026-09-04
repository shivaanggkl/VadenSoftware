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
        <p>Find a common answer below or email Vaden directly.</p>
        <div className="mt-7">
          <ButtonLink href="mailto:support@vadensoftware.com">Email support</ButtonLink>
        </div>
      </PageHero>

      <section className="support-topics-section">
        <div className="site-container">
          <div className="support-topics-heading">
            <p>Common answers</p>
            <h2>Start here.</h2>
          </div>
          <div className="support-topics-grid">
            {topics.map((topic) => (
              <article key={topic.number}>
                <span>{topic.number}</span>
                <div>
                  <h3>{topic.title}</h3>
                  <p>{topic.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="support-privacy-strip">
        <div className="site-container support-privacy-strip-inner">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-.035em]">Privacy matters during play.</h2>
            <p>How camera access, game photos, saving, and sharing work.</p>
          </div>
          <Link href="/privacy">Read Privacy Policy <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
