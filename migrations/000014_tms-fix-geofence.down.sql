alter table tms.geofences
  drop column if exists longitude,
  drop column if exists latitude;

alter table tms.geofences
  add column if not exists coordinates text;

