-- Add up migration script here
create table payments (
  id uuid not null primary key default gen_random_uuid(),
  invoice uuid not null references invoices(id),
  payment_date timestamptz not null,
  amount_paid decimal not null check (amount_paid > 0.01),
  payment_method text not null check (payment_method in ('credit-card','bank-transfer','ach','check','cash','other')),
  transaction_id text not null unique,
  status text not null check (status in ('pending','completed','failed','refunded')) default 'completed',
  notes text,
  created timestamptz not null default now(),
  updated timestamptz not null default now()
)