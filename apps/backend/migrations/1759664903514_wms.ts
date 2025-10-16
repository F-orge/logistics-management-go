import { type Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await sql`
		-- Enable UUID extension if not already enabled
		create extension if not exists "uuid-ossp";

		create schema if not exists wms;

		create type wms.product_status_enum as enum(
			'active',
			'discontinued',
			'obsolete',
			'inactive'
		);

		create type wms.inventory_adjustment_reason_enum as enum(
			'cycle_count',
			'damaged_goods',
			'theft',
			'expired',
			'return_to_vendor',
			'manual_correction'
		);

		create type wms.inbound_shipment_status_enum as enum(
			'pending',
			'arrived',
			'processing',
			'completed',
			'cancelled'
		);

		create type wms.stock_transfer_status_enum as enum(
			'pending',
			'in_transit',
			'received',
			'cancelled'
		);

		create type wms.sales_order_status_enum as enum(
			'pending',
			'processing',
			'shipped',
			'completed',
			'cancelled'
		);

		create type wms.outbound_shipment_status_enum as enum(
			'picking',
			'packed',
			'shipped',
			'delivered',
			'cancelled'
		);

		create type wms.return_status_enum as enum(
			'requested',
			'approved',
			'rejected',
			'received',
			'processed'
		);

		create type wms.return_item_condition_enum as enum(
			'sellable',
			'damaged',
			'defective',
			'expired',
			'unsellable'
		);

		-- IMS Suppliers
		create table wms.suppliers(
			id uuid primary key default gen_random_uuid(),
			name varchar(255) not null,
			contact_person varchar(255),
			email varchar(255),
			phone_number varchar(20),
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.suppliers is 'Stores information about the suppliers who provide the products.';

		comment on column wms.suppliers.id is 'Primary key';

		comment on column wms.suppliers.name is 'The name of the supplier company.';

		comment on column wms.suppliers.contact_person is 'The primary contact at the supplier.';

		comment on column wms.suppliers.email is 'The supplier''s contact email.';

		comment on column wms.suppliers.phone_number is 'The supplier''s contact phone number.';

		comment on column wms.suppliers.created_at is 'Timestamp when the supplier was created.';

		comment on column wms.suppliers.updated_at is 'Timestamp when the supplier was last updated.';

		-- IMS Products
		create table wms.products(
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
			status wms.product_status_enum default 'active',
			supplier_id uuid references wms.suppliers(id),
			client_id uuid references crm.companies(id),
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.products is 'Represents the master record for each unique product (SKU) managed in the inventory.';

		comment on column wms.products.id is 'Primary key';

		comment on column wms.products.name is 'The common name of the product.';

		comment on column wms.products.sku is 'The unique Stock Keeping Unit identifier.';

		comment on column wms.products.barcode is 'The product''s barcode (e.g., UPC, EAN) for scanning.';

		comment on column wms.products.description is 'Detailed information about the product.';

		comment on column wms.products.cost_price is 'The purchase price or cost of the product.';

		comment on column wms.products.length is 'Physical length dimension.';

		comment on column wms.products.width is 'Physical width dimension.';

		comment on column wms.products.height is 'Physical height dimension.';

		comment on column wms.products.volume is 'Product volume (automatically calculated from length * width * height).';

		comment on column wms.products.weight is 'Physical weight.';

		comment on column wms.products.status is 'The product''s lifecycle status using product_status_enum.';

		comment on column wms.products.supplier_id is 'A reference to the product''s supplier.';

		comment on column wms.products.client_id is 'A reference to the client company (from CRM) that owns this inventory.';

		comment on column wms.products.created_at is 'Timestamp when the product was created.';

		comment on column wms.products.updated_at is 'Timestamp when the product was last updated.';

		-- IMS Inventory Batches
		create table wms.inventory_batches(
			id uuid primary key default gen_random_uuid(),
			product_id uuid not null references wms.products(id),
			batch_number varchar(100) not null,
			expiration_date date,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.inventory_batches is 'Stores information for products that are tracked by batch or lot, essential for quality control and recalls.';

		comment on column wms.inventory_batches.id is 'Primary key';

		comment on column wms.inventory_batches.product_id is 'The product associated with this batch.';

		comment on column wms.inventory_batches.batch_number is 'The unique identifier for the batch/lot.';

		comment on column wms.inventory_batches.expiration_date is 'The expiration date of the products in this batch.';

		comment on column wms.inventory_batches.created_at is 'Timestamp when the batch was created.';

		comment on column wms.inventory_batches.updated_at is 'Timestamp when the batch was last updated.';

		-- IMS Inventory Adjustments
		create table wms.inventory_adjustments(
			id uuid primary key default gen_random_uuid(),
			product_id uuid not null references wms.products(id),
			warehouse_id uuid not null,
			user_id text not null references "user"(id),
			quantity_change integer not null,
			reason wms.inventory_adjustment_reason_enum,
			notes text,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.inventory_adjustments is 'Logs any manual changes made to inventory levels to maintain accuracy.';

		comment on column wms.inventory_adjustments.id is 'Primary key';

		comment on column wms.inventory_adjustments.product_id is 'The product being adjusted.';

		comment on column wms.inventory_adjustments.warehouse_id is 'The warehouse where the adjustment occurred.';

		comment on column wms.inventory_adjustments.user_id is 'The user who performed the adjustment.';

		comment on column wms.inventory_adjustments.quantity_change is 'The amount by which the quantity was changed (can be positive or negative).';

		comment on column wms.inventory_adjustments.reason is 'The reason for the adjustment using inventory_adjustment_reason_enum.';

		comment on column wms.inventory_adjustments.notes is 'Additional details about the adjustment.';

		comment on column wms.inventory_adjustments.created_at is 'Timestamp when the adjustment was created.';

		comment on column wms.inventory_adjustments.updated_at is 'Timestamp when the adjustment was last updated.';

		-- IMS Reorder Points
		create table wms.reorder_points(
			id uuid primary key default gen_random_uuid(),
			product_id uuid not null references wms.products(id),
			warehouse_id uuid not null,
			threshold integer not null,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.reorder_points is 'Defines the minimum stock level for a product that triggers a low stock alert.';

		comment on column wms.reorder_points.id is 'Primary key';

		comment on column wms.reorder_points.product_id is 'The product to monitor.';

		comment on column wms.reorder_points.warehouse_id is 'The specific warehouse to monitor the stock level in.';

		comment on column wms.reorder_points.threshold is 'The minimum quantity that triggers the alert.';

		comment on column wms.reorder_points.created_at is 'Timestamp when the reorder point was created.';

		comment on column wms.reorder_points.updated_at is 'Timestamp when the reorder point was last updated.';

		-- IMS Inbound Shipments
		create table wms.inbound_shipments(
			id uuid primary key default gen_random_uuid(),
			client_id uuid references crm.companies(id),
			warehouse_id uuid not null,
			status wms.inbound_shipment_status_enum default 'pending',
			expected_arrival_date date,
			actual_arrival_date date,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.inbound_shipments is 'Represents an expected inbound shipment from a client or supplier (also known as an Advance Shipping Notice or ASN).';

		comment on column wms.inbound_shipments.id is 'Primary key';

		comment on column wms.inbound_shipments.client_id is 'The client company sending the inventory.';

		comment on column wms.inbound_shipments.warehouse_id is 'The destination warehouse.';

		comment on column wms.inbound_shipments.status is 'The current status of the shipment using inbound_shipment_status_enum.';

		comment on column wms.inbound_shipments.expected_arrival_date is 'The planned arrival date.';

		comment on column wms.inbound_shipments.actual_arrival_date is 'The date the shipment actually arrived.';

		comment on column wms.inbound_shipments.created_at is 'Timestamp when the inbound shipment was created.';

		comment on column wms.inbound_shipments.updated_at is 'Timestamp when the inbound shipment was last updated.';

		-- IMS Inbound Shipment Items
		create table wms.inbound_shipment_items(
			id uuid primary key default gen_random_uuid(),
			inbound_shipment_id uuid not null references wms.inbound_shipments(id),
			product_id uuid not null references wms.products(id),
			expected_quantity integer not null,
			received_quantity integer,
			discrepancy_quantity integer generated always as (coalesce(received_quantity, 0) - expected_quantity) stored,
			discrepancy_notes text,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.inbound_shipment_items is 'Details the specific products and quantities expected in an inbound shipment.';

		comment on column wms.inbound_shipment_items.id is 'Primary key';

		comment on column wms.inbound_shipment_items.inbound_shipment_id is 'A reference to the parent inbound shipment.';

		comment on column wms.inbound_shipment_items.product_id is 'The product included in the shipment.';

		comment on column wms.inbound_shipment_items.expected_quantity is 'The quantity declared on the ASN.';

		comment on column wms.inbound_shipment_items.received_quantity is 'The actual quantity counted upon receipt.';

		comment on column wms.inbound_shipment_items.discrepancy_quantity is 'The difference between received and expected quantities (automatically calculated).';

		comment on column wms.inbound_shipment_items.discrepancy_notes is 'Notes detailing any differences between expected and received quantities.';

		comment on column wms.inbound_shipment_items.created_at is 'Timestamp when the inbound shipment item was created.';

		comment on column wms.inbound_shipment_items.updated_at is 'Timestamp when the inbound shipment item was last updated.';

		-- IMS Stock Transfers
		create table wms.stock_transfers(
			id uuid primary key default gen_random_uuid(),
			product_id uuid not null references wms.products(id),
			source_warehouse_id uuid not null,
			destination_warehouse_id uuid not null,
			quantity integer not null,
			status wms.stock_transfer_status_enum default 'pending',
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.stock_transfers is 'Tracks the movement of inventory from one warehouse to another.';

		comment on column wms.stock_transfers.id is 'Primary key';

		comment on column wms.stock_transfers.product_id is 'The product being transferred.';

		comment on column wms.stock_transfers.source_warehouse_id is 'The warehouse the stock is moving from.';

		comment on column wms.stock_transfers.destination_warehouse_id is 'The warehouse the stock is moving to.';

		comment on column wms.stock_transfers.quantity is 'The amount of stock being transferred.';

		comment on column wms.stock_transfers.status is 'The status of the transfer using stock_transfer_status_enum.';

		comment on column wms.stock_transfers.created_at is 'Timestamp when the stock transfer was created.';

		comment on column wms.stock_transfers.updated_at is 'Timestamp when the stock transfer was last updated.';

		-- IMS Sales Orders
		create table wms.sales_orders(
			id uuid primary key default gen_random_uuid(),
			order_number varchar(100) not null unique,
			client_id uuid not null references crm.companies(id),
			crm_opportunity_id uuid references crm.opportunities(id),
			status wms.sales_order_status_enum default 'pending',
			shipping_address text,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.sales_orders is 'Represents a customer''s order, often originating from the CRM, which needs to be fulfilled from inventory.';

		comment on column wms.sales_orders.id is 'Primary key';

		comment on column wms.sales_orders.order_number is 'A unique identifier for the sales order.';

		comment on column wms.sales_orders.client_id is 'The client company that placed the order.';

		comment on column wms.sales_orders.crm_opportunity_id is 'A link back to the original opportunity in the CRM.';

		comment on column wms.sales_orders.status is 'The fulfillment status of the order using sales_order_status_enum.';

		comment on column wms.sales_orders.shipping_address is 'The address where the order should be shipped.';

		comment on column wms.sales_orders.created_at is 'Timestamp when the sales order was created.';

		comment on column wms.sales_orders.updated_at is 'Timestamp when the sales order was last updated.';

		-- IMS Sales Order Items
		create table wms.sales_order_items(
			id uuid primary key default gen_random_uuid(),
			sales_order_id uuid not null references wms.sales_orders(id),
			product_id uuid not null references wms.products(id),
			quantity_ordered integer not null,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.sales_order_items is 'Details the specific products and quantities required for a sales order.';

		comment on column wms.sales_order_items.id is 'Primary key';

		comment on column wms.sales_order_items.sales_order_id is 'A reference to the parent sales order.';

		comment on column wms.sales_order_items.product_id is 'The product being ordered.';

		comment on column wms.sales_order_items.quantity_ordered is 'The quantity of the product requested by the customer.';

		comment on column wms.sales_order_items.created_at is 'Timestamp when the sales order item was created.';

		comment on column wms.sales_order_items.updated_at is 'Timestamp when the sales order item was last updated.';

		-- IMS Outbound Shipments
		create table wms.outbound_shipments(
			id uuid primary key default gen_random_uuid(),
			sales_order_id uuid not null references wms.sales_orders(id),
			warehouse_id uuid not null,
			status wms.outbound_shipment_status_enum default 'picking',
			tracking_number varchar(100),
			carrier varchar(100),
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		-- tms relationships - add foreign key constraints to existing columns
		alter table tms.trip_stops
			add constraint fk_trip_stops_shipment foreign key (shipment_id) references wms.outbound_shipments(id);

		comment on column tms.trip_stops.shipment_id is 'Reference to the shipment being handled at this stop.';

		alter table tms.shipment_legs
			add constraint fk_shipment_legs_shipment foreign key (shipment_id) references wms.outbound_shipments(id);

		comment on column tms.shipment_legs.shipment_id is 'Reference to the overall shipment.';

		--
		comment on table wms.outbound_shipments is 'Represents the physical shipment created to fulfill a sales order.';

		comment on column wms.outbound_shipments.id is 'Primary key';

		comment on column wms.outbound_shipments.sales_order_id is 'The sales order being fulfilled.';

		comment on column wms.outbound_shipments.warehouse_id is 'The warehouse the shipment is being sent from.';

		comment on column wms.outbound_shipments.status is 'The status of the outbound shipment using outbound_shipment_status_enum.';

		comment on column wms.outbound_shipments.tracking_number is 'The carrier tracking number for the shipment.';

		comment on column wms.outbound_shipments.carrier is 'The shipping carrier (e.g., FedEx, UPS).';

		comment on column wms.outbound_shipments.created_at is 'Timestamp when the outbound shipment was created.';

		comment on column wms.outbound_shipments.updated_at is 'Timestamp when the outbound shipment was last updated.';

		-- IMS Outbound Shipment Items
		create table wms.outbound_shipment_items(
			id uuid primary key default gen_random_uuid(),
			outbound_shipment_id uuid not null references wms.outbound_shipments(id),
			sales_order_item_id uuid not null references wms.sales_order_items(id),
			product_id uuid not null references wms.products(id),
			batch_id uuid references wms.inventory_batches(id),
			quantity_shipped integer not null,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.outbound_shipment_items is 'Details the specific items, quantities, and batches included in an outbound shipment.';

		comment on column wms.outbound_shipment_items.id is 'Primary key';

		comment on column wms.outbound_shipment_items.outbound_shipment_id is 'A reference to the parent outbound shipment.';

		comment on column wms.outbound_shipment_items.sales_order_item_id is 'A link to the specific line item on the sales order.';

		comment on column wms.outbound_shipment_items.product_id is 'The product being shipped.';

		comment on column wms.outbound_shipment_items.batch_id is 'The specific batch the item was picked from (if applicable).';

		comment on column wms.outbound_shipment_items.quantity_shipped is 'The quantity of the product included in this shipment.';

		comment on column wms.outbound_shipment_items.created_at is 'Timestamp when the outbound shipment item was created.';

		comment on column wms.outbound_shipment_items.updated_at is 'Timestamp when the outbound shipment item was last updated.';

		-- IMS Returns
		create table wms.returns(
			id uuid primary key default gen_random_uuid(),
			return_number varchar(100) not null unique,
			sales_order_id uuid references wms.sales_orders(id),
			client_id uuid not null references crm.companies(id),
			status wms.return_status_enum default 'requested',
			reason text,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.returns is 'Represents a return request from a client (Reverse Logistics).';

		comment on column wms.returns.id is 'Primary key';

		comment on column wms.returns.return_number is 'A unique identifier for the return.';

		comment on column wms.returns.sales_order_id is 'A reference to the original sales order being returned.';

		comment on column wms.returns.client_id is 'The client initiating the return.';

		comment on column wms.returns.status is 'The status of the return using return_status_enum.';

		comment on column wms.returns.reason is 'The reason for the return.';

		comment on column wms.returns.created_at is 'Timestamp when the return was created.';

		comment on column wms.returns.updated_at is 'Timestamp when the return was last updated.';

		-- IMS Return Items
		create table wms.return_items(
			id uuid primary key default gen_random_uuid(),
			return_id uuid not null references wms.returns(id),
			product_id uuid not null references wms.products(id),
			quantity_expected integer not null,
			quantity_received integer,
			quantity_variance integer generated always as (coalesce(quantity_received, 0) - quantity_expected) stored,
			condition wms.return_item_condition_enum,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.return_items is 'Details the specific products and quantities being returned.';

		comment on column wms.return_items.id is 'Primary key';

		comment on column wms.return_items.return_id is 'A reference to the parent return record.';

		comment on column wms.return_items.product_id is 'The product being returned.';

		comment on column wms.return_items.quantity_expected is 'The quantity the client stated they would return.';

		comment on column wms.return_items.quantity_received is 'The actual quantity received at the warehouse.';

		comment on column wms.return_items.quantity_variance is 'The difference between received and expected return quantities (automatically calculated).';

		comment on column wms.return_items.condition is 'The condition of the returned item using return_item_condition_enum.';

		comment on column wms.return_items.created_at is 'Timestamp when the return item was created.';

		comment on column wms.return_items.updated_at is 'Timestamp when the return item was last updated.';

		-- Create indexes for performance
		create index idx_ims_suppliers_name on wms.suppliers(name);

		create index idx_ims_suppliers_email on wms.suppliers(email);

		create index idx_ims_products_sku on wms.products(sku);

		create index idx_ims_products_barcode on wms.products(barcode);

		create index idx_ims_products_name on wms.products(name);

		create index idx_ims_products_status on wms.products(status);

		create index idx_ims_products_supplier_id on wms.products(supplier_id);

		create index idx_ims_products_client_id on wms.products(client_id);

		create index idx_ims_inventory_batches_product_id on wms.inventory_batches(product_id);

		create index idx_ims_inventory_batches_batch_number on wms.inventory_batches(batch_number);

		create index idx_ims_inventory_batches_expiration_date on wms.inventory_batches(expiration_date);

		create index idx_ims_inventory_adjustments_product_id on wms.inventory_adjustments(product_id);

		create index idx_ims_inventory_adjustments_warehouse_id on wms.inventory_adjustments(warehouse_id);

		create index idx_ims_inventory_adjustments_user_id on wms.inventory_adjustments(user_id);

		create index idx_ims_inventory_adjustments_reason on wms.inventory_adjustments(reason);

		create index idx_ims_reorder_points_product_id on wms.reorder_points(product_id);

		create index idx_ims_reorder_points_warehouse_id on wms.reorder_points(warehouse_id);

		create index idx_ims_inbound_shipments_client_id on wms.inbound_shipments(client_id);

		create index idx_ims_inbound_shipments_warehouse_id on wms.inbound_shipments(warehouse_id);

		create index idx_ims_inbound_shipments_status on wms.inbound_shipments(status);

		create index idx_ims_inbound_shipments_expected_arrival_date on wms.inbound_shipments(expected_arrival_date);

		create index idx_ims_inbound_shipments_actual_arrival_date on wms.inbound_shipments(actual_arrival_date);

		create index idx_ims_inbound_shipment_items_inbound_shipment_id on wms.inbound_shipment_items(inbound_shipment_id);

		create index idx_ims_inbound_shipment_items_product_id on wms.inbound_shipment_items(product_id);

		create index idx_ims_stock_transfers_product_id on wms.stock_transfers(product_id);

		create index idx_ims_stock_transfers_source_warehouse_id on wms.stock_transfers(source_warehouse_id);

		create index idx_ims_stock_transfers_destination_warehouse_id on wms.stock_transfers(destination_warehouse_id);

		create index idx_ims_stock_transfers_status on wms.stock_transfers(status);

		create index idx_ims_sales_orders_order_number on wms.sales_orders(order_number);

		create index idx_ims_sales_orders_client_id on wms.sales_orders(client_id);

		create index idx_ims_sales_orders_crm_opportunity_id on wms.sales_orders(crm_opportunity_id);

		create index idx_ims_sales_orders_status on wms.sales_orders(status);

		create index idx_ims_sales_order_items_sales_order_id on wms.sales_order_items(sales_order_id);

		create index idx_ims_sales_order_items_product_id on wms.sales_order_items(product_id);

		create index idx_ims_outbound_shipments_sales_order_id on wms.outbound_shipments(sales_order_id);

		create index idx_ims_outbound_shipments_warehouse_id on wms.outbound_shipments(warehouse_id);

		create index idx_ims_outbound_shipments_status on wms.outbound_shipments(status);

		create index idx_ims_outbound_shipments_tracking_number on wms.outbound_shipments(tracking_number);

		create index idx_ims_outbound_shipments_carrier on wms.outbound_shipments(carrier);

		create index idx_ims_outbound_shipment_items_outbound_shipment_id on wms.outbound_shipment_items(outbound_shipment_id);

		create index idx_ims_outbound_shipment_items_sales_order_item_id on wms.outbound_shipment_items(sales_order_item_id);

		create index idx_ims_outbound_shipment_items_product_id on wms.outbound_shipment_items(product_id);

		create index idx_ims_outbound_shipment_items_batch_id on wms.outbound_shipment_items(batch_id);

		create index idx_ims_returns_return_number on wms.returns(return_number);

		create index idx_ims_returns_sales_order_id on wms.returns(sales_order_id);

		create index idx_ims_returns_client_id on wms.returns(client_id);

		create index idx_ims_returns_status on wms.returns(status);

		create index idx_ims_return_items_return_id on wms.return_items(return_id);

		create index idx_ims_return_items_product_id on wms.return_items(product_id);

		create index idx_ims_return_items_condition on wms.return_items(condition);
	
		create type wms.location_type_enum as enum(
			'receiving_dock',
			'pick_bin',
			'packing_station',
			'cross_dock_area',
			'bulk_storage',
			'reserve_storage',
			'damaged_goods',
			'staging_area',
			'quality_control',
			'returns_area'
		);

		create type wms.inventory_stock_status_enum as enum(
			'available',
			'allocated',
			'damaged',
			'quarantine',
			'hold',
			'shipped',
			'expired'
		);

		create type wms.pick_batch_status_enum as enum(
			'open',
			'in_progress',
			'completed',
			'cancelled'
		);

		create type wms.pick_strategy_enum as enum(
			'batch_picking',
			'zone_picking',
			'wave_picking',
			'single_order_picking',
			'cluster_picking'
		);

		create type wms.task_type_enum as enum(
			'putaway',
			'pick',
			'pack',
			'replenishment',
			'cycle_count',
			'cross_dock',
			'returns_processing',
			'damage_inspection',
			'quality_check'
		);

		create type wms.task_status_enum as enum(
			'pending',
			'assigned',
			'in_progress',
			'completed',
			'cancelled',
			'error'
		);

		create type wms.task_item_status_enum as enum(
			'pending',
			'in_progress',
			'completed',
			'short_picked',
			'damaged',
			'not_found'
		);

		-- WMS Warehouses
		create table wms.warehouses(
			id uuid primary key default gen_random_uuid(),
			name varchar(255) not null,
			address text,
			city varchar(100),
			state varchar(50),
			postal_code varchar(20),
			country varchar(50),
			timezone varchar(50),
			contact_person varchar(255),
			contact_email varchar(255),
			contact_phone varchar(20),
			is_active boolean default true,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.warehouses is 'Represents the physical warehouse facilities where inventory and locations are organized and managed by the WMS.';

		comment on column wms.warehouses.id is 'Primary key';

		comment on column wms.warehouses.name is 'The name of the warehouse (e.g., "West Coast Distribution Center").';

		comment on column wms.warehouses.address is 'The physical street address of the warehouse.';

		comment on column wms.warehouses.city is 'The city where the warehouse is located.';

		comment on column wms.warehouses.state is 'The state or province where the warehouse is located.';

		comment on column wms.warehouses.postal_code is 'The postal code or ZIP code of the warehouse.';

		comment on column wms.warehouses.country is 'The country where the warehouse is located.';

		comment on column wms.warehouses.timezone is 'The timezone of the warehouse for scheduling operations.';

		comment on column wms.warehouses.contact_person is 'The primary contact person at the warehouse.';

		comment on column wms.warehouses.contact_email is 'The contact email for the warehouse.';

		comment on column wms.warehouses.contact_phone is 'The contact phone number for the warehouse.';

		comment on column wms.warehouses.is_active is 'Whether the warehouse is currently active and operational.';

		comment on column wms.warehouses.created_at is 'Timestamp when the warehouse was created.';

		comment on column wms.warehouses.updated_at is 'Timestamp when the warehouse was last updated.';

		-- WMS Locations (Hierarchical structure for warehouse locations)
		create table wms.locations(
			id uuid primary key default gen_random_uuid(),
			warehouse_id uuid not null references wms.warehouses(id),
			parent_location_id uuid references wms.locations(id),
			name varchar(100) not null,
			barcode varchar(100),
			type wms.location_type_enum not null,
			level integer default 0,
			path text,
			max_weight real,
			max_volume real,
			max_pallets integer,
			x_coordinate real,
			y_coordinate real,
			z_coordinate real,
			is_pickable boolean default true,
			is_receivable boolean default true,
			temperature_controlled boolean default false,
			hazmat_approved boolean default false,
			is_active boolean default true,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.locations is 'Represents physical storage locations within the warehouse, organized in a hierarchical structure.';

		comment on column wms.locations.id is 'Primary key';

		comment on column wms.locations.warehouse_id is 'Reference to the warehouse facility.';

		comment on column wms.locations.parent_location_id is 'Reference to parent location for hierarchical organization (e.g., zone > aisle > shelf > bin).';

		comment on column wms.locations.name is 'Human-readable location identifier (e.g., A-01-B-101).';

		comment on column wms.locations.barcode is 'Machine-readable location identifier for scanning operations.';

		comment on column wms.locations.type is 'Classification of location purpose using location_type_enum.';

		comment on column wms.locations.level is 'The hierarchy level (0=zone, 1=aisle, 2=shelf, 3=bin, etc.).';

		comment on column wms.locations.path is 'Full hierarchical path for quick lookups (e.g., "Zone A/Aisle 01/Shelf B/Bin 101").';

		comment on column wms.locations.max_weight is 'Maximum weight capacity for the location.';

		comment on column wms.locations.max_volume is 'Maximum volume capacity for the location.';

		comment on column wms.locations.max_pallets is 'Maximum number of pallets the location can hold.';

		comment on column wms.locations.x_coordinate is 'X coordinate for warehouse mapping and optimization.';

		comment on column wms.locations.y_coordinate is 'Y coordinate for warehouse mapping and optimization.';

		comment on column wms.locations.z_coordinate is 'Z coordinate for warehouse mapping and optimization.';

		comment on column wms.locations.is_pickable is 'Whether items can be picked from this location.';

		comment on column wms.locations.is_receivable is 'Whether items can be received into this location.';

		comment on column wms.locations.temperature_controlled is 'Whether this location has temperature control.';

		comment on column wms.locations.hazmat_approved is 'Whether this location is approved for hazardous materials.';

		comment on column wms.locations.is_active is 'Whether the location is currently active and available for use.';

		comment on column wms.locations.created_at is 'Timestamp when the location was created.';

		comment on column wms.locations.updated_at is 'Timestamp when the location was last updated.';

		-- WMS Inventory Stock (Physical inventory at location level)
		create table wms.inventory_stock(
			id uuid primary key default gen_random_uuid(),
			location_id uuid not null references wms.locations(id),
			product_id uuid not null references wms.products(id),
			batch_id uuid references wms.inventory_batches(id),
			quantity integer not null default 0,
			reserved_quantity integer not null default 0,
			available_quantity integer generated always as (quantity - reserved_quantity) stored,
			status wms.inventory_stock_status_enum default 'available',
			last_counted_at timestamp,
			last_movement_at timestamp default now(),
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_quantity_positive check (quantity >= 0),
			constraint check_reserved_quantity_positive check (reserved_quantity >= 0),
			constraint check_reserved_not_exceeding check (reserved_quantity <= quantity)
		);

		comment on table wms.inventory_stock is 'Tracks actual physical inventory quantities at specific warehouse locations.';

		comment on column wms.inventory_stock.id is 'Primary key';

		comment on column wms.inventory_stock.location_id is 'Reference to the physical location where stock is stored.';

		comment on column wms.inventory_stock.product_id is 'Reference to the product being stored (from IMS).';

		comment on column wms.inventory_stock.batch_id is 'Reference to the inventory batch (if applicable for lot tracking).';

		comment on column wms.inventory_stock.quantity is 'Current total quantity of product at this location.';

		comment on column wms.inventory_stock.reserved_quantity is 'Quantity reserved for pending orders or tasks.';

		comment on column wms.inventory_stock.available_quantity is 'Available quantity (quantity - reserved_quantity, automatically calculated).';

		comment on column wms.inventory_stock.status is 'Current state of the inventory using inventory_stock_status_enum.';

		comment on column wms.inventory_stock.last_counted_at is 'When this inventory was last physically counted.';

		comment on column wms.inventory_stock.last_movement_at is 'When inventory was last moved in/out of this location.';

		comment on column wms.inventory_stock.created_at is 'Timestamp when the inventory record was created.';

		comment on column wms.inventory_stock.updated_at is 'Timestamp when the inventory record was last updated.';

		-- WMS Putaway Rules
		create table wms.putaway_rules(
			id uuid primary key default gen_random_uuid(),
			product_id uuid not null references wms.products(id),
			client_id uuid references crm.companies(id),
			warehouse_id uuid not null references wms.warehouses(id),
			preferred_location_id uuid references wms.locations(id),
			location_type wms.location_type_enum,
			priority integer not null default 100,
			min_quantity integer,
			max_quantity integer,
			weight_threshold real,
			volume_threshold real,
			requires_temperature_control boolean default false,
			requires_hazmat_approval boolean default false,
			is_active boolean default true,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.putaway_rules is 'Defines automated rules for determining where incoming inventory should be stored.';

		comment on column wms.putaway_rules.id is 'Primary key';

		comment on column wms.putaway_rules.product_id is 'Reference to the product the rule applies to (from IMS).';

		comment on column wms.putaway_rules.client_id is 'Reference to the client (for multi-tenant warehouses).';

		comment on column wms.putaway_rules.warehouse_id is 'Reference to the warehouse this rule applies to.';

		comment on column wms.putaway_rules.preferred_location_id is 'Reference to the preferred storage location.';

		comment on column wms.putaway_rules.location_type is 'Preferred location type for this product.';

		comment on column wms.putaway_rules.priority is 'Rule precedence when multiple rules could apply (lower = higher priority).';

		comment on column wms.putaway_rules.min_quantity is 'Minimum quantity threshold for this rule to apply.';

		comment on column wms.putaway_rules.max_quantity is 'Maximum quantity threshold for this rule to apply.';

		comment on column wms.putaway_rules.weight_threshold is 'Weight threshold for this rule to apply.';

		comment on column wms.putaway_rules.volume_threshold is 'Volume threshold for this rule to apply.';

		comment on column wms.putaway_rules.requires_temperature_control is 'Whether this rule requires temperature controlled locations.';

		comment on column wms.putaway_rules.requires_hazmat_approval is 'Whether this rule requires hazmat approved locations.';

		comment on column wms.putaway_rules.is_active is 'Whether this rule is currently active.';

		comment on column wms.putaway_rules.created_at is 'Timestamp when the rule was created.';

		comment on column wms.putaway_rules.updated_at is 'Timestamp when the rule was last updated.';

		-- WMS Bin Thresholds
		create table wms.bin_thresholds(
			id uuid primary key default gen_random_uuid(),
			location_id uuid not null references wms.locations(id),
			product_id uuid not null references wms.products(id),
			min_quantity integer not null default 0,
			max_quantity integer not null,
			reorder_quantity integer,
			alert_threshold integer,
			is_active boolean default true,
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_min_max_quantities check (min_quantity <= max_quantity),
			constraint check_quantities_positive check (min_quantity >= 0 and max_quantity > 0)
		);

		comment on table wms.bin_thresholds is 'Defines minimum and maximum stock levels for specific products at specific locations to trigger replenishment.';

		comment on column wms.bin_thresholds.id is 'Primary key';

		comment on column wms.bin_thresholds.location_id is 'Reference to the storage location.';

		comment on column wms.bin_thresholds.product_id is 'Reference to the product being monitored (from IMS).';

		comment on column wms.bin_thresholds.min_quantity is 'Minimum stock level that triggers replenishment.';

		comment on column wms.bin_thresholds.max_quantity is 'Maximum stock level for the location.';

		comment on column wms.bin_thresholds.reorder_quantity is 'Suggested quantity to reorder when minimum is reached.';

		comment on column wms.bin_thresholds.alert_threshold is 'Quantity that triggers low stock alerts.';

		comment on column wms.bin_thresholds.is_active is 'Whether this threshold monitoring is active.';

		comment on column wms.bin_thresholds.created_at is 'Timestamp when the threshold was created.';

		comment on column wms.bin_thresholds.updated_at is 'Timestamp when the threshold was last updated.';

		-- WMS Pick Batches
		create table wms.pick_batches(
			id uuid primary key default gen_random_uuid(),
			batch_number varchar(100) not null unique,
			warehouse_id uuid not null references wms.warehouses(id),
			status wms.pick_batch_status_enum default 'open',
			strategy wms.pick_strategy_enum not null,
			priority integer default 100,
			assigned_user_id text references "user"(id),
			wave_id varchar(100),
			zone_restrictions text[],
			estimated_duration integer,
			actual_duration integer,
			total_items integer default 0,
			completed_items integer default 0,
			started_at timestamp,
			completed_at timestamp,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.pick_batches is 'Groups multiple sales orders together for efficient batch picking operations.';

		comment on column wms.pick_batches.id is 'Primary key';

		comment on column wms.pick_batches.batch_number is 'Unique identifier for the pick batch.';

		comment on column wms.pick_batches.warehouse_id is 'Reference to the warehouse where picking occurs.';

		comment on column wms.pick_batches.status is 'Current batch status using pick_batch_status_enum.';

		comment on column wms.pick_batches.strategy is 'Picking strategy employed using pick_strategy_enum.';

		comment on column wms.pick_batches.priority is 'Batch priority for execution order (lower = higher priority).';

		comment on column wms.pick_batches.assigned_user_id is 'Reference to the user assigned to this pick batch.';

		comment on column wms.pick_batches.wave_id is 'Wave identifier for grouping batches.';

		comment on column wms.pick_batches.zone_restrictions is 'Array of zone restrictions for this batch.';

		comment on column wms.pick_batches.estimated_duration is 'Estimated time to complete the batch (in minutes).';

		comment on column wms.pick_batches.actual_duration is 'Actual time taken to complete the batch (in minutes).';

		comment on column wms.pick_batches.total_items is 'Total number of items in the batch.';

		comment on column wms.pick_batches.completed_items is 'Number of completed items in the batch.';

		comment on column wms.pick_batches.started_at is 'When the batch picking was started.';

		comment on column wms.pick_batches.completed_at is 'When the batch picking was completed.';

		comment on column wms.pick_batches.created_at is 'Timestamp when the batch was created.';

		comment on column wms.pick_batches.updated_at is 'Timestamp when the batch was last updated.';

		-- WMS Pick Batch Items
		create table wms.pick_batch_items(
			id uuid not null primary key default gen_random_uuid(),
			pick_batch_id uuid not null references wms.pick_batches(id),
			sales_order_id uuid not null references wms.sales_orders(id),
			order_priority integer default 100,
			estimated_pick_time integer,
			actual_pick_time integer,
			created_at timestamp default now(),
			updated_at timestamp default now(),
			unique (pick_batch_id, sales_order_id)
		);

		comment on table wms.pick_batch_items is 'Associates individual sales orders with pick batches for grouped picking.';

		comment on column wms.pick_batch_items.id is 'Primary key';

		comment on column wms.pick_batch_items.pick_batch_id is 'Reference to the pick batch.';

		comment on column wms.pick_batch_items.sales_order_id is 'Reference to the sales order included in the batch (from IMS).';

		comment on column wms.pick_batch_items.order_priority is 'Priority of this order within the batch.';

		comment on column wms.pick_batch_items.estimated_pick_time is 'Estimated time to pick this order (in minutes).';

		comment on column wms.pick_batch_items.actual_pick_time is 'Actual time taken to pick this order (in minutes).';

		comment on column wms.pick_batch_items.created_at is 'Timestamp when the batch item was created.';

		comment on column wms.pick_batch_items.updated_at is 'Timestamp when the batch item was last updated.';

		-- WMS Tasks
		create table wms.tasks(
			id uuid primary key default gen_random_uuid(),
			task_number varchar(100) not null unique,
			warehouse_id uuid not null references wms.warehouses(id),
			user_id text references "user"(id),
			type wms.task_type_enum not null,
			status wms.task_status_enum default 'pending',
			priority integer default 100,
			source_entity_id uuid,
			source_entity_type varchar(50),
			pick_batch_id uuid references wms.pick_batches(id),
			estimated_duration integer,
			actual_duration integer,
			instructions text,
			notes text,
			start_time timestamp,
			end_time timestamp,
			duration_seconds integer generated always as (extract(epoch from (end_time - start_time))::integer) stored,
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.tasks is 'Represents individual work assignments for warehouse personnel.';

		comment on column wms.tasks.id is 'Primary key';

		comment on column wms.tasks.task_number is 'Unique identifier for the task.';

		comment on column wms.tasks.warehouse_id is 'Reference to the warehouse where the task is performed.';

		comment on column wms.tasks.user_id is 'Reference to the assigned warehouse worker.';

		comment on column wms.tasks.type is 'Category of warehouse task using task_type_enum.';

		comment on column wms.tasks.status is 'Current task status using task_status_enum.';

		comment on column wms.tasks.priority is 'Task priority for execution order (lower = higher priority).';

		comment on column wms.tasks.source_entity_id is 'Reference to the entity that triggered the task (e.g., inbound_shipment_id, pick_batch_id).';

		comment on column wms.tasks.source_entity_type is 'Type of the source entity (e.g., "inbound_shipment", "pick_batch", "return").';

		comment on column wms.tasks.pick_batch_id is 'Reference to associated pick batch if applicable.';

		comment on column wms.tasks.estimated_duration is 'Estimated time to complete the task (in minutes).';

		comment on column wms.tasks.actual_duration is 'Actual time taken to complete the task (in minutes).';

		comment on column wms.tasks.instructions is 'Detailed instructions for completing the task.';

		comment on column wms.tasks.notes is 'Additional notes or comments about the task.';

		comment on column wms.tasks.start_time is 'When the task was started.';

		comment on column wms.tasks.end_time is 'When the task was completed.';

		comment on column wms.tasks.duration_seconds is 'Total time taken to complete the task in seconds (automatically calculated from start_time and end_time).';

		comment on column wms.tasks.created_at is 'Timestamp when the task was created.';

		comment on column wms.tasks.updated_at is 'Timestamp when the task was last updated.';

		-- WMS Task Items
		create table wms.task_items(
			id uuid primary key default gen_random_uuid(),
			task_id uuid not null references wms.tasks(id),
			product_id uuid not null references wms.products(id),
			batch_id uuid references wms.inventory_batches(id),
			source_location_id uuid references wms.locations(id),
			destination_location_id uuid references wms.locations(id),
			quantity_required integer not null,
			quantity_completed integer not null default 0,
			quantity_remaining integer generated always as (quantity_required - quantity_completed) stored,
			status wms.task_item_status_enum default 'pending',
			lot_number varchar(100),
			serial_numbers text[],
			expiry_date date,
			notes text,
			completed_at timestamp,
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_quantities_positive check (quantity_required > 0 and quantity_completed >= 0),
			constraint check_completed_not_exceeding check (quantity_completed <= quantity_required)
		);

		comment on table wms.task_items is 'Individual line items within a warehouse task, specifying exactly what needs to be moved or processed.';

		comment on column wms.task_items.id is 'Primary key';

		comment on column wms.task_items.task_id is 'Reference to the parent task.';

		comment on column wms.task_items.product_id is 'Reference to the product being handled (from IMS).';

		comment on column wms.task_items.batch_id is 'Reference to the specific batch being handled (from IMS).';

		comment on column wms.task_items.source_location_id is 'Reference to where the product should be picked from.';

		comment on column wms.task_items.destination_location_id is 'Reference to where the product should be moved to.';

		comment on column wms.task_items.quantity_required is 'Amount of product that needs to be handled.';

		comment on column wms.task_items.quantity_completed is 'Amount of product actually handled.';

		comment on column wms.task_items.quantity_remaining is 'Remaining quantity to be handled (automatically calculated from quantity_required - quantity_completed).';

		comment on column wms.task_items.status is 'Completion status of this specific item using task_item_status_enum.';

		comment on column wms.task_items.lot_number is 'Lot number for traceability.';

		comment on column wms.task_items.serial_numbers is 'Array of serial numbers for serialized items.';

		comment on column wms.task_items.expiry_date is 'Expiry date of the items being handled.';

		comment on column wms.task_items.notes is 'Additional notes about this task item.';

		comment on column wms.task_items.completed_at is 'When this task item was completed.';

		comment on column wms.task_items.created_at is 'Timestamp when the task item was created.';

		comment on column wms.task_items.updated_at is 'Timestamp when the task item was last updated.';

		-- WMS Packages
		create table wms.packages(
			id uuid primary key default gen_random_uuid(),
			sales_order_id uuid not null references wms.sales_orders(id),
			package_number varchar(100) not null unique,
			warehouse_id uuid not null references wms.warehouses(id),
			package_type varchar(50),
			weight real,
			length real,
			width real,
			height real,
			volume real generated always as (length * width * height) stored,
			tracking_number varchar(100),
			carrier varchar(100),
			service_level varchar(50),
			packed_by_user_id text references "user"(id),
			packed_at timestamp,
			shipped_at timestamp,
			is_fragile boolean default false,
			is_hazmat boolean default false,
			requires_signature boolean default false,
			insurance_value numeric(10, 2),
			created_at timestamp default now(),
			updated_at timestamp default now()
		);

		comment on table wms.packages is 'Represents physical packages created during the packing process for sales orders.';

		comment on column wms.packages.id is 'Primary key';

		comment on column wms.packages.sales_order_id is 'Reference to the sales order being packaged (from IMS).';

		comment on column wms.packages.package_number is 'Unique identifier for tracking the package.';

		comment on column wms.packages.warehouse_id is 'Reference to the warehouse where the package was created.';

		comment on column wms.packages.package_type is 'Type of package (e.g., "box", "envelope", "pallet").';

		comment on column wms.packages.weight is 'Total weight of the packed package.';

		comment on column wms.packages.length is 'Package length dimension.';

		comment on column wms.packages.width is 'Package width dimension.';

		comment on column wms.packages.height is 'Package height dimension.';

		comment on column wms.packages.volume is 'Package volume (automatically calculated from length * width * height).';

		comment on column wms.packages.tracking_number is 'Carrier tracking number for the package.';

		comment on column wms.packages.carrier is 'Shipping carrier (e.g., "FedEx", "UPS", "DHL").';

		comment on column wms.packages.service_level is 'Shipping service level (e.g., "Ground", "Express", "Overnight").';

		comment on column wms.packages.packed_by_user_id is 'Reference to the user who packed the package.';

		comment on column wms.packages.packed_at is 'When the package was packed.';

		comment on column wms.packages.shipped_at is 'When the package was shipped.';

		comment on column wms.packages.is_fragile is 'Whether the package contains fragile items.';

		comment on column wms.packages.is_hazmat is 'Whether the package contains hazardous materials.';

		comment on column wms.packages.requires_signature is 'Whether delivery requires signature.';

		comment on column wms.packages.insurance_value is 'Declared insurance value for the package.';

		comment on column wms.packages.created_at is 'Timestamp when the package was created.';

		comment on column wms.packages.updated_at is 'Timestamp when the package was last updated.';

		-- WMS Package Items
		create table wms.package_items(
			id uuid primary key default gen_random_uuid(),
			package_id uuid not null references wms.packages(id),
			product_id uuid not null references wms.products(id),
			batch_id uuid references wms.inventory_batches(id),
			quantity integer not null,
			lot_number varchar(100),
			serial_numbers text[],
			expiry_date date,
			unit_weight real,
			total_weight real generated always as (quantity * unit_weight) stored,
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_quantity_positive check (quantity > 0)
		);

		comment on table wms.package_items is 'Details the contents of each package, specifying which products and quantities are included.';

		comment on column wms.package_items.id is 'Primary key';

		comment on column wms.package_items.package_id is 'Reference to the package container.';

		comment on column wms.package_items.product_id is 'Reference to the product included in the package (from IMS).';

		comment on column wms.package_items.batch_id is 'Reference to the batch of the product (from IMS).';

		comment on column wms.package_items.quantity is 'Number of units of the product in the package.';

		comment on column wms.package_items.lot_number is 'Lot number for traceability.';

		comment on column wms.package_items.serial_numbers is 'Array of serial numbers for serialized items.';

		comment on column wms.package_items.expiry_date is 'Expiry date of the packaged items.';

		comment on column wms.package_items.unit_weight is 'Weight per unit of the product.';

		comment on column wms.package_items.total_weight is 'Total weight of this line item (automatically calculated from quantity * unit_weight).';

		comment on column wms.package_items.created_at is 'Timestamp when the package item was created.';

		comment on column wms.package_items.updated_at is 'Timestamp when the package item was last updated.';

		-- Create indexes for performance
		create index idx_wms_locations_warehouse_id on wms.locations(warehouse_id);

		create index idx_wms_locations_parent_location_id on wms.locations(parent_location_id);

		create index idx_wms_locations_type on wms.locations(type);

		create index idx_wms_locations_barcode on wms.locations(barcode);

		create index idx_wms_inventory_stock_location_id on wms.inventory_stock(location_id);

		create index idx_wms_inventory_stock_product_id on wms.inventory_stock(product_id);

		create index idx_wms_inventory_stock_batch_id on wms.inventory_stock(batch_id);

		create index idx_wms_inventory_stock_status on wms.inventory_stock(status);

		create index idx_wms_putaway_rules_product_id on wms.putaway_rules(product_id);

		create index idx_wms_putaway_rules_warehouse_id on wms.putaway_rules(warehouse_id);

		create index idx_wms_putaway_rules_priority on wms.putaway_rules(priority);

		create index idx_wms_bin_thresholds_location_id on wms.bin_thresholds(location_id);

		create index idx_wms_bin_thresholds_product_id on wms.bin_thresholds(product_id);

		create index idx_wms_pick_batches_warehouse_id on wms.pick_batches(warehouse_id);

		create index idx_wms_pick_batches_status on wms.pick_batches(status);

		create index idx_wms_pick_batches_assigned_user_id on wms.pick_batches(assigned_user_id);

		create index idx_wms_tasks_warehouse_id on wms.tasks(warehouse_id);

		create index idx_wms_tasks_user_id on wms.tasks(user_id);

		create index idx_wms_tasks_type on wms.tasks(type);

		create index idx_wms_tasks_status on wms.tasks(status);

		create index idx_wms_tasks_pick_batch_id on wms.tasks(pick_batch_id);

		create index idx_wms_task_items_task_id on wms.task_items(task_id);

		create index idx_wms_task_items_product_id on wms.task_items(product_id);

		create index idx_wms_task_items_source_location_id on wms.task_items(source_location_id);

		create index idx_wms_task_items_destination_location_id on wms.task_items(destination_location_id);

		create index idx_wms_packages_sales_order_id on wms.packages(sales_order_id);

		create index idx_wms_packages_warehouse_id on wms.packages(warehouse_id);

		create index idx_wms_packages_tracking_number on wms.packages(tracking_number);

		create index idx_wms_package_items_package_id on wms.package_items(package_id);

		create index idx_wms_package_items_product_id on wms.package_items(product_id);

	`.execute(db)
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`
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
	`.execute(db)
}
