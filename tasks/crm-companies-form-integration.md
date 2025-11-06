# Generic Form Integration Guide for PocketBase Collections

## Overview

This guide provides step-by-step instructions for implementing Create, Update, and Delete forms for **any PocketBase collection** across all schemas (Customer Relations, Billing Management, Warehouse Management, Transport Management, Delivery Management, etc.) using TanStack Form and existing field components.

The pattern demonstrated here works with any collection and can be applied systematically across the entire application.

**Reference Implementation**: Companies entity (`src/components/actions/customer-relations/companies/`)

## Architecture Overview

## Architecture Overview

### Form Structure
Each collection follows this directory structure:

```
src/components/actions/<SCHEMA_NAME>/<COLLECTION_NAME>/
├── index.tsx          (barrel export - exports all forms)
├── create.tsx         (create form dialog)
├── update.tsx         (update form dialog)
└── delete.tsx         (delete confirmation dialog)
```

**Schema Names** (from `/src/components/actions/`):
- `customer-relations` - CRM entities
- `billing-management` - Billing entities
- `warehouse-management` - WMS entities
- `transport-management` - TMS entities
- `delivery-management` - Delivery entities

**Variable Naming Convention**:
- Replace `<SCHEMA_NAME>` with the schema directory name (kebab-case)
- Replace `<COLLECTION_NAME>` with the collection name (kebab-case)
- Replace `<Entity>` with PascalCase entity name
- Replace `<COLLECTION_ENUM>` with Collections enum value (PascalCase)

### Form Organization
Each form organizes fields into logical groups based on the collection's mutation/schema specifications. Groups typically include:
- Basic/Core Information
- Financial/Billing Information
- Address/Location Information
- Relationship/Assignment Information
- Status/Workflow Information
- Additional Context-Specific Groups

Refer to:
- `/docs/mutations/crm.md` for Customer Relations entities
- `/docs/mutations/` directory for other schema mutation specifications
- PocketBase collection schema in your database for field definitions

## Prerequisites

Before implementing forms for any entity, ensure:

1. **TanStack Form Integration**
   - `@tanstack/react-form` is installed
   - Form context providers are set up in your layout
   - `useAppForm` hook is available from `@/components/ui/forms`

2. **UI Components Available**
   - Field components: `FieldSet`, `FieldGroup`, `FieldLegend`, `FieldDescription`, `FieldSeparator` from `@/components/ui/field`
   - Form wrapper: `FormDialog` component at `@/components/ui/forms/utils/dialog`
   - Alert dialog: `AlertDialog` components from `@/components/ui/alert-dialog`
   - Input field types: `TextField`, `NumberField`, `URLField`, `EmailField`, `TextareaField`, `SelectField`, `DateTimeField`, `RichEditorField`, `FileField`, `CheckboxGroupField`, `RadioGroupField`, `BoolField`, `JSONField`, `GeoPointField`

3. **PocketBase Setup**
   - PocketBase instance configured with your collection
   - Collections enum available at `@/lib/pb.types`
   - Type exports: `Create<T>`, `Update<T>`
   - Collection type available in enum: e.g., `CustomerRelationsLeads`, `BillingManagementInvoices`, `WarehouseManagementInventoryStock`

4. **Router & Query Setup**
   - TanStack Router configured with search params support
   - Route structure: `/dashboard/$schema/$collection` (where schema and collection come from URL)
   - TanStack Query (React Query) set up for async data fetching
   - Route context providing `pocketbase` instance

5. **Toast Notifications**
   - `sonner` toast library installed and configured
   - Toaster component rendered in app layout

6. **Entity Documentation**
   - Review mutation plan or schema specifications for your collection
   - Understand all fields, their types, constraints, and immutability rules
   - Check if mutation plan exists in `/docs/mutations/` directory

7. **Type Definitions**
   - Ensure your collection has a corresponding type in `@/lib/pb.types`
   - Types follow pattern: `<Schema><Collection>Record` and `<Schema><Collection>Response`
   - Example: `BillingManagementInvoicesRecord`, `WarehouseManagementInventoryStockResponse`

## Step-by-Step Integration

### Step 0: Prepare Entity Information

Before creating forms, gather:

1. **Schema Name**
   - Directory name in `/src/components/actions/`
   - Examples: `customer-relations`, `billing-management`, `warehouse-management`, `transport-management`, `delivery-management`

2. **Collection Name**
   - From `Collections` enum in `@/lib/pb.types`
   - Examples: `Collections.CustomerRelationsCompanies`, `Collections.BillingManagementInvoices`, `Collections.WarehouseManagementInventoryStock`

3. **Entity Type Name**
   - Singular PascalCase form
   - Examples: `Company`, `Invoice`, `InventoryStock`

4. **Kebab-Case Collection Name**
   - Lowercase with hyphens (for directory)
   - Examples: `companies`, `invoices`, `inventory-stock`

5. **Search Param Action Names**
   - camelCase format
   - Examples: `createCompany`, `createInvoice`, `updateInventoryStock`, `deletePayment`

6. **Mutation Plan or Schema Specification**
   - Review `/docs/mutations/` directory for mutation plans
   - Check PocketBase collection schema in database for field definitions
   - Note all fields, their types, constraints, and immutability rules
   - Identify required vs optional fields
   - Understand field grouping for form organization

### Step 1: File Structure Setup

Create the directory structure for your schema and collection:

```
src/components/actions/<SCHEMA_NAME>/<COLLECTION_NAME>/
├── index.tsx          (barrel export)
├── create.tsx         (create form)
├── update.tsx         (update form)
└── delete.tsx         (delete confirmation)
```

**Examples**:
- Customer Relations: `src/components/actions/customer-relations/companies/`
- Billing Management: `src/components/actions/billing-management/invoices/`
- Warehouse Management: `src/components/actions/warehouse-management/inventory-stock/`
- Transport Management: `src/components/actions/transport-management/drivers/`
- Delivery Management: `src/components/actions/delivery-management/routes/`

Replace:
- `<SCHEMA_NAME>` with your schema directory name (kebab-case)
- `<COLLECTION_NAME>` with your collection name (kebab-case)

### Step 2: Create Form Implementation

**File**: `src/components/actions/customer-relations/<ENTITY_NAME>/create.tsx`

The create form implements:
- Default empty form values
- Required `name` field
- Optional fields for company details
- Address fields for location information
- Owner field for user assignment
- Form submission with PocketBase integration
- Success/error toast notifications

### Step 2: Create Form Implementation

**File**: `src/components/actions/customer-relations/<ENTITY_NAME>/create.tsx`

The create form implements:
- Default empty form values using entity's Create type
- Required fields as specified in mutation plan
- Optional fields for additional details
- Form submission with PocketBase integration
- Success/error toast notifications
- Proper cleanup of search params after submission

**Template Structure**:

```tsx
import { FieldSet, FieldGroup, FieldLegend, FieldDescription, FieldSeparator } from "@/components/ui/field";
import { useAppForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import { Collections, Create } from "@/lib/pb.types";
import { useNavigate, useRouteContext, useSearch } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import React from "react";
import { toast } from "sonner";

const Create<Entity>FormDialog = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({ from: "/dashboard/$schema/$collection" });

  const form = useAppForm({
    defaultValues: {} as Create<Collections.<COLLECTION_NAME>>,
    onSubmit: async ({ value }) => {
      try {
        await pocketbase.collection(Collections.<COLLECTION_NAME>).create(value);
        navigate({ search: (prev) => ({ ...prev, action: undefined }) });
        toast.success("<Entity> created successfully");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(error.message);
        }
      }
    },
  });

  return (
    <form.AppForm>
      <FormDialog
        open={searchParams.action === "create<Entity>"}
        onOpenChange={() => navigate({ search: (prev) => ({ ...prev, action: undefined }) })}
        title="Create <Entity>"
        description="Fill out the form to create a new <entity>"
      >
        <FieldSet>
          {/* Organize fields into logical groups per mutation plan */}
          <FieldGroup>
            <FieldLegend>Group Name</FieldLegend>
            <FieldDescription>Description of group</FieldDescription>
            {/* Add form fields here */}
          </FieldGroup>
        </FieldSet>
      </FormDialog>
    </form.AppForm>
  );
};

export default Create<Entity>FormDialog;
```

**Implementation Steps**:

1. Replace all `<Entity>` with PascalCase name (e.g., `Lead`, `Opportunity`)
2. Replace `<COLLECTION_NAME>` with collections enum value (e.g., `CustomerRelationsLeads`)
3. Replace `<entity>` with lowercase name (e.g., `lead`, `opportunity`)
4. Use Companies implementation as template: `src/components/actions/customer-relations/companies/create.tsx`
5. Customize field groups based on mutation plan from `/docs/mutations/crm.md`
6. Update field names, labels, descriptions, and validation per mutation plan
7. Remove fields that don't apply to this entity
8. Add fields specific to this entity
9. Organize into appropriate field groups with separators

**Key Features**:
```tsx
- Field groups with legends and descriptions
- Field separators for visual organization
- Proper validation and error handling
- Toast notifications for user feedback
- TanStack Form integration with field context
```

**Form Trigger**:
- Opens when: `searchParams.action === "create<Entity>"`
- Closes by: Setting action to undefined in search params

### Step 3: Update Form Implementation

**File**: `src/components/actions/customer-relations/<ENTITY_NAME>/update.tsx`

The update form implements:
- Query to fetch existing entity data
- Form pre-population with fetched data
- All fields as optional (following CRM mutation pattern)
- Update submission to PocketBase
- Proper handling of record ID from search params

**Template Structure**:

```tsx
import { FieldSet, FieldGroup, FieldLegend, FieldDescription, FieldSeparator } from "@/components/ui/field";
import { useAppForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import { Collections, Update } from "@/lib/pb.types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouteContext, useSearch } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import React from "react";
import { toast } from "sonner";

const Update<Entity>FormDialog = () => {
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({ from: "/dashboard/$schema/$collection" });

  const record = useQuery({
    queryKey: [Collections.<COLLECTION_NAME>, searchParams.id],
    queryFn: () => pocketbase.collection(Collections.<COLLECTION_NAME>).getOne(searchParams.id || ""),
    enabled: !!searchParams.id,
  });

  const form = useAppForm({
    defaultValues: (record.data || {}) as Update<Collections.<COLLECTION_NAME>>,
    onSubmit: async ({ value }) => {
      try {
        await pocketbase.collection(Collections.<COLLECTION_NAME>).update(searchParams.id || "", value);
        navigate({ search: (prev) => ({ ...prev, action: undefined, id: undefined }) });
        toast.success("<Entity> updated successfully");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(error.message);
        }
      }
    },
  });

  return (
    <form.AppForm>
      <FormDialog
        open={searchParams.action === "update<Entity>"}
        onOpenChange={() => navigate({ search: (prev) => ({ ...prev, action: undefined, id: undefined }) })}
        title="Update <Entity>"
        description="Edit <entity> information"
      >
        <FieldSet>
          {/* Same fields as create form but all optional */}
        </FieldSet>
      </FormDialog>
    </form.AppForm>
  );
};

export default Update<Entity>FormDialog;
```

**Key Differences from Create**:
- Fetches existing data: `useQuery` with entity ID
- Populates defaultValues with fetched record
- Uses `.update()` instead of `.create()`
- Clears both `action` and `id` from search params after success
- All fields optional (except those with immutability constraints per mutation plan)
- Success message says "updated" instead of "created"

**Form Trigger**:
- Opens when: `searchParams.action === "update<Entity>"` AND `searchParams.id` is set
- Closes by: Setting both action and id to undefined

### Step 4: Delete Confirmation Implementation

**File**: `src/components/actions/customer-relations/<ENTITY_NAME>/delete.tsx`

The delete confirmation implements:
- AlertDialog for user confirmation
- Fetches entity data for display
- Delete handler with error handling
- Loading state management
- Destructive styling for delete button

**Template Structure**:

```tsx
import { Collections } from "@/lib/pb.types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouteContext, useSearch } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Delete<Entity>FormDialog = () => {
  const searchParams = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const [isDeleting, setIsDeleting] = useState(false);

  const { pocketbase } = useRouteContext({ from: "/dashboard/$schema/$collection" });

  const { data: record } = useQuery({
    queryKey: [Collections.<COLLECTION_NAME>, searchParams.id],
    queryFn: () => pocketbase.collection(Collections.<COLLECTION_NAME>).getOne(searchParams.id || ""),
    enabled: !!searchParams.id,
  });

  const handleDelete = async () => {
    if (!searchParams.id) {
      toast.error("No <entity> selected");
      return;
    }

    setIsDeleting(true);
    try {
      await pocketbase.collection(Collections.<COLLECTION_NAME>).delete(searchParams.id);
      navigate({ search: (prev) => ({ ...prev, action: undefined, id: undefined }) });
      toast.success("<Entity> deleted successfully");
    } catch (error) {
      if (error instanceof ClientResponseError) {
        toast.error(error.message);
      } else {
        toast.error("Failed to delete <entity>");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog
      open={searchParams.action === "delete<Entity>"}
      onOpenChange={(open) => {
        if (!open) {
          navigate({ search: (prev) => ({ ...prev, action: undefined, id: undefined }) });
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete <Entity></AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <span className="font-semibold text-foreground">{record?.name}</span>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete<Entity>FormDialog;
```

**Key Features**:
- Displays entity identifier (usually `name` field) in confirmation dialog
- Shows "Deleting..." during operation
- Disables buttons while deleting
- Red/destructive styling on delete button
- Proper error handling and toast messages
- Validates ID before attempting deletion
- Checks delete constraints per mutation plan (e.g., "Cannot delete if status is X")

**Dialog Trigger**:
- Opens when: `searchParams.action === "delete<Entity>"` AND `searchParams.id` is set
- Closes by: Setting both action and id to undefined

### Step 5: Barrel Export Setup

**File**: `src/components/actions/customer-relations/<ENTITY_NAME>/index.tsx`

Create the barrel export:

```tsx
import React from "react";
import Create<Entity>FormDialog from "./create";
import Update<Entity>FormDialog from "./update";
import Delete<Entity>FormDialog from "./delete";

export default [
  <Create<Entity>FormDialog />,
  <Update<Entity>FormDialog />,
  <Delete<Entity>FormDialog />,
] satisfies React.ReactNode;
```

This exports all three form components as a React node array for easy integration.

### Step 6: Integration with Route Layout

In your dashboard route component (e.g., `/dashboard/$schema/$collection`):

```tsx
import <Entity>Forms from "@/components/actions/customer-relations/<entity-name>";

export function DashboardLayout() {
  return (
    <div>
      {/* Your main content */}
      
      {/* Render the form components */}
      {<Entity>Forms}
    </div>
  );
}
```

### Step 7: Trigger Form Actions

To trigger the forms from your UI (e.g., buttons in a table):

**Create <Entity>**:
```tsx
<button
  onClick={() =>
    navigate({
      search: (prev) => ({ ...prev, action: "create<Entity>" }),
    })
  }
>
  Add <Entity>
</button>
```

**Update <Entity>**:
```tsx
<button
  onClick={() =>
    navigate({
      search: (prev) => ({
        ...prev,
        action: "update<Entity>",
        id: <entity>.id,
      }),
    })
  }
>
  Edit
</button>
```

**Delete <Entity>**:
```tsx
<button
  onClick={() =>
    navigate({
      search: (prev) => ({
        ...prev,
        action: "delete<Entity>",
        id: <entity>.id,
      }),
    })
  }
>
  Delete
</button>
```

### Step 8: Type Safety & Validation

Ensure type safety:

```tsx
// Create form uses Create<Collections.<COLLECTION_NAME>>
const form = useAppForm({
  defaultValues: {} as Create<Collections.<COLLECTION_NAME>>,
  onSubmit: async ({ value }) => {
    // value is properly typed
    await pocketbase.collection(Collections.<COLLECTION_NAME>).create(value);
  },
});

// Update form uses Update<Collections.<COLLECTION_NAME>>
const form = useAppForm({
  defaultValues: (record.data || {}) as Update<Collections.<COLLECTION_NAME>>,
  onSubmit: async ({ value }) => {
    // value is properly typed for partial updates
    await pocketbase.collection(Collections.<COLLECTION_NAME>).update(id, value);
  },
});
```

## Form Fields Reference

### Understanding the Mutation Plan

Each entity has a detailed mutation plan in `/docs/mutations/crm.md` that specifies:

1. **Create Fields** - All fields available when creating
2. **Update Fields** - Which fields can be updated and constraints
3. **Delete Constraints** - Conditions that prevent deletion
4. **Field Properties**:
   - Type (string, number, email, url, date, enum, relation, file[], etc.)
   - Required vs Optional
   - Constraints (max length, min/max values, format validation)
   - Immutability (cannot update after creation)
   - Unique requirements
   - Default values

### Generic Field Mapping

| Field Type | Component | Example | Notes |
|------------|-----------|---------|-------|
| String | `TextField` | Name, Title, Description | Max length, required validation |
| Email | `EmailField` | Email address | Built-in email validation |
| URL | `URLField` | Website, Link | URL format validation |
| Number | `NumberField` | Amount, Revenue, Score | Min/max ranges, decimals |
| Date | `DateTimeField` | Created date, Due date | Format, range constraints |
| DateTime | `DateTimeField` | Interaction time, Updated at | Timestamp format |
| Enum | `SelectField` | Status, Type, Priority | Predefined options per mutation plan |
| Boolean | `BoolField` | Is active, Has attachment | True/false toggle |
| Textarea | `TextareaField` | Long text, Notes, Description | Multi-line text, HTML optional |
| Rich Text | `RichEditorField` | HTML content, Rich notes | HTML editor |
| File | `FileField` | Attachments, Documents | Multiple files, size limits |
| Relation | `TextField` (placeholder) | Owner, Company, Contact | User ID or relation ID (TODO: implement picker) |
| Array | `CheckboxGroupField` | Multi-select options | Multiple choice |
| Radio | `RadioGroupField` | Mutually exclusive options | Single choice |
| JSON | `JSONField` | Complex data | Structured data |
| GeoPoint | `GeoPointField` | Location, Coordinates | Latitude/longitude |

### Example Field Implementation

```tsx
// Required string field with max length
<form.AppField name="name">
  {(field) => (
    <field.TextField
      label="Name"
      description="Max 200 characters"
      placeholder="Enter name"
      required
    />
  )}
</form.AppField>

// Optional email field
<form.AppField name="email">
  {(field) => (
    <field.EmailField
      label="Email Address"
      description="Optional contact email"
      placeholder="user@example.com"
    />
  )}
</form.AppField>

// Number field with constraints
<form.AppField name="score">
  {(field) => (
    <field.NumberField
      label="Score"
      description="0-100 scale"
      min={0}
      max={100}
      placeholder="50"
    />
  )}
</form.AppField>

// Select field with enum options
<form.AppField name="status">
  {(field) => (
    <field.SelectField
      label="Status"
      description="Current status"
      options={[
        { label: "New", value: "new" },
        { label: "In Progress", value: "in-progress" },
        { label: "Completed", value: "completed" },
      ]}
    />
  )}
</form.AppField>
```

## Customization Guide

### Changing Field Groups

To add or modify field groups, edit the form component:

```tsx
<FieldGroup>
  <FieldLegend>Your Group Name</FieldLegend>
  <FieldDescription>Description of what's in this group</FieldDescription>
  
  <form.AppField name="fieldName">
    {(field) => (
      <field.TextField
        label="Display Label"
        description="Field description"
        tooltip="Helpful tooltip text"
        placeholder="example"
      />
    )}
  </form.AppField>
</FieldGroup>

<FieldSeparator>Next Group Name</FieldSeparator>
```

### Changing Field Types

Replace field type in AppField:

```tsx
// Text field
<field.TextField label="Name" />

// Number field
<field.NumberField label="Amount" min={0} />

// URL field
<field.URLField label="Website" />

// Textarea
<field.TextareaField label="Description" />

// Email
<field.EmailField label="Email" />

// Rich editor
<field.RichEditorField label="Notes" />

// Select
<field.SelectField label="Status" options={[...]} />

// Relation (currently TextField placeholder)
<field.TextField label="Owner ID" />
```

### Customizing Dialog Appearance

Modify `FormDialog` or `AlertDialog` props:

```tsx
<FormDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Custom Title"
  description="Custom description"
>
  {/* content */}
</FormDialog>
```

### Modifying Toast Messages

Update success/error messages:

```tsx
toast.success("Company added to system");
toast.error("Failed to save company details");
```

## Validation & Error Handling

### Client-side Validation

The forms use Zod schemas for client-side validation. These are defined in the GraphQL package:

```tsx
import { CreateCompanyInputSchema, UpdateCompanyInputSchema } from "@packages/graphql/src/zod.schema";
```

To add custom validation:

```tsx
const form = useAppForm({
  defaultValues: {},
  validators: {
    onChange: ({ value }) => {
      // Custom validation logic
    },
  },
});
```

### Server-side Error Handling

All forms wrap submissions in try-catch:

```tsx
try {
  await pocketbase.collection(...).create(value);
  toast.success("Success message");
} catch (error) {
  if (error instanceof ClientResponseError) {
    toast.error(error.message); // PocketBase error message
  }
}
```

## Testing

### Test Cases for Create Form

- [ ] Form opens with empty fields
- [ ] Only `name` field is required
- [ ] Optional fields can be left empty
- [ ] Submit creates new company in PocketBase
- [ ] Success toast appears after creation
- [ ] Form closes after successful submission
- [ ] Search params are cleared

### Test Cases for Update Form

- [ ] Form opens with existing company data
- [ ] Fields are pre-populated correctly
- [ ] Submit updates company in PocketBase
- [ ] Success toast appears after update
- [ ] Form closes after successful submission
- [ ] Both action and id params are cleared

### Test Cases for Delete

- [ ] Dialog shows company name
- [ ] Cancel button closes dialog without deleting
- [ ] Delete button triggers deletion
- [ ] Button shows "Deleting..." during operation
- [ ] Success toast appears after deletion
- [ ] Company is removed from PocketBase
- [ ] Dialog closes after deletion

### Manual Testing Checklist

```
Create Form:
  [ ] Open form via "Add Company" button
  [ ] Fill in required name field
  [ ] Fill in optional fields
  [ ] Submit and verify in PocketBase
  [ ] Check form closes and toast appears

Update Form:
  [ ] Click edit on existing company
  [ ] Verify fields are pre-populated
  [ ] Modify one or more fields
  [ ] Submit and verify changes in PocketBase
  [ ] Check form closes and toast appears

Delete Form:
  [ ] Click delete on company
  [ ] Verify company name in confirmation
  [ ] Click Cancel (should close without deleting)
  [ ] Click delete again
  [ ] Click Delete (should remove from PocketBase)
  [ ] Verify company no longer appears in list
```

## Common Issues & Troubleshooting

### Issue: Form doesn't open

**Cause**: Search params not configured correctly
**Solution**: 
- Verify `searchParams.action` matches the form trigger value exactly
- Check case sensitivity: `createCompany` not `CreateCompany`
- Ensure navigation is updating search params correctly

### Issue: Form fields don't populate in Update

**Cause**: Query hasn't finished fetching data or query key is incorrect
**Solution**: 
- Ensure `enabled` condition in useQuery is set properly: `enabled: !!searchParams.id`
- Check query key includes ID: `queryKey: [Collections.<COLLECTION_NAME>, searchParams.id]`
- Verify data is loading: Check React Query DevTools or console logs
- Add loading state and display skeleton/placeholder while loading

### Issue: Submission doesn't work

**Cause**: PocketBase collection not accessible, typed incorrectly, or validation failing
**Solution**: 
- Verify `Collections.<COLLECTION_NAME>` exists in pb.types enum
- Check PocketBase instance is available in route context
- Verify network request in browser DevTools
- Check for validation errors in form state
- Log the value object before submission to see what's being sent

### Issue: Toast notifications don't show

**Cause**: Toast provider not in component tree
**Solution**: 
- Ensure `Toaster` component from `sonner` is rendered in your app layout
- Check toast is being called in correct scope (inside try/catch)
- Verify sonner is installed: `bun add sonner`

### Issue: Owner field not showing as relation picker

**Cause**: Relation field component not yet fully implemented
**Solution**: 
- Currently using TextField as placeholder for all relation fields
- Implement proper relation picker component when ready
- For now, users must know the User ID they want to assign

### Issue: Delete button is disabled or form won't submit

**Cause**: Record has constraints that prevent deletion per mutation plan
**Solution**:
- Check mutation plan for entity's delete constraints
- May need to update related records first
- Consider archival/soft-delete instead of hard delete
- Add validation message explaining why deletion is blocked

### Issue: Form values not updating when record changes

**Cause**: Form defaultValues not reactive to data changes
**Solution**:
- Use `form.reset()` to manually reset form when data changes
- Implement dependency on record data in useEffect
- Consider adding a "Reload" button to refresh data

### Issue: Required field validation not working

**Cause**: Field not marked as required or validation schema missing
**Solution**:
- Add `required` prop to field component
- Ensure Zod schema is properly validating (if using schema validation)
- Check form validator configuration
- Add custom validation if needed

## Next Steps

### For Other CRM Entities

To create similar forms for other entities (Leads, Opportunities, Contacts, etc.):

1. **Gather Entity Information**
   - Review mutation plan in `/docs/mutations/crm.md`
   - Note all fields and their properties
   - Identify field groups and separators

2. **Create Directory Structure**
   ```bash
   mkdir -p src/components/actions/customer-relations/<entity-name>
   ```

3. **Copy Pattern from Reference**
   - Start with Companies implementation as template
   - Copy create.tsx → customize for your entity
   - Copy update.tsx → customize for your entity
   - Copy delete.tsx → customize for your entity
   - Create index.tsx barrel export

4. **Customize for Entity**
   - Replace all placeholder names
   - Update field names and groups per mutation plan
   - Adjust field types (TextField, NumberField, SelectField, etc.)
   - Add entity-specific validations
   - Update dialog titles and descriptions

5. **Integration**
   - Add to layout route component
   - Create trigger buttons in data table
   - Test create, update, delete flows
   - Verify error handling

### Quick Copy Template

For rapid implementation of a new entity:

```bash
# 1. Create directory
mkdir -p src/components/actions/customer-relations/<entity-name>

# 2. Copy Companies files as template
cp src/components/actions/customer-relations/companies/create.tsx \
   src/components/actions/customer-relations/<entity-name>/create.tsx

cp src/components/actions/customer-relations/companies/update.tsx \
   src/components/actions/customer-relations/<entity-name>/update.tsx

cp src/components/actions/customer-relations/companies/delete.tsx \
   src/components/actions/customer-relations/<entity-name>/delete.tsx

# 3. Create barrel export
cat > src/components/actions/customer-relations/<entity-name>/index.tsx << 'EOF'
import React from "react";
import Create<Entity>FormDialog from "./create";
import Update<Entity>FormDialog from "./update";
import Delete<Entity>FormDialog from "./delete";

export default [
  <Create<Entity>FormDialog />,
  <Update<Entity>FormDialog />,
  <Delete<Entity>FormDialog />,
] satisfies React.ReactNode;
EOF

# 4. Search and replace all occurrences
# - Companies → <Entity>
# - companies → <entity-name>
# - COMPANIES → <COLLECTION_NAME>
```

### Supported CRM Entities

- [ ] **Companies** ✅ (Reference Implementation)
- [ ] **Leads** - `/docs/mutations/crm.md#leads`
- [ ] **Contacts** - `/docs/mutations/crm.md#contacts`
- [ ] **Opportunities** - `/docs/mutations/crm.md#opportunities`
- [ ] **Products** - `/docs/mutations/crm.md#products-service-catalog`
- [ ] **Campaigns** - `/docs/mutations/crm.md#campaigns`
- [ ] **Cases** - `/docs/mutations/crm.md#cases`
- [ ] **Invoices** - `/docs/mutations/crm.md#invoices`
- [ ] **Interactions** - `/docs/mutations/crm.md#interactions`
- [ ] **Opportunity Products** - `/docs/mutations/crm.md#opportunity-products-junction-table`
- [ ] **Invoice Items** - `/docs/mutations/crm.md#invoice-items`

### Future Enhancements

- [ ] Implement proper relation picker for User/Company/Contact selection
- [ ] Add file upload for attachments field
- [ ] Implement rich text editor integration for HTML fields
- [ ] Add dependent field logic (show fields based on entity type)
- [ ] Add batch operations (create/update multiple records)
- [ ] Add form validation with real-time feedback
- [ ] Add loading skeleton while fetching update data
- [ ] Implement optimistic updates for better UX
- [ ] Add change confirmation before closing unsaved forms
- [ ] Add bulk delete with confirmation
- [ ] Implement field-level permissions (show/hide based on user role)
- [ ] Add export/import functionality
- [ ] Add duplicate entity functionality
- [ ] Implement activity/audit trail display
- [ ] Add keyboard shortcuts (Cmd+Enter to submit, Esc to close)

## References

- **CRM Mutations Plan**: `/docs/mutations/crm.md` - Complete field specifications for all CRM entities
- **Reference Implementation**: `src/components/actions/customer-relations/companies/` - Companies forms
- **TanStack Form Docs**: https://tanstack.com/form/latest
- **Radix UI AlertDialog**: https://www.radix-ui.com/docs/primitives/components/alert-dialog
- **Sonner Toast Library**: https://sonner.emilkowal.ski/
- **PocketBase Documentation**: https://pocketbase.io/docs/
- **TypeScript PocketBase Types**: `@/lib/pb.types`
- **Field Component Exports**: `@/components/ui/forms/fields/`

## Support & Questions

For issues or questions about form implementation:

1. **Consult the Mutation Plan** - `/docs/mutations/crm.md` for your specific entity
2. **Review Reference Implementation** - Check Companies forms for pattern examples
3. **Check TypeScript Types** - Verify types in `@/lib/pb.types`
4. **Check Browser Console** - Look for TypeScript/runtime errors
5. **Verify PocketBase Connection** - Test collection names and data access
6. **Debug with React DevTools** - Check component state and props
7. **Review Network Requests** - Check API calls in browser DevTools

---

**Last Updated**: November 6, 2025
**Status**: Generic template for all CRM entities
**Version**: 1.0
**Reference Implementation**: Companies (✅ Complete)

This document provides the complete pattern and template for implementing CRUD forms for any CRM entity in the logistics management system.
