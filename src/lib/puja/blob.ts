import "server-only";

import { get, list, put } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import type { PujaRsvp, PujaRsvpInput, PujaRsvpSummary } from "./types";
import { validateRsvpInput } from "./validation";

const RSVP_PREFIX = "puja-rsvps/";
const MAX_STORED_RSVP_BYTES = 8_192;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export class PujaDataError extends Error {
  constructor(message = "The RSVP service could not complete the request.") {
    super(message);
    this.name = "PujaDataError";
  }
}

function pathnameForRsvp(id: string) {
  return `${RSVP_PREFIX}${id}.json`;
}

function parseStoredRsvp(value: string, expectedId: string) {
  let stored: unknown;

  try {
    stored = JSON.parse(value);
  } catch {
    throw new PujaDataError("Stored RSVP data is invalid.");
  }

  if (!stored || typeof stored !== "object") {
    throw new PujaDataError("Stored RSVP data is invalid.");
  }

  const record = stored as Record<string, unknown>;
  const validated = validateRsvpInput(record);
  const createdAt = typeof record.created_at === "string" ? record.created_at : "";
  const updatedAt = typeof record.updated_at === "string" ? record.updated_at : "";

  if (
    !validated.ok ||
    record.id !== expectedId ||
    !UUID_PATTERN.test(expectedId) ||
    Number.isNaN(Date.parse(createdAt)) ||
    Number.isNaN(Date.parse(updatedAt))
  ) {
    throw new PujaDataError("Stored RSVP data is invalid.");
  }

  return {
    id: expectedId,
    ...validated.data,
    created_at: createdAt,
    updated_at: updatedAt,
  } satisfies PujaRsvp;
}

async function readRsvpBlob(id: string) {
  const result = await get(pathnameForRsvp(id), {
    access: "private",
    useCache: false,
  });

  if (!result) return null;
  if (result.statusCode !== 200 || result.blob.size > MAX_STORED_RSVP_BYTES) {
    throw new PujaDataError("Stored RSVP data is invalid.");
  }

  const body = await new Response(result.stream).text();
  return parseStoredRsvp(body, id);
}

async function runBlobOperation<T>(operation: () => Promise<T>) {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof PujaDataError) throw error;

    const details = blobErrorDetails(error);
    console.error("Puja Blob operation failed", details);
    throw new PujaDataError();
  }
}

function safeLogText(value: unknown) {
  if (typeof value !== "string") return undefined;

  return value
    .replace(/vercel_blob_[^\s"']+/gi, "[redacted]")
    .replace(/bearer\s+[^\s"']+/gi, "Bearer [redacted]");
}

function blobErrorDetails(error: unknown) {
  if (!error || typeof error !== "object") {
    return { name: "UnknownBlobError", message: safeLogText(error) };
  }

  const value = error as Record<string, unknown>;
  const cause =
    value.cause && typeof value.cause === "object"
      ? (value.cause as Record<string, unknown>)
      : null;

  return {
    name: safeLogText(value.name) || "UnknownBlobError",
    message: safeLogText(value.message) || "No error message provided",
    code: safeLogText(value.code),
    status: value.status ?? value.statusCode,
    cause: cause
      ? {
          name: safeLogText(cause.name),
          message: safeLogText(cause.message),
          code: safeLogText(cause.code),
          status: cause.status ?? cause.statusCode,
        }
      : undefined,
  };
}

async function writeRsvpBlob(rsvp: PujaRsvp, allowOverwrite: boolean) {
  await put(pathnameForRsvp(rsvp.id), JSON.stringify(rsvp), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite,
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: 60,
    maximumSizeInBytes: MAX_STORED_RSVP_BYTES,
  });
}

export async function createPujaRsvp(input: PujaRsvpInput) {
  return runBlobOperation(async () => {
    const timestamp = new Date().toISOString();
    const rsvp: PujaRsvp = {
      id: randomUUID(),
      ...input,
      created_at: timestamp,
      updated_at: timestamp,
    };

    await writeRsvpBlob(rsvp, false);
    return rsvp;
  });
}

export async function updatePujaRsvp(id: string, input: PujaRsvpInput) {
  return runBlobOperation(async () => {
    const existing = await readRsvpBlob(id);
    if (!existing) return null;

    const rsvp: PujaRsvp = {
      id,
      ...input,
      created_at: existing.created_at,
      updated_at: new Date().toISOString(),
    };

    await writeRsvpBlob(rsvp, true);
    return rsvp;
  });
}

export async function getPujaRsvp(id: string) {
  return runBlobOperation(() => readRsvpBlob(id));
}

export async function listPujaRsvps() {
  return runBlobOperation(async () => {
    const blobs = [];
    let cursor: string | undefined;

    do {
      const page = await list({ prefix: RSVP_PREFIX, limit: 100, cursor });
      blobs.push(...page.blobs);
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);

    const rsvps = await Promise.all(
      blobs
        .filter((blob) => blob.pathname.endsWith(".json"))
        .map(async (blob) => {
          const id = blob.pathname.slice(RSVP_PREFIX.length, -".json".length);
          if (!UUID_PATTERN.test(id)) return null;
          return readRsvpBlob(id);
        }),
    );

    return rsvps
      .filter((rsvp): rsvp is PujaRsvp => rsvp !== null)
      .sort((left, right) => right.updated_at.localeCompare(left.updated_at));
  });
}

export function summarizePujaRsvps(rows: PujaRsvp[]): PujaRsvpSummary {
  return rows.reduce<PujaRsvpSummary>(
    (summary, row) => ({
      responses: summary.responses + 1,
      attendingHouseholds: summary.attendingHouseholds + (row.attending ? 1 : 0),
      notAttendingHouseholds: summary.notAttendingHouseholds + (row.attending ? 0 : 1),
      adults: summary.adults + row.adults,
      children: summary.children + row.children,
    }),
    {
      responses: 0,
      attendingHouseholds: 0,
      notAttendingHouseholds: 0,
      adults: 0,
      children: 0,
    },
  );
}
