-- Add up migration script here

create type table_permission_enum as enum ('read','write','update','delete');

create table roles (
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

create table role_permissions (
  id uuid not null primary key default gen_random_uuid(),
  role_id uuid not null references roles(id), 
  target_table text not null,
  permission table_permission_enum[] not null,
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

alter table users add column role_id uuid references roles(id);


