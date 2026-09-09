import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminDashboard, AdminLogin } from "../components/admin-dashboard";
import { PujaConfigurationError } from "@/lib/puja/config";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "@/lib/puja/security";
import {
  listPujaRsvps,
  PujaDataError,
  summarizePujaRsvps,
} from "@/lib/puja/blob";
import type { PujaRsvp, PujaRsvpSummary } from "@/lib/puja/types";

export const metadata: Metadata = {
  title: { absolute: "Puja RSVP Admin" },
  description: "Private RSVP response dashboard.",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

export default async function PujaAdminPage() {
  const cookieStore = await cookies();
  let authenticated = false;

  try {
    authenticated = verifyAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  } catch (error) {
    if (!(error instanceof PujaConfigurationError)) throw error;
  }

  if (!authenticated) return <AdminLogin />;

  let initialData: { rsvps: PujaRsvp[]; summary: PujaRsvpSummary } = {
    rsvps: [],
    summary: {
      responses: 0,
      attendingHouseholds: 0,
      notAttendingHouseholds: 0,
      adults: 0,
      children: 0,
    },
  };
  let initialError = "";

  try {
    const rsvps = await listPujaRsvps();
    initialData = { rsvps, summary: summarizePujaRsvps(rsvps) };
  } catch (error) {
    if (!(error instanceof PujaConfigurationError) && !(error instanceof PujaDataError)) {
      throw error;
    }
    initialError = "RSVP data is temporarily unavailable.";
  }

  return <AdminDashboard initialData={initialData} initialError={initialError} />;
}
