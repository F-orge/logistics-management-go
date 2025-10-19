-- name: BillingPaginateQuote :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(quotes),
  sqlc.embed(client),
  sqlc.embed(created_by_user)
from
  "billing"."quotes_view" as quotes
  left join "crm"."companies" as client on quotes.client_id = client.id
  left join "public"."user" as created_by_user on quotes.created_by_user_id = created_by_user.id
where (client.name ilike sqlc.narg(search)::text
  or quotes.quote_number ilike sqlc.narg(search)::text
  or quotes.service_level ilike sqlc.narg(search)::text
  or quotes.status::text ilike sqlc.narg(search)::text
  or created_by_user.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: BillingFindQuote :one
select
  sqlc.embed(quotes),
  sqlc.embed(client),
  sqlc.embed(created_by_user)
from
  "billing"."quotes_view" as quotes
  left join "crm"."companies" as client on quotes.client_id = client.id
  left join "public"."user" as created_by_user on quotes.created_by_user_id = created_by_user.id
where
  quotes.id = sqlc.arg(id)::uuid;

-- name: BillingAnyQuote :many
select
  sqlc.embed(quotes),
  sqlc.embed(client),
  sqlc.embed(created_by_user)
from
  "billing"."quotes_view" as quotes
  left join "crm"."companies" as client on quotes.client_id = client.id
  left join "public"."user" as created_by_user on quotes.created_by_user_id = created_by_user.id
where
  quotes.id = any (@ids::uuid[]);

-- name: BillingRangeQuote :many
select
  sqlc.embed(quotes),
  sqlc.embed(client),
  sqlc.embed(created_by_user)
from
  "billing"."quotes_view" as quotes
  left join "crm"."companies" as client on quotes.client_id = client.id
  left join "public"."user" as created_by_user on quotes.created_by_user_id = created_by_user.id
where
  quotes.created_at >= @dateFrom::date
  and quotes.created_at <= @dateTo::date
  and (client.name ilike sqlc.narg(search)::text
    or quotes.quote_number ilike sqlc.narg(search)::text
    or quotes.service_level ilike sqlc.narg(search)::text
    or quotes.status::text ilike sqlc.narg(search)::text
    or created_by_user.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: BillingInsertQuote :one
insert into "billing"."quotes"(client_id, origin_details, destination_details, weight, length, width, height, quoted_price, service_level, expires_at, status, quote_number, notes, created_by_user_id)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
returning
  *;

-- name: BillingUpdateQuote :one
update
  "billing"."quotes"
set
  updated_at = now(),
  client_id = case when sqlc.arg(client_id) is not null then
    sqlc.arg(client_id)::uuid
  else
    client_id
  end,
  origin_details = case when sqlc.arg(origin_details) is not null then
    sqlc.arg(origin_details)::text
  else
    origin_details
  end,
  destination_details = case when sqlc.arg(destination_details) is not null then
    sqlc.arg(destination_details)::text
  else
    destination_details
  end,
  weight = case when sqlc.arg(weight) is not null then
    sqlc.arg(weight)::numeric
  else
    weight
  end,
  length = case when sqlc.arg(length) is not null then
    sqlc.arg(length)::numeric
  else
    length
  end,
  width = case when sqlc.arg(width) is not null then
    sqlc.arg(width)::numeric
  else
    width
  end,
  height = case when sqlc.arg(height) is not null then
    sqlc.arg(height)::numeric
  else
    height
  end,
  quoted_price = case when sqlc.arg(quoted_price) is not null then
    sqlc.arg(quoted_price)::numeric
  else
    quoted_price
  end,
  service_level = case when sqlc.arg(service_level) is not null then
    sqlc.arg(service_level)::varchar
  else
    service_level
  end,
  expires_at = case when sqlc.arg(expires_at) is not null then
    sqlc.arg(expires_at)::timestamp
  else
    expires_at
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::billing.quote_status_enum
  else
    status
  end,
  quote_number = case when sqlc.arg(quote_number) is not null then
    sqlc.arg(quote_number)::varchar
  else
    quote_number
  end,
  notes = case when sqlc.arg(notes) is not null then
    sqlc.arg(notes)::text
  else
    notes
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

-- name: BillingRemoveQuote :exec
delete from "billing"."quotes"
where id = @id::uuid;

