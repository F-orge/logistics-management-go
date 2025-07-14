-- Add up migration script here

create type crm.opportunity_stage as enum (
  'prospecting','qualification','proposal','closed-won','closed-lost'
);

create table crm.opportunities (
  id uuid not null primary key default gen_random_uuid(),
  name text not null,
  company_id uuid references crm.companies(id),
  primary_contact_id uuid references crm.contacts(id),
  stage crm.opportunity_stage not null,
  amount decimal(10,2) not null default 0.00,
  close_date date,
  probability decimal(5,2) not null default 0.00,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create type crm.interaction_type as enum (
  'call','email','meeting','chat','note'
);

create table crm.interactions (
  id uuid not null primary key default gen_random_uuid(),
  type crm.interaction_type not null,
  subject text,
  description text,
  interaction_date timestamp with time zone not null,
  contact_id uuid references crm.contacts(id),
  opportunity_id uuid references crm.opportunities(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);