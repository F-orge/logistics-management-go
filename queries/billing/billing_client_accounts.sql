-- name: BillingPaginateClientAccount :many
select
  sqlc.embed(client_accounts),
  sqlc.embed(client)
from
  "billing"."client_accounts_view" as client_accounts
  inner join "crm"."companies" as client on client_accounts.client_id = client.id
where (client.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: BillingFindClientAccount :one
select
  sqlc.embed(client_accounts),
  sqlc.embed(client)
from
  "billing"."client_accounts_view" as client_accounts
  inner join "crm"."companies" as client on client_accounts.client_id = client.id
where
  client_accounts.id = sqlc.arg(id)::uuid;

-- name: BillingAnyClientAccount :many
select
  sqlc.embed(client_accounts),
  sqlc.embed(client)
from
  "billing"."client_accounts_view" as client_accounts
  inner join "crm"."companies" as client on client_accounts.client_id = client.id
where
  client_accounts.id = any (@ids::uuid[]);

-- name: BillingRangeClientAccount :many
select
  sqlc.embed(client_accounts),
  sqlc.embed(client)
from
  "billing"."client_accounts_view" as client_accounts
  inner join "crm"."companies" as client on client_accounts.client_id = client.id
where
  client_accounts.created_at >= @dateFrom::date
  and client_accounts.created_at <= @dateTo::date
  and (client.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: BillingInsertClientAccount :one
insert into "billing"."client_accounts"(client_id, credit_limit, available_credit, wallet_balance, currency, payment_terms_days, is_credit_approved, last_payment_date)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
returning
  *;

-- name: BillingUpdateClientAccount :one
update
  "billing"."client_accounts"
set
  updated_at = now(),
  client_id = case when sqlc.arg(client_id) is not null then
    sqlc.arg(client_id)::uuid
  else
    client_id
  end,
  credit_limit = case when sqlc.arg(credit_limit) is not null then
    sqlc.arg(credit_limit)::numeric
  else
    credit_limit
  end,
  available_credit = case when sqlc.arg(available_credit) is not null then
    sqlc.arg(available_credit)::numeric
  else
    available_credit
  end,
  wallet_balance = case when sqlc.arg(wallet_balance) is not null then
    sqlc.arg(wallet_balance)::numeric
  else
    wallet_balance
  end,
  currency = case when sqlc.arg(currency) is not null then
    sqlc.arg(currency)::varchar
  else
    currency
  end,
  payment_terms_days = case when sqlc.arg(payment_terms_days) is not null then
    sqlc.arg(payment_terms_days)::integer
  else
    payment_terms_days
  end,
  is_credit_approved = case when sqlc.arg(is_credit_approved) is not null then
    sqlc.arg(is_credit_approved)::boolean
  else
    is_credit_approved
  end,
  last_payment_date = case when sqlc.arg(last_payment_date) is not null then
    sqlc.arg(last_payment_date)::date
  else
    last_payment_date
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: BillingRemoveClientAccount :exec
delete from "billing"."client_accounts"
where id = @id::uuid;

