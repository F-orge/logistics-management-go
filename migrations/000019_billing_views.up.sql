-- billing.rate_cards_view
create view "billing"."rate_cards_view" as
select
  rc.*,
  json_agg(rr.*) as rate_rules
from
  "billing"."rate_cards" as rc
  left join "billing"."rate_rules" as rr on rr.rate_card_id = rc.id
group by
  rc.id;

-- billing.client_accounts_view
create view "billing"."client_accounts_view" as
select
  ca.*,
  json_agg(at.*) as account_transactions
from
  "billing"."client_accounts" as ca
  left join "billing"."account_transactions" as at on at.client_account_id = ca.id
group by
  ca.id;

-- billing.invoice_line_items_view
create view "billing"."invoice_line_items_view" as
select
  ili.*,
  json_agg(d.*) as disputes
from
  "billing"."invoice_line_items" as ili
  left join "billing"."disputes" as d on d.line_item_id = ili.id
group by
  ili.id;

-- billing.invoices_view
create view "billing"."invoices_view" as
select
  i.*,
  json_agg(iliv.*) as invoice_line_items,
  json_agg(p.*) as payments,
  json_agg(cn.*) as credit_notes
from
  "billing"."invoices" as i
  left join "billing"."invoice_line_items_view" as iliv on iliv.invoice_id = i.id
  left join "billing"."payments" as p on p.invoice_id = i.id
  left join "billing"."credit_notes" as cn on cn.invoice_id = i.id
group by
  i.id;

-- billing.quotes_view
create view "billing"."quotes_view" as
select
  q.*,
  json_agg(iv.*) as invoices
from
  "billing"."quotes" as q
  left join "billing"."invoices_view" as iv on iv.quote_id = q.id
group by
  q.id;
