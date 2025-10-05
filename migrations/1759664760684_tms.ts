import { sql, type Kysely } from 'kysely';

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await sql`
		-- Enable UUID extension if not already enabled
		create extension if not exists "uuid-ossp";

		-- Create TMS schema
		create schema if not exists tms;

		-- Create TMS enum types
		create type tms.driver_status_enum as enum(
			'active',
			'inactive',
			'on_leave'
		);

		create type tms.driver_schedule_reason_enum as enum(
			'vacation',
			'sick_leave',
			'training',
			'personal_leave'
		);

		create type tms.vehicle_status_enum as enum(
			'available',
			'in_maintenance',
			'on_trip',
			'out_of_service'
		);

		create type tms.vehicle_service_type_enum as enum(
			'routine_maintenance',
			'repair',
			'inspection',
			'oil_change',
			'tire_replacement',
			'brake_service'
		);

		create type tms.trip_status_enum as enum(
			'planned',
			'in_progress',
			'completed',
			'cancelled'
		);

		create type tms.trip_stop_status_enum as enum(
			'pending',
			'arrived',
			'completed',
			'skipped'
		);

		create type tms.proof_type_enum as enum(
			'signature',
			'photo',
			'barcode_scan',
			'pin_verification'
		);

		create type tms.expense_type_enum as enum(
			'fuel',
			'tolls',
			'maintenance',
			'parking',
			'meals',
			'accommodation'
		);

		create type tms.expense_status_enum as enum(
			'pending',
			'approved',
			'rejected',
			'reimbursed'
		);

		create type tms.currency_enum as enum(
			'USD',
			'EUR',
			'GBP',
			'CAD',
			'AUD',
			'JPY',
			'PHP'
		);

		create type tms.geofence_event_type_enum as enum(
			'enter',
			'exit'
		);

		create type tms.carrier_rate_unit_enum as enum(
			'per_kg',
			'per_container',
			'per_mile',
			'per_km',
			'flat_rate'
		);

		create type tms.shipment_leg_status_enum as enum(
			'pending',
			'in_transit',
			'delivered',
			'cancelled',
			'failed'
		);

		create type tms.partner_invoice_status_enum as enum(
			'pending',
			'paid',
			'disputed',
			'overdue',
			'cancelled'
		);

		-- TMS Drivers
		create table tms.drivers(
			id uuid primary key default gen_random_uuid(),
			user_id text not null references "user"(id),
			license_number varchar(50) not null,
			license_expiry_date date,
			status tms.driver_status_enum default 'active',
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.drivers is 'Represents drivers who operate vehicles within the transportation fleet.';

		comment on column tms.drivers.id is 'Primary key';

		comment on column tms.drivers.user_id is 'Reference to the user account in the system.';

		comment on column tms.drivers.license_number is 'Driver''s license identification number.';

		comment on column tms.drivers.license_expiry_date is 'When the driver''s license expires.';

		comment on column tms.drivers.status is 'Current availability status using driver_status_enum.';

		comment on column tms.drivers.created_at is 'Timestamp when the driver was created.';

		comment on column tms.drivers.updated_at is 'Timestamp when the driver was last updated.';

		-- TMS Driver Schedules
		create table tms.driver_schedules(
			id uuid primary key default gen_random_uuid(),
			driver_id uuid not null references tms.drivers(id),
			start_date date not null,
			end_date date not null,
			reason tms.driver_schedule_reason_enum,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.driver_schedules is 'Tracks driver availability and planned time off for scheduling purposes.';

		comment on column tms.driver_schedules.id is 'Primary key';

		comment on column tms.driver_schedules.driver_id is 'Reference to the associated driver.';

		comment on column tms.driver_schedules.start_date is 'Beginning of the schedule period.';

		comment on column tms.driver_schedules.end_date is 'End of the schedule period.';

		comment on column tms.driver_schedules.reason is 'Purpose of the schedule entry using driver_schedule_reason_enum.';

		comment on column tms.driver_schedules.created_at is 'Timestamp when the schedule was created.';

		comment on column tms.driver_schedules.updated_at is 'Timestamp when the schedule was last updated.';

		-- TMS Vehicles
		create table tms.vehicles(
			id uuid primary key default gen_random_uuid(),
			registration_number varchar(50) not null unique,
			model varchar(100),
			capacity_volume real,
			capacity_weight real,
			status tms.vehicle_status_enum default 'available',
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.vehicles is 'Manages the fleet of vehicles available for transportation operations.';

		comment on column tms.vehicles.id is 'Primary key';

		comment on column tms.vehicles.registration_number is 'Vehicle''s license plate or registration identifier.';

		comment on column tms.vehicles.model is 'Vehicle make and model information.';

		comment on column tms.vehicles.capacity_volume is 'Maximum cargo volume the vehicle can carry.';

		comment on column tms.vehicles.capacity_weight is 'Maximum weight capacity of the vehicle.';

		comment on column tms.vehicles.status is 'Current vehicle status using vehicle_status_enum.';

		comment on column tms.vehicles.created_at is 'Timestamp when the vehicle was created.';

		comment on column tms.vehicles.updated_at is 'Timestamp when the vehicle was last updated.';

		-- TMS Vehicle Maintenance
		create table tms.vehicle_maintenance(
			id uuid primary key default gen_random_uuid(),
			vehicle_id uuid not null references tms.vehicles(id),
			service_date date not null,
			service_type tms.vehicle_service_type_enum,
			cost numeric(10, 2),
			notes text,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.vehicle_maintenance is 'Tracks maintenance activities and service history for fleet vehicles.';

		comment on column tms.vehicle_maintenance.id is 'Primary key';

		comment on column tms.vehicle_maintenance.vehicle_id is 'Reference to the vehicle being serviced.';

		comment on column tms.vehicle_maintenance.service_date is 'Date when maintenance was performed.';

		comment on column tms.vehicle_maintenance.service_type is 'Type of maintenance or repair work using vehicle_service_type_enum.';

		comment on column tms.vehicle_maintenance.cost is 'Financial cost of the maintenance service.';

		comment on column tms.vehicle_maintenance.notes is 'Additional details about the maintenance work.';

		comment on column tms.vehicle_maintenance.created_at is 'Timestamp when the maintenance record was created.';

		comment on column tms.vehicle_maintenance.updated_at is 'Timestamp when the maintenance record was last updated.';

		-- TMS Trips
		create table tms.trips(
			id uuid primary key default gen_random_uuid(),
			driver_id uuid references tms.drivers(id),
			vehicle_id uuid references tms.vehicles(id),
			status tms.trip_status_enum default 'planned',
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.trips is 'Represents planned or active transportation journeys with assigned drivers and vehicles.';

		comment on column tms.trips.id is 'Primary key';

		comment on column tms.trips.driver_id is 'Reference to the assigned driver.';

		comment on column tms.trips.vehicle_id is 'Reference to the assigned vehicle.';

		comment on column tms.trips.status is 'Current trip status using trip_status_enum.';

		comment on column tms.trips.created_at is 'Timestamp when the trip was created.';

		comment on column tms.trips.updated_at is 'Timestamp when the trip was last updated.';

		-- TMS Trip Stops
		create table tms.trip_stops(
			id uuid primary key default gen_random_uuid(),
			trip_id uuid not null references tms.trips(id),
			shipment_id uuid,
			sequence integer
				not null,
				address varchar(500),
				status tms.trip_stop_status_enum default 'pending',
				estimated_arrival_time timestamp,
				actual_arrival_time timestamp,
				estimated_departure_time timestamp,
				actual_departure_time timestamp,
				created_at timestamp default now(),
				updated_at timestamp default now()
		);

		comment on table tms.trip_stops is 'Individual stops within a trip, typically for pickups or deliveries.';

		comment on column tms.trip_stops.id is 'Primary key';

		comment on column tms.trip_stops.trip_id is 'Reference to the parent trip.';

		comment on column tms.trip_stops.shipment_id is 'Reference to the shipment being handled at this stop.';

		comment on column tms.trip_stops.sequence is 'Order of this stop within the trip.';

		comment on column tms.trip_stops.address is 'Physical location of the stop.';

		comment on column tms.trip_stops.status is 'Current stop status using trip_stop_status_enum.';

		comment on column tms.trip_stops.estimated_arrival_time is 'Planned arrival time at the stop.';

		comment on column tms.trip_stops.actual_arrival_time is 'Actual recorded arrival time.';

		comment on column tms.trip_stops.estimated_departure_time is 'Planned departure time from the stop.';

		comment on column tms.trip_stops.actual_departure_time is 'Actual recorded departure time.';

		comment on column tms.trip_stops.created_at is 'Timestamp when the trip stop was created.';

		comment on column tms.trip_stops.updated_at is 'Timestamp when the trip stop was last updated.';

		-- TMS GPS Pings
		create table tms.gps_pings(
			id uuid primary key default gen_random_uuid(),
			vehicle_id uuid not null references tms.vehicles(id),
			latitude real not null,
			longitude real not null,
			timestamp timestamp not null default now()
		);

		comment on table tms.gps_pings is 'Real-time location data from vehicles for tracking and monitoring purposes.';

		comment on column tms.gps_pings.id is 'Primary key';

		comment on column tms.gps_pings.vehicle_id is 'Reference to the vehicle sending the location data.';

		comment on column tms.gps_pings.latitude is 'Geographic latitude coordinate.';

		comment on column tms.gps_pings.longitude is 'Geographic longitude coordinate.';

		comment on column tms.gps_pings.timestamp is 'When the location was recorded.';

		-- TMS Routes
		create table tms.routes(
			id uuid primary key default gen_random_uuid(),
			trip_id uuid not null references tms.trips(id),
			optimized_route_data text,
			total_distance real,
			total_duration real,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.routes is 'Optimized route information for trips, including navigation data.';

		comment on column tms.routes.id is 'Primary key';

		comment on column tms.routes.trip_id is 'Reference to the associated trip.';

		comment on column tms.routes.optimized_route_data is 'Route optimization data such as polylines and turn-by-turn directions.';

		comment on column tms.routes.total_distance is 'Calculated total distance of the route.';

		comment on column tms.routes.total_duration is 'Estimated total time for the route.';

		comment on column tms.routes.created_at is 'Timestamp when the route was created.';

		comment on column tms.routes.updated_at is 'Timestamp when the route was last updated.';

		-- TMS Proof of Deliveries
		create table tms.proof_of_deliveries(
			id uuid primary key default gen_random_uuid(),
			trip_stop_id uuid not null references tms.trip_stops(id),
			type tms.proof_type_enum,
			file_path varchar(500),
			timestamp timestamp not null default now(),
			latitude real,
			longitude real,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.proof_of_deliveries is 'Evidence of successful deliveries or pickups at trip stops.';

		comment on column tms.proof_of_deliveries.id is 'Primary key';

		comment on column tms.proof_of_deliveries.trip_stop_id is 'Reference to the trip stop where proof was collected.';

		comment on column tms.proof_of_deliveries.type is 'Type of proof collected using proof_type_enum.';

		comment on column tms.proof_of_deliveries.file_path is 'Storage location of the proof file.';

		comment on column tms.proof_of_deliveries.timestamp is 'When the proof was collected.';

		comment on column tms.proof_of_deliveries.latitude is 'Geographic latitude where proof was collected.';

		comment on column tms.proof_of_deliveries.longitude is 'Geographic longitude where proof was collected.';

		comment on column tms.proof_of_deliveries.created_at is 'Timestamp when the proof was created.';

		comment on column tms.proof_of_deliveries.updated_at is 'Timestamp when the proof was last updated.';

		-- TMS Expenses
		create table tms.expenses(
			id uuid primary key default gen_random_uuid(),
			trip_id uuid references tms.trips(id),
			driver_id uuid references tms.drivers(id),
			type tms.expense_type_enum,
			amount numeric(10, 2) not null,
			currency tms.currency_enum default 'USD',
			receipt_url varchar(500),
			fuel_quantity real,
			odometer_reading integer,
			status tms.expense_status_enum default 'pending',
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.expenses is 'Tracks transportation-related expenses incurred during trips.';

		comment on column tms.expenses.id is 'Primary key';

		comment on column tms.expenses.trip_id is 'Reference to the associated trip.';

		comment on column tms.expenses.driver_id is 'Reference to the driver who logged the expense.';

		comment on column tms.expenses.type is 'Category of expense using expense_type_enum.';

		comment on column tms.expenses.amount is 'Financial amount of the expense.';

		comment on column tms.expenses.currency is 'Currency denomination using currency_enum.';

		comment on column tms.expenses.receipt_url is 'Link to receipt or proof of purchase.';

		comment on column tms.expenses.fuel_quantity is 'Amount of fuel purchased (if applicable).';

		comment on column tms.expenses.odometer_reading is 'Vehicle odometer reading at time of expense.';

		comment on column tms.expenses.status is 'Approval status using expense_status_enum.';

		comment on column tms.expenses.created_at is 'Timestamp when the expense was created.';

		comment on column tms.expenses.updated_at is 'Timestamp when the expense was last updated.';

		-- TMS Geofences
		create table tms.geofences(
			id uuid primary key default gen_random_uuid(),
			name varchar(255) not null,
			coordinates text,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.geofences is 'Defines geographic boundaries for monitoring vehicle movements and triggering events.';

		comment on column tms.geofences.id is 'Primary key';

		comment on column tms.geofences.name is 'Descriptive name for the geofenced area.';

		comment on column tms.geofences.coordinates is 'Geographic boundary data (e.g., polygon coordinates).';

		comment on column tms.geofences.created_at is 'Timestamp when the geofence was created.';

		comment on column tms.geofences.updated_at is 'Timestamp when the geofence was last updated.';

		-- TMS Geofence Events
		create table tms.geofence_events(
			id uuid primary key default gen_random_uuid(),
			vehicle_id uuid not null references tms.vehicles(id),
			geofence_id uuid not null references tms.geofences(id),
			event_type tms.geofence_event_type_enum not null,
			timestamp timestamp not null default now()
		);

		comment on table tms.geofence_events is 'Records when vehicles enter or exit predefined geographic areas.';

		comment on column tms.geofence_events.id is 'Primary key';

		comment on column tms.geofence_events.vehicle_id is 'Reference to the vehicle that triggered the event.';

		comment on column tms.geofence_events.geofence_id is 'Reference to the geofenced area.';

		comment on column tms.geofence_events.event_type is 'Type of boundary event using geofence_event_type_enum.';

		comment on column tms.geofence_events.timestamp is 'When the event occurred.';

		-- TMS Carriers
		create table tms.carriers(
			id uuid primary key default gen_random_uuid(),
			name varchar(255) not null,
			contact_details text,
			services_offered text,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.carriers is 'Information about third-party transportation providers and partners.';

		comment on column tms.carriers.id is 'Primary key';

		comment on column tms.carriers.name is 'Carrier company name.';

		comment on column tms.carriers.contact_details is 'Contact information for the carrier.';

		comment on column tms.carriers.services_offered is 'Description of transportation services provided.';

		comment on column tms.carriers.created_at is 'Timestamp when the carrier was created.';

		comment on column tms.carriers.updated_at is 'Timestamp when the carrier was last updated.';

		-- TMS Carrier Rates
		create table tms.carrier_rates(
			id uuid primary key default gen_random_uuid(),
			carrier_id uuid not null references tms.carriers(id),
			service_type varchar(100),
			origin varchar(255),
			destination varchar(255),
			rate numeric(10, 2) not null,
			unit tms.carrier_rate_unit_enum,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.carrier_rates is 'Pricing information for services provided by third-party carriers.';

		comment on column tms.carrier_rates.id is 'Primary key';

		comment on column tms.carrier_rates.carrier_id is 'Reference to the carrier providing the service.';

		comment on column tms.carrier_rates.service_type is 'Type of transportation service.';

		comment on column tms.carrier_rates.origin is 'Starting location for the service.';

		comment on column tms.carrier_rates.destination is 'Ending location for the service.';

		comment on column tms.carrier_rates.rate is 'Cost for the service.';

		comment on column tms.carrier_rates.unit is 'Pricing unit using carrier_rate_unit_enum.';

		comment on column tms.carrier_rates.created_at is 'Timestamp when the rate was created.';

		comment on column tms.carrier_rates.updated_at is 'Timestamp when the rate was last updated.';

		-- TMS Shipment Legs
		create table tms.shipment_legs(
			id uuid primary key default gen_random_uuid(),
			shipment_id uuid,
			leg_sequence integer not null,
			start_location varchar(255),
			end_location varchar(255),
			carrier_id uuid references tms.carriers(id),
			internal_trip_id uuid references tms.trips(id),
			status tms.shipment_leg_status_enum,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.shipment_legs is 'Represents individual segments of multi-leg shipments that may involve different carriers or internal fleet.';

		comment on column tms.shipment_legs.id is 'Primary key';

		comment on column tms.shipment_legs.shipment_id is 'Reference to the overall shipment.';

		comment on column tms.shipment_legs.leg_sequence is 'Order of this leg within the shipment journey.';

		comment on column tms.shipment_legs.start_location is 'Starting point of this leg.';

		comment on column tms.shipment_legs.end_location is 'Ending point of this leg.';

		comment on column tms.shipment_legs.carrier_id is 'Reference to third-party carrier (if external).';

		comment on column tms.shipment_legs.internal_trip_id is 'Reference to internal trip (if using own fleet).';

		comment on column tms.shipment_legs.status is 'Current status of this shipment leg using shipment_leg_status_enum.';

		comment on column tms.shipment_legs.created_at is 'Timestamp when the shipment leg was created.';

		comment on column tms.shipment_legs.updated_at is 'Timestamp when the shipment leg was last updated.';

		-- TMS Shipment Leg Events
		create table tms.shipment_leg_events(
			id uuid primary key default gen_random_uuid(),
			shipment_leg_id uuid not null references tms.shipment_legs(id),
			status_message varchar(255),
			location varchar(255),
			event_timestamp timestamp not null default now()
		);

		comment on table tms.shipment_leg_events is 'Tracks status updates and events for individual shipment legs.';

		comment on column tms.shipment_leg_events.id is 'Primary key';

		comment on column tms.shipment_leg_events.shipment_leg_id is 'Reference to the associated shipment leg.';

		comment on column tms.shipment_leg_events.status_message is 'Description of the status or event.';

		comment on column tms.shipment_leg_events.location is 'Geographic location where the event occurred.';

		comment on column tms.shipment_leg_events.event_timestamp is 'When the event was recorded.';

		-- TMS Partner Invoices
		create table tms.partner_invoices(
			id uuid primary key default gen_random_uuid(),
			carrier_id uuid not null references tms.carriers(id),
			invoice_number varchar(100) not null,
			invoice_date date not null,
			total_amount numeric(15, 2) not null,
			status tms.partner_invoice_status_enum default 'pending',
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table tms.partner_invoices is 'Billing records from third-party carriers for transportation services.';

		comment on column tms.partner_invoices.id is 'Primary key';

		comment on column tms.partner_invoices.carrier_id is 'Reference to the carrier sending the invoice.';

		comment on column tms.partner_invoices.invoice_number is 'Carrier''s invoice identifier.';

		comment on column tms.partner_invoices.invoice_date is 'Date the invoice was issued.';

		comment on column tms.partner_invoices.total_amount is 'Total amount billed on the invoice.';

		comment on column tms.partner_invoices.status is 'Payment status using partner_invoice_status_enum.';

		comment on column tms.partner_invoices.created_at is 'Timestamp when the invoice was created.';

		comment on column tms.partner_invoices.updated_at is 'Timestamp when the invoice was last updated.';

		-- TMS Partner Invoice Items
		create table tms.partner_invoice_items(
			id uuid primary key default gen_random_uuid(),
			partner_invoice_id uuid not null references tms.partner_invoices(id),
			shipment_leg_id uuid not null references tms.shipment_legs(id),
			amount numeric(10, 2) not null
		);

		comment on table tms.partner_invoice_items is 'Individual line items on carrier invoices, detailing specific shipment leg charges.';

		comment on column tms.partner_invoice_items.id is 'Primary key';

		comment on column tms.partner_invoice_items.partner_invoice_id is 'Reference to the parent invoice.';

		comment on column tms.partner_invoice_items.shipment_leg_id is 'Reference to the specific shipment leg being billed.';

		comment on column tms.partner_invoice_items.amount is 'Amount charged for this specific shipment leg.';

		-- Create indexes for performance
		create index idx_tms_drivers_user_id on tms.drivers(user_id);

		create index idx_tms_drivers_status on tms.drivers(status);

		create index idx_tms_drivers_license_expiry_date on tms.drivers(license_expiry_date);

		create index idx_tms_driver_schedules_driver_id on tms.driver_schedules(driver_id);

		create index idx_tms_driver_schedules_start_date on tms.driver_schedules(start_date);

		create index idx_tms_driver_schedules_end_date on tms.driver_schedules(end_date);

		create index idx_tms_driver_schedules_reason on tms.driver_schedules(reason);

		create index idx_tms_vehicles_registration_number on tms.vehicles(registration_number);

		create index idx_tms_vehicles_status on tms.vehicles(status);

		create index idx_tms_vehicles_model on tms.vehicles(model);

		create index idx_tms_vehicle_maintenance_vehicle_id on tms.vehicle_maintenance(vehicle_id);

		create index idx_tms_vehicle_maintenance_service_date on tms.vehicle_maintenance(service_date);

		create index idx_tms_vehicle_maintenance_service_type on tms.vehicle_maintenance(service_type);

		create index idx_tms_trips_driver_id on tms.trips(driver_id);

		create index idx_tms_trips_vehicle_id on tms.trips(vehicle_id);

		create index idx_tms_trips_status on tms.trips(status);

		create index idx_tms_trip_stops_trip_id on tms.trip_stops(trip_id);

		create index idx_tms_trip_stops_shipment_id on tms.trip_stops(shipment_id);

		create index idx_tms_trip_stops_sequence on tms.trip_stops(trip_id, sequence);

		create index idx_tms_trip_stops_status on tms.trip_stops(status);

		create index idx_tms_trip_stops_estimated_arrival_time on tms.trip_stops(estimated_arrival_time);

		create index idx_tms_gps_pings_vehicle_id on tms.gps_pings(vehicle_id);

		create index idx_tms_gps_pings_timestamp on tms.gps_pings(timestamp);

		create index idx_tms_gps_pings_spatial on tms.gps_pings(latitude, longitude);

		create index idx_tms_routes_trip_id on tms.routes(trip_id);

		create index idx_tms_proof_of_deliveries_trip_stop_id on tms.proof_of_deliveries(trip_stop_id);

		create index idx_tms_proof_of_deliveries_type on tms.proof_of_deliveries(type);

		create index idx_tms_proof_of_deliveries_timestamp on tms.proof_of_deliveries(timestamp);

		create index idx_tms_expenses_trip_id on tms.expenses(trip_id);

		create index idx_tms_expenses_driver_id on tms.expenses(driver_id);

		create index idx_tms_expenses_type on tms.expenses(type);

		create index idx_tms_expenses_status on tms.expenses(status);

		create index idx_tms_geofences_name on tms.geofences(name);

		create index idx_tms_geofence_events_vehicle_id on tms.geofence_events(vehicle_id);

		create index idx_tms_geofence_events_geofence_id on tms.geofence_events(geofence_id);

		create index idx_tms_geofence_events_event_type on tms.geofence_events(event_type);

		create index idx_tms_geofence_events_timestamp on tms.geofence_events(timestamp);

		create index idx_tms_carriers_name on tms.carriers(name);

		create index idx_tms_carrier_rates_carrier_id on tms.carrier_rates(carrier_id);

		create index idx_tms_carrier_rates_service_type on tms.carrier_rates(service_type);

		create index idx_tms_carrier_rates_origin on tms.carrier_rates(origin);

		create index idx_tms_carrier_rates_destination on tms.carrier_rates(destination);

		create index idx_tms_shipment_legs_shipment_id on tms.shipment_legs(shipment_id);

		create index idx_tms_shipment_legs_leg_sequence on tms.shipment_legs(shipment_id, leg_sequence);

		create index idx_tms_shipment_legs_carrier_id on tms.shipment_legs(carrier_id);

		create index idx_tms_shipment_legs_status on tms.shipment_legs(status);

		create index idx_tms_partner_invoices_carrier_id on tms.partner_invoices(carrier_id);

		create index idx_tms_partner_invoices_status on tms.partner_invoices(status);

		create index idx_tms_partner_invoices_invoice_date on tms.partner_invoices(invoice_date);

		create index idx_tms_partner_invoice_items_partner_invoice_id on tms.partner_invoice_items(partner_invoice_id);

		create index idx_tms_partner_invoice_items_shipment_leg_id on tms.partner_invoice_items(shipment_leg_id);
	`.execute(db);
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await sql`
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
	`.execute(db);
}
