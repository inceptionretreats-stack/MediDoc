import type { Metadata } from "next";

import { AdminOperationsDashboard } from "@/components/admin/admin-operations-dashboard";

export const metadata: Metadata = {
  title: "Admin operations - Doctor Platform",
  description:
    "Local-first Admin and Super Admin operations workspace for Doctor Platform.",
};

export default function AdminPage() {
  return <AdminOperationsDashboard />;
}
