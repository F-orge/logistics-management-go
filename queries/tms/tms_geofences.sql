-- name: TmsPaginateGeofence :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(geofences)
from
  "tms"."geofences_view" as geofences
where (name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: TmsFindGeofence :one
select
  *
from
  "tms"."geofences_view"
where
  id = sqlc.arg(id)::uuid;

-- name: TmsAnyGeofence :many
select
  *
from
  "tms"."geofences_view"
where
  id = any (@ids::uuid[]);

-- name: TmsRangeGeofence :many
select
  *
from
  "tms"."geofences_view"
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
  updated_at = now(),
  name = case when sqlc.arg(name) is not null then
    sqlc.arg(name)::varchar
  else
    name
  end,
  longitude = case when sqlc.arg(longitude) is not null then
    sqlc.arg(longitude)::real
  else
    longitude
  end,
  latitude = case when sqlc.arg(latitude) is not null then
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

