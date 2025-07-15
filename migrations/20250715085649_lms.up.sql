-- Add up migration script here
create schema lms;

create table lms.addresses (
  id uuid not null primary key default gen_random_uuid(),
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null,
  address_type text not null,
  is_validated boolean not null default false,
  latitude decimal(10,8),
  longitude decimal(11,8),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (latitude,longitude)
);

alter table crm.contacts add column address_id uuid references lms.addresses(id);

alter table crm.companies add column address_id uuid references lms.addresses(id);

create table lms.shipping_services(
  id uuid not null primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  service_type text not null,
  max_weight decimal(10,2),
  max_dimensions jsonb,
  delivery_time_min integer,
  delivery_time_max integer,
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.pricing_zones (
  id uuid not null primary key default gen_random_uuid(),
  name text not null,
  zone_code text not null unique,
  countries jsonb not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.pricing_rates (
  id uuid not null primary key default gen_random_uuid(),
  service_id uuid not null references lms.shipping_services(id),
  origin_zone_id uuid not null references lms.pricing_zones(id),
  destination_zone_id uuid not null references lms.pricing_zones(id),
  weight_min decimal(10,2) not null,
  weight_max decimal(10,2) not null,
  base_rate decimal(10,2) not null,
  per_kg_rate decimal(10,2) not null,
  fuel_surcharge_rate decimal(5,2) default 0.00,
  effective_date date not null,
  expiry_date date,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now(),
  unique (service_id,origin_zone_id,destination_zone_id)
);

create table lms.shipments(
  id uuid not null primary key default gen_random_uuid(),
  tracking_number text not null unique,
  sender_company_id uuid references crm.companies(id),
  sender_contact_id uuid references crm.contacts(id),
  sender_address_id uuid not null references lms.addresses(id),
  receiver_company_id uuid references crm.companies(id),
  receiver_contact_id uuid references crm.contacts(id),
  receiver_address_id uuid not null references lms.addresses(id),
  service_id uuid not null references lms.shipping_services(id),
  assigned_department_id uuid references org.departments(id),
  primary_transport_mode text not null,
  status text not null,
  total_weight decimal(10,2) not null,
  total_value decimal(10,2),
  insurance_amount decimal(10,2),
  shipping_cost decimal(10,2),
  currency text not null default 'PHP',
  pickup_date date,
  delivery_date date,
  estiabled_delivery_date date,
  special_instructions text,
  created_by uuid references auth.users(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.packages (
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  package_number text not null,
  weigth decimal(10,2) not null,
  length decimal(10,2),
  width decimal(10,2),
  height decimal(10,2),
  package_type text not null,
  contents_description text,
  declared_value decimal(10,2),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.tracking_events (
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  event_type text not null,
  event_description text not null,
  event_location text,
  event_timestampt timestamptz not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.warehouses(
  id uuid not null primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  address_id uuid not null references lms.addresses(id),
  warehouse_type text not null,
  capacity integer,
  department_id uuid references org.departments(id),
  is_active boolean not null default true,
  manager_id uuid references auth.users(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.warehouse_inventories(
  id uuid not null primary key default gen_random_uuid(),
  warehouse_id uuid not null references lms.warehouses(id),
  shipment_id uuid not null references lms.shipments(id),
  package_id uuid not null references lms.packages(id),
  location_code text,
  status text not null,
  arrived_at timestamptz,
  departed_at timestamptz,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.transportation_providers (
  id uuid not null primary key default gen_random_uuid(),
  company_name text not null,
  provider_type text not null,
  contact_person text,
  email text,
  phone_number text,
  address_id uuid references lms.addresses(id),
  preferred_by_department_id uuid references org.departments(id),
  api_endpoint text,
  api_key text,
  contract_start_date date,
  contract_end_date date,
  payment_terms text,
  insurance_coverage decimal(15,2),
  performance_rating decimal(3,2),
  is_active boolean not null default true,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.provider_services (
  id uuid not null primary key default gen_random_uuid(),
  provider_id uuid not null references lms.transportation_providers(id),
  service_name text not null,
  service_type text not null,
  transport_mode text not null,
  origin_contries jsonb,
  destination_countries jsonb,
  max_weight decimal(10,2),
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

create table lms.provider_rates (
  id uuid not null primary key default gen_random_uuid(),
  provider_service_id uuid not null references lms.provider_services(id),
  origin_zone_id uuid not null references lms.pricing_zones(id),
  destination_zone_id uuid not null references lms.pricing_zones(id),
  weight_min decimal (10,2) not null,
  weight_max decimal (10,2) not null,
  base_rate decimal (10,2) not null,
  per_kg_rate decimal (10,2) not null,
  fuel_surcharge_rate decimal (5,2) default 0.00,
  currency text not null default 'USD',
  effective_date date not null,
  expiry_date date,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table org.drivers (
  id uuid not null primary key default gen_random_uuid(),
  employee_id text not null unique,
  first_name text not null,
  last_name text not null,
  license_number text not null unique,
  phone_number text not null,
  email text not null unique,
  hire_date date not null,
  status text not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table org.vehicles(
  id uuid not null primary key default gen_random_uuid(),
  vehicle_number text not null unique,
  license_plate text not null unique,
  vehicle_type text not null,
  make text not null,
  model text not null,
  year integer not null,
  capacity_weight decimal(10,2),
  capacity_volume decimal(10,2),
  department_id uuid references org.departments(id),
  warehouse_id uuid references lms.warehouses(id),
  status text not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.transport_legs (
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  leg_sequence integer not null,
  transport_type text not null,
  provider_id uuid references lms.transportation_providers(id),
  provider_service_id uuid references lms.provider_services(id),
  provider_tracking_number text,
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
  cost decimal(10,2),
  currency text default 'PHP',
  status text not null,
  special_instructions text,
  unique(shipment_id,leg_sequence),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.routes (
  id uuid not null primary key default gen_random_uuid(),
  route_name text not null,
  driver_id uuid references org.drivers(id),
  vehicle_id uuid references org.vehicles(id),
  route_date date not null,
  estimated_departure timestamptz,
  actual_departure timestamptz,
  estimated_arrival timestamptz,
  actual_arrival timestamptz,
  status text not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.route_shipments (
  id uuid not null primary key default gen_random_uuid(),
  route_id uuid not null references lms.routes(id),
  shipment_id uuid not null references lms.shipments(id),
  sequence_number integer not null,
  delivery_date text not null,
  estimated_delivery timestamptz,
  actual_delivery timestamptz,
  delivery_status text not null,
  signature_required boolean not null default false,
  recipient_signature text,
  unique(route_id,shipment_id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.provider_performance (
  id uuid not null primary key default gen_random_uuid(),
  provider_id uuid not null references lms.transportation_providers(id),
  shipment_id uuid not null references lms.shipments(id),
  transport_leg_id uuid references lms.transport_legs(id),
  metric_type text not null,
  metric_value decimal(10,4),
  measurement_date date not null,
  notes text,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.provider_invoices (
  id uuid not null primary key default gen_random_uuid(),
  provider_id uuid not null references lms.transportation_providers(id),
  invoice_number text not null,
  invoice_date date not null,
  due_date date not null,
  subtotal decimal(10,2) not null,
  tax_amount decimal(10,2) default 0.00,
  total_amount decimal(10,2) not null,
  currency text not null default 'PHP',
  status text not null,
  payment_date date,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table lms.provider_invoice_line_items (
  id uuid not null primary key default gen_random_uuid(),
  provider_invoice_id uuid not null references lms.provider_invoices(id),
  transport_leg_id uuid not null references lms.transport_legs(id),
  description text not null,
  quantity integer not null default 1,
  unit_price decimal(10,2) not null,
  line_total decimal(10,2) not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table crm.invoices (
  id uuid not null primary key default gen_random_uuid(),
  invoice_number text not null unique,
  company_id uuid references crm.companies(id),
  contact_id uuid references crm.contacts(id),
  invoice_date date not null,
  due_date date not null,
  subtotal decimal(10,2) not null,
  tax_amount decimal(10,2) not null default 0.00,
  total_amount decimal(10,2) not null,
  currency text not null default 'PHP',
  status text not null,
  payment_terms text, 
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table crm.invoice_line_items (
  id uuid not null primary key default gen_random_uuid(),
  invoice_id uuid not null references crm.invoices(id),
  shipment_id uuid references lms.shipments(id),
  description text not null,
  quantity decimal(10,2) not null default 1,
  unit_price decimal(10,2) not null,
  line_total decimal(10,2) generated always as (unit_price * quantity) stored,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

create table crm.notifications (
  id uuid not null primary key default gen_random_uuid(),
  shipment_id uuid not null references lms.shipments(id),
  contact_id uuid not null references crm.contacts(id),
  notification_type text not null,
  channel text not null,
  recipient text not null,
  subject text,
  message text not null,
  sent_at timestamptz,
  delivery_status text not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);