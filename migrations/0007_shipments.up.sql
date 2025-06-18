-- Add up migration script here

create table departments(
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

create table department_members(
  department_id uuid not null references departments(id),
  user_id uuid not null references auth.users(id),
  role text not null check (role in ('employee','manager')),
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

create table shipments (
  id uuid not null primary key default gen_random_uuid(),
  "order" uuid not null references orders(id),
  tracking_number text not null unique,
  carrier uuid not null references companies(id),
  status text not null check (status in ('label-created','pending-pickup','in-transit','out-for-delivery','delivered','exception','returned')) default 'label-created',
  estimated_delivery_date timestamptz,
  actual_delivery_date timestamptz,
  proof_of_delivery_image_url text[],
  driver uuid references auth.users(id),
  current_location_notes text,
  department_assigned uuid references departments(id),
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);