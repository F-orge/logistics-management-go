-- name: CrmPaginateCampaign :many
select
  *
from
  "crm"."campaigns"
where (name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: CrmFindCampaign :one
select
  *
from
  "crm"."campaigns"
where
  id = sqlc.arg(id)::uuid;

-- name: CrmAnyCampaign :many
select
  *
from
  "crm"."campaigns"
where
  id = any (@ids::uuid[]);

-- name: CrmRangeCampaign :many
select
  *
from
  "crm"."campaigns"
where
  created_at >= @dateFrom::date
  and created_at <= @dateTo::date
  and (name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: CrmInsertCampaign :one
insert into "crm"."campaigns"(name, budget, start_date, end_date)
  values ($1, $2, $3, $4)
returning
  *;

-- name: CrmUpdateCampaign :one
update
  "crm"."campaigns"
set
  updated_at = now(),
  name = case when sqlc.arg(set_name)::boolean then
    sqlc.arg(name)::text
  else
    name
  end,
  budget = case when sqlc.arg(set_budget)::boolean then
    sqlc.arg(budget)::numeric
  else
    budget
  end,
  start_date = case when sqlc.arg(set_start_date)::boolean then
    sqlc.arg(start_date)::date
  else
    start_date
  end,
  end_date = case when sqlc.arg(set_end_date)::boolean then
    sqlc.arg(end_date)::date
  else
    end_date
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: CrmRemoveCampaign :exec
delete from "crm"."campaigns"
where id = @id::uuid;

