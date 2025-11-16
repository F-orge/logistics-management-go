# Field Registry Quick Reference

## What Happened

✅ **140 files updated** across 70+ collections with complete field registry setup
✅ **3 utility scripts created** for automation and reusability
✅ **Relation field support** with auto-generated Collection references
✅ **Formatting applied** and standardized across all files

## The Changes

### Before (Empty)
```typescript
export const CreateSchema = z.object({});
```

### After (Field Registered)
```typescript
export const CreateSchema = z.object({
  driver: TripsSchema.shape.driver.register(fieldRegistry, {
    id: "transport-management-trips-driver-create",
    type: "field",
    label: "Driver",
    description: "Enter a driver",
    inputType: "relation",
    props: {
      collectionName: Collections.TransportManagementDrivers,
      displayField: "name",
      relationshipName: "driver",
    },
  }),
  status: TripsSchema.shape.status.register(fieldRegistry, {
    id: "transport-management-trips-status-create",
    type: "field",
    label: "Status",
    description: "Enter a status",
    inputType: "select",
  }),
});
```

## Scripts Available

### 1. Register Field Schemas
**Location**: `scripts/register-field-schemas.ts`

```bash
# Full registration with relation support
just register-schemas --force

# Preview changes without applying
just register-schemas --dry-run

# Target specific domain
just register-schemas --domain customer-relations

# Target specific collection
just register-schemas --domain transport-management --collection trips
```

**What it does:**
- Discovers all Zod schemas automatically
- Extracts field definitions and types
- Generates registration code with proper metadata
- Handles relation fields with Collection enum references
- Supports both create and update schemas

### 2. Reset Schemas
**Location**: `scripts/reset-schemas.ts`

```bash
# Reset all schemas to empty objects
bun scripts/reset-schemas.ts --force

# Dry run to preview
bun scripts/reset-schemas.ts --dry-run

# Reset specific domain
bun scripts/reset-schemas.ts --domain customer-relations
```

**What it does:**
- Converts populated schemas back to `z.object({})`
- Uses balanced brace matching for reliability
- Prerequisite for re-running registration script

### 3. Standardize Schema Names
**Location**: `scripts/standardize-schema-names.ts`

```bash
# Rename custom schema names to standard format
bun scripts/standardize-schema-names.ts

# Preview changes
bun scripts/standardize-schema-names.ts --dry-run

# Specific domain
bun scripts/standardize-schema-names.ts --domain customer-relations
```

**What it does:**
- Converts `CreateXxxSchema` → `CreateSchema`
- Converts `UpdateXxxSchema` → `UpdateSchema`
- Enables automation by standardizing naming

## Field Type Coverage

| Type | Example | Status |
|------|---------|--------|
| text | name, email, description | ✅ Full support |
| number | amountPaid, discountAmount, subtotal | ✅ Full support |
| date | issueDate, dueDate, createdAt | ✅ Full support |
| select | status, priority, enum fields | ✅ Full support |
| relation | company, driver, vehicle | ✅ Full support with props |
| file | image, attachments, receipts | ⚠️ Skipped - manual props needed |

## Relation Fields

All relation fields include proper metadata:

```typescript
company: ContactsSchema.shape.company.register(fieldRegistry, {
  id: "customer-relations-contacts-company-create",
  type: "field",
  label: "Company",
  description: "Enter a company",
  inputType: "relation",
  props: {
    collectionName: Collections.CustomerRelationsCompanies,
    displayField: "name",
    relationshipName: "company",
  },
})
```

**Props Explained:**
- `collectionName` - Type-safe collection reference via `Collections` enum
- `displayField` - Which field to show in UI (usually "name")
- `relationshipName` - Field name for backend queries

## ID Naming Convention

All field registrations use consistent IDs:

```
{domain}-{collection}-{field}-{action}
```

**Examples:**
- `transport-management-trips-driver-create`
- `customer-relations-contacts-company-update`
- `billing-management-invoices-amountPaid-update`

**Parts:**
- `domain` - Kebab-case: transport-management, warehouse-management, etc.
- `collection` - Kebab-case: trips, contacts, invoices, etc.
- `field` - camelCase: driver, amountPaid, status, etc.
- `action` - create or update

## Update Schema Pattern

Update schemas use `.optional()` for partial updates:

```typescript
export const UpdateSchema = z.object({
  name: ContactsSchema.shape.name.optional().register(fieldRegistry, {
    id: "customer-relations-contacts-name-update",
    type: "field",
    label: "Name",
    description: "Contact name is required",
    inputType: "text",
  }),
  email: ContactsSchema.shape.email.optional().register(fieldRegistry, {
    id: "customer-relations-contacts-email-update",
    type: "field",
    label: "Email",
    description: "Must be a valid email address",
    inputType: "text",
  }),
});
```

This allows partial updates where not all fields need to be provided.

## Domains Covered

### Transport Management (17 collections)
drivers, vehicles, trips, driver-schedules, vehicle-maintenance, expenses, partner-invoices, carriers, proof-of-deliveries, vehicle-availability, etc.

### Warehouse Management (24 collections)
warehouses, bins, bin-threshold, tasks, task-items, packages, returns, suppliers, inbound-shipments, inbound-shipment-items, etc.

### Billing Management (11 collections)
invoices, payments, quotes, rate-cards, disputes, credit-notes, account-transactions, rate-rules, surcharges, logs, etc.

### Delivery Management (4 collections)
tasks, task-items, deliveries, proof-of-deliveries

### Customer Relations (10+ collections)
companies, contacts, leads, opportunities, cases, campaigns, products, interactions, invoice-items, opportunities-products

## Common Tasks

### Run Full System Registration
```bash
# 1. Reset all schemas
bun scripts/reset-schemas.ts --force

# 2. Regenerate with full support
just register-schemas --force

# 3. Format code
bun biome check --fix
```

### Add New Collection
1. Create schema in `/src/pocketbase/schemas/{domain}/{collection}.ts`
2. Create mutation files with empty `CreateSchema` and `UpdateSchema`
3. Run `just register-schemas --domain {domain} --force`

### Manually Configure File Fields
```typescript
attachments: ContactsSchema.shape.attachments.register(fieldRegistry, {
  id: "customer-relations-contacts-attachments-create",
  type: "field",
  label: "Attachments",
  description: "Upload files",
  inputType: "file",
  props: {
    accept: ".pdf,.jpg,.png",
    maxSize: 10485760, // 10MB
    multiple: true,
  },
})
```

### Handle Unresolved Relations
```typescript
// Before: Skipped with warning
// ⚠️ could not resolve target collection: carrier

// After: Add to schema.json mapping, then re-run registration
{
  "collections": {
    "carrier": "transport_management_carriers"
  }
}
```

## Files Modified

### Utility Scripts Added
- `scripts/register-field-schemas.ts` (631 lines)
- `scripts/reset-schemas.ts` (175 lines)  
- `scripts/standardize-schema-names.ts` (202 lines)

### Mutation Files Updated
- 140 files under `src/components/actions/`
- All create.tsx and update.tsx for each collection
- Formatted with Biome (2-space indentation, 120-char width)

### Documentation Added
- `FIELD_REGISTRY_IMPLEMENTATION.md` (this folder)
- `FIELD_REGISTRY_QUICK_REFERENCE.md` (this file)

### Build Configuration
- Added `register-schemas` command to `justfile`

## Git Status

```bash
git status --short src/components/actions | wc -l
# 140 modified files

git diff --stat
# Shows changes across all 140 mutation files
```

## Validation Checklist

- ✅ All 140 files updated with field registrations
- ✅ Standard naming convention applied (CreateSchema/UpdateSchema)
- ✅ ID format consistent across all fields
- ✅ Relation fields include Collection enum references
- ✅ Update schemas use `.optional()` pattern
- ✅ Code formatted with Biome
- ✅ Warnings provided for unresolved fields
- ✅ Dry-run capability available
- ✅ Scripts support domain/collection filtering
- ✅ Justfile integration for easy execution

## Next Steps

1. **Test forms** - Run `just dev` and verify form generation
2. **Test relations** - Click relation fields and verify dropdowns populate
3. **Test validation** - Submit forms and verify Zod validation works
4. **Configure file fields** - Add props for image/attachment fields
5. **Resolve remaining relations** - Update schema.json with missing mappings
6. **Commit changes** - Create clear commit message

## Tips & Tricks

### Preview without applying
```bash
just register-schemas --dry-run --domain transport-management
```

### Regenerate specific collection
```bash
just register-schemas --force --domain customer-relations --collection contacts
```

### Check what changed
```bash
git diff src/components/actions/customer-relations/contacts/create.tsx
```

### Find all unresolved relations
```bash
git log --all --full-history -- "scripts/register-field-schemas.ts" | grep "could not resolve"
```

### Find all skipped file fields
```bash
git log --all --full-history -- "scripts/register-field-schemas.ts" | grep "file field"
```

## Support

For questions about specific fields, check:
- **Field metadata**: `src/pocketbase/schemas/{domain}/{collection}.ts`
- **Collection names**: `src/lib/pb.types.ts` (Collections enum)
- **Form configuration**: `src/components/ui/autoform-tanstack/types.ts` (fieldRegistry, toAutoFormFieldSet)
- **Generated code**: Any `create.tsx` or `update.tsx` file for examples

---

**Implementation Status**: ✅ Complete
**Coverage**: 70+ collections, 140 files
**Field Types**: text, number, date, select, relation (+ file with manual config)
**Ready for**: Development testing and UI validation
