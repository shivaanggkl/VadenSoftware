import type { Metadata } from "next";
import { PageHero } from "@/components/ui";

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
      <PageHero eyebrow="Legal" title="Privacy Policy">
        <p>A clear overview of privacy for the Vaden Consultancy website and RETAKE Party.</p>
        <p className="mt-5 text-sm font-semibold text-[#71788a]">Last updated: August 2026</p>
      </PageHero>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="legal-copy mx-auto max-w-3xl">
          <p>
            This Privacy Policy explains how Vaden Consultancy, an assumed name of Ecleva LLC, handles information in connection with vadensoftware.com and the RETAKE Party mobile application.
          </p>

          <h2>RETAKE Party</h2>
          <p>
            RETAKE Party is designed to run on the user’s device without a backend, cloud photo storage, or an account system.
          </p>
          <ul>
            <li>Gameplay photos remain on the user’s device.</li>
            <li>The app does not upload gameplay photos to a Vaden Consultancy or Ecleva LLC server.</li>
            <li>The app does not require a login or user account.</li>
            <li>The app does not use photo analytics.</li>
          </ul>

          <h2>Camera access</h2>
          <p>
            RETAKE Party requests camera access so players can capture the photos used during gameplay. Camera access is used for this gameplay function.
          </p>

          <h2>Temporary game photos, saving, and sharing</h2>
          <p>
            Temporary game photos are deleted when a game is replaced or discarded unless the user intentionally saves or shares them. At the end of a game, users can choose to save or share the final result through features provided by their device. Those actions are controlled by the user and may involve services or recipients they select.
          </p>

          <h2>Website privacy</h2>
          <p>The Vaden Consultancy website does not have user accounts. At launch, the website does not use analytics or advertising trackers, and we do not sell personal information through the website.</p>

          <h2>Email communications</h2>
          <p>
            If you contact us by email, we receive the information you choose to include, such as your email address, message, and any details you provide. We use that information to review and respond to your request.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            This policy may be updated as the website or RETAKE Party changes. The date shown at the top of this page identifies the latest version.
          </p>

          <h2>Privacy questions</h2>
          <p>
            For questions about this Privacy Policy or privacy in RETAKE Party, email{" "}
            <a href="mailto:support@vadensoftware.com">support@vadensoftware.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
