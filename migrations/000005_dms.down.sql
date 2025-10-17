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

