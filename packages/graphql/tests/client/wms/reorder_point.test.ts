import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateReorderPointMutation as CreateReorderPointMutationType,
	CreateReorderPointMutationVariables,
	UpdateReorderPointMutation as UpdateReorderPointMutationType,
	UpdateReorderPointMutationVariables,
	RemoveReorderPointMutation as RemoveReorderPointMutationType,
	RemoveReorderPointMutationVariables,
	TableReorderPointQuery as TableReorderPointQueryType,
	TableReorderPointQueryVariables,
	AnalyticsReorderPointsQuery as AnalyticsReorderPointsQueryType,
	AnalyticsReorderPointsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateReorderPointInput,
	UpdateReorderPointInput,
} from "../../../src/client/generated/graphql";
import {
	CreateReorderPointMutation,
	UpdateReorderPointMutation,
	RemoveReorderPointMutation,
	TableReorderPointQuery,
	AnalyticsReorderPointsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateReorderPointTestCase = GraphQLTestCase<
	CreateReorderPointMutationVariables,
	CreateReorderPointMutationType
>;

type UpdateReorderPointTestCase = GraphQLTestCase<
	UpdateReorderPointMutationVariables,
	UpdateReorderPointMutationType
> & {
	createData: CreateReorderPointInput;
	updateData: UpdateReorderPointInput;
	validate?: (response: UpdateReorderPointMutationType, createdReorderPoint: any) => void;
};

type RemoveReorderPointTestCase = GraphQLTestCase<
	RemoveReorderPointMutationVariables,
	RemoveReorderPointMutationType
> & {
	createData: CreateReorderPointInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveReorderPointMutationType) => void;
};

type TableReorderPointTestCase = GraphQLTestCase<
	TableReorderPointQueryVariables,
	TableReorderPointQueryType
> & {
	validate: (response: TableReorderPointQueryType) => void;
};

type AnalyticsReorderPointsTestCase = GraphQLTestCase<
	AnalyticsReorderPointsQueryVariables,
	AnalyticsReorderPointsQueryType
> & {
	validate: (response: AnalyticsReorderPointsQueryType) => void;
};
// ============================================
// Test Suite: Create ReorderPoint
// ============================================

describe("Graphql Create ReorderPoint", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateReorderPointTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateReorderPointMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createReorderPoint).toBeDefined();
			expect(response.data?.wms?.createReorderPoint?.id).toBeDefined();
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
// Test Suite: Update ReorderPoint
// ============================================

describe("Graphql Update ReorderPoint", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateReorderPointTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial ReorderPoint
		const createResponse = await executor(CreateReorderPointMutation, {
			reorderPoint: testCase.createData,
		});

		expect(createResponse.data?.wms?.createReorderPoint?.id).toBeDefined();
		const reorderPointId = createResponse.data!.wms!.createReorderPoint!.id!;
		const createdReorderPoint = createResponse.data!.wms!.createReorderPoint!;

		// Update ReorderPoint
		const updateResponse = await executor(UpdateReorderPointMutation, {
			id: testCase.variables.id,
			reorderPoint: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateReorderPoint).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateReorderPointMutationType,
					createdReorderPoint,
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
// Test Suite: Remove ReorderPoint
// ============================================

describe("Graphql Remove ReorderPoint", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveReorderPointTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let reorderPointId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateReorderPointMutation, {
				reorderPoint: {
					// Add minimal required fields
				} as unknown as CreateReorderPointInput,
			});
			reorderPointId = createResponse.data!.wms!.createReorderPoint!.id!;
		} else {
			reorderPointId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveReorderPointMutation, {
			id: reorderPointId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeReorderPoint).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeReorderPoint?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveReorderPointMutationType);
		}
	});
});

// ============================================
// Test Suite: Table ReorderPoints Query
// ============================================

describe("Graphql Table ReorderPoints Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableReorderPointTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableReorderPointQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.reorderPoints).toBeDefined();
			testCase.validate(response.data as TableReorderPointQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics ReorderPoints Query
// ============================================

describe("Graphql Analytics ReorderPoints Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsReorderPointsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsReorderPointsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.reorderPoints).toBeDefined();
			testCase.validate(response.data as AnalyticsReorderPointsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
