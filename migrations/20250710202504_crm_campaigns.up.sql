-- Add up migration script here

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