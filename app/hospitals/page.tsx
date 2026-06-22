import type { Metadata } from "next";
import { HospitalsPage } from "@/components/hospitals/hospitals-page";

export const metadata: Metadata = {
  title: "Hospitals & Clinics in Udaipur — Doctor Platform",
  description:
    "Browse verified multi-specialty hospitals, dental clinics, eye hospitals and diagnostic labs in Udaipur.",
};

export default function Page() {
  return <HospitalsPage />;
}
