import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/services-page";

export const metadata: Metadata = {
  title: "Services & Packages — Doctor Platform",
  description:
    "Listing, website, social media marketing and growth packages for doctors and clinics in Udaipur and across India.",
};

export default function Page() {
  return <ServicesPage />;
}
