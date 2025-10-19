-- name: CrmPaginateProductMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "crm"."products" as products
where (name ilike sqlc.narg(search)::text
  or sku ilike sqlc.narg(search)::text
  or type::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: CrmPaginateProduct :many
select
  products.*
from
  "crm"."products" as products
where (name ilike sqlc.narg(search)::text
  or sku ilike sqlc.narg(search)::text
  or type::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

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
  and created_at <= @dateTo::date
  and (name ilike sqlc.narg(search)::text
    or sku ilike sqlc.narg(search)::text
    or type::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: CrmInsertProduct :one
insert into "crm"."products"(name, sku, price, type, description)
  values ($1, $2, $3, $4, $5)
returning
  *;

-- name: CrmUpdateProduct :one
update
  "crm"."products"
set
  updated_at = now(),
  name = case when sqlc.arg(name) is not null then
    sqlc.arg(name)::text
  else
    name
  end,
  sku = case when sqlc.arg(sku) is not null then
    sqlc.arg(sku)::text
  else
    sku
  end,
  price = case when sqlc.arg(price) is not null then
    sqlc.arg(price)::numeric
  else
    price
  end,
  type = case when sqlc.arg(type) is not null then
    sqlc.arg(type)::crm.product_type
  else
    type
  end,
  description = case when sqlc.arg(description) is not null then
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

