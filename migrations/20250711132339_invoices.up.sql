-- Add up migration script here
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