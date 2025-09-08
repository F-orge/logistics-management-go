-- Drop foreign key constraints from TMS tables first
alter table tms.trip_stops
  drop constraint if exists fk_trip_stops_shipment;

alter table tms.shipment_legs
  drop constraint if exists fk_shipment_legs_shipment;

-- Drop tables in reverse order to handle foreign keys
drop table if exists ims.return_items;

drop table if exists ims.returns;

drop table if exists ims.outbound_shipment_items;

drop table if exists ims.outbound_shipments;

drop table if exists ims.sales_order_items;

drop table if exists ims.sales_orders;

drop table if exists ims.stock_transfers;

drop table if exists ims.inbound_shipment_items;

drop table if exists ims.inbound_shipments;

drop table if exists ims.reorder_points;

drop table if exists ims.inventory_adjustments;

drop table if exists ims.inventory_batches;

drop table if exists ims.products;

drop table if exists ims.suppliers;

-- Drop IMS enum types
drop type if exists ims.return_item_condition_enum;

drop type if exists ims.return_status_enum;

drop type if exists ims.outbound_shipment_status_enum;

drop type if exists ims.sales_order_status_enum;

drop type if exists ims.stock_transfer_status_enum;

drop type if exists ims.inbound_shipment_status_enum;

drop type if exists ims.inventory_adjustment_reason_enum;

drop type if exists ims.product_status_enum;

-- Drop IMS schema
drop schema if exists ims cascade;

