-- Add up migration script here
create type crm.case_status as enum (
  'open','in-progress','pending-customer','closed'
);

create type crm.case_priority as enum (
  'low','medium','high','critical'
);

create table crm.cases (
  id uuid not null primary key default gen_random_uuid(),
  subject text not null,
  description text not null,
  status crm.case_status not null,
  priority crm.case_priority not null,
  contact_id uuid references crm.contacts(id),
  closed_at timestamp with time zone,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);