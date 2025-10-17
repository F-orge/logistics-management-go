-- name: WmsPaginateInboundShipmentItem :many
select
  sqlc.embed(inbound_shipment_items),
  sqlc.embed(inbound_shipment),
  sqlc.embed(product)
from
  "wms"."inbound_shipment_items" as inbound_shipment_items
  inner join "wms"."inbound_shipments" as inbound_shipment on inbound_shipment_items.inbound_shipment_id = inbound_shipment.id
  inner join "wms"."products" as product on inbound_shipment_items.product_id = product.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

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
  and inbound_shipment_items.created_at <= @dateTo::date;

-- name: WmsInsertInboundShipmentItem :one
insert into "wms"."inbound_shipment_items"(inbound_shipment_id, product_id, expected_quantity, received_quantity, discrepancy_notes)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: WmsUpdateInboundShipmentItem :one
update
  "wms"."inbound_shipment_items"
set
  inbound_shipment_id = case when sqlc.arg(set_inbound_shipment_id)::boolean then
    sqlc.arg(inbound_shipment_id)::uuid
  else
    inbound_shipment_id
  end,
  product_id = case when sqlc.arg(set_product_id)::boolean then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  expected_quantity = case when sqlc.arg(set_expected_quantity)::boolean then
    sqlc.arg(expected_quantity)::integer
  else
    expected_quantity
  end,
  received_quantity = case when sqlc.arg(set_received_quantity)::boolean then
    sqlc.arg(received_quantity)::integer
  else
    received_quantity
  end,
  discrepancy_notes = case when sqlc.arg(set_discrepancy_notes)::boolean then
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
