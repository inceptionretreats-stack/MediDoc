import type { Metadata } from "next";
import { VideoConsultPage } from "@/components/video-consult/video-consult-page";

export const metadata: Metadata = {
  title: "Instant Video Consultation — Doctor Platform",
  description:
    "Connect with verified doctors over secure video in under 60 seconds. Digital prescription on WhatsApp, free follow-up.",
};

export default function Page() {
  return <VideoConsultPage />;
}
