import { DevotionalImage } from "./components/devotional-image";
import { RsvpForm } from "./components/rsvp-form";
import styles from "./puja.module.css";

const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=1608+Monahan+Dr%2C+Argyle%2C+Texas+76226";

const hosts = [
  "Kamleshkumar Patel",
  "Kaminiben Patel",
  "Shivaangg Patel",
  "Akruti Patel",
] as const;

export default function PujaPage() {
  return (
    <div className={styles.page}>
      <div className={styles.ambientTop} aria-hidden="true" />
      <div className={styles.invitationShell}>
        <header className={styles.invitation}>
          <DevotionalImage />
          <p className={styles.invitationText}>
            You are cordially invited to our home for
          </p>
          <h1>
            <span>Shree</span>
            Satyanarayan
            <span>Puja</span>
          </h1>
          <div className={styles.ornamentalDivider} aria-hidden="true">
            <i />
            <span>✦</span>
            <i />
          </div>

          <div className={styles.eventDate}>
            <span>Sunday</span>
            <strong>September 27, 2026</strong>
          </div>

          <div className={styles.eventDetails}>
            <div>
              <span className={styles.detailLabel}>Puja</span>
              <strong>4:00 PM – 6:30 PM</strong>
              <small>Followed by Dinner</small>
            </div>
            <div>
              <span className={styles.detailLabel}>At our home</span>
              <address>
                1608 Monahan Dr<br />
                Argyle, Texas 76226
              </address>
              <a href={directionsUrl} target="_blank" rel="noreferrer">
                Get Directions <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </header>

        <section className={styles.hostsSection} aria-labelledby="hosts-heading">
          <p id="hosts-heading">With warm regards</p>
          <div className={styles.hostNames}>
            {hosts.map((host) => <span key={host}>{host}</span>)}
          </div>
          <p className={styles.blessing}>With the blessings of Swaminarayan Bhagwan</p>
        </section>

        <section className={styles.rsvpSection} aria-labelledby="rsvp-heading">
          <div className={styles.rsvpHeading}>
            <span aria-hidden="true">❦</span>
            <div>
              <p>Kindly respond</p>
              <h2 id="rsvp-heading">RSVP</h2>
              <p>Please let us know if you can join us.</p>
            </div>
            <span aria-hidden="true">❦</span>
          </div>
          <RsvpForm />
        </section>

        <footer className={styles.invitationFooter}>
          <span aria-hidden="true">✦</span>
          <p>We look forward to celebrating together.</p>
        </footer>
      </div>
    </div>
  );
}
