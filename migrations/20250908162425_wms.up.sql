-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Create WMS schema
create schema if not exists wms;

-- Create WMS enum types
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
  product_id uuid not null references ims.products(id),
  batch_id uuid references ims.inventory_batches(id),
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
  product_id uuid not null references ims.products(id),
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
  product_id uuid not null references ims.products(id),
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
  assigned_user_id uuid references auth."user"(id),
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
  sales_order_id uuid not null references ims.sales_orders(id),
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
  user_id uuid references auth."user"(id),
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
  product_id uuid not null references ims.products(id),
  batch_id uuid references ims.inventory_batches(id),
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
  sales_order_id uuid not null references ims.sales_orders(id),
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
  packed_by_user_id uuid references auth."user"(id),
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
  product_id uuid not null references ims.products(id),
  batch_id uuid references ims.inventory_batches(id),
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

