-- Add up migration script here
-- Create enums for type safety and better codegen
create type public.lms_address_type as enum(
  'shipping',
  'billing',
  'warehouse',
  'office'
);

create type public.lms_service_type as enum(
  'standard',
  'express',
  'overnight',
  'economy',
  'freight'
);

create type public.lms_transport_mode as enum(
  'air',
  'sea',
  'road',
  'rail'
);

create type public.lms_shipment_status as enum(
  'created',
  'picked_up',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'exception',
  'cancelled'
);

create type public.lms_package_type as enum(
  'box',
  'envelope',
  'tube',
  'pallet',
  'crate',
  'bag'
);

create type public.lms_tracking_event_type as enum(
  'created',
  'picked_up',
  'departed',
  'arrived',
  'out_for_delivery',
  'delivered',
  'exception',
  'cancelled'
);

create type public.lms_warehouse_type as enum(
  'distribution',
  'fulfillment',
  'cross_dock',
  'cold_storage',
  'bonded'
);

create type public.lms_warehouse_inventory_status as enum(
  'received',
  'stored',
  'picked',
  'shipped'
);

create type public.lms_provider_type as enum(
  'courier',
  'freight',
  'postal',
  'express',
  'ltl',
  'ftl'
);

create type public.lms_transport_leg_type as enum(
  'pickup',
  'linehaul',
  'delivery',
  'transfer'
);

create type public.lms_leg_status as enum(
  'planned',
  'in_progress',
  'completed',
  'cancelled'
);

create type public.lms_route_status as enum(
  'planned',
  'in_progress',
  'completed',
  'cancelled'
);

create type public.lms_delivery_status as enum(
  'pending',
  'attempted',
  'delivered',
  'failed',
  'rescheduled'
);

create type public.lms_performance_metric_type as enum(
  'on_time_delivery',
  'damage_rate',
  'cost_efficiency',
  'customer_satisfaction'
);

create type public.crm_invoice_status as enum(
  'draft',
  'sent',
  'paid',
  'overdue',
  'cancelled'
);

create type public.lms_provider_invoice_status as enum(
  'draft',
  'sent',
  'paid',
  'overdue',
  'cancelled'
);

create type public.crm_notification_type as enum(
  'pickup_scheduled',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'exception',
  'delayed'
);

create type public.crm_notification_channel as enum(
  'email',
  'sms',
  'push',
  'webhook'
);

create type public.crm_notification_delivery_status as enum(
  'pending',
  'sent',
  'delivered',
  'failed',
  'bounced'
);

-- Org schema enums
create type public.org_driver_status as enum(
  'active',
  'inactive',
  'on_leave',
  'terminated'
);

create type public.org_vehicle_type as enum(
  'van',
  'truck',
  'trailer',
  'motorcycle',
  'car'
);

create type public.org_vehicle_status as enum(
  'active',
  'maintenance',
  'retired',
  'out_of_service'
);

comment on type public.lms_address_type is 'Types of addresses in the system';

comment on type public.lms_service_type is 'Categories of shipping services';

comment on type public.lms_transport_mode is 'Modes of transportation';

comment on type public.lms_shipment_status is 'Lifecycle statuses for shipments';

comment on type public.lms_package_type is 'Physical package types';

comment on type public.lms_tracking_event_type is 'Types of tracking events';

comment on type public.lms_warehouse_type is 'Categories of warehouse operations';

comment on type public.lms_provider_type is 'Types of transportation providers';

comment on type public.lms_provider_invoice_status is 'Payment statuses for invoices';

comment on type public.org_driver_status is 'Employment statuses for drivers';

comment on type public.org_vehicle_status is 'Operational statuses for vehicles';

create table public.lms_addresses(
  id uuid not null primary key default gen_random_uuid(),
  address_line1 varchar(255) not null,
  address_line2 varchar(255),
  city varchar(100) not null,
  state varchar(100) not null,
  postal_code varchar(20) not null,
  country varchar(3) not null,
  address_type public.lms_address_type not null,
  is_validated boolean not null default false,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (latitude, longitude)
);

comment on table public.lms_addresses is 'Physical addresses for shipments, warehouses, and contacts';

comment on column public.lms_addresses.address_line1 is 'Primary address line (street number and name)';

comment on column public.lms_addresses.address_line2 is 'Secondary address line (apartment, suite, etc.)';

comment on column public.lms_addresses.city is 'City name';

comment on column public.lms_addresses.state is 'State or province';

comment on column public.lms_addresses.postal_code is 'Postal or ZIP code';

comment on column public.lms_addresses.country is 'ISO 3166-1 alpha-3 country code';

comment on column public.lms_addresses.address_type is 'Type of address usage';

comment on column public.lms_addresses.is_validated is 'Whether address has been verified against postal service';

comment on column public.lms_addresses.latitude is 'Latitude coordinate for mapping';

comment on column public.lms_addresses.longitude is 'Longitude coordinate for mapping';

alter table public.crm_contacts
  add column address_id uuid references public.lms_addresses(id);

alter table public.crm_companies
  add column address_id uuid references public.lms_addresses(id);

create table public.lms_shipping_services(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(100) not null unique,
  description text,
  service_type public.lms_service_type not null,
  max_weight decimal(10, 2),
  max_dimensions jsonb,
  delivery_time_min integer,
  delivery_time_max integer,
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.lms_shipping_services is 'Available shipping service types and specifications';

comment on column public.lms_shipping_services.name is 'Service display name';

comment on column public.lms_shipping_services.description is 'Detailed service description';

comment on column public.lms_shipping_services.service_type is 'Service category classification';

comment on column public.lms_shipping_services.max_weight is 'Maximum package weight in kg';

comment on column public.lms_shipping_services.max_dimensions is 'Maximum dimensions as JSON {length, width, height} in cm';

comment on column public.lms_shipping_services.delivery_time_min is 'Minimum delivery time in hours';

comment on column public.lms_shipping_services.delivery_time_max is 'Maximum delivery time in hours';

create table public.lms_pricing_zones(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(100) not null,
  zone_code varchar(10) not null unique,
  countries jsonb not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.lms_pricing_zones is 'Geographic zones for pricing calculations';

comment on column public.lms_pricing_zones.name is 'Zone display name';

comment on column public.lms_pricing_zones.zone_code is 'Short code for zone identification';

comment on column public.lms_pricing_zones.countries is 'Array of ISO country codes in this zone';

create table public.lms_pricing_rates(
  id uuid not null primary key default gen_random_uuid(),
  service_id uuid not null references public.lms_shipping_services(id),
  origin_zone_id uuid not null references public.lms_pricing_zones(id),
  destination_zone_id uuid not null references public.lms_pricing_zones(id),
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

comment on table public.lms_pricing_rates is 'Shipping rates by service and zone combination';

comment on column public.lms_pricing_rates.weight_min is 'Minimum weight for this rate in kg';

comment on column public.lms_pricing_rates.weight_max is 'Maximum weight for this rate in kg';

comment on column public.lms_pricing_rates.base_rate is 'Base shipping cost in PHP';

comment on column public.lms_pricing_rates.per_kg_rate is 'Additional cost per kg in PHP';

comment on column public.lms_pricing_rates.fuel_surcharge_rate is 'Fuel surcharge percentage';

create table public.lms_shipments(
  id uuid not null primary key default gen_random_uuid(),
  tracking_number varchar(50) not null unique,
  sender_company_id uuid references public.crm_companies(id),
  sender_contact_id uuid references public.crm_contacts(id),
  sender_address_id uuid not null references public.lms_addresses(id),
  receiver_company_id uuid references public.crm_companies(id),
  receiver_contact_id uuid references public.crm_contacts(id),
  receiver_address_id uuid not null references public.lms_addresses(id),
  service_id uuid not null references public.lms_shipping_services(id),
  assigned_department_id uuid references public.org_departments(id),
  primary_transport_mode public.lms_transport_mode not null,
  status public.lms_shipment_status not null,
  total_weight decimal(10, 2) not null check (total_weight > 0),
  total_value decimal(10, 2),
  insurance_amount decimal(10, 2),
  shipping_cost decimal(10, 2),
  currency varchar(3) not null default 'PHP',
  pickup_date date,
  delivery_date date,
  estimated_delivery_date date,
  special_instructions text,
  created_by uuid references public.auth_users(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.lms_shipments is 'Core shipment records with tracking and delivery information';

comment on column public.lms_shipments.tracking_number is 'Unique tracking identifier for customer reference';

comment on column public.lms_shipments.primary_transport_mode is 'Primary method of transportation';

comment on column public.lms_shipments.status is 'Current shipment status in delivery lifecycle';

comment on column public.lms_shipments.total_weight is 'Combined weight of all packages in kg';

comment on column public.lms_shipments.total_value is 'Declared value of shipment contents';

comment on column public.lms_shipments.insurance_amount is 'Insurance coverage amount';

comment on column public.lms_shipments.currency is 'ISO 4217 currency code';

comment on column public.lms_shipments.created_by is 'User who created the shipment';

create table public.lms_packages(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references public.lms_shipments(id),
  package_number varchar(50) not null,
  weight decimal(10, 2) not null check (weight > 0),
  length decimal(10, 2),
  width decimal(10, 2),
  height decimal(10, 2),
  package_type public.lms_package_type not null,
  contents_description text,
  declared_value decimal(10, 2),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (shipment_id, package_number)
);

comment on table public.lms_packages is 'Individual packages within shipments';

comment on column public.lms_packages.package_number is 'Package identifier within shipment';

comment on column public.lms_packages.weight is 'Package weight in kg';

comment on column public.lms_packages.length is 'Package length in cm';

comment on column public.lms_packages.width is 'Package width in cm';

comment on column public.lms_packages.height is 'Package height in cm';

comment on column public.lms_packages.package_type is 'Physical package type';

comment on column public.lms_packages.contents_description is 'Description of package contents';

comment on column public.lms_packages.declared_value is 'Declared value for customs and insurance';

create table public.lms_tracking_events(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references public.lms_shipments(id),
  event_type public.lms_tracking_event_type not null,
  event_description varchar(500) not null,
  event_location varchar(200),
  event_timestamp timestamptz not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.lms_tracking_events is 'Timeline of events for shipment tracking';

comment on column public.lms_tracking_events.event_type is 'Type of tracking event';

comment on column public.lms_tracking_events.event_description is 'Human-readable event description';

comment on column public.lms_tracking_events.event_location is 'Location where event occurred';

comment on column public.lms_tracking_events.event_timestamp is 'When the event occurred';

create table public.lms_warehouses(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(100) not null,
  code varchar(10) not null unique,
  address_id uuid not null references public.lms_addresses(id),
  warehouse_type public.lms_warehouse_type not null,
  capacity integer,
  department_id uuid references public.org_departments(id),
  is_active boolean not null default true,
  manager_id uuid references public.auth_users(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.lms_warehouses is 'Storage facilities for inventory management';

comment on column public.lms_warehouses.name is 'Warehouse display name';

comment on column public.lms_warehouses.code is 'Short code for warehouse identification';

comment on column public.lms_warehouses.warehouse_type is 'Type of warehouse operation';

comment on column public.lms_warehouses.capacity is 'Storage capacity in cubic meters';

comment on column public.lms_warehouses.manager_id is 'Warehouse manager user reference';

create table public.lms_warehouse_inventories(
  id uuid not null primary key default gen_random_uuid(),
  warehouse_id uuid not null references public.lms_warehouses(id),
  shipment_id uuid not null references public.lms_shipments(id),
  package_id uuid not null references public.lms_packages(id),
  location_code varchar(20),
  status public.lms_warehouse_inventory_status not null,
  arrived_at timestamptz,
  departed_at timestamptz,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.lms_warehouse_inventories is 'Tracking of packages within warehouse locations';

comment on column public.lms_warehouse_inventories.location_code is 'Specific location within warehouse (aisle, shelf, etc.)';

comment on column public.lms_warehouse_inventories.status is 'Current status of package in warehouse';

comment on column public.lms_warehouse_inventories.arrived_at is 'When package arrived at warehouse';

comment on column public.lms_warehouse_inventories.departed_at is 'When package left warehouse';

create table public.lms_transportation_providers(
  id uuid not null primary key default gen_random_uuid(),
  company_name varchar(200) not null,
  provider_type public.lms_provider_type not null,
  contact_person varchar(100),
  email varchar(320),
  phone_number varchar(20),
  address_id uuid references public.lms_addresses(id),
  preferred_by_department_id uuid references public.org_departments(id),
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

comment on table public.lms_transportation_providers is 'External transportation and logistics providers';

comment on column public.lms_transportation_providers.company_name is 'Provider company name';

comment on column public.lms_transportation_providers.provider_type is 'Type of transportation service';

comment on column public.lms_transportation_providers.contact_person is 'Primary contact name';

comment on column public.lms_transportation_providers.email is 'Primary contact email';

comment on column public.lms_transportation_providers.phone_number is 'Primary contact phone';

comment on column public.lms_transportation_providers.api_endpoint is 'API URL for integration';

comment on column public.lms_transportation_providers.api_key is 'API authentication key';

comment on column public.lms_transportation_providers.performance_rating is 'Provider performance rating (0-5 scale)';

create table public.lms_provider_services(
  id uuid not null primary key default gen_random_uuid(),
  provider_id uuid not null references public.lms_transportation_providers(id),
  service_name varchar(100) not null,
  service_type public.lms_service_type not null,
  transport_mode public.lms_transport_mode not null,
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

comment on table public.lms_provider_services is 'Services offered by transportation providers';

comment on column public.lms_provider_services.service_name is 'Provider-specific service name';

comment on column public.lms_provider_services.service_type is 'Type of service offered';

comment on column public.lms_provider_services.transport_mode is 'Mode of transportation';

comment on column public.lms_provider_services.origin_countries is 'Countries where service originates';

comment on column public.lms_provider_services.destination_countries is 'Countries service delivers to';

comment on column public.lms_provider_services.cutoff_time is 'Daily cutoff time for pickups';

create table public.lms_provider_rates(
  id uuid not null primary key default gen_random_uuid(),
  provider_service_id uuid not null references public.lms_provider_services(id),
  origin_zone_id uuid not null references public.lms_pricing_zones(id),
  destination_zone_id uuid not null references public.lms_pricing_zones(id),
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

create table public.org_drivers(
  id uuid not null primary key default gen_random_uuid(),
  employee_id varchar(20) not null unique,
  first_name varchar(50) not null,
  last_name varchar(50) not null,
  license_number varchar(30) not null unique,
  phone_number varchar(20) not null,
  email varchar(320) not null unique,
  hire_date date not null,
  status public.org_driver_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.org_drivers is 'Company drivers for vehicle operations';

comment on column public.org_drivers.employee_id is 'Company employee identification number';

comment on column public.org_drivers.license_number is 'Driver license number';

comment on column public.org_drivers.status is 'Current employment status';

create table public.org_vehicles(
  id uuid not null primary key default gen_random_uuid(),
  vehicle_number varchar(20) not null unique,
  license_plate varchar(15) not null unique,
  vehicle_type public.org_vehicle_type not null,
  make varchar(30) not null,
  model varchar(30) not null,
  year integer not null check (year >= 1900 and year <= date_part('year', current_date) + 1),
  capacity_weight decimal(10, 2),
  capacity_volume decimal(10, 2),
  department_id uuid references public.org_departments(id),
  warehouse_id uuid references public.lms_warehouses(id),
  status public.org_vehicle_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.org_vehicles is 'Company vehicles for transportation operations';

comment on column public.org_vehicles.vehicle_number is 'Company vehicle identification number';

comment on column public.org_vehicles.license_plate is 'Government license plate number';

comment on column public.org_vehicles.vehicle_type is 'Type of vehicle';

comment on column public.org_vehicles.capacity_weight is 'Maximum weight capacity in kg';

comment on column public.org_vehicles.capacity_volume is 'Maximum volume capacity in cubic meters';

comment on column public.org_vehicles.status is 'Current operational status';

create table public.lms_transport_legs(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references public.lms_shipments(id),
  leg_sequence integer not null check (leg_sequence > 0),
  transport_type public.lms_transport_leg_type not null,
  provider_id uuid references public.lms_transportation_providers(id),
  provider_service_id uuid references public.lms_provider_services(id),
  provider_tracking_number varchar(50),
  vehicle_id uuid references public.org_vehicles(id),
  driver_id uuid references public.org_drivers(id),
  origin_warehouse_id uuid references public.lms_warehouses(id),
  destination_warehouse_id uuid references public.lms_warehouses(id),
  origin_address_id uuid references public.lms_addresses(id),
  destination_address_id uuid references public.lms_addresses(id),
  scheduled_pickup timestamptz,
  actual_pickup timestamptz,
  scheduled_delivery timestamptz,
  actual_delivery timestamptz,
  cost decimal(10, 2),
  currency varchar(3) default 'PHP',
  status public.lms_leg_status not null,
  special_instructions text,
  unique (shipment_id, leg_sequence),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.lms_transport_legs is 'Individual segments of shipment transportation';

comment on column public.lms_transport_legs.leg_sequence is 'Sequence order of this leg in the shipment journey';

comment on column public.lms_transport_legs.transport_type is 'Type of transportation leg';

comment on column public.lms_transport_legs.provider_tracking_number is 'External provider tracking number';

comment on column public.lms_transport_legs.status is 'Current status of this transport leg';

create table public.lms_routes(
  id uuid not null primary key default gen_random_uuid(),
  route_name varchar(100) not null,
  driver_id uuid references public.org_drivers(id),
  vehicle_id uuid references public.org_vehicles(id),
  route_date date not null,
  estimated_departure timestamptz,
  actual_departure timestamptz,
  estimated_arrival timestamptz,
  actual_arrival timestamptz,
  status public.lms_route_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.lms_routes is 'Planned delivery routes for vehicles and drivers';

comment on column public.lms_routes.route_name is 'Descriptive name for the route';

comment on column public.lms_routes.route_date is 'Date the route is scheduled';

comment on column public.lms_routes.status is 'Current status of the route';

create table public.lms_route_shipments(
  id uuid not null primary key default gen_random_uuid(),
  route_id uuid not null references public.lms_routes(id),
  shipment_id uuid not null references public.lms_shipments(id),
  sequence_number integer not null check (sequence_number > 0),
  delivery_date date not null,
  estimated_delivery timestamptz,
  actual_delivery timestamptz,
  delivery_status public.lms_delivery_status not null,
  signature_required boolean not null default false,
  recipient_signature varchar(100),
  unique (route_id, shipment_id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.lms_route_shipments is 'Shipments assigned to specific delivery routes';

comment on column public.lms_route_shipments.sequence_number is 'Delivery order on the route';

comment on column public.lms_route_shipments.delivery_status is 'Status of delivery attempt';

comment on column public.lms_route_shipments.recipient_signature is 'Name of person who signed for delivery';

create table public.lms_provider_performance(
  id uuid not null primary key default gen_random_uuid(),
  provider_id uuid not null references public.lms_transportation_providers(id),
  shipment_id uuid not null references public.lms_shipments(id),
  transport_leg_id uuid references public.lms_transport_legs(id),
  metric_type public.lms_performance_metric_type not null,
  metric_value decimal(10, 4),
  measurement_date date not null,
  notes text,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.lms_provider_performance is 'Performance metrics tracking for transportation providers';

comment on column public.lms_provider_performance.metric_type is 'Type of performance metric being measured';

comment on column public.lms_provider_performance.metric_value is 'Numeric value of the metric';

comment on column public.lms_provider_performance.measurement_date is 'Date when metric was measured';

create table public.lms_provider_invoices(
  id uuid not null primary key default gen_random_uuid(),
  provider_id uuid not null references public.lms_transportation_providers(id),
  invoice_number varchar(50) not null,
  invoice_date date not null,
  due_date date not null,
  subtotal decimal(10, 2) not null check (subtotal >= 0),
  tax_amount decimal(10, 2) default 0.00 check (tax_amount >= 0),
  total_amount decimal(10, 2) not null check (total_amount >= 0),
  currency varchar(3) not null default 'PHP',
  status public.lms_provider_invoice_status not null,
  payment_date date,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (provider_id, invoice_number)
);

comment on table public.lms_provider_invoices is 'Invoices received from transportation providers';

comment on column public.lms_provider_invoices.invoice_number is 'Provider invoice number';

comment on column public.lms_provider_invoices.subtotal is 'Invoice subtotal before taxes';

comment on column public.lms_provider_invoices.tax_amount is 'Total tax amount';

comment on column public.lms_provider_invoices.total_amount is 'Final invoice total';

comment on column public.lms_provider_invoices.status is 'Current payment status';

create table public.lms_provider_invoice_line_items(
  id uuid not null primary key default gen_random_uuid(),
  provider_invoice_id uuid not null references public.lms_provider_invoices(id),
  transport_leg_id uuid not null references public.lms_transport_legs(id),
  description varchar(500) not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price decimal(10, 2) not null check (unit_price >= 0),
  line_total decimal(10, 2) not null check (line_total >= 0),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.lms_provider_invoice_line_items is 'Individual line items on provider invoices';

comment on column public.lms_provider_invoice_line_items.description is 'Description of service or charge';

comment on column public.lms_provider_invoice_line_items.quantity is 'Quantity of service units';

comment on column public.lms_provider_invoice_line_items.unit_price is 'Price per unit';

comment on column public.lms_provider_invoice_line_items.line_total is 'Total for this line item';

create table public.crm_invoices(
  id uuid not null primary key default gen_random_uuid(),
  invoice_number varchar(50) not null unique,
  company_id uuid references public.crm_companies(id),
  contact_id uuid references public.crm_contacts(id),
  invoice_date date not null,
  due_date date not null,
  subtotal decimal(10, 2) not null check (subtotal >= 0),
  tax_amount decimal(10, 2) not null default 0.00 check (tax_amount >= 0),
  total_amount decimal(10, 2) not null check (total_amount >= 0),
  currency varchar(3) not null default 'PHP',
  status public.crm_invoice_status not null,
  payment_terms varchar(100),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.crm_invoices is 'Customer invoices for shipping services';

comment on column public.crm_invoices.invoice_number is 'Unique invoice identifier';

comment on column public.crm_invoices.subtotal is 'Invoice subtotal before taxes';

comment on column public.crm_invoices.tax_amount is 'Total tax amount';

comment on column public.crm_invoices.total_amount is 'Final invoice total';

comment on column public.crm_invoices.status is 'Current payment status';

comment on column public.crm_invoices.payment_terms is 'Payment terms and conditions';

create table public.crm_invoice_line_items(
  id uuid not null primary key default gen_random_uuid(),
  invoice_id uuid not null references public.crm_invoices(id),
  shipment_id uuid references public.lms_shipments(id),
  description varchar(500) not null,
  quantity decimal(10, 2) not null default 1 check (quantity > 0),
  unit_price decimal(10, 2) not null check (unit_price >= 0),
  line_total decimal(10, 2) generated always as (unit_price * quantity) stored,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.crm_invoice_line_items is 'Individual line items on customer invoices';

comment on column public.crm_invoice_line_items.description is 'Description of service or charge';

comment on column public.crm_invoice_line_items.quantity is 'Quantity of service units';

comment on column public.crm_invoice_line_items.unit_price is 'Price per unit';

comment on column public.crm_invoice_line_items.line_total is 'Calculated total for this line item';

create table public.crm_notifications(
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references public.lms_shipments(id),
  contact_id uuid not null references public.crm_contacts(id),
  notification_type public.crm_notification_type not null,
  channel public.crm_notification_channel not null,
  recipient varchar(320) not null,
  subject varchar(200),
  message text not null,
  sent_at timestamptz,
  delivery_status public.crm_notification_delivery_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table public.crm_notifications is 'Customer notifications for shipment updates';

comment on column public.crm_notifications.notification_type is 'Type of notification sent';

comment on column public.crm_notifications.channel is 'Communication channel used';

comment on column public.crm_notifications.recipient is 'Recipient contact information';

comment on column public.crm_notifications.delivery_status is 'Status of notification delivery';

-- Performance indexes
create index idx_addresses_country on public.lms_addresses(country);

create index idx_addresses_city on public.lms_addresses(city);

create index idx_addresses_type on public.lms_addresses(address_type);

create index idx_shipments_tracking on public.lms_shipments(tracking_number);

create index idx_shipments_status on public.lms_shipments(status);

create index idx_shipments_pickup_date on public.lms_shipments(pickup_date);

create index idx_shipments_delivery_date on public.lms_shipments(delivery_date);

create index idx_shipments_sender_company on public.lms_shipments(sender_company_id);

create index idx_shipments_receiver_company on public.lms_shipments(receiver_company_id);

create index idx_shipments_department on public.lms_shipments(assigned_department_id);

create index idx_packages_shipment on public.lms_packages(shipment_id);

create index idx_tracking_events_shipment on public.lms_tracking_events(shipment_id);

create index idx_tracking_events_timestamp on public.lms_tracking_events(event_timestamp);

create index idx_tracking_events_type on public.lms_tracking_events(event_type);

create index idx_warehouses_code on public.lms_warehouses(code);

create index idx_warehouses_department on public.lms_warehouses(department_id);

create index idx_warehouse_inventories_warehouse on public.lms_warehouse_inventories(warehouse_id);

create index idx_warehouse_inventories_shipment on public.lms_warehouse_inventories(shipment_id);

create index idx_warehouse_inventories_status on public.lms_warehouse_inventories(status);

create index idx_transport_legs_shipment on public.lms_transport_legs(shipment_id);

create index idx_transport_legs_provider on public.lms_transport_legs(provider_id);

create index idx_transport_legs_vehicle on public.lms_transport_legs(vehicle_id);

create index idx_routes_date on public.lms_routes(route_date);

create index idx_routes_driver on public.lms_routes(driver_id);

create index idx_routes_vehicle on public.lms_routes(vehicle_id);

create index idx_provider_invoices_provider on public.lms_provider_invoices(provider_id);

create index idx_provider_invoices_date on public.lms_provider_invoices(invoice_date);

create index idx_provider_invoices_status on public.lms_provider_invoices(status);

create index idx_crm_invoices_company on public.crm_invoices(company_id);

create index idx_crm_invoices_date on public.crm_invoices(invoice_date);

create index idx_crm_invoices_status on public.crm_invoices(status);

create index idx_notifications_shipment on public.crm_notifications(shipment_id);

create index idx_notifications_contact on public.crm_notifications(contact_id);

create index idx_notifications_type on public.crm_notifications(notification_type);

