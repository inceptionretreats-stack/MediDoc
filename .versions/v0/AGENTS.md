# AGENTS.md — Instructions for Codex (and any coding agent)

You are the **build/implementation** agent on the Doctor Platform, partnering with Claude Code
(the architect — see `CLAUDE.md`). Read `README.md` and `Doctor_Platform_Blueprint.pdf` first,
then `docs/HANDOVER.md` for what to do right now.

## Project in one line
AI-first doctor **listing + lead + booking** portal (Next.js + Supabase on Vercel), Udaipur → India.

## What Codex owns
- Implement UI components, forms, dashboards and CRUD screens from the agreed specs/designs.
- Write tests, fixtures, and seed data.
- Wire route handlers / server actions once Claude Code has fixed the schema & RLS.
- Repetitive, well-specified work where the pattern already exists in the codebase.

## What to hand back to Claude Code
- Anything touching **DB schema, migrations, or RLS policies**.
- Anything touching the **AI agents / prompts / Vercel AI Gateway**.
- **Auth/RBAC** logic and **compliance**-sensitive code.
- Architectural decisions or new dependencies.

## Non-negotiable rules
1. **Match existing patterns** — do not invent new structure; consistency over cleverness.
2. **Log decisions** to `docs/DECISION-LOG.md`; **update `docs/HANDOVER.md`** when you stop.
3. **Snapshot before a new version** into `.versions/vN` (see `docs/VERSIONING.md`).
4. Never weaken RLS or move authorization to the client.
5. No secrets in code; use env vars. No new external service without Claude Code's sign-off.
6. Use the MCP servers in `.mcp.json` (Supabase/Vercel/browser) rather than ad-hoc scripts.

## Conventions (same as CLAUDE.md)
TypeScript strict · App Router · Server Actions · snake_case DB / camelCase TS / kebab-case files
· money in paise · `Asia/Kolkata` · phones E.164 · commits `type(scope): summary`.

## Definition of done
Feature works, tests pass, follows existing patterns, decision logged, handover updated.
