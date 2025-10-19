-- name: TmsPaginateCarrierRate :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(carrier_rates),
  sqlc.embed(carrier)
from
  "tms"."carrier_rates" as carrier_rates
  inner join "tms"."carriers" as carrier on carrier_rates.carrier_id = carrier.id
where (carrier.name ilike sqlc.narg(search)::text
  or carrier_rates.service_type ilike sqlc.narg(search)::text
  or carrier_rates.origin ilike sqlc.narg(search)::text
  or carrier_rates.destination ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

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
  and carrier_rates.created_at <= @dateTo::date
  and (carrier.name ilike sqlc.narg(search)::text
    or carrier_rates.service_type ilike sqlc.narg(search)::text
    or carrier_rates.origin ilike sqlc.narg(search)::text
    or carrier_rates.destination ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: TmsInsertCarrierRate :one
insert into "tms"."carrier_rates"(carrier_id, service_type, origin, destination, rate, unit)
  values ($1, $2, $3, $4, $5, $6)
returning
  *;

-- name: TmsUpdateCarrierRate :one
update
  "tms"."carrier_rates"
set
  updated_at = now(),
  carrier_id = case when sqlc.arg(carrier_id) is not null then
    sqlc.arg(carrier_id)::uuid
  else
    carrier_id
  end,
  service_type = case when sqlc.arg(service_type) is not null then
    sqlc.arg(service_type)::varchar
  else
    service_type
  end,
  origin = case when sqlc.arg(origin) is not null then
    sqlc.arg(origin)::varchar
  else
    origin
  end,
  destination = case when sqlc.arg(destination) is not null then
    sqlc.arg(destination)::varchar
  else
    destination
  end,
  rate = case when sqlc.arg(rate) is not null then
    sqlc.arg(rate)::numeric
  else
    rate
  end,
  unit = case when sqlc.arg(unit) is not null then
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

