-- Add up migration script here
create schema lms;

create table lms.addresses (
  id uuid not null primary key default gen_random_uuid(),
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null,
  address_type text not null,
  is_validated boolean not null default false,
  latitude decimal(10,8),
  longitude decimal(11,8),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (latitude,longitude)
);