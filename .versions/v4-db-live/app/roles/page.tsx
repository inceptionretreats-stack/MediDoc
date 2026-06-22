import type { Metadata } from "next";

import { RoleWorkspaces } from "@/components/roles/role-workspaces";

export const metadata: Metadata = {
  title: "Role workspaces - Doctor Platform",
  description:
    "Local-first Doctor, Manager and Front-desk role dashboards for Doctor Platform.",
};

export default function RolesPage() {
  return <RoleWorkspaces />;
}
