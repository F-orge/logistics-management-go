-- Add up migration script here
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