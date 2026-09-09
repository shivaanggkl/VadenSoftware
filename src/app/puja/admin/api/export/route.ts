import { NextRequest, NextResponse } from "next/server";
import { PujaConfigurationError } from "@/lib/puja/config";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/puja/security";
import { listPujaRsvps, PujaDataError } from "@/lib/puja/blob";

export const dynamic = "force-dynamic";

function csvCell(value: string | number) {
  let text = String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET(request: NextRequest) {
  const session = request.cookies.get(ADMIN_COOKIE_NAME)?.value;

  try {
    if (!verifyAdminSession(session)) {
      return NextResponse.json(
        { error: "Admin sign-in required." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    const search = request.nextUrl.searchParams.get("search")?.trim().toLocaleLowerCase() || "";
    const rows = (await listPujaRsvps()).filter((row) =>
      row.guest_name.toLocaleLowerCase().includes(search),
    );
    const lines = [
      ["Name", "Attending", "Adults", "Children", "Message", "Submitted", "Updated"],
      ...rows.map((row) => [
        row.guest_name,
        row.attending ? "Yes" : "No",
        row.adults,
        row.children,
        row.message || "",
        row.created_at,
        row.updated_at,
      ]),
    ].map((line) => line.map(csvCell).join(","));

    return new NextResponse(`\uFEFF${lines.join("\r\n")}`, {
      headers: {
        "Cache-Control": "no-store",
        "Content-Disposition": 'attachment; filename="satyanarayan-puja-rsvps.csv"',
        "Content-Type": "text/csv; charset=utf-8",
      },
    });
  } catch (error) {
    if (error instanceof PujaConfigurationError || error instanceof PujaDataError) {
      return NextResponse.json(
        { error: "RSVP export is temporarily unavailable." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
    throw error;
  }
}
