-- Add up migration script here
create table vehicles(
  id uuid not null primary key default gen_random_uuid(),
  license_plate text not null unique,
  make text not null,
  model text not null,
  type text not null,
  capacity_volume decimal not null,
  capacity_weight decimal not null,
  status text not null check (status in ('available','in-use','maintenance','out-of-service')),
  current_driver uuid references auth.users(id),
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);