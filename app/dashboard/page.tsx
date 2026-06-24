import type { Metadata } from "next";

import { StaffDashboard } from "@/components/dashboard/staff-dashboard";
import { requirePageRole } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Lead pipeline - Doctor Platform",
  description: "Local-first staff dashboard for Doctor Platform lead operations.",
};

export default async function DashboardPage() {
  await requirePageRole(
    ["manager", "admin", "super_admin", "front_desk"],
    "/dashboard",
  );
  return <StaffDashboard />;
}
