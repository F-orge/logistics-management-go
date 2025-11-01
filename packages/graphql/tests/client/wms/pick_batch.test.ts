import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreatePickBatchMutation as CreatePickBatchMutationType,
	CreatePickBatchMutationVariables,
	UpdatePickBatchMutation as UpdatePickBatchMutationType,
	UpdatePickBatchMutationVariables,
	RemovePickBatchMutation as RemovePickBatchMutationType,
	RemovePickBatchMutationVariables,
	TablePickBatchQuery as TablePickBatchQueryType,
	TablePickBatchQueryVariables,
	SearchPickBatchsQuery as SearchPickBatchsQueryType,
	SearchPickBatchsQueryVariables,
	AnalyticsPickBatchsQuery as AnalyticsPickBatchsQueryType,
	AnalyticsPickBatchsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreatePickBatchInput,
	UpdatePickBatchInput,
} from "../../../src/client/generated/graphql";
import {
	CreatePickBatchMutation,
	UpdatePickBatchMutation,
	RemovePickBatchMutation,
	TablePickBatchQuery,
	SearchPickBatchsQuery,
	AnalyticsPickBatchsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreatePickBatchTestCase = GraphQLTestCase<
	CreatePickBatchMutationVariables,
	CreatePickBatchMutationType
>;

type UpdatePickBatchTestCase = GraphQLTestCase<
	UpdatePickBatchMutationVariables,
	UpdatePickBatchMutationType
> & {
	createData: CreatePickBatchInput;
	updateData: UpdatePickBatchInput;
	validate?: (response: UpdatePickBatchMutationType, createdPickBatch: any) => void;
};

type RemovePickBatchTestCase = GraphQLTestCase<
	RemovePickBatchMutationVariables,
	RemovePickBatchMutationType
> & {
	createData: CreatePickBatchInput;
	shouldCreate?: boolean;
	validate?: (response: RemovePickBatchMutationType) => void;
};

type TablePickBatchTestCase = GraphQLTestCase<
	TablePickBatchQueryVariables,
	TablePickBatchQueryType
> & {
	validate: (response: TablePickBatchQueryType) => void;
};

type SearchPickBatchsTestCase = GraphQLTestCase<
	SearchPickBatchsQueryVariables,
	SearchPickBatchsQueryType
> & {
	validate: (response: SearchPickBatchsQueryType) => void;
};

type AnalyticsPickBatchsTestCase = GraphQLTestCase<
	AnalyticsPickBatchsQueryVariables,
	AnalyticsPickBatchsQueryType
> & {
	validate: (response: AnalyticsPickBatchsQueryType) => void;
};
// ============================================
// Test Suite: Create PickBatch
// ============================================

describe("Graphql Create PickBatch", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreatePickBatchTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreatePickBatchMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createPickBatch).toBeDefined();
			expect(response.data?.wms?.createPickBatch?.id).toBeDefined();
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
// Test Suite: Update PickBatch
// ============================================

describe("Graphql Update PickBatch", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdatePickBatchTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial PickBatch
		const createResponse = await executor(CreatePickBatchMutation, {
			pickBatch: testCase.createData,
		});

		expect(createResponse.data?.wms?.createPickBatch?.id).toBeDefined();
		const pickBatchId = createResponse.data!.wms!.createPickBatch!.id!;
		const createdPickBatch = createResponse.data!.wms!.createPickBatch!;

		// Update PickBatch
		const updateResponse = await executor(UpdatePickBatchMutation, {
			id: testCase.variables.id,
			pickBatch: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updatePickBatch).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdatePickBatchMutationType,
					createdPickBatch,
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
// Test Suite: Remove PickBatch
// ============================================

describe("Graphql Remove PickBatch", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemovePickBatchTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let pickBatchId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreatePickBatchMutation, {
				pickBatch: {
					// Add minimal required fields
				} as unknown as CreatePickBatchInput,
			});
			pickBatchId = createResponse.data!.wms!.createPickBatch!.id!;
		} else {
			pickBatchId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemovePickBatchMutation, {
			id: pickBatchId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removePickBatch).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removePickBatch?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemovePickBatchMutationType);
		}
	});
});

// ============================================
// Test Suite: Table PickBatchs Query
// ============================================

describe("Graphql Table PickBatchs Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TablePickBatchTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TablePickBatchQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.pick_batchs).toBeDefined();
			testCase.validate(response.data as TablePickBatchQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search PickBatchs Query
// ============================================

describe("Graphql Search PickBatchs Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchPickBatchsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchPickBatchsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.pick_batchs).toBeDefined();
			testCase.validate(response.data as SearchPickBatchsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics PickBatchs Query
// ============================================

describe("Graphql Analytics PickBatchs Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsPickBatchsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsPickBatchsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.pick_batchs).toBeDefined();
			testCase.validate(response.data as AnalyticsPickBatchsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
