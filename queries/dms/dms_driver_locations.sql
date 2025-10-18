-- name: DmsPaginateDriverLocation :many
select
  sqlc.embed(driver_locations),
  sqlc.embed(driver)
from
  "dms"."driver_locations" as driver_locations
  inner join "tms"."drivers" as driver on driver_locations.driver_id = driver.id
where
  (driver.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: DmsFindDriverLocation :one
select
  sqlc.embed(driver_locations),
  sqlc.embed(driver)
from
  "dms"."driver_locations" as driver_locations
  inner join "tms"."drivers" as driver on driver_locations.driver_id = driver.id
where
  driver_locations.id = sqlc.arg(id)::uuid;

-- name: DmsAnyDriverLocation :many
select
  sqlc.embed(driver_locations),
  sqlc.embed(driver)
from
  "dms"."driver_locations" as driver_locations
  inner join "tms"."drivers" as driver on driver_locations.driver_id = driver.id
where
  driver_locations.id = any (@ids::uuid[]);

-- name: DmsRangeDriverLocation :many
select
  sqlc.embed(driver_locations),
  sqlc.embed(driver)
from
  "dms"."driver_locations" as driver_locations
  inner join "tms"."drivers" as driver on driver_locations.driver_id = driver.id
where
  driver_locations.created_at >= @dateFrom::date
  and driver_locations.created_at <= @dateTo::date
  and (driver.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: DmsInsertDriverLocation :one
insert into "dms"."driver_locations"(driver_id, latitude, longitude, altitude, accuracy, speed_kmh, heading, timestamp)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
returning
  *;

-- name: DmsUpdateDriverLocation :one
update
  "dms"."driver_locations"
set
  updated_at = now(),
  driver_id = case when sqlc.arg(set_driver_id)::boolean then
    sqlc.arg(driver_id)::uuid
  else
    driver_id
  end,
  latitude = case when sqlc.arg(set_latitude)::boolean then
    sqlc.arg(latitude)::real
  else
    latitude
  end,
  longitude = case when sqlc.arg(set_longitude)::boolean then
    sqlc.arg(longitude)::real
  else
    longitude
  end,
  altitude = case when sqlc.arg(set_altitude)::boolean then
    sqlc.arg(altitude)::real
  else
    altitude
  end,
  accuracy = case when sqlc.arg(set_accuracy)::boolean then
    sqlc.arg(accuracy)::real
  else
    accuracy
  end,
  speed_kmh = case when sqlc.arg(set_speed_kmh)::boolean then
    sqlc.arg(speed_kmh)::real
  else
    speed_kmh
  end,
  heading = case when sqlc.arg(set_heading)::boolean then
    sqlc.arg(heading)::real
  else
    heading
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

-- name: DmsRemoveDriverLocation :exec
delete from "dms"."driver_locations"
where id = @id::uuid;