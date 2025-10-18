-- name: TmsPaginateGeofenceEvent :many
select
  sqlc.embed(geofence_events),
  sqlc.embed(vehicle),
  sqlc.embed(geofence)
from
  "tms"."geofence_events" as geofence_events
  inner join "tms"."vehicles" as vehicle on geofence_events.vehicle_id = vehicle.id
  inner join "tms"."geofences" as geofence on geofence_events.geofence_id = geofence.id
where (vehicle.registration_number ilike sqlc.narg(search)::text
  or geofence.name ilike sqlc.narg(search)::text
  or geofence_events.event_type::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: TmsFindGeofenceEvent :one
select
  sqlc.embed(geofence_events),
  sqlc.embed(vehicle),
  sqlc.embed(geofence)
from
  "tms"."geofence_events" as geofence_events
  inner join "tms"."vehicles" as vehicle on geofence_events.vehicle_id = vehicle.id
  inner join "tms"."geofences" as geofence on geofence_events.geofence_id = geofence.id
where
  geofence_events.id = sqlc.arg(id)::uuid;

-- name: TmsAnyGeofenceEvent :many
select
  sqlc.embed(geofence_events),
  sqlc.embed(vehicle),
  sqlc.embed(geofence)
from
  "tms"."geofence_events" as geofence_events
  inner join "tms"."vehicles" as vehicle on geofence_events.vehicle_id = vehicle.id
  inner join "tms"."geofences" as geofence on geofence_events.geofence_id = geofence.id
where
  geofence_events.id = any (@ids::uuid[]);

-- name: TmsRangeGeofenceEvent :many
select
  sqlc.embed(geofence_events),
  sqlc.embed(vehicle),
  sqlc.embed(geofence)
from
  "tms"."geofence_events" as geofence_events
  inner join "tms"."vehicles" as vehicle on geofence_events.vehicle_id = vehicle.id
  inner join "tms"."geofences" as geofence on geofence_events.geofence_id = geofence.id
where
  geofence_events.timestamp >= @dateFrom::date
  and geofence_events.timestamp <= @dateTo::date
  and (vehicle.registration_number ilike sqlc.narg(search)::text
    or geofence.name ilike sqlc.narg(search)::text
    or geofence_events.event_type::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: TmsInsertGeofenceEvent :one
insert into "tms"."geofence_events"(vehicle_id, geofence_id, event_type, timestamp)
  values ($1, $2, $3, $4)
returning
  *;

-- name: TmsUpdateGeofenceEvent :one
update
  "tms"."geofence_events"
set
  updated_at = now(),
  vehicle_id = case when sqlc.arg(vehicle_id) is not null then
    sqlc.arg(vehicle_id)::uuid
  else
    vehicle_id
  end,
  geofence_id = case when sqlc.arg(geofence_id) is not null then
    sqlc.arg(geofence_id)::uuid
  else
    geofence_id
  end,
  event_type = case when sqlc.arg(event_type) is not null then
    sqlc.arg(event_type)::tms.geofence_event_type_enum
  else
    event_type
  end,
  timestamp = case when sqlc.arg(timestamp) is not null then
    sqlc.arg(timestamp)::timestamp
  else
    timestamp
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveGeofenceEvent :exec
delete from "tms"."geofence_events"
where id = @id::uuid;

