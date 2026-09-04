import type { Metadata } from "next";
import Link from "next/link";
import { RetakeFlow, RetakeTeaser } from "@/components/retake-visual";
import { ButtonLink, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Independent Software Studio",
  description:
    "Vaden is an independent software studio creating focused digital products—from playful consumer experiences to useful software tools.",
  alternates: { canonical: "/" },
};

const productPrinciples = [
  ["01", "Clear purpose", "A product should know why it exists."],
  ["02", "Considered experience", "Every interaction should earn its place."],
  ["03", "Reliable foundation", "Good ideas need dependable engineering."],
] as const;

export default function Home() {
  return (
    <>
      <section className="hero-night home-hero relative overflow-hidden text-white">
        <div className="site-container home-hero-shell">
          <div className="relative z-10">
            <Eyebrow inverse>Independent software studio · Texas</Eyebrow>
            <h1 className="home-hero-title">
              We build software
              <span className="hero-word block">people want to use.</span>
            </h1>
            <p className="home-hero-copy">
              Vaden is an independent software studio creating focused digital products—from playful consumer experiences to useful software tools.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/products">Explore products</ButtonLink>
              <ButtonLink href="/about" secondary>About Vaden</ButtonLink>
            </div>
          </div>

          <div className="home-hero-product relative z-10">
            <RetakeTeaser />
            <Link href="/products" className="home-hero-product-link">
              <span>
                <strong>RETAKE Party</strong>
                <small>Featured product</small>
              </span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="featured-product-section">
        <div className="site-container">
          <div className="featured-product-intro">
            <div className="featured-product-meta">
              <span>Product 01</span>
              <span>Coming to iPhone</span>
            </div>
            <div>
              <h2>RETAKE Party</h2>
              <p>See it. Remember it. Retake it.</p>
            </div>
            <p className="featured-product-summary">
              A photo-based party game where each new photo is recreated from memory—then the whole chain is revealed.
            </p>
          </div>

          <RetakeFlow />

          <div className="featured-product-footer">
            <p>
              <strong>3–8 players.</strong> One iPhone. Five seconds to remember. No account required.
            </p>
            <Link href="/products">
              Explore RETAKE Party <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="product-philosophy">
        <div className="site-container">
          <p className="product-philosophy-label">How Vaden builds</p>
          <div className="product-philosophy-statement">
            <h2>
              Fewer features.
              <span>Better reasons.</span>
            </h2>
            <p>
              Focused digital products, shaped by thoughtful experience design and reliable engineering.
            </p>
          </div>
          <div className="product-principles">
            {productPrinciples.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="company-note">
        <div className="site-container company-note-grid">
          <div className="company-note-brand" aria-hidden="true">
            <span>V</span>
            <p>Vaden</p>
          </div>
          <div className="company-note-main">
            <p>Vaden is the company behind the products.</p>
            <Link href="/about">About Vaden <span aria-hidden="true">↗</span></Link>
          </div>
          <p className="company-note-legal">
            Vaden Consultancy is an assumed name of Ecleva LLC, a Texas limited liability company.
          </p>
        </div>
      </section>

      <section className="home-final-cta">
        <div className="site-container home-final-cta-grid">
          <div>
            <Eyebrow inverse>Selected work</Eyebrow>
            <h2>See what we’re building.</h2>
          </div>
          <div>
            <p>RETAKE Party is coming to iPhone.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/products">Explore products</ButtonLink>
              <a href="mailto:support@vadensoftware.com" className="home-final-email">Email Vaden ↗</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
