-- name: WmsPaginateReturn :many
select
  sqlc.embed(wms_returns),
  sqlc.embed(sales_order),
  sqlc.embed(client)
from
  "wms"."returns" as wms_returns
  left join "wms"."sales_orders" as sales_order on wms_returns.sales_order_id = sales_order.id
  inner join "crm"."companies" as client on wms_returns.client_id = client.id
where (wms_returns.return_number ilike (sqlc.narg(search))::text
  or sales_order.order_number ilike (sqlc.narg(search))::text
  or client.name ilike (sqlc.narg(search))::text
  or wms_returns.status::text ilike (sqlc.narg(search))::text
  or (sqlc.narg(search))::text is null)
limit sqlc.arg(perPage)::int offset ((sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int);

-- name: WmsFindReturn :one
select
  sqlc.embed(wms_returns),
  sqlc.embed(sales_order),
  sqlc.embed(client)
from
  "wms"."returns" as wms_returns
  left join "wms"."sales_orders" as sales_order on wms_returns.sales_order_id = sales_order.id
  inner join "crm"."companies" as client on wms_returns.client_id = client.id
where
  wms_returns.id = sqlc.arg(id)::uuid;

-- name: WmsAnyReturn :many
select
  sqlc.embed(wms_returns),
  sqlc.embed(sales_order),
  sqlc.embed(client)
from
  "wms"."returns" as wms_returns
  left join "wms"."sales_orders" as sales_order on wms_returns.sales_order_id = sales_order.id
  inner join "crm"."companies" as client on wms_returns.client_id = client.id
where
  wms_returns.id = any (@ids::uuid[]);

-- name: WmsRangeReturn :many
select
  sqlc.embed(wms_returns),
  sqlc.embed(sales_order),
  sqlc.embed(client)
from
  "wms"."returns" as wms_returns
  left join "wms"."sales_orders" as sales_order on wms_returns.sales_order_id = sales_order.id
  inner join "crm"."companies" as client on wms_returns.client_id = client.id
where
  wms_returns.created_at >= @dateFrom::date
  and wms_returns.created_at <= @dateTo::date
  and (wms_returns.return_number ilike sqlc.narg(search)::text
    or sales_order.order_number ilike sqlc.narg(search)::text
    or client.name ilike sqlc.narg(search)::text
    or wms_returns.status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertReturn :one
insert into "wms"."returns"(return_number, sales_order_id, client_id, status, reason)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: WmsUpdateReturn :one
update
  "wms"."returns"
set
  updated_at = now(),
  return_number = case when sqlc.arg(return_number) is not null then
    sqlc.arg(return_number)::varchar
  else
    return_number
  end,
  sales_order_id = case when sqlc.arg(sales_order_id) is not null then
    sqlc.arg(sales_order_id)::uuid
  else
    sales_order_id
  end,
  client_id = case when sqlc.arg(client_id) is not null then
    sqlc.arg(client_id)::uuid
  else
    client_id
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::wms.return_status_enum
  else
    status
  end,
  reason = case when sqlc.arg(reason) is not null then
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

