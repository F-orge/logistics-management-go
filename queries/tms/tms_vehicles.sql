-- name: TmsPaginateVehicleMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "tms"."vehicles_view" as vehicles
where (registration_number ilike sqlc.narg(search)::text
  or model ilike sqlc.narg(search)::text
  or status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: TmsPaginateVehicle :many
select
  *
from
  "tms"."vehicles_view" as vehicles
where (registration_number ilike sqlc.narg(search)::text
  or model ilike sqlc.narg(search)::text
  or status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: TmsFindVehicle :one
select
  *
from
  "tms"."vehicles_view"
where
  id = sqlc.arg(id)::uuid;

-- name: TmsAnyVehicle :many
select
  *
from
  "tms"."vehicles_view"
where
  id = any (@ids::uuid[]);

-- name: TmsRangeVehicle :many
select
  *
from
  "tms"."vehicles_view"
where
  created_at >= @dateFrom::date
  and created_at <= @dateTo::date
  and (registration_number ilike sqlc.narg(search)::text
    or model ilike sqlc.narg(search)::text
    or status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: TmsInsertVehicle :one
insert into "tms"."vehicles"(registration_number, model, capacity_volume, capacity_weight, status)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: TmsUpdateVehicle :one
update
  "tms"."vehicles"
set
  updated_at = now(),
  registration_number = case when sqlc.arg(registration_number) is not null then
    sqlc.arg(registration_number)::varchar
  else
    registration_number
  end,
  model = case when sqlc.arg(model) is not null then
    sqlc.arg(model)::varchar
  else
    model
  end,
  capacity_volume = case when sqlc.arg(capacity_volume) is not null then
    sqlc.arg(capacity_volume)::real
  else
    capacity_volume
  end,
  capacity_weight = case when sqlc.arg(capacity_weight) is not null then
    sqlc.arg(capacity_weight)::real
  else
    capacity_weight
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::tms.vehicle_status_enum
  else
    status
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveVehicle :exec
delete from "tms"."vehicles"
where id = @id::uuid;

