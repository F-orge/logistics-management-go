import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateDeliveryTaskMutation as CreateDeliveryTaskMutationType,
	CreateDeliveryTaskMutationVariables,
	UpdateDeliveryTaskMutation as UpdateDeliveryTaskMutationType,
	UpdateDeliveryTaskMutationVariables,
	TableDeliveryTaskQuery as TableDeliveryTaskQueryType,
	TableDeliveryTaskQueryVariables,
	SearchDeliveryTasksQuery as SearchDeliveryTasksQueryType,
	SearchDeliveryTasksQueryVariables,
	AnalyticsDeliveryTasksQuery as AnalyticsDeliveryTasksQueryType,
	AnalyticsDeliveryTasksQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateDeliveryTaskInput,
	UpdateDeliveryTaskInput,
} from "../../../src/client/generated/graphql";
import {
	CreateDeliveryTaskMutation,
	UpdateDeliveryTaskMutation,
	TableDeliveryTaskQuery,
	SearchDeliveryTasksQuery,
	AnalyticsDeliveryTasksQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateDeliveryTaskTestCase = GraphQLTestCase<
	CreateDeliveryTaskMutationVariables,
	CreateDeliveryTaskMutationType
>;

type UpdateDeliveryTaskTestCase = GraphQLTestCase<
	UpdateDeliveryTaskMutationVariables,
	UpdateDeliveryTaskMutationType
> & {
	createData: CreateDeliveryTaskInput;
	updateData: UpdateDeliveryTaskInput;
	validate?: (
		response: UpdateDeliveryTaskMutationType,
		createdTask: any,
	) => void;
};

type TableDeliveryTaskTestCase = GraphQLTestCase<
	TableDeliveryTaskQueryVariables,
	TableDeliveryTaskQueryType
> & {
	validate: (response: TableDeliveryTaskQueryType) => void;
};

type SearchDeliveryTaskTestCase = GraphQLTestCase<
	SearchDeliveryTasksQueryVariables,
	SearchDeliveryTasksQueryType
> & {
	validate: (response: SearchDeliveryTasksQueryType) => void;
};

type AnalyticsDeliveryTaskTestCase = GraphQLTestCase<
	AnalyticsDeliveryTasksQueryVariables,
	AnalyticsDeliveryTasksQueryType
> & {
	validate: (response: AnalyticsDeliveryTasksQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// Add helper functions as needed

// ============================================
// Test Suite: Create Delivery Task
// ============================================

describe("Graphql DMS Create Delivery Task", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateDeliveryTaskTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateDeliveryTaskMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.dms?.createDeliveryTask).toBeDefined();
			expect(response.data?.dms?.createDeliveryTask?.id).toBeDefined();
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
// Test Suite: Update Delivery Task
// ============================================

describe("Graphql DMS Update Delivery Task", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateDeliveryTaskTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial task
		const createResponse = await executor(CreateDeliveryTaskMutation, {
			deliveryTask: testCase.createData,
		});

		expect(createResponse.data?.dms?.createDeliveryTask?.id).toBeDefined();
		const taskId = createResponse.data!.dms!.createDeliveryTask!.id!;
		const createdTask = createResponse.data!.dms!.createDeliveryTask!;

		// Update task
		const updateResponse = await executor(UpdateDeliveryTaskMutation, {
			id: taskId,
			deliveryTask: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.dms?.updateDeliveryTask).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateDeliveryTaskMutationType,
					createdTask,
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
// Test Suite: Table Delivery Task Query
// ============================================

describe("Graphql DMS Table Delivery Task Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	let createdTasks: Array<{
		id: string;
		recipientName?: string;
	}> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Create sample tasks for table queries if needed
	});

	const cases: TableDeliveryTaskTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableDeliveryTaskQuery, testCase.variables);
		testCase.validate(response.data as TableDeliveryTaskQueryType);
	});
});

// ============================================
// Test Suite: Search Delivery Tasks Query
// ============================================

describe("Graphql DMS Search Delivery Tasks Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	let createdTasks: Array<{ id: string; recipientName?: string }> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Create sample tasks for search if needed
	});

	const cases: SearchDeliveryTaskTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			SearchDeliveryTasksQuery,
			testCase.variables,
		);
		testCase.validate(response.data as SearchDeliveryTasksQueryType);
	});
});

// ============================================
// Test Suite: Analytics Delivery Tasks Query
// ============================================

describe("Graphql DMS Analytics Delivery Tasks Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsDeliveryTaskTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsDeliveryTasksQuery,
			testCase.variables,
		);
		testCase.validate(response.data as AnalyticsDeliveryTasksQueryType);
	});
});
