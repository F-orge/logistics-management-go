-- name: CrmPaginateInvoice :many
select
  sqlc.embed(invoices),
  sqlc.embed(opportunity)
from
  "crm"."invoices" as invoices
  left join "crm"."opportunities" as opportunity on invoices.opportunity_id = opportunity.id
where (opportunity.name ilike sqlc.narg(search)::text
  or invoices.status::text ilike sqlc.narg(search)::text
  or sqlc.narg(search)::text is null)
limit sqlc.arg(perPage)::int offset (sqlc.arg(page)::int - 1) * sqlc.arg(perPage)::int;

-- name: CrmFindInvoice :one
select
  sqlc.embed(invoices),
  sqlc.embed(opportunity)
from
  "crm"."invoices" as invoices
  left join "crm"."opportunities" as opportunity on invoices.opportunity_id = opportunity.id
where
  invoices.id = sqlc.arg(id)::uuid;

-- name: CrmAnyInvoice :many
select
  sqlc.embed(invoices),
  sqlc.embed(opportunity)
from
  "crm"."invoices" as invoices
  left join "crm"."opportunities" as opportunity on invoices.opportunity_id = opportunity.id
where
  invoices.id = any (@ids::uuid[]);

-- name: CrmRangeInvoice :many
select
  sqlc.embed(invoices),
  sqlc.embed(opportunity)
from
  "crm"."invoices" as invoices
  left join "crm"."opportunities" as opportunity on invoices.opportunity_id = opportunity.id
where
  invoices.created_at >= @dateFrom::date
  and invoices.created_at <= @dateTo::date
  and (opportunity.name ilike sqlc.narg(search)::text
    or invoices.status::text ilike sqlc.narg(search)::text
    or sqlc.narg(search)::text is null);

-- name: CrmInsertInvoice :one
insert into "crm"."invoices"(opportunity_id, status, total, issue_date, due_date, sent_at, paid_at, payment_method)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
returning
  *;

-- name: CrmUpdateInvoice :one
update
  "crm"."invoices"
set
  updated_at = now(),
  opportunity_id = case when sqlc.arg(opportunity_id) is not null then
    sqlc.arg(opportunity_id)::uuid
  else
    opportunity_id
  end,
  status = case when sqlc.arg(status) is not null then
    sqlc.arg(status)::crm.invoice_status
  else
    status
  end,
  total = case when sqlc.arg(total) is not null then
    sqlc.arg(total)::numeric
  else
    total
  end,
  issue_date = case when sqlc.arg(issue_date) is not null then
    sqlc.arg(issue_date)::date
  else
    issue_date
  end,
  due_date = case when sqlc.arg(due_date) is not null then
    sqlc.arg(due_date)::date
  else
    due_date
  end,
  sent_at = case when sqlc.arg(sent_at) is not null then
    sqlc.arg(sent_at)::timestamptz
  else
    sent_at
  end,
  paid_at = case when sqlc.arg(paid_at) is not null then
    sqlc.arg(paid_at)::timestamptz
  else
    paid_at
  end,
  payment_method = case when sqlc.arg(payment_method) is not null then
    sqlc.arg(payment_method)::crm.payment_method
  else
    payment_method
  end
where
  id = sqlc.arg(id)::uuid
returning
  *;

-- name: CrmRemoveInvoice :exec
delete from "crm"."invoices"
where id = @id::uuid;

