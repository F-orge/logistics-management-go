-- Add up migration script here
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