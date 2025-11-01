import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateInventoryStockMutation as CreateInventoryStockMutationType,
	CreateInventoryStockMutationVariables,
	UpdateInventoryStockMutation as UpdateInventoryStockMutationType,
	UpdateInventoryStockMutationVariables,
	RemoveInventoryStockMutation as RemoveInventoryStockMutationType,
	RemoveInventoryStockMutationVariables,
	TableInventoryStockQuery as TableInventoryStockQueryType,
	TableInventoryStockQueryVariables,
	AnalyticsInventoryStocksQuery as AnalyticsInventoryStocksQueryType,
	AnalyticsInventoryStocksQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateInventoryStockInput,
	UpdateInventoryStockInput,
} from "../../../src/client/generated/graphql";
import {
	CreateInventoryStockMutation,
	UpdateInventoryStockMutation,
	RemoveInventoryStockMutation,
	TableInventoryStockQuery,
	AnalyticsInventoryStocksQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateInventoryStockTestCase = GraphQLTestCase<
	CreateInventoryStockMutationVariables,
	CreateInventoryStockMutationType
>;

type UpdateInventoryStockTestCase = GraphQLTestCase<
	UpdateInventoryStockMutationVariables,
	UpdateInventoryStockMutationType
> & {
	createData: CreateInventoryStockInput;
	updateData: UpdateInventoryStockInput;
	validate?: (response: UpdateInventoryStockMutationType, createdInventoryStock: any) => void;
};

type RemoveInventoryStockTestCase = GraphQLTestCase<
	RemoveInventoryStockMutationVariables,
	RemoveInventoryStockMutationType
> & {
	createData: CreateInventoryStockInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveInventoryStockMutationType) => void;
};

type TableInventoryStockTestCase = GraphQLTestCase<
	TableInventoryStockQueryVariables,
	TableInventoryStockQueryType
> & {
	validate: (response: TableInventoryStockQueryType) => void;
};

type AnalyticsInventoryStocksTestCase = GraphQLTestCase<
	AnalyticsInventoryStocksQueryVariables,
	AnalyticsInventoryStocksQueryType
> & {
	validate: (response: AnalyticsInventoryStocksQueryType) => void;
};
// ============================================
// Test Suite: Create InventoryStock
// ============================================

describe("Graphql Create InventoryStock", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateInventoryStockTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateInventoryStockMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createInventoryStock).toBeDefined();
			expect(response.data?.wms?.createInventoryStock?.id).toBeDefined();
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
// Test Suite: Update InventoryStock
// ============================================

describe("Graphql Update InventoryStock", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateInventoryStockTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial InventoryStock
		const createResponse = await executor(CreateInventoryStockMutation, {
			inventoryStock: testCase.createData,
		});

		expect(createResponse.data?.wms?.createInventoryStock?.id).toBeDefined();
		const inventoryStockId = createResponse.data!.wms!.createInventoryStock!.id!;
		const createdInventoryStock = createResponse.data!.wms!.createInventoryStock!;

		// Update InventoryStock
		const updateResponse = await executor(UpdateInventoryStockMutation, {
			id: testCase.variables.id,
			inventoryStock: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateInventoryStock).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateInventoryStockMutationType,
					createdInventoryStock,
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
// Test Suite: Remove InventoryStock
// ============================================

describe("Graphql Remove InventoryStock", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveInventoryStockTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let inventoryStockId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateInventoryStockMutation, {
				inventoryStock: {
					// Add minimal required fields
				} as unknown as CreateInventoryStockInput,
			});
			inventoryStockId = createResponse.data!.wms!.createInventoryStock!.id!;
		} else {
			inventoryStockId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveInventoryStockMutation, {
			id: inventoryStockId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeInventoryStock).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeInventoryStock?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveInventoryStockMutationType);
		}
	});
});

// ============================================
// Test Suite: Table InventoryStocks Query
// ============================================

describe("Graphql Table InventoryStocks Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableInventoryStockTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableInventoryStockQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.inventory_stocks).toBeDefined();
			testCase.validate(response.data as TableInventoryStockQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics InventoryStocks Query
// ============================================

describe("Graphql Analytics InventoryStocks Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsInventoryStocksTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsInventoryStocksQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.inventory_stocks).toBeDefined();
			testCase.validate(response.data as AnalyticsInventoryStocksQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
