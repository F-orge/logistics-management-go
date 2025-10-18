-- name: WmsPaginateWarehouse :many
select
  *
from
  "wms"."warehouses"
where
  (name ilike sqlc.narg(search)::text
  or city ilike sqlc.narg(search)::text
  or state ilike sqlc.narg(search)::text
  or country ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: WmsFindWarehouse :one
select
  *
from
  "wms"."warehouses"
where
  id = sqlc.arg(id)::uuid;

-- name: WmsAnyWarehouse :many
select
  *
from
  "wms"."warehouses"
where
  id = any (@ids::uuid[]);

-- name: WmsRangeWarehouse :many
select
  *
from
  "wms"."warehouses"
where
  created_at >= @dateFrom::date
  and created_at <= @dateTo::date
  and (name ilike sqlc.narg(search)::text
  or city ilike sqlc.narg(search)::text
  or state ilike sqlc.narg(search)::text
  or country ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: WmsInsertWarehouse :one
insert into "wms"."warehouses"(name, address, city, state, postal_code, country, timezone, contact_person, contact_email, contact_phone, is_active)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning
  *;

-- name: WmsUpdateWarehouse :one
update
  "wms"."warehouses"
set
  updated_at = now(),
  name = case when sqlc.arg(set_name)::boolean then
    sqlc.arg(name)::varchar
  else
    name
  end,
  address = case when sqlc.arg(set_address)::boolean then
    sqlc.arg(address)::text
  else
    address
  end,
  city = case when sqlc.arg(set_city)::boolean then
    sqlc.arg(city)::varchar
  else
    city
  end,
  state = case when sqlc.arg(set_state)::boolean then
    sqlc.arg(state)::varchar
  else
    state
  end,
  postal_code = case when sqlc.arg(set_postal_code)::boolean then
    sqlc.arg(postal_code)::varchar
  else
    postal_code
  end,
  country = case when sqlc.arg(set_country)::boolean then
    sqlc.arg(country)::varchar
  else
    country
  end,
  timezone = case when sqlc.arg(set_timezone)::boolean then
    sqlc.arg(timezone)::varchar
  else
    timezone
  end,
  contact_person = case when sqlc.arg(set_contact_person)::boolean then
    sqlc.arg(contact_person)::varchar
  else
    contact_person
  end,
  contact_email = case when sqlc.arg(set_contact_email)::boolean then
    sqlc.arg(contact_email)::varchar
  else
    contact_email
  end,
  contact_phone = case when sqlc.arg(set_contact_phone)::boolean then
    sqlc.arg(contact_phone)::varchar
  else
    contact_phone
  end,
  is_active = case when sqlc.arg(set_is_active)::boolean then
    sqlc.arg(is_active)::boolean
  else
    is_active
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: WmsRemoveWarehouse :exec
delete from "wms"."warehouses"
where id = @id::uuid;
