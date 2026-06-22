-- Seed: global specialty master list (safe to run repeatedly).
-- Demo tenants/doctors are added by the QA/Codex seed step, not here.
insert into public.specialties (name, slug) values
  ('General Physician', 'general-physician'),
  ('Dentist', 'dentist'),
  ('Dermatologist', 'dermatologist'),
  ('Pediatrician', 'pediatrician'),
  ('Gynecologist', 'gynecologist'),
  ('Orthopedist', 'orthopedist'),
  ('ENT Specialist', 'ent-specialist'),
  ('Cardiologist', 'cardiologist'),
  ('Psychiatrist', 'psychiatrist'),
  ('Ophthalmologist', 'ophthalmologist')
on conflict (slug) do nothing;
