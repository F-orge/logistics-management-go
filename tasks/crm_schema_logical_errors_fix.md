# CRM Schema Logical Errors Fix - Comprehensive Plan

**Date Created:** 2025-11-03  
**Reference Document:** `@docs/tests/crm.md`  
**Target Files:** `packages/graphql/src/schema/crm/<entity>/resolvers/`  
**Error Handling Strategy:** Use `GraphQLError` for all error scenarios

---

## Overview

Fix logical errors across 11 CRM entities (Leads, Companies, Contacts, Opportunities, Cases, Interactions, Products, Invoices, Campaigns, Notifications) in their Mutations and Queries. All errors will use `GraphQLError` for proper error handling and user feedback.

---

## Implementation Checklist

### Phase 1: Critical Issues (Leads & Companies)

- [x] **1.1 Leads Module - CrmMutation.ts**
  - [x] Import `GraphQLError` from 'graphql'
  - [x] Replace `CreateLeadInputSchema` with `UpdateLeadInputSchema` in `updateLead` (line 33)
  - [x] Fix status comparison logic (compare string values before enum conversion)
  - [ ] Wrap database errors in GraphQLError
  - [ ] Add proper transaction error handling

- [x] **1.2 Leads Module - CrmQuery.ts**
  - [x] Add `sortBy` parameter (createdAt, status, name)
  - [x] Add `sortDirection` parameter (ASC, DESC)
  - [x] Fix pagination + date filter combination (don't clear pagination)
  - [x] Apply sorting to leads query
  - [ ] Add GraphQLError for not found scenarios

- [x] **1.3 Companies Module - CrmMutation.ts** ✅ COMPLETE
  - [x] Import `GraphQLError` from 'graphql'
  - [x] Add business validation: check for active contacts before deletion
  - [x] Throw GraphQLError if company has active contacts/opportunities
  - [x] Wrap database errors in GraphQLError

- [x] **1.4 Companies Module - CrmQuery.ts** ✅ COMPLETE
  - [x] Replace `executeTakeFirst()` with proper error handling (line 43)
  - [x] Throw GraphQLError if company not found
  - [x] Fix pagination + date filter combination (don't clear pagination)
  - [x] Add sorting (by name, createdAt)
  - [ ] Add contact count aggregation in companies query (future enhancement)

### Phase 2: Validation & Filters (Contacts, Cases, Interactions)

- [x] **2.1 Contacts Module - CrmMutation.ts** ✅ COMPLETE
  - [x] Import `GraphQLError` from 'graphql'
  - [x] Add FK validation for company_id on create
  - [x] Validate company exists before linking with GraphQLError
  - [x] Throw GraphQLError on validation failure
  - [x] Fixed user table reference: changed from `"crm.users"` to `"user"` (public schema)

- [ ] **2.2 Contacts Module - CrmQuery.ts**
  - [x] Add `companyId` filter parameter to schema
  - [x] Add `jobTitle` filter parameter to schema
  - [x] Add `ownerId` (owner/sales rep) filter parameter to schema
  - [x] Add `sortBy` and `sortDirection` parameters to schema
  - [ ] Fix pagination + date filter combination
  - [ ] Add sorting implementation (by name, createdAt)
  - [ ] Apply all filter conditions to query (awaiting codegen)

- [ ] **2.3 Cases Module - CrmMutation.ts**
  - [ ] Import `GraphQLError` from 'graphql'
  - [ ] Add FK validation for contact_id on create
  - [ ] Validate contact exists before linking
  - [ ] Throw GraphQLError on FK violation

- [ ] **2.4 Cases Module - CrmQuery.ts**
  - [ ] Add `active` filter parameter (boolean: excludes Closed status)
  - [ ] Add `assignedTo` filter parameter
  - [ ] Fix pagination + date filter combination
  - [ ] Add sorting (by status, priority, createdAt)
  - [ ] Apply active filter logic: `status != "Closed"` when active=true

- [ ] **2.5 Interactions Module - CrmMutation.ts**
  - [ ] Import `GraphQLError` from 'graphql'
  - [ ] Add FK validation for contact_id on create/update
  - [ ] Validate contact exists before linking
  - [ ] Validate interaction type is valid (Call, Email, Meeting, etc.)
  - [ ] Throw GraphQLError on validation failure

- [ ] **2.6 Interactions Module - CrmQuery.ts**
  - [ ] Add `contactId` filter parameter
  - [ ] Add `opportunityId` filter parameter
  - [ ] Add `createdBy` filter parameter
  - [ ] Fix pagination + date filter combination
  - [ ] Add sorting (by createdAt DESC for newest first)

### Phase 3: Opportunities (Complex)

- [ ] **3.1 Opportunities Module - CrmMutation.ts**
  - [ ] Import `GraphQLError` from 'graphql'
  - [ ] Add amount validation (no negative values, no zero)
  - [ ] Add required field validation (name, stage, company_id, contact_id)
  - [ ] Fix stage comparison consistency (use payload only, not args.value.stage)
  - [ ] Replace `executeTakeFirst()` with proper error handling (line 94)
  - [ ] Throw GraphQLError on validation failure
  - [ ] Throw GraphQLError on not found

- [ ] **3.2 Opportunities Module - CrmQuery.ts**
  - [ ] Add `amountMin` and `amountMax` filter parameters
  - [ ] Add `closeDateFrom` and `closeDateTo` filter parameters
  - [ ] Add `companyId` filter parameter
  - [ ] Add `ownerId` filter parameter
  - [ ] Add sorting (by amount DESC, by dealValue DESC)
  - [ ] Fix pagination + date filter combination
  - [ ] Create `opportunitiesAnalytics` query with:
    - [ ] countByStage: { stage: string, count: number }[]
    - [ ] totalRevenueByStage: { stage: string, revenue: number }[]
    - [ ] winRate: number (percentage)
    - [ ] averageDealSize: number
    - [ ] closingInDays(days: number): opportunities[]

### Phase 4: Products & Invoices

- [ ] **4.1 Products Module - CrmMutation.ts**
  - [ ] Import `GraphQLError` from 'graphql'
  - [ ] Replace generic `Error` with `GraphQLError` (line 52)
  - [ ] Add SKU uniqueness validation on create
  - [ ] Add SKU uniqueness validation on update
  - [ ] Add price validation (negative/zero check)
  - [ ] Throw GraphQLError on validation failure

- [ ] **4.2 Products Module - CrmQuery.ts**
  - [ ] Add `category` filter parameter
  - [ ] Add sorting (by name, sku, price)

- [ ] **4.3 Invoices Module - CrmMutation.ts**
  - [ ] Import `GraphQLError` from 'graphql'
  - [ ] Add validation: invoice from opportunity requires status = Closed-Won
  - [ ] Add immutability check: cannot update paid invoices
  - [ ] Throw GraphQLError if trying to update paid invoice
  - [ ] Wrap database errors in GraphQLError

- [ ] **4.4 Invoices Module - CrmQuery.ts**
  - [ ] Add `customerId`/`contactId` filter to invoices query
  - [ ] Fix pagination + date filter combination
  - [ ] Create `invoicesAnalytics` query with:
    - [ ] totalRevenue: number
    - [ ] revenueByStatus: { status: string, amount: number }[]
    - [ ] outstandingRevenue: number
    - [ ] averageInvoiceAmount: number

### Phase 5: Campaigns & Notifications

- [ ] **5.1 Campaigns Module - CrmMutation.ts**
  - [ ] Verify GraphQLError is properly imported and used ✓

- [ ] **5.2 Campaigns Module - CrmQuery.ts**
  - [ ] Create `campaignsAnalytics` query with:
    - [ ] leadsGenerated: number
    - [ ] opportunitiesCreated: number
    - [ ] wonDeals: number
    - [ ] roi: number (revenue / budget)

- [ ] **5.3 Notifications Module - CrmQuery.ts**
  - [ ] Add `read` filter parameter (boolean: true/false/null for all)
  - [ ] Filter by read status when parameter provided

### Phase 6: Validation & Testing

- [ ] **6.1 Code Review**
  - [ ] Verify all GraphQLError imports are correct
  - [ ] Check consistency of error messages across all modules
  - [ ] Verify pagination logic is correct everywhere
  - [ ] Verify all filter combinations work correctly
  - [ ] Verify FK validations are consistent

- [ ] **6.2 Type Safety**
  - [ ] Verify all schemas are correctly used (Create vs Update)
  - [ ] Check enum conversions are consistent
  - [ ] Verify return types match GraphQL types

- [ ] **6.3 Testing Against Test Cases**
  - [ ] Create operations with required/optional fields ✓
  - [ ] Update operations with input schemas ✓
  - [ ] Delete operations with error handling ✓
  - [ ] Query operations with pagination ✓
  - [ ] Search operations with filters ✓
  - [ ] Analytics queries with aggregations ✓
  - [ ] Error handling with GraphQLError ✓
  - [ ] Foreign key validations ✓
  - [ ] Business logic validations ✓

---

## Detailed Issues & Fixes

### 1. LEADS MODULE

**File:** `packages/graphql/src/schema/crm/leads/resolvers/`

#### CrmMutation.ts Issues:
- **Line 33:** `updateLead` uses `CreateLeadInputSchema` instead of `UpdateLeadInputSchema`
  - **Fix:** Replace with `UpdateLeadInputSchema().parse(args.value)`
  - **Impact:** Ensures only updateable fields are processed

- **Line 60:** Status comparison uses potential type mismatch
  - **Fix:** Compare string values: `payload.status !== previousLead.status`
  - **Impact:** Correct status change detection

- **Missing:** `GraphQLError` import and usage
  - **Fix:** Add `import { GraphQLError } from "graphql"`
  - **Impact:** Proper error responses to client

#### CrmQuery.ts Issues:
- **Line 14-18:** Date filters clear pagination
  ```typescript
  // WRONG
  query = query.clearLimit().clearOffset()...
  
  // CORRECT - Keep pagination
  query = query.where("createdAt", ">=", args.from)
    .where("createdAt", "<=", args.to);
  ```

- **Missing:** Sorting support (test requires: sort by createdAt DESC, sort by status)
  - **Fix:** Add `sortBy` parameter and `sortDirection` parameter
  - **Impact:** Enable query sorting as per test cases

---

### 2. COMPANIES MODULE

**File:** `packages/graphql/src/schema/crm/companies/resolvers/`

#### CrmMutation.ts Issues:
- **Missing:** FK validation on delete
  - **Fix:** Check for active contacts/opportunities before deletion
  - **Impact:** Prevent data integrity violations

#### CrmQuery.ts Issues:
- **Line 43:** `executeTakeFirst()` returns null silently
  ```typescript
  // WRONG
  .executeTakeFirst() // Returns null if not found
  
  // CORRECT
  const result = await query.executeTakeFirst();
  if (!result) {
    throw new GraphQLError("Company not found", {
      extensions: { code: "NOT_FOUND" }
    });
  }
  ```

- **Line 14-18:** Same pagination clearing bug as Leads
  - **Fix:** Combine filters instead of clearing pagination

---

### 3. CONTACTS MODULE

**File:** `packages/graphql/src/schema/crm/contacts/resolvers/`

#### CrmMutation.ts Issues:
- **Missing:** FK validation for company_id
  - **Fix:** Query company existence before linking
  - **Impact:** Prevent orphaned records

#### CrmQuery.ts Issues:
- **Line 12-18:** Pagination clearing bug
- **Missing Filters:**
  - `companyId`: Filter by company association
  - `jobTitle`: Filter by job title
  - `ownerId`: Filter by owner/sales rep
- **Missing:** Sorting support

---

### 4. OPPORTUNITIES MODULE

**File:** `packages/graphql/src/schema/crm/opportunities/resolvers/`

#### CrmMutation.ts Issues:
- **Line 94:** `executeTakeFirst()` without error handling
  - **Fix:** Check result and throw GraphQLError if null

- **Missing:** Amount validation
  ```typescript
  // Add validation
  if (!args.value.dealValue || args.value.dealValue <= 0) {
    throw new GraphQLError("Deal value must be greater than 0", {
      extensions: { code: "VALIDATION_ERROR" }
    });
  }
  ```

- **Line 88:** Mixes `args.value.stage` with `payload.stage`
  - **Fix:** Use only `payload.stage` after schema validation

#### CrmQuery.ts Issues:
- **Missing Filters:**
  - Amount range: `amountMin`, `amountMax`
  - Close date range: `closeDateFrom`, `closeDateTo`
  - `companyId`, `ownerId`

- **Missing Analytics Query:** `opportunitiesAnalytics`
  ```typescript
  opportunitiesAnalytics: {
    countByStage: [{ stage, count }],
    totalRevenueByStage: [{ stage, revenue }],
    winRate: percentage,
    averageDealSize: number,
    closingInDays(days): [opportunities]
  }
  ```

---

### 5. CASES MODULE

**File:** `packages/graphql/src/schema/crm/cases/resolvers/`

#### CrmMutation.ts Issues:
- **Missing:** FK validation for contact_id

#### CrmQuery.ts Issues:
- **Line 17-22:** Pagination clearing bug
- **Missing Filters:**
  - `active`: Boolean to exclude Closed status
  - `assignedTo`: Filter by owner
- **Missing:** Sorting support

---

### 6. INTERACTIONS MODULE

**File:** `packages/graphql/src/schema/crm/interactions/resolvers/`

#### CrmMutation.ts Issues:
- **Missing:** FK validation for contact_id
- **Missing:** Type validation (only: Call, Email, Meeting, etc.)

#### CrmQuery.ts Issues:
- **Line 15-19:** Pagination clearing bug
- **Missing Filters:**
  - `contactId`, `opportunityId`, `createdBy`
- **Missing:** Sorting by date (newest first)

---

### 7. PRODUCTS MODULE

**File:** `packages/graphql/src/schema/crm/products/resolvers/`

#### CrmMutation.ts Issues:
- **Line 52:** Generic `Error` instead of `GraphQLError`
  - **Fix:** Import and use `GraphQLError`

- **Missing:** SKU uniqueness check
  ```typescript
  // Add validation
  const existing = await ctx.db
    .selectFrom("crm.products")
    .select("id")
    .where("sku", "=", payload.sku)
    .executeTakeFirst();
  
  if (existing) {
    throw new GraphQLError("SKU already exists", {
      extensions: { code: "VALIDATION_ERROR" }
    });
  }
  ```

- **Missing:** Price validation (negative/zero)

#### CrmQuery.ts Issues:
- **Missing Filters:** `category`
- **Missing:** Sorting support

---

### 8. INVOICES MODULE

**File:** `packages/graphql/src/schema/crm/invoices/resolvers/`

#### CrmMutation.ts Issues:
- **Missing:** Validation for Closed-Won requirement
- **Missing:** Immutability check for paid invoices
  ```typescript
  // Add to updateInvoice
  if (previousInvoice.status === CrmInvoiceStatus.PAID) {
    throw new GraphQLError("Cannot update paid invoice", {
      extensions: { code: "BUSINESS_LOGIC_ERROR" }
    });
  }
  ```

#### CrmQuery.ts Issues:
- **Line 14-17:** Pagination clearing bug
- **Missing Filters:** `customerId`/`contactId`
- **Missing Analytics Query:** `invoicesAnalytics`
  ```typescript
  invoicesAnalytics: {
    totalRevenue: number,
    revenueByStatus: [{ status, amount }],
    outstandingRevenue: number,
    averageInvoiceAmount: number
  }
  ```

---

### 9. CAMPAIGNS MODULE

**File:** `packages/graphql/src/schema/crm/campaigns/resolvers/`

**Current Status:** Already using GraphQLError correctly ✓

#### CrmQuery.ts Issues:
- **Missing Analytics Query:** `campaignsAnalytics`
  ```typescript
  campaignsAnalytics: {
    leadsGenerated: number,
    opportunitiesCreated: number,
    wonDeals: number,
    roi: number
  }
  ```

---

### 10. NOTIFICATIONS MODULE

**File:** `packages/graphql/src/schema/crm/notifications/resolvers/`

#### CrmQuery.ts Issues:
- **Missing:** `read` filter parameter
  - **Fix:** Add boolean filter to show read/unread notifications

---

## Cross-Cutting Error Handling Pattern

All modules should follow this pattern:

```typescript
import { GraphQLError } from "graphql";

// Validation errors
throw new GraphQLError("Descriptive error message", {
  extensions: {
    code: "VALIDATION_ERROR"
  }
});

// Not found errors
throw new GraphQLError("Entity not found", {
  extensions: {
    code: "NOT_FOUND"
  }
});

// Business logic errors
throw new GraphQLError("Cannot perform operation", {
  extensions: {
    code: "BUSINESS_LOGIC_ERROR"
  }
});

// Database errors
throw new GraphQLError("Database operation failed", {
  extensions: {
    code: "DATABASE_ERROR"
  }
});
```

---

## Pagination Fix Pattern

All queries should follow this pattern:

```typescript
// WRONG - Clears pagination when filters applied
if (args.from && args.to) {
  query = query.clearLimit().clearOffset()...
}

// CORRECT - Combines all filters
let query = ctx.db.selectFrom("table").selectAll();

if (args.page && args.perPage) {
  const offset = (args.page - 1) * args.perPage;
  query = query.offset(offset).limit(args.perPage);
}

if (args.from && args.to) {
  query = query
    .where("createdAt", ">=", args.from)
    .where("createdAt", "<=", args.to);
  // Pagination stays intact!
}

// Apply other filters
if (args.status) {
  query = query.where("status", "=", args.status);
}

return query.execute();
```

---

## Input Schema Usage Pattern

All mutations should use correct schemas:

```typescript
// For CREATE mutations
const payload = CreateLeadInputSchema().parse(args.value);

// For UPDATE mutations (NOT Create!)
const payload = UpdateLeadInputSchema().parse(args.value);
```

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Total CRM Entities | 11 |
| Mutation Resolvers to Fix | ~30 |
| Query Resolvers to Fix | ~25 |
| New Analytics Queries | 5 |
| New Filter Parameters | 20+ |
| GraphQLError imports to add | 10+ |
| Pagination bugs to fix | 8 |
| FK validations to add | 6 |

---

## Testing Strategy

Once all fixes are implemented, verify against `@docs/tests/crm.md`:

- ✓ Create operations with required/optional fields
- ✓ Update operations with correct input schemas
- ✓ Delete operations with error handling
- ✓ Query operations with pagination support
- ✓ Search operations with multiple filters
- ✓ Analytics queries with aggregations
- ✓ Error handling with GraphQLError
- ✓ Foreign key validations
- ✓ Business logic validations

---

## Notes

- **Test Reference:** All requirements derived from `@docs/tests/crm.md`
- **Error Handling:** All errors must use `GraphQLError` for consistent client response format
- **Database Consistency:** All FK validations must check existence before linking
- **Business Rules:** Implement rules like "cannot update paid invoices", "cannot delete company with active contacts"
- **Analytics:** Implement aggregation queries for reporting requirements

---

## Progress Tracking

**Last Updated:** 2025-11-03 (Session 2 - Resumed)  
**Total Checklist Items:** 52  
**Completed:** 17  
**In Progress:** 6  
**Remaining:** 29  

**Current Phase:** 2.1-2.2 (Contacts Module)

### Session 2 Progress (Current):

**Completed:**
- ✅ Fixed Contacts CrmMutation: Changed user table reference from `"crm.users"` to `"user"` (correct public schema table)
- ✅ Updated Contacts CrmQuery schema with new parameters: `companyId`, `jobTitle`, `ownerId`, `sortBy`, `sortDirection`
- ✅ Build verification passed with Phase 2.1 changes

**In Progress:**
- 🔄 Phase 2.2: Contacts CrmQuery - Waiting for codegen to regenerate types from schema changes
  - Next: Implement filter and sorting logic in resolver
  - Ready to implement once types are regenerated

**Blocked:**
- Need to run `just build` to regenerate GraphQL types before implementing Phase 2.2 resolver

### Session 1 Progress (Previously Completed):

**Phase 1 - Complete:** All items ✅
- Leads CrmMutation: Fixed schema usage, status comparison
- Leads CrmQuery: Added sorting, fixed pagination
- Companies CrmMutation: Added FK validation for contacts/opportunities
- Companies CrmQuery: Fixed pagination, added GraphQLError

**Next Steps (After Phase 2.2):**
1. Phase 2.3: Cases CrmMutation - Add FK validation for contactId
2. Phase 2.4: Cases CrmQuery - Add active filter, assignedTo filter, sorting
3. Phase 2.5: Interactions CrmMutation - Add FK validation for contactId, type validation
4. Phase 2.6: Interactions CrmQuery - Add filters (contactId, opportunityId, createdBy) and sorting
5. Run build to verify Phase 2 compilation
