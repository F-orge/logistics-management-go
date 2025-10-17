drop index if exists idx_wms_package_items_product_id;

drop index if exists idx_wms_package_items_package_id;

drop index if exists idx_wms_packages_tracking_number;

drop index if exists idx_wms_packages_warehouse_id;

drop index if exists idx_wms_packages_sales_order_id;

drop index if exists idx_wms_task_items_destination_location_id;

drop index if exists idx_wms_task_items_source_location_id;

drop index if exists idx_wms_task_items_product_id;

drop index if exists idx_wms_task_items_task_id;

drop index if exists idx_wms_tasks_pick_batch_id;

drop index if exists idx_wms_tasks_status;

drop index if exists idx_wms_tasks_type;

drop index if exists idx_wms_tasks_user_id;

drop index if exists idx_wms_tasks_warehouse_id;

drop index if exists idx_wms_pick_batches_assigned_user_id;

drop index if exists idx_wms_pick_batches_status;

drop index if exists idx_wms_pick_batches_warehouse_id;

drop index if exists idx_wms_bin_thresholds_product_id;

drop index if exists idx_wms_bin_thresholds_location_id;

drop index if exists idx_wms_putaway_rules_priority;

drop index if exists idx_wms_putaway_rules_warehouse_id;

drop index if exists idx_wms_putaway_rules_product_id;

drop index if exists idx_wms_inventory_stock_status;

drop index if exists idx_wms_inventory_stock_batch_id;

drop index if exists idx_wms_inventory_stock_product_id;

drop index if exists idx_wms_inventory_stock_location_id;

drop index if exists idx_wms_locations_barcode;

drop index if exists idx_wms_locations_type;

drop index if exists idx_wms_locations_parent_location_id;

drop index if exists idx_wms_locations_warehouse_id;

-- Drop tables in reverse order to handle foreign keys
drop table if exists wms.package_items;

drop table if exists wms.packages;

drop table if exists wms.task_items;

drop table if exists wms.tasks;

drop table if exists wms.pick_batch_items;

drop table if exists wms.pick_batches;

drop table if exists wms.bin_thresholds;

drop table if exists wms.putaway_rules;

drop table if exists wms.inventory_stock;

drop table if exists wms.locations;

drop table if exists wms.warehouses;

-- Drop WMS enum types
drop type if exists wms.task_item_status_enum;

drop type if exists wms.task_status_enum;

drop type if exists wms.task_type_enum;

drop type if exists wms.pick_strategy_enum;

drop type if exists wms.pick_batch_status_enum;

drop type if exists wms.inventory_stock_status_enum;

drop type if exists wms.location_type_enum;

-- Drop foreign key constraints from TMS tables first
alter table tms.trip_stops
  drop constraint if exists fk_trip_stops_shipment;

alter table tms.shipment_legs
  drop constraint if exists fk_shipment_legs_shipment;

-- Drop tables in reverse order to handle foreign keys
drop table if exists wms.return_items;

drop table if exists wms.returns;

drop table if exists wms.outbound_shipment_items;

drop table if exists wms.outbound_shipments;

drop table if exists wms.sales_order_items;

drop table if exists wms.sales_orders;

drop table if exists wms.stock_transfers;

drop table if exists wms.inbound_shipment_items;

drop table if exists wms.inbound_shipments;

drop table if exists wms.reorder_points;

drop table if exists wms.inventory_adjustments;

drop table if exists wms.inventory_batches;

drop table if exists wms.products;

drop table if exists wms.suppliers;

-- Drop IMS enum types
drop type if exists wms.return_item_condition_enum;

drop type if exists wms.return_status_enum;

drop type if exists wms.outbound_shipment_status_enum;

drop type if exists wms.sales_order_status_enum;

drop type if exists wms.stock_transfer_status_enum;

drop type if exists wms.inbound_shipment_status_enum;

drop type if exists wms.inventory_adjustment_reason_enum;

drop type if exists wms.product_status_enum;

-- Drop IMS schema
drop schema if exists wms cascade;

