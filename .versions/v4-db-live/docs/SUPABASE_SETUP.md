# Connecting the Doctor Platform to Supabase

Step-by-step guide for wiring this repo to a **free-tier** Supabase project. Follow the stages in order — each one's verification step must pass before moving on.

## Context

The repo already ships with Supabase plumbing — 4 ordered migrations, `@supabase/ssr` clients, a 10-row specialty seed, and an MCP server config — but no live database is connected. Every screen runs on local fixtures. This guide takes you from "no project" to "dev server reading from Supabase, RLS enforced, types regenerated, MCP wired."

**Current repo state (verified):**

- 4 migrations in [supabase/migrations/](../supabase/migrations/) plus a 10-row specialty seed in [supabase/seed.sql](../supabase/seed.sql).
- [supabase/config.toml](../supabase/config.toml) declares `project_id = "doctor-platform"`.
- [lib/supabase/client.ts](../lib/supabase/client.ts) (browser) and [lib/supabase/server.ts](../lib/supabase/server.ts) (SSR) are already implemented against `@supabase/ssr`.
- [lib/env.ts](../lib/env.ts) validates env at call time with zod — app boots without secrets.
- [.env.example](../.env.example) lists every variable that needs filling.
- [.mcp.json](../.mcp.json) declares a read-only Supabase MCP server using `${SUPABASE_PROJECT_REF}` and `${SUPABASE_ACCESS_TOKEN}`.
- `.env.local` does **not** exist yet — you create it in Stage 4.
- The Supabase CLI is **not** in `package.json` — you install it separately in Stage 3.
- This machine's npm needs `NODE_EXTRA_CA_CERTS=$PWD\node-cacerts.pem` because of local TLS inspection.

**Outcome after finishing:**

- A live free-tier Supabase project named `doctor-platform` in the Mumbai region.
- All 4 migrations + seed applied.
- `.env.local` filled with anon key, service-role key, project ref, access token.
- [lib/types/database.ts](../lib/types/database.ts) regenerated from the real schema.
- MCP wired so Claude Code / Codex can read the schema directly.
- Dev server boots with Supabase connected and public-read RLS confirmed working.
- (Optional) Vercel production env vars set.

This guide does **not** yet set up the `create_lead()` security-definer RPC, doctor sign-in users, or AI Gateway — those are downstream work tracked in [docs/tasks.md](./tasks.md).

---

## Stage 0 — Free up a slot for the free-tier project

The free plan allows **2 active projects per org**. Per [docs/HANDOVER.md](./HANDOVER.md), the org `naman24122-source's Org` (`udjqhpdqtflhvihtmnlf`) is already at the limit:

- `salespilot` (`celgudcdzicielgnckse`) — active, unrelated app schema. **Do not** apply Doctor Platform migrations here; it has a colliding `public.leads` table.
- `naman24122-source's Project` (`egrxtbnttrsokxdcezkg`) — paused/inactive.

Pick one free path:

| Path | What you do | Trade-off |
|------|-------------|-----------|
| **B (recommended)** | Dashboard → `naman24122-source's Project` → Settings → General → **Delete project** (type the project name to confirm). | Free. Destroys the inactive project (it's already empty per HANDOVER). |
| **C** | Top-left org switcher → New organization (free plan) → create `doctor-platform` inside. | Free. Adds a second org to manage. |
| **D** | Same as B but delete `salespilot` instead. | Free, but **destroys the unrelated existing app**. Only if `salespilot` truly isn't needed. |

**Free-plan limits to be aware of:**

- Projects pause automatically after 7 consecutive days of zero API activity. One click un-pauses.
- 500 MB database, 1 GB storage, 50 K MAU, 5 GB bandwidth.
- No daily backups — only on-demand SQL dumps.

---

## Stage 1 — Create the free Supabase project

1. Sign in at https://supabase.com/dashboard.
2. Click **New project**, select the org with the free slot.
3. Fill the form:
   - **Name:** `doctor-platform`
   - **Database password:** generate a long random password. **Save it in a password manager** — needed for direct SQL and migrations.
   - **Region:** `Mumbai (ap-south-1)` — matches the Asia/Kolkata user base.
   - **Pricing plan:** **Free**.
4. Click **Create new project**. Provisioning takes 1–3 minutes.
5. Wait until the dashboard shows the project as **Active healthy**.

**Verification:** the project appears in the dashboard with a green status badge.

---

## Stage 2 — Capture every credential

Copy these six values into your password manager — they'll all be used by `.env.local` and the CLI:

| What | Where in dashboard | Used by |
|------|--------------------|---------|
| **Project URL** (`https://<ref>.supabase.co`) | Settings → API → Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| **anon public key** | Settings → API → Project API keys → `anon` `public` | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **service_role secret** | Settings → API → Project API keys → `service_role` | `SUPABASE_SERVICE_ROLE_KEY` (server-only, **never** in the browser) |
| **Project ref** (the 20-char ID in the URL) | URL bar of the dashboard, or Settings → General → Reference ID | `SUPABASE_PROJECT_REF`, MCP |
| **Personal Access Token** | Top-right avatar → Account Settings → Access Tokens → **Generate new token**. Name it `doctor-platform-cli`. | `SUPABASE_ACCESS_TOKEN` (CLI + MCP) |
| **Database password** (from Stage 1) | Already saved | Direct SQL connections |

> **The `service_role` key bypasses RLS.** Treat it like a master password. It goes only in server-side env vars (Vercel, `.env.local`) — never in a Client Component, browser code, or git.

---

## Stage 3 — Install the Supabase CLI

The CLI applies migrations, regenerates types, and links the repo to the remote project. Pick one install method:

```powershell
# Windows — Scoop (recommended)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Windows — winget
winget install --id Supabase.CLI -e

# Cross-platform — npx (no install; substitute `npx supabase ...` everywhere)
```

Verify:

```powershell
supabase --version
# e.g. 1.200.3
```

Authenticate with the Personal Access Token from Stage 2:

```powershell
supabase login
# Paste the access token when prompted.
```

---

## Stage 4 — Create `.env.local` and fill it

From the project root (`c:\web applications\Doctor\Doctor\`):

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` and fill these six variables from your password manager:

```dotenv
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-secret>

# Supabase CLI / MCP
SUPABASE_PROJECT_REF=<your-20-char-ref>
SUPABASE_ACCESS_TOKEN=<your-personal-access-token>

# App config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Leave `AI_GATEWAY_API_KEY`, `SMS_PROVIDER_KEY`, `WHATSAPP_TOKEN`, `OTP_SECRET`, `CRON_SECRET` empty for now — they're wired in later phases and the app boots fine without them.

**Verify gitignore is doing its job:**

```powershell
git check-ignore -v .env.local
# Should print:  .gitignore:16:.env*.local  .env.local
```

---

## Stage 5 — Link the repo to the remote project

```powershell
# From the project root
supabase link --project-ref $env:SUPABASE_PROJECT_REF
# Paste the database password from Stage 1 when prompted.
```

Confirm the link:

```powershell
supabase projects list
# `doctor-platform` should show with a ● marker.
```

---

## Stage 6 — Apply migrations and seed

```powershell
supabase db push
# Runs supabase/migrations/*.sql in lexical order, transactionally,
# against the linked remote project.
```

Then seed the specialty master list. Easiest path on Windows:

1. Project dashboard → **SQL Editor** → **New query**.
2. Open [supabase/seed.sql](../supabase/seed.sql), copy the whole file.
3. Paste into the SQL Editor → **Run**.
4. Confirm **Table Editor → specialties** has 10 rows.

Alternative (only if you have `psql`):

```powershell
$env:DATABASE_URL = "postgresql://postgres:[password]@db.<ref>.supabase.co:5432/postgres"
psql $env:DATABASE_URL -f supabase/seed.sql
```

**Verify in the dashboard's Table Editor:**

- From `20260616090100_tenancy_rbac.sql`: `tenants`, `profiles`, `user_roles`
- From `20260616090200_directory.sql`: `specialties` (10 rows), `clinics`, `doctors`, `doctor_specialties`, `listings`, `availability_slots`
- From `20260616090300_leads_bookings.sql`: `leads`, `lead_events`, `bookings`, `reviews`, `audit_log`
- Every table shows **RLS Enabled** (lock icon).

---

## Stage 7 — Regenerate `lib/types/database.ts`

[lib/types/database.ts](../lib/types/database.ts) is currently a hand-written stub. Replace it with one generated from the live schema:

```powershell
supabase gen types typescript --project-id $env:SUPABASE_PROJECT_REF --schema public > lib/types/database.ts
```

Typecheck (with the local TLS bundle in scope):

```powershell
$env:NODE_EXTRA_CA_CERTS = "$PWD\node-cacerts.pem"
npm run typecheck
```

If typecheck fails, the most common cause is that an app file references a column that doesn't exist in the real schema. Fix the app file — **don't** edit the generated types.

Commit the regenerated file:

```powershell
git add lib/types/database.ts
git commit -m "chore(db): regenerate Database types from live schema"
```

---

## Stage 8 — Wire the MCP server (Claude Code & Codex)

`.mcp.json` is already authored. It references `${SUPABASE_PROJECT_REF}` and `${SUPABASE_ACCESS_TOKEN}` from your shell environment. Export them in PowerShell so MCP processes inherit them:

```powershell
# Add to your PowerShell profile so they're set in every new shell:
notepad $PROFILE
# Paste:
#   $env:SUPABASE_PROJECT_REF = "<your-ref>"
#   $env:SUPABASE_ACCESS_TOKEN = "<your-access-token>"
```

Restart Claude Code (or your MCP client). It will spawn the Supabase MCP server with `--read-only` per [.mcp.json](../.mcp.json). Confirm by asking it to list tables — it should return the live `tenants`, `doctors`, etc.

**Switching MCP to write mode** (only for a deliberate migration session):

1. Edit `.mcp.json`, remove the `--read-only` arg.
2. Restart your MCP client.
3. Do the migration work.
4. **Put `--read-only` back** immediately. Log the session in [docs/DECISION_LOG.md](./DECISION_LOG.md).

---

## Stage 9 — Restart the dev server and smoke-test

```powershell
$env:NODE_EXTRA_CA_CERTS = "$PWD\node-cacerts.pem"
npm run dev
```

The dev server should report `Ready in <Xs>` on port 3000 (or whatever you pass with `-p`). Verify:

```powershell
curl http://localhost:3000/
curl http://localhost:3000/doctors/dr-aarti-sharma-general-physician
```

Both should return HTTP 200. In Dashboard → Logs → Postgres Logs, you should see `SELECT` queries hitting `public.doctors` and `public.listings`.

**RLS sanity check** (deliberately confirm anon cannot read what it shouldn't):

```powershell
# Should return [] — the RLS policy in 20260616090300_leads_bookings.sql
# only allows tenant staff + platform admin to read leads.
curl -H "apikey: <NEXT_PUBLIC_SUPABASE_ANON_KEY>" `
     -H "Authorization: Bearer <NEXT_PUBLIC_SUPABASE_ANON_KEY>" `
     "https://<your-ref>.supabase.co/rest/v1/leads?select=*"
```

If anon reads on `leads` return data, RLS is broken — stop and fix before continuing.

---

## Stage 10 — (Optional) Set Vercel production env vars

So the deployed app talks to the same Supabase project:

```powershell
vercel login
vercel link  # links this directory to the doctor-platform project on team thewebspell

vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_APP_URL production
# Repeat for `preview` scope if previews should share the DB.

vercel --prod
```

Then `curl https://doctor-platform-tawny.vercel.app/` should still return 200.

---

## Verification checklist

- [ ] `supabase projects list` shows `doctor-platform` linked.
- [ ] Dashboard → Table Editor lists all 14 tables from the migrations.
- [ ] `specialties` has 10 rows.
- [ ] Every table shows **RLS Enabled**.
- [ ] `.env.local` has 5 filled Supabase variables; git ignores the file.
- [ ] `lib/types/database.ts` regenerated and committed.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` clean — no missing-env warnings.
- [ ] `npm run dev` boots; `curl localhost:<port>/` returns 200.
- [ ] Postgres logs show the dev-server's `SELECT` queries.
- [ ] Anon REST call on `/rest/v1/leads` returns `[]` (RLS holds).
- [ ] MCP client lists live tables when asked.
- [ ] (If deploying) `vercel env ls production` shows the 4 Supabase variables; production URL returns 200.
- [ ] New entry in [docs/DECISION_LOG.md](./DECISION_LOG.md) recording the Supabase project choice.
- [ ] [docs/HANDOVER.md](./HANDOVER.md) "Current state" updated to say Supabase is now connected.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `npm install` or `supabase login` fails with `UNABLE_TO_VERIFY_LEAF_SIGNATURE` | Local TLS-inspection proxy | `$env:NODE_EXTRA_CA_CERTS = "$PWD\node-cacerts.pem"` in the same shell. Never disable `strict-ssl`. |
| `supabase db push` errors `relation "X" already exists` | Migrations already applied, or target project has pre-existing tables | Confirm target is not `salespilot`. Use `supabase db reset --linked` only on a fresh project — it drops every table. |
| `gen types` produces empty `Database` interface | CLI hitting wrong project, or migrations didn't apply | Re-check `supabase projects list`; verify tables exist in Table Editor. |
| App boots but Supabase calls return "permission denied for table X" | Signed-in user has no matching `user_roles` row | Insert it via SQL Editor: `insert into public.user_roles (user_id, tenant_id, role) values ('<auth-user-id>', '<tenant-id>', 'doctor');` |
| Vercel deploy succeeds but live URL returns 500 with "Invalid URL" | Env vars set on `Preview` only (or vice versa) | `vercel env ls` to confirm scope; re-add to the right scope and redeploy. |
| `next/image` complains about external host when serving Supabase Storage photos later | `next.config.ts` `images.remotePatterns` is empty | Add `{ protocol: "https", hostname: "<ref>.supabase.co" }` to `remotePatterns`. |
| Free project paused unexpectedly | 7 days of zero API activity | Dashboard → Restore project (one click). Set up a daily cron ping during development to keep it warm. |

---

## What comes next (not in this guide)

After this guide, the next blocks on [docs/tasks.md](./tasks.md):

1. Write the `create_lead()` security-definer RPC (Claude/DB-agent owned — touches RLS).
2. Add the missing `ai_runs`, `notifications`, `doctor_embeddings` (pgvector) tables.
3. Set up the OTP service for phone verification at lead submission.
4. Pick and wire the SMS/WhatsApp provider (MSG91 / Gupshup / Twilio).
5. Provision the Vercel AI Gateway and migrate [lib/demo-ai.ts](../lib/demo-ai.ts) to call live agents.
6. Add per-route server guards and audit-log writes per [docs/RBAC.md](./RBAC.md).

Each has its own decision record and setup steps. This guide stops at "Supabase is live and the app reads it."
