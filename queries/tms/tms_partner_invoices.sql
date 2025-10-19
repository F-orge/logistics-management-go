-- name: TmsPaginatePartnerInvoiceMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "tms"."partner_invoices_view" as partner_invoices;

-- name: TmsPaginatePartnerInvoice :many
select
  partner_invoices.*,
  sqlc.embed(carrier)
from
  "tms"."partner_invoices_view" as partner_invoices
  inner join "tms"."carriers" as carrier on partner_invoices.carrier_id = carrier.id
where (carrier.name ilike sqlc.narg(search)::text
  or partner_invoices.invoice_number ilike sqlc.narg(search)::text
  or partner_invoices.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: TmsFindPartnerInvoice :one
select
  partner_invoices.*,
  sqlc.embed(carrier)
from
  "tms"."partner_invoices_view" as partner_invoices
  inner join "tms"."carriers" as carrier on partner_invoices.carrier_id = carrier.id
where
  partner_invoices.id = sqlc.arg(id)::uuid;

-- name: TmsAnyPartnerInvoice :many
select
  partner_invoices.*,
  sqlc.embed(carrier)
from
  "tms"."partner_invoices_view" as partner_invoices
  inner join "tms"."carriers" as carrier on partner_invoices.carrier_id = carrier.id
where
  partner_invoices.id = any (@ids::uuid[]);

-- name: TmsRangePartnerInvoice :many
select
  partner_invoices.*,
  sqlc.embed(carrier)
from
  "tms"."partner_invoices_view" as partner_invoices
  inner join "tms"."carriers" as carrier on partner_invoices.carrier_id = carrier.id
where
  partner_invoices.invoice_date >= @dateFrom::date
  and partner_invoices.invoice_date <= @dateTo::date
  and (carrier.name ilike sqlc.narg(search)::text
    or partner_invoices.invoice_number ilike sqlc.narg(search)::text
    or partner_invoices.status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: TmsInsertPartnerInvoice :one
insert into "tms"."partner_invoices"(carrier_id, invoice_number, invoice_date, total_amount, status)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: TmsUpdatePartnerInvoice :one
update
  "tms"."partner_invoices"
set
  updated_at = now(),
  carrier_id = case when sqlc.arg(carrier_id) is not null then
    sqlc.arg(carrier_id)::uuid
  else
    carrier_id
  end,
  invoice_number = case when sqlc.arg(invoice_number) is not null then
    sqlc.arg(invoice_number)::varchar
  else
    invoice_number
  end,
  invoice_date = case when sqlc.arg(invoice_date) is not null then
    sqlc.arg(invoice_date)::date
  else
    invoice_date
  end,
  total_amount = case when sqlc.arg(total_amount) is not null then
    sqlc.arg(total_amount)::numeric
  else
    total_amount
  end,
  status = case when sqlc.arg(status) is not null then
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

