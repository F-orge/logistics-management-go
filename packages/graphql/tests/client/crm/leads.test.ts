import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateLeadMutation as CreateLeadMutationType,
	CreateLeadMutationVariables,
	UpdateLeadMutation as UpdateLeadMutationType,
	UpdateLeadMutationVariables,
	RemoveLeadMutation as RemoveLeadMutationType,
	RemoveLeadMutationVariables,
	TableLeadQuery as TableLeadQueryType,
	TableLeadQueryVariables,
	SearchLeadsQuery as SearchLeadsQueryType,
	SearchLeadsQueryVariables,
	AnalyticsLeadsQuery as AnalyticsLeadsQueryType,
	AnalyticsLeadsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateLeadInput,
	UpdateLeadInput,
} from "../../../src/client/generated/graphql";
import {
	CreateLeadMutation,
	UpdateLeadMutation,
	RemoveLeadMutation,
	TableLeadQuery,
	SearchLeadsQuery,
	AnalyticsLeadsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateLeadTestCase = GraphQLTestCase<
	CreateLeadMutationVariables,
	CreateLeadMutationType
>;

type UpdateLeadTestCase = GraphQLTestCase<
	UpdateLeadMutationVariables,
	UpdateLeadMutationType
> & {
	createData: CreateLeadInput;
	updateData: UpdateLeadInput;
	validate?: (response: UpdateLeadMutationType, createdLead: any) => void;
};

type RemoveLeadTestCase = GraphQLTestCase<
	RemoveLeadMutationVariables,
	RemoveLeadMutationType
> & {
	shouldCreate: boolean;
	validate?: (response: RemoveLeadMutationType) => void;
};

type TableLeadTestCase = GraphQLTestCase<
	TableLeadQueryVariables,
	TableLeadQueryType
> & {
	validate: (response: TableLeadQueryType) => void;
};

type SearchLeadTestCase = GraphQLTestCase<
	SearchLeadsQueryVariables,
	SearchLeadsQueryType
> & {
	validate: (response: SearchLeadsQueryType) => void;
};

type AnalyticsLeadTestCase = GraphQLTestCase<
	AnalyticsLeadsQueryVariables,
	AnalyticsLeadsQueryType
> & {
	validate: (response: AnalyticsLeadsQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// TODO: Add helper functions as needed

// ============================================
// Test Suite: Create Lead
// ============================================

describe("Graphql CRM Create Lead", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateLeadTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateLeadMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createLead).toBeDefined();
			expect(response.data?.crm?.createLead?.id).toBeDefined();
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
// Test Suite: Update Lead
// ============================================

describe("Graphql CRM Update Lead", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateLeadTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial lead
		const createResponse = await executor(CreateLeadMutation, {
			lead: testCase.createData,
		});

		expect(createResponse.data?.crm?.createLead?.id).toBeDefined();
		const leadId = createResponse.data!.crm!.createLead!.id!;
		const createdLead = createResponse.data!.crm!.createLead!;

		// Update lead
		const updateResponse = await executor(UpdateLeadMutation, {
			id: leadId,
			lead: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.crm?.updateLead).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateLeadMutationType,
					createdLead,
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
// Test Suite: Remove Lead
// ============================================

describe("Graphql CRM Remove Lead", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveLeadTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let leadId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateLeadMutation, {
				lead: {
					name: "Lead to delete",
				} as CreateLeadInput,
			});
			leadId = createResponse.data!.crm!.createLead!.id!;
		} else {
			leadId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveLeadMutation, {
			id: leadId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.crm?.removeLead).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.crm?.removeLead?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveLeadMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Lead Query
// ============================================

describe("Graphql CRM Table Lead Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: TableLeadTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableLeadQuery, testCase.variables);
		testCase.validate(response.data as TableLeadQueryType);
	});
});

// ============================================
// Test Suite: Search Leads Query
// ============================================

describe("Graphql CRM Search Leads Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: SearchLeadTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchLeadsQuery, testCase.variables);
		testCase.validate(response.data as SearchLeadsQueryType);
	});
});

// ============================================
// Test Suite: Analytics Leads Query
// ============================================

describe("Graphql CRM Analytics Leads Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: AnalyticsLeadTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsLeadsQuery, testCase.variables);
		testCase.validate(response.data as AnalyticsLeadsQueryType);
	});
});
