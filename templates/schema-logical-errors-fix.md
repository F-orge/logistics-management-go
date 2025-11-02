# [MODULE_NAME] Schema Logical Errors Fix - Comprehensive Plan

**Date Created:** [DATE]  
**Reference Document:** `@docs/tests/[MODULE_NAME].md`  
**Target Files:** `packages/graphql/src/schema/[MODULE_NAME]/<entity>/resolvers/`  
**Error Handling Strategy:** Use `GraphQLError` for all error scenarios

---

## Overview

Fix logical errors across [NUMBER] [MODULE_NAME] entities ([ENTITY_LIST]) in their Mutations and Queries. All errors will use `GraphQLError` for proper error handling and user feedback.

---

## Implementation Checklist

### Phase 1: [PHASE_NAME]

- [ ] **[NUMBER].[SUBNUMBER] [ENTITY_NAME] Module - [RESOLVER_TYPE].ts**
  - [ ] [TASK_DESCRIPTION]
  - [ ] [TASK_DESCRIPTION]
  - [ ] [TASK_DESCRIPTION]

### Phase 2: [PHASE_NAME]

- [ ] **[NUMBER].[SUBNUMBER] [ENTITY_NAME] Module - [RESOLVER_TYPE].ts**
  - [ ] [TASK_DESCRIPTION]
  - [ ] [TASK_DESCRIPTION]

---

## Detailed Issues & Fixes

### [NUMBER]. [ENTITY_NAME] MODULE

**File:** `packages/graphql/src/schema/[MODULE_NAME]/[entity_name]/resolvers/`

#### [RESOLVER_TYPE].ts Issues:

- **Issue Name:**
  - **Location:** Line [NUMBER]
  - **Problem:** [DESCRIBE_ISSUE]
  - **Fix:** [DESCRIBE_FIX]
  - **Impact:** [DESCRIBE_IMPACT]

- **Missing:** [FEATURE/PATTERN_NAME]
  - **Fix:** [DESCRIBE_FIX]
  - **Impact:** [DESCRIBE_IMPACT]

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
const payload = Create[Entity]InputSchema().parse(args.value);

// For UPDATE mutations (NOT Create!)
const payload = Update[Entity]InputSchema().parse(args.value);
```

---

## Sorting Implementation Pattern

Add sorting support to queries:

```typescript
// Add to schema first
if (args.sortBy) {
  if (args.sortBy === "[FIELD_NAME]") {
    query = query.orderBy("[field_name]", args.sortDirection === "DESC" ? "desc" : "asc");
  }
}
```

---

## Foreign Key Validation Pattern

Validate related entities before linking:

```typescript
// Check if related entity exists
const relatedEntity = await ctx.db
  .selectFrom("[schema].[table]")
  .select("id")
  .where("id", "=", payload.[field_name])
  .executeTakeFirst();

if (!relatedEntity) {
  throw new GraphQLError("[Entity] not found", {
    extensions: { code: "NOT_FOUND" }
  });
}
```

---

## Status Transition Validation Pattern

Enforce valid state transitions:

```typescript
// Define valid transitions
const validTransitions = {
  PENDING: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["OUT_FOR_DELIVERY", "CANCELLED"],
  OUT_FOR_DELIVERY: ["DELIVERED", "FAILED"],
  DELIVERED: [],
  FAILED: []
};

// Validate transition
if (!validTransitions[previousEntity.status]?.includes(payload.status)) {
  throw new GraphQLError(`Cannot transition from ${previousEntity.status} to ${payload.status}`, {
    extensions: { code: "BUSINESS_LOGIC_ERROR" }
  });
}
```

---

## Summary Statistics

| Category | Count |
|----------|-------|
| Total [Module_Name] Entities | [NUMBER] |
| Mutation Resolvers to Fix | [NUMBER] |
| Query Resolvers to Fix | [NUMBER] |
| New Analytics Queries | [NUMBER] |
| New Filter Parameters | [NUMBER] |
| GraphQLError imports to add | [NUMBER] |
| Pagination bugs to fix | [NUMBER] |
| FK validations to add | [NUMBER] |

---

## Testing Strategy

Once all fixes are implemented, verify against `@docs/tests/[MODULE_NAME].md`:

- [ ] Create operations with required/optional fields
- [ ] Update operations with correct input schemas
- [ ] Delete operations with error handling
- [ ] Query operations with pagination support
- [ ] Search operations with multiple filters
- [ ] Analytics queries with aggregations
- [ ] Error handling with GraphQLError
- [ ] Foreign key validations
- [ ] Business logic validations
- [ ] Status transition validations

---

## Implementation Order (Recommended)

1. **Phase 1:** [PHASE_NAME] - [BRIEF_DESCRIPTION]
2. **Phase 2:** [PHASE_NAME] - [BRIEF_DESCRIPTION]
3. **Phase 3:** [PHASE_NAME] - [BRIEF_DESCRIPTION]
4. **Phase 4:** Validation & Testing - Code review and test case verification

---

## Notes

- **Test Reference:** All requirements derived from `@docs/tests/[MODULE_NAME].md`
- **Error Handling:** All errors must use `GraphQLError` for consistent client response format
- **Database Consistency:** All FK validations must check existence before linking
- **Business Rules:** Implement rules as specified in test cases
- **Analytics:** Implement aggregation queries for reporting requirements

---

## Progress Tracking

**Last Updated:** [DATE]  
**Total Checklist Items:** [NUMBER]  
**Completed:** [NUMBER]  
**In Progress:** [NUMBER]  
**Remaining:** [NUMBER]  

**Current Phase:** [PHASE_NAME]

### Session [NUMBER] Progress:

**Completed:**
- ✅ [COMPLETED_ITEM]
- ✅ [COMPLETED_ITEM]

**In Progress:**
- 🔄 [IN_PROGRESS_ITEM]

**Blocked:**
- 🚫 [BLOCKED_ITEM]

**Next Steps:**
1. [NEXT_STEP]
2. [NEXT_STEP]
3. [NEXT_STEP]
