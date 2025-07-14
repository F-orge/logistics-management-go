-- Add up migration script here
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