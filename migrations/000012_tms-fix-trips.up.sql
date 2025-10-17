alter table tms.trips
  add column if not exists end_location text,
  add column if not exists end_time timestamptz,
  add column if not exists start_location text,
  add column if not exists start_time timestamptz;

