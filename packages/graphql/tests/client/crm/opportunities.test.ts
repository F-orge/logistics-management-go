import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateOpportunityMutation as CreateOpportunityMutationType,
	CreateOpportunityMutationVariables,
	UpdateOpportunityMutation as UpdateOpportunityMutationType,
	UpdateOpportunityMutationVariables,
	TableOpportunityQuery as TableOpportunityQueryType,
	TableOpportunityQueryVariables,
	SearchOpportunitiesQuery as SearchOpportunitiesQueryType,
	SearchOpportunitiesQueryVariables,
	AnalyticsOpportunitiesQuery as AnalyticsOpportunitiesQueryType,
	AnalyticsOpportunitiesQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateOpportunityInput,
	UpdateOpportunityInput,
} from "../../../src/client/generated/graphql";
import {
	CreateOpportunityMutation,
	UpdateOpportunityMutation,
	TableOpportunityQuery,
	SearchOpportunitiesQuery,
	AnalyticsOpportunitiesQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateOpportunityTestCase = GraphQLTestCase<
	CreateOpportunityMutationVariables,
	CreateOpportunityMutationType
>;

type UpdateOpportunityTestCase = GraphQLTestCase<
	UpdateOpportunityMutationVariables,
	UpdateOpportunityMutationType
> & {
	createData: CreateOpportunityInput;
	updateData: UpdateOpportunityInput;
	validate?: (
		response: UpdateOpportunityMutationType,
		createdOpportunity: any,
	) => void;
};

type TableOpportunityTestCase = GraphQLTestCase<
	TableOpportunityQueryVariables,
	TableOpportunityQueryType
> & {
	validate: (response: TableOpportunityQueryType) => void;
};

type SearchOpportunityTestCase = GraphQLTestCase<
	SearchOpportunitiesQueryVariables,
	SearchOpportunitiesQueryType
> & {
	validate: (response: SearchOpportunitiesQueryType) => void;
};

type AnalyticsOpportunityTestCase = GraphQLTestCase<
	AnalyticsOpportunitiesQueryVariables,
	AnalyticsOpportunitiesQueryType
> & {
	validate: (response: AnalyticsOpportunitiesQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// TODO: Add helper functions as needed

// ============================================
// Test Suite: Create Opportunity
// ============================================

describe("Graphql CRM Create Opportunity", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateOpportunityTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateOpportunityMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createOpportunity).toBeDefined();
			expect(response.data?.crm?.createOpportunity?.id).toBeDefined();
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
// Test Suite: Update Opportunity
// ============================================

describe("Graphql CRM Update Opportunity", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateOpportunityTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial opportunity
		const createResponse = await executor(CreateOpportunityMutation, {
			opportunity: testCase.createData,
		});

		expect(createResponse.data?.crm?.createOpportunity?.id).toBeDefined();
		const opportunityId = createResponse.data!.crm!.createOpportunity!.id!;
		const createdOpportunity = createResponse.data!.crm!.createOpportunity!;

		// Update opportunity
		const updateResponse = await executor(UpdateOpportunityMutation, {
			id: opportunityId,
			opportunity: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.crm?.updateOpportunity).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateOpportunityMutationType,
					createdOpportunity,
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
// Test Suite: Table Opportunity Query
// ============================================

describe("Graphql CRM Table Opportunity Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: TableOpportunityTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableOpportunityQuery, testCase.variables);
		testCase.validate(response.data as TableOpportunityQueryType);
	});
});

// ============================================
// Test Suite: Search Opportunities Query
// ============================================

describe("Graphql CRM Search Opportunities Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: SearchOpportunityTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			SearchOpportunitiesQuery,
			testCase.variables,
		);
		testCase.validate(response.data as SearchOpportunitiesQueryType);
	});
});

// ============================================
// Test Suite: Analytics Opportunities Query
// ============================================

describe("Graphql CRM Analytics Opportunities Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: AnalyticsOpportunityTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsOpportunitiesQuery,
			testCase.variables,
		);
		testCase.validate(response.data as AnalyticsOpportunitiesQueryType);
	});
});
