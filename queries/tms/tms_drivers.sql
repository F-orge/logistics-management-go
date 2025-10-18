-- name: TmsPaginateDriver :many
select
  sqlc.embed(drivers),
  sqlc.embed(users)
from
  "tms"."drivers" as drivers
  inner join "public"."user" as users on drivers.user_id = users.id
where
  (users.name ilike sqlc.narg(search)::text
  or drivers.license_number ilike sqlc.narg(search)::text
  or drivers.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindDriver :one
select
  sqlc.embed(drivers),
  sqlc.embed(users)
from
  "tms"."drivers" as drivers
  inner join "public"."user" as users on drivers.user_id = users.id
where
  drivers.id = sqlc.arg(id)::uuid;

-- name: TmsAnyDriver :many
select
  sqlc.embed(drivers),
  sqlc.embed(users)
from
  "tms"."drivers" as drivers
  inner join "public"."user" as users on drivers.user_id = users.id
where
  drivers.id = any (@ids::uuid[]);

-- name: TmsRangeDriver :many
select
  sqlc.embed(drivers),
  sqlc.embed(users)
from
  "tms"."drivers" as drivers
  inner join "public"."user" as users on drivers.user_id = users.id
where
  drivers.created_at >= @dateFrom::date
  and drivers.created_at <= @dateTo::date
  and (users.name ilike sqlc.narg(search)::text
  or drivers.license_number ilike sqlc.narg(search)::text
  or drivers.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: TmsInsertDriver :one
insert into "tms"."drivers"(user_id, license_number, license_expiry_date, status)
  values ($1, $2, $3, $4)
returning
  *;

-- name: TmsUpdateDriver :one
update
  "tms"."drivers"
set
  updated_at = now(),
  user_id = case when sqlc.arg(set_user_id)::boolean then
    sqlc.arg(user_id)::text
  else
    user_id
  end,
  license_number = case when sqlc.arg(set_license_number)::boolean then
    sqlc.arg(license_number)::varchar
  else
    license_number
  end,
  license_expiry_date = case when sqlc.arg(set_license_expiry_date)::boolean then
    sqlc.arg(license_expiry_date)::date
  else
    license_expiry_date
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::tms.driver_status_enum
  else
    status
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveDriver :exec
delete from "tms"."drivers"
where id = @id::uuid;

