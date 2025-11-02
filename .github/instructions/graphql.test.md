# GraphQL Client Testing Guide

This guide provides step-by-step instructions on how to create and test GraphQL client queries using table-driven testing in this project.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Step 1: Define GraphQL Operations](#step-1-define-graphql-operations)
5. [Step 2: Create Type-Safe Test Cases](#step-2-create-type-safe-test-cases)
6. [Step 3: Implement Table-Driven Tests](#step-3-implement-table-driven-tests)
7. [Step 4: Handle Success and Error Cases](#step-4-handle-success-and-error-cases)
8. [Step 5: Validate Responses with Proper Typing](#step-5-validate-responses-with-proper-typing)
9. [Advanced Patterns](#advanced-patterns)
10. [Running Tests](#running-tests)

---

## Overview

Table-driven testing is a powerful pattern where you define a collection of test cases with inputs and expected outputs, then iterate through them in a single test function. This approach provides:

- **Maintainability**: Easy to add new test cases
- **Consistency**: All cases follow the same validation logic
- **Readability**: Clear structure for understanding test scenarios
- **Type Safety**: Full TypeScript support with proper type extensions
- **Reusability**: Share common test patterns across different queries

---

## Prerequisites

- TypeScript knowledge
- Familiarity with GraphQL queries and mutations
- Basic understanding of Bun test framework
- Knowledge of type extensions using TypeScript `&` operator

---

## Project Structure

```
packages/graphql/
├── src/
│   ├── client/
│   │   ├── generated/          # Auto-generated GraphQL types
│   │   │   └── graphql.ts
│   │   └── index.ts            # Exported queries and mutations
│   └── schema/                 # GraphQL schema definitions
├── tests/
│   ├── client/
│   │   ├── crm/
│   │   │   ├── products.test.ts
│   │   │   └── [other tests]
│   │   └── [other domains]
│   ├── inputs/
│   │   └── helpers.ts          # Test utilities and types
│   ├── setup.ts                # Test configuration
│   ├── helpers.ts              # GraphQL executor
│   └── [other test files]
```

---

## Step 1: Define GraphQL Operations

First, ensure your GraphQL operations are properly defined and exported.

### 1.1 Create Query/Mutation Definition

GraphQL operations should be in `src/client/index.ts` or a dedicated file:

```typescript
import { gql } from 'graphql-tag';

export const MyQuery = gql`
  query GetMyData($id: ID!) {
    data {
      id
      name
      description
    }
  }
`;

export const MyMutation = gql`
  mutation CreateData($input: CreateDataInput!) {
    create {
      id
      name
    }
  }
`;
```

### 1.2 Verify Auto-Generated Types

After running `bun run build` in the graphql package, verify types are generated:

```typescript
// Auto-generated types should be available
import type {
  GetMyDataQuery,
  GetMyDataQueryVariables,
  CreateDataMutation,
  CreateDataMutationVariables,
} from '../../../src/client/generated/graphql';
```

---

## Step 2: Create Type-Safe Test Cases

Define type-safe test case extensions using the base `GraphQLTestCase` type.

### 2.1 Understand the Base Type

The `GraphQLTestCase` is the foundation for all test cases:

```typescript
export interface GraphQLTestCase<TVariables, TData> {
  name: string;
  variables: TVariables;
  success: boolean;
  expectedData?: TData;
  expectedError?: {
    messagePattern: string | RegExp;
  };
}
```

- **`TVariables`**: The GraphQL operation variables type
- **`TData`**: The GraphQL operation response data type

### 2.2 Extend for Query/Mutation-Specific Needs

Extend the base type using TypeScript's `&` operator:

```typescript
// For simple queries without additional context
type SimpleQueryTestCase = GraphQLTestCase<
  MyQueryVariables,
  MyQueryType
>;

// For mutations that require pre-existing data
type MutationTestCase = GraphQLTestCase<
  MyMutationVariables,
  MyMutationType
> & {
  setupData?: Record<string, any>;
  validate?: (response: MyMutationType) => void;
};

// For queries with complex setup
type ComplexQueryTestCase = GraphQLTestCase<
  MyQueryVariables,
  MyQueryType
> & {
  validate: (response: MyQueryType) => void;
};
```

### 2.3 Best Practices for Type Extensions

**DO:**
- Use the second generic parameter for validation function typing
- Extend with required context properties
- Keep extensions focused and minimal

**DON'T:**
- Use `any` in validate functions
- Create overly complex type hierarchies
- Mix different test patterns in one type

---

## Step 3: Implement Table-Driven Tests

Structure your test file with proper organization and setup.

### 3.1 Test File Structure

```typescript
import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
  MyQuery,
  MyQueryVariables,
} from "../../../src/client/generated/graphql";
import { MyQuery } from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type MyTestCase = GraphQLTestCase<
  MyQueryVariables,
  MyQuery
> & {
  validate?: (response: MyQuery) => void;
};

// ============================================
// Helper Functions
// ============================================

const generateUniqueSku = () =>
  `sku-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// ============================================
// Test Suite
// ============================================

describe("My GraphQL Query", () => {
  let executor: ReturnType<typeof graphQLQueryExecutor>;

  beforeAll(() => {
    executor = graphQLQueryExecutor({ enableJWT: false });
  });

  const cases: MyTestCase[] = [
    // Test cases here
  ];

  it.each(cases)("$name", async (testCase) => {
    // Test execution here
  });
});
```

### 3.2 Organization Tips

**Keep organized with sections:**
- Type definitions at the top
- Helper functions
- Main test describe block
- Nested describe blocks for related functionality

**Use comments for clarity:**
```typescript
// ============================================
// Type Definitions
// ============================================

// ============================================
// Helper Functions
// ============================================

// ============================================
// Test Suite: [Feature Name]
// ============================================
```

---

## Step 4: Handle Success and Error Cases

Define test cases covering both success and failure scenarios.

### 4.1 Success Cases

Success cases verify happy path behavior:

```typescript
const cases: MyTestCase[] = [
  {
    name: "should create a resource with valid data",
    variables: {
      input: {
        name: "Test Item",
        description: "Test Description",
      },
    },
    success: true,
    validate: (response: MyMutationType) => {
      expect(response.create?.id).toBeDefined();
      expect(response.create?.name).toBe("Test Item");
    },
  },
  {
    name: "should fetch all items",
    variables: {},
    success: true,
    validate: (response: MyQueryType) => {
      expect(Array.isArray(response.items)).toBe(true);
      expect(response.items!.length).toBeGreaterThan(0);
    },
  },
];
```

### 4.2 Error Cases

Error cases verify validation and error handling:

```typescript
const cases: MyTestCase[] = [
  {
    name: "should reject with missing required field",
    variables: {
      input: {
        description: "No name provided",
      } as unknown as CreateInput,
    },
    success: false,
    expectedError: {
      messagePattern: /name|required/i,
    },
  },
  {
    name: "should reject with invalid input",
    variables: {
      input: {
        name: "",
        description: "Empty name",
      },
    },
    success: false,
    expectedError: {
      messagePattern: /empty|too_small/i,
    },
  },
];
```

### 4.3 Edge Cases

Always include edge cases:

```typescript
const cases: MyTestCase[] = [
  {
    name: "should handle empty results gracefully",
    variables: {
      search: "NonexistentItem12345",
    },
    success: true,
    validate: (response: MyQueryType) => {
      expect(Array.isArray(response.items)).toBe(true);
      expect(response.items!.length).toBe(0);
    },
  },
  {
    name: "should handle maximum pagination",
    variables: {
      page: 999999,
      perPage: 1000,
    },
    success: true,
    validate: (response: MyQueryType) => {
      expect(response.items).toBeDefined();
    },
  },
];
```

---

## Step 5: Validate Responses with Proper Typing

Use the generic types to validate responses without `any`.

### 5.1 Direct Property Access

Access response properties using the typed response parameter:

```typescript
validate: (response: MyQueryType) => {
  // Property access is type-safe
  expect(response.data?.items).toBeDefined();
  expect(Array.isArray(response.data?.items)).toBe(true);
  
  // TypeScript knows the exact shape
  if (response.data?.items && response.data.items.length > 0) {
    const firstItem = response.data.items[0];
    expect(firstItem.id).toBeDefined();
    expect(firstItem.name).toBeDefined();
  }
};
```

### 5.2 Using toMatchObject for Partial Validation

Compare expected properties without specifying every field:

```typescript
{
  name: "should return product with expected fields",
  variables: { id: productId },
  success: true,
  validate: (response: MyQueryType) => {
    expect(response.product).toMatchObject({
      name: "Expected Name",
      price: 1000,
      type: ProductType.Digital,
    });
  },
}
```

### 5.3 Array Validation

Validate array contents with type safety:

```typescript
{
  name: "should filter items by type",
  variables: { type: "Good" },
  success: true,
  validate: (response: MyQueryType) => {
    expect(Array.isArray(response.items)).toBe(true);
    
    // All items match the filter
    const allMatch = response.items!.every(
      (item: any) => item.type === "Good"
    );
    expect(allMatch).toBe(true);
  },
}
```

### 5.4 Response Structure Validation

Verify the complete response structure:

```typescript
{
  name: "should return correct response structure",
  variables: {},
  success: true,
  validate: (response: MyQueryType) => {
    expect(response).toHaveProperty("data");
    if (response.data && response.data.items?.length > 0) {
      const item = response.data.items[0];
      
      // Check all expected properties
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("createdAt");
      expect(item).toHaveProperty("updatedAt");
    }
  },
}
```

---

## Advanced Patterns

### 6.1 Test Case with Data Setup

For tests requiring pre-existing data:

```typescript
type SetupTestCase = GraphQLTestCase<
  MyMutationVariables,
  MyMutationType
> & {
  createData: CreateInput;
  updateData: UpdateInput;
  validate?: (response: MyMutationType, created: any) => void;
};

describe("Update Operations", () => {
  const cases: SetupTestCase[] = [
    {
      name: "should update item with new data",
      createData: {
        name: "Original Name",
        price: 500,
      },
      updateData: {
        name: "Updated Name",
        price: 1500,
      },
      variables: {} as MyMutationVariables, // Filled in test
      success: true,
      validate: (response: MyMutationType, created: any) => {
        expect(response.update?.name).toBe("Updated Name");
        expect(response.update?.price).toBe(1500);
      },
    },
  ];

  it.each(cases)("$name", async (testCase) => {
    // Create initial data
    const createResponse = await executor(CreateMutation, {
      input: testCase.createData,
    });
    const itemId = createResponse.data?.create?.id;

    // Prepare actual variables
    const actualVariables: MyMutationVariables = {
      id: itemId,
      input: testCase.updateData,
    };

    // Execute mutation
    const response = await executor(UpdateMutation, actualVariables);

    // Validate
    if (testCase.success) {
      expect(response.errors).toBeUndefined();
      if (testCase.validate) {
        testCase.validate(response.data as MyMutationType, createResponse.data?.create);
      }
    }
  });
});
```

### 6.2 Conditional Setup Based on Test Case

```typescript
type ConditionalSetupTestCase = GraphQLTestCase<
  MyMutationVariables,
  MyMutationType
> & {
  shouldCreateData: boolean;
  dataToCreate?: CreateInput;
  validate?: (response: MyMutationType) => void;
};

it.each(cases)("$name", async (testCase) => {
  let itemId: string;

  // Conditional setup
  if (testCase.shouldCreateData && testCase.dataToCreate) {
    const setupResponse = await executor(CreateMutation, {
      input: testCase.dataToCreate,
    });
    itemId = setupResponse.data?.create?.id!;
  } else {
    itemId = "00000000-0000-0000-0000-000000000000";
  }

  // Execute main operation
  const response = await executor(DeleteMutation, { id: itemId });

  // Validate
  if (testCase.success) {
    expect(response.errors).toBeUndefined();
  } else {
    expect(response.errors).toBeDefined();
  }

  if (testCase.validate) {
    testCase.validate(response.data as MyMutationType);
  }
});
```

### 6.3 Multiple Related Test Cases

For testing different features of the same query:

```typescript
// Group related test cases
describe("Product Search Query", () => {
  beforeAll(async () => {
    // Setup test data once
  });

  // Basic search functionality
  const searchCases: SearchTestCase[] = [
    { name: "should find exact match", ... },
    { name: "should find partial match", ... },
    { name: "should handle no results", ... },
  ];

  // Pagination functionality
  const paginationCases: PaginationTestCase[] = [
    { name: "should paginate results", ... },
    { name: "should handle empty page", ... },
  ];

  // Filtering functionality
  const filterCases: FilterTestCase[] = [
    { name: "should filter by type", ... },
    { name: "should apply multiple filters", ... },
  ];

  describe("Search Functionality", () => {
    it.each(searchCases)("$name", async (testCase) => { ... });
  });

  describe("Pagination", () => {
    it.each(paginationCases)("$name", async (testCase) => { ... });
  });

  describe("Filtering", () => {
    it.each(filterCases)("$name", async (testCase) => { ... });
  });
});
```

---

## Running Tests

### Run All GraphQL Tests

```bash
cd packages/graphql
bun test tests/client/crm/products.test.ts
```

### Run Specific Test Suite

```bash
# Run only Create Product tests
bun test tests/client/crm/products.test.ts --test-name-pattern "Create Product"

# Run only error cases
bun test tests/client/crm/products.test.ts --test-name-pattern "should reject"
```

### Run with Watch Mode

```bash
bun test --watch tests/client/crm/products.test.ts
```

### Run with Coverage

```bash
bun test --coverage tests/client/crm/products.test.ts
```

---

## Complete Example: Products Test Suite

Here's a complete example following all the principles:

```typescript
import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
  CreateProductMutation as CreateProductMutationType,
  CreateProductMutationVariables,
  TableProductQuery as TableProductQueryType,
  TableProductQueryVariables,
} from "../../../src/client/generated/graphql";
import {
  CreateProductMutation,
  TableProductQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateProductTestCase = GraphQLTestCase<
  CreateProductMutationVariables,
  CreateProductMutationType
>;

type TableProductTestCase = GraphQLTestCase<
  TableProductQueryVariables,
  TableProductQueryType
> & {
  validate: (response: TableProductQueryType) => void;
};

// ============================================
// Test Suite
// ============================================

describe("Graphql CRM Create Product", () => {
  let executor: ReturnType<typeof graphQLQueryExecutor>;

  beforeAll(() => {
    executor = graphQLQueryExecutor({ enableJWT: false });
  });

  const cases: CreateProductTestCase[] = [
    {
      name: "should create a new product with valid data",
      variables: {
        product: {
          name: "Test Product",
          price: 1000,
          description: "Test Description",
          sku: `sku-${Date.now()}`,
          type: "Digital",
        },
      },
      success: true,
      expectedData: {
        crm: {
          createProduct: {
            name: "Test Product",
            price: 1000,
          } as any,
        },
      },
    },
    {
      name: "should reject product with missing name",
      variables: {
        product: {
          price: 1000,
          description: "No name",
          sku: `sku-${Date.now()}`,
          type: "Digital",
        } as unknown as any,
      },
      success: false,
      expectedError: {
        messagePattern: /name|required/i,
      },
    },
  ];

  it.each(cases)("$name", async (testCase) => {
    const response = await executor(CreateProductMutation, testCase.variables);

    if (testCase.success) {
      expect(response.errors).toBeUndefined();
      expect(response.data?.crm?.createProduct).toBeDefined();
      
      if (testCase.expectedData?.crm?.createProduct) {
        expect(response.data!.crm!.createProduct!).toMatchObject(
          testCase.expectedData.crm.createProduct
        );
      }
    } else {
      expect(response.errors).toBeDefined();
      if (testCase.expectedError) {
        const message = response.errors?.[0]?.message || "";
        expect(message).toMatch(testCase.expectedError.messagePattern);
      }
    }
  });
});

describe("Graphql CRM Table Product Query", () => {
  let executor: ReturnType<typeof graphQLQueryExecutor>;

  beforeAll(() => {
    executor = graphQLQueryExecutor({ enableJWT: false });
  });

  const cases: TableProductTestCase[] = [
    {
      name: "should fetch all products",
      variables: {},
      success: true,
      validate: (response: TableProductQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);
      },
    },
    {
      name: "should fetch with pagination",
      variables: {
        page: 1,
        perPage: 10,
      },
      success: true,
      validate: (response: TableProductQueryType) => {
        expect(response.crm?.products?.length).toBeLessThanOrEqual(10);
      },
    },
  ];

  it.each(cases)("$name", async (testCase) => {
    const response = await executor(TableProductQuery, testCase.variables);
    testCase.validate(response.data as TableProductQueryType);
  });
});
```

---

## Common Pitfalls and Solutions

| Pitfall | Solution |
|---------|----------|
| Using `any` in validators | Use the generic type parameter: `(response: MyQueryType) => void` |
| Mixing test concerns | Keep each test case focused on one behavior |
| Hardcoding IDs | Use generated/unique identifiers in setup |
| Not testing errors | Include both success and error cases |
| Unclear test names | Use descriptive names: "should reject with missing X" |
| Duplicating setup logic | Extract to helper functions or beforeAll |
| Not validating structure | Check response shape in at least one test case |
| Ignoring edge cases | Always include boundary and error conditions |

---

## Resources

- [Bun Test Documentation](https://bun.sh/docs/test/overview)
- [GraphQL Best Practices](https://graphql.org/learn/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library Best Practices](https://testing-library.com/docs/)
