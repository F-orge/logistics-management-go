-- name: BillingPaginateAccountTransaction :many
select
  sqlc.embed(account_transactions),
  sqlc.embed(client_account),
  sqlc.embed(processed_by_user)
from
  "billing"."account_transactions" as account_transactions
  inner join "billing"."client_accounts" as client_account on account_transactions.client_account_id = client_account.id
  inner join "crm"."companies" as client on client_account.client_id = client.id
  left join "public"."user" as processed_by_user on account_transactions.processed_by_user_id = processed_by_user.id
where (client.name ilike sqlc.narg(search)::text
  or processed_by_user.name ilike sqlc.narg(search)::text
  or account_transactions.type::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: BillingFindAccountTransaction :one
select
  sqlc.embed(account_transactions),
  sqlc.embed(client_account),
  sqlc.embed(processed_by_user)
from
  "billing"."account_transactions" as account_transactions
  inner join "billing"."client_accounts" as client_account on account_transactions.client_account_id = client_account.id
  left join "public"."user" as processed_by_user on account_transactions.processed_by_user_id = processed_by_user.id
where
  account_transactions.id = sqlc.arg(id)::uuid;

-- name: BillingAnyAccountTransaction :many
select
  sqlc.embed(account_transactions),
  sqlc.embed(client_account),
  sqlc.embed(processed_by_user)
from
  "billing"."account_transactions" as account_transactions
  inner join "billing"."client_accounts" as client_account on account_transactions.client_account_id = client_account.id
  left join "public"."user" as processed_by_user on account_transactions.processed_by_user_id = processed_by_user.id
where
  account_transactions.id = any (@ids::uuid[]);

-- name: BillingRangeAccountTransaction :many
select
  sqlc.embed(account_transactions),
  sqlc.embed(client_account),
  sqlc.embed(processed_by_user)
from
  "billing"."account_transactions" as account_transactions
  inner join "billing"."client_accounts" as client_account on account_transactions.client_account_id = client_account.id
  left join "public"."user" as processed_by_user on account_transactions.processed_by_user_id = processed_by_user.id
where
  account_transactions.created_at >= @dateFrom::date
  and account_transactions.created_at <= @dateTo::date
  and (client.name ilike sqlc.narg(search)::text
    or processed_by_user.name ilike sqlc.narg(search)::text
    or account_transactions.type::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: BillingInsertAccountTransaction :one
insert into "billing"."account_transactions"(client_account_id, type, amount, running_balance, source_record_id, source_record_type, description, reference_number, transaction_date, processed_by_user_id)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning
  *;

-- name: BillingUpdateAccountTransaction :one
update
  "billing"."account_transactions"
set
  updated_at = now(),
  client_account_id = case when sqlc.arg(client_account_id) is not null then
    sqlc.arg(client_account_id)::uuid
  else
    client_account_id
  end,
  type = case when sqlc.arg(type) is not null then
    sqlc.arg(type)::billing.transaction_type_enum
  else
    type
  end,
  amount = case when sqlc.arg(amount) is not null then
    sqlc.arg(amount)::numeric
  else
    amount
  end,
  running_balance = case when sqlc.arg(running_balance) is not null then
    sqlc.arg(running_balance)::numeric
  else
    running_balance
  end,
  source_record_id = case when sqlc.arg(source_record_id) is not null then
    sqlc.arg(source_record_id)::uuid
  else
    source_record_id
  end,
  source_record_type = case when sqlc.arg(source_record_type) is not null then
    sqlc.arg(source_record_type)::varchar
  else
    source_record_type
  end,
  description = case when sqlc.arg(description) is not null then
    sqlc.arg(description)::text
  else
    description
  end,
  reference_number = case when sqlc.arg(reference_number) is not null then
    sqlc.arg(reference_number)::varchar
  else
    reference_number
  end,
  transaction_date = case when sqlc.arg(transaction_date) is not null then
    sqlc.arg(transaction_date)::timestamp
  else
    transaction_date
  end,
  processed_by_user_id = case when sqlc.arg(processed_by_user_id) is not null then
    sqlc.arg(processed_by_user_id)::text
  else
    processed_by_user_id
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: BillingRemoveAccountTransaction :exec
delete from "billing"."account_transactions"
where id = @id::uuid;

