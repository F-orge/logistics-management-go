-- Add up migration script here
create table inventory_items(
  id uuid not null primary key default gen_random_uuid(),
  product uuid not null references products(id),
  warehouse uuid not null references warehouses(id),
  quantity_on_hand integer not null check (quantity_on_hand >= 0),
  lot_number text not null,
  serial_number text not null unique,
  status text not null check (status in ('available','on-hold','allocated','damaged','in-transit-to-warehouse')) default 'available',
  expiry_date timestamptz,
  storage_location_code text not null,
  last_counted_date timestamptz,
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);