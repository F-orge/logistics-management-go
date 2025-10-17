-- name: TmsPaginateRoute :many
select
  sqlc.embed(routes),
  sqlc.embed(trip)
from
  "tms"."routes" as routes
  inner join "tms"."trips" as trip on routes.trip_id = trip.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindRoute :one
select
  sqlc.embed(routes),
  sqlc.embed(trip)
from
  "tms"."routes" as routes
  inner join "tms"."trips" as trip on routes.trip_id = trip.id
where
  routes.id = sqlc.arg(id)::uuid;

-- name: TmsAnyRoute :many
select
  sqlc.embed(routes),
  sqlc.embed(trip)
from
  "tms"."routes" as routes
  inner join "tms"."trips" as trip on routes.trip_id = trip.id
where
  routes.id = any (@ids::uuid[]);

-- name: TmsRangeRoute :many
select
  sqlc.embed(routes),
  sqlc.embed(trip)
from
  "tms"."routes" as routes
  inner join "tms"."trips" as trip on routes.trip_id = trip.id
where
  routes.created_at >= @dateFrom::date
  and routes.created_at <= @dateTo::date;

-- name: TmsInsertRoute :one
insert into "tms"."routes"(trip_id, optimized_route_data, total_distance, total_duration)
  values ($1, $2, $3, $4)
returning
  *;

-- name: TmsUpdateRoute :one
update
  "tms"."routes"
set
  trip_id = case when sqlc.arg(set_trip_id)::boolean then
    sqlc.arg(trip_id)::uuid
  else
    trip_id
  end,
  optimized_route_data = case when sqlc.arg(set_optimized_route_data)::boolean then
    sqlc.arg(optimized_route_data)::text
  else
    optimized_route_data
  end,
  total_distance = case when sqlc.arg(set_total_distance)::boolean then
    sqlc.arg(total_distance)::real
  else
    total_distance
  end,
  total_duration = case when sqlc.arg(set_total_duration)::boolean then
    sqlc.arg(total_duration)::real
  else
    total_duration
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveRoute :exec
delete from "tms"."routes"
where id = @id::uuid;
