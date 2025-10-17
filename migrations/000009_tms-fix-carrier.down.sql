alter table if exists tms.carriers
  drop column if exists "contact_person",
  drop column if exists "contact_email",
  drop column if exists "contact_phone";

alter table if exists tms.carriers
  add column if not exists "contact_details" text;

