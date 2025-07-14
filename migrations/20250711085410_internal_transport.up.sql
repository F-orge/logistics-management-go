-- Add up migration script here
create table org.drivers (
  id uuid not null primary key default gen_random_uuid(),
  employee_id text not null unique,
  first_name text not null,
  last_name text not null,
  license_number text not null unique,
  phone_number text not null,
  email text not null unique,
  hire_date date not null,
  status text not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table org.vehicles(
  id uuid not null primary key default gen_random_uuid(),
  vehicle_number text not null unique,
  license_plate text not null unique,
  vehicle_type text not null,
  make text not null,
  model text not null,
  year integer not null,
  capacity_weight decimal(10,2),
  capacity_volume decimal(10,2),
  department_id uuid references org.departments(id),
  warehouse_id uuid references lms.warehouses(id),
  status text not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);