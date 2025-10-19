-- name: WmsPaginateSupplier :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(suppliers)
from
  "wms"."suppliers_view" as suppliers
where (name ilike sqlc.narg(search)::text
  or email ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: WmsFindSupplier :one
select
  *
from
  "wms"."suppliers_view"
where
  id = sqlc.arg(id)::uuid;

-- name: WmsAnySupplier :many
select
  *
from
  "wms"."suppliers_view"
where
  id = any (@ids::uuid[]);

-- name: WmsRangeSupplier :many
select
  *
from
  "wms"."suppliers_view"
where
  created_at >= @dateFrom::date
  and created_at <= @dateTo::date
  and (name ilike sqlc.narg(search)::text
    or email ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: WmsInsertSupplier :one
insert into "wms"."suppliers"(name, contact_person, email, phone_number)
  values ($1, $2, $3, $4)
returning
  *;

-- name: WmsUpdateSupplier :one
update
  "wms"."suppliers"
set
  updated_at = now(),
  name = case when sqlc.arg(name) is not null then
    sqlc.arg(name)::varchar
  else
    name
  end,
  contact_person = case when sqlc.arg(contact_person) is not null then
    sqlc.arg(contact_person)::varchar
  else
    contact_person
  end,
  email = case when sqlc.arg(email) is not null then
    sqlc.arg(email)::varchar
  else
    email
  end,
  phone_number = case when sqlc.arg(phone_number) is not null then
    sqlc.arg(phone_number)::varchar
  else
    phone_number
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveSupplier :exec
delete from "wms"."suppliers"
where id = @id::uuid;

