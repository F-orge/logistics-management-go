-- Add up migration script here
create schema crm;

create table crm.companies (
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  email text,
  website text,
  address text,
  industry text,
  phone_number text,
  city text,
  state text,
  zip_code text,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create type crm.contact_status as enum (
  'lead','prospect','customer','inactive'
);

create table crm.contacts (
  id uuid not null primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone_number text,
  job_title text,
  lead_source text,
  status crm.contact_status not null,
  birth_date text,
  address text,
  company_id uuid references crm.companies(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);