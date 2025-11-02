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

	const cases: CreateCampaignTestCase[] = [
		{
			name: "Campaign_Create_WithRequiredFields",
			variables: {
				campaign: {
					name: "Summer Marketing Campaign 2025",
					startDate: "2025-06-01" as any,
					endDate: "2025-08-31" as any,
					budget: 50000,
				},
			},
			success: true,
		},
		{
			name: "Campaign_Create_WithAllFields",
			variables: {
				campaign: {
					name: "Q3 Product Launch Campaign",
					startDate: "2025-07-01" as any,
					endDate: "2025-09-30" as any,
					budget: 75000,
				},
			},
			success: true,
		},
		{
			name: "Campaign_Create_MissingName",
			variables: {
				campaign: {
					startDate: "2025-06-01" as any,
					endDate: "2025-08-31" as any,
					budget: 50000,
				} as unknown as CreateCampaignInput,
			},
			success: false,
			expectedError: {
				messagePattern: /required|missing|name/i,
			},
		},
		{
			name: "Campaign_Create_EndDateBeforeStartDate",
			variables: {
				campaign: {
					name: "Invalid Date Campaign",
					startDate: "2025-12-31" as any,
					endDate: "2025-01-01" as any,
					budget: 30000,
				},
			},
			success: false,
			expectedError: {
				messagePattern: /date|invalid/i,
			},
		},
	];

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

	const cases: UpdateCampaignTestCase[] = [
		{
			name: "Campaign_Update_BudgetChange",
			createData: {
				name: "Budget Test Campaign",
				startDate: "2025-06-01" as any,
				endDate: "2025-08-31" as any,
				budget: 50000,
			},
			updateData: {
				budget: 75000,
			},
			variables: {} as any,
			success: true,
			validate: (response) => {
				const data = response as any;
				expect(data?.crm?.updateCampaign?.budget).toBe(75000);
			},
		},
		{
			name: "Campaign_Update_NameChange",
			createData: {
				name: "Original Campaign Name",
				startDate: "2025-06-01" as any,
				endDate: "2025-08-31" as any,
				budget: 50000,
			},
			updateData: {
				name: "Updated Campaign Name",
			},
			variables: {} as any,
			success: true,
			validate: (response) => {
				const data = response as any;
				expect(data?.crm?.updateCampaign?.name).toBe("Updated Campaign Name");
			},
		},
		{
			name: "Campaign_Update_MultipleFields",
			createData: {
				name: "Multi-Update Campaign",
				startDate: "2025-06-01" as any,
				endDate: "2025-08-31" as any,
				budget: 50000,
			},
			updateData: {
				name: "Updated Multi Campaign",
				budget: 100000,
				endDate: "2025-10-31" as any,
			},
			variables: {} as any,
			success: true,
		},
		{
			name: "Campaign_Update_NonExistent",
			createData: {
				name: "Dummy Campaign",
				startDate: "2025-06-01" as any,
				budget: 50000,
			},
			updateData: {
				budget: 75000,
			},
			variables: {
				id: "00000000-0000-0000-0000-000000000000",
				campaign: {
					budget: 75000,
				},
			},
			success: false,
			expectedError: {
				messagePattern: /not found|does not exist/i,
			},
		},
	];

	it.each(cases)("$name", async (testCase) => {
		// Create initial campaign
		const createResponse = await executor(CreateCampaignMutation, {
			campaign: testCase.createData,
		});

		expect(createResponse.data?.crm?.createCampaign?.id).toBeDefined();
		const createdCampaignId = createResponse.data!.crm!.createCampaign!.id!;
		const createdCampaign = createResponse.data!.crm!.createCampaign!;

		// Use fake ID if provided in variables, otherwise use created campaign ID
		const campaignId = testCase.variables?.id || createdCampaignId;

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

	const cases: RemoveCampaignTestCase[] = [
		{
			name: "Campaign_Remove_Success",
			variables: {
				id: "placeholder",
			},
			success: true,
			shouldCreate: true,
		},
		{
			name: "Campaign_Remove_NonExistent",
			variables: {
				id: "00000000-0000-0000-0000-000000000000",
			},
			success: false,
			shouldCreate: false,
			expectedError: {
				messagePattern: /not found|does not exist/i,
			},
		},
	];

	it.each(cases)("$name", async (testCase) => {
		let campaignId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateCampaignMutation, {
				campaign: {
					name: "Campaign to delete",
					startDate: "2025-06-01" as any,
					endDate: "2025-08-31" as any,
					budget: 50000,
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

	const cases: TableCampaignTestCase[] = [
		{
			name: "Campaign_Table_WithPagination",
			variables: {
				page: 1,
				perPage: 10,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.campaigns)).toBe(true);
			},
		},
		{
			name: "Campaign_Table_SecondPage",
			variables: {
				page: 2,
				perPage: 5,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.campaigns)).toBe(true);
			},
		},
		{
			name: "Campaign_Table_LargePageSize",
			variables: {
				page: 1,
				perPage: 100,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.campaigns)).toBe(true);
			},
		},
	];

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

	const cases: SearchCampaignTestCase[] = [
		{
			name: "Campaign_Search_ByName",
			variables: {
				search: "Marketing",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.campaigns)).toBe(true);
			},
		},
		{
			name: "Campaign_Search_ByNameExact",
			variables: {
				search: "Summer Marketing Campaign 2025",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.campaigns)).toBe(true);
			},
		},
		{
			name: "Campaign_Search_EmptyResults",
			variables: {
				search: "NonExistentCampaignXYZ123",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.campaigns)).toBe(true);
				expect(data?.crm?.campaigns?.length).toBe(0);
			},
		},
		{
			name: "Campaign_Search_PartialMatch",
			variables: {
				search: "Campaign",
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.campaigns)).toBe(true);
			},
		},
	];

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

	const cases: AnalyticsCampaignTestCase[] = [
		{
			name: "Campaign_Analytics_GetAll",
			variables: {},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(data?.crm?.campaigns).toBeDefined();
			},
		},
		{
			name: "Campaign_Analytics_WithDateRange",
			variables: {
				from: "2025-01-01" as any,
				to: "2025-12-31" as any,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.campaigns)).toBe(true);
			},
		},
		{
			name: "Campaign_Analytics_FutureDate",
			variables: {
				from: "2026-01-01" as any,
				to: "2026-12-31" as any,
			},
			success: true,
			validate: (response) => {
				expect(response).toBeDefined();
				const data = response as any;
				expect(Array.isArray(data?.crm?.campaigns)).toBe(true);
			},
		},
	];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsCampaignsQuery,
			testCase.variables,
		);
		testCase.validate(response.data as AnalyticsCampaignsQueryType);
	});
});
