alter table tms.vehicles
  drop column if exists make,
  drop column if exists year,
  drop column if exists vin,
  drop column if exists current_mileage,
  drop column if exists last_maintenance_date;

