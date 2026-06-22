import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Join Doctor Platform — Contact",
  description:
    "Sign up as a patient, doctor, clinic, lab or wellness provider. List your practice on Doctor Platform.",
};

export default function Page() {
  return <ContactPage />;
}
