-- name: CrmPaginateCase :many
select
  sqlc.embed(cases),
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
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: CrmFindCase :one
select
  sqlc.embed(cases),
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
  sqlc.embed(cases),
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
  sqlc.embed(cases),
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
  case_number = case when sqlc.arg(set_case_number)::boolean then
    sqlc.arg(case_number)::text
  else
    case_number
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::crm.case_status
  else
    status
  end,
  priority = case when sqlc.arg(set_priority)::boolean then
    sqlc.arg(priority)::crm.case_priority
  else
    priority
  end,
  type = case when sqlc.arg(set_type)::boolean then
    sqlc.arg(type)::crm.case_type
  else
    type
  end,
  owner_id = case when sqlc.arg(set_owner_id)::boolean then
    sqlc.arg(owner_id)::text
  else
    owner_id
  end,
  contact_id = case when sqlc.arg(set_contact_id)::boolean then
    sqlc.arg(contact_id)::uuid
  else
    contact_id
  end,
  description = case when sqlc.arg(set_description)::boolean then
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

