import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.trim().startsWith("#") && l.includes("="))
    .map((l) => {
      const eq = l.indexOf("=");
      const k = l.slice(0, eq).trim();
      const v = l.slice(eq + 1).trim().replace(/^"|"$/g, "");
      return [k, v];
    }),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Missing Supabase env in .env.local");

const supabase = createClient(url, key, { auth: { persistSession: false } });

const specialties = [
  { name: "General Physician", slug: "general-physician" },
  { name: "Dentist", slug: "dentist" },
  { name: "Dermatologist", slug: "dermatologist" },
  { name: "Pediatrician", slug: "pediatrician" },
  { name: "Gynecologist", slug: "gynecologist" },
  { name: "Orthopedist", slug: "orthopedist" },
  { name: "ENT Specialist", slug: "ent-specialist" },
  { name: "Cardiologist", slug: "cardiologist" },
  { name: "Psychiatrist", slug: "psychiatrist" },
  { name: "Ophthalmologist", slug: "ophthalmologist" },
];

const { data, error } = await supabase
  .from("specialties")
  .upsert(specialties, { onConflict: "slug", ignoreDuplicates: true })
  .select("id, name, slug");

if (error) {
  console.error("Seed failed:", error);
  process.exit(1);
}
console.log(`Seeded ${data?.length ?? 0} specialties (insert/ignore on conflict).`);

const { data: all } = await supabase.from("specialties").select("slug").order("slug");
console.log(`Total specialties in DB: ${all?.length ?? 0}`);
