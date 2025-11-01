# Billing Schema Test Cases

This document outlines comprehensive test cases for the Billing System schema that should be integrated into the testing suite at `@packages/graphql/tests/client/billing/`. The test cases are organized by entity and operation type (CRUD mutations and queries), and are aligned with the data flows documented in `@docs/dataflow/billing.md` and user stories in `@docs/stories/billing.md`.

## Test Case Structure

Each entity follows this pattern:
- **Create Operations**: Valid creation, missing required fields, invalid input
- **Update Operations**: Valid updates, partial updates, invalid field updates
- **Delete Operations**: Successful deletion, non-existent records
- **Query Operations**: Table queries with pagination, search queries with filters, analytics queries with aggregations
- **Integration & Cross-Entity Tests**: End-to-end workflows
- **Performance & Error Handling Tests**: Concurrency, edge cases, real-time scenarios

---

## 1. Rate Card Test Cases

### 1.1 Create Rate Card Tests

#### Valid Cases
- **Create rate card with required fields**
  - Input: name, service_type, effective_date, status
  - Expected: Rate card created with "Active" status
  - Related Story: Rate Card and Pricing Engine Management

- **Create rate card with full information**
  - Input: name, service_type, description, effective_date, expiry_date, currency, status
  - Expected: All fields persisted correctly

- **Create multiple rate cards for different service types**
  - Input: Shipping, Storage, Fulfillment service types
  - Expected: Each rate card created independently with correct service type

#### Invalid Cases
- **Create rate card without name**
  - Expected: Validation error

- **Create rate card without service_type**
  - Expected: Validation error

- **Create rate card with past effective_date**
  - Expected: Validation error or warning

- **Create rate card with expiry_date before effective_date**
  - Expected: Validation error

- **Create rate card with invalid currency code**
  - Expected: Validation error

### 1.2 Update Rate Card Tests

#### Valid Cases
- **Update rate card name**
  - Expected: Name updated, audit trail recorded

- **Update rate card description**
  - Expected: Description updated

- **Update rate card status to Inactive**
  - Expected: Status changed, affects future quote calculations

- **Update rate card effective dates**
  - Expected: Dates updated, validation against existing rates

- **Update rate card currency**
  - Expected: Currency updated with conversion considerations

#### Invalid Cases
- **Update rate card with conflicting dates**
  - Expected: Validation error

- **Update non-existent rate card**
  - Expected: Not found error

- **Update active rate card during billing cycle**
  - Expected: Warning or prevention based on business rules

### 1.3 Delete Rate Card Tests

#### Valid Cases
- **Delete rate card with no associated quotes**
  - Expected: Rate card deleted/archived

- **Archive rate card instead of hard delete**
  - Expected: Rate card marked as deleted but data retained for audit

#### Invalid Cases
- **Delete rate card with active quotes**
  - Expected: Error or cascade behavior

- **Delete non-existent rate card**
  - Expected: Not found error

### 1.4 Rate Card Query Tests

#### Table Rate Card Query
- **Retrieve all rate cards with pagination**
  - Expected: Paginated list of rate cards

- **Retrieve rate cards sorted by effective_date**
  - Expected: Chronologically sorted

- **Retrieve rate cards by service_type**
  - Input: service_type = 'Shipping'
  - Expected: Only shipping rate cards returned

- **Retrieve active rate cards only**
  - Input: status = 'Active'
  - Expected: Active rate cards only

#### Search Rate Card Query
- **Search rate cards by name**
  - Input: name contains "Zone"
  - Expected: Matching rate cards

- **Search rate cards by service_type**
  - Input: service_type = 'Storage'
  - Expected: Storage-related rate cards

#### Analytics Rate Card Query
- **Get rate card usage statistics**
  - Expected: Number of quotes, invoices per rate card

- **Get rate card performance metrics**
  - Expected: Average prices, revenue generated

---

## 2. Rate Rule Test Cases

### 2.1 Create Rate Rule Tests

#### Valid Cases
- **Create rate rule with required fields**
  - Input: rate_card_id, rule_name, rule_type, pricing_model, parameters
  - Expected: Rate rule created and linked to rate card
  - Related Story: Rate Card and Pricing Engine Management

- **Create rate rule with weight-based pricing**
  - Input: rule_type='weight', pricing_model='stepped', parameters={tiers}
  - Expected: Weight tiers created correctly

- **Create rate rule with zone-based pricing**
  - Input: rule_type='zone', parameters={zone_matrix}
  - Expected: Zone matrix stored correctly

- **Create rate rule with service-level pricing**
  - Input: rule_type='service_level', parameters={Standard: $50, Express: $100}
  - Expected: Service levels configured

- **Create rate rule with minimum charge**
  - Input: minimum_charge=25
  - Expected: Minimum charge applies to calculations

#### Invalid Cases
- **Create rate rule without rate_card_id**
  - Expected: Validation error

- **Create rate rule with invalid pricing_model**
  - Expected: Validation error

- **Create rate rule with empty parameters**
  - Expected: Validation error

- **Create rate rule for non-existent rate card**
  - Expected: Foreign key error

### 2.2 Update Rate Rule Tests

#### Valid Cases
- **Update rate rule pricing parameters**
  - Expected: Parameters updated, affects future calculations

- **Update rate rule name**
  - Expected: Name updated

- **Update rate rule status to Inactive**
  - Expected: Status changed

#### Invalid Cases
- **Update rate rule with invalid parameters format**
  - Expected: Validation error

- **Update non-existent rate rule**
  - Expected: Not found error

- **Update rate rule affecting active quotes**
  - Expected: Warning based on quote state

### 2.3 Delete Rate Rule Tests

#### Valid Cases
- **Delete rate rule with no associated quotes**
  - Expected: Rate rule deleted

#### Invalid Cases
- **Delete rate rule with active quotes**
  - Expected: Error or cascade behavior

### 2.4 Rate Rule Query Tests

#### Table Rate Rule Query
- **Retrieve all rate rules for a rate card**
  - Input: rate_card_id
  - Expected: All rules for that card

- **Retrieve rate rules by type**
  - Input: rule_type='zone'
  - Expected: Zone-based rules only

#### Search Rate Rule Query
- **Search rate rules by name**
  - Input: name contains "Zone"
  - Expected: Matching rules

---

## 3. Surcharge Test Cases

### 3.1 Create Surcharge Tests

#### Valid Cases
- **Create surcharge with required fields**
  - Input: name, surcharge_type, amount, unit, effective_date, status
  - Expected: Surcharge created with "Active" status
  - Related Story: Rate Card and Pricing Engine Management

- **Create fixed amount surcharge**
  - Input: surcharge_type='fixed', amount=50, unit='amount'
  - Expected: Fixed surcharge stored correctly

- **Create percentage surcharge**
  - Input: surcharge_type='percentage', amount=10, unit='percent'
  - Expected: Percentage surcharge stored correctly

- **Create fuel surcharge**
  - Input: name='Fuel Surcharge', surcharge_type='percentage', amount=15
  - Expected: Fuel surcharge created

- **Create seasonal surcharge**
  - Input: name='Holiday Surcharge', effective_date, expiry_date
  - Expected: Time-limited surcharge created

#### Invalid Cases
- **Create surcharge without name**
  - Expected: Validation error

- **Create surcharge with negative amount**
  - Expected: Validation error

- **Create surcharge with invalid unit**
  - Expected: Validation error

### 3.2 Update Surcharge Tests

#### Valid Cases
- **Update surcharge amount**
  - Expected: Amount updated, affects future quotes

- **Update surcharge status**
  - Expected: Status changed

- **Update surcharge dates**
  - Expected: Date range updated

#### Invalid Cases
- **Update surcharge with conflicting dates**
  - Expected: Validation error

- **Update non-existent surcharge**
  - Expected: Not found error

### 3.3 Delete Surcharge Tests

#### Valid Cases
- **Delete surcharge with no active quotes**
  - Expected: Surcharge deleted

#### Invalid Cases
- **Delete active surcharge affecting quotes**
  - Expected: Error or cascade behavior

### 3.4 Surcharge Query Tests

#### Table Surcharge Query
- **Retrieve all surcharges with pagination**
  - Expected: Paginated list

- **Retrieve active surcharges only**
  - Expected: Active surcharges

- **Retrieve surcharges by type**
  - Input: surcharge_type='percentage'
  - Expected: Percentage surcharges only

#### Search Surcharge Query
- **Search surcharges by name**
  - Input: name contains "Fuel"
  - Expected: Fuel-related surcharges

---

## 4. Quote Test Cases

### 4.1 Create Quote Tests

#### Valid Cases
- **Create quote with required fields**
  - Input: client_id, shipment_details, service_level, rates, surcharges
  - Expected: Quote created with reference number
  - Related Story: Upfront Shipment Quoting and Billing

- **Create quote with shipment details**
  - Input: origin, destination, weight, dimensions, service_level
  - Expected: Quote calculated and displayed

- **Create quote with service level selection**
  - Input: service_level='Express', shipment_details
  - Expected: Price updated for Express service

- **Create quote with surcharges applied**
  - Input: shipment_details, fuel_surcharge=true, holiday_surcharge=true
  - Expected: All applicable surcharges applied

- **Create quote for multiple service types**
  - Input: Shipping + Storage + Fulfillment rates
  - Expected: Combined quote generated

#### Invalid Cases
- **Create quote without client_id**
  - Expected: Validation error

- **Create quote with invalid shipment details**
  - Expected: Validation error

- **Create quote with non-existent rate card**
  - Expected: Calculation error

- **Create quote with invalid service level**
  - Expected: Validation error

### 4.2 Update Quote Tests

#### Valid Cases
- **Update quote shipment details**
  - Expected: Quote recalculated with new pricing

- **Update quote service level**
  - Expected: Price updated

- **Update quote status to Accepted**
  - Expected: Status changed, triggers next step in flow

- **Update quote status to Expired**
  - Expected: Quote no longer usable

#### Invalid Cases
- **Update accepted quote**
  - Expected: Error - cannot modify accepted quotes

- **Update quote with invalid details**
  - Expected: Validation error

- **Update non-existent quote**
  - Expected: Not found error

### 4.3 Delete Quote Tests

#### Valid Cases
- **Delete draft quote**
  - Expected: Quote deleted

#### Invalid Cases
- **Delete accepted quote**
  - Expected: Error - cannot delete accepted quotes

- **Delete quote with associated payment**
  - Expected: Error or cascade behavior

### 4.4 Quote Query Tests

#### Table Quote Query
- **Retrieve all quotes with pagination**
  - Expected: Paginated list of quotes

- **Retrieve quotes by client**
  - Input: client_id
  - Expected: Quotes for that client

- **Retrieve quotes by status**
  - Input: status='Accepted'
  - Expected: Accepted quotes only

- **Retrieve quotes by date range**
  - Input: from_date, to_date
  - Expected: Quotes created within range

#### Search Quote Query
- **Search quotes by reference number**
  - Input: reference_number='QT-001'
  - Expected: Matching quote

- **Search quotes by client name**
  - Input: client_name contains "ABC"
  - Expected: Quotes for matching clients

#### Analytics Quote Query
- **Get quote-to-order conversion rate**
  - Expected: Percentage of accepted vs total quotes

- **Get average quote value**
  - Expected: Mean, median, std dev of quote amounts

- **Get quote status distribution**
  - Expected: Count by status

---

## 5. Payment Test Cases

### 5.1 Create Payment Tests

#### Valid Cases
- **Create payment with required fields**
  - Input: quote_id, payment_method, amount, currency, payment_gateway_reference
  - Expected: Payment created with "Pending" status
  - Related Story: Upfront Shipment Quoting and Billing

- **Create payment via credit card**
  - Input: payment_method='credit_card', payment_gateway_reference
  - Expected: Payment created and linked to gateway

- **Create payment via QR code**
  - Input: payment_method='qr_code', payment_gateway_reference
  - Expected: QR payment recorded

- **Create payment for full quote amount**
  - Expected: Payment status "Pending Confirmation"

- **Create partial payment**
  - Input: amount < quote_total
  - Expected: Partial payment created

#### Invalid Cases
- **Create payment without quote_id**
  - Expected: Validation error

- **Create payment with invalid payment_method**
  - Expected: Validation error

- **Create payment for non-existent quote**
  - Expected: Foreign key error

- **Create payment with amount exceeding quote**
  - Expected: Validation error or warning

- **Create duplicate payment for same quote**
  - Expected: Duplicate check error

### 5.2 Update Payment Tests

#### Valid Cases
- **Update payment status to Confirmed**
  - Expected: Status changed, triggers invoice and shipment creation
  - Related Story: Upfront Shipment Quoting and Billing

- **Update payment status to Failed**
  - Expected: Status changed, sends notification

- **Update payment reference number**
  - Expected: Reference updated

#### Invalid Cases
- **Update confirmed payment**
  - Expected: Error - cannot modify confirmed payments

- **Update payment with invalid status**
  - Expected: Validation error

- **Update non-existent payment**
  - Expected: Not found error

### 5.3 Delete Payment Tests

#### Valid Cases
- **Delete pending payment**
  - Expected: Payment deleted/archived

#### Invalid Cases
- **Delete confirmed payment**
  - Expected: Error - cannot delete confirmed payments

- **Delete payment with associated invoice**
  - Expected: Error or cascade behavior

### 5.4 Payment Query Tests

#### Table Payment Query
- **Retrieve all payments with pagination**
  - Expected: Paginated list

- **Retrieve payments by status**
  - Input: status='Confirmed'
  - Expected: Confirmed payments only

- **Retrieve payments by date range**
  - Input: from_date, to_date
  - Expected: Payments within range

- **Retrieve payments by payment method**
  - Input: payment_method='credit_card'
  - Expected: Credit card payments only

#### Search Payment Query
- **Search payments by reference number**
  - Input: payment_gateway_reference
  - Expected: Matching payment

- **Search payments by quote**
  - Input: quote_id
  - Expected: Payments for that quote

#### Analytics Payment Query
- **Get payment success rate**
  - Expected: Percentage of confirmed vs total

- **Get average payment amount**
  - Expected: Mean, median of payment amounts

- **Get payment method distribution**
  - Expected: Count by method

---

## 6. Invoice Test Cases

### 6.1 Create Invoice Tests

#### Valid Cases
- **Create invoice from payment**
  - Input: payment_id, quote_id, invoice_items
  - Expected: Invoice created with "Paid" status
  - Related Story: Upfront Shipment Quoting and Billing

- **Create invoice from manual billing**
  - Input: client_id, invoice_items, invoice_date
  - Expected: Invoice created with "Pending" status

- **Create invoice from automated service billing**
  - Input: client_id, billing_period, usage_data
  - Expected: Invoice generated with line items
  - Related Story: Automated Client Service Billing

- **Create invoice with multiple line items**
  - Expected: All items included with correct totals

- **Create invoice with surcharges**
  - Expected: Surcharges applied and itemized

- **Create invoice with credit notes applied**
  - Expected: Total adjusted by credits

#### Invalid Cases
- **Create invoice without client_id**
  - Expected: Validation error

- **Create invoice with empty line items**
  - Expected: Validation error

- **Create invoice with invalid payment_id**
  - Expected: Foreign key error

- **Create duplicate invoice**
  - Expected: Duplicate check error

### 6.2 Update Invoice Tests

#### Valid Cases
- **Update invoice status to Paid**
  - Expected: Status changed, cleared from A/R

- **Update invoice status to Cancelled**
  - Expected: Status changed, reverses line items

- **Update invoice due date**
  - Expected: Due date updated

- **Update invoice notes**
  - Expected: Notes updated

#### Invalid Cases
- **Update paid invoice amount**
  - Expected: Error - cannot modify paid invoices

- **Update non-existent invoice**
  - Expected: Not found error

### 6.3 Delete Invoice Tests

#### Valid Cases
- **Delete draft invoice**
  - Expected: Invoice deleted

#### Invalid Cases
- **Delete paid invoice**
  - Expected: Error - cannot delete paid invoices

- **Delete invoice with associated disputes**
  - Expected: Error or cascade behavior

### 6.4 Invoice Query Tests

#### Table Invoice Query
- **Retrieve all invoices with pagination**
  - Expected: Paginated list

- **Retrieve invoices by client**
  - Input: client_id
  - Expected: Invoices for that client

- **Retrieve invoices by status**
  - Input: status='Pending'
  - Expected: Pending invoices only

- **Retrieve invoices by date range**
  - Input: from_date, to_date
  - Expected: Invoices created within range

- **Retrieve overdue invoices**
  - Expected: Invoices with due_date < today and status != Paid

#### Search Invoice Query
- **Search invoices by invoice number**
  - Input: invoice_number='INV-001'
  - Expected: Matching invoice

- **Search invoices by client name**
  - Input: client_name contains "ABC"
  - Expected: Invoices for matching clients

#### Analytics Invoice Query
- **Get total revenue by client**
  - Expected: Sum of all paid invoices

- **Get average invoice amount**
  - Expected: Mean of all invoices

- **Get invoice status distribution**
  - Expected: Count by status

- **Get A/R aging report**
  - Expected: Breakdown by age buckets (Current, 1-30, 31-60, 60+)

---

## 7. Invoice Line Item Test Cases

### 7.1 Create Invoice Line Item Tests

#### Valid Cases
- **Create line item with required fields**
  - Input: invoice_id, description, quantity, unit_price, amount
  - Expected: Line item created and totals updated
  - Related Story: Automated Client Service Billing

- **Create storage charge line item**
  - Input: description='Monthly storage', quantity=1000, unit_price=0.50
  - Expected: Line item created with calculated amount

- **Create fulfillment charge line item**
  - Input: description='Pick & pack', quantity=100, unit_price=2.50
  - Expected: Line item created

- **Create surcharge line item**
  - Input: description='Fuel surcharge', amount=50
  - Expected: Surcharge line item created

- **Create credit line item (negative)**
  - Input: amount=-25 (dispute credit)
  - Expected: Credit line item created

#### Invalid Cases
- **Create line item without invoice_id**
  - Expected: Validation error

- **Create line item with negative quantity**
  - Expected: Validation error

- **Create line item with zero unit_price**
  - Expected: Validation error

- **Create line item for non-existent invoice**
  - Expected: Foreign key error

### 7.2 Update Line Item Tests

#### Valid Cases
- **Update line item quantity**
  - Expected: Amount recalculated, invoice total updated

- **Update line item unit price**
  - Expected: Amount recalculated

- **Update line item description**
  - Expected: Description updated

#### Invalid Cases
- **Update line item on paid invoice**
  - Expected: Error - cannot modify paid invoice items

- **Update line item with invalid quantity**
  - Expected: Validation error

- **Update non-existent line item**
  - Expected: Not found error

### 7.3 Delete Line Item Tests

#### Valid Cases
- **Delete line item from draft invoice**
  - Expected: Line item deleted, totals updated

#### Invalid Cases
- **Delete line item from paid invoice**
  - Expected: Error

- **Delete only line item from invoice**
  - Expected: Error - invoice must have at least one item

### 7.4 Line Item Query Tests

#### Table Line Item Query
- **Retrieve all line items for invoice**
  - Input: invoice_id
  - Expected: All items for that invoice

- **Retrieve line items by type**
  - Input: type='surcharge'
  - Expected: Surcharge items only

#### Search Line Item Query
- **Search line items by description**
  - Input: description contains "storage"
  - Expected: Matching line items

---

## 8. Client Account Test Cases

### 8.1 Create Client Account Tests

#### Valid Cases
- **Create client account with credit limit**
  - Input: client_id, account_type='credit', credit_limit=10000
  - Expected: Account created with credit limit
  - Related Story: Client Credit and Pre-Paid Wallet Management

- **Create client account with pre-paid wallet**
  - Input: client_id, account_type='wallet', initial_balance=5000
  - Expected: Account created with wallet balance

- **Create client account with both credit and wallet**
  - Input: client_id, credit_limit=10000, wallet_balance=5000
  - Expected: Both options available

- **Create account with low balance threshold**
  - Input: low_balance_threshold=500
  - Expected: Threshold set for notifications

#### Invalid Cases
- **Create account without client_id**
  - Expected: Validation error

- **Create account with invalid account_type**
  - Expected: Validation error

- **Create account with negative credit_limit**
  - Expected: Validation error

- **Create duplicate account for client**
  - Expected: Duplicate check error

### 8.2 Update Client Account Tests

#### Valid Cases
- **Update credit limit**
  - Expected: Limit updated

- **Update wallet balance (top-up)**
  - Input: add_amount=1000
  - Expected: Balance increased, transaction created

- **Update low balance threshold**
  - Expected: Threshold updated

- **Update account status to Suspended**
  - Expected: Status changed, blocks new transactions

#### Invalid Cases
- **Update with negative amount**
  - Expected: Validation error

- **Update non-existent account**
  - Expected: Not found error

### 8.3 Delete Client Account Tests

#### Valid Cases
- **Delete account with zero balance**
  - Expected: Account deleted/archived

#### Invalid Cases
- **Delete account with outstanding balance**
  - Expected: Error

- **Delete account with active transactions**
  - Expected: Error or cascade behavior

### 8.4 Client Account Query Tests

#### Table Query
- **Retrieve all client accounts with pagination**
  - Expected: Paginated list

- **Retrieve accounts by type**
  - Input: account_type='wallet'
  - Expected: Wallet accounts only

- **Retrieve accounts below low balance threshold**
  - Expected: Accounts needing top-up

#### Search Query
- **Search accounts by client name**
  - Input: client_name
  - Expected: Matching accounts

#### Analytics Query
- **Get total credit extended across clients**
  - Expected: Sum of all credit limits

- **Get total wallet balance**
  - Expected: Sum of all wallet balances

---

## 9. Account Transaction Test Cases

### 9.1 Create Account Transaction Tests

#### Valid Cases
- **Create debit transaction**
  - Input: client_account_id, transaction_type='debit', amount=100, reference
  - Expected: Transaction created, account balance updated
  - Related Story: Client Credit and Pre-Paid Wallet Management

- **Create credit transaction (payment)**
  - Input: transaction_type='credit', amount=500
  - Expected: Transaction created, balance increased

- **Create transaction with reference to shipment**
  - Input: reference_type='shipment', reference_id
  - Expected: Transaction linked to shipment

- **Create transaction with invoice reference**
  - Input: reference_type='invoice', reference_id
  - Expected: Transaction linked to invoice

#### Invalid Cases
- **Create transaction without account_id**
  - Expected: Validation error

- **Create transaction with invalid type**
  - Expected: Validation error

- **Create debit transaction exceeding balance**
  - Expected: Validation error or warning

- **Create transaction for non-existent account**
  - Expected: Foreign key error

### 9.2 Update Transaction Tests

#### Valid Cases
- **Update transaction amount (if pending)**
  - Expected: Amount updated

- **Update transaction status to Reversed**
  - Expected: Status changed, account balance reversed

#### Invalid Cases
- **Update completed transaction**
  - Expected: Error - cannot modify completed

- **Update transaction to exceed credit limit**
  - Expected: Validation error

### 9.3 Delete Transaction Tests

#### Valid Cases
- **Delete pending transaction**
  - Expected: Transaction deleted, no balance impact

#### Invalid Cases
- **Delete completed transaction**
  - Expected: Error - use reversal instead

### 9.4 Transaction Query Tests

#### Table Query
- **Retrieve all transactions for account**
  - Input: client_account_id
  - Expected: All transactions for that account

- **Retrieve transactions by type**
  - Input: transaction_type='debit'
  - Expected: Debit transactions only

- **Retrieve transactions by date range**
  - Input: from_date, to_date
  - Expected: Transactions within range

#### Search Query
- **Search transactions by reference**
  - Input: reference_id
  - Expected: Matching transactions

#### Analytics Query
- **Get total debits vs credits**
  - Expected: Running balance calculation

- **Get transaction summary by type**
  - Expected: Total debits, total credits

---

## 10. Dispute Test Cases

### 10.1 Create Dispute Tests

#### Valid Cases
- **Create dispute on line item**
  - Input: invoice_line_item_id, dispute_reason, client_comment
  - Expected: Dispute created with "Pending" status
  - Related Story: Invoice Dispute Resolution Workflow

- **Create dispute with documentation**
  - Input: line_item_id, reason, attachments
  - Expected: Dispute created with attachments

- **Create dispute with evidence**
  - Input: reason, supporting_documents
  - Expected: Documents attached to dispute

#### Invalid Cases
- **Create dispute without line_item_id**
  - Expected: Validation error

- **Create dispute on paid/closed invoice**
  - Expected: Validation error based on business rules

- **Create duplicate dispute on same line item**
  - Expected: Duplicate check error

- **Create dispute for non-existent line item**
  - Expected: Foreign key error

### 10.2 Update Dispute Tests

#### Valid Cases
- **Update dispute status to Under Review**
  - Expected: Status changed, routes to accounts manager

- **Update dispute status to Approved**
  - Expected: Status changed, triggers credit note creation
  - Related Story: Invoice Dispute Resolution Workflow

- **Update dispute status to Denied**
  - Expected: Status changed, sends rejection to client

- **Update dispute with resolution notes**
  - Expected: Notes added by accounts manager

#### Invalid Cases
- **Update resolved dispute**
  - Expected: Error - cannot reopen resolved disputes

- **Update with invalid status**
  - Expected: Validation error

### 10.3 Delete Dispute Tests

#### Valid Cases
- **Delete pending dispute**
  - Expected: Dispute deleted

#### Invalid Cases
- **Delete resolved dispute**
  - Expected: Error - maintain audit trail

### 10.4 Dispute Query Tests

#### Table Query
- **Retrieve all disputes with pagination**
  - Expected: Paginated list

- **Retrieve disputes by status**
  - Input: status='Pending'
  - Expected: Pending disputes only

- **Retrieve disputes by client**
  - Input: client_id
  - Expected: Disputes filed by that client

- **Retrieve disputes by date range**
  - Input: from_date, to_date
  - Expected: Disputes created within range

#### Search Query
- **Search disputes by line item**
  - Input: line_item_id
  - Expected: Disputes for that item

#### Analytics Query
- **Get dispute rate by client**
  - Expected: Percentage of invoices with disputes

- **Get average dispute amount**
  - Expected: Mean disputed amount

- **Get dispute resolution distribution**
  - Expected: Count of Approved, Denied, Pending

---

## 11. Credit Note Test Cases

### 11.1 Create Credit Note Tests

#### Valid Cases
- **Create credit note from approved dispute**
  - Input: dispute_id, amount, reason
  - Expected: Credit note created
  - Related Story: Invoice Dispute Resolution Workflow

- **Create credit note from overpayment**
  - Input: reason='overpayment', amount, invoice_id
  - Expected: Credit note created and applied

- **Create credit note from service failure**
  - Input: reason='service_failure', amount
  - Expected: Credit note created

#### Invalid Cases
- **Create credit note without dispute_id or reason**
  - Expected: Validation error

- **Create credit note with zero amount**
  - Expected: Validation error

- **Create credit note with negative amount**
  - Expected: Validation error

### 11.2 Update Credit Note Tests

#### Valid Cases
- **Update credit note status to Issued**
  - Expected: Status changed, applied to invoice

- **Update credit note status to Used**
  - Expected: Status changed when consumed

#### Invalid Cases
- **Update issued credit note amount**
  - Expected: Error - cannot modify issued notes

### 11.3 Delete Credit Note Tests

#### Valid Cases
- **Delete unused credit note**
  - Expected: Credit note deleted

#### Invalid Cases
- **Delete used credit note**
  - Expected: Error - maintain audit trail

### 11.4 Credit Note Query Tests

#### Table Query
- **Retrieve all credit notes with pagination**
  - Expected: Paginated list

- **Retrieve credit notes by status**
  - Input: status='Issued'
  - Expected: Issued credit notes only

#### Search Query
- **Search credit notes by dispute**
  - Input: dispute_id
  - Expected: Credit notes for that dispute

#### Analytics Query
- **Get total credit notes issued**
  - Expected: Sum of all credit amounts

---

## 12. Document Test Cases

### 12.1 Create Document Tests

#### Valid Cases
- **Create document from shipment**
  - Input: shipment_id, document_type='Bill of Lading', file_path
  - Expected: Document created and linked
  - Related Story: Shipping Documentation Management

- **Create manually uploaded document**
  - Input: document_type='Commercial Invoice', file_path, uploaded_by
  - Expected: Document stored with metadata

- **Create document with metadata**
  - Input: document_type, file_path, description, tags
  - Expected: Document created with all metadata

#### Invalid Cases
- **Create document without document_type**
  - Expected: Validation error

- **Create document with invalid file path**
  - Expected: Validation error

- **Create document for non-existent shipment**
  - Expected: Foreign key error

### 12.2 Update Document Tests

#### Valid Cases
- **Update document description**
  - Expected: Description updated

- **Update document status to Archived**
  - Expected: Status changed

#### Invalid Cases
- **Update non-existent document**
  - Expected: Not found error

### 12.3 Delete Document Tests

#### Valid Cases
- **Delete document with no references**
  - Expected: Document deleted

#### Invalid Cases
- **Delete document attached to active shipment**
  - Expected: Error or archive instead

### 12.4 Document Query Tests

#### Table Query
- **Retrieve all documents for shipment**
  - Input: shipment_id
  - Expected: All documents for that shipment

- **Retrieve documents by type**
  - Input: document_type='Bill of Lading'
  - Expected: BOL documents only

#### Search Query
- **Search documents by description**
  - Input: description contains "customs"
  - Expected: Matching documents

---

## 13. Accounting Sync Log Test Cases

### 13.1 Create Sync Log Entry Tests

#### Valid Cases
- **Create sync log for invoice**
  - Input: entity_type='invoice', entity_id, sync_status='pending', target_system
  - Expected: Log entry created
  - Related Story: Integration with Accounting Software

- **Create sync log for payment**
  - Input: entity_type='payment', payment_id, sync_status='pending'
  - Expected: Log entry created

#### Invalid Cases
- **Create log without entity_type**
  - Expected: Validation error

### 13.2 Update Sync Log Entry Tests

#### Valid Cases
- **Update log status to Synced**
  - Expected: Status changed, sync_timestamp recorded
  - Related Story: Integration with Accounting Software

- **Update log status to Failed**
  - Input: error_message
  - Expected: Status changed, error logged

- **Update log with external_reference**
  - Input: external_reference from accounting system
  - Expected: Reference stored for reconciliation

#### Invalid Cases
- **Update non-existent log**
  - Expected: Not found error

### 13.3 Sync Log Query Tests

#### Table Query
- **Retrieve all sync logs with pagination**
  - Expected: Paginated list

- **Retrieve logs by status**
  - Input: sync_status='Failed'
  - Expected: Failed syncs only

- **Retrieve logs by entity_type**
  - Input: entity_type='invoice'
  - Expected: Invoice sync logs only

- **Retrieve logs by date range**
  - Input: from_date, to_date
  - Expected: Logs within range

#### Search Query
- **Search logs by external_reference**
  - Input: external_reference
  - Expected: Matching log entries

#### Analytics Query
- **Get sync success rate**
  - Expected: Percentage of successful syncs

- **Get failed syncs requiring attention**
  - Expected: List of failed entries with error details

---

## Integration & Cross-Entity Test Cases

### Quote to Invoice Workflow
- **Test: Quote → Payment → Invoice → Shipment Creation**
  - Steps:
    1. Create quote with shipment details
    2. Process payment
    3. Verify invoice generated and marked Paid
    4. Verify shipment created in LMS
  - Expected: All entities created with correct relationships
  - Related Story: Upfront Shipment Quoting and Billing

### Service Billing Workflow
- **Test: Collect Usage Data → Generate Invoice → Send to Client**
  - Steps:
    1. Gather storage/fulfillment usage from WMS/IMS
    2. Apply rate cards and surcharges
    3. Generate invoice with line items
    4. Send invoice to client contact from CRM
  - Expected: Invoice created with accurate calculations
  - Related Story: Automated Client Service Billing

### Dispute Resolution Workflow
- **Test: Dispute → Approval → Credit Note → Invoice Adjustment**
  - Steps:
    1. Client files dispute on line item
    2. Accounts manager reviews and approves
    3. System generates credit note
    4. Credit note applied to invoice
    5. Client notified of resolution
  - Expected: Invoice total adjusted, client balance updated
  - Related Story: Invoice Dispute Resolution Workflow

### Document Management Workflow
- **Test: Shipment Confirmed → Auto-Generate BOL → Manual Uploads → All Accessible**
  - Steps:
    1. Shipment confirmed in LMS
    2. Bill of Lading auto-generated
    3. Logistics coordinator uploads additional docs
    4. All docs accessible in shipment detail
  - Expected: Documents linked and accessible
  - Related Story: Shipping Documentation Management

### Accounting Sync Workflow
- **Test: Invoice/Payment Created → Sync Log Entry → External System → Success/Failure**
  - Steps:
    1. Invoice created
    2. Sync process triggered
    3. Attempt to push to accounting software
    4. Record success/failure in sync log
    5. Log external reference for reconciliation
  - Expected: Sync logged with external reference
  - Related Story: Integration with Accounting Software

### Credit/Wallet Workflow
- **Test: Set Credit Limit → Use Service → Debit Account → Low Balance Alert**
  - Steps:
    1. Accounts manager sets credit limit for client
    2. Client uses service
    3. Account transaction created
    4. Balance calculated
    5. If below threshold, alert sent
  - Expected: Account debited, alert triggered if needed
  - Related Story: Client Credit and Pre-Paid Wallet Management

---

## Performance & Error Handling Test Cases

### Bulk Operations
- **Test: Generate 1000 quotes in parallel**
  - Expected: All quotes calculated correctly, no race conditions

- **Test: Bulk invoice generation for 100 clients**
  - Expected: All invoices created with correct calculations

- **Test: Sync 500 invoices to accounting system**
  - Expected: Sync logs created, no data loss

### Concurrency Tests
- **Test: Multiple payments on same quote simultaneously**
  - Expected: Duplicate prevention works, only first accepted

- **Test: Concurrent dispute approvals**
  - Expected: Credit notes generated once, no duplicates

- **Test: Concurrent account top-ups**
  - Expected: Balance calculated correctly, no race conditions

### Edge Cases & Error Scenarios
- **Test: Payment arrives after quote expiry**
  - Expected: Payment rejected or warning shown

- **Test: Quote with no active rate card**
  - Expected: Error displayed, cannot create quote

- **Test: Invoice with all line items disputed**
  - Expected: Full credit generated, balance zeroed

- **Test: Account balance goes negative momentarily**
  - Expected: Handled gracefully, reversal if needed

- **Test: Sync failure with partial data**
  - Expected: Retry logic triggered, logged for manual review

- **Test: Rate card updated during active billing cycle**
  - Expected: Existing invoices unaffected, new ones use updated rates

### Real-Time Scenarios
- **Test: Low balance alert triggered within 5 seconds**
  - Expected: Client notified immediately

- **Test: Payment confirmation webhook processed within 2 seconds**
  - Expected: Invoice and shipment created rapidly

- **Test: Dispute approval notification sent within 10 seconds**
  - Expected: Client receives notification without delay

### Data Validation & Integrity Tests
- **Test: Invoice total matches sum of line items**
  - Expected: Always accurate calculation

- **Test: Payment amount matches quote total**
  - Expected: No orphaned amounts

- **Test: Account balance consistency**
  - Expected: Running sum of transactions matches recorded balance

- **Test: Referential integrity on delete**
  - Expected: Cascades or prevents properly

---

## Future Considerations

- **Test cases for payment gateway webhook handling** (Stripe, Maya callback URLs)
- **Test cases for financial reporting queries** (A/R aging, revenue recognition)
- **Test cases for multi-currency support** (Exchange rates, currency conversions)
- **Test cases for tax calculations** (VAT, GST, local taxes)
- **Test cases for recurring billing cycles** (Monthly, quarterly, annual)
- **Test cases for invoice batch operations** (Bulk send, bulk adjust)
