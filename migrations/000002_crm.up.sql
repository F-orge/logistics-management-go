-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create CRM schema
create schema if not exists crm;

-- Create all enum types first
create type crm.lead_status as enum(
  'new',
  'contacted',
  'qualified',
  'unqualified',
  'converted'
);

create type crm.lead_source as enum(
  'website',
  'referral',
  'social-media',
  'email-campaign',
  'cold-call',
  'event',
  'advertisement',
  'partner',
  'other'
);

create type crm.product_type as enum(
  'service',
  'good',
  'digital',
  'subscription'
);

create type crm.opportunity_source as enum(
  'website',
  'referral',
  'social-media',
  'email-campaign',
  'cold-call',
  'event',
  'advertisement',
  'partner',
  'existing-customer',
  'other'
);

create type crm.opportunity_stage as enum(
  'prospecting',
  'qualification',
  'need-analysis',
  'demo',
  'proposal',
  'negotiation',
  'closed-won',
  'closed-lost'
);

create type crm.case_status as enum(
  'new',
  'in-progress',
  'waiting-for-customer',
  'waiting-for-internal',
  'escalated',
  'resolved',
  'closed',
  'cancelled'
);

create type crm.case_priority as enum(
  'critical',
  'high',
  'medium',
  'low'
);

create type crm.case_type as enum(
  'question',
  'problem',
  'complaint',
  'feature-request',
  'bug-report',
  'technical-support'
);

create type crm.interaction_type as enum(
  'call',
  'meeting',
  'text',
  'email'
);

create type crm.invoice_status as enum(
  'draft',
  'sent',
  'paid',
  'overdue',
  'cancelled'
);

create type crm.payment_method as enum(
  'credit-card',
  'bank-transfer',
  'cash',
  'check',
  'paypal',
  'stripe',
  'wire-transfer'
);

create type crm.record_type as enum(
  'companies',
  'contacts',
  'leads',
  'opportunities',
  'cases',
  'interactions',
  'campaigns',
  'products',
  'invoices'
);

-- Products
create table crm.products(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  sku varchar(100) unique,
  price numeric(10, 2) not null,
  type crm.product_type default 'good',
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table crm.products is 'Manages the catalog of goods or services that can be sold to customers.';

comment on column crm.products.id is 'Primary key';

comment on column crm.products.name is 'Name of the product or service.';

comment on column crm.products.sku is 'Stock keeping unit identifier.';

comment on column crm.products.price is 'Cost of the product.';

comment on column crm.products.type is 'Type of offering (e.g., service, good).';

comment on column crm.products.description is 'Description or details about the product.';

comment on column crm.products.created_at is 'timestamptz when the product was created.';

comment on column crm.products.updated_at is 'timestamptz when the product was last updated.';

-- Campaigns
create table crm.campaigns(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  budget numeric(15, 2),
  start_date date,
  end_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table crm.campaigns is 'Tracks marketing initiatives to measure their effectiveness in generating leads and opportunities.';

comment on column crm.campaigns.id is 'Primary key';

comment on column crm.campaigns.name is 'Campaign title.';

comment on column crm.campaigns.budget is 'Allocated budget for the campaign.';

comment on column crm.campaigns.start_date is 'Campaign start date.';

comment on column crm.campaigns.end_date is 'Campaign end date.';

comment on column crm.campaigns.created_at is 'timestamptz when the campaign was created.';

comment on column crm.campaigns.updated_at is 'timestamptz when the campaign was last updated.';

-- Companies
create table crm.companies(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  street varchar(255),
  city varchar(255),
  state varchar(255),
  postal_code varchar(20),
  country varchar(100),
  phone_number varchar(20),
  industry varchar(100),
  website varchar(255),
  annual_revenue numeric(15, 2),
  owner_id text references "user"(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table crm.companies is 'Stores information about customer organizations. This is a central entity for linking contacts, opportunities, and cases.';

comment on column crm.companies.id is 'Primary key';

comment on column crm.companies.name is 'Company name.';

comment on column crm.companies.street is 'Street address.';

comment on column crm.companies.city is 'City location.';

comment on column crm.companies.state is 'State or province.';

comment on column crm.companies.postal_code is 'Postal or ZIP code.';

comment on column crm.companies.country is 'Country of operation.';

comment on column crm.companies.phone_number is 'Company contact number.';

comment on column crm.companies.industry is 'Sector or industry type.';

comment on column crm.companies.website is 'Company website URL.';

comment on column crm.companies.annual_revenue is 'Yearly revenue figure.';

comment on column crm.companies.owner_id is 'Reference to the user who owns the company record.';

comment on column crm.companies.created_at is 'timestamptz when the company was created.';

comment on column crm.companies.updated_at is 'timestamptz when the company was last updated.';

-- Contacts
create table crm.contacts(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  email varchar(255) not null,
  phone_number varchar(20),
  job_title varchar(100),
  company_id uuid references crm.companies(id),
  owner_id text not null references "user"(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table crm.contacts is 'Represents individuals associated with companies, serving as the primary points of interaction.';

comment on column crm.contacts.id is 'Primary key';

comment on column crm.contacts.name is 'Full name of the contact.';

comment on column crm.contacts.email is 'Contact''s email address.';

comment on column crm.contacts.phone_number is 'Contact''s telephone number.';

comment on column crm.contacts.job_title is 'Job designation or position.';

comment on column crm.contacts.company_id is 'Identifier linking to the associated company.';

comment on column crm.contacts.owner_id is 'Reference to the user responsible for the contact.';

comment on column crm.contacts.created_at is 'timestamptz when the contact was created.';

comment on column crm.contacts.updated_at is 'timestamptz when the contact was last updated.';

-- Opportunities
create table crm.opportunities(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  stage crm.opportunity_stage,
  deal_value numeric(15, 2),
  probability real,
  expected_close_date date,
  lost_reason text,
  source crm.opportunity_source,
  owner_id text not null references "user"(id),
  contact_id uuid references crm.contacts(id),
  company_id uuid references crm.companies(id),
  campaign_id uuid references crm.campaigns(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table crm.opportunities is 'Represents potential sales deals, tracked through various stages of the sales pipeline.';

comment on column crm.opportunities.id is 'Primary key';

comment on column crm.opportunities.name is 'Opportunity title.';

comment on column crm.opportunities.stage is 'Current stage in the sales pipeline.';

comment on column crm.opportunities.deal_value is 'Potential deal amount.';

comment on column crm.opportunities.probability is 'Likelihood of closing, represented as a fraction or percentage.';

comment on column crm.opportunities.expected_close_date is 'Anticipated date for closing the opportunity.';

comment on column crm.opportunities.lost_reason is 'Explanation for why the opportunity was lost.';

comment on column crm.opportunities.source is 'Origin of the opportunity (e.g., website, referral).';

comment on column crm.opportunities.owner_id is 'User responsible for the opportunity.';

comment on column crm.opportunities.contact_id is 'Associated contact.';

comment on column crm.opportunities.company_id is 'Linked company record.';

comment on column crm.opportunities.campaign_id is 'Related campaign.';

comment on column crm.opportunities.created_at is 'timestamptz when the opportunity was created.';

comment on column crm.opportunities.updated_at is 'timestamptz when the opportunity was last updated.';

-- Leads
create table crm.leads(
  id uuid primary key default gen_random_uuid(),
  name varchar(255) not null,
  email varchar(255) not null,
  lead_source crm.lead_source,
  status crm.lead_status default 'new',
  lead_score integer,
  owner_id text not null references "user"(id),
  campaign_id uuid references crm.campaigns(id),
  converted_at timestamptz,
  converted_contact_id uuid references crm.contacts(id),
  converted_company_id uuid references crm.companies(id),
  converted_opportunity_id uuid references crm.opportunities(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table crm.leads is 'Captures potential customers who have shown interest but are not yet qualified.';

comment on column crm.leads.id is 'Primary key';

comment on column crm.leads.name is 'Lead''s full name.';

comment on column crm.leads.email is 'Lead''s email address.';

comment on column crm.leads.lead_source is 'Origin of the lead information.';

comment on column crm.leads.status is 'Current qualification status.';

comment on column crm.leads.lead_score is 'Numerical score reflecting lead quality.';

comment on column crm.leads.owner_id is 'User responsible for the lead.';

comment on column crm.leads.campaign_id is 'Associated marketing campaign.';

comment on column crm.leads.converted_at is 'timestamptz when the lead was converted.';

comment on column crm.leads.converted_contact_id is 'Reference to the created contact upon conversion.';

comment on column crm.leads.converted_company_id is 'Reference to the company record created upon conversion.';

comment on column crm.leads.converted_opportunity_id is 'Reference to the opportunity created upon conversion.';

comment on column crm.leads.created_at is 'timestamptz when the lead was created.';

comment on column crm.leads.updated_at is 'timestamptz when the lead was last updated.';

-- Cases
create table crm.cases(
  id uuid primary key default gen_random_uuid(),
  case_number varchar(50) unique not null,
  status crm.case_status default 'new',
  priority crm.case_priority default 'medium',
  type crm.case_type,
  owner_id text not null references "user"(id),
  contact_id uuid references crm.contacts(id),
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table crm.cases is 'Tracks customer support issues or requests from creation to resolution.';

comment on column crm.cases.id is 'Primary key';

comment on column crm.cases.case_number is 'Unique number assigned to the case.';

comment on column crm.cases.status is 'Current case status.';

comment on column crm.cases.priority is 'Level of urgency (e.g., low, medium, high).';

comment on column crm.cases.type is 'Type of case (e.g., question, problem).';

comment on column crm.cases.owner_id is 'User responsible for handling the case.';

comment on column crm.cases.contact_id is 'Linked contact for context.';

comment on column crm.cases.description is 'Detailed description of the issue.';

comment on column crm.cases.created_at is 'timestamptz when the case was created.';

comment on column crm.cases.updated_at is 'timestamptz when the case was last updated.';

-- Interactions
create table crm.interactions(
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references crm.contacts(id),
  user_id text not null references "user"(id),
  case_id uuid references crm.cases(id),
  type crm.interaction_type,
  outcome varchar(128),
  notes text,
  interaction_date timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table crm.interactions is 'Logs all communications and activities with contacts, providing a complete history of customer engagement.';

comment on column crm.interactions.id is 'Primary key';

comment on column crm.interactions.contact_id is 'Linked contact for the interaction.';

comment on column crm.interactions.user_id is 'User who performed the interaction.';

comment on column crm.interactions.case_id is 'Associated case (if applicable).';

comment on column crm.interactions.type is 'Type of interaction (e.g., call, meeting, email).';

comment on column crm.interactions.outcome is 'Result of the interaction (e.g., meeting scheduled).';

comment on column crm.interactions.notes is 'Additional details or comments.';

comment on column crm.interactions.interaction_date is 'Date and time of the interaction.';

comment on column crm.interactions.created_at is 'timestamptz when the interaction was created.';

comment on column crm.interactions.updated_at is 'timestamptz when the interaction was last updated.';

-- Opportunity Products
create table crm.opportunity_products(
  opportunity_id uuid not null references crm.opportunities(id),
  product_id uuid not null references crm.products(id),
  quantity integer not null,
  primary key (opportunity_id, product_id)
);

comment on table crm.opportunity_products is 'Links products from the catalog to specific sales opportunities, detailing what is being sold.';

comment on column crm.opportunity_products.opportunity_id is 'Identifier linking to the related opportunity.';

comment on column crm.opportunity_products.product_id is 'Identifier linking to the product.';

comment on column crm.opportunity_products.quantity is 'Number of units associated with the opportunity.';

-- Invoices
create table crm.invoices(
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid references crm.opportunities(id),
  status crm.invoice_status default 'draft',
  total numeric(15, 2),
  issue_date date,
  due_date date,
  sent_at timestamptz,
  paid_at timestamptz,
  payment_method crm.payment_method,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table crm.invoices is 'Generates and tracks billing records for products or services sold in an opportunity.';

comment on column crm.invoices.id is 'Primary key';

comment on column crm.invoices.opportunity_id is 'Associated sales opportunity.';

comment on column crm.invoices.status is 'Current status of the invoice (e.g., draft, sent, paid).';

comment on column crm.invoices.total is 'Total amount billed.';

comment on column crm.invoices.issue_date is 'Date on which the invoice was issued.';

comment on column crm.invoices.due_date is 'Payment due date.';

comment on column crm.invoices.sent_at is 'timestamptz when the invoice was sent.';

comment on column crm.invoices.paid_at is 'timestamptz when payment was received.';

comment on column crm.invoices.payment_method is 'Method used for payment.';

comment on column crm.invoices.created_at is 'timestamptz when the invoice was created.';

comment on column crm.invoices.updated_at is 'timestamptz when the invoice was last updated.';

-- Invoice Items
create table crm.invoice_items(
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references crm.invoices(id),
  product_id uuid not null references crm.products(id),
  quantity integer not null,
  price numeric(10, 2) not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table crm.invoice_items is 'Details the line items on an invoice, including products, quantities, and prices.';

comment on column crm.invoice_items.id is 'Primary key';

comment on column crm.invoice_items.invoice_id is 'Linked invoice record.';

comment on column crm.invoice_items.product_id is 'Associated product for the line item.';

comment on column crm.invoice_items.quantity is 'Quantity of the product.';

comment on column crm.invoice_items.price is 'Price per unit for the product.';

comment on column crm.invoice_items.created_at is 'timestamptz when the invoice item was created.';

comment on column crm.invoice_items.updated_at is 'timestamptz when the invoice item was last updated.';

-- Notifications
create table crm.notifications(
  id uuid primary key default gen_random_uuid(),
  user_id text not null references "user"(id),
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  link varchar(255)
);

comment on table crm.notifications is 'Provides an in-app system for alerting users about important events, such as new lead assignments.';

comment on column crm.notifications.id is 'Primary key';

comment on column crm.notifications.user_id is 'User receiving the notification.';

comment on column crm.notifications.message is 'Notification content.';

comment on column crm.notifications.is_read is 'Boolean indicating if the notification has been read.';

comment on column crm.notifications.created_at is 'timestamptz when the notification was created.';

comment on column crm.notifications.updated_at is 'timestamptz when the notification was last updated.';

comment on column crm.notifications.link is 'URL or path for further action/reference.';

-- Attachments
create table crm.attachments(
  id uuid primary key default gen_random_uuid(),
  file_name varchar(255) not null,
  file_path varchar(500) not null,
  mime_type varchar(100),
  record_id uuid,
  record_type crm.record_type,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

comment on table crm.attachments is 'Allows files to be attached to various records (e.g., contacts, opportunities, cases) for additional context.';

comment on column crm.attachments.id is 'Primary key';

comment on column crm.attachments.file_name is 'Name of the attached file.';

comment on column crm.attachments.file_path is 'Storage path for the file.';

comment on column crm.attachments.mime_type is 'File MIME type (e.g., image/png, application/pdf).';

comment on column crm.attachments.record_id is 'Identifier for the record the attachment is associated with.';

comment on column crm.attachments.record_type is 'Type of record (polymorphic).';

comment on column crm.attachments.created_at is 'timestamptz when the attachment was created.';

comment on column crm.attachments.updated_at is 'timestamptz when the attachment was last updated.';

-- Create indexes for performance
create index idx_crm_products_sku on crm.products(sku);

create index idx_crm_products_type on crm.products(type);

create index idx_crm_products_name on crm.products(name);

create index idx_crm_campaigns_start_date on crm.campaigns(start_date);

create index idx_crm_campaigns_end_date on crm.campaigns(end_date);

create index idx_crm_campaigns_name on crm.campaigns(name);

create index idx_crm_companies_name on crm.companies(name);

create index idx_crm_companies_industry on crm.companies(industry);

create index idx_crm_companies_owner_id on crm.companies(owner_id);

create index idx_crm_companies_country on crm.companies(country);

create index idx_crm_contacts_email on crm.contacts(email);

create index idx_crm_contacts_company_id on crm.contacts(company_id);

create index idx_crm_contacts_owner_id on crm.contacts(owner_id);

create index idx_crm_contacts_name on crm.contacts(name);

create index idx_crm_opportunities_stage on crm.opportunities(stage);

create index idx_crm_opportunities_owner_id on crm.opportunities(owner_id);

create index idx_crm_opportunities_company_id on crm.opportunities(company_id);

create index idx_crm_opportunities_contact_id on crm.opportunities(contact_id);

create index idx_crm_opportunities_campaign_id on crm.opportunities(campaign_id);

create index idx_crm_opportunities_expected_close_date on crm.opportunities(expected_close_date);

create index idx_crm_opportunities_source on crm.opportunities(source);

create index idx_crm_leads_status on crm.leads(status);

create index idx_crm_leads_lead_source on crm.leads(lead_source);

create index idx_crm_leads_owner_id on crm.leads(owner_id);

create index idx_crm_leads_campaign_id on crm.leads(campaign_id);

create index idx_crm_leads_email on crm.leads(email);

create index idx_crm_leads_converted_at on crm.leads(converted_at);

create index idx_crm_cases_status on crm.cases(status);

create index idx_crm_cases_priority on crm.cases(priority);

create index idx_crm_cases_type on crm.cases(type);

create index idx_crm_cases_owner_id on crm.cases(owner_id);

create index idx_crm_cases_contact_id on crm.cases(contact_id);

create index idx_crm_cases_case_number on crm.cases(case_number);

create index idx_crm_interactions_contact_id on crm.interactions(contact_id);

create index idx_crm_interactions_user_id on crm.interactions(user_id);

create index idx_crm_interactions_case_id on crm.interactions(case_id);

create index idx_crm_interactions_type on crm.interactions(type);

create index idx_crm_interactions_interaction_date on crm.interactions(interaction_date);

create index idx_crm_opportunity_products_opportunity_id on crm.opportunity_products(opportunity_id);

create index idx_crm_opportunity_products_product_id on crm.opportunity_products(product_id);

create index idx_crm_invoices_opportunity_id on crm.invoices(opportunity_id);

create index idx_crm_invoices_status on crm.invoices(status);

create index idx_crm_invoices_issue_date on crm.invoices(issue_date);

create index idx_crm_invoices_due_date on crm.invoices(due_date);

create index idx_crm_invoice_items_invoice_id on crm.invoice_items(invoice_id);

create index idx_crm_invoice_items_product_id on crm.invoice_items(product_id);

create index idx_crm_notifications_user_id on crm.notifications(user_id);

create index idx_crm_notifications_is_read on crm.notifications(is_read);

create index idx_crm_notifications_created_at on crm.notifications(created_at);

create index idx_crm_attachments_record on crm.attachments(record_type, record_id);

create index idx_crm_attachments_mime_type on crm.attachments(mime_type);

