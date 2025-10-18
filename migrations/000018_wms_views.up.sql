-- wms.inbound_shipments_view
create view "wms"."inbound_shipments_view" as
select
  ish.*,
  json_agg(ishi.*) as inbound_shipment_items
from
  "wms"."inbound_shipments" as ish
  left join "wms"."inbound_shipment_items" as ishi on ishi.inbound_shipment_id = ish.id
group by
  ish.id;

-- wms.sales_orders_view
create view "wms"."sales_orders_view" as
select
  so.*,
  json_agg(soi.*) as sales_order_items
from
  "wms"."sales_orders" as so
  left join "wms"."sales_order_items" as soi on soi.sales_order_id = so.id
group by
  so.id;

-- wms.outbound_shipments_view
create view "wms"."outbound_shipments_view" as
select
  osh.*,
  json_agg(oshi.*) as outbound_shipment_items
from
  "wms"."outbound_shipments" as osh
  left join "wms"."outbound_shipment_items" as oshi on oshi.outbound_shipment_id = osh.id
group by
  osh.id;

-- wms.returns_view
create view "wms"."returns_view" as
select
  r.*,
  json_agg(ri.*) as return_items
from
  "wms"."returns" as r
  left join "wms"."return_items" as ri on ri.return_id = r.id
group by
  r.id;

-- wms.packages_view
create view "wms"."packages_view" as
select
  p.*,
  json_agg(pi.*) as package_items
from
  "wms"."packages" as p
  left join "wms"."package_items" as pi on pi.package_id = p.id
group by
  p.id;

-- wms.pick_batches_view
create view "wms"."pick_batches_view" as
select
  pb.*,
  json_agg(pbi.*) as pick_batch_items
from
  "wms"."pick_batches" as pb
  left join "wms"."pick_batch_items" as pbi on pbi.pick_batch_id = pb.id
group by
  pb.id;

-- wms.tasks_view
create view "wms"."tasks_view" as
select
  t.*,
  json_agg(ti.*) as task_items
from
  "wms"."tasks" as t
  left join "wms"."task_items" as ti on ti.task_id = t.id
group by
  t.id;

-- wms.locations_view
create view "wms"."locations_view" as
select
  l.*,
  json_agg(ist.*) as inventory_stock,
  json_agg(pr.*) as putaway_rules,
  json_agg(bt.*) as bin_thresholds
from
  "wms"."locations" as l
  left join "wms"."inventory_stock" as ist on ist.location_id = l.id
  left join "wms"."putaway_rules" as pr on pr.preferred_location_id = l.id
  left join "wms"."bin_thresholds" as bt on bt.location_id = l.id
group by
  l.id;

-- wms.products_view
create view "wms"."products_view" as
select
  p.*,
  json_agg(ib.*) as inventory_batches,
  json_agg(ia.*) as inventory_adjustments,
  json_agg(rp.*) as reorder_points,
  json_agg(ishi.*) as inbound_shipment_items,
  json_agg(st.*) as stock_transfers,
  json_agg(soi.*) as sales_order_items,
  json_agg(oshi.*) as outbound_shipment_items,
  json_agg(ri.*) as return_items,
  json_agg(ist.*) as inventory_stock,
  json_agg(pr.*) as putaway_rules,
  json_agg(bt.*) as bin_thresholds,
  json_agg(ti.*) as task_items,
  json_agg(pi.*) as package_items
from
  "wms"."products" as p
  left join "wms"."inventory_batches" as ib on ib.product_id = p.id
  left join "wms"."inventory_adjustments" as ia on ia.product_id = p.id
  left join "wms"."reorder_points" as rp on rp.product_id = p.id
  left join "wms"."inbound_shipment_items" as ishi on ishi.product_id = p.id
  left join "wms"."stock_transfers" as st on st.product_id = p.id
  left join "wms"."sales_order_items" as soi on soi.product_id = p.id
  left join "wms"."outbound_shipment_items" as oshi on oshi.product_id = p.id
  left join "wms"."return_items" as ri on ri.product_id = p.id
  left join "wms"."inventory_stock" as ist on ist.product_id = p.id
  left join "wms"."putaway_rules" as pr on pr.product_id = p.id
  left join "wms"."bin_thresholds" as bt on bt.product_id = p.id
  left join "wms"."task_items" as ti on ti.product_id = p.id
  left join "wms"."package_items" as pi on pi.product_id = p.id
group by
  p.id;

-- wms.warehouses_view
create view "wms"."warehouses_view" as
select
  w.*,
  json_agg(ishv.*) as inbound_shipments,
  json_agg(oshv.*) as outbound_shipments,
  json_agg(lv.*) as locations,
  json_agg(pr.*) as putaway_rules,
  json_agg(pbv.*) as pick_batches,
  json_agg(tv.*) as tasks
from
  "wms"."warehouses" as w
  left join "wms"."inbound_shipments_view" as ishv on ishv.warehouse_id = w.id
  left join "wms"."outbound_shipments_view" as oshv on oshv.warehouse_id = w.id
  left join "wms"."locations_view" as lv on lv.warehouse_id = w.id
  left join "wms"."putaway_rules" as pr on pr.warehouse_id = w.id
  left join "wms"."pick_batches_view" as pbv on pbv.warehouse_id = w.id
  left join "wms"."tasks_view" as tv on tv.warehouse_id = w.id
group by
  w.id;

-- wms.suppliers_view
create view "wms"."suppliers_view" as
select
  s.*,
  json_agg(pv.*) as products
from
  "wms"."suppliers" as s
  left join "wms"."products_view" as pv on pv.supplier_id = s.id
group by
  s.id;
