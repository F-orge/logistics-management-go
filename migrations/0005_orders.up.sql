-- Add up migration script here
create table orders (
  id uuid not null primary key default gen_random_uuid(),
  custom_id text not null unique,
  customer uuid not null references companies(id),
  order_date timestamptz not null default now(),
  status text not null check (status in ('pending-validation','validated','allocated','picking','packing','ready-for-shipment','shipped','delivered','cancelled','on-hold')),
  total_amount decimal not null,
  created_by uuid not null references auth.users(id),
  shipping_address text not null,
  billing_address text not null,
  assigned_warehouse uuid not null references warehouses(id),
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

create table order_line_items (
  id uuid not null primary key default gen_random_uuid(),
  "order" uuid not null references orders(id),
  product uuid not null references products(id),
  quantity integer not null check (quantity >= 1),
  price_per_unit decimal not null check (price_per_unit >= 0),
  sub_total decimal generated always as (quantity * price_per_unit) stored,
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);