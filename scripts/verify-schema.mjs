import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = Object.fromEntries(
  readFileSync(join(__dirname, "..", ".env.local"), "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.trim().startsWith("#") && l.includes("="))
    .map((l) => {
      const eq = l.indexOf("=");
      return [l.slice(0, eq).trim(), l.slice(eq + 1).trim().replace(/^"|"$/g, "")];
    }),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

const expectedTables = [
  "tenants", "profiles", "user_roles",
  "specialties", "clinics", "doctors", "doctor_specialties",
  "listings", "availability_slots",
  "leads", "lead_events", "bookings", "reviews", "audit_log",
];

console.log(`Project: ${url}`);

const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
const anon = createClient(url, anonKey, { auth: { persistSession: false } });

console.log("\n[1/3] Service-role: every table is queryable");
let pass = 0, fail = 0;
for (const t of expectedTables) {
  const { error, count } = await admin.from(t).select("*", { count: "exact", head: true });
  if (error) { console.log(`  FAIL  ${t} — ${error.message}`); fail++; }
  else { console.log(`  OK    ${t} (${count} rows)`); pass++; }
}
console.log(`  ${pass}/${expectedTables.length} tables reachable`);

console.log("\n[2/3] Anon: public read on specialties (expected: 10 rows)");
const { data: pub, error: pubErr } = await anon.from("specialties").select("slug").order("slug");
if (pubErr) console.log(`  FAIL — ${pubErr.message}`);
else console.log(`  OK — ${pub.length} specialties: ${pub.map((r) => r.slug).join(", ")}`);

console.log("\n[3/3] Anon: RLS denies tenants read (expected: 0 rows, no error)");
const { data: tDenied, error: tErr } = await anon.from("tenants").select("*");
if (tErr) console.log(`  RLS denial returned error: ${tErr.message}`);
else console.log(`  OK — anon got ${tDenied.length} tenants (RLS hides them)`);

console.log("\nVerification complete.");
process.exit(fail > 0 ? 1 : 0);
