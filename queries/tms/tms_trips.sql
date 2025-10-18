-- name: TmsPaginateTrip :many
select
  sqlc.embed(trips),
  sqlc.embed(driver),
  sqlc.embed(vehicle)
from
  "tms"."trips" as trips
  left join "tms"."drivers" as driver on trips.driver_id = driver.id
  left join "tms"."vehicles" as vehicle on trips.vehicle_id = vehicle.id
where
  (driver.name ilike sqlc.narg(search)::text
  or vehicle.registration_number ilike sqlc.narg(search)::text
  or trips.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindTrip :one
select
  sqlc.embed(trips),
  sqlc.embed(driver),
  sqlc.embed(vehicle)
from
  "tms"."trips" as trips
  left join "tms"."drivers" as driver on trips.driver_id = driver.id
  left join "tms"."vehicles" as vehicle on trips.vehicle_id = vehicle.id
where
  trips.id = sqlc.arg(id)::uuid;

-- name: TmsAnyTrip :many
select
  sqlc.embed(trips),
  sqlc.embed(driver),
  sqlc.embed(vehicle)
from
  "tms"."trips" as trips
  left join "tms"."drivers" as driver on trips.driver_id = driver.id
  left join "tms"."vehicles" as vehicle on trips.vehicle_id = vehicle.id
where
  trips.id = any (@ids::uuid[]);

-- name: TmsRangeTrip :many
select
  sqlc.embed(trips),
  sqlc.embed(driver),
  sqlc.embed(vehicle)
from
  "tms"."trips" as trips
  left join "tms"."drivers" as driver on trips.driver_id = driver.id
  left join "tms"."vehicles" as vehicle on trips.vehicle_id = vehicle.id
where
  trips.created_at >= @dateFrom::date
  and trips.created_at <= @dateTo::date
  and (driver.name ilike sqlc.narg(search)::text
  or vehicle.registration_number ilike sqlc.narg(search)::text
  or trips.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: TmsInsertTrip :one
insert into "tms"."trips"(driver_id, vehicle_id, status)
  values ($1, $2, $3)
returning
  *;

-- name: TmsUpdateTrip :one
update
  "tms"."trips"
set
  updated_at = now(),
  driver_id = case when sqlc.arg(set_driver_id)::boolean then
    sqlc.arg(driver_id)::uuid
  else
    driver_id
  end,
  vehicle_id = case when sqlc.arg(set_vehicle_id)::boolean then
    sqlc.arg(vehicle_id)::uuid
  else
    vehicle_id
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::tms.trip_status_enum
  else
    status
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveTrip :exec
delete from "tms"."trips"
where id = @id::uuid;
