-- Add up migration script here
create table lms.shipping_services(
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  service_type text not null,
  max_weight decimal(10,2),
  max_dimensions jsonb,
  delivery_time_min integer,
  delivery_time_max integer,
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);