-- Add down migration script here
-- Drop constraints first
alter table crm.opportunity_products
  drop constraint if exists check_opportunity_products_quantity_positive;

alter table crm.opportunity_products
  drop constraint if exists check_opportunity_products_unit_price_positive;

alter table crm.products
  drop constraint if exists check_products_price_positive;

alter table crm.products
  drop constraint if exists check_products_name_not_empty;

alter table crm.cases
  drop constraint if exists check_cases_subject_not_empty;

alter table crm.cases
  drop constraint if exists check_cases_description_not_empty;

alter table crm.campaigns
  drop constraint if exists check_campaigns_date_order;

alter table crm.campaigns
  drop constraint if exists check_campaigns_budget_positive;

alter table crm.campaigns
  drop constraint if exists check_campaigns_name_not_empty;

alter table crm.opportunities
  drop constraint if exists check_opportunities_amount_positive;

alter table crm.opportunities
  drop constraint if exists check_opportunities_probability_range;

alter table crm.opportunities
  drop constraint if exists check_opportunities_name_not_empty;

alter table crm.leads
  drop constraint if exists check_leads_email_format;

alter table crm.leads
  drop constraint if exists check_leads_score_range;

alter table crm.leads
  drop constraint if exists check_leads_names_not_empty;

alter table crm.contacts
  drop constraint if exists check_contacts_email_format;

alter table crm.contacts
  drop constraint if exists check_contacts_names_not_empty;

alter table crm.companies
  drop constraint if exists check_companies_email_format;

alter table crm.companies
  drop constraint if exists check_companies_website_format;

alter table crm.companies
  drop constraint if exists check_companies_name_not_empty;

-- Drop indexes
drop index if exists idx_crm_opportunity_products_product_id;

drop index if exists idx_crm_opportunity_products_opportunity_id;

drop index if exists idx_crm_products_sku;

drop index if exists idx_crm_products_name;

drop index if exists idx_crm_cases_priority;

drop index if exists idx_crm_cases_status;

drop index if exists idx_crm_cases_contact_id;

drop index if exists idx_crm_campaign_contacts_status;

drop index if exists idx_crm_campaign_contacts_contact_id;

drop index if exists idx_crm_campaign_contacts_campaign_id;

drop index if exists idx_crm_campaigns_start_date;

drop index if exists idx_crm_campaigns_status;

drop index if exists idx_crm_interactions_type;

drop index if exists idx_crm_interactions_date;

drop index if exists idx_crm_interactions_opportunity_id;

drop index if exists idx_crm_interactions_contact_id;

drop index if exists idx_crm_opportunities_close_date;

drop index if exists idx_crm_opportunities_stage;

drop index if exists idx_crm_opportunities_contact_id;

drop index if exists idx_crm_opportunities_company_id;

drop index if exists idx_crm_leads_converted;

drop index if exists idx_crm_leads_score;

drop index if exists idx_crm_leads_status;

drop index if exists idx_crm_leads_email;

drop index if exists idx_crm_contacts_name;

drop index if exists idx_crm_contacts_status;

drop index if exists idx_crm_contacts_company_id;

drop index if exists idx_crm_contacts_email;

drop index if exists idx_crm_companies_email;

drop index if exists idx_crm_companies_industry;

drop index if exists idx_crm_companies_name;

-- Drop tables in dependency order
drop table if exists crm.opportunity_products;

drop table if exists crm.products;

drop table if exists crm.cases;

drop type if exists crm.case_priority;

drop type if exists crm.case_status;

drop table if exists crm.campaign_contacts;

drop type if exists crm.campaign_contacts_status;

drop table if exists crm.campaigns;

drop type if exists crm.campaign_status;

drop table if exists crm.interactions;

drop type if exists crm.interaction_type;

drop table if exists crm.opportunities;

drop type if exists crm.opportunity_stage;

drop table if exists crm.leads;

drop type if exists crm.lead_status;

drop table if exists crm.contacts;

drop type if exists crm.contact_status;

drop table if exists crm.companies;

drop schema if exists crm;

