-- name: WmsPaginateInboundShipmentItem :many
select
  sqlc.embed(inbound_shipment_items),
  sqlc.embed(inbound_shipment),
  sqlc.embed(product)
from
  "wms"."inbound_shipment_items" as inbound_shipment_items
  inner join "wms"."inbound_shipments" as inbound_shipment on inbound_shipment_items.inbound_shipment_id = inbound_shipment.id
  inner join "wms"."products" as product on inbound_shipment_items.product_id = product.id
where (inbound_shipment.status::text ilike sqlc.narg(search)::text
  or product.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindInboundShipmentItem :one
select
  sqlc.embed(inbound_shipment_items),
  sqlc.embed(inbound_shipment),
  sqlc.embed(product)
from
  "wms"."inbound_shipment_items" as inbound_shipment_items
  inner join "wms"."inbound_shipments" as inbound_shipment on inbound_shipment_items.inbound_shipment_id = inbound_shipment.id
  inner join "wms"."products" as product on inbound_shipment_items.product_id = product.id
where
  inbound_shipment_items.id = sqlc.arg(id)::uuid;

-- name: WmsAnyInboundShipmentItem :many
select
  sqlc.embed(inbound_shipment_items),
  sqlc.embed(inbound_shipment),
  sqlc.embed(product)
from
  "wms"."inbound_shipment_items" as inbound_shipment_items
  inner join "wms"."inbound_shipments" as inbound_shipment on inbound_shipment_items.inbound_shipment_id = inbound_shipment.id
  inner join "wms"."products" as product on inbound_shipment_items.product_id = product.id
where
  inbound_shipment_items.id = any (@ids::uuid[]);

-- name: WmsRangeInboundShipmentItem :many
select
  sqlc.embed(inbound_shipment_items),
  sqlc.embed(inbound_shipment),
  sqlc.embed(product)
from
  "wms"."inbound_shipment_items" as inbound_shipment_items
  inner join "wms"."inbound_shipments" as inbound_shipment on inbound_shipment_items.inbound_shipment_id = inbound_shipment.id
  inner join "wms"."products" as product on inbound_shipment_items.product_id = product.id
where
  inbound_shipment_items.created_at >= @dateFrom::date
  and inbound_shipment_items.created_at <= @dateTo::date
  and (inbound_shipment.status::text ilike sqlc.narg(search)::text
    or product.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertInboundShipmentItem :one
insert into "wms"."inbound_shipment_items"(inbound_shipment_id, product_id, expected_quantity, received_quantity, discrepancy_notes)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: WmsUpdateInboundShipmentItem :one
update
  "wms"."inbound_shipment_items"
set
  updated_at = now(),
  inbound_shipment_id = case when sqlc.arg(inbound_shipment_id) is not null then
    sqlc.arg(inbound_shipment_id)::uuid
  else
    inbound_shipment_id
  end,
  product_id = case when sqlc.arg(product_id) is not null then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  expected_quantity = case when sqlc.arg(expected_quantity) is not null then
    sqlc.arg(expected_quantity)::integer
  else
    expected_quantity
  end,
  received_quantity = case when sqlc.arg(received_quantity) is not null then
    sqlc.arg(received_quantity)::integer
  else
    received_quantity
  end,
  discrepancy_notes = case when sqlc.arg(discrepancy_notes) is not null then
    sqlc.arg(discrepancy_notes)::text
  else
    discrepancy_notes
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveInboundShipmentItem :exec
delete from "wms"."inbound_shipment_items"
where id = @id::uuid;

