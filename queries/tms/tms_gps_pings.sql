-- name: TmsPaginateGpsPing :many
select
  sqlc.embed(gps_pings),
  sqlc.embed(vehicle)
from
  "tms"."gps_pings" as gps_pings
  inner join "tms"."vehicles" as vehicle on gps_pings.vehicle_id = vehicle.id
where (vehicle.registration_number ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindGpsPing :one
select
  sqlc.embed(gps_pings),
  sqlc.embed(vehicle)
from
  "tms"."gps_pings" as gps_pings
  inner join "tms"."vehicles" as vehicle on gps_pings.vehicle_id = vehicle.id
where
  gps_pings.id = sqlc.arg(id)::uuid;

-- name: TmsAnyGpsPing :many
select
  sqlc.embed(gps_pings),
  sqlc.embed(vehicle)
from
  "tms"."gps_pings" as gps_pings
  inner join "tms"."vehicles" as vehicle on gps_pings.vehicle_id = vehicle.id
where
  gps_pings.id = any (@ids::uuid[]);

-- name: TmsRangeGpsPing :many
select
  sqlc.embed(gps_pings),
  sqlc.embed(vehicle)
from
  "tms"."gps_pings" as gps_pings
  inner join "tms"."vehicles" as vehicle on gps_pings.vehicle_id = vehicle.id
where
  gps_pings.created_at >= @dateFrom::date
  and gps_pings.created_at <= @dateTo::date
  and (vehicle.registration_number ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: TmsInsertGpsPing :one
insert into "tms"."gps_pings"(vehicle_id, latitude, longitude, timestamp)
  values ($1, $2, $3, $4)
returning
  *;

-- name: TmsUpdateGpsPing :one
update
  "tms"."gps_pings"
set
  updated_at = now(),
  vehicle_id = case when sqlc.arg(vehicle_id) is not null then
    sqlc.arg(vehicle_id)::uuid
  else
    vehicle_id
  end,
  latitude = case when sqlc.arg(latitude) is not null then
    sqlc.arg(latitude)::real
  else
    latitude
  end,
  longitude = case when sqlc.arg(longitude) is not null then
    sqlc.arg(longitude)::real
  else
    longitude
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

-- name: TmsRemoveGpsPing :exec
delete from "tms"."gps_pings"
where id = @id::uuid;

