-- name: WmsPaginateSalesOrderItem :many
select
  sqlc.embed(sales_order_items),
  sqlc.embed(sales_order),
  sqlc.embed(product)
from
  "wms"."sales_order_items" as sales_order_items
  inner join "wms"."sales_orders" as sales_order on sales_order_items.sales_order_id = sales_order.id
  inner join "wms"."products" as product on sales_order_items.product_id = product.id
where (sales_order.order_number ilike sqlc.narg(search)::text
  or product.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindSalesOrderItem :one
select
  sqlc.embed(sales_order_items),
  sqlc.embed(sales_order),
  sqlc.embed(product)
from
  "wms"."sales_order_items" as sales_order_items
  inner join "wms"."sales_orders" as sales_order on sales_order_items.sales_order_id = sales_order.id
  inner join "wms"."products" as product on sales_order_items.product_id = product.id
where
  sales_order_items.id = sqlc.arg(id)::uuid;

-- name: WmsAnySalesOrderItem :many
select
  sqlc.embed(sales_order_items),
  sqlc.embed(sales_order),
  sqlc.embed(product)
from
  "wms"."sales_order_items" as sales_order_items
  inner join "wms"."sales_orders" as sales_order on sales_order_items.sales_order_id = sales_order.id
  inner join "wms"."products" as product on sales_order_items.product_id = product.id
where
  sales_order_items.id = any (@ids::uuid[]);

-- name: WmsRangeSalesOrderItem :many
select
  sqlc.embed(sales_order_items),
  sqlc.embed(sales_order),
  sqlc.embed(product)
from
  "wms"."sales_order_items" as sales_order_items
  inner join "wms"."sales_orders" as sales_order on sales_order_items.sales_order_id = sales_order.id
  inner join "wms"."products" as product on sales_order_items.product_id = product.id
where
  sales_order_items.created_at >= @dateFrom::date
  and sales_order_items.created_at <= @dateTo::date
  and (sales_order.order_number ilike sqlc.narg(search)::text
    or product.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertSalesOrderItem :one
insert into "wms"."sales_order_items"(sales_order_id, product_id, quantity_ordered)
  values ($1, $2, $3)
returning
  *;

-- name: WmsUpdateSalesOrderItem :one
update
  "wms"."sales_order_items"
set
  updated_at = now(),
  sales_order_id = case when sqlc.arg(sales_order_id) is not null then
    sqlc.arg(sales_order_id)::uuid
  else
    sales_order_id
  end,
  product_id = case when sqlc.arg(product_id) is not null then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  quantity_ordered = case when sqlc.arg(quantity_ordered) is not null then
    sqlc.arg(quantity_ordered)::integer
  else
    quantity_ordered
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveSalesOrderItem :exec
delete from "wms"."sales_order_items"
where id = @id::uuid;

