-- Drop tables in reverse order to handle foreign keys
drop table if exists tms.partner_invoice_items;

drop table if exists tms.partner_invoices;

drop table if exists tms.shipment_leg_events;

drop table if exists tms.shipment_legs;

drop table if exists tms.carrier_rates;

drop table if exists tms.carriers;

drop table if exists tms.geofence_events;

drop table if exists tms.geofences;

drop table if exists tms.expenses;

drop table if exists tms.proof_of_deliveries;

drop table if exists tms.routes;

drop table if exists tms.gps_pings;

drop table if exists tms.trip_stops;

drop table if exists tms.trips;

drop table if exists tms.vehicle_maintenance;

drop table if exists tms.vehicles;

drop table if exists tms.driver_schedules;

drop table if exists tms.drivers;

-- Drop TMS enum types
drop type if exists tms.partner_invoice_status_enum;

drop type if exists tms.shipment_leg_status_enum;

drop type if exists tms.carrier_rate_unit_enum;

drop type if exists tms.geofence_event_type_enum;

drop type if exists tms.currency_enum;

drop type if exists tms.expense_status_enum;

drop type if exists tms.expense_type_enum;

drop type if exists tms.proof_type_enum;

drop type if exists tms.trip_stop_status_enum;

drop type if exists tms.trip_status_enum;

drop type if exists tms.vehicle_service_type_enum;

drop type if exists tms.vehicle_status_enum;

drop type if exists tms.driver_schedule_reason_enum;

drop type if exists tms.driver_status_enum;

-- Drop TMS schema
drop schema if exists tms cascade;

