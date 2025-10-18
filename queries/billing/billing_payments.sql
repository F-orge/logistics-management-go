-- name: BillingPaginatePayment :many
select
  sqlc.embed(payments),
  sqlc.embed(invoice),
  sqlc.embed(processed_by_user)
from
  "billing"."payments" as payments
  inner join "billing"."invoices" as invoice on payments.invoice_id = invoice.id
  left join "public"."user" as processed_by_user on payments.processed_by_user_id = processed_by_user.id
where (invoice.invoice_number ilike sqlc.narg(search)::text
  or payments.payment_method::text ilike sqlc.narg(search)::text
  or payments.status::text ilike sqlc.narg(search)::text
  or processed_by_user.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: BillingFindPayment :one
select
  sqlc.embed(payments),
  sqlc.embed(invoice),
  sqlc.embed(processed_by_user)
from
  "billing"."payments" as payments
  inner join "billing"."invoices" as invoice on payments.invoice_id = invoice.id
  left join "public"."user" as processed_by_user on payments.processed_by_user_id = processed_by_user.id
where
  payments.id = sqlc.arg(id)::uuid;

-- name: BillingAnyPayment :many
select
  sqlc.embed(payments),
  sqlc.embed(invoice),
  sqlc.embed(processed_by_user)
from
  "billing"."payments" as payments
  inner join "billing"."invoices" as invoice on payments.invoice_id = invoice.id
  left join "public"."user" as processed_by_user on payments.processed_by_user_id = processed_by_user.id
where
  payments.id = any (@ids::uuid[]);

-- name: BillingRangePayment :many
select
  sqlc.embed(payments),
  sqlc.embed(invoice),
  sqlc.embed(processed_by_user)
from
  "billing"."payments" as payments
  inner join "billing"."invoices" as invoice on payments.invoice_id = invoice.id
  left join "public"."user" as processed_by_user on payments.processed_by_user_id = processed_by_user.id
where
  payments.created_at >= @dateFrom::date
  and payments.created_at <= @dateTo::date
  and (invoice.invoice_number ilike sqlc.narg(search)::text
    or payments.payment_method::text ilike sqlc.narg(search)::text
    or payments.status::text ilike sqlc.narg(search)::text
    or processed_by_user.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: BillingInsertPayment :one
insert into "billing"."payments"(invoice_id, amount, payment_method, transaction_id, gateway_reference, status, payment_date, processed_at, currency, exchange_rate, fees, notes, processed_by_user_id)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
returning
  *;

-- name: BillingUpdatePayment :one
update
  "billing"."payments"
set
  updated_at = now(),
  invoice_id = case when sqlc.arg(invoice_id) is not null then
    sqlc.arg(invoice_id)::uuid
  else
    invoice_id
  end,
  amount = case when sqlc.arg(amount) is not null then
    sqlc.arg(amount)::numeric
  else
    amount
  end,
  payment_method = case when sqlc.arg(payment_method) is not null then
    sqlc.arg(payment_method)::billing.payment_method_enum
  else
    payment_method
  end,
  transaction_id = case when sqlc.arg(transaction_id) is not null then
    sqlc.arg(transaction_id)::varchar
  else
    transaction_id
  end,
  gateway_reference = case when sqlc.arg(gateway_reference) is not null then
    sqlc.arg(gateway_reference)::varchar
  else
    gateway_reference
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::billing.payment_status_enum
  else
    status
  end,
  payment_date = case when sqlc.arg(payment_date) is not null then
    sqlc.arg(payment_date)::timestamp
  else
    payment_date
  end,
  processed_at = case when sqlc.arg(processed_at) is not null then
    sqlc.arg(processed_at)::timestamp
  else
    processed_at
  end,
  currency = case when sqlc.arg(currency) is not null then
    sqlc.arg(currency)::varchar
  else
    currency
  end,
  exchange_rate = case when sqlc.arg(exchange_rate) is not null then
    sqlc.arg(exchange_rate)::numeric
  else
    exchange_rate
  end,
  fees = case when sqlc.arg(fees) is not null then
    sqlc.arg(fees)::numeric
  else
    fees
  end,
  notes = case when sqlc.arg(notes) is not null then
    sqlc.arg(notes)::text
  else
    notes
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

-- name: BillingRemovePayment :exec
delete from "billing"."payments"
where id = @id::uuid;

