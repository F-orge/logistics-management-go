# CRM Mutations Plan

## Overview

This document outlines the mutation strategy for all Customer Relations (CRM) entities in the logistics management system. Each entity includes Create, Update, and Delete mutation specifications with field-level metadata for frontend form generation and PocketBase backend operations.

### Key Principles

- **Lead Conversion**: Converting a lead creates Company, Contact, and Opportunity records atomically
- **Opportunity to Invoice**: Winning an opportunity can trigger invoice creation
- **Audit Trail**: All mutations include timestamps via PocketBase's auto-fields
- **Ownership**: Most entities require an `owner` field for access control
- **Validation**: Client-side validation via Zod, server-side via PocketBase rules

---

## Products (Service Catalog)

### Create Mutation

- **name**
  - Type: `string`
  - Label: "Product Name"
  - Description: "Name of the product or service"
  - Tooltip: "e.g., 'Next-Day Delivery', 'Warehousing Solution'"
  - Constraints: Required, max 200 chars, unique within context

- **sku**
  - Type: `string`
  - Label: "SKU"
  - Description: "Unique Stock Keeping Unit identifier"
  - Tooltip: "e.g., 'ND-DELIVERY-001', must be unique"
  - Constraints: Required, max 50 chars, unique across all products

- **price**
  - Type: `number`
  - Label: "Price"
  - Description: "Base price for this product"
  - Tooltip: "In the customer's preferred currency"
  - Constraints: Required, >= 0, 2 decimal places

- **type**
  - Type: `enum: ['service', 'good', 'digital', 'subscription']`
  - Label: "Product Type"
  - Description: "Classification of the product"
  - Tooltip: "Service (labor), Good (physical), Digital, or Subscription"
  - Constraints: Required, must be one of predefined options

- **description**
  - Type: `string (HTML)`
  - Label: "Description"
  - Description: "Detailed description of the product"
  - Tooltip: "Include features, benefits, and use cases"
  - Constraints: Optional, max 5000 chars

- **attachments**
  - Type: `file[]`
  - Label: "Attachments"
  - Description: "Product documents, images, or pricing sheets"
  - Tooltip: "Supported formats: PDF, JPG, PNG, DOCX"
  - Constraints: Optional, max 5 files, max 10MB each

### Update Mutation

- **name**: Required if updating
- **sku**: Cannot be updated after creation (immutable)
- **price**: Required if updating
- **type**: Can be updated
- **description**: Can be updated
- **attachments**: Can be added/removed

### Delete Mutation

- Constraints:
  - Cannot delete if referenced by active Opportunities
  - Cannot delete if referenced by recent Invoices (last 90 days)
  - Sales Manager role required
  - Soft-delete recommended: set is_active to false instead

---

## Campaigns

### Create Mutation

- **name**
  - Type: `string`
  - Label: "Campaign Name"
  - Description: "Name of the marketing campaign"
  - Tooltip: "e.g., 'Black Friday 2025', 'Spring Promotion'"
  - Constraints: Required, max 200 chars

- **budget**
  - Type: `number`
  - Label: "Campaign Budget"
  - Description: "Total budget allocated to this campaign"
  - Tooltip: "In USD or customer's preferred currency"
  - Constraints: Required, >= 0, 2 decimal places

- **startDate**
  - Type: `date`
  - Label: "Start Date"
  - Description: "Campaign launch date"
  - Tooltip: "When the campaign begins"
  - Constraints: Required, cannot be in the past for new campaigns

- **endDate**
  - Type: `date`
  - Label: "End Date"
  - Description: "Campaign conclusion date"
  - Tooltip: "When the campaign ends"
  - Constraints: Optional, must be >= startDate if provided

- **attachments**
  - Type: `file[]`
  - Label: "Campaign Materials"
  - Description: "Marketing collateral and promotional materials"
  - Tooltip: "Images, PDFs, presentations for the campaign"
  - Constraints: Optional, max 10 files, max 20MB each

### Update Mutation

- **name**: Can be updated
- **budget**: Can be updated
- **startDate**: Can be updated (be cautious with past dates)
- **endDate**: Can be updated
- **attachments**: Can be added/removed

### Delete Mutation

- Constraints:
  - Cannot delete if has associated Leads or Opportunities
  - Marketing Manager role required
  - Archive instead: add archived_at timestamp

---

## Leads

### Create Mutation

- **name**
  - Type: `string`
  - Label: "Lead Name"
  - Description: "Full name of the person/decision maker"
  - Tooltip: "First and last name if available"
  - Constraints: Optional

- **email**
  - Type: `email`
  - Label: "Email Address"
  - Description: "Primary email contact"
  - Tooltip: "Must be a valid email format"
  - Constraints: Optional, unique per campaign if provided

- **score**
  - Type: `number`
  - Label: "Lead Score"
  - Description: "Lead quality/hotness score"
  - Tooltip: "0-100: 0=cold, 50=warm, 100=hot. System can auto-calculate"
  - Constraints: Required, 0-100

- **source**
  - Type: `enum: ['website', 'referral', 'social-media', 'email-campaign', 'cold-call', 'event', 'advertisment', 'partner', 'other']`
  - Label: "Lead Source"
  - Description: "How the lead was acquired"
  - Tooltip: "e.g., 'event' = trade show, 'referral' = existing customer"
  - Constraints: Required, must be one of predefined options

- **status**
  - Type: `enum: ['new', 'contacted', 'qualified', 'unqualified', 'converted']`
  - Label: "Lead Status"
  - Description: "Current state of the lead in the funnel"
  - Tooltip: "new → contacted → qualified → (converted or unqualified)"
  - Constraints: Required, defaults to 'new'

- **campaign**
  - Type: `relation: Campaigns`
  - Label: "Campaign"
  - Description: "Associated marketing campaign"
  - Tooltip: "Select the campaign that generated this lead"
  - Constraints: Optional

- **owner**
  - Type: `relation: Users`
  - Label: "Lead Owner"
  - Description: "Sales person responsible for this lead"
  - Tooltip: "Usually assigned by Sales Manager"
  - Constraints: Required for lead assignment

- **attachments**
  - Type: `file[]`
  - Label: "Attachments"
  - Description: "Lead research, proposals, or notes"
  - Tooltip: "Any supporting documents"
  - Constraints: Optional, max 5 files

### Update Mutation

- **name**: Can be updated
- **email**: Can be updated (check uniqueness)
- **score**: Can be updated (auto-calculated on specific triggers)
- **source**: Cannot be changed after creation
- **status**: Can be updated (workflow validation needed)
- **campaign**: Can be updated
- **owner**: Can be reassigned (audit trail recommended)
- **attachments**: Can be added/removed

### Delete Mutation

- Constraints:
  - Cannot delete if status is 'converted'
  - Cannot delete if has related Opportunities or Contacts
  - Sales person or Sales Manager role required
  - Consider archival instead of hard delete

---

## Companies

### Create Mutation

- **name**
  - Type: `string`
  - Label: "Company Name"
  - Description: "Name of the company/organization"
  - Tooltip: "Legal business name"
  - Constraints: Required, max 200 chars

- **industry**
  - Type: `string`
  - Label: "Industry"
  - Description: "Industry sector"
  - Tooltip: "e.g., 'Manufacturing', 'Technology', 'Retail'"
  - Constraints: Optional, max 100 chars

- **annualRevenue**
  - Type: `number`
  - Label: "Annual Revenue"
  - Description: "Company's annual revenue"
  - Tooltip: "In millions USD"
  - Constraints: Optional, >= 0

- **website**
  - Type: `url`
  - Label: "Website"
  - Description: "Company website URL"
  - Tooltip: "https://example.com"
  - Constraints: Optional, must be valid URL

- **phoneNumber**
  - Type: `string`
  - Label: "Phone Number"
  - Description: "Main business phone number"
  - Tooltip: "Include country code if international"
  - Constraints: Optional, max 20 chars

- **street**
  - Type: `string`
  - Label: "Street Address"
  - Description: "Street address line"
  - Tooltip: "e.g., '123 Business Ave'"
  - Constraints: Optional, max 200 chars

- **city**
  - Type: `string`
  - Label: "City"
  - Description: "City name"
  - Tooltip: "e.g., 'San Francisco'"
  - Constraints: Optional, max 100 chars

- **state**
  - Type: `string`
  - Label: "State/Province"
  - Description: "State or province code"
  - Tooltip: "e.g., 'CA' for California"
  - Constraints: Optional, max 100 chars

- **postalCode**
  - Type: `string`
  - Label: "Postal Code"
  - Description: "ZIP or postal code"
  - Tooltip: "e.g., '94105'"
  - Constraints: Optional, max 20 chars

- **country**
  - Type: `string`
  - Label: "Country"
  - Description: "Country name"
  - Tooltip: "e.g., 'United States'"
  - Constraints: Optional, max 100 chars

- **owner**
  - Type: `relation: Users`
  - Label: "Account Owner"
  - Description: "Sales person managing this account"
  - Tooltip: "Primary point of contact internally"
  - Constraints: Optional

- **attachments**
  - Type: `file[]`
  - Label: "Company Documents"
  - Description: "Company profile, contracts, or research"
  - Tooltip: "Supporting documentation"
  - Constraints: Optional, max 10 files

### Update Mutation

- **name**: Can be updated (consider immutable)
- **industry**: Can be updated
- **annualRevenue**: Can be updated
- **website**: Can be updated
- **phoneNumber**: Can be updated
- **street, city, state, postalCode, country**: Can be updated
- **owner**: Can be reassigned
- **attachments**: Can be added/removed

### Delete Mutation

- Constraints:
  - Cannot delete if has associated Contacts
  - Cannot delete if has associated Opportunities
  - Sales Manager role required
  - Archive/deactivate recommended instead

---

## Contacts

### Create Mutation

- **name**
  - Type: `string`
  - Label: "Contact Name"
  - Description: "Full name of the contact"
  - Tooltip: "First and last name"
  - Constraints: Required, max 200 chars

- **email**
  - Type: `email`
  - Label: "Email Address"
  - Description: "Email address of the contact"
  - Tooltip: "Primary email for communication"
  - Constraints: Required, must be valid format

- **jobTitle**
  - Type: `string`
  - Label: "Job Title"
  - Description: "Contact's position in their company"
  - Tooltip: "e.g., 'Supply Chain Manager', 'Procurement Director'"
  - Constraints: Optional, max 150 chars

- **phoneNumber**
  - Type: `string`
  - Label: "Phone Number"
  - Description: "Direct phone number"
  - Tooltip: "Include country code if international"
  - Constraints: Optional, max 20 chars

- **company**
  - Type: `relation: Companies`
  - Label: "Company"
  - Description: "Associated company"
  - Tooltip: "Company this contact works for"
  - Constraints: Optional (contact may be independent)

- **owner**
  - Type: `relation: Users`
  - Label: "Contact Owner"
  - Description: "Sales person managing this contact"
  - Tooltip: "Primary internal relationship owner"
  - Constraints: Required

- **attachments**
  - Type: `file[]`
  - Label: "Contact Information"
  - Description: "Business cards, profiles, or notes"
  - Tooltip: "Any supporting contact documents"
  - Constraints: Optional, max 5 files

### Update Mutation

- **name**: Can be updated
- **email**: Can be updated (check for duplicates across company)
- **jobTitle**: Can be updated
- **phoneNumber**: Can be updated
- **company**: Can be updated (move to different company)
- **owner**: Can be reassigned
- **attachments**: Can be added/removed

### Delete Mutation

- Constraints:
  - Cannot delete if has associated Interactions
  - Cannot delete if linked to active Opportunities
  - Sales person or Sales Manager role required
  - Archive instead: soft-delete with archived_at

---

## Interactions

### Create Mutation

- **contact**
  - Type: `relation: Contacts`
  - Label: "Contact"
  - Description: "Contact this interaction involves"
  - Tooltip: "Who did we interact with?"
  - Constraints: Required

- **type**
  - Type: `enum: ['call', 'meeting', 'text', 'email']`
  - Label: "Interaction Type"
  - Description: "Type of communication"
  - Tooltip: "Call, meeting, text message, or email"
  - Constraints: Required

- **interactionDate**
  - Type: `datetime`
  - Label: "Interaction Date & Time"
  - Description: "When the interaction occurred"
  - Tooltip: "Date and time of communication"
  - Constraints: Required, auto-set to current time if not provided

- **notes**
  - Type: `string (HTML)`
  - Label: "Notes"
  - Description: "Summary of interaction"
  - Tooltip: "What was discussed? Key takeaways?"
  - Constraints: Optional, max 5000 chars

- **outcome**
  - Type: `string`
  - Label: "Outcome"
  - Description: "Result or action items"
  - Tooltip: "e.g., 'Sent proposal', 'Scheduled follow-up for Thursday'"
  - Constraints: Optional, max 500 chars

- **case**
  - Type: `relation: Cases`
  - Label: "Related Case"
  - Description: "Associated support case (if any)"
  - Tooltip: "Link to support case for context"
  - Constraints: Optional

- **user**
  - Type: `relation: Users`
  - Label: "Logged By"
  - Description: "User who logged this interaction"
  - Tooltip: "Who recorded this interaction?"
  - Constraints: Required, auto-set to current user

### Update Mutation

- **contact**: Can be updated (move to different contact)
- **type**: Can be updated
- **interactionDate**: Can be updated
- **notes**: Can be updated
- **outcome**: Can be updated
- **case**: Can be updated
- **user**: Cannot be updated (audit trail - who logged it)

### Delete Mutation

- Constraints:
  - Sales person or Manager role required
  - Consider immutable: add deleted_by and deleted_at instead
  - Keep in history for audit trail purposes

---

## Opportunities

### Create Mutation

- **name**
  - Type: `string`
  - Label: "Opportunity Name"
  - Description: "Deal or opportunity name"
  - Tooltip: "e.g., 'ABC Corp - Warehouse Solution', 'XYZ Inc - Q1 Project'"
  - Constraints: Required, max 300 chars

- **company**
  - Type: `relation: Companies`
  - Label: "Company"
  - Description: "Associated company"
  - Tooltip: "Which company is this opportunity with?"
  - Constraints: Required

- **contact**
  - Type: `relation: Contacts`
  - Label: "Primary Contact"
  - Description: "Main contact for this opportunity"
  - Tooltip: "Decision maker or primary stakeholder"
  - Constraints: Optional (contact may not be known initially)

- **dealValue**
  - Type: `number`
  - Label: "Deal Value"
  - Description: "Estimated or confirmed deal amount"
  - Tooltip: "Revenue expected from this opportunity"
  - Constraints: Required, >= 0, 2 decimal places

- **stage**
  - Type: `enum: ['prospecting', 'qualification', 'need-analysis', 'demo', 'proposal', 'negotiation', 'closed-won', 'closed-lost']`
  - Label: "Sales Stage"
  - Description: "Current stage in sales process"
  - Tooltip: "prospecting → qualification → ... → closed"
  - Constraints: Required, defaults to 'prospecting'

- **probability**
  - Type: `number`
  - Label: "Win Probability"
  - Description: "Likelihood of closing this deal"
  - Tooltip: "0-100%: chance of winning"
  - Constraints: Optional, 0-100, defaults based on stage

- **source**
  - Type: `enum: ['website', 'referral', 'social-media', 'email-campaign', 'cold-call', 'event', 'advertisment', 'partner', 'existing-customer', 'other']`
  - Label: "Opportunity Source"
  - Description: "How this opportunity was generated"
  - Tooltip: "e.g., 'existing-customer' for upsell/cross-sell"
  - Constraints: Required

- **expectedCloseDate**
  - Type: `date`
  - Label: "Expected Close Date"
  - Description: "Projected deal closure date"
  - Tooltip: "When do you expect to close this deal?"
  - Constraints: Optional, should be in future

- **campaign**
  - Type: `relation: Campaigns`
  - Label: "Associated Campaign"
  - Description: "Marketing campaign that generated this opportunity"
  - Tooltip: "Which campaign led to this opportunity?"
  - Constraints: Optional

- **products**
  - Type: `relation[]: Products`
  - Label: "Products/Services"
  - Description: "Products or services in this opportunity"
  - Tooltip: "Select multiple products/services"
  - Constraints: Optional, use Opportunity_Products junction table

- **owner**
  - Type: `relation: Users`
  - Label: "Opportunity Owner"
  - Description: "Sales person responsible for this deal"
  - Tooltip: "Who is closing this deal?"
  - Constraints: Required

- **attachments**
  - Type: `file[]`
  - Label: "Opportunity Documents"
  - Description: "Proposals, RFQs, contracts, etc."
  - Tooltip: "Supporting sales documents"
  - Constraints: Optional, max 10 files

### Update Mutation

- **name**: Can be updated
- **company**: Cannot be updated after creation
- **contact**: Can be updated
- **dealValue**: Can be updated
- **stage**: Can be updated (with validation: only forward/backward by 1 stage)
- **probability**: Can be updated
- **source**: Cannot be updated after creation
- **expectedCloseDate**: Can be updated
- **campaign**: Cannot be updated after creation
- **products**: Can be added/removed via Opportunity_Products
- **owner**: Can be reassigned
- **attachments**: Can be added/removed
- **lostReason**: Can be set when marking as closed-lost

### Delete Mutation

- Constraints:
  - Cannot delete if stage is 'closed-won' (compliance/audit)
  - Cannot delete if related Invoices exist
  - Sales Manager role required
  - Archive/deactivate instead: add archived_at

---

## Opportunity Products (Junction Table)

### Create Mutation

- **opportunity**
  - Type: `relation: Opportunities`
  - Label: "Opportunity"
  - Description: "Associated opportunity"
  - Tooltip: "Which opportunity is this product for?"
  - Constraints: Required

- **product**
  - Type: `relation: Products`
  - Label: "Product"
  - Description: "Associated product or service"
  - Tooltip: "Which product/service is being sold?"
  - Constraints: Required

- **quantity**
  - Type: `number`
  - Label: "Quantity"
  - Description: "Number of units"
  - Tooltip: "How many units of this product?"
  - Constraints: Required, > 0, integer

### Update Mutation

- **quantity**: Can be updated
- **opportunity**: Cannot be updated (move to different opportunity)
- **product**: Cannot be updated (change by deleting and re-adding)

### Delete Mutation

- Constraints:
  - Remove from opportunity without impacting product catalog
  - Can delete freely unless Invoices have been generated
  - User must have edit permission on parent Opportunity

---

## Cases

### Create Mutation

- **caseNumber**
  - Type: `string (auto-generated)`
  - Label: "Case Number"
  - Description: "Unique case identifier"
  - Tooltip: "Auto-generated: e.g., 'CASE-2025-001234'"
  - Constraints: Required, auto-generated, unique

- **contact**
  - Type: `relation: Contacts`
  - Label: "Contact"
  - Description: "Associated contact"
  - Tooltip: "Which contact is this case for?"
  - Constraints: Optional (case may be for company)

- **type**
  - Type: `enum: ['question', 'problem', 'complaint', 'feature-request', 'bug-report', 'technical-support']`
  - Label: "Case Type"
  - Description: "Category of the case"
  - Tooltip: "What kind of issue is this?"
  - Constraints: Required

- **priority**
  - Type: `enum: ['critical', 'high', 'medium', 'low']`
  - Label: "Priority"
  - Description: "Case urgency level"
  - Tooltip: "How urgent is this case?"
  - Constraints: Required, defaults to 'medium'

- **status**
  - Type: `enum: ['new', 'in-progress', 'waiting-for-customer', 'waiting-for-internal', 'escalated', 'resolved', 'closed', 'cancelled']`
  - Label: "Status"
  - Description: "Current case state"
  - Tooltip: "new → in-progress → resolved → closed"
  - Constraints: Required, defaults to 'new'

- **description**
  - Type: `string (HTML)`
  - Label: "Description"
  - Description: "Detailed description of the issue"
  - Tooltip: "Provide as much detail as possible"
  - Constraints: Required, max 10000 chars

- **owner**
  - Type: `relation: Users`
  - Label: "Assigned To"
  - Description: "Support agent handling this case"
  - Tooltip: "Who is assigned to resolve this?"
  - Constraints: Required

### Update Mutation

- **contact**: Can be updated
- **type**: Can be updated
- **priority**: Can be updated (escalation)
- **status**: Can be updated (workflow management)
- **description**: Can be updated
- **owner**: Can be reassigned
- **caseNumber**: Cannot be updated (immutable identifier)

### Delete Mutation

- Constraints:
  - Cannot delete cases with status 'in-progress'
  - Cannot delete cases within 90 days of creation (compliance)
  - Consider: mark with deleted_at instead of hard delete
  - Manager role required

---

## Invoices

### Create Mutation

- **invoiceNumber**
  - Type: `string (auto-generated)`
  - Label: "Invoice Number"
  - Description: "Unique invoice identifier"
  - Tooltip: "Auto-generated: e.g., 'INV-2025-000123'"
  - Constraints: Required, auto-generated, unique

- **opportunity**
  - Type: `relation: Opportunities`
  - Label: "Opportunity"
  - Description: "Associated won opportunity"
  - Tooltip: "Which opportunity does this invoice come from?"
  - Constraints: Optional (can also create standalone invoices)

- **quote**
  - Type: `relation: Quotes`
  - Label: "Related Quote"
  - Description: "Associated quote if this converts one"
  - Tooltip: "Was this invoice created from a quote?"
  - Constraints: Optional

- **issueDate**
  - Type: `date`
  - Label: "Issue Date"
  - Description: "Date invoice was created"
  - Tooltip: "Today's date unless specified"
  - Constraints: Required, defaults to today

- **dueDate**
  - Type: `date`
  - Label: "Due Date"
  - Description: "Payment due date"
  - Tooltip: "When is payment due?"
  - Constraints: Optional, typically 30-60 days from issue date

- **status**
  - Type: `enum: ['draft', 'sent', 'viewed', 'paid', 'partial-paid', 'past-due', 'disputed', 'cancelled', 'void']`
  - Label: "Status"
  - Description: "Current invoice state"
  - Tooltip: "draft → sent → viewed → paid"
  - Constraints: Required, defaults to 'draft'

- **currency**
  - Type: `string`
  - Label: "Currency"
  - Description: "Invoice currency"
  - Tooltip: "e.g., 'USD', 'EUR', 'PHP'"
  - Constraints: Optional, defaults to USD

- **subtotal**
  - Type: `number`
  - Label: "Subtotal"
  - Description: "Sum of all line items before tax/discount"
  - Tooltip: "Calculated automatically"
  - Constraints: Required, >= 0, auto-calculated

- **discountAmount**
  - Type: `number`
  - Label: "Discount"
  - Description: "Total discount applied"
  - Tooltip: "Can be fixed amount or percentage"
  - Constraints: Optional, >= 0

- **totalAmount**
  - Type: `number`
  - Label: "Total"
  - Description: "Final invoice amount"
  - Tooltip: "subtotal - discount (auto-calculated)"
  - Constraints: Required, auto-calculated

- **notes**
  - Type: `string (HTML)`
  - Label: "Notes"
  - Description: "Payment terms, special instructions"
  - Tooltip: "Any additional information for the customer"
  - Constraints: Optional, max 2000 chars

- **paymentTerms**
  - Type: `string (HTML)`
  - Label: "Payment Terms"
  - Description: "Payment conditions"
  - Tooltip: "e.g., 'Net 30', '2/10 Net 30'"
  - Constraints: Optional, max 500 chars

- **attachments**
  - Type: `file[]`
  - Label: "Attachments"
  - Description: "Invoice PDF, supporting documents"
  - Tooltip: "Finalized invoice and related documents"
  - Constraints: Optional, max 5 files

- **createdBy**
  - Type: `relation: Users`
  - Label: "Created By"
  - Description: "User who created the invoice"
  - Tooltip: "Who generated this invoice?"
  - Constraints: Required, auto-set to current user

### Update Mutation

- **issueDate**: Cannot be updated after status != 'draft'
- **status**: Can be updated (with validation)
- **dueDate**: Can be updated
- **currency**: Cannot be updated after sent
- **subtotal, totalAmount**: Auto-calculated (read-only)
- **discountAmount**: Can be updated
- **notes**: Can be updated
- **paymentTerms**: Can be updated
- **attachments**: Can be added/removed

### Delete Mutation

- Constraints:
  - Cannot delete if status is 'paid' or 'partial-paid' (compliance)
  - Cannot delete if sent to customer (status != 'draft')
  - Account Manager role required
  - Mark as void instead of hard delete

---

## Invoice Items

### Create Mutation

- **invoice**
  - Type: `relation: Invoices`
  - Label: "Invoice"
  - Description: "Associated invoice"
  - Tooltip: "Which invoice is this line item for?"
  - Constraints: Required

- **description**
  - Type: `string (HTML)`
  - Label: "Description"
  - Description: "Line item description"
  - Tooltip: "Product name, service description, or custom text"
  - Constraints: Required, max 500 chars

- **quantity**
  - Type: `number`
  - Label: "Quantity"
  - Description: "Number of units"
  - Tooltip: "How many of this item?"
  - Constraints: Required, > 0, up to 2 decimal places

- **unitPrice**
  - Type: `number`
  - Label: "Unit Price"
  - Description: "Price per unit"
  - Tooltip: "Price before discount/tax"
  - Constraints: Required, >= 0, 2 decimal places

- **discountRate**
  - Type: `number`
  - Label: "Discount %"
  - Description: "Discount percentage"
  - Tooltip: "0-100% discount on this line"
  - Constraints: Optional, 0-100

- **discountAmount**
  - Type: `number`
  - Label: "Discount Amount"
  - Description: "Discount as fixed amount"
  - Tooltip: "Fixed discount on this line"
  - Constraints: Optional, >= 0

- **taxRate**
  - Type: `number`
  - Label: "Tax %"
  - Description: "Tax rate percentage"
  - Tooltip: "e.g., 10 for 10% VAT"
  - Constraints: Optional, 0-100

- **taxAmount**
  - Type: `number`
  - Label: "Tax Amount"
  - Description: "Calculated tax amount"
  - Tooltip: "Auto-calculated based on tax rate"
  - Constraints: Auto-calculated (read-only)

### Update Mutation

- **description**: Can be updated
- **quantity**: Can be updated
- **unitPrice**: Can be updated
- **discountRate**: Can be updated
- **discountAmount**: Can be updated
- **taxRate**: Can be updated
- **taxAmount**: Auto-calculated (read-only)
- **invoice**: Cannot be updated (move by deleting and re-adding)

### Delete Mutation

- Constraints:
  - Cannot delete if parent Invoice status != 'draft'
  - Removing items from sent invoice requires credit note
  - Account Manager role required

---

## Special Mutation Scenarios

### Lead Conversion

**Trigger**: User updates Lead.status from 'contacted' or 'qualified' to 'converted'

**Atomic Operation** (must all succeed or all fail):

1. Update Lead record:
   - Set status = 'converted'
   - Set convertedAt = now()
   - Set convertedCompany = newly created company ID
   - Set convertedContact = newly created contact ID
   - Set convertedOpportunity = newly created opportunity ID

2. Create Company (if not already associated):
   - name: Use lead.name or prompt user
   - owner: Set to Lead.owner
   - Inherit address fields if available

3. Create Contact:
   - name: From Lead.name
   - email: From Lead.email
   - company: New company ID
   - owner: Lead.owner

4. Create Opportunity:
   - name: Auto-generated from lead + company
   - company: New company ID
   - contact: New contact ID
   - stage: 'prospecting'
   - owner: Lead.owner
   - source: From Lead.source
   - dealValue: 0 (to be updated)

5. Create initial Interaction (optional):
   - contact: New contact ID
   - type: 'email'
   - notes: "Lead converted on [date]"
   - user: Current user

### Opportunity to Invoice

**Trigger**: User updates Opportunity.stage to 'closed-won'

**Optional Automatic Operation**:

1. Create draft Invoice:
   - opportunity: Opportunity ID
   - issueDate: Today
   - status: 'draft'
   - currency: From Opportunity or default

2. Auto-populate Invoice Items from Opportunity_Products:
   - For each product in Opportunity:
     - Create InvoiceItem with product details
     - quantity: From Opportunity_Products
     - unitPrice: From Products.price
     - Auto-calculate totals

**Post-Opportunity Close**:

1. Update related Interactions:
   - Create automatic interaction: "Opportunity closed-won"

2. Trigger Notifications (optional):
   - Notify owner: "Opportunity won! Invoice created"
   - Notify manager: For reporting/forecasting

### Batch Imports

**Lead Bulk Import from CSV**:

- File format: CSV with columns: name, email, company, source, [others]
- Validation: Check required fields, email format, source values
- Preview: Show N records to be imported
- Confirmation: User reviews and confirms
- Atomic: All records succeed or fail together
- Result: Return summary (N created, M failed, errors)

### Cascading Updates

**When Opportunity stage changes**:
- Update probability based on stage
- Validate forward/backward movement
- Optionally update expected close date

**When Product price changes**:
- Update only new Opportunities (don't affect existing ones)
- Notify Sales Manager of price changes

**When Contact is deleted**:
- Cascade check: Interactions, Cases, Opportunities using this contact
- Prevent deletion if referenced elsewhere
- Or use soft-delete (mark archived)

---

## Notes for Implementation

### Frontend (React + TanStack Router/Query)

1. **Form Generation**: Use field metadata (type, constraints) to auto-generate forms
2. **Validation**: Create Zod schemas from this spec
3. **Real-time Updates**: Use TanStack Query invalidation on mutations
4. **Optimistic Updates**: Show changes immediately, revert on error
5. **Relationships**: Implement lazy-loading for relation fields
6. **Transactions**: For complex mutations (lead conversion), show loading state

### Backend (PocketBase + Go)

1. **Hooks**: Use beforeCreate/afterCreate/beforeUpdate/etc. hooks
2. **Validation**: Implement business rules (stage progression, deletion constraints)
3. **Transactions**: Atomic operations for multi-table mutations
4. **Audit Trail**: Track who created/updated/deleted each record
5. **Cascade Behavior**: Implement referential integrity checks
6. **Notifications**: Trigger after successful mutations

### Database

1. **Indexes**: Add on frequently queried fields (owner, status, stage, created)
2. **Migrations**: One migration per table with constraints
3. **Foreign Keys**: Enforce referential integrity
4. **Triggers**: For auto-numbering (invoiceNumber, caseNumber)
