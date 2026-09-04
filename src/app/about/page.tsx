import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui";

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
      <section className="about-hero relative overflow-hidden text-white">
        <div className="site-container about-hero-grid">
          <div className="about-hero-mark" aria-hidden="true">
            <span>V</span>
            <small>Independent studio</small>
          </div>
          <div>
            <Eyebrow inverse>About Vaden</Eyebrow>
            <h1>Vaden builds focused software products.</h1>
            <p>
              From playful consumer experiences to useful software tools—clear ideas, carefully made.
            </p>
          </div>
        </div>
      </section>

      <section className="about-editorial">
        <div className="site-container">
          <p className="about-editorial-kicker">Our point of view</p>
          <p className="about-editorial-statement">
            Start with what the product is for. Make every interaction support it. Build the foundation to last.
          </p>

          <div className="about-build-pair">
            <article>
              <span>What we build / 01</span>
              <h2>Playful consumer experiences.</h2>
            </article>
            <article>
              <span>What we build / 02</span>
              <h2>Useful software tools.</h2>
            </article>
          </div>

          <div className="about-principles-line" aria-label="Vaden product principles">
            <p><span>Purpose</span> Clear reason to exist</p>
            <p><span>Experience</span> Simple and considered</p>
            <p><span>Foundation</span> Dependable technology</p>
          </div>
        </div>
      </section>

      <section className="about-company">
        <div className="site-container about-company-grid">
          <div>
            <p className="about-company-label">Company details</p>
            <h2>Vaden Consultancy</h2>
          </div>
          <p className="about-company-legal">
            Vaden Consultancy is an assumed name of Ecleva LLC, a Texas limited liability company.
          </p>
          <p className="about-company-location">Texas, United States</p>
        </div>
      </section>

      <section className="about-contact">
        <div className="site-container about-contact-inner">
          <p>Questions about our work?</p>
          <a href="mailto:support@vadensoftware.com">Email Vaden <span aria-hidden="true">↗</span></a>
          <Link href="/products">Explore products <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </>
  );
}
