# MCP — Model Context Protocol Setup & Policy

MCP servers give Claude Code and Codex safe, consistent access to our tools. Config lives in
`.mcp.json` at the repo root (Claude Code auto-loads it; point Codex/other agents at the same
servers). **Never commit real tokens** — values come from environment variables.

## Servers we use

| Server | Purpose | Notes |
|--------|---------|-------|
| **supabase** | Inspect schema, run read queries, manage migrations, generate types | Start **`--read-only`**; only grant write in a scoped dev session when applying migrations. Uses `SUPABASE_PROJECT_REF` + `SUPABASE_ACCESS_TOKEN`. |
| **vercel** | Deployments, logs, env vars, project status | Hosted HTTP MCP at `https://mcp.vercel.com` (OAuth). |
| **playwright** | Browser automation — E2E checks, screenshots, render PDFs | Used to verify the live UI and to render this blueprint. |
| **filesystem** | Scoped file access within `f:\Doctor` | Keeps agents inside the project root. |

## Required environment variables

```
SUPABASE_PROJECT_REF=<your-project-ref>
SUPABASE_ACCESS_TOKEN=<personal-access-token>   # keep out of git
# Vercel MCP authenticates via OAuth in the client; no token in the file.
```

## Policy

1. **Read-only by default.** The Supabase server runs read-only; switch to write only for a
   deliberate migration session, then switch back.
2. **Least privilege.** Scope tokens to this project; rotate if exposed.
3. **Consistency.** Both agents use the *same* `.mcp.json` so behaviour matches. Don't add a
   server without recording it here and in `docs/DECISION-LOG.md`.
4. **No secrets in code or commits.** Use env vars; `.mcp.json` only references `${VARS}`.
5. **Product MCP (future).** Down the line we may expose our own MCP server so internal agents
   can query leads/bookings with audit logging — design it with the AI service role + RLS.
