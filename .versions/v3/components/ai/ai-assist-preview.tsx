"use client";

import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  FileText,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { formatFee, type DoctorFixture } from "@/lib/demo-directory";
import {
  AI_PREVIEW_EXAMPLES,
  matchSmartSearchIntent,
  previewLeadAssistant,
  previewSymptomTriage,
} from "@/lib/demo-ai";

export function AiAssistPreview() {
  const [smartQuery, setSmartQuery] = useState<string>(AI_PREVIEW_EXAMPLES.smartSearch[0]);
  const [leadIssue, setLeadIssue] = useState<string>(AI_PREVIEW_EXAMPLES.leadAssistant[0]);
  const [leadPhone, setLeadPhone] = useState("9876543210");
  const [triageSymptoms, setTriageSymptoms] = useState<string>(
    AI_PREVIEW_EXAMPLES.triage[0],
  );

  const smartResult = useMemo(() => matchSmartSearchIntent(smartQuery), [smartQuery]);
  const leadResult = useMemo(
    () => previewLeadAssistant(leadIssue, leadPhone),
    [leadIssue, leadPhone],
  );
  const triageResult = useMemo(
    () => previewSymptomTriage(triageSymptoms),
    [triageSymptoms],
  );

  return (
    <main className="min-h-dvh bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Brain className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-medium text-primary">Local AI assist preview</p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Patient matching and triage surfaces
              </h1>
            </div>
          </div>
          <div className="grid w-full gap-2 sm:w-auto sm:flex sm:flex-wrap">
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/">Public search</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/dashboard">Lead pipeline</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/roles">Role workspaces</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto" variant="outline">
              <Link href="/booking">Booking preview</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/admin">Admin review</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="border-b bg-secondary/35">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[1fr_380px]">
          <div>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Validate AI-first UX locally before real agents are connected.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              These panels simulate Smart Search, Lead-Form Assistant and Symptom
              Triage using deterministic fixtures. They do not call models, prompts,
              databases, Supabase tools or Vercel AI Gateway.
            </p>
          </div>
          <BoundaryPanel />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <SmartSearchPanel
            query={smartQuery}
            result={smartResult}
            setQuery={setSmartQuery}
          />
          <LeadAssistantPanel
            issue={leadIssue}
            phone={leadPhone}
            result={leadResult}
            setIssue={setLeadIssue}
            setPhone={setLeadPhone}
          />
        </div>

        <aside className="space-y-6 xl:sticky xl:top-6 xl:self-start">
          <SymptomTriagePanel
            result={triageResult}
            setSymptoms={setTriageSymptoms}
            symptoms={triageSymptoms}
          />
          <section className="rounded-lg border p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" aria-hidden />
              <h2 className="font-semibold">Production ownership boundary</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Real AI remains Claude and AI-agent owned. Production flows must use
              Vercel AI Gateway, audit logs, DPDP consent and redaction guardrails,
              plus RLS-scoped tools. This route is only a UI contract preview.
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}

function SmartSearchPanel({
  query,
  result,
  setQuery,
}: {
  query: string;
  result: ReturnType<typeof matchSmartSearchIntent>;
  setQuery: (query: string) => void;
}) {
  return (
    <section className="rounded-lg border bg-background">
      <PanelHeader
        description="Free-text patient intent maps to a specialty and ranked local doctors."
        icon={Search}
        title="Smart Search & Match"
      />
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_320px]">
        <div>
          <label className="text-sm font-medium" htmlFor="smart-search-query">
            Patient search text
          </label>
          <textarea
            className="mt-2 min-h-28 w-full resize-none rounded-md border bg-background px-3 py-3 text-sm leading-6 outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2"
            id="smart-search-query"
            onChange={(event) => setQuery(event.target.value)}
            value={query}
          />
          <ExampleButtons
            examples={AI_PREVIEW_EXAMPLES.smartSearch}
            onSelect={setQuery}
          />
        </div>

        <ResultCard>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                Suggested specialty
              </p>
              <h3 className="mt-1 text-lg font-semibold">{result.matchedIntent.specialty}</h3>
            </div>
            <span className="rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
              {result.matchedIntent.confidence}% local confidence
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{result.explanation}</p>
          <KeywordList keywords={result.matchedKeywords} />
        </ResultCard>
      </div>

      <div className="border-t p-5">
        <h3 className="text-sm font-semibold">Suggested doctors</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {result.suggestedDoctors.map((doctor) => (
            <DoctorSuggestionCard doctor={doctor} key={doctor.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadAssistantPanel({
  issue,
  phone,
  result,
  setIssue,
  setPhone,
}: {
  issue: string;
  phone: string;
  result: ReturnType<typeof previewLeadAssistant>;
  setIssue: (issue: string) => void;
  setPhone: (phone: string) => void;
}) {
  return (
    <section className="rounded-lg border bg-background">
      <PanelHeader
        description="Normalizes patient issue text and previews phone validation guidance."
        icon={FileText}
        title="Lead-Form Assistant"
      />
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium" htmlFor="lead-issue">
              Patient issue
            </label>
            <textarea
              className="mt-2 min-h-28 w-full resize-none rounded-md border bg-background px-3 py-3 text-sm leading-6 outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2"
              id="lead-issue"
              onChange={(event) => setIssue(event.target.value)}
              value={issue}
            />
            <ExampleButtons
              examples={AI_PREVIEW_EXAMPLES.leadAssistant}
              onSelect={setIssue}
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="lead-phone">
              Patient phone
            </label>
            <div className="mt-2 flex min-h-11 items-center gap-2 rounded-md border px-3">
              <Phone className="size-4 text-primary" aria-hidden />
              <input
                className="w-full bg-transparent text-sm outline-none"
                id="lead-phone"
                onChange={(event) => setPhone(event.target.value)}
                value={phone}
              />
            </div>
          </div>
        </div>

        <ResultCard>
          <p className="text-xs font-medium uppercase text-muted-foreground">
            Normalized preview
          </p>
          <h3 className="mt-1 font-semibold">{result.issueSummary}</h3>
          <div className="mt-4 space-y-3 text-sm">
            <StatusLine label="Likely specialty" value={result.likelySpecialty} />
            <StatusLine label="Suggested doctor" value={result.suggestedDoctor.name} />
            <StatusLine
              label="Phone"
              tone={result.phone.valid ? "success" : "warning"}
              value={result.phone.valid ? result.phone.normalized : "Needs correction"}
            />
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {result.phone.guidance}
          </p>
          {result.missingFields.length > 0 ? (
            <div className="mt-4 rounded-md border border-destructive/35 bg-destructive/5 p-3">
              <p className="text-sm font-medium text-destructive">Missing before live save</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {result.missingFields.join(", ")}
              </p>
            </div>
          ) : (
            <div className="mt-4 flex items-start gap-2 rounded-md bg-accent p-3 text-sm text-accent-foreground">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
              Ready for server-side validation preview.
            </div>
          )}
        </ResultCard>
      </div>
    </section>
  );
}

function SymptomTriagePanel({
  result,
  setSymptoms,
  symptoms,
}: {
  result: ReturnType<typeof previewSymptomTriage>;
  setSymptoms: (symptoms: string) => void;
  symptoms: string;
}) {
  return (
    <section className="rounded-lg border bg-background">
      <PanelHeader
        description="Maps symptoms to a specialty and escalates local red-flag terms."
        icon={Stethoscope}
        title="Symptom Triage"
      />
      <div className="p-5">
        <label className="text-sm font-medium" htmlFor="triage-symptoms">
          Symptoms
        </label>
        <textarea
          className="mt-2 min-h-28 w-full resize-none rounded-md border bg-background px-3 py-3 text-sm leading-6 outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2"
          id="triage-symptoms"
          onChange={(event) => setSymptoms(event.target.value)}
          value={symptoms}
        />
        <ExampleButtons examples={AI_PREVIEW_EXAMPLES.triage} onSelect={setSymptoms} />

        <div
          className={
            result.emergency
              ? "mt-5 rounded-lg border border-destructive/35 bg-destructive/5 p-4"
              : "mt-5 rounded-lg border bg-secondary/50 p-4"
          }
        >
          <div className="flex items-start gap-3">
            {result.emergency ? (
              <AlertTriangle className="mt-1 size-5 shrink-0 text-destructive" aria-hidden />
            ) : (
              <Sparkles className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
            )}
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                {result.emergency ? "Emergency red flag" : "Suggested specialty"}
              </p>
              <h3 className="mt-1 font-semibold">{result.suggestedSpecialty}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {result.guidance}
              </p>
            </div>
          </div>
          <KeywordList keywords={result.matchedKeywords} />
        </div>

        <p className="mt-4 rounded-md bg-accent p-3 text-xs leading-5 text-accent-foreground">
          {result.disclaimer}
        </p>

        {result.suggestedDoctors.length > 0 ? (
          <div className="mt-5">
            <h3 className="text-sm font-semibold">Directory handoff</h3>
            <div className="mt-3 space-y-3">
              {result.suggestedDoctors.map((doctor) => (
                <DoctorSuggestionCard doctor={doctor} key={doctor.id} compact />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function BoundaryPanel() {
  return (
    <aside className="rounded-lg border bg-background p-5 shadow-sm">
      <ShieldCheck className="size-5 text-primary" aria-hidden />
      <h2 className="mt-4 font-semibold">Implementation boundary</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        Fixture-backed previews only. Production agents must run through Vercel
        AI Gateway with audit logging, DPDP consent handling, PII redaction,
        rate limits and RLS-scoped Supabase tools.
      </p>
    </aside>
  );
}

function PanelHeader({
  description,
  icon: Icon,
  title,
}: {
  description: string;
  icon: typeof Search;
  title: string;
}) {
  return (
    <div className="border-b p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
          <Icon className="size-4" aria-hidden />
        </span>
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border bg-secondary/35 p-4">{children}</div>;
}

function ExampleButtons({
  examples,
  onSelect,
}: {
  examples: readonly string[];
  onSelect: (example: string) => void;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {examples.map((example) => (
        <Button
          className="h-auto whitespace-normal text-left leading-5"
          key={example}
          onClick={() => onSelect(example)}
          size="sm"
          type="button"
          variant="outline"
        >
          {example}
        </Button>
      ))}
    </div>
  );
}

function KeywordList({ keywords }: { keywords: string[] }) {
  if (keywords.length === 0) {
    return (
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        No local keyword hit yet; fixture fallback is active.
      </p>
    );
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {keywords.map((keyword) => (
        <span className="rounded-md bg-background px-2 py-1 text-xs font-medium" key={keyword}>
          {keyword}
        </span>
      ))}
    </div>
  );
}

function StatusLine({
  label,
  tone = "default",
  value,
}: {
  label: string;
  tone?: "default" | "success" | "warning";
  value: string;
}) {
  const valueClass =
    tone === "success"
      ? "text-primary"
      : tone === "warning"
        ? "text-destructive"
        : "text-foreground";

  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-right font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}

function DoctorSuggestionCard({
  compact = false,
  doctor,
}: {
  compact?: boolean;
  doctor: DoctorFixture;
}) {
  return (
    <article className="rounded-lg border bg-background p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold">{doctor.name}</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            {doctor.specialty} / {doctor.area}
          </p>
        </div>
        <span className="shrink-0 rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
          {doctor.rating}
        </span>
      </div>
      {compact ? null : (
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{doctor.summary}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        <span>{doctor.nextAvailable}</span>
        <span>{formatFee(doctor.feePaise)}</span>
      </div>
    </article>
  );
}
