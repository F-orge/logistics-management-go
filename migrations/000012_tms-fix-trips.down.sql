alter table tms.trips
  drop column if exists end_location,
  drop column if exists end_time,
  drop column if exists start_location,
  drop column if exists start_time;

