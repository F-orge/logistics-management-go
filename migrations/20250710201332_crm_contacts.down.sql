-- Add down migration script here
drop table crm.contacts;

drop type crm.contact_status;

drop table crm.companies;

drop schema crm;
