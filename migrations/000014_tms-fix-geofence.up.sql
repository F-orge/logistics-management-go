alter table tms.geofences
  drop column if exists coordinates;

alter table tms.geofences
  add column if not exists longitude real,
  add column if not exists latitude real;

