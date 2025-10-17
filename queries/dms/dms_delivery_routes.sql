-- name: DmsPaginateDeliveryRoute :many
select
  sqlc.embed(delivery_routes),
  sqlc.embed(driver)
from
  "dms"."delivery_routes" as delivery_routes
  inner join "tms"."drivers" as driver on delivery_routes.driver_id = driver.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: DmsFindDeliveryRoute :one
select
  sqlc.embed(delivery_routes),
  sqlc.embed(driver)
from
  "dms"."delivery_routes" as delivery_routes
  inner join "tms"."drivers" as driver on delivery_routes.driver_id = driver.id
where
  delivery_routes.id = sqlc.arg(id)::uuid;

-- name: DmsAnyDeliveryRoute :many
select
  sqlc.embed(delivery_routes),
  sqlc.embed(driver)
from
  "dms"."delivery_routes" as delivery_routes
  inner join "tms"."drivers" as driver on delivery_routes.driver_id = driver.id
where
  delivery_routes.id = any (@ids::uuid[]);

-- name: DmsRangeDeliveryRoute :many
select
  sqlc.embed(delivery_routes),
  sqlc.embed(driver)
from
  "dms"."delivery_routes" as delivery_routes
  inner join "tms"."drivers" as driver on delivery_routes.driver_id = driver.id
where
  delivery_routes.created_at >= @dateFrom::date
  and delivery_routes.created_at <= @dateTo::date;

-- name: DmsInsertDeliveryRoute :one
insert into "dms"."delivery_routes"(driver_id, route_date, status, optimized_route_data, total_distance_km, estimated_duration_minutes, started_at, completed_at)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
returning
  *;

-- name: DmsUpdateDeliveryRoute :one
update
  "dms"."delivery_routes"
set
  driver_id = case when sqlc.arg(set_driver_id)::boolean then
    sqlc.arg(driver_id)::uuid
  else
    driver_id
  end,
  route_date = case when sqlc.arg(set_route_date)::boolean then
    sqlc.arg(route_date)::date
  else
    route_date
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::dms.delivery_route_status_enum
  else
    status
  end,
  optimized_route_data = case when sqlc.arg(set_optimized_route_data)::boolean then
    sqlc.arg(optimized_route_data)::text
  else
    optimized_route_data
  end,
  total_distance_km = case when sqlc.arg(set_total_distance_km)::boolean then
    sqlc.arg(total_distance_km)::real
  else
    total_distance_km
  end,
  estimated_duration_minutes = case when sqlc.arg(set_estimated_duration_minutes)::boolean then
    sqlc.arg(estimated_duration_minutes)::integer
  else
    estimated_duration_minutes
  end,
  started_at = case when sqlc.arg(set_started_at)::boolean then
    sqlc.arg(started_at)::timestamp
  else
    started_at
  end,
  completed_at = case when sqlc.arg(set_completed_at)::boolean then
    sqlc.arg(completed_at)::timestamp
  else
    completed_at
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: DmsRemoveDeliveryRoute :exec
delete from "dms"."delivery_routes"
where id = @id::uuid;
