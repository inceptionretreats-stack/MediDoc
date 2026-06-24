import type { Metadata } from "next";

import { BookingPreview } from "@/components/booking/booking-preview";
import { requireSignedIn } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Booking preview - Doctor Platform",
  description:
    "Local-first booking lifecycle and notification preview for Doctor Platform.",
};

export default async function BookingPage() {
  await requireSignedIn("/booking");
  return <BookingPreview />;
}
