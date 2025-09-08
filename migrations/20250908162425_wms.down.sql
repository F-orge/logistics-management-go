-- Drop indexes first
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

-- Drop WMS schema
drop schema if exists wms cascade;

