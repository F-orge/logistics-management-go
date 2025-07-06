-- Remove 'deleted' column from all tables
alter table auth.users drop column if exists deleted;
alter table crm.companies drop column if exists deleted;
alter table crm.contacts drop column if exists deleted;
alter table crm.activities drop column if exists deleted;
alter table crm.deals drop column if exists deleted;
alter table crm.tasks drop column if exists deleted;
alter table crm.links drop column if exists deleted;
