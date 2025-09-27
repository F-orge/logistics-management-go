# GraphQL Client Operations Implementation Instructions

This document provides detailed instructions for implementing GraphQL client-side operations (queries and mutations) using the codegen pattern established in this project.

## Overview

The project uses a structured approach for creating GraphQL operations on the client-side, with each entity having its own dedicated files that export properly typed GraphQL operations. Operations are separated into queries and mutations, with each entity having dedicated files for both types of operations.

## File Structure

### Mutations
All client-side GraphQL mutations should be organized under:
```
src/graphql/mutations/[module]/[entity].ts
```

### Queries
All client-side GraphQL queries should be organized under:
```
src/graphql/queries/[module]/[entity].ts
```

For CRM entities, this translates to:
```
src/graphql/mutations/crm/
├── campaigns.ts
├── cases.ts
├── companies.ts
├── contacts.ts
├── interactions.ts
├── invoices.ts
├── leads.ts
├── notifications.ts
├── opportunities.ts
├── products.ts
└── tags.ts

src/graphql/queries/crm/
├── attachments.ts
├── campaigns.ts
├── cases.ts
├── companies.ts
├── contacts.ts
├── interactions.ts
├── invoices.ts
├── leads.ts
├── notifications.ts
├── opportunities.ts
├── products.ts
└── tags.ts
```

## Implementation Patterns

# Mutations

## 1. Mutation File Template

Each mutation file should follow this exact structure:

```typescript
import { graphql } from "@/lib/graphql/client";

export const create[Entity] = graphql(`
  mutation Create[Entity]($payload: Create[Entity]Input!) {
    [module] {
      create[Entity](payload: $payload) {
        id
        [field1]
        [field2]
        ...
        createdAt
        updatedAt
        [relationship] {
          id
          name
        }
      }
    }
  }
`);

export const update[Entity][Field] = graphql(`
  mutation Update[Entity][Field]($id: UUID!, $[field]: [FieldType]!) {
    [module] {
      update[Entity][Field](id: $id, [field]: $[field]) {
        id
        [field1]
        [field2]
        ...
        createdAt
        updatedAt
        [relationship] {
          id
          name
        }
      }
    }
  }
`);

export const remove[Entity] = graphql(`
  mutation Remove[Entity]($id: UUID!) {
    [module] {
      remove[Entity](id: $id)
    }
  }
`);
```

### 2. Key Principles (Mutations)

1. **Import Statement**: Always use `import { graphql } from "@/lib/graphql/client";`
2. **Consistent Field Selection**: Mutations should return the same fields as their corresponding queries for consistency
3. **Exact Schema Matching**: Mutation names and parameters must exactly match the GraphQL schema
4. **Consistent Naming**: Use PascalCase for mutation names, camelCase for variables
5. **Required vs Optional**: Match parameter nullability exactly as defined in the schema

**Why Return Full Fields in Mutations?**
- Avoids the need for a separate query after mutation to get updated data
- Provides immediate access to the updated entity state
- Ensures UI can update optimistically or refresh with latest server data
- Maintains consistency between query and mutation responses

# Queries

## 1. Query File Template

Each query file should follow this exact structure:

```typescript
import { graphql } from "@/lib/graphql/client";

export const get[Entity] = graphql(`
  query Get[Entity]($id: UUID!) {
    [module] {
      [entity](id: $id) {
        id
        [field1]
        [field2]
        ...
        createdAt
        updatedAt
        [relationship] {
          id
          name
        }
      }
    }
  }
`);

export const get[Entities] = graphql(`
  query Get[Entities]($limit: Int!, $page: Int!) {
    [module] {
      [entities](limit: $limit, page: $page) {
        id
        [field1]
        [field2]
        ...
        createdAt
        updatedAt
        [relationship] {
          id
          name
        }
      }
    }
  }
`);
```

### 2. Key Principles (Queries)

### 2. Key Principles (Queries)

1. **Import Statement**: Always use `import { graphql } from "@/lib/graphql/client";`
2. **Complete Field Selection**: Select all relevant fields for the entity, including relationships
3. **Consistent Naming**: Use camelCase for query names (e.g., `getContact`, `getContacts`)
4. **Relationship Loading**: Include essential relationship fields like `id` and `name` for referenced entities
5. **Pagination Parameters**: All list queries should accept `limit: Int!` and `page: Int!` parameters

### 3. Query Categories

For each entity, implement queries in this order:

#### Single Entity Queries
```typescript
export const get[Entity] = graphql(`
  query Get[Entity]($id: UUID!) {
    [module] {
      [entity](id: $id) {
        // All scalar fields
        id
        [field1]
        [field2]
        createdAt
        updatedAt
        // Relationships with minimal fields
        [relationship] {
          id
          name
        }
      }
    }
  }
`);
```

#### List Entity Queries
```typescript
export const get[Entities] = graphql(`
  query Get[Entities]($limit: Int!, $page: Int!) {
    [module] {
      [entities](limit: $limit, page: $page) {
        // Same fields as single entity query
        id
        [field1]
        [field2]
        createdAt
        updatedAt
        [relationship] {
          id
          name
        }
      }
    }
  }
`);
```

### 4. Field Selection Guidelines

1. **Always Include**: `id`, `createdAt`, `updatedAt`
2. **Scalar Fields**: Include all relevant scalar fields (strings, numbers, booleans, enums)
3. **Relationships**: Include only essential fields (`id`, `name`) to avoid over-fetching
4. **Nested Collections**: Use pagination for nested collections (e.g., `items(limit: 10, page: 1)`)

## Implementation Workflow (Mutations)

### Step 1: Schema Discovery
Before implementing, run `just introspect` to understand the current GraphQL schema and available mutations.

### Step 2: Entity-by-Entity Implementation
1. Create one file per entity
2. Implement all mutations for that entity
3. Run `just introspect` to validate type generation
4. Fix any type errors before proceeding to the next entity

### Step 3: Validation Process
After creating each mutation file:
1. The TypeScript compiler will show errors if mutations don't match the schema
2. Run `just introspect` to regenerate types and validate the mutations
3. Only proceed to the next entity when all errors are resolved

## Common Patterns

### 1. Required vs Optional Parameters
Pay attention to schema nullability:
```typescript
// Required field
$name: String!

// Optional field  
$phoneNumber: String
```

### 2. Enum Types
Use exact enum names from the schema:
```typescript
$status: CaseStatus
$priority: CasePriority
```

### 3. Special Field Types
- Use `UUID!` for ID fields
- Use `Decimal` for monetary amounts
- Use `DateTime` for timestamps
- Use `NaiveDate` for dates without time
- Use `Float` for decimal numbers

### 4. Relationship Fields
For foreign key relationships:
```typescript
$companyId: UUID
$ownerId: UUID!
```

## Error Handling

### Type Mismatches
If you see errors like:
```
No overload matches this call
```
This indicates the mutation doesn't match the schema. Check:
1. Mutation name spelling
2. Parameter names and types
3. Field nullability (required vs optional)

### Missing Mutations
If a mutation doesn't exist in the schema, it cannot be implemented on the client side. The backend GraphQL schema must be updated first.

## Special Cases

### Invoice Items
Invoice items are managed through the Invoice entity:
- `addInvoiceItem(id: UUID!, payload: CreateInvoiceItemInput!): CrmInvoices!`
- `removeInvoiceItem(itemId: UUID!): CrmInvoices!`

No separate InvoiceItems mutation file is needed.

### File Uploads
For entities with file upload capabilities:
```typescript
export const uploadAttachment = graphql(`
  mutation UploadAttachment($file: Upload!, $recordId: UUID!, $recordType: RecordType!) {
    crm {
      uploadAttachment(file: $file, recordId: $recordId, recordType: $recordType) {
        id
        fileName
        filePath
        mimeType
        recordId
        recordType
        createdAt
        updatedAt
      }
    }
  }
`);
```

## Validation Commands

### Type Generation and Validation
```bash
just introspect
```
This command:
1. Compiles the Rust GraphQL services
2. Generates the GraphQL schema
3. Validates client-side GraphQL documents
4. Updates TypeScript types
5. Reports any schema mismatches

### Error Checking
```bash
# Check for TypeScript errors
npm run type-check

# Check for lint errors
npm run lint
```

## Example Implementation

Here's a complete example for the CRM Contacts entity:

### Mutations (src/graphql/mutations/crm/contacts.ts)

```typescript
import { graphql } from "@/lib/graphql/client";

export const createContact = graphql(`
  mutation CreateContact($payload: CreateContactInput!) {
    crm {
      createContact(payload: $payload) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactName = graphql(`
  mutation UpdateContactName($id: UUID!, $name: String!) {
    crm {
      updateContactName(id: $id, name: $name) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactEmail = graphql(`
  mutation UpdateContactEmail($id: UUID!, $email: String!) {
    crm {
      updateContactEmail(id: $id, email: $email) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactPhoneNumber = graphql(`
  mutation UpdateContactPhoneNumber($id: UUID!, $phoneNumber: String) {
    crm {
      updateContactPhoneNumber(id: $id, phoneNumber: $phoneNumber) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactJobTitle = graphql(`
  mutation UpdateContactJobTitle($id: UUID!, $jobTitle: String) {
    crm {
      updateContactJobTitle(id: $id, jobTitle: $jobTitle) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactCompanyId = graphql(`
  mutation UpdateContactCompanyId($id: UUID!, $companyId: UUID) {
    crm {
      updateContactCompanyId(id: $id, companyId: $companyId) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactOwnerId = graphql(`
  mutation UpdateContactOwnerId($id: UUID!, $ownerId: UUID!) {
    crm {
      updateContactOwnerId(id: $id, ownerId: $ownerId) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const removeContact = graphql(`
  mutation RemoveContact($id: UUID!) {
    crm {
      removeContact(id: $id)
    }
  }
`);
```

### Queries (src/graphql/queries/crm/contacts.ts)

```typescript
import { graphql } from "@/lib/graphql/client";

export const getContact = graphql(`
  query GetContact($id: UUID!) {
    crm {
      contact(id: $id) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const getContacts = graphql(`
  query GetContacts($limit: Int!, $page: Int!) {
    crm {
      contacts(limit: $limit, page: $page) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);
```

## Best Practices

1. **Incremental Implementation**: Implement one entity at a time and validate before moving to the next
2. **Schema First**: Always check the GraphQL schema before implementing operations
3. **Type Safety**: Let TypeScript guide you - if there are type errors, the schema doesn't match
4. **Consistent Validation**: Run `just introspect` after each entity implementation
5. **Documentation**: Keep operation files focused and well-organized by entity
6. **Field Selection**: For queries, select all necessary fields but avoid over-fetching
7. **Relationship Loading**: Include essential relationship fields in queries for UI needs

## Troubleshooting

### Common Issues

1. **Operation not found**: The backend doesn't expose this query/mutation
2. **Type mismatch**: Parameter types don't match the schema
3. **Nullability error**: Required/optional parameters are incorrect
4. **Import error**: Wrong import path for the graphql function
5. **Over-fetching**: Selecting too many fields in queries, causing performance issues

### Resolution Steps

1. Run `just introspect` to see current schema
2. Compare your operation with the schema output
3. Fix parameter names, types, and nullability
4. Re-run `just introspect` to validate
5. Repeat until all errors are resolved

This systematic approach ensures type-safe, schema-compliant GraphQL client operations that integrate seamlessly with the rest of the application.