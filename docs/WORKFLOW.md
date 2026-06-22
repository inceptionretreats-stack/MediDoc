# WORKFLOW.md — Delivery Pipeline & Traceability

One pipeline for every feature. **Documentation, backups and handovers are never skipped.**
Proceed in **small modular steps**: Plan → Build → Test → Log → Repeat.

```
Requirements → Architecture → Database → Backend → Frontend → Testing → Documentation → Deployment
   PM            Architect      DB         Backend    Frontend     QA          Docs           DevOps
```

## Every feature MUST update (no exceptions)
**Docs:** `PRD.md` (requirement) · `CHANGELOG.md` (what changed) · `USER_FLOWS.md` (flows) ·
`API.md` (endpoints) · `dev-log.md` + `tasks.md` (progress).
**Code & safety:** migration file for any schema change · tests (QA gate) · `.versions/` backup
before major change · `HANDOVER.md` note after the task · `DECISION_LOG.md` entry if a decision
was made.

## Traceability — requirement → deployment
```
REQ-id (PRD) → ADR (architecture.md) → migration → API endpoint → UI flow
            → test case → CHANGELOG entry → deploy (Vercel) → handover note
```
Any shipped line traces back to a requirement; any requirement traces forward to its deployment.

## Hard gates
- No release without tests passing.
- No schema change without a migration.
- No decision overwrite without a `DECISION_LOG.md` update.
- No major change without a `.versions/` backup.
- Skills-first: check `/skills`, reuse if present, install if missing — don't reinvent.

## Definition of done
Builds clean · RLS verified per role & tenant · tests pass (QA) · docs updated (Documentation) ·
decision logged · handover written · version snapshotted on a version bump.
