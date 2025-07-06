-- Drop all tables and schema in reverse order of creation

-- Drop indexes
drop index if exists idx_activities_contact_id;
drop index if exists idx_activities_company_id;
drop index if exists idx_contacts_email;
drop index if exists idx_links_link;
drop index if exists idx_links_contact_id;
drop index if exists idx_links_company_id;

-- Drop tables
drop table if exists crm.links;
drop table if exists crm.tasks;
drop table if exists crm.deals;
drop table if exists crm.activities;
drop table if exists crm.contacts;
drop table if exists crm.companies;

-- Drop enums
drop type if exists task_status;
drop type if exists deal_status;

-- Drop schema
drop schema if exists crm cascade;