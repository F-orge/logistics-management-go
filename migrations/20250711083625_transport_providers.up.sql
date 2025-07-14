-- Add up migration script here
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