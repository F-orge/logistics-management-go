# Database Schema Documentation

## Public (standard public schema)

### account
- id: Primary key
  - datatype: text
  - nullable: no
  - constraints: PRIMARY KEY

- account_id: Account identifier
  - datatype: text
  - nullable: no

- provider_id: Provider identifier
  - datatype: text
  - nullable: no

- user_id: User reference
  - datatype: text
  - nullable: no
  - foreign key: related to user (id)

- access_token: Access token for authentication
  - datatype: text
  - nullable: yes

- refresh_token: Token for refreshing access
  - datatype: text
  - nullable: yes

- id_token: ID token from provider
  - datatype: text
  - nullable: yes

- access_token_expires_at: Expiration timestamp for access token
  - datatype: timestamp with time zone
  - nullable: yes

- refresh_token_expires_at: Expiration timestamp for refresh token
  - datatype: timestamp with time zone
  - nullable: yes

- scope: OAuth scopes granted
  - datatype: text
  - nullable: yes

- password: Encrypted password
  - datatype: text
  - nullable: yes

- created_at: Timestamp when the account was created
  - datatype: timestamp with time zone
  - nullable: no

- updated_at: Timestamp when the account was last updated
  - datatype: timestamp with time zone
  - nullable: no

### session
- id: Primary key
  - datatype: text
  - nullable: no
  - constraints: PRIMARY KEY

- expires_at: Session expiration timestamp
  - datatype: timestamp with time zone
  - nullable: no

- token: Session token
  - datatype: text
  - nullable: no
  - constraints: UNIQUE

- created_at: Timestamp when session was created
  - datatype: timestamp with time zone
  - nullable: no

- updated_at: Timestamp when session was last updated
  - datatype: timestamp with time zone
  - nullable: no

- ip_address: IP address of the session
  - datatype: text
  - nullable: yes

- user_agent: User agent string
  - datatype: text
  - nullable: yes

- user_id: Reference to user
  - datatype: text
  - nullable: no
  - foreign key: related to user (id)

- impersonated_by: User impersonating this session
  - datatype: text
  - nullable: yes

### user
- id: Primary key
  - datatype: text
  - nullable: no
  - constraints: PRIMARY KEY

- name: User's full name
  - datatype: text
  - nullable: no

- email: User's email address
  - datatype: text
  - nullable: no
  - constraints: UNIQUE

- email_verified: Whether email is verified
  - datatype: boolean
  - nullable: no

- image: User's profile image
  - datatype: text
  - nullable: yes

- created_at: Timestamp when user was created
  - datatype: timestamp with time zone
  - nullable: no

- updated_at: Timestamp when user was last updated
  - datatype: timestamp with time zone
  - nullable: no

- role: User's role in the system
  - datatype: user_role
  - nullable: yes

- banned: Whether user is banned
  - datatype: boolean
  - nullable: yes

- ban_reason: Reason for ban
  - datatype: text
  - nullable: yes

- ban_expires: When the ban expires
  - datatype: timestamp with time zone
  - nullable: yes

### verification
- id: Primary key
  - datatype: text
  - nullable: no
  - constraints: PRIMARY KEY

- identifier: Identifier being verified
  - datatype: text
  - nullable: no

- value: Verification value/code
  - datatype: text
  - nullable: no

- expires_at: Expiration timestamp
  - datatype: timestamp with time zone
  - nullable: no

- created_at: Timestamp when verification was created
  - datatype: timestamp with time zone
  - nullable: no

- updated_at: Timestamp when verification was last updated
  - datatype: timestamp with time zone
  - nullable: no

### kysely_migration
- name: Migration name
  - datatype: character varying(255)
  - nullable: no
  - constraints: PRIMARY KEY

- timestamp: Migration timestamp
  - datatype: character varying(255)
  - nullable: no

### kysely_migration_lock
- id: Primary key
  - datatype: character varying(255)
  - nullable: no
  - constraints: PRIMARY KEY

- is_locked: Migration lock status
  - datatype: integer
  - nullable: no

## Billing (Records all financial transactions affecting client accounts.)

### account_transactions (Records all financial transactions affecting client accounts.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- client_account_id: Reference to the affected client account.
  - datatype: uuid
  - nullable: no
  - foreign key: related to client_accounts (id)

- type: Type of transaction using transaction_type_enum.
  - datatype: billing.transaction_type_enum
  - nullable: no

- amount: Transaction amount (positive for credits, negative for debits).
  - datatype: numeric(12,2)
  - nullable: no
  - constraints: CHECK

- running_balance: Account balance after this transaction.
  - datatype: numeric(12,2)
  - nullable: yes

- source_record_id: Reference to the source document (e.g., invoice_id, payment_id).
  - datatype: uuid
  - nullable: yes

- source_record_type: Type of source document.
  - datatype: character varying(50)
  - nullable: yes

- description: Description of the transaction.
  - datatype: text
  - nullable: yes

- reference_number: External reference number.
  - datatype: character varying(100)
  - nullable: yes

- transaction_date: When the transaction occurred.
  - datatype: timestamp without time zone
  - nullable: yes

- processed_by_user_id: User who processed this transaction.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- created_at: Timestamp when the transaction was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the transaction was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### accounting_sync_log (Tracks synchronization of financial data with external accounting systems.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- record_id: Reference to the record being synchronized.
  - datatype: uuid
  - nullable: no

- record_type: Type of record being synchronized.
  - datatype: character varying(50)
  - nullable: no

- external_system: Target accounting system (e.g., quickbooks, xero).
  - datatype: character varying(50)
  - nullable: no

- external_id: ID assigned by the external system.
  - datatype: character varying(255)
  - nullable: yes

- status: Synchronization status using sync_status_enum.
  - datatype: billing.sync_status_enum
  - nullable: yes

- error_message: Details of any synchronization errors.
  - datatype: text
  - nullable: yes

- request_payload: Request data sent to external system.
  - datatype: text
  - nullable: yes

- response_payload: Response data received from external system.
  - datatype: text
  - nullable: yes

- last_sync_at: Timestamp of the last synchronization attempt.
  - datatype: timestamp without time zone
  - nullable: yes

- retry_count: Number of retry attempts made.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- next_retry_at: When the next retry should be attempted.
  - datatype: timestamp without time zone
  - nullable: yes

- created_at: Timestamp when the sync log was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the sync log was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### client_accounts (Financial account information for clients, including credit limits and wallet balances.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- client_id: Reference to the client company.
  - datatype: uuid
  - nullable: no
  - foreign key: related to companies (id)
  - constraints: UNIQUE

- credit_limit: Maximum credit amount allowed for the client.
  - datatype: numeric(12,2)
  - nullable: yes
  - constraints: CHECK

- available_credit: Current available credit balance.
  - datatype: numeric(12,2)
  - nullable: yes
  - constraints: CHECK

- wallet_balance: Prepaid balance available for services.
  - datatype: numeric(12,2)
  - nullable: yes
  - constraints: CHECK

- currency: Currency code for the account.
  - datatype: character varying(3)
  - nullable: yes

- payment_terms_days: Number of days for payment terms.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- is_credit_approved: Whether the client is approved for credit.
  - datatype: boolean
  - nullable: yes

- last_payment_date: Date of the last payment received.
  - datatype: date
  - nullable: yes

- created_at: Timestamp when the client account was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the client account was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### credit_notes (Credits issued to clients for adjustments, refunds, or dispute resolutions.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- invoice_id: Reference to the related invoice.
  - datatype: uuid
  - nullable: no
  - foreign key: related to invoices (id)

- dispute_id: Reference to the dispute (if applicable).
  - datatype: uuid
  - nullable: yes
  - foreign key: related to disputes (id)

- credit_note_number: Unique credit note reference number.
  - datatype: character varying(100)
  - nullable: no
  - constraints: UNIQUE

- amount: Credit amount being issued.
  - datatype: numeric(12,2)
  - nullable: no
  - constraints: CHECK

- reason: Explanation for the credit note.
  - datatype: text
  - nullable: no

- issue_date: Date the credit note was created.
  - datatype: date
  - nullable: no

- applied_at: When the credit was applied to the account.
  - datatype: timestamp without time zone
  - nullable: yes

- currency: Currency of the credit note.
  - datatype: character varying(3)
  - nullable: yes

- notes: Additional notes about the credit note.
  - datatype: text
  - nullable: yes

- created_by_user_id: User who created this credit note.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- created_at: Timestamp when the credit note was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the credit note was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### disputes (Records of client disputes regarding invoice charges.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- line_item_id: Reference to the disputed invoice line item.
  - datatype: uuid
  - nullable: no
  - foreign key: related to invoice_line_items (id)

- client_id: Reference to the client raising the dispute.
  - datatype: uuid
  - nullable: no
  - foreign key: related to companies (id)

- reason: Explanation of why the charge is being disputed.
  - datatype: text
  - nullable: no

- status: Current dispute status using dispute_status_enum.
  - datatype: billing.dispute_status_enum
  - nullable: yes

- disputed_amount: Amount being disputed.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- resolution_notes: Notes about the dispute resolution.
  - datatype: text
  - nullable: yes

- submitted_at: When the dispute was submitted.
  - datatype: timestamp without time zone
  - nullable: yes

- resolved_at: When the dispute was resolved.
  - datatype: timestamp without time zone
  - nullable: yes

- resolved_by_user_id: User who resolved the dispute.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- created_at: Timestamp when the dispute was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the dispute was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### documents (Manages document attachments related to billing and shipping records.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- record_id: Reference to the record the document is attached to.
  - datatype: uuid
  - nullable: no

- record_type: Type of record (e.g., ims_outbound_shipments, billing_invoices).
  - datatype: character varying(50)
  - nullable: no

- document_type: Type of document using document_type_enum.
  - datatype: billing.document_type_enum
  - nullable: no

- file_path: Storage location of the document file.
  - datatype: character varying(500)
  - nullable: no

- file_name: Original file name.
  - datatype: character varying(255)
  - nullable: no

- file_size: File size in bytes.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- mime_type: MIME type of the file.
  - datatype: character varying(100)
  - nullable: yes

- uploaded_by_user_id: User who uploaded this document.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- created_at: Timestamp when the document was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the document was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### invoice_line_items (Individual charges and services detailed on an invoice.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- invoice_id: Reference to the parent invoice.
  - datatype: uuid
  - nullable: no
  - foreign key: related to invoices (id)

- source_record_id: Reference to the source of the charge (e.g., shipment_id).
  - datatype: uuid
  - nullable: yes

- source_record_type: Type of source record.
  - datatype: character varying(50)
  - nullable: yes

- description: Description of the service or charge.
  - datatype: text
  - nullable: no

- quantity: Number of units being charged.
  - datatype: numeric(10,3)
  - nullable: no
  - constraints: CHECK

- unit_price: Price per unit.
  - datatype: numeric(10,2)
  - nullable: no
  - constraints: CHECK

- total_price: Total amount for this line item (automatically calculated).
  - datatype: numeric(12,2)
  - nullable: yes

- tax_rate: Tax rate applied to this line item.
  - datatype: numeric(5,4)
  - nullable: yes
  - constraints: CHECK

- tax_amount: Tax amount for this line item (automatically calculated).
  - datatype: numeric(10,2)
  - nullable: yes

- discount_rate: Discount rate applied to this line item.
  - datatype: numeric(5,4)
  - nullable: yes
  - constraints: CHECK

- discount_amount: Discount amount for this line item (automatically calculated).
  - datatype: numeric(10,2)
  - nullable: yes

- line_total: Final total including tax and discounts (automatically calculated).
  - datatype: numeric(12,2)
  - nullable: yes

- created_at: Timestamp when the line item was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the line item was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### invoices (Bills sent to clients for services rendered or goods provided.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- client_id: Reference to the client being billed.
  - datatype: uuid
  - nullable: no
  - foreign key: related to companies (id)

- quote_id: Reference to the original quote (if applicable).
  - datatype: uuid
  - nullable: yes
  - foreign key: related to quotes (id)

- invoice_number: Unique invoice reference number.
  - datatype: character varying(100)
  - nullable: no
  - constraints: UNIQUE

- status: Current invoice status using invoice_status_enum.
  - datatype: billing.invoice_status_enum
  - nullable: yes

- issue_date: Date the invoice was created.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- due_date: Payment due date.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- total_amount: Total amount due on the invoice.
  - datatype: numeric(12,2)
  - nullable: no
  - constraints: CHECK

- amount_paid: Amount already paid against the invoice.
  - datatype: numeric(12,2)
  - nullable: yes
  - constraints: CHECK

- amount_outstanding: Outstanding amount (automatically calculated).
  - datatype: numeric(12,2)
  - nullable: yes

- currency: Currency code for the invoice.
  - datatype: character varying(3)
  - nullable: yes

- tax_amount: Total tax amount on the invoice.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- discount_amount: Total discount applied to the invoice.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- subtotal: Subtotal before tax and discounts.
  - datatype: numeric(12,2)
  - nullable: yes

- payment_terms: Payment terms and conditions.
  - datatype: text
  - nullable: yes

- notes: Additional notes on the invoice.
  - datatype: text
  - nullable: yes

- sent_at: When the invoice was sent to the client.
  - datatype: timestamp without time zone
  - nullable: yes

- paid_at: When the invoice was fully paid.
  - datatype: timestamp without time zone
  - nullable: yes

- created_by_user_id: User who created this invoice.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- created_at: Timestamp when the invoice was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the invoice was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### payments (Records of payments received against invoices.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- invoice_id: Reference to the invoice being paid.
  - datatype: uuid
  - nullable: no
  - foreign key: related to invoices (id)

- amount: Payment amount.
  - datatype: numeric(12,2)
  - nullable: no
  - constraints: CHECK

- payment_method: How the payment was made using payment_method_enum.
  - datatype: billing.payment_method_enum
  - nullable: yes

- transaction_id: Reference from payment gateway or internal system.
  - datatype: character varying(100)
  - nullable: yes
  - constraints: UNIQUE

- gateway_reference: Payment gateway transaction reference.
  - datatype: character varying(200)
  - nullable: yes

- status: Payment processing status using payment_status_enum.
  - datatype: billing.payment_status_enum
  - nullable: yes

- payment_date: When the payment was initiated.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- processed_at: When the payment was successfully processed.
  - datatype: timestamp without time zone
  - nullable: yes

- currency: Currency of the payment.
  - datatype: character varying(3)
  - nullable: yes

- exchange_rate: Exchange rate used for currency conversion.
  - datatype: numeric(10,6)
  - nullable: yes

- fees: Processing fees deducted from the payment.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- net_amount: Net amount after fees (automatically calculated).
  - datatype: numeric(12,2)
  - nullable: yes

- notes: Additional notes about the payment.
  - datatype: text
  - nullable: yes

- processed_by_user_id: User who processed this payment.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- created_at: Timestamp when the payment was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the payment was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### quotes (Price estimates provided to clients before services are performed.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- client_id: Reference to the client requesting the quote (optional for anonymous quotes).
  - datatype: uuid
  - nullable: yes
  - foreign key: related to companies (id)

- origin_details: Pickup location information.
  - datatype: jsonb
  - nullable: yes

- destination_details: Delivery location information.
  - datatype: jsonb
  - nullable: yes

- weight: Package weight for pricing calculation.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- length: Package length dimension.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- width: Package width dimension.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- height: Package height dimension.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- volume: Package volume (automatically calculated from dimensions).
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- quoted_price: Calculated price for the requested service.
  - datatype: numeric(12,2)
  - nullable: no
  - constraints: CHECK

- service_level: Type of service quoted (e.g., standard, express).
  - datatype: character varying(50)
  - nullable: yes

- expires_at: When the quote becomes invalid.
  - datatype: timestamp without time zone
  - nullable: yes

- status: Current quote status using quote_status_enum.
  - datatype: billing.quote_status_enum
  - nullable: yes

- quote_number: Unique quote reference number.
  - datatype: character varying(100)
  - nullable: no
  - constraints: UNIQUE

- notes: Additional notes about the quote.
  - datatype: text
  - nullable: yes

- created_by_user_id: User who created this quote.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- created_at: Timestamp when the quote was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the quote was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### rate_cards (Defines pricing structures for different services offered by the logistics company.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- name: Descriptive name for the rate card (e.g., "Standard Shipping Rates 2025").
  - datatype: character varying(255)
  - nullable: no

- service_type: Category of service being priced using service_type_enum.
  - datatype: billing.service_type_enum
  - nullable: yes

- is_active: Whether this rate card is currently in use.
  - datatype: boolean
  - nullable: yes

- valid_from: Date when the rate card becomes effective.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- valid_to: Date when the rate card expires.
  - datatype: date
  - nullable: yes
  - constraints: CHECK

- description: Additional details about the rate card.
  - datatype: text
  - nullable: yes

- created_by_user_id: User who created this rate card.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- created_at: Timestamp when the rate card was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the rate card was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### rate_rules (Specific pricing rules within a rate card that determine costs based on various conditions.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- rate_card_id: Reference to the parent rate card.
  - datatype: uuid
  - nullable: no
  - foreign key: related to rate_cards (id)

- condition: Condition that must be met for this rule to apply (e.g., weight_gt, zone_eq).
  - datatype: character varying(100)
  - nullable: yes

- value: Value for the condition (e.g., "5kg", "Zone A").
  - datatype: text
  - nullable: yes

- price: Price amount when this rule applies.
  - datatype: numeric(10,2)
  - nullable: no
  - constraints: CHECK

- pricing_model: How the price is calculated using pricing_model_enum.
  - datatype: billing.pricing_model_enum
  - nullable: yes

- min_value: Minimum value for range-based conditions.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- max_value: Maximum value for range-based conditions.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- priority: Rule precedence when multiple rules could apply (lower = higher priority).
  - datatype: integer
  - nullable: yes

- is_active: Whether this rule is currently active.
  - datatype: boolean
  - nullable: yes

- created_at: Timestamp when the rate rule was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the rate rule was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### surcharges (Additional charges that can be applied to base pricing for special circumstances.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- name: Name of the surcharge (e.g., "Fuel Surcharge", "Peak Season Fee").
  - datatype: character varying(255)
  - nullable: no

- type: Category of surcharge (e.g., fuel, seasonal, handling).
  - datatype: character varying(50)
  - nullable: yes

- amount: Surcharge amount or percentage.
  - datatype: numeric(10,2)
  - nullable: no
  - constraints: CHECK

- calculation_method: How the surcharge is calculated using surcharge_calculation_method_enum.
  - datatype: billing.surcharge_calculation_method_enum
  - nullable: yes

- is_active: Whether this surcharge is currently being applied.
  - datatype: boolean
  - nullable: yes

- valid_from: Date when the surcharge becomes effective.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- valid_to: Date when the surcharge expires.
  - datatype: date
  - nullable: yes
  - constraints: CHECK

- description: Additional details about the surcharge.
  - datatype: text
  - nullable: yes

- created_at: Timestamp when the surcharge was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the surcharge was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

## CRM

### attachments (Allows files to be attached to various records (e.g., contacts, opportunities, cases) for additional context.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- file_name: Name of the attached file.
  - datatype: character varying(255)
  - nullable: no

- file_path: Storage path for the file.
  - datatype: text
  - nullable: no

- mime_type: File MIME type (e.g., image/png, application/pdf).
  - datatype: character varying(100)
  - nullable: yes

- record_id: Identifier for the record the attachment is associated with.
  - datatype: uuid
  - nullable: no

- record_type: Type of record (polymorphic).
  - datatype: character varying(50)
  - nullable: yes

- created_at: timestamptz when the attachment was created.
  - datatype: timestamp with time zone
  - nullable: yes

- updated_at: timestamptz when the attachment was last updated.
  - datatype: timestamp with time zone
  - nullable: yes

### campaigns (Tracks marketing initiatives to measure their effectiveness in generating leads and opportunities.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- name: Campaign title.
  - datatype: character varying(255)
  - nullable: no

- budget: Allocated budget for the campaign.
  - datatype: numeric(12,2)
  - nullable: yes
  - constraints: CHECK

- start_date: Campaign start date.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- end_date: Campaign end date.
  - datatype: date
  - nullable: yes
  - constraints: CHECK

- created_at: timestamptz when the campaign was created.
  - datatype: timestamp with time zone
  - nullable: yes

- updated_at: timestamptz when the campaign was last updated.
  - datatype: timestamp with time zone
  - nullable: yes

### cases (Tracks customer support issues or requests from creation to resolution.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- case_number: Unique number assigned to the case.
  - datatype: character varying(100)
  - nullable: no
  - constraints: UNIQUE

- status: Current case status.
  - datatype: crm.case_status_enum
  - nullable: yes

- priority: Level of urgency (e.g., low, medium, high).
  - datatype: crm.priority_enum
  - nullable: yes

- type: Type of case (e.g., question, problem).
  - datatype: crm.case_type_enum
  - nullable: yes

- owner_id: User responsible for handling the case.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- contact_id: Linked contact for context.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to contacts (id)

- description: Detailed description of the issue.
  - datatype: text
  - nullable: yes

- created_at: timestamptz when the case was created.
  - datatype: timestamp with time zone
  - nullable: yes

- updated_at: timestamptz when the case was last updated.
  - datatype: timestamp with time zone
  - nullable: yes

### companies (Stores information about customer organizations. This is a central entity for linking contacts, opportunities, and cases.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- name: Company name.
  - datatype: character varying(255)
  - nullable: no

- street: Street address.
  - datatype: character varying(255)
  - nullable: yes

- city: City location.
  - datatype: character varying(100)
  - nullable: yes

- state: State or province.
  - datatype: character varying(100)
  - nullable: yes

- postal_code: Postal or ZIP code.
  - datatype: character varying(20)
  - nullable: yes

- country: Country of operation.
  - datatype: character varying(100)
  - nullable: yes

- phone_number: Company contact number.
  - datatype: character varying(20)
  - nullable: yes

- industry: Sector or industry type.
  - datatype: character varying(100)
  - nullable: yes

- website: Company website URL.
  - datatype: character varying(255)
  - nullable: yes

- annual_revenue: Yearly revenue figure.
  - datatype: numeric(15,2)
  - nullable: yes
  - constraints: CHECK

- owner_id: Reference to the user who owns the company record.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- created_at: timestamptz when the company was created.
  - datatype: timestamp with time zone
  - nullable: yes

- updated_at: timestamptz when the company was last updated.
  - datatype: timestamp with time zone
  - nullable: yes

### contacts (Represents individuals associated with companies, serving as the primary points of interaction.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- name: Full name of the contact.
  - datatype: character varying(255)
  - nullable: no

- email: Contact's email address.
  - datatype: character varying(255)
  - nullable: yes
  - constraints: UNIQUE

- phone_number: Contact's telephone number.
  - datatype: character varying(20)
  - nullable: yes

- job_title: Job designation or position.
  - datatype: character varying(255)
  - nullable: yes

- company_id: Identifier linking to the associated company.
  - datatype: uuid
  - nullable: no
  - foreign key: related to companies (id)

- owner_id: Reference to the user responsible for the contact.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- created_at: timestamptz when the contact was created.
  - datatype: timestamp with time zone
  - nullable: yes

- updated_at: timestamptz when the contact was last updated.
  - datatype: timestamp with time zone
  - nullable: yes

### interactions (Logs all communications and activities with contacts, providing a complete history of customer engagement.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- contact_id: Linked contact for the interaction.
  - datatype: uuid
  - nullable: no
  - foreign key: related to contacts (id)

- user_id: User who performed the interaction.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- case_id: Associated case (if applicable).
  - datatype: uuid
  - nullable: yes
  - foreign key: related to cases (id)

- type: Type of interaction (e.g., call, meeting, email).
  - datatype: crm.interaction_type_enum
  - nullable: yes

- outcome: Result of the interaction (e.g., meeting scheduled).
  - datatype: crm.interaction_outcome_enum
  - nullable: yes

- notes: Additional details or comments.
  - datatype: text
  - nullable: yes

- interaction_date: Date and time of the interaction.
  - datatype: timestamp with time zone
  - nullable: yes

- created_at: timestamptz when the interaction was created.
  - datatype: timestamp with time zone
  - nullable: yes

- updated_at: timestamptz when the interaction was last updated.
  - datatype: timestamp with time zone
  - nullable: yes

### invoice_items (Details the line items on an invoice, including products, quantities, and prices.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- invoice_id: Linked invoice record.
  - datatype: uuid
  - nullable: no
  - foreign key: related to invoices (id)

- product_id: Associated product for the line item.
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- quantity: Quantity of the product.
  - datatype: numeric(10,2)
  - nullable: no
  - constraints: CHECK

- price: Price per unit for the product.
  - datatype: numeric(10,2)
  - nullable: no
  - constraints: CHECK

- created_at: timestamptz when the invoice item was created.
  - datatype: timestamp with time zone
  - nullable: yes

- updated_at: timestamptz when the invoice item was last updated.
  - datatype: timestamp with time zone
  - nullable: yes

### invoices (Generates and tracks billing records for products or services sold in an opportunity.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- opportunity_id: Associated sales opportunity.
  - datatype: uuid
  - nullable: no
  - foreign key: related to opportunities (id)

- status: Current status of the invoice (e.g., draft, sent, paid).
  - datatype: crm.invoice_status_enum
  - nullable: yes

- total: Total amount billed.
  - datatype: numeric(12,2)
  - nullable: no
  - constraints: CHECK

- issue_date: Date on which the invoice was issued.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- due_date: Payment due date.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- sent_at: timestamptz when the invoice was sent.
  - datatype: timestamp with time zone
  - nullable: yes

- paid_at: timestamptz when payment was received.
  - datatype: timestamp with time zone
  - nullable: yes

- payment_method: Method used for payment.
  - datatype: character varying(50)
  - nullable: yes

- created_at: timestamptz when the invoice was created.
  - datatype: timestamp with time zone
  - nullable: yes

- updated_at: timestamptz when the invoice was last updated.
  - datatype: timestamp with time zone
  - nullable: yes

### leads (Captures potential customers who have shown interest but are not yet qualified.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- name: Lead's full name.
  - datatype: character varying(255)
  - nullable: no

- email: Lead's email address.
  - datatype: character varying(255)
  - nullable: yes
  - constraints: UNIQUE

- lead_source: Origin of the lead information.
  - datatype: crm.lead_source_enum
  - nullable: yes

- status: Current qualification status.
  - datatype: crm.lead_status_enum
  - nullable: yes

- lead_score: Numerical score reflecting lead quality.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- owner_id: User responsible for the lead.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- campaign_id: Associated marketing campaign.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to campaigns (id)

- converted_at: timestamptz when the lead was converted.
  - datatype: timestamp with time zone
  - nullable: yes

- converted_contact_id: Reference to the created contact upon conversion.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to contacts (id)

- converted_company_id: Reference to the company record created upon conversion.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to companies (id)

- converted_opportunity_id: Reference to the opportunity created upon conversion.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to opportunities (id)

- created_at: timestamptz when the lead was created.
  - datatype: timestamp with time zone
  - nullable: yes

- updated_at: timestamptz when the lead was last updated.
  - datatype: timestamp with time zone
  - nullable: yes

### notifications (Provides an in-app system for alerting users about important events, such as new lead assignments.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- user_id: User receiving the notification.
  - datatype: text
  - nullable: no
  - foreign key: related to user (id)

- message: Notification content.
  - datatype: text
  - nullable: no

- is_read: Boolean indicating if the notification has been read.
  - datatype: boolean
  - nullable: yes

- created_at: timestamptz when the notification was created.
  - datatype: timestamp with time zone
  - nullable: yes

- updated_at: timestamptz when the notification was last updated.
  - datatype: timestamp with time zone
  - nullable: yes

- link: URL or path for further action/reference.
  - datatype: character varying(255)
  - nullable: yes

### opportunities (Represents potential sales deals, tracked through various stages of the sales pipeline.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- name: Opportunity title.
  - datatype: character varying(255)
  - nullable: no

- stage: Current stage in the sales pipeline.
  - datatype: crm.opportunity_stage_enum
  - nullable: yes

- deal_value: Potential deal amount.
  - datatype: numeric(12,2)
  - nullable: yes
  - constraints: CHECK

- probability: Likelihood of closing, represented as a fraction or percentage.
  - datatype: numeric(5,2)
  - nullable: yes
  - constraints: CHECK

- expected_close_date: Anticipated date for closing the opportunity.
  - datatype: date
  - nullable: yes
  - constraints: CHECK

- lost_reason: Explanation for why the opportunity was lost.
  - datatype: text
  - nullable: yes

- source: Origin of the opportunity (e.g., website, referral).
  - datatype: character varying(50)
  - nullable: yes

- owner_id: User responsible for the opportunity.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- contact_id: Associated contact.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to contacts (id)

- company_id: Linked company record.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to companies (id)

- campaign_id: Related campaign.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to campaigns (id)

- created_at: timestamptz when the opportunity was created.
  - datatype: timestamp with time zone
  - nullable: yes

- updated_at: timestamptz when the opportunity was last updated.
  - datatype: timestamp with time zone
  - nullable: yes

### opportunity_products (Links products from the catalog to specific sales opportunities, detailing what is being sold.)
- opportunity_id: Identifier linking to the related opportunity.
  - datatype: uuid
  - nullable: no
  - foreign key: related to opportunities (id)
  - constraints: PRIMARY KEY, FOREIGN KEY

- product_id: Identifier linking to the product.
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)
  - constraints: PRIMARY KEY, FOREIGN KEY

- quantity: Number of units associated with the opportunity.
  - datatype: numeric(10,2)
  - nullable: no
  - constraints: CHECK

- id: (null comment)
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

### products (Manages the catalog of goods or services that can be sold to customers.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- name: Name of the product or service.
  - datatype: character varying(255)
  - nullable: no

- sku: Stock keeping unit identifier.
  - datatype: character varying(100)
  - nullable: yes
  - constraints: UNIQUE

- price: Cost of the product.
  - datatype: numeric(12,2)
  - nullable: no
  - constraints: CHECK

- type: Type of offering (e.g., service, good).
  - datatype: character varying(50)
  - nullable: yes

- description: Description or details about the product.
  - datatype: text
  - nullable: yes

- created_at: timestamptz when the product was created.
  - datatype: timestamp with time zone
  - nullable: yes

- updated_at: timestamptz when the product was last updated.
  - datatype: timestamp with time zone
  - nullable: yes

## DMS (Represents planned routes for drivers, optimized for efficiency and containing multiple delivery tasks.)

### customer_tracking_links (Provides customers with secure, unique links to track their deliveries in real-time.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- delivery_task_id: Reference to the delivery task being tracked.
  - datatype: uuid
  - nullable: no
  - foreign key: related to delivery_tasks (id)

- tracking_token: Unique, unguessable identifier for secure access.
  - datatype: character varying(255)
  - nullable: no
  - constraints: UNIQUE

- is_active: Whether the tracking link is currently valid.
  - datatype: boolean
  - nullable: yes

- access_count: Number of times the tracking link has been accessed.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- last_accessed_at: When the tracking link was last accessed.
  - datatype: timestamp without time zone
  - nullable: yes

- expires_at: When the tracking link will expire.
  - datatype: timestamp without time zone
  - nullable: yes

- created_at: Timestamp when the customer tracking link was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the customer tracking link was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### delivery_routes (Represents planned routes for drivers, optimized for efficiency and containing multiple delivery tasks.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- driver_id: Reference to the assigned driver from the TMS.
  - datatype: uuid
  - nullable: no
  - foreign key: related to drivers (id)

- route_date: Scheduled date for the delivery route.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- status: Current state of the route using delivery_route_status_enum.
  - datatype: dms.delivery_route_status_enum
  - nullable: yes

- optimized_route_data: Stored route optimization data such as polylines and turn-by-turn directions.
  - datatype: jsonb
  - nullable: yes

- total_distance_km: Total distance of the route in kilometers.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- estimated_duration_minutes: Estimated time to complete the entire route in minutes.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- actual_duration_minutes: Actual time taken to complete the route in minutes (automatically calculated from start and completion times).
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- started_at: When the route was started.
  - datatype: timestamp without time zone
  - nullable: yes

- completed_at: When the route was completed.
  - datatype: timestamp without time zone
  - nullable: yes

- created_at: Timestamp when the delivery route was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the delivery route was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### delivery_tasks (Individual delivery tasks within a route, each corresponding to a specific package that needs to be delivered.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- package_id: Reference to the package from the WMS.
  - datatype: uuid
  - nullable: no
  - foreign key: related to packages (id)

- delivery_route_id: Reference to the delivery route this task belongs to.
  - datatype: uuid
  - nullable: no
  - foreign key: related to delivery_routes (id)

- route_sequence: Order of this delivery within the route.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- delivery_address: The address where the package should be delivered.
  - datatype: text
  - nullable: no

- recipient_name: Name of the person receiving the package.
  - datatype: character varying(255)
  - nullable: no

- recipient_phone: Phone number of the recipient.
  - datatype: character varying(20)
  - nullable: yes

- delivery_instructions: Special instructions for the delivery.
  - datatype: text
  - nullable: yes

- estimated_arrival_time: Calculated time when the delivery is expected.
  - datatype: timestamp without time zone
  - nullable: yes

- actual_arrival_time: When the driver actually arrived at the delivery location.
  - datatype: timestamp without time zone
  - nullable: yes

- delivery_time: When the package was successfully delivered.
  - datatype: timestamp without time zone
  - nullable: yes

- status: Current status of the delivery task using delivery_task_status_enum.
  - datatype: dms.delivery_task_status_enum
  - nullable: yes

- failure_reason: Reason for delivery failure using delivery_failure_reason_enum.
  - datatype: dms.delivery_failure_reason_enum
  - nullable: yes

- attempt_count: Number of delivery attempts made.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- created_at: Timestamp when the delivery task was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the delivery task was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### driver_locations (Real-time location tracking for drivers, enabling accurate ETAs and route monitoring.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- driver_id: Reference to the driver from the TMS.
  - datatype: uuid
  - nullable: no
  - foreign key: related to drivers (id)

- latitude: Geographic latitude coordinate.
  - datatype: numeric(11,8)
  - nullable: no
  - constraints: CHECK

- longitude: Geographic longitude coordinate.
  - datatype: numeric(11,8)
  - nullable: no
  - constraints: CHECK

- altitude: Altitude in meters above sea level.
  - datatype: numeric(7,2)
  - nullable: yes

- accuracy: GPS accuracy in meters.
  - datatype: numeric(6,2)
  - nullable: yes
  - constraints: CHECK

- speed_kmh: Current speed in kilometers per hour.
  - datatype: numeric(6,2)
  - nullable: yes
  - constraints: CHECK

- heading: Direction of travel in degrees (0-359).
  - datatype: numeric(5,2)
  - nullable: yes
  - constraints: CHECK

- timestamp: When the location was recorded.
  - datatype: timestamp without time zone
  - nullable: no

- created_at: Timestamp when the driver location was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the driver location was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### proof_of_deliveries (Stores evidence of successful deliveries, such as signatures or photos, ensuring accountability and customer satisfaction.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- delivery_task_id: Reference to the completed delivery task.
  - datatype: uuid
  - nullable: no
  - foreign key: related to delivery_tasks (id)

- type: Type of proof collected using proof_of_delivery_type_enum.
  - datatype: dms.proof_of_delivery_type_enum
  - nullable: yes

- file_path: Storage location of the proof file (for photos).
  - datatype: character varying(500)
  - nullable: yes

- signature_data: Digital signature data (for signature proofs).
  - datatype: jsonb
  - nullable: yes

- recipient_name: Name of the person who received the package.
  - datatype: character varying(255)
  - nullable: yes

- verification_code: Code used for verification deliveries.
  - datatype: character varying(50)
  - nullable: yes

- latitude: Geographic latitude where proof was collected.
  - datatype: numeric(11,8)
  - nullable: yes
  - constraints: CHECK

- longitude: Geographic longitude where proof was collected.
  - datatype: numeric(11,8)
  - nullable: yes
  - constraints: CHECK

- timestamp: When the proof was collected.
  - datatype: timestamp without time zone
  - nullable: yes

- created_at: Timestamp when the proof of delivery was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the proof of delivery was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### task_events (Tracks status changes and events for delivery tasks, providing a detailed audit trail of the delivery process.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- delivery_task_id: Reference to the associated delivery task.
  - datatype: uuid
  - nullable: no
  - foreign key: related to delivery_tasks (id)

- status: The event status being recorded using task_event_status_enum.
  - datatype: dms.task_event_status_enum
  - nullable: yes

- reason: Additional context for the status change (e.g., "recipient not home").
  - datatype: text
  - nullable: yes

- notes: Additional notes about the event.
  - datatype: text
  - nullable: yes

- latitude: Geographic latitude where the event occurred.
  - datatype: numeric(11,8)
  - nullable: yes
  - constraints: CHECK

- longitude: Geographic longitude where the event occurred.
  - datatype: numeric(11,8)
  - nullable: yes
  - constraints: CHECK

- timestamp: When the event occurred.
  - datatype: timestamp without time zone
  - nullable: no

- created_at: Timestamp when the task event was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the task event was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

## TMS (Information about third-party transportation providers and partners.)

### carrier_rates (Pricing information for services provided by third-party carriers.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- carrier_id: Reference to the carrier providing the service.
  - datatype: uuid
  - nullable: no
  - foreign key: related to carriers (id)

- service_type: Type of transportation service.
  - datatype: character varying(100)
  - nullable: yes

- origin: Starting location for the service.
  - datatype: character varying(255)
  - nullable: yes

- destination: Ending location for the service.
  - datatype: character varying(255)
  - nullable: yes

- rate: Cost for the service.
  - datatype: numeric(10,2)
  - nullable: no
  - constraints: CHECK

- unit: Pricing unit using carrier_rate_unit_enum.
  - datatype: tms.carrier_rate_unit_enum
  - nullable: yes

- created_at: Timestamp when the rate was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the rate was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### carriers (Information about third-party transportation providers and partners.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- name: Carrier company name.
  - datatype: character varying(255)
  - nullable: no

- services_offered: Description of transportation services provided.
  - datatype: text
  - nullable: yes

- created_at: Timestamp when the carrier was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the carrier was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

- contact_person: Contact person name
  - datatype: character varying(255)
  - nullable: yes

- contact_email: Contact email address
  - datatype: character varying(255)
  - nullable: yes

- contact_phone: Contact phone number
  - datatype: character varying(20)
  - nullable: yes

### driver_schedules (Tracks driver availability and planned time off for scheduling purposes.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- driver_id: Reference to the associated driver.
  - datatype: uuid
  - nullable: no
  - foreign key: related to drivers (id)

- start_date: Beginning of the schedule period.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- end_date: End of the schedule period.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- reason: Purpose of the schedule entry using driver_schedule_reason_enum.
  - datatype: tms.driver_schedule_reason_enum
  - nullable: yes

- created_at: Timestamp when the schedule was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the schedule was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### drivers (Represents drivers who operate vehicles within the transportation fleet.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- user_id: Reference to the user account in the system.
  - datatype: text
  - nullable: no
  - foreign key: related to user (id)
  - constraints: UNIQUE

- license_number: Driver's license identification number.
  - datatype: character varying(50)
  - nullable: no
  - constraints: UNIQUE

- license_expiry_date: When the driver's license expires.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- status: Current availability status using driver_status_enum.
  - datatype: tms.driver_status_enum
  - nullable: yes

- created_at: Timestamp when the driver was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the driver was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

- contact_phone: Driver contact phone number
  - datatype: character varying(20)
  - nullable: yes

### expenses (Tracks transportation-related expenses incurred during trips.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- trip_id: Reference to the associated trip.
  - datatype: uuid
  - nullable: no
  - foreign key: related to trips (id)

- driver_id: Reference to the driver who logged the expense.
  - datatype: uuid
  - nullable: no
  - foreign key: related to drivers (id)

- type: Category of expense using expense_type_enum.
  - datatype: tms.expense_type_enum
  - nullable: yes

- amount: Financial amount of the expense.
  - datatype: numeric(10,2)
  - nullable: no
  - constraints: CHECK

- currency: Currency denomination using currency_enum.
  - datatype: character varying(3)
  - nullable: yes

- receipt_url: Link to receipt or proof of purchase.
  - datatype: character varying(500)
  - nullable: yes

- fuel_quantity: Amount of fuel purchased (if applicable).
  - datatype: numeric(8,2)
  - nullable: yes
  - constraints: CHECK

- odometer_reading: Vehicle odometer reading at time of expense.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- status: Approval status using expense_status_enum.
  - datatype: tms.expense_status_enum
  - nullable: yes

- created_at: Timestamp when the expense was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the expense was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

- description: Expense description
  - datatype: text
  - nullable: yes

- expense_date: Date of the expense
  - datatype: date
  - nullable: no
  - constraints: CHECK

### geofence_events (Records when vehicles enter or exit predefined geographic areas.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- vehicle_id: Reference to the vehicle that triggered the event.
  - datatype: uuid
  - nullable: no
  - foreign key: related to vehicles (id)

- geofence_id: Reference to the geofenced area.
  - datatype: uuid
  - nullable: no
  - foreign key: related to geofences (id)

- event_type: Type of boundary event using geofence_event_type_enum.
  - datatype: tms.geofence_event_type_enum
  - nullable: yes

- timestamp: When the event occurred.
  - datatype: timestamp without time zone
  - nullable: no

### geofences (Defines geographic boundaries for monitoring vehicle movements and triggering events.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- name: Descriptive name for the geofenced area.
  - datatype: character varying(255)
  - nullable: no

- created_at: Timestamp when the geofence was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the geofence was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

- longitude: Geographic longitude coordinate
  - datatype: numeric(11,8)
  - nullable: no
  - constraints: CHECK

- latitude: Geographic latitude coordinate
  - datatype: numeric(11,8)
  - nullable: no
  - constraints: CHECK

### gps_pings (Real-time location data from vehicles for tracking and monitoring purposes.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- vehicle_id: Reference to the vehicle sending the location data.
  - datatype: uuid
  - nullable: no
  - foreign key: related to vehicles (id)

- latitude: Geographic latitude coordinate.
  - datatype: numeric(11,8)
  - nullable: no
  - constraints: CHECK

- longitude: Geographic longitude coordinate.
  - datatype: numeric(11,8)
  - nullable: no
  - constraints: CHECK

- timestamp: When the location was recorded.
  - datatype: timestamp without time zone
  - nullable: no

### partner_invoice_items (Individual line items on carrier invoices, detailing specific shipment leg charges.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- partner_invoice_id: Reference to the parent invoice.
  - datatype: uuid
  - nullable: no
  - foreign key: related to partner_invoices (id)

- shipment_leg_id: Reference to the specific shipment leg being billed.
  - datatype: uuid
  - nullable: no
  - foreign key: related to shipment_legs (id)

- amount: Amount charged for this specific shipment leg.
  - datatype: numeric(12,2)
  - nullable: no
  - constraints: CHECK

### partner_invoices (Billing records from third-party carriers for transportation services.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- carrier_id: Reference to the carrier sending the invoice.
  - datatype: uuid
  - nullable: no
  - foreign key: related to carriers (id)

- invoice_number: Carrier's invoice identifier.
  - datatype: character varying(100)
  - nullable: no
  - constraints: UNIQUE

- invoice_date: Date the invoice was issued.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- total_amount: Total amount billed on the invoice.
  - datatype: numeric(12,2)
  - nullable: no
  - constraints: CHECK

- status: Payment status using partner_invoice_status_enum.
  - datatype: tms.partner_invoice_status_enum
  - nullable: yes

- created_at: Timestamp when the invoice was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the invoice was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### proof_of_deliveries (Evidence of successful deliveries or pickups at trip stops.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- trip_stop_id: Reference to the trip stop where proof was collected.
  - datatype: uuid
  - nullable: no
  - foreign key: related to trip_stops (id)

- type: Type of proof collected using proof_type_enum.
  - datatype: tms.proof_type_enum
  - nullable: yes

- file_path: Storage location of the proof file.
  - datatype: character varying(500)
  - nullable: yes

- timestamp: When the proof was collected.
  - datatype: timestamp without time zone
  - nullable: no

- latitude: Geographic latitude where proof was collected.
  - datatype: numeric(11,8)
  - nullable: yes
  - constraints: CHECK

- longitude: Geographic longitude where proof was collected.
  - datatype: numeric(11,8)
  - nullable: yes
  - constraints: CHECK

- created_at: Timestamp when the proof was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the proof was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### routes (Optimized route information for trips, including navigation data.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- trip_id: Reference to the associated trip.
  - datatype: uuid
  - nullable: no
  - foreign key: related to trips (id)

- optimized_route_data: Route optimization data such as polylines and turn-by-turn directions.
  - datatype: jsonb
  - nullable: yes

- total_distance: Calculated total distance of the route.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- total_duration: Estimated total time for the route.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- created_at: Timestamp when the route was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the route was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### shipment_leg_events (Tracks status updates and events for individual shipment legs.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- shipment_leg_id: Reference to the associated shipment leg.
  - datatype: uuid
  - nullable: no
  - foreign key: related to shipment_legs (id)

- status_message: Description of the status or event.
  - datatype: text
  - nullable: yes

- location: Geographic location where the event occurred.
  - datatype: character varying(255)
  - nullable: yes

- event_timestamp: When the event was recorded.
  - datatype: timestamp without time zone
  - nullable: no

### shipment_legs (Represents individual segments of multi-leg shipments that may involve different carriers or internal fleet.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- shipment_id: Reference to the overall shipment.
  - datatype: uuid
  - nullable: no
  - foreign key: related to shipments (id)

- leg_sequence: Order of this leg within the shipment journey.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- start_location: Starting point of this leg.
  - datatype: character varying(255)
  - nullable: yes

- end_location: Ending point of this leg.
  - datatype: character varying(255)
  - nullable: yes

- carrier_id: Reference to third-party carrier (if external).
  - datatype: uuid
  - nullable: yes
  - foreign key: related to carriers (id)

- internal_trip_id: Reference to internal trip (if using own fleet).
  - datatype: uuid
  - nullable: yes
  - foreign key: related to trips (id)

- status: Current status of this shipment leg using shipment_leg_status_enum.
  - datatype: tms.shipment_leg_status_enum
  - nullable: yes

- created_at: Timestamp when the shipment leg was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the shipment leg was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### trip_stops (Individual stops within a trip, typically for pickups or deliveries.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- trip_id: Reference to the parent trip.
  - datatype: uuid
  - nullable: no
  - foreign key: related to trips (id)

- shipment_id: Reference to the shipment being handled at this stop.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to shipments (id)

- sequence: Order of this stop within the trip.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- address: Physical location of the stop.
  - datatype: text
  - nullable: no

- status: Current stop status using trip_stop_status_enum.
  - datatype: tms.trip_stop_status_enum
  - nullable: yes

- estimated_arrival_time: Planned arrival time at the stop.
  - datatype: timestamp without time zone
  - nullable: yes

- actual_arrival_time: Actual recorded arrival time.
  - datatype: timestamp without time zone
  - nullable: yes

- estimated_departure_time: Planned departure time from the stop.
  - datatype: timestamp without time zone
  - nullable: yes

- actual_departure_time: Actual recorded departure time.
  - datatype: timestamp without time zone
  - nullable: yes

- created_at: Timestamp when the trip stop was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the trip stop was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### trips (Represents planned or active transportation journeys with assigned drivers and vehicles.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- driver_id: Reference to the assigned driver.
  - datatype: uuid
  - nullable: no
  - foreign key: related to drivers (id)

- vehicle_id: Reference to the assigned vehicle.
  - datatype: uuid
  - nullable: no
  - foreign key: related to vehicles (id)

- status: Current trip status using trip_status_enum.
  - datatype: tms.trip_status_enum
  - nullable: yes

- created_at: Timestamp when the trip was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the trip was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

- end_location: End location of the trip
  - datatype: character varying(255)
  - nullable: yes

- end_time: End time of the trip
  - datatype: timestamp without time zone
  - nullable: yes

- start_location: Start location of the trip
  - datatype: character varying(255)
  - nullable: no

- start_time: Start time of the trip
  - datatype: timestamp without time zone
  - nullable: no

### vehicle_maintenance (Tracks maintenance activities and service history for fleet vehicles.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- vehicle_id: Reference to the vehicle being serviced.
  - datatype: uuid
  - nullable: no
  - foreign key: related to vehicles (id)

- service_date: Date when maintenance was performed.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- service_type: Type of maintenance or repair work using vehicle_service_type_enum.
  - datatype: tms.vehicle_service_type_enum
  - nullable: yes

- cost: Financial cost of the maintenance service.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- notes: Additional details about the maintenance work.
  - datatype: text
  - nullable: yes

- created_at: Timestamp when the maintenance record was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the maintenance record was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### vehicles (Manages the fleet of vehicles available for transportation operations.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- registration_number: Vehicle's license plate or registration identifier.
  - datatype: character varying(50)
  - nullable: no
  - constraints: UNIQUE

- model: Vehicle make and model information.
  - datatype: character varying(255)
  - nullable: yes

- capacity_volume: Maximum cargo volume the vehicle can carry.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- capacity_weight: Maximum weight capacity of the vehicle.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- status: Current vehicle status using vehicle_status_enum.
  - datatype: tms.vehicle_status_enum
  - nullable: yes

- created_at: Timestamp when the vehicle was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the vehicle was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

- make: Vehicle manufacturer
  - datatype: character varying(100)
  - nullable: yes

- year: Year of manufacture
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- vin: Vehicle Identification Number
  - datatype: character varying(17)
  - nullable: yes
  - constraints: UNIQUE

- current_mileage: Current mileage of the vehicle
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- last_maintenance_date: Date of last maintenance
  - datatype: date
  - nullable: yes

## WMS (Represents the physical warehouse facilities where inventory and locations are organized and managed by the WMS.)

### bin_thresholds (Defines minimum and maximum stock levels for specific products at specific locations to trigger replenishment.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- location_id: Reference to the storage location.
  - datatype: uuid
  - nullable: no
  - foreign key: related to locations (id)

- product_id: Reference to the product being monitored (from IMS).
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- min_quantity: Minimum stock level that triggers replenishment.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- max_quantity: Maximum stock level for the location.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- reorder_quantity: Suggested quantity to reorder when minimum is reached.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- alert_threshold: Quantity that triggers low stock alerts.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- is_active: Whether this threshold monitoring is active.
  - datatype: boolean
  - nullable: yes

- created_at: Timestamp when the threshold was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the threshold was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### inbound_shipment_items (Details the specific products and quantities expected in an inbound shipment.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- inbound_shipment_id: A reference to the parent inbound shipment.
  - datatype: uuid
  - nullable: no
  - foreign key: related to inbound_shipments (id)

- product_id: The product included in the shipment.
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- expected_quantity: The quantity declared on the ASN.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- received_quantity: The actual quantity counted upon receipt.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- discrepancy_quantity: The difference between received and expected quantities (automatically calculated).
  - datatype: integer
  - nullable: yes

- discrepancy_notes: Notes detailing any differences between expected and received quantities.
  - datatype: text
  - nullable: yes

- created_at: Timestamp when the inbound shipment item was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the inbound shipment item was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### inbound_shipments (Represents an expected inbound shipment from a client or supplier (also known as an Advance Shipping Notice or ASN).)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- client_id: The client company sending the inventory.
  - datatype: uuid
  - nullable: no
  - foreign key: related to suppliers (id)

- warehouse_id: The destination warehouse.
  - datatype: uuid
  - nullable: no
  - foreign key: related to warehouses (id)

- status: The current status of the shipment using inbound_shipment_status_enum.
  - datatype: wms.inbound_shipment_status_enum
  - nullable: yes

- expected_arrival_date: The planned arrival date.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- actual_arrival_date: The date the shipment actually arrived.
  - datatype: date
  - nullable: yes
  - constraints: CHECK

- created_at: Timestamp when the inbound shipment was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the inbound shipment was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### inventory_adjustments (Logs any manual changes made to inventory levels to maintain accuracy.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- product_id: The product being adjusted.
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- warehouse_id: The warehouse where the adjustment occurred.
  - datatype: uuid
  - nullable: no
  - foreign key: related to warehouses (id)

- user_id: The user who performed the adjustment.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- quantity_change: The amount by which the quantity was changed (can be positive or negative).
  - datatype: integer
  - nullable: no

- reason: The reason for the adjustment using inventory_adjustment_reason_enum.
  - datatype: wms.inventory_adjustment_reason_enum
  - nullable: yes

- notes: Additional details about the adjustment.
  - datatype: text
  - nullable: yes

- created_at: Timestamp when the adjustment was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the adjustment was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### inventory_batches (Stores information for products that are tracked by batch or lot, essential for quality control and recalls.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- product_id: The product associated with this batch.
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- batch_number: The unique identifier for the batch/lot.
  - datatype: character varying(100)
  - nullable: no
  - constraints: UNIQUE

- expiration_date: The expiration date of the products in this batch.
  - datatype: date
  - nullable: no
  - constraints: CHECK

- created_at: Timestamp when the batch was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the batch was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### inventory_stock (Tracks actual physical inventory quantities at specific warehouse locations.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- location_id: Reference to the physical location where stock is stored.
  - datatype: uuid
  - nullable: no
  - foreign key: related to locations (id)

- product_id: Reference to the product being stored (from IMS).
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- batch_id: Reference to the inventory batch (if applicable for lot tracking).
  - datatype: uuid
  - nullable: yes
  - foreign key: related to inventory_batches (id)

- quantity: Current total quantity of product at this location.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- reserved_quantity: Quantity reserved for pending orders or tasks.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- available_quantity: Available quantity (quantity - reserved_quantity, automatically calculated).
  - datatype: integer
  - nullable: yes

- status: Current state of the inventory using inventory_stock_status_enum.
  - datatype: wms.inventory_stock_status_enum
  - nullable: yes

- last_counted_at: When this inventory was last physically counted.
  - datatype: timestamp without time zone
  - nullable: yes

- last_movement_at: When inventory was last moved in/out of this location.
  - datatype: timestamp without time zone
  - nullable: yes

- created_at: Timestamp when the inventory record was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the inventory record was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### locations (Represents physical storage locations within the warehouse, organized in a hierarchical structure.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- warehouse_id: Reference to the warehouse facility.
  - datatype: uuid
  - nullable: no
  - foreign key: related to warehouses (id)

- parent_location_id: Reference to parent location for hierarchical organization (e.g., zone > aisle > shelf > bin).
  - datatype: uuid
  - nullable: yes
  - foreign key: related to locations (id)

- name: Human-readable location identifier (e.g., A-01-B-101).
  - datatype: character varying(100)
  - nullable: no

- barcode: Machine-readable location identifier for scanning operations.
  - datatype: character varying(100)
  - nullable: yes
  - constraints: UNIQUE

- type: Classification of location purpose using location_type_enum.
  - datatype: wms.location_type_enum
  - nullable: yes

- level: The hierarchy level (0=zone, 1=aisle, 2=shelf, 3=bin, etc.).
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- path: Full hierarchical path for quick lookups (e.g., "Zone A/Aisle 01/Shelf B/Bin 101").
  - datatype: character varying(500)
  - nullable: yes

- max_weight: Maximum weight capacity for the location.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- max_volume: Maximum volume capacity for the location.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- max_pallets: Maximum number of pallets the location can hold.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- x_coordinate: X coordinate for warehouse mapping and optimization.
  - datatype: numeric(10,2)
  - nullable: yes

- y_coordinate: Y coordinate for warehouse mapping and optimization.
  - datatype: numeric(10,2)
  - nullable: yes

- z_coordinate: Z coordinate for warehouse mapping and optimization.
  - datatype: numeric(10,2)
  - nullable: yes

- is_pickable: Whether items can be picked from this location.
  - datatype: boolean
  - nullable: yes

- is_receivable: Whether items can be received into this location.
  - datatype: boolean
  - nullable: yes

- temperature_controlled: Whether this location has temperature control.
  - datatype: boolean
  - nullable: yes

- hazmat_approved: Whether this location is approved for hazardous materials.
  - datatype: boolean
  - nullable: yes

- is_active: Whether the location is currently active and available for use.
  - datatype: boolean
  - nullable: yes

- created_at: Timestamp when the location was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the location was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### outbound_shipment_items (Details the specific items, quantities, and batches included in an outbound shipment.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- outbound_shipment_id: A reference to the parent outbound shipment.
  - datatype: uuid
  - nullable: no
  - foreign key: related to outbound_shipments (id)

- sales_order_item_id: A link to the specific line item on the sales order.
  - datatype: uuid
  - nullable: no
  - foreign key: related to sales_order_items (id)

- product_id: The product being shipped.
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- batch_id: The specific batch the item was picked from (if applicable).
  - datatype: uuid
  - nullable: yes
  - foreign key: related to inventory_batches (id)

- quantity_shipped: The quantity of the product included in this shipment.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- created_at: Timestamp when the outbound shipment item was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the outbound shipment item was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### outbound_shipments (Represents the physical shipment created to fulfill a sales order.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- sales_order_id: The sales order being fulfilled.
  - datatype: uuid
  - nullable: no
  - foreign key: related to sales_orders (id)

- warehouse_id: The warehouse the shipment is being sent from.
  - datatype: uuid
  - nullable: no
  - foreign key: related to warehouses (id)

- status: The status of the outbound shipment using outbound_shipment_status_enum.
  - datatype: wms.outbound_shipment_status_enum
  - nullable: yes

- tracking_number: The carrier tracking number for the shipment.
  - datatype: character varying(100)
  - nullable: yes
  - constraints: UNIQUE

- carrier: The shipping carrier (e.g., FedEx, UPS).
  - datatype: character varying(50)
  - nullable: yes

- created_at: Timestamp when the outbound shipment was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the outbound shipment was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### package_items (Details the contents of each package, specifying which products and quantities are included.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- package_id: Reference to the package container.
  - datatype: uuid
  - nullable: no
  - foreign key: related to packages (id)

- product_id: Reference to the product included in the package (from IMS).
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- batch_id: Reference to the batch of the product (from IMS).
  - datatype: uuid
  - nullable: yes
  - foreign key: related to inventory_batches (id)

- quantity: Number of units of the product in the package.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- lot_number: Lot number for traceability.
  - datatype: character varying(100)
  - nullable: yes

- serial_numbers: Array of serial numbers for serialized items.
  - datatype: text[]
  - nullable: yes

- expiry_date: Expiry date of the packaged items.
  - datatype: date
  - nullable: yes
  - constraints: CHECK

- unit_weight: Weight per unit of the product.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- total_weight: Total weight of this line item (automatically calculated from quantity * unit_weight).
  - datatype: numeric(10,2)
  - nullable: yes

- created_at: Timestamp when the package item was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the package item was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### packages (Represents physical packages created during the packing process for sales orders.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- sales_order_id: Reference to the sales order being packaged (from IMS).
  - datatype: uuid
  - nullable: no
  - foreign key: related to sales_orders (id)

- package_number: Unique identifier for tracking the package.
  - datatype: character varying(100)
  - nullable: no
  - constraints: UNIQUE

- warehouse_id: Reference to the warehouse where the package was created.
  - datatype: uuid
  - nullable: no
  - foreign key: related to warehouses (id)

- package_type: Type of package (e.g., "box", "envelope", "pallet").
  - datatype: wms.package_type_enum
  - nullable: yes

- weight: Total weight of the packed package.
  - datatype: numeric(10,2)
  - nullable: no
  - constraints: CHECK

- length: Package length dimension.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- width: Package width dimension.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- height: Package height dimension.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- volume: Package volume (automatically calculated from length * width * height).
  - datatype: numeric(10,2)
  - nullable: yes

- tracking_number: Carrier tracking number for the package.
  - datatype: character varying(100)
  - nullable: yes

- carrier: Shipping carrier (e.g., "FedEx", "UPS", "DHL").
  - datatype: character varying(50)
  - nullable: yes

- service_level: Shipping service level (e.g., "Ground", "Express", "Overnight").
  - datatype: character varying(50)
  - nullable: yes

- packed_by_user_id: Reference to the user who packed the package.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- packed_at: When the package was packed.
  - datatype: timestamp without time zone
  - nullable: yes

- shipped_at: When the package was shipped.
  - datatype: timestamp without time zone
  - nullable: yes

- is_fragile: Whether the package contains fragile items.
  - datatype: boolean
  - nullable: yes

- is_hazmat: Whether the package contains hazardous materials.
  - datatype: boolean
  - nullable: yes

- requires_signature: Whether delivery requires signature.
  - datatype: boolean
  - nullable: yes

- insurance_value: Declared insurance value for the package.
  - datatype: numeric(12,2)
  - nullable: yes
  - constraints: CHECK

- created_at: Timestamp when the package was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the package was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### pick_batch_items (Associates individual sales orders with pick batches for grouped picking.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- pick_batch_id: Reference to the pick batch.
  - datatype: uuid
  - nullable: no
  - foreign key: related to pick_batches (id)

- sales_order_id: Reference to the sales order included in the batch (from IMS).
  - datatype: uuid
  - nullable: no
  - foreign key: related to sales_orders (id)

- order_priority: Priority of this order within the batch.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- estimated_pick_time: Estimated time to pick this order (in minutes).
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- actual_pick_time: Actual time taken to pick this order (in minutes).
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- created_at: Timestamp when the batch item was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the batch item was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### pick_batches (Groups multiple sales orders together for efficient batch picking operations.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- batch_number: Unique identifier for the pick batch.
  - datatype: character varying(100)
  - nullable: no
  - constraints: UNIQUE

- warehouse_id: Reference to the warehouse where picking occurs.
  - datatype: uuid
  - nullable: no
  - foreign key: related to warehouses (id)

- status: Current batch status using pick_batch_status_enum.
  - datatype: wms.pick_batch_status_enum
  - nullable: yes

- strategy: Picking strategy employed using pick_strategy_enum.
  - datatype: wms.pick_strategy_enum
  - nullable: yes

- priority: Batch priority for execution order (lower = higher priority).
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- assigned_user_id: Reference to the user assigned to this pick batch.
  - datatype: text
  - nullable: yes
  - foreign key: related to user (id)

- wave_id: Wave identifier for grouping batches.
  - datatype: character varying(100)
  - nullable: yes

- zone_restrictions: Array of zone restrictions for this batch.
  - datatype: text[]
  - nullable: yes

- estimated_duration: Estimated time to complete the batch (in minutes).
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- actual_duration: Actual time taken to complete the batch (in minutes).
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- total_items: Total number of items in the batch.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- completed_items: Number of completed items in the batch.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- started_at: When the batch picking was started.
  - datatype: timestamp without time zone
  - nullable: yes

- completed_at: When the batch picking was completed.
  - datatype: timestamp without time zone
  - nullable: yes

- created_at: Timestamp when the batch was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the batch was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### products (Represents the master record for each unique product (SKU) managed in the inventory.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY

- name: The common name of the product.
  - datatype: character varying(255)
  - nullable: no

- sku: The unique Stock Keeping Unit identifier.
  - datatype: character varying(100)
  - nullable: no
  - constraints: UNIQUE

- barcode: The product's barcode (e.g., UPC, EAN) for scanning.
  - datatype: character varying(100)
  - nullable: yes

- description: Detailed information about the product.
  - datatype: text
  - nullable: yes

- cost_price: The purchase price or cost of the product.
  - datatype: numeric(12,2)
  - nullable: yes
  - constraints: CHECK

- length: Physical length dimension.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- width: Physical width dimension.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- height: Physical height dimension.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- volume: Product volume (automatically calculated from length * width * height).
  - datatype: numeric(10,2)
  - nullable: yes

- weight: Physical weight.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- status: The product's lifecycle status using product_status_enum.
  - datatype: wms.product_status_enum
  - nullable: yes

- supplier_id: A reference to the product's supplier.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to suppliers (id)

- client_id: A reference to the client company (from CRM) that owns this inventory.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to companies (id)

- created_at: Timestamp when the product was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the product was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### putaway_rules (Defines automated rules for determining where incoming inventory should be stored.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- product_id: Reference to the product the rule applies to (from IMS).
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- client_id: Reference to the client (for multi-tenant warehouses).
  - datatype: uuid
  - nullable: yes
  - foreign key: related to companies (id)

- warehouse_id: Reference to the warehouse this rule applies to.
  - datatype: uuid
  - nullable: no
  - foreign key: related to warehouses (id)

- preferred_location_id: Reference to the preferred storage location.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to locations (id)

- location_type: Preferred location type for this product.
  - datatype: wms.location_type_enum
  - nullable: yes

- priority: Rule precedence when multiple rules could apply (lower = higher priority).
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- min_quantity: Minimum quantity threshold for this rule to apply.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- max_quantity: Maximum quantity threshold for this rule to apply.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- weight_threshold: Weight threshold for this rule to apply.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- volume_threshold: Volume threshold for this rule to apply.
  - datatype: numeric(10,2)
  - nullable: yes
  - constraints: CHECK

- requires_temperature_control: Whether this rule requires temperature controlled locations.
  - datatype: boolean
  - nullable: yes

- requires_hazmat_approval: Whether this rule requires hazmat approved locations.
  - datatype: boolean
  - nullable: yes

- is_active: Whether this rule is currently active.
  - datatype: boolean
  - nullable: yes

- created_at: Timestamp when the rule was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the rule was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### reorder_points (Defines the minimum stock level for a product that triggers a low stock alert.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- product_id: The product to monitor.
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- warehouse_id: The specific warehouse to monitor the stock level in.
  - datatype: uuid
  - nullable: no
  - foreign key: related to warehouses (id)

- threshold: The minimum quantity that triggers the alert.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- created_at: Timestamp when the reorder point was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the reorder point was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### return_items (Details the specific products and quantities being returned.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- return_id: A reference to the parent return record.
  - datatype: uuid
  - nullable: no
  - foreign key: related to returns (id)

- product_id: The product being returned.
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- quantity_expected: The quantity the client stated they would return.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- quantity_received: The actual quantity received at the warehouse.
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- quantity_variance: The difference between received and expected return quantities (automatically calculated).
  - datatype: integer
  - nullable: yes

- condition: The condition of the returned item using return_item_condition_enum.
  - datatype: wms.return_item_condition_enum
  - nullable: yes

- created_at: Timestamp when the return item was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the return item was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### returns (Represents a return request from a client (Reverse Logistics).)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- return_number: A unique identifier for the return.
  - datatype: character varying(100)
  - nullable: no
  - constraints: UNIQUE

- sales_order_id: A reference to the original sales order being returned.
  - datatype: uuid
  - nullable: no
  - foreign key: related to sales_orders (id)

- client_id: The client initiating the return.
  - datatype: uuid
  - nullable: no
  - foreign key: related to companies (id)

- status: The status of the return using return_status_enum.
  - datatype: wms.return_status_enum
  - nullable: yes

- reason: The reason for the return.
  - datatype: text
  - nullable: yes

- created_at: Timestamp when the return was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the return was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### sales_order_items (Details the specific products and quantities required for a sales order.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- sales_order_id: A reference to the parent sales order.
  - datatype: uuid
  - nullable: no
  - foreign key: related to sales_orders (id)

- product_id: The product being ordered.
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- quantity_ordered: The quantity of the product requested by the customer.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- created_at: Timestamp when the sales order item was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the sales order item was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### sales_orders (Represents a customer's order, often originating from the CRM, which needs to be fulfilled from inventory.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- order_number: A unique identifier for the sales order.
  - datatype: character varying(100)
  - nullable: no
  - constraints: UNIQUE

- client_id: The client company that placed the order.
  - datatype: uuid
  - nullable: no
  - foreign key: related to companies (id)

- crm_opportunity_id: A link back to the original opportunity in the CRM.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to opportunities (id)

- status: The fulfillment status of the order using sales_order_status_enum.
  - datatype: wms.sales_order_status_enum
  - nullable: yes

- shipping_address: The address where the order should be shipped.
  - datatype: text
  - nullable: yes

- created_at: Timestamp when the sales order was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the sales order was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### stock_transfers (Tracks the movement of inventory from one warehouse to another.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- product_id: The product being transferred.
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- source_warehouse_id: The warehouse the stock is moving from.
  - datatype: uuid
  - nullable: no
  - foreign key: related to warehouses (id)

- destination_warehouse_id: The warehouse the stock is moving to.
  - datatype: uuid
  - nullable: no
  - foreign key: related to warehouses (id)

- quantity: The amount of stock being transferred.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- status: The status of the transfer using stock_transfer_status_enum.
  - datatype: wms.stock_transfer_status_enum
  - nullable: yes

- created_at: Timestamp when the stock transfer was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the stock transfer was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### suppliers (Stores information about the suppliers who provide the products.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- name: The name of the supplier company.
  - datatype: character varying(255)
  - nullable: no

- contact_person: The primary contact at the supplier.
  - datatype: character varying(255)
  - nullable: yes

- email: The supplier's contact email.
  - datatype: character varying(255)
  - nullable: yes

- phone_number: The supplier's contact phone number.
  - datatype: character varying(20)
  - nullable: yes

- created_at: Timestamp when the supplier was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the supplier was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### task_items (Individual line items within a warehouse task, specifying exactly what needs to be moved or processed.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- task_id: Reference to the parent task.
  - datatype: uuid
  - nullable: no
  - foreign key: related to tasks (id)

- product_id: Reference to the product being handled (from IMS).
  - datatype: uuid
  - nullable: no
  - foreign key: related to products (id)

- batch_id: Reference to the specific batch being handled (from IMS).
  - datatype: uuid
  - nullable: yes
  - foreign key: related to inventory_batches (id)

- source_location_id: Reference to where the product should be picked from.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to locations (id)

- destination_location_id: Reference to where the product should be moved to.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to locations (id)

- quantity_required: Amount of product that needs to be handled.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- quantity_completed: Amount of product actually handled.
  - datatype: integer
  - nullable: no
  - constraints: CHECK

- quantity_remaining: Remaining quantity to be handled (automatically calculated from quantity_required - quantity_completed).
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- status: Completion status of this specific item using task_item_status_enum.
  - datatype: wms.task_item_status_enum
  - nullable: yes

- lot_number: Lot number for traceability.
  - datatype: character varying(100)
  - nullable: yes

- serial_numbers: Array of serial numbers for serialized items.
  - datatype: text[]
  - nullable: yes

- expiry_date: Expiry date of the items being handled.
  - datatype: date
  - nullable: yes

- notes: Additional notes about this task item.
  - datatype: text
  - nullable: yes

- completed_at: When this task item was completed.
  - datatype: timestamp without time zone
  - nullable: yes

- created_at: Timestamp when the task item was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the task item was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### tasks (Represents individual work assignments for warehouse personnel.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- task_number: Unique identifier for the task.
  - datatype: character varying(50)
  - nullable: no
  - constraints: UNIQUE

- warehouse_id: Reference to the warehouse where the task is performed.
  - datatype: uuid
  - nullable: no
  - foreign key: related to warehouses (id)

- user_id: Reference to the assigned warehouse worker.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to user (id)

- type: Category of warehouse task using task_type_enum.
  - datatype: wms.task_type_enum
  - nullable: yes

- status: Current task status using task_status_enum.
  - datatype: wms.task_status_enum
  - nullable: yes

- priority: Task priority for execution order (lower = higher priority).
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- source_entity_id: Reference to the entity that triggered the task (e.g., inbound_shipment_id, pick_batch_id).
  - datatype: uuid
  - nullable: yes

- source_entity_type: Type of the source entity (e.g., "inbound_shipment", "pick_batch", "return").
  - datatype: character varying(50)
  - nullable: yes

- pick_batch_id: Reference to associated pick batch if applicable.
  - datatype: uuid
  - nullable: yes
  - foreign key: related to pick_batches (id)

- estimated_duration: Estimated time to complete the task (in minutes).
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- actual_duration: Actual time taken to complete the task (in minutes).
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- instructions: Detailed instructions for completing the task.
  - datatype: text
  - nullable: yes

- notes: Additional notes or comments about the task.
  - datatype: text
  - nullable: yes

- start_time: When the task was started.
  - datatype: timestamp without time zone
  - nullable: yes

- end_time: When the task was completed.
  - datatype: timestamp without time zone
  - nullable: yes

- duration_seconds: Total time taken to complete the task in seconds (automatically calculated from start_time and end_time).
  - datatype: integer
  - nullable: yes
  - constraints: CHECK

- created_at: Timestamp when the task was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the task was last updated.
  - datatype: timestamp without time zone
  - nullable: yes

### warehouses (Represents the physical warehouse facilities where inventory and locations are organized and managed by the WMS.)
- id: Primary key
  - datatype: uuid
  - nullable: no
  - constraints: PRIMARY KEY, FOREIGN KEY

- name: The name of the warehouse (e.g., "West Coast Distribution Center").
  - datatype: character varying(255)
  - nullable: no

- address: The physical street address of the warehouse.
  - datatype: character varying(255)
  - nullable: yes

- city: The city where the warehouse is located.
  - datatype: character varying(100)
  - nullable: yes

- state: The state or province where the warehouse is located.
  - datatype: character varying(100)
  - nullable: yes

- postal_code: The postal code or ZIP code of the warehouse.
  - datatype: character varying(20)
  - nullable: yes

- country: The country where the warehouse is located.
  - datatype: character varying(100)
  - nullable: yes

- timezone: The timezone of the warehouse for scheduling operations.
  - datatype: character varying(50)
  - nullable: yes

- contact_person: The primary contact person at the warehouse.
  - datatype: character varying(255)
  - nullable: yes

- contact_email: The contact email for the warehouse.
  - datatype: character varying(255)
  - nullable: yes

- contact_phone: The contact phone number for the warehouse.
  - datatype: character varying(20)
  - nullable: yes

- is_active: Whether the warehouse is currently active and operational.
  - datatype: boolean
  - nullable: yes

- created_at: Timestamp when the warehouse was created.
  - datatype: timestamp without time zone
  - nullable: yes

- updated_at: Timestamp when the warehouse was last updated.
  - datatype: timestamp without time zone
  - nullable: yes
