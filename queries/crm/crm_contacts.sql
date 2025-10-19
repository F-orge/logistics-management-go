-- name: CrmPaginateContactMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "crm"."contacts" as contacts;

-- name: CrmPaginateContact :many
select
  contacts.*,
  sqlc.embed(owner),
  sqlc.embed(company)
from
  "crm"."contacts" as contacts
  inner join "public"."user" as owner on contacts.owner_id = owner.id
  left join "crm"."companies" as company on contacts.company_id = company.id
where (contacts.name ilike sqlc.narg(search)::text
  or contacts.email ilike sqlc.narg(search)::text
  or company.name ilike sqlc.narg(search)::text
  or owner.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: CrmFindContact :one
select
  contacts.*,
  sqlc.embed(owner),
  sqlc.embed(company)
from
  "crm"."contacts" as contacts
  inner join "public"."user" as owner on contacts.owner_id = owner.id
  left join "crm"."companies" as company on contacts.company_id = company.id
where
  contacts.id = sqlc.arg(id)::uuid;

-- name: CrmAnyContact :many
select
  contacts.*,
  sqlc.embed(owner),
  sqlc.embed(company)
from
  "crm"."contacts" as contacts
  inner join "public"."user" as owner on contacts.owner_id = owner.id
  left join "crm"."companies" as company on contacts.company_id = company.id
where
  contacts.id = any (@ids::uuid[]);

-- name: CrmRangeContact :many
select
  contacts.*,
  sqlc.embed(owner),
  sqlc.embed(company)
from
  "crm"."contacts" as contacts
  inner join "public"."user" as owner on contacts.owner_id = owner.id
  left join "crm"."companies" as company on contacts.company_id = company.id
where
  contacts.created_at >= @dateFrom::date
  and contacts.created_at <= @dateTo::date
  and (contacts.name ilike sqlc.narg(search)::text
    or contacts.email ilike sqlc.narg(search)::text
    or company.name ilike sqlc.narg(search)::text
    or owner.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: CrmInsertContact :one
insert into "crm"."contacts"(name, email, phone_number, job_title, company_id, owner_id)
  values ($1, $2, $3, $4, $5, $6)
returning
  *;

-- name: CrmUpdateContact :one
update
  "crm"."contacts"
set
  updated_at = now(),
  name = case when sqlc.arg(name) is not null then
    sqlc.arg(name)::text
  else
    name
  end,
  email = case when sqlc.arg(email) is not null then
    sqlc.arg(email)::text
  else
    email
  end,
  phone_number = case when sqlc.arg(phone_number) is not null then
    sqlc.arg(phone_number)::text
  else
    phone_number
  end,
  job_title = case when sqlc.arg(job_title) is not null then
    sqlc.arg(job_title)::text
  else
    job_title
  end,
  company_id = case when sqlc.arg(company_id) is not null then
    sqlc.arg(company_id)::uuid
  else
    company_id
  end,
  owner_id = case when sqlc.arg(owner_id) is not null then
    sqlc.arg(owner_id)::text
  else
    owner_id
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: CrmRemoveContact :exec
delete from "crm"."contacts"
where id = @id::uuid;

