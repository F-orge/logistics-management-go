-- Add 'deleted' column to all tables
alter table auth.users add column if not exists deleted boolean default false;
alter table crm.companies add column if not exists deleted boolean default false;
alter table crm.contacts add column if not exists deleted boolean default false;
alter table crm.activities add column if not exists deleted boolean default false;
alter table crm.deals add column if not exists deleted boolean default false;
alter table crm.tasks add column if not exists deleted boolean default false;
alter table crm.links add column if not exists deleted boolean default false;
