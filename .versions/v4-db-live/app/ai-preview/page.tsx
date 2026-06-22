import type { Metadata } from "next";

import { AiAssistPreview } from "@/components/ai/ai-assist-preview";

export const metadata: Metadata = {
  title: "AI assist preview - Doctor Platform",
  description:
    "Fixture-backed local previews for Smart Search, Lead-Form Assistant and Symptom Triage.",
};

export default function AiPreviewPage() {
  return <AiAssistPreview />;
}
