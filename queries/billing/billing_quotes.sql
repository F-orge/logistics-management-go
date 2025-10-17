-- name: BillingPaginateQuote :many
select
  sqlc.embed(quotes),
  sqlc.embed(client),
  sqlc.embed(created_by_user)
from
  "billing"."quotes" as quotes
  left join "crm"."companies" as client on quotes.client_id = client.id
  left join "public"."user" as created_by_user on quotes.created_by_user_id = created_by_user.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: BillingFindQuote :one
select
  sqlc.embed(quotes),
  sqlc.embed(client),
  sqlc.embed(created_by_user)
from
  "billing"."quotes" as quotes
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
  "billing"."quotes" as quotes
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
  "billing"."quotes" as quotes
  left join "crm"."companies" as client on quotes.client_id = client.id
  left join "public"."user" as created_by_user on quotes.created_by_user_id = created_by_user.id
where
  quotes.created_at >= @dateFrom::date
  and quotes.created_at <= @dateTo::date;

-- name: BillingInsertQuote :one
insert into "billing"."quotes"(client_id, origin_details, destination_details, weight, length, width, height, quoted_price, service_level, expires_at, status, quote_number, notes, created_by_user_id)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
returning
  *;

-- name: BillingUpdateQuote :one
update
  "billing"."quotes"
set
  client_id = case when sqlc.arg(set_client_id)::boolean then
    sqlc.arg(client_id)::uuid
  else
    client_id
  end,
  origin_details = case when sqlc.arg(set_origin_details)::boolean then
    sqlc.arg(origin_details)::text
  else
    origin_details
  end,
  destination_details = case when sqlc.arg(set_destination_details)::boolean then
    sqlc.arg(destination_details)::text
  else
    destination_details
  end,
  weight = case when sqlc.arg(set_weight)::boolean then
    sqlc.arg(weight)::numeric
  else
    weight
  end,
  length = case when sqlc.arg(set_length)::boolean then
    sqlc.arg(length)::numeric
  else
    length
  end,
  width = case when sqlc.arg(set_width)::boolean then
    sqlc.arg(width)::numeric
  else
    width
  end,
  height = case when sqlc.arg(set_height)::boolean then
    sqlc.arg(height)::numeric
  else
    height
  end,
  quoted_price = case when sqlc.arg(set_quoted_price)::boolean then
    sqlc.arg(quoted_price)::numeric
  else
    quoted_price
  end,
  service_level = case when sqlc.arg(set_service_level)::boolean then
    sqlc.arg(service_level)::varchar
  else
    service_level
  end,
  expires_at = case when sqlc.arg(set_expires_at)::boolean then
    sqlc.arg(expires_at)::timestamp
  else
    expires_at
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::billing.quote_status_enum
  else
    status
  end,
  quote_number = case when sqlc.arg(set_quote_number)::boolean then
    sqlc.arg(quote_number)::varchar
  else
    quote_number
  end,
  notes = case when sqlc.arg(set_notes)::boolean then
    sqlc.arg(notes)::text
  else
    notes
  end,
  created_by_user_id = case when sqlc.arg(set_created_by_user_id)::boolean then
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
