-- name: WmsPaginateReturn :many
select
  sqlc.embed(returns),
  sqlc.embed(sales_order),
  sqlc.embed(client)
from
  "wms"."returns" as returns
  left join "wms"."sales_orders" as sales_order on returns.sales_order_id = sales_order.id
  inner join "crm"."companies" as client on returns.client_id = client.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindReturn :one
select
  sqlc.embed(returns),
  sqlc.embed(sales_order),
  sqlc.embed(client)
from
  "wms"."returns" as returns
  left join "wms"."sales_orders" as sales_order on returns.sales_order_id = sales_order.id
  inner join "crm"."companies" as client on returns.client_id = client.id
where
  returns.id = sqlc.arg(id)::uuid;

-- name: WmsAnyReturn :many
select
  sqlc.embed(returns),
  sqlc.embed(sales_order),
  sqlc.embed(client)
from
  "wms"."returns" as returns
  left join "wms"."sales_orders" as sales_order on returns.sales_order_id = sales_order.id
  inner join "crm"."companies" as client on returns.client_id = client.id
where
  returns.id = any (@ids::uuid[]);

-- name: WmsRangeReturn :many
select
  sqlc.embed(returns),
  sqlc.embed(sales_order),
  sqlc.embed(client)
from
  "wms"."returns" as returns
  left join "wms"."sales_orders" as sales_order on returns.sales_order_id = sales_order.id
  inner join "crm"."companies" as client on returns.client_id = client.id
where
  returns.created_at >= @dateFrom::date
  and returns.created_at <= @dateTo::date;

-- name: WmsInsertReturn :one
insert into "wms"."returns"(return_number, sales_order_id, client_id, status, reason)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: WmsUpdateReturn :one
update
  "wms"."returns"
set
  return_number = case when sqlc.arg(set_return_number)::boolean then
    sqlc.arg(return_number)::varchar
  else
    return_number
  end,
  sales_order_id = case when sqlc.arg(set_sales_order_id)::boolean then
    sqlc.arg(sales_order_id)::uuid
  else
    sales_order_id
  end,
  client_id = case when sqlc.arg(set_client_id)::boolean then
    sqlc.arg(client_id)::uuid
  else
    client_id
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::wms.return_status_enum
  else
    status
  end,
  reason = case when sqlc.arg(set_reason)::boolean then
    sqlc.arg(reason)::text
  else
    reason
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveReturn :exec
delete from "wms"."returns"
where id = @id::uuid;
