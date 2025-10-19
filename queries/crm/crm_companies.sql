-- name: CrmPaginateCompanyMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int - 1 as page,
  sqlc.arg(per_page)::int as per_page;

-- name: CrmPaginateCompany :many
select
  companies.*,
  sqlc.embed(owner)
from
  "crm"."companies" as companies
  inner join "public"."user" as owner on companies.owner_id = owner.id
where (companies.name ilike sqlc.narg(search)::text
  or companies.industry ilike sqlc.narg(search)::text
  or owner.name ilike sqlc.narg(search)::text
  or companies.country ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: CrmFindCompany :one
select
  companies.*,
  sqlc.embed(owner)
from
  "crm"."companies" as companies
  inner join "public"."user" as owner on companies.owner_id = owner.id
where
  companies.id = sqlc.arg(id)::uuid;

-- name: CrmAnyCompany :many
select
  companies.*,
  sqlc.embed(owner)
from
  "crm"."companies" as companies
  inner join "public"."user" as owner on companies.owner_id = owner.id
where
  companies.id = any (@ids::uuid[]);

-- name: CrmRangeCompany :many
select
  companies.*,
  sqlc.embed(owner)
from
  "crm"."companies" as companies
  inner join "public"."user" as owner on companies.owner_id = owner.id
where
  companies.created_at >= @dateFrom::date
  and companies.created_at <= @dateTo::date
  and (companies.name ilike sqlc.narg(search)::text
    or companies.industry ilike sqlc.narg(search)::text
    or owner.name ilike sqlc.narg(search)::text
    or companies.country ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: CrmInsertCompany :one
insert into "crm"."companies"(name, street, city, state, postal_code, country, phone_number, industry, website, annual_revenue, owner_id)
  values ($1, $2, $3, $4, $4, $5, $6, $7, $8, $9, $10)
returning
  *;

-- name: CrmUpdateCompany :one
update
  "crm"."companies"
set
  updated_at = now(),
  name = case when sqlc.arg(name) is not null then
    sqlc.arg(name)::text
  else
    name
  end,
  street = case when sqlc.arg(street) is not null then
    sqlc.arg(street)::text
  else
    street
  end,
  city = case when sqlc.arg(city) is not null then
    sqlc.arg(city)::text
  else
    city
  end,
  state = case when sqlc.arg(state) is not null then
    sqlc.arg(state)::text
  else
    state
  end,
  postal_code = case when sqlc.arg(postal_code) is not null then
    sqlc.arg(postal_code)::text
  else
    postal_code
  end,
  country = case when sqlc.arg(country) is not null then
    sqlc.arg(country)::text
  else
    country
  end,
  phone_number = case when sqlc.arg(phone_number) is not null then
    sqlc.arg(phone_number)::text
  else
    phone_number
  end,
  industry = case when sqlc.arg(industry) is not null then
    sqlc.arg(industry)::text
  else
    industry
  end,
  website = case when sqlc.arg(website) is not null then
    sqlc.arg(website)::text
  else
    website
  end,
  annual_revenue = case when sqlc.arg(annual_revenue) is not null then
    sqlc.arg(annual_revenue)::numeric
  else
    annual_revenue
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

-- name: CrmRemoveCompany :exec
delete from "crm"."companies"
where id = @id::uuid;

