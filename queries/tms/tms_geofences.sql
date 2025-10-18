-- name: TmsPaginateGeofence :many
select
  *
from
  "tms"."geofences"
where
  (name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindGeofence :one
select
  *
from
  "tms"."geofences"
where
  id = sqlc.arg(id)::uuid;

-- name: TmsAnyGeofence :many
select
  *
from
  "tms"."geofences"
where
  id = any (@ids::uuid[]);

-- name: TmsRangeGeofence :many
select
  *
from
  "tms"."geofences"
where
  created_at >= @dateFrom::date
  and created_at <= @dateTo::date
  and (name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: TmsInsertGeofence :one
insert into "tms"."geofences"(name, longitude, latitude)
  values ($1, $2, $3)
returning
  *;

-- name: TmsUpdateGeofence :one
update
  "tms"."geofences"
set
  name = case when sqlc.arg(set_name)::boolean then
    sqlc.arg(name)::varchar
  else
    name
  end,
  longitude = case when sqlc.arg(set_longitude)::boolean then
    sqlc.arg(longitude)::real
  else
    longitude
  end,
  latitude = case when sqlc.arg(set_latitude)::boolean then
    sqlc.arg(latitude)::real
  else
    latitude
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveGeofence :exec
delete from "tms"."geofences"
where id = @id::uuid;