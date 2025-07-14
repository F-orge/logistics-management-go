-- Add up migration script here

create type crm.lead_status as enum (
  'new','qualified','contacted','unqualified'
);

create table crm.leads (
  id uuid not null primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone_number text,
  company_name text,
  lead_source text,
  lead_status crm.lead_status not null,
  lead_score integer not null default 0,
  converted_to_contact_id uuid references crm.contacts(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);