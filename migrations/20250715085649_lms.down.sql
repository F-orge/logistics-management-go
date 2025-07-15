-- Add down migration script here
drop table crm.notifications;

drop table crm.invoice_line_items;

drop table crm.invoices;

drop table lms.provider_invoice_line_items;

drop table lms.provider_invoices;

drop table lms.provider_performance;

drop table lms.route_shipments;

drop table lms.routes;

drop table lms.transport_legs;

drop table org.vehicles;

drop table org.drivers;

drop table lms.provider_rates;

drop table lms.provider_services;

drop table lms.transportation_providers;

drop table lms.warehouse_inventories;

drop table lms.warehouses;

drop table lms.tracking_events;

drop table lms.packages;

drop table lms.shipments;

drop table lms.pricing_rates;

drop table lms.pricing_zones;

drop table lms.shipping_services;

alter table crm.contacts drop column address_id;

alter table crm.companies drop column address_id;

drop table lms.addresses;

drop schema lms;