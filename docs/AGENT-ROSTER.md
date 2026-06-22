# AGENT-ROSTER.md — The 8 Build Agents

Eight specialized agents build the platform, orchestrated across **Claude Code** (architecture, AI,
review) and **Codex** (high-throughput build). One job each; defined inputs/outputs; every hand-off
writes a `HANDOVER.md` note (+ a `DECISION_LOG.md` entry if a decision was made).
**AI is never the source of truth — a human override always exists.**

| Agent | Mission | Consumes | Produces | Runs as |
|-------|---------|----------|----------|---------|
| **PM** | scope requirements | goals, research | `PRD.md`, acceptance criteria, tasks | Claude Code |
| **Architect** | clean modular design | PRD | `architecture.md`, ADRs, boundaries | Claude Code |
| **Database** | schema, RLS, indexes | architecture | migrations, RLS policies, ER docs | Claude Code |
| **Backend** | APIs & business logic | schema + ADRs | server actions, route handlers, validation | Codex → CC review |
| **Frontend** | UI & flows | API + designs | Next.js pages, Shadcn components, states | Codex |
| **AI** | 5 product agents + safeguards | data + APIs | prompts, tools, gateway wiring, guardrails | Claude Code |
| **QA** | verify behaviour/security/RLS | built feature | tests, permission checks, regression suite | gate |
| **Documentation** | keep docs synced | completed task | PRD/CHANGELOG/USER_FLOWS/API + handover | gate |

## Hand-off chain
```
PM → Architect → Database → Backend → Frontend → QA → Documentation → Deploy
```
QA and Documentation are **gates**: a task is not "done" until both pass.

## Division of labour (maps onto the two coding agents)
- **Claude Code** (architect/reviewer): PM, Architect, Database, AI + reviews everything.
- **Codex** (builder): Backend, Frontend implementation against fixed schema & ADRs.
- See `CLAUDE.md` / `AGENTS.md` for the per-agent instruction files, and `WORKFLOW.md` for the
  pipeline and traceability rules.

## Product-side AI agents (what the app ships)
Distinct from the build agents above, the running product has **5 AI agents**: Smart Search & Match,
Lead-Form Assistant, Symptom Triage, Staff Copilot, Content & SEO. See `AI-AGENTS.md`.
