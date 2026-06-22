import type { Metadata } from "next";

import { BookingPreview } from "@/components/booking/booking-preview";

export const metadata: Metadata = {
  title: "Booking preview - Doctor Platform",
  description:
    "Local-first booking lifecycle and notification preview for Doctor Platform.",
};

export default function BookingPage() {
  return <BookingPreview />;
}
