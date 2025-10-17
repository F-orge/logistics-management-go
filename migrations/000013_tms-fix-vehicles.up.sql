alter table tms.vehicles
  add column if not exists make text,
  add column if not exists year integer,
  add column if not exists vin text,
  add column if not exists current_mileage integer,
  add column if not exists last_maintenance_date date;

