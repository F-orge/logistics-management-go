-- Add up migration script here
create table routes (
  id uuid not null primary key default gen_random_uuid(),
  name text not null,
  planned_start_time timestamptz,
  planned_end_time timestamptz,
  status text not null check (status in ('planned','in-progress','completed','delayed','cancelled')),
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

create table shipments_on_route(
  route uuid not null references routes(id),
  shipment uuid not null references shipments(id)
);

create table route_segments(
  id uuid not null primary key default gen_random_uuid(),
  route uuid not null references routes(id),
  sequence_number integer not null check (sequence_number >= 0),
  segment_type text not null check (segment_type in ('start-point','pickup','waypoint','delivery','end-point')),
  address text,
  longitude decimal not null,
  latitude decimal not null,
  instructions text,
  estimated_arrival_time timestamptz,
  actual_arrival_time timestamptz,
  estimated_departure_time timestamptz,
  actual_departure_time timestamptz,
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);

