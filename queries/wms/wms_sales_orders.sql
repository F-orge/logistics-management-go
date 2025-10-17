-- name: WmsPaginateSalesOrder :many
select
  sqlc.embed(sales_orders),
  sqlc.embed(client),
  sqlc.embed(crm_opportunity)
from
  "wms"."sales_orders" as sales_orders
  inner join "crm"."companies" as client on sales_orders.client_id = client.id
  left join "crm"."opportunities" as crm_opportunity on sales_orders.crm_opportunity_id = crm_opportunity.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindSalesOrder :one
select
  sqlc.embed(sales_orders),
  sqlc.embed(client),
  sqlc.embed(crm_opportunity)
from
  "wms"."sales_orders" as sales_orders
  inner join "crm"."companies" as client on sales_orders.client_id = client.id
  left join "crm"."opportunities" as crm_opportunity on sales_orders.crm_opportunity_id = crm_opportunity.id
where
  sales_orders.id = sqlc.arg(id)::uuid;

-- name: WmsAnySalesOrder :many
select
  sqlc.embed(sales_orders),
  sqlc.embed(client),
  sqlc.embed(crm_opportunity)
from
  "wms"."sales_orders" as sales_orders
  inner join "crm"."companies" as client on sales_orders.client_id = client.id
  left join "crm"."opportunities" as crm_opportunity on sales_orders.crm_opportunity_id = crm_opportunity.id
where
  sales_orders.id = any (@ids::uuid[]);

-- name: WmsRangeSalesOrder :many
select
  sqlc.embed(sales_orders),
  sqlc.embed(client),
  sqlc.embed(crm_opportunity)
from
  "wms"."sales_orders" as sales_orders
  inner join "crm"."companies" as client on sales_orders.client_id = client.id
  left join "crm"."opportunities" as crm_opportunity on sales_orders.crm_opportunity_id = crm_opportunity.id
where
  sales_orders.created_at >= @dateFrom::date
  and sales_orders.created_at <= @dateTo::date;

-- name: WmsInsertSalesOrder :one
insert into "wms"."sales_orders"(order_number, client_id, crm_opportunity_id, status, shipping_address)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: WmsUpdateSalesOrder :one
update
  "wms"."sales_orders"
set
  order_number = case when sqlc.arg(set_order_number)::boolean then
    sqlc.arg(order_number)::varchar
  else
    order_number
  end,
  client_id = case when sqlc.arg(set_client_id)::boolean then
    sqlc.arg(client_id)::uuid
  else
    client_id
  end,
  crm_opportunity_id = case when sqlc.arg(set_crm_opportunity_id)::boolean then
    sqlc.arg(crm_opportunity_id)::uuid
  else
    crm_opportunity_id
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::wms.sales_order_status_enum
  else
    status
  end,
  shipping_address = case when sqlc.arg(set_shipping_address)::boolean then
    sqlc.arg(shipping_address)::text
  else
    shipping_address
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveSalesOrder :exec
delete from "wms"."sales_orders"
where id = @id::uuid;
