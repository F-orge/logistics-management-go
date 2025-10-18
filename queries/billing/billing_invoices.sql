-- name: BillingPaginateInvoice :many
select
  sqlc.embed(invoices),
  sqlc.embed(client),
  sqlc.embed(quote),
  sqlc.embed(created_by_user)
from
  "billing"."invoices" as invoices
  inner join "crm"."companies" as client on invoices.client_id = client.id
  left join "billing"."quotes" as quote on invoices.quote_id = quote.id
  left join "public"."user" as created_by_user on invoices.created_by_user_id = created_by_user.id
where
  (client.name ilike sqlc.narg(search)::text
  or quote.quote_number ilike sqlc.narg(search)::text
  or invoices.invoice_number ilike sqlc.narg(search)::text
  or invoices.status::text ilike sqlc.narg(search)::text
  or created_by_user.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: BillingFindInvoice :one
select
  sqlc.embed(invoices),
  sqlc.embed(client),
  sqlc.embed(quote),
  sqlc.embed(created_by_user)
from
  "billing"."invoices" as invoices
  inner join "crm"."companies" as client on invoices.client_id = client.id
  left join "billing"."quotes" as quote on invoices.quote_id = quote.id
  left join "public"."user" as created_by_user on invoices.created_by_user_id = created_by_user.id
where
  invoices.id = sqlc.arg(id)::uuid;

-- name: BillingAnyInvoice :many
select
  sqlc.embed(invoices),
  sqlc.embed(client),
  sqlc.embed(quote),
  sqlc.embed(created_by_user)
from
  "billing"."invoices" as invoices
  inner join "crm"."companies" as client on invoices.client_id = client.id
  left join "billing"."quotes" as quote on invoices.quote_id = quote.id
  left join "public"."user" as created_by_user on invoices.created_by_user_id = created_by_user.id
where
  invoices.id = any (@ids::uuid[]);

-- name: BillingRangeInvoice :many
select
  sqlc.embed(invoices),
  sqlc.embed(client),
  sqlc.embed(quote),
  sqlc.embed(created_by_user)
from
  "billing"."invoices" as invoices
  inner join "crm"."companies" as client on invoices.client_id = client.id
  left join "billing"."quotes" as quote on invoices.quote_id = quote.id
  left join "public"."user" as created_by_user on invoices.created_by_user_id = created_by_user.id
where
  invoices.created_at >= @dateFrom::date
  and invoices.created_at <= @dateTo::date
  and (client.name ilike sqlc.narg(search)::text
  or quote.quote_number ilike sqlc.narg(search)::text
  or invoices.invoice_number ilike sqlc.narg(search)::text
  or invoices.status::text ilike sqlc.narg(search)::text
  or created_by_user.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: BillingInsertInvoice :one
insert into "billing"."invoices"(client_id, quote_id, invoice_number, status, issue_date, due_date, total_amount, amount_paid, currency, tax_amount, discount_amount, subtotal, payment_terms, notes, sent_at, paid_at, created_by_user_id)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
returning
  *;

-- name: BillingUpdateInvoice :one
update
  "billing"."invoices"
set
  updated_at = now(),
  client_id = case when sqlc.arg(set_client_id)::boolean then
    sqlc.arg(client_id)::uuid
  else
    client_id
  end,
  quote_id = case when sqlc.arg(set_quote_id)::boolean then
    sqlc.arg(quote_id)::uuid
  else
    quote_id
  end,
  invoice_number = case when sqlc.arg(set_invoice_number)::boolean then
    sqlc.arg(invoice_number)::varchar
  else
    invoice_number
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::billing.invoice_status_enum
  else
    status
  end,
  issue_date = case when sqlc.arg(set_issue_date)::boolean then
    sqlc.arg(issue_date)::date
  else
    issue_date
  end,
  due_date = case when sqlc.arg(set_due_date)::boolean then
    sqlc.arg(due_date)::date
  else
    due_date
  end,
  total_amount = case when sqlc.arg(set_total_amount)::boolean then
    sqlc.arg(total_amount)::numeric
  else
    total_amount
  end,
  amount_paid = case when sqlc.arg(set_amount_paid)::boolean then
    sqlc.arg(amount_paid)::numeric
  else
    amount_paid
  end,
  currency = case when sqlc.arg(set_currency)::boolean then
    sqlc.arg(currency)::varchar
  else
    currency
  end,
  tax_amount = case when sqlc.arg(set_tax_amount)::boolean then
    sqlc.arg(tax_amount)::numeric
  else
    tax_amount
  end,
  discount_amount = case when sqlc.arg(set_discount_amount)::boolean then
    sqlc.arg(discount_amount)::numeric
  else
    discount_amount
  end,
  subtotal = case when sqlc.arg(set_subtotal)::boolean then
    sqlc.arg(subtotal)::numeric
  else
    subtotal
  end,
  payment_terms = case when sqlc.arg(set_payment_terms)::boolean then
    sqlc.arg(payment_terms)::text
  else
    payment_terms
  end,
  notes = case when sqlc.arg(set_notes)::boolean then
    sqlc.arg(notes)::text
  else
    notes
  end,
  sent_at = case when sqlc.arg(set_sent_at)::boolean then
    sqlc.arg(sent_at)::timestamp
  else
    sent_at
  end,
  paid_at = case when sqlc.arg(set_paid_at)::boolean then
    sqlc.arg(paid_at)::timestamp
  else
    paid_at
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

-- name: BillingRemoveInvoice :exec
delete from "billing"."invoices"
where id = @id::uuid;
