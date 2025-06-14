-- Add up migration script here
create table users (
  id uuid not null primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  _password text not null,
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);