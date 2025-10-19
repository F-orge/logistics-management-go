-- name: DmsPaginateDeliveryRoute :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(delivery_routes),
  sqlc.embed(driver)
from
  "dms"."delivery_routes_view" as delivery_routes
  inner join "tms"."drivers" as driver on delivery_routes.driver_id = driver.id
where (driver.name ilike sqlc.narg(search)::text
  or delivery_routes.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: DmsFindDeliveryRoute :one
select
  sqlc.embed(delivery_routes),
  sqlc.embed(driver)
from
  "dms"."delivery_routes_view" as delivery_routes
  inner join "tms"."drivers" as driver on delivery_routes.driver_id = driver.id
where
  delivery_routes.id = sqlc.arg(id)::uuid;

-- name: DmsAnyDeliveryRoute :many
select
  sqlc.embed(delivery_routes),
  sqlc.embed(driver)
from
  "dms"."delivery_routes_view" as delivery_routes
  inner join "tms"."drivers" as driver on delivery_routes.driver_id = driver.id
where
  delivery_routes.id = any (@ids::uuid[]);

-- name: DmsRangeDeliveryRoute :many
select
  sqlc.embed(delivery_routes),
  sqlc.embed(driver)
from
  "dms"."delivery_routes_view" as delivery_routes
  inner join "tms"."drivers" as driver on delivery_routes.driver_id = driver.id
where
  delivery_routes.created_at >= @dateFrom::date
  and delivery_routes.created_at <= @dateTo::date
  and (driver.name ilike sqlc.narg(search)::text
    or delivery_routes.status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: DmsInsertDeliveryRoute :one
insert into "dms"."delivery_routes"(driver_id, route_date, status, optimized_route_data, total_distance_km, estimated_duration_minutes, started_at, completed_at)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
returning
  *;

-- name: DmsUpdateDeliveryRoute :one
update
  "dms"."delivery_routes"
set
  updated_at = now(),
  driver_id = case when sqlc.arg(driver_id) is not null then
    sqlc.arg(driver_id)::uuid
  else
    driver_id
  end,
  route_date = case when sqlc.arg(route_date) is not null then
    sqlc.arg(route_date)::date
  else
    route_date
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::dms.delivery_route_status_enum
  else
    status
  end,
  optimized_route_data = case when sqlc.arg(optimized_route_data) is not null then
    sqlc.arg(optimized_route_data)::text
  else
    optimized_route_data
  end,
  total_distance_km = case when sqlc.arg(total_distance_km) is not null then
    sqlc.arg(total_distance_km)::real
  else
    total_distance_km
  end,
  estimated_duration_minutes = case when sqlc.arg(estimated_duration_minutes) is not null then
    sqlc.arg(estimated_duration_minutes)::integer
  else
    estimated_duration_minutes
  end,
  started_at = case when sqlc.arg(started_at) is not null then
    sqlc.arg(started_at)::timestamp
  else
    started_at
  end,
  completed_at = case when sqlc.arg(completed_at) is not null then
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

