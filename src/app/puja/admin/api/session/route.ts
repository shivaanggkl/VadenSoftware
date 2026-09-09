import { NextRequest, NextResponse } from "next/server";
import { PujaConfigurationError } from "@/lib/puja/config";
import { checkRateLimit } from "@/lib/puja/rate-limit";
import {
  ADMIN_COOKIE_NAME,
  createAdminSession,
  getRequestFingerprint,
  isSameOriginRequest,
  verifyAdminPassword,
} from "@/lib/puja/security";

export const dynamic = "force-dynamic";

function jsonError(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store", ...headers } },
  );
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) return jsonError("Request origin could not be verified.", 403);

  const rateLimit = checkRateLimit(`admin-login:${getRequestFingerprint(request)}`, {
    limit: 8,
    windowMs: 15 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return jsonError("Too many sign-in attempts. Please wait and try again.", 429, {
      "Retry-After": String(rateLimit.retryAfter),
    });
  }

  let body: { password?: unknown };
  try {
    body = (await request.json()) as { password?: unknown };
  } catch {
    return jsonError("Sign-in request could not be read.", 400);
  }

  try {
    if (!verifyAdminPassword(body.password)) return jsonError("Incorrect password.", 401);

    const session = createAdminSession();
    const response = NextResponse.json(
      { authenticated: true },
      { headers: { "Cache-Control": "no-store" } },
    );
    response.cookies.set(ADMIN_COOKIE_NAME, session.token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/puja/admin",
      maxAge: session.maxAge,
      priority: "high",
    });
    return response;
  } catch (error) {
    if (error instanceof PujaConfigurationError) {
      return jsonError("Admin access is not configured.", 503);
    }
    throw error;
  }
}

export async function DELETE(request: NextRequest) {
  if (!isSameOriginRequest(request)) return jsonError("Request origin could not be verified.", 403);

  const response = NextResponse.json(
    { authenticated: false },
    { headers: { "Cache-Control": "no-store" } },
  );
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/puja/admin",
    maxAge: 0,
  });
  return response;
}
