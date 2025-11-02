import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsTaskEventsQuery,
	CreateTaskEventMutation,
	SearchTaskEventsQuery,
	TableTaskEventQuery,
} from "../../../src/client";
import type {
	AnalyticsTaskEventsQuery as AnalyticsTaskEventsQueryType,
	AnalyticsTaskEventsQueryVariables,
	CreateTaskEventInput,
	CreateTaskEventMutation as CreateTaskEventMutationType,
	CreateTaskEventMutationVariables,
	SearchTaskEventsQuery as SearchTaskEventsQueryType,
	SearchTaskEventsQueryVariables,
	TableTaskEventQuery as TableTaskEventQueryType,
	TableTaskEventQueryVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateTaskEventTestCase = GraphQLTestCase<
	CreateTaskEventMutationVariables,
	CreateTaskEventMutationType
>;

type TableTaskEventTestCase = GraphQLTestCase<
	TableTaskEventQueryVariables,
	TableTaskEventQueryType
> & {
	validate: (response: TableTaskEventQueryType) => void;
};

type SearchTaskEventTestCase = GraphQLTestCase<
	SearchTaskEventsQueryVariables,
	SearchTaskEventsQueryType
> & {
	validate: (response: SearchTaskEventsQueryType) => void;
};

type AnalyticsTaskEventTestCase = GraphQLTestCase<
	AnalyticsTaskEventsQueryVariables,
	AnalyticsTaskEventsQueryType
> & {
	validate: (response: AnalyticsTaskEventsQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// Add helper functions as needed

// ============================================
// Test Suite: Create Task Event
// ============================================

describe("Graphql DMS Create Task Event", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateTaskEventTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateTaskEventMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.dms?.createTaskEvent).toBeDefined();
			expect(response.data?.dms?.createTaskEvent?.id).toBeDefined();
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
// Test Suite: Table Task Event Query
// ============================================

describe("Graphql DMS Table Task Event Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	const createdEvents: Array<{
		id: string;
	}> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Create sample events for table queries if needed
	});

	const cases: TableTaskEventTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableTaskEventQuery, testCase.variables);
		testCase.validate(response.data as TableTaskEventQueryType);
	});
});

// ============================================
// Test Suite: Search Task Events Query
// ============================================

describe("Graphql DMS Search Task Events Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	const createdEvents: Array<{ id: string }> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// Create sample events for search if needed
	});

	const cases: SearchTaskEventTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchTaskEventsQuery, testCase.variables);
		testCase.validate(response.data as SearchTaskEventsQueryType);
	});
});

// ============================================
// Test Suite: Analytics Task Events Query
// ============================================

describe("Graphql DMS Analytics Task Events Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsTaskEventTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsTaskEventsQuery,
			testCase.variables,
		);
		testCase.validate(response.data as AnalyticsTaskEventsQueryType);
	});
});
