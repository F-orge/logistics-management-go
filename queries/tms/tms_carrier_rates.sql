-- name: TmsPaginateCarrierRate :many
select
  sqlc.embed(carrier_rates),
  sqlc.embed(carrier)
from
  "tms"."carrier_rates" as carrier_rates
  inner join "tms"."carriers" as carrier on carrier_rates.carrier_id = carrier.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindCarrierRate :one
select
  sqlc.embed(carrier_rates),
  sqlc.embed(carrier)
from
  "tms"."carrier_rates" as carrier_rates
  inner join "tms"."carriers" as carrier on carrier_rates.carrier_id = carrier.id
where
  carrier_rates.id = sqlc.arg(id)::uuid;

-- name: TmsAnyCarrierRate :many
select
  sqlc.embed(carrier_rates),
  sqlc.embed(carrier)
from
  "tms"."carrier_rates" as carrier_rates
  inner join "tms"."carriers" as carrier on carrier_rates.carrier_id = carrier.id
where
  carrier_rates.id = any (@ids::uuid[]);

-- name: TmsRangeCarrierRate :many
select
  sqlc.embed(carrier_rates),
  sqlc.embed(carrier)
from
  "tms"."carrier_rates" as carrier_rates
  inner join "tms"."carriers" as carrier on carrier_rates.carrier_id = carrier.id
where
  carrier_rates.created_at >= @dateFrom::date
  and carrier_rates.created_at <= @dateTo::date;

-- name: TmsInsertCarrierRate :one
insert into "tms"."carrier_rates"(carrier_id, service_type, origin, destination, rate, unit)
  values ($1, $2, $3, $4, $5, $6)
returning
  *;

-- name: TmsUpdateCarrierRate :one
update
  "tms"."carrier_rates"
set
  carrier_id = case when sqlc.arg(set_carrier_id)::boolean then
    sqlc.arg(carrier_id)::uuid
  else
    carrier_id
  end,
  service_type = case when sqlc.arg(set_service_type)::boolean then
    sqlc.arg(service_type)::varchar
  else
    service_type
  end,
  origin = case when sqlc.arg(set_origin)::boolean then
    sqlc.arg(origin)::varchar
  else
    origin
  end,
  destination = case when sqlc.arg(set_destination)::boolean then
    sqlc.arg(destination)::varchar
  else
    destination
  end,
  rate = case when sqlc.arg(set_rate)::boolean then
    sqlc.arg(rate)::numeric
  else
    rate
  end,
  unit = case when sqlc.arg(set_unit)::boolean then
    sqlc.arg(unit)::tms.carrier_rate_unit_enum
  else
    unit
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveCarrierRate :exec
delete from "tms"."carrier_rates"
where id = @id::uuid;
