-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create IMS schema
create schema if not exists ims;

-- Create IMS enum types
create type ims.product_status_enum as enum(
  'active',
  'discontinued',
  'obsolete',
  'inactive'
);

create type ims.inventory_adjustment_reason_enum as enum(
  'cycle_count',
  'damaged_goods',
  'theft',
  'expired',
  'return_to_vendor',
  'manual_correction'
);

create type ims.inbound_shipment_status_enum as enum(
  'pending',
  'arrived',
  'processing',
  'completed',
  'cancelled'
);

create type ims.stock_transfer_status_enum as enum(
  'pending',
  'in_transit',
  'received',
  'cancelled'
);

create type ims.sales_order_status_enum as enum(
  'pending',
  'processing',
  'shipped',
  'completed',
  'cancelled'
);

create type ims.outbound_shipment_status_enum as enum(
  'picking',
  'packed',
  'shipped',
  'delivered',
  'cancelled'
);

create type ims.return_status_enum as enum(
  'requested',
  'approved',
  'rejected',
  'received',
  'processed'
);

create type ims.return_item_condition_enum as enum(
  'sellable',
  'damaged',
  'defective',
  'expired',
  'unsellable'
);

-- IMS Suppliers
create table ims.suppliers(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  contact_person varchar(255),
  email varchar(255),
  phone_number varchar(20),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.suppliers is 'Stores information about the suppliers who provide the products.';

comment on column ims.suppliers.id is 'Primary key';

comment on column ims.suppliers.name is 'The name of the supplier company.';

comment on column ims.suppliers.contact_person is 'The primary contact at the supplier.';

comment on column ims.suppliers.email is 'The supplier''s contact email.';

comment on column ims.suppliers.phone_number is 'The supplier''s contact phone number.';

comment on column ims.suppliers.created_at is 'Timestamp when the supplier was created.';

comment on column ims.suppliers.updated_at is 'Timestamp when the supplier was last updated.';

-- IMS Products
create table ims.products(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  sku varchar(100) not null unique,
  barcode varchar(100),
  description text,
  cost_price numeric(10, 2),
  length real,
  width real,
  height real,
  volume real generated always as (length * width * height) stored,
  weight real,
  status ims.product_status_enum default 'active',
  supplier_id uuid references ims.suppliers(id),
  client_id uuid references crm.companies(id),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.products is 'Represents the master record for each unique product (SKU) managed in the inventory.';

comment on column ims.products.id is 'Primary key';

comment on column ims.products.name is 'The common name of the product.';

comment on column ims.products.sku is 'The unique Stock Keeping Unit identifier.';

comment on column ims.products.barcode is 'The product''s barcode (e.g., UPC, EAN) for scanning.';

comment on column ims.products.description is 'Detailed information about the product.';

comment on column ims.products.cost_price is 'The purchase price or cost of the product.';

comment on column ims.products.length is 'Physical length dimension.';

comment on column ims.products.width is 'Physical width dimension.';

comment on column ims.products.height is 'Physical height dimension.';

comment on column ims.products.volume is 'Product volume (automatically calculated from length * width * height).';

comment on column ims.products.weight is 'Physical weight.';

comment on column ims.products.status is 'The product''s lifecycle status using product_status_enum.';

comment on column ims.products.supplier_id is 'A reference to the product''s supplier.';

comment on column ims.products.client_id is 'A reference to the client company (from CRM) that owns this inventory.';

comment on column ims.products.created_at is 'Timestamp when the product was created.';

comment on column ims.products.updated_at is 'Timestamp when the product was last updated.';

-- IMS Inventory Batches
create table ims.inventory_batches(
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references ims.products(id),
  batch_number varchar(100) not null,
  expiration_date date,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.inventory_batches is 'Stores information for products that are tracked by batch or lot, essential for quality control and recalls.';

comment on column ims.inventory_batches.id is 'Primary key';

comment on column ims.inventory_batches.product_id is 'The product associated with this batch.';

comment on column ims.inventory_batches.batch_number is 'The unique identifier for the batch/lot.';

comment on column ims.inventory_batches.expiration_date is 'The expiration date of the products in this batch.';

comment on column ims.inventory_batches.created_at is 'Timestamp when the batch was created.';

comment on column ims.inventory_batches.updated_at is 'Timestamp when the batch was last updated.';

-- IMS Inventory Adjustments
create table ims.inventory_adjustments(
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references ims.products(id),
  warehouse_id uuid not null,
  user_id uuid not null references auth."user"(id),
  quantity_change integer not null,
  reason ims.inventory_adjustment_reason_enum,
  notes text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.inventory_adjustments is 'Logs any manual changes made to inventory levels to maintain accuracy.';

comment on column ims.inventory_adjustments.id is 'Primary key';

comment on column ims.inventory_adjustments.product_id is 'The product being adjusted.';

comment on column ims.inventory_adjustments.warehouse_id is 'The warehouse where the adjustment occurred.';

comment on column ims.inventory_adjustments.user_id is 'The user who performed the adjustment.';

comment on column ims.inventory_adjustments.quantity_change is 'The amount by which the quantity was changed (can be positive or negative).';

comment on column ims.inventory_adjustments.reason is 'The reason for the adjustment using inventory_adjustment_reason_enum.';

comment on column ims.inventory_adjustments.notes is 'Additional details about the adjustment.';

comment on column ims.inventory_adjustments.created_at is 'Timestamp when the adjustment was created.';

comment on column ims.inventory_adjustments.updated_at is 'Timestamp when the adjustment was last updated.';

-- IMS Reorder Points
create table ims.reorder_points(
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references ims.products(id),
  warehouse_id uuid not null,
  threshold integer not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.reorder_points is 'Defines the minimum stock level for a product that triggers a low stock alert.';

comment on column ims.reorder_points.id is 'Primary key';

comment on column ims.reorder_points.product_id is 'The product to monitor.';

comment on column ims.reorder_points.warehouse_id is 'The specific warehouse to monitor the stock level in.';

comment on column ims.reorder_points.threshold is 'The minimum quantity that triggers the alert.';

comment on column ims.reorder_points.created_at is 'Timestamp when the reorder point was created.';

comment on column ims.reorder_points.updated_at is 'Timestamp when the reorder point was last updated.';

-- IMS Inbound Shipments
create table ims.inbound_shipments(
  id uuid primary key default gen_random_uuid(),
  client_id uuid references crm.companies(id),
  warehouse_id uuid not null,
  status ims.inbound_shipment_status_enum default 'pending',
  expected_arrival_date date,
  actual_arrival_date date,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.inbound_shipments is 'Represents an expected inbound shipment from a client or supplier (also known as an Advance Shipping Notice or ASN).';

comment on column ims.inbound_shipments.id is 'Primary key';

comment on column ims.inbound_shipments.client_id is 'The client company sending the inventory.';

comment on column ims.inbound_shipments.warehouse_id is 'The destination warehouse.';

comment on column ims.inbound_shipments.status is 'The current status of the shipment using inbound_shipment_status_enum.';

comment on column ims.inbound_shipments.expected_arrival_date is 'The planned arrival date.';

comment on column ims.inbound_shipments.actual_arrival_date is 'The date the shipment actually arrived.';

comment on column ims.inbound_shipments.created_at is 'Timestamp when the inbound shipment was created.';

comment on column ims.inbound_shipments.updated_at is 'Timestamp when the inbound shipment was last updated.';

-- IMS Inbound Shipment Items
create table ims.inbound_shipment_items(
  id uuid primary key default gen_random_uuid(),
  inbound_shipment_id uuid not null references ims.inbound_shipments(id),
  product_id uuid not null references ims.products(id),
  expected_quantity integer not null,
  received_quantity integer,
  discrepancy_quantity integer generated always as (coalesce(received_quantity, 0) - expected_quantity) stored,
  discrepancy_notes text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.inbound_shipment_items is 'Details the specific products and quantities expected in an inbound shipment.';

comment on column ims.inbound_shipment_items.id is 'Primary key';

comment on column ims.inbound_shipment_items.inbound_shipment_id is 'A reference to the parent inbound shipment.';

comment on column ims.inbound_shipment_items.product_id is 'The product included in the shipment.';

comment on column ims.inbound_shipment_items.expected_quantity is 'The quantity declared on the ASN.';

comment on column ims.inbound_shipment_items.received_quantity is 'The actual quantity counted upon receipt.';

comment on column ims.inbound_shipment_items.discrepancy_quantity is 'The difference between received and expected quantities (automatically calculated).';

comment on column ims.inbound_shipment_items.discrepancy_notes is 'Notes detailing any differences between expected and received quantities.';

comment on column ims.inbound_shipment_items.created_at is 'Timestamp when the inbound shipment item was created.';

comment on column ims.inbound_shipment_items.updated_at is 'Timestamp when the inbound shipment item was last updated.';

-- IMS Stock Transfers
create table ims.stock_transfers(
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references ims.products(id),
  source_warehouse_id uuid not null,
  destination_warehouse_id uuid not null,
  quantity integer not null,
  status ims.stock_transfer_status_enum default 'pending',
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.stock_transfers is 'Tracks the movement of inventory from one warehouse to another.';

comment on column ims.stock_transfers.id is 'Primary key';

comment on column ims.stock_transfers.product_id is 'The product being transferred.';

comment on column ims.stock_transfers.source_warehouse_id is 'The warehouse the stock is moving from.';

comment on column ims.stock_transfers.destination_warehouse_id is 'The warehouse the stock is moving to.';

comment on column ims.stock_transfers.quantity is 'The amount of stock being transferred.';

comment on column ims.stock_transfers.status is 'The status of the transfer using stock_transfer_status_enum.';

comment on column ims.stock_transfers.created_at is 'Timestamp when the stock transfer was created.';

comment on column ims.stock_transfers.updated_at is 'Timestamp when the stock transfer was last updated.';

-- IMS Sales Orders
create table ims.sales_orders(
  id uuid primary key default gen_random_uuid(),
  order_number varchar(100) not null unique,
  client_id uuid not null references crm.companies(id),
  crm_opportunity_id uuid references crm.opportunities(id),
  status ims.sales_order_status_enum default 'pending',
  shipping_address text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.sales_orders is 'Represents a customer''s order, often originating from the CRM, which needs to be fulfilled from inventory.';

comment on column ims.sales_orders.id is 'Primary key';

comment on column ims.sales_orders.order_number is 'A unique identifier for the sales order.';

comment on column ims.sales_orders.client_id is 'The client company that placed the order.';

comment on column ims.sales_orders.crm_opportunity_id is 'A link back to the original opportunity in the CRM.';

comment on column ims.sales_orders.status is 'The fulfillment status of the order using sales_order_status_enum.';

comment on column ims.sales_orders.shipping_address is 'The address where the order should be shipped.';

comment on column ims.sales_orders.created_at is 'Timestamp when the sales order was created.';

comment on column ims.sales_orders.updated_at is 'Timestamp when the sales order was last updated.';

-- IMS Sales Order Items
create table ims.sales_order_items(
  id uuid primary key default gen_random_uuid(),
  sales_order_id uuid not null references ims.sales_orders(id),
  product_id uuid not null references ims.products(id),
  quantity_ordered integer not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.sales_order_items is 'Details the specific products and quantities required for a sales order.';

comment on column ims.sales_order_items.id is 'Primary key';

comment on column ims.sales_order_items.sales_order_id is 'A reference to the parent sales order.';

comment on column ims.sales_order_items.product_id is 'The product being ordered.';

comment on column ims.sales_order_items.quantity_ordered is 'The quantity of the product requested by the customer.';

comment on column ims.sales_order_items.created_at is 'Timestamp when the sales order item was created.';

comment on column ims.sales_order_items.updated_at is 'Timestamp when the sales order item was last updated.';

-- IMS Outbound Shipments
create table ims.outbound_shipments(
  id uuid primary key default gen_random_uuid(),
  sales_order_id uuid not null references ims.sales_orders(id),
  warehouse_id uuid not null,
  status ims.outbound_shipment_status_enum default 'picking',
  tracking_number varchar(100),
  carrier varchar(100),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- tms relationships - add foreign key constraints to existing columns
alter table tms.trip_stops
  add constraint fk_trip_stops_shipment foreign key (shipment_id) references ims.outbound_shipments(id);

comment on column tms.trip_stops.shipment_id is 'Reference to the shipment being handled at this stop.';

alter table tms.shipment_legs
  add constraint fk_shipment_legs_shipment foreign key (shipment_id) references ims.outbound_shipments(id);

comment on column tms.shipment_legs.shipment_id is 'Reference to the overall shipment.';

--
comment on table ims.outbound_shipments is 'Represents the physical shipment created to fulfill a sales order.';

comment on column ims.outbound_shipments.id is 'Primary key';

comment on column ims.outbound_shipments.sales_order_id is 'The sales order being fulfilled.';

comment on column ims.outbound_shipments.warehouse_id is 'The warehouse the shipment is being sent from.';

comment on column ims.outbound_shipments.status is 'The status of the outbound shipment using outbound_shipment_status_enum.';

comment on column ims.outbound_shipments.tracking_number is 'The carrier tracking number for the shipment.';

comment on column ims.outbound_shipments.carrier is 'The shipping carrier (e.g., FedEx, UPS).';

comment on column ims.outbound_shipments.created_at is 'Timestamp when the outbound shipment was created.';

comment on column ims.outbound_shipments.updated_at is 'Timestamp when the outbound shipment was last updated.';

-- IMS Outbound Shipment Items
create table ims.outbound_shipment_items(
  id uuid primary key default gen_random_uuid(),
  outbound_shipment_id uuid not null references ims.outbound_shipments(id),
  sales_order_item_id uuid not null references ims.sales_order_items(id),
  product_id uuid not null references ims.products(id),
  batch_id uuid references ims.inventory_batches(id),
  quantity_shipped integer not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.outbound_shipment_items is 'Details the specific items, quantities, and batches included in an outbound shipment.';

comment on column ims.outbound_shipment_items.id is 'Primary key';

comment on column ims.outbound_shipment_items.outbound_shipment_id is 'A reference to the parent outbound shipment.';

comment on column ims.outbound_shipment_items.sales_order_item_id is 'A link to the specific line item on the sales order.';

comment on column ims.outbound_shipment_items.product_id is 'The product being shipped.';

comment on column ims.outbound_shipment_items.batch_id is 'The specific batch the item was picked from (if applicable).';

comment on column ims.outbound_shipment_items.quantity_shipped is 'The quantity of the product included in this shipment.';

comment on column ims.outbound_shipment_items.created_at is 'Timestamp when the outbound shipment item was created.';

comment on column ims.outbound_shipment_items.updated_at is 'Timestamp when the outbound shipment item was last updated.';

-- IMS Returns
create table ims.returns(
  id uuid primary key default gen_random_uuid(),
  return_number varchar(100) not null unique,
  sales_order_id uuid references ims.sales_orders(id),
  client_id uuid not null references crm.companies(id),
  status ims.return_status_enum default 'requested',
  reason text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.returns is 'Represents a return request from a client (Reverse Logistics).';

comment on column ims.returns.id is 'Primary key';

comment on column ims.returns.return_number is 'A unique identifier for the return.';

comment on column ims.returns.sales_order_id is 'A reference to the original sales order being returned.';

comment on column ims.returns.client_id is 'The client initiating the return.';

comment on column ims.returns.status is 'The status of the return using return_status_enum.';

comment on column ims.returns.reason is 'The reason for the return.';

comment on column ims.returns.created_at is 'Timestamp when the return was created.';

comment on column ims.returns.updated_at is 'Timestamp when the return was last updated.';

-- IMS Return Items
create table ims.return_items(
  id uuid primary key default gen_random_uuid(),
  return_id uuid not null references ims.returns(id),
  product_id uuid not null references ims.products(id),
  quantity_expected integer not null,
  quantity_received integer,
  quantity_variance integer generated always as (coalesce(quantity_received, 0) - quantity_expected) stored,
  condition ims.return_item_condition_enum,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

comment on table ims.return_items is 'Details the specific products and quantities being returned.';

comment on column ims.return_items.id is 'Primary key';

comment on column ims.return_items.return_id is 'A reference to the parent return record.';

comment on column ims.return_items.product_id is 'The product being returned.';

comment on column ims.return_items.quantity_expected is 'The quantity the client stated they would return.';

comment on column ims.return_items.quantity_received is 'The actual quantity received at the warehouse.';

comment on column ims.return_items.quantity_variance is 'The difference between received and expected return quantities (automatically calculated).';

comment on column ims.return_items.condition is 'The condition of the returned item using return_item_condition_enum.';

comment on column ims.return_items.created_at is 'Timestamp when the return item was created.';

comment on column ims.return_items.updated_at is 'Timestamp when the return item was last updated.';

-- Create indexes for performance
create index idx_ims_suppliers_name on ims.suppliers(name);

create index idx_ims_suppliers_email on ims.suppliers(email);

create index idx_ims_products_sku on ims.products(sku);

create index idx_ims_products_barcode on ims.products(barcode);

create index idx_ims_products_name on ims.products(name);

create index idx_ims_products_status on ims.products(status);

create index idx_ims_products_supplier_id on ims.products(supplier_id);

create index idx_ims_products_client_id on ims.products(client_id);

create index idx_ims_inventory_batches_product_id on ims.inventory_batches(product_id);

create index idx_ims_inventory_batches_batch_number on ims.inventory_batches(batch_number);

create index idx_ims_inventory_batches_expiration_date on ims.inventory_batches(expiration_date);

create index idx_ims_inventory_adjustments_product_id on ims.inventory_adjustments(product_id);

create index idx_ims_inventory_adjustments_warehouse_id on ims.inventory_adjustments(warehouse_id);

create index idx_ims_inventory_adjustments_user_id on ims.inventory_adjustments(user_id);

create index idx_ims_inventory_adjustments_reason on ims.inventory_adjustments(reason);

create index idx_ims_reorder_points_product_id on ims.reorder_points(product_id);

create index idx_ims_reorder_points_warehouse_id on ims.reorder_points(warehouse_id);

create index idx_ims_inbound_shipments_client_id on ims.inbound_shipments(client_id);

create index idx_ims_inbound_shipments_warehouse_id on ims.inbound_shipments(warehouse_id);

create index idx_ims_inbound_shipments_status on ims.inbound_shipments(status);

create index idx_ims_inbound_shipments_expected_arrival_date on ims.inbound_shipments(expected_arrival_date);

create index idx_ims_inbound_shipments_actual_arrival_date on ims.inbound_shipments(actual_arrival_date);

create index idx_ims_inbound_shipment_items_inbound_shipment_id on ims.inbound_shipment_items(inbound_shipment_id);

create index idx_ims_inbound_shipment_items_product_id on ims.inbound_shipment_items(product_id);

create index idx_ims_stock_transfers_product_id on ims.stock_transfers(product_id);

create index idx_ims_stock_transfers_source_warehouse_id on ims.stock_transfers(source_warehouse_id);

create index idx_ims_stock_transfers_destination_warehouse_id on ims.stock_transfers(destination_warehouse_id);

create index idx_ims_stock_transfers_status on ims.stock_transfers(status);

create index idx_ims_sales_orders_order_number on ims.sales_orders(order_number);

create index idx_ims_sales_orders_client_id on ims.sales_orders(client_id);

create index idx_ims_sales_orders_crm_opportunity_id on ims.sales_orders(crm_opportunity_id);

create index idx_ims_sales_orders_status on ims.sales_orders(status);

create index idx_ims_sales_order_items_sales_order_id on ims.sales_order_items(sales_order_id);

create index idx_ims_sales_order_items_product_id on ims.sales_order_items(product_id);

create index idx_ims_outbound_shipments_sales_order_id on ims.outbound_shipments(sales_order_id);

create index idx_ims_outbound_shipments_warehouse_id on ims.outbound_shipments(warehouse_id);

create index idx_ims_outbound_shipments_status on ims.outbound_shipments(status);

create index idx_ims_outbound_shipments_tracking_number on ims.outbound_shipments(tracking_number);

create index idx_ims_outbound_shipments_carrier on ims.outbound_shipments(carrier);

create index idx_ims_outbound_shipment_items_outbound_shipment_id on ims.outbound_shipment_items(outbound_shipment_id);

create index idx_ims_outbound_shipment_items_sales_order_item_id on ims.outbound_shipment_items(sales_order_item_id);

create index idx_ims_outbound_shipment_items_product_id on ims.outbound_shipment_items(product_id);

create index idx_ims_outbound_shipment_items_batch_id on ims.outbound_shipment_items(batch_id);

create index idx_ims_returns_return_number on ims.returns(return_number);

create index idx_ims_returns_sales_order_id on ims.returns(sales_order_id);

create index idx_ims_returns_client_id on ims.returns(client_id);

create index idx_ims_returns_status on ims.returns(status);

create index idx_ims_return_items_return_id on ims.return_items(return_id);

create index idx_ims_return_items_product_id on ims.return_items(product_id);

create index idx_ims_return_items_condition on ims.return_items(condition);

