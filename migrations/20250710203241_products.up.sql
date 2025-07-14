-- Add up migration script here
create table crm.products (
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  price decimal(10,2) not null,
  sku text unique,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table crm.opportunity_products (
  id uuid not null primary key default gen_random_uuid(),
  opportunity_id uuid not null references crm.opportunities(id),
  product_id uuid not null references crm.products(id),
  quantity decimal(10,2) not null default 1,
  unit_price decimal(10,2) not null,
  total_price decimal(10,2) generated always as (quantity * unit_price) stored,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);