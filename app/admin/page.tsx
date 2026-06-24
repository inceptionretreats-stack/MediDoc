import type { Metadata } from "next";

import { AdminOperationsDashboard } from "@/components/admin/admin-operations-dashboard";
import { requirePageRole } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin operations - Doctor Platform",
  description:
    "Local-first Admin and Super Admin operations workspace for Doctor Platform.",
};

export default async function AdminPage() {
  await requirePageRole(["admin", "super_admin"], "/admin");
  return <AdminOperationsDashboard />;
}
