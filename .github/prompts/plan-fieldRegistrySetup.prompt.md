# Plan: Register Zod Types into fieldRegistry for Auto Form Behavior

**Overview:** Systematically register Zod schema fields into `fieldRegistry` with proper metadata to override auto-generation and provide custom labels, descriptions, input types, and props. This process involves extracting available InputTypes, analyzing Zod schemas from `src/pocketbase/schemas/<schema>/<table>.ts`, matching them to database collection definitions, and applying `.register()` with appropriate metadata for each mutation action.

## Steps

### 1. Extract InputType Catalog
- Read `src/components/ui/autoform-tanstack/types.ts` to document all 16 available InputType values
- Available types: text, number, email, date, select, relation, file, textarea, bool, checkboxGroup, radioGroup, json, geoPoint, richEditor, boolean, url
- Use as reference for field registration across all mutations

### 2. Extract Base Zod Schema Definition
- Read `src/pocketbase/schemas/<schema>/<table>.ts` to understand:
  - Field types and validation rules
  - Required vs optional fields
  - Default values
  - Custom validators (e.g., `.min()`, `.nonempty()`)
- Example path: `src/pocketbase/schemas/customer-relations/campaigns.ts`

### 3. Query Collection Metadata via schema.json
- Use `jq` to extract collection definition from `scripts/schema.json`
- Collection name format: `<schema>_<table>` in snake_case
- Example: `customer_relations_campaigns`
- Extract from each field definition:
  - Field type (text, number, date, etc.)
  - Required status
  - Max/min constraints
  - Patterns and validation rules

### 4. Analyze Schema-to-Collection Alignment
- Compare Zod schema fields against database collection fields
- Verify:
  - Field names match
  - Types correspond correctly
  - Required status aligns
  - Constraints are compatible

### 5. Register Fields in Mutation Schema
- In each mutation file (create.ts/update.ts), register individual Zod fields
- Use `.register(fieldRegistry, {})` chaining on base schema shape
- Metadata structure:
  ```typescript
  {
    id: "<full-schema-name>-<field>-<mutation>",
    type: "field",
    label: "Display Label",
    description: "Helper text",
    inputType: "one-of-16-types",
    props?: { /* field-specific props */ }
  }
  ```
- ID format example: `customer-relations-campaigns-name-create`

### 6. Handle Optional Fields Correctly
- For optional fields in update mutations, chain `.optional()` **before** `.register()`
- This preserves metadata through the weak map registry
- Pattern:
  ```typescript
  CampaignsSchema.shape.field.optional().register(fieldRegistry, {
    id: "customer-relations-campaigns-field-update",
    type: "field",
    label: "Field Label",
    inputType: "text",
  })
  ```

### 7. Handle Special Field Types

#### Relation Fields
- Include `props` with:
  - `collectionName`: Target collection name
  - `relationshipName`: Relationship identifier
  - `displayField`: Which field to show
  - `renderOption`: Function to render option display
- Example:
  ```typescript
  props: {
    collectionName: Collections.CustomerRelationsOpportunities,
    relationshipName: "opportunity",
    displayField: "name",
    renderOption: (item) => item.name,
  }
  ```

#### Select/Enum Fields
- Auto-generate options from Zod enums or provide explicit options
- Pattern:
  ```typescript
  props: {
    options: [
      { label: "Option 1", value: "value1" },
      { label: "Option 2", value: "value2" },
    ]
  }
  ```

#### Array Fields
- Include `isArray: true`
- Provide `arrayConfig`:
  ```typescript
  arrayConfig: {
    minItems: 0,
    maxItems: null,
    addLabel: "Add item",
    removeLabel: "Remove",
  }
  ```

#### File Fields
- Set `isArray: true` for multiple file uploads
- Use `inputType: "file"`

#### Textarea/Rich Editor Fields
- Use `inputType: "textarea"` for long text
- Use `inputType: "richEditor"` for formatted content

## Key Principles

1. **Registry Behavior** — The `.register()` method uses weak maps to store metadata uniquely per Zod type instance. Each registration is tied to a specific schema field definition.

2. **No Metadata Preservation on Transformations** — Avoid using `.omit()`, `.partial()`, or `.extend()` on registered fields as these create new Zod definitions that lose registry data. Always register the final field definition.

3. **Mutation-Specific IDs** — Use full schema name format: `<schema>-<table>-<field>-<mutation>`. Examples:
   - `customer-relations-campaigns-name-create`
   - `customer-relations-campaigns-budget-update`
   - `transport-management-drivers-name-create`

4. **Optional Field Handling** — Place `.optional()` before `.register()` to maintain metadata integrity for update mutations:
   ```typescript
   CampaignsSchema.shape.field.optional().register(fieldRegistry, {...})
   ```

5. **Auto-Generation Override** — When a field is registered, its metadata overrides `toAutoFormFieldSet` auto-generation, allowing fine-grained control over labels, descriptions, and component behavior.

## Further Considerations

1. **Schema Structure Validation** — Verify all base schemas in `src/pocketbase/schemas/` follow the same pattern and contain all necessary field definitions before registering mutations.

2. **Collection Metadata Mapping** — Ensure the `jq` query correctly retrieves collection definitions from `scripts/schema.json` using snake_case format.

3. **Comprehensive Coverage** — Systematically register fields across:
   - Create mutations (required fields + optional enhancements)
   - Update mutations (all fields as optional)
   - List/Detail views if separate schemas exist

4. **Prop Type Safety** — For special field types (relation, select), ensure props match the expected interface (e.g., `RelationFieldProps<T>`, `SelectFieldProps`).

5. **Consistency Check** — Verify ID naming convention is applied consistently across all schema modules (customer-relations, transport-management, etc.).
