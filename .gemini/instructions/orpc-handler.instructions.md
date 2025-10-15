# ORPC Handler Implementation Guide

This guide details the step-by-step process for implementing an ORPC contract handler using the repository pattern, as demonstrated in the CRM notifications module. Follow these instructions to ensure consistency, maintainability, and best practices across all handler implementations.

---

## 1. Overview

An ORPC handler connects a contract (API operation) to your data layer using repositories. It is responsible for:
- Receiving input and context from the ORPC framework
- Using repositories to perform database operations
- Fetching and joining related entities (e.g., users)
- Returning the result in the expected contract shape

---

## 2. Step-by-Step Implementation

### Step 1: Import Dependencies
- Import the `implement` function from `@orpc/server`.
- Import the relevant repository (e.g., `NotificationRepository`) for the entity.
- Import any related repositories needed for joins (e.g., `UserRepository`, `OpportunityProductRepository` for many-to-many relationships).
- Import the contract(s) from your contracts module.
- Import the ORPC context type and any utility functions (e.g., `nonEmpty`).

```ts
import { implement } from '@orpc/server'
import { NotificationRepository } from '@packages/db/repositories/crm'
import { UserRepository } from '@packages/db/repositories/auth'
import * as contracts from '@/contracts/crm/notifications'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
```

---

### Step 2: Implement the Handler
- Use `implement(contract)` to start the handler definition.
- Use `.$context<ORPCContext>()` to specify the context type.
- Define the `.handler(async ({ context, input }) => { ... })` function.
- Inside the handler:
  - Instantiate the main entity's repository using `Repository.fns(context.kysely)`.
  - Call the appropriate repository method (e.g., `paginate`, `insert`, `update`, etc.) with the input.
  - **Handling Related Entities (One-to-Many and Many-to-Many):**
    -   **One-to-Many Relationships:** If the main entity has a direct foreign key to another entity (e.g., `ownerId` to `User`), collect the IDs and fetch the related entities using their respective repositories (e.g., `UserRepository.any(userIds)`).
    -   **Many-to-Many Relationships (Children Entities):** If there's an intermediary table linking two entities (e.g., `Opportunity` and `Product` linked by `OpportunityProduct`), follow these detailed steps:
        1.  **Instantiate Intermediary Repository:** Create an instance of the intermediary repository (e.g., `OpportunityProductRepository.fns(context.kysely)`).
        2.  **Fetch Intermediary Records:** Use the intermediary repository to fetch the linking records. This often involves a `paginate` or `any` call, filtering by the parent entity's ID(s). For example, to get all `OpportunityProduct` records for a set of opportunities:
            ```typescript
            const opportunityProducts = await opportunityProductRepo.paginate({
              page: 1,
              perPage: Infinity,
              filters: [{ column: 'opportunityId', operator: 'in', value: result.map((row) => row.id) }],
            })
            ```
        3.  **Extract Related Entity IDs:** From the fetched intermediary records, extract the IDs of the target related entities (e.g., `opportunityProducts.map((row) => row.productId)`).
        4.  **Fetch Target Related Entities:** Use the target entity's repository to fetch the actual related entities using the extracted IDs (e.g., `productRepo.any(productIds)`).
  - **Parallel Fetching:** Always fetch all related entities (from both one-to-many and many-to-many relationships) in parallel using `Promise.all` for efficiency.
  - **Join Related Entities:** Join the fetched related entities to the main result.
  - **Return Result in Contract Shape:** Return the result in the contract's expected shape. When mapping many-to-many relationships, ensure type correctness by filtering out any `undefined` values that might result from `Array.prototype.find` operations if a related entity is unexpectedly missing. Use the `nonEmpty` utility for this.

#### Example: Paginate Handler with Many-to-Many
```ts
export const PaginateOpportunity = implement(contracts.PaginateOpportunityContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)
    const opportunityProductRepo = OpportunityProductRepository.fns(context.kysely) // Intermediary repo

    const result = await opportunityRepo.paginate(input)

    // Fetch intermediary records for many-to-many relationship
    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: Infinity,
      filters: [{ column: 'opportunityId', operator: 'in', value: result.map((row) => row.id) }],
    })

    // Extract product IDs from intermediary records
    const productIds = opportunityProducts.map((row) => row.productId).filter(nonEmpty)

    // Fetch all related entities in parallel
    const [owners, products] = await Promise.all([
      userRepo.any(result.map((row) => row.ownerId).filter(nonEmpty)),
      productRepo.any(productIds),
    ])

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((u) => u.id === row.ownerId)!,
      products: opportunityProducts
        .filter((op) => op.opportunityId === row.id) // Filter intermediary records for current opportunity
        .map((op) => products.find((p) => p.id === op.productId)) // Map to actual product
        .filter(nonEmpty), // Crucial: filter out any undefined products
    }))
  })
```

---

### Step 3: Repeat for Other Operations
- Implement handlers for all required contract operations (e.g., `Range`, `Any`, `Insert`, `InsertMany`, `Update`, `Remove`).
- Use the same pattern: repository call, fetch relations, join, return. Ensure that for `Insert` and `Update` operations, you fetch related entities for the *single* `result` object, and for `InsertMany`, `Paginate`, `Range`, `Any`, you fetch for *multiple* `result` objects.

#### Example: Insert Handler with Many-to-Many (Parent Entity)
```ts
export const InsertOpportunity = implement(contracts.InsertOpportunityContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)
    const opportunityProductRepo = OpportunityProductRepository.fns(context.kysely)

    const result = await opportunityRepo.insert(input)

    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: Infinity,
      filters: [{ column: 'opportunityId', operator: 'in', value: [result.id] }],
    })

    const productIds = opportunityProducts.map((row) => row.productId).filter(nonEmpty)

    const [owners, products] = await Promise.all([
      userRepo.any([result.ownerId]).filter(nonEmpty),
      productRepo.any(productIds),
    ])

    return {
      ...result,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((u) => u.id === result.ownerId)!,
      products: opportunityProducts
        .filter((op) => op.opportunityId === result.id)
        .map((op) => products.find((p) => p.id === op.productId))
        .filter(nonEmpty),
    }
  })
```

#### Example: Insert Handler with Many-to-Many (Child Entity)
When inserting a child entity that is part of a many-to-many relationship, the contract's output schema often expects the *parent* entity with its updated relations. In such cases, after inserting the child entity, you must fetch the parent entity and all its associated relations to construct the expected output.

```ts
export const InsertOpportunityProduct = implement(contracts.InsertOpportunityProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)
    const campaignRepo = CampaignRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)
    const opportunityProductRepo = OpportunityProductRepository.fns(context.kysely)

    // 1. Insert the child entity (OpportunityProduct)
    const opportunityProduct = await opportunityProductRepo.insert(input)

    // 2. Fetch the parent entity (Opportunity) using the ID from the inserted child
    const result = await opportunityRepo.find(opportunityProduct.opportunityId)

    // 3. Fetch all related child entities for the parent (all OpportunityProducts for this Opportunity)
    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: Infinity,
      filters: [{ column: 'opportunityId', operator: 'in', value: [result.id] }],
    })

    // 4. Extract IDs for other related entities (e.g., products associated with these OpportunityProducts)
    const productIds = opportunityProducts.map((row) => row.productId).filter(nonEmpty)

    // 5. Fetch all related entities in parallel
    const [owners, campaigns, companies, contacts, products] = await Promise.all([
      userRepo.any([result.ownerId]),
      campaignRepo.any([result.campaignId].filter(nonEmpty)),
      companyRepo.any([result.companyId].filter(nonEmpty)),
      contactRepo.any([result.contactId].filter(nonEmpty)),
      productRepo.any(productIds),
    ])

    // 6. Construct and return the parent entity with all its relations in the contract's expected shape
    return {
      ...result,
      owner: owners.find((row) => row.id === result.ownerId)!,
      campaign: campaigns.find((row) => row.id === result.campaignId),
      company: companies.find((row) => row.id === result.companyId),
      contact: contacts.find((row) => row.id === result.contactId),
      products: opportunityProducts
        .filter((subRow) => subRow.opportunityId === result.id)
        .map((subRow) => products.find((pSubRow) => pSubRow.id === subRow.productId)!)
        .filter(nonEmpty),
    }
  })
```

#### Example: Update Handler with Many-to-Many (Child Entity)
Similar to insert operations, when updating a child entity, the contract often expects the updated parent entity with all its relations. After updating the child, refetch the parent and its relations.

```ts
export const UpdateOpportunityProduct = implement(contracts.UpdateOpportunityProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)
    const campaignRepo = CampaignRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)
    const opportunityProductRepo = OpportunityProductRepository.fns(context.kysely)

    // 1. Update the child entity (OpportunityProduct)
    const opportunityProduct = await opportunityProductRepo.update(input.id, input.value)

    // 2. Fetch the parent entity (Opportunity) using the ID from the updated child
    const result = await opportunityRepo.find(opportunityProduct.opportunityId)

    // 3. Fetch all related child entities for the parent (all OpportunityProducts for this Opportunity)
    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: Infinity,
      filters: [{ column: 'opportunityId', operator: 'in', value: [result.id] }],
    })

    // 4. Extract IDs for other related entities
    const productIds = opportunityProducts.map((row) => row.productId).filter(nonEmpty)

    // 5. Fetch all related entities in parallel
    const [owners, campaigns, companies, contacts, products] = await Promise.all([
      userRepo.any([result.ownerId]),
      campaignRepo.any([result.campaignId].filter(nonEmpty)),
      companyRepo.any([result.companyId].filter(nonEmpty)),
      contactRepo.any([result.contactId].filter(nonEmpty)),
      productRepo.any(productIds),
    ])

    // 6. Construct and return the parent entity with all its relations
    return {
      ...result,
      owner: owners.find((row) => row.id === result.ownerId)!,
      campaign: campaigns.find((row) => row.id === result.campaignId),
      company: companies.find((row) => row.id === result.companyId),
      contact: contacts.find((row) => row.id === result.contactId),
      products: opportunityProducts
        .filter((subRow) => subRow.opportunityId === result.id)
        .map((subRow) => products.find((pSubRow) => pSubRow.id === subRow.productId)!)
        .filter(nonEmpty),
    }
  })
```

#### Example: Remove Handler with Many-to-Many (Child Entity)
When removing a child entity, if the contract's output schema expects the *parent* entity, you must fetch the parent entity and all its associated relations *after* the removal to reflect the updated state.

```ts
export const RemoveOpportunityProduct = implement(contracts.RemoveOpportunityProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely)
    const userRepo = UserRepository.fns(context.kysely)
    const campaignRepo = CampaignRepository.fns(context.kysely)
    const companyRepo = CompanyRepository.fns(context.kysely)
    const contactRepo = ContactRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)
    const opportunityProductRepo = OpportunityProductRepository.fns(context.kysely)

    // 1. Remove the child entity (OpportunityProduct)
    const removedOpportunityProduct = await opportunityProductRepo.remove(input)

    // 2. Fetch the parent entity (Opportunity) using the ID from the removed child
    //    Note: The removedOpportunityProduct still contains the opportunityId before deletion.
    const result = await opportunityRepo.find(removedOpportunityProduct.opportunityId)

    // 3. If the parent entity no longer exists (e.g., if it was the last child and the parent was also removed),
    //    handle this case appropriately, perhaps by returning null or an empty object if the contract allows.
    if (!result) {
      // Depending on contract, return null, throw error, or return a default structure
      return null as any // Placeholder, adjust based on actual contract output for non-existent parent
    }

    // 4. Fetch all related child entities for the parent (all remaining OpportunityProducts for this Opportunity)
    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: Infinity,
      filters: [{ column: 'opportunityId', operator: 'in', value: [result.id] }],
    })

    // 5. Extract IDs for other related entities
    const productIds = opportunityProducts.map((row) => row.productId).filter(nonEmpty)

    // 6. Fetch all related entities in parallel
    const [owners, campaigns, companies, contacts, products] = await Promise.all([
      userRepo.any([result.ownerId]),
      campaignRepo.any([result.campaignId].filter(nonEmpty)),
      companyRepo.any([result.companyId].filter(nonEmpty)),
      contactRepo.any([result.contactId].filter(nonEmpty)),
      productRepo.any(productIds),
    ])

    // 7. Construct and return the parent entity with its updated relations
    return {
      ...result,
      owner: owners.find((row) => row.id === result.ownerId)!,
      campaign: campaigns.find((row) => row.id === result.campaignId),
      company: companies.find((row) => row.id === result.companyId),
      contact: contacts.find((row) => row.id === result.contactId),
      products: opportunityProducts
        .filter((subRow) => subRow.opportunityId === result.id)
        .map((subRow) => products.find((pSubRow) => pSubRow.id === subRow.productId)!)
        .filter(nonEmpty),
    }
  })
```

---

### Step 4: Organize and Export
- Place all imports at the top of the file.
- Group all handler exports together, ordered logically (Paginate, Range, Any, Insert, InsertMany, Update, Remove).
- Avoid duplicate exports and keep the file clean.

---

## 3. Best Practices
- Always use the repository pattern for data access.
- Fetch related entities in parallel using `Promise.all` or batched repository methods.
- Use utility functions (e.g., `nonEmpty`) to filter out invalid IDs and `undefined` results from `Array.prototype.find` to ensure type correctness.
- Use non-null assertions (`!`) only if the contract guarantees the relation exists; otherwise, handle missing relations gracefully.
- Keep handler files organized and consistent across modules.

---

## 4. Troubleshooting
- If you see lint errors for non-null assertions, consider handling missing relations explicitly or update the contract to guarantee existence.
- Ensure all repository methods are properly typed and return the expected data shape.
- Test each handler for edge cases (e.g., missing users, empty results, no related children).

---

## 5. Example File Structure
```ts
// Imports
import { implement } from '@orpc/server'
import { NotificationRepository, OpportunityProductRepository } from '@packages/db/repositories/crm'
import { UserRepository } from '@packages/db/repositories/auth'
import * as contracts from '@/contracts/crm/notifications'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'

// Handlers
export const PaginateNotification = ...
export const RangeNotification = ...
export const AnyNotification = ...
export const InsertNotification = ...
export const InsertManyNotification = ...
export const UpdateNotification = ...
export const RemoveNotification = ...
```

---

## 6. Summary Checklist
- [ ] Import all required modules and types, including intermediary repositories for many-to-many relationships.
- [ ] Implement each handler using the repository pattern.
- [ ] Fetch and join related entities as needed, including handling many-to-many relationships by fetching intermediary records, extracting IDs, and then fetching target entities.
- [ ] Return results in the contract's expected shape, ensuring type correctness by filtering out `undefined` values from mapped relations.
- [ ] Organize and export all handlers cleanly.
- [ ] Test for correctness and edge cases.

---

By following this guide, you can quickly and consistently implement new ORPC contract handlers using the repository pattern in your project.