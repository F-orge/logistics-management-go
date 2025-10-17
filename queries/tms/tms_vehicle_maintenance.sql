-- name: TmsPaginateVehicleMaintenance :many
select
  sqlc.embed(vehicle_maintenance),
  sqlc.embed(vehicle)
from
  "tms"."vehicle_maintenance" as vehicle_maintenance
  inner join "tms"."vehicles" as vehicle on vehicle_maintenance.vehicle_id = vehicle.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindVehicleMaintenance :one
select
  sqlc.embed(vehicle_maintenance),
  sqlc.embed(vehicle)
from
  "tms"."vehicle_maintenance" as vehicle_maintenance
  inner join "tms"."vehicles" as vehicle on vehicle_maintenance.vehicle_id = vehicle.id
where
  vehicle_maintenance.id = sqlc.arg(id)::uuid;

-- name: TmsAnyVehicleMaintenance :many
select
  sqlc.embed(vehicle_maintenance),
  sqlc.embed(vehicle)
from
  "tms"."vehicle_maintenance" as vehicle_maintenance
  inner join "tms"."vehicles" as vehicle on vehicle_maintenance.vehicle_id = vehicle.id
where
  vehicle_maintenance.id = any (@ids::uuid[]);

-- name: TmsRangeVehicleMaintenance :many
select
  sqlc.embed(vehicle_maintenance),
  sqlc.embed(vehicle)
from
  "tms"."vehicle_maintenance" as vehicle_maintenance
  inner join "tms"."vehicles" as vehicle on vehicle_maintenance.vehicle_id = vehicle.id
where
  vehicle_maintenance.created_at >= @dateFrom::date
  and vehicle_maintenance.created_at <= @dateTo::date;

-- name: TmsInsertVehicleMaintenance :one
insert into "tms"."vehicle_maintenance"(vehicle_id, service_date, service_type, cost, notes)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: TmsUpdateVehicleMaintenance :one
update
  "tms"."vehicle_maintenance"
set
  vehicle_id = case when sqlc.arg(set_vehicle_id)::boolean then
    sqlc.arg(vehicle_id)::uuid
  else
    vehicle_id
  end,
  service_date = case when sqlc.arg(set_service_date)::boolean then
    sqlc.arg(service_date)::date
  else
    service_date
  end,
  service_type = case when sqlc.arg(set_service_type)::boolean then
    sqlc.arg(service_type)::tms.vehicle_service_type_enum
  else
    service_type
  end,
  cost = case when sqlc.arg(set_cost)::boolean then
    sqlc.arg(cost)::numeric
  else
    cost
  end,
  notes = case when sqlc.arg(set_notes)::boolean then
    sqlc.arg(notes)::text
  else
    notes
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveVehicleMaintenance :exec
delete from "tms"."vehicle_maintenance"
where id = @id::uuid;
