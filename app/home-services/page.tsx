import type { Metadata } from "next";
import { HomeServicesPage } from "@/components/home-services/home-services-page";

export const metadata: Metadata = {
  title: "Healthcare at Home — Doctor Platform",
  description:
    "Trained nurses, physiotherapists and elder-care professionals at your doorstep. Same-day bookings in Udaipur.",
};

export default function Page() {
  return <HomeServicesPage />;
}
