import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateInventoryBatchMutation as CreateInventoryBatchMutationType,
	CreateInventoryBatchMutationVariables,
	UpdateInventoryBatchMutation as UpdateInventoryBatchMutationType,
	UpdateInventoryBatchMutationVariables,
	RemoveInventoryBatchMutation as RemoveInventoryBatchMutationType,
	RemoveInventoryBatchMutationVariables,
	TableInventoryBatchQuery as TableInventoryBatchQueryType,
	TableInventoryBatchQueryVariables,
	SearchInventoryBatchesQuery as SearchInventoryBatchsQueryType,
	SearchInventoryBatchesQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateInventoryBatchInput,
	UpdateInventoryBatchInput,
} from "../../../src/client/generated/graphql";
import {
	CreateInventoryBatchMutation,
	UpdateInventoryBatchMutation,
	RemoveInventoryBatchMutation,
	TableInventoryBatchQuery,
	SearchInventoryBatchesQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateInventoryBatchTestCase = GraphQLTestCase<
	CreateInventoryBatchMutationVariables,
	CreateInventoryBatchMutationType
>;

type UpdateInventoryBatchTestCase = GraphQLTestCase<
	UpdateInventoryBatchMutationVariables,
	UpdateInventoryBatchMutationType
> & {
	createData: CreateInventoryBatchInput;
	updateData: UpdateInventoryBatchInput;
	validate?: (
		response: UpdateInventoryBatchMutationType,
		createdInventoryBatch: any,
	) => void;
};

type RemoveInventoryBatchTestCase = GraphQLTestCase<
	RemoveInventoryBatchMutationVariables,
	RemoveInventoryBatchMutationType
> & {
	createData: CreateInventoryBatchInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveInventoryBatchMutationType) => void;
};

type TableInventoryBatchTestCase = GraphQLTestCase<
	TableInventoryBatchQueryVariables,
	TableInventoryBatchQueryType
> & {
	validate: (response: TableInventoryBatchQueryType) => void;
};

type SearchInventoryBatchsTestCase = GraphQLTestCase<
	SearchInventoryBatchesQueryVariables,
	SearchInventoryBatchsQueryType
> & {
	validate: (response: SearchInventoryBatchsQueryType) => void;
};
// ============================================
// Test Suite: Create InventoryBatch
// ============================================

describe("Graphql Create InventoryBatch", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateInventoryBatchTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateInventoryBatchMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createInventoryBatch).toBeDefined();
			expect(response.data?.wms?.createInventoryBatch?.id).toBeDefined();
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
// Test Suite: Update InventoryBatch
// ============================================

describe("Graphql Update InventoryBatch", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateInventoryBatchTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial InventoryBatch
		const createResponse = await executor(CreateInventoryBatchMutation, {
			inventoryBatch: testCase.createData,
		});

		expect(createResponse.data?.wms?.createInventoryBatch?.id).toBeDefined();
		const inventoryBatchId =
			createResponse.data!.wms!.createInventoryBatch!.id!;
		const createdInventoryBatch =
			createResponse.data!.wms!.createInventoryBatch!;

		// Update InventoryBatch
		const updateResponse = await executor(UpdateInventoryBatchMutation, {
			id: testCase.variables.id,
			inventoryBatch: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateInventoryBatch).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateInventoryBatchMutationType,
					createdInventoryBatch,
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
// Test Suite: Remove InventoryBatch
// ============================================

describe("Graphql Remove InventoryBatch", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveInventoryBatchTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let inventoryBatchId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateInventoryBatchMutation, {
				inventoryBatch: {
					// Add minimal required fields
				} as unknown as CreateInventoryBatchInput,
			});
			inventoryBatchId = createResponse.data!.wms!.createInventoryBatch!.id!;
		} else {
			inventoryBatchId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveInventoryBatchMutation, {
			id: inventoryBatchId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeInventoryBatch).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeInventoryBatch?.success).toBe(
					false,
				);
			}
		}

		if (testCase.validate) {
			testCase.validate(
				deleteResponse.data as RemoveInventoryBatchMutationType,
			);
		}
	});
});

// ============================================
// Test Suite: Table InventoryBatchs Query
// ============================================

describe("Graphql Table InventoryBatchs Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableInventoryBatchTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			TableInventoryBatchQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.inventoryBatches).toBeDefined();
			testCase.validate(response.data as TableInventoryBatchQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search InventoryBatchs Query
// ============================================

describe("Graphql Search InventoryBatchs Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchInventoryBatchsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			SearchInventoryBatchesQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.inventoryBatches).toBeDefined();
			testCase.validate(response.data as SearchInventoryBatchsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
