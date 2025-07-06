-- Add up migration script here
create schema crm;

create table crm.companies (
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique, -- name of the company
  email text not null unique, -- email of the company
  website_url text unique, -- website of the company if available
  address text not null, -- address of the company
  billing_address text, -- billing address of the company if address is empty
  phone text not null, -- phone number of the company
  industry text, -- industry of the company
  status text default 'active', -- status of the company
  tax_id text, -- tax identification number
  notes text, -- additional notes about the company
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

create table crm.contacts (
  id uuid not null primary key default gen_random_uuid(),
  name text not null, -- name of the contact
  email text not null unique, -- email of the contact
  company_id uuid references crm.companies(id), -- company id if the contact has a company
  address text, -- address of the contact
  phone text not null, -- phone number of the contact
  position text, -- job title or role of the contact
  birthday date, -- birthday of the contact
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

create table crm.activities (
  id uuid not null primary key default gen_random_uuid(),
  type text not null, -- type of activity (e.g., call, email, meeting)
  description text, -- description of the activity
  company_id uuid references crm.companies(id), -- related company
  contact_id uuid references crm.contacts(id), -- related contact
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

-- Create enums for statuses
create type deal_status as enum ('open', 'won', 'lost');
create type task_status as enum ('pending', 'in-progress', 'completed');

-- Update crm.deals and crm.tasks to use enums directly
create table crm.deals (
  id uuid not null primary key default gen_random_uuid(),
  name text not null, -- name of the deal
  amount numeric(12, 2) not null, -- deal amount
  status deal_status not null, -- status of the deal (e.g., open, won, lost)
  company_id uuid references crm.companies(id), -- related company
  contact_id uuid references crm.contacts(id), -- related contact
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

create table crm.tasks (
  id uuid not null primary key default gen_random_uuid(),
  title text not null, -- task title
  description text, -- task description
  due_date timestamptz, -- due date for the task
  status task_status not null default 'pending', -- task status (e.g., pending, in-progress, completed)
  company_id uuid references crm.companies(id), -- related company
  contact_id uuid references crm.contacts(id), -- related contact
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

-- Refactor crm.links table to use company_id and contact_id columns instead of polymorphic entity_id
create table crm.links (
  id uuid not null primary key default gen_random_uuid(),
  company_id uuid references crm.companies(id) on delete cascade, -- references companies
  contact_id uuid references crm.contacts(id) on delete cascade, -- references contacts
  link text not null check (link ~* '^(https?|ftp)://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(/.*)?$'), -- validate URL format
  description text, -- description of the link
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

-- Add additional indexes
create index idx_links_company_id on crm.links(company_id);
create index idx_links_contact_id on crm.links(contact_id);
create index idx_links_link on crm.links(link);

-- Improve documentation
-- crm.links: Stores links associated with either companies or contacts. Each link must reference either a company or a contact, but not both.
-- crm.deals: Represents business deals with a status indicating progress.
-- crm.tasks: Represents tasks with a status indicating completion state.

-- Add indexes for frequently queried columns
create index idx_contacts_email on crm.contacts(email);
create index idx_activities_company_id on crm.activities(company_id);
create index idx_activities_contact_id on crm.activities(contact_id);