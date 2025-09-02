```mermaid
erDiagram
    %% Shared Entities (Defined in other diagrams)
    crm_companies {
        string id PK
        string name
    }
    lms_shipments {
        string id PK
        string tracking_number
    }

    %% BILLING

    billing_rate_cards {
        string id PK
        string name
        string service_type "e.g., shipping, storage, fulfillment"
        boolean is_active
        datetime valid_from
        datetime valid_to
        datetime created_at
        datetime updated_at
    }

    billing_rate_rules {
        string id PK
        string rate_card_id FK
        string condition "e.g., weight_gt, zone_eq"
        string value
        decimal price
        string pricing_model "e.g., per_kg, flat_rate"
        datetime created_at
        datetime updated_at
    }

    billing_surcharges {
        string id PK
        string name
        string type "e.g., fuel, seasonal"
        decimal amount
        string calculation_method "e.g., percentage, fixed"
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    billing_quotes {
        string id PK
        string client_id FK "Optional, for logged-in users"
        text origin_details
        text destination_details 
        decimal weight
        decimal length
        decimal width
        decimal height
        decimal quoted_price
        string service_level
        datetime expires_at
        string status "e.g., pending, accepted, expired"
        datetime created_at
        datetime updated_at
    }

    billing_client_accounts {
        string id PK
        string client_id FK "crm_companies.id"
        decimal credit_limit
        decimal available_credit
        decimal wallet_balance
        datetime created_at
        datetime updated_at
    }

    billing_account_transactions {
        string id PK
        string client_account_id FK
        string type "e.g., credit, debit, top_up"
        decimal amount
        string source_record_id "e.g., invoice_id, payment_id"
        string source_record_type
        datetime transaction_date
    }

    billing_invoices {
        string id PK
        string client_id FK "crm_companies.id"
        string quote_id FK "Optional"
        string status "e.g., draft, sent, paid, past_due, disputed"
        date issue_date
        date due_date
        decimal total_amount
        decimal amount_paid
        datetime created_at
        datetime updated_at
    }

    billing_invoice_line_items {
        string id PK
        string invoice_id FK
        string source_record_id "e.g., shipment_id, storage_period_id"
        string source_record_type
        string description
        int quantity
        decimal unit_price
        decimal total_price
    }

    billing_payments {
        string id PK
        string invoice_id FK
        decimal amount
        string payment_method "e.g., credit_card, wallet, qr_ph, client_credit"
        string transaction_id "From payment gateway or internal ref"
        string status "e.g., pending, successful, failed"
        datetime payment_date
    }

    billing_disputes {
        string id PK
        string line_item_id FK
        string client_id FK
        string reason
        string status "e.g., open, under_review, approved, denied"
        datetime created_at
        datetime updated_at
    }

    billing_credit_notes {
        string id PK
        string invoice_id FK
        string dispute_id FK "Optional"
        decimal amount
        string reason
        datetime issue_date
    }

    billing_documents {
        string id PK
        string record_id "polymorphic"
        string record_type "e.g., lms_shipments, billing_invoices"
        string document_type "e.g., bol, commercial_invoice, packing_list"
        string file_path
        datetime created_at
    }

    billing_accounting_sync_log {
        string id PK
        string record_id "e.g., invoice_id, payment_id"
        string record_type
        string external_system "e.g., quickbooks, xero"
        string external_id
        string status "e.g., pending, success, failed"
        text error_message
        datetime last_sync_at
    }

    %% Relationships
    billing_rate_cards              ||--|{ billing_rate_rules : "has"
    crm_companies                   ||--o{ billing_quotes : "requests"
    billing_quotes                  |o--o{ billing_invoices : "can generate"
    crm_companies                   ||--o{ billing_client_accounts : "has"
    billing_client_accounts         ||--|{ billing_account_transactions : "has"
    crm_companies                   ||--|{ billing_invoices : "receives"
    billing_invoices                ||--|{ billing_invoice_line_items : "contains"
    billing_invoices                ||--|{ billing_payments : "has"
    billing_invoices                ||--o{ billing_credit_notes : "can have"
    billing_invoice_line_items      ||--o{ billing_disputes : "can be"
    billing_disputes                |o--o{ billing_credit_notes : "can result in"
    lms_shipments                   |o--o{ billing_documents : "has"
    billing_invoices                |o--o{ billing_documents : "has"
```

## Billing Domain Explanation

The Billing System is a comprehensive financial management component of the
logistics platform that handles all aspects of pricing, invoicing, payments, and
financial reporting. It manages complex pricing structures, generates accurate
invoices, processes payments, handles disputes, and integrates with external
accounting systems. The billing system integrates seamlessly with the Customer
Relationship Management ([CRM](./crm.md)) for client information and the
Logistics Management System ([LMS](./ims.md)) for shipment-based billing.

Actors involved in this system include billing specialists, finance managers,
accounting personnel, customer service representatives, sales managers, and
clients. These roles interact with the billing system to perform tasks such as
creating rate cards, generating quotes, processing invoices, managing payments,
resolving disputes, and maintaining financial records for compliance and
reporting.

Below is a detailed explanation of each entity and its key fields (excluding the
redundant fields `id`, `created_at`, and `updated_at`).

### Billing Rate Cards

Defines pricing structures for different services offered by the logistics
company.

- `name`: Descriptive name for the rate card (e.g., "Standard Shipping Rates
  2025").
- `service_type`: Category of service being priced (e.g., shipping, storage,
  fulfillment).
- `is_active`: Whether this rate card is currently in use.
- `valid_from`: Date when the rate card becomes effective.
- `valid_to`: Date when the rate card expires.

### Billing Rate Rules

Specific pricing rules within a rate card that determine costs based on various
conditions.

- `rate_card_id`: Reference to the parent rate card.
- `condition`: Condition that must be met for this rule to apply (e.g.,
  weight_gt, zone_eq).
- `value`: Value for the condition (e.g., "5kg", "Zone A").
- `price`: Price amount when this rule applies.
- `pricing_model`: How the price is calculated (e.g., per_kg, flat_rate).

### Billing Surcharges

Additional charges that can be applied to base pricing for special
circumstances.

- `name`: Name of the surcharge (e.g., "Fuel Surcharge", "Peak Season Fee").
- `type`: Category of surcharge (e.g., fuel, seasonal, handling).
- `amount`: Surcharge amount or percentage.
- `calculation_method`: How the surcharge is calculated (e.g., percentage,
  fixed).
- `is_active`: Whether this surcharge is currently being applied.

### Billing Quotes

Price estimates provided to clients before services are performed.

- `client_id`: Reference to the client requesting the quote (optional for
  anonymous quotes).
- `origin_details`: Pickup location information.
- `destination_details`: Delivery location information.
- `weight`: Package weight for pricing calculation.
- `length`: Package length dimension.
- `width`: Package width dimension.
- `height`: Package height dimension.
- `quoted_price`: Calculated price for the requested service.
- `service_level`: Type of service quoted (e.g., standard, express).
- `expires_at`: When the quote becomes invalid.
- `status`: Current quote status (e.g., pending, accepted, expired).

### Billing Client Accounts

Financial account information for clients, including credit limits and wallet
balances.

- `client_id`: Reference to the client company.
- `credit_limit`: Maximum credit amount allowed for the client.
- `available_credit`: Current available credit balance.
- `wallet_balance`: Prepaid balance available for services.

### Billing Account Transactions

Records all financial transactions affecting client accounts.

- `client_account_id`: Reference to the affected client account.
- `type`: Type of transaction (e.g., credit, debit, top_up).
- `amount`: Transaction amount.
- `source_record_id`: Reference to the source document (e.g., invoice_id,
  payment_id).
- `source_record_type`: Type of source document.
- `transaction_date`: When the transaction occurred.

### Billing Invoices

Bills sent to clients for services rendered or goods provided.

- `client_id`: Reference to the client being billed.
- `quote_id`: Reference to the original quote (if applicable).
- `status`: Current invoice status (e.g., draft, sent, paid, past_due,
  disputed).
- `issue_date`: Date the invoice was created.
- `due_date`: Payment due date.
- `total_amount`: Total amount due on the invoice.
- `amount_paid`: Amount already paid against the invoice.

### Billing Invoice Line Items

Individual charges and services detailed on an invoice.

- `invoice_id`: Reference to the parent invoice.
- `source_record_id`: Reference to the source of the charge (e.g., shipment_id).
- `source_record_type`: Type of source record.
- `description`: Description of the service or charge.
- `quantity`: Number of units being charged.
- `unit_price`: Price per unit.
- `total_price`: Total amount for this line item.

### Billing Payments

Records of payments received against invoices.

- `invoice_id`: Reference to the invoice being paid.
- `amount`: Payment amount.
- `payment_method`: How the payment was made (e.g., credit_card, wallet, qr_ph,
  client_credit).
- `transaction_id`: Reference from payment gateway or internal system.
- `status`: Payment processing status (e.g., pending, successful, failed).
- `payment_date`: When the payment was processed.

### Billing Disputes

Records of client disputes regarding invoice charges.

- `line_item_id`: Reference to the disputed invoice line item.
- `client_id`: Reference to the client raising the dispute.
- `reason`: Explanation of why the charge is being disputed.
- `status`: Current dispute status (e.g., open, under_review, approved, denied).

### Billing Credit Notes

Credits issued to clients for adjustments, refunds, or dispute resolutions.

- `invoice_id`: Reference to the related invoice.
- `dispute_id`: Reference to the dispute (if applicable).
- `amount`: Credit amount being issued.
- `reason`: Explanation for the credit note.
- `issue_date`: Date the credit note was created.

### Billing Documents

Manages document attachments related to billing and shipping records.

- `record_id`: Reference to the record the document is attached to.
- `record_type`: Type of record (e.g., lms_shipments, billing_invoices).
- `document_type`: Type of document (e.g., bol, commercial_invoice,
  packing_list).
- `file_path`: Storage location of the document file.

### Billing Accounting Sync Log

Tracks synchronization of financial data with external accounting systems.

- `record_id`: Reference to the record being synchronized.
- `record_type`: Type of record being synchronized.
- `external_system`: Target accounting system (e.g., quickbooks, xero).
- `external_id`: ID assigned by the external system.
- `status`: Synchronization status (e.g., pending, success, failed).
- `error_message`: Details of any synchronization errors.
- `last_sync_at`: Timestamp of the last synchronization attempt.
