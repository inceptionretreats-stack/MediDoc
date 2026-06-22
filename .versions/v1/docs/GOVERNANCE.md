# GOVERNANCE.md — Engineering Operating System Rulebook

The complete operating ruleset for the Doctor Platform (and future projects). This is the
**source of truth**; the PDF mirrors it (Ch. 18). Agents must comply with every rule. Applies to
all SaaS, web/mobile apps, enterprise software, AI products, marketplaces, ERP/CRM/FinTech/
HealthTech, and future work.

## Pre-flight (before writing any code)
1. Read all markdown docs · 2. Read all handover files · 3. Read architecture docs · 4. Read
database docs · 5. Read decision logs · 6. Never overwrite a decision without updating
`DECISION_LOG.md` · 7. Back up before major changes · 8. Keep architecture synced with
implementation · 9. Every feature updates `PRD.md`, `CHANGELOG.md`, `USER_FLOWS.md`, API docs ·
10. Clean architecture · 11. RBAC security · 12. Supabase RLS · 13. Production-ready code only ·
14. Migration files for schema changes · 15. Tests with every feature · 16. Handover notes after
every task. **Never skip documentation, backups, or handovers. Every task is traceable from
requirement to deployment.** Work in small modular steps; minimize tokens; persist progress;
reuse `/skills` before installing.

## Core Principles
Security › features · correctness › speed · simplicity › complexity · scalability › shortcuts ·
maintainability › hacks · reusability › duplication · reliability › optimization · automation ›
manual work · UX › visual effects · **data integrity is non-negotiable**.

## Architecture
Clean architecture · separate UI/business/data layers · no business logic in UI · loosely coupled ·
highly cohesive · design for scaling · domain-driven thinking · event-driven where beneficial ·
avoid premature microservices · start modular, scale when needed.

## Code Quality
No duplicated code · no dead code · no unused dependencies · no magic values · meaningful names ·
small focused functions · single responsibility · maintainable files · readability › cleverness ·
every change improves the codebase.

## TypeScript
Strict mode · never `any` · explicit types · consistent interfaces/types · validate external data ·
no unsafe casting · shared FE/BE types · strong typing for APIs, DB models, everywhere.

## Database
Source of truth · migrations only · no manual prod edits · timestamps on every record · audit logs
on critical actions · never trust client data · proper indexes · optimized queries · protect
integrity · design for growth.

## API
Validate every request & response · never trust FE input · consistent response format · proper
error handling · authorization · authentication · rate-limit sensitive endpoints · log failures ·
version breaking APIs.

## Security
Deny by default · least privilege · encrypt sensitive data · protect secrets · never expose private
keys · server-side authorization only · audit privileged actions · monitor suspicious activity ·
MFA where applicable · security review before release.

## Authentication
Trusted providers · no manual password storage · secure sessions · role-based permissions · session
expiration · device management where needed · audit auth events · prevent privilege escalation ·
secure password reset · validate identity for sensitive actions.

## Authorization
Backend enforces permissions · FE visibility is not security · role checks on every action ·
resource-level perms · tenant-level perms · admin actions logged · sensitive actions confirmed ·
access reviewed regularly · no implicit trust · least privilege.

## Multi-tenancy
Tenant isolation mandatory · no data leakage · every query scoped properly · tenant context
validated · audit tenant access · separate permissions by tenant · shared infra allowed · shared
data forbidden unless explicit · isolation tested regularly · security › convenience.

## Frontend
Fast loading · responsive · accessible · consistent components · reusable design system · proper
loading states · proper error states · safe optimistic updates · offline when required · UX first.

## Backend
Stateless where possible · centralized business logic · reliable error handling · structured
logging · idempotent operations · background jobs for heavy work · secure endpoints · consistent
architecture · scalable services · operational observability.

## AI
Never the source of truth · output must be verifiable · human override always exists · log AI
decisions · track prompts & outputs · protect user data · avoid hallucination risks · validate
responses · safeguards on AI actions · fail safely.

## File Storage
Object storage · metadata separate · validate uploads · restrict access · signed URLs · encrypt
sensitive files · scan uploads when possible · CDN delivery · backup critical assets · lifecycle
management.

## Realtime
DB remains truth · realtime is delivery only · handle reconnects · handle conflicts · idempotent
updates · tenant-scoped channels · monitor latency · recover gracefully · sync after reconnect ·
never trust cache over truth.

## Offline
Queue writes · sync automatically · resolve conflicts safely · show sync status · protect integrity ·
visible failures · minimal local data · encrypt local sensitive data · audit sync events · never
compromise security.

## Performance
Measure before optimizing · cache intelligently · lazy-load heavy content · minimize DB load ·
optimize network requests · optimize assets · monitor continuously · reduce bundle size · CDN ·
user-perceived speed first.

## Testing
Test critical workflows · business logic · security controls · permissions · integrations · edge
cases · failures · automate · prevent regressions · no release without validation.

## DevOps
Infra as code · automated deployments · automated backups · monitoring · alerts · disaster
recovery · rollback capability · environment separation · secret management · operational
visibility.

## Compliance
Minimize collected data · protect PII · audit trails · appropriate retention · support deletion ·
track consent · encrypt sensitive info · follow regional regulations (DPDP) · log compliance
actions · regular reviews.

## Product
Solve real problems · user value · avoid feature bloat · measure adoption · measure outcomes ·
collect feedback · iterate continuously · prioritize reliability · prioritize retention · build
for long-term sustainability.

## Golden Rules
Security first · data is sacred · users are the priority · simplicity wins · reliability matters ·
scalability matters · maintainability matters · observability matters · automation matters ·
**long-term thinking beats short-term shortcuts**.
