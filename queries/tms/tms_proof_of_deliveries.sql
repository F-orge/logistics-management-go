-- name: TmsPaginateProofOfDelivery :many
select
  sqlc.embed(proof_of_deliveries),
  sqlc.embed(trip_stop)
from
  "tms"."proof_of_deliveries" as proof_of_deliveries
  inner join "tms"."trip_stops" as trip_stop on proof_of_deliveries.trip_stop_id = trip_stop.id
where (trip_stop.address ilike sqlc.narg(search)::text
  or proof_of_deliveries.type::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: TmsFindProofOfDelivery :one
select
  sqlc.embed(proof_of_deliveries),
  sqlc.embed(trip_stop)
from
  "tms"."proof_of_deliveries" as proof_of_deliveries
  inner join "tms"."trip_stops" as trip_stop on proof_of_deliveries.trip_stop_id = trip_stop.id
where
  proof_of_deliveries.id = sqlc.arg(id)::uuid;

-- name: TmsAnyProofOfDelivery :many
select
  sqlc.embed(proof_of_deliveries),
  sqlc.embed(trip_stop)
from
  "tms"."proof_of_deliveries" as proof_of_deliveries
  inner join "tms"."trip_stops" as trip_stop on proof_of_deliveries.trip_stop_id = trip_stop.id
where
  proof_of_deliveries.id = any (@ids::uuid[]);

-- name: TmsRangeProofOfDelivery :many
select
  sqlc.embed(proof_of_deliveries),
  sqlc.embed(trip_stop)
from
  "tms"."proof_of_deliveries" as proof_of_deliveries
  inner join "tms"."trip_stops" as trip_stop on proof_of_deliveries.trip_stop_id = trip_stop.id
where
  proof_of_deliveries.created_at >= @dateFrom::date
  and proof_of_deliveries.created_at <= @dateTo::date
  and (trip_stop.address ilike sqlc.narg(search)::text
    or proof_of_deliveries.type::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: TmsInsertProofOfDelivery :one
insert into "tms"."proof_of_deliveries"(trip_stop_id, type, file_path, timestamp, latitude, longitude)
  values ($1, $2, $3, $4, $5, $6)
returning
  *;

-- name: TmsUpdateProofOfDelivery :one
update
  "tms"."proof_of_deliveries"
set
  updated_at = now(),
  trip_stop_id = case when sqlc.arg(trip_stop_id) is not null then
    sqlc.arg(trip_stop_id)::uuid
  else
    trip_stop_id
  end,
  type = case when sqlc.arg(type) is not null then
    sqlc.arg(type)::tms.proof_type_enum
  else
    type
  end,
  file_path = case when sqlc.arg(file_path) is not null then
    sqlc.arg(file_path)::varchar
  else
    file_path
  end,
  timestamp = case when sqlc.arg(timestamp) is not null then
    sqlc.arg(timestamp)::timestamp
  else
    timestamp
  end,
  latitude = case when sqlc.arg(latitude) is not null then
    sqlc.arg(latitude)::real
  else
    latitude
  end,
  longitude = case when sqlc.arg(longitude) is not null then
    sqlc.arg(longitude)::real
  else
    longitude
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveProofOfDelivery :exec
delete from "tms"."proof_of_deliveries"
where id = @id::uuid;

