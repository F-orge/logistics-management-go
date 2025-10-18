-- name: TmsPaginateCarrier :many
select
  *
from
  "tms"."carriers"
where
  (name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: TmsFindCarrier :one
select
  *
from
  "tms"."carriers"
where
  id = sqlc.arg(id)::uuid;

-- name: TmsAnyCarrier :many
select
  *
from
  "tms"."carriers"
where
  id = any (@ids::uuid[]);

-- name: TmsRangeCarrier :many
select
  *
from
  "tms"."carriers"
where
  created_at >= @dateFrom::date
  and created_at <= @dateTo::date
  and (name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null);

-- name: TmsInsertCarrier :one
insert into "tms"."carriers"(name, contact_details, services_offered)
  values ($1, $2, $3)
returning
  *;

-- name: TmsUpdateCarrier :one
update
  "tms"."carriers"
set
  name = case when sqlc.arg(set_name)::boolean then
    sqlc.arg(name)::varchar
  else
    name
  end,
  contact_details = case when sqlc.arg(set_contact_details)::boolean then
    sqlc.arg(contact_details)::text
  else
    contact_details
  end,
  services_offered = case when sqlc.arg(set_services_offered)::boolean then
    sqlc.arg(services_offered)::text
  else
    services_offered
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: TmsRemoveCarrier :exec
delete from "tms"."carriers"
where id = @id::uuid;
