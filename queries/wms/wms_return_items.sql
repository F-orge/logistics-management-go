-- name: WmsPaginateReturnItem :many
select
  sqlc.embed(return_items),
  sqlc.embed(return),
  sqlc.embed(product)
from
  "wms"."return_items" as return_items
  inner join "wms"."returns" as return on return_items.return_id = return.id
  inner join "wms"."products" as product on return_items.product_id = product.id
where (return.return_number ilike sqlc.narg(search)::text
  or product.name ilike sqlc.narg(search)::text
  or return_items.condition::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindReturnItem :one
select
  sqlc.embed(return_items),
  sqlc.embed(return),
  sqlc.embed(product)
from
  "wms"."return_items" as return_items
  inner join "wms"."returns" as return on return_items.return_id = return.id
  inner join "wms"."products" as product on return_items.product_id = product.id
where
  return_items.id = sqlc.arg(id)::uuid;

-- name: WmsAnyReturnItem :many
select
  sqlc.embed(return_items),
  sqlc.embed(return),
  sqlc.embed(product)
from
  "wms"."return_items" as return_items
  inner join "wms"."returns" as return on return_items.return_id = return.id
  inner join "wms"."products" as product on return_items.product_id = product.id
where
  return_items.id = any (@ids::uuid[]);

-- name: WmsRangeReturnItem :many
select
  sqlc.embed(return_items),
  sqlc.embed(return),
  sqlc.embed(product)
from
  "wms"."return_items" as return_items
  inner join "wms"."returns" as return on return_items.return_id = return.id
  inner join "wms"."products" as product on return_items.product_id = product.id
where
  return_items.created_at >= @dateFrom::date
  and return_items.created_at <= @dateTo::date
  and (return.return_number ilike sqlc.narg(search)::text
    or product.name ilike sqlc.narg(search)::text
    or return_items.condition::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertReturnItem :one
insert into "wms"."return_items"(return_id, product_id, quantity_expected, quantity_received, condition)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: WmsUpdateReturnItem :one
update
  "wms"."return_items"
set
  updated_at = now(),
  return_id = case when sqlc.arg(return_id) is not null then
    sqlc.arg(return_id)::uuid
  else
    return_id
  end,
  product_id = case when sqlc.arg(product_id) is not null then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  quantity_expected = case when sqlc.arg(quantity_expected) is not null then
    sqlc.arg(quantity_expected)::integer
  else
    quantity_expected
  end,
  quantity_received = case when sqlc.arg(quantity_received) is not null then
    sqlc.arg(quantity_received)::integer
  else
    quantity_received
  end,
  condition = case when sqlc.arg(condition) is not null then
    sqlc.arg(condition)::wms.return_item_condition_enum
  else
    condition
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveReturnItem :exec
delete from "wms"."return_items"
where id = @id::uuid;

