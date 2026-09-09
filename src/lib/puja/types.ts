export type PujaRsvp = {
  id: string;
  guest_name: string;
  attending: boolean;
  adults: number;
  children: number;
  message: string | null;
  created_at: string;
  updated_at: string;
};

export type PujaRsvpInput = Pick<
  PujaRsvp,
  "guest_name" | "attending" | "adults" | "children" | "message"
>;

export type PujaRsvpSummary = {
  responses: number;
  attendingHouseholds: number;
  notAttendingHouseholds: number;
  adults: number;
  children: number;
};
