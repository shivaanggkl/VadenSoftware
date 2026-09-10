"use client";

import { FormEvent, useEffect, useState } from "react";
import type { PujaRsvp } from "@/lib/puja/types";
import styles from "../puja.module.css";

const STORAGE_KEY = "satyanarayan-puja-rsvp";

type FormState = {
  guestName: string;
  attending: boolean | null;
  adults: number | "";
  children: number | "";
  message: string;
};

type GuestCountField = "adults" | "children";

const initialState: FormState = {
  guestName: "",
  attending: null,
  adults: 1,
  children: 0,
  message: "",
};

function readSavedIdentifier() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveIdentifier(identifier: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, identifier);
  } catch {
    // The HttpOnly fallback cookie still preserves the response on this browser.
  }
}

function removeSavedIdentifier() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage may be unavailable in some embedded or private browsers.
  }
}

function stateFromRsvp(rsvp: PujaRsvp): FormState {
  return {
    guestName: rsvp.guest_name,
    attending: rsvp.attending,
    adults: rsvp.adults,
    children: rsvp.children,
    message: rsvp.message || "",
  };
}

function normalizeGuestCount(value: number | "") {
  const count = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(count)) return 0;
  return Math.min(50, Math.max(0, Math.trunc(count)));
}

export function RsvpForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [identifier, setIdentifier] = useState<string | null>(null);
  const [loadingSaved, setLoadingSaved] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const savedIdentifier = readSavedIdentifier();
    const query = savedIdentifier
      ? `?identifier=${encodeURIComponent(savedIdentifier)}`
      : "";

    async function loadSavedRsvp() {
      try {
        const response = await fetch(`/puja/api/rsvp${query}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (response.status === 404 || response.status === 400) {
          removeSavedIdentifier();
          return;
        }
        if (!response.ok) throw new Error("unavailable");

        const data = (await response.json()) as {
          rsvp: PujaRsvp | null;
          identifier: string | null;
        };
        if (data.rsvp && data.identifier) {
          setForm(stateFromRsvp(data.rsvp));
          setIdentifier(data.identifier);
          saveIdentifier(data.identifier);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setStatus({
            type: "error",
            message: "We could not check for a saved RSVP. You can still complete the form below.",
          });
        }
      } finally {
        if (!controller.signal.aborted) setLoadingSaved(false);
      }
    }

    void loadSavedRsvp();
    return () => controller.abort();
  }, []);

  function setAttendance(attending: boolean) {
    setForm((current) => ({
      ...current,
      attending,
      adults: attending ? Math.max(1, normalizeGuestCount(current.adults)) : 0,
      children: attending ? normalizeGuestCount(current.children) : 0,
    }));
    setStatus(null);
  }

  function setGuestCount(field: GuestCountField, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value === "" ? "" : Math.max(0, Number(value)),
    }));
  }

  function normalizeGuestCountField(field: GuestCountField) {
    setForm((current) => ({
      ...current,
      [field]: normalizeGuestCount(current[field]),
    }));
  }

  async function submitRsvp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const adults = form.attending ? normalizeGuestCount(form.adults) : 0;
    const children = form.attending ? normalizeGuestCount(form.children) : 0;
    setForm((current) => ({ ...current, adults, children }));

    if (form.attending === null) {
      setStatus({ type: "error", message: "Please select whether you are attending." });
      return;
    }

    if (form.attending && adults + children < 1) {
      setStatus({ type: "error", message: "Please enter at least one attending guest." });
      return;
    }

    setSubmitting(true);
    const formElement = event.currentTarget;
    const website = new FormData(formElement).get("website");

    try {
      const response = await fetch("/puja/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier,
          guest_name: form.guestName,
          attending: form.attending,
          adults,
          children,
          message: form.message,
          website,
        }),
      });
      const data = (await response.json()) as {
        rsvp?: PujaRsvp;
        identifier?: string;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.rsvp || !data.identifier) {
        if (response.status === 400 && data.error?.includes("Saved RSVP")) {
          removeSavedIdentifier();
          setIdentifier(null);
        }
        throw new Error(data.error || "Your RSVP could not be saved. Please try again.");
      }

      setForm(stateFromRsvp(data.rsvp));
      setIdentifier(data.identifier);
      saveIdentifier(data.identifier);
      setStatus({ type: "success", message: data.message || "Thank you. Your RSVP is confirmed." });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error && error.message !== "Failed to fetch"
            ? error.message
            : "We could not reach the RSVP service. Check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.rsvpForm} onSubmit={submitRsvp} aria-busy={submitting || loadingSaved}>
      {loadingSaved ? (
        <p className={styles.loadingNote} role="status">Checking for a saved RSVP…</p>
      ) : identifier ? (
        <p className={styles.savedNote}>Your saved response is shown below. You can update it at any time.</p>
      ) : null}

      <div className={styles.field}>
        <label htmlFor="guest-name">Family / Guest Name</label>
        <input
          id="guest-name"
          name="guest_name"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          value={form.guestName}
          onChange={(event) => setForm((current) => ({ ...current, guestName: event.target.value }))}
          disabled={submitting}
        />
      </div>

      <fieldset className={styles.attendanceField} disabled={submitting}>
        <legend>Will you be attending?</legend>
        <div className={styles.attendanceChoices}>
          <label className={form.attending === true ? styles.choiceSelected : undefined}>
            <input
              type="radio"
              name="attending"
              required
              checked={form.attending === true}
              onChange={() => setAttendance(true)}
            />
            <span>Yes, with joy</span>
          </label>
          <label className={form.attending === false ? styles.choiceSelected : undefined}>
            <input
              type="radio"
              name="attending"
              required
              checked={form.attending === false}
              onChange={() => setAttendance(false)}
            />
            <span>Unable to attend</span>
          </label>
        </div>
      </fieldset>

      <div className={styles.countGrid} aria-hidden={form.attending === false}>
        <div className={styles.field}>
          <label htmlFor="adults">Number of Adults</label>
          <input
            id="adults"
            name="adults"
            type="number"
            inputMode="numeric"
            min={0}
            max={50}
            required={form.attending === true}
            value={form.attending === false ? 0 : form.adults}
            onChange={(event) => setGuestCount("adults", event.target.value)}
            onBlur={() => normalizeGuestCountField("adults")}
            disabled={submitting || form.attending === false}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="children">Number of Children</label>
          <input
            id="children"
            name="children"
            type="number"
            inputMode="numeric"
            min={0}
            max={50}
            required={form.attending === true}
            value={form.attending === false ? 0 : form.children}
            onChange={(event) => setGuestCount("children", event.target.value)}
            onBlur={() => normalizeGuestCountField("children")}
            disabled={submitting || form.attending === false}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message <span>Optional</span></label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={500}
          value={form.message}
          onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          disabled={submitting}
        />
        <small>{form.message.length}/500</small>
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status ? (
        <div
          className={status.type === "success" ? styles.successMessage : styles.errorMessage}
          role={status.type === "error" ? "alert" : "status"}
        >
          <span aria-hidden="true">{status.type === "success" ? "✓" : "!"}</span>
          <p>{status.message}</p>
        </div>
      ) : null}

      <button className={styles.submitButton} type="submit" disabled={submitting || loadingSaved}>
        {submitting ? "Saving your RSVP…" : identifier ? "Update RSVP" : "Submit RSVP"}
      </button>
      <p className={styles.formPrivacy}>Your response is used only to plan this gathering.</p>
    </form>
  );
}
