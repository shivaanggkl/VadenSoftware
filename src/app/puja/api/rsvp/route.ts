import { NextRequest, NextResponse } from "next/server";
import { PujaConfigurationError } from "@/lib/puja/config";
import { checkRateLimit } from "@/lib/puja/rate-limit";
import {
  createRsvpIdentifier,
  getRequestFingerprint,
  isSameOriginRequest,
  readRsvpIdentifier,
  RSVP_COOKIE_NAME,
} from "@/lib/puja/security";
import {
  createPujaRsvp,
  getPujaRsvp,
  PujaDataError,
  updatePujaRsvp,
} from "@/lib/puja/blob";
import { validateRsvpInput } from "@/lib/puja/validation";

export const dynamic = "force-dynamic";

const RSVP_COOKIE_MAX_AGE = 60 * 60 * 24 * 60;

function errorResponse(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store", ...headers } },
  );
}

function setRsvpCookie(response: NextResponse, identifier: string) {
  response.cookies.set(RSVP_COOKIE_NAME, identifier, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/puja",
    maxAge: RSVP_COOKIE_MAX_AGE,
    priority: "high",
  });
}

export async function GET(request: NextRequest) {
  const requestedIdentifier = request.nextUrl.searchParams.get("identifier");
  const cookieIdentifier = request.cookies.get(RSVP_COOKIE_NAME)?.value;
  const identifier = requestedIdentifier || cookieIdentifier;

  if (!identifier) {
    return NextResponse.json(
      { rsvp: null, identifier: null },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const id = readRsvpIdentifier(identifier);
    if (!id) return errorResponse("Saved RSVP could not be verified.", 400);

    const rsvp = await getPujaRsvp(id);
    if (!rsvp) return errorResponse("Saved RSVP was not found.", 404);

    const signedIdentifier = createRsvpIdentifier(rsvp.id);
    const response = NextResponse.json(
      { rsvp, identifier: signedIdentifier },
      { headers: { "Cache-Control": "no-store" } },
    );
    setRsvpCookie(response, signedIdentifier);
    return response;
  } catch (error) {
    if (error instanceof PujaConfigurationError || error instanceof PujaDataError) {
      return errorResponse("RSVP service is temporarily unavailable. Please try again shortly.", 503);
    }
    throw error;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return errorResponse("Request origin could not be verified.", 403);
  }

  const rateLimit = checkRateLimit(`rsvp:${getRequestFingerprint(request)}`, {
    limit: 12,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return errorResponse("Too many attempts. Please wait a few minutes and try again.", 429, {
      "Retry-After": String(rateLimit.retryAfter),
    });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 12_000) return errorResponse("Request is too large.", 413);

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return errorResponse("The RSVP form could not be read.", 400);
  }

  if (body.website) return errorResponse("The RSVP form could not be submitted.", 400);

  const validation = validateRsvpInput(body);
  if (!validation.ok) return errorResponse(validation.error, 400);

  const submittedIdentifier =
    typeof body.identifier === "string" ? body.identifier : undefined;
  const cookieIdentifier = request.cookies.get(RSVP_COOKIE_NAME)?.value;

  try {
    let rsvp = null;
    let updatedExistingRsvp = false;
    const identifier = submittedIdentifier || cookieIdentifier;

    if (identifier) {
      const existingId = readRsvpIdentifier(identifier);
      if (!existingId && submittedIdentifier) {
        return errorResponse("Saved RSVP could not be verified. Refresh the page and try again.", 400);
      }
      if (existingId) {
        rsvp = await updatePujaRsvp(existingId, validation.data);
        updatedExistingRsvp = Boolean(rsvp);
      }
    }

    rsvp ??= await createPujaRsvp(validation.data);

    const signedIdentifier = createRsvpIdentifier(rsvp.id);
    const response = NextResponse.json(
      {
        rsvp,
        identifier: signedIdentifier,
        message: updatedExistingRsvp
          ? "Your RSVP has been updated."
          : "Thank you. Your RSVP is confirmed.",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
    setRsvpCookie(response, signedIdentifier);
    return response;
  } catch (error) {
    if (error instanceof PujaConfigurationError || error instanceof PujaDataError) {
      return errorResponse("RSVP service is temporarily unavailable. Please try again shortly.", 503);
    }
    throw error;
  }
}
