import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`
		-- Create BILLING schema
		create schema if not exists billing;

		-- Create BILLING enum types
		create type billing.service_type_enum as enum(
			'shipping',
			'storage',
			'fulfillment',
			'handling',
			'insurance',
			'customs',
			'packaging',
			'returns'
		);

		create type billing.pricing_model_enum as enum(
			'per-kg',
			'per-item',
			'flat-rate',
			'per-cubic-meter',
			'per-zone',
			'percentage',
			'tiered'
		);

		create type billing.surcharge_calculation_method_enum as enum(
			'percentage',
			'fixed',
			'per-unit',
			'sliding-scale'
		);

		create type billing.quote_status_enum as enum(
			'pending',
			'accepted',
			'expired',
			'cancelled',
			'converted'
		);

		create type billing.transaction_type_enum as enum(
			'credit',
			'debit',
			'top-up',
			'refund',
			'adjustment',
			'fee'
		);

		create type billing.invoice_status_enum as enum(
			'draft',
			'sent',
			'viewed',
			'paid',
			'partial-paid',
			'past-due',
			'disputed',
			'cancelled',
			'void'
		);

		create type billing.payment_method_enum as enum(
			'credit-card',
			'debit-card',
			'wallet',
			'qr-ph',
			'client-credit',
			'bank-transfer',
			'cash',
			'check'
		);

		create type billing.payment_status_enum as enum(
			'pending',
			'processing',
			'successful',
			'failed',
			'cancelled',
			'refunded'
		);

		create type billing.dispute_status_enum as enum(
			'open',
			'under-review',
			'approved',
			'denied',
			'escalated',
			'closed'
		);

		create type billing.document_type_enum as enum(
			'bol',
			'commercial-invoice',
			'packing-list',
			'receipt',
			'credit-note',
			'shipping-label',
			'customs-declaration',
			'proof-of-delivery'
		);

		create type billing.sync_status_enum as enum(
			'pending',
			'in-progress',
			'success',
			'failed',
			'retry'
		);

		-- BILLING Rate Cards
		create table billing.rate_cards(
			id uuid primary key default gen_random_uuid(),
			name varchar(255) not null,
			service_type billing.service_type_enum not null,
			is_active boolean default true,
			valid_from date not null,
			valid_to date,
			description text,
			created_by_user_id text references "user"(id),
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_valid_date_range check (valid_to is null or valid_to >= valid_from)
		);

		comment on table billing.rate_cards is 'Defines pricing structures for different services offered by the logistics company.';

		comment on column billing.rate_cards.id is 'Primary key';

		comment on column billing.rate_cards.name is 'Descriptive name for the rate card (e.g., "Standard Shipping Rates 2025").';

		comment on column billing.rate_cards.service_type is 'Category of service being priced using service_type_enum.';

		comment on column billing.rate_cards.is_active is 'Whether this rate card is currently in use.';

		comment on column billing.rate_cards.valid_from is 'Date when the rate card becomes effective.';

		comment on column billing.rate_cards.valid_to is 'Date when the rate card expires.';

		comment on column billing.rate_cards.description is 'Additional details about the rate card.';

		comment on column billing.rate_cards.created_by_user_id is 'User who created this rate card.';

		comment on column billing.rate_cards.created_at is 'Timestamp when the rate card was created.';

		comment on column billing.rate_cards.updated_at is 'Timestamp when the rate card was last updated.';

		-- BILLING Rate Rules
		create table billing.rate_rules(
			id uuid primary key default gen_random_uuid(),
			rate_card_id uuid not null references billing.rate_cards(id),
			condition varchar(100) not null,
			value varchar(255) not null,
			price numeric(10, 2) not null,
			pricing_model billing.pricing_model_enum not null,
			min_value numeric(10, 2),
			max_value numeric(10, 2),
			priority integer default 100,
			is_active boolean default true,
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_price_positive check (price >= 0)
		);

		comment on table billing.rate_rules is 'Specific pricing rules within a rate card that determine costs based on various conditions.';

		comment on column billing.rate_rules.id is 'Primary key';

		comment on column billing.rate_rules.rate_card_id is 'Reference to the parent rate card.';

		comment on column billing.rate_rules.condition is 'Condition that must be met for this rule to apply (e.g., weight_gt, zone_eq).';

		comment on column billing.rate_rules.value is 'Value for the condition (e.g., "5kg", "Zone A").';

		comment on column billing.rate_rules.price is 'Price amount when this rule applies.';

		comment on column billing.rate_rules.pricing_model is 'How the price is calculated using pricing_model_enum.';

		comment on column billing.rate_rules.min_value is 'Minimum value for range-based conditions.';

		comment on column billing.rate_rules.max_value is 'Maximum value for range-based conditions.';

		comment on column billing.rate_rules.priority is 'Rule precedence when multiple rules could apply (lower = higher priority).';

		comment on column billing.rate_rules.is_active is 'Whether this rule is currently active.';

		comment on column billing.rate_rules.created_at is 'Timestamp when the rate rule was created.';

		comment on column billing.rate_rules.updated_at is 'Timestamp when the rate rule was last updated.';

		-- BILLING Surcharges
		create table billing.surcharges(
			id uuid primary key default gen_random_uuid(),
			name varchar(255) not null,
			type varchar(50) not null,
			amount numeric(10, 2) not null,
			calculation_method billing.surcharge_calculation_method_enum not null,
			is_active boolean default true,
			valid_from date,
			valid_to date,
			description text,
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_amount_positive check (amount >= 0),
			constraint check_surcharge_valid_date_range check (valid_to is null or valid_to >= valid_from)
		);

		comment on table billing.surcharges is 'Additional charges that can be applied to base pricing for special circumstances.';

		comment on column billing.surcharges.id is 'Primary key';

		comment on column billing.surcharges.name is 'Name of the surcharge (e.g., "Fuel Surcharge", "Peak Season Fee").';

		comment on column billing.surcharges.type is 'Category of surcharge (e.g., fuel, seasonal, handling).';

		comment on column billing.surcharges.amount is 'Surcharge amount or percentage.';

		comment on column billing.surcharges.calculation_method is 'How the surcharge is calculated using surcharge_calculation_method_enum.';

		comment on column billing.surcharges.is_active is 'Whether this surcharge is currently being applied.';

		comment on column billing.surcharges.valid_from is 'Date when the surcharge becomes effective.';

		comment on column billing.surcharges.valid_to is 'Date when the surcharge expires.';

		comment on column billing.surcharges.description is 'Additional details about the surcharge.';

		comment on column billing.surcharges.created_at is 'Timestamp when the surcharge was created.';

		comment on column billing.surcharges.updated_at is 'Timestamp when the surcharge was last updated.';

		-- BILLING Quotes
		create table billing.quotes(
			id uuid primary key default gen_random_uuid(),
			client_id uuid references crm.companies(id),
			origin_details text not null,
			destination_details text not null,
			weight numeric(10, 3),
			length numeric(10, 2),
			width numeric(10, 2),
			height numeric(10, 2),
			volume numeric(12, 4) generated always as (length * width * height) stored,
			quoted_price numeric(10, 2) not null,
			service_level varchar(100),
			expires_at timestamp,
			status billing.quote_status_enum default 'pending',
			quote_number varchar(100) unique,
			notes text,
			created_by_user_id text references "user"(id),
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_dimensions_positive check ((length is null or length > 0) and (width is null or width > 0) and (height is null or height > 0)),
			constraint check_weight_positive check (weight is null or weight > 0),
			constraint check_quoted_price_positive check (quoted_price > 0)
		);

		comment on table billing.quotes is 'Price estimates provided to clients before services are performed.';

		comment on column billing.quotes.id is 'Primary key';

		comment on column billing.quotes.client_id is 'Reference to the client requesting the quote (optional for anonymous quotes).';

		comment on column billing.quotes.origin_details is 'Pickup location information.';

		comment on column billing.quotes.destination_details is 'Delivery location information.';

		comment on column billing.quotes.weight is 'Package weight for pricing calculation.';

		comment on column billing.quotes.length is 'Package length dimension.';

		comment on column billing.quotes.width is 'Package width dimension.';

		comment on column billing.quotes.height is 'Package height dimension.';

		comment on column billing.quotes.volume is 'Package volume (automatically calculated from dimensions).';

		comment on column billing.quotes.quoted_price is 'Calculated price for the requested service.';

		comment on column billing.quotes.service_level is 'Type of service quoted (e.g., standard, express).';

		comment on column billing.quotes.expires_at is 'When the quote becomes invalid.';

		comment on column billing.quotes.status is 'Current quote status using quote_status_enum.';

		comment on column billing.quotes.quote_number is 'Unique quote reference number.';

		comment on column billing.quotes.notes is 'Additional notes about the quote.';

		comment on column billing.quotes.created_by_user_id is 'User who created this quote.';

		comment on column billing.quotes.created_at is 'Timestamp when the quote was created.';

		comment on column billing.quotes.updated_at is 'Timestamp when the quote was last updated.';

		-- BILLING Client Accounts
		create table billing.client_accounts(
			id uuid primary key default gen_random_uuid(),
			client_id uuid not null references crm.companies(id) unique,
			credit_limit numeric(12, 2) default 0,
			available_credit numeric(12, 2) default 0,
			wallet_balance numeric(12, 2) default 0,
			currency varchar(3) default 'USD',
			payment_terms_days integer default 30,
			is_credit_approved boolean default false,
			last_payment_date date,
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_credit_limit_non_negative check (credit_limit >= 0),
			constraint check_available_credit_within_limit check (available_credit <= credit_limit),
			constraint check_wallet_balance_non_negative check (wallet_balance >= 0),
			constraint check_payment_terms_positive check (payment_terms_days > 0)
		);

		comment on table billing.client_accounts is 'Financial account information for clients, including credit limits and wallet balances.';

		comment on column billing.client_accounts.id is 'Primary key';

		comment on column billing.client_accounts.client_id is 'Reference to the client company.';

		comment on column billing.client_accounts.credit_limit is 'Maximum credit amount allowed for the client.';

		comment on column billing.client_accounts.available_credit is 'Current available credit balance.';

		comment on column billing.client_accounts.wallet_balance is 'Prepaid balance available for services.';

		comment on column billing.client_accounts.currency is 'Currency code for the account.';

		comment on column billing.client_accounts.payment_terms_days is 'Number of days for payment terms.';

		comment on column billing.client_accounts.is_credit_approved is 'Whether the client is approved for credit.';

		comment on column billing.client_accounts.last_payment_date is 'Date of the last payment received.';

		comment on column billing.client_accounts.created_at is 'Timestamp when the client account was created.';

		comment on column billing.client_accounts.updated_at is 'Timestamp when the client account was last updated.';

		-- BILLING Account Transactions
		create table billing.account_transactions(
			id uuid primary key default gen_random_uuid(),
			client_account_id uuid not null references billing.client_accounts(id),
			type billing.transaction_type_enum not null,
			amount numeric(12, 2) not null,
			running_balance numeric(12, 2),
			source_record_id uuid,
			source_record_type varchar(50),
			description text,
			reference_number varchar(100),
			transaction_date timestamp default now(),
			processed_by_user_id text references "user"(id),
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_amount_not_zero check (amount != 0)
		);

		comment on table billing.account_transactions is 'Records all financial transactions affecting client accounts.';

		comment on column billing.account_transactions.id is 'Primary key';

		comment on column billing.account_transactions.client_account_id is 'Reference to the affected client account.';

		comment on column billing.account_transactions.type is 'Type of transaction using transaction_type_enum.';

		comment on column billing.account_transactions.amount is 'Transaction amount (positive for credits, negative for debits).';

		comment on column billing.account_transactions.running_balance is 'Account balance after this transaction.';

		comment on column billing.account_transactions.source_record_id is 'Reference to the source document (e.g., invoice_id, payment_id).';

		comment on column billing.account_transactions.source_record_type is 'Type of source document.';

		comment on column billing.account_transactions.description is 'Description of the transaction.';

		comment on column billing.account_transactions.reference_number is 'External reference number.';

		comment on column billing.account_transactions.transaction_date is 'When the transaction occurred.';

		comment on column billing.account_transactions.processed_by_user_id is 'User who processed this transaction.';

		comment on column billing.account_transactions.created_at is 'Timestamp when the transaction was created.';

		comment on column billing.account_transactions.updated_at is 'Timestamp when the transaction was last updated.';

		-- BILLING Invoices
		create table billing.invoices(
			id uuid primary key default gen_random_uuid(),
			client_id uuid not null references crm.companies(id),
			quote_id uuid references billing.quotes(id),
			invoice_number varchar(100) not null unique,
			status billing.invoice_status_enum default 'draft',
			issue_date date not null,
			due_date date not null,
			total_amount numeric(12, 2) not null,
			amount_paid numeric(12, 2) default 0,
			amount_outstanding numeric(12, 2) generated always as (total_amount - amount_paid) stored,
			currency varchar(3) default 'USD',
			tax_amount numeric(10, 2) default 0,
			discount_amount numeric(10, 2) default 0,
			subtotal numeric(12, 2),
			payment_terms text,
			notes text,
			sent_at timestamp,
			paid_at timestamp,
			created_by_user_id text references "user"(id),
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_due_date_after_issue check (due_date >= issue_date),
			constraint check_amounts_non_negative check (total_amount >= 0 and amount_paid >= 0 and tax_amount >= 0 and discount_amount >= 0),
			constraint check_amount_paid_not_exceeding check (amount_paid <= total_amount)
		);

		comment on table billing.invoices is 'Bills sent to clients for services rendered or goods provided.';

		comment on column billing.invoices.id is 'Primary key';

		comment on column billing.invoices.client_id is 'Reference to the client being billed.';

		comment on column billing.invoices.quote_id is 'Reference to the original quote (if applicable).';

		comment on column billing.invoices.invoice_number is 'Unique invoice reference number.';

		comment on column billing.invoices.status is 'Current invoice status using invoice_status_enum.';

		comment on column billing.invoices.issue_date is 'Date the invoice was created.';

		comment on column billing.invoices.due_date is 'Payment due date.';

		comment on column billing.invoices.total_amount is 'Total amount due on the invoice.';

		comment on column billing.invoices.amount_paid is 'Amount already paid against the invoice.';

		comment on column billing.invoices.amount_outstanding is 'Outstanding amount (automatically calculated).';

		comment on column billing.invoices.currency is 'Currency code for the invoice.';

		comment on column billing.invoices.tax_amount is 'Total tax amount on the invoice.';

		comment on column billing.invoices.discount_amount is 'Total discount applied to the invoice.';

		comment on column billing.invoices.subtotal is 'Subtotal before tax and discounts.';

		comment on column billing.invoices.payment_terms is 'Payment terms and conditions.';

		comment on column billing.invoices.notes is 'Additional notes on the invoice.';

		comment on column billing.invoices.sent_at is 'When the invoice was sent to the client.';

		comment on column billing.invoices.paid_at is 'When the invoice was fully paid.';

		comment on column billing.invoices.created_by_user_id is 'User who created this invoice.';

		comment on column billing.invoices.created_at is 'Timestamp when the invoice was created.';

		comment on column billing.invoices.updated_at is 'Timestamp when the invoice was last updated.';

		-- BILLING Invoice Line Items
		create table billing.invoice_line_items(
			id uuid primary key default gen_random_uuid(),
			invoice_id uuid not null references billing.invoices(id),
			source_record_id uuid,
			source_record_type varchar(50),
			description text not null,
			quantity numeric(10, 3) not null default 1,
			unit_price numeric(10, 2) not null,
			total_price numeric(12, 2) generated always as (quantity * unit_price) stored,
			tax_rate numeric(5, 4) default 0,
			tax_amount numeric(10, 2) generated always as (quantity * unit_price * tax_rate) stored,
			discount_rate numeric(5, 4) default 0,
			discount_amount numeric(10, 2) generated always as (quantity * unit_price * discount_rate) stored,
			line_total numeric(12, 2) generated always as (quantity * unit_price +(quantity * unit_price * tax_rate) -(quantity * unit_price * discount_rate)) stored,
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_quantity_positive check (quantity > 0),
			constraint check_unit_price_non_negative check (unit_price >= 0),
			constraint check_rates_valid check (tax_rate >= 0 and tax_rate <= 1 and discount_rate >= 0 and discount_rate <= 1)
		);

		comment on table billing.invoice_line_items is 'Individual charges and services detailed on an invoice.';

		comment on column billing.invoice_line_items.id is 'Primary key';

		comment on column billing.invoice_line_items.invoice_id is 'Reference to the parent invoice.';

		comment on column billing.invoice_line_items.source_record_id is 'Reference to the source of the charge (e.g., shipment_id).';

		comment on column billing.invoice_line_items.source_record_type is 'Type of source record.';

		comment on column billing.invoice_line_items.description is 'Description of the service or charge.';

		comment on column billing.invoice_line_items.quantity is 'Number of units being charged.';

		comment on column billing.invoice_line_items.unit_price is 'Price per unit.';

		comment on column billing.invoice_line_items.total_price is 'Total amount for this line item (automatically calculated).';

		comment on column billing.invoice_line_items.tax_rate is 'Tax rate applied to this line item.';

		comment on column billing.invoice_line_items.tax_amount is 'Tax amount for this line item (automatically calculated).';

		comment on column billing.invoice_line_items.discount_rate is 'Discount rate applied to this line item.';

		comment on column billing.invoice_line_items.discount_amount is 'Discount amount for this line item (automatically calculated).';

		comment on column billing.invoice_line_items.line_total is 'Final total including tax and discounts (automatically calculated).';

		comment on column billing.invoice_line_items.created_at is 'Timestamp when the line item was created.';

		comment on column billing.invoice_line_items.updated_at is 'Timestamp when the line item was last updated.';

		-- BILLING Payments
		create table billing.payments(
			id uuid primary key default gen_random_uuid(),
			invoice_id uuid not null references billing.invoices(id),
			amount numeric(12, 2) not null,
			payment_method billing.payment_method_enum not null,
			transaction_id varchar(255),
			gateway_reference varchar(255),
			status billing.payment_status_enum default 'pending',
			payment_date timestamp default now(),
			processed_at timestamp,
			currency varchar(3) default 'USD',
			exchange_rate numeric(10, 6) default 1,
			fees numeric(10, 2) default 0,
			net_amount numeric(12, 2) generated always as (amount - fees) stored,
			notes text,
			processed_by_user_id text references "user"(id),
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_payment_amount_positive check (amount > 0),
			constraint check_fees_non_negative check (fees >= 0),
			constraint check_exchange_rate_positive check (exchange_rate > 0)
		);

		comment on table billing.payments is 'Records of payments received against invoices.';

		comment on column billing.payments.id is 'Primary key';

		comment on column billing.payments.invoice_id is 'Reference to the invoice being paid.';

		comment on column billing.payments.amount is 'Payment amount.';

		comment on column billing.payments.payment_method is 'How the payment was made using payment_method_enum.';

		comment on column billing.payments.transaction_id is 'Reference from payment gateway or internal system.';

		comment on column billing.payments.gateway_reference is 'Payment gateway transaction reference.';

		comment on column billing.payments.status is 'Payment processing status using payment_status_enum.';

		comment on column billing.payments.payment_date is 'When the payment was initiated.';

		comment on column billing.payments.processed_at is 'When the payment was successfully processed.';

		comment on column billing.payments.currency is 'Currency of the payment.';

		comment on column billing.payments.exchange_rate is 'Exchange rate used for currency conversion.';

		comment on column billing.payments.fees is 'Processing fees deducted from the payment.';

		comment on column billing.payments.net_amount is 'Net amount after fees (automatically calculated).';

		comment on column billing.payments.notes is 'Additional notes about the payment.';

		comment on column billing.payments.processed_by_user_id is 'User who processed this payment.';

		comment on column billing.payments.created_at is 'Timestamp when the payment was created.';

		comment on column billing.payments.updated_at is 'Timestamp when the payment was last updated.';

		-- BILLING Disputes
		create table billing.disputes(
			id uuid primary key default gen_random_uuid(),
			line_item_id uuid not null references billing.invoice_line_items(id),
			client_id uuid not null references crm.companies(id),
			reason text not null,
			status billing.dispute_status_enum default 'open',
			disputed_amount numeric(10, 2),
			resolution_notes text,
			submitted_at timestamp default now(),
			resolved_at timestamp,
			resolved_by_user_id text references "user"(id),
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_disputed_amount_positive check (disputed_amount is null or disputed_amount > 0)
		);

		comment on table billing.disputes is 'Records of client disputes regarding invoice charges.';

		comment on column billing.disputes.id is 'Primary key';

		comment on column billing.disputes.line_item_id is 'Reference to the disputed invoice line item.';

		comment on column billing.disputes.client_id is 'Reference to the client raising the dispute.';

		comment on column billing.disputes.reason is 'Explanation of why the charge is being disputed.';

		comment on column billing.disputes.status is 'Current dispute status using dispute_status_enum.';

		comment on column billing.disputes.disputed_amount is 'Amount being disputed.';

		comment on column billing.disputes.resolution_notes is 'Notes about the dispute resolution.';

		comment on column billing.disputes.submitted_at is 'When the dispute was submitted.';

		comment on column billing.disputes.resolved_at is 'When the dispute was resolved.';

		comment on column billing.disputes.resolved_by_user_id is 'User who resolved the dispute.';

		comment on column billing.disputes.created_at is 'Timestamp when the dispute was created.';

		comment on column billing.disputes.updated_at is 'Timestamp when the dispute was last updated.';

		-- BILLING Credit Notes
		create table billing.credit_notes(
			id uuid primary key default gen_random_uuid(),
			invoice_id uuid not null references billing.invoices(id),
			dispute_id uuid references billing.disputes(id),
			credit_note_number varchar(100) not null unique,
			amount numeric(12, 2) not null,
			reason text not null,
			issue_date date not null,
			applied_at timestamp,
			currency varchar(3) default 'USD',
			notes text,
			created_by_user_id text references "user"(id),
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_credit_amount_positive check (amount > 0)
		);

		comment on table billing.credit_notes is 'Credits issued to clients for adjustments, refunds, or dispute resolutions.';

		comment on column billing.credit_notes.id is 'Primary key';

		comment on column billing.credit_notes.invoice_id is 'Reference to the related invoice.';

		comment on column billing.credit_notes.dispute_id is 'Reference to the dispute (if applicable).';

		comment on column billing.credit_notes.credit_note_number is 'Unique credit note reference number.';

		comment on column billing.credit_notes.amount is 'Credit amount being issued.';

		comment on column billing.credit_notes.reason is 'Explanation for the credit note.';

		comment on column billing.credit_notes.issue_date is 'Date the credit note was created.';

		comment on column billing.credit_notes.applied_at is 'When the credit was applied to the account.';

		comment on column billing.credit_notes.currency is 'Currency of the credit note.';

		comment on column billing.credit_notes.notes is 'Additional notes about the credit note.';

		comment on column billing.credit_notes.created_by_user_id is 'User who created this credit note.';

		comment on column billing.credit_notes.created_at is 'Timestamp when the credit note was created.';

		comment on column billing.credit_notes.updated_at is 'Timestamp when the credit note was last updated.';

		-- BILLING Documents
		create table billing.documents(
			id uuid primary key default gen_random_uuid(),
			record_id uuid not null,
			record_type varchar(50) not null,
			document_type billing.document_type_enum not null,
			file_path varchar(500) not null,
			file_name varchar(255) not null,
			file_size integer,
			mime_type varchar(100),
			uploaded_by_user_id text references "user"(id),
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_file_size_positive check (file_size is null or file_size > 0)
		);

		comment on table billing.documents is 'Manages document attachments related to billing and shipping records.';

		comment on column billing.documents.id is 'Primary key';

		comment on column billing.documents.record_id is 'Reference to the record the document is attached to.';

		comment on column billing.documents.record_type is 'Type of record (e.g., ims_outbound_shipments, billing_invoices).';

		comment on column billing.documents.document_type is 'Type of document using document_type_enum.';

		comment on column billing.documents.file_path is 'Storage location of the document file.';

		comment on column billing.documents.file_name is 'Original file name.';

		comment on column billing.documents.file_size is 'File size in bytes.';

		comment on column billing.documents.mime_type is 'MIME type of the file.';

		comment on column billing.documents.uploaded_by_user_id is 'User who uploaded this document.';

		comment on column billing.documents.created_at is 'Timestamp when the document was created.';

		comment on column billing.documents.updated_at is 'Timestamp when the document was last updated.';

		-- BILLING Accounting Sync Log
		create table billing.accounting_sync_log(
			id uuid primary key default gen_random_uuid(),
			record_id uuid not null,
			record_type varchar(50) not null,
			external_system varchar(50) not null,
			external_id varchar(255),
			status billing.sync_status_enum default 'pending',
			error_message text,
			request_payload text,
			response_payload text,
			last_sync_at timestamp,
			retry_count integer default 0,
			next_retry_at timestamp,
			created_at timestamp default now(),
			updated_at timestamp default now(),
			constraint check_retry_count_non_negative check (retry_count >= 0)
		);

		comment on table billing.accounting_sync_log is 'Tracks synchronization of financial data with external accounting systems.';

		comment on column billing.accounting_sync_log.id is 'Primary key';

		comment on column billing.accounting_sync_log.record_id is 'Reference to the record being synchronized.';

		comment on column billing.accounting_sync_log.record_type is 'Type of record being synchronized.';

		comment on column billing.accounting_sync_log.external_system is 'Target accounting system (e.g., quickbooks, xero).';

		comment on column billing.accounting_sync_log.external_id is 'ID assigned by the external system.';

		comment on column billing.accounting_sync_log.status is 'Synchronization status using sync_status_enum.';

		comment on column billing.accounting_sync_log.error_message is 'Details of any synchronization errors.';

		comment on column billing.accounting_sync_log.request_payload is 'Request data sent to external system.';

		comment on column billing.accounting_sync_log.response_payload is 'Response data received from external system.';

		comment on column billing.accounting_sync_log.last_sync_at is 'Timestamp of the last synchronization attempt.';

		comment on column billing.accounting_sync_log.retry_count is 'Number of retry attempts made.';

		comment on column billing.accounting_sync_log.next_retry_at is 'When the next retry should be attempted.';

		comment on column billing.accounting_sync_log.created_at is 'Timestamp when the sync log was created.';

		comment on column billing.accounting_sync_log.updated_at is 'Timestamp when the sync log was last updated.';

		-- Create indexes for performance
		create index idx_billing_rate_cards_service_type on billing.rate_cards(service_type);

		create index idx_billing_rate_cards_active on billing.rate_cards(is_active);

		create index idx_billing_rate_cards_valid_dates on billing.rate_cards(valid_from, valid_to);

		create index idx_billing_rate_rules_rate_card_id on billing.rate_rules(rate_card_id);

		create index idx_billing_rate_rules_condition on billing.rate_rules(condition);

		create index idx_billing_rate_rules_active on billing.rate_rules(is_active);

		create index idx_billing_surcharges_type on billing.surcharges(type);

		create index idx_billing_surcharges_active on billing.surcharges(is_active);

		create index idx_billing_quotes_client_id on billing.quotes(client_id);

		create index idx_billing_quotes_status on billing.quotes(status);

		create index idx_billing_quotes_expires_at on billing.quotes(expires_at);

		create index idx_billing_client_accounts_client_id on billing.client_accounts(client_id);

		create index idx_billing_account_transactions_client_account_id on billing.account_transactions(client_account_id);

		create index idx_billing_account_transactions_type on billing.account_transactions(type);

		create index idx_billing_account_transactions_date on billing.account_transactions(transaction_date);

		create index idx_billing_invoices_client_id on billing.invoices(client_id);

		create index idx_billing_invoices_status on billing.invoices(status);

		create index idx_billing_invoices_issue_date on billing.invoices(issue_date);

		create index idx_billing_invoices_due_date on billing.invoices(due_date);

		create index idx_billing_invoice_line_items_invoice_id on billing.invoice_line_items(invoice_id);

		create index idx_billing_invoice_line_items_source on billing.invoice_line_items(source_record_type, source_record_id);

		create index idx_billing_payments_invoice_id on billing.payments(invoice_id);

		create index idx_billing_payments_status on billing.payments(status);

		create index idx_billing_payments_payment_date on billing.payments(payment_date);

		create index idx_billing_disputes_line_item_id on billing.disputes(line_item_id);

		create index idx_billing_disputes_client_id on billing.disputes(client_id);

		create index idx_billing_disputes_status on billing.disputes(status);

		create index idx_billing_credit_notes_invoice_id on billing.credit_notes(invoice_id);

		create index idx_billing_credit_notes_dispute_id on billing.credit_notes(dispute_id);

		create index idx_billing_documents_record on billing.documents(record_type, record_id);

		create index idx_billing_documents_type on billing.documents(document_type);

		create index idx_billing_accounting_sync_log_record on billing.accounting_sync_log(record_type, record_id);

		create index idx_billing_accounting_sync_log_status on billing.accounting_sync_log(status);

		create index idx_billing_accounting_sync_log_external_system on billing.accounting_sync_log(external_system);
	`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`
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
	`.execute(db);
}
