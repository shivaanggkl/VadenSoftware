import type { Metadata } from "next";
import Link from "next/link";
import { RetakeRound } from "@/components/retake-visual";
import { ButtonLink, Eyebrow } from "@/components/ui";

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
  ["Players", "3–8 players"],
  ["Device", "One iPhone passed between players"],
  ["Photos", "Live camera photos"],
  ["Privacy", "Photos stay on the device"],
  ["Access", "No account required"],
  ["Experience", "Designed around the final reveal and sharing experience"],
] as const;

export default function ProductsPage() {
  return (
    <>
      <section className="product-page-intro relative overflow-hidden text-white">
        <div className="site-container product-page-intro-inner">
          <div className="product-page-index">
            <span>01</span>
            <p>Vaden product</p>
          </div>
          <div className="product-page-title">
            <Eyebrow inverse>Coming to iPhone</Eyebrow>
            <h1>RETAKE Party</h1>
            <p>See it. Remember it. Retake it.</p>
          </div>
          <div className="product-page-lead">
            <p>
              A photo-based party game where every player recreates the last photo from memory. At the end, the full transformation is revealed.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/support">Product support</ButtonLink>
              <Link href="/privacy" className="product-page-privacy">Privacy details ↗</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="product-round-section">
        <div className="site-container">
          <RetakeRound />
        </div>
      </section>

      <section className="product-details-section">
        <div className="site-container product-details-layout">
          <div className="product-details-statement">
            <p>Designed for the room you’re in.</p>
            <h2>One phone. Everyone plays.</h2>
          </div>
          <div>
            <p className="product-details-copy">
              3–8 players share one iPhone. Each gets five seconds with the previous photo before recreating it from memory.
            </p>
            <dl className="product-fact-cluster">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="product-support-strip">
        <div className="site-container product-support-strip-inner">
          <div>
            <p>Questions about RETAKE Party?</p>
            <span>Answers, privacy details, and direct support from Vaden.</span>
          </div>
          <div className="product-support-links">
            <Link href="/support">Visit support ↗</Link>
            <a href="mailto:support@vadensoftware.com">Email Vaden ↗</a>
          </div>
        </div>
      </section>
    </>
  );
}
