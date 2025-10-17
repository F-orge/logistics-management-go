-- name: CrmPaginateCompany :many
select
  sqlc.embed(companies),
  sqlc.embed(owner)
from
  "crm"."companies" as companies
  inner join "public"."user" as owner on companies.owner_id = owner.id
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: CrmFindCompany :one
select
  sqlc.embed(companies),
  sqlc.embed(owner)
from
  "crm"."companies" as companies
  inner join "public"."user" as owner on companies.owner_id = owner.id
where
  companies.id = sqlc.arg(id)::uuid;

-- name: CrmAnyCompany :many
select
  sqlc.embed(companies),
  sqlc.embed(owner)
from
  "crm"."companies" as companies
  inner join "public"."user" as owner on companies.owner_id = owner.id
where
  companies.id = any (@ids::uuid[]);

-- name: CrmRangeCompany :many
select
  sqlc.embed(companies),
  sqlc.embed(owner)
from
  "crm"."companies" as companies
  inner join "public"."user" as owner on companies.owner_id = owner.id
where
  companies.created_at >= @dateFrom::date
  and companies.created_at <= @dateTo::date;

-- name: CrmInsertCompany :one
insert into "crm"."companies"(name, street, city, state, postal_code, country, phone_number, industry, website, annual_revenue, owner_id)
  values ($1, $2, $3, $4, $4, $5, $6, $7, $8, $9, $10)
returning
  *;

-- name: CrmUpdateCompany :one
update
  "crm"."companies"
set
  name = case when sqlc.arg(set_name)::boolean then
    sqlc.arg(name)::text
  else
    name
  end,
  street = case when sqlc.arg(set_street)::boolean then
    sqlc.arg(street)::text
  else
    street
  end,
  city = case when sqlc.arg(set_city)::boolean then
    sqlc.arg(city)::text
  else
    city
  end,
  state = case when sqlc.arg(set_state)::boolean then
    sqlc.arg(state)::text
  else
    state
  end,
  postal_code = case when sqlc.arg(set_postal_code)::boolean then
    sqlc.arg(postal_code)::text
  else
    postal_code
  end,
  country = case when sqlc.arg(set_country)::boolean then
    sqlc.arg(country)::text
  else
    country
  end,
  phone_number = case when sqlc.arg(set_phone_number)::boolean then
    sqlc.arg(phone_number)::text
  else
    phone_number
  end,
  industry = case when sqlc.arg(set_industry)::boolean then
    sqlc.arg(industry)::text
  else
    industry
  end,
  website = case when sqlc.arg(set_website)::boolean then
    sqlc.arg(website)::text
  else
    website
  end,
  annual_revenue = case when sqlc.arg(set_annual_revenue)::boolean then
    sqlc.arg(annual_revenue)::numeric
  else
    annual_revenue
  end,
  owner_id = case when sqlc.arg(set_owner_id)::boolean then
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

