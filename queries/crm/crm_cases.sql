-- name: CrmPaginateCaseMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "crm"."cases" as cases;

-- name: CrmPaginateCase :many
select
  cases.*,
  sqlc.embed(owner),
  sqlc.embed(contact)
from
  "crm"."cases" as cases
  inner join "public"."user" as owner on cases.owner_id = owner.id
  left join "crm"."contacts" as contact on cases.contact_id = contact.id
where (cases.case_number ilike sqlc.narg(search)::text
  or cases.status::text ilike sqlc.narg(search)::text
  or cases.priority::text ilike sqlc.narg(search)::text
  or cases.type::text ilike sqlc.narg(search)::text
  or owner.name ilike sqlc.narg(search)::text
  or contact.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: CrmFindCase :one
select
  cases.*,
  sqlc.embed(owner),
  sqlc.embed(contact)
from
  "crm"."cases" as cases
  inner join "public"."user" as owner on cases.owner_id = owner.id
  left join "crm"."contacts" as contact on cases.contact_id = contact.id
where
  cases.id = sqlc.arg(id)::uuid;

-- name: CrmAnyCase :many
select
  cases.*,
  sqlc.embed(owner),
  sqlc.embed(contact)
from
  "crm"."cases" as cases
  inner join "public"."user" as owner on cases.owner_id = owner.id
  left join "crm"."contacts" as contact on cases.contact_id = contact.id
where
  cases.id = any (@ids::uuid[]);

-- name: CrmRangeCase :many
select
  cases.*,
  sqlc.embed(owner),
  sqlc.embed(contact)
from
  "crm"."cases" as cases
  inner join "public"."user" as owner on cases.owner_id = owner.id
  left join "crm"."contacts" as contact on cases.contact_id = contact.id
where
  cases.created_at >= @dateFrom::date
  and cases.created_at <= @dateTo::date
  and (cases.case_number ilike sqlc.narg(search)::text
    or cases.status::text ilike sqlc.narg(search)::text
    or cases.priority::text ilike sqlc.narg(search)::text
    or cases.type::text ilike sqlc.narg(search)::text
    or owner.name ilike sqlc.narg(search)::text
    or contact.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: CrmInsertCase :one
insert into "crm"."cases"(case_number, status, priority, type, owner_id, contact_id, description)
  values ($1, $2, $3, $4, $5, $6, $7)
returning
  *;

-- name: CrmUpdateCase :one
update
  "crm"."cases"
set
  updated_at = now(),
  case_number = case when sqlc.arg(case_number) is not null then
    sqlc.arg(case_number)::text
  else
    case_number
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::crm.case_status
  else
    status
  end,
  priority = case when sqlc.arg(priority) is not null then
    sqlc.arg(priority)::crm.case_priority
  else
    priority
  end,
  type = case when sqlc.arg(type) is not null then
    sqlc.arg(type)::crm.case_type
  else
    type
  end,
  owner_id = case when sqlc.arg(owner_id) is not null then
    sqlc.arg(owner_id)::text
  else
    owner_id
  end,
  contact_id = case when sqlc.arg(contact_id) is not null then
    sqlc.arg(contact_id)::uuid
  else
    contact_id
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

-- name: CrmRemoveCase :exec
delete from "crm"."cases"
where id = @id::uuid;

