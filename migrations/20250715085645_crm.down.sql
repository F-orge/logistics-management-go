-- Add down migration script here
drop table crm.opportunity_products;

drop table crm.products;

drop table crm.cases;

drop type crm.case_priority;

drop type crm.case_status;

drop table crm.campaign_contacts;

drop type crm.campaign_contacts_status;

drop table crm.campaigns;

drop type crm.campaign_status;

drop table crm.interactions;

drop type crm.interaction_type;

drop table crm.opportunities;

drop type crm.opportunity_stage;

drop table crm.leads;

drop type crm.lead_status;

drop table crm.contacts;

drop type crm.contact_status;

drop table crm.companies;

drop schema crm;