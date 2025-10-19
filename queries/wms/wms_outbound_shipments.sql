-- name: WmsPaginateOutboundShipment :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(outbound_shipments),
  sqlc.embed(sales_order)
from
  "wms"."outbound_shipments_view" as outbound_shipments
  inner join "wms"."sales_orders" as sales_order on outbound_shipments.sales_order_id = sales_order.id
where (sales_order.order_number ilike sqlc.narg(search)::text
  or outbound_shipments.tracking_number ilike sqlc.narg(search)::text
  or outbound_shipments.carrier ilike sqlc.narg(search)::text
  or outbound_shipments.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindOutboundShipment :one
select
  sqlc.embed(outbound_shipments),
  sqlc.embed(sales_order)
from
  "wms"."outbound_shipments_view" as outbound_shipments
  inner join "wms"."sales_orders" as sales_order on outbound_shipments.sales_order_id = sales_order.id
where
  outbound_shipments.id = sqlc.arg(id)::uuid;

-- name: WmsAnyOutboundShipment :many
select
  sqlc.embed(outbound_shipments),
  sqlc.embed(sales_order)
from
  "wms"."outbound_shipments_view" as outbound_shipments
  inner join "wms"."sales_orders" as sales_order on outbound_shipments.sales_order_id = sales_order.id
where
  outbound_shipments.id = any (@ids::uuid[]);

-- name: WmsRangeOutboundShipment :many
select
  sqlc.embed(outbound_shipments),
  sqlc.embed(sales_order)
from
  "wms"."outbound_shipments_view" as outbound_shipments
  inner join "wms"."sales_orders" as sales_order on outbound_shipments.sales_order_id = sales_order.id
where
  outbound_shipments.created_at >= @dateFrom::date
  and outbound_shipments.created_at <= @dateTo::date
  and (sales_order.order_number ilike sqlc.narg(search)::text
    or outbound_shipments.tracking_number ilike sqlc.narg(search)::text
    or outbound_shipments.carrier ilike sqlc.narg(search)::text
    or outbound_shipments.status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertOutboundShipment :one
insert into "wms"."outbound_shipments"(sales_order_id, warehouse_id, status, tracking_number, carrier)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: WmsUpdateOutboundShipment :one
update
  "wms"."outbound_shipments"
set
  updated_at = now(),
  sales_order_id = case when sqlc.arg(sales_order_id) is not null then
    sqlc.arg(sales_order_id)::uuid
  else
    sales_order_id
  end,
  warehouse_id = case when sqlc.arg(warehouse_id) is not null then
    sqlc.arg(warehouse_id)::uuid
  else
    warehouse_id
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::wms.outbound_shipment_status_enum
  else
    status
  end,
  tracking_number = case when sqlc.arg(tracking_number) is not null then
    sqlc.arg(tracking_number)::varchar
  else
    tracking_number
  end,
  carrier = case when sqlc.arg(carrier) is not null then
    sqlc.arg(carrier)::varchar
  else
    carrier
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveOutboundShipment :exec
delete from "wms"."outbound_shipments"
where id = @id::uuid;

