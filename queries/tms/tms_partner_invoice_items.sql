-- name: TmsPaginatePartnerInvoiceItem :many
select
  sqlc.embed(partner_invoice_items),
  sqlc.embed(partner_invoice),
  sqlc.embed(shipment_leg)
from
  "tms"."partner_invoice_items" as partner_invoice_items
  inner join "tms"."partner_invoices" as partner_invoice on partner_invoice_items.partner_invoice_id = partner_invoice.id
  inner join "tms"."shipment_legs" as shipment_leg on partner_invoice_items.shipment_leg_id = shipment_leg.id
where (partner_invoice.invoice_number ilike sqlc.narg(search)::text
  or shipment_leg.start_location ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindPartnerInvoiceItem :one
select
  sqlc.embed(partner_invoice_items),
  sqlc.embed(partner_invoice),
  sqlc.embed(shipment_leg)
from
  "tms"."partner_invoice_items" as partner_invoice_items
  inner join "tms"."partner_invoices" as partner_invoice on partner_invoice_items.partner_invoice_id = partner_invoice.id
  inner join "tms"."shipment_legs" as shipment_leg on partner_invoice_items.shipment_leg_id = shipment_leg.id
where
  partner_invoice_items.id = sqlc.arg(id)::uuid;

-- name: TmsAnyPartnerInvoiceItem :many
select
  sqlc.embed(partner_invoice_items),
  sqlc.embed(partner_invoice),
  sqlc.embed(shipment_leg)
from
  "tms"."partner_invoice_items" as partner_invoice_items
  inner join "tms"."partner_invoices" as partner_invoice on partner_invoice_items.partner_invoice_id = partner_invoice.id
  inner join "tms"."shipment_legs" as shipment_leg on partner_invoice_items.shipment_leg_id = shipment_leg.id
where
  partner_invoice_items.id = any (@ids::uuid[]);

-- name: TmsRangePartnerInvoiceItem :many
select
  sqlc.embed(partner_invoice_items),
  sqlc.embed(partner_invoice),
  sqlc.embed(shipment_leg)
from
  "tms"."partner_invoice_items" as partner_invoice_items
  inner join "tms"."partner_invoices" as partner_invoice on partner_invoice_items.partner_invoice_id = partner_invoice.id
  inner join "tms"."shipment_legs" as shipment_leg on partner_invoice_items.shipment_leg_id = shipment_leg.id
where
  partner_invoice_items.created_at >= @dateFrom::date
  and partner_invoice_items.created_at <= @dateTo::date
  and (partner_invoice.invoice_number ilike sqlc.narg(search)::text
    or shipment_leg.start_location ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: TmsInsertPartnerInvoiceItem :one
insert into "tms"."partner_invoice_items"(partner_invoice_id, shipment_leg_id, amount)
  values ($1, $2, $3)
returning
  *;

-- name: TmsUpdatePartnerInvoiceItem :one
update
  "tms"."partner_invoice_items"
set
  updated_at = now(),
  partner_invoice_id = case when sqlc.arg(partner_invoice_id) is not null then
    sqlc.arg(partner_invoice_id)::uuid
  else
    partner_invoice_id
  end,
  shipment_leg_id = case when sqlc.arg(shipment_leg_id) is not null then
    sqlc.arg(shipment_leg_id)::uuid
  else
    shipment_leg_id
  end,
  amount = case when sqlc.arg(amount) is not null then
    sqlc.arg(amount)::numeric
  else
    amount
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemovePartnerInvoiceItem :exec
delete from "tms"."partner_invoice_items"
where id = @id::uuid;

