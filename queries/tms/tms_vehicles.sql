-- name: TmsPaginateVehicle :many
select
  *
from
  "tms"."vehicles"
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindVehicle :one
select
  *
from
  "tms"."vehicles"
where
  id = sqlc.arg(id)::uuid;

-- name: TmsAnyVehicle :many
select
  *
from
  "tms"."vehicles"
where
  id = any (@ids::uuid[]);

-- name: TmsRangeVehicle :many
select
  *
from
  "tms"."vehicles"
where
  created_at >= @dateFrom::date
  and created_at <= @dateTo::date;

-- name: TmsInsertVehicle :one
insert into "tms"."vehicles"(registration_number, model, capacity_volume, capacity_weight, status)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: TmsUpdateVehicle :one
update
  "tms"."vehicles"
set
  registration_number = case when sqlc.arg(set_registration_number)::boolean then
    sqlc.arg(registration_number)::varchar
  else
    registration_number
  end,
  model = case when sqlc.arg(set_model)::boolean then
    sqlc.arg(model)::varchar
  else
    model
  end,
  capacity_volume = case when sqlc.arg(set_capacity_volume)::boolean then
    sqlc.arg(capacity_volume)::real
  else
    capacity_volume
  end,
  capacity_weight = case when sqlc.arg(set_capacity_weight)::boolean then
    sqlc.arg(capacity_weight)::real
  else
    capacity_weight
  end,
  status = case when sqlc.arg(set_status)::boolean then
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

