# CRM Schema Test Cases

This document outlines comprehensive test cases for the CRM schema that should be integrated into the testing suite at `@packages/graphql/tests/client/crm/`. The test cases are organized by entity and operation type (CRUD mutations and queries), and are aligned with the data flows documented in `@docs/dataflow/crm.md` and user stories in `@docs/stories/crm.md`.

## Test Case Structure

Each entity follows this pattern:
- **Create Operations**: Valid creation, missing required fields, invalid input
- **Update Operations**: Valid updates, partial updates, invalid field updates
- **Delete Operations**: Successful deletion, non-existent records
- **Query Operations**: Table queries with pagination, search queries with filters, analytics queries with aggregations

---

## 1. Leads Test Cases

### 1.1 Create Lead Tests

#### Valid Cases
- **Create lead with required fields only**
  - Input: name, email
  - Expected: Lead created with "New" status, unique ID generated
  - Related Story: Lead Capture and Conversion

- **Create lead with all fields**
  - Input: name, email, phone, source, status, company
  - Expected: All fields persisted correctly
  - Related Story: Lead Capture and Conversion

- **Create lead with optional source field**
  - Input: name, email, leadSource
  - Expected: Source field properly stored for campaign attribution
  - Related Story: Marketing Campaign Performance Tracking

- **Bulk create leads from CSV import**
  - Input: Multiple lead records via import process
  - Expected: All leads created with import reference
  - Related Story: Data Import and Export

#### Invalid Cases
- **Create lead without required name**
  - Expected: Validation error
  
- **Create lead without required email**
  - Expected: Validation error

- **Create lead with invalid email format**
  - Expected: Format validation error

- **Create lead with duplicate email**
  - Expected: Duplicate check error (if enforced)

### 1.2 Update Lead Tests

#### Valid Cases
- **Update lead status from "New" to "Qualified"**
  - Expected: Status updated, timestamp recorded
  - Related Story: Lead Capture and Conversion

- **Update lead phone number**
  - Expected: Contact information updated

- **Update lead source**
  - Expected: Campaign attribution updated

- **Update multiple fields simultaneously**
  - Expected: All fields updated atomically

- **Convert qualified lead to opportunity**
  - Input: Update status to "Converted" with opportunity link
  - Expected: Lead linked to created Company, Contact, and Opportunity
  - Related Story: Lead Capture and Conversion

#### Invalid Cases
- **Update lead with invalid email format**
  - Expected: Validation error

- **Update non-existent lead**
  - Expected: Not found error

- **Update lead with invalid status transition**
  - Expected: Business logic error (if status transitions are restricted)

### 1.3 Delete Lead Tests

#### Valid Cases
- **Delete lead successfully**
  - Expected: Lead removed from system

- **Delete lead with audit trail**
  - Expected: Deletion logged (if audit is implemented)

#### Invalid Cases
- **Delete non-existent lead**
  - Expected: Not found error or graceful handling

- **Delete converted lead**
  - Expected: Error or warning (depending on business rules)

### 1.4 Lead Query Tests

#### Table Lead Query
- **Retrieve all leads with pagination**
  - Parameters: page, limit
  - Expected: Paginated results

- **Retrieve leads with offset/limit**
  - Parameters: offset=10, limit=20
  - Expected: Correct slice of results

- **Retrieve leads sorted by creation date (newest first)**
  - Parameters: sort by createdAt DESC
  - Expected: Results ordered by creation date

- **Retrieve leads sorted by status**
  - Parameters: sort by status
  - Expected: Results grouped by status

#### Search Leads Query
- **Search leads by name**
  - Input: name contains "John"
  - Expected: All leads matching name filter
  - Related Story: Advanced Data Filtering and Saved Views

- **Search leads by email**
  - Input: email contains "example.com"
  - Expected: All leads from specified domain

- **Search leads by status**
  - Input: status = "New"
  - Expected: All new leads

- **Search leads by source**
  - Input: source = "campaign_xyz"
  - Expected: All leads from specific campaign
  - Related Story: Marketing Campaign Performance Tracking

- **Multi-criteria search**
  - Input: status = "Qualified" AND source = "campaign_xyz"
  - Expected: Leads matching all criteria

- **Search with date range**
  - Input: createdAt between startDate and endDate
  - Expected: Leads created within date range

#### Analytics Leads Query
- **Count leads by status**
  - Expected: { "New": 45, "Qualified": 12, "Converted": 8 }
  - Related Story: Comprehensive Reporting

- **Count leads by source**
  - Expected: Breakdown of leads by campaign/source
  - Related Story: Marketing Campaign Performance Tracking

- **Calculate lead conversion rate**
  - Expected: Percentage of leads converted
  - Related Story: Comprehensive Reporting

- **Leads created over time (daily/weekly/monthly)**
  - Expected: Time-series data for trend analysis

---

## 2. Companies Test Cases

### 2.1 Create Company Tests

#### Valid Cases
- **Create company with required name only**
  - Input: name
  - Expected: Company created with unique ID

- **Create company with all details**
  - Input: name, industry, address, phone, website, employee_count
  - Expected: All fields persisted
  - Related Story: Centralized Company and Contact Management

- **Create company from converted lead**
  - Input: Lead data (name, address, phone)
  - Expected: Company created with pre-filled information
  - Related Story: Lead Capture and Conversion

#### Invalid Cases
- **Create company without name**
  - Expected: Validation error

- **Create company with duplicate name in same region**
  - Expected: Duplicate check error (if enforced)

### 2.2 Update Company Tests

#### Valid Cases
- **Update company industry**
  - Expected: Industry field updated

- **Update company contact information**
  - Input: phone, website, address
  - Expected: All contact details updated

- **Update company employee count**
  - Expected: Metadata updated

#### Invalid Cases
- **Update non-existent company**
  - Expected: Not found error

### 2.3 Delete Company Tests

#### Valid Cases
- **Delete company with no associated contacts**
  - Expected: Company deleted

#### Invalid Cases
- **Delete company with active contacts/opportunities**
  - Expected: Error or cascade behavior (based on business rules)

### 2.4 Company Query Tests

#### Table Company Query
- **Retrieve all companies with pagination**
  - Expected: Paginated list of companies

- **Retrieve companies sorted by name**
  - Expected: Alphabetically sorted results

- **Retrieve companies with contact count**
  - Expected: Each company includes contact count

#### Search Companies Query
- **Search companies by name**
  - Input: name contains "Acme"
  - Expected: Matching companies

- **Search companies by industry**
  - Input: industry = "Technology"
  - Expected: All companies in specified industry

- **Search companies by location**
  - Input: address contains "New York"
  - Expected: Companies in specified location

#### Analytics Companies Query
- **Count companies by industry**
  - Expected: Breakdown by industry type

- **Companies with most contacts**
  - Expected: Ranked list

- **Companies with most opportunities**
  - Expected: Ranked by revenue potential

---

## 3. Contacts Test Cases

### 3.1 Create Contact Tests

#### Valid Cases
- **Create contact with required fields**
  - Input: name, email, company_id
  - Expected: Contact created and linked to company
  - Related Story: Centralized Company and Contact Management

- **Create contact with full information**
  - Input: name, email, phone, job_title, company_id, owner_id
  - Expected: All fields persisted with proper associations

- **Create contact without company (orphaned)**
  - Input: name, email (no company_id)
  - Expected: Contact created, can be assigned to company later

#### Invalid Cases
- **Create contact without name**
  - Expected: Validation error

- **Create contact without email**
  - Expected: Validation error

- **Create contact with invalid email format**
  - Expected: Format validation error

- **Create contact with non-existent company_id**
  - Expected: Foreign key error or graceful handling

### 3.2 Update Contact Tests

#### Valid Cases
- **Update contact job title**
  - Expected: Job title updated

- **Update contact email**
  - Input: new email address
  - Expected: Email updated, may trigger validation
  - Related Story: Centralized Company and Contact Management

- **Update contact phone**
  - Expected: Phone updated

- **Reassign contact to different company**
  - Input: different company_id
  - Expected: Company association updated

- **Update contact owner/sales rep**
  - Input: owner_id to new sales rep
  - Expected: Ownership transferred
  - Related Story: Role-Based Access Control

#### Invalid Cases
- **Update contact with invalid email format**
  - Expected: Validation error

- **Update non-existent contact**
  - Expected: Not found error

### 3.3 Delete Contact Tests

#### Valid Cases
- **Delete contact with no interactions**
  - Expected: Contact deleted

#### Invalid Cases
- **Delete contact with associated interactions**
  - Expected: Cascade delete or error (based on rules)

- **Delete non-existent contact**
  - Expected: Not found error

### 3.4 Contact Query Tests

#### Table Contact Query
- **Retrieve all contacts with pagination**
  - Expected: Paginated contact list

- **Retrieve contacts sorted by name**
  - Expected: Alphabetically sorted

- **Retrieve contacts with company name**
  - Expected: Company information included

- **Retrieve contacts by company**
  - Parameters: company_id filter
  - Expected: All contacts in specified company

#### Search Contacts Query
- **Search contacts by name**
  - Input: name contains "Sarah"
  - Expected: Matching contacts
  - Related Story: Advanced Data Filtering and Saved Views

- **Search contacts by email domain**
  - Input: email contains "@company.com"
  - Expected: All contacts from company domain

- **Search contacts by job title**
  - Input: job_title = "Manager"
  - Expected: All managers

- **Search contacts by company and criteria**
  - Input: company_id + job_title filter
  - Expected: Contacts matching all criteria

- **Search contacts by owner/sales rep**
  - Input: owner_id filter
  - Expected: Contacts assigned to specific rep

---

## 4. Opportunities Test Cases

### 4.1 Create Opportunity Tests

#### Valid Cases
- **Create opportunity from lead conversion**
  - Input: Lead data converted to opportunity
  - Expected: Opportunity created with initial stage "New"
  - Related Story: Lead Capture and Conversion

- **Create opportunity with required fields**
  - Input: name, company_id, contact_id, stage, amount
  - Expected: Opportunity created with current date

- **Create opportunity with products**
  - Input: opportunity data + associated products
  - Expected: Opportunity created with line items

- **Create opportunity with expected close date**
  - Input: name, amount, expected_close_date
  - Expected: Opportunity with timeline

#### Invalid Cases
- **Create opportunity without name**
  - Expected: Validation error

- **Create opportunity without stage**
  - Expected: Validation error or default stage assigned

- **Create opportunity with invalid amount**
  - Expected: Validation error (negative, null, etc.)

- **Create opportunity with non-existent company**
  - Expected: Foreign key error

### 4.2 Update Opportunity Tests

#### Valid Cases
- **Update opportunity stage**
  - Input: stage from "New" to "Qualification"
  - Expected: Stage updated with timestamp
  - Related Story: Interactive Sales Pipeline Dashboard

- **Move opportunity to "Proposal" stage**
  - Expected: Stage updated

- **Move opportunity to "Closed-Won"**
  - Expected: Marked as won, may trigger invoice generation
  - Related Story: Invoice Generation and Tracking

- **Move opportunity to "Closed-Lost"**
  - Expected: Marked as lost, archived/removed from active pipeline

- **Update opportunity amount**
  - Input: revised_amount
  - Expected: Amount updated with change logged

- **Update opportunity close date**
  - Input: new expected_close_date
  - Expected: Timeline updated

- **Add products to opportunity**
  - Input: product_ids array
  - Expected: Products linked with quantities and prices

#### Invalid Cases
- **Update non-existent opportunity**
  - Expected: Not found error

- **Update opportunity with invalid stage**
  - Expected: Validation error

- **Update opportunity amount to negative**
  - Expected: Validation error

### 4.3 Opportunity Query Tests

#### Table Opportunity Query
- **Retrieve all opportunities with pagination**
  - Expected: Paginated list

- **Retrieve opportunities by stage**
  - Parameters: stage filter
  - Expected: Opportunities in specified stage
  - Related Story: Interactive Sales Pipeline Dashboard

- **Retrieve opportunities sorted by amount (highest first)**
  - Parameters: sort by amount DESC
  - Expected: Ranked by deal size

- **Retrieve opportunities with company and contact info**
  - Expected: Denormalized results with related data

- **Retrieve opportunities by owner**
  - Parameters: owner_id filter
  - Expected: Opportunities assigned to sales rep

#### Search Opportunities Query
- **Search opportunities by name**
  - Input: name contains "Enterprise"
  - Expected: Matching opportunities

- **Search opportunities by stage**
  - Input: stage = "Proposal"
  - Expected: All opportunities in proposal stage
  - Related Story: Interactive Sales Pipeline Dashboard

- **Search opportunities by amount range**
  - Input: amount between min and max
  - Expected: Opportunities in price range

- **Search opportunities by close date**
  - Input: expected_close_date between start and end
  - Expected: Opportunities closing in timeframe

- **Search opportunities by company**
  - Input: company_id filter
  - Expected: All opportunities for company

#### Analytics Opportunities Query
- **Get opportunity count by stage (pipeline view)**
  - Expected: { "New": 5, "Qualification": 8, "Proposal": 3, "Closed-Won": 2 }
  - Related Story: Interactive Sales Pipeline Dashboard

- **Get total revenue by stage**
  - Expected: Revenue aggregated by stage

- **Get win rate**
  - Expected: Percentage of closed-won vs total closed

- **Get average deal size**
  - Expected: Mean opportunity amount

- **Get opportunities by owner/sales rep**
  - Expected: Sales performance metrics
  - Related Story: Comprehensive Reporting

- **Get sales pipeline trend (time-series)**
  - Expected: Stage distribution over time
  - Related Story: Interactive Sales Pipeline Dashboard

- **Get opportunities closing in next N days**
  - Expected: Forecasted revenue

---

## 5. Interactions Test Cases

### 5.1 Create Interaction Tests

#### Valid Cases
- **Create interaction with type "Call"**
  - Input: contact_id, type="Call", notes, date, time
  - Expected: Interaction logged with type
  - Related Story: Interaction Logging and History

- **Create interaction with type "Email"**
  - Input: contact_id, type="Email", subject, body
  - Expected: Email interaction logged

- **Create interaction with type "Meeting"**
  - Input: contact_id, type="Meeting", attendees, notes, date, time
  - Expected: Meeting logged with attendee info

- **Create interaction linked to opportunity**
  - Input: contact_id, opportunity_id, type, notes
  - Expected: Interaction linked to both contact and opportunity

- **Create interaction linked to case**
  - Input: contact_id, case_id, type, notes
  - Expected: Interaction logged for customer support
  - Related Story: Customer Support Case Management

#### Invalid Cases
- **Create interaction without contact_id**
  - Expected: Validation error

- **Create interaction without type**
  - Expected: Validation error

- **Create interaction with invalid type**
  - Expected: Validation error (only: Call, Email, Meeting, etc.)

- **Create interaction with non-existent contact**
  - Expected: Foreign key error

### 5.2 Update Interaction Tests

#### Valid Cases
- **Update interaction notes**
  - Expected: Notes updated with modification timestamp

- **Update interaction type**
  - Expected: Type changed

- **Update interaction date/time**
  - Expected: Date/time updated

#### Invalid Cases
- **Update non-existent interaction**
  - Expected: Not found error

### 5.3 Delete Interaction Tests

#### Valid Cases
- **Delete interaction successfully**
  - Expected: Interaction removed

#### Invalid Cases
- **Delete non-existent interaction**
  - Expected: Not found error

### 5.4 Interaction Query Tests

#### Table Interaction Query
- **Retrieve all interactions with pagination**
  - Expected: Paginated list

- **Retrieve interactions sorted by date (newest first)**
  - Expected: Chronologically sorted

- **Retrieve interactions by contact**
  - Parameters: contact_id filter
  - Expected: Contact's activity history
  - Related Story: Interaction Logging and History

#### Search Interactions Query
- **Search interactions by type**
  - Input: type = "Call"
  - Expected: All calls logged

- **Search interactions by contact**
  - Input: contact_id filter
  - Expected: All interactions for contact
  - Related Story: Interaction Logging and History

- **Search interactions by date range**
  - Input: date between start and end
  - Expected: Interactions in timeframe

- **Search interactions by owner/creator**
  - Input: created_by user_id
  - Expected: Interactions logged by user

- **Search interactions by opportunity**
  - Input: opportunity_id filter
  - Expected: All interactions related to deal

---

## 6. Cases Test Cases

### 6.1 Create Case Tests

#### Valid Cases
- **Create case with required fields**
  - Input: subject, contact_id, type, status="New"
  - Expected: Case created with unique case number
  - Related Story: Customer Support Case Management

- **Create case with priority**
  - Input: case data + priority level
  - Expected: Priority stored

- **Create case from contact**
  - Input: contact_id, subject
  - Expected: Case linked to contact

#### Invalid Cases
- **Create case without subject**
  - Expected: Validation error

- **Create case without contact**
  - Expected: Validation error or orphaned case handling

- **Create case with invalid status**
  - Expected: Validation error (only: New, Open, Pending, Closed)

### 6.2 Update Case Tests

#### Valid Cases
- **Update case status from "New" to "Open"**
  - Expected: Status updated with timestamp
  - Related Story: Customer Support Case Management

- **Update case status from "Open" to "Pending"**
  - Expected: Status updated

- **Update case status from any to "Closed"**
  - Input: status="Closed"
  - Expected: Case closed with resolution logged
  - Related Story: Customer Support Case Management

- **Update case priority**
  - Expected: Priority updated

- **Add notes/comments to case**
  - Input: comment text
  - Expected: Comment added with timestamp and creator
  - Related Story: Customer Support Case Management

#### Invalid Cases
- **Update non-existent case**
  - Expected: Not found error

- **Update case with invalid status**
  - Expected: Validation error

### 6.3 Delete Case Tests

#### Valid Cases
- **Delete case successfully**
  - Expected: Case deleted or archived

#### Invalid Cases
- **Delete non-existent case**
  - Expected: Not found error

### 6.4 Case Query Tests

#### Table Case Query
- **Retrieve all cases with pagination**
  - Expected: Paginated list

- **Retrieve cases sorted by status**
  - Expected: Grouped by status

- **Retrieve active cases (not Closed)**
  - Parameters: status != "Closed"
  - Expected: Open and pending cases

- **Retrieve cases by owner/assigned to**
  - Parameters: assigned_to filter
  - Expected: Cases assigned to specific support agent

#### Search Cases Query
- **Search cases by subject**
  - Input: subject contains "billing"
  - Expected: Matching cases

- **Search cases by status**
  - Input: status = "Open"
  - Expected: Open cases
  - Related Story: Customer Support Case Management

- **Search cases by priority**
  - Input: priority = "High"
  - Expected: High priority cases

- **Search cases by contact**
  - Input: contact_id filter
  - Expected: All cases for contact

- **Search cases by date created**
  - Input: created between start and end
  - Expected: Cases created in timeframe

---

## 7. Products Test Cases

### 7.1 Create Product Tests

#### Valid Cases
- **Create product with required fields**
  - Input: name, sku, price
  - Expected: Product added to catalog
  - Related Story: Service Catalog Management

- **Create product with description**
  - Input: name, sku, price, description
  - Expected: All fields stored

- **Create product with category**
  - Input: product data + category
  - Expected: Product categorized

#### Invalid Cases
- **Create product without name**
  - Expected: Validation error

- **Create product without SKU**
  - Expected: Validation error

- **Create product with duplicate SKU**
  - Expected: Duplicate SKU error

- **Create product with negative price**
  - Expected: Validation error

### 7.2 Update Product Tests

#### Valid Cases
- **Update product price**
  - Input: new price
  - Expected: Price updated, new opportunities use new price
  - Related Story: Service Catalog Management

- **Update product description**
  - Expected: Description updated

#### Invalid Cases
- **Update product with invalid price**
  - Expected: Validation error

- **Update non-existent product**
  - Expected: Not found error

### 7.3 Product Query Tests

#### Table Product Query
- **Retrieve all products with pagination**
  - Expected: Paginated catalog

- **Retrieve products sorted by name**
  - Expected: Alphabetically sorted

- **Retrieve products by category**
  - Parameters: category filter
  - Expected: Products in category

#### Search Products Query
- **Search products by name**
  - Input: name contains "Delivery"
  - Expected: Matching products
  - Related Story: Service Catalog Management

- **Search products by SKU**
  - Input: sku contains "NEXT"
  - Expected: Matching SKUs

---

## 8. Invoices Test Cases

### 8.1 Create Invoice Tests

#### Valid Cases
- **Create invoice from won opportunity**
  - Input: opportunity_id (status="Closed-Won")
  - Expected: Invoice created with pre-filled customer and products
  - Related Story: Invoice Generation and Tracking

- **Create invoice with line items**
  - Input: customer_id, line_items (product, quantity, price)
  - Expected: Total calculated automatically
  - Related Story: Invoice Generation and Tracking

- **Create invoice with custom amount**
  - Input: amount, customer_id
  - Expected: Invoice created with custom total

#### Invalid Cases
- **Create invoice without customer**
  - Expected: Validation error

- **Create invoice with zero amount**
  - Expected: Validation error

- **Create invoice from opportunity not Closed-Won**
  - Expected: Business logic error

### 8.2 Update Invoice Tests

#### Valid Cases
- **Update invoice line items**
  - Input: add/remove products, modify quantities
  - Expected: Total recalculated
  - Related Story: Invoice Generation and Tracking

- **Update invoice status to "Sent"**
  - Expected: Status updated with send timestamp

- **Update invoice status to "Paid"**
  - Input: status="Paid", payment_date
  - Expected: Invoice marked as paid
  - Related Story: Invoice Generation and Tracking

#### Invalid Cases
- **Update non-existent invoice**
  - Expected: Not found error

- **Update paid invoice**
  - Expected: Error (paid invoices immutable or update restrictions)

### 8.3 Invoice Query Tests

#### Table Invoice Query
- **Retrieve all invoices with pagination**
  - Expected: Paginated list

- **Retrieve invoices by status**
  - Parameters: status filter
  - Expected: Invoices with specified status
  - Related Story: Invoice Generation and Tracking

- **Retrieve invoices by customer**
  - Parameters: customer_id filter
  - Expected: All invoices for customer

#### Search Invoices Query
- **Search invoices by invoice number**
  - Input: invoice_number
  - Expected: Specific invoice

- **Search invoices by status**
  - Input: status = "Paid"
  - Expected: Paid invoices

- **Search invoices by date range**
  - Input: created between start and end
  - Expected: Invoices created in timeframe

- **Search invoices by customer**
  - Input: customer_id filter
  - Expected: All invoices for customer

#### Analytics Invoices Query
- **Get total revenue (all invoices)**
  - Expected: Sum of all invoice amounts

- **Get revenue by invoice status**
  - Expected: { "Draft": X, "Sent": Y, "Paid": Z }

- **Get outstanding revenue (unpaid)**
  - Expected: Sum of unpaid invoices

- **Get average invoice amount**
  - Expected: Mean invoice value

---

## 9. Campaigns Test Cases

### 9.1 Create Campaign Tests

#### Valid Cases
- **Create campaign with required fields**
  - Input: name, start_date, end_date, budget
  - Expected: Campaign created
  - Related Story: Marketing Campaign Performance Tracking

- **Create campaign with description**
  - Input: campaign data + description
  - Expected: All fields stored

#### Invalid Cases
- **Create campaign without name**
  - Expected: Validation error

- **Create campaign with end_date before start_date**
  - Expected: Date validation error

### 9.2 Update Campaign Tests

#### Valid Cases
- **Update campaign budget**
  - Expected: Budget updated

- **Update campaign status**
  - Expected: Status updated

#### Invalid Cases
- **Update non-existent campaign**
  - Expected: Not found error

### 9.3 Campaign Query Tests

#### Search Campaigns Query
- **Get campaign performance metrics**
  - Expected: Leads generated, opportunities created, won deals
  - Related Story: Marketing Campaign Performance Tracking

---

## 10. Notifications Test Cases

### 10.1 Create Notification Tests

#### Valid Cases
- **Create notification when lead is assigned**
  - Input: lead assignment event
  - Expected: Notification created for sales rep
  - Related Story: Automated Notifications

- **Create notification when opportunity stage changes**
  - Expected: Notification to stakeholders

#### Invalid Cases
- **Create notification without recipient**
  - Expected: Validation error

### 10.2 Notification Query Tests

#### Table Notification Query
- **Retrieve unread notifications**
  - Parameters: read=false
  - Expected: Unread notifications for user
  - Related Story: Automated Notifications

- **Retrieve all notifications with pagination**
  - Expected: Paginated list

#### Search Notifications Query
- **Search notifications by type**
  - Expected: Notifications of specific type

---

## 11. Cross-Entity Integration Tests

### 11.1 Lead Conversion Flow
- **Full lead conversion workflow**
  - Steps:
    1. Create lead
    2. Qualify lead
    3. Convert lead → Company + Contact + Opportunity
  - Expected: All entities created and linked correctly
  - Related Story: Lead Capture and Conversion

### 11.2 Sales Pipeline Flow
- **Opportunity progression through pipeline**
  - Steps:
    1. Create opportunity (New)
    2. Move to Qualification
    3. Move to Proposal
    4. Move to Closed-Won
  - Expected: Status updates tracked, analytics reflect changes
  - Related Story: Interactive Sales Pipeline Dashboard

### 11.3 Invoice Generation Flow
- **Won opportunity to invoice workflow**
  - Steps:
    1. Create opportunity with products
    2. Move to Closed-Won
    3. Generate invoice
    4. Mark invoice as Paid
  - Expected: Invoice created with correct line items, total calculated
  - Related Story: Invoice Generation and Tracking

### 11.4 Customer Support Flow
- **Case creation and interaction logging**
  - Steps:
    1. Create case from contact
    2. Log interaction (Call/Email)
    3. Update case status
    4. Close case
  - Expected: Case history complete with all interactions
  - Related Story: Customer Support Case Management

### 11.5 Multi-Criteria Filtering
- **Test saved views and advanced filters**
  - Steps:
    1. Apply multiple filters (status, owner, date range, etc.)
    2. Save view
    3. Retrieve saved view
    4. Re-apply filters
  - Expected: Filters apply consistently, views persist
  - Related Story: Advanced Data Filtering and Saved Views

### 11.6 Data Import/Export
- **Bulk lead import and report export**
  - Steps:
    1. Upload CSV with leads
    2. Map columns
    3. Preview and validate
    4. Import leads
    5. Export sales report to PDF
  - Expected: Data imported correctly, reports generated
  - Related Story: Data Import and Export, Comprehensive Reporting

---

## 12. Performance and Edge Cases

### 12.1 Pagination Performance
- **Query 10,000+ records with pagination**
  - Expected: Fast response times, correct pagination

### 12.2 Search Performance
- **Search across 10,000+ records**
  - Expected: Sub-second response times

### 12.3 Concurrent Operations
- **Multiple users creating/updating same entity type**
  - Expected: No data corruption, proper locking if needed

### 12.4 Null/Empty Value Handling
- **Test optional fields with null, empty string, undefined**
  - Expected: Consistent handling across all entities

### 12.5 Very Large Amounts
- **Create opportunity with very large dollar amount**
  - Expected: Accurate storage and calculation (no overflow)

### 12.6 Long Text Fields
- **Create interaction/case with very long notes (>10,000 chars)**
  - Expected: Entire text persisted

### 12.7 Special Characters in Text
- **Create entities with special characters in text fields**
  - Expected: Proper escaping and retrieval

---

## 13. Error Handling Tests

### 13.1 Invalid Input
- **String values in numeric fields**
- **Null values in required fields**
- **Empty arrays where single values expected**
- **Objects where primitives expected**

### 13.2 Business Logic Errors
- **Opportunity to Closed-Won with no products**
- **Closed case reassignment**
- **Delete company with active contacts**

### 13.3 Concurrency Issues
- **Update same record simultaneously**
- **Delete while updating**

### 13.4 Authorization Errors
- **User accessing unauthorized data**
- **Sales rep viewing different user's leads**
- **Support agent updating opportunities**
- Related Story: Role-Based Access Control

---

## 14. Real-Time and Async Tests

### 14.1 Real-Time Updates
- **Dashboard updates when opportunity stage changes**
  - Related Story: Interactive Sales Pipeline Dashboard

### 14.2 Notifications
- **Lead assignment triggers notification**
  - Related Story: Automated Notifications

### 14.3 Async Operations
- **Bulk import processes asynchronously**
- **Report generation with progress tracking**
  - Related Story: Data Import and Export

---

## Test Implementation Guidelines

### Naming Convention
- `[EntityName]_[Operation]_[Scenario]`
- Example: `Lead_Create_ValidWithAllFields`, `Opportunity_Update_StageTransition`, `Contact_Search_ByNameAndCompany`

### Test Organization
- Group tests by entity (folder structure)
- Within each entity, organize by operation type (Create, Update, Delete, Query)
- Use descriptive test names that indicate success/failure scenario

### Setup/Teardown
- Use `beforeAll` to create dependent entities
- Use `afterEach` or `afterAll` to clean up test data
- Consider transaction rollback for isolation

### Assertions
- Test response structure (expected fields present)
- Test response values (correct data returned)
- Test error messages (appropriate error for failure cases)
- Test side effects (related data created/updated)

### Test Data
- Use realistic but distinct test data
- Generate unique values (emails, phone numbers) to avoid conflicts
- Use factories or builders for complex objects

---

## Related Documentation

- **Data Flow**: `@docs/dataflow/crm.md` - Understand entity relationships and workflows
- **User Stories**: `@docs/stories/crm.md` - Business context for test scenarios
- **Schema**: `@packages/graphql/src/schema/crm.graphql` - GraphQL type definitions
- **Existing Tests**: `@packages/graphql/tests/client/crm/` - Reference implementations
