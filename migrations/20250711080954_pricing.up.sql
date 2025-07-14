-- Add up migration script here
create table lms.pricing_zones (
  id uuid not null primary key default gen_random_uuid(),
  name text not null,
  zone_code text not null unique,
  countries jsonb not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.pricing_rates (
  id uuid not null primary key default gen_random_uuid(),
  service_id uuid not null references lms.shipping_services(id),
  origin_zone_id uuid not null references lms.pricing_zones(id),
  destination_zone_id uuid not null references lms.pricing_zones(id),
  weight_min decimal(10,2) not null,
  weight_max decimal(10,2) not null,
  base_rate decimal(10,2) not null,
  per_kg_rate decimal(10,2) not null,
  fuel_surcharge_rate decimal(5,2) default 0.00,
  effective_date date not null,
  expiry_date date,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (service_id,origin_zone_id,destination_zone_id)
);