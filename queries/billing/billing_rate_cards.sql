-- name: BillingPaginateRateCardMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "billing"."rate_cards_view" as rate_cards;

-- name: BillingPaginateRateCard :many
select
  rate_cards.*,
  sqlc.embed(created_by_user)
from
  "billing"."rate_cards_view" as rate_cards
  left join "public"."user" as created_by_user on rate_cards.created_by_user_id = created_by_user.id
where (rate_cards.name ilike sqlc.narg(search)::text
  or rate_cards.service_type::text ilike sqlc.narg(search)::text
  or created_by_user.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: BillingFindRateCard :one
select
  rate_cards.*,
  sqlc.embed(created_by_user)
from
  "billing"."rate_cards_view" as rate_cards
  left join "public"."user" as created_by_user on rate_cards.created_by_user_id = created_by_user.id
where
  rate_cards.id = sqlc.arg(id)::uuid;

-- name: BillingAnyRateCard :many
select
  rate_cards.*,
  sqlc.embed(created_by_user)
from
  "billing"."rate_cards_view" as rate_cards
  left join "public"."user" as created_by_user on rate_cards.created_by_user_id = created_by_user.id
where
  rate_cards.id = any (@ids::uuid[]);

-- name: BillingRangeRateCard :many
select
  rate_cards.*,
  sqlc.embed(created_by_user)
from
  "billing"."rate_cards_view" as rate_cards
  left join "public"."user" as created_by_user on rate_cards.created_by_user_id = created_by_user.id
where
  rate_cards.created_at >= @dateFrom::date
  and rate_cards.created_at <= @dateTo::date
  and (rate_cards.name ilike sqlc.narg(search)::text
    or rate_cards.service_type::text ilike sqlc.narg(search)::text
    or created_by_user.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: BillingInsertRateCard :one
insert into "billing"."rate_cards"(name, service_type, is_active, valid_from, valid_to, description, created_by_user_id)
  values ($1, $2, $3, $4, $5, $6, $7)
returning
  *;

-- name: BillingUpdateRateCard :one
update
  "billing"."rate_cards"
set
  updated_at = now(),
  name = case when sqlc.arg(name) is not null then
    sqlc.arg(name)::varchar
  else
    name
  end,
  service_type = case when sqlc.arg(service_type) is not null then
    sqlc.arg(service_type)::billing.service_type_enum
  else
    service_type
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
  end,
  created_by_user_id = case when sqlc.arg(created_by_user_id) is not null then
    sqlc.arg(created_by_user_id)::text
  else
    created_by_user_id
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: BillingRemoveRateCard :exec
delete from "billing"."rate_cards"
where id = @id::uuid;

