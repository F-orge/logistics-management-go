import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
  CreateProductMutation as CreateProductMutationType,
  CreateProductMutationVariables,
  UpdateProductMutation as UpdateProductMutationType,
  UpdateProductMutationVariables,
  RemoveProductMutation as RemoveProductMutationType,
  RemoveProductMutationVariables,
  TableProductQuery as TableProductQueryType,
  TableProductQueryVariables,
  SearchProductsQuery as SearchProductsQueryType,
  SearchProductsQueryVariables,
  AnalyticsProductsQuery as AnalyticsProductsQueryType,
  AnalyticsProductsQueryVariables,
} from "../../../src/client/generated/graphql";
import {
  ProductType,
  type CreateProductInput,
  type UpdateProductInput,
} from "../../../src/client/generated/graphql";
import {
  CreateProductMutation,
  UpdateProductMutation,
  RemoveProductMutation,
  TableProductQuery,
  SearchProductsQuery,
  AnalyticsProductsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

const generateUniqueSku = () =>
  `sku-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Type extensions for specific test case requirements
type CreateProductTestCase = GraphQLTestCase<
  CreateProductMutationVariables,
  CreateProductMutationType
>;

type UpdateProductTestCase = GraphQLTestCase<
  UpdateProductMutationVariables,
  UpdateProductMutationType
> & {
  createData: CreateProductInput;
  updateData: UpdateProductInput;
  validate?: (response: UpdateProductMutationType, createdProduct: any) => void;
};

type RemoveProductTestCase = GraphQLTestCase<
  RemoveProductMutationVariables,
  RemoveProductMutationType
> & {
  shouldCreate: boolean;
  validate?: (response: RemoveProductMutationType) => void;
};

type TableProductTestCase = GraphQLTestCase<
  TableProductQueryVariables,
  TableProductQueryType
> & {
  validate: (response: TableProductQueryType) => void;
};

type SearchProductTestCase = GraphQLTestCase<
  SearchProductsQueryVariables,
  SearchProductsQueryType
> & {
  validate: (response: SearchProductsQueryType) => void;
};

type AnalyticsProductTestCase = GraphQLTestCase<
  AnalyticsProductsQueryVariables,
  AnalyticsProductsQueryType
> & {
  validate: (response: AnalyticsProductsQueryType) => void;
};

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
          name: "My sample product",
          price: 1000,
          description: "Wow product",
          sku: generateUniqueSku(),
          type: ProductType.Digital,
        },
      },
      success: true,
      expectedData: {
        crm: {
          createProduct: {
            name: "My sample product",
            description: "Wow product",
            price: 1000,
            type: ProductType.Digital,
          } as any,
        },
      },
    },
    {
      name: "should reject product with missing name",
      variables: {
        product: {
          price: 1000,
          description: "Wow product",
          sku: generateUniqueSku(),
          type: ProductType.Digital,
        } as unknown as CreateProductInput,
      },
      success: false,
      expectedError: {
        messagePattern: /unexpected|name|required/i,
      },
    },
    {
      name: "should reject product with negative price",
      variables: {
        product: {
          name: "Invalid product",
          price: -100,
          description: "Bad price",
          sku: generateUniqueSku(),
          type: ProductType.Digital,
        },
      },
      success: false,
      expectedError: {
        messagePattern: /unexpected|negative|too_small/i,
      },
    },
    {
      name: "should reject product with empty SKU",
      variables: {
        product: {
          name: "Product with empty SKU",
          price: 500,
          description: "No SKU",
          sku: "",
          type: ProductType.Digital,
        },
      },
      success: false,
      expectedError: {
        messagePattern: /unexpected|sku|empty|too_small/i,
      },
    },
  ];

  it.each(cases)("$name", async (testCase) => {
    const response = await executor(CreateProductMutation, testCase.variables);

    if (testCase.success) {
      expect(response).toHaveProperty("data");
      expect(response.errors).toBeUndefined();
      expect(response.data?.crm?.createProduct).toBeDefined();

      if (testCase.expectedData?.crm?.createProduct) {
        expect(response.data!.crm!.createProduct!).toMatchObject({
          ...testCase.expectedData.crm.createProduct,
          sku: testCase.variables.product.sku,
        });
      }
    } else {
      expect(response.errors).toBeDefined();
      expect(Array.isArray(response.errors)).toBe(true);
      expect(response.errors!.length).toBeGreaterThan(0);

      if (testCase.expectedError) {
        const errorMessage = response.errors![0]?.message || "";

        if (testCase.expectedError.messagePattern instanceof RegExp) {
          expect(errorMessage).toMatch(testCase.expectedError.messagePattern);
        } else {
          expect(errorMessage).toContain(testCase.expectedError.messagePattern);
        }
      }
    }
  });
});

describe("Graphql CRM Update Product", () => {
  let executor: ReturnType<typeof graphQLQueryExecutor>;

  beforeAll(() => {
    executor = graphQLQueryExecutor({ enableJWT: false });
  });

  const cases: UpdateProductTestCase[] = [
    {
      name: "should update a product with all fields",
      createData: {
        name: "Original product",
        price: 500,
        description: "Original description",
        sku: generateUniqueSku(),
        type: ProductType.Good,
      },
      updateData: {
        name: "Updated product",
        price: 1500,
        description: "Updated description",
        sku: generateUniqueSku(),
        type: ProductType.Digital,
      },
      variables: {} as UpdateProductMutationVariables,
      success: true,
      validate: (response: UpdateProductMutationType) => {
        expect(response.crm?.updateProduct?.name).toBe("Updated product");
        expect(response.crm?.updateProduct?.price).toBe(1500);
        expect(response.crm?.updateProduct?.description).toBe(
          "Updated description"
        );
        expect(response.crm?.updateProduct?.type).toBe(ProductType.Digital);
      },
    },
    {
      name: "should update a product with partial fields (name only)",
      createData: {
        name: "Original name",
        price: 750,
        description: "Keep this",
        sku: generateUniqueSku(),
        type: ProductType.Service,
      },
      updateData: {
        name: "New name",
      },
      variables: {} as UpdateProductMutationVariables,
      success: true,
      validate: (response: UpdateProductMutationType, created: any) => {
        expect(response.crm?.updateProduct?.name).toBe("New name");
        expect(response.crm?.updateProduct?.price).toBe(created.price);
        expect(response.crm?.updateProduct?.description).toBe("Keep this");
      },
    },
    {
      name: "should update a product with multiple partial fields",
      createData: {
        name: "Original",
        price: 1000,
        description: "Original desc",
        sku: generateUniqueSku(),
        type: ProductType.Good,
      },
      updateData: {
        price: 2000,
        type: ProductType.Digital,
      },
      variables: {} as UpdateProductMutationVariables,
      success: true,
      validate: (response: UpdateProductMutationType, created: any) => {
        expect(response.crm?.updateProduct?.price).toBe(2000);
        expect(response.crm?.updateProduct?.type).toBe(ProductType.Digital);
        expect(response.crm?.updateProduct?.name).toBe("Original");
      },
    },
    {
      name: "should reject update with negative price",
      createData: {
        name: "Test product",
        price: 500,
        description: "Test",
        sku: generateUniqueSku(),
        type: ProductType.Good,
      },
      updateData: {
        price: -100,
      },
      variables: {} as UpdateProductMutationVariables,
      success: false,
      expectedError: {
        messagePattern: /unexpected|negative|too_small/i,
      },
    },
    {
      name: "should reject update with empty SKU",
      createData: {
        name: "Test product",
        price: 500,
        description: "Test",
        sku: generateUniqueSku(),
        type: ProductType.Good,
      },
      updateData: {
        sku: "",
      },
      variables: {} as UpdateProductMutationVariables,
      success: false,
      expectedError: {
        messagePattern: /unexpected|sku|empty|too_small/i,
      },
    },
  ];

  it.each(cases)("$name", async (testCase) => {
    // Create initial product
    const createResponse = await executor(CreateProductMutation, {
      product: testCase.createData,
    });

    expect(createResponse.data?.crm?.createProduct?.id).toBeDefined();
    const productId = createResponse.data!.crm!.createProduct!.id!;
    const createdProduct = createResponse.data!.crm!.createProduct!;

    // Update product
    const updateResponse = await executor(UpdateProductMutation, {
      id: productId,
      product: testCase.updateData,
    });

    if (testCase.success) {
      expect(updateResponse.errors).toBeUndefined();
      expect(updateResponse.data?.crm?.updateProduct).toBeDefined();
      if (testCase.validate) {
        testCase.validate(
          updateResponse.data as UpdateProductMutationType,
          createdProduct
        );
      }
    } else {
      expect(updateResponse.errors).toBeDefined();
      expect(updateResponse.errors!.length).toBeGreaterThan(0);

      if (testCase.expectedError) {
        const errorMessage = updateResponse.errors![0]?.message || "";
        if (testCase.expectedError.messagePattern instanceof RegExp) {
          expect(errorMessage).toMatch(testCase.expectedError.messagePattern);
        } else {
          expect(errorMessage).toContain(testCase.expectedError.messagePattern);
        }
      }
    }
  });
});

describe("Graphql CRM Remove Product", () => {
  let executor: ReturnType<typeof graphQLQueryExecutor>;

  beforeAll(() => {
    executor = graphQLQueryExecutor({ enableJWT: false });
  });

  const cases: RemoveProductTestCase[] = [
    {
      name: "should delete an existing product successfully",
      shouldCreate: true,
      variables: { id: "" },
      success: true,
      validate: (response: RemoveProductMutationType) => {
        expect(response.crm?.removeProduct?.success).toBe(true);
        expect(response.crm?.removeProduct?.numDeletedRows).toBe(1);
      },
    },
    {
      name: "should reject deletion of non-existent product",
      shouldCreate: false,
      variables: { id: "00000000-0000-0000-0000-000000000000" },
      success: false,
    },
    {
      name: "should return correct response structure",
      shouldCreate: true,
      variables: { id: "" },
      success: true,
      validate: (response: RemoveProductMutationType) => {
        expect(response.crm).toHaveProperty("removeProduct");
        expect(response.crm?.removeProduct).toHaveProperty("success");
        expect(response.crm?.removeProduct).toHaveProperty("numDeletedRows");
        expect(typeof response.crm?.removeProduct?.success).toBe("boolean");
        expect(typeof response.crm?.removeProduct?.numDeletedRows).toBe(
          "number"
        );
      },
    },
  ];

  it.each(cases)("$name", async (testCase) => {
    let productId: string;

    if (testCase.shouldCreate) {
      const createResponse = await executor(CreateProductMutation, {
        product: {
          name: "Product to delete",
          price: 300,
          description: "Will be deleted",
          sku: generateUniqueSku(),
          type: ProductType.Digital,
        },
      });
      productId = createResponse.data!.crm!.createProduct!.id!;
    } else {
      productId = "00000000-0000-0000-0000-000000000000";
    }

    const deleteResponse = await executor(RemoveProductMutation, {
      id: productId,
    });

    if (testCase.success) {
      expect(deleteResponse.errors).toBeUndefined();
      expect(deleteResponse.data?.crm?.removeProduct).toBeDefined();
    } else {
      // Either errors or success: false
      if (deleteResponse.errors) {
        expect(Array.isArray(deleteResponse.errors)).toBe(true);
      } else {
        expect(deleteResponse.data?.crm?.removeProduct?.success).toBe(false);
      }
    }

    if (testCase.validate) {
      testCase.validate(deleteResponse.data as RemoveProductMutationType);
    }
  });
});

describe("Graphql CRM Table Product Query", () => {
  let executor: ReturnType<typeof graphQLQueryExecutor>;

  let createdProducts: Array<{
    id: string;
    name: string;
    type: string;
  }> = [];

  beforeAll(async () => {
    executor = graphQLQueryExecutor({ enableJWT: false });
    const productNames = [
      { name: "Laptop Pro", type: ProductType.Good },
      { name: "Cloud Storage Service", type: ProductType.Service },
      { name: "E-book Collection", type: ProductType.Digital },
      { name: "Laptop Stand", type: ProductType.Good },
      { name: "Mobile App License", type: ProductType.Digital },
    ];

    for (const { name, type } of productNames) {
      const response = await executor(CreateProductMutation, {
        product: {
          name,
          price: Math.floor(Math.random() * 5000) + 100,
          description: `Description for ${name}`,
          sku: generateUniqueSku(),
          type,
        },
      });

      if (response.data?.crm?.createProduct?.id) {
        createdProducts.push({
          id: response.data.crm.createProduct.id,
          name,
          type,
        });
      }
    }
  });

  const cases: TableProductTestCase[] = [
    {
      name: "should fetch all products without filters",
      variables: {},
      success: true,
      validate: (response: TableProductQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);
        expect(response.crm!.products!.length).toBeGreaterThan(0);
      },
    },
    {
      name: "should fetch products with pagination",
      variables: {
        page: 1,
        perPage: 2,
      },
      success: true,
      validate: (response: TableProductQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);
        expect(response.crm!.products!.length).toBeLessThanOrEqual(2);
      },
    },
    {
      name: "should fetch products with search filter",
      variables: {
        search: "Laptop",
      },
      success: true,
      validate: (response: TableProductQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);

        const allMatch = response.crm!.products!.every((product: any) =>
          product.name?.toLowerCase().includes("laptop")
        );
        expect(allMatch).toBe(true);
      },
    },
    {
      name: "should fetch products with type filter",
      variables: {
        type: ProductType.Good,
      },
      success: true,
      validate: (response: TableProductQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);

        const allMatch = response.crm!.products!.every(
          (product: any) => product.type === ProductType.Good
        );
        expect(allMatch).toBe(true);
      },
    },
    {
      name: "should fetch products with multiple filters combined",
      variables: {
        page: 1,
        perPage: 10,
        search: "Laptop",
        type: ProductType.Good,
      },
      success: true,
      validate: (response: TableProductQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);

        const allMatch = response.crm!.products!.every(
          (product: any) =>
            product.name?.toLowerCase().includes("laptop") &&
            product.type === ProductType.Good
        );
        expect(allMatch).toBe(true);
      },
    },
    {
      name: "should return correct response structure with all fields",
      variables: {},
      success: true,
      validate: (response: TableProductQueryType) => {
        expect(response.crm?.products).toBeDefined();
        if (response.crm?.products && response.crm.products.length > 0) {
          const product = response.crm.products[0];

          expect(product).toHaveProperty("id");
          expect(product).toHaveProperty("name");
          expect(product).toHaveProperty("description");
          expect(product).toHaveProperty("price");
          expect(product).toHaveProperty("sku");
          expect(product).toHaveProperty("type");
          expect(product).toHaveProperty("createdAt");
          expect(product).toHaveProperty("updatedAt");
        }
      },
    },
  ];

  it.each(cases)("$name", async (testCase) => {
    const response = await executor(TableProductQuery, testCase.variables);
    testCase.validate(response.data as TableProductQueryType);
  });
});

describe("Graphql CRM Search Products Query", () => {
  let executor: ReturnType<typeof graphQLQueryExecutor>;

  let createdProducts: Array<{ id: string; name: string }> = [];

  beforeAll(async () => {
    executor = graphQLQueryExecutor({ enableJWT: false });
    const productNames = [
      "Premium Backpack",
      "Premium Wallet",
      "Budget Backpack",
      "Professional Camera",
      "Professional Microphone",
    ];

    for (const name of productNames) {
      const response = await executor(CreateProductMutation, {
        product: {
          name,
          price: Math.floor(Math.random() * 5000) + 100,
          description: `Description for ${name}`,
          sku: generateUniqueSku(),
          type: ProductType.Good,
        },
      });

      if (response.data?.crm?.createProduct?.id) {
        createdProducts.push({
          id: response.data.crm.createProduct.id,
          name,
        });
      }
    }
  });

  const cases: SearchProductTestCase[] = [
    {
      name: "should search products with matching results",
      variables: {
        search: "Premium",
      },
      success: true,
      validate: (response: SearchProductsQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);
        expect(response.crm!.products!.length).toBeGreaterThan(0);

        const allMatch = response.crm!.products!.every((product: any) =>
          product.label?.toLowerCase().includes("premium")
        );
        expect(allMatch).toBe(true);
      },
    },
    {
      name: "should return correct field mapping (value: id, label: name)",
      variables: {
        search: "Backpack",
      },
      success: true,
      validate: (response: SearchProductsQueryType) => {
        if (response.crm?.products && response.crm.products.length > 0) {
          const result = response.crm.products[0];

          expect(result).toHaveProperty("value");
          expect(result).toHaveProperty("label");
          expect(typeof result!.value).toBe("string");
          expect(typeof result!.label).toBe("string");
          expect(result!.label).toMatch(/[Bb]ackpack/);
        }
      },
    },
    {
      name: "should handle search with no results",
      variables: {
        search: "NonexistentProductXYZ12345",
      },
      success: true,
      validate: (response: SearchProductsQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);
        expect(response.crm!.products!.length).toBe(0);
      },
    },
    {
      name: "should search with partial match",
      variables: {
        search: "Backpack",
      },
      success: true,
      validate: (response: SearchProductsQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);

        // Verify that all returned results contain the search term
        const allMatch = response.crm!.products!.every((product: any) =>
          product.label?.toLowerCase().includes("backpack")
        );
        expect(allMatch).toBe(true);
      },
    },
  ];

  it.each(cases)("$name", async (testCase) => {
    const response = await executor(SearchProductsQuery, testCase.variables);
    testCase.validate(response.data as SearchProductsQueryType);
  });
});

describe("Graphql CRM Analytics Products Query", () => {
  let executor: ReturnType<typeof graphQLQueryExecutor>;

  beforeAll(async () => {
    executor = graphQLQueryExecutor({ enableJWT: false });
    const productNames = [
      "Analytics Product 1",
      "Analytics Product 2",
      "Analytics Product 3",
    ];

    for (const name of productNames) {
      await executor(CreateProductMutation, {
        product: {
          name,
          price: Math.floor(Math.random() * 5000) + 100,
          description: "Analytics test product",
          sku: generateUniqueSku(),
          type: ProductType.Digital,
        },
      });
    }
  });

  const cases: AnalyticsProductTestCase[] = [
    {
      name: "should fetch analytics data without date filters",
      variables: {},
      success: true,
      validate: (response: AnalyticsProductsQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);
      },
    },
    {
      name: "should fetch analytics data with date range filters",
      variables: {
        from: formatDate(
          new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
        ) as any,
        to: formatDate(
          new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
        ) as any,
      },
      success: true,
      validate: (response: AnalyticsProductsQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);
      },
    },
    {
      name: "should fetch analytics data with start date only",
      variables: {
        from: formatDate(
          new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
        ) as any,
      },
      success: true,
      validate: (response: AnalyticsProductsQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);
      },
    },
    {
      name: "should fetch analytics data with end date only",
      variables: {
        to: formatDate(
          new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
        ) as any,
      },
      success: true,
      validate: (response: AnalyticsProductsQueryType) => {
        expect(response.crm?.products).toBeDefined();
        expect(Array.isArray(response.crm?.products)).toBe(true);
      },
    },
    {
      name: "should return only price field in analytics response",
      variables: {},
      success: true,
      validate: (response: AnalyticsProductsQueryType) => {
        expect(response.crm?.products).toBeDefined();
        if (response.crm?.products && response.crm.products.length > 0) {
          const product = response.crm.products[0];

          expect(product).toHaveProperty("price");
          expect(product).not.toHaveProperty("name");
          expect(product).not.toHaveProperty("description");
          expect(product).not.toHaveProperty("sku");
          expect(product).not.toHaveProperty("type");
          expect(product).not.toHaveProperty("id");
        }
      },
    },
  ];

  it.each(cases)("$name", async (testCase) => {
    const response = await executor(AnalyticsProductsQuery, testCase.variables);
    testCase.validate(response.data as AnalyticsProductsQueryType);
  });
});
