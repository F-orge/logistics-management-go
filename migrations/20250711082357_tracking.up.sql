-- Add up migration script here
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