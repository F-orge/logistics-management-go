import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AccountingSyncLogsQuery,
	AnalyticsAccountingSyncLogsQuery,
	CreateAccountingSyncLogMutation,
	SearchAccountingSyncLogsQuery,
} from "../../../src/client";
import type {
	AccountingSyncLogsQueryVariables,
	AnalyticsAccountingSyncLogsQuery as AnalyticsAccountingSyncLogsQueryType,
	AnalyticsAccountingSyncLogsQueryVariables,
	CreateAccountingSyncLogInput,
	CreateAccountingSyncLogMutation as CreateAccountingSyncLogMutationType,
	CreateAccountingSyncLogMutationVariables,
	SearchAccountingSyncLogsQuery as SearchAccountingSyncLogsQueryType,
	SearchAccountingSyncLogsQueryVariables,
	AccountingSyncLogsQuery as TableAccountingSyncLogQueryType,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateAccountingSyncLogTestCase = GraphQLTestCase<
	CreateAccountingSyncLogMutationVariables,
	CreateAccountingSyncLogMutationType
>;

type TableAccountingSyncLogTestCase = GraphQLTestCase<
	AccountingSyncLogsQueryVariables,
	TableAccountingSyncLogQueryType
> & {
	validate: (response: TableAccountingSyncLogQueryType) => void;
};

type SearchAccountingSyncLogsTestCase = GraphQLTestCase<
	SearchAccountingSyncLogsQueryVariables,
	SearchAccountingSyncLogsQueryType
> & {
	validate: (response: SearchAccountingSyncLogsQueryType) => void;
};

type AnalyticsAccountingSyncLogsTestCase = GraphQLTestCase<
	AnalyticsAccountingSyncLogsQueryVariables,
	AnalyticsAccountingSyncLogsQueryType
> & {
	validate: (response: AnalyticsAccountingSyncLogsQueryType) => void;
};
// ============================================
// Test Suite: Create AccountingSyncLog
// ============================================

describe("Graphql Create AccountingSyncLog", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateAccountingSyncLogTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateAccountingSyncLogMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.createAccountingSyncLog).toBeDefined();
			expect(response.data?.billing?.createAccountingSyncLog?.id).toBeDefined();
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
// Test Suite: Table AccountingSyncLogs Query
// ============================================

describe("Graphql Table AccountingSyncLogs Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableAccountingSyncLogTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AccountingSyncLogsQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.accountingSyncLogs).toBeDefined();
			testCase.validate(response.data as TableAccountingSyncLogQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search AccountingSyncLogs Query
// ============================================

describe("Graphql Search AccountingSyncLogs Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchAccountingSyncLogsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			SearchAccountingSyncLogsQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.accountingSyncLogs).toBeDefined();
			testCase.validate(response.data as SearchAccountingSyncLogsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics AccountingSyncLogs Query
// ============================================

describe("Graphql Analytics AccountingSyncLogs Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsAccountingSyncLogsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsAccountingSyncLogsQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.accountingSyncLogs).toBeDefined();
			testCase.validate(response.data as AnalyticsAccountingSyncLogsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
