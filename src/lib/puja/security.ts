import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { getPujaAdminPassword, getPujaSessionSecret } from "./config";

export const RSVP_COOKIE_NAME = "puja_rsvp";
export const ADMIN_COOKIE_NAME = "puja_admin_session";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ADMIN_SESSION_SECONDS = 60 * 60 * 12;

function sign(value: string) {
  return createHmac("sha256", getPujaSessionSecret()).update(value).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function createRsvpIdentifier(id: string) {
  return `${id}.${sign(`rsvp:${id}`)}`;
}

export function readRsvpIdentifier(identifier: string | null | undefined) {
  if (!identifier) return null;

  const [id, signature, ...extra] = identifier.split(".");
  if (extra.length || !id || !signature || !UUID_PATTERN.test(id)) return null;

  return safeEqual(signature, sign(`rsvp:${id}`)) ? id : null;
}

export function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_SECONDS;
  const nonce = randomBytes(18).toString("base64url");
  const payload = `v1.${expiresAt}.${nonce}`;

  return {
    token: `${payload}.${sign(`admin:${payload}`)}`,
    maxAge: ADMIN_SESSION_SECONDS,
  };
}

export function verifyAdminSession(token: string | null | undefined) {
  if (!token) return false;

  const [version, expiresValue, nonce, signature, ...extra] = token.split(".");
  if (extra.length || version !== "v1" || !expiresValue || !nonce || !signature) return false;

  const expiresAt = Number(expiresValue);
  if (!Number.isInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;

  const payload = `${version}.${expiresValue}.${nonce}`;
  return safeEqual(signature, sign(`admin:${payload}`));
}

export function verifyAdminPassword(candidate: unknown) {
  if (typeof candidate !== "string") return false;
  return safeEqual(candidate, getPujaAdminPassword());
}

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export function getRequestFingerprint(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  return createHmac("sha256", "puja-rate-limit")
    .update(`${address}:${userAgent}`)
    .digest("base64url");
}
