-- Add down migration script here
drop table crm.campaign_contacts;

drop type crm.campaign_contacts_status;

drop table crm.campaigns;

drop type crm.campaign_status;