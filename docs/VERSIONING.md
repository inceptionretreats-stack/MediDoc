# Versioning & Backup Discipline

**Golden rule: back up the current working version *before* you start building a new one.**
Nothing is ever overwritten without a snapshot. This is the project's safety net.

## How to snapshot

Before a new version (a meaningful change set — schema bump, redesign, risky refactor):

1. Decide the new version number (`v1 → v2`, semantic-ish; bump minor for features, major for
   breaking changes).
2. Copy the current working tree into `.versions/vN/` (the version you are *leaving*).
   - Windows PowerShell:
     ```powershell
     $v = "v1"   # the version you are freezing
     New-Item -ItemType Directory -Force ".versions/$v" | Out-Null
     robocopy . ".versions/$v" /E /XD .git node_modules .versions /NFL /NDL | Out-Null
     ```
3. Add a one-line entry to the table below and to `docs/DECISION_LOG.md`.
4. Now begin the new version on the live tree.

## Naming
- `.versions/v1/`, `.versions/v2/`, … — frozen, never edited after creation.
- Tag the matching git commit too: `git tag v1 && git push --tags` (git is source of truth;
  `.versions/` is the human-readable safety copy the user asked for).

## Version history

| Version | Date | What changed | Snapshot path |
|---------|------|--------------|---------------|
| v0      | 2026-06-16 | Blueprint + docs scaffold (no app code yet) | `.versions/v0/` |
| v1      | 2026-06-17 | Phase 0 app foundation + Supabase schema/RLS baseline, frozen before Phase 1 development | `.versions/v1/` |
| v2      | 2026-06-17 | Phase 1 local UI plus admin operations dashboard, frozen after local verification | `.versions/v2/` |
| v3      | 2026-06-17 | Multi-agent local UI completion: booking, role workspaces, and AI preview slices | `.versions/v3/` |

> Append a row every time you freeze a version. Never delete rows.
