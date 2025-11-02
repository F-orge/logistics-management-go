import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsTasksQuery,
	CreateTaskMutation,
	RemoveTaskMutation,
	SearchTasksQuery,
	TableTaskQuery,
	UpdateTaskMutation,
} from "../../../src/client";
import type {
	AnalyticsTasksQuery as AnalyticsTasksQueryType,
	AnalyticsTasksQueryVariables,
	CreateTaskInput,
	CreateTaskMutation as CreateTaskMutationType,
	CreateTaskMutationVariables,
	RemoveTaskMutation as RemoveTaskMutationType,
	RemoveTaskMutationVariables,
	SearchTasksQuery as SearchTasksQueryType,
	SearchTasksQueryVariables,
	TableTaskQuery as TableTaskQueryType,
	TableTaskQueryVariables,
	UpdateTaskInput,
	UpdateTaskMutation as UpdateTaskMutationType,
	UpdateTaskMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateTaskTestCase = GraphQLTestCase<
	CreateTaskMutationVariables,
	CreateTaskMutationType
>;

type UpdateTaskTestCase = GraphQLTestCase<
	UpdateTaskMutationVariables,
	UpdateTaskMutationType
> & {
	createData: CreateTaskInput;
	updateData: UpdateTaskInput;
	validate?: (response: UpdateTaskMutationType, createdTask: any) => void;
};

type RemoveTaskTestCase = GraphQLTestCase<
	RemoveTaskMutationVariables,
	RemoveTaskMutationType
> & {
	createData: CreateTaskInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveTaskMutationType) => void;
};

type TableTaskTestCase = GraphQLTestCase<
	TableTaskQueryVariables,
	TableTaskQueryType
> & {
	validate: (response: TableTaskQueryType) => void;
};

type SearchTasksTestCase = GraphQLTestCase<
	SearchTasksQueryVariables,
	SearchTasksQueryType
> & {
	validate: (response: SearchTasksQueryType) => void;
};

type AnalyticsTasksTestCase = GraphQLTestCase<
	AnalyticsTasksQueryVariables,
	AnalyticsTasksQueryType
> & {
	validate: (response: AnalyticsTasksQueryType) => void;
};
// ============================================
// Test Suite: Create Task
// ============================================

describe("Graphql Create Task", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateTaskTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateTaskMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createTask).toBeDefined();
			expect(response.data?.wms?.createTask?.id).toBeDefined();
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
// Test Suite: Update Task
// ============================================

describe("Graphql Update Task", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateTaskTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial Task
		const createResponse = await executor(CreateTaskMutation, {
			task: testCase.createData,
		});

		expect(createResponse.data?.wms?.createTask?.id).toBeDefined();
		const taskId = createResponse.data!.wms!.createTask!.id!;
		const createdTask = createResponse.data!.wms!.createTask!;

		// Update Task
		const updateResponse = await executor(UpdateTaskMutation, {
			id: testCase.variables.id,
			task: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateTask).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateTaskMutationType,
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
// Test Suite: Remove Task
// ============================================

describe("Graphql Remove Task", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveTaskTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let taskId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateTaskMutation, {
				task: {
					// Add minimal required fields
				} as unknown as CreateTaskInput,
			});
			taskId = createResponse.data!.wms!.createTask!.id!;
		} else {
			taskId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveTaskMutation, {
			id: taskId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeTask).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeTask?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveTaskMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Tasks Query
// ============================================

describe("Graphql Table Tasks Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableTaskTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableTaskQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.tasks).toBeDefined();
			testCase.validate(response.data as TableTaskQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Tasks Query
// ============================================

describe("Graphql Search Tasks Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchTasksTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchTasksQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.tasks).toBeDefined();
			testCase.validate(response.data as SearchTasksQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics Tasks Query
// ============================================

describe("Graphql Analytics Tasks Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsTasksTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsTasksQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.tasks).toBeDefined();
			testCase.validate(response.data as AnalyticsTasksQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
