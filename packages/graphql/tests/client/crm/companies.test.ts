import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsCompaniesQuery,
	CreateCompanyMutation,
	RemoveCompanyMutation,
	SearchCompaniesQuery,
	TableCompanyQuery,
	UpdateCompanyMutation,
} from "../../../src/client";
import type {
	AnalyticsCompaniesQuery as AnalyticsCompaniesQueryType,
	AnalyticsCompaniesQueryVariables,
	CreateCompanyInput,
	CreateCompanyMutation as CreateCompanyMutationType,
	CreateCompanyMutationVariables,
	RemoveCompanyMutation as RemoveCompanyMutationType,
	RemoveCompanyMutationVariables,
	SearchCompaniesQuery as SearchCompaniesQueryType,
	SearchCompaniesQueryVariables,
	TableCompanyQueryQueryVariables,
	TableCompanyQueryQuery as TableCompanyQueryType,
	UpdateCompanyInput,
	UpdateCompanyMutation as UpdateCompanyMutationType,
	UpdateCompanyMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateCompanyTestCase = GraphQLTestCase<
	CreateCompanyMutationVariables,
	CreateCompanyMutationType
>;

type UpdateCompanyTestCase = GraphQLTestCase<
	UpdateCompanyMutationVariables,
	UpdateCompanyMutationType
> & {
	createData: CreateCompanyInput;
	updateData: UpdateCompanyInput;
	validate?: (response: UpdateCompanyMutationType, createdCompany: any) => void;
};

type RemoveCompanyTestCase = GraphQLTestCase<
	RemoveCompanyMutationVariables,
	RemoveCompanyMutationType
> & {
	shouldCreate: boolean;
	validate?: (response: RemoveCompanyMutationType) => void;
};

type TableCompanyTestCase = GraphQLTestCase<
	TableCompanyQueryQueryVariables,
	TableCompanyQueryType
> & {
	validate: (response: TableCompanyQueryType) => void;
};

type SearchCompanyTestCase = GraphQLTestCase<
	SearchCompaniesQueryVariables,
	SearchCompaniesQueryType
> & {
	validate: (response: SearchCompaniesQueryType) => void;
};

type AnalyticsCompanyTestCase = GraphQLTestCase<
	AnalyticsCompaniesQueryVariables,
	AnalyticsCompaniesQueryType
> & {
	validate: (response: AnalyticsCompaniesQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

// TODO: Add helper functions as needed

// ============================================
// Test Suite: Create Company
// ============================================

describe("Graphql CRM Create Company", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateCompanyTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateCompanyMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createCompany).toBeDefined();
			expect(response.data?.crm?.createCompany?.id).toBeDefined();
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
// Test Suite: Update Company
// ============================================

describe("Graphql CRM Update Company", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateCompanyTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial company
		const createResponse = await executor(CreateCompanyMutation, {
			company: testCase.createData,
		});

		expect(createResponse.data?.crm?.createCompany?.id).toBeDefined();
		const companyId = createResponse.data!.crm!.createCompany!.id!;
		const createdCompany = createResponse.data!.crm!.createCompany!;

		// Update company
		const updateResponse = await executor(UpdateCompanyMutation, {
			id: companyId,
			company: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.crm?.updateCompany).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateCompanyMutationType,
					createdCompany,
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
// Test Suite: Remove Company
// ============================================

describe("Graphql CRM Remove Company", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveCompanyTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let companyId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateCompanyMutation, {
				company: {
					name: "Company to delete",
				} as CreateCompanyInput,
			});
			companyId = createResponse.data!.crm!.createCompany!.id!;
		} else {
			companyId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveCompanyMutation, {
			id: companyId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.crm?.removeCompany).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.crm?.removeCompany?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveCompanyMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Company Query
// ============================================

describe("Graphql CRM Table Company Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	const createdCompanies: Array<{
		id: string;
		name: string;
	}> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: TableCompanyTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableCompanyQuery, testCase.variables);
		testCase.validate(response.data as TableCompanyQueryType);
	});
});

// ============================================
// Test Suite: Search Companies Query
// ============================================

describe("Graphql CRM Search Companies Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	const createdCompanies: Array<{ id: string; name: string }> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: SearchCompanyTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchCompaniesQuery, testCase.variables);
		testCase.validate(response.data as SearchCompaniesQueryType);
	});
});

// ============================================
// Test Suite: Analytics Companies Query
// ============================================

describe("Graphql CRM Analytics Companies Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		// TODO: Setup test data in beforeAll if needed
	});

	const cases: AnalyticsCompanyTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsCompaniesQuery,
			testCase.variables,
		);
		testCase.validate(response.data as AnalyticsCompaniesQueryType);
	});
});
