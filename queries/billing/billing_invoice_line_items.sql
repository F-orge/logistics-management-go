-- name: BillingPaginateInvoiceLineItem :many
select
  sqlc.embed(invoice_line_items),
  sqlc.embed(invoice)
from
  "billing"."invoice_line_items" as invoice_line_items
  inner join "billing"."invoices" as invoice on invoice_line_items.invoice_id = invoice.id
where (invoice.invoice_number ilike sqlc.narg(search)::text
  or invoice_line_items.description ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: BillingFindInvoiceLineItem :one
select
  sqlc.embed(invoice_line_items),
  sqlc.embed(invoice)
from
  "billing"."invoice_line_items" as invoice_line_items
  inner join "billing"."invoices" as invoice on invoice_line_items.invoice_id = invoice.id
where
  invoice_line_items.id = sqlc.arg(id)::uuid;

-- name: BillingAnyInvoiceLineItem :many
select
  sqlc.embed(invoice_line_items),
  sqlc.embed(invoice)
from
  "billing"."invoice_line_items" as invoice_line_items
  inner join "billing"."invoices" as invoice on invoice_line_items.invoice_id = invoice.id
where
  invoice_line_items.id = any (@ids::uuid[]);

-- name: BillingRangeInvoiceLineItem :many
select
  sqlc.embed(invoice_line_items),
  sqlc.embed(invoice)
from
  "billing"."invoice_line_items" as invoice_line_items
  inner join "billing"."invoices" as invoice on invoice_line_items.invoice_id = invoice.id
where
  invoice_line_items.created_at >= @dateFrom::date
  and invoice_line_items.created_at <= @dateTo::date
  and (invoice.invoice_number ilike sqlc.narg(search)::text
    or invoice_line_items.description ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: BillingInsertInvoiceLineItem :one
insert into "billing"."invoice_line_items"(invoice_id, source_record_id, source_record_type, description, quantity, unit_price, tax_rate, discount_rate)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
returning
  *;

-- name: BillingUpdateInvoiceLineItem :one
update
  "billing"."invoice_line_items"
set
  updated_at = now(),
  invoice_id = case when sqlc.arg(invoice_id) is not null then
    sqlc.arg(invoice_id)::uuid
  else
    invoice_id
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
  quantity = case when sqlc.arg(quantity) is not null then
    sqlc.arg(quantity)::numeric
  else
    quantity
  end,
  unit_price = case when sqlc.arg(unit_price) is not null then
    sqlc.arg(unit_price)::numeric
  else
    unit_price
  end,
  tax_rate = case when sqlc.arg(tax_rate) is not null then
    sqlc.arg(tax_rate)::numeric
  else
    tax_rate
  end,
  discount_rate = case when sqlc.arg(discount_rate) is not null then
    sqlc.arg(discount_rate)::numeric
  else
    discount_rate
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: BillingRemoveInvoiceLineItem :exec
delete from "billing"."invoice_line_items"
where id = @id::uuid;

