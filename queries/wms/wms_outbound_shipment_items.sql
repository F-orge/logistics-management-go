-- name: WmsPaginateOutboundShipmentItem :many
select
  sqlc.embed(outbound_shipment_items),
  sqlc.embed(outbound_shipment),
  sqlc.embed(sales_order_item),
  sqlc.embed(product),
  sqlc.embed(batch)
from
  "wms"."outbound_shipment_items" as outbound_shipment_items
  inner join "wms"."outbound_shipments" as outbound_shipment on outbound_shipment_items.outbound_shipment_id = outbound_shipment.id
  inner join "wms"."sales_order_items" as sales_order_item on outbound_shipment_items.sales_order_item_id = sales_order_item.id
  inner join "wms"."products" as product on outbound_shipment_items.product_id = product.id
  left join "wms"."inventory_batches" as batch on outbound_shipment_items.batch_id = batch.id
where (outbound_shipment.tracking_number ilike sqlc.narg(search)::text
  or product.name ilike sqlc.narg(search)::text
  or batch.batch_number ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindOutboundShipmentItem :one
select
  sqlc.embed(outbound_shipment_items),
  sqlc.embed(outbound_shipment),
  sqlc.embed(sales_order_item),
  sqlc.embed(product),
  sqlc.embed(batch)
from
  "wms"."outbound_shipment_items" as outbound_shipment_items
  inner join "wms"."outbound_shipments" as outbound_shipment on outbound_shipment_items.outbound_shipment_id = outbound_shipment.id
  inner join "wms"."sales_order_items" as sales_order_item on outbound_shipment_items.sales_order_item_id = sales_order_item.id
  inner join "wms"."products" as product on outbound_shipment_items.product_id = product.id
  left join "wms"."inventory_batches" as batch on outbound_shipment_items.batch_id = batch.id
where
  outbound_shipment_items.id = sqlc.arg(id)::uuid;

-- name: WmsAnyOutboundShipmentItem :many
select
  sqlc.embed(outbound_shipment_items),
  sqlc.embed(outbound_shipment),
  sqlc.embed(sales_order_item),
  sqlc.embed(product),
  sqlc.embed(batch)
from
  "wms"."outbound_shipment_items" as outbound_shipment_items
  inner join "wms"."outbound_shipments" as outbound_shipment on outbound_shipment_items.outbound_shipment_id = outbound_shipment.id
  inner join "wms"."sales_order_items" as sales_order_item on outbound_shipment_items.sales_order_item_id = sales_order_item.id
  inner join "wms"."products" as product on outbound_shipment_items.product_id = product.id
  left join "wms"."inventory_batches" as batch on outbound_shipment_items.batch_id = batch.id
where
  outbound_shipment_items.id = any (@ids::uuid[]);

-- name: WmsRangeOutboundShipmentItem :many
select
  sqlc.embed(outbound_shipment_items),
  sqlc.embed(outbound_shipment),
  sqlc.embed(sales_order_item),
  sqlc.embed(product),
  sqlc.embed(batch)
from
  "wms"."outbound_shipment_items" as outbound_shipment_items
  inner join "wms"."outbound_shipments" as outbound_shipment on outbound_shipment_items.outbound_shipment_id = outbound_shipment.id
  inner join "wms"."sales_order_items" as sales_order_item on outbound_shipment_items.sales_order_item_id = sales_order_item.id
  inner join "wms"."products" as product on outbound_shipment_items.product_id = product.id
  left join "wms"."inventory_batches" as batch on outbound_shipment_items.batch_id = batch.id
where
  outbound_shipment_items.created_at >= @dateFrom::date
  and outbound_shipment_items.created_at <= @dateTo::date
  and (outbound_shipment.tracking_number ilike sqlc.narg(search)::text
    or product.name ilike sqlc.narg(search)::text
    or batch.batch_number ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertOutboundShipmentItem :one
insert into "wms"."outbound_shipment_items"(outbound_shipment_id, sales_order_item_id, product_id, batch_id, quantity_shipped)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: WmsUpdateOutboundShipmentItem :one
update
  "wms"."outbound_shipment_items"
set
  updated_at = now(),
  outbound_shipment_id = case when sqlc.arg(outbound_shipment_id) is not null then
    sqlc.arg(outbound_shipment_id)::uuid
  else
    outbound_shipment_id
  end,
  sales_order_item_id = case when sqlc.arg(sales_order_item_id) is not null then
    sqlc.arg(sales_order_item_id)::uuid
  else
    sales_order_item_id
  end,
  product_id = case when sqlc.arg(product_id) is not null then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  batch_id = case when sqlc.arg(batch_id) is not null then
    sqlc.arg(batch_id)::uuid
  else
    batch_id
  end,
  quantity_shipped = case when sqlc.arg(quantity_shipped) is not null then
    sqlc.arg(quantity_shipped)::integer
  else
    quantity_shipped
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveOutboundShipmentItem :exec
delete from "wms"."outbound_shipment_items"
where id = @id::uuid;

