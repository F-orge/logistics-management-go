-- Add up migration script here
create table lms.warehouses(
  id uuid not null primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  address_id uuid not null references lms.addresses(id),
  warehouse_type text not null,
  capacity integer,
  department_id uuid references org.departments(id),
  is_active boolean not null default true,
  manager_id uuid references auth.users(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.warehouse_inventories(
  id uuid not null primary key default gen_random_uuid(),
  warehouse_id uuid not null references lms.warehouses(id),
  shipment_id uuid not null references lms.shipments(id),
  package_id uuid not null references lms.packages(id),
  location_code text,
  status text not null,
  arrived_at timestamptz,
  departed_at timestamptz,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);