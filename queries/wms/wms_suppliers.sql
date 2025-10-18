-- name: WmsPaginateSupplier :many
select
  *
from
  "wms"."suppliers"
where
  (name ilike sqlc.narg(search)::text
  or email ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindSupplier :one
select
  *
from
  "wms"."suppliers"
where
  id = sqlc.arg(id)::uuid;

-- name: WmsAnySupplier :many
select
  *
from
  "wms"."suppliers"
where
  id = any (@ids::uuid[]);

-- name: WmsRangeSupplier :many
select
  *
from
  "wms"."suppliers"
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
  name = case when sqlc.arg(set_name)::boolean then
    sqlc.arg(name)::varchar
  else
    name
  end,
  contact_person = case when sqlc.arg(set_contact_person)::boolean then
    sqlc.arg(contact_person)::varchar
  else
    contact_person
  end,
  email = case when sqlc.arg(set_email)::boolean then
    sqlc.arg(email)::varchar
  else
    email
  end,
  phone_number = case when sqlc.arg(set_phone_number)::boolean then
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
