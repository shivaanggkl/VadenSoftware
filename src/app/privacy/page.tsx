import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the Vaden Consultancy website and RETAKE Party.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Vaden Consultancy",
    description: "How the Vaden Consultancy website and RETAKE Party handle information.",
    url: "/privacy",
    images: ["/og.png"],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="privacy-hero">
        <div className="site-container privacy-hero-inner">
          <div>
            <Eyebrow>Legal</Eyebrow>
            <h1>Privacy Policy</h1>
          </div>
          <div>
            <p>Privacy information for vadensoftware.com and RETAKE Party.</p>
            <span>Last updated: August 2026</span>
          </div>
        </div>
      </section>

      <section className="privacy-document-section">
        <div className="site-container privacy-document-layout">
          <nav aria-label="Privacy policy sections" className="privacy-toc">
            <p>On this page</p>
            <a href="#retake-party">RETAKE Party</a>
            <a href="#camera-access">Camera access</a>
            <a href="#saving-sharing">Saving and sharing</a>
            <a href="#website-privacy">Website privacy</a>
            <a href="#email-communications">Email communications</a>
            <a href="#policy-changes">Policy changes</a>
            <a href="#privacy-questions">Privacy questions</a>
          </nav>

          <article className="legal-copy">
          <p>
            This Privacy Policy explains how Vaden Consultancy, an assumed name of Ecleva LLC, handles information in connection with vadensoftware.com and the RETAKE Party mobile application.
          </p>

          <h2 id="retake-party">RETAKE Party</h2>
          <p>
            RETAKE Party is designed to run on the user’s device without a backend, cloud photo storage, or an account system.
          </p>
          <ul>
            <li>Gameplay photos remain on the user’s device.</li>
            <li>The app does not upload gameplay photos to a Vaden Consultancy or Ecleva LLC server.</li>
            <li>The app does not require a login or user account.</li>
            <li>The app does not use photo analytics.</li>
          </ul>

          <h2 id="camera-access">Camera access</h2>
          <p>
            RETAKE Party requests camera access so players can capture the photos used during gameplay. Camera access is used for this gameplay function.
          </p>

          <h2 id="saving-sharing">Temporary game photos, saving, and sharing</h2>
          <p>
            Temporary game photos are deleted when a game is replaced or discarded unless the user intentionally saves or shares them. At the end of a game, users can choose to save or share the final result through features provided by their device. Those actions are controlled by the user and may involve services or recipients they select.
          </p>

          <h2 id="website-privacy">Website privacy</h2>
          <p>The Vaden Consultancy website does not have user accounts. At launch, the website does not use analytics or advertising trackers, and we do not sell personal information through the website.</p>

          <h2 id="email-communications">Email communications</h2>
          <p>
            If you contact us by email, we receive the information you choose to include, such as your email address, message, and any details you provide. We use that information to review and respond to your request.
          </p>

          <h2 id="policy-changes">Changes to this policy</h2>
          <p>
            This policy may be updated as the website or RETAKE Party changes. The date shown at the top of this page identifies the latest version.
          </p>

          <h2 id="privacy-questions">Privacy questions</h2>
          <p>
            For questions about this Privacy Policy or privacy in RETAKE Party, email{" "}
            <a href="mailto:support@vadensoftware.com">support@vadensoftware.com</a>.
          </p>
          </article>
        </div>
      </section>
    </>
  );
}
