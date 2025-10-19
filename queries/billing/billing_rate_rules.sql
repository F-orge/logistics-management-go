-- name: BillingPaginateRateRule :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(rate_rules),
  sqlc.embed(rate_card)
from
  "billing"."rate_rules" as rate_rules
  inner join "billing"."rate_cards" as rate_card on rate_rules.rate_card_id = rate_card.id
where (rate_card.name ilike sqlc.narg(search)::text
  or rate_rules.condition ilike sqlc.narg(search)::text
  or rate_rules.value ilike sqlc.narg(search)::text
  or rate_rules.pricing_model::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: BillingFindRateRule :one
select
  sqlc.embed(rate_rules),
  sqlc.embed(rate_card)
from
  "billing"."rate_rules" as rate_rules
  inner join "billing"."rate_cards" as rate_card on rate_rules.rate_card_id = rate_card.id
where
  rate_rules.id = sqlc.arg(id)::uuid;

-- name: BillingAnyRateRule :many
select
  sqlc.embed(rate_rules),
  sqlc.embed(rate_card)
from
  "billing"."rate_rules" as rate_rules
  inner join "billing"."rate_cards" as rate_card on rate_rules.rate_card_id = rate_card.id
where
  rate_rules.id = any (@ids::uuid[]);

-- name: BillingRangeRateRule :many
select
  sqlc.embed(rate_rules),
  sqlc.embed(rate_card)
from
  "billing"."rate_rules" as rate_rules
  inner join "billing"."rate_cards" as rate_card on rate_rules.rate_card_id = rate_card.id
where
  rate_rules.created_at >= @dateFrom::date
  and rate_rules.created_at <= @dateTo::date
  and (rate_card.name ilike sqlc.narg(search)::text
    or rate_rules.condition ilike sqlc.narg(search)::text
    or rate_rules.value ilike sqlc.narg(search)::text
    or rate_rules.pricing_model::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: BillingInsertRateRule :one
insert into "billing"."rate_rules"(rate_card_id, condition, value, price, pricing_model, min_value, max_value, priority, is_active)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning
  *;

-- name: BillingUpdateRateRule :one
update
  "billing"."rate_rules"
set
  updated_at = now(),
  rate_card_id = case when sqlc.arg(rate_card_id) is not null then
    sqlc.arg(rate_card_id)::uuid
  else
    rate_card_id
  end,
  condition = case when sqlc.arg(condition) is not null then
    sqlc.arg(condition)::varchar
  else
    condition
  end,
  value = case when sqlc.arg(value) is not null then
    sqlc.arg(value)::varchar
  else
    value
  end,
  price = case when sqlc.arg(price) is not null then
    sqlc.arg(price)::numeric
  else
    price
  end,
  pricing_model = case when sqlc.arg(pricing_model) is not null then
    sqlc.arg(pricing_model)::billing.pricing_model_enum
  else
    pricing_model
  end,
  min_value = case when sqlc.arg(min_value) is not null then
    sqlc.arg(min_value)::numeric
  else
    min_value
  end,
  max_value = case when sqlc.arg(max_value) is not null then
    sqlc.arg(max_value)::numeric
  else
    max_value
  end,
  priority = case when sqlc.arg(priority) is not null then
    sqlc.arg(priority)::integer
  else
    priority
  end,
  is_active = case when sqlc.arg(is_active) is not null then
    sqlc.arg(is_active)::boolean
  else
    is_active
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: BillingRemoveRateRule :exec
delete from "billing"."rate_rules"
where id = @id::uuid;

