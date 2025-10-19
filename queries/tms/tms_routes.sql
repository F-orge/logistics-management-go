-- name: TmsPaginateRoute :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(routes),
  sqlc.embed(trip)
from
  "tms"."routes" as routes
  inner join "tms"."trips" as trip on routes.trip_id = trip.id
where (trip.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

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
  and routes.created_at <= @dateTo::date
  and (trip.status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: TmsInsertRoute :one
insert into "tms"."routes"(trip_id, optimized_route_data, total_distance, total_duration)
  values ($1, $2, $3, $4)
returning
  *;

-- name: TmsUpdateRoute :one
update
  "tms"."routes"
set
  updated_at = now(),
  trip_id = case when sqlc.arg(trip_id) is not null then
    sqlc.arg(trip_id)::uuid
  else
    trip_id
  end,
  optimized_route_data = case when sqlc.arg(optimized_route_data) is not null then
    sqlc.arg(optimized_route_data)::text
  else
    optimized_route_data
  end,
  total_distance = case when sqlc.arg(total_distance) is not null then
    sqlc.arg(total_distance)::real
  else
    total_distance
  end,
  total_duration = case when sqlc.arg(total_duration) is not null then
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

