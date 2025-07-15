-- Add up migration script here
create schema lms;

comment on schema lms is 'Logistics Management System schema for shipments, warehouses, and transportation';

-- Create enums for type safety and better codegen
create type lms.address_type as enum(
  'shipping',
  'billing',
  'warehouse',
  'office'
);

create type lms.service_type as enum(
  'standard',
  'express',
  'overnight',
  'economy',
  'freight'
);

create type lms.transport_mode as enum(
  'air',
  'sea',
  'road',
  'rail'
);

create type lms.shipment_status as enum(
  'created',
  'picked_up',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'exception',
  'cancelled'
);

create type lms.package_type as enum(
  'box',
  'envelope',
  'tube',
  'pallet',
  'crate',
  'bag'
);

create type lms.tracking_event_type as enum(
  'created',
  'picked_up',
  'departed',
  'arrived',
  'out_for_delivery',
  'delivered',
  'exception',
  'cancelled'
);

create type lms.warehouse_type as enum(
  'distribution',
  'fulfillment',
  'cross_dock',
  'cold_storage',
  'bonded'
);

create type lms.warehouse_inventory_status as enum(
  'received',
  'stored',
  'picked',
  'shipped'
);

create type lms.provider_type as enum(
  'courier',
  'freight',
  'postal',
  'express',
  'ltl',
  'ftl'
);

create type lms.transport_leg_type as enum(
  'pickup',
  'linehaul',
  'delivery',
  'transfer'
);

create type lms.leg_status as enum(
  'planned',
  'in_progress',
  'completed',
  'cancelled'
);

create type lms.route_status as enum(
  'planned',
  'in_progress',
  'completed',
  'cancelled'
);

create type lms.delivery_status as enum(
  'pending',
  'attempted',
  'delivered',
  'failed',
  'rescheduled'
);

create type lms.performance_metric_type as enum(
  'on_time_delivery',
  'damage_rate',
  'cost_efficiency',
  'customer_satisfaction'
);

create type lms.invoice_status as enum(
  'draft',
  'sent',
  'paid',
  'overdue',
  'cancelled'
);

create type lms.notification_type as enum(
  'pickup_scheduled',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'exception',
  'delayed'
);

create type lms.notification_channel as enum(
  'email',
  'sms',
  'push',
  'webhook'
);

create type lms.notification_delivery_status as enum(
  'pending',
  'sent',
  'delivered',
  'failed',
  'bounced'
);

-- Org schema enums
create type org.driver_status as enum(
  'active',
  'inactive',
  'on_leave',
  'terminated'
);

create type org.vehicle_type as enum(
  'van',
  'truck',
  'trailer',
  'motorcycle',
  'car'
);

create type org.vehicle_status as enum(
  'active',
  'maintenance',
  'retired',
  'out_of_service'
);

comment on type lms.address_type is 'Types of addresses in the system';

comment on type lms.service_type is 'Categories of shipping services';

comment on type lms.transport_mode is 'Modes of transportation';

comment on type lms.shipment_status is 'Lifecycle statuses for shipments';

comment on type lms.package_type is 'Physical package types';

comment on type lms.tracking_event_type is 'Types of tracking events';

comment on type lms.warehouse_type is 'Categories of warehouse operations';

comment on type lms.provider_type is 'Types of transportation providers';

comment on type lms.invoice_status is 'Payment statuses for invoices';

comment on type org.driver_status is 'Employment statuses for drivers';

comment on type org.vehicle_status is 'Operational statuses for vehicles';

create table lms.addresses(
  id uuid not null primary key default gen_random_uuid(),
  address_line1 varchar(255) not null,
  address_line2 varchar(255),
  city varchar(100) not null,
  state varchar(100) not null,
  postal_code varchar(20) not null,
  country varchar(3) not null,
  address_type lms.address_type not null,
  is_validated boolean not null default false,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (latitude, longitude)
);

comment on table lms.addresses is 'Physical addresses for shipments, warehouses, and contacts';

comment on column lms.addresses.address_line1 is 'Primary address line (street number and name)';

comment on column lms.addresses.address_line2 is 'Secondary address line (apartment, suite, etc.)';

comment on column lms.addresses.city is 'City name';

comment on column lms.addresses.state is 'State or province';

comment on column lms.addresses.postal_code is 'Postal or ZIP code';

comment on column lms.addresses.country is 'ISO 3166-1 alpha-3 country code';

comment on column lms.addresses.address_type is 'Type of address usage';

comment on column lms.addresses.is_validated is 'Whether address has been verified against postal service';

comment on column lms.addresses.latitude is 'Latitude coordinate for mapping';

comment on column lms.addresses.longitude is 'Longitude coordinate for mapping';

alter table crm.contacts
  add column address_id uuid references lms.addresses(id);

alter table crm.companies
  add column address_id uuid references lms.addresses(id);

create table lms.shipping_services(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(100) not null unique,
  description text,
  service_type lms.service_type not null,
  max_weight decimal(10, 2),
  max_dimensions jsonb,
  delivery_time_min integer,
  delivery_time_max integer,
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.shipping_services is 'Available shipping service types and specifications';

comment on column lms.shipping_services.name is 'Service display name';

comment on column lms.shipping_services.description is 'Detailed service description';

comment on column lms.shipping_services.service_type is 'Service category classification';

comment on column lms.shipping_services.max_weight is 'Maximum package weight in kg';

comment on column lms.shipping_services.max_dimensions is 'Maximum dimensions as JSON {length, width, height} in cm';

comment on column lms.shipping_services.delivery_time_min is 'Minimum delivery time in hours';

comment on column lms.shipping_services.delivery_time_max is 'Maximum delivery time in hours';

create table lms.pricing_zones(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(100) not null,
  zone_code varchar(10) not null unique,
  countries jsonb not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.pricing_zones is 'Geographic zones for pricing calculations';

comment on column lms.pricing_zones.name is 'Zone display name';

comment on column lms.pricing_zones.zone_code is 'Short code for zone identification';

comment on column lms.pricing_zones.countries is 'Array of ISO country codes in this zone';

create table lms.pricing_rates(
  id uuid not null primary key default gen_random_uuid(),
  service_id uuid not null references lms.shipping_services(id),
  origin_zone_id uuid not null references lms.pricing_zones(id),
  destination_zone_id uuid not null references lms.pricing_zones(id),
  weight_min decimal(10, 2) not null,
  weight_max decimal(10, 2) not null,
  base_rate decimal(10, 2) not null,
  per_kg_rate decimal(10, 2) not null,
  fuel_surcharge_rate decimal(5, 2) default 0.00,
  effective_date date not null,
  expiry_date date,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (service_id, origin_zone_id, destination_zone_id),
  check (weight_max > weight_min),
  check (base_rate >= 0),
  check (per_kg_rate >= 0),
  check (fuel_surcharge_rate >= 0)
);

comment on table lms.pricing_rates is 'Shipping rates by service and zone combination';

comment on column lms.pricing_rates.weight_min is 'Minimum weight for this rate in kg';

comment on column lms.pricing_rates.weight_max is 'Maximum weight for this rate in kg';

comment on column lms.pricing_rates.base_rate is 'Base shipping cost in PHP';

comment on column lms.pricing_rates.per_kg_rate is 'Additional cost per kg in PHP';

comment on column lms.pricing_rates.fuel_surcharge_rate is 'Fuel surcharge percentage';

create table lms.shipments(
  id uuid not null primary key default gen_random_uuid(),
  tracking_number varchar(50) not null unique,
  sender_company_id uuid references crm.companies(id),
  sender_contact_id uuid references crm.contacts(id),
  sender_address_id uuid not null references lms.addresses(id),
  receiver_company_id uuid references crm.companies(id),
  receiver_contact_id uuid references crm.contacts(id),
  receiver_address_id uuid not null references lms.addresses(id),
  service_id uuid not null references lms.shipping_services(id),
  assigned_department_id uuid references org.departments(id),
  primary_transport_mode lms.transport_mode not null,
  status lms.shipment_status not null,
  total_weight decimal(10, 2) not null check (total_weight > 0),
  total_value decimal(10, 2),
  insurance_amount decimal(10, 2),
  shipping_cost decimal(10, 2),
  currency varchar(3) not null default 'PHP',
  pickup_date date,
  delivery_date date,
  estimated_delivery_date date,
  special_instructions text,
  created_by uuid references auth.users(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.shipments is 'Core shipment records with tracking and delivery information';

comment on column lms.shipments.tracking_number is 'Unique tracking identifier for customer reference';

comment on column lms.shipments.primary_transport_mode is 'Primary method of transportation';

comment on column lms.shipments.status is 'Current shipment status in delivery lifecycle';

comment on column lms.shipments.total_weight is 'Combined weight of all packages in kg';

comment on column lms.shipments.total_value is 'Declared value of shipment contents';

comment on column lms.shipments.insurance_amount is 'Insurance coverage amount';

comment on column lms.shipments.currency is 'ISO 4217 currency code';

comment on column lms.shipments.created_by is 'User who created the shipment';

create table lms.packages(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  package_number varchar(50) not null,
  weight decimal(10, 2) not null check (weight > 0),
  length decimal(10, 2),
  width decimal(10, 2),
  height decimal(10, 2),
  package_type lms.package_type not null,
  contents_description text,
  declared_value decimal(10, 2),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (shipment_id, package_number)
);

comment on table lms.packages is 'Individual packages within shipments';

comment on column lms.packages.package_number is 'Package identifier within shipment';

comment on column lms.packages.weight is 'Package weight in kg';

comment on column lms.packages.length is 'Package length in cm';

comment on column lms.packages.width is 'Package width in cm';

comment on column lms.packages.height is 'Package height in cm';

comment on column lms.packages.package_type is 'Physical package type';

comment on column lms.packages.contents_description is 'Description of package contents';

comment on column lms.packages.declared_value is 'Declared value for customs and insurance';

create table lms.tracking_events(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  event_type lms.tracking_event_type not null,
  event_description varchar(500) not null,
  event_location varchar(200),
  event_timestamp timestamptz not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.tracking_events is 'Timeline of events for shipment tracking';

comment on column lms.tracking_events.event_type is 'Type of tracking event';

comment on column lms.tracking_events.event_description is 'Human-readable event description';

comment on column lms.tracking_events.event_location is 'Location where event occurred';

comment on column lms.tracking_events.event_timestamp is 'When the event occurred';

create table lms.warehouses(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(100) not null,
  code varchar(10) not null unique,
  address_id uuid not null references lms.addresses(id),
  warehouse_type lms.warehouse_type not null,
  capacity integer,
  department_id uuid references org.departments(id),
  is_active boolean not null default true,
  manager_id uuid references auth.users(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.warehouses is 'Storage facilities for inventory management';

comment on column lms.warehouses.name is 'Warehouse display name';

comment on column lms.warehouses.code is 'Short code for warehouse identification';

comment on column lms.warehouses.warehouse_type is 'Type of warehouse operation';

comment on column lms.warehouses.capacity is 'Storage capacity in cubic meters';

comment on column lms.warehouses.manager_id is 'Warehouse manager user reference';

create table lms.warehouse_inventories(
  id uuid not null primary key default gen_random_uuid(),
  warehouse_id uuid not null references lms.warehouses(id),
  shipment_id uuid not null references lms.shipments(id),
  package_id uuid not null references lms.packages(id),
  location_code varchar(20),
  status lms.warehouse_inventory_status not null,
  arrived_at timestamptz,
  departed_at timestamptz,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.warehouse_inventories is 'Tracking of packages within warehouse locations';

comment on column lms.warehouse_inventories.location_code is 'Specific location within warehouse (aisle, shelf, etc.)';

comment on column lms.warehouse_inventories.status is 'Current status of package in warehouse';

comment on column lms.warehouse_inventories.arrived_at is 'When package arrived at warehouse';

comment on column lms.warehouse_inventories.departed_at is 'When package left warehouse';

create table lms.transportation_providers(
  id uuid not null primary key default gen_random_uuid(),
  company_name varchar(200) not null,
  provider_type lms.provider_type not null,
  contact_person varchar(100),
  email varchar(320),
  phone_number varchar(20),
  address_id uuid references lms.addresses(id),
  preferred_by_department_id uuid references org.departments(id),
  api_endpoint varchar(500),
  api_key text,
  contract_start_date date,
  contract_end_date date,
  payment_terms varchar(100),
  insurance_coverage decimal(15, 2),
  performance_rating decimal(3, 2) check (performance_rating >= 0 and performance_rating <= 5),
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.transportation_providers is 'External transportation and logistics providers';

comment on column lms.transportation_providers.company_name is 'Provider company name';

comment on column lms.transportation_providers.provider_type is 'Type of transportation service';

comment on column lms.transportation_providers.contact_person is 'Primary contact name';

comment on column lms.transportation_providers.email is 'Primary contact email';

comment on column lms.transportation_providers.phone_number is 'Primary contact phone';

comment on column lms.transportation_providers.api_endpoint is 'API URL for integration';

comment on column lms.transportation_providers.api_key is 'API authentication key';

comment on column lms.transportation_providers.performance_rating is 'Provider performance rating (0-5 scale)';

create table lms.provider_services(
  id uuid not null primary key default gen_random_uuid(),
  provider_id uuid not null references lms.transportation_providers(id),
  service_name varchar(100) not null,
  service_type lms.service_type not null,
  transport_mode lms.transport_mode not null,
  origin_countries jsonb,
  destination_countries jsonb,
  max_weight decimal(10, 2),
  max_dimensions jsonb,
  transit_time_min integer,
  transit_time_max integer,
  cutoff_time time,
  tracking_available boolean not null default true,
  insurance_available boolean not null default true,
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.provider_services is 'Services offered by transportation providers';

comment on column lms.provider_services.service_name is 'Provider-specific service name';

comment on column lms.provider_services.service_type is 'Type of service offered';

comment on column lms.provider_services.transport_mode is 'Mode of transportation';

comment on column lms.provider_services.origin_countries is 'Countries where service originates';

comment on column lms.provider_services.destination_countries is 'Countries service delivers to';

comment on column lms.provider_services.cutoff_time is 'Daily cutoff time for pickups';

create table lms.provider_rates(
  id uuid not null primary key default gen_random_uuid(),
  provider_service_id uuid not null references lms.provider_services(id),
  origin_zone_id uuid not null references lms.pricing_zones(id),
  destination_zone_id uuid not null references lms.pricing_zones(id),
  weight_min decimal(10, 2) not null,
  weight_max decimal(10, 2) not null,
  base_rate decimal(10, 2) not null,
  per_kg_rate decimal(10, 2) not null,
  fuel_surcharge_rate decimal(5, 2) default 0.00,
  currency varchar(3) not null default 'PHP',
  effective_date date not null,
  expiry_date date,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table org.drivers(
  id uuid not null primary key default gen_random_uuid(),
  employee_id varchar(20) not null unique,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  license_number varchar(30) not null unique,
  phone_number varchar(20) not null,
  email varchar(320) not null unique,
  hire_date date not null,
  status org.driver_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table org.drivers is 'Company drivers for vehicle operations';

comment on column org.drivers.employee_id is 'Company employee identification number';

comment on column org.drivers.license_number is 'Driver license number';

comment on column org.drivers.status is 'Current employment status';

create table org.vehicles(
  id uuid not null primary key default gen_random_uuid(),
  vehicle_number varchar(20) not null unique,
  license_plate varchar(15) not null unique,
  vehicle_type org.vehicle_type not null,
  make varchar(30) not null,
  model varchar(30) not null,
  year integer not null check (year >= 1900 and year <= date_part('year', current_date) + 1),
  capacity_weight decimal(10, 2),
  capacity_volume decimal(10, 2),
  department_id uuid references org.departments(id),
  warehouse_id uuid references lms.warehouses(id),
  status org.vehicle_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table org.vehicles is 'Company vehicles for transportation operations';

comment on column org.vehicles.vehicle_number is 'Company vehicle identification number';

comment on column org.vehicles.license_plate is 'Government license plate number';

comment on column org.vehicles.vehicle_type is 'Type of vehicle';

comment on column org.vehicles.capacity_weight is 'Maximum weight capacity in kg';

comment on column org.vehicles.capacity_volume is 'Maximum volume capacity in cubic meters';

comment on column org.vehicles.status is 'Current operational status';

create table lms.transport_legs(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  leg_sequence integer not null check (leg_sequence > 0),
  transport_type lms.transport_leg_type not null,
  provider_id uuid references lms.transportation_providers(id),
  provider_service_id uuid references lms.provider_services(id),
  provider_tracking_number varchar(50),
  vehicle_id uuid references org.vehicles(id),
  driver_id uuid references org.drivers(id),
  origin_warehouse_id uuid references lms.warehouses(id),
  destination_warehouse_id uuid references lms.warehouses(id),
  origin_address_id uuid references lms.addresses(id),
  destination_address_id uuid references lms.addresses(id),
  scheduled_pickup timestamptz,
  actual_pickup timestamptz,
  scheduled_delivery timestamptz,
  actual_delivery timestamptz,
  cost decimal(10, 2),
  currency varchar(3) default 'PHP',
  status lms.leg_status not null,
  special_instructions text,
  unique (shipment_id, leg_sequence),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.transport_legs is 'Individual segments of shipment transportation';

comment on column lms.transport_legs.leg_sequence is 'Sequence order of this leg in the shipment journey';

comment on column lms.transport_legs.transport_type is 'Type of transportation leg';

comment on column lms.transport_legs.provider_tracking_number is 'External provider tracking number';

comment on column lms.transport_legs.status is 'Current status of this transport leg';

create table lms.routes(
  id uuid not null primary key default gen_random_uuid(),
  route_name varchar(100) not null,
  driver_id uuid references org.drivers(id),
  vehicle_id uuid references org.vehicles(id),
  route_date date not null,
  estimated_departure timestamptz,
  actual_departure timestamptz,
  estimated_arrival timestamptz,
  actual_arrival timestamptz,
  status lms.route_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.routes is 'Planned delivery routes for vehicles and drivers';

comment on column lms.routes.route_name is 'Descriptive name for the route';

comment on column lms.routes.route_date is 'Date the route is scheduled';

comment on column lms.routes.status is 'Current status of the route';

create table lms.route_shipments(
  id uuid not null primary key default gen_random_uuid(),
  route_id uuid not null references lms.routes(id),
  shipment_id uuid not null references lms.shipments(id),
  sequence_number integer not null check (sequence_number > 0),
  delivery_date date not null,
  estimated_delivery timestamptz,
  actual_delivery timestamptz,
  delivery_status lms.delivery_status not null,
  signature_required boolean not null default false,
  recipient_signature varchar(100),
  unique (route_id, shipment_id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.route_shipments is 'Shipments assigned to specific delivery routes';

comment on column lms.route_shipments.sequence_number is 'Delivery order on the route';

comment on column lms.route_shipments.delivery_status is 'Status of delivery attempt';

comment on column lms.route_shipments.recipient_signature is 'Name of person who signed for delivery';

create table lms.provider_performance(
  id uuid not null primary key default gen_random_uuid(),
  provider_id uuid not null references lms.transportation_providers(id),
  shipment_id uuid not null references lms.shipments(id),
  transport_leg_id uuid references lms.transport_legs(id),
  metric_type lms.performance_metric_type not null,
  metric_value decimal(10, 4),
  measurement_date date not null,
  notes text,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.provider_performance is 'Performance metrics tracking for transportation providers';

comment on column lms.provider_performance.metric_type is 'Type of performance metric being measured';

comment on column lms.provider_performance.metric_value is 'Numeric value of the metric';

comment on column lms.provider_performance.measurement_date is 'Date when metric was measured';

create table lms.provider_invoices(
  id uuid not null primary key default gen_random_uuid(),
  provider_id uuid not null references lms.transportation_providers(id),
  invoice_number varchar(50) not null,
  invoice_date date not null,
  due_date date not null,
  subtotal decimal(10, 2) not null check (subtotal >= 0),
  tax_amount decimal(10, 2) default 0.00 check (tax_amount >= 0),
  total_amount decimal(10, 2) not null check (total_amount >= 0),
  currency varchar(3) not null default 'PHP',
  status lms.invoice_status not null,
  payment_date date,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (provider_id, invoice_number)
);

comment on table lms.provider_invoices is 'Invoices received from transportation providers';

comment on column lms.provider_invoices.invoice_number is 'Provider invoice number';

comment on column lms.provider_invoices.subtotal is 'Invoice subtotal before taxes';

comment on column lms.provider_invoices.tax_amount is 'Total tax amount';

comment on column lms.provider_invoices.total_amount is 'Final invoice total';

comment on column lms.provider_invoices.status is 'Current payment status';

create table lms.provider_invoice_line_items(
  id uuid not null primary key default gen_random_uuid(),
  provider_invoice_id uuid not null references lms.provider_invoices(id),
  transport_leg_id uuid not null references lms.transport_legs(id),
  description varchar(500) not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price decimal(10, 2) not null check (unit_price >= 0),
  line_total decimal(10, 2) not null check (line_total >= 0),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table lms.provider_invoice_line_items is 'Individual line items on provider invoices';

comment on column lms.provider_invoice_line_items.description is 'Description of service or charge';

comment on column lms.provider_invoice_line_items.quantity is 'Quantity of service units';

comment on column lms.provider_invoice_line_items.unit_price is 'Price per unit';

comment on column lms.provider_invoice_line_items.line_total is 'Total for this line item';

create table crm.invoices(
  id uuid not null primary key default gen_random_uuid(),
  invoice_number varchar(50) not null unique,
  company_id uuid references crm.companies(id),
  contact_id uuid references crm.contacts(id),
  invoice_date date not null,
  due_date date not null,
  subtotal decimal(10, 2) not null check (subtotal >= 0),
  tax_amount decimal(10, 2) not null default 0.00 check (tax_amount >= 0),
  total_amount decimal(10, 2) not null check (total_amount >= 0),
  currency varchar(3) not null default 'PHP',
  status lms.invoice_status not null,
  payment_terms varchar(100),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.invoices is 'Customer invoices for shipping services';

comment on column crm.invoices.invoice_number is 'Unique invoice identifier';

comment on column crm.invoices.subtotal is 'Invoice subtotal before taxes';

comment on column crm.invoices.tax_amount is 'Total tax amount';

comment on column crm.invoices.total_amount is 'Final invoice total';

comment on column crm.invoices.status is 'Current payment status';

comment on column crm.invoices.payment_terms is 'Payment terms and conditions';

create table crm.invoice_line_items(
  id uuid not null primary key default gen_random_uuid(),
  invoice_id uuid not null references crm.invoices(id),
  shipment_id uuid references lms.shipments(id),
  description varchar(500) not null,
  quantity decimal(10, 2) not null default 1 check (quantity > 0),
  unit_price decimal(10, 2) not null check (unit_price >= 0),
  line_total decimal(10, 2) generated always as (unit_price * quantity) stored,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.invoice_line_items is 'Individual line items on customer invoices';

comment on column crm.invoice_line_items.description is 'Description of service or charge';

comment on column crm.invoice_line_items.quantity is 'Quantity of service units';

comment on column crm.invoice_line_items.unit_price is 'Price per unit';

comment on column crm.invoice_line_items.line_total is 'Calculated total for this line item';

create table crm.notifications(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  contact_id uuid not null references crm.contacts(id),
  notification_type lms.notification_type not null,
  channel lms.notification_channel not null,
  recipient varchar(320) not null,
  subject varchar(200),
  message text not null,
  sent_at timestamptz,
  delivery_status lms.notification_delivery_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.notifications is 'Customer notifications for shipment updates';

comment on column crm.notifications.notification_type is 'Type of notification sent';

comment on column crm.notifications.channel is 'Communication channel used';

comment on column crm.notifications.recipient is 'Recipient contact information';

comment on column crm.notifications.delivery_status is 'Status of notification delivery';

-- Performance indexes
create index idx_addresses_country on lms.addresses(country);

create index idx_addresses_city on lms.addresses(city);

create index idx_addresses_type on lms.addresses(address_type);

create index idx_shipments_tracking on lms.shipments(tracking_number);

create index idx_shipments_status on lms.shipments(status);

create index idx_shipments_pickup_date on lms.shipments(pickup_date);

create index idx_shipments_delivery_date on lms.shipments(delivery_date);

create index idx_shipments_sender_company on lms.shipments(sender_company_id);

create index idx_shipments_receiver_company on lms.shipments(receiver_company_id);

create index idx_shipments_department on lms.shipments(assigned_department_id);

create index idx_packages_shipment on lms.packages(shipment_id);

create index idx_tracking_events_shipment on lms.tracking_events(shipment_id);

create index idx_tracking_events_timestamp on lms.tracking_events(event_timestamp);

create index idx_tracking_events_type on lms.tracking_events(event_type);

create index idx_warehouses_code on lms.warehouses(code);

create index idx_warehouses_department on lms.warehouses(department_id);

create index idx_warehouse_inventories_warehouse on lms.warehouse_inventories(warehouse_id);

create index idx_warehouse_inventories_shipment on lms.warehouse_inventories(shipment_id);

create index idx_warehouse_inventories_status on lms.warehouse_inventories(status);

create index idx_transport_legs_shipment on lms.transport_legs(shipment_id);

create index idx_transport_legs_provider on lms.transport_legs(provider_id);

create index idx_transport_legs_vehicle on lms.transport_legs(vehicle_id);

create index idx_routes_date on lms.routes(route_date);

create index idx_routes_driver on lms.routes(driver_id);

create index idx_routes_vehicle on lms.routes(vehicle_id);

create index idx_provider_invoices_provider on lms.provider_invoices(provider_id);

create index idx_provider_invoices_date on lms.provider_invoices(invoice_date);

create index idx_provider_invoices_status on lms.provider_invoices(status);

create index idx_crm_invoices_company on crm.invoices(company_id);

create index idx_crm_invoices_date on crm.invoices(invoice_date);

create index idx_crm_invoices_status on crm.invoices(status);

create index idx_notifications_shipment on crm.notifications(shipment_id);

create index idx_notifications_contact on crm.notifications(contact_id);

create index idx_notifications_type on crm.notifications(notification_type);

