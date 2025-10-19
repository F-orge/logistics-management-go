-- name: WmsPaginateSalesOrder :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(sales_orders),
  sqlc.embed(client),
  sqlc.embed(crm_opportunity)
from
  "wms"."sales_orders_view" as sales_orders
  inner join "crm"."companies" as client on sales_orders.client_id = client.id
  left join "crm"."opportunities" as crm_opportunity on sales_orders.crm_opportunity_id = crm_opportunity.id
where (sales_orders.order_number ilike sqlc.narg(search)::text
  or client.name ilike sqlc.narg(search)::text
  or crm_opportunity.name ilike sqlc.narg(search)::text
  or sales_orders.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindSalesOrder :one
select
  sqlc.embed(sales_orders),
  sqlc.embed(client),
  sqlc.embed(crm_opportunity)
from
  "wms"."sales_orders_view" as sales_orders
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
  "wms"."sales_orders_view" as sales_orders
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
  "wms"."sales_orders_view" as sales_orders
  inner join "crm"."companies" as client on sales_orders.client_id = client.id
  left join "crm"."opportunities" as crm_opportunity on sales_orders.crm_opportunity_id = crm_opportunity.id
where
  sales_orders.created_at >= @dateFrom::date
  and sales_orders.created_at <= @dateTo::date
  and (sales_orders.order_number ilike sqlc.narg(search)::text
    or client.name ilike sqlc.narg(search)::text
    or crm_opportunity.name ilike sqlc.narg(search)::text
    or sales_orders.status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertSalesOrder :one
insert into "wms"."sales_orders"(order_number, client_id, crm_opportunity_id, status, shipping_address)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: WmsUpdateSalesOrder :one
update
  "wms"."sales_orders"
set
  updated_at = now(),
  order_number = case when sqlc.arg(order_number) is not null then
    sqlc.arg(order_number)::varchar
  else
    order_number
  end,
  client_id = case when sqlc.arg(client_id) is not null then
    sqlc.arg(client_id)::uuid
  else
    client_id
  end,
  crm_opportunity_id = case when sqlc.arg(crm_opportunity_id) is not null then
    sqlc.arg(crm_opportunity_id)::uuid
  else
    crm_opportunity_id
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::wms.sales_order_status_enum
  else
    status
  end,
  shipping_address = case when sqlc.arg(shipping_address) is not null then
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

