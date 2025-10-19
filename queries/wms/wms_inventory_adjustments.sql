-- name: WmsPaginateInventoryAdjustmentMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "wms"."inventory_adjustments" as inventory_adjustments;

-- name: WmsPaginateInventoryAdjustment :many
select
  inventory_adjustments.*,
  sqlc.embed(product),
  sqlc.embed(users)
from
  "wms"."inventory_adjustments" as inventory_adjustments
  inner join "wms"."products" as product on inventory_adjustments.product_id = product.id
  inner join "public"."user" as users on inventory_adjustments.user_id = users.id
where (product.name ilike sqlc.narg(search)::text
  or users.name ilike sqlc.narg(search)::text
  or inventory_adjustments.reason::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindInventoryAdjustment :one
select
  inventory_adjustments.*,
  sqlc.embed(product),
  sqlc.embed(users)
from
  "wms"."inventory_adjustments" as inventory_adjustments
  inner join "wms"."products" as product on inventory_adjustments.product_id = product.id
  inner join "public"."user" as users on inventory_adjustments.user_id = users.id
where
  inventory_adjustments.id = sqlc.arg(id)::uuid;

-- name: WmsAnyInventoryAdjustment :many
select
  inventory_adjustments.*,
  sqlc.embed(product),
  sqlc.embed(users)
from
  "wms"."inventory_adjustments" as inventory_adjustments
  inner join "wms"."products" as product on inventory_adjustments.product_id = product.id
  inner join "public"."user" as users on inventory_adjustments.user_id = users.id
where
  inventory_adjustments.id = any (@ids::uuid[]);

-- name: WmsRangeInventoryAdjustment :many
select
  inventory_adjustments.*,
  sqlc.embed(product),
  sqlc.embed(users)
from
  "wms"."inventory_adjustments" as inventory_adjustments
  inner join "wms"."products" as product on inventory_adjustments.product_id = product.id
  inner join "public"."user" as users on inventory_adjustments.user_id = users.id
where
  inventory_adjustments.created_at >= @dateFrom::date
  and inventory_adjustments.created_at <= @dateTo::date
  and (product.name ilike sqlc.narg(search)::text
    or users.name ilike sqlc.narg(search)::text
    or inventory_adjustments.reason::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertInventoryAdjustment :one
insert into "wms"."inventory_adjustments"(product_id, warehouse_id, user_id, quantity_change, reason, notes)
  values ($1, $2, $3, $4, $5, $6)
returning
  *;

-- name: WmsUpdateInventoryAdjustment :one
update
  "wms"."inventory_adjustments"
set
  updated_at = now(),
  product_id = case when sqlc.arg(product_id) is not null then
    sqlc.arg(product_id)::uuid
  else
    product_id
  end,
  warehouse_id = case when sqlc.arg(warehouse_id) is not null then
    sqlc.arg(warehouse_id)::uuid
  else
    warehouse_id
  end,
  user_id = case when sqlc.arg(user_id) is not null then
    sqlc.arg(user_id)::text
  else
    user_id
  end,
  quantity_change = case when sqlc.arg(quantity_change) is not null then
    sqlc.arg(quantity_change)::integer
  else
    quantity_change
  end,
  reason = case when sqlc.arg(reason) is not null then
    sqlc.arg(reason)::wms.inventory_adjustment_reason_enum
  else
    reason
  end,
  notes = case when sqlc.arg(notes) is not null then
    sqlc.arg(notes)::text
  else
    notes
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveInventoryAdjustment :exec
delete from "wms"."inventory_adjustments"
where id = @id::uuid;

