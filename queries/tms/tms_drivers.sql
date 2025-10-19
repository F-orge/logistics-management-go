-- name: TmsPaginateDriver :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(drivers),
  sqlc.embed(users)
from
  "tms"."drivers_view" as drivers
  inner join "public"."user" as users on drivers.user_id = users.id
where (users.name ilike sqlc.narg(search)::text
  or drivers.license_number ilike sqlc.narg(search)::text
  or drivers.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: TmsFindDriver :one
select
  sqlc.embed(drivers),
  sqlc.embed(users)
from
  "tms"."drivers_view" as drivers
  inner join "public"."user" as users on drivers.user_id = users.id
where
  drivers.id = sqlc.arg(id)::uuid;

-- name: TmsAnyDriver :many
select
  sqlc.embed(drivers),
  sqlc.embed(users)
from
  "tms"."drivers_view" as drivers
  inner join "public"."user" as users on drivers.user_id = users.id
where
  drivers.id = any (@ids::uuid[]);

-- name: TmsRangeDriver :many
select
  sqlc.embed(drivers),
  sqlc.embed(users)
from
  "tms"."drivers_view" as drivers
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
  user_id = case when sqlc.arg(user_id) is not null then
    sqlc.arg(user_id)::text
  else
    user_id
  end,
  license_number = case when sqlc.arg(license_number) is not null then
    sqlc.arg(license_number)::varchar
  else
    license_number
  end,
  license_expiry_date = case when sqlc.arg(license_expiry_date) is not null then
    sqlc.arg(license_expiry_date)::date
  else
    license_expiry_date
  end,
  status = case when sqlc.arg(status) is not null then
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

