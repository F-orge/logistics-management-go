import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`
		-- Enable UUID extension if not already enabled
		create extension if not exists "uuid-ossp";

		-- Create DMS schema
		create schema if not exists dms;

		-- Create DMS enum types
		create type dms.delivery_route_status_enum as enum(
			'planned',
			'in_progress',
			'completed',
			'cancelled',
			'paused'
		);

		create type dms.delivery_task_status_enum as enum(
			'pending',
			'assigned',
			'out_for_delivery',
			'delivered',
			'failed',
			'cancelled',
			'rescheduled'
		);

		create type dms.task_event_status_enum as enum(
			'assigned',
			'started',
			'arrived',
			'delivered',
			'failed',
			'exception',
			'cancelled',
			'rescheduled'
		);

		create type dms.delivery_failure_reason_enum as enum(
			'recipient_not_home',
			'address_not_found',
			'refused_delivery',
			'damaged_package',
			'access_denied',
			'weather_conditions',
			'vehicle_breakdown',
			'other'
		);

		create type dms.proof_of_delivery_type_enum as enum(
			'signature',
			'photo',
			'code_verification',
			'contactless_delivery',
			'left_at_door'
		);

		-- DMS Delivery Routes
		create table dms.delivery_routes(
			id uuid primary key default gen_random_uuid(),
			driver_id uuid not null references tms.drivers(id),
			route_date date not null,
			status dms.delivery_route_status_enum default 'planned',
			optimized_route_data text,
			total_distance_km real,
			estimated_duration_minutes integer,
			actual_duration_minutes integer generated always as ( case when started_at is not null and completed_at is not null then
				extract(epoch from (completed_at - started_at))::integer / 60
			else
				null
			end) stored,
			started_at timestamp,
			completed_at timestamp,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table dms.delivery_routes is 'Represents planned routes for drivers, optimized for efficiency and containing multiple delivery tasks.';

		comment on column dms.delivery_routes.id is 'Primary key';

		comment on column dms.delivery_routes.driver_id is 'Reference to the assigned driver from the TMS.';

		comment on column dms.delivery_routes.route_date is 'Scheduled date for the delivery route.';

		comment on column dms.delivery_routes.status is 'Current state of the route using delivery_route_status_enum.';

		comment on column dms.delivery_routes.optimized_route_data is 'Stored route optimization data such as polylines and turn-by-turn directions.';

		comment on column dms.delivery_routes.total_distance_km is 'Total distance of the route in kilometers.';

		comment on column dms.delivery_routes.estimated_duration_minutes is 'Estimated time to complete the entire route in minutes.';

		comment on column dms.delivery_routes.actual_duration_minutes is 'Actual time taken to complete the route in minutes (automatically calculated from start and completion times).';

		comment on column dms.delivery_routes.started_at is 'When the route was started.';

		comment on column dms.delivery_routes.completed_at is 'When the route was completed.';

		comment on column dms.delivery_routes.created_at is 'Timestamp when the delivery route was created.';

		comment on column dms.delivery_routes.updated_at is 'Timestamp when the delivery route was last updated.';

		-- DMS Delivery Tasks
		create table dms.delivery_tasks(
			id uuid primary key default gen_random_uuid(),
			package_id uuid not null references wms.packages(id),
			delivery_route_id uuid not null references dms.delivery_routes(id),
			route_sequence integer not null,
			delivery_address text not null,
			recipient_name varchar(255),
			recipient_phone varchar(20),
			delivery_instructions text,
			estimated_arrival_time timestamp,
			actual_arrival_time timestamp,
			delivery_time timestamp,
			status dms.delivery_task_status_enum default 'pending',
			failure_reason dms.delivery_failure_reason_enum,
			attempt_count integer default 0,
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_route_sequence_positive check (route_sequence > 0),
			constraint check_attempt_count_non_negative check (attempt_count >= 0)
		);

		comment on table dms.delivery_tasks is 'Individual delivery tasks within a route, each corresponding to a specific package that needs to be delivered.';

		comment on column dms.delivery_tasks.id is 'Primary key';

		comment on column dms.delivery_tasks.package_id is 'Reference to the package from the WMS.';

		comment on column dms.delivery_tasks.delivery_route_id is 'Reference to the delivery route this task belongs to.';

		comment on column dms.delivery_tasks.route_sequence is 'Order of this delivery within the route.';

		comment on column dms.delivery_tasks.delivery_address is 'The address where the package should be delivered.';

		comment on column dms.delivery_tasks.recipient_name is 'Name of the person receiving the package.';

		comment on column dms.delivery_tasks.recipient_phone is 'Phone number of the recipient.';

		comment on column dms.delivery_tasks.delivery_instructions is 'Special instructions for the delivery.';

		comment on column dms.delivery_tasks.estimated_arrival_time is 'Calculated time when the delivery is expected.';

		comment on column dms.delivery_tasks.actual_arrival_time is 'When the driver actually arrived at the delivery location.';

		comment on column dms.delivery_tasks.delivery_time is 'When the package was successfully delivered.';

		comment on column dms.delivery_tasks.status is 'Current status of the delivery task using delivery_task_status_enum.';

		comment on column dms.delivery_tasks.failure_reason is 'Reason for delivery failure using delivery_failure_reason_enum.';

		comment on column dms.delivery_tasks.attempt_count is 'Number of delivery attempts made.';

		comment on column dms.delivery_tasks.created_at is 'Timestamp when the delivery task was created.';

		comment on column dms.delivery_tasks.updated_at is 'Timestamp when the delivery task was last updated.';

		-- DMS Task Events
		create table dms.task_events(
			id uuid primary key default gen_random_uuid(),
			delivery_task_id uuid not null references dms.delivery_tasks(id),
			status dms.task_event_status_enum not null,
			reason text,
			notes text,
			latitude real,
			longitude real,
			timestamp timestamp default now(),
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table dms.task_events is 'Tracks status changes and events for delivery tasks, providing a detailed audit trail of the delivery process.';

		comment on column dms.task_events.id is 'Primary key';

		comment on column dms.task_events.delivery_task_id is 'Reference to the associated delivery task.';

		comment on column dms.task_events.status is 'The event status being recorded using task_event_status_enum.';

		comment on column dms.task_events.reason is 'Additional context for the status change (e.g., "recipient not home").';

		comment on column dms.task_events.notes is 'Additional notes about the event.';

		comment on column dms.task_events.latitude is 'Geographic latitude where the event occurred.';

		comment on column dms.task_events.longitude is 'Geographic longitude where the event occurred.';

		comment on column dms.task_events.timestamp is 'When the event occurred.';

		comment on column dms.task_events.created_at is 'Timestamp when the task event was created.';

		comment on column dms.task_events.updated_at is 'Timestamp when the task event was last updated.';

		-- DMS Proof of Deliveries
		create table dms.proof_of_deliveries(
			id uuid primary key default gen_random_uuid(),
			delivery_task_id uuid not null references dms.delivery_tasks(id),
			type dms.proof_of_delivery_type_enum not null,
			file_path varchar(500),
			signature_data text,
			recipient_name varchar(255),
			verification_code varchar(50),
			latitude real,
			longitude real,
			timestamp timestamp default now(),
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table dms.proof_of_deliveries is 'Stores evidence of successful deliveries, such as signatures or photos, ensuring accountability and customer satisfaction.';

		comment on column dms.proof_of_deliveries.id is 'Primary key';

		comment on column dms.proof_of_deliveries.delivery_task_id is 'Reference to the completed delivery task.';

		comment on column dms.proof_of_deliveries.type is 'Type of proof collected using proof_of_delivery_type_enum.';

		comment on column dms.proof_of_deliveries.file_path is 'Storage location of the proof file (for photos).';

		comment on column dms.proof_of_deliveries.signature_data is 'Digital signature data (for signature proofs).';

		comment on column dms.proof_of_deliveries.recipient_name is 'Name of the person who received the package.';

		comment on column dms.proof_of_deliveries.verification_code is 'Code used for verification deliveries.';

		comment on column dms.proof_of_deliveries.latitude is 'Geographic latitude where proof was collected.';

		comment on column dms.proof_of_deliveries.longitude is 'Geographic longitude where proof was collected.';

		comment on column dms.proof_of_deliveries.timestamp is 'When the proof was collected.';

		comment on column dms.proof_of_deliveries.created_at is 'Timestamp when the proof of delivery was created.';

		comment on column dms.proof_of_deliveries.updated_at is 'Timestamp when the proof of delivery was last updated.';

		-- DMS Driver Locations
		create table dms.driver_locations(
			id uuid primary key default gen_random_uuid(),
			driver_id uuid not null references tms.drivers(id),
			latitude real not null,
			longitude real not null,
			altitude real,
			accuracy real,
			speed_kmh real,
			heading real,
			timestamp timestamp default now(),
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_latitude_range check (latitude >= -90 and latitude <= 90),
			constraint check_longitude_range check (longitude >= -180 and longitude <= 180),
			constraint check_accuracy_positive check (accuracy is null or accuracy >= 0),
			constraint check_speed_non_negative check (speed_kmh is null or speed_kmh >= 0),
			constraint check_heading_range check (heading is null or (heading >= 0 and heading < 360))
		);

		comment on table dms.driver_locations is 'Real-time location tracking for drivers, enabling accurate ETAs and route monitoring.';

		comment on column dms.driver_locations.id is 'Primary key';

		comment on column dms.driver_locations.driver_id is 'Reference to the driver from the TMS.';

		comment on column dms.driver_locations.latitude is 'Geographic latitude coordinate.';

		comment on column dms.driver_locations.longitude is 'Geographic longitude coordinate.';

		comment on column dms.driver_locations.altitude is 'Altitude in meters above sea level.';

		comment on column dms.driver_locations.accuracy is 'GPS accuracy in meters.';

		comment on column dms.driver_locations.speed_kmh is 'Current speed in kilometers per hour.';

		comment on column dms.driver_locations.heading is 'Direction of travel in degrees (0-359).';

		comment on column dms.driver_locations.timestamp is 'When the location was recorded.';

		comment on column dms.driver_locations.created_at is 'Timestamp when the driver location was created.';

		comment on column dms.driver_locations.updated_at is 'Timestamp when the driver location was last updated.';

		-- DMS Customer Tracking Links
		create table dms.customer_tracking_links(
			id uuid primary key default gen_random_uuid(),
			delivery_task_id uuid not null references dms.delivery_tasks(id),
			tracking_token varchar(100) not null unique,
			is_active boolean default true,
			access_count integer default 0,
			last_accessed_at timestamp,
			expires_at timestamp,
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_access_count_non_negative check (access_count >= 0)
		);

		comment on table dms.customer_tracking_links is 'Provides customers with secure, unique links to track their deliveries in real-time.';

		comment on column dms.customer_tracking_links.id is 'Primary key';

		comment on column dms.customer_tracking_links.delivery_task_id is 'Reference to the delivery task being tracked.';

		comment on column dms.customer_tracking_links.tracking_token is 'Unique, unguessable identifier for secure access.';

		comment on column dms.customer_tracking_links.is_active is 'Whether the tracking link is currently valid.';

		comment on column dms.customer_tracking_links.access_count is 'Number of times the tracking link has been accessed.';

		comment on column dms.customer_tracking_links.last_accessed_at is 'When the tracking link was last accessed.';

		comment on column dms.customer_tracking_links.expires_at is 'When the tracking link will expire.';

		comment on column dms.customer_tracking_links.created_at is 'Timestamp when the customer tracking link was created.';

		comment on column dms.customer_tracking_links.updated_at is 'Timestamp when the customer tracking link was last updated.';

		-- Create indexes for performance
		create index idx_dms_delivery_routes_driver_id on dms.delivery_routes(driver_id);

		create index idx_dms_delivery_routes_route_date on dms.delivery_routes(route_date);

		create index idx_dms_delivery_routes_status on dms.delivery_routes(status);

		create index idx_dms_delivery_tasks_package_id on dms.delivery_tasks(package_id);

		create index idx_dms_delivery_tasks_delivery_route_id on dms.delivery_tasks(delivery_route_id);

		create index idx_dms_delivery_tasks_status on dms.delivery_tasks(status);

		create index idx_dms_delivery_tasks_route_sequence on dms.delivery_tasks(delivery_route_id, route_sequence);

		create index idx_dms_task_events_delivery_task_id on dms.task_events(delivery_task_id);

		create index idx_dms_task_events_status on dms.task_events(status);

		create index idx_dms_task_events_timestamp on dms.task_events(timestamp);

		create index idx_dms_proof_of_deliveries_delivery_task_id on dms.proof_of_deliveries(delivery_task_id);

		create index idx_dms_proof_of_deliveries_type on dms.proof_of_deliveries(type);

		create index idx_dms_driver_locations_driver_id on dms.driver_locations(driver_id);

		create index idx_dms_driver_locations_timestamp on dms.driver_locations(timestamp);

		create index idx_dms_driver_locations_spatial on dms.driver_locations(latitude, longitude);

		create index idx_dms_customer_tracking_links_delivery_task_id on dms.customer_tracking_links(delivery_task_id);

		create index idx_dms_customer_tracking_links_tracking_token on dms.customer_tracking_links(tracking_token);

		create index idx_dms_customer_tracking_links_active on dms.customer_tracking_links(is_active);
	`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`
		-- Drop indexes
		drop index if exists idx_dms_customer_tracking_links_active;

		drop index if exists idx_dms_customer_tracking_links_tracking_token;

		drop index if exists idx_dms_customer_tracking_links_delivery_task_id;

		drop index if exists idx_dms_driver_locations_spatial;

		drop index if exists idx_dms_driver_locations_timestamp;

		drop index if exists idx_dms_driver_locations_driver_id;

		drop index if exists idx_dms_proof_of_deliveries_type;

		drop index if exists idx_dms_proof_of_deliveries_delivery_task_id;

		drop index if exists idx_dms_task_events_timestamp;

		drop index if exists idx_dms_task_events_status;

		drop index if exists idx_dms_task_events_delivery_task_id;

		drop index if exists idx_dms_delivery_tasks_route_sequence;

		drop index if exists idx_dms_delivery_tasks_status;

		drop index if exists idx_dms_delivery_tasks_delivery_route_id;

		drop index if exists idx_dms_delivery_tasks_package_id;

		drop index if exists idx_dms_delivery_routes_status;

		drop index if exists idx_dms_delivery_routes_route_date;

		drop index if exists idx_dms_delivery_routes_driver_id;

		-- Drop tables in reverse dependency order
		drop table if exists dms.customer_tracking_links;

		drop table if exists dms.driver_locations;

		drop table if exists dms.proof_of_deliveries;

		drop table if exists dms.task_events;

		drop table if exists dms.delivery_tasks;

		drop table if exists dms.delivery_routes;

		-- Drop enum types
		drop type if exists dms.proof_of_delivery_type_enum;

		drop type if exists dms.delivery_failure_reason_enum;

		drop type if exists dms.task_event_status_enum;

		drop type if exists dms.delivery_task_status_enum;

		drop type if exists dms.delivery_route_status_enum;

		-- Drop schema
		drop schema if exists dms;
	`.execute(db);
}
