import type { Metadata } from "next";
import { FindDoctorPage } from "@/components/find-doctor/find-doctor-page";

export const metadata: Metadata = {
  title: "Find a Doctor Near You — Doctor Platform",
  description:
    "Search verified doctors in Udaipur by specialty, area or symptom. Same-day appointments available.",
};

export default function Page() {
  return <FindDoctorPage />;
}
