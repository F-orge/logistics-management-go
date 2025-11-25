# Customer Relations Component Refactoring

## Overview
Refactored all customer-relations action components from monolithic single-file pattern to modular folder-based architecture, following the established `invoices` pattern.

## Objectives
- Separate concerns: each entity has dedicated create, read, update, delete operations
- Improve maintainability: smaller, focused files instead of large components
- Enable code reuse: standardized Dialog-based orchestration pattern
- Align with existing patterns: match `invoices` folder structure

## Entities Refactored (12 total)

| Entity | Folder | Status |
|--------|--------|--------|
| Campaigns | `campaigns/` | ✅ Complete |
| Cases | `cases/` | ✅ Complete |
| Companies | `companies/` | ✅ Complete |
| Contacts | `contacts/` | ✅ Complete |
| Interactions | `interactions/` | ✅ Complete |
| Invoice Items | `invoice-items/` | ✅ Complete |
| Invoices | `invoices/` | ✅ Complete |
| Leads | `leads/` | ✅ Complete |
| Opportunities | `opportunities/` | ✅ Complete |
| Opportunity Products | `opportunity-products/` | ✅ Complete |
| Products | `products/` | ✅ Complete |

## File Structure

Each entity folder contains 4 files:

```
customer-relations/
├── campaigns/
│   ├── create.tsx      # Schema & form for creating new records
│   ├── update.tsx      # Schema & form for updating existing records
│   ├── delete.tsx      # Confirmation form for deletion
│   └── index.tsx       # Main component orchestrating all operations via Dialog
├── cases/
│   ├── create.tsx
│   ├── update.tsx
│   ├── delete.tsx
│   └── index.tsx
└── ... (10 more entities with identical structure)
```

## Component Patterns

### create.tsx
- Exports schema (e.g., `CreateCampaignsSchema`)
- Defines `FormOption` with validation and submission logic
- Exports `CreateCampaignsForm` component
- Uses PocketBase collection to create records
- Shows toast notification on success/error

**Key Pattern:**
```tsx
export const CreateXSchema = z.object({
  field: SchemaShape.field.register(fieldRegistry, { id: "crm-x-create", ... })
});

const FormOption = formOptions({
  validators: { onSubmit: CreateXSchema },
  onSubmit: async ({ value, meta }) => {
    await meta.pocketbase!.collection(Collections.CustomerRelationsX).create(value);
  }
});

export const CreateXForm = () => {
  const form = useAppForm(FormOption);
  return <AutoFieldSet form={form} />;
};
```

### update.tsx
- Exports schema (e.g., `UpdateCampaignsSchema`)
- All schema fields are optional (`.optional().register(...)`)
- Fetches record data using `useQuery`
- Pre-populates form with fetched data: `defaultValues: data || {}`
- Updates record on submission
- Shows toast notification on success/error

**Key Pattern:**
```tsx
export const UpdateXSchema = z.object({
  field: SchemaShape.field.optional().register(fieldRegistry, { id: "crm-x-update", ... })
});

export const UpdateXForm = () => {
  const { id } = useRouterContext().search;
  const { data } = useQuery({...});
  
  const form = useAppForm({
    ...FormOption,
    defaultValues: data || {}  // Pre-populate with fetched data
  });
  
  return <AutoFieldSet form={form} />;
};
```

### delete.tsx
- Minimal confirmation form
- Shows entity name/identifier
- Contains only `DialogFooter` with cancel and delete buttons
- Calls delete mutation on submit
- Shows toast notification

**Key Pattern:**
```tsx
export const DeleteXForm = () => {
  return (
    <>
      <p>Are you sure you want to delete this record?</p>
      <DialogFooter>
        <SubmitButton form={form} />
      </DialogFooter>
    </>
  );
};
```

### index.tsx
- Main orchestrator component exported as default
- Uses TanStack Router `useSearch()` to read `action` and `id` query params
- Conditionally renders `CreateXForm`, `UpdateXForm`, or `DeleteXForm` based on action
- Wraps forms in `Dialog` component
- Handles dialog open/close state
- Clears action/id from search params on close

**Key Pattern:**
```tsx
export default function XActions() {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  
  let Component: { title: string; description?: string; Element: JSX.Element } | undefined;
  
  if (searchQuery.action === "create") {
    Component = { title: "Create X", Element: <CreateXForm /> };
  } else if (searchQuery.action === "update" && searchQuery.id) {
    Component = { title: "Update X", Element: <UpdateXForm /> };
  } else if (searchQuery.action === "delete" && searchQuery.id) {
    Component = { title: "Delete X", Element: <DeleteXForm /> };
  }
  
  return (
    <Dialog open={!!Component} onOpenChange={(open) => {
      if (!open) navigate({ search: { action: undefined, id: undefined } });
    }}>
      <DialogContent className="max-h-3/4 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{Component?.title}</DialogTitle>
          {Component?.description && <DialogDescription>{Component.description}</DialogDescription>}
        </DialogHeader>
        {Component?.Element}
      </DialogContent>
    </Dialog>
  );
}
```

## Router Integration

The router automatically resolves to folder-based components via dynamic imports that use `index.tsx`:

```ts
// In /routes/dashboard/$schema.$collection.tsx
const component = await import(`../../../components/actions/${schema}/${collection}/index.tsx`)
```

This works because each folder exports a default component from `index.tsx`.

## Cleanup

- ✅ Deleted 10 old single-file components:
  - `campaigns.tsx`
  - `cases.tsx`
  - `companies.tsx`
  - `contacts.tsx`
  - `interactions.tsx`
  - `invoice-items.tsx`
  - `leads.tsx`
  - `opportunities.tsx`
  - `opportunity-products.tsx`
  - `products.tsx`

## Benefits

1. **Separation of Concerns**: Each file has a single responsibility
2. **Reduced Complexity**: Smaller files are easier to read and maintain
3. **Consistency**: All entities follow the same pattern
4. **Scalability**: Adding new entities follows established conventions
5. **Form Reusability**: Dialog pattern is standardized across all entities
6. **Type Safety**: Zod schemas provide runtime validation
7. **Query Params**: Uses router search params for clean state management

## Testing Checklist

- [ ] All create operations work
- [ ] All update operations work with data pre-population
- [ ] All delete operations show confirmation
- [ ] Dialog opens/closes correctly
- [ ] Search params clear when dialog closes
- [ ] Toast notifications display on success/error
- [ ] No TypeScript errors
- [ ] No runtime errors in browser console

## Notes

- All components use `useAppForm` hook with form options pattern
- Schemas use `fieldRegistry` for auto-form field generation
- Collections referenced via `Collections` enum for type safety
- Toast notifications via `showErrorToast` and `showSuccessToast`
- Navigation via `useNavigate` with search params for state management
