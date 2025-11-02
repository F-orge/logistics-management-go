import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsQuotesQuery,
	CreateQuoteMutation,
	RemoveQuoteMutation,
	SearchQuotesQuery,
	TableQuoteQuery,
	UpdateQuoteMutation,
} from "../../../src/client";
import type {
	AnalyticsQuotesQuery as AnalyticsQuotesQueryType,
	AnalyticsQuotesQueryVariables,
	CreateQuoteInput,
	CreateQuoteMutation as CreateQuoteMutationType,
	CreateQuoteMutationVariables,
	RemoveQuoteMutation as RemoveQuoteMutationType,
	RemoveQuoteMutationVariables,
	SearchQuotesQuery as SearchQuotesQueryType,
	SearchQuotesQueryVariables,
	TableQuoteQuery as TableQuoteQueryType,
	TableQuoteQueryVariables,
	UpdateQuoteInput,
	UpdateQuoteMutation as UpdateQuoteMutationType,
	UpdateQuoteMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateQuoteTestCase = GraphQLTestCase<
	CreateQuoteMutationVariables,
	CreateQuoteMutationType
>;

type UpdateQuoteTestCase = GraphQLTestCase<
	UpdateQuoteMutationVariables,
	UpdateQuoteMutationType
> & {
	createData: CreateQuoteInput;
	updateData: UpdateQuoteInput;
	validate?: (response: UpdateQuoteMutationType, createdQuote: any) => void;
};

type RemoveQuoteTestCase = GraphQLTestCase<
	RemoveQuoteMutationVariables,
	RemoveQuoteMutationType
> & {
	createData: CreateQuoteInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveQuoteMutationType) => void;
};

type TableQuoteTestCase = GraphQLTestCase<
	TableQuoteQueryVariables,
	TableQuoteQueryType
> & {
	validate: (response: TableQuoteQueryType) => void;
};

type SearchQuotesTestCase = GraphQLTestCase<
	SearchQuotesQueryVariables,
	SearchQuotesQueryType
> & {
	validate: (response: SearchQuotesQueryType) => void;
};

type AnalyticsQuotesTestCase = GraphQLTestCase<
	AnalyticsQuotesQueryVariables,
	AnalyticsQuotesQueryType
> & {
	validate: (response: AnalyticsQuotesQueryType) => void;
};
// ============================================
// Test Suite: Create Quote
// ============================================

describe("Graphql Create Quote", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateQuoteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateQuoteMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.createQuote).toBeDefined();
			expect(response.data?.billing?.createQuote?.id).toBeDefined();
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
// Test Suite: Update Quote
// ============================================

describe("Graphql Update Quote", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateQuoteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial Quote
		const createResponse = await executor(CreateQuoteMutation, {
			quote: testCase.createData,
		});

		expect(createResponse.data?.billing?.createQuote?.id).toBeDefined();
		const quoteId = createResponse.data!.billing!.createQuote!.id!;
		const createdQuote = createResponse.data!.billing!.createQuote!;

		// Update Quote
		const updateResponse = await executor(UpdateQuoteMutation, {
			id: testCase.variables.id,
			quote: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.billing?.updateQuote).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateQuoteMutationType,
					createdQuote,
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
// Test Suite: Remove Quote
// ============================================

describe("Graphql Remove Quote", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveQuoteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let quoteId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateQuoteMutation, {
				quote: {
					// Add minimal required fields
				} as unknown as CreateQuoteInput,
			});
			quoteId = createResponse.data!.billing!.createQuote!.id!;
		} else {
			quoteId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveQuoteMutation, {
			id: quoteId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.billing?.removeQuote).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.billing?.removeQuote?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveQuoteMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Quotes Query
// ============================================

describe("Graphql Table Quotes Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableQuoteTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableQuoteQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.quotes).toBeDefined();
			testCase.validate(response.data as TableQuoteQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Quotes Query
// ============================================

describe("Graphql Search Quotes Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchQuotesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchQuotesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.quotes).toBeDefined();
			testCase.validate(response.data as SearchQuotesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics Quotes Query
// ============================================

describe("Graphql Analytics Quotes Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsQuotesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsQuotesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.quotes).toBeDefined();
			testCase.validate(response.data as AnalyticsQuotesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
