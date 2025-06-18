-- Add up migration script here
create table warehouses (
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique,
  address text not null,
  longitude decimal not null,
  latitude decimal not null,
  manager uuid references auth.users(id),
  created timestamptz not null default now(),
  updated timestamptz not null default now()
)