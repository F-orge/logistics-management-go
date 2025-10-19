-- name: CrmPaginateCampaignMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "crm"."campaigns" as campaigns;

-- name: CrmPaginateCampaign :many
select
  campaigns.*
from
  "crm"."campaigns" as campaigns
where (name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

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
  name = case when sqlc.arg(name) is not null then
    sqlc.arg(name)::text
  else
    name
  end,
  budget = case when sqlc.arg(budget) is not null then
    sqlc.arg(budget)::numeric
  else
    budget
  end,
  start_date = case when sqlc.arg(start_date) is not null then
    sqlc.arg(start_date)::date
  else
    start_date
  end,
  end_date = case when sqlc.arg(end_date) is not null then
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

