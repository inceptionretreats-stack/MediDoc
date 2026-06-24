import type { Metadata } from "next";

import { DoctorOnboarding } from "@/components/onboarding/doctor-onboarding";
import { requireSignedIn } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Doctor onboarding - Doctor Platform",
  description: "Local-first doctor listing draft flow for Doctor Platform.",
};

export default async function OnboardingPage() {
  await requireSignedIn("/onboarding");
  return <DoctorOnboarding />;
}
