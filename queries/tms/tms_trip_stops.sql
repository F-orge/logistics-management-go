-- name: TmsPaginateTripStop :many
select
  sqlc.embed(trip_stops),
  sqlc.embed(trip)
from
  "tms"."trip_stops" as trip_stops
  inner join "tms"."trips" as trip on trip_stops.trip_id = trip.id
where
  (trip.status::text ilike sqlc.narg(search)::text
  or trip_stops.address ilike sqlc.narg(search)::text
  or trip_stops.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindTripStop :one
select
  sqlc.embed(trip_stops),
  sqlc.embed(trip)
from
  "tms"."trip_stops" as trip_stops
  inner join "tms"."trips" as trip on trip_stops.trip_id = trip.id
where
  trip_stops.id = sqlc.arg(id)::uuid;

-- name: TmsAnyTripStop :many
select
  sqlc.embed(trip_stops),
  sqlc.embed(trip)
from
  "tms"."trip_stops" as trip_stops
  inner join "tms"."trips" as trip on trip_stops.trip_id = trip.id
where
  trip_stops.id = any (@ids::uuid[]);

-- name: TmsRangeTripStop :many
select
  sqlc.embed(trip_stops),
  sqlc.embed(trip)
from
  "tms"."trip_stops" as trip_stops
  inner join "tms"."trips" as trip on trip_stops.trip_id = trip.id
where
  trip_stops.created_at >= @dateFrom::date
  and trip_stops.created_at <= @dateTo::date
  and (trip.status::text ilike sqlc.narg(search)::text
  or trip_stops.address ilike sqlc.narg(search)::text
  or trip_stops.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: TmsInsertTripStop :one
insert into "tms"."trip_stops"(trip_id, shipment_id, sequence, address, status, estimated_arrival_time, actual_arrival_time, estimated_departure_time, actual_departure_time)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning
  *;

-- name: TmsUpdateTripStop :one
update
  "tms"."trip_stops"
set
  updated_at = now(),
  trip_id = case when sqlc.arg(set_trip_id)::boolean then
    sqlc.arg(trip_id)::uuid
  else
    trip_id
  end,
  shipment_id = case when sqlc.arg(set_shipment_id)::boolean then
    sqlc.arg(shipment_id)::uuid
  else
    shipment_id
  end,
  sequence = case when sqlc.arg(set_sequence)::boolean then
    sqlc.arg(sequence)::integer
  else
    sequence
  end,
  address = case when sqlc.arg(set_address)::boolean then
    sqlc.arg(address)::varchar
  else
    address
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::tms.trip_stop_status_enum
  else
    status
  end,
  estimated_arrival_time = case when sqlc.arg(set_estimated_arrival_time)::boolean then
    sqlc.arg(estimated_arrival_time)::timestamp
  else
    estimated_arrival_time
  end,
  actual_arrival_time = case when sqlc.arg(set_actual_arrival_time)::boolean then
    sqlc.arg(actual_arrival_time)::timestamp
  else
    actual_arrival_time
  end,
  estimated_departure_time = case when sqlc.arg(set_estimated_departure_time)::boolean then
    sqlc.arg(estimated_departure_time)::timestamp
  else
    estimated_departure_time
  end,
  actual_departure_time = case when sqlc.arg(set_actual_departure_time)::boolean then
    sqlc.arg(actual_departure_time)::timestamp
  else
    actual_departure_time
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveTripStop :exec
delete from "tms"."trip_stops"
where id = @id::uuid;
