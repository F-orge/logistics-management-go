import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateAccountTransactionMutation as CreateAccountTransactionMutationType,
	CreateAccountTransactionMutationVariables,
	AccountTransactionsQuery as TableAccountTransactionQueryType,
	AccountTransactionsQueryVariables,
	SearchAccountTransactionsQuery as SearchAccountTransactionsQueryType,
	SearchAccountTransactionsQueryVariables,
	AnalyticsAccountTransactionsQuery as AnalyticsAccountTransactionsQueryType,
	AnalyticsAccountTransactionsQueryVariables,
} from "../../../src/client/generated/graphql";
import type { CreateAccountTransactionInput } from "../../../src/client/generated/graphql";
import {
	CreateAccountTransactionMutation,
	AccountTransactionsQuery,
	SearchAccountTransactionsQuery,
	AnalyticsAccountTransactionsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateAccountTransactionTestCase = GraphQLTestCase<
	CreateAccountTransactionMutationVariables,
	CreateAccountTransactionMutationType
>;

type TableAccountTransactionTestCase = GraphQLTestCase<
	AccountTransactionsQueryVariables,
	TableAccountTransactionQueryType
> & {
	validate: (response: TableAccountTransactionQueryType) => void;
};

type SearchAccountTransactionsTestCase = GraphQLTestCase<
	SearchAccountTransactionsQueryVariables,
	SearchAccountTransactionsQueryType
> & {
	validate: (response: SearchAccountTransactionsQueryType) => void;
};

type AnalyticsAccountTransactionsTestCase = GraphQLTestCase<
	AnalyticsAccountTransactionsQueryVariables,
	AnalyticsAccountTransactionsQueryType
> & {
	validate: (response: AnalyticsAccountTransactionsQueryType) => void;
};
// ============================================
// Test Suite: Create AccountTransaction
// ============================================

describe("Graphql Create AccountTransaction", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateAccountTransactionTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateAccountTransactionMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.createAccountTransaction).toBeDefined();
			expect(
				response.data?.billing?.createAccountTransaction?.id,
			).toBeDefined();
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
// Test Suite: Table AccountTransactions Query
// ============================================

describe("Graphql Table AccountTransactions Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableAccountTransactionTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AccountTransactionsQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.accountTransactions).toBeDefined();
			testCase.validate(response.data as TableAccountTransactionQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search AccountTransactions Query
// ============================================

describe("Graphql Search AccountTransactions Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchAccountTransactionsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			SearchAccountTransactionsQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.accountTransactions).toBeDefined();
			testCase.validate(response.data as SearchAccountTransactionsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics AccountTransactions Query
// ============================================

describe("Graphql Analytics AccountTransactions Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsAccountTransactionsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsAccountTransactionsQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.accountTransactions).toBeDefined();
			testCase.validate(response.data as AnalyticsAccountTransactionsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
