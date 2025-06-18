-- Add up migration script here
create table products (
  id uuid not null primary key default gen_random_uuid(),
  sku text not null unique,
  name text not null,
  description text,
  width text not null,
  height text not null,
  length text not null,
  cost decimal not null,
  supplier uuid references companies(id),
  image_url text,
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);