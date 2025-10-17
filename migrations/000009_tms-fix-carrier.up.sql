alter table tms.carriers
  drop column if exists contactDetails;

alter table tms.carriers
  add column if not exists contact_person text,
  add column if not exists contact_email text,
  add column if not exists contact_phone text;

