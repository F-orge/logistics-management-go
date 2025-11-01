import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateDisputeMutation as CreateDisputeMutationType,
	CreateDisputeMutationVariables,
	UpdateDisputeMutation as UpdateDisputeMutationType,
	UpdateDisputeMutationVariables,
	TableDisputeQuery as TableDisputeQueryType,
	TableDisputeQueryVariables,
	SearchDisputesQuery as SearchDisputesQueryType,
	SearchDisputesQueryVariables,
	AnalyticsDisputesQuery as AnalyticsDisputesQueryType,
	AnalyticsDisputesQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateDisputeInput,
	UpdateDisputeInput,
} from "../../../src/client/generated/graphql";
import {
	CreateDisputeMutation,
	UpdateDisputeMutation,
	TableDisputeQuery,
	SearchDisputesQuery,
	AnalyticsDisputesQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateDisputeTestCase = GraphQLTestCase<
	CreateDisputeMutationVariables,
	CreateDisputeMutationType
>;

type UpdateDisputeTestCase = GraphQLTestCase<
	UpdateDisputeMutationVariables,
	UpdateDisputeMutationType
> & {
	createData: CreateDisputeInput;
	updateData: UpdateDisputeInput;
	validate?: (response: UpdateDisputeMutationType, createdDispute: any) => void;
};

type TableDisputeTestCase = GraphQLTestCase<
	TableDisputeQueryVariables,
	TableDisputeQueryType
> & {
	validate: (response: TableDisputeQueryType) => void;
};

type SearchDisputesTestCase = GraphQLTestCase<
	SearchDisputesQueryVariables,
	SearchDisputesQueryType
> & {
	validate: (response: SearchDisputesQueryType) => void;
};

type AnalyticsDisputesTestCase = GraphQLTestCase<
	AnalyticsDisputesQueryVariables,
	AnalyticsDisputesQueryType
> & {
	validate: (response: AnalyticsDisputesQueryType) => void;
};
// ============================================
// Test Suite: Create Dispute
// ============================================

describe("Graphql Create Dispute", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateDisputeTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateDisputeMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.createDispute).toBeDefined();
			expect(response.data?.billing?.createDispute?.id).toBeDefined();
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
// Test Suite: Update Dispute
// ============================================

describe("Graphql Update Dispute", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateDisputeTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial Dispute
		const createResponse = await executor(CreateDisputeMutation, {
			dispute: testCase.createData,
		});

		expect(createResponse.data?.billing?.createDispute?.id).toBeDefined();
		const disputeId = createResponse.data!.billing!.createDispute!.id!;
		const createdDispute = createResponse.data!.billing!.createDispute!;

		// Update Dispute
		const updateResponse = await executor(UpdateDisputeMutation, {
			id: testCase.variables.id,
			dispute: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.billing?.updateDispute).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateDisputeMutationType,
					createdDispute,
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
// Test Suite: Table Disputes Query
// ============================================

describe("Graphql Table Disputes Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableDisputeTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableDisputeQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.disputes).toBeDefined();
			testCase.validate(response.data as TableDisputeQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search Disputes Query
// ============================================

describe("Graphql Search Disputes Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchDisputesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchDisputesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.disputes).toBeDefined();
			testCase.validate(response.data as SearchDisputesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics Disputes Query
// ============================================

describe("Graphql Analytics Disputes Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsDisputesTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsDisputesQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.billing?.disputes).toBeDefined();
			testCase.validate(response.data as AnalyticsDisputesQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
