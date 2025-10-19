-- name: CrmPaginateLead :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(leads),
  sqlc.embed(owner),
  sqlc.embed(campaign),
  sqlc.embed(converted_contact),
  sqlc.embed(converted_company),
  sqlc.embed(converted_opportunity)
from
  "crm"."leads" as leads
  inner join "public"."user" as owner on leads.owner_id = owner.id
  left join "crm"."campaigns" as campaign on leads.campaign_id = campaign.id
  left join "crm"."contacts" as converted_contact on leads.converted_contact_id = converted_contact.id
  left join "crm"."companies" as converted_company on leads.converted_company_id = converted_company.id
  left join "crm"."opportunities" as converted_opportunity on leads.converted_opportunity_id = converted_opportunity.id
where (leads.name ilike sqlc.narg(search)::text
  or leads.email ilike sqlc.narg(search)::text
  or leads.status::text ilike sqlc.narg(search)::text
  or leads.lead_source::text ilike sqlc.narg(search)::text
  or owner.name ilike sqlc.narg(search)::text
  or campaign.name ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: CrmFindLead :one
select
  sqlc.embed(leads),
  sqlc.embed(owner),
  sqlc.embed(campaign),
  sqlc.embed(converted_contact),
  sqlc.embed(converted_company),
  sqlc.embed(converted_opportunity)
from
  "crm"."leads" as leads
  inner join "public"."user" as owner on leads.owner_id = owner.id
  left join "crm"."campaigns" as campaign on leads.campaign_id = campaign.id
  left join "crm"."contacts" as converted_contact on leads.converted_contact_id = converted_contact.id
  left join "crm"."companies" as converted_company on leads.converted_company_id = converted_company.id
  left join "crm"."opportunities" as converted_opportunity on leads.converted_opportunity_id = converted_opportunity.id
where
  leads.id = sqlc.arg(id)::uuid;

-- name: CrmAnyLead :many
select
  sqlc.embed(leads),
  sqlc.embed(owner),
  sqlc.embed(campaign),
  sqlc.embed(converted_contact),
  sqlc.embed(converted_company),
  sqlc.embed(converted_opportunity)
from
  "crm"."leads" as leads
  inner join "public"."user" as owner on leads.owner_id = owner.id
  left join "crm"."campaigns" as campaign on leads.campaign_id = campaign.id
  left join "crm"."contacts" as converted_contact on leads.converted_contact_id = converted_contact.id
  left join "crm"."companies" as converted_company on leads.converted_company_id = converted_company.id
  left join "crm"."opportunities" as converted_opportunity on leads.converted_opportunity_id = converted_opportunity.id
where
  leads.id = any (@ids::uuid[]);

-- name: CrmRangeLead :many
select
  sqlc.embed(leads),
  sqlc.embed(owner),
  sqlc.embed(campaign),
  sqlc.embed(converted_contact),
  sqlc.embed(converted_company),
  sqlc.embed(converted_opportunity)
from
  "crm"."leads" as leads
  inner join "public"."user" as owner on leads.owner_id = owner.id
  left join "crm"."campaigns" as campaign on leads.campaign_id = campaign.id
  left join "crm"."contacts" as converted_contact on leads.converted_contact_id = converted_contact.id
  left join "crm"."companies" as converted_company on leads.converted_company_id = converted_company.id
  left join "crm"."opportunities" as converted_opportunity on leads.converted_opportunity_id = converted_opportunity.id
where
  leads.created_at >= @dateFrom::date
  and leads.created_at <= @dateTo::date
  and (leads.name ilike sqlc.narg(search)::text
    or leads.email ilike sqlc.narg(search)::text
    or leads.status::text ilike sqlc.narg(search)::text
    or leads.lead_source::text ilike sqlc.narg(search)::text
    or owner.name ilike sqlc.narg(search)::text
    or campaign.name ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: CrmInsertLead :one
insert into "crm"."leads"(name, email, lead_source, status, lead_score, owner_id, campaign_id, converted_at, converted_contact_id, converted_company_id, converted_opportunity_id)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning
  *;

-- name: CrmUpdateLead :one
update
  "crm"."leads"
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
  lead_source = case when sqlc.arg(lead_source) is not null then
    sqlc.arg(lead_source)::crm.lead_source
  else
    lead_source
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::crm.lead_status
  else
    status
  end,
  lead_score = case when sqlc.arg(lead_score) is not null then
    sqlc.arg(lead_score)::integer
  else
    lead_score
  end,
  owner_id = case when sqlc.arg(owner_id) is not null then
    sqlc.arg(owner_id)::text
  else
    owner_id
  end,
  campaign_id = case when sqlc.arg(campaign_id) is not null then
    sqlc.arg(campaign_id)::uuid
  else
    campaign_id
  end,
  converted_at = case when sqlc.arg(converted_at) is not null then
    sqlc.arg(converted_at)::timestamptz
  else
    converted_at
  end,
  converted_contact_id = case when sqlc.arg(converted_contact_id) is not null then
    sqlc.arg(converted_contact_id)::uuid
  else
    converted_contact_id
  end,
  converted_company_id = case when sqlc.arg(converted_company_id) is not null then
    sqlc.arg(converted_company_id)::uuid
  else
    converted_company_id
  end,
  converted_opportunity_id = case when sqlc.arg(converted_opportunity_id) is not null then
    sqlc.arg(converted_opportunity_id)::uuid
  else
    converted_opportunity_id
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: CrmRemoveLead :exec
delete from "crm"."leads"
where id = @id::uuid;

