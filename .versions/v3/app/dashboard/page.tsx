import type { Metadata } from "next";

import { StaffDashboard } from "@/components/dashboard/staff-dashboard";

export const metadata: Metadata = {
  title: "Lead pipeline - Doctor Platform",
  description: "Local-first staff dashboard for Doctor Platform lead operations.",
};

export default function DashboardPage() {
  return <StaffDashboard />;
}
