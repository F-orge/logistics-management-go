import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateInventoryAdjustmentMutation as CreateInventoryAdjustmentMutationType,
	CreateInventoryAdjustmentMutationVariables,
	UpdateInventoryAdjustmentMutation as UpdateInventoryAdjustmentMutationType,
	UpdateInventoryAdjustmentMutationVariables,
	RemoveInventoryAdjustmentMutation as RemoveInventoryAdjustmentMutationType,
	RemoveInventoryAdjustmentMutationVariables,
	TableInventoryAdjustmentQuery as TableInventoryAdjustmentQueryType,
	TableInventoryAdjustmentQueryVariables,
	SearchInventoryAdjustmentsQuery as SearchInventoryAdjustmentsQueryType,
	SearchInventoryAdjustmentsQueryVariables,
	AnalyticsInventoryAdjustmentsQuery as AnalyticsInventoryAdjustmentsQueryType,
	AnalyticsInventoryAdjustmentsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateInventoryAdjustmentInput,
	UpdateInventoryAdjustmentInput,
} from "../../../src/client/generated/graphql";
import {
	CreateInventoryAdjustmentMutation,
	UpdateInventoryAdjustmentMutation,
	RemoveInventoryAdjustmentMutation,
	TableInventoryAdjustmentQuery,
	SearchInventoryAdjustmentsQuery,
	AnalyticsInventoryAdjustmentsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateInventoryAdjustmentTestCase = GraphQLTestCase<
	CreateInventoryAdjustmentMutationVariables,
	CreateInventoryAdjustmentMutationType
>;

type UpdateInventoryAdjustmentTestCase = GraphQLTestCase<
	UpdateInventoryAdjustmentMutationVariables,
	UpdateInventoryAdjustmentMutationType
> & {
	createData: CreateInventoryAdjustmentInput;
	updateData: UpdateInventoryAdjustmentInput;
	validate?: (response: UpdateInventoryAdjustmentMutationType, createdInventoryAdjustment: any) => void;
};

type RemoveInventoryAdjustmentTestCase = GraphQLTestCase<
	RemoveInventoryAdjustmentMutationVariables,
	RemoveInventoryAdjustmentMutationType
> & {
	createData: CreateInventoryAdjustmentInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveInventoryAdjustmentMutationType) => void;
};

type TableInventoryAdjustmentTestCase = GraphQLTestCase<
	TableInventoryAdjustmentQueryVariables,
	TableInventoryAdjustmentQueryType
> & {
	validate: (response: TableInventoryAdjustmentQueryType) => void;
};

type SearchInventoryAdjustmentsTestCase = GraphQLTestCase<
	SearchInventoryAdjustmentsQueryVariables,
	SearchInventoryAdjustmentsQueryType
> & {
	validate: (response: SearchInventoryAdjustmentsQueryType) => void;
};

type AnalyticsInventoryAdjustmentsTestCase = GraphQLTestCase<
	AnalyticsInventoryAdjustmentsQueryVariables,
	AnalyticsInventoryAdjustmentsQueryType
> & {
	validate: (response: AnalyticsInventoryAdjustmentsQueryType) => void;
};
// ============================================
// Test Suite: Create InventoryAdjustment
// ============================================

describe("Graphql Create InventoryAdjustment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateInventoryAdjustmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateInventoryAdjustmentMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createInventoryAdjustment).toBeDefined();
			expect(response.data?.wms?.createInventoryAdjustment?.id).toBeDefined();
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
// Test Suite: Update InventoryAdjustment
// ============================================

describe("Graphql Update InventoryAdjustment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateInventoryAdjustmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial InventoryAdjustment
		const createResponse = await executor(CreateInventoryAdjustmentMutation, {
			inventoryAdjustment: testCase.createData,
		});

		expect(createResponse.data?.wms?.createInventoryAdjustment?.id).toBeDefined();
		const inventoryAdjustmentId = createResponse.data!.wms!.createInventoryAdjustment!.id!;
		const createdInventoryAdjustment = createResponse.data!.wms!.createInventoryAdjustment!;

		// Update InventoryAdjustment
		const updateResponse = await executor(UpdateInventoryAdjustmentMutation, {
			id: testCase.variables.id,
			inventoryAdjustment: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateInventoryAdjustment).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateInventoryAdjustmentMutationType,
					createdInventoryAdjustment,
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
// Test Suite: Remove InventoryAdjustment
// ============================================

describe("Graphql Remove InventoryAdjustment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveInventoryAdjustmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let inventoryAdjustmentId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateInventoryAdjustmentMutation, {
				inventoryAdjustment: {
					// Add minimal required fields
				} as unknown as CreateInventoryAdjustmentInput,
			});
			inventoryAdjustmentId = createResponse.data!.wms!.createInventoryAdjustment!.id!;
		} else {
			inventoryAdjustmentId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveInventoryAdjustmentMutation, {
			id: inventoryAdjustmentId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeInventoryAdjustment).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeInventoryAdjustment?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveInventoryAdjustmentMutationType);
		}
	});
});

// ============================================
// Test Suite: Table InventoryAdjustments Query
// ============================================

describe("Graphql Table InventoryAdjustments Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableInventoryAdjustmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableInventoryAdjustmentQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.inventoryAdjustments).toBeDefined();
			testCase.validate(response.data as TableInventoryAdjustmentQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search InventoryAdjustments Query
// ============================================

describe("Graphql Search InventoryAdjustments Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchInventoryAdjustmentsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchInventoryAdjustmentsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.inventoryAdjustments).toBeDefined();
			testCase.validate(response.data as SearchInventoryAdjustmentsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics InventoryAdjustments Query
// ============================================

describe("Graphql Analytics InventoryAdjustments Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsInventoryAdjustmentsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsInventoryAdjustmentsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.inventoryAdjustments).toBeDefined();
			testCase.validate(response.data as AnalyticsInventoryAdjustmentsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
