"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { PujaRsvp, PujaRsvpSummary } from "@/lib/puja/types";
import styles from "../puja.module.css";

type AdminData = {
  rsvps: PujaRsvp[];
  summary: PujaRsvpSummary;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Chicago",
  }).format(new Date(value));
}

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/puja/admin/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Sign-in failed.");

      setPassword("");
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.adminLoginPage}>
      <section className={styles.adminLoginCard} aria-labelledby="admin-login-title">
        <div className={styles.sacredMark} aria-hidden="true">॥ श्री ॥</div>
        <p className={styles.adminKicker}>Private access</p>
        <h1 id="admin-login-title">Puja RSVPs</h1>
        <p>Enter the event admin password to view responses.</p>
        <form onSubmit={signIn}>
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={submitting}
          />
          {error ? <p className={styles.adminError} role="alert">{error}</p> : null}
          <button type="submit" disabled={submitting}>
            {submitting ? "Signing in…" : "View RSVPs"}
          </button>
        </form>
      </section>
    </div>
  );
}

export function AdminDashboard({
  initialData,
  initialError = "",
}: {
  initialData: AdminData;
  initialError?: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<AdminData>(initialData);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);

  const loadRsvps = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/puja/admin/api/rsvps", { cache: "no-store" });
      const result = (await response.json()) as AdminData & { error?: string };
      if (response.status === 401) {
        router.refresh();
        return;
      }
      if (!response.ok) throw new Error(result.error || "RSVP data could not be loaded.");
      setData(result);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "RSVP data could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const filteredRsvps = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    if (!normalizedSearch) return data.rsvps;
    return data.rsvps.filter((rsvp) =>
      rsvp.guest_name.toLocaleLowerCase().includes(normalizedSearch),
    );
  }, [data.rsvps, search]);

  async function signOut() {
    await fetch("/puja/admin/api/session", { method: "DELETE" });
    router.refresh();
  }

  const metrics = [
    ["Total responses", data.summary.responses],
    ["Attending households", data.summary.attendingHouseholds],
    ["Not attending", data.summary.notAttendingHouseholds],
    ["Adults", data.summary.adults],
    ["Children", data.summary.children],
  ] as const;

  return (
    <div className={styles.adminPage}>
      <header className={styles.adminHeader}>
        <div>
          <p>Shree Satyanarayan Puja</p>
          <h1>RSVP responses</h1>
        </div>
        <button type="button" onClick={signOut}>Sign out</button>
      </header>

      <div className={styles.adminContent}>
        <section className={styles.adminMetrics} aria-label="RSVP totals">
          {metrics.map(([label, value]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{loading ? "—" : value}</strong>
            </article>
          ))}
        </section>

        <section className={styles.adminResponses} aria-labelledby="responses-heading">
          <div className={styles.adminToolbar}>
            <div>
              <h2 id="responses-heading">Guest list</h2>
              <p>{filteredRsvps.length} {filteredRsvps.length === 1 ? "response" : "responses"} shown</p>
            </div>
            <div className={styles.adminActions}>
              <label>
                <span className={styles.srOnly}>Search by guest name</span>
                <input
                  type="search"
                  placeholder="Search guest name"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <button type="button" onClick={() => void loadRsvps()} disabled={loading}>
                {loading ? "Refreshing…" : "Refresh"}
              </button>
              <a href={`/puja/admin/api/export?search=${encodeURIComponent(search.trim())}`}>
                Export CSV
              </a>
            </div>
          </div>

          {error ? <p className={styles.adminDataError} role="alert">{error}</p> : null}

          <div className={styles.adminTableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Attending</th>
                  <th>Adults</th>
                  <th>Children</th>
                  <th>Message</th>
                  <th>Submitted / updated</th>
                </tr>
              </thead>
              <tbody>
                {!loading && filteredRsvps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className={styles.emptyTable}>
                      {search ? "No guest names match your search." : "No RSVPs have been submitted yet."}
                    </td>
                  </tr>
                ) : null}
                {filteredRsvps.map((rsvp) => (
                  <tr key={rsvp.id}>
                    <td data-label="Name"><strong>{rsvp.guest_name}</strong></td>
                    <td data-label="Attending">
                      <span className={rsvp.attending ? styles.attendingYes : styles.attendingNo}>
                        {rsvp.attending ? "Yes" : "No"}
                      </span>
                    </td>
                    <td data-label="Adults">{rsvp.adults}</td>
                    <td data-label="Children">{rsvp.children}</td>
                    <td data-label="Message" className={styles.messageCell}>{rsvp.message || "—"}</td>
                    <td data-label="Submitted / updated" className={styles.dateCell}>
                      <span>{formatDate(rsvp.created_at)}</span>
                      {rsvp.updated_at !== rsvp.created_at ? <small>Updated {formatDate(rsvp.updated_at)}</small> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
