-- name: TmsPaginateVehicleMaintenanceMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "tms"."vehicle_maintenance" as vehicle_maintenance
  inner join "tms"."vehicles" as vehicle on vehicle_maintenance.vehicle_id = vehicle.id
where (vehicle.registration_number ilike sqlc.narg(search)::text
  or vehicle_maintenance.service_type::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: TmsPaginateVehicleMaintenance :many
select
  vehicle_maintenance.*,
  sqlc.embed(vehicle)
from
  "tms"."vehicle_maintenance" as vehicle_maintenance
  inner join "tms"."vehicles" as vehicle on vehicle_maintenance.vehicle_id = vehicle.id
where (vehicle.registration_number ilike sqlc.narg(search)::text
  or vehicle_maintenance.service_type::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: TmsFindVehicleMaintenance :one
select
  vehicle_maintenance.*,
  sqlc.embed(vehicle)
from
  "tms"."vehicle_maintenance" as vehicle_maintenance
  inner join "tms"."vehicles" as vehicle on vehicle_maintenance.vehicle_id = vehicle.id
where
  vehicle_maintenance.id = sqlc.arg(id)::uuid;

-- name: TmsAnyVehicleMaintenance :many
select
  vehicle_maintenance.*,
  sqlc.embed(vehicle)
from
  "tms"."vehicle_maintenance" as vehicle_maintenance
  inner join "tms"."vehicles" as vehicle on vehicle_maintenance.vehicle_id = vehicle.id
where
  vehicle_maintenance.id = any (@ids::uuid[]);

-- name: TmsRangeVehicleMaintenance :many
select
  vehicle_maintenance.*,
  sqlc.embed(vehicle)
from
  "tms"."vehicle_maintenance" as vehicle_maintenance
  inner join "tms"."vehicles" as vehicle on vehicle_maintenance.vehicle_id = vehicle.id
where
  vehicle_maintenance.created_at >= @dateFrom::date
  and vehicle_maintenance.created_at <= @dateTo::date
  and (vehicle.registration_number ilike sqlc.narg(search)::text
    or vehicle_maintenance.service_type::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: TmsInsertVehicleMaintenance :one
insert into "tms"."vehicle_maintenance"(vehicle_id, service_date, service_type, cost, notes)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: TmsUpdateVehicleMaintenance :one
update
  "tms"."vehicle_maintenance"
set
  updated_at = now(),
  vehicle_id = case when sqlc.arg(vehicle_id) is not null then
    sqlc.arg(vehicle_id)::uuid
  else
    vehicle_id
  end,
  service_date = case when sqlc.arg(service_date) is not null then
    sqlc.arg(service_date)::date
  else
    service_date
  end,
  service_type = case when sqlc.arg(service_type) is not null then
    sqlc.arg(service_type)::tms.vehicle_service_type_enum
  else
    service_type
  end,
  cost = case when sqlc.arg(
    cost) is not null then
    sqlc.arg(
      cost)::numeric
  else
    cost
  end,
  notes = case when sqlc.arg(notes) is not null then
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

