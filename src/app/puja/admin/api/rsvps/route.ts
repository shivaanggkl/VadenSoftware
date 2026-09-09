import { NextRequest, NextResponse } from "next/server";
import { PujaConfigurationError } from "@/lib/puja/config";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/puja/security";
import {
  listPujaRsvps,
  PujaDataError,
  summarizePujaRsvps,
} from "@/lib/puja/blob";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  try {
    if (!verifyAdminSession(session)) {
      return NextResponse.json(
        { error: "Admin sign-in required." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    const rsvps = await listPujaRsvps();
    return NextResponse.json(
      { rsvps, summary: summarizePujaRsvps(rsvps) },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof PujaConfigurationError || error instanceof PujaDataError) {
      return NextResponse.json(
        { error: "RSVP data is temporarily unavailable." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
    throw error;
  }
}
