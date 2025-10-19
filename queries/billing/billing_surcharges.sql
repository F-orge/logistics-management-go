-- name: BillingPaginateSurchargeMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "billing"."surcharges" as surcharges;

-- name: BillingPaginateSurcharge :many
select
  *
from
  "billing"."surcharges" as surcharges
where (name ilike sqlc.narg(search)::text
  or type ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: BillingFindSurcharge :one
select
  *
from
  "billing"."surcharges"
where
  id = sqlc.arg(id)::uuid;

-- name: BillingAnySurcharge :many
select
  *
from
  "billing"."surcharges"
where
  id = any (@ids::uuid[]);

-- name: BillingRangeSurcharge :many
select
  *
from
  "billing"."surcharges"
where
  created_at >= @dateFrom::date
  and created_at <= @dateTo::date
  and (name ilike sqlc.narg(search)::text
    or type ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: BillingInsertSurcharge :one
insert into "billing"."surcharges"(name, type, amount, calculation_method, is_active, valid_from, valid_to, description)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
returning
  *;

-- name: BillingUpdateSurcharge :one
update
  "billing"."surcharges"
set
  updated_at = now(),
  name = case when sqlc.arg(name) is not null then
    sqlc.arg(name)::varchar
  else
    name
  end,
  type = case when sqlc.arg(type) is not null then
    sqlc.arg(type)::varchar
  else
    type
  end,
  amount = case when sqlc.arg(amount) is not null then
    sqlc.arg(amount)::numeric
  else
    amount
  end,
  calculation_method = case when sqlc.arg(calculation_method) is not null then
    sqlc.arg(calculation_method)::billing.surcharge_calculation_method_enum
  else
    calculation_method
  end,
  is_active = case when sqlc.arg(is_active) is not null then
    sqlc.arg(is_active)::boolean
  else
    is_active
  end,
  valid_from = case when sqlc.arg(valid_from) is not null then
    sqlc.arg(valid_from)::date
  else
    valid_from
  end,
  valid_to = case when sqlc.arg(valid_to) is not null then
    sqlc.arg(valid_to)::date
  else
    valid_to
  end,
  description = case when sqlc.arg(description) is not null then
    sqlc.arg(description)::text
  else
    description
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: BillingRemoveSurcharge :exec
delete from "billing"."surcharges"
where id = @id::uuid;

