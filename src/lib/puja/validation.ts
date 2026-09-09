import type { PujaRsvpInput } from "./types";

const NAME_MAX_LENGTH = 120;
const MESSAGE_MAX_LENGTH = 500;
const GUEST_COUNT_MAX = 50;

type ValidationResult =
  | { ok: true; data: PujaRsvpInput }
  | { ok: false; error: string };

function cleanSingleLine(value: unknown) {
  if (typeof value !== "string") return "";

  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanMessage(value: unknown) {
  if (typeof value !== "string") return "";

  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim();
}

function parseCount(value: unknown) {
  if (value === "") return 0;

  const count = typeof value === "number" ? value : Number(value);
  return Number.isInteger(count) ? count : Number.NaN;
}

export function validateRsvpInput(value: unknown): ValidationResult {
  if (!value || typeof value !== "object") {
    return { ok: false, error: "Please complete the RSVP form." };
  }

  const input = value as Record<string, unknown>;
  const guestName = cleanSingleLine(input.guest_name);
  const message = cleanMessage(input.message);

  if (!guestName) {
    return { ok: false, error: "Family or guest name is required." };
  }

  if (guestName.length > NAME_MAX_LENGTH) {
    return { ok: false, error: `Name must be ${NAME_MAX_LENGTH} characters or fewer.` };
  }

  if (typeof input.attending !== "boolean") {
    return { ok: false, error: "Please select whether you are attending." };
  }

  if (message.length > MESSAGE_MAX_LENGTH) {
    return { ok: false, error: `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.` };
  }

  let adults = parseCount(input.adults);
  let children = parseCount(input.children);

  if (!input.attending) {
    adults = 0;
    children = 0;
  }

  if (
    !Number.isInteger(adults) ||
    !Number.isInteger(children) ||
    adults < 0 ||
    children < 0 ||
    adults > GUEST_COUNT_MAX ||
    children > GUEST_COUNT_MAX
  ) {
    return {
      ok: false,
      error: `Adult and child counts must be whole numbers from 0 to ${GUEST_COUNT_MAX}.`,
    };
  }

  if (input.attending && adults + children < 1) {
    return { ok: false, error: "Please enter at least one attending guest." };
  }

  return {
    ok: true,
    data: {
      guest_name: guestName,
      attending: input.attending,
      adults,
      children,
      message: message || null,
    },
  };
}
