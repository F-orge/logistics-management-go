import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateExpenseMutation as CreateExpenseMutationType,
	CreateExpenseMutationVariables,
	UpdateExpenseMutation as UpdateExpenseMutationType,
	UpdateExpenseMutationVariables,
	RemoveExpenseMutation as RemoveExpenseMutationType,
	RemoveExpenseMutationVariables,
	TableExpenseQuery as TableExpenseQueryType,
	TableExpenseQueryVariables,
	SearchExpensesQuery as SearchExpensesQueryType,
	SearchExpensesQueryVariables,
	AnalyticsExpensesQuery as AnalyticsExpensesQueryType,
	AnalyticsExpensesQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateExpenseInput,
	UpdateExpenseInput,
} from "../../../src/client/generated/graphql";
import {
	CreateExpenseMutation,
	UpdateExpenseMutation,
	RemoveExpenseMutation,
	TableExpenseQuery,
	SearchExpensesQuery,
	AnalyticsExpensesQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateExpenseTestCase = GraphQLTestCase<
	CreateExpenseMutationVariables,
	CreateExpenseMutationType
>;

type UpdateExpenseTestCase = GraphQLTestCase<
	UpdateExpenseMutationVariables,
	UpdateExpenseMutationType
> & {
	createData: CreateExpenseInput;
	updateData: UpdateExpenseInput;
	validate?: (response: UpdateExpenseMutationType, createdExpense: any) => void;
};

type RemoveExpenseTestCase = GraphQLTestCase<
	RemoveExpenseMutationVariables,
	RemoveExpenseMutationType
> & {
	createData: CreateExpenseInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveExpenseMutationType) => void;
};

type TableExpenseTestCase = GraphQLTestCase<
	TableExpenseQueryVariables,
	TableExpenseQueryType
> & {
	validate: (response: TableExpenseQueryType) => void;
};

type SearchExpenseTestCase = GraphQLTestCase<
	SearchExpensesQueryVariables,
	SearchExpensesQueryType
> & {
	validate: (response: SearchExpensesQueryType) => void;
};

type AnalyticsExpenseTestCase = GraphQLTestCase<
	AnalyticsExpensesQueryVariables,
	AnalyticsExpensesQueryType
> & {
	validate: (response: AnalyticsExpensesQueryType) => void;
};

// ============================================
// Test Suite: Create Expense
// ============================================

describe("Graphql TMS Create Expense", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateExpenseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateExpenseMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createExpense).toBeDefined();
			expect(response.data?.tms?.createExpense?.id).toBeDefined();
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
// Test Suite: Update Expense
// ============================================

describe("Graphql TMS Update Expense", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateExpenseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial expense
		const createResponse = await executor(CreateExpenseMutation, {
			expense: testCase.createData,
		});

		expect(createResponse.data?.tms?.createExpense?.id).toBeDefined();
		const expenseId = createResponse.data!.tms!.createExpense!.id!;
		const createdExpense = createResponse.data!.tms!.createExpense!;

		// Update expense
		const updateResponse = await executor(UpdateExpenseMutation, {
			id: expenseId,
			expense: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateExpense).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateExpenseMutationType,
					createdExpense,
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
// Test Suite: Remove Expense
// ============================================

describe("Graphql TMS Remove Expense", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveExpenseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let expenseId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateExpenseMutation, {
				expense: {
					// Add minimal required fields
				} as unknown as CreateExpenseInput,
			});
			expenseId = createResponse.data!.tms!.createExpense!.id!;
		} else {
			expenseId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveExpenseMutation, {
			id: expenseId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.tms?.removeExpense).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.tms?.removeExpense?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveExpenseMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Expenses Query
// ============================================

describe("Graphql TMS Table Expenses Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableExpenseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableExpenseQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.expenses).toBeDefined();
			testCase.validate(response.data as TableExpenseQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Expenses Query
// ============================================

describe("Graphql TMS Search Expenses Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchExpenseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchExpensesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.expenses).toBeDefined();
			testCase.validate(response.data as SearchExpensesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics Expenses Query
// ============================================

describe("Graphql TMS Analytics Expenses Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsExpenseTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsExpensesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.expenses).toBeDefined();
			testCase.validate(response.data as AnalyticsExpensesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
