create view "crm"."invoices_view" as
select
  invoice.*,
  json_agg(items.*) as items
from
  "crm"."invoices" as invoice
  inner join "crm"."invoice_items" as items on items.invoice_id = invoice.id
group by
  invoice.id;

create view "crm"."opportunities_view" as
select
  opportunities.*,
  json_agg(products.*) as products
from
  "crm"."opportunities" as opportunities
  inner join "crm"."opportunity_products" as products on products.opportunity_id = opportunities.id
group by
  opportunities.id;

