# .versions — Frozen Version Snapshots

This folder holds **read-only snapshots of past working versions**. Before starting a new version,
copy the current working tree into `.versions/vN/` (the version you are leaving). See
`docs/VERSIONING.md` for the exact procedure.

- Never edit a snapshot after creating it.
- Never delete a snapshot.
- One subfolder per version: `v1/`, `v2/`, …

Current snapshots:
- `v0` - blueprint + docs scaffold.
- `v1` - Phase 0 app foundation + Supabase schema/RLS baseline, frozen before Phase 1 work.
- `v2` - Phase 1 local UI plus admin operations dashboard, frozen after local verification.
- `v3` - Multi-agent local UI completion: booking, role workspaces, and AI preview slices.
- `v4-db-live` - Supabase project linked + 4 migrations applied + specialties seeded + types regenerated (project `xwnrjpmktffnrldhkayf` "MediDoc", region ap-south-1).
