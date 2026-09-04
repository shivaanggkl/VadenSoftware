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
        <p>For product questions, support, or business inquiries.</p>
        <div className="mt-7">
          <ButtonLink href="mailto:support@vadensoftware.com">Send an email</ButtonLink>
        </div>
      </PageHero>

      <section className="contact-details-section">
        <div className="site-container contact-details-grid">
          <div className="contact-email-block">
            <p>Email</p>
            <a href="mailto:support@vadensoftware.com">support@vadensoftware.com</a>
          </div>
          <div className="contact-note">
            <p>Product support</p>
            <span>Include what happened, your iPhone model, and iOS version.</span>
          </div>
          <div className="contact-note">
            <p>Company</p>
            <span>Vaden Consultancy is an assumed name of Ecleva LLC, a Texas limited liability company.</span>
          </div>
        </div>
      </section>
    </>
  );
}
