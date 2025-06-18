-- Add up migration script here
create table invoices (
  id uuid not null primary key default gen_random_uuid(),
  invoice_number text not null unique,
  "order" uuid not null references orders(id),
  customer uuid not null references companies(id),
  invoice_date timestamptz not null,
  due_date timestamptz not null,
  total_amount decimal not null check (total_amount >= 0),
  status text not null check (status in ('draft','sent','paid','partially-paid','overdue','void')) default 'draft',
  invoice_pdf_url text,
  created timestamptz not null default now(),
  updated timestamptz not null default now()
);