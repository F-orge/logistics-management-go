-- name: CrmPaginateInvoice :many
select
  sqlc.embed(invoices),
  sqlc.embed(opportunity)
from
  "crm"."invoices" as invoices
  left join "crm"."opportunities" as opportunity on invoices.opportunity_id = opportunity.id
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
  and invoices.created_at <= @dateTo::date;

-- name: CrmInsertInvoice :one
insert into "crm"."invoices"(opportunity_id, status, total, issue_date, due_date, sent_at, paid_at, payment_method)
  values ($1, $2, $3, $4, $5, $6, $7, $8)
returning
  *;

-- name: CrmUpdateInvoice :one
update
  "crm"."invoices"
set
  opportunity_id = case when sqlc.arg(set_opportunity_id)::boolean then
    sqlc.arg(opportunity_id)::uuid
  else
    opportunity_id
  end,
  status = case when sqlc.arg(set_status)::boolean then
    sqlc.arg(status)::crm.invoice_status
  else
    status
  end,
  total = case when sqlc.arg(set_total)::boolean then
    sqlc.arg(total)::numeric
  else
    total
  end,
  issue_date = case when sqlc.arg(set_issue_date)::boolean then
    sqlc.arg(issue_date)::date
  else
    issue_date
  end,
  due_date = case when sqlc.arg(set_due_date)::boolean then
    sqlc.arg(due_date)::date
  else
    due_date
  end,
  sent_at = case when sqlc.arg(set_sent_at)::boolean then
    sqlc.arg(sent_at)::timestamptz
  else
    sent_at
  end,
  paid_at = case when sqlc.arg(set_paid_at)::boolean then
    sqlc.arg(paid_at)::timestamptz
  else
    paid_at
  end,
  payment_method = case when sqlc.arg(set_payment_method)::boolean then
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
