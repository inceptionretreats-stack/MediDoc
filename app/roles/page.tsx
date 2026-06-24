import type { Metadata } from "next";

import { RoleWorkspaces } from "@/components/roles/role-workspaces";
import { requirePageRole } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Role workspaces - Doctor Platform",
  description:
    "Local-first Doctor, Manager and Front-desk role dashboards for Doctor Platform.",
};

export default async function RolesPage() {
  await requirePageRole(
    ["doctor", "manager", "admin", "super_admin", "front_desk"],
    "/roles",
  );
  return <RoleWorkspaces />;
}
