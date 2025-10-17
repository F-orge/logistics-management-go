-- name: TmsPaginatePartnerInvoice :many
select
  sqlc.embed(partner_invoices),
  sqlc.embed(carrier)
from
  "tms"."partner_invoices" as partner_invoices
  inner join "tms"."carriers" as carrier on partner_invoices.carrier_id = carrier.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindPartnerInvoice :one
select
  sqlc.embed(partner_invoices),
  sqlc.embed(carrier)
from
  "tms"."partner_invoices" as partner_invoices
  inner join "tms"."carriers" as carrier on partner_invoices.carrier_id = carrier.id
where
  partner_invoices.id = sqlc.arg(id)::uuid;

-- name: TmsAnyPartnerInvoice :many
select
  sqlc.embed(partner_invoices),
  sqlc.embed(carrier)
from
  "tms"."partner_invoices" as partner_invoices
  inner join "tms"."carriers" as carrier on partner_invoices.carrier_id = carrier.id
where
  partner_invoices.id = any (@ids::uuid[]);

-- name: TmsRangePartnerInvoice :many
select
  sqlc.embed(partner_invoices),
  sqlc.embed(carrier)
from
  "tms"."partner_invoices" as partner_invoices
  inner join "tms"."carriers" as carrier on partner_invoices.carrier_id = carrier.id
where
  partner_invoices.invoice_date >= @dateFrom::date
  and partner_invoices.invoice_date <= @dateTo::date;

-- name: TmsInsertPartnerInvoice :one
insert into "tms"."partner_invoices"(carrier_id, invoice_number, invoice_date, total_amount, status)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: TmsUpdatePartnerInvoice :one
update
  "tms"."partner_invoices"
set
  carrier_id = case when sqlc.arg(set_carrier_id)::boolean then
    sqlc.arg(carrier_id)::uuid
  else
    carrier_id
  end,
  invoice_number = case when sqlc.arg(set_invoice_number)::boolean then
    sqlc.arg(invoice_number)::varchar
  else
    invoice_number
  end,
  invoice_date = case when sqlc.arg(set_invoice_date)::boolean then
    sqlc.arg(invoice_date)::date
  else
    invoice_date
  end,
  total_amount = case when sqlc.arg(set_total_amount)::boolean then
    sqlc.arg(total_amount)::numeric
  else
    total_amount
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::tms.partner_invoice_status_enum
  else
    status
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemovePartnerInvoice :exec
delete from "tms"."partner_invoices"
where id = @id::uuid;
