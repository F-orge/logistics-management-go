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
drop table if exists public.crm_notifications;

drop table if exists public.crm_invoice_line_items;

drop table if exists public.crm_invoices;

drop table if exists public.lms_provider_invoice_line_items;

drop table if exists public.lms_provider_invoices;

drop table if exists public.lms_provider_performance;

drop table if exists public.lms_route_shipments;

drop table if exists public.lms_routes;

drop table if exists public.lms_transport_legs;

drop table if exists public.org_vehicles;

drop table if exists public.org_drivers;

drop table if exists public.lms_provider_rates;

drop table if exists public.lms_provider_services;

drop table if exists public.lms_transportation_providers;

drop table if exists public.lms_warehouse_inventories;

drop table if exists public.lms_warehouses;

drop table if exists public.lms_tracking_events;

drop table if exists public.lms_packages;

drop table if exists public.lms_shipments;

drop table if exists public.lms_pricing_rates;

drop table if exists public.lms_pricing_zones;

drop table if exists public.lms_shipping_services;

-- Remove foreign key columns from CRM tables
alter table public.crm_contacts
  drop column if exists address_id;

alter table public.crm_companies
  drop column if exists address_id;

-- Drop the addresses table
drop table if exists public.lms_addresses;

-- Drop all ENUMs in reverse dependency order
drop type if exists public.crm_notification_delivery_status;

drop type if exists public.crm_notification_channel;

drop type if exists public.crm_notification_type;

drop type if exists public.crm_invoice_status;

drop type if exists public.lms_provider_invoice_status;

drop type if exists public.lms_performance_metric_type;

drop type if exists public.lms_delivery_status;

drop type if exists public.lms_route_status;

drop type if exists public.lms_leg_status;

drop type if exists public.lms_transport_leg_type;

drop type if exists public.lms_provider_type;

drop type if exists public.lms_warehouse_inventory_status;

drop type if exists public.lms_warehouse_type;

drop type if exists public.lms_tracking_event_type;

drop type if exists public.lms_package_type;

drop type if exists public.lms_shipment_status;

drop type if exists public.lms_transport_mode;

drop type if exists public.lms_service_type;

drop type if exists public.lms_address_type;

-- Drop org schema ENUMs
drop type if exists public.org_vehicle_status;

drop type if exists public.org_vehicle_type;

drop type if exists public.org_driver_status;

