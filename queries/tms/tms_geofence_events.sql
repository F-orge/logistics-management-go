-- name: TmsPaginateGeofenceEvent :many
select
  sqlc.embed(geofence_events),
  sqlc.embed(vehicle),
  sqlc.embed(geofence)
from
  "tms"."geofence_events" as geofence_events
  inner join "tms"."vehicles" as vehicle on geofence_events.vehicle_id = vehicle.id
  inner join "tms"."geofences" as geofence on geofence_events.geofence_id = geofence.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

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
  and geofence_events.timestamp <= @dateTo::date;

-- name: TmsInsertGeofenceEvent :one
insert into "tms"."geofence_events"(vehicle_id, geofence_id, event_type, timestamp)
  values ($1, $2, $3, $4)
returning
  *;

-- name: TmsUpdateGeofenceEvent :one
update
  "tms"."geofence_events"
set
  vehicle_id = case when sqlc.arg(set_vehicle_id)::boolean then
    sqlc.arg(vehicle_id)::uuid
  else
    vehicle_id
  end,
  geofence_id = case when sqlc.arg(set_geofence_id)::boolean then
    sqlc.arg(geofence_id)::uuid
  else
    geofence_id
  end,
  event_type = case when sqlc.arg(set_event_type)::boolean then
    sqlc.arg(event_type)::tms.geofence_event_type_enum
  else
    event_type
  end,
  timestamp = case when sqlc.arg(set_timestamp)::boolean then
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
