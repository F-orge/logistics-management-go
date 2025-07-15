-- Add up migration script here
create schema crm;

create table crm.companies (
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  email text,
  website text,
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
  company_id uuid references crm.companies(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

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

create type crm.campaign_status as enum (
  'planned','active','completed','paused'
);

create table crm.campaigns (
  id uuid not null primary key default gen_random_uuid(),
  name text not null,
  description text,
  start_date date not null,
  end_date date,
  budget decimal(10,2) default 0.00,
  status crm.campaign_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create type crm.campaign_contacts_status as enum (
  'sent','opened','clicked','responded','unsubscribe'
);

create table crm.campaign_contacts(
  id uuid not null primary key default gen_random_uuid(),
  campaign_id uuid not null references crm.campaigns(id),
  contact_id uuid not null references crm.contacts(id),
  status crm.campaign_contacts_status not null,
  interaction_date timestamp with time zone,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

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

create table crm.products (
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  price decimal(10,2) not null,
  sku text unique,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table crm.opportunity_products (
  id uuid not null primary key default gen_random_uuid(),
  opportunity_id uuid not null references crm.opportunities(id),
  product_id uuid not null references crm.products(id),
  quantity decimal(10,2) not null default 1,
  unit_price decimal(10,2) not null,
  total_price decimal(10,2) generated always as (quantity * unit_price) stored,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);