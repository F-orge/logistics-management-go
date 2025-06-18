-- Add up migration script here
create table companies (
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique,
  type text not null check (type in ('customer','supplier','carrier','internal')),
  address text,
  contact_email text,
  contact_phone text,
  primary_contact_person uuid references auth.users(id),
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);