-- name: CrmPaginateInteractionMetadata :one
select
  count(*) over () as total_items,
  ceil(count(*) over ()::numeric / NULLIF(sqlc.arg(per_page)::int, 0)) as total_pages,
  sqlc.arg(page)::int as page,
  sqlc.arg(per_page)::int as per_page
from
  "crm"."interactions" as interactions;

-- name: CrmPaginateInteraction :many
select
  interactions.*,
  sqlc.embed(contact),
  sqlc.embed(users),
  sqlc.embed(cases)
from
  "crm"."interactions" as interactions
  inner join "crm"."contacts" as contact on interactions.contact_id = contact.id
  inner join "public"."user" as users on interactions.user_id = users.id
  left join "crm"."cases" as cases on interactions.case_id = cases.id
where (contact.name ilike sqlc.narg(search)::text
  or users.name ilike sqlc.narg(search)::text
  or cases.case_number ilike sqlc.narg(search)::text
  or interactions.type::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(per_page)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(per_page)::int;

-- name: CrmFindInteraction :one
select
  interactions.*,
  sqlc.embed(contact),
  sqlc.embed(users),
  sqlc.embed(cases)
from
  "crm"."interactions" as interactions
  inner join "crm"."contacts" as contact on interactions.contact_id = contact.id
  inner join "public"."user" as users on interactions.user_id = users.id
  left join "crm"."cases" as cases on interactions.case_id = cases.id
where
  interactions.id = sqlc.arg(id)::uuid;

-- name: CrmAnyInteraction :many
select
  interactions.*,
  sqlc.embed(contact),
  sqlc.embed(users),
  sqlc.embed(cases)
from
  "crm"."interactions" as interactions
  inner join "crm"."contacts" as contact on interactions.contact_id = contact.id
  inner join "public"."user" as users on interactions.user_id = users.id
  left join "crm"."cases" as cases on interactions.case_id = cases.id
where
  interactions.id = any (@ids::uuid[]);

-- name: CrmRangeInteraction :many
select
  interactions.*,
  sqlc.embed(contact),
  sqlc.embed(users),
  sqlc.embed(cases)
from
  "crm"."interactions" as interactions
  inner join "crm"."contacts" as contact on interactions.contact_id = contact.id
  inner join "public"."user" as users on interactions.user_id = users.id
  left join "crm"."cases" as cases on interactions.case_id = cases.id
where
  interactions.created_at >= @dateFrom::date
  and interactions.created_at <= @dateTo::date
  and (contact.name ilike sqlc.narg(search)::text
    or users.name ilike sqlc.narg(search)::text
    or cases.case_number ilike sqlc.narg(search)::text
    or interactions.type::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: CrmInsertInteraction :one
insert into "crm"."interactions"(contact_id, user_id, case_id, type, outcome, notes, interaction_date)
  values ($1, $2, $3, $4, $5, $6, $7)
returning
  *;

-- name: CrmUpdateInteraction :one
update
  "crm"."interactions"
set
  updated_at = now(),
  contact_id = case when sqlc.arg(contact_id) is not null then
    sqlc.arg(contact_id)::uuid
  else
    contact_id
  end,
  user_id = case when sqlc.arg(user_id) is not null then
    sqlc.arg(user_id)::text
  else
    user_id
  end,
  case_id = case when sqlc.arg(case_id) is not null then
    sqlc.arg(case_id)::uuid
  else
    case_id
  end,
  type = case when sqlc.arg(type) is not null then
    sqlc.arg(type)::crm.interaction_type
  else
    type
  end,
  outcome = case when sqlc.arg(outcome) is not null then
    sqlc.arg(outcome)::varchar
  else
    outcome
  end,
  notes = case when sqlc.arg(notes) is not null then
    sqlc.arg(notes)::text
  else
    notes
  end,
  interaction_date = case when sqlc.arg(interaction_date) is not null then
    sqlc.arg(interaction_date)::timestamptz
  else
    interaction_date
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: CrmRemoveInteraction :exec
delete from "crm"."interactions"
where id = @id::uuid;

