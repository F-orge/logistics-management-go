-- name: CrmPaginateOpportunity :many
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page,
  sqlc.embed(opportunities),
  sqlc.embed(owner),
  sqlc.embed(contact),
  sqlc.embed(company),
  sqlc.embed(campaign)
from
  "crm"."opportunities_view" as opportunities
  inner join "public"."user" as owner on opportunities.owner_id = owner.id
  left join "crm"."contacts" as contact on opportunities.contact_id = contact.id
  left join "crm"."companies" as company on opportunities.company_id = company.id
  left join "crm"."campaigns" as campaign on opportunities.campaign_id = campaign.id
where (opportunities.name ilike sqlc.narg(search)::text
  or opportunities.stage::text ilike sqlc.narg(search)::text
  or owner.name ilike sqlc.narg(search)::text
  or company.name ilike sqlc.narg(search)::text
  or contact.name ilike sqlc.narg(search)::text
  or campaign.name ilike sqlc.narg(search)::text
  or opportunities.source::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: CrmFindOpportunity :one
select
  sqlc.embed(opportunities),
  sqlc.embed(owner),
  sqlc.embed(contact),
  sqlc.embed(company),
  sqlc.embed(campaign)
from
  "crm"."opportunities_view" as opportunities
  inner join "public"."user" as owner on opportunities.owner_id = owner.id
  left join "crm"."contacts" as contact on opportunities.contact_id = contact.id
  left join "crm"."companies" as company on opportunities.company_id = company.id
  left join "crm"."campaigns" as campaign on opportunities.campaign_id = campaign.id
where
  opportunities.id = sqlc.arg(id)::uuid;

-- name: CrmAnyOpportunity :many
select
  sqlc.embed(opportunities),
  sqlc.embed(owner),
  sqlc.embed(contact),
  sqlc.embed(company),
  sqlc.embed(campaign)
from
  "crm"."opportunities_view" as opportunities
  inner join "public"."user" as owner on opportunities.owner_id = owner.id
  left join "crm"."contacts" as contact on opportunities.contact_id = contact.id
  left join "crm"."companies" as company on opportunities.company_id = company.id
  left join "crm"."campaigns" as campaign on opportunities.campaign_id = campaign.id
where
  opportunities.id = any (@ids::uuid[]);

-- name: CrmRangeOpportunity :many
select
  sqlc.embed(opportunities),
  sqlc.embed(owner),
  sqlc.embed(contact),
  sqlc.embed(company),
  sqlc.embed(campaign)
from
  "crm"."opportunities_view" as opportunities
  inner join "public"."user" as owner on opportunities.owner_id = owner.id
  left join "crm"."contacts" as contact on opportunities.contact_id = contact.id
  left join "crm"."companies" as company on opportunities.company_id = company.id
  left join "crm"."campaigns" as campaign on opportunities.campaign_id = campaign.id
where
  opportunities.created_at >= @dateFrom::date
  and opportunities.created_at <= @dateTo::date
  and (opportunities.name ilike sqlc.narg(search)::text
    or opportunities.stage::text ilike sqlc.narg(search)::text
    or owner.name ilike sqlc.narg(search)::text
    or company.name ilike sqlc.narg(search)::text
    or contact.name ilike sqlc.narg(search)::text
    or campaign.name ilike sqlc.narg(search)::text
    or opportunities.source::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: CrmInsertOpportunity :one
insert into "crm"."opportunities_view"(name, stage, deal_value, probability, expected_close_date, lost_reason, source, owner_id, contact_id, company_id, campaign_id)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
returning
  *;

-- name: CrmUpdateOpportunity :one
update
  "crm"."opportunities_view"
set
  updated_at = now(),
  name = case when sqlc.arg(name) is not null then
    sqlc.arg(name)::text
  else
    name
  end,
  stage = case when sqlc.arg(stage) is not null then
    sqlc.arg(stage)::crm.opportunity_stage
  else
    stage
  end,
  deal_value = case when sqlc.arg(deal_value) is not null then
    sqlc.arg(deal_value)::numeric
  else
    deal_value
  end,
  probability = case when sqlc.arg(probability) is not null then
    sqlc.arg(probability)::real
  else
    probability
  end,
  expected_close_date = case when sqlc.arg(expected_close_date) is not null then
    sqlc.arg(expected_close_date)::date
  else
    expected_close_date
  end,
  lost_reason = case when sqlc.arg(lost_reason) is not null then
    sqlc.arg(lost_reason)::text
  else
    lost_reason
  end,
  source = case when sqlc.arg(source) is not null then
    sqlc.arg(source)::crm.opportunity_source
  else
    source
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
  company_id = case when sqlc.arg(company_id) is not null then
    sqlc.arg(company_id)::uuid
  else
    company_id
  end,
  campaign_id = case when sqlc.arg(campaign_id) is not null then
    sqlc.arg(campaign_id)::uuid
  else
    campaign_id
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: CrmRemoveOpportunity :exec
delete from "crm"."opportunities_view"
where id = @id::uuid;

