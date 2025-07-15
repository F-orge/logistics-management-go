-- Add up migration script here
create schema crm;

comment on schema crm is 'Customer Relationship Management schema';

create table crm.companies(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(255) not null unique,
  description text,
  email varchar(320),
  website varchar(500),
  industry varchar(100),
  phone_number varchar(20),
  city varchar(100),
  state varchar(100),
  zip_code varchar(20),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.companies is 'Business entities and organizations';

comment on column crm.companies.name is 'Company display name';

comment on column crm.companies.email is 'Primary contact email address';

comment on column crm.companies.website is 'Company website URL';

comment on column crm.companies.industry is 'Business industry classification';

comment on column crm.companies.phone_number is 'Primary contact phone number';

comment on column crm.companies.city is 'Company city location';

comment on column crm.companies.state is 'Company state/province location';

comment on column crm.companies.zip_code is 'Postal/ZIP code';

comment on column crm.companies.description is 'Detailed company description';

create type crm.contact_status as enum(
  'lead',
  'prospect',
  'customer',
  'inactive'
);

comment on type crm.contact_status is 'Customer relationship lifecycle stages';

create table crm.contacts(
  id uuid not null primary key default gen_random_uuid(),
  first_name varchar(100) not null,
  last_name varchar(100) not null,
  email varchar(320) not null unique,
  phone_number varchar(20),
  job_title varchar(150),
  lead_source varchar(100),
  status crm.contact_status not null,
  birth_date date,
  company_id uuid references crm.companies(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.contacts is 'Individual contact persons within companies';

comment on column crm.contacts.first_name is 'Contact first name';

comment on column crm.contacts.last_name is 'Contact last name';

comment on column crm.contacts.email is 'Unique contact email address';

comment on column crm.contacts.phone_number is 'Contact phone number';

comment on column crm.contacts.job_title is 'Professional role or position';

comment on column crm.contacts.lead_source is 'Origin of lead acquisition';

comment on column crm.contacts.status is 'Current relationship status with contact';

comment on column crm.contacts.birth_date is 'Contact birth date for relationship building';

comment on column crm.contacts.company_id is 'Reference to associated company';

create type crm.lead_status as enum(
  'new',
  'qualified',
  'contacted',
  'unqualified'
);

comment on type crm.lead_status is 'Lead qualification and contact stages';

create table crm.leads(
  id uuid not null primary key default gen_random_uuid(),
  first_name varchar(100) not null,
  last_name varchar(100) not null,
  email varchar(320) not null unique,
  phone_number varchar(20),
  company_name varchar(255),
  lead_source varchar(100),
  lead_status crm.lead_status not null,
  lead_score integer not null default 0,
  converted_to_contact_id uuid references crm.contacts(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.leads is 'Potential customers in early sales pipeline stages';

comment on column crm.leads.first_name is 'Lead first name';

comment on column crm.leads.last_name is 'Lead last name';

comment on column crm.leads.email is 'Unique lead email address';

comment on column crm.leads.phone_number is 'Lead contact phone number';

comment on column crm.leads.company_name is 'Associated company name';

comment on column crm.leads.lead_source is 'Channel or method of lead acquisition';

comment on column crm.leads.lead_status is 'Current stage in lead qualification process';

comment on column crm.leads.lead_score is 'Numerical score indicating lead quality (0-100)';

comment on column crm.leads.converted_to_contact_id is 'Reference to contact if lead was converted';

create type crm.opportunity_stage as enum(
  'prospecting',
  'qualification',
  'proposal',
  'closed-won',
  'closed-lost'
);

comment on type crm.opportunity_stage is 'Sales opportunity progression stages';

create table crm.opportunities(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(255) not null,
  company_id uuid references crm.companies(id),
  primary_contact_id uuid references crm.contacts(id),
  stage crm.opportunity_stage not null,
  amount decimal(10, 2) not null default 0.00,
  close_date date,
  probability decimal(5, 2) not null default 0.00,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.opportunities is 'Sales opportunities and deals in the pipeline';

comment on column crm.opportunities.name is 'Descriptive name for the opportunity';

comment on column crm.opportunities.company_id is 'Reference to the company for this opportunity';

comment on column crm.opportunities.primary_contact_id is 'Main contact person for this opportunity';

comment on column crm.opportunities.stage is 'Current stage in the sales process';

comment on column crm.opportunities.amount is 'Expected revenue amount in base currency';

comment on column crm.opportunities.close_date is 'Expected or actual closing date';

comment on column crm.opportunities.probability is 'Percentage probability of closing (0-100)';

create type crm.interaction_type as enum(
  'call',
  'email',
  'meeting',
  'chat',
  'note'
);

comment on type crm.interaction_type is 'Types of customer interactions and touchpoints';

create table crm.interactions(
  id uuid not null primary key default gen_random_uuid(),
  type crm.interaction_type not null,
  subject varchar(255),
  description text,
  interaction_date timestamp with time zone not null,
  contact_id uuid references crm.contacts(id),
  opportunity_id uuid references crm.opportunities(id),
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.interactions is 'Customer interactions and communication history';

comment on column crm.interactions.type is 'Type of interaction (call, email, meeting, etc.)';

comment on column crm.interactions.subject is 'Brief summary or subject of the interaction';

comment on column crm.interactions.description is 'Detailed notes about the interaction';

comment on column crm.interactions.interaction_date is 'When the interaction occurred';

comment on column crm.interactions.contact_id is 'Associated contact person';

comment on column crm.interactions.opportunity_id is 'Associated sales opportunity';

create type crm.campaign_status as enum(
  'planned',
  'active',
  'completed',
  'paused'
);

comment on type crm.campaign_status is 'Marketing campaign lifecycle stages';

create table crm.campaigns(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(255) not null,
  description text,
  start_date date not null,
  end_date date,
  budget decimal(10, 2) default 0.00,
  status crm.campaign_status not null,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.campaigns is 'Marketing campaigns and promotional activities';

comment on column crm.campaigns.name is 'Campaign name or title';

comment on column crm.campaigns.description is 'Detailed campaign description';

comment on column crm.campaigns.start_date is 'Campaign start date';

comment on column crm.campaigns.end_date is 'Campaign end date';

comment on column crm.campaigns.budget is 'Allocated budget for the campaign';

comment on column crm.campaigns.status is 'Current campaign status';

create type crm.campaign_contacts_status as enum(
  'sent',
  'opened',
  'clicked',
  'responded',
  'unsubscribe'
);

comment on type crm.campaign_contacts_status is 'Campaign contact interaction status tracking';

create table crm.campaign_contacts(
  id uuid not null primary key default gen_random_uuid(),
  campaign_id uuid not null references crm.campaigns(id),
  contact_id uuid not null references crm.contacts(id),
  status crm.campaign_contacts_status not null,
  interaction_date timestamp with time zone,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.campaign_contacts is 'Junction table tracking contact participation in marketing campaigns';

comment on column crm.campaign_contacts.campaign_id is 'Reference to the marketing campaign';

comment on column crm.campaign_contacts.contact_id is 'Reference to the contact person';

comment on column crm.campaign_contacts.status is 'Current interaction status with campaign';

comment on column crm.campaign_contacts.interaction_date is 'When the last interaction occurred';

create type crm.case_status as enum(
  'open',
  'in-progress',
  'pending-customer',
  'closed'
);

comment on type crm.case_status is 'Customer support case status tracking';

create type crm.case_priority as enum(
  'low',
  'medium',
  'high',
  'critical'
);

comment on type crm.case_priority is 'Customer support case priority levels';

create table crm.cases(
  id uuid not null primary key default gen_random_uuid(),
  subject varchar(255) not null,
  description text not null,
  status crm.case_status not null,
  priority crm.case_priority not null,
  contact_id uuid references crm.contacts(id),
  closed_at timestamp with time zone,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.cases is 'Customer support cases and issue tracking';

comment on column crm.cases.subject is 'Brief summary of the case';

comment on column crm.cases.description is 'Detailed case description';

comment on column crm.cases.status is 'Current case status';

comment on column crm.cases.priority is 'Case priority level';

comment on column crm.cases.contact_id is 'Associated contact who reported the case';

comment on column crm.cases.closed_at is 'When the case was closed';

create table crm.products(
  id uuid not null primary key default gen_random_uuid(),
  name varchar(255) not null unique,
  description text,
  price decimal(10, 2) not null,
  sku varchar(100) unique,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.products is 'Product catalog for sales opportunities';

comment on column crm.products.name is 'Product name or title';

comment on column crm.products.description is 'Detailed product description';

comment on column crm.products.price is 'Base price for the product';

comment on column crm.products.sku is 'Stock Keeping Unit identifier';

create table crm.opportunity_products(
  id uuid not null primary key default gen_random_uuid(),
  opportunity_id uuid not null references crm.opportunities(id),
  product_id uuid not null references crm.products(id),
  quantity decimal(10, 2) not null default 1,
  unit_price decimal(10, 2) not null,
  total_price decimal(10, 2) generated always as (quantity * unit_price) stored,
  created timestamp with time zone not null default now(),
  updated timestamp with time zone not null default now()
);

comment on table crm.opportunity_products is 'Junction table linking opportunities with products and quantities';

comment on column crm.opportunity_products.opportunity_id is 'Reference to the sales opportunity';

comment on column crm.opportunity_products.product_id is 'Reference to the product';

comment on column crm.opportunity_products.quantity is 'Number of units for this product in the opportunity';

comment on column crm.opportunity_products.unit_price is 'Price per unit for this product in this opportunity';

comment on column crm.opportunity_products.total_price is 'Calculated total price (quantity × unit_price)';

-- Performance indexes for frequently queried columns
create index idx_crm_companies_name on crm.companies(name);

create index idx_crm_companies_industry on crm.companies(industry);

create index idx_crm_companies_email on crm.companies(email);

create index idx_crm_contacts_email on crm.contacts(email);

create index idx_crm_contacts_company_id on crm.contacts(company_id);

create index idx_crm_contacts_status on crm.contacts(status);

create index idx_crm_contacts_name on crm.contacts(first_name, last_name);

create index idx_crm_leads_email on crm.leads(email);

create index idx_crm_leads_status on crm.leads(lead_status);

create index idx_crm_leads_score on crm.leads(lead_score);

create index idx_crm_leads_converted on crm.leads(converted_to_contact_id);

create index idx_crm_opportunities_company_id on crm.opportunities(company_id);

create index idx_crm_opportunities_contact_id on crm.opportunities(primary_contact_id);

create index idx_crm_opportunities_stage on crm.opportunities(stage);

create index idx_crm_opportunities_close_date on crm.opportunities(close_date);

create index idx_crm_interactions_contact_id on crm.interactions(contact_id);

create index idx_crm_interactions_opportunity_id on crm.interactions(opportunity_id);

create index idx_crm_interactions_date on crm.interactions(interaction_date);

create index idx_crm_interactions_type on crm.interactions(type);

create index idx_crm_campaigns_status on crm.campaigns(status);

create index idx_crm_campaigns_start_date on crm.campaigns(start_date);

create index idx_crm_campaign_contacts_campaign_id on crm.campaign_contacts(campaign_id);

create index idx_crm_campaign_contacts_contact_id on crm.campaign_contacts(contact_id);

create index idx_crm_campaign_contacts_status on crm.campaign_contacts(status);

create index idx_crm_cases_contact_id on crm.cases(contact_id);

create index idx_crm_cases_status on crm.cases(status);

create index idx_crm_cases_priority on crm.cases(priority);

create index idx_crm_products_name on crm.products(name);

create index idx_crm_products_sku on crm.products(sku);

create index idx_crm_opportunity_products_opportunity_id on crm.opportunity_products(opportunity_id);

create index idx_crm_opportunity_products_product_id on crm.opportunity_products(product_id);

-- Business validation constraints
alter table crm.companies
  add constraint check_companies_email_format check (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' or email is null),
  add constraint check_companies_website_format check (website ~ '^https?://' or website is null),
  add constraint check_companies_name_not_empty check (length(trim(name)) > 0);

alter table crm.contacts
  add constraint check_contacts_email_format check (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  add constraint check_contacts_names_not_empty check (length(trim(first_name)) > 0 and length(trim(last_name)) > 0);

alter table crm.leads
  add constraint check_leads_email_format check (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  add constraint check_leads_score_range check (lead_score >= 0 and lead_score <= 100),
  add constraint check_leads_names_not_empty check (length(trim(first_name)) > 0 and length(trim(last_name)) > 0);

alter table crm.opportunities
  add constraint check_opportunities_amount_positive check (amount >= 0),
  add constraint check_opportunities_probability_range check (probability >= 0 and probability <= 100),
  add constraint check_opportunities_name_not_empty check (length(trim(name)) > 0);

alter table crm.campaigns
  add constraint check_campaigns_date_order check (end_date is null or end_date >= start_date),
  add constraint check_campaigns_budget_positive check (budget >= 0),
  add constraint check_campaigns_name_not_empty check (length(trim(name)) > 0);

alter table crm.cases
  add constraint check_cases_subject_not_empty check (length(trim(subject)) > 0),
  add constraint check_cases_description_not_empty check (length(trim(description)) > 0);

alter table crm.products
  add constraint check_products_price_positive check (price > 0),
  add constraint check_products_name_not_empty check (length(trim(name)) > 0);

alter table crm.opportunity_products
  add constraint check_opportunity_products_quantity_positive check (quantity > 0),
  add constraint check_opportunity_products_unit_price_positive check (unit_price > 0);

