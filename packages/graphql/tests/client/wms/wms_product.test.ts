import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateWmsProductMutation as CreateWmsProductMutationType,
	CreateWmsProductMutationVariables,
	UpdateWmsProductMutation as UpdateWmsProductMutationType,
	UpdateWmsProductMutationVariables,
	RemoveWmsProductMutation as RemoveWmsProductMutationType,
	RemoveWmsProductMutationVariables,
	TableWmsProductQuery as TableWmsProductQueryType,
	TableWmsProductQueryVariables,
	SearchWmsProductsQuery as SearchWmsProductsQueryType,
	SearchWmsProductsQueryVariables,
	AnalyticsWmsProductsQuery as AnalyticsWmsProductsQueryType,
	AnalyticsWmsProductsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateWmsProductInput,
	UpdateWmsProductInput,
} from "../../../src/client/generated/graphql";
import {
	CreateWmsProductMutation,
	UpdateWmsProductMutation,
	RemoveWmsProductMutation,
	TableWmsProductQuery,
	SearchWmsProductsQuery,
	AnalyticsWmsProductsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateWmsProductTestCase = GraphQLTestCase<
	CreateWmsProductMutationVariables,
	CreateWmsProductMutationType
>;

type UpdateWmsProductTestCase = GraphQLTestCase<
	UpdateWmsProductMutationVariables,
	UpdateWmsProductMutationType
> & {
	createData: CreateWmsProductInput;
	updateData: UpdateWmsProductInput;
	validate?: (response: UpdateWmsProductMutationType, createdWmsProduct: any) => void;
};

type RemoveWmsProductTestCase = GraphQLTestCase<
	RemoveWmsProductMutationVariables,
	RemoveWmsProductMutationType
> & {
	createData: CreateWmsProductInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveWmsProductMutationType) => void;
};

type TableWmsProductTestCase = GraphQLTestCase<
	TableWmsProductQueryVariables,
	TableWmsProductQueryType
> & {
	validate: (response: TableWmsProductQueryType) => void;
};

type SearchWmsProductsTestCase = GraphQLTestCase<
	SearchWmsProductsQueryVariables,
	SearchWmsProductsQueryType
> & {
	validate: (response: SearchWmsProductsQueryType) => void;
};

type AnalyticsWmsProductsTestCase = GraphQLTestCase<
	AnalyticsWmsProductsQueryVariables,
	AnalyticsWmsProductsQueryType
> & {
	validate: (response: AnalyticsWmsProductsQueryType) => void;
};
// ============================================
// Test Suite: Create WmsProduct
// ============================================

describe("Graphql Create WmsProduct", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateWmsProductTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateWmsProductMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createWmsProduct).toBeDefined();
			expect(response.data?.wms?.createWmsProduct?.id).toBeDefined();
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

// ============================================
// Test Suite: Update WmsProduct
// ============================================

describe("Graphql Update WmsProduct", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateWmsProductTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial WmsProduct
		const createResponse = await executor(CreateWmsProductMutation, {
			wmsProduct: testCase.createData,
		});

		expect(createResponse.data?.wms?.createWmsProduct?.id).toBeDefined();
		const wmsProductId = createResponse.data!.wms!.createWmsProduct!.id!;
		const createdWmsProduct = createResponse.data!.wms!.createWmsProduct!;

		// Update WmsProduct
		const updateResponse = await executor(UpdateWmsProductMutation, {
			id: testCase.variables.id,
			wmsProduct: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateWmsProduct).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateWmsProductMutationType,
					createdWmsProduct,
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

// ============================================
// Test Suite: Remove WmsProduct
// ============================================

describe("Graphql Remove WmsProduct", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveWmsProductTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let wmsProductId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateWmsProductMutation, {
				wmsProduct: {
					// Add minimal required fields
				} as unknown as CreateWmsProductInput,
			});
			wmsProductId = createResponse.data!.wms!.createWmsProduct!.id!;
		} else {
			wmsProductId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveWmsProductMutation, {
			id: wmsProductId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeWmsProduct).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeWmsProduct?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveWmsProductMutationType);
		}
	});
});

// ============================================
// Test Suite: Table WmsProducts Query
// ============================================

describe("Graphql Table WmsProducts Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableWmsProductTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableWmsProductQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.wms_products).toBeDefined();
			testCase.validate(response.data as TableWmsProductQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search WmsProducts Query
// ============================================

describe("Graphql Search WmsProducts Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchWmsProductsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchWmsProductsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.wms_products).toBeDefined();
			testCase.validate(response.data as SearchWmsProductsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics WmsProducts Query
// ============================================

describe("Graphql Analytics WmsProducts Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsWmsProductsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsWmsProductsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.wms_products).toBeDefined();
			testCase.validate(response.data as AnalyticsWmsProductsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
