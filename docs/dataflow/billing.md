## Billing Data Flow Explanation

This document outlines the data flows within the Billing System, a comprehensive
financial engine that handles everything from initial price quoting to recurring
invoicing, payment processing, and financial reporting.

### Pricing & Quoting Flow

This flow describes how prices are managed and how clients or sales staff can
get instant quotes for services.

```mermaid
graph TD
    subgraph "Pricing Configuration"
        PA[Pricing Analyst] -- Manages --> RateCards[(billing_rate_cards)]
        PA -- Manages --> Surcharges[(billing_surcharges)]
        RateCards -- Contain --> RateRules[(billing_rate_rules)]
    end

    subgraph "Quoting Process"
        User[Client / Sales Rep] -- Enters Shipment Details --> QuoteRequest{Request Quote}
        QuoteRequest -- Uses --> PricingEngine[Pricing Engine]
        PricingEngine -- Consumes --> RateCards
        PricingEngine -- Consumes --> Surcharges
        PricingEngine -- Generates --> Quote[(billing_quotes)]
        Quote -- Is Presented to --> User
    end
```

- **Pricing Configuration**: A **Pricing Analyst** is responsible for setting up
  and maintaining the core pricing logic. They create **Rate Cards** which
  contain specific **Rate Rules** (e.g., price per kg for Zone A). They also
  manage global **Surcharges** (e.g., fuel, seasonal).
- **Quoting Process**: A **Client** or **Sales Rep** provides shipment details
  (origin, destination, dimensions). The system's **Pricing Engine** uses the
  active rate cards and surcharges to calculate a price and generates a
  **Quote** for the user to review.

### Upfront Payment & Order Creation Flow (Order-to-Cash)

This flow details how a client accepts a quote and pays for it immediately,
triggering the creation of a shipment.

```mermaid
graph TD
    subgraph "Quote Acceptance & Payment"
        Client -- Accepts --> Quote[(billing_quotes)]
        Quote -- Initiates --> PaymentProcess{Initiate Payment}
        PaymentProcess -- Redirects to --> PaymentGateway[Payment Gateway - e.g., Stripe, Maya]
        Client -- Pays via Card/QR --> PaymentGateway
    end

    subgraph "System Confirmation"
        PaymentGateway -- Sends Confirmation --> CreatePaymentRecord{Create Payment Record}
        CreatePaymentRecord --> Payment[(billing_payments)]
        
        CreatePaymentRecord -- Triggers --> GenerateInvoice{Generate Invoice}
        GenerateInvoice --> Invoice[(billing_invoices)]
        Invoice -- Is Marked as --> PaidStatus[Status: Paid]
        
        CreatePaymentRecord -- Also Triggers --> CreateShipment{Create Shipment in LMS}
        CreateShipment --> LMSShipment[(lms_shipments)]
    end
```

- **Payment**: The **Client** accepts the quote and is redirected to a
  third-party **Payment Gateway** to pay securely.
- **Confirmation**: Upon successful payment, the gateway notifies the system.
- **Record Creation**: The system creates a **Payment** record, generates a
  corresponding **Invoice** and marks it as "Paid," and, crucially, creates the
  actual **Shipment** record in the Logistics Management System (LMS),
  officially starting the delivery process.

### Automated Service & Recurring Billing Flow

This flow describes the automated process for invoicing clients for ongoing
services like storage and fulfillment.

```mermaid
graph TD
    subgraph "Data Aggregation (End of Period)"
        SystemJob[Scheduled System Job] -- Runs --> GatherData{Gather Billable Data}
        IMS[(IMS/WMS)] -- Provides Storage Usage --> GatherData
        WMS[(WMS)] -- Provides Fulfillment Activity --> GatherData
        CRM[(CRM)] -- Provides Client Billing Info --> GatherData
    end

    subgraph "Invoice Generation"
        GatherData -- Feeds into --> InvoiceEngine{Invoice Generation Engine}
        RateCards[(billing_rate_cards)] -- Provides Rates to --> InvoiceEngine
        InvoiceEngine -- Creates --> Invoice[(billing_invoices)]
        Invoice -- Contains --> LineItems[(billing_invoice_line_items)]
        Invoice -- Is Sent to --> Client[Client]
    end
```

- **Data Aggregation**: At the end of a billing cycle, a **Scheduled System
  Job** runs. It pulls usage data from other systems: storage volume from the
  IMS/WMS and fulfillment activity (picks, packs) from the WMS.
- **Invoice Generation**: The system's **Invoice Generation Engine** processes
  this data, applies the correct rates from the **Rate Cards**, and creates a
  detailed **Invoice**. The invoice contains itemized **Line Items** for each
  charge and is sent to the client's billing contact, whose information is
  sourced from the CRM.

### Client Account & Dispute Management Flow

This flow covers how flexible payment options (credit/wallet) and billing
disputes are handled.

```mermaid
graph TD
    subgraph "Client Account Management"
        AM[Accounts Manager] -- Sets --> CreditLimit[Credit Limit / Wallet]
        CreditLimit -- Is Part of --> ClientAccount[(billing_client_accounts)]
        
        Client[Client] -- Uses Service --> DebitAccount{Debit Client Account}
        DebitAccount -- Creates --> Transaction[(billing_account_transactions)]
        ClientAccount -- Low Balance? --> LowBalanceAlert[Send Low Balance Alert]
    end

    subgraph "Dispute Resolution"
        Client -- On Portal, Disputes --> LineItem[(billing_invoice_line_items)]
        LineItem -- Creates --> DisputeRecord[(billing_disputes)]
        AM -- Reviews --> DisputeRecord
        DisputeRecord -- Approved? --> GenerateCreditNote{Generate Credit Note}
        GenerateCreditNote --> CreditNote[(billing_credit_notes)]
        CreditNote -- Is Applied to --> Invoice[(billing_invoices)]
    end
```

- **Account Management**: An **Accounts Manager** can set a **Credit Limit** or
  enable a pre-paid **Wallet** for a client. When the client uses a service,
  their account is debited via a **Transaction** record. The system can
  automatically notify clients when their wallet balance is low.
- **Dispute Resolution**: A **Client** can dispute a specific **Line Item** on
  an invoice through their portal. This flags the item and creates a **Dispute**
  record. The **Accounts Manager** reviews the dispute. If approved, the system
  generates a **Credit Note**, which is then applied to the original invoice to
  adjust the total amount due.

### Financial Reporting & Integration Flow

This flow describes how financial data is used for internal reporting and
synchronized with external accounting systems.

```mermaid
graph TD
    subgraph "Internal Reporting"
        FM[Finance Manager] -- Runs --> GenerateReport{Generate A/R Aging Report}
        Invoices[(billing_invoices)] -- Provides Data for --> GenerateReport
        GenerateReport --> ARReport[A/R Aging Report]
    end

    subgraph "External Integration"
        Accountant[Accountant] -- Manages --> SyncProcess{Accounting Sync Process}
        Invoices -- Are Synced by --> SyncProcess
        Payments[(billing_payments)] -- Are Synced by --> SyncProcess
        SyncProcess -- Pushes Data to --> AccountingSoftware[External Accounting Software]
        SyncProcess -- Logs Results to --> SyncLog[(billing_accounting_sync_log)]
    end
```

- **Reporting**: A **Finance Manager** can generate financial reports, such as
  an **Accounts Receivable (A/R) Aging Report**, which pulls data from all
  outstanding **Invoices** to track late payments.
- **Integration**: An automated **Sync Process**, overseen by an **Accountant**,
  pushes all new **Invoices** and **Payments** to the company's external
  **Accounting Software** (e.g., QuickBooks, Xero). The outcome of each
  synchronization attempt is recorded in a **Sync Log**.

### Document Management Flow

This flow illustrates how critical shipping documents are generated and managed
within the system.

```mermaid
graph TD
    subgraph "Automated Document Generation"
        LMSShipment[(lms_shipments)] -- Is Confirmed --> TriggerDocGen{Trigger Document Generation}
        TriggerDocGen -- Creates --> AutoDoc[e.g., Bill of Lading]
        AutoDoc -- Is Stored as --> BillingDocument1[(billing_documents)]
    end

    subgraph "Manual Document Upload"
        LC[Logistics Coordinator] -- Uploads --> ManualDoc[e.g., Commercial Invoice, Packing List]
        ManualDoc -- Is Stored as --> BillingDocument2[(billing_documents)]
    end

    subgraph "Document Association"
        BillingDocument1 -- Is Attached to --> LMSShipment
        BillingDocument2 -- Is Attached to --> LMSShipment
    end
```

- **Automated Generation**: When a **Shipment** is confirmed in the LMS, the
  system automatically generates necessary documents, like a Bill of Lading
  (BOL). This document is pre-filled with shipment data and saved in the
  **Billing Documents** repository.
- **Manual Upload**: A **Logistics Coordinator** can manually upload other
  required files, such as a commercial invoice or a certificate of origin. These
  are also stored as **Billing Documents**.
- **Association**: Both automatically generated and manually uploaded documents
  are linked directly to the corresponding shipment record, ensuring all
  paperwork is centralized and easily accessible for compliance, auditing, or
  customer service purposes.
