-- Add down migration script here
-- Drop all indexes first
drop index if exists idx_notifications_type;

drop index if exists idx_notifications_contact;

drop index if exists idx_notifications_shipment;

drop index if exists idx_crm_invoices_status;

drop index if exists idx_crm_invoices_date;

drop index if exists idx_crm_invoices_company;

drop index if exists idx_provider_invoices_status;

drop index if exists idx_provider_invoices_date;

drop index if exists idx_provider_invoices_provider;

drop index if exists idx_routes_vehicle;

drop index if exists idx_routes_driver;

drop index if exists idx_routes_date;

drop index if exists idx_transport_legs_vehicle;

drop index if exists idx_transport_legs_provider;

drop index if exists idx_transport_legs_shipment;

drop index if exists idx_warehouse_inventories_status;

drop index if exists idx_warehouse_inventories_shipment;

drop index if exists idx_warehouse_inventories_warehouse;

drop index if exists idx_warehouses_department;

drop index if exists idx_warehouses_code;

drop index if exists idx_tracking_events_type;

drop index if exists idx_tracking_events_timestamp;

drop index if exists idx_tracking_events_shipment;

drop index if exists idx_packages_shipment;

drop index if exists idx_shipments_department;

drop index if exists idx_shipments_receiver_company;

drop index if exists idx_shipments_sender_company;

drop index if exists idx_shipments_delivery_date;

drop index if exists idx_shipments_pickup_date;

drop index if exists idx_shipments_status;

drop index if exists idx_shipments_tracking;

drop index if exists idx_addresses_type;

drop index if exists idx_addresses_city;

drop index if exists idx_addresses_country;

-- Drop all tables in dependency order
drop table if exists crm.notifications;

drop table if exists crm.invoice_line_items;

drop table if exists crm.invoices;

drop table if exists lms.provider_invoice_line_items;

drop table if exists lms.provider_invoices;

drop table if exists lms.provider_performance;

drop table if exists lms.route_shipments;

drop table if exists lms.routes;

drop table if exists lms.transport_legs;

drop table if exists org.vehicles;

drop table if exists org.drivers;

drop table if exists lms.provider_rates;

drop table if exists lms.provider_services;

drop table if exists lms.transportation_providers;

drop table if exists lms.warehouse_inventories;

drop table if exists lms.warehouses;

drop table if exists lms.tracking_events;

drop table if exists lms.packages;

drop table if exists lms.shipments;

drop table if exists lms.pricing_rates;

drop table if exists lms.pricing_zones;

drop table if exists lms.shipping_services;

-- Remove foreign key columns from CRM tables
alter table crm.contacts
  drop column if exists address_id;

alter table crm.companies
  drop column if exists address_id;

-- Drop the addresses table
drop table if exists lms.addresses;

-- Drop all ENUMs in reverse dependency order
drop type if exists crm.notification_delivery_status;

drop type if exists crm.notification_channel;

drop type if exists crm.notification_type;

drop type if exists crm.invoice_status;

drop type if exists lms.provider_invoice_status;

drop type if exists lms.performance_metric_type;

drop type if exists lms.delivery_status;

drop type if exists lms.route_status;

drop type if exists lms.leg_status;

drop type if exists lms.transport_leg_type;

drop type if exists lms.provider_type;

drop type if exists lms.warehouse_inventory_status;

drop type if exists lms.warehouse_type;

drop type if exists lms.tracking_event_type;

drop type if exists lms.package_type;

drop type if exists lms.shipment_status;

drop type if exists lms.transport_mode;

drop type if exists lms.service_type;

drop type if exists lms.address_type;

-- Drop org schema ENUMs
drop type if exists org.vehicle_status;

drop type if exists org.vehicle_type;

drop type if exists org.driver_status;

-- Drop the schema
drop schema if exists lms;

