import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsCampaignsQuery,
	CreateCampaignMutation,
	RemoveCampaignMutation,
	SearchCampaignsQuery,
	TableCampaignQuery,
	UpdateCampaignMutation,
} from "../../../src/client";
import type {
	AnalyticsCampaignsQuery as AnalyticsCampaignsQueryType,
	AnalyticsCampaignsQueryVariables,
	CreateCampaignInput,
	CreateCampaignMutation as CreateCampaignMutationType,
	CreateCampaignMutationVariables,
	RemoveCampaignMutation as RemoveCampaignMutationType,
	RemoveCampaignMutationVariables,
	SearchCampaignsQuery as SearchCampaignsQueryType,
	SearchCampaignsQueryVariables,
	TableCampaignQuery as TableCampaignQueryType,
	TableCampaignQueryVariables,
	UpdateCampaignInput,
	UpdateCampaignMutation as UpdateCampaignMutationType,
	UpdateCampaignMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateCampaignTestCase = GraphQLTestCase<
	CreateCampaignMutationVariables,
	CreateCampaignMutationType
>;

type UpdateCampaignTestCase = GraphQLTestCase<
	UpdateCampaignMutationVariables,
	UpdateCampaignMutationType
> & {
	createData: CreateCampaignInput;
	updateData: UpdateCampaignInput;
	validate?: (
		response: UpdateCampaignMutationType,
		createdCampaign: any,
	) => void;
};

type RemoveCampaignTestCase = GraphQLTestCase<
	RemoveCampaignMutationVariables,
	RemoveCampaignMutationType
> & {
	shouldCreate: boolean;
	validate?: (response: RemoveCampaignMutationType) => void;
};

type TableCampaignTestCase = GraphQLTestCase<
	TableCampaignQueryVariables,
	TableCampaignQueryType
> & {
	validate: (response: TableCampaignQueryType) => void;
};

type SearchCampaignTestCase = GraphQLTestCase<
	SearchCampaignsQueryVariables,
	SearchCampaignsQueryType
> & {
	validate: (response: SearchCampaignsQueryType) => void;
};

type AnalyticsCampaignTestCase = GraphQLTestCase<
	AnalyticsCampaignsQueryVariables,
	AnalyticsCampaignsQueryType
> & {
	validate: (response: AnalyticsCampaignsQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// TODO: Add helper functions as needed

// ============================================
// Test Suite: Create Campaign
// ============================================

describe("Graphql CRM Create Campaign", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateCampaignTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateCampaignMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createCampaign).toBeDefined();
			expect(response.data?.crm?.createCampaign?.id).toBeDefined();
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
// Test Suite: Update Campaign
// ============================================

describe("Graphql CRM Update Campaign", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateCampaignTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial campaign
		const createResponse = await executor(CreateCampaignMutation, {
			campaign: testCase.createData,
		});

		expect(createResponse.data?.crm?.createCampaign?.id).toBeDefined();
		const campaignId = createResponse.data!.crm!.createCampaign!.id!;
		const createdCampaign = createResponse.data!.crm!.createCampaign!;

		// Update campaign
		const updateResponse = await executor(UpdateCampaignMutation, {
			id: campaignId,
			campaign: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.crm?.updateCampaign).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateCampaignMutationType,
					createdCampaign,
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
// Test Suite: Remove Campaign
// ============================================

describe("Graphql CRM Remove Campaign", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveCampaignTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let campaignId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateCampaignMutation, {
				campaign: {
					name: "Campaign to delete",
				} as CreateCampaignInput,
			});
			campaignId = createResponse.data!.crm!.createCampaign!.id!;
		} else {
			campaignId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveCampaignMutation, {
			id: campaignId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.crm?.removeCampaign).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.crm?.removeCampaign?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveCampaignMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Campaign Query
// ============================================

describe("Graphql CRM Table Campaign Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: TableCampaignTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableCampaignQuery, testCase.variables);
		testCase.validate(response.data as TableCampaignQueryType);
	});
});

// ============================================
// Test Suite: Search Campaigns Query
// ============================================

describe("Graphql CRM Search Campaigns Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: SearchCampaignTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchCampaignsQuery, testCase.variables);
		testCase.validate(response.data as SearchCampaignsQueryType);
	});
});

// ============================================
// Test Suite: Analytics Campaigns Query
// ============================================

describe("Graphql CRM Analytics Campaigns Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: AnalyticsCampaignTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsCampaignsQuery,
			testCase.variables,
		);
		testCase.validate(response.data as AnalyticsCampaignsQueryType);
	});
});
