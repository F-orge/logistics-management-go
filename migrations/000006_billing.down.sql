-- Drop indexes
drop index if exists idx_billing_accounting_sync_log_external_system;

drop index if exists idx_billing_accounting_sync_log_status;

drop index if exists idx_billing_accounting_sync_log_record;

drop index if exists idx_billing_documents_type;

drop index if exists idx_billing_documents_record;

drop index if exists idx_billing_credit_notes_dispute_id;

drop index if exists idx_billing_credit_notes_invoice_id;

drop index if exists idx_billing_disputes_status;

drop index if exists idx_billing_disputes_client_id;

drop index if exists idx_billing_disputes_line_item_id;

drop index if exists idx_billing_payments_payment_date;

drop index if exists idx_billing_payments_status;

drop index if exists idx_billing_payments_invoice_id;

drop index if exists idx_billing_invoice_line_items_source;

drop index if exists idx_billing_invoice_line_items_invoice_id;

drop index if exists idx_billing_invoices_due_date;

drop index if exists idx_billing_invoices_issue_date;

drop index if exists idx_billing_invoices_status;

drop index if exists idx_billing_invoices_client_id;

drop index if exists idx_billing_account_transactions_date;

drop index if exists idx_billing_account_transactions_type;

drop index if exists idx_billing_account_transactions_client_account_id;

drop index if exists idx_billing_client_accounts_client_id;

drop index if exists idx_billing_quotes_expires_at;

drop index if exists idx_billing_quotes_status;

drop index if exists idx_billing_quotes_client_id;

drop index if exists idx_billing_surcharges_active;

drop index if exists idx_billing_surcharges_type;

drop index if exists idx_billing_rate_rules_active;

drop index if exists idx_billing_rate_rules_condition;

drop index if exists idx_billing_rate_rules_rate_card_id;

drop index if exists idx_billing_rate_cards_valid_dates;

drop index if exists idx_billing_rate_cards_active;

drop index if exists idx_billing_rate_cards_service_type;

-- Drop tables in reverse dependency order
drop table if exists billing.accounting_sync_log;

drop table if exists billing.documents;

drop table if exists billing.credit_notes;

drop table if exists billing.disputes;

drop table if exists billing.payments;

drop table if exists billing.invoice_line_items;

drop table if exists billing.invoices;

drop table if exists billing.account_transactions;

drop table if exists billing.client_accounts;

drop table if exists billing.quotes;

drop table if exists billing.surcharges;

drop table if exists billing.rate_rules;

drop table if exists billing.rate_cards;

-- Drop enum types
drop type if exists billing.sync_status_enum;

drop type if exists billing.document_type_enum;

drop type if exists billing.dispute_status_enum;

drop type if exists billing.payment_status_enum;

drop type if exists billing.payment_method_enum;

drop type if exists billing.invoice_status_enum;

drop type if exists billing.transaction_type_enum;

drop type if exists billing.quote_status_enum;

drop type if exists billing.surcharge_calculation_method_enum;

drop type if exists billing.pricing_model_enum;

drop type if exists billing.service_type_enum;

-- Drop schema
drop schema if exists billing;

