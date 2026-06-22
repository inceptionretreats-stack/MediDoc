import type { Metadata } from "next";

import { DoctorOnboarding } from "@/components/onboarding/doctor-onboarding";

export const metadata: Metadata = {
  title: "Doctor onboarding - Doctor Platform",
  description: "Local-first doctor listing draft flow for Doctor Platform.",
};

export default function OnboardingPage() {
  return <DoctorOnboarding />;
}
