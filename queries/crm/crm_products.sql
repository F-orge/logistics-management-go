-- name: CrmPaginateProduct :many
select
  *
from
  "crm"."products"
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: CrmFindProduct :one
select
  *
from
  "crm"."products"
where
  id = sqlc.arg(id)::uuid;

-- name: CrmAnyProduct :many
select
  *
from
  "crm"."products"
where
  id = any (@ids::uuid[]);

-- name: CrmRangeProduct :many
select
  *
from
  "crm"."products"
where
  created_at >= @dateFrom::date
  and created_at <= @dateTo::date;

-- name: CrmInsertProduct :one
insert into "crm"."products"(name, sku, price, type, description)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: CrmUpdateProduct :one
update
  "crm"."products"
set
  name = case when sqlc.arg(set_name)::boolean then
    sqlc.arg(name)::text
  else
    name
  end,
  sku = case when sqlc.arg(set_sku)::boolean then
    sqlc.arg(sku)::text
  else
    sku
  end,
  price = case when sqlc.arg(set_price)::boolean then
    sqlc.arg(price)::numeric
  else
    price
  end,
  type = case when sqlc.arg(set_type)::boolean then
    sqlc.arg(type)::crm.product_type
  else
    type
  end,
  description = case when sqlc.arg(set_description)::boolean then
    sqlc.arg(description)::text
  else
    description
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: CrmRemoveProduct :exec
delete from "crm"."products"
where id = @id::uuid;
