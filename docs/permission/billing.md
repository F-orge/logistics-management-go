# Billing Domain Permissions

## billing_rate_cards

- create: admin, pricing analyst
- read: admin, pricing analyst, accounts manager, finance manager
- update: admin, pricing analyst
- delete: admin, pricing analyst

## billing_rate_rules

- create: admin, pricing analyst
- read: admin, pricing analyst, accounts manager, finance manager
- update: admin, pricing analyst
- delete: admin, pricing analyst

## billing_surcharges

- create: admin, pricing analyst
- read: admin, pricing analyst, accounts manager, finance manager
- update: admin, pricing analyst
- delete: admin, pricing analyst

## billing_quotes

- create: admin, accounts manager, sales manager, client
- read: admin, accounts manager, sales manager, client (self)
- update: admin, accounts manager, sales manager
- delete: admin, accounts manager

## billing_client_accounts

- create: admin, accounts manager
- read: admin, accounts manager, finance manager, client (self)
- update: admin, accounts manager
- delete: admin, accounts manager

## billing_account_transactions

- create: admin, accounts manager, system (auto)
- read: admin, accounts manager, finance manager, client (self)
- update: admin, accounts manager
- delete: admin, accounts manager

## billing_invoices

- create: admin, accounts manager, system (auto)
- read: admin, accounts manager, finance manager, client (self)
- update: admin, accounts manager
- delete: admin, accounts manager

## billing_invoice_line_items

- create: admin, accounts manager, system (auto)
- read: admin, accounts manager, finance manager, client (self)
- update: admin, accounts manager
- delete: admin, accounts manager

## billing_payments

- create: admin, accounts manager, client (self), system (auto)
- read: admin, accounts manager, finance manager, client (self)
- update: admin, accounts manager
- delete: admin, accounts manager

## billing_disputes

- create: client (self), admin, accounts manager
- read: admin, accounts manager, finance manager, client (self)
- update: admin, accounts manager
- delete: admin, accounts manager

## billing_credit_notes

- create: admin, accounts manager, system (auto)
- read: admin, accounts manager, finance manager, client (self)
- update: admin, accounts manager
- delete: admin, accounts manager

## billing_documents

- create: admin, accounts manager, logistics coordinator, system (auto)
- read: admin, accounts manager, finance manager, logistics coordinator, client
  (self)
- update: admin, accounts manager, logistics coordinator
- delete: admin, accounts manager, logistics coordinator

## billing_accounting_sync_log

- create: system (auto), admin, accountant
- read: admin, accountant, finance manager
- update: admin, accountant
- delete: admin, accountant

_Note: "client (self)" means the client can only access their own records.
"system (auto)" refers to automated system actions (e.g., invoice generation,
payment processing, accounting sync). "admin" has full access for support and
management._
