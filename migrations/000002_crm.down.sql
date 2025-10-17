-- Drop tables in reverse order (due to foreign key dependencies)
drop table if exists crm.taggings;

drop table if exists crm.attachments;

drop table if exists crm.notifications;

drop table if exists crm.invoice_items;

drop table if exists crm.invoices;

drop table if exists crm.opportunity_products;

drop table if exists crm.interactions;

drop table if exists crm.cases;

drop table if exists crm.leads;

drop table if exists crm.opportunities;

drop table if exists crm.contacts;

drop table if exists crm.companies;

drop table if exists crm.campaigns;

drop table if exists crm.products;

drop table if exists crm.tags;

-- Drop enum types
drop type if exists crm.record_type;

drop type if exists crm.payment_method;

drop type if exists crm.invoice_status;

drop type if exists crm.interaction_type;

drop type if exists crm.case_type;

drop type if exists crm.case_priority;

drop type if exists crm.case_status;

drop type if exists crm.opportunity_stage;

drop type if exists crm.opportunity_source;

drop type if exists crm.product_type;

drop type if exists crm.lead_source;

drop type if exists crm.lead_status;

-- Drop CRM schema
drop schema if exists crm cascade;

