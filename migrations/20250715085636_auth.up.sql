-- Add up migration script here
create schema auth;

create table auth.users (
  id uuid not null primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  email_verified boolean not null default false,
  password_hash text not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);