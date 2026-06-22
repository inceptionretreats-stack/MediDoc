# AI Layer — The Agents & LLM Choice

All AI is served through the **Vercel AI Gateway** (one endpoint, provider fallbacks,
observability, zero-data-retention option for health data) using the **AI SDK**. Models are
**tiered** to control cost.

## Which LLM to use (the recommendation)

| Tier | Model | Use it for |
|------|-------|-----------|
| Cheap / high-volume | **Claude Haiku 4.5** | lead parsing & validation, classification, summaries, first-pass triage |
| Reasoning (default) | **Claude Sonnet 4.6** | smart-search synthesis, staff copilot, content generation |
| Hardest only | **Claude Opus 4.8** | complex multi-step agentic flows, long-context analysis |
| Embeddings | small embedding model (e.g. `text-embedding-3-small` or open BGE) | semantic search vectors in Supabase **pgvector** |

Cost levers: route by tier, cache embeddings & frequent answers, cap tokens, rate-limit per user,
and prefer Haiku unless quality needs Sonnet.

## The five agents

1. **Smart Search & Match** — turns a patient's free-text ("knee pain near me, evening") into a
   ranked doctor list. Hybrid keyword + vector (pgvector) + business rules (availability, rating).
2. **Lead-Form Assistant** — autofills/normalizes the popup form, validates phone (E.164),
   transcribes voice notes, summarizes the patient's problem, de-dupes against existing leads.
3. **Symptom Triage** — Ask-Apollo-style: maps symptoms → suggested specialty. **Triage only —
   not a diagnosis.** Always shows the medical disclaimer; routes red-flag symptoms (chest pain,
   stroke signs, etc.) to emergency guidance immediately.
4. **Staff Copilot** — for Admin/Manager/Doctor/Front-desk: lead summaries, suggested replies,
   follow-up nudges, daily digest & reports.
5. **Content & SEO** — generates doctor bios, specialty landing-page copy, and local SEO content
   (reviewed before publish).

## Guardrails (all agents)
- Run under the **AI service role**; **every action is audit-logged** (`ai_runs` / `audit_log`).
- **PII redaction** before sending to the model where possible; respect DPDP consent.
- Token & rate limits; cost ceiling per tenant.
- Medical content carries disclaimers; never present AI output as professional medical advice.
- Tools (DB queries) are scoped by RLS — an agent can only see what its caller's role can see.
